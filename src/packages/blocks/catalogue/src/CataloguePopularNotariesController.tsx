import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start

export type Jurisdiction = {
  id: string | number;
  jurisdiction: string;
  created_at: string;
  updated_at: string;
};

export interface PopularNotariesAttributes {
  photo: string;
  name: string;
  jurisdiction: string;
  rating: number;
  total_notaries: number;
}

interface ProfilePhoto {
  url: string | null;
}

interface SearchData {
  id: string;
  type: string;
  attributes: ProfileAttributes;
}

interface ProfileAttributes {
  full_name: string;
  rating: number;
  country: string;
  photo: ProfilePhoto;
  total_notaries?: number;
}

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  arrayHolder: any;
  token: string;
  // Customizable Area Start
  popularNotaries: PopularNotariesAttributes[];
  user_role: string;
  loading: boolean;
  searchQuery: string;
  jurisdictions: Jurisdiction[];
  selectedJurisdiction: string;
  showJurisdictionSheet: boolean;
  nextPage: number;
  searchNextPage: number;
  totalPages: number;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CataloguePopularNotariesController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getPopularNotariesApiCallId: string = "";
  searchApiCallId: string = "";
  getJurisdictionsApiCallId: string = "";
  debounceTimeout: any; // To store the timeout for debouncing
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      arrayHolder: [],
      token: "",
      // Customizable Area Start
      popularNotaries: [],
      user_role: "",
      loading: false,
      searchQuery: "",
      jurisdictions: [],
      selectedJurisdiction: "",
      showJurisdictionSheet: false,
      nextPage: 1,
      totalPages: 1,
      searchNextPage: 1,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.fetchToken();

    setTimeout(() => {
      this.getJurisdictionsApi();
      this.getPopularNotariesApi();
    }, 300);
    // Customizable Area End
  }

  // Customizable Area Start
  fetchToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      const userDataa = message.getData(
        getName(MessageEnum.SessionResponseData)
      );
      const user = JSON.parse(userDataa);
      this.setState({ token: token, user_role: user.meta.role });
    }

    const apisRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    setTimeout(() => {
      this.setState({ loading: false });
    }, 300);

    if (responseJson && !responseJson.errors) {
      if (apisRequestCallId === this.getJurisdictionsApiCallId) {
        this.setState({ jurisdictions: responseJson });
      }
      if (apisRequestCallId === this.getPopularNotariesApiCallId) {
        this.setState((prevState) => ({
          popularNotaries: [...prevState.popularNotaries, ...responseJson.data], // Ensure you're spreading an array
          nextPage: responseJson.pagination.next_page, // Handle pagination if required
          totalPages: responseJson.pagination.total_pages,
          searchNextPage: 1,
        }));
      }

      if (apisRequestCallId === this.searchApiCallId) {
        const notaries = (responseJson?.data?.accounts?.data || []).map(
          (val: SearchData) => {
            return {
              photo:
                typeof val.attributes.photo.url === "string"
                  ? val.attributes.photo.url
                  : val.attributes.full_name,
              name: val.attributes.full_name,
              jurisdiction: val.attributes.country,
              rating: val.attributes.rating,
              total_notaries: val.attributes.total_notaries,
            };
          }
        );
        const pagination =
          responseJson?.data?.pagination ??
          responseJson?.data?.pagination?.accounts;

        this.setState({
          popularNotaries: notaries,
          nextPage: 1,
          searchNextPage: pagination.next_page,
          totalPages: pagination.total_pages,
        });
      }
    }
  }

  async componentWillUnmount() {
    // Clear the timeout if the component unmounts to avoid memory leaks
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  clearFilter = () => {
    this.setState({ selectedJurisdiction: "", showJurisdictionSheet: false });
    this.apiCall();
  };

  onChange = (value: string) => {
    this.setState({ searchQuery: value });

    // Clear the previous timeout if there is one
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    // Set a new timeout to debounce the API call
    this.debounceTimeout = setTimeout(() => {
      this.apiCall();
    }, 500); // Debounce time in milliseconds (e.g., 500ms)
  };

  onClearSearch = () => {
    this.setState({ searchQuery: "" });
    this.apiCall();
  };

  apiCall = () => {
    setTimeout(() => {
      if (this.state.searchQuery || this.state.selectedJurisdiction) {
        this.searchNotariesApi();
      } else {
        this.getPopularNotariesApi();
      }
    }, 300);
  };

  toggleSheet = () => {
    this.setState({ showJurisdictionSheet: !this.state.showJurisdictionSheet });
  };

  onSelectJurisdiction = (jurisdiction: string) => {
    this.setState({ selectedJurisdiction: jurisdiction });
    this.toggleSheet();
    this.searchNotariesApi(jurisdiction);
  };

  // Function to handle the "end reached" event
  onEndReached = async () => {
    const { nextPage, totalPages } = this.state;
    if (nextPage < totalPages) {
      this.apiCall();
    }
  };

  onChangeBottomTab = (key: number) => {
    const msg: Message = new Message(getName(key));
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  };

  bookNow = ()=>{
    const messages: Message = new Message(getName(MessageEnum.NavigationNewNotaryRequestMessage));
    const selectedRequest = {
      serviceId: '',
      serviceName: ''
    };
    messages.addData(getName(MessageEnum.CustomDataMessage), selectedRequest);
    messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(messages);
  }

  getPopularNotariesApi = () => {
    const params = `?page=${this.state.nextPage}&per_page=20`;
    this.setState({ loading: true });
    const header = {
      "Content-Type": configJSON.contentTypeApplicationJson,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getPopularNotariesApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.allPopularNotariesEndPoint + params
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getJurisdictionsApi = () => {
    const header = {
      "Content-Type": configJSON.contentTypeApplicationJson,
      token: this.state.token,
    };
    const requestMessages = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getJurisdictionsApiCallId = requestMessages.messageId;
    requestMessages.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getJurisdictionsEndPoint
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessages.id, requestMessages);
  };

  searchNotariesApi = (jurisdiction: string = "") => {
    this.setState({ loading: true });
    const params =
      "?query=" + this.state.searchQuery + "&jurisdiction=" + jurisdiction ||
      this.state.selectedJurisdiction;
    const header = {
      "Content-Type": configJSON.contentTypeApplicationJson,
      token: this.state.token,
    };
    const requestMessages = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.searchApiCallId = requestMessages.messageId;
    requestMessages.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.searchEndPoint + params
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessages.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessages.id, requestMessages);
  };

  // Customizable Area End
}
