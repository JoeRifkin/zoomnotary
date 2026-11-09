import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import RequestManagement from "../../src/RequestManagement.web";

const navigate = jest.fn();

const screenProps = {
  navigation: { navigate },
  id: "RequestManagement",
};

const feature = loadFeature(
  "./__tests__/features/RequestManagement-scenario.web.feature"
);

const mockRequestData = [
  {
    id: "1",
    type: "request",
    attributes: {
      sender_id: 1,
      status: "pending",
      rejection_reason: null,
      request_text: "accept my request",
      created_at: "",
      updated_at: "",
      reviewer_group_id: "1",
      sender_full_name: "test name",
    },
  },
  {
    id: "2",
    type: "request",
    attributes: {
      sender_id: 2,
      status: "rejected",
      rejection_reason: "not accepted",
      request_text: "accept my request",
      created_at: "",
      updated_at: "",
      reviewer_group_id: "2",
      sender_full_name: "test name",
    },
  },
  {
    id: "3",
    type: "request",
    attributes: {
      sender_id: 3,
      status: "accepted",
      rejection_reason: null,
      request_text: "accept my request",
      created_at: "",
      updated_at: "",
      reviewer_group_id: "3",
      sender_full_name: "test name",
    },
  },
];

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to RequestManagement", ({ given, when, then }) => {
    let requestManagement: ShallowWrapper;
    let instance: RequestManagement;

    given("I am a User loading RequestManagement", () => {
      requestManagement = shallow(<RequestManagement {...screenProps} />);
    });

    when("I navigate to the RequestManagement", () => {
      instance = requestManagement.instance() as RequestManagement;
    });

    then("RequestManagement will load with out errors", () => {
      expect(requestManagement).toBeTruthy();
    });

    then("Get token function shoudl be called", () => {
      const receivedReqApiMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );

      receivedReqApiMessage.addData(
        getName(MessageEnum.SessionResponseToken),
        "tokenstring"
      );

      runEngine.sendMessage("Unit Test", receivedReqApiMessage);
    });

    then("Get received request api should be called in first render", () => {
      expect(runEngine.sendMessage).toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "GET",
            RestAPIResponceEndPointMessage:
              "request_management/requests/received",
            RestAPIRequestHeaderMessage: expect.any(String),
          },
        })
      );
    });

    when("Network responed for received request api", () => {
      const mockResponse = {
        data: mockRequestData,
      };

      const receivedReqApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      receivedReqApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        receivedReqApiMessage.messageId
      );

      receivedReqApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.getAllReceivedRequestCallId = receivedReqApiMessage.messageId;
      runEngine.sendMessage("Unit Test", receivedReqApiMessage);
    });

    then("ReceivedRequests state should be update", () => {
      expect(instance.state.receivedRequests.length).toBe(3);
    });

    when("User click on accept button to accept request", () => {
      const acceptBtn = requestManagement.findWhere(
        (node) => node.prop("data-testid") === "acceptBtn-1"
      );
      acceptBtn.simulate("click");
    });

    then("Accept request review api should be call", () => {
      expect(runEngine.sendMessage).toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "PUT",
            RestAPIResponceEndPointMessage:
              "request_management/requests/1/review",
            RestAPIRequestHeaderMessage: expect.any(String),
            RestAPIRequestBodyMessage: JSON.stringify({
              is_accepted: true,
            }),
          },
        })
      );
    });

    then("Network responed for accept request review api", () => {
      const mockResponse = {
        data: mockRequestData[0],
      };

      const updateReviewApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      updateReviewApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateReviewApiMessage.messageId
      );

      updateReviewApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.updateRequestReviewCallId = updateReviewApiMessage.messageId;
      runEngine.sendMessage("Unit Test", updateReviewApiMessage);
    });

    when("User click on reject button", () => {
      const rejectBtn = requestManagement.findWhere(
        (node) => node.prop("data-testid") === "rejectBtn-1"
      );
      rejectBtn.simulate("click");
    });

    then("User enter reason to reject", () => {
      const rejectReasonTextInput = requestManagement.findWhere(
        (node) => node.prop("data-testid") === "rejectReasonTextInput"
      );
      rejectReasonTextInput.simulate("change", {
        target: { value: "reject reason text" },
      });
    });

    then("User submit request review to reject", () => {
      const rejectRequestReviewBtn = requestManagement.findWhere(
        (node) => node.prop("data-testid") === "rejectRequestReviewBtn"
      );
      rejectRequestReviewBtn.simulate("click");
    });

    then("User click on cancel button to close modal", () => {
      const cancelRejectModalBtn = requestManagement.findWhere(
        (node) => node.prop("data-testid") === "cancelRejectModalBtn"
      );
      cancelRejectModalBtn.simulate("click");
    });

    then("Network responed for reject request review api", () => {
      const mockResponse = {
        data: mockRequestData[1],
      };

      const updateReviewApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      updateReviewApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateReviewApiMessage.messageId
      );

      updateReviewApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.updateRequestReviewCallId = updateReviewApiMessage.messageId;
      runEngine.sendMessage("Unit Test", updateReviewApiMessage);
    });

    when("User enter request id in input field to filter", () => {
      const filterKeyInput = requestManagement.findWhere(
        (node) => node.prop("data-testid") === "filterKeyInput"
      );
      filterKeyInput.simulate("change", { target: { value: "2" }});
    });

    then("Input field value should be update", () => {
      const filterKeyInput = requestManagement.findWhere(
        (node) => node.prop("data-testid") === "filterKeyInput"
      );
      expect(filterKeyInput.prop('value')).toBe("2");
    });

    when("User press on view button to view request", () => {
      const viewBtn = requestManagement.findWhere(
        (node) => node.prop("data-testid") === "viewBtn-2"
      );
      viewBtn.simulate("click");
    });

    then("View request modal should be opened", () => {
      const viewRequestId = requestManagement.findWhere(
        (node) => node.prop("data-testid") === "viewRequestId"
      );
      expect(viewRequestId).toBeDefined();
      expect(viewRequestId.prop("children").join("")).toBe("Request ID: 2");
    });

    when("User press on sent request button to navigate", () => {
      const sendRequestBtn = requestManagement.findWhere(
        (node) => node.prop("data-testid") === "SentRequest"
      );
      sendRequestBtn.simulate("click");
    });

    then("Navigation should be call", () => {
      const navigationRaiseMessage = {
        id: "NavigationPayLoadMessage",
        initializeFromObject: expect.any(Function),
        messageId: expect.any(String),
        properties: {},
      };
      const runEngineResult = {
        id: expect.any(String),
        initializeFromObject: expect.any(Function),
        messageId: expect.any(String),
        properties: {
          NavigationPropsMessage: {
            id: "RequestManagement",
            navigation: {
              navigate: expect.any(Function),
            },
          },
          NavigationRaiseMessage: navigationRaiseMessage,
          NavigationTargetMessage: "SentRequest",
        },
      };
      expect(runEngine.sendMessage).toBeCalledWith(
        expect.any(String),
        runEngineResult
      );
    });
  });
});
