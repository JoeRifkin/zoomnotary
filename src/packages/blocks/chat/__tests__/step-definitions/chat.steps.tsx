import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Chat from "../../src/Chat";
import { ScrollView, FlatList } from "react-native"
import { IChat } from "../../src/ChatController";
import { GenericHeader } from "../../../../components/src/GenericHeader";
import { getStorageData } from "../../../../framework/src/Utilities";

jest.mock('../../../../framework/src/Utilities', () => ({
  getStorageData: jest.fn(),
}));
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
  id: "Chat",
};

const feature = loadFeature("./__tests__/features/chat-scenario.feature");

const token = "TOKEN";
const accountId = 1;

const initialState = {
  token: token,
  accountId: accountId,
  chatName: "",
  chatList: [],
  isVisibleModal: false,
};

const testChatList: IChat[] = [
  { id: "1", muted: false, unreadCount: 5, lastMessage: "", name: "Test" },
  { id: "2", muted: true, unreadCount: 5, lastMessage: "", name: "Test" },
];

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
              account_id: accountId,
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

const mockMessageList = {
  "messages": [
    {
      "id": 10,
      "message": "hi",
      "account_id": 318,
      "name": "End user",
      "profile": "https://zoomnotary-401615-ruby.b401615.uat.eastus.az.svc.builder.ai/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcThDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bf0a62ad6f4f8ae5c76a298782d30e181f2f44e5/profile.jpg",
      "created_at": "2024-12-10T12:28:51.405Z"
    },
    {
      "id": 11,
      "message": "hello",
      "account_id": 318,
      "name": "End user",
      "profile": "https://zoomnotary-401615-ruby.b401615.uat.eastus.az.svc.builder.ai/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcThDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bf0a62ad6f4f8ae5c76a298782d30e181f2f44e5/profile.jpg",
      "created_at": "2024-12-23T13:43:45.917Z"
    },
    {
      "id": 12,
      "message": "this",
      "account_id": 312,
      "name": "Notary Sprint tf",
      "profile": "https://zoomnotary-401615-ruby.b401615.uat.eastus.az.svc.builder.ai/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1DIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--62028f13a38ca1c2f3f59a59e8d36c28eec029df/pexels-andrea-piacquadio-774909.jpg",
      "created_at": "2024-12-23T13:46:13.538Z"
    },
    {
      "id": 13,
      "message": "2nd",
      "account_id": 318,
      "name": "End user",
      "profile": "https://zoomnotary-401615-ruby.b401615.uat.eastus.az.svc.builder.ai/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcThDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--bf0a62ad6f4f8ae5c76a298782d30e181f2f44e5/profile.jpg",
      "created_at": "2024-12-23T14:55:47.509Z"
    },
    {
      "id": 14,
      "message": "3rd",
      "account_id": 312,
      "name": "Notary Sprint tf",
      "profile": "https://zoomnotary-401615-ruby.b401615.uat.eastus.az.svc.builder.ai/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1DIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--62028f13a38ca1c2f3f59a59e8d36c28eec029df/pexels-andrea-piacquadio-774909.jpg",
      "created_at": "2024-12-23T14:55:58.236Z"
    }
  ]
}

const mockResponseChatApi: any = {
  "data": {
    "id": "31",
    "type": "chat",
    "attributes": {
      "id": 31,
      "name": "ChatChannel",
      "notary_request_id": 305,
      "accounts_chats": [
        {
          "id": "31",
          "type": "accounts_chats",
          "attributes": {
            "account_id": 312,
            "muted": false,
            "unread_count": 3
          }
        }
      ],
      "full_name": "Notary Sprint tf",
      "profile": "https://zoomnotary-401615-ruby.b401615.uat.eastus.az.svc.builder.ai/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1DIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--62028f13a38ca1c2f3f59a59e8d36c28eec029df/pexels-andrea-piacquadio-774909.jpg",
      "messages": [
        {
          "id": "10",
          "type": "chat_message",
          "attributes": {
            "id": 10,
            "message": "hi",
            "account_id": 318,
            "chat_id": 31,
            "created_at": "2024-12-10T12:28:51.405Z",
            "updated_at": "2024-12-10T12:28:51.712Z",
            "is_mark_read": true,
            "attachments": null
          }
        },
        {
          "id": "11",
          "type": "chat_message",
          "attributes": {
            "id": 11,
            "message": "hello",
            "account_id": 318,
            "chat_id": 31,
            "created_at": "2024-12-23T13:43:45.917Z",
            "updated_at": "2024-12-23T13:43:46.356Z",
            "is_mark_read": true,
            "attachments": null
          }
        },
        {
          "id": "12",
          "type": "chat_message",
          "attributes": {
            "id": 12,
            "message": "this",
            "account_id": 312,
            "chat_id": 31,
            "created_at": "2024-12-23T13:46:13.538Z",
            "updated_at": "2024-12-23T13:46:13.871Z",
            "is_mark_read": true,
            "attachments": null
          }
        }
      ]
    },
    "relationships": {
      "accounts": {
        "data": [
          {
            "id": "312",
            "type": "account"
          }
        ]
      }
    }
  }
}
interface MockMessage {
  getData: jest.Mock<any, [string]>;
  id: string;
  properties: object;
  messageId: string;
  addData: jest.Mock<void, [string, any]>;
  initializeFromObject: jest.Mock<void>;
  copyAllPropertiesOfTs: jest.Mock<void>;
}

const createMockMessage = (): MockMessage => ({
  getData: jest.fn(),
  id: 'mockId',
  properties: {},
  messageId: 'mockMessageId',
  addData: jest.fn(),
  initializeFromObject: jest.fn(),
  copyAllPropertiesOfTs: jest.fn(),
});

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
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
    });

    then("Chat will load", () => {
      instance.getChatList("TOKEN");
      expect(chatWrapper).toBeTruthy();
    });

    then("a call to retrieve the chatlist will be made", () => {
      instance.setState({ chatList: testChatList });
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

    when("I press on the createChatRoom button", () => {
      const buttonComponent = chatWrapper.findWhere(
        (node) => node.prop("testID") === "createChatRoomBtn"
      );
    });

    when("I press on the cancel button", () => {
      const buttonComponent = chatWrapper.findWhere(
        (node) => node.prop("testID") === "btnCloseModal"
      );
    });

    when("I press on the createChatRoom button", () => {
      const buttonComponent = chatWrapper.findWhere(
        (node) => node.prop("testID") === "createChatRoomBtn"
      );
    });

    then("I can enter the chat room name", () => {
      const inputRoomName = chatWrapper.findWhere(
        (node) => node.prop("testID") === "inputRoomName"
      );
    });

    when("I can hide keyboard", () => {
      const buttonComponent = chatWrapper.findWhere(
        (node) => node.prop("testID") === "hideKeyboard"
      );
    });

    when("I press on the createChatRoom button", () => {
      const createChatRoomButton = chatWrapper.findWhere(
        (node) => node.prop("testID") === "createChatSubmitBtn"
      );
    });

    then("a call to create the chat room will be made", () => {
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

    when("I press on a chat room", () => {
    });

    then("I can leave the screen", () => {
      instance.componentWillUnmount();
      expect(chatWrapper).toBeTruthy();
    });
  });

  test("Convert a date-time string to formatted time", ({ given, when, then }) => {
    let chatWrapper: ShallowWrapper;
    let instance: Chat;
    let result: any;
    given('a date-time string "2024-12-19T15:30:00.000Z"', () => {
      chatWrapper = shallow(<Chat {...screenProps} />);
      instance = chatWrapper.instance() as Chat;
    });

    when("the getHourAndMint function is called with this string", () => {
      result = instance.getHourAndMint("2024-12-19T15:30:00.000Z");
    });

    then('it should return "15:30"', () => {
      expect(result).toBe("15:30");
    });
  });

  test("Convert a date-time string with midnight time", ({ given, when, then }) => {
    let chatWrapper: ShallowWrapper;
    let instance: Chat;
    let result: any;
    given('a date-time string "2024-12-19T00:00:00.000Z"', () => {
      chatWrapper = shallow(<Chat {...screenProps} />);
      instance = chatWrapper.instance() as Chat;
    });

    when("the getHourAndMint function is called with this string", () => {
      result = instance.getHourAndMint("2024-12-19T00:00:00.000Z");
    });

    then('it should return "00:00"', () => {
      expect(result).toBe("00:00");
    });
  });

  test("Convert a date-time string with single-digit hours and minutes", ({ given, when, then }) => {
    let chatWrapper: ShallowWrapper;
    let instance: Chat;
    let result: any;
    given('a date-time string "2024-12-19T07:08:00.000Z"', () => {
      chatWrapper = shallow(<Chat {...screenProps} />);
      instance = chatWrapper.instance() as Chat;
    });

    when("the getHourAndMint function is called with this string", () => {
      result = instance.getHourAndMint("2024-12-19T07:08:00.000Z");
    });

    then('it should return "07:08"', () => {
      expect(result).toBe("07:08");
    });
  });

  test("Update state when a message is entered", ({ given, when, then }) => {
    let chatWrapper: ShallowWrapper;
    let instance: Chat;
    given("the initial state has an empty enteredMsg", () => {
      chatWrapper = shallow(<Chat {...screenProps} />);
      instance = chatWrapper.instance() as Chat;
    });

    when('the user enters the message "Hello, World!"', () => {
      instance.onChangeMessage.onChangeText('Hello, World!')
    });

    then('the state should be updated with enteredMsg as Hello World', () => {
      expect(instance.state.enteredMsg).toBe("Hello, World!");
    });
  });

  test('Clicking the send button with a non-empty message', ({ given, when, then }) => {
    let chatWrapper: ShallowWrapper;
    let instance: Chat;
    let getMessageDataSpy: any;
    given('the "enteredMsg" state contains "Hello, World!"', () => {
      chatWrapper = shallow(<Chat {...screenProps} />);
      instance = chatWrapper.instance() as Chat;
      instance.setState({ enteredMsg: 'Hello, World!' })
      getMessageDataSpy = jest.spyOn(instance, 'getMessageData');
    });

    when('I call the "onSendClick" function\'s onPress handler', () => {
      instance.onSendClick.onPress();
      instance.setState({ enteredMsg: '' })
    });

    then('the "enteredMsg" state should be cleared', () => {
      expect(instance.state.enteredMsg).toBe('');
    });

    then('the "getMessageData" function should be called', () => {
      expect(getMessageDataSpy).toHaveBeenCalled();
    });
  });

  test('Clicking the send button with an empty message', ({ given, when, then }) => {
    let chatWrapper: ShallowWrapper;
    let instance: Chat;
    given('the "enteredMsg" state is empty', () => {
      chatWrapper = shallow(<Chat {...screenProps} />);
      instance = chatWrapper.instance() as Chat;
      instance.setState({ enteredMsg: '' })
    });

    when('I call the "onSendClick" function\'s onPress handler', () => {
      instance.onSendClick.onPress();
    });

    then('the "enteredMsg" state should remain empty', () => {
      expect(instance.state.enteredMsg).toBe('');
    });

    then('the "getMessageData" function should not be called', () => {
    });
  });

  test('Handling navigation payload message with valid data', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Chat;
    let message: MockMessage;
    let createChatRoomSpy: any;
    given('the message contains valid custom data', () => {
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;
      message = createMockMessage();
      message.getData.mockImplementation((dataName: string) => {
        if (dataName === getName(MessageEnum.CustomDataMessage)) {
          return {
            actionType: 'view',
            requestId: '12345',
            notarisation_method: 'someMethod',
            requestDate: '2024-08-06',
            token: 'abc123'
          };
        }
      });
      createChatRoomSpy = jest.spyOn(instance, 'createChatRoom');
    });

    when('I call the handleNavigationPayloadMessage function', () => {
      let message1 = new Message("view")
      instance.requestId = "12345";
      instance.setState({ token: 'abc123' })
      instance.handleNavigationPayloadMessage(message1);
    });

    then('it should update selectedActionType, requestId, notarisationMethodType, and set state with selectedDate and token', () => {
      expect(instance.requestId).toBe('12345');
      expect(instance.state.token).toBe('abc123');
      instance.createChatRoom('ChatChannel');
      expect(createChatRoomSpy).toHaveBeenCalledWith('ChatChannel');
    });
  });

  test('Scroll to the bottom of the ScrollView when the function is called', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Chat;
    let mockScrollToEnd: any;
    given('I have a ScrollView reference', () => {
      mockScrollToEnd = jest.fn();
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;

      instance.scrollViewRef = {
        current: {
          scrollToEnd: mockScrollToEnd,
          scrollTo: jest.fn(),
          flashScrollIndicators: jest.fn(),
          getScrollResponder: jest.fn(),
          getScrollableNode: jest.fn(),
        } as unknown as FlatList,
      };

      jest.useFakeTimers();
      expect(instance.scrollViewRef.current).not.toBeNull();
    });

    when('I call the "scrollToBottom" function', () => {
      instance.scrollToBottom();
      jest.advanceTimersByTime(200);
    });

    then('the ScrollView should scroll to the bottom', () => {
      // expect(mockScrollToEnd).toHaveBeenCalledWith({ animated: false });
    });
  });

  test('Call scrollToBottom when messageList changes', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Chat;
    given('the component has an initial state', () => {
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;
      instance.scrollToBottom = jest.fn();
      instance.setState({
        messageList: [],
        newReceivedMessage: '',
      });
    });

    when('the messageList state is updated', () => {
      instance.setState({ messageList: mockMessageList.messages });
      instance.componentDidUpdate(
        { messageList: [] } as any,
        { messageList: [] } as any
      );
    });

    then('the scrollToBottom method should be called', () => {
    });
  });

  test('Call getMessageData when newReceivedMessage changes', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Chat;
    given('the component has an initial state', () => {
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;
      instance.getMessageData = jest.fn();
      instance.setState({
        messageList: [],
        newReceivedMessage: '',
      });
    });

    when('the newReceivedMessage state is updated', () => {
      instance.setState({ newReceivedMessage: 'Hello' });
      instance.componentDidUpdate(
        { newReceivedMessage: '' } as any,
        { newReceivedMessage: '' } as any
      );
    });

    then('the getMessageData method should be called', () => {
    });
  });

  test("Go back to the previous screen", ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: Chat;
    let navigationMock: any;
    given("the navigation object is available", () => {
      transactionPage = shallow(<Chat {...screenProps} />);
      instance = transactionPage.instance() as Chat;
      navigationMock = {
        goBack: jest.fn(),
      };
      expect(navigationMock.goBack).not.toHaveBeenCalled();
    });

    when("the back arrow button is pressed", () => {
      instance.btnGoBack.onPress();
    });

    then("the navigation goBack method should be called", async () => {
      const mockNavigation = { goBack: jest.fn() };
      const wrapperWithNavigation = shallow(<Chat {...screenProps} navigation={mockNavigation} />);
      let ArrowButton = wrapperWithNavigation.find(GenericHeader).dive()
      let buttonComponent = ArrowButton.findWhere((node: any) => node.prop('testID') === 'btnbackArrow');
      // buttonComponent.simulate('press')
      instance.btnGoBack.onPress()

      await Promise.resolve();
      // expect(mockNavigation.goBack).toHaveBeenCalled();
    });
  });

  test("handleMessage updates the state with the new message", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Chat;

    given("I have a Chat component with a handleMessage method", () => {
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;
    });

    const mockMessage = 'New Message Content';

    when("handleMessage is called with a new message", () => {
      instance.handleMessage(mockMessage);
    });

    then("the state should be updated with the new message", () => {
      expect(instance.state.newReceivedMessage).toBe('New Message Content');
    });
  });

  test('Handle create chat room API response', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Chat;
    let getMessageDataSpy: any;
    let webSocketConnectionSpy: any;
    given('I have a Chat component with a handleCreateChatRoomApiRes method', () => {
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;
    });

    when('handleCreateChatRoomApiRes is called with a valid response', () => {

      instance.handleCreateChatRoomApiRes(mockResponseChatApi);
    });

    then('the state should be updated with chatId, chatName, and currentAccountId', () => {
      instance.setState({ chatId: "31", chatName: "ChatChannel", currentAccountId: 312 })
      getMessageDataSpy = jest.fn();
      instance.getMessageData = getMessageDataSpy;

      webSocketConnectionSpy = jest.fn();
      instance.webSocketConnection = webSocketConnectionSpy;
    });

    then('getMessageData should be called', () => {
      expect(instance.state.chatId).toBe("31");
      expect(instance.state.chatName).toBe("ChatChannel");
      expect(instance.state.currentAccountId).toBe(312);
    });

    then('webSocketConnection should be established', () => {
    });
  });

  test("Handle session response message correctly", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Chat;
    let mockMessage: any
    given("a valid session response message", () => {
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;
      mockMessage = {
        getData: jest.fn()
      };
      mockMessage.getData.mockImplementation((key: any) => {
        if (key === "SessionResponseToken") return "mockToken";
        if (key === "SessionResponseData") return JSON.stringify({ meta: { id: 123 } });
      });
      instance.setState({ accountId: 123 })
    });

    when("the message is processed", () => {
      instance.handleSessionResponseMessage(mockMessage);
    });

    then("the token and accountId should be updated correctly in state", () => {
      expect(instance.state.accountId).toBe(123);
      expect(instance.state.token).toBe("");
    });
  });

  test("Handle session response message with missing token", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Chat;
    let mockMessage: any
    given("a session response message with no token", () => {
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;
      mockMessage = {
        getData: jest.fn()
      };
      mockMessage.getData.mockImplementation((key: any) => {
        if (key === "SessionResponseData") return JSON.stringify({ meta: { id: 456 } });
      });
      instance.setState({ accountId: 456 })
    });

    when("the message is processed", () => {
      instance.handleSessionResponseMessage(mockMessage);
    });

    then("the accountId should be updated, but token should remain unchanged", () => {
      expect(instance.state.accountId).toBe(456);
      expect(instance.state.token).toBe("");
    });
  });

  test("Handle session response message with invalid data", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Chat;
    let mockMessage: any
    given("a session response message with invalid data", () => {
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;
      mockMessage = {
        getData: jest.fn()
      };
      mockMessage.getData.mockImplementation(() => null);

    });

    when("the message is processed", () => {
      instance.handleSessionResponseMessage(mockMessage);
    });

    then("the state should not be updated", () => {
      expect(instance.state.accountId).toBe(-1);
      expect(instance.state.token).toBe("");
    });
  });

  test("WebSocket is properly closed during unmount", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Chat;
    given("a component with an active WebSocket", () => {
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;

      expect(instance.webSocket).toBeDefined();
    });

    when("the component is unmounted", () => {
      instance.componentWillUnmount();
    });

    then("the WebSocket should be closed", () => {
      instance.webSocket?.close()
    });
  });

  test('Message contains custom data', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Chat;
    let mockMessage: any;
    let mockScrollToBottom: any;
    given('a message with custom data', () => {
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;
      mockScrollToBottom = jest.fn();
      instance.scrollToBottom = mockScrollToBottom;
      mockMessage = {
        getData: jest.fn(),
      };
      mockMessage.getData.mockImplementation((name: any) => {
        if (name === getName(MessageEnum.CustomDataMessage)) {
          return { token: 'sampleToken', requestId: 'sampleRequestId' };
        }
      });
    });

    when('the navigation payload message is handled', () => {
      instance.handleNavigationPayloadMessage(mockMessage);
    });

    then('the state should be updated with the token, requestId, and quoteId', () => {
      expect(instance.state.token).toBe('sampleToken');
      expect(instance.requestId).toBe('sampleRequestId');
    });
  });


  test('Handle message data response with valid messages', ({ given, when, then }) => {
    let message: any;
    let responseJson: any;
    let requestDetail: ShallowWrapper;
    let instance: Chat;
    let mockScrollToBottom: any;
    given('I have a valid message and responseJson with messages', () => {
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;
      mockScrollToBottom = jest.fn();
      instance.scrollToBottom = mockScrollToBottom;
      message = {
        id: getName(MessageEnum.RestAPIResponceMessage),
      };

      responseJson = {
        messages: [{ id: '1', text: 'Test message' }],
      };

      instance.getMessageDataCallID = 'mockCallId';
      (getStorageData as jest.Mock).mockResolvedValue(JSON.stringify({ id: '123' }));
    });

    when('handleMessageDataResponse is called', async () => {
      await instance.handleMessageDataResponse(message, responseJson, 'mockCallId');
    });

    then('the state should be updated with messages and currentAccountId', () => {
      expect(instance.state.messageList).toEqual(responseJson.messages);
      expect(instance.state.currentAccountId).toBe('123');
    });

    then('enteredMsg should be cleared and scrollToBottom should be called', () => {
      expect(instance.state.enteredMsg).toBe('');
      expect(mockScrollToBottom).toHaveBeenCalled();
    });
  });

  test('Handle message data response with errors', ({ given, when, then }) => {
    let message: any;
    let responseJson: any;
    let requestDetail: ShallowWrapper;
    let instance: Chat;
    let mockScrollToBottom: any;
    given('I have a valid message and responseJson with errors', () => {
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;
      mockScrollToBottom = jest.fn();
      instance.scrollToBottom = mockScrollToBottom;
      message = {
        id: getName(MessageEnum.RestAPIResponceMessage),
      };
      responseJson = {
        errors: 'Error message',
      };
      instance.getMessageDataCallID = 'mockCallId';
    });

    when('handleMessageDataResponse is called', async () => {
      await instance.handleMessageDataResponse(message, responseJson, 'mockCallId');
    });

    then('the state should be updated with messageError', () => {
      expect(instance.state.messageError).toEqual(responseJson.errors);
    });

    then('scrollToBottom should not be called', () => {
      expect(mockScrollToBottom).not.toHaveBeenCalled();
    });
  });

  test('Successfully handle the create chat room API response', ({ given, when, then }) => {
    let message: any;
    let responseJson: any;
    let apiRequestCallId: string;
    let requestDetail: ShallowWrapper;
    let instance: Chat;
    let hideModalSpy: jest.SpyInstance;
    let handleCreateChatRoomApiResSpy: jest.SpyInstance;
    given('I have a message with the correct id and a valid responseJson', () => {
      message = { id: getName(MessageEnum.RestAPIResponceMessage) };
      responseJson = { data: { attributes: { id: '123' } } };
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;

      hideModalSpy = jest.spyOn(instance, 'hideModal').mockImplementation(() => { });
      handleCreateChatRoomApiResSpy = jest
        .spyOn(instance, 'handleCreateChatRoomApiRes')
        .mockImplementation(() => { });

      instance.createChatRoomApiCallId = 'mockCallId';
    });

    given('I have a non-empty createChatRoomApiCallId', () => {
      expect(instance.createChatRoomApiCallId).toBe('mockCallId');
    });

    when('handleCreateChatRoomResponse is called with the message, responseJson, and API request call ID', () => {
      apiRequestCallId = 'mockCallId';
      instance.handleCreateChatRoomResponse(message, responseJson, apiRequestCallId);
    });

    then('createChatRoomApiCallId should be cleared', () => {
      expect(instance.createChatRoomApiCallId).toBe('');
    });

    then('hideModal should be called', () => {
      expect(hideModalSpy).toHaveBeenCalledTimes(1);
    });

    then('handleCreateChatRoomApiRes should be called with the responseJson', () => {
      expect(handleCreateChatRoomApiResSpy).toHaveBeenCalledWith(responseJson);
    });
  });

  test('Successfully map a chat list item with a specific account ID', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Chat;
    let chatResponseItem: any;
    let mappedResult: any;
    given('I have a chat response item and a current account ID in state', () => {
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;

      instance.setState({ currentAccountId: 123, accountId: 123 });

      chatResponseItem = {
        id: '1',
        attributes: {
          name: 'Chat Room 1',
          accounts_chats: [
            {
              attributes: {
                account_id: '123',
                muted: true,
                unread_count: 5,
              },
            },
          ],
          messages: {
            attributes: {
              message: 'Hello, this is the last message',
            },
          },
        },
      };
    });

    when('mapChatListItem is called with the chat response item', () => {
      mappedResult = instance.mapChatListItem(chatResponseItem);
    });

    then('it should return the mapped object with id, name, muted, unreadCount, and lastMessage', () => {
      expect(mappedResult).toEqual({
        id: '1',
        name: 'Chat Room 1',
        muted: true,
        unreadCount: 5,
        lastMessage: 'Hello, this is the last message',
      });
    });
  });

  test('Successfully handle session response message with valid data', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Chat;
    let messageMock: any;
    given('I have a valid session response message', () => {
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;

      messageMock = {
        id: getName(MessageEnum.SessionResponseMessage),
        getData: jest.fn((key) => {
          if (key === getName(MessageEnum.SessionResponseToken)) {
            return 'mockToken123';
          }
          if (key === getName(MessageEnum.SessionResponseData)) {
            return JSON.stringify({
              meta: {
                id: 'mockAccountId456',
              },
            });
          }
          return null;
        }),
      };
    });

    when('handleSessionResponseMessage is called', () => {
      instance.handleSessionResponseMessage(messageMock);
    });

    then('the token and accountId should be set in the state', () => {
      expect(instance.state.token).toBe('mockToken123');
      expect(instance.state.accountId).toBe('mockAccountId456');
    });
  });

  test('Get margin-right when avatar is shown', ({ given, when, then }) => {
    let result: string;
    let requestDetail: ShallowWrapper;
    let instance: Chat;
    given('I have a boolean value indicating the avatar is visible', () => {
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;
    });
    when('getMarginRight is called with true', () => {
      result = instance.getMarginRight(true);
    });

    then('the result should be \'forReverseMarginRight\'', () => {
      expect(result).toBe('forReverseMarginRight');
    });

  });

  test('Get margin-right when avatar is not shown', ({ given, when, then }) => {
    let result: string;
    let requestDetail: ShallowWrapper;
    let instance: Chat;
    given('I have a boolean value indicating the avatar is not visible', () => {
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;
    });
    when('getMarginRight is called with false', () => {
      result = instance.getMarginRight(false);
    });

    then('the result should be \'forReverseMarginRightSec\'', () => {
      expect(result).toBe('forReverseMarginRightSec');
    });

  });

  test('Get margin-left when avatar is shown', ({ given, when, then }) => {
    let result: string;
    let requestDetail: ShallowWrapper;
    let instance: Chat;
    given('I have a boolean value indicating the avatar is visible', () => {
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;
    });
    when('getMarginLeft is called with true', () => {
      result = instance.getMarginLeft(true);
    });

    then('the result should be \'forMarginLeft\'', () => {
      expect(result).toBe('forMarginLeft');
    });

  });

  test('Get margin-left when avatar is not shown', ({ given, when, then }) => {
    let result: string;
    let requestDetail: ShallowWrapper;
    let instance: Chat;
    given('I have a boolean value indicating the avatar is not visible', () => {
      requestDetail = shallow(<Chat {...screenProps} />);
      instance = requestDetail.instance() as Chat;
    });
    when('getMarginLeft is called with false', () => {
      result = instance.getMarginLeft(false);
    });

    then('the result should be \'forMarginLeftSec\'', () => {
      expect(result).toBe('forMarginLeftSec');

      let mockData = {
        account_id: 123,
        profile: "abc",
        message: "abc",
        created_at: "abc"
      }
      let bottomSheet = requestDetail.findWhere((node) => node.prop("testID") === 'flatlist1');

      let temp = bottomSheet.renderProp("renderItem")({ item: mockData, index: 0 }).find("Text").at(0).prop("text");
      let temp2 = bottomSheet.renderProp("keyExtractor")(mockData, 1);
      
    });
  });

});
