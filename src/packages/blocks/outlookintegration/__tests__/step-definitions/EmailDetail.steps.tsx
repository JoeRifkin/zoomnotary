import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { Linking } from "react-native";
import EmailDetail from "../../src/EmailDetail";

const testEmail = {
  subject: "subject",
  from: { emailAddress: { name: "name" } },
  bodyPreview: "bodyPreview",
  webLink: "webLink",
  id: "id",
};

const screenProps = {
  navigation: {
    state: {
      params: { email: testEmail },
    },
  },
  id: "EmailDetail",
  msalContext: {},
};

const feature = loadFeature(
  "./__tests__/features/EmailDetail-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User can view and interact with EmailDetail", ({
    given,
    when,
    then,
    and,
  }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: EmailDetail;
    given("I am a User on the EmailDetail page", () => {
      exampleBlockA = shallow(<EmailDetail {...screenProps} />);
    });

    when("I view the EmailDetail", () => {
      instance = exampleBlockA.instance() as EmailDetail;
    });

    then("I should be able to click reply button", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "TestReplyButton"
      );
      const handleClickSpy = jest.spyOn(instance, "openOutLook");
      instance.forceUpdate();
      buttonComponent.simulate("press");
      expect(handleClickSpy).toHaveBeenCalled();
    });

    and("I should be able to click forward button", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "TestFowardButton"
      );
      const handleClickSpy = jest.spyOn(instance, "openOutLook");
      instance.forceUpdate();
      buttonComponent.simulate("press");
      expect(handleClickSpy).toHaveBeenCalled();
    });
    and(
      "the app URL with the correct idEmail should open successfully",
      async () => {
        const webLink = "https://example.com";
        const idEmail = "12345";
        Linking.openURL = jest.fn();
        await instance.openOutLook(webLink, idEmail);
        expect(Linking.openURL).toHaveBeenCalledWith(
          `ms-outlook://emails/message/${idEmail}`
        );
      }
    );
    and(
      "if the app URL fails, the web URL with correct webLink should open successfully",
      async () => {
        const webLink = "https://example.com";
        const idEmail = "12345";
        Linking.canOpenURL = jest.fn().mockResolvedValue(false);

        await instance.openOutLook(webLink, idEmail);
        expect(Linking.openURL).toHaveBeenCalledWith(webLink);
      }
    );
  });
});
