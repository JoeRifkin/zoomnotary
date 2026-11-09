import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start


interface ServiceIcon {
  url: string;
}

interface ServiceAttributes {
  id: number;
  service_icon: ServiceIcon;
  service_name: string;
  service_description: string;
  is_selected: boolean;
}

export interface ServiceItemType {
  id: string;
  type: string;
  attributes: ServiceAttributes;
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
  notaryServices: ServiceItemType[],
  user_role: string;
  loading: boolean;
  searchQuery: string
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CatalogueNotaryServicesController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getNotaryServicesApiCallId: string = '';
  searchApiCallId: string = '';
  debounceTimeout: any    // To store the timeout for debouncing
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
      notaryServices: [],
      user_role: '',
      loading: true,
      searchQuery: ""
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();

    setTimeout(() => {
      this.getNotaryServicesApi();
    }, 300);
    // Customizable Area End
  }

  // Customizable Area Start
  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

 
  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      const userData = message.getData(getName(MessageEnum.SessionResponseData));
      const userRole = JSON.parse(userData);
      this.setState({ token: token , user_role: userRole.meta.role })
    }

    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    setTimeout(() => {
      this.setState({loading:false})
    }, 500);

    if (responseJson && !responseJson.errors) {
      if (apiRequestCallId === this.getNotaryServicesApiCallId) {
        this.setState({ notaryServices: responseJson.data })
      }

      if (apiRequestCallId === this.searchApiCallId) {
        this.setState({ notaryServices: responseJson.data.services.data })
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
    this.props.navigation.goBack()
  }

  
  onChange = (value: string) => {
    this.setState({ searchQuery: value })

    // Clear the previous timeout if there is one
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    // Set a new timeout to debounce the API call
    this.debounceTimeout = setTimeout(() => {
      value === '' ? this.getNotaryServicesApi() : this.searchApi()
    }, 500);  // Debounce time in milliseconds (e.g., 500ms)
  }

 

  onClearSearch = () => {
    this.setState({ searchQuery: '' })
    this.getNotaryServicesApi()
  }


  truncateText = (text: string, limit:number) => {
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + '...';
  };

  onChangeBottomTab = (key:number)=>{
    const msg: Message = new Message(getName(key));
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  getNotaryServicesApi = () => {
    this.setState({loading:true})
    const header = {
      "Content-Type": configJSON.contentTypeApplicationJson,
      token: this.state.token,
    };
    const requestMessag = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getNotaryServicesApiCallId = requestMessag.messageId;
    requestMessag.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getNotaryServicesEndPoint
    );
    requestMessag.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessag.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessag.id, requestMessag);
  };

  searchApi = () => {
    this.setState({ loading: true })
    const params = '?query=' + this.state.searchQuery
    const header = {
      "Content-Type": configJSON.contentTypeApplicationJson,
      token: this.state.token,
    };
    const requestMessag = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.searchApiCallId = requestMessag.messageId;
    requestMessag.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.searchEndPoint + params
    );
    requestMessag.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessag.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessag.id, requestMessag);
  };

  // Customizable Area End
}
