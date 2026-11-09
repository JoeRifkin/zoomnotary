import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import GooglePayIntegration from "../../src/GooglePayIntegration";

const screenProps = {
  navigation: {},
  id: "GooglePayIntegration",
};

const feature = loadFeature(
  "./__tests__/features/GooglePayIntegration-scenario.feature"
);

jest.mock("react-native-google-pay", () => {
  return {
    GooglePay: {
      setEnvironment: jest.fn().mockImplementation(),
      isReadyToPay: jest.fn(() => Promise.resolve(true)),
      requestPayment: jest.fn(() => Promise.resolve(true)),
    },
  };
});

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    
  });

  test("User navigates to GooglePayIntegration", ({ given, when, then }) => {
    let googlePayIntegration: ShallowWrapper;
    let instance: GooglePayIntegration;

    given("I am a User loading GooglePayIntegration", () => {
      googlePayIntegration = shallow(<GooglePayIntegration {...screenProps} />);
    });
    when("I navigate to the GooglePayIntegration", () => {
      instance = googlePayIntegration.instance() as GooglePayIntegration;
    });
    when("I can input an amount in the designated field", () => {
      let amountInput = googlePayIntegration.findWhere(
        (node) => node.prop("testID") === "amountInput"
      );
      amountInput.simulate("changeText", "10");
    });
    then("The entered value should match the input value", () => {
      let amountInput = googlePayIntegration.findWhere(
        (node) => node.prop("testID") === "amountInput"
      );
      expect(amountInput.prop("value")).toBe("10");
    });
    when("I can click on pay now button", () => {
      let payNowID = googlePayIntegration.findWhere(
        (node) => node.prop("testID") === "payNowID"
      );
      payNowID.simulate("press");

      const requestDataApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      requestDataApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        requestDataApiCallId.messageId
      );
      requestDataApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { message: "Quote payment successful" }
      );
      instance.confirmPaymentAPIRequestId = requestDataApiCallId.messageId;
      runEngine.sendMessage("Unit Test", requestDataApiCallId);
    });
    then("Call unused web function without error", () => {
      instance.btnExampleProps.onPress();
      instance.btnShowHideProps.onPress();
      instance.txtInputWebProps.onChangeText("text");
      expect.assertions(2);
      expect(instance.state.txtInputValue).toBe("text");
    });
  });
});
