import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import * as Yup from "yup";
import { imgPasswordVisible, imgPasswordInVisible } from "./assets";
let tokenValue = ""
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  accountType: string;
  emailSchema: any;
  phoneSchema: any;
  otpSchema: any;
  accountStatus: any;
  passwordRules: any;
  emailValue: any;
  phoneValue: any;
  countryCodeSelected: any;
  token: any;
  enablePasswordField: Boolean;
  btnConfirmPasswordShowHide: Boolean;
  email: string;
  isValidateField: boolean;
  msgValidationType: string;
  reTypePassword: string;
  password: string;
  enableReTypePasswordField: boolean;
  changePassWOrdSuccessFull: boolean;
  isOTPViewDisplay:boolean;
  otpInput: any,
  timer: number,
  isValidation: boolean;
  errorMsg: string;
  otpToken: any;
  isErrorMsg: boolean;
  firstValidationPass: boolean;
  secValidationPass: boolean;
  thiredValidationPass: boolean;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  navigation: any;
  // Customizable Area End
}

// Customizable Area Start
// Customizable Area End

export default class ForgotPasswordController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  validationAPICallId: any;
  requestEmailOtpCallId: any;
  requestEmailVerifyCallId: any;
  requestPhoneOtpCallId: any;
  requestChangePasswordCallId: any;
  requestGoToConfirmationCallId: any;
  otpToken: any;
  isChangePassword: boolean = false;
  getOtpAuthApiCallId: any;
  otpAuthConfirmApiCallId: any
  //Properties from config
  labelTextIsAccountRecovery: string = configJSON.labelTextIsAccountRecovery;
  secondLabelText: string = configJSON.secondLabelText;
  thirdLabelText: string = configJSON.thirdLabelText;
  forthLabelText: string = configJSON.forthLabelText;
  fifthLabelText: string = configJSON.fifthLabelText;
  sixthLabelText: string = configJSON.sixthLabelText;
  firstInputAutoCompleteType: any = configJSON.firstInputAutoCompleteType;
  firstInputKeyboardStyle: any = configJSON.firstInputKeyboardStyle;
  firstInputPlaceholder: string = configJSON.firstInputPlaceholder;
  firstInputErrorColor: any = configJSON.firstInputErrorColor;
  buttonTextIsNext: string = configJSON.buttonTextIsNext;
  buttonColorForNextButton: any = configJSON.buttonColorForNextButton;
  secondInputAutoCompleteType: any = configJSON.secondInputAutoCompleteType;
  secondInputKeyboardType: any = configJSON.secondInputKeyboardType;
  secondInputPlaceholder: string = configJSON.secondInputPlaceholder;
  secondInputErrorColor: any = configJSON.secondInputErrorColor;
  thirdInputPlaceholder: string = configJSON.thirdInputPlaceholder;
  thirdInputErrorColor: any = configJSON.thirdInputErrorColor;
  buttonTitleIsSMSPhoneAccount: string =
    configJSON.buttonTitleIsSMSPhoneAccount;
  buttonTitleIsEmailAccount: string = configJSON.buttonTitleIsEmailAccount;
  labelTextIsPleaseEnterYourNewPassword: string =
    configJSON.labelTextIsPleaseEnterYourNewPassword;
  labelTextIsYourPasswordHasBeenSuccessfullyChanged: string =
    configJSON.labelTextIsYourPasswordHasBeenSuccessfullyChanged;
  placeholderIsPassword: string = configJSON.placeholderIsPassword;
  imgPasswordInVisible: any = imgPasswordInVisible;
  imgPasswordVisible: any = imgPasswordVisible;
  placeholderIsReTypePassword: string = configJSON.placeholderIsReTypePassword;
  buttonTitleIsOk: string = configJSON.buttonTitleIsOk;
  buttonColorForOkButton: any = configJSON.buttonColorForOkButton;
  countryCodeSelectorPlaceholder: string =
    configJSON.countryCodeSelectorPlaceholder;
    timerInterval: NodeJS.Timeout;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage),
      // Customizable Area End
    ];

    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    //email schema
    let emailSchema = {
      email: Yup.string()
        .email(configJSON.pleaseEnterAValidEmail)
        .required(configJSON.emailIsRequired),
    };

    //phone schema
    let phoneSchema = {
      // countryCode: Yup.number()
      // .required("Country code is required"),

      phone: Yup.string()
        .matches(configJSON.phoneRegExp, configJSON.phoneNumberIsNotValid)
        .required(configJSON.phoneNumberIsRequired),
    };

    //otpSchema
    let otpSchema = {
      otpCode: Yup.number().min(4).required(configJSON.otpCodeIsRequired),
    };

    this.state = {
      accountType: "sms",
      accountStatus: "ChooseAccountType",
      emailValue: "",
      phoneValue: "",
      countryCodeSelected: "",
      passwordRules: "",
      emailSchema: emailSchema,
      phoneSchema: phoneSchema,
      otpSchema: otpSchema,
      token: "",
      enablePasswordField: true,
      btnConfirmPasswordShowHide: true,
      email: "",
      isValidateField: false,
      msgValidationType: 'info',
      reTypePassword: "",
      password: "",
      enableReTypePasswordField: true,
      changePassWOrdSuccessFull: true,
      isOTPViewDisplay: false,
      otpInput:"",
      timer: 150,
      isValidation: false,
      errorMsg: "",
      otpToken: "",
      isErrorMsg: false,
      firstValidationPass: false,
      secValidationPass: false,
      thiredValidationPass: false
    };
    this.timerInterval = setTimeout(() => {}, 0);
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    this.validationRulesRequest();
  }

  validationRulesRequest = () => {
    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.validationAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.profileValidationSettingsAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  async receive(from: string, message: Message) {
    // Customizable Area Start

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      this.manageResponse(message, responseJson)
    }
    
    // Customizable Area End
  }

  startForgotPassword(accountType: String) {
    this.setState({
      accountStatus: accountType === "sms" ? "EnterPhone" : "EnterEmail",
    });
  }

  goToOtpAfterEmailValidation(values: { accountType: string; email: string }) {
    //change status to OTP
    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    //GO TO REQUEST STATE
    this.requestEmailOtpCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.passwordRecoveryStartOtpAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    this.setState({
      emailValue: values.email ? values.email : "",
    });

    const data = {
      type: values.accountType ? values.accountType : "email_account",
      attributes: {
        email: values.email ? values.email : "",
      },
    };

    const httpBody = {
      data: data,
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  goToOtpAfterPhoneValidation(values: { phone: string }) {
    // console.log("entered phone validation code");
    if (
      !this.state.countryCodeSelected ||
      this.state.countryCodeSelected.length === 0
    ) {
      this.showAlert(
        configJSON.goToOtpAfterPhoneValidationErrorTitle,
        configJSON.goToOtpAfterPhoneValidationErrorBody
      );
      return;
    }
    console.log(this.state.countryCodeSelected);
    //change status to OTP
    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    //GO TO REQUEST STATE
    this.requestPhoneOtpCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.passwordRecoveryStartOtpAPiEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    this.setState({
      phoneValue:
        this.state.countryCodeSelected && values.phone
          ? this.state.countryCodeSelected + values.phone
          : "",
    });

    const data = {
      type: "sms_account",
      attributes: {
        full_phone_number: this.state.phoneValue,
      },
    };

    const httpBody = {
      data: data,
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  goToChangePasswordAfterOtp(values: { otpCode: string }) {
    //change status to change password
    //change status to OTP
    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    //GO TO REQUEST STATE
    this.requestChangePasswordCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.passwordRecoveryConfirmOtpAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    const data = {
      token: this.otpToken ? this.otpToken : "",
      otp_code: values.otpCode ? values.otpCode : "",
    };

    const httpBody = {
      data: data,
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  goToConfirmationAfterPasswordChange(values: {
    password: any;
    confirmPassword: any;
  }) {
    const header = {
      "Content-Type": configJSON.forgotPasswordAPiContentType,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    //GO TO REQUEST STATE
    this.requestGoToConfirmationCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.passwordRecoveryChangePasswordAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    const data = {
      token: this.otpToken ? this.otpToken : "",
      new_password: values.password,
    };

    const httpBody = {
      data: data,
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpPostMethod
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  goToHome() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationHomeScreenMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  goToLogin() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  // Customizable Area Start

  manageResponse = (message: Message, responseJson: any) => {
    if (this.requestEmailVerifyCallId !== null && this.requestEmailVerifyCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
        if (responseJson && responseJson.meta && responseJson.meta.email_otp_token) {
        this.otpToken = responseJson.meta;
        
        this.setState({ otpToken: this.otpToken, isOTPViewDisplay: true, isValidation: false, isErrorMsg: false }, () => {
          this.startTimer();
        });
      } else {
        this.handleSuccessResponse(responseJson, () => {}, message);
      }
    } else if (this.otpAuthConfirmApiCallId !== null && this.otpAuthConfirmApiCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
        this.handleSuccessResponse(responseJson, this.handleOtpAuthConfirmSuccess, message);
    } else if (this.requestChangePasswordCallId !== null && this.requestChangePasswordCallId === message.getData(getName(MessageEnum.RestAPIResponceDataMessage))) {
        this.handleSuccessResponse(responseJson, () => this.setState({ changePassWOrdSuccessFull: false }), message);
    }
  }

  handleSuccessResponse = (responseJson: any, successCallback: any, message: Message) => {
    if (responseJson !== undefined && !responseJson.errors) {
      successCallback();
    } else if (responseJson && responseJson.errors) {
      this.setState({
        isValidation: true,
        isErrorMsg: true,
        errorMsg: responseJson.errors[0].otp || responseJson.errors[0].detail
      });
    } else {
      const errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      this.parseApiCatchErrorResponse(errorReponse);
    }
  };
  
  handleOtpAuthConfirmSuccess = () => {
    const msg = new Message(getName(MessageEnum.NavigationNewPasswordMessage));
    msg.addData(getName(MessageEnum.AuthTokenDataMessage), this.state.otpToken);
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  };

  getImageForValidation = () => {
    if(this.state.password.length >= 8){
      this.setState({firstValidationPass: true})
    } else {
      this.setState({firstValidationPass: false})
    }
    if(this.validatePasswordForSec()){
      this.setState({secValidationPass: true})
    }else {
      this.setState({secValidationPass: false})
    }
    if(this.validatePasswordForThired()){
      this.setState({thiredValidationPass: true})
    }else {
      this.setState({thiredValidationPass: false})
    }
  }

  validatePasswordForSec = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    return regex.test(this.state.password);
  }

  validatePasswordForThired = () => {
    const regex = /^(^\S.*\S$|^\S?)$/;
    return regex.test(this.state.password);
  }

  getSecondErrorOnRePass = () => {
    if(!this.isStringNullOrBlank(this.state.reTypePassword) && this.state.password !== this.state.reTypePassword){
      return true
    } else return false
  }

  btnGoBack = {
    onPress: () => {
      if(this.props.navigation && this.props.navigation.goBack){
        this.props.navigation.goBack()
      }
    }
  }
  
  btnLoginRedirect = {
    onPress: () => {
      const msg: Message = new Message(
        getName(MessageEnum.NavigationEmailLogInMessage)
      );
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    }
  }

  getButtonEnable = () => {
    if(this.state.email){
      return true
    } else return false
  }

  getBtnEnable = () => {
    if(this.state.password && this.state.reTypePassword){
      return true
    } else return false
  }

  validateEmail= (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    return regex.test(email)
  }

  txtInputEmailMobilePrpos = {
    onChangeText: (text: string) => {
      this.setState({ email: text, isErrorMsg: false, isValidation: false });
      //@ts-ignore
      this.txtInputEmailPrpos.value = text;
    },
    keyboardType: "email-address"
  };

  txtInputEmailPrpos = this.txtInputEmailMobilePrpos;

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  btnResetPassProps = {
    onPress: () => this.resetPassword()
  }

  resetPassword(): boolean {
    this.setState({isValidateField: true})
    if (this.isStringNullOrBlank(this.state.password) || 
      this.isStringNullOrBlank(this.state.reTypePassword) ) {
      return false;
    }

    if (!this.validatePassword(this.state.password)) {
      return false;
    }

    if (this.state.password !== this.state.reTypePassword) {
      return false;
    }
    this.setState({isValidateField: false})

    const header = {
      "Content-Type": configJSON.validationApiContentType
    };

    const attrs = {
      token: tokenValue,
      password_confirmation: this.state.reTypePassword,
      password: this.state.password,
    }

    const httpBody = {
      data: attrs,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.requestChangePasswordCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.forgetPasswordApiEndpoint
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
      configJSON.httpPostMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true
  }

  btnNextProps = {
    onPress: () => this.sendEmailVerifiy()
  };

  sendEmailVerifiy(): boolean {
    this.setState({isValidateField: true })
    if ( this.isStringNullOrBlank(this.state.email) ) {
      return false;
    }

    if (!this.validateEmail(this.state.email)) {
      return false;
    }
    this.setState({isValidateField: false})

    const header = {
      "Content-Type": configJSON.validationApiContentType
    };
    
    const attrs = {
      email: this.state.email,
    }
    
    const data = {
      attributes: attrs
    };

    const httpBody = {
      data: data
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.requestEmailVerifyCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.sendOTPApiEndpoint
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
      configJSON.httpPostMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  txtInputConfirmPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ reTypePassword: text });

      //@ts-ignore
      this.txtInputConfirmPasswordProps.value = text;
    },
    secureTextEntry: true
  };

  txtInputPasswordProps = {
    onChangeText: (text: string) => {
      this.setState({ password: text }, () => {
        this.getImageForValidation()
      });

      //@ts-ignore
      this.txtInputPasswordProps.value = text;
    },
    secureTextEntry: true
  };

  imgEnableRePasswordFieldProps = {
    source: imgPasswordInVisible
  };

  btnConfirmPasswordShowHideProps = {
    onPress: () => {
      this.setState({
        enableReTypePasswordField: !this.state.enableReTypePasswordField
      });
      this.txtInputConfirmPasswordProps.secureTextEntry = !this.state
        .enableReTypePasswordField;
      this.imgEnableRePasswordFieldProps.source = this
        .txtInputConfirmPasswordProps.secureTextEntry
        ? imgPasswordInVisible
        : imgPasswordVisible;
    }
  };

  imgEnablePasswordFieldProps = {
    source: imgPasswordInVisible
  };

  btnPasswordShowHideProps = {
    onPress: () => {
      this.setState({ enablePasswordField: !this.state.enablePasswordField });
      this.txtInputPasswordProps.secureTextEntry = !this.state
        .enablePasswordField;
      this.imgEnablePasswordFieldProps.source = this.txtInputPasswordProps
        .secureTextEntry
        ? imgPasswordInVisible
        : imgPasswordVisible;
    }
  };

  validatePassword = (pass: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
    return regex.test(pass)
  }

  getButtonEnableForOTP = () => {
    if (this.state.otpInput.length === configJSON.otpSizeBox) {
      return true
    } else {
      return false
    }
  }

  onFinishCheckingCode1 = (code: any) => {
    this.setState({otpInput: code, isErrorMsg: false, isValidation: false})
  }

  handleResendOtp = () => {
    this.sendEmailVerifiy()
    clearInterval(this.timerInterval);
    this.setState({ timer: 150, otpInput: "" });
  };

  startTimer = () => {
    this.timerInterval = setInterval(() => {
      if (this.state.timer > 0) {
        this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  };

  btnResnedProps = {
    onPress: () => {
      if(this.state.timer === 0){
        this.handleResendOtp();
      }
    }
  }

  submitOtp(): boolean {
    this.setState({isValidation: true});
    if (!this.getButtonEnableForOTP()) {
      return false;
    } 
    this.setState({ isValidation: false});

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    
    const headers = {
      "Content-Type": configJSON.validationApiContentType,
    };

    tokenValue = this.state.otpToken.email_otp_token;
    const attrs = {
      token: this.state.otpToken.email_otp_token,
      otp_code: this.state.otpInput
    }
    
      const httpBody = {
        data: attrs,
      };

      this.otpAuthConfirmApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.otpVerifyApiEndpoint
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(headers)
      );

      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.httpPostMethod
      );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  btnSubmitOTPProps = {
    onPress: () => {this.submitOtp()}
  };

  btnGoBackForOTP = {
    onPress: () => {
      clearInterval(this.timerInterval);
      this.setState({isOTPViewDisplay: false, isErrorMsg: false, timer: 150, otpInput: ""})
    }
  }

  btnGoBackOnSucess = {
    onPress: () => {
      this.setState({changePassWOrdSuccessFull: true}) 
    }
  }

  // Customizable Area End
}
