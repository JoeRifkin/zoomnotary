import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { createRef, RefObject } from 'react';
import {ScrollView} from 'react-native'
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
  token: string;
  userRoleType: string;
  selectedCurrency: string;
  isAllFieldValidate: boolean;
  isCurrencyDropdownOpen: boolean;
  paymentType: string;
  requestId: string;
  quoteId: string;
  isShowWebView: boolean;
  stripeCheckoutUrl : string;
  cs_id: string;
  isSuccessPayment: boolean;
  isFailedPayment: boolean;
  isLoader:boolean;
  proceedWithGPay: boolean;
  amount: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class QuotePaymentController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  proceedApiCallId: string ='';
  quoteAcceptApiCallId: string="";
  scrollViewRef: RefObject<ScrollView> = createRef<ScrollView>();
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionSaveMessage)

      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      userRoleType: '',
      selectedCurrency: '',
      isAllFieldValidate: false,
      isCurrencyDropdownOpen: false,
      paymentType: '',
      requestId: '',
      quoteId: '',
      isShowWebView: false,
      stripeCheckoutUrl : '',
      cs_id: '',
      isSuccessPayment: false,
      isFailedPayment: false,
      isLoader:false,
      proceedWithGPay: false,
      amount: ""
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      this.handleNavigationPayloadMessage(message);
    } else if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      this.handleRestAPIResponseMessage(message);
    }
  }
 

  handleNavigationPayloadMessage = (message: Message) => {
    const myData = message.getData(getName(MessageEnum.CustomDataMessage))
    if (myData) {
      this.setState({ token: myData.token, requestId: myData.requestId, quoteId: myData.quoteID,
        amount: myData.amount
       });
    }
  };
  
  handleRestAPIResponseMessage = (message: Message) => {
    const apiRequestCallId = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));
    const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
    
    if (apiRequestCallId === this.proceedApiCallId) {
      this.setState({isLoader:false})
      this.openStripeUrl(responseJson.data.url, responseJson.data.cs_id);
    }
    if(apiRequestCallId === this.quoteAcceptApiCallId){
      this.manageQuoteAcceptResponse()
    }
  };

  manageQuoteAcceptResponse = () => {
    this.setState({isShowWebView: false, stripeCheckoutUrl: ''})
  }

  openStripeUrl = (url: string, cs_id: string) => {
    this.setState({stripeCheckoutUrl : url, isShowWebView: true, cs_id: cs_id})
  };
 
  btnGoBack = {
    onPress: () => {
      if (this.props.navigation && this.props.navigation.goBack) {
        this.props.navigation.goBack()
      }
    }
  }

  callProceedApi (): boolean {
    this.setState({isLoader:true})
    const header = {
      token: this.state.token,
      "Content-Type": configJSON.requestApiContentType
    }
    const httpBody = {
      "cancel_url":"https://zoomnotary-401615-react.b401615.stage.eastus.az.svc.builder.ai/StripeFailurePage",
      "success_url":"https://zoomnotary-401615-react.b401615.stage.eastus.az.svc.builder.ai/StripeSuccessPage"
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
 
    this.proceedApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.proceedApiEndPoint}?quote_id=${this.state.quoteId}&notary_request_id=${this.state.requestId}`
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
      configJSON.createSendRequestApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  txtInputCurrencyPrpos = (value: string) => {
    this.setState({ selectedCurrency: value });
  }  

  openServicesDropdown = () => {
    this.setState({ isCurrencyDropdownOpen: true })
  }

  closeDropDownOfServices = () => {
    this.setState({ isCurrencyDropdownOpen: false })
  }

  getProceedBtnEnabled = () => {
    if(this.state.selectedCurrency !== '' && this.state.paymentType !== ''){
      return true
    } else {
      return false
    }
  }

  btnProceedProps = {
    onPress: () => {
      if(this.getProceedBtnEnabled()){
        if (this.state.paymentType === "GPay") {
         this.proceedWithGPayFun();
        }
        else {
          this.callProceedApi()
        }
      }
    }
  }

  proceedWithGPayFun = () => {
    this.setState({proceedWithGPay : true})
  }

  selectPaymentType = (type: string) => {
    this.setState({paymentType: type, proceedWithGPay: false});

  }

  isPaymentTypeCard = () => {
    if(this.state.paymentType === 'card'){
      return true
    } else {
      return false
    }
  }

  showErrorForDropdown = () => {
    if(this.state.isAllFieldValidate && this.state.selectedCurrency === ''){
      return true
    } else {
      return false
    }
  }

  handleShouldStartLoadWithRequest = (request: any) => {
    const { url } = request;

    if (url.includes('StripeSuccessPage')) {
      this.setState({isSuccessPayment: true}, () => {
        this.getQuoteAccept()
        this.scrollToTop()
      })
      return false;
    } else if (url.includes('StripeFailurePage') || url.includes('cancel')) {
      this.setState({isFailedPayment: true}, () => {
        this.getQuoteAccept()
        this.scrollToTop()
      })
      return false; 
    }
    return true;
  };

  scrollToTop = () => {
    this.scrollViewRef?.current?.scrollTo({ y: 0, animated: false });
  };

  getQuoteAccept(): boolean {
    const header = {
      token: this.state.token,
      "Content-Type": configJSON.requestApiContentType
    }
    const httpBody = {
      "is_accepted": this.state.isSuccessPayment ? "true" : "false",
      "cs_id": this.state.cs_id
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
 
    this.quoteAcceptApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `${configJSON.acceptQuoteApiEndpoint}${this.state.quoteId}${configJSON.acceptQuote}`
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
      configJSON.createSendRequestApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }

  btnGoBackOnRequestDetail = {
    onPress: () => {
      this.redirectPageToDetailPage()
    }
  }


  btnRedirectTORequestDetail = {
    onPress: () => {
      this.setState({isSuccessPayment: false, isFailedPayment: false}, () => {
        this.redirectPageToDetailPage()
      })
    }
  }

  redirectPageToDetailPage = () =>{
    const msg: Message = new Message(
      getName(MessageEnum.NavigationRequestDetailMessage)
    );
    const selectedRequest = {
      requestId: this.state.requestId,
      actionType: 'view'
    };
    msg.addData(getName(MessageEnum.CustomDataMessage), selectedRequest);
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  onGPaySelect = () => {
    if (this.state.paymentType === "GPay") {
      this.setState({ paymentType: "", proceedWithGPay: false });
    }
    else {
      this.setState({ paymentType: "GPay", proceedWithGPay: false });
    }
  }

  handleGpaySuccessFailure = (paymentConfirmType: string) => {
    if (paymentConfirmType === "success") {
      this.setState({ isSuccessPayment: true }, () => {
        // this.getQuoteAccept()
        this.scrollToTop()
      })
      return false;
    } else if (paymentConfirmType === "failure") {
      this.setState({ isFailedPayment: true }, () => {
        // this.getQuoteAccept()
        this.scrollToTop()
      })
      return false;
    }
    return true;
  };

  // Customizable Area End
}
  