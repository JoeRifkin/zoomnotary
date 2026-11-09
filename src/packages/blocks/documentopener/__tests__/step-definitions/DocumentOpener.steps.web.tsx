import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import DocumentOpener from "../../src/DocumentOpener.web";

const screenProps = {
  navigation: {},
  id: "DocumentOpener",
};

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "web",
  select: jest.fn(),
}));
jest.mock("../../assets/dummy-pdf.pdf", () => {});

const feature = loadFeature(
  "./__tests__/features/DocumentOpener-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to DocumentOpener", ({ given, when, then }) => {
    let documentOpenerBlock: ShallowWrapper;
    let instance: DocumentOpener;

    given("I am a User loading DocumentOpener", () => {
      documentOpenerBlock = shallow(<DocumentOpener {...screenProps} />);
    });

    when("I navigate to the DocumentOpener", () => {
      instance = documentOpenerBlock.instance() as DocumentOpener;
    });

    then("DocumentOpener will load with out errors", () => {
      expect(documentOpenerBlock).toBeTruthy();
    });

    when("I click on open with url button to open document", () => {
      const openWithUrlBtn = documentOpenerBlock.findWhere(
        (node) => node.prop("data-testid") === "openWithUrlBtn"
      );
      openWithUrlBtn.simulate("click");
    });

    then("Document viewer should be open with url", () => {
      const docViewer = documentOpenerBlock.findWhere(
        (node) => node.prop("data-testid") === "docViewer"
      );
      expect(docViewer.props().documents.length).toBeGreaterThan(0);
    });

    when("Receive function is called", () => {
      const response = new Message(getName(MessageEnum.AccoutLoginSuccess));
      instance.receive("From test", response);
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(documentOpenerBlock).toBeTruthy();
    });
  });
});
