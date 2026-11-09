import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { BackHandler } from 'react-native';
import { getStorageData, setStorageData } from 'framework/src/Utilities';
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  password: string;
  email: string;
  enablePasswordField: boolean;
  checkedRememberMe: boolean;
  placeHolderEmail: string;
  placeHolderPassword: string;
  imgPasswordVisible: any;
  imgPasswordInVisible: any;
  labelHeader: string;
  btnTxtLogin: string;
  labelRememberMe: string;
  btnTxtSocialLogin: string;
  labelOr: string;
  imgBackArrow: any;
  continueAsGuest: string;
  isEmailPassValid: boolean;
  isLoginFail: boolean;
  loginFailedMsg: string;
  isLoader: boolean
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailAccountLoginController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiEmailLoginCallId: string = "";
  validationApiCallId: string = "";
  emailReg: RegExp;
  labelTitle: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.ReciveUserCredentials),
    ];

    this.state = {
      email: "",
      password: "",
      enablePasswordField: true,
      checkedRememberMe: false,
      placeHolderEmail: configJSON.placeholderEmail,
      placeHolderPassword: configJSON.placeholderPassword,
      imgPasswordVisible: configJSON.imgPasswordVisible,
      imgPasswordInVisible: imgPasswordInVisible,
      labelHeader: configJSON.labelHeader,
      btnTxtLogin: configJSON.btnTxtLogin,
      labelRememberMe: configJSON.labelRememberMe,
      btnTxtSocialLogin: configJSON.btnTxtSocialLogin,
      labelOr: configJSON.labelOr,
      imgBackArrow: configJSON.imgBackArrow,
      continueAsGuest: configJSON.continueAsGuest,
      isEmailPassValid: false,
      isLoginFail: false,
      loginFailedMsg:"",
      isLoader: false
    };

    this.emailReg = new RegExp("");
    this.labelTitle = configJSON.labelTitle;
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    this.callGetValidationApi();
    this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    // Customizable Area Start
    this.props.navigation.addListener('willFocus', () => {
      this.send(new Message(getName(MessageEnum.RequestUserCredentials)));
    });
    // Customizable Area End
  }

  // Customizable Area Start
  
  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  validateEmail= (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email)
  }

  validatePassword = (pass: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
    return regex.test(pass)
  }

  btnEmailLogInProps = {
    onPress: () => this.doLogInWithEmail()
  };
  
 doLogInWithEmail() {
    //const deviceToken = await getStorageData("deviceToken");

    this.setState({isEmailPassValid: true});
    if ( this.isStringNullOrBlank(this.state.email) ||
      this.isStringNullOrBlank(this.state.password) ) {
      return false;
    } 
    if (!this.validateEmail(this.state.email)) {
      return false;
    }

    if (!this.validatePassword(this.state.password)) {
      return false;
    }
    this.setState({ isEmailPassValid: false, isLoader: true });
    
    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const attrs = {
      email: this.state.email,
      password: this.state.password,
      role: 'notary',
      user_type: "individual",
      //device_id: deviceToken   
    }

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
      configJSON.endPointOfLoginApi
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

  sendLoginFailMsg(responseJson: any) {
    this.setState({isLoginFail: true, loginFailedMsg: this.formatApiError(responseJson)})
  }

  formatApiError(apiError: any): string {
    if (apiError?.errors) {
      if (Array.isArray(apiError.errors)) {
        const firstErrorKey = Object.keys(apiError.errors[0])[0];
        return apiError.errors[0][firstErrorKey];
      } else {
        return apiError.errors;
      }
    }
    return "Please enter valid email or password";
  }

  sendLoginPassMsg() {
    this.setState({isLoginFail: false})
  }

  btnSignUpRedirect = {
    onPress: () => {
      this.clearPassword()
      this.props.navigation.navigate("LandingPage");
    }
  }

  btnPasswordShowHideProps = {
    onPress: () => {
      this.setState({ enablePasswordField: !this.state.enablePasswordField });
      this.txtInputPasswordProps.secureTextEntry =
        !this.state.enablePasswordField;
      this.btnPasswordShowHideImageProps.source = this.txtInputPasswordProps
        .secureTextEntry
        ? imgPasswordInVisible
        : imgPasswordVisible;
    }, 
  };

  // Web Event Handling
  handleClickShowPassword = () => {
    this.setState({
      enablePasswordField: !this.state.enablePasswordField,
    });
  };

  setEmail = (text: string) => {
    this.setState({
      email: text,
    });
  };

  setPassword = (text: string) => {
    this.setState({
      password: text,
    });
  };

  setRememberMe = (value: boolean) => {
    this.setState({ checkedRememberMe: value });
  };

  CustomCheckBoxProps = {
    onChangeValue: (value: boolean) => {
      this.setState({ checkedRememberMe: value });
      this.CustomCheckBoxProps.isChecked = value;
    },
    isChecked: false,
  };

  btnForgotPasswordProps =  () => {
      this.clearPassword()
      this.goToForgotPassword()
  };

  txtInputPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ password: text });

      //@ts-ignore
      this.txtInputPasswordProps.value = text;
    },
    secureTextEntry: true,
  };

  clearPassword = () => {
    // @ts-ignore
    this.txtInputPasswordProps.value = "";
    //@ts-ignore
    this.txtInputEmailProps.value = "";
    this.setState({ password: "", email: "", isLoginFail: false, checkedRememberMe: false });
  };

  btnPasswordShowHideImageProps = {
    source: imgPasswordInVisible,
    style:{height: 24, width: 24}
  };

  btnRememberMeProps = {
    onPress: () => {
      this.setState({ checkedRememberMe: !this.CustomCheckBoxProps.isChecked });
      this.CustomCheckBoxProps.isChecked = !this.CustomCheckBoxProps.isChecked;
    },
  };

  txtInputEmailWebProps = {
    onChangeText: (text: string) => {
      this.setState({ email: text });

      //@ts-ignore
      this.txtInputEmailProps.value = text;
    },
  };

  txtInputEmailMobileProps = {
    ...this.txtInputEmailWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputEmailProps = this.isPlatformWeb()
    ? this.txtInputEmailWebProps
    : this.txtInputEmailMobileProps;

  btnGoBack = {
    onPress: () => {
      BackHandler.exitApp();
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }
  
    getButtonEnable = () => {
      if(this.state.email && this.state.password){
        return true
      } else return false
    }

    gotoDashboardPage() {
      this.setState({isLoader: false}, () => {
        const msg: Message = new Message(
          getName(MessageEnum.NavigationDashboardMessage)
        );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
      })
    }
 
    continueAsGuestBtnProps = {
      onPress: () =>{
        const msg: Message = new Message(
          getName(MessageEnum.NavigationContinueAsGuestDashboardMessage)
        );
        msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msg);
      }
    }

    saveemail = async (responseJson: any) => {
      await setStorageData('email', responseJson.email)
      await setStorageData('token', responseJson.meta.token)
      await setStorageData('userprofile', JSON.stringify(responseJson))
    }
  // Customizable Area End

  async receive(from: string, message: Message) {
    // Customizable Area Start

    if (getName(MessageEnum.ReciveUserCredentials) === message.id) {
      const userName = message.getData(getName(MessageEnum.LoginUserName));

      const password = message.getData(getName(MessageEnum.LoginPassword));

      const countryCode = message.getData(
        getName(MessageEnum.LoginCountryCode)
      );

      if (!countryCode && userName && password) {
        this.setState({
          email: userName,
          password: password,
          checkedRememberMe: true,
        });

        //@ts-ignore
        this.txtInputEmailProps.value = userName;

        //@ts-ignore
        this.txtInputPasswordProps.value = password;

        this.CustomCheckBoxProps.isChecked = true;
      }
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId != null) {
        if (
          apiRequestCallId === this.validationApiCallId &&
          responseJson !== undefined
        ) {
          var arrayholder = responseJson.data;

          if (arrayholder && arrayholder.length !== 0) {
            let regexData = arrayholder[0];

            if (regexData && regexData.email_validation_regexp) {
              this.emailReg = new RegExp(regexData.email_validation_regexp);
            }
          }
        }

        if (apiRequestCallId === this.apiEmailLoginCallId) {
          if (responseJson && responseJson.meta && responseJson.meta.token) {
            // runEngine.unSubscribeFromMessages(this, this.subScribedMessages);
            this.saveLoggedInUserData(responseJson);
            this.sendLoginSuccessMessage();
            this.sendLoginPassMsg();
            this.gotoDashboardPage();
            this.clearPassword()
            this.saveemail(responseJson)
          } else {
            //Check Error Response
            // this.parseApiErrorResponse(responseJson);
            // this.sendLoginFailMessage();
            this.setState({isLoader: false}, () => {
              this.sendLoginFailMsg(responseJson);
            })
          }
        }
      }
    }
    // Customizable Area End
  }

  sendLoginFailMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginFaliureMessage));
    this.send(msg);
  }

  sendLoginSuccessMessage() {
    const msg: Message = new Message(getName(MessageEnum.LoginSuccessMessage));

    msg.addData(getName(MessageEnum.LoginUserName), this.state.email);
    msg.addData(getName(MessageEnum.CountyCodeDataMessage), null);
    msg.addData(getName(MessageEnum.LoginPassword), this.state.password);
    msg.addData(
      getName(MessageEnum.LoginIsRememberMe),
      this.state.checkedRememberMe
    );

    this.send(msg);
  }

  saveLoggedInUserData(responseJson: any) {
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      const msg: Message = new Message(getName(MessageEnum.SessionSaveMessage));

      msg.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify(responseJson)
      );
      msg.addData(
        getName(MessageEnum.SessionResponseToken),
        responseJson.meta.token
      );

      this.send(msg);
    }
  }

  openInfoPage() {
    // Merge Engine - Navigation - btnEmailLogIn - Start
    const msg: Message = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
    // Merge Engine - Navigation - btnEmailLogIn - End
  }

  goToForgotPassword() {
    // Merge Engine - Navigation - btnForgotPassword - Start
    const msg: Message = new Message(
      getName(MessageEnum.NavigationForgotPasswordMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.NavigationForgotPasswordPageInfo), "email");
    this.send(msg);
    // Merge Engine - Navigation - btnForgotPassword - End
  }

  goToSocialLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationSocialLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  async doEmailLogIn(): Promise<boolean> {
    alert(await getStorageData('deviceToken'))
    if (
      this.state.email === null ||
      this.state.email.length === 0 ||
      !this.emailReg.test(this.state.email)
    ) {
      this.showAlert("Error", configJSON.errorEmailNotValid);
      return false;
    }

    if (this.state.password === null || this.state.password.length === 0) {
      this.showAlert("Error", configJSON.errorPasswordNotValid);
      return false;
    }

    const header = {
      "Content-Type": configJSON.loginApiContentType,
    };

    const attrs = {
      email: this.state.email,
      password: this.state.password,
      device_id:await getStorageData('deviceToken')
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

  callGetValidationApi() {
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
    };

    const getValidationsMsg = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.validationApiCallId = getValidationsMsg.messageId;

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.urlGetValidations
    );

    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );
    getValidationsMsg.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(getValidationsMsg.id, getValidationsMsg);
  }
}
