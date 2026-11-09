import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Analytics from "../../src/Analytics.web";
import firebase from "firebase";

const screenProps = {
  navigation: {},
  id: "Analytics",
};

const firestoreMock = {
  collection: jest.fn().mockReturnThis(),
  doc: jest.fn().mockReturnThis(),
  set: jest.fn(),
  settings: jest.fn(),
  enablePersistence: jest.fn(),
  collectionGroup: jest.fn(),
  runTransaction: jest.fn(),
  batch: jest.fn(),
  app: jest.fn(),
  clearPersistence: jest.fn(),
  enableNetwork: jest.fn(),
  disableNetwork: jest.fn(),
  waitForPendingWrites: jest.fn(),
  onSnapshotsInSync: jest.fn(),
  terminate: jest.fn(),
  INTERNAL: jest.fn(),
};

const feature = loadFeature("./__tests__/features/Analytics-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
    }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    // @ts-ignore
    jest
      .spyOn(firebase, "firestore")
      // @ts-ignore
      .mockImplementation(() => firestoreMock);
  });

  test("User navigates to Analytics", ({ given, when, then }) => {
    let analyticsBlock: ShallowWrapper;
    let instance: Analytics;

    given("I am a User loading Analytics", () => {
      analyticsBlock = shallow(<Analytics {...screenProps} />);
    });

    when("I navigate to the Analytics", () => {
      instance = analyticsBlock.instance() as Analytics;
    });

    then("Analytics will load with out errors", () => {
      expect(analyticsBlock).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(analyticsBlock).toBeTruthy();
    });
  });
});
