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

import OrderDetails from "../../src/OrderDetails";

const order: any = {
  id: "23",
  type: "order",
  attributes: {
    id: 23,
    order_number: "OD00000022",
    account_id: 2,
    sub_total: "9.0",
    total: "-10.5",
    status: "created",
    applied_discount: "10.5",
    tax_charges: "0.0",
    order_status_id: 3,
    total_tax: 10.62,
    created_at: "2023-02-13T19:56:26.921Z",
    order_items: [
      {
        id: "27",
        attributes: {
          id: 27,
          quantity: 1,
          total_price: "9.0",
          created_at: "2023-02-13T19:56:26.933Z",
          updated_at: "2023-02-15T14:13:54.027Z",
          order: {
            id: 23,
          },
          catalogue: {
            attributes: {
              name: "",
              category: {
                name: "food",
              },
            },
          },
        },
      },
    ],
  },
};

jest.mock("../../src/OrderDetailsView.tsx", () => (props: any) => (
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
    getParam: jest.fn().mockReturnValue("10"),
    navigate: jest.fn(),
  },
  id: "OrderDetails",
};

window.alert = jest.fn();

describe("OrderDetails", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("Component render without crashes", () => {
    const { container } = render(<OrderDetails {...screenProps} />);
    expect(container).toBeTruthy();
  });

  it("User access this page without login", async () => {
    render(<OrderDetails {...screenProps} />);
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

  it("should be called getorde network api when got user login token from session response", async () => {
    render(<OrderDetails {...screenProps} />);
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
        "order_management/orders/10",
        {
          "Content-Type": "application/json",
          token: expect.any(String),
        }
      );
    });
  });

  it("should send api order response data when a get order network is called", async () => {
    render(<OrderDetails {...screenProps} />);
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
        data: order,
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

  it("should send network request call when user apply coupon code", async () => {
    const { queryByTestId } = render(<OrderDetails {...screenProps} />);
    const view = queryByTestId("OrderDetailsView");
    await waitFor(() => {
      view?.props.applyCouponCode();
      view?.props.setCouponCode("test-code");
      expect(sendNetworkRequestMock).toBeCalledWith(
        expect.any(Object),
        "POST",
        "order_management/orders/10/apply_coupon",
        {
          "Content-Type": "application/json",
          token: expect.any(String),
        },
        {
          code: "test-code",
        }
      );

      const responseJson = {
        data: {
          message: "coupn code applied",
        },
      };
      const responseMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      responseMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiCallId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: responseJson,
      });
      receiveCallback("Unit Test", responseMsg);
      expect(global.alert).toBeCalledWith('"coupn code applied"');
    });
  });

  it("should send network request call when user cancel order", async () => {
    const { queryByTestId } = render(<OrderDetails {...screenProps} />);
    const view = queryByTestId("OrderDetailsView");

    await waitFor(() => {
      view?.props.handleCancelOrder();

      expect(sendNetworkRequestMock).toBeCalledWith(
        expect.any(Object),
        "PUT",
        "order_management/orders/10/cancel_order",
        {
          "Content-Type": "application/json",
          token: expect.any(String),
        }
      );

      const responseJson = {
        data: {
          message: "order successfully cancelled",
        },
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

  it("should send network request call when user delete order item", async () => {
    const { queryByTestId } = render(<OrderDetails {...screenProps} />);
    const view = queryByTestId("OrderDetailsView");

    await waitFor(() => {
      const deleteOrderIt = 2;
      view?.props.deleteOrderItem(deleteOrderIt);

      expect(sendNetworkRequestMock).toBeCalledWith(
        expect.any(Object),
        "DELETE",
        "order_management/orders/10/remove_order_items",
        {
          "Content-Type": "application/json",
          token: expect.any(String),
        },
        {
          order_items_ids: [deleteOrderIt],
        }
      );

      const responseJson = {
        data: {
          message: "order item successfully deleted",
        },
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

  it("should send network request call when user delete order", async () => {
    const { queryByTestId } = render(<OrderDetails {...screenProps} />);
    const view = queryByTestId("OrderDetailsView");

    await waitFor(() => {
      view?.props.handledeleteOrder();

      expect(sendNetworkRequestMock).toBeCalledWith(
        expect.any(Object),
        "DELETE",
        "order_management/orders/10",
        {
          "Content-Type": "application/json",
          token: expect.any(String),
        }
      );

      const responseJson = {
        data: {
          message: "order successfully deleted",
        },
      };
      const responseMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      responseMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: apiCallId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: responseJson,
      });
      receiveCallback("Unit Test", responseMsg);
      expect(screenProps.navigation.navigate).toBeCalledWith(
        "OrderManagement",
        { orderDeleted: "10" }
      );
    });
  });

  it("should navigation called when user press on address button", () => {
    const { queryByTestId } = render(<OrderDetails {...screenProps} />);
    const view = queryByTestId("OrderDetailsView");
    waitFor(() => {
      view?.props.navigateToAddress(2, 10);
      expect(screenProps.navigation.navigate).toBeCalledWith("OrderDetails", {
        orderId: "10",
        addressId: 2,
      });
    });
  });
});
