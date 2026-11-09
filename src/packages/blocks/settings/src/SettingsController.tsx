import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPayment, imgChangePass, imgPasswordInVisible, imgPasswordVisible, imgQylified,
  imgSyncCalender, imgVatTax } from "./assets";
  import { getStorageData,removeStorageData } from 'framework/src/Utilities';
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  getUserRole: string;
  token: string;
  deleteaccountModal: boolean
  confirmdeleteaccountModal: boolean,
  isValidateFieldPassword: boolean,
  password:string,
  emailid:string,
  success:boolean,
  isLoader: boolean
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SettingsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  menuItems = [
    { icon: imgPayment, text: configJSON.payments, key: 'pay', users: ["notary"],screenName:MessageEnum.NavigationPaymentsMessage },
    { icon: imgChangePass, text: configJSON.changePassword, key: 'changePass', users: ['end_user', "notary"],screenName: MessageEnum.NavigationChangePasswordMessage },
    { icon: imgQylified, text: configJSON.qualifiedSignature, key: 'qulify', users: ['notary'] ,screenName:''},
    { icon: imgSyncCalender, text: configJSON.calendarSync, key: 'sync', users: ['end_user', "notary"],screenName: MessageEnum.NavigationCalendarSyncMessage },
    { icon: imgVatTax, text: configJSON.vatSalesTax, key: 'vat', users: ["notary"],screenName:'' }
  ];
  apiEmailLoginCallId: string = "";
  apiDeleteAccountCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      getUserRole: '',
      token: '',
      deleteaccountModal:false,
      confirmdeleteaccountModal:false,
      isValidateFieldPassword:false,
      password:"",
      emailid:"",
      success: false,
      isLoader: false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    
    this.storeMDataValue(message)

    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    if (apiRequestCallId === this.apiEmailLoginCallId)
       {
        this.setState({confirmdeleteaccountModal:false })
        this.setState({ isLoader: false })
      if (responseJson && responseJson.meta && responseJson.meta.token) {
       this.setState({confirmdeleteaccountModal:false })
  
       this.deleteAccountApi()
      } else {
        this.showAlert("Error", "Password is Wrong");
      }
    }
    else if (apiRequestCallId === this.apiDeleteAccountCallId)
    {
      this.setState({ isLoader: false })
      if (responseJson) 
    {
      if (responseJson.error)
      {
        this.showAlert("Error",responseJson.error);
      }
      else
      {
      this.setState({ success: true });
      const sessionMsg: Message = new Message(getName(MessageEnum.SessionSaveMessage));
     sessionMsg.addData(
      getName(MessageEnum.SessionResponseData),
      ''
    );
    sessionMsg.addData(
      getName(MessageEnum.SessionResponseToken),
      ''
    );
    this.send(sessionMsg)

    removeStorageData('userProfileData')
    removeStorageData('email')
    removeStorageData('token')
    removeStorageData('userprofile')
  }
      }
    }

    // Customizable Area End
  } 

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start

  componentDidMount = async () => {
    const loginemail= await getStorageData('email')
    this.setState({emailid:loginemail})
  };

  btnGoBack = {
    onPress: () => {
      if(this.props.navigation && this.props.navigation.goBack){
        this.props.navigation.goBack()
      }
    }
  }

  redirectToPage = async (key: string,screenName:number) => {
     if(key === 'vat'){
      const selectedRequest = {
        token: this.state.token,
        role: this.state.getUserRole,
      };

      const message = new Message(getName(MessageEnum.NavigationMessage));
      message.addData(
        getName(MessageEnum.NavigationTargetMessage),
        "VatSalesTax"
      );
  
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
  
      const raiseMessage: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      raiseMessage.addData(getName(MessageEnum.CustomDataMessage), selectedRequest);
      message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
  
      this.send(message);
    }

    if(screenName){
      const messages: Message = new Message(
        getName(screenName)
      );
      messages.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(messages);
    }
    
  }

  storeMDataValue = (message: Message) => {
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const myData = message.getData(
        getName(MessageEnum.CustomDataMessage)
      );
      if (myData) {
        this.setState({ token: myData.token, getUserRole: myData.role })
      }
    }
  }


  txtInputPasswordPrpos = {
    onChangeText: (text: string) => {
      this.setState({ password: text });
    }
  };

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }


  toggleDeleteAccountPopup = () => {
    this.setState({ deleteaccountModal: !this.state.deleteaccountModal })
  }

  onSubmitDeleteAccount=()=>{
    this.setState({ deleteaccountModal: false, confirmdeleteaccountModal:true })
  }

  toggleConfirmDeleteAccountPopup = () => {
    this.setState({ confirmdeleteaccountModal: !this.state.confirmdeleteaccountModal })
  }

  gotologinscreen = () => {
    const message: Message = new Message(
      getName(MessageEnum.NavigateEmailSignUpMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  }

  onDeleteAccount=()=>{
   
    this.doEmailLogIn()
    
  }

  doEmailLogIn(): boolean {
    this.setState({ isLoader: true })
    if (this.isStringNullOrBlank(this.state.password)) {
      this.setState({isValidateFieldPassword: true})
      return false;
    }

    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const attrs = {
      email: this.state.emailid,
      password: this.state.password,
    };

    const data = {
      type: "email_account",
      attributes: attrs,
    };

    const httpBody = {
      data: data,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiEmailLoginCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.loginAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.loginAPiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  deleteAccountApi() {
    this.setState({ isLoader: true })
    const header = {
      token: this.state.token,
      "Content-Type": configJSON.loginApiContentType,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiDeleteAccountCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.deleteAccountAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.DELETE
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  // Customizable Area End
}
