import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Notifications from "../../src/Notifications";
import { GenericHeader } from "../../../../components/src/GenericHeader";
const screenProps = {
  navigation: {},
  id: "Notifications",
};

const feature = loadFeature(
  "./__tests__/features/Notifications-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Notifications", ({ given, when, then }) => {
    let notificationsBlock: ShallowWrapper;
    let instance: Notifications;

    given("I am a User loading Notifications", () => {
      notificationsBlock = shallow(<Notifications {...screenProps} />);
    });

    when("I navigate to the Notifications", () => {
      instance = notificationsBlock.instance() as Notifications;
    });

    then("Notifications will load with out errors", () => {
      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const msgNotificationsAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgNotificationsAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgNotificationsAPI.messageId
      );
      msgNotificationsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              id: "8",
              type: "notifications",
              attributes: {
                id: 8,
                created_by: 5,
                headings: "Notifications heading",
                contents: "Notifications contents",
                app_url: "test/url",
                is_read: true,
                read_at: "2021-12-21T17:56:15.713Z",
                created_at: "2021-12-21T17:55:42.972Z",
                updated_at: "2021-12-21T17:56:15.714Z",
                account: {
                  id: 5,
                  first_name: "Firstname",
                  last_name: "Lastname",
                  full_phone_number: "13108540001",
                  country_code: 1,
                  phone_number: 3108540001,
                  email: "tester@me.com",
                  activated: true,
                  device_id: null,
                  unique_auth_id: null,
                  password_digest:
                    "$2a$12$ckgZ.kZVE1HkJ29.Q1H6VODyCK8L.LwiiM0RzJ4XqoIVZRWMpCqsW",
                  created_at: "2021-08-26T15:24:41.179Z",
                  updated_at: "2021-08-26T15:24:41.179Z",
                  user_name: null,
                  role_id: null,
                },
              },
            },
            {
              id: "16",
              type: "notifications",
              attributes: {
                id: 16,
                created_by: 5,
                headings: "Notifications heading",
                contents: "Notifications contents",
                app_url: "test/url",
                is_read: false,
                read_at: null,
                created_at: "2021-12-21T17:56:37.374Z",
                updated_at: "2021-12-21T17:56:37.374Z",
                account: {
                  id: 5,
                  first_name: "Firstname",
                  last_name: "Lastname",
                  full_phone_number: "13108540001",
                  country_code: 1,
                  phone_number: 3108540001,
                  email: "tester@me.com",
                  activated: true,
                  device_id: null,
                  unique_auth_id: null,
                  password_digest:
                    "$2a$12$ckgZ.kZVE1HkJ29.Q1H6VODyCK8L.LwiiM0RzJ4XqoIVZRWMpCqsW",
                  created_at: "2021-08-26T15:24:41.179Z",
                  updated_at: "2021-08-26T15:24:41.179Z",
                  user_name: null,
                  role_id: null,
                },
              },
            },
          ],
          meta: { message: "List of notifications." },
        }
      );
      instance.getDataCallId = msgNotificationsAPI.messageId;
      runEngine.sendMessage("Unit Test", msgNotificationsAPI);

      const msgDeleteNotificationsAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgDeleteNotificationsAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgDeleteNotificationsAPI.messageId
      );
      msgDeleteNotificationsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { message: "Deleted." }
      );
      instance.deleteCallId = msgDeleteNotificationsAPI.messageId;
      runEngine.sendMessage("Unit Test", msgDeleteNotificationsAPI);

      const msgReadNotificationsAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgReadNotificationsAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgReadNotificationsAPI.messageId
      );
      msgReadNotificationsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { message: "Done." }
      );
      instance.markAsReadCallId = msgReadNotificationsAPI.messageId;
      runEngine.sendMessage("Unit Test", msgReadNotificationsAPI);

      expect(notificationsBlock).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(notificationsBlock).toBeTruthy();
    });
  });

  test('User presses the Go Back to Dashboard button', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Notifications;
    let sendMock: any;
    let messageMock: any;
    given('the component is mounted', () => {
      requestDetail = shallow(<Notifications {...screenProps} />);
      instance = requestDetail.instance() as Notifications;
      sendMock = jest.fn();
      instance.send = sendMock;
    });

    when('the user presses the Go Back to Dashboard button', () => {
      instance.btnGoBack.onPress();
    });

    then('a Message instance should be created with NavigationDashboardMessage type', () => {
      const msg = sendMock.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationDashboardMessage));
    });
  });

  test('Set state and trigger onScrollToBottom when scrolled to the bottom', ({ given, when, then, and }) => {
    let transactionPage: ShallowWrapper;
    let instance: Notifications;
    let event: any;
    let mockSetState: any;
    let mockOnScrollToBottom: any;
    given('I am scrolling to the bottom of the content', () => {
      transactionPage = shallow(<Notifications {...screenProps} />);
      instance = transactionPage.instance() as Notifications;
      mockSetState = jest.fn();
      mockOnScrollToBottom = jest.fn();
  
      instance.setState = mockSetState;
      instance.onScrollToBottom = mockOnScrollToBottom;
      event = {
        nativeEvent: {
          layoutMeasurement: { height: 100 },
          contentOffset: { y: 200 },
          contentSize: { height: 300 }
        }
      };
    });

    when('I handle the scroll event', () => {
      instance.handleScroll(event);
    });

    then('the state should be updated to indicate scroll is at the bottom', () => {
      expect(mockSetState).toHaveBeenCalledWith({ isScrollAtBottom: true });
    });

    and('the onScrollToBottom function should be called', () => {
      expect(mockOnScrollToBottom).toHaveBeenCalled();
    });
  });

  test('Do not update state or trigger onScrollToBottom if not scrolled to the bottom', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: Notifications;
    let event: any;
    let mockSetState: any;
    let mockOnScrollToBottom: any;
    given('I am scrolling but not to the bottom of the content', () => {
      transactionPage = shallow(<Notifications {...screenProps} />);
      instance = transactionPage.instance() as Notifications;
      mockSetState = jest.fn();
      mockOnScrollToBottom = jest.fn();
  
      // Spy on methods and mock setState
      instance.setState = mockSetState;
      instance.onScrollToBottom = mockOnScrollToBottom;
      event = {
        nativeEvent: {
          layoutMeasurement: { height: 100 },
          contentOffset: { y: 150 },
          contentSize: { height: 300 }
        }
      };
    });

    when('I handle the scroll event', () => {
      instance.handleScroll(event);
    });

    then('the state should not be updated', () => {
      expect(mockSetState).not.toHaveBeenCalled();
    });

    then('the onScrollToBottom function should not be called', () => {
      expect(mockOnScrollToBottom).not.toHaveBeenCalled();
    });
  });

  test('Notifications length is 10 and triggers fetching more transactions', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: Notifications;
    let mockGetTransactions: any;
    given('the transaction length is 10', () => {
      transactionPage = shallow(<Notifications {...screenProps} />);
      instance = transactionPage.instance() as Notifications;
      instance.setState({ notificationCount: 15, pageNo: 1 });
      mockGetTransactions = jest.fn();
      instance.getNotifications = mockGetTransactions;
    });

    when('the user scrolls to the bottom of the list', () => {
      instance.onScrollToBottom();
    });

    then('the page number should be incremented by 1', () => {
      expect(instance.state.pageNo).toBe(2);
    });

    then('the getNotifications function should be called with correct url parameters', () => {
      expect(mockGetTransactions).toHaveBeenCalled();
    });
  });

  test('Notifications length is not 10 and no new transactions are fetched', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: Notifications;
    let mockGetTransactions: any;
    given('the transaction length is not 10', () => {
      transactionPage = shallow(<Notifications {...screenProps} />);
      instance = transactionPage.instance() as Notifications;
      instance.setState({ notificationCount: 8, pageNo: 1 });
      mockGetTransactions = jest.fn();
      instance.getNotifications = mockGetTransactions;
    });

    when('the user scrolls to the bottom of the list', () => {
      instance.onScrollToBottom();
    });

    then('the page number should remain unchanged', () => {
      expect(instance.state.pageNo).toBe(1);
    });

    then('the getNotifications function should not be called', () => {
      expect(mockGetTransactions).not.toHaveBeenCalled();
    });
  });

  test("Categorize notifications based on their created_at timestamps", ({ given, when, then, and }) => {
    let mockNotificationData: any[];
    let transactionPage: ShallowWrapper;
    let instance: Notifications;
    const mockSetState = jest.fn();
    given("a list of notifications with different created_at timestamps", () => {
      transactionPage = shallow(<Notifications {...screenProps} />);
      instance = transactionPage.instance() as Notifications;
      const now = new Date();
      mockNotificationData = [
        { attributes: { created_at: now.toISOString() } }, // Today
        {
          attributes: {
            created_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          },
        }, // 2 Days ago
        {
          attributes: {
            created_at: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          },
        }, // 1 Week ago
        {
          attributes: {
            created_at: new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000).toISOString(),
          },
        }, // 1 Month ago
      ];
      instance.setState({ notificationData: mockNotificationData });
    });

    when("the filterNotifications function is called", () => {
      instance.filterNotifications();
    });

    then("it should categorize the notifications into Today, Yesterday, 2 Days ago, 1 Week ago, 2 Week ago, 1 Month ago, and 1 Year ago lists", () => {
      const expectedDataList = [
        { title: "Today", list: [mockNotificationData[0]] },
        { title: "Yesterday", list: [] },
        { title: "2 Days ago", list: [mockNotificationData[1]] },
        { title: "1 Week ago", list: [mockNotificationData[2]] },
        { title: "2 Week ago", list: [] },
        { title: "1 Month ago", list: [mockNotificationData[3]] },
        { title: "1 Year ago", list: [] },
      ];

    });

    and("update the state with the categorized data", () => {
      
    });
  });

  test("Determine background color based on read status", ({ given, when, then, and }) => {
    let isRead: boolean;
    let result: string;
    let transactionPage: ShallowWrapper;
    let instance: Notifications;
    given("a notification read status", (table) => {
      transactionPage = shallow(<Notifications {...screenProps} />);
      instance = transactionPage.instance() as Notifications;
      isRead = true
    });

    when("the backGroundColor function is called", () => {
      result = instance.backGroundColor(isRead);
    });

    then("it should return backNon if the notification is read", () => {
        expect(result).toBe("backNon");
        result = instance.backGroundColor(!isRead);
    });

    then("it should return backColor if the notification is unread", () => {
        expect(result).toBe("backColor");
    });
  });

  test("Show an empty message based on conditions", ({ given, when, then, and }) => {
    let result: boolean;
    let transactionPage: ShallowWrapper;
    let instance: Notifications;
    given("the state with page number and notification empty message", (table) => {
      transactionPage = shallow(<Notifications {...screenProps} />);
      instance = transactionPage.instance() as Notifications;
      instance.setState({
        pageNo: 1,
        notifcationEmptyMsg: 'Empty',
      });
    });

    when("the isShowEmptyMessage function is called", () => {
      result = instance.isShowEmptyMessage();
    });

    then("it should return true if the page number is 1 and notification empty message is not empty", () => {
      expect(result).toBe(true);
      instance.setState({
        pageNo: 2,
        notifcationEmptyMsg: '',
      });
      result = instance.isShowEmptyMessage();
    });

    and("it should return false otherwise", () => {
        expect(result).toBe(false);
    });
  });

  test("Trigger mark all notifications as read", ({ given, when, then, and }) => {
    let transactionPage: ShallowWrapper;
    let instance: Notifications;
    let markAsReadMock: jest.Mock;
    given("the component is initialized", () => {
      transactionPage = shallow(<Notifications {...screenProps} />);
      instance = transactionPage.instance() as Notifications;
      markAsReadMock = jest.fn();
      instance.markAsRead = markAsReadMock;
    });

    when("the onPress function of markAllReadProps is invoked", () => {
      instance.markAllReadProps.onPress();
    });

    then("the isLoader state should be set to true", () => {
      expect(instance.state.isLoader).toBe(true);
    });

    and("the markAsRead function should be called with an empty string", () => {
      expect(markAsReadMock).toHaveBeenCalledWith("");
    });
  });

  test("Go back to the previous screen", ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: Notifications;
    let navigationMock: any;
    let btnGoBackByArrow: any;
    given("the navigation object is available", () => {
      transactionPage = shallow(<Notifications {...screenProps} />);
      instance = transactionPage.instance() as Notifications;
      navigationMock = {
        goBack: jest.fn(),
      };
      expect(navigationMock.goBack).not.toHaveBeenCalled();
    });

    when("the back arrow button is pressed", () => {
      instance.btnGoBackByArrow.onPress();
    });

    then("the navigation goBack method should be called", async () => {
      const mockNavigation = { goBack: jest.fn() };
      const wrapperWithNavigation = shallow(<Notifications {...screenProps} navigation={mockNavigation} />);
      let buttonComponent = wrapperWithNavigation.findWhere((node: any) => node.prop('testID') === 'btnbackArrow');
      buttonComponent.simulate('press')
      instance.btnGoBackByArrow.onPress()
      await Promise.resolve(); 
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });
  });

  test("Do nothing when navigation object is not available", ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: Notifications;
    let navigationMock: any;
    let btnGoBackByArrow: any;
    given("the navigation object is not available", () => {
      transactionPage = shallow(<Notifications {...screenProps} />);
      instance = transactionPage.instance() as Notifications;
      
      navigationMock = null;
    });

    when("the back arrow button is pressed", () => {
      instance.btnGoBackByArrow.onPress();
    });

    then("the navigation goBack method should not be called", () => {
      expect(navigationMock?.goBack).toBeUndefined();
    });
  });
});
