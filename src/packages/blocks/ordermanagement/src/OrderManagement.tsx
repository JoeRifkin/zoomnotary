import React, { useEffect, useRef, useState } from "react";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { useRunEngine } from "../../utilities/src/hooks/useRunEngine";
import { useBlockHelpers } from "../../utilities/src/hooks/useBlockHelpers";

import OrderManagementView from "./OrderManagementView";

// Customizable Area Start
import { Order } from "./types";
// Customizable Area End

export const configJSON = require("./config");

export interface ViewProps {
  testID: string;
  // Customizable Area Start
  orders: Order[];
  loading: boolean;
  hideKeyboard: () => void;
  openCreateModal: () => void;
  isVisibleCreateModal: boolean;
  catalogueId: string;
  setCatalogueId: (text: string) => void;
  catalogueVariantId: string;
  setCatalogueVariantId: (text: string) => void;
  quantity: string;
  setQuantity: (text: string) => void;
  onSubmitCreateOrder: () => void;
  navigateToOrderDetail: (orderId: string) => void;
  openAddItemModalHandler: (orderId: number) => void;
  resetCreateOrderModal: () => void;
  selectedOrderId: null | number;
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

const OrderManagement: React.FC<Props> = (props) => {
  // Customizable Area Start
  const getOrdersCallId = useRef("");
  const createOrdersCallId = useRef("");

  const [isVisibleCreateModal, setIsVisibleCreateModal] =
    useState<boolean>(false);
  const [catalogueId, setCatalogueId] = useState<string>("");
  const [catalogueVariantId, setCatalogueVariantId] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [selectedOrderId, setSelectedOrderId] = useState<null | number>(null);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const token = useRef<string>("");
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
        getListOfOrders();
      } else {
        alert(configJSON.loginAlertMsg);
      }
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const { apiRequestCallId, responseJson } =
        extractNetworkResponse(message);
      setLoading(false);

      if (responseJson) {
        if (
          apiRequestCallId === getOrdersCallId.current &&
          responseJson?.data
        ) {
          setOrders(responseJson.data);
          getOrdersCallId.current = "";
        } else if (apiRequestCallId === createOrdersCallId.current) {
          if (responseJson.data) {
            resetCreateOrderModal();
            getListOfOrders();
          } else if (responseJson?.msg) {
            alert(JSON.stringify(responseJson.msg));
          }
          createOrdersCallId.current = "";
        }
      }

      if (responseJson?.errors) {
        alert(JSON.stringify(responseJson.errors));
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

  const getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    sendBlockMessage(message);
  };

  useEffect(() => {
    if (props.navigation.getParam("orderDeleted") && !isPlatformWeb()) {
      getListOfOrders();
    }
  }, [props.navigation.getParam("orderDeleted")]);

  const getListOfOrders = () => {
    setLoading(true);
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: token.current,
    };

    sendNetworkRequest(
      getOrdersCallId,
      configJSON.listOfOrdersMethod,
      configJSON.listOfOrdersEndPoints,
      headers
    );
  };

  const onSubmitCreateOrder = () => {
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: token.current,
    };

    const order_item = {
      catalogue_id: Number(catalogueId),
      catalogue_variant_id: Number(catalogueVariantId),
      quantity: Number(quantity),
    };

    const httpBody =
      selectedOrderId === null ? order_item : { order_items: [order_item] };

    const endPoint =
      selectedOrderId === null
        ? configJSON.createOrderEndPoint
        : configJSON.createOrderItemInOrderEndPoint.replace(
            ":id",
            selectedOrderId
          );

    sendNetworkRequest(
      createOrdersCallId,
      configJSON.createOrderMethod,
      endPoint,
      headers,
      httpBody
    );
  };

  const openCreateModal = () => {
    setIsVisibleCreateModal(true);
  };

  const resetCreateOrderModal = () => {
    setCatalogueId("");
    setCatalogueVariantId("");
    setQuantity("");
    setSelectedOrderId(null);
    setIsVisibleCreateModal(false);
  };

  const openAddItemModalHandler = (orderId: number) => {
    setSelectedOrderId(orderId);
    openCreateModal();
  };

  const navigateToOrderDetail = (orderId: string) => {
    props.navigation.navigate("OrderDetails", {
      orderId: orderId,
    });
  };
  // Customizable Area End

  const viewProps: ViewProps = {
    testID: "OrderManagementView",
    // Customizable Area Start
    orders,
    loading,
    hideKeyboard,
    openCreateModal,
    isVisibleCreateModal,
    catalogueId,
    setCatalogueId,
    catalogueVariantId,
    setCatalogueVariantId,
    quantity,
    setQuantity,
    onSubmitCreateOrder,
    navigateToOrderDetail,
    openAddItemModalHandler,
    resetCreateOrderModal,
    selectedOrderId,
    // Customizable Area End
  };

  return <OrderManagementView {...viewProps} />;
};

export default OrderManagement;
