import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import GoogleCalendarSync from "../../src/GoogleCalendarSync";
import { configJSON } from "../../src/GoogleCalendarSyncController";

const screenProps = {
  navigation: {},
  id: "GoogleCalendarSync",
};

const feature = loadFeature(
  "./__tests__/features/GoogleCalendarSync-scenario.feature"
);

const simulateResponse = (
  instance: any,
  messageIdProperty: string,
  data: any,
  isError: boolean = false
) => {
  const requestMessage = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );

  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    requestMessage.messageId
  );

  requestMessage.addData(
    getName(
      !isError
        ? MessageEnum.RestAPIResponceSuccessMessage
        : MessageEnum.RestAPIResponceErrorMessage
    ),
    data
  );

  instance[messageIdProperty] = requestMessage.messageId;

  runEngine.sendMessage("Unit Test", requestMessage);
};

jest.mock("@react-native-community/google-signin", () => ({
  __esModule: true,
  GoogleSignin: {
    _isSignedIn: false,
    configure: jest.fn(),
    hasPlayServices: jest.fn(),
    isSignedIn: function () {
      return Promise.resolve(this._isSignedIn);
    },
    getTokens: function () {
      return (
        this._isSignedIn && Promise.resolve({ accessToken: "accessToken" })
      );
    },
    revokeAccess: jest.fn(),
    signOut: function () {
      this._isSignedIn = false;
      return Promise.resolve();
    },
    signIn: function () {
      this._isSignedIn = true;
      return Promise.resolve();
    },
  },
}));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
  });

  test("User navigates to GoogleCalendarSync", ({ given, when, then, and }) => {
    let GoogleCalendarSyncBlock: ShallowWrapper;
    let instance: GoogleCalendarSync;
    let spy: jest.SpyInstance;

    given("I am a User loading GoogleCalendarSync", () => {
      GoogleCalendarSyncBlock = shallow(
        <GoogleCalendarSync {...screenProps} />
      );
    });

    when("I navigate to the GoogleCalendarSync", () => {
      instance = GoogleCalendarSyncBlock.instance() as GoogleCalendarSync;
    });
    then("GoogleCalendarSync will load with out errors", () => {
      expect(GoogleCalendarSyncBlock.exists()).toEqual(true);
    });
    and("I can Click Auth Button", () => {
      let button = GoogleCalendarSyncBlock.findWhere(
        (node) => node.prop("testID") === "btnSignIn"
      );
      button.simulate("press");

      expect(button.exists()).toEqual(true);
    });

    when("I press on Screen", () => {
      spy = jest.spyOn(instance, "hideKeyboard");
      let touchable = GoogleCalendarSyncBlock.findWhere(
        (node) => node.prop("testID") === "touchable"
      );
      touchable.simulate("press");
    });
    then("HideKeyboard method invoke", () => {
      expect(spy).toBeCalled();
    });

    when("I press open add event modal", () => {
      let button = GoogleCalendarSyncBlock.findWhere(
        (node) => node.prop("testID") === "btnAddEvent"
      );
      button.simulate("press");
    });
    then("State updates correctly", () => {
      expect(instance.state.openAddModal).toEqual(true);
    });

    when("I received Events list", () => {
      simulateResponse(instance, "getEventCallId", {
        items: MOCK.items,
      });
    });
    then("State updates correctly", () => {
      expect(instance.state.calendarData[0]).toEqual({
        ...MOCK.event.extendedProps,
        title: MOCK.items[0].summary,
        description: MOCK.items[0].description,
        summary: MOCK.items[0].summary,
        start: MOCK.items[0].start.dateTime,
        end: MOCK.items[0].end.dateTime,
      });
    });
    then("I can click on Event", () => {
      const setEventButton = GoogleCalendarSyncBlock.findWhere(
        (node) => node.prop("testID") === "setEventButton"
      );

      expect(setEventButton).toHaveLength(1);

      setEventButton.simulate("press");
    });
    then("I can click on setEventUriButton", () => {
      const setEventUriButton = GoogleCalendarSyncBlock.findWhere(
        (node) => node.prop("testID") === "setEventUriButton"
      );

      expect(setEventUriButton.exists()).toEqual(true);

      setEventUriButton.simulate("press");
    });
    and("I can close modal without error", () => {
      const btnCloseModalInfo = GoogleCalendarSyncBlock.findWhere(
        (node) => node.prop("testID") === "btnCloseModalInfo"
      );

      expect(btnCloseModalInfo.exists()).toEqual(true);

      btnCloseModalInfo.simulate("press");
    });

    when("Add Event Modal is open", () => {
      let addEventButton = GoogleCalendarSyncBlock.findWhere(
        (node) => node.prop("testID") === "btnAddEvent"
      );
      addEventButton.simulate("press");
    });
    then("I can change Summary Input fields", () => {
      let summaryInput = GoogleCalendarSyncBlock.findWhere(
        (node) => node.prop("testID") === "summaryInput"
      );
      summaryInput.simulate("changeText", "summaryInputText");

      expect(instance.state.inputFields.summary).toEqual("summaryInputText");
    });
    then("I can change Location Input fields", () => {
      let locationInput = GoogleCalendarSyncBlock.findWhere(
        (node) => node.prop("testID") === "locationInput"
      );
      locationInput.simulate("changeText", "locationInputText");

      expect(instance.state.inputFields.location).toEqual("locationInputText");
    });
    then("I can change Description Input fields", () => {
      let descriptionInput = GoogleCalendarSyncBlock.findWhere(
        (node) => node.prop("testID") === "descriptionInput"
      );
      descriptionInput.simulate("changeText", "descriptionInputText");

      expect(instance.state.inputFields.description).toEqual(
        "descriptionInputText"
      );
    });
    then("I can change Attendees Input fields", () => {
      const attendees = MOCK.event.extendedProps.attendees
        .map((v) => v.email)
        .join(",");

      let attendeesInput = GoogleCalendarSyncBlock.findWhere(
        (node) => node.prop("testID") === "attendeesInput"
      );
      attendeesInput.simulate("changeText", attendees);

      expect(instance.state.inputFields.attendees).toEqual(attendees);
    });
    then("I can press Start Picker Sprite", () => {
      let startPicker = GoogleCalendarSyncBlock.findWhere(
        (node) => node.prop("testID") === "startPicker"
      );

      expect(startPicker.exists()).toEqual(true);
      startPicker.simulate("press");
    });
    and("State updated correctly", () => {
      expect(instance.state.openDatePicker).toEqual("start");
    });
    and("Start Date update correctly", () => {
      let startDatePicker = GoogleCalendarSyncBlock.findWhere(
        (node) => node.prop("testID") === "datePicker"
      );

      startDatePicker.prop("onConfirm")(new Date());
    });
    then("I can press End Picker Sprite", () => {
      let endPicker = GoogleCalendarSyncBlock.findWhere(
        (node) => node.prop("testID") === "endPicker"
      );

      expect(endPicker.exists()).toEqual(true);
      endPicker.simulate("press");
    });
    and("State updated correctly", () => {
      expect(instance.state.openDatePicker).toEqual("end");
    });
    and("End Date update correctly", () => {
      let endDatePicker = GoogleCalendarSyncBlock.findWhere(
        (node) => node.prop("testID") === "datePicker"
      );

      endDatePicker.prop("onConfirm")(new Date());
    });
    then("I can click AddEvent without error", () => {
      let addEventButton = GoogleCalendarSyncBlock.findWhere(
        (node) => node.prop("testID") === "addEventButton"
      );

      expect(addEventButton.exists()).toEqual(true);

      addEventButton.simulate("press");
    });
    and("Add Event Modal is close", () => {
      spy = jest.spyOn(instance, "closeModalHandle");
      simulateResponse(instance, "addEventCallId", {});

      expect(spy).toBeCalled();
    });

    when("Received Add Event Response with error", () => {
      spy = jest.spyOn(instance, "parseApiCatchErrorResponse");
      simulateResponse(instance, "addEventCallId", { error: "mock error" });
    });
    then("Show alert method is invoke", () => {
      expect(spy).toBeCalledWith(configJSON.errorMsg);
    });

    when("I click Sig Out button", async () => {
      const flushPromises = () => new Promise(setImmediate);
      let button = GoogleCalendarSyncBlock.findWhere(
        (node) => node.prop("testID") === "btnSignIn"
      );
      expect(button.exists()).toEqual(true);
      button.simulate("press");
      await flushPromises();
    });
    then("State updated correctly", () => {
      expect(instance.state.authDetails).toBeNull();
    });
  });
});

const MOCK = {
  items: [
    {
      summary: "mocked_event",
      description: "mocked_event_description",
      start: {
        dateTime: new Date(),
        date: new Date(),
      },
      end: {
        dateTime: new Date(),
        date: new Date(),
      },
      conferenceData: {
        entryPoints: [{ uri: "https://www.lipsum.com/" }],
      },
      attendees: [
        { responseStatus: "accepted", email: "test_accepted@email.com" },
        { responseStatus: "declined", email: "test_declined@email.com" },
        { responseStatus: "pending", email: "test@email.com" },
      ],
    },
  ],
  event: {
    title: "mocked_event",
    summary: "mocked_event",
    start: new Date(),
    end: new Date(),
    extendedProps: {
      description: "description",
      conferenceData: {
        entryPoints: [{ uri: "https://www.lipsum.com/" }],
      },
      attendees: [
        { responseStatus: "accepted", email: "test_accepted@email.com" },
        { responseStatus: "declined", email: "test_declined@email.com" },
        { responseStatus: "pending", email: "test@email.com" },
      ],
    },
  },
};
