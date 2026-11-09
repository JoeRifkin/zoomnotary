import React, { useEffect, useReducer, useRef, useState } from "react";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { useRunEngine } from "../../utilities/src/hooks/useRunEngine";
import { useBlockHelpers } from "../../utilities/src/hooks/useBlockHelpers";

import SelectAddressView from "./SelectAddressView";

export const configJSON = require("./config");

// Customizable Area Start
import { Address, TextFields } from "./types";

const initialTextFields: TextFields[] = [
  {
    name: "phone_number",
    value: "",
    placeholder: configJSON.phoneNoPlaceholder,
    testId: "phone_number",
  },
  {
    name: "address_type",
    value: "",
    placeholder: configJSON.addressTypePlaceholder,
    testId: "address_type",
  },
  {
    name: "name",
    value: "",
    placeholder: configJSON.namePlaceholder,
    testId: "name",
  },
  {
    name: "zip_code",
    value: "",
    placeholder: configJSON.zipCodePlaceholder,
    testId: "zip_code",
  },
  {
    name: "flat_no",
    value: "",
    placeholder: configJSON.flatNoPlaceholder,
    testId: "flat_no",
  },
  {
    name: "address",
    value: "",
    placeholder: configJSON.addressPlaceholder,
    testId: "address",
  },
  {
    name: "address_line_2",
    value: "",
    placeholder: configJSON.addressLine2Placeholder,
    testId: "address_line_2",
  },
  {
    name: "landmark",
    value: "",
    placeholder: configJSON.landmarkPlaceholder,
    testId: "landmark",
  },
  {
    name: "city",
    value: "",
    placeholder: configJSON.cityPlaceholder,
    testId: "city",
  },
  {
    name: "state",
    value: "",
    placeholder: configJSON.statePlaceholder,
    testId: "state",
  },
  {
    name: "country",
    value: "",
    placeholder: configJSON.countryPlaceholder,
    testId: "country",
  },
];
// Customizable Area End

export interface ViewProps {
  testID: string;
  // Customizable Area Start
  addresses: Address[];
  hideKeyboard: () => void;
  openCreateAddress: () => void;
  isVisibleCreateAddress: boolean;
  resetCreateModal: () => void;
  setTextFields: (action: { type: string; payload: string }) => void;
  textFields: TextFields[];
  addAddressHandler: () => void;
  addressId: string | undefined;
  orderId: string | undefined;
  selectAddress: (item: Address) => void;
  loading: boolean;
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

const SelectAddress: React.FC<Props> = (props) => {
  // Customizable Area Start
  const addressId: undefined | string = props.navigation.getParam("addressId");
  const orderId: undefined | string = props.navigation.getParam("orderId");

  const getAddressesCallId = useRef("");
  const createAddressesCallId = useRef("");
  const selectAddressesCallId = useRef("");
  const token = useRef<string>("");
  const updateFields: (
    state: TextFields[],
    action: { type: string; payload: string }
  ) => TextFields[] = (state, action) => {
    const updateState = state.map((item) =>
      item.name === action.type
        ? {
            ...item,
            value: action.payload,
          }
        : item
    );
    return updateState;
  };

  const [textFields, setTextFields] = useReducer(
    updateFields,
    initialTextFields
  );
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isVisibleCreateAddress, setIsVisibleCreateAddress] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
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
        getAddresses();
        setLoading(false);
      } else {
        alert(configJSON.loginAlertMsg);
      }
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const { apiRequestCallId, responseJson } =
        extractNetworkResponse(message);
      if (responseJson) {
        if (apiRequestCallId === getAddressesCallId.current) {
          if (responseJson?.data) {
            setAddresses(responseJson.data);
          }
          setLoading(false);
          getAddressesCallId.current = "";
        } else if (apiRequestCallId === createAddressesCallId.current) {
          if (responseJson?.error) {
            alert(JSON.stringify(responseJson.error));
          } else if (responseJson?.data) {
            resetCreateModal();
            getAddresses();
          }
          createAddressesCallId.current = "";
        } else if (apiRequestCallId === selectAddressesCallId.current) {
          if (responseJson?.message === "Address added successfully") {
            navigateToOrderDetail();
          } else {
            alert(JSON.stringify(responseJson?.message));
          }
          selectAddressesCallId.current = "";
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

  const { extractNetworkResponse, hideKeyboard } = useBlockHelpers();

  const getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    sendBlockMessage(message);
  };

  const getAddresses = () => {
    setLoading(true);
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: token.current,
    };

    sendNetworkRequest(
      getAddressesCallId,
      configJSON.getAddressListMethod,
      configJSON.getAddressListEndPoint,
      headers
    );
  };

  const addAddressHandler = () => {
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: token.current,
    };

    const httpBody: { [key: string]: string } = {};

    textFields.map((textField) => {
      if (textField.value !== "") {
        httpBody[textField.name] = textField.value;
      }
    });

    sendNetworkRequest(
      createAddressesCallId,
      configJSON.createAddressMethod,
      configJSON.createAddressEntPoint,
      headers,
      httpBody
    );
  };

  const openCreateAddress = () => {
    setIsVisibleCreateAddress(true);
  };

  const resetCreateModal = () => {
    setIsVisibleCreateAddress(false);
  };

  const navigateToOrderDetail = () => {
    props.navigation.navigate("OrderDetails", {
      orderId: orderId,
      backFrom: "selectAddress" + Math.random(),
    });
  };

  const selectAddress = (item: Address) => {
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: token.current,
    };

    const httpBody = {
      address_id: item.id,
      address: {
        billing_address: item,
      },
    };

    sendNetworkRequest(
      selectAddressesCallId,
      configJSON.addAddressToAddressMethod,
      configJSON.addAddressToAddressEndPoint.replace(":id", orderId),
      headers,
      httpBody
    );
  };
  // Customizable Area End

  const viewProps: ViewProps = {
    testID: "SelectAddressView",
    // Customizable Area Start
    addresses,
    hideKeyboard,
    openCreateAddress,
    isVisibleCreateAddress,
    resetCreateModal,
    setTextFields,
    textFields,
    addAddressHandler,
    addressId,
    orderId,
    selectAddress,
    loading,
    // Customizable Area End
  };

  return <SelectAddressView {...viewProps} />;
};

export default SelectAddress;
