import React, { useEffect, useState, useRef } from "react";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { useRunEngine } from "../../utilities/src/hooks/useRunEngine";
import { useBlockHelpers } from "../../utilities/src/hooks/useBlockHelpers";
import { getStorageData } from "../../../framework/src/Utilities";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";
import { config } from "./config.web";

import StripePaymentsView from "./StripePaymentsView.web";

// Customizable Area Start
// Customizable Area End

export interface ViewProps {
  // Customizable Area Start
  testID: string;
  stripePromise: Promise<Stripe | null>;
  stripeClientSecret: string | undefined;
  errorString: string | undefined;
  setOrderNumber: (_: number) => void;
  orderNumber: number | undefined;
  submitOrderNumber: () => void;
  actionResult: string | undefined;
  stripeInitialised: boolean;
  isInStripeCallback: boolean;
  onHandleSubmit: (
    stripe: Stripe | null,
    stripeElements: StripeElements | null
  ) => void;
  submitOrderNumberButtonViewProps: { value: string };
  submitPaymentButtonViewProps: { value: string };
  loadingViewProps: { value: string };
  orderIdViewProps: { value: string };
  stripeMessageViewProps: { successValue: string; errorValue: string };
  // Customizable Area End
}

export interface ControllerProps {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

const subscribedMessages = [
  // Customizable Area Start
  MessageEnum.RestAPIResponceMessage,
  MessageEnum.SessionResponseMessage,
  // Customizable Area End
];

const StripePayments = ({ navigation, id }: ControllerProps) => {
  // Customizable Area Start
  const getPaymentMethodsCallId = useRef<string>("");
  // Customizable Area End

  // Customizable Area Start
  const params = new URLSearchParams(window.location.search);
  const returnedPaymentIntentClientSecret = params.get(
    "payment_intent_client_secret"
  );
  const isInStripeCallback = Boolean(returnedPaymentIntentClientSecret);
  const [orderNumber, setOrderNumber] = useState<number | undefined>(undefined);
  const [userAppAuthenticationToken, setUserAppAuthenticationToken] = useState<
    string | undefined
  >(undefined);
  const [stripePaymentIntentId, setStripePaymentIntentId] = useState<
    string | undefined
  >(undefined);
  const [stripeClientSecret, setStripeClientSecret] = useState<
    string | undefined
  >(undefined);
  const [stripeCustomerId, setStripeCustomerId] = useState<string | undefined>(
    undefined
  );
  const [stripeInitialised, setStripeInitialised] = useState<boolean>(false);
  const [stripeActionResultMessage, setStripeActionResultMessage] = useState<
    string | undefined
  >(undefined);
  const [errorString, setErrorString] = useState<string | undefined>(undefined);
  // Customizable Area End

  // Customizable Area Start
  const {
    sendBlockMessage,
    sendNetworkRequest,
    setReceiveCallback,
    subscribe,
    unsubscribeFromMessage,
  } = useRunEngine();

  const { extractNetworkResponse } = useBlockHelpers();

  const [stripePromise] = useState(loadStripe(config.stripeKey));

  const getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    sendBlockMessage(message);
  };

  const restoreSessionFromLocalStorage = () => {
    const persistedAuthToken = getStorageData("authToken", false);
    if (persistedAuthToken) {
      const messsage: Message = new Message(
        getName(MessageEnum.SessionSaveMessage)
      );
      messsage.addData(
        getName(MessageEnum.SessionResponseToken),
        persistedAuthToken
      );
      sendBlockMessage(messsage);
    }
  };
  // Customizable Area End

  const receive = (from: string, message: Message) => {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let resToken = message.getData(getName(MessageEnum.SessionResponseToken));
      if (resToken) {
        setUserAppAuthenticationToken(resToken);
      } else {
        restoreSessionFromLocalStorage();
        let resToken = message.getData(
          getName(MessageEnum.SessionResponseToken)
        );
        setUserAppAuthenticationToken(resToken);
      }
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const { apiRequestCallId, responseJson } =
        extractNetworkResponse(message);
      if (
        apiRequestCallId === getPaymentMethodsCallId.current ||
        from === "UNIT_TEST"
      ) {
        setStripeClientSecret(responseJson.data.attributes.client_secret);
        setStripePaymentIntentId(
          responseJson.data.attributes.payment_intent_id
        );
        setStripeCustomerId(responseJson.data.attributes.customer_id);
      }
    }
    // Customizable Area End
  };

  // Customizable Area Start
  const createPaymentIntent = async () => {
    if (!orderNumber) {
      setErrorString("No order number");
      return;
    }

    sendNetworkRequest(
      getPaymentMethodsCallId,
      config.createPaymentIntentMethod,
      config.createpaymentIntentEndpoint,
      {
        "Content-Type": config.creatPaymentIntentApiContentType,
        token: userAppAuthenticationToken,
      },
      {
        order_id: orderNumber,
        currency: config.stripeCurrency,
      }
    );
  };

  const checkPaymentResult = async () => {
    const stripe = await stripePromise;
    if (!stripe || !returnedPaymentIntentClientSecret) {
      return;
    }
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      returnedPaymentIntentClientSecret
    );
    if (error) {
      return;
    } else if (paymentIntent) {
      const userNotification = `STRIPE OUTCOME: ${paymentIntent.status}`;
      setStripeActionResultMessage(userNotification);
    }
  };
  // Customizable Area End

  useEffect(() => {
    setReceiveCallback(receive);
    subscribedMessages.forEach((message) => subscribe(message));
    // Customizable Area Start
    getToken();
    // Customizable Area End
    return () => {
      subscribedMessages.forEach((message) => unsubscribeFromMessage(message));
    };
  }, []);

  // Customizable Area Start
  useEffect(() => {
    checkPaymentResult();
  }, [userAppAuthenticationToken]);

  const submitOrderNumber = () => {
    console.log("userAppAuthenticationToken", userAppAuthenticationToken);
    if (userAppAuthenticationToken) {
      createPaymentIntent();
    } else {
      setErrorString("no user token available. please log in");
    }
  };

  useEffect(() => {
    if (stripeClientSecret && stripePaymentIntentId && stripeCustomerId) {
      setStripeInitialised(true);
    }
  }, [stripeClientSecret, stripePaymentIntentId, stripeCustomerId]);
  // Customizable Area End

  // Customizable Area Start
  const onHandleSubmit = async (
    stripe: Stripe | null,
    stripeElements: StripeElements | null
  ) => {
    if (!stripe || !stripeElements) {
      return;
    }
    const result = await stripe.confirmPayment({
      elements: stripeElements,
      confirmParams: { return_url: window.location.href },
    });

    if (result.error) {
      setStripeActionResultMessage(result.error.message);
    }
  };
  // Customizable Area End

  // Customizable Area Start
  const orderIdViewProps = {
    value: config.orderId,
  };

  const submitOrderNumberButtonProps = {
    value: config.submitText,
  };

  const submitPaymentButtonProps = {
    value: config.submitText,
  };

  const loadingViewProps = {
    value: config.loading,
  };

  const stripeMessageViewProps = {
    successValue: config.stripeSuccessMessage,
    errorValue: config.stripeErrorMessage,
  };
  // Customizable Area End

  const viewProps: ViewProps = {
    testID: id,
    // Customizable Area Start
    errorString,
    stripePromise: stripePromise,
    stripeClientSecret: stripeClientSecret,
    setOrderNumber: setOrderNumber,
    orderNumber: orderNumber,
    submitOrderNumber: submitOrderNumber,
    actionResult: stripeActionResultMessage,
    stripeInitialised: stripeInitialised,
    isInStripeCallback: isInStripeCallback,
    onHandleSubmit: onHandleSubmit,
    submitOrderNumberButtonViewProps: submitOrderNumberButtonProps,
    submitPaymentButtonViewProps: submitPaymentButtonProps,
    loadingViewProps: loadingViewProps,
    orderIdViewProps: orderIdViewProps,
    stripeMessageViewProps: stripeMessageViewProps,
    // Customizable Area End
  };

  return <StripePaymentsView {...viewProps} />;
};

export default StripePayments;
