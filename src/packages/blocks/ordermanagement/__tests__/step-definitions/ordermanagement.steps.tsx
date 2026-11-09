import React from "react";
import { View } from "react-native";
import { render, waitFor } from "@testing-library/react-native";
import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import OrderManagement from "../../src/OrderManagement";

jest.mock("../../src/OrderManagementView.tsx", () => (props: any) => (
  <View {...props} />
));

let apiCallId: string = "";

let receiveCallback: (from: string, message: Message) => void = () => {};
const sendNetworkRequestMock = jest.fn(
  (callIdRef: React.MutableRefObject<string>) => {
    apiCallId = uuidv4();
    callIdRef.current = apiCallId;
  }
);
const sendBlockMessageMock = jest.fn();
jest.mock("../../../utilities/src/hooks/useRunEngine.ts", () => ({
  useRunEngine: () => ({
    sendMessage: jest.fn(),
    subscribe: jest.fn(),
    debugLog: jest.fn(),
    sendBlockMessage: sendBlockMessageMock,
    sendNetworkRequest: sendNetworkRequestMock,
    setReceiveCallback: jest.fn((callback) => (receiveCallback = callback)),
    unsubscribeFromMessage: jest.fn(),
  }),
}));

jest.spyOn(helpers, "getOS").mockImplementation(() => "web");

const screenProps = {
  navigation: {
    getParam: jest.fn().mockReturnValue("12"),
    navigate: jest.fn(),
  },
  id: "OrderManagement",
};

window.alert = jest.fn();

describe("OrderManagement", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("Component render without crashes", () => {
    const { container } = render(<OrderManagement {...screenProps} />);
    expect(container).toBeTruthy();
  });

  it("User access this page without login", async () => {
    render(<OrderManagement {...screenProps} />);
    await waitFor(() => {
      const receiveMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      receiveMessage.initializeFromObject({
        [getName(MessageEnum.SessionResponseToken)]: apiCallId,
        [getName(MessageEnum.SessionResponseToken)]: "",
      });
      receiveCallback("Unit Test", receiveMessage);
      expect(window.alert).toBeCalledWith("Please login first");
    });
  });

  it("should be called getorders network api when got user login token from session response", async () => {
    render(<OrderManagement {...screenProps} />);
    await waitFor(() => {
      const receiveMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      receiveMessage.initializeFromObject({
        [getName(MessageEnum.SessionResponseToken)]: apiCallId,
        [getName(MessageEnum.SessionResponseToken)]: "user-login-token-string",
      });
      receiveCallback("Unit Test", receiveMessage);

      expect(sendNetworkRequestMock).toBeCalledWith(
        expect.any(Object),
        "GET",
        "order_management/orders",
        {
          "Content-Type": "application/json",
          token: expect.any(String),
        }
      );
    });
  });

  it("should send api orders response data when a get order network is called", async () => {
    render(<OrderManagement {...screenProps} />);
    await waitFor(() => {
      const receiveMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      receiveMessage.initializeFromObject({
        [getName(MessageEnum.SessionResponseToken)]: apiCallId,
        [getName(MessageEnum.SessionResponseToken)]: "user-login-token-string",
      });
      receiveCallback("Unit Test", receiveMessage);

      const responseJson = {
        data: [],
      };
      const responseMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      responseMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiCallId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: responseJson,
      });
      receiveCallback("Unit Test", responseMsg);
    });
  });

  it("should isVisibleCreateModal props is true when user open modal for create order", async () => {
    const { queryByTestId } = render(<OrderManagement {...screenProps} />);
    const view = queryByTestId("OrderManagementView");
    await waitFor(() => {
      view?.props.openCreateModal();
      expect(view?.props.isVisibleCreateModal).toBeTruthy();
    });
  });

  it("should network called and get response when user submit create order form", async () => {
    const { queryByTestId } = render(<OrderManagement {...screenProps} />);
    const view = queryByTestId("OrderManagementView");

    await waitFor(() => {
      view?.props.onSubmitCreateOrder();

      expect(sendNetworkRequestMock).toBeCalledWith(
        expect.any(Object),
        "POST",
        "order_management/orders",
        {
          "Content-Type": "application/json",
          token: expect.any(String),
        },
        {
          catalogue_id: 0,
          catalogue_variant_id: 0,
          quantity: 0,
        }
      );

      const responseJson = {
        msg: "Order ID not present",
      };
      const responseMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      responseMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiCallId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: responseJson,
      });
      receiveCallback("Unit Test", responseMsg);

      expect(window.alert).toBeCalledWith('"Order ID not present"');
    });
  });

  it("should openAddItemModalHandler called when user open modal for add order item", () => {
    const { queryByTestId } = render(<OrderManagement {...screenProps} />);
    const view = queryByTestId("OrderManagementView");
    waitFor(() => {
      view?.props.openAddItemModalHandler(2);
      expect(view?.props.openAddItemModalHandler).toBeCalled();
    });
  });

  it("should network called and get response data when user submit add order item form", async () => {
    const { queryByTestId } = render(<OrderManagement {...screenProps} />);
    const view = queryByTestId("OrderManagementView");

    await waitFor(() => {
      view?.props.openAddItemModalHandler(20);
      view?.props.setCatalogueId("1");
      view?.props.setCatalogueVariantId("1");
      view?.props.setQuantity("1");
      view?.props.onSubmitCreateOrder();

      expect(sendNetworkRequestMock).toBeCalledWith(
        expect.any(Object),
        "POST",
        "order_management/orders/20/add_order_items",
        {
          "Content-Type": "application/json",
          token: expect.any(String),
        },
        {
          order_items: [
            {
              catalogue_id: 1,
              catalogue_variant_id: 1,
              quantity: 1,
            },
          ],
        }
      );

      const responseJson = {
        data: {},
      };
      const responseMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      responseMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiCallId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: responseJson,
      });
      receiveCallback("Unit Test", responseMsg);
    });
  });

  it("should all field is emplty when user close modal", () => {
    const { queryByTestId } = render(<OrderManagement {...screenProps} />);
    const view = queryByTestId("OrderManagementView");
    waitFor(() => {
      view?.props.resetCreateOrderModal();
      expect(view?.props.setCatalogueId).toBeCalledWith("");
      expect(view?.props.setCatalogueVariantId).toBeCalledWith("");
      expect(view?.props.setQuantity).toBeCalledWith("");
    });
  });

  it("should navigation called when user press on any order", () => {
    const { queryByTestId } = render(<OrderManagement {...screenProps} />);
    const view = queryByTestId("OrderManagementView");
    waitFor(() => {
      view?.props.navigateToOrderDetail(2);
      expect(screenProps.navigation.navigate).toBeCalledWith("OrderDetails", {
        orderId: 2,
      });
    });
  });
});
