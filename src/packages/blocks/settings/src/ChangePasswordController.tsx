import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start

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
  loading: boolean;
  currentPassword:string
  newPassword: string;
  confirmNewPassword: string;


  currentPasswordError:string
  newPasswordError: string;
  confirmNewPasswordError: string;


  firstValidationPass: boolean;
  secValidationPass: boolean;
  thiredValidationPass: boolean;
  fourthValidationPass: boolean;

  success:boolean

  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ChangePasswordController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  passwordHistoryApiCallId: string = '';
  debounceTimeout: any    // To store the timeout for debouncing
  changePasswordApiCallId: string = ''
  validationList:string[] = []
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
      loading: false,

      currentPassword:'',
      newPassword: "",
      confirmNewPassword: "",

      currentPasswordError: '',
      newPasswordError: '',
      confirmNewPasswordError: '',

      firstValidationPass: false,
      secValidationPass: false,
      thiredValidationPass: false,
      fourthValidationPass: false,
      
      success: false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    this.validationList = [configJSON.passValdationFirst, configJSON.passValdationSec,
    configJSON.passValdationThired, configJSON.passValdationFourth]
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();

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
      this.setState({ token: token})
    }

    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    this.setState({loading:false})


    if (responseJson && !responseJson.errors) {
      if (apiRequestCallId === this.passwordHistoryApiCallId) {
        this.setState({ fourthValidationPass: responseJson?.message ==='Successfully verified that the password is new and not used recently.' ? true :false})
      }

      if (apiRequestCallId === this.changePasswordApiCallId) {
        this.handleResponse(responseJson)
      }
    }
  }

  handleResponse = (res: { error?: string; message?: string }) => {
    if (res?.error === 'Incorrect old password.') {
      this.setState({ currentPasswordError: res.error });
    }
    if (res?.message === 'Password Changed') {
      this.setState({ success: true });
    }
  }


  async componentWillUnmount() {
    // Clear the timeout if the component unmounts to avoid memory leaks
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
  }


  onChangeCurrentPassword = (text: string) => {
    this.setState({ currentPassword: text, currentPasswordError:'' });
  };

  onChangeConfirmNewPassword = (text: string) => {
    this.setState({ confirmNewPassword: text, confirmNewPasswordError:"" });
  };


  onChangeNewPassword = (text: string) => {
    this.setState({ newPassword: text ,newPasswordError:'' }, () => {
      this.getImageForValidation(); // Callback executed after state update
    });

     // Clear the previous timeout if there is one
     if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    // Set a new timeout to debounce the API call
    this.debounceTimeout = setTimeout(() => {
    text.length >= 8 ? this.viewPasswordHistoryApi() : this.setState({fourthValidationPass:false})
    }, 500);  // Debounce time in milliseconds (e.g., 500ms)
  };

  //  validation for disabled button 
  validation = () => {
    const { firstValidationPass, secValidationPass, thiredValidationPass, fourthValidationPass, currentPassword } = this.state
    if (firstValidationPass && secValidationPass && thiredValidationPass && fourthValidationPass && currentPassword.length >= 8) {
      return false
    }

    return true
  }


  onSubmitChangePassword = ()=>{
    if(this.state.newPassword  != this.state.confirmNewPassword){
      this.setState({confirmNewPasswordError:"Passwords do not match"})
      return
    }

    this.changePasswordApi()
  }


  // checking the validation list 
  getImageForValidation = () => {
    const { newPassword } = this.state;
  
    const validations = {
      firstValidationPass: newPassword.length >= 8,
      secValidationPass: this.validatePasswordForSec(),
      thiredValidationPass: this.validatePasswordForThired(),
    };
  
    this.setState(validations);
  }
  
  validatePasswordForSec = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    return regex.test(this.state.newPassword);
  }
  
  validatePasswordForThired = () => {
    const regex = /^(^\S.*\S$|^\S?)$/;
    return regex.test(this.state.newPassword);
  }


  goBack = ()=>{
    this.props.navigation.goBack()
  }


  gotoDashBoard=()=>{
    const msg: Message = new Message(
      getName(MessageEnum.NavigationDashboardMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  // api call to update change the password
  changePasswordApi = () => {
    this.setState({loading:true})
    
    const payload = {data:{
      current_password: this.state.currentPassword,
      new_password: this.state.newPassword,
      new_password_confirmation: this.state.confirmNewPassword
    }}
    const header = {
      "Content-Type": configJSON.contentTypeApplicationJson,
      token: this.state.token,
    };
    
    const requestMessag = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.changePasswordApiCallId = requestMessag.messageId;
    requestMessag.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.changePasswordEndpoint
    );
    requestMessag.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessag.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(payload)
    );
    requestMessag.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.PUT
    );
    runEngine.sendMessage(requestMessag.id, requestMessag);
  };

  // api call to check the previous history 
  viewPasswordHistoryApi = () => {
    const header = {
      "Content-Type": configJSON.contentTypeApplicationJson,
      token: this.state.token,
    };
    const requestMessag = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.passwordHistoryApiCallId = requestMessag.messageId;
    requestMessag.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.viewHistoryEndpoint+this.state.newPassword
    );
    requestMessag.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessag.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.GET
    );
    runEngine.sendMessage(requestMessag.id, requestMessag);
  };

  // Customizable Area End
}