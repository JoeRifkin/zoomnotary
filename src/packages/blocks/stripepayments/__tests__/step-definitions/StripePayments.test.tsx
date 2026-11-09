import * as React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import StripePayments, { StripeProps } from "../../src/StripePayments";
import { defineFeature, loadFeature } from "jest-cucumber";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

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

const stripeScreenProps: StripeProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "",
};

const initPaymentSheet = jest.fn(async () => ({
  paymentOption: {},
}));

jest.mock("@stripe/stripe-react-native", () => {
  return {
    StripeProvider: () => <></>,
    useStripe: () => {
      return {
        initPaymentSheet: initPaymentSheet,
        presentPaymentSheet: initPaymentSheet,
      };
    },
  };
});

const renderStripeScreen = (props?: StripeProps) => {
  const stripeProps = props ? props : stripeScreenProps;
  return render(<StripePayments {...stripeProps} />);
};

const feature = loadFeature("./__tests__/features/stripePayments.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Create a Payment while not logged in", ({ given, when, then }) => {
    let StripePaymentScreen: any;

    given("I am trying to make a Payment", async () => {
      StripePaymentScreen = renderStripeScreen();
      expect(StripePaymentScreen).toBeTruthy();
      await act(async () => {
        await fireEvent.press(
          StripePaymentScreen.getByText("Show Payment Sheet")
        );
      });
    });

    when("I open payment sheet while not logged in", async () => {
      await waitFor(() => {
        const sessionResponseMessage = new Message(
          getName(MessageEnum.SessionResponseMessage)
        );
        receiveCallback("Unit Test", sessionResponseMessage);
      });
    });

    then("I receive an error stating I need to be logged in", async () => {
      await waitFor(() =>
        expect(
          StripePaymentScreen.getByTestId("errorText").props.children
        ).toEqual("Please login")
      );
    });
  });

  test("Stripe Payment Intent Fails", ({ given, when, then }) => {
    let StripePaymentScreen: any;

    given("I am trying to make a Payment", async () => {
      StripePaymentScreen = renderStripeScreen();
      expect(StripePaymentScreen).toBeTruthy();
      await act(async () => {
        await fireEvent.press(
          StripePaymentScreen.getByText("Show Payment Sheet")
        );
      });
    });

    when("I open payment sheet and Stripe Payment API call fails", async () => {
      await waitFor(() => {
        const sessionResponseMessage = new Message(
          getName(MessageEnum.SessionResponseMessage)
        );
        sessionResponseMessage.initializeFromObject({
          [getName(MessageEnum.SessionResponseToken)]: "test token",
        });

        receiveCallback("Unit Test", sessionResponseMessage);

        const networkResponseMessage = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );

        networkResponseMessage.initializeFromObject({
          [getName(MessageEnum.RestAPIResponceDataMessage)]: apiCallId,
          [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
            errors: [
              {
                stripe: "test",
              },
            ],
          },
        });
        receiveCallback("Unit Test", networkResponseMessage);
      });
    });

    then("I receive an error callback from the API", async () => {
      await waitFor(() => {
        expect(sendNetworkRequestMock).toBeCalled();
        expect(
          StripePaymentScreen.getByTestId("errorText").props.children
        ).toEqual("test");
      });
    });
  });

  test("Stripe Payment Intent Fails with Unknown reason", ({
    given,
    when,
    then,
  }) => {
    let StripePaymentScreen: any;

    given("I am trying to make a Payment", async () => {
      StripePaymentScreen = renderStripeScreen();
      expect(StripePaymentScreen).toBeTruthy();
      await act(async () => {
        await fireEvent.press(
          StripePaymentScreen.getByText("Show Payment Sheet")
        );
      });
    });

    when(
      "I open payment sheet and Stripe Payment API call fails with unknown issue",
      async () => {
        await waitFor(() => {
          const sessionResponseMessage = new Message(
            getName(MessageEnum.SessionResponseMessage)
          );
          sessionResponseMessage.initializeFromObject({
            [getName(MessageEnum.SessionResponseToken)]: "test token",
          });

          receiveCallback("Unit Test", sessionResponseMessage);

          const networkResponseMessage = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );

          networkResponseMessage.initializeFromObject({
            [getName(MessageEnum.RestAPIResponceDataMessage)]: apiCallId,
            [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {},
          });
          receiveCallback("Unit Test", networkResponseMessage);
        });
      }
    );

    then("I receive an error callback with unknown reason", async () => {
      await waitFor(() => {
        expect(sendNetworkRequestMock).toBeCalled();
        expect(
          StripePaymentScreen.getByTestId("errorText").props.children
        ).toEqual("Unexpected error occurred");
      });
    });
  });

  test("Successful Stipe Payment", ({ given, when, then }) => {
    let StripePaymentScreen: any;

    given("I am trying to make a Payment", async () => {
      StripePaymentScreen = renderStripeScreen();
      expect(StripePaymentScreen).toBeTruthy();
      await act(async () => {
        await fireEvent.press(
          StripePaymentScreen.getByText("Show Payment Sheet")
        );
      });
    });

    when("I submit stripe payment sheet", async () => {
      await waitFor(() => {
        const sessionResponseMessage = new Message(
          getName(MessageEnum.SessionResponseMessage)
        );
        sessionResponseMessage.initializeFromObject({
          [getName(MessageEnum.SessionResponseToken)]: "test token",
        });

        receiveCallback("Unit Test", sessionResponseMessage);

        const networkResponseMessage = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );

        networkResponseMessage.initializeFromObject({
          [getName(MessageEnum.RestAPIResponceDataMessage)]: apiCallId,
          [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
            data: {
              attributes: {
                client_secret: "secret",
                customer_id: "customer_id",
              },
            },
          },
        });
        receiveCallback("Unit Test", networkResponseMessage);
      });
    });

    then("I receive a successful alert", async () => {
      await waitFor(() => {
        expect(
          StripePaymentScreen.getByTestId("successText").props.children
        ).toEqual("Success");
      });
    });
  });
});
