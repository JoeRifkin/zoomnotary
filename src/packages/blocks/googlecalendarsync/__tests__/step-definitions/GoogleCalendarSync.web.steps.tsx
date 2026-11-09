import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import GoogleCalendarSync from "../../src/GoogleCalendarSync.web";
import { configJSON } from "../../src/GoogleCalendarSyncController.web";

const screenProps = {
  navigation: {},
  id: "GoogleCalendarSync",
};

const feature = loadFeature(
  "./__tests__/features/GoogleCalendarSync-scenario.web.feature"
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

jest.mock("gapi-script", () => ({
  loadGapiInsideDOM: () => Promise.resolve(true),
}));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");

    const originalWindow: any = { ...window };
    const windowSpy = jest.spyOn(global, "window", "get");
    windowSpy.mockImplementation(() => ({
      ...originalWindow,
      gapi: {
        auth2: {
          getAuthInstance: () => ({
            signIn: () =>
              Promise.resolve({
                getAuthResponse: () => ({ access_token: "access_token" }),
              }),
          }),
          init() {},
        },
        load(value: string, callback: () => void) {
          callback();
        },
      },
    }));
  });

  test("User navigates to GoogleCalendarSync", ({ given, when, then, and }) => {
    let googleCalendarSyncBlock: ShallowWrapper;
    let instance: GoogleCalendarSync;
    let spy: jest.SpyInstance;

    given("I am a User loading GoogleCalendarSync", () => {
      googleCalendarSyncBlock = shallow(
        <GoogleCalendarSync {...screenProps} />
      );
    });

    when("I navigate to the GoogleCalendarSync", () => {
      instance = googleCalendarSyncBlock.instance() as GoogleCalendarSync;
    });
    then("GoogleCalendarSync will load with out errors", () => {
      expect(googleCalendarSyncBlock.exists()).toEqual(true);
    });
    and("I can Click Auth Button", () => {
      let button = googleCalendarSyncBlock.findWhere(
        (node) => node.prop("data-test-id") === "btnSignIn"
      );
      button.simulate("click");

      expect(button.exists()).toEqual(true);
    });

    when("I press open add event modal", () => {
      let button = googleCalendarSyncBlock.findWhere(
        (node) => node.prop("data-test-id") === "btnAddEvent"
      );
      button.simulate("click");
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
        title: MOCK.items[0].summary,
        summary: MOCK.items[0].summary,
        start: MOCK.items[0].start.dateTime,
        end: MOCK.items[0].end.dateTime,
      });
    });
    and("I can click on Event", () => {
      const wrapper = shallow(
        instance.renderEventContent({ event: MOCK.event } as any)
      );

      const eventContainer = wrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnEventInfo"
      );

      expect(eventContainer.exists()).toEqual(true);

      eventContainer.simulate("click");
    });
    and("I can close modal without error", () => {
      const btn = googleCalendarSyncBlock.findWhere(
        (node) => node.prop("data-test-id") === "btnCloseModal"
      );

      expect(btn.exists()).toEqual(true);

      btn.simulate("click");
    });

    when("Add Event Modal is open", () => {
      let addEventButton = googleCalendarSyncBlock.findWhere(
        (node) => node.prop("data-test-id") === "btnAddEvent"
      );
      addEventButton.simulate("click");
    });
    then("I can change input fields", () => {
      let summary = googleCalendarSyncBlock.findWhere(
        (node) => node.prop("data-test-id") === "summaryInput"
      );

      summary.simulate("change", {
        target: { value: "hello", name: "summary" },
      });

      let start = googleCalendarSyncBlock.findWhere(
        (node) => node.prop("data-test-id") === "startDateInput"
      );

      start.simulate("change", {
        target: { value: "2023-07-07T19:38", name: "start" },
      });

      let end = googleCalendarSyncBlock.findWhere(
        (node) => node.prop("data-test-id") === "endDateInput"
      );

      end.simulate("change", {
        target: { value: "2023-07-07T21:38", name: "end" },
      });

      let location = googleCalendarSyncBlock.findWhere(
        (node) => node.prop("data-test-id") === "locationInput"
      );

      location.simulate("change", {
        target: { value: "UK", name: "location" },
      });

      let description = googleCalendarSyncBlock.findWhere(
        (node) => node.prop("data-test-id") === "descriptionInput"
      );

      description.simulate("change", {
        target: { value: "description", name: "description" },
      });

      let attendees = googleCalendarSyncBlock.findWhere(
        (node) => node.prop("data-test-id") === "attendeesInput"
      );

      attendees.simulate("change", {
        target: {
          value: "attendees1@mail.com,attendees2@mail.com",
          name: "attendees",
        },
      });

      expect(instance.state.inputFields).toEqual({
        attendees: "attendees1@mail.com,attendees2@mail.com",
        description: "description",
        end: "2023-07-07T21:38",
        location: "UK",
        start: "2023-07-07T19:38",
        summary: "hello",
        timezone: "Europe/London",
      });
    });
    then("I can click Save without error", () => {
      let saveEventButton = googleCalendarSyncBlock.findWhere(
        (node) => node.prop("data-test-id") === "btnSaveEvent"
      );

      expect(saveEventButton.exists()).toEqual(true);

      saveEventButton.simulate("click");
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
  });
});

const MOCK = {
  items: [
    {
      summary: "mocked_event",
      start: {
        dateTime: new Date(),
        date: new Date(),
      },
      end: {
        dateTime: new Date(),
        date: new Date(),
      },
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
