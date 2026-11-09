import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";

// Customizable Area Start
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export interface S {
  // Customizable Area Start
  otp: string;
  otpAuthToken: string;
  userAccountID: string;
  labelInfo: string;
  toMessage: string;
  isFromForgotPassword: boolean;
  otpInput: any,
  timer: number,
  isValidation: boolean;
  signUpUserDetail: any;
  isOtpVerified: boolean;
  otpFailedMsg: string;
  selectedUser: any;
  servicesList: any;
  selectedServices: any;
  isServiceListVisible: boolean;
  isAllServicesSelected: boolean;
  isOpenModel: boolean
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class OTPInputAuthController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  otpAuthApiCallId: any;
  getOtpAuthApiCallId: any;
  btnTxtSubmitOtp: string;
  placeHolderOtp: string;
  labelInfo: string = "";
  submitButtonColor: any = configJSON.submitButtonColor;
  getAllServicesApiCallId: any;
  addServicesApiCallId: any;
  timerInterval: NodeJS.Timeout;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.receive = this.receive.bind(this);

    runEngine.attachBuildingBlock(this, this.subScribedMessages);

    // Customizable Area Start
    this.state = {
      otp: "",
      otpAuthToken: "",
      userAccountID: "",
      labelInfo: configJSON.labelInfo,
      toMessage: "",
      isFromForgotPassword: false,
      otpInput: "",
      timer: 150,
      isValidation: false,
      signUpUserDetail: this.fetchSignUpUserDetail(),
      isOtpVerified: false,
      otpFailedMsg: '',
      selectedUser: this.fetchUserType(),
      servicesList: null,
      selectedServices: [],
      isServiceListVisible: false,
      isAllServicesSelected: false,
      isOpenModel: false
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.btnTxtSubmitOtp = configJSON.btnTxtSubmitOtp;
    this.placeHolderOtp = configJSON.placeHolderOtp;
    this.timerInterval = setTimeout(() => {}, 0);
    this.startTimer();
    // Customizable Area End
  }

  async receive(from: String, message: Message) {
    // Customizable Area Start
    const restApiResponseMessageName = getName(MessageEnum.RestAPIResponceMessage);
    const restApiResponseDataMessageName = getName(MessageEnum.RestAPIResponceDataMessage);
    const restApiResponseSuccessMessageName = getName(MessageEnum.RestAPIResponceSuccessMessage);
    
    if (restApiResponseMessageName === message.id) {
      const responseJson = message.getData(restApiResponseSuccessMessageName);
      const isOtpAuthCall = this.otpAuthApiCallId !== null && this.otpAuthApiCallId === message.getData(restApiResponseDataMessageName);
      const isGetOtpAuthCall = this.getOtpAuthApiCallId !== null && this.getOtpAuthApiCallId === message.getData(restApiResponseDataMessageName);
      const getAllServicesApiCallId = this.getAllServicesApiCallId !== null && this.getAllServicesApiCallId === message.getData(restApiResponseDataMessageName);
      const addServicesApiCallId = this.addServicesApiCallId !== null && this.addServicesApiCallId === message.getData(restApiResponseDataMessageName);
      this.manageApiResponse(isOtpAuthCall, isGetOtpAuthCall, responseJson, getAllServicesApiCallId, addServicesApiCallId)
    }
    
    // Customizable Area End
  }

  // Customizable Area Start

  manageApiResponse = (
    isOtpAuthCall: any,
    isGetOtpAuthCall: any,
    responseJson: any,
    getAllServicesApiCallId: any,
    addServicesApiCallId: any
  ) => {
    if (!this.shouldHandleApiResponse(isOtpAuthCall, isGetOtpAuthCall, getAllServicesApiCallId, addServicesApiCallId)) {
      return;
    }
  
    if (this.isSuccessfulResponse(responseJson)) {
      this.handleSuccessfulResponse(isOtpAuthCall, isGetOtpAuthCall, responseJson, getAllServicesApiCallId, addServicesApiCallId);
    } else {
      this.handleFailedResponse(responseJson);
    }
  }
  
  shouldHandleApiResponse = (
    isOtpAuthCall: any,
    isGetOtpAuthCall: any,
    getAllServicesApiCallId: any,
    addServicesApiCallId: any
  ) => {
    return isOtpAuthCall || isGetOtpAuthCall || getAllServicesApiCallId || addServicesApiCallId;
  }
  
  isSuccessfulResponse = (responseJson: any) => {
    return responseJson && !responseJson.errors;
  }
  
  handleSuccessfulResponse = (
    isOtpAuthCall: any,
    isGetOtpAuthCall: any,
    responseJson: any,
    getAllServicesApiCallId: any,
    addServicesApiCallId: any
  ) => {
    if (isOtpAuthCall) {
      this.handleOtpAuthCall();
    } else if (isGetOtpAuthCall) {
      this.handleGetOtpAuthCall(responseJson);
    } else if (getAllServicesApiCallId) {
      this.handleGetAllServicesApiCall(responseJson);
    } else if (addServicesApiCallId) {
      this.handleAddServicesApiCall();
    }
  }
  
  handleFailedResponse = (responseJson: any) => {
    this.setState({
      otpFailedMsg: this.formatApiError(responseJson),
      isValidation: true,
      isOtpVerified: false
    });
  }
  
  handleOtpAuthCall = () => {
    this.setState({
      isOtpVerified: true,
      isServiceListVisible: this.state.selectedUser === "am"
    }, () => {
      if (this.state.selectedUser === "am") {
        this.getAllServices();
      }
    });
  }
  
  handleGetOtpAuthCall = (responseJson: any) => {
    this.setState({ otpAuthToken: responseJson.email_otp_token });
  }
  
  handleGetAllServicesApiCall = (responseJson: any) => {
    this.setState({ servicesList: responseJson.data });
  }
  
  handleAddServicesApiCall = () => {
    this.setState({ isOtpVerified: true, isServiceListVisible: false, isOpenModel: false });
  }
  

  getAllServices() : boolean {

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getAllServicesApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'bx_block_landing_page/admin_landing_pages/get_services'
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify({})
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      'GET'
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  clickedRightView = () => {
    this.setState({isOtpVerified: true, isServiceListVisible: false})
  }

  clickOnAllSelect = () => {
    this.setState({isAllServicesSelected: !this.state.isAllServicesSelected}, () => {
      if(this.state.isAllServicesSelected){
        const allIds = this.state.servicesList.map((item: any) => item?.attributes?.id);
        this.setState({ selectedServices: allIds });
      } else {
        this.setState({ selectedServices: [] });
      }
    }) 
  }

  clickOnSelect = (serviceId: number) => {
    const { selectedServices } = this.state;
    const index = selectedServices.indexOf(Number(serviceId));
    if (index !== -1) {
      // ID exists, remove it
      const newArray = selectedServices.filter((item: number) => item !== Number(serviceId));
      this.setState({
        selectedServices: newArray,
        isAllServicesSelected: false
      });
    } else {
      // ID doesn't exist, add it
      this.setState((prevState) => ({
        selectedServices: [...prevState.selectedServices, Number(serviceId)],
      }));
    }
  }

  btnSubmitServicesProps = {
    onPress: () => {
      if(this.getSaveButtonEnable()){
        this.setState({isOpenModel: true})
      }
    }
  }

  noToChanges = {
    onPress: () => {
      this.setState({isOpenModel: false})
    }
  }

  yesProceedToChanges = {
    onPress: () => {
      this.callApiToSaveChanges()
    }
  }

  convertStringArrayToNumber = (numberArr: string[]) => {
    const numberArray: number[] = numberArr.map(item => parseInt(item, 10));
    return numberArray;
  }

  callApiToSaveChanges(): boolean {
    const header = {
      "Content-Type": "application/json",
      token: this.state.signUpUserDetail.meta.token
    };
    const payload = {
      service_ids: this.convertStringArrayToNumber(this.state.selectedServices)
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.addServicesApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      'account_block/add_services'
    );  

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(payload)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiVerifyOtpMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  btnGoBackOnSucess = {
    onPress: () => {
      clearInterval(this.timerInterval);
      this.setState({isOtpVerified: false})
    }
  }

  getColorOfBox = () => {
    if(this.state.isValidation){
      return '#DC2626'
    } else {
      return '#5D5D5D'
    }
  }

  showErrorMsg = () => {
    if(this.state.isValidation && (!this.getButtonEnable() || this.state.otpFailedMsg !== '')){
      return true
    } else {
      return false
    } 
  }

  formatApiError(apiError : any) {
    let errorMessage = "Something went wrong";
  
    if (apiError && apiError.errors) {
      const errorKeys = Object.keys(apiError.errors);
  
      if (errorKeys.length > 0) {
        const firstErrorKey = errorKeys[0];
        const firstErrorValue = apiError.errors[firstErrorKey][0];
  
        errorMessage = `${firstErrorKey} ${firstErrorValue}`;
      }
    }
    return errorMessage;
  }

  fetchSignUpUserDetail = async () => {
    const userType = await AsyncStorage.getItem('signUpUserDetail');
    if(userType){
      const parsedData = JSON.parse(userType)
      this.setState({ signUpUserDetail: parsedData });
      return parsedData
    }
  };

  getCallApiforSendOTP = async() => {
    const storedData = await AsyncStorage.getItem('signUpUserDetail');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.callApiToGetOTP(parsedData)
    }
  }

  callApiToGetOTP = (parsedData: any) => {

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    
    const headers = {
      "Content-Type": configJSON.apiVerifyOtpContentType,
      token: parsedData.meta.token,
    };
    this.getOtpAuthApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `account_block/accounts/resend_otp`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headers)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify({})
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiVerifyOtpMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  submitOtp(): boolean {
    this.setState({isValidation: true});
    if (!this.getButtonEnable()) {
      return false;
    } 
    this.setState({ isValidation: false});

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

      const headers = {
        "Content-Type": configJSON.apiVerifyOtpContentType,
      };

      const attrs = {
        token: this.getToken(),
        otp_code: this.state.otpInput
      } 
     
      const httpBody = {
        data: attrs,
      };

      this.otpAuthApiCallId = requestMessage.messageId;

      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        `bx_block_forgot_password/otps/verify`
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
        configJSON.apiVerifyOtpMethod
      );

    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  getToken = () => {
    if(this.state.otpAuthToken){
      return this.state.otpAuthToken
    } else if(this.state.signUpUserDetail && this.state.signUpUserDetail.meta) {
      return this.state.signUpUserDetail.meta.email_otp_token
    }
  }

  btnSubmitOTPProps = {
    onPress: () => this.submitOtp()
  };

  btnGoBack = {
    onPress: () => {
      if(this.props.navigation && this.props.navigation.goBack){
        clearInterval(this.timerInterval);
        this.props.navigation.goBack()
      }
    }
  }

  getButtonEnable = () => {
    if (this.state.otpInput.length === 6) {
      return true
    } else {
      return false
    }
  }

  getSaveButtonEnable = ()=> {
    if (this.state.selectedServices.length > 0) {
      return true
    } else {
      return false
    }
  }

  handleResendOtp = () => {
    if(this.state.timer < 1){
      this.getCallApiforSendOTP();
      clearInterval(this.timerInterval);
      this.setState({ timer: 150, otpInput: "" });
      this.startTimer();
    }
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
      this.handleResendOtp();
    }
  }

  onFulfill = (code: any) => {
    this.setState({otpInput: code, otpFailedMsg: "" , isValidation: false})
  }

  fetchUserType = async () => {
    const userType = await AsyncStorage.getItem('UserType');
    this.setState({ selectedUser: userType }, () => {
    });
  };

  btnLoginRedirect = {
    onPress: () => {
      const msg: Message = new Message(
        getName(MessageEnum.NavigationEmailLogInMessage)
      );
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    }
  }

  btnRedirectToDashboard = {
    onPress: () => {
      const msg: Message = new Message(
        getName(MessageEnum.NavigationDashboardMessage)
      );
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick () {
    if(this.state.isOtpVerified && !this.state.isServiceListVisible ){
      BackHandler.exitApp();
      return true;
    }
  }

  // Customizable Area End
}
