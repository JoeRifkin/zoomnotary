import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import DocumentOpener from "../../src/DocumentOpener";
import RNFV from "react-native-file-viewer";
import RNFS from "react-native-fs";

const screenProps = {
  navigation: {},
  id: "DocumentOpener",
};

const feature = loadFeature(
  "./__tests__/features/DocumentOpener-scenario.feature"
);

jest.mock("react-native-document-picker", () => ({
  pick: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve([
        {
          uri: "file://",
        },
      ])
    )
    .mockImplementationOnce(() => Promise.reject(new Error()))
    .mockImplementation(() => Promise.reject("action cancelled")),
  isCancel: (error: any) => error === "action cancelled",
  types: {
    images: true,
    plainText: true,
    audio: true,
    pdf: true,
  },
}));

jest.mock("react-native-file-viewer", () => ({
  open: jest.fn(),
}));

jest.mock("react-native-fs", () => ({
  downloadFile: jest.fn().mockImplementation(() => ({
    promise: {
      then: (callback: Function) => {
        callback();
        return {
          then: (callback2: Function) => {
            callback2();
            return { catch: (callback3: Function) => callback3() };
          },
        };
      },
    },
  })),
}));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(RNFV, "open");
    jest.spyOn(runEngine, "debugLog");
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

    when("I clicked on button to open doc from device", () => {
      const openDocFromDevice = documentOpenerBlock.findWhere(
        (node) => node.prop("testID") === "openDocFromDevice"
      );
      openDocFromDevice.simulate("press");
    });

    then("FileViewer open function should be called to open document", () => {
      expect(RNFV.open).toBeCalled();
    });

    when("I clicked on button to open doc from device and cancelled", () => {
      const openDocFromDevice = documentOpenerBlock.findWhere(
        (node) => node.prop("testID") === "openDocFromDevice"
      );
      openDocFromDevice.simulate("press");
      openDocFromDevice.simulate("press");
    });

    then("Error should be cansole", () => {
      expect(runEngine.debugLog).toBeCalledWith(
        "Message Recived",
        "User Canceled Picker"
      );
    });

    when("I clicked on button to open doc from url", () => {
      const openDocWithUrl = documentOpenerBlock.findWhere(
        (node) => node.prop("testID") === "openDocWithUrl"
      );
      openDocWithUrl.simulate("press");
    });

    then(
      "FileViewer open function should be called to open document by link",
      () => {
        expect(RNFV.open).toBeCalled();
      }
    );

    when("I click on anywhere to hide keyboard view", () => {
      const hideKeyboard = documentOpenerBlock.findWhere(
        (node) => node.prop("testID") === "hideKeyboard"
      );
      hideKeyboard.simulate("press");
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(documentOpenerBlock).toBeTruthy();
    });
  });
});
