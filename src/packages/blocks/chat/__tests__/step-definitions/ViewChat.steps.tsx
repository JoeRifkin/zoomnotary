import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ViewChat from "../../src/ViewChat";
import { IChatData } from "../../src/ViewChatController";

const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  getState: jest.fn(),
  dispatch: jest.fn(),
  reset: jest.fn(),
  getId: jest.fn(),
  canGoBack: jest.fn(),
  isFocused: jest.fn(),
  getParent: jest.fn(),
  setParams: jest.fn(),
  setOptions: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
};

const screenProps = {
  navigation,
  id: "ViewChat",
};

const feature = loadFeature("./__tests__/features/ViewChat-scenario.feature");

const token = "TOKEN";
const accountId = 1;

const initialState = {
  token: token,
  chatId: 3,
  message: "",
  accountId: accountId,
  accountIdInput: "",
  chatData: null,
  isVisibleModal: false,
  isVisiblePreviewModal: false,
  imageUrl: "",
  docRes: null,
  keyboardHeight: 0,
  muted: null,
};

const testChatData: IChatData = {
  id: "17",
  attributes: {
    id: 1,
    name: "test group",
    is_notification_mute: true,
    accounts_chats: [
      { id: "1", attributes: { account_id: 1, muted: true, unread_count: 5 } },
    ],
    messages: [
      {
        id: "1",
        type: "chat_message",
        attributes: {
          id: 1,
          message: "hello",
          account_id: 1,
          chat_id: 1,
          created_at: "2022-05-02T21:31:05.047Z",
          updated_at: "2022-05-03T02:45:09.837Z",
          is_mark_read: true,
          attachments: [
            {
              id: 11,
              url:
                "https://bxinternalproject-61157-ruby.b61157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBFQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--9a42b145866aad9616ffc888091ef2598158c7ad/Screen%20Shot%202022-12-22%20at%2017.21.51.png",
            },
          ],
        },
      },
      {
        id: "1",
        type: "chat_message",
        attributes: {
          id: 2,
          message: "hi",
          account_id: 1,
          chat_id: 1,
          created_at: "2022-05-02T21:33:05.047Z",
          updated_at: "2022-05-03T02:46:09.837Z",
          is_mark_read: false,
          attachments: null,
        },
      },
    ],
  },
  relationships: {
    accounts: {
      data: [
        {
          id: "1",
          type: "account",
        },
      ],
    },
  },
};

const EXAMPLE_CHAT_RESPONSE = {
  data: {
    id: "17",
    type: "chat",
    attributes: {
      id: 17,
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
      messages: [],
    },
    relationships: {
      accounts: {
        data: [
          {
            id: "2",
            type: "account",
          },
        ],
      },
    },
  },
};

const file = new Blob([new ArrayBuffer(1)]);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.spyOn(DocumentPicker, "pickSingle").mockImplementation(() => {
      const response: DocumentPickerResponse = {
        name: "testFile",
        uri: "testUri",
        size: 100,
        fileCopyUri: "testCopyUri",
        type: "testFileType",
      };
      return Promise.resolve(response);
    });
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to ViewChat", ({ given, when, then }) => {
    let viewChatWrapper: ShallowWrapper;
    let instance: ViewChat;

    given("I am a User loading ViewChat", () => {
      viewChatWrapper = shallow(<ViewChat {...screenProps} />);
    });

    when("I navigate to ViewChat", () => {
      instance = viewChatWrapper.instance() as ViewChat;
      jest.spyOn(instance, "send");
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), token);
      const meta = { meta: { id: accountId } };
      msgToken.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify(meta)
      );
      runEngine.sendMessage("Unit Test", msgToken);

      const msgNavigation = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      msgNavigation.addData(getName(MessageEnum.SessionResponseData), {
        chatId: 3,
      });
      runEngine.sendMessage("Unit Test", msgNavigation);

      const responseErrorMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      responseErrorMessage.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        { error: "" }
      );

      runEngine.sendMessage("Unit Test", responseErrorMessage);

      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: EXAMPLE_CHAT_RESPONSE,
          meta: {
            message: "Chat data",
          },
        }
      );

      instance.getChatApiCallId = msgValidationAPI.messageId;
      instance.addUserToChatApiCallId = msgValidationAPI.messageId;
      instance.leaveChatApiCallId = msgValidationAPI.messageId;
      instance.sendMessageApiCallId = msgValidationAPI.messageId;
      instance.toggleMuteApiCallId = msgValidationAPI.messageId;
      instance.updateReadMessageApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("ViewChat will load", () => {
      instance.getChatDetails("TOKEN", 17);
      expect(viewChatWrapper).toBeTruthy();
      expect(viewChatWrapper.state()).toEqual(initialState);
    });

    then("a call to retrieve the chatData will be made", () => {
      expect(runEngine.sendMessage).toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "GET",
            RestAPIResponceEndPointMessage: "chat/chats/17",
            RestAPIRequestHeaderMessage: JSON.stringify({
              "Content-Type": "application/json",
              token: token,
            }),
          },
        })
      );
      instance.setState({ chatData: testChatData });
      jest.clearAllMocks();
    });

    then("I will see the messages in the chat", () => {
      // const chatApiMessage = new Message(
      //   getName(MessageEnum.RestAPIResponceMessage)
      // );

      // chatApiMessage.addData(
      //   getName(MessageEnum.RestAPIResponceDataMessage),
      //   chatApiMessage.messageId
      // );

      // chatApiMessage.addData(
      //   getName(MessageEnum.RestAPIResponceSuccessMessage),
      //   EXAMPLE_CHAT_RESPONSE
      // );

      // instance.getChatApiCallId = chatApiMessage.messageId;
      // runEngine.sendMessage("Unit Test", chatApiMessage);
      expect(instance.state.chatData).toEqual(testChatData);
      jest.clearAllMocks();
      instance.updateReadMessages();
    });

    then("the read messages will be updated", () => {
      expect(runEngine.sendMessage).toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "PUT",
            RestAPIResponceEndPointMessage: "chat/chats/read_messages",
            RestAPIRequestHeaderMessage: JSON.stringify({
              "Content-Type": "application/json",
              token: token,
            }),
            RestAPIRequestBodyMessage: JSON.stringify({
              chat_id: 3,
            }),
          },
        })
      );

      const updateReadMessagesApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      updateReadMessagesApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateReadMessagesApiMessage.messageId
      );

      instance.updateReadMessageApiCallId =
        updateReadMessagesApiMessage.messageId;
      runEngine.sendMessage("Unit Test", updateReadMessagesApiMessage);
    });

    then("I can enter a message", () => {
      const messageInput = viewChatWrapper.findWhere(
        (node) => node.prop("testID") === "inputMessage"
      );
      messageInput.simulate("changeText", "Hi");
      expect(instance.state.message).toEqual("Hi");
    });

    when("I can hide keyboard", () => {
      const buttonComponent = viewChatWrapper.findWhere(
        (node) => node.prop("testID") === "hideKeyboard"
      );
      buttonComponent.simulate("press");
    });

    when("I press on the btnSendMessage button", () => {
      const buttonComponent = viewChatWrapper.findWhere(
        (node) => node.prop("testID") === "btnSendMessage"
      );
      buttonComponent.simulate("press");
    });

    then("a call to send the message will be made", () => {
      const formData = new FormData();
      formData.append("message[message]", "Hi");
      expect(runEngine.sendMessage).toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "POST",
            RestAPIResponceEndPointMessage: "chat/chats/3/messages",
            RestAPIRequestHeaderMessage: JSON.stringify({
              token: token,
            }),
            RestAPIRequestBodyMessage: formData,
          },
        })
      );
      jest.clearAllMocks();
      instance.getChatDetails("TOKEN", 17);
    });

    when("I press on the btnInsertImage button", () => {
      const buttonComponent = viewChatWrapper.findWhere(
        (node) => node.prop("testID") === "btnInsertImage"
      );
      buttonComponent.simulate("press");
    });

    when("I can press on the btnClosePreviewModal button", () => {
      const buttonComponent = viewChatWrapper.findWhere(
        (node) => node.prop("testID") === "btnClosePreviewModal"
      );
      buttonComponent.simulate("press");
    });

    when("I press on the btnInsertImage button", () => {
      const buttonComponent = viewChatWrapper.findWhere(
        (node) => node.prop("testID") === "btnInsertImage"
      );
      buttonComponent.simulate("press");
    });

    then("I can enter a message", () => {
      const messageInput = viewChatWrapper.findWhere(
        (node) => node.prop("testID") === "inputImageMessage"
      );
      messageInput.simulate("changeText", "Hi");
      expect(instance.state.message).toEqual("Hi");
    });

    when("I press on the btnSendImageMessage button", () => {
      const buttonComponent = viewChatWrapper.findWhere(
        (node) => node.prop("testID") === "btnSendImageMessage"
      );
      buttonComponent.simulate("press");
    });

    then("a call to send the message will be made", () => {
      const formData = new FormData();
      formData.append("message[message]", "Hi");
      formData.append("message[attachments][]", file);
      expect(runEngine.sendMessage).toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "POST",
            RestAPIResponceEndPointMessage: "chat/chats/3/messages",
            RestAPIRequestHeaderMessage: JSON.stringify({
              token: token,
            }),
            RestAPIRequestBodyMessage: formData,
          },
        })
      );
      jest.clearAllMocks();
      instance.getChatDetails("TOKEN", 17);
      jest.spyOn(DocumentPicker, "pickSingle").mockImplementation(() => {
        throw new Error();
      });
      instance.openFile();
      jest.spyOn(DocumentPicker, "isCancel").mockImplementation(() => {
        return true;
      });
      instance.openFile();
    });

    then("a call to retrieve the chatData will be made", () => {
      expect(runEngine.sendMessage).toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "GET",
            RestAPIResponceEndPointMessage: "chat/chats/17",
            RestAPIRequestHeaderMessage: JSON.stringify({
              "Content-Type": "application/json",
              token: token,
            }),
          },
        })
      );
      jest.clearAllMocks();
    });

    when("I will see the messages in the chat", () => {
      // const chatApiMessage = new Message(
      //   getName(MessageEnum.RestAPIResponceMessage)
      // );
      // chatApiMessage.addData(
      //   getName(MessageEnum.RestAPIResponceDataMessage),
      //   chatApiMessage.messageId
      // );
      // chatApiMessage.addData(
      //   getName(MessageEnum.RestAPIResponceSuccessMessage),
      //   EXAMPLE_CHAT_RESPONSE
      // );
      // instance.getChatApiCallId = chatApiMessage.messageId;
      // runEngine.sendMessage("Unit Test", chatApiMessage);
    });

    when("I press on the addAccount button", () => {
      const buttonComponent = viewChatWrapper.findWhere(
        (node) => node.prop("testID") === "btnShowAddModal"
      );
      buttonComponent.simulate("press");
    });

    when("I press on the btnCloseModal button", () => {
      const buttonComponent = viewChatWrapper.findWhere(
        (node) => node.prop("testID") === "btnCloseModal"
      );
      buttonComponent.simulate("press");
    });

    when("I press on the addAccount button", () => {
      const buttonComponent = viewChatWrapper.findWhere(
        (node) => node.prop("testID") === "btnShowAddModal"
      );
      buttonComponent.simulate("press");
    });

    then("I can enter the account id", () => {
      const accountIdInput = viewChatWrapper.findWhere(
        (node) => node.prop("testID") === "inputAccountID"
      );
      accountIdInput.simulate("changeText", "2");
      expect(instance.state.accountIdInput).toEqual("2");
    });

    when("I press on the addAccountSubmit button", () => {
      const addAccountButton = viewChatWrapper.findWhere(
        (node) => node.prop("testID") === "btnAddAccount"
      );
      addAccountButton.simulate("press");
      instance.addUserToChat("", 3);
      instance.addUserToChat("2", 3);
    });

    then("a call to add the account will be made", () => {
      expect(runEngine.sendMessage).toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "POST",
            RestAPIResponceEndPointMessage: "chat/chats/add_user",
            RestAPIRequestHeaderMessage: JSON.stringify({
              "Content-Type": "application/json",
              token: token,
            }),
            RestAPIRequestBodyMessage: JSON.stringify({
              accounts_id: [2],
              chat_id: 3,
            }),
          },
        })
      );
      jest.clearAllMocks();
      instance.getChatDetails("TOKEN", 17);
    });

    then("a call to retrieve the chatData will be made", () => {
      expect(runEngine.sendMessage).toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "GET",
            RestAPIResponceEndPointMessage: "chat/chats/17",
            RestAPIRequestHeaderMessage: JSON.stringify({
              "Content-Type": "application/json",
              token: token,
            }),
          },
        })
      );
      jest.clearAllMocks();
    });

    when("I will see the messages in the chat", () => {
      // const chatApiMessage = new Message(
      //   getName(MessageEnum.RestAPIResponceMessage)
      // );
      // chatApiMessage.addData(
      //   getName(MessageEnum.RestAPIResponceDataMessage),
      //   chatApiMessage.messageId
      // );
      // chatApiMessage.addData(
      //   getName(MessageEnum.RestAPIResponceSuccessMessage),
      //   EXAMPLE_CHAT_RESPONSE
      // );
      // instance.getChatApiCallId = chatApiMessage.messageId;
      // runEngine.sendMessage("Unit Test", chatApiMessage);
    });

    when("I press on the mute button", () => {
      const buttonComponent = viewChatWrapper.findWhere(
        (node) => node.prop("testID") === "btnToggleMute"
      );
      buttonComponent.simulate("press");
      expect(instance.state.muted).toEqual(true);
      buttonComponent.simulate("press");
      expect(instance.state.muted).toEqual(false);
    });

    then("a call to mute the chat room will be made", () => {
      expect(runEngine.sendMessage).toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "PUT",
            RestAPIResponceEndPointMessage: "chat/chats/3",
            RestAPIRequestHeaderMessage: JSON.stringify({
              "Content-Type": "application/json",
              token: token,
            }),
            RestAPIRequestBodyMessage: JSON.stringify({
              chat: {
                muted: false,
              },
            }),
          },
        })
      );
      jest.clearAllMocks();
      const muteChatApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      muteChatApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        muteChatApiMessage.messageId
      );

      instance.toggleMuteApiCallId = muteChatApiMessage.messageId;
      runEngine.sendMessage("Unit Test", muteChatApiMessage);
    });

    when("I press on the leaveChat button", () => {
      const buttonComponent = viewChatWrapper.findWhere(
        (node) => node.prop("testID") === "btnLeaveChat"
      );
      buttonComponent.simulate("press");
    });

    then("a call to leave the chat room will be made", () => {
      expect(runEngine.sendMessage).toBeCalledWith(
        "RestAPIRequestMessage",
        expect.objectContaining({
          id: "RestAPIRequestMessage",
          initializeFromObject: expect.any(Function),
          messageId: expect.any(String),
          properties: {
            RestAPIRequestMethodMessage: "POST",
            RestAPIResponceEndPointMessage: "chat/chats/leave",
            RestAPIRequestHeaderMessage: JSON.stringify({
              "Content-Type": "application/json",
              token: token,
            }),
            RestAPIRequestBodyMessage: JSON.stringify({
              chat_id: 3,
            }),
          },
        })
      );
      jest.clearAllMocks();

      const leaveChatRoomApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      leaveChatRoomApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        leaveChatRoomApiMessage.messageId
      );

      instance.leaveChatApiCallId = leaveChatRoomApiMessage.messageId;
      runEngine.sendMessage("Unit Test", leaveChatRoomApiMessage);
    });

    then("I can leave the screen", () => {
      instance.componentWillUnmount();
      expect(viewChatWrapper).toBeTruthy();
    });
  });
});
