import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CountryCodeSelector from "../../src/CountryCodeSelector";

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
  value: "+91",
};

const feature = loadFeature(
  "./__tests__/features/CountryCodeSelector-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
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

    when("Country code should be get from adapter if present", () => {
      const responseMsg = new Message(getName(MessageEnum.CountryCodeMessage));

      responseMsg.addData(getName(MessageEnum.CountyCodeDataMessage), "+2");

      runEngine.sendMessage("Unit Test", responseMsg);
      instance.receive(responseMsg.messageId, responseMsg);

      const responseMsg2 = new Message(getName(MessageEnum.AlertBodyMessage));

      runEngine.sendMessage("Unit Test", responseMsg2);
      instance.receive(responseMsg2.messageId, responseMsg2);
    });

    when("I can press button to country code", () => {
      instance.currentPlaceHolderText = "+2";
      const countryCodeBtn = countryCodeSelectorBlock.findWhere(
        (node) => node.prop("testID") === "countryCodeBtn"
      );
      countryCodeBtn.simulate("press");
      instance.render();
    });

    then("navigation should be call after select country code", () => {
      expect(screenProps.navigation.navigate).toBeCalledWith(
        "CountryCodeSelectorTable"
      );
    });
  });
});
