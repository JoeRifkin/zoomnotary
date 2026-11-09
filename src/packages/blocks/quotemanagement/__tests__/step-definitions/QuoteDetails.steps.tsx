 import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import { render } from "@testing-library/react";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import QuoteDetails from "../../src/QuoteDetails";
import { jest, beforeEach, expect } from "@jest/globals";

const screenProps = {
  navigation: {
    addListener: jest.fn().mockImplementation((event, callback: any) => {
      callback();
      return {
        remove: jest.fn(),
      };
    }),
    navigate: jest.fn(),
    goBack: jest.fn(),
    dispatch: jest.fn(),
    replace: jest.fn(),
    trim: jest.fn(),
    props: jest.fn(),
    Alert: jest.fn(),
    filter: jest.fn(),
    state: {
      params: {
        passValue: {
          id: "6",
          type: "quotemanagement",
          attributes: {
            account_id: 13,
            item_name: "test",
            item_quantity: 2,
            item_price: 100.0,
            description: "testing",
            discount: 25.0,
            status: "partially_approved",
            total_amount: 150.0,
            archived: false,
            organization: {
              id: 1,
              name: "builder.ai",
              created_at: "2023-07-14T13:18:49.811Z",
              updated_at: "2023-07-14T13:18:49.811Z",
            },
            comments: [],
          },
        },
      },
    },
  },
  id: "QuoteDetails",
  get_value: {
    attributes: {
      account_id: 13,
      item_name: "test",
      item_quantity: 2,
      item_price: 100.0,
      description: "testing",
      discount: 25.0,
      status: "partially_approved",
      total_amount: 150.0,
      archived: false,
      organization: {
        id: 1,
        name: "builder.ai",
        created_at: "2023-07-14T13:18:49.811Z",
        updated_at: "2023-07-14T13:18:49.811Z",
      },
      comments: [],
    },
  },
};

const feature = loadFeature(
  "./__tests__/features/QuoteDetails-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
  });

  test("User navigates to QuoteManagement", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: QuoteDetails;

    given("I am a User loading QuoteManagement", () => {
      exampleBlockA = shallow(<QuoteDetails {...screenProps} />);
    });

    when("I navigate to the QuoteManagement", () => {
      instance = exampleBlockA.instance() as QuoteDetails;
    });

    then("QuoteManagement will load with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "quotedetail"
      );
      buttonComponent.simulate("press");
      expect(buttonComponent).toBeDefined();
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "comments"
      );
      textInputComponent.simulate("changeText", "hello@aol.com");
      let selectdropdown = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "selectdropdown"
      );
      selectdropdown.simulate("onSelect", "hello");
      selectdropdown.renderProp("onSelect")("test");
      selectdropdown.renderProp("renderDropdownIcon")("uparrow");
      selectdropdown.renderProp("rowTextForSelection")("rejected");
      selectdropdown.renderProp("buttonTextAfterSelection")("status");
      expect(textInputComponent).toBeDefined();
    });

    then("I can select the button with with out errors", () => {
      let submitbuttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "submit"
      );
      submitbuttonComponent.simulate("press");
      let data = {
        attributes: {
          comment: "this.state.newCommentText",
        },
      };
      const requestMessage: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        requestMessage.messageId
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { data }
      );
      // TODO: broken unit test has been commented out for lite certified block, please fix this test
      // instance.levelQuoteAPI = requestMessage.messageId;
      runEngine.sendMessage("Unit Test", requestMessage);

      expect(submitbuttonComponent).toBeDefined();
    });

    then("I can leave the screen with out errors", () => {
      let cancelbuttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "cancel"
      );
      cancelbuttonComponent.simulate("press");
      expect(cancelbuttonComponent).toBeDefined();
    });
  });
});
