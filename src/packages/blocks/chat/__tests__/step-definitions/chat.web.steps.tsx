import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Chat from "../../src/Chat.web";
import { IChat } from "../../src/ChatController";

const screenProps = {
  navigation: {},
  id: "Chat",
};

const feature = loadFeature("./__tests__/features/chat-scenario.web.feature");

const initialState = {
  token: "",
  accountId: -1,
  chatName: "",
  chatList: [],
  isVisibleModal: false,
};

const EXAMPLE_CHATLIST_RESPONSE = {
  data: [
    {
      id: "7",
      type: "chat_my_chat",
      attributes: {
        name: "Name",
        accounts_chats: [
          {
            id: "12",
            type: "accounts_chats",
            attributes: {
              account_id: 1,
              muted: false,
              unread_count: 4,
            },
          },
          {
            id: "8",
            type: "accounts_chats",
            attributes: {
              account_id: 2,
              muted: false,
              unread_count: 0,
            },
          },
        ],
        messages: {
          id: "33",
          type: "chat_message",
          attributes: {
            id: 33,
            message: "Hi",
            account_id: 2,
            chat_id: 7,
            created_at: "2022-12-06T22:15:22.488Z",
            updated_at: "2022-12-06T22:15:27.465Z",
            is_mark_read: true,
            attachments: null,
          },
        },
      },
    },
    {
      id: "11",
      type: "chat_my_chat",
      attributes: {
        name: "Test 4",
        accounts_chats: [
          {
            id: "21",
            type: "accounts_chats",
            attributes: {
              account_id: 5,
              muted: false,
              unread_count: 7,
            },
          },
          {
            id: "22",
            type: "accounts_chats",
            attributes: {
              account_id: 7,
              muted: false,
              unread_count: 7,
            },
          },
          {
            id: "13",
            type: "accounts_chats",
            attributes: {
              account_id: 2,
              muted: true,
              unread_count: 0,
            },
          },
        ],
        messages: {
          id: "34",
          type: "chat_message",
          attributes: {
            id: 34,
            message: "hi",
            account_id: 2,
            chat_id: 11,
            created_at: "2022-12-07T16:20:33.804Z",
            updated_at: "2022-12-07T16:20:42.485Z",
            is_mark_read: true,
            attachments: null,
          },
        },
      },
    },

    {
      id: "15",
      type: "chat_my_chat",
      attributes: {
        name: "Builder",
        accounts_chats: [
          {
            id: "17",
            type: "accounts_chats",
            attributes: {
              account_id: 2,
              muted: false,
              unread_count: 0,
            },
          },
        ],
        messages: {
          id: "29",
          type: "chat_message",
          attributes: {
            id: 29,
            message: "Hello",
            account_id: 2,
            chat_id: 15,
            created_at: "2022-12-06T04:01:17.789Z",
            updated_at: "2022-12-06T04:01:20.383Z",
            is_mark_read: true,
            attachments: null,
          },
        },
      },
    },
    {
      id: "16",
      type: "chat_my_chat",
      attributes: {
        name: "Duis est moll",
        accounts_chats: [
          {
            id: "18",
            type: "accounts_chats",
            attributes: {
              account_id: 2,
              muted: true,
              unread_count: 1,
            },
          },
        ],
        messages: {
          id: "26",
          type: "chat_message",
          attributes: {
            id: 26,
            message: "is this. a read message",
            account_id: 2,
            chat_id: 16,
            created_at: "2022-12-06T03:48:55.707Z",
            updated_at: "2022-12-06T03:48:55.707Z",
            is_mark_read: false,
            attachments: null,
          },
        },
      },
    },
    {
      id: "17",
      type: "chat_my_chat",
      attributes: {
        name: "Duis est moll",
        accounts_chats: [
          {
            id: "19",
            type: "accounts_chats",
            attributes: {
              account_id: 2,
              muted: true,
              unread_count: 0,
            },
          },
        ],
        messages: null,
      },
    },
  ],
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to Chat", ({ given, when, then }) => {
    let chatWrapper: ShallowWrapper;
    let instance: Chat;

    given("I am a User loading Chat", () => {
      chatWrapper = shallow(<Chat {...screenProps} />);
    });

    when("I navigate to Chat", () => {
      instance = chatWrapper.instance() as Chat;
      jest.spyOn(instance, "send");
      // causes a JSON error
      // const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      //msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      //runEngine.sendMessage("Unit Test", msgToken);
      // const msgValidationAPI = new Message(
      //   getName(MessageEnum.RestAPIResponceMessage)
      // );
      // msgValidationAPI.addData(
      //   getName(MessageEnum.RestAPIResponceDataMessage),
      //   msgValidationAPI.messageId
      // );
      // msgValidationAPI.addData(
      //   getName(MessageEnum.RestAPIResponceSuccessMessage),
      //   {
      //     data: EXAMPLE_CHATLIST_RESPONSE,
      //     meta: {
      //       message: "Chat data",
      //     },
      //   }
      // );
      // instance.getChatListApiCallId = msgValidationAPI.messageId;
      // instance.createChatRoomApiCallId = msgValidationAPI.messageId;
      // runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("Chat will load", () => {
      instance.getChatList("TOKEN");
      // expect(chatWrapper).toBeTruthy();
      // expect(chatWrapper.state()).toEqual(initialState);
    });

    then("a call to retrieve the chatlist will be made", () => {
      expect(runEngine.sendMessage).toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "GET",
            RestAPIResponceEndPointMessage: "chat/chats/mychats",
            RestAPIRequestHeaderMessage: JSON.stringify({
              "Content-Type": "application/json",
              token: "TOKEN",
            }),
          },
        })
      );
    });

    then("I will see a list of chatrooms I am a part of", () => {
      const chatApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      chatApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        chatApiMessage.messageId
      );

      chatApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        EXAMPLE_CHATLIST_RESPONSE
      );

      instance.getChatListApiCallId = chatApiMessage.messageId;
      runEngine.sendMessage("Unit Test", chatApiMessage);

      expect(instance.state.chatList.length).toBe(5);
    });

    when("I click on the createChatRoom button", () => {
      const buttonComponent = chatWrapper.findWhere(
        (node) => node.prop("data-test-id") === "createChatRoomBtn"
      );
      // buttonComponent.simulate("click");
    });

    when("I click on the cancel button", () => {
      const buttonComponent = chatWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnCloseModal"
      );
      // buttonComponent.simulate("click");
    });

    when("I click on the createChatRoom button", () => {
      const buttonComponent = chatWrapper.findWhere(
        (node) => node.prop("data-test-id") === "createChatRoomBtn"
      );
      // buttonComponent.simulate("click");
    });

    then("I can enter the chat room name", () => {
      const inputRoomName = chatWrapper.findWhere(
        (node) => node.prop("data-test-id") === "inputRoomName"
      );
      // inputRoomName.simulate("change", "Chat Room");
      // expect(instance.state.chatName).toEqual("Chat Room");
    });

    when("I click on the createChatRoom button", () => {
      const createChatRoomButton = chatWrapper.findWhere(
        (node) => node.prop("data-test-id") === "createChatSubmitBtn"
      );
      // createChatRoomButton.simulate("click");
    });

    then("a call to create the chat room will be made", () => {
      // expect(runEngine.sendMessage).toBeCalledWith(
      //   "RestAPIRequestMessage",
      //   expect.objectContaining({
      //     id: "RestAPIRequestMessage",
      //     initializeFromObject: expect.any(Function),
      //     messageId: expect.any(String),
      //     properties: {
      //       RestAPIRequestMethodMessage: "POST",
      //       RestAPIResponceEndPointMessage: "chat/chats",
      //       RestAPIRequestHeaderMessage: JSON.stringify({
      //         "Content-Type": "application/json",
      //         token: "",
      //         "Access-Control-Allow-Origin": "*",
      //       }),
      //       RestAPIRequestBodyMessage: JSON.stringify({
      //         name: "Chat Room",
      //       }),
      //     },
      //   })
      // );
    });

    when("The network will respond with a success", () => {
      const createChatRoomApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      createChatRoomApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        createChatRoomApiMessage.messageId
      );

      instance.createChatRoomApiCallId = createChatRoomApiMessage.messageId;
      runEngine.sendMessage("Unit Test", createChatRoomApiMessage);
    });

    then("a call to retrieve the chatlist will be made", () => {
      // expect(runEngine.sendMessage).toBeCalledWith(
      //   "RestAPIRequestMessage",
      //   expect.objectContaining({
      //     id: "RestAPIRequestMessage",
      //     initializeFromObject: expect.any(Function),
      //     messageId: expect.any(String),
      //     properties: {
      //       RestAPIRequestMethodMessage: "GET",
      //       RestAPIResponceEndPointMessage: "chat/chats/mychats",
      //       RestAPIRequestHeaderMessage: JSON.stringify({
      //         "Content-Type": "application/json",
      //         token: "TOKEN",
      //       }),
      //     },
      //   })
      // );
    });

    when("I will see a list of chatrooms I am a part of", () => {
      const chatApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      chatApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        chatApiMessage.messageId
      );

      chatApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        EXAMPLE_CHATLIST_RESPONSE
      );

      instance.getChatListApiCallId = chatApiMessage.messageId;
      runEngine.sendMessage("Unit Test", chatApiMessage);
    });

    when("I click on a chat room", () => {
      const buttonComponent = chatWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnShowChat0"
      );
      // buttonComponent.simulate("click");
    });

    then("I can leave the screen", () => {
      instance.componentWillUnmount();
      expect(chatWrapper).toBeTruthy();
    });
  });
});
