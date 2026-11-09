import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CountryCodeSelectorTable from "../../src/CountryCodeSelectorTable";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    pop: jest.fn(),
  },
  id: "CountryCodeSelectorTable",
};

const country = [
  {
    id: 1,
    attributes: {
      emoji_flag: "",
      name: "Canada",
      country_code: "1",
    },
  },
  {
    id: 2,
    attributes: {
      emoji_flag: "",
      name: "Australia",
      country_code: "61",
    },
  },
];

const feature = loadFeature(
  "./__tests__/features/CountryCodeSelectorTable-scenario.feature"
);

let mockSetTimeout: Function;
global.setTimeout = jest
  .fn()
  .mockImplementation((callbackFn) => (mockSetTimeout = callbackFn)) as any;

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to CountryCodeSelectorTable", ({
    given,
    when,
    then,
  }) => {
    let countryCodeSelectorBlock: ShallowWrapper;
    let instance: CountryCodeSelectorTable;

    given("I am a User loading CountryCodeSelectorTable", () => {
      countryCodeSelectorBlock = shallow(
        <CountryCodeSelectorTable {...screenProps} />
      );
    });

    when("I navigate to the CountryCodeSelectorTable", () => {
      instance =
        countryCodeSelectorBlock.instance() as CountryCodeSelectorTable;
    });

    then("CountryCodeSelectorTable will load with out errors", () => {
      expect(countryCodeSelectorBlock).toBeTruthy();
    });

    then("Country code should be get from adapter if present", () => {
      instance.setState({ loading: true });
      expect(runEngine.sendMessage).toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "GET",
            RestAPIResponceEndPointMessage:
              "account/accounts/country_code_and_flag",
            RestAPIRequestHeaderMessage: expect.any(String),
          },
        })
      );
    });

    when("I can press button to country code", () => {
      const mockData = {
        data: country,
      };
      const responseMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        responseMsg.messageId
      );

      responseMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockData
      );

      instance.countryCodeApiCallId = responseMsg.messageId;

      runEngine.sendMessage("Unit Test", responseMsg);
    });

    when("should be render flatlist items", () => {
      const flatlist = countryCodeSelectorBlock.findWhere(
        (node) => node.prop("testID") === "flatlist"
      );
      flatlist.prop("keyExtractor")({ email: "test" });

      const renderItemData = {
        item: country[0],
      };
      const flatlistItem = flatlist.prop("renderItem")(renderItemData);
      flatlistItem.props.onPress();
    });

    when("Should render header in flatlist", () => {
      const header = instance.renderHeader();
      header.props.onChangeText("test");
    });

    then("Search text is set", () => {
      expect(instance.state.value).toBe("test");
    });
  });
});
