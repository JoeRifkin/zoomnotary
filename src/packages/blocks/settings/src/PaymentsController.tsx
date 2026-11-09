import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Alert } from "react-native";

// Customizable Area Start
type UserDetailsType = {
  message: string,
  currency: string,
  account_name: string,
  account_email: string
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
  loading: boolean;
  user_role: string;
  isConnected:boolean;
  stripeUrl:string;
  showStripePage:boolean;
  userDetails: UserDetailsType;
  showDisconnectModal: boolean
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class PaymentsController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  stripeConnectApiCallId: string = ''
  stripeConnectStatusApiCallId: string = ''
  stripeDisConnectApiCallId: string = ''
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
      user_role: '',
      isConnected:false,
      stripeUrl:'',
      showStripePage: false,
      userDetails: {
        message: '',
        currency: '',
        account_email: '',
        account_name: ''
      },
      showDisconnectModal:false
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
      this.stripeConnectStatusApi()
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

      this.setState({loading:false})

    if (responseJson && !responseJson.errors) {
      if (apiRequestCallId === this.stripeConnectApiCallId) {
        this.handleConnectResponse(responseJson)
      }

      if (apiRequestCallId === this.stripeConnectStatusApiCallId) {
        this.setState({
          isConnected: responseJson.message == 'The setup was successful.' ? true : false,
          userDetails: responseJson
        })        
      }
      if (apiRequestCallId === this.stripeDisConnectApiCallId) {
        this.handleDisconectResponse(responseJson)
      }
      
    }
  }

  handleConnectResponse = (responseJson: { data: { url: string }, connected_account: string | boolean }) => {
    if (responseJson.data.url && responseJson.connected_account) {
      this.setState({ stripeUrl: responseJson.data.url, showStripePage: true })
    }
  }

  handleDisconectResponse = (responseJson: { error: string, message: string }) => {
    if (responseJson?.error) {
      Alert.alert(responseJson.error)
    }
    if (responseJson?.message === 'Stripe account successfully disconnected.') {
      this.setState({
        isConnected: false,
        userDetails: {
          message: '',
          currency: '',
          account_email: '',
          account_name: ''
        },
      })
    }
  }

  goBack = ()=>{
    this.props.navigation.goBack()
  }

  onConnect=()=>{
    this.stripeConnectApi()

  }

  toggleModal = ()=>{
    this.setState({showDisconnectModal: !this.state.showDisconnectModal})
  }

  onDisconnect =()=>{
    this.toggleModal()
    this.setState({ loading: true })

    const header = {
      "Content-Type": 'application/json',
      token: this.state.token,
    };
    const requestMessag = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.stripeDisConnectApiCallId = requestMessag.messageId;

    requestMessag.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.stripeDisconnectEndpoint
    );
    requestMessag.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessag.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.POST
    );
    runEngine.sendMessage(requestMessag.id, requestMessag);
  }

  handleShouldStartLoadWithRequest = (request: {url:string}) => {
    const { url } = request;
    if (url.includes('success')) {
      this.setState({ showStripePage: false, stripeUrl: '' })
      this.stripeConnectStatusApi()
      return false
    }

    if (url.includes('failure')) {
      this.setState({ showStripePage: false, stripeUrl: '' })
      return false
    }

    return true 
  };

  
  stripeConnectStatusApi = () => {
    this.setState({ loading: true })

    const header = {
      "Content-Type": 'application/json',
      token: this.state.token,
    };
    const requestMessag = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.stripeConnectStatusApiCallId = requestMessag.messageId;
    requestMessag.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.stripeConnectStatus
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

  stripeConnectApi = () => {
    this.setState({ loading: true })
    const payload = {
      "refresh_url": "https://failure",
      "return_url": "https://success"
    }
    const header = {
      "Content-Type": 'application/json',
      token: this.state.token,
    };
    const requestMessag = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.stripeConnectApiCallId = requestMessag.messageId;
    requestMessag.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.stripeConnectEndpoint
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
      configJSON.POST
    );
    runEngine.sendMessage(requestMessag.id, requestMessag);
  };

  // Customizable Area End
}