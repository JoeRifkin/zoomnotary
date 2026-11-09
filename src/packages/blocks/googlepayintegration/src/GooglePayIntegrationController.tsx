import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { Alert } from "react-native";
import {
  PlatformPay,
  isPlatformPaySupported, confirmPlatformPayPayment
} from '@stripe/stripe-react-native';
import { getStorageData } from "../../../framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  onGPaySelect: () =>  void ;
  proceedWithGPay: boolean;
  paymentType: string;
  countrycode : string;
  currencycode: string;
  amount : string;
  quoteId : string;
  handleGpaySuccessFailure : (paymentConfirmType: string) => void;
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  amountValue: string;
  loader: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class GooglePayIntegrationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  googlePayAPIRequestId: string = "";
  confirmPaymentAPIRequestId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];
    // Customizable Area End

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      amountValue: "",
      loader: false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
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
      const respJSON = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      const apiRequestCallID = message.getData(getName(MessageEnum.RestAPIResponceDataMessage));

      this.setState({ loader: false });

      if (apiRequestCallID === this.googlePayAPIRequestId) {
        if (respJSON.status) {
          this.confirmPayment(respJSON.client_secret);
        }
        else {
          Alert.alert("API Error", respJSON.errors[0]);
          this.props.handleGpaySuccessFailure("failure");
        }
      }
      else if (apiRequestCallID === this.confirmPaymentAPIRequestId) {
        if (respJSON.message) {
          this.props.handleGpaySuccessFailure("success");
        } else {
          this.props.handleGpaySuccessFailure("failure");
        }
      }
    }

    // Customizable Area End
  }

  // Customizable Area Start
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
    let message = new Message(getName(MessageEnum.AccoutLoginSuccess));
    message.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(message);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  handleAmountInput = (value: string) => {
    this.setState({ amountValue: value });
  };
  subscribePurchase = () => {
    if (this.state.amountValue.length === 0) {
      return this.showAlert(configJSON.error, configJSON.amountErrorMessage);
    }
  };


  // gpay functions
  componentDidUpdate(prevProps: Props) {
    if (prevProps.proceedWithGPay !== this.props.proceedWithGPay && this.props.proceedWithGPay) {
      this.initiateGPayRequest();
    }
  }

  onPressGpay = () => {
    this.props.onGPaySelect();
  }

  initiateGPayRequest = () => {
    this.checkPlatformPaySupport();
  }

  checkPlatformPaySupport = async () => {
    const supported = await isPlatformPaySupported({ googlePay: { testEnv: true } });
    if (!supported) {
      Alert.alert('Google Pay is not supported.');
    }
    else {
      this.fetchPaymentIntentClientSecret();
    }
  };

  fetchPaymentIntentClientSecret = async () => {
    this.setState({ loader: true });

    const header = {
      token: await getStorageData("token"),
      "Content-Type": configJSON.googlePayAPIContentType
    }
    const Body = {
      amount: Number(this.props.amount) * 100,
      //Stripe processes amounts in the smallest unit of the currency , so multiplied amount with 100
      currency: this.props.currencycode,
      payment_method_type: "google_pay"
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.googlePayAPIRequestId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.googlePayAPIEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(Body)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.googlePayAPIMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  };

  confirmPayment = async (clientSecret: string) => {
    const result = await confirmPlatformPayPayment(
      clientSecret,
      {
        googlePay: {
          testEnv: true,
          merchantName: 'Zoom Notary',
          merchantCountryCode: this.props.countrycode,
          currencyCode: this.props.currencycode,
          billingAddressConfig: {
            format: PlatformPay.BillingAddressFormat.Full,
            isPhoneNumberRequired: true,
            isRequired: true,
          },
        },
      }
    );

    if (result.error) {
      this.props.handleGpaySuccessFailure("failure");
      return;
    }

    if (result.paymentIntent) {
      this.saveConfirmPaymentDetailsToBE(result.paymentIntent.id, result.paymentIntent.amount / 100);
      //Stripe processes amounts in the smallest unit of the currency , so dividing amount with 100
    }
  };

  saveConfirmPaymentDetailsToBE = async (paymentIntent: string | undefined, amount: number | undefined) => {
    this.setState({ loader: true });

    const header = {
      token: await getStorageData("token"),
      "Content-Type": configJSON.confirmPaymentAPIContentType
    }
    const Body = {
      "payment_intent": paymentIntent,
      "amount": amount,
      "is_accepted": "true"
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.confirmPaymentAPIRequestId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.confirmPaymentAPIEndPoint + this.props.quoteId + "/accept_quote"
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(Body)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.confirmPaymentAPIMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true
  }
  // Customizable Area End
}
