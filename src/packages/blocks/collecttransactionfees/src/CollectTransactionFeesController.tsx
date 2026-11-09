// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

import { imgPasswordInVisible, imgPasswordVisible } from "./assets";

interface ApiData {
  contentType?: string,
  method?: string,
  endPoint?: string,
  body?: {},
  type?: string,
}

interface CollectTransactionFeesData {
  data: {
    data: {
      id?: string,
      type?: string,
      attributes: {
        id?: number,
        total_fees?: number,
        transaction_fees?: number
      }
    }
  }
}

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  transactionAmount: string;
  transactionAmountMessage: string;
  transactionPercentage: number;
  actualAmount: number;
  totalAmount: number;
  isLoading: boolean;
  responseData: object;
  percentageData: number;
  percentage: number;
  Sendpercentage: number;
}

interface SS {
  id: any;
}

export default class CollectTransactionFeesController extends BlockComponent<
  Props,
  S,
  SS
> {

  collectTransactionFeesAPICallId!: string
  transactionPercentageAPICallId!: string

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      transactionAmount: "",
      transactionAmountMessage: "",
      transactionPercentage: 0,
      actualAmount: 0,
      totalAmount: 0,
      isLoading: false,
      responseData: {},
      percentageData: 0,
      percentage: 0,
      Sendpercentage: 0
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);


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

        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      )

      var responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      )
      var errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      )
      if (responseJson && !responseJson.errors) {
        if (apiRequestCallId === this.collectTransactionFeesAPICallId) {
          this.collectTransactionFeesSuccessCallBack(responseJson)
        }
        else if (apiRequestCallId === this.transactionPercentageAPICallId) {
          this.transactionPercentageSuccessCallBack(responseJson)
        }
      }
      else if (responseJson && responseJson.errors) {
        if (apiRequestCallId === this.collectTransactionFeesAPICallId) {
          this.collectTransactionFeesFailureCallBack(errorReponse)
        }
        else if (apiRequestCallId === this.transactionPercentageAPICallId) {
          this.transactionPercentageFailureCallBack(errorReponse)
        }
      } else if (errorReponse) {
        this.setState({ isLoading: false })
      }
    }

  }

  async componentDidMount() {
    this.transactionPercentageAmount()
  }

  apiCall = async (data: ApiData) => {
    const { contentType, method, endPoint, body, type } = data
    const header = {
      'Content-Type': contentType,
    }
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    )
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    )
    body && type != 'formData' ?
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      )
      
      : requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return requestMessage.messageId;
  }

  amountFunction = (text: string) => {
    this.setState({ transactionAmount: text, transactionPercentage: 0, totalAmount: 0, transactionAmountMessage: "", actualAmount: 0, percentage: 0 }, () => {
      const pervalue = Math.round((parseFloat(this.state.transactionAmount) * (this.state.percentageData) / 100) * 100) / 100
      this.setState({ Sendpercentage: pervalue })
    })
  }

  totalAmount = async () => {
    if (this.state.transactionAmount === "") {
      this.setState({ transactionAmountMessage: "Please enter amount" })
    }
    else if (this.state.transactionAmount === "0") {
      this.setState({ transactionAmountMessage: "Please enter valid amount" })
    }

    else {
      const pervalue = Math.round((parseFloat(this.state.transactionAmount) * (this.state.percentageData) / 100) * 100) / 100
      const actualAmountvalue = parseFloat(this.state.transactionAmount) + pervalue
      this.setState({ percentage: pervalue, actualAmount: actualAmountvalue, totalAmount: JSON.parse(this.state.transactionAmount) })
    }
  }

  PayAmount = async () => {
    let formdata = new FormData();
    formdata.append("total", this.state.transactionAmount)
    formdata.append("transaction_fees", JSON.stringify(this.state.Sendpercentage))
    this.collectTransactionFeesAPICallId = await this.apiCall({
      method: configJSON.exampleAPiMethod,
      endPoint: configJSON.collectTransactionFeesEndPoint,
      body: formdata,
      type: 'formData'
    });
  }

  collectTransactionFeesSuccessCallBack = (responseJson: CollectTransactionFeesData) => {
    this.setState({ isLoading: false, responseData: responseJson?.data?.data?.attributes }
    )
  };

  collectTransactionFeesFailureCallBack = (errorReponse: string) => {
    this.setState({ isLoading: false })
  };

  transactionPercentageAmount = async () => {
    this.transactionPercentageAPICallId = await this.apiCall({
      contentType: configJSON.textApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: configJSON.transactionFeesEndPoint,
    });
  }

  transactionPercentageSuccessCallBack = (responseJson: { data: { transaction_percentage: number } }) => {
    if (responseJson.data == null) {
      this.setState({ isLoading: false, percentageData: this.state.percentage })
    } else {
      this.setState({ isLoading: false, percentageData: responseJson?.data?.transaction_percentage })
    }
  };

  transactionPercentageFailureCallBack = (errorReponse: string) => {
    this.setState({ isLoading: false })
  };
  
}

// Customizable Area End
