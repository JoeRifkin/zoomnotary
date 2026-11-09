import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CountryCodeSelector from "../../src/CountryCodeSelector.web";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "CountryCodeSelector",
  style: {},
  dataSource: [],
  countryCodeSelected: "+1",
  placeHolder: "Select Country",
  disable: false,
  allowPropChange: false,
  value: "1",
};

const feature = loadFeature(
  "./__tests__/features/CountryCodeSelector.web-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to CountryCodeSelector", ({ given, when, then }) => {
    let countryCodeSelectorBlock: ShallowWrapper;
    let instance: CountryCodeSelector;

    given("I am a User loading CountryCodeSelector", () => {
      countryCodeSelectorBlock = shallow(
        <CountryCodeSelector {...screenProps} />
      );
    });

    when("I navigate to the CountryCodeSelector", () => {
      instance = countryCodeSelectorBlock.instance() as CountryCodeSelector;
    });

    then("CountryCodeSelector will load with out errors", () => {
      expect(countryCodeSelectorBlock).toBeTruthy();
    });

    then("Network request should be call to get country codes", () => {
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
        data: [
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
        ],
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

    when("I can select any country code from select list", () => {
      const countryCode = countryCodeSelectorBlock.findWhere(
        (node) => node.prop("data-testid") === "countryCode"
      );
      countryCode.simulate("change", { label: "Australia", value: "61" });
    });

    then("Country code should be set through adapter", () => {
      expect(runEngine.sendMessage).toBeCalledWith(
        "CountryCodeMessage",
        expect.objectContaining({
          id: "CountryCodeMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            CountyCodeDataMessage: "61",
          },
        })
      );
    });
  });
});
