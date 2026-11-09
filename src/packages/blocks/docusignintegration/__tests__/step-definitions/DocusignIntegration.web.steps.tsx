// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import { Button } from "@material-ui/core";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import DocusignIntegration from "../../src/DocusignIntegration.web";
const navigation = {
  // require("react-navigation")
  navigate: () => jest.fn(),
  goBack: () => jest.fn(),
  state: { params: { screen: 'terms' } }
};

const screenProps = {
  navigation: navigation,
  id: "DocusignIntegration",
};

const feature = loadFeature(
  "./__tests__/features/DocusignIntegration-scenario.web.feature"
);

const signResponse = {
  Details: {
    account_id: null,
    created_at: "2023-04-21T12:28:42.730Z",
    id: 44,
    sign_coordinates: "[[{\"x\":302,\"y\":160.75,\"time\":1685010675707,\"color\":\"black\"}]]",
    updated_at: "2023-04-21T12:28:42.730Z"
  }
}

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to DocusignIntegration", ({ given, when, then, and }) => {
    let docusignWrapper: ShallowWrapper;
    let docusignInstance: DocusignIntegration;

    given("I am a User loading DocusignIntegration", () => {
      docusignWrapper = shallow(<DocusignIntegration {...screenProps} />);
    });

    when("I navigate to the DocusignIntegration", () => {
      docusignInstance = docusignWrapper.instance() as DocusignIntegration;
    });

    then("Document list will load with out errors", (ref:any) => {
      docusignInstance.setEnableField()
      // docusignInstance.setRef(ref)
      expect(docusignWrapper).toBeTruthy();
    });

    and("I can leave the screen with out errors", () => {
      docusignInstance.componentWillUnmount();
      expect(docusignWrapper).toBeTruthy();
    });
  });

  test("User clear the sign and back to document list", ({ given, when, then }) => {
    let docusignWrapper1: ShallowWrapper;
    let docusignInstance1: DocusignIntegration;

    given("I am a User loading document sign playground", () => {
      docusignWrapper1 = shallow(<DocusignIntegration {...screenProps} />);

      const firstESignBtn = docusignWrapper1.find(Button).at(0);
      firstESignBtn.simulate("click");
    });

    when("I click the clear button and back button", () => {
      docusignInstance1 = docusignWrapper1.instance() as DocusignIntegration;

      const clearBtn = docusignWrapper1.find(Button).at(1);
      clearBtn.simulate("click");

      const backBtn = docusignWrapper1.find(Button).at(0);
      backBtn.simulate("click");
    });

    then("document sign will be cleared and I moved to the document list page", () => {
      expect(docusignInstance1.state.isOpenCanvas).toBeFalsy();
    });
  });

  test("User sign and submit the document e-sign", ({ given, when, then }) => {
    let docusignWrapper2: ShallowWrapper;
    let docusignInstance2: DocusignIntegration;

    given("I am a User loading document sign playground", () => {
      docusignWrapper2 = shallow(<DocusignIntegration {...screenProps} />);

      const eSignBtn = docusignWrapper2.find(Button).at(0);
      eSignBtn.simulate("click");
    });

    when("I signed and click the submit button", () => {
      docusignInstance2 = docusignWrapper2.instance() as DocusignIntegration;

      const saveBtn = docusignWrapper2.find(Button).at(2);
      saveBtn.simulate("click");

      jest.useFakeTimers();
      const msgSubmitSignatureRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage));
      msgSubmitSignatureRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSubmitSignatureRestAPI.messageId);
      msgSubmitSignatureRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), signResponse);
      docusignInstance2.saveDocumentSignDataAPIId = msgSubmitSignatureRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgSubmitSignatureRestAPI);

      jest.runAllTimers();
    });

    then("document sign will save with out errors and I moved to the document list page", () => {
      expect(docusignInstance2.state.isOpenCanvas).toBeFalsy();
    });
  });
});
// Customizable Area End
