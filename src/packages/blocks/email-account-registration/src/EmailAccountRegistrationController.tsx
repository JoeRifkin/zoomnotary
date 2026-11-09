import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorageData, setStorageData } from 'framework/src/Utilities';
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

export interface S {
  // Customizable Area Start
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  otpAuthToken: string;
  reTypePassword: string;
  data: any[];
  passwordHelperText: string;
  enablePasswordField: boolean;
  enableReTypePasswordField: boolean;
  countryCodeSelected: string;
  phone: string;
  isIndividualSelected: boolean;
  isBusinessSelected: boolean;
  businessName: string;
  isValidateField: boolean;
  isSignUpFailed: boolean;
  signUpFailedMsg: string;
  selectedUser: any;
  selectedCountry: string
  countryList: any;
  firstValidationPass: boolean;
  secValidationPass: boolean;
  thiredValidationPass: boolean;
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class EmailAccountRegistrationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  arrayholder: any[];
  passwordReg: RegExp;
  emailReg: RegExp;
  createAccountApiCallId: any;
  getCountryApiCallId: any;
  validationApiCallId: string = "";

  imgPasswordVisible: any;
  imgPasswordInVisible: any;

  labelHeader: any;
  labelFirstName: string;
  lastName: string;
  labelEmail: string;
  labelOfPass: string;
  labelOfRePass: string;
  labelLegalText: string;
  labelLegalTermCondition: string;
  labelLegalPrivacyPolicy: string;
  btnTextSignUp: string;
  currentCountryCode: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.CountryCodeMessage)
    ];
    this.receive = this.receive.bind(this);
    this.isStringNullOrBlank = this.isStringNullOrBlank.bind(this);

    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    this.state = {
      // Customizable Area Start
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      reTypePassword: "",
      otpAuthToken: "",
      data: [],
      passwordHelperText: "",
      enablePasswordField: true,
      enableReTypePasswordField: true,
      countryCodeSelected: "",
      phone: "",
      isIndividualSelected: true,
      isBusinessSelected: false,
      businessName: "",
      isValidateField: false,
      isSignUpFailed: false,
      signUpFailedMsg: '',
      selectedUser: this.fetchUserType(),
      selectedCountry: "",
      countryList: undefined,
      firstValidationPass: false,
      secValidationPass: false,
      thiredValidationPass: false
      // Customizable Area End
    };

    // Customizable Area Start
    this.arrayholder = [];

    this.passwordReg = new RegExp("\\w+");
    this.emailReg = new RegExp("\\w+");

    this.imgPasswordVisible = imgPasswordVisible;
    this.imgPasswordInVisible = imgPasswordInVisible;

    this.labelHeader = configJSON.labelHeader;
    this.labelFirstName = configJSON.labelName;
    this.lastName = configJSON.lastName;
    this.labelEmail = configJSON.labelEmail;
    this.labelOfPass = configJSON.labelOfPass;
    this.labelOfRePass = configJSON.labelOfRePass;
    this.labelLegalText = configJSON.labelLegalText;
    this.labelLegalTermCondition = configJSON.labelLegalTermCondition;
    this.labelLegalPrivacyPolicy = configJSON.labelLegalPrivacyPolicy;
    this.btnTextSignUp = configJSON.btnTextSignUp;
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );

      if (apiRequestCallId && responseJson) {
        this.manageApiResponse(responseJson, apiRequestCallId, errorReponse);
      }
    }

    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const otpAuthTkn = message.getData(
        getName(MessageEnum.AuthTokenDataMessage)
      );
      if (otpAuthTkn && otpAuthTkn.length > 0) {
        this.setState({ otpAuthToken: otpAuthTkn });
        runEngine.debugLog("otpAuthTkn", this.state.otpAuthToken);
        runEngine.unSubscribeFromMessages(this as IBlock, [message.id]);
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start

  manageApiResponse = async (responseJson: any, apiRequestCallId: string, errorResponse: any) => {
    switch (apiRequestCallId) {
      case this.validationApiCallId:
        this.handleValidationResponse(responseJson);
        break;
      case this.createAccountApiCallId:
        await this.handleCreateAccountResponse(responseJson, errorResponse);
        break;
      case this.getCountryApiCallId:
        this.handleCountryResponse(responseJson);
        break;
      default:
        break;
    }
  }
  
  handleValidationResponse = (responseJson: any) => {
    const arrayHolder = responseJson.data;
    if (!arrayHolder || arrayHolder.length === 0) return;
  
    const regexData = arrayHolder[0];
    if (regexData.password_validation_regexp) {
      this.passwordReg = new RegExp(regexData.password_validation_regexp);
    }
    if (regexData.password_validation_rules) {
      this.setState({
        passwordHelperText: regexData.password_validation_rules
      });
    }
    if (regexData.email_validation_regexp) {
      this.emailReg = new RegExp(regexData.email_validation_regexp);
    }
  }
  
  handleCreateAccountResponse = async (responseJson: any, errorResponse: any) => {
    if (!responseJson.errors) {
      const userDetails = {
        email: responseJson.data.attributes.email,
        meta: responseJson.meta,
        full_name: this.state.firstName
      };
      this.redirectToOtpPage(userDetails)
    } else {
      if(responseJson.errors && responseJson.errors[0] && responseJson.errors[0].isOtpVerified === false){
        const metaToken = {
          token: responseJson.errors[0].token,
          email_otp_token: responseJson.errors[0].email_otp_token,
        }
        const userDetails = {
          email: this.state.email,
          meta: metaToken,
          full_name: this.state.firstName
        };
        this.redirectToOtpPage(userDetails)
      }
      this.setState({
        signUpFailedMsg: this.formatApiError(responseJson),
        isSignUpFailed: true
      });
    }
    this.parseApiCatchErrorResponse(errorResponse);
  }
  
  handleCountryResponse = (responseJson: any) => {
    if (!responseJson.errors) {
      this.getCustmizeCountryList(responseJson.data);
    }
  }

  redirectToOtpPage = async(userDetails: any) => {
    const signUpDetail = JSON.stringify(userDetails);
    this.saveLoggedInUserData(userDetails)
    this.saveemail(userDetails)
    await AsyncStorage.setItem('signUpUserDetail', signUpDetail);
    const msg: Message = new Message(
      getName(MessageEnum.NavigationMobilePhoneOTPMessage)
    );
    msg.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );
    this.send(msg);
  }

  saveLoggedInUserData(responseJson: any) {
    if (responseJson && responseJson.meta && responseJson.meta.token) {
      responseJson.meta.role = this.state.selectedUser === "need" ? 'end_user' : 'notary';
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
  saveemail = async (responseJson: any) => 
    {
      await setStorageData('email', responseJson.email)
      await setStorageData('token', responseJson.meta.token)
    }
  getCustmizeCountryList = (country: any) => {
    const transformedData = country.map((item: any, index: number) => {
      return {
          label: item.attributes.name,
          value: item.attributes.name
      };
    });
    this.setState({countryList: transformedData})
  }

  callApiForGetCountry(): boolean {
    
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getCountryApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getCountryAPiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({})
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

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

  formatApiError(apiError: any): string {
    if(apiError.errors && apiError.errors[0].msg){
      return apiError.errors[0].msg;
    } else {
      if (apiError.errors) {
        if (Array.isArray(apiError.errors)) {
          const firstErrorKey = Object.keys(apiError.errors[0])[0];
          return apiError.errors[0][firstErrorKey];
        } else if (typeof apiError.errors === 'object') {
          const errorField = Object.keys(apiError.errors)[0];
          return apiError.errors[errorField][0];
        } else {
          return apiError.errors.toString();;
        }
      }
    }
    return "Something went wrong";
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

  btnTabIndividualProps = {
    onPress: () => {
      const inputFields = [
        'txtInputFirstNamePrpos',
        'txtInputBusinessNamePrpos',
        'txtInputEmailPrpos',
        'txtInputPasswordProps',
        'txtInputConfirmPasswordProps'
      ];
      inputFields.forEach(field => {
        // @ts-ignore
        this[field].value = "";
      });
      this.setState({isIndividualSelected: !this.state.isIndividualSelected, isBusinessSelected: !this.state.isBusinessSelected, email: "",  password: "", reTypePassword: "", businessName: '', firstName: "" });
    },
  };

  isStringNullOrBlank(str: string) {
    return str === null || str.length === 0;
  }

  isStringNullOrBlankAndFullName(fullName: string) {
    return fullName === null || fullName.length === 0 || fullName.trim().split(' ').length < 2;
  }

  getRoleId = () => {
    if(this.state.selectedUser === "need") {
      return 1
    } else {
      return 2
    }
  }

  getUserType = () => {
    if(this.state.isIndividualSelected) {
      return "individual"
    } else {
      return "business"
    }
  }

  async createAccount(): Promise<boolean> {

    this.setState({isValidateField: true, isSignUpFailed: false, signUpFailedMsg: ''})
    if ( this.isStringNullOrBlankAndFullName(this.state.firstName) ||
      this.isStringNullOrBlank(this.state.email) ||
      this.isStringNullOrBlank(this.state.password) ||
      this.isStringNullOrBlank(this.state.reTypePassword)) {
      return false;
    }

    if (this.state.isBusinessSelected && this.isStringNullOrBlank(this.state.businessName)) {
      return false;
    }

    if (this.state.selectedUser === 'am' && this.isStringNullOrBlank(this.state.selectedCountry)) {
      return false;
    }

    if (!this.validateEmail(this.state.email)) {
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
      "Content-Type": configJSON.contentTypeApiAddDetail
    };

    const attrs = {
      email: this.state.email,
      password: this.state.password,
      contact_name: this.state.firstName,
      role_id: this.getRoleId(),
      full_name: this.state.firstName,
      password_confirmation: this.state.reTypePassword,
      device_id:await getStorageData('deviceToken')
    }
    
    if(this.state.isBusinessSelected || this.state.selectedUser === 'am'){
      (attrs as any).company_name = this.state.businessName;
    }

    if(this.state.selectedUser === "need"){
      (attrs as any).user_type = this.getUserType();
    } else {
      (attrs as any).country = this.state.selectedCountry;
      (attrs as any).user_type = 'notary';
    }
    
    const data = {
      type: "email_account",
      attributes: attrs
    };
    const httpBody = {
      data: data
    };
    
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.createAccountApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.accountsAPiEndPoint
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
      configJSON.apiMethodTypeAddDetail
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

  validateEmail= (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email)
  }

  validatePassword = (pass: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
    return regex.test(pass)
  }

  getValidations() {
    const headers = {
      "Content-Type": configJSON.validationApiContentType
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

  imgEnableRePasswordFieldProps = {
    source: imgPasswordInVisible,
    style:{height: 24, width: 24}
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
    source: imgPasswordInVisible,
    style:{height: 24, width: 24}
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

  btnSignUpProps = {
    onPress: () => this.createAccount()
  };

  txtInputEmailMobilePrpos = {
    onChangeText: (text: string) => {
      this.setState({ email: text });
      //@ts-ignore
      this.txtInputEmailPrpos.value = text;
    },
    keyboardType: "email-address"
  };

  txtInputEmailPrpos = this.txtInputEmailMobilePrpos;

  txtInputBusinessNamePrpos = {
    onChangeText: (text: string) => {
      this.setState({ businessName: text });

      //@ts-ignore
      this.txtInputBusinessNamePrpos.value = text;
    }
  };

  txtInputFirstNamePrpos = {
    onChangeText: (text: string) => {
      this.setState({ firstName: text });

      //@ts-ignore
      this.txtInputFirstNamePrpos.value = text;
    }
  };

  txtInputCountryPrpos = (value: string) => {
      this.setState({ selectedCountry: value });
  };

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

  getButtonEnable = () => {
    if(this.state.email && this.state.password && this.state.reTypePassword && this.state.firstName){
      return true
    } else return false
  }

  fetchUserType = async () => {
      const userType = await AsyncStorage.getItem('UserType');
      this.setState({ selectedUser: userType }, () => {
        if(this.state.selectedUser === 'am'){
          this.callApiForGetCountry()
        }
      });
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
