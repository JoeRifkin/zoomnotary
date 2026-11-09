import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {Linking} from "react-native";
import { imgAvatarUser, imgDownArrow, imgUpArrow } from "./assets";
import { getStorageData, removeStorageData, setStorageData } from "../../../framework/src/Utilities";

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

interface FAQ {
  id: number;
  question: string;
  answer: string;
  created_at: string; 
  updated_at: string;
}

interface FAQData {
  faq_title: string;
  faqs: FAQ[];
}

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  drawerContent?: boolean;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  webDrawer: boolean;
  token: any;
  drawerItems: any;
  isOnlineStatus: boolean
  getUserRole: any
  UserProfileDetail: ProfileAttributes | null;
  logoutModal: boolean;
  FAQsData : FAQ[];
  filteredFAQsData: FAQ[];
  isLoader: boolean;
  searchQuery: string;
  openedQueNo: number | null;
  isFAQsPageOpen: boolean
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class NavigationMenuController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiGetDataCallId: string = "";
  faqDataApiCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      webDrawer: false,
      token: "",
      drawerItems: [],
      isOnlineStatus: true,
      getUserRole: "",
      UserProfileDetail: null,
      logoutModal:false,
      FAQsData: [],
      isLoader: false,
      searchQuery: "",
      openedQueNo: null,
      filteredFAQsData:[],
      isFAQsPageOpen: false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.getUserDetail()
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      const userData = message.getData(getName(MessageEnum.SessionResponseData));
      const userRole = JSON.parse(userData);
      this.setState({ getUserRole: userRole.meta.role, token: userRole.meta.token }, () => {
        this.getFaqData()
      })
    } else if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.apiGetDataCallId !== "" &&
      this.apiGetDataCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson) {
        this.setState({ drawerItems: responseJson });
      } else {
        this.parseApiErrorResponse(responseJson);
      }
    } else if(this.faqDataApiCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))){
      this.handleFAQsApiResponse(message)
    }
    // Customizable Area End
  }

  // Customizable Area Start

  handleFAQsApiResponse = (message: Message) => {
    const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
    if(responseJson.faqs){
      this.setState({filteredFAQsData: responseJson.faqs, FAQsData: responseJson.faqs, isLoader: false})
    }
  }

  getUserDetail = async () => {
    const userDetail = await getStorageData('userProfileData');
    this.setState({UserProfileDetail: userDetail ? JSON.parse(userDetail) : {}})
  }

  redirectToPage = async (key: string) => {
    if (key === 'tandc' || key === 'pandp') {
      await setStorageData("selectedMenu", key)
      const msg: Message = new Message(
        getName(MessageEnum.NavigationTermAndConditionMessage)
      );
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    } else if(key === 'profile'){
      const msg: Message = new Message(
        getName(MessageEnum.NavigationBasicUserProfileMessage)
      );
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    } else if(key === 'service'){
      const msg: Message = new Message(
        getName(MessageEnum.NavigationNotaryServicesMessage)
      );
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    } else if(key === 'pay'){
      const msg: Message = new Message(
        getName(MessageEnum.NavigationTransactionHistoryMessage)
      );
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    } else if(key === 'setting'){
      const messages: Message = new Message(
        getName(MessageEnum.NavigationSettingsMessage)
      );
      const selectedRequest = {
        token: this.state.token,
        role: this.state.getUserRole,
      };
      messages.addData(getName(MessageEnum.CustomDataMessage), selectedRequest);
      messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(messages);
    } else if(key === 'faq'){
      this.setState({isFAQsPageOpen: true})
    }
  }

  btnGoBackToMenuPage = {
    onPress: () => {
      this.setState({isFAQsPageOpen: false})
    }
  }

  getSelectedFaqsques = (indexNo: number) => {
    if(this.state.openedQueNo === indexNo){
      return true
    } else {
      return false
    }
  }

  getSelectedFaqArroqImg = (indexNo: number) => {
    if(this.state.openedQueNo === indexNo){
      return imgUpArrow
    } else {
      return imgDownArrow
    }
  }

  getFaqData = () => {
    const header = {
      "Content-Type": configJSON.jsonApiContentType
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.faqDataApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.faqsApiEndpoint
    );

    requestMessage.addData(
       getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage), 
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    
  }

  handleEmailLink = { 
    onPress: () => {
      Linking.openURL(`mailto:mail_id@gmail.com`);
    }
  };

  onChangeTxtValueProps = {
    onChangeText: (text: string) => {
      const trimmedText = text.trim();
    const { FAQsData } = this.state;
  
    const filteredFAQsData =
      trimmedText === ""
        ? FAQsData
        : FAQsData.filter(
            (faq) =>
              faq.question.toLowerCase().includes(trimmedText.toLowerCase()) ||
              faq.answer.toLowerCase().includes(trimmedText.toLowerCase())
          );
  
    this.setState({
      filteredFAQsData,
      searchQuery: text,
      openedQueNo: null,
    });
    }
  };  

  toggleQuestion = (index: number) =>{
    if(this.state.openedQueNo === index){
      this.setState({openedQueNo: null})
    } else {
      this.setState({openedQueNo: index})
    }
  }

  changeStatus = () => {
    this.setState({isOnlineStatus: !this.state.isOnlineStatus})
  }

  toggleDrawer = (event: any) => {
    
  };

  onPressMenuItem = (menuItem: any) => {
    
  };

  userProfileProps = {
    source: imgAvatarUser,
  };

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
  }

  getToken = async () => {
    const userDetail = await getStorageData('userProfileData');
    this.setState({UserProfileDetail: userDetail ? JSON.parse(userDetail) : {}})
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  btnGoBack = {
    onPress: () => {
      if(this.props.navigation && this.props.navigation.goBack){
        this.props.navigation.goBack()
      }
    }
  }

  // show the logout modal or close it 
  toggleLogoutPopup = () => {
    this.setState({ logoutModal: !this.state.logoutModal })
  }

  // logging out the user from the app
  onSubmitLogout=()=>{
    
    const sessionMsg: Message = new Message(getName(MessageEnum.SessionSaveMessage));
    sessionMsg.addData(
      getName(MessageEnum.SessionResponseData),
      ''
    );
    sessionMsg.addData(
      getName(MessageEnum.SessionResponseToken),
      ''
    );
    sessionMsg.addData(
      getName(MessageEnum.SessionSaveMessage),
      ''
    );
    sessionMsg.addData(
      getName(MessageEnum.SessionRequestMessage),
      ''
    );
    this.send(sessionMsg)

    removeStorageData('userProfileData')
    removeStorageData('email')
    removeStorageData('token')
    removeStorageData('userprofile')
    removeStorageData('accessToken') // microsot login access token
    removeStorageData('refreshToken') // microsoft login refresh token
    removeStorageData('UserType');
    removeStorageData('signUpUserDetail')
    removeStorageData('deviceToken');
    // navigating back to login screen
    this.setState({ logoutModal: false }, () => {
      const message: Message = new Message(
        getName(MessageEnum.NavigationEmailLogInMessage)
      );
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(message);
    })
  }

  // Customizable Area End
}
