import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";

interface ProfilePhoto {
  url: string | null;
}

interface ProfileAttributes {
  id: number;
  first_name: string | null;
  last_name: string | null;
  full_phone_number: string;
  city: string | null;
  post_code: string | null;
  country_code: string | null;
  phone_number: string | null;
  email: string;
  activated: boolean;
  user_type: string;
  user_name: string | null;
  platform: string | null;
  suspend_until: string | null;
  status: string;
  role_id: number;
  full_name: string;
  gender: string | null;
  date_of_birth: string | null;
  age: number | null;
  country: string | null;
  address: string | null;
  address_line_2: string | null;
  contact_name: string;
  company_name: string | null;
  photo: ProfilePhoto;
}

interface Jurisdiction {
  id: string | number,
  jurisdiction: string,
  created_at: string,
  updated_at: string
}

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


export interface PopularNotariesAttributes {
  photo: string,
  name: string,
  jurisdiction: string,
  rating: number,
  total_notaries: number
}

export interface ServiceItemType {
    id: string;
    type: string;
    attributes: ServiceAttributes;
}

export interface ServiceData {
  data: {
    id: string;
    type: string;
    attributes: ServiceAttributes;
  }
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
  UserProfileDetail: ProfileAttributes | null;
  isEditingLocation: boolean;
  profilePic:string;
  full_name:string;
  popularServices:ServiceItemType[];
  popularNotaries:PopularNotariesAttributes[],
  notaryServices:ServiceItemType[],
  jurisdictions:Jurisdiction[]
  searchQuery: string;
  selectedJurisdiction: string | null
  user_role:string
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CatalogueController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getProductApiCallId: any;
  getJurisdictionsApiCallId: any;
  getPopularServicesApiCallId: any;
  getPopularNotariesApiCallId: any;
  getNotaryServicesApiCallId: any;
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
      UserProfileDetail: null,
      profilePic: '',
      full_name: '',
      isEditingLocation: false,
      popularServices: [],
      popularNotaries: [],
      notaryServices: [],
      jurisdictions: [],
      searchQuery: '',
      selectedJurisdiction: null,
      user_role:''
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    this.getUserDetailData();
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
    setTimeout(() => {
      this.getJurisdictions();
      this.getPopularServices();
      this.getPopularNotaries();
      this.getNotaryServices();
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

  getListRequest = (token: any) => {
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getProductApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.productAPiEndPoint
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

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      const userData = message.getData(getName(MessageEnum.SessionResponseData));
      const userRole = JSON.parse(userData);
      this.setState({ token: token ,user_role: userRole.meta.role });
      this.getListRequest(token);

    }

    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    if (responseJson && !responseJson.errors) {
      if (apiRequestCallId === this.getJurisdictionsApiCallId) {
        this.setState({ jurisdictions: responseJson })
      }

      if (apiRequestCallId === this.getPopularServicesApiCallId) {
        this.setState({ popularServices: responseJson?.data?.data })
      }
      
      if (apiRequestCallId === this.getPopularNotariesApiCallId) {
        this.setState({ popularNotaries: responseJson.data })
      }

      if (apiRequestCallId === this.getNotaryServicesApiCallId) {
        this.setState({ notaryServices: responseJson.data })
      }

    }


    if (this.getProductApiCallId = apiRequestCallId) {
      if (responseJson && !responseJson.errors && responseJson.data) {
        this.setState({ arrayHolder: responseJson.data });
        runEngine.debugLog("arrayHolder", this.state.arrayHolder);
      } else {
        var errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }

  }

  
  onChangeBottomTab = (key:number)=>{
    const msg: Message = new Message(getName(key));
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

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
  
  getUserDetailData = async () => {
    const userDetail = await getStorageData("userProfileData");
    this.setState({ UserProfileDetail: JSON.parse(userDetail), profilePic: JSON.parse(userDetail).photo.url , full_name:JSON.parse(userDetail).full_name});
 
  };
  onTapToChange = () => {
    this.setState({ isEditingLocation: !this.state.isEditingLocation });
  };

  goTo =(key:number)=>{
    const messages: Message = new Message(getName(key));
    messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(messages);
  }

  onChange = (text: string) => {
    this.setState({ searchQuery: text })
  }

  onClickOfAvatatIcon = {
    onPress: () => {
      this.goTo(MessageEnum.NavigationMenuMessage)
    }
  }

  getJurisdictionData = () => {
    const { searchQuery, jurisdictions } = this.state;
    return searchQuery ? jurisdictions.filter(j =>
      j.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase())
    ) : jurisdictions
  }

  truncateText = (text: string, limit: number=100) => {
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + '...';
  };


  getPopularNotariesData = () => {
    const { selectedJurisdiction, popularNotaries } = this.state;
    return selectedJurisdiction ? popularNotaries.filter(j =>
      j.jurisdiction.toLowerCase().includes(selectedJurisdiction.toLowerCase())
    ) : popularNotaries
  }

  onSelectJurisdiction = (item: Jurisdiction) => {
    this.setState({ selectedJurisdiction: item.jurisdiction, isEditingLocation: false,searchQuery:'' })
  }

  getJurisdictions = () => {
    const header = {
      "Content-Type": configJSON.contentTypeApplicationJson,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getJurisdictionsApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getJurisdictionsEndPoint
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

  getPopularServices = () => {
    const header = {
      "Content-Type": configJSON.contentTypeApplicationJson,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getPopularServicesApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getPopularServicesEndPoint
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
  
  getNotaryServices = () => {
    const header = {
      "Content-Type": configJSON.contentTypeApplicationJson,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getNotaryServicesApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getNotaryServicesEndPoint
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

  getPopularNotaries = () => {
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
      configJSON.getPopularNotariesEndPoint
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

  continueAsGuestBtnProps = {
    onPress: () =>{
      const msg: Message = new Message(
        getName(MessageEnum.NavigationContinueAsGuestDashboardMessage)
      );
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    }
  }
  
  // Customizable Area End
}
