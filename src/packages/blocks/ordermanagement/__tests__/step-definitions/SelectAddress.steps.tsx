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

import SelectAddress from "../../src/SelectAddress";

const address: any = [
  {
    id: "1",
    type: "addresses",
    attributes: {
      id: 1,
      name: "Home",
      flat_no: "f-12",
      address: "address-line-1",
      address_line_2: "address-line-2",
      address_type: "shipping",
      zip_code: "123456",
      phone_number: "+445253345322",
      address_for: "shipping",
      city: "city name",
      state: "state name",
      country: "country name",
      landmark: "landmark",
      created_at: "2023-02-16T16:01:19.557Z",
      updated_at: "2023-02-16T16:01:19.557Z",
    },
  },
];

jest.mock("../../src/SelectAddressView.tsx", () => (props: any) => (
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
  id: "SelectAddress",
};

window.alert = jest.fn();

describe("SelectAddress", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("Component render without crashes", () => {
    const { container } = render(<SelectAddress {...screenProps} />);
    expect(container).toBeTruthy();
  });

  it("User access this page without login", async () => {
    render(<SelectAddress {...screenProps} />);
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

  it("should be called get address network api when got user login token from session response", async () => {
    render(<SelectAddress {...screenProps} />);
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
        "order_management/addresses",
        {
          "Content-Type": "application/json",
          token: expect.any(String),
        }
      );
    });
  });

  it("should send api address response data when a get address network is called", async () => {
    render(<SelectAddress {...screenProps} />);
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
        data: address,
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

  it("should isVisibleCreateAddress state is true when user click on add new address button", async () => {
    const { queryByTestId } = render(<SelectAddress {...screenProps} />);
    const view = queryByTestId("SelectAddressView");
    await waitFor(() => {
      view?.props.openCreateAddress();
      expect(view?.props.isVisibleCreateAddress);
    });
  });

  it("should add address network call when addAddressHandler function called", async () => {
    const { queryByTestId } = render(<SelectAddress {...screenProps} />);
    const view = queryByTestId("SelectAddressView");
    await waitFor(() => {
      view?.props.addAddressHandler();
      view?.props.setTextFields({
        type: "phone_number",
        payload: "9876543210",
      });
      view?.props.setTextFields({ type: "name", payload: "home" });

      expect(sendNetworkRequestMock).toBeCalledWith(
        expect.any(Object),
        "POST",
        "order_management/addresses",
        {
          "Content-Type": "application/json",
          token: expect.any(String),
        },
        {
          phone_number: "9876543210",
          name: "home",
        }
      );
    });
  });

  it("should network response get when add address api called", async () => {
    const { queryByTestId } = render(<SelectAddress {...screenProps} />);
    const view = queryByTestId("SelectAddressView");
    await waitFor(() => {
      view?.props.addAddressHandler();

      const responseJson = {
        data: address[0],
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

  it("should add address in order network call when selectAddress function called", async () => {
    const { queryByTestId } = render(<SelectAddress {...screenProps} />);
    const view = queryByTestId("SelectAddressView");
    await waitFor(() => {
      view?.props.selectAddress({ id: 1 });

      expect(sendNetworkRequestMock).toBeCalledWith(
        expect.any(Object),
        "PUT",
        "order_management/orders/10/add_address_to_order",
        {
          "Content-Type": "application/json",
          token: expect.any(String),
        },
        {
          address_id: 1,
          address: {
            billing_address: {
              id: 1,
            },
          },
        }
      );

      const responseJson = {
        message: "Address added successfully",
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

  it("should add address in order network call fail case when selectAddress function called", async () => {
    const { queryByTestId } = render(<SelectAddress {...screenProps} />);
    const view = queryByTestId("SelectAddressView");
    await waitFor(() => {
      view?.props.selectAddress({ id: 1 });

      const responseJson = {
        message: "Something went wrong.",
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
});
