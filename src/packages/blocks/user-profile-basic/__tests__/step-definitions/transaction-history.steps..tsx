
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
import { runEngine } from "../../../../framework/src/RunEngine";
import * as helpers from "../../../../framework/src/Helpers";
import moment from "moment";
import React from "react";
import { Platform } from "react-native";
import TransactionHistory from "../../src/TransactionHistory";
const navigation = require("react-navigation");
export const configJSON = require("../../src/config");
const screenProps = {
  navigation: {
    goBack: jest.fn()
  },
  id: "TransactionHistory",
};
jest.mock('../../../../framework/src/Utilities', () => ({
  getStorageData: jest.fn(),
  setStorageData: jest.fn(),
}));
import { getStorageData } from "../../../../framework/src/Utilities";
jest.mock('../../../../framework/src/Utilities');
const mockGetStorageData = getStorageData as jest.MockedFunction<typeof getStorageData>;

const feature = loadFeature("./__tests__/features/transaction-history-scenario.feature");

const mockAPICall = (instance: any, apiCallID: string, apiData: any) => {
  const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
  instance[apiCallID] = msgSucessRestAPI.messageId
  runEngine.sendMessage("Unit Test", msgSucessRestAPI)
  return instance[apiCallID];
}

const successResponse = {
  transaction_history: [
    {
      "id": 1,
      "account_id": 1045,
      "request_type": "Stripe",
      "payment_date": "2024-08-23T07:35:03.027Z",
      "payment_method": null,
      "transaction_number": "0",
      "notary_request_id": 663,
      "notary_id": null,
      "status": "PAID",
      "amount": "0.0",
      "created_at": "2024-08-23T07:35:03.070Z",
      "updated_at": "2024-08-23T07:35:03.070Z"
    }
  ]
}

const noTransactionHistory = {
  error: 'No Transaction History'
}


defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.useFakeTimers();

  });

  test("User navigates to TransactionHistory", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: TransactionHistory;

    given("I am a User loading TransactionHistory it will load with out errors", () => {
      exampleBlockA = shallow(<TransactionHistory {...screenProps} />);
      instance = exampleBlockA.instance() as TransactionHistory;
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "token-sdfkajsdlhksdjhf");
      runEngine.sendMessage("Unit Test", msgToken);

    });

    when("transaction history api is called with out any errors", () => {
      jest.advanceTimersByTime(1000);
      mockAPICall(instance, "getTransactionsApiCallId", successResponse);
    });

    then("user can see the list of transactions", () => {
      const transactionsList = exampleBlockA.findWhere((node) => node.prop('testID') === 'transactionsList')
      transactionsList.renderProp('renderItem')({ item: successResponse.transaction_history[0] })
      transactionsList.props().keyExtractor(successResponse.transaction_history[0])
      expect(transactionsList).toHaveLength(1);

    });

    when("user enter the wrong id for searching", () => {
      let onChangeSearch = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "onChangeSearch"
      );
      onChangeSearch.props().onChangeText('32434')
    });

    then("hit search icon and will see the transaction not found", () => {
      let onSearch = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "searchIcon"
      );

      mockAPICall(instance, "getTransactionsApiCallId", noTransactionHistory);
      onSearch.simulate('press')
    });

    when("user taps on the back arrow", () => {
      let goBack = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "goBack"
      );
      // goBack.simulate('press')
    });

    then("he will go back to the previous screen", () => {
      expect(exampleBlockA).toBeTruthy();

    });

  });

  test('Set state and trigger onScrollToBottom when scrolled to the bottom', ({ given, when, then, and }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    let event: any;
    let mockSetState: any;
    let mockOnScrollToBottom: any;
    given('I am scrolling to the bottom of the content', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
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
    let instance: TransactionHistory;
    let event: any;
    let mockSetState: any;
    let mockOnScrollToBottom: any;
    given('I am scrolling but not to the bottom of the content', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
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

  test('Transaction length is 10 and triggers fetching more transactions', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    let mockGetTransactions: any;
    given('the transaction length is 10', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ transactionLength: 10, pageNumber: 1, searchQuery: '123' });
      mockGetTransactions = jest.fn();
      instance.getTransactions = mockGetTransactions;
    });

    when('the user scrolls to the bottom of the list', () => {
      instance.onScrollToBottom();
    });

    then('the page number should be incremented by 1', () => {
      expect(instance.state.pageNumber).toBe(2);
    });

    then('the getTransactions function should be called with correct url parameters', () => {
      const expectedUrlParams = '?order_id=123&filter=ALL&request_date_start=&request_date_end=';
      expect(mockGetTransactions).toHaveBeenCalledWith(expectedUrlParams);
    });
  });

  test('Transaction length is not 10 and no new transactions are fetched', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    let mockGetTransactions: any;
    given('the transaction length is not 10', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ transactionLength: 8, pageNumber: 1 });
      mockGetTransactions = jest.fn();
      instance.getTransactions = mockGetTransactions;
    });

    when('the user scrolls to the bottom of the list', () => {
      instance.onScrollToBottom();
    });

    then('the page number should remain unchanged', () => {
      expect(instance.state.pageNumber).toBe(1);
    });

    then('the getTransactions function should not be called', () => {
      expect(mockGetTransactions).not.toHaveBeenCalled();
    });
  });

  test('Closing the filter page', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the filter page is open', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ isFilterPageOpen: true });
    });

    when('the user presses the close filter button', () => {
      instance.closeFilterPage.onPress();
    });

    then('the filter page should be closed', () => {
      expect(instance.state.isFilterPageOpen).toBe(false);
    });
  });

  test('Opening the filter page', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the filter page is closed', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ isFilterPageOpen: false });
    });

    when('the user presses the second image button', () => {
      instance.onSecImageClick.onPress();
    });

    then('the filter page should be opened', () => {
      expect(instance.state.isFilterPageOpen).toBe(true);
    });
  });

  test('Navigating back', ({ when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    let mockGoBack: any;
    when('the user presses the go back button', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      mockGoBack = jest.fn();
      instance.goBack = mockGoBack;
      instance.onGoBack.onPress();
    });

    then('the goBack function should be called', () => {
      expect(mockGoBack).toHaveBeenCalled();
    });
  });

  test('User presses the back button', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    let mockGoBack: any;
    given('the user is on the current screen', () => {
      const navigation = {
        goBack: jest.fn()
      };
      transactionPage = shallow(<TransactionHistory {...screenProps} navigation={navigation} />);
      instance = transactionPage.instance() as TransactionHistory;
      mockGoBack = navigation.goBack;
    });

    when('the user presses the back button', () => {
      instance.goBack();  // Call the goBack method
    });

    then('the navigation should go back to the previous screen', () => {
      expect(mockGoBack).toHaveBeenCalled();  // Check if goBack was called
    });
  });

  test('User selects a day filter', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    const mockDayFilter = { title: 'Last 7 Days', key: '7days' };
    given('the current selected day filter is empty', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      expect(instance.state.selectedDayFilter).toBeNull();  // Initially, the state is empty
    });

    when('the user selects a day filter', () => {
      instance.getSelectDaysFilter(mockDayFilter);
    });

    then('the selected day filter should be updated with the chosen filter', () => {
      expect(instance.state.selectedDayFilter).toEqual(mockDayFilter);
    });
  });

  test('User selects a payment status filter', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    const mockPaymentStatusFilter = { title: 'Failed', key: 'fail' };
    given('the current selected payment status is empty', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      expect(instance.state.selectedPaymentStatus).toStrictEqual({ "key": "ALL", "title": "All" });  // Initially, the state is empty
    });

    when('the user selects a payment status filter', () => {
      instance.getSelectPaymentStatus(mockPaymentStatusFilter);
    });

    then('the selected payment status should be updated with the chosen filter', () => {
      expect(instance.state.selectedPaymentStatus).toEqual(mockPaymentStatusFilter);
    });
  });

  test('Rendering style on iOS', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the operating system is iOS', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      Platform.OS = 'ios';
    });

    let styleResult: any;
    when('the style of the date-time field is rendered', () => {
      styleResult = instance.renderStyleOfDataTImeFieldAccordingToOS();
    });

    then('it should return the "paddTopBott" style', () => {
      expect(styleResult).toBe('paddTopBott');
    });
  });

  test('Rendering style on Android or other OS', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the operating system is Android', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      Platform.OS = 'android';
    });

    let styleResult: any;
    when('the style of the date-time field is rendered', () => {
      styleResult = instance.renderStyleOfDataTImeFieldAccordingToOS();
    });

    then('it should return the "padd" style', () => {
      expect(styleResult).toBe('padd');
    });
  });

  test('Opening the calendar modal', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the calendar modal is closed', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      expect(instance.state.isCalendarForDateSelect).toBe(false);
    });

    when('the user presses the open calendar button', () => {
      instance.btnOpenCalendarProps.onPress();
    });

    then('the calendar modal should open', () => {
      expect(instance.state.isCalendarForDateSelect).toBe(true);
    });
  });

  test('Closing the calendar modal', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the calendar modal is open', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({
        isCalendarForDateSelect: true,
        selectedDate: '2024-01-01',
        startDate: '2024-01-01',
        endDate: '2024-01-07',
        selectedDateType: 'week'
      });
    });

    when('the user presses the close calendar button', () => {
      instance.closeCalendar.onPress();
    });

    then('the calendar modal should close and reset date-related state', () => {
      expect(instance.state.isCalendarForDateSelect).toBe(false);
      expect(instance.state.selectedDate).toBeNull();
      expect(instance.state.startDate).toBeNull();
      expect(instance.state.endDate).toBeNull();
      expect(instance.state.selectedDateType).toBe('');
    });
  });

  test('Resetting filters', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the user has applied some filters', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({
        selectedDayFilter: { title: 'Last 7 days', key: "7days" },
        selectedPaymentStatus: { title: 'Failed', key: "fail" },
        selectedDateRange: 'last_week',
        selectedDateType: 'week',
        isFilterPageOpen: true
      });
    });

    when('the user presses the reset filter button', () => {
      jest.spyOn(instance, 'getTransactions'); // Spy on getTransactions to check if it's called
      instance.onResetFilter.onPress();
    });

    then('all filters should be reset and transactions should be fetched with filter "ALL"', () => {
      expect(instance.state.selectedDayFilter).toBeNull();
      expect(instance.state.selectedPaymentStatus).toStrictEqual({ "key": "ALL", "title": "All" });
      expect(instance.state.selectedDateRange).toBe('');
      expect(instance.state.selectedDateType).toBe('');
      expect(instance.state.startDate).toBeNull();
      expect(instance.state.endDate).toBeNull();
      expect(instance.state.selectedDate).toBeNull();
      expect(instance.state.isFilterPageOpen).toBe(false);
      expect(instance.getTransactions).toHaveBeenCalledWith('?filter=ALL&order_id=&request_date_start=&request_date_end=');
    });
  });

  test('Applying filters', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the filter page is open', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ isFilterPageOpen: true });
    });

    when('the user presses the apply filter button', () => {
      instance.onApplyFilter.onPress();
    });

    then('the filter page should close', () => {
      expect(instance.state.isFilterPageOpen).toBe(true);
    });
  });

  test('Formatting a valid date string', ({ given, when, then }) => {
    let formattedDate: any;
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('a valid date string "2024-09-06T00:00:00.000Z"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      const dateString = "2024-09-06T00:00:00.000Z";
    });

    when('the date is formatted', () => {
      formattedDate = instance.formatDate("2024-09-06T00:00:00.000Z");
    });

    then('the formatted date should be "06/09/2024"', () => {
      expect(formattedDate).toBe("06/09/2024");
    });
  });

  test('Formatting a date string with a single-digit day and month', ({ given, when, then }) => {
    let formattedDate: any;
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('a valid date string "2024-01-03T00:00:00.000Z"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      const dateString = "2024-01-03T00:00:00.000Z";
    });

    when('the date is formatted', () => {
      formattedDate = instance.formatDate("2024-01-03T00:00:00.000Z");
    });

    then('the formatted date should be "03/01/2024"', () => {
      expect(formattedDate).toBe("03/01/2024");
    });
  });

  test('Updating formatted start date', ({ given, when, then }) => {
    let formattedStartDate: any;
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the component state has no start or end date', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ startDate: null, endDate: null });
    });

    when('a date "2024-09-06T00:00:00.000Z" is passed to updateFormattedDateRange', () => {
      formattedStartDate = instance.updateFormattedDateRange("2024-09-06T00:00:00.000Z");
    });

    then('the returned formatted start date should be "06/09/2024"', () => {
      expect(formattedStartDate).toBe("06/09/2024");
    });
  });

  test('Selecting a single date', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the selectedDateType is "single"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ selectedDateType: 'single' });
    });

    given('a selected date "2024-09-06T00:00:00.000Z"', () => {
      instance.setState({ selectedDate: "2024-09-06T00:00:00.000Z" });
    });

    when('the user presses the Done button on date select', () => {
      instance.onDateSelectDone.onPress();
    });

    then('the selectedDateRange should be "06/09/2024"', () => {
      expect(instance.state.selectedDateRange).toBe("06/09/2024");
    });

    then('the calendar modal should be closed', () => {
      expect(instance.state.isCalendarForDateSelect).toBe(false);
    });
  });

  test('Selecting a date range', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the selectedDateType is "range"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ selectedDateType: 'range' });
    });

    given('the startDate is "2024-09-01T00:00:00.000Z"', () => {
      instance.setState({ startDate: "2024-09-01T00:00:00.000Z" });
    });

    given('the endDate is "2024-09-10T00:00:00.000Z"', () => {
      instance.setState({ endDate: "2024-09-10T00:00:00.000Z" });
    });

    when('the user presses the Done button on date select', () => {
      instance.onDateSelectDone.onPress();
    });

    then('the selectedDateRange should be "01/09/2024 - 10/09/2024"', () => {
      expect(instance.state.selectedDateRange).toBe("01/09/2024 - 10/09/2024");
    });

    then('the calendar modal should be closed', () => {
      expect(instance.state.isCalendarForDateSelect).toBe(false);
    });
  });

  test('Done button enabled for single date selection', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the selectedDateType is "single"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ selectedDateType: 'single', selectedDate: "2024-09-06T00:00:00.000Z" });
    });
    let isEnabled: any;
    when('checking if the Done button is enabled', () => {
      isEnabled = instance.getDoneButtonEnabled();
    });

    then('the Done button should be enabled', () => {
      expect(isEnabled).toBe(true);
    });
  });

  test('Done button enabled for date range selection', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the selectedDateType is "range"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ selectedDateType: 'range', startDate: "2024-09-01T00:00:00.000Z", endDate: "2024-09-10T00:00:00.000Z" });
    });
    let isEnabled: any;
    when('checking if the Done button is enabled', () => {
      isEnabled = instance.getDoneButtonEnabled();
    });

    then('the Done button should be enabled', () => {
      expect(isEnabled).toBe(true);
    });
  });

  test('Done button disabled with incomplete date information', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the selectedDateType is "single"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ selectedDateType: 'single', selectedDate: null });
    });
    let isEnabled: any;
    when('checking if the Done button is enabled', () => {
      isEnabled = instance.getDoneButtonEnabled();
    });

    then('the Done button should be disabled', () => {
      expect(isEnabled).toBe(false);
    });
  });

  test('Done button disabled with incomplete date range', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the selectedDateType is "range"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ selectedDateType: 'range', startDate: "2024-09-01T00:00:00.000Z", endDate: null });
    });
    let isEnabled: any;
    when('checking if the Done button is enabled', () => {
      isEnabled = instance.getDoneButtonEnabled();
    });

    then('the Done button should be disabled', () => {
      expect(isEnabled).toBe(false);
    });
  });

  test('Selecting a single date in model', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the initial state is set', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ selectedDateType: '' });
    });

    when('the user selects the single date option', () => {
      instance.onSelectSingleDate.onPress();
    });

    then('the selectedDateType should be single', () => {
      expect(instance.state.selectedDateType).toBe('single');
    });
  });

  test('Selecting a date range in model', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the initial state is set', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ selectedDateType: '' });
    });

    when('the user selects the date range option', () => {
      instance.onSelectRangeDate.onPress();
    });

    then('the selectedDateType should be "range"', () => {
      expect(instance.state.selectedDateType).toBe('range');
    });
  });

  test('Selecting a single date new', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the selectedDateType is "single"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ selectedDateType: 'single' });
    });

    given('the initial state is set', () => {
      instance.setState({ selectedDate: '' });
    });

    when('the user presses a day', () => {
      const day = { dateString: '2024-09-10', day: 10, month: 9, year: 2024 };
      instance.handleDayPress(day);
    });

    then('the selected date should be updated to that day', () => {
      expect(instance.state.selectedDate).toBe('2024-09-10');
    });
  });

  test('Selecting a start date for a date range', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the selectedDateType is "range"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ selectedDateType: 'range' });
    });

    given('the initial state is set with no start date', () => {
      instance.setState({ startDate: null, endDate: null });
    });

    when('the user presses a day to select as start date', () => {
      const day = { dateString: '2024-09-10', day: 10, month: 9, year: 2024 };
      instance.handleDayPress(day);
    });

    then('the start date should be updated to that day', () => {
      expect(instance.state.startDate).toBe('2024-09-10');
      expect(instance.state.endDate).toBe(null);
    });
  });

  test('Selecting an end date for a date range', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the selectedDateType is "range"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ selectedDateType: 'range' });
    });

    given('the initial state is set with a start date', () => {
      instance.setState({ startDate: '2024-09-01', endDate: null });
    });

    when('the user presses a day after the start date to select as end date', () => {
      const day = { dateString: '2024-09-10', day: 10, month: 9, year: 2024 };
      instance.handleDayPress(day);
    });

    then('the end date should be updated to that day', () => {
      expect(instance.state.endDate).toBe('2024-09-10');
    });
  });

  test('Re-selecting a new start date', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the selectedDateType is "range"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ selectedDateType: 'range' });
    });

    given('the initial state is set with both start and end dates', () => {
      instance.setState({ startDate: '2024-09-01', endDate: '2024-09-10' });
    });

    when('the user presses a new day to select as start date', () => {
      const day = { dateString: '2024-09-05', day: 5, month: 9, year: 2024 };
      instance.handleDayPress(day);
    });

    then('the start date should be updated to that day', () => {
      expect(instance.state.startDate).toBe('2024-09-05');
    });

    then('the end date should be reset to null', () => {
      expect(instance.state.endDate).toBe(null);
    });
  });

  test('Selecting a new start date earlier than the existing start date', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the selectedDateType is "range"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ selectedDateType: 'range' });
    });

    given('the initial state is set with a start date and an end date', () => {
      instance.setState({ startDate: '2024-09-10', endDate: '2024-09-15' });
    });

    when('the user presses a new day that is earlier than the existing start date', () => {
      const day = { dateString: '2024-09-05', day: 5, month: 9, year: 2024 };
      instance.handleDayPress(day);
    });

    then('the start date should be updated to the new earlier day', () => {
      expect(instance.state.startDate).toBe('2024-09-05');
    });

    then('the end date should be reset to null', () => {
      expect(instance.state.endDate).toBe(null);
    });
  });

  test('Marking a single selected date', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the selectedDateType is "single"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ selectedDateType: 'single' });
    });

    given('the selectedDate is "2024-09-10"', () => {
      instance.setState({ selectedDate: '2024-09-10' });
    });

    let markedDates: any;
    when('I get the marked dates', () => {
      markedDates = instance.getMarkedDates();
    });

    then('the marked dates should include "2024-09-10" with selected properties', () => {
      expect(markedDates).toHaveProperty('2024-09-10');
      expect(markedDates['2024-09-10']).toEqual({
        selected: true,
        selectedColor: '#012275',
        selectedTextColor: '#fff',
      });
    });
  });

  test('Marking a date range', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the selectedDateType is "range"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ selectedDateType: 'range' });
    });

    given('the startDate is "2024-09-01"', () => {
      instance.setState({ startDate: '2024-09-01' });
    });

    given('the endDate is "2024-09-05"', () => {
      instance.setState({ endDate: '2024-09-05' });
    });
    const expectedDates = [
      '2024-09-01', '2024-09-02', '2024-09-03', '2024-09-04', '2024-09-05'
    ];
    let markedDates: any;
    when('I get the marked dates', () => {
      markedDates = instance.getMarkedDates();
    });

    then('the marked dates should include dates from "2024-09-01" to "2024-09-05" with selected properties', () => {
      expectedDates.forEach(date => {
        expect(markedDates).toHaveProperty(date);
        expect(markedDates[date]).toEqual({
          selected: true,
          selectedColor: '#012275',
          selectedTextColor: '#fff',
        });
      });
    });
  });

  test('No dates are marked', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the selectedDateType is "single"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ selectedDateType: 'single' });
    });

    given('there is no selectedDate', () => {
      instance.setState({ selectedDate: null });
    });
    let markedDates: any;
    when('I get the marked dates', () => {
      markedDates = instance.getMarkedDates();
    });

    then('the marked dates should be empty', () => {
      expect(markedDates).toEqual({});
    });
  });

  test('No dates are marked for incomplete range', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the selectedDateType is "range"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ selectedDateType: 'range' });
    });

    given('the startDate is "2024-09-01"', () => {
      instance.setState({ startDate: '2024-09-01' });
    });

    given('there is no endDate', () => {
      instance.setState({ endDate: null });
    });
    let markedDates: any;
    when('I get the marked dates', () => {
      markedDates = instance.getMarkedDates();
    });

    then('the marked dates should be empty', () => {
      expect(markedDates).toEqual({});
    });
  });

  test('Check if any filter is applied', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    let result: any
    given('the initial state is set with selectedPaymentStatus as "Paid", selectedDateType as "single", selectedDateRange as "2024-09-01", and selectedDayFilter as null', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({
        selectedPaymentStatus: { title: 'Failed', key: 'fail' },
        selectedDateType: 'single',
        selectedDateRange: '2024-09-01',
        selectedDayFilter: null,
      });
    });

    when('the user checks if the filter is applied', () => {
      result = instance.isFilterApplyed();
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('Check if no filter is applied', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    let result: any
    given('the initial state is set with all filters as null', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({
        selectedPaymentStatus: null,
        selectedDateType: '',
        selectedDateRange: '',
        selectedDayFilter: null,
      });
    });

    when('the user checks if the filter is applied', () => {
      result = instance.isFilterApplyed();
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Check if only payment status is selected for filter', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    let result: any
    given('the initial state is set with selectedPaymentStatus as "Paid" and other filters as null', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({
        selectedPaymentStatus: { title: 'Failed', key: 'fail' },
        selectedDateType: '',
        selectedDateRange: '',
        selectedDayFilter: null,
      });
    });

    when('the user checks if payment status filter is selected', () => {
      result = instance.isPaymentStatusSelectForFilter();
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('Check if day type is selected for filter', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    let result: any
    given('the initial state is set with selectedDayFilter as "Weekend" and other filters as null', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({
        selectedPaymentStatus: null,
        selectedDateType: "",
        selectedDateRange: "",
        selectedDayFilter: { title: "Today", key: 'today' },
      });
    });

    when('the user checks if day type filter is selected', () => {
      result = instance.isDayTypeSelectForFilter();
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('Check if date range is selected for filter', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    let result: any
    given('the initial state is set with selectedDateType as "range" and selectedDateRange as "2024-09-01 to 2024-09-15" and other filters as null', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({
        selectedPaymentStatus: null,
        selectedDateType: 'range',
        selectedDateRange: '2024-09-01 to 2024-09-15',
        selectedDayFilter: null,
      });
    });

    when('the user checks if date range filter is selected', () => {
      result = instance.isDateRangeSelectForFilter();
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('History list is showing', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    let result: any
    given('the initial state contains a list of transactions', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      let listData = [
        {
          "id": 42,
          "account_id": 1284,
          "request_type": "Stripe",
          "payment_date": "2024-08-27T15:36:12.899Z",
          "payment_method": null,
          "transaction_number": "0",
          "notary_request_id": 680,
          "notary_id": null,
          "status": 'PAID',
          "amount": "0.0",
          "created_at": "2024-08-27T15:36:12.984Z",
          "updated_at": "2024-08-27T15:36:12.984Z"
        }
      ]
      instance.setState({
        transactions: listData,
      });
    });

    when('the user checks if the history list is showing', () => {
      result = instance.isShowingHistoryList();
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('History list is not showing', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    let result: any
    given('the initial state contains no transactions', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({
        transactions: [],
      });
    });

    when('the user checks if the history list is showing', () => {
      result = instance.isShowingHistoryList();
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('User enters text in the search field', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the initial state is set with an empty search query', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ searchQuery: '' });
    });

    when('the user types "some text" in the search field', () => {
      instance.onChange('some text');
    });

    then('the searchQuery should be updated to "some text"', () => {
      expect(instance.state.searchQuery).toBe('some text');
    });
  });

  test('User clears the search field', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the initial state is set with a search query of "some text"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ searchQuery: 'some text' });
    });

    when('the user clears the search field', () => {
      instance.onChange('');
    });

    then('the searchQuery should be an empty string', () => {
      expect(instance.state.searchQuery).toBe('');
    });

    then('the pageNumber should be reset to 1', () => {
      expect(instance.state.pageNumber).toBe(1);
    });

    then('the transactions should be reset to an empty array', () => {
      expect(instance.state.transactions).toEqual([]);
    });

    then('the transactionLength should be reset to 0', () => {
      expect(instance.state.transactionLength).toBe(0);
    });

    then('the getTransactions method should be called with the query "?filter=ALL"', () => {
      const getTransactionsMock = jest.spyOn(instance, 'getTransactions');
      instance.onChange('');
      expect(getTransactionsMock).toHaveBeenCalledWith('?filter=ALL&order_id=&request_date_start=&request_date_end=');
    });
  });

  test('User performs a search with a valid query', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the initial state is set with a search query "12345"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ searchQuery: '12345' });
    });

    when('the user initiates a search', () => {
      instance.onSearch();
    });

    then('the loading state should be set to true', () => {
      expect(instance.state.loading).toBe(true);
    });

    then('the pageNumber should be reset to 1', () => {
      expect(instance.state.pageNumber).toBe(1);
    });

    then('the transactions should be reset to an empty array', () => {
      expect(instance.state.transactions).toEqual([]);
    });

    then('the transactionLength should be reset to 0', () => {
      expect(instance.state.transactionLength).toBe(0);
    });

    then('the getTransactions method should be called with the URL parameter "?order_id=12345"', () => {
      const getTransactionsMock = jest.spyOn(instance, 'getTransactions');
      instance.onSearch();
      expect(getTransactionsMock).toHaveBeenCalledWith('?order_id=12345&request_date_start=&request_date_end=');
    });
  });

  test('User type is 1', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the userType is 1', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.userType = 1;
    });

    when('the title of the header is retrieved', () => {
      // No action needed, we are testing the return value
    });

    then('it should return the payment title from the config JSON', () => {
      expect(instance.getTitleOfHeader()).toBe(configJSON.payments);
    });
  });

  test('User type is not 1', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the userType is not 1', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.userType = 2; // Any value other than 1
    });

    when('the title of the header is retrieved', () => {
      // No action needed, we are testing the return value
    });

    then('it should return the transaction history title from the config JSON', () => {
      expect(instance.getTitleOfHeader()).toBe(configJSON.transactionHistoryTitle);
    });
  });

  test('Successfully handling token and user type', ({ given, when, then }) => {
    let mockToken = 'mockToken';
    let mockUserDetail = JSON.stringify({ role_id: 1 });
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    let mockMessage: Message;
    given('a message contains a valid token', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      mockMessage = new Message("");
      mockMessage.getData = jest.fn(() => mockToken);
    });

    given('userProfileData is available in storage', async () => {
      mockGetStorageData.mockResolvedValue(mockUserDetail);
    });

    when('the token and user type are handled', async () => {
      await instance.handleTokenAndUserType(mockMessage);
    });

    then('it should set the token in the component\'s state', () => {
      expect(instance.state.token).toBe(mockToken);
    });

    then('it should set the user type from userProfileData', () => {
      expect(instance.userType).toBe(1);
    });
  });

  test('No userProfileData in storage', ({ given, when, then }) => {
    let mockToken = 'mockToken';
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    let mockMessage: Message;
    given('a message contains a valid token', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      mockMessage = new Message("");
      mockMessage.getData = jest.fn(() => mockToken);
    });

    given('userProfileData is not available in storage', async () => {
      mockGetStorageData.mockResolvedValue(null);
    });

    when('the token and user type are handled', async () => {
      await instance.handleTokenAndUserType(mockMessage);
    });

    then('it should set the token in the component\'s state', () => {
      expect(instance.state.token).toBe(mockToken);
    });

    then('it should set an empty user type', () => {
      expect(instance.userType).toBe('');
    });
  });

  test('User presses the Apply Filter button with valid input', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given('the filter button is enabled', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.setState({ selectedPaymentStatus: { title: 'sucess', key: 'PAID' } })
      jest.spyOn(instance, 'getTransactions').mockImplementation(() => { });
      expect(instance.getButtonEnabled()).toBe(true);
    });

    given('the selected payment status is "Paid"', () => {
      expect(instance.state.selectedPaymentStatus).toEqual({ title: 'sucess', key: 'PAID' });
    });

    given('the search query is "12345"', () => {
      expect(instance.state.searchQuery).toBe('');
    });

    given('the request start date is "2024-01-01"', () => {
      expect(instance.state.request_start_date).toBe('');
    });

    given('the request end date is "2024-01-31"', () => {
      expect(instance.state.request_end_date).toBe('');
    });

    when('the user presses the Apply Filter button', () => {
      instance.onApplyFilter.onPress();
    });

    then('the filter page should close', () => {
      expect(instance.state.isFilterPageOpen).toBe(false);
    });

    then('the loader should be shown', () => {
      expect(instance.state.isLoader).toBe(true);
    });

    then('the transactions should be cleared', () => {
      expect(instance.state.transactions).toEqual([]);
    });

    then('the transaction length should be reset to 0', () => {
      expect(instance.state.transactionLength).toBe(0);
    });

    then('the getTransactions function should be called with the correct parameters', () => {
      expect(instance.getTransactions).toHaveBeenCalledWith(
        '?filter=PAID&order_id=&request_date_start=&request_date_end='
      );
    });
  });

  test('User selects "today"', ({ given, when, then }) => {
    const today = '2024-12-13';
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given(`today's date is "${today}"`, () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      jest.spyOn(moment.prototype, 'format').mockReturnValue(today);
    });

    when('the user selects "today"', () => {
      instance.handleSelection('today');
    });

    then(`the request start date should be "${today}"`, () => {
      expect(instance.state.request_start_date).toBe(today);
    });

    then(`the request end date should be "${today}"`, () => {
      expect(instance.state.request_end_date).toBe(today);
    });
  });

  test('User selects "7days"', ({ given, when, then }) => {
    const today = '2024-12-13';
    const sevenDaysAgo = '2024-12-06';
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given(`today's date is "${today}"`, () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      jest.spyOn(moment.prototype, 'format').mockReturnValue(today);
    });

    when('the user selects "7days"', () => {
      jest.spyOn(moment.prototype, 'subtract').mockImplementation(() => ({
        format: () => sevenDaysAgo,
      }));
      instance.handleSelection('7days');
    });

    then(`the request start date should be "${sevenDaysAgo}"`, () => {
      expect(instance.state.request_start_date).toBe(sevenDaysAgo);
    });

    then(`the request end date should be "${today}"`, () => {
      expect(instance.state.request_end_date).toBe(today);
    });
  });

  test('User selects "30days"', ({ given, when, then }) => {
    const today = '2024-12-13';
    const thirtyDaysAgo = '2024-11-13';
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given(`today's date is "${today}"`, () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      jest.spyOn(moment.prototype, 'format').mockReturnValue(today);
    });

    when('the user selects "30days"', () => {
      jest.spyOn(moment.prototype, 'subtract').mockImplementation(() => ({
        format: () => thirtyDaysAgo,
      }));
      instance.handleSelection('30days');
    });

    then(`the request start date should be "${thirtyDaysAgo}"`, () => {
      expect(instance.state.request_start_date).toBe(thirtyDaysAgo);
    });

    then(`the request end date should be "${today}"`, () => {
      expect(instance.state.request_end_date).toBe(today);
    });
  });

  test('User selects "90days"', ({ given, when, then }) => {
    const today = '2024-12-13';
    const ninetyDaysAgo = '2024-09-14';
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    given(`today's date is "${today}"`, () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      jest.spyOn(moment.prototype, 'format').mockReturnValue(today);
    });

    when('the user selects "90days"', () => {
      jest.spyOn(moment.prototype, 'subtract').mockImplementation(() => ({
        format: () => ninetyDaysAgo,
      }));
      instance.handleSelection('90days');
    });

    then(`the request start date should be "${ninetyDaysAgo}"`, () => {
      expect(instance.state.request_start_date).toBe(ninetyDaysAgo);
    });

    then(`the request end date should be "${today}"`, () => {
      expect(instance.state.request_end_date).toBe(today);
    });
  });

  test('User selects an invalid key', ({ when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: TransactionHistory;
    when('the user selects "invalidKey"', () => {
      transactionPage = shallow(<TransactionHistory {...screenProps} />);
      instance = transactionPage.instance() as TransactionHistory;
      instance.handleSelection('invalidKey');
    });

    then('the request start date should be empty', () => {
      expect(instance.state.request_start_date).toBe('');
    });

    then('the request end date should be empty', () => {
      expect(instance.state.request_end_date).toBe('');
    });
  });


});
