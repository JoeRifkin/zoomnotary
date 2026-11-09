import React, { useEffect, useRef } from "react";

import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { useRunEngine } from "../../utilities/src/hooks/useRunEngine";
import { useBlockHelpers } from "../../utilities/src/hooks/useBlockHelpers";

import StripePaymentsComponentView from "./StripePaymentsComponentView";

// Customizable Area Start
import { useStripe } from "@stripe/stripe-react-native";
// Customizable Area End

export const config = require("./config");

export interface ViewProps {
  // Customizable Area Start
  testID: string;
  // Customizable Area End
}

export interface StripeProps {
  navigation: any;
  id: string;
  // Customizable Area Start
  order_id: string;
  onError: (error: string) => void;
  onSuccess: () => void;
  // Customizable Area End
}

const subscribedMessages = [
  // Customizable Area Start
  MessageEnum.RestAPIResponceMessage,
  MessageEnum.SessionResponseMessage,
  // Customizable Area End
];

export const StripePaymentsComponent: React.FC<StripeProps> = ({
  order_id,
  onError,
  onSuccess,
}) => {
  // Customizable Area Start
  const { presentPaymentSheet, initPaymentSheet } = useStripe();
  const token = useRef("");
  const paymentIntentCallId = useRef("");
  // Customizable Area End

  // Customizable Area Start
  const {
    sendBlockMessage,
    sendNetworkRequest,
    setReceiveCallback,
    subscribe,
    debugLog,
    unsubscribeFromMessage,
  } = useRunEngine();

  const { extractNetworkResponse } = useBlockHelpers();
  // Customizable Area End

  useEffect(() => {
    setReceiveCallback(receive);

    subscribedMessages.forEach((message) => subscribe(message));

    // Customizable Area Start
    if (!token.current) {
      getToken();
    }
    // Customizable Area End

    return () => {
      subscribedMessages.forEach((message) => unsubscribeFromMessage(message));

      // Customizable Area Start
      // Customizable Area End
    };
  }, []);

  // Customizable Area Start
  const getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    sendBlockMessage(message);
  };
  // Customizable Area End

  const receive = async (from: string, message: Message) => {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let resToken = message.getData(getName(MessageEnum.SessionResponseToken));
      debugLog("TOKEN", resToken);
      token.current = resToken;
      if (token.current) {
        createPaymentIntent();
      } else {
        onError("Please login");
      }
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const { apiRequestCallId, responseJson } =
        extractNetworkResponse(message);
      debugLog("API Message Received", message);
      if (responseJson?.data) {
        if (apiRequestCallId === paymentIntentCallId.current) {
          const clientSecret = responseJson.data.attributes.client_secret;
          const paymentSheetConfig = {
            merchantDisplayName: config.stripeMerchantDisplayName,
            customerId: responseJson.data.attributes.customer_id,
            paymentIntentClientSecret: clientSecret,
          };
          const { error: initPaymentSheetError } = await initPaymentSheet(
            paymentSheetConfig
          );
          if (initPaymentSheetError) {
            onError(initPaymentSheetError.message);
            return;
          }
          openStripePaymentSheet();
        }
      } else if (responseJson?.errors) {
        debugLog(responseJson.errors);
        onError(responseJson.errors[0].stripe);
      } else {
        onError("Unexpected error occurred");
      }
    }
    // Customizable Area End
  };

  // Customizable Area Start
  const createPaymentIntent = () => {
    const headers = {
      "Content-Type": config.apiContentType,
      token: token.current,
    };

    const httpBody = {
      order_id: order_id,
    };

    sendNetworkRequest(
      paymentIntentCallId,
      config.confirmPaymentMethod,
      config.stripePaymentIntent,
      headers,
      httpBody
    );
  };

  const openStripePaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      onError(error.message);
    } else {
      onSuccess();
    }
  };
  // Customizable Area End

  const viewProps: ViewProps = {
    // Customizable Area Start
    testID: "MobileStripePaymentsView",
    // Customizable Area End
  };

  return <StripePaymentsComponentView {...viewProps} />;
};
