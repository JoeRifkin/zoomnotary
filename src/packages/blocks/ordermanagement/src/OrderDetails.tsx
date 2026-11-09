import React, { useEffect, useRef, useState } from "react";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { useRunEngine } from "../../utilities/src/hooks/useRunEngine";
import { useBlockHelpers } from "../../utilities/src/hooks/useBlockHelpers";

import OrderDetailsView from "./OrderDetailsView";

// Customizable Area Start
import { Order } from "./types";
// Customizable Area End

export const configJSON = require("./config");

export interface ViewProps {
  testID: string;
  // Customizable Area Start
  order: Order | undefined;
  hideKeyboard: () => void;
  deleteOrderItem: (orderItemId: number) => void;
  couponCode: string;
  setCouponCode: (text: string) => void;
  applyCouponCode: () => void;
  navigateToAddress: (addressId: number | null, orderId: number) => void;
  loading: boolean;
  handledeleteOrder: () => void;
  handleCancelOrder: () => void;
  // Customizable Area End
}

export interface Props {
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

const OrderDetails: React.FC<Props> = (props) => {
  // Customizable Area Start
  const orderId: undefined | string = props.navigation.getParam("orderId");
  const backFrom: undefined | string = props.navigation.getParam("backFrom");

  const getOrderCallId = useRef("");
  const deleteOrderItemCallId = useRef("");
  const applyCouponCodeCallId = useRef("");
  const deleteOrderCallId = useRef("");
  const cancelOrderCallId = useRef("");
  const token = useRef<string>("");

  const [order, setOrder] = useState<Order>();
  const [loading, setLoading] = useState<boolean>(true);
  const [couponCode, setCouponCode] = useState<string>("");
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

  const receive = (from: string, message: Message) => {
    // Customizable Area Start
    debugLog("API Message Received", message);
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const resToken = message.getData(
        getName(MessageEnum.SessionResponseToken)
      );
      debugLog("TOKEN", resToken);
      if (resToken) {
        token.current = resToken;
        getOrder();
      } else {
        alert(configJSON.loginAlertMsg);
      }
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const { apiRequestCallId, responseJson } =
        extractNetworkResponse(message);
      if (responseJson) {
        if (apiRequestCallId === getOrderCallId.current) {
          if (responseJson?.data) {
            setOrder(responseJson.data);
            getOrderCallId.current = "";
          }
          setLoading(false);
          getOrderCallId.current = "";
        } else if (apiRequestCallId === deleteOrderItemCallId.current) {
          getOrder();
          deleteOrderItemCallId.current = "";
        } else if (apiRequestCallId === applyCouponCodeCallId.current) {
          if (responseJson.message) {
            alert(JSON.stringify(responseJson.message));
          } else if (responseJson.data?.message) {
            alert(JSON.stringify(responseJson.data.message));
            setCouponCode("");
            getOrder();
          }
          applyCouponCodeCallId.current = "";
        } else if (apiRequestCallId === deleteOrderCallId.current) {
          if (responseJson) {
            navigateGoBack();
          }
          deleteOrderCallId.current = "";
        } else if (apiRequestCallId === cancelOrderCallId.current) {
          if (responseJson) {
            getOrder();
          }
          cancelOrderCallId.current = "";
        }
      }
    }
    // Customizable Area End
  };

  // Customizable Area Start
  const {
    sendBlockMessage,
    sendNetworkRequest,
    setReceiveCallback,
    subscribe,
    debugLog,
    unsubscribeFromMessage,
  } = useRunEngine();

  const { extractNetworkResponse, hideKeyboard, isPlatformWeb } =
    useBlockHelpers();

  useEffect(() => {
    if (backFrom && !isPlatformWeb()) {
      getToken();
      setLoading(true);
    }
  }, [backFrom]);

  const getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    sendBlockMessage(message);
  };

  const getOrder = () => {
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: token.current,
    };
    sendNetworkRequest(
      getOrderCallId,
      configJSON.getOrderByIdMethod,
      configJSON.getOrderByIdEndPoint.replace(":id", orderId),
      headers
    );
  };

  const deleteOrderItem = (orderItemId: number) => {
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: token.current,
    };

    const httpBody = {
      order_items_ids: [orderItemId],
    };

    sendNetworkRequest(
      deleteOrderItemCallId,
      configJSON.deleteOrderItemMethod,
      configJSON.deleteOrderItemEndPoint.replace(":id", orderId),
      headers,
      httpBody
    );
  };

  const applyCouponCode = () => {
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: token.current,
    };

    const httpBody = {
      code: couponCode,
    };

    sendNetworkRequest(
      applyCouponCodeCallId,
      configJSON.appplyCouponCodeMethod,
      configJSON.appplyCouponCodeEndpoint.replace(":id", orderId),
      headers,
      httpBody
    );
  };

  const navigateToAddress = (addressId: number | null, _orderId: number) => {
    props.navigation.navigate("SelectAddress", {
      orderId: _orderId,
      addressId: `${addressId}`,
    });
  };

  const handledeleteOrder = () => {
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: token.current,
    };

    sendNetworkRequest(
      deleteOrderCallId,
      configJSON.deleteOrderMethod,
      configJSON.deleteOrderEndPoint.replace(":id", orderId),
      headers
    );
  };

  const handleCancelOrder = () => {
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: token.current,
    };

    sendNetworkRequest(
      cancelOrderCallId,
      configJSON.cencelOrderMethod,
      configJSON.cencelOrderEndPoint.replace(":id", orderId),
      headers
    );
  };

  const navigateGoBack = () => {
    props.navigation.navigate("OrderManagement", {
      orderDeleted: orderId,
    });
  };
  // Customizable Area End

  const viewProps: ViewProps = {
    testID: "OrderDetailsView",
    // Customizable Area Start
    order,
    hideKeyboard,
    deleteOrderItem,
    couponCode,
    setCouponCode,
    applyCouponCode,
    navigateToAddress,
    loading,
    handledeleteOrder,
    handleCancelOrder,
    // Customizable Area End
  };

  return <OrderDetailsView {...viewProps} />;
};

export default OrderDetails;
