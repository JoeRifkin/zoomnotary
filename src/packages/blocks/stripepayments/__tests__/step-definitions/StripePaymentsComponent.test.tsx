import * as React from "react";
import { render, waitFor } from "@testing-library/react-native";
import {
  StripePaymentsComponent,
  StripeProps,
} from "../../src/StripePaymentsComponent";
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

const onError = jest.fn();
const onSuccess = jest.fn();
const stripeComponentProps: StripeProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "",
  order_id: "",
  onError,
  onSuccess,
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

const renderStripeComponent = (props?: StripeProps) => {
  const stripeProps: StripeProps = {
    ...(props ? props : stripeComponentProps),
    id: "",
    navigation: jest.fn(),
  };
  return render(<StripePaymentsComponent {...stripeProps} />);
};

const feature = loadFeature(
  "./__tests__/features/stripePaymentsComponent.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Create a Payment while not logged in", ({ given, when, then }) => {
    let StripePaymentComponent: any;

    given("I am trying to make a Payment", async () => {
      StripePaymentComponent = renderStripeComponent();
      expect(StripePaymentComponent).toBeTruthy();
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
      await waitFor(() => expect(onError).toBeCalledWith("Please login"));
    });
  });
  test("Stripe Payment Intent Fails", ({ given, when, then }) => {
    let StripePaymentComponent: any;

    given("I am trying to make a Payment", async () => {
      StripePaymentComponent = renderStripeComponent();
      expect(StripePaymentComponent).toBeTruthy();
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
        expect(onError).toHaveBeenCalledWith("test");
      });
    });
  });

  test("Stripe Payment Intent Fails with Unknown reason", ({
    given,
    when,
    then,
  }) => {
    let StripePaymentComponent: any;

    given("I am trying to make a Payment", async () => {
      StripePaymentComponent = renderStripeComponent();
      expect(StripePaymentComponent).toBeTruthy();
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
        expect(onError).toBeCalledWith("Unexpected error occurred");
      });
    });
  });

  test("Successful Stipe Payment", ({ given, when, then }) => {
    let StripePaymentComponent: any;

    given("I am trying to make a Payment", async () => {
      StripePaymentComponent = renderStripeComponent();
      expect(StripePaymentComponent).toBeTruthy();
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
        expect(onSuccess).toBeCalled();
      });
    });
  });
});
