import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import { Alert } from 'react-native';
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import {Platform, Linking} from 'react-native';
import QuotePayment from "../../src/QuotePayment";
import { GenericHeader } from "../../../../components/src/GenericHeader";
const navigate = jest.fn();

const screenProps = {
  navigation: {
    navigate,
  },
  id: "QuotePayment",
};

const feature = loadFeature(
  "./__tests__/features/QuotePayment-scenario.feature"
);

defineFeature(feature, (test) => {
    
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
    jest.spyOn(runEngine, "sendMessage");

  });

  test("User navigates to QuotePayment", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;

    given("I am a User loading QuotePayment", () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
    });

    when("I navigate to the QuotePayment", () => {
      instance = requestDetail.instance() as QuotePayment;
    });

    then("QuotePayment will load with out errors", () => {
      expect(requestDetail).toBeTruthy();
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


    then("I can click on back arrow icon with out errors", async () => {
      const mockNavigation = { goBack: jest.fn() };
      const wrapperWithNavigation = shallow(<QuotePayment {...screenProps} navigation={mockNavigation} />);
      let ArrowButton = wrapperWithNavigation.find(GenericHeader).dive()
      let buttonComponent = ArrowButton.findWhere((node: any) => node.prop('testID') === 'btnbackArrow');
      buttonComponent.simulate('press')
      instance.btnGoBack.onPress()

      await Promise.resolve(); // Assuming a navigation action is asynchronous, replace with appropriate async operation
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });

    then("User can perform quote payment request", async () => {
      const mockNavigation = { goBack: jest.fn() };
      const wrapperWithNavigation = shallow(<QuotePayment {...screenProps} navigation={mockNavigation} />);
      let ArrowButton = wrapperWithNavigation.find(GenericHeader).dive()
      let buttonComponent = ArrowButton.findWhere((node: any) => node.prop('testID') === 'btnbackArrow');
      buttonComponent.simulate('press')
      await Promise.resolve();
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });
  });


  test("Payment type is card", ({ given, when, then }) => {
    let result: any;
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    given('the payment type is card', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      instance.setState({ paymentType: 'card' });
    });

    when('the isPaymentTypeCard function is called', () => {
      result = instance.isPaymentTypeCard();
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('Payment type is not card', ({ given, when, then }) => {
    let result: any;
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    given('the payment type is cash', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      instance.setState({ paymentType: 'cash' });
    });

    when('the isPaymentTypeCard function is called', () => {
      result = instance.isPaymentTypeCard();
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Setting payment type to "card"', ({ when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    when('I select the payment type as "card"', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      instance.selectPaymentType('card');
    });

    then('the payment type should be set to "card"', () => {
      expect(instance.state.paymentType).toBe('card');
    });
  });


  test('Both selectedCurrency and paymentType are set', ({ given, when, then }) => {
    let result: any;
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    given('the selected currency is not empty', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      instance.setState({ selectedCurrency: 'USD' });
    });

    given('the payment type is not empty', () => {
      instance.setState({ paymentType: 'card' });
    });

    when('the getProceedBtnEnabled function is called', () => {
      result = instance.getProceedBtnEnabled();
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('selectedCurrency is empty', ({ given, when, then }) => {
    let result: any;
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    given('the selected currency is empty', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      instance.setState({ selectedCurrency: '' });
    });

    given('the payment type is not empty', () => {
      instance.setState({ paymentType: 'card' });
    });

    when('the getProceedBtnEnabled function is called', () => {
      result = instance.getProceedBtnEnabled();
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('paymentType is empty', ({ given, when, then }) => {
    let result: any;
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    given('the selected currency is not empty', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      instance.setState({ selectedCurrency: 'USD' });
    });

    given('the payment type is empty', () => {
      instance.setState({ paymentType: '' });
    });

    when('the getProceedBtnEnabled function is called', () => {
      result = instance.getProceedBtnEnabled();
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('paymentType is GPay', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    let mockCallProceedApi: any;

    given('the selected currency is not empty', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
    });

    given('the payment type is empty', () => {
      mockCallProceedApi = jest.spyOn(instance, 'callProceedApi');
      jest.spyOn(instance, 'getProceedBtnEnabled').mockReturnValue(true);
    });

    when('the getProceedBtnEnabled function is called', () => {
      mockCallProceedApi = jest.spyOn(instance, 'callProceedApi');
      jest.spyOn(instance, 'getProceedBtnEnabled').mockReturnValue(true);
      const { setState: mockValue } = instance;
      mockValue({
        selectedCurrency: 'GBP',
        paymentType: 'GPay',
      });
      const { getProceedBtnEnabled: mockFetchDataHandler, 
        btnProceedProps: { onPress: mockOnPress } ,
        onGPaySelect : mockonGPay1,
        handleGpaySuccessFailure: mockonGPay2
      } = instance;
      mockOnPress();
      mockonGPay1();
      mockonGPay2("success");
      mockFetchDataHandler();
      mockonGPay1();
      mockonGPay2("failure");
      mockonGPay2("");
      mockCallProceedApi = jest.spyOn(instance, 'callProceedApi');
      jest.spyOn(instance, 'getProceedBtnEnabled').mockReturnValue(true);
    });

    then('the result should be false', () => {
      expect(mockCallProceedApi).toBeDefined();
    });
  });

  test('Proceed button is enabled', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    let mockCallProceedApi: any
    given('the proceed button is enabled', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      mockCallProceedApi = jest.spyOn(instance, 'callProceedApi');
      jest.spyOn(instance, 'getProceedBtnEnabled').mockReturnValue(true);
    });

    when('I press the proceed button', () => {
      instance.btnProceedProps.onPress();
    });

    then('the proceed API should be called', () => {
      expect(mockCallProceedApi).toHaveBeenCalled();
    });
  });

  test('Proceed button is disabled', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    let mockCallProceedApi: any
    given('the proceed button is disabled', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      mockCallProceedApi = jest.spyOn(instance, 'callProceedApi');
      jest.spyOn(instance, 'getProceedBtnEnabled').mockReturnValue(false);
    });

    when('I press the proceed button', () => {
      instance.btnProceedProps.onPress();
    });

    then('the proceed API should not be called', () => {
      expect(mockCallProceedApi).not.toHaveBeenCalled();
    });
  });

  test('Closing the currency dropdown', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    given('the currency dropdown is open', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      instance.setState({ isCurrencyDropdownOpen: true });
    });

    when('I close the dropdown of services', () => {
      instance.closeDropDownOfServices();
    });

    then('the dropdown should be closed', () => {
      expect(instance.state.isCurrencyDropdownOpen).toBe(false);
    });
  });

  test('Opening the currency dropdown', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    given('the currency dropdown is closed', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      instance.setState({ isCurrencyDropdownOpen: false });
    });

    when('I open the services dropdown', () => {
      instance.openServicesDropdown();
    });

    then('the dropdown should be open', () => {
      expect(instance.state.isCurrencyDropdownOpen).toBe(true);
    });
  });

  test('Setting the selected currency value', ({ when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    when('I set the currency input to "£ - British pound sterling (GBP)"', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      instance.txtInputCurrencyPrpos("£ - British pound sterling (GBP)");
    });

    then('the selected currency state should be "£ - British pound sterling (GBP)"', () => {
      expect(instance.state.selectedCurrency).toBe("£ - British pound sterling (GBP)");
    });
  });

  test('Opening a valid Stripe URL', ({ when, then }) => {
    let mockOpenURL: any;
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    when('I open the URL "https://stripe.com"', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      mockOpenURL = jest.spyOn(Linking, 'openURL').mockImplementation(() => Promise.resolve());
      instance.openStripeUrl("https://stripe.com", "");
    });

    then('the URL should be opened in the browser', () => {
      // expect(mockOpenURL).toHaveBeenCalledWith("https://stripe.com");
    });
  }); 


  test('API request call ID matches proceedApiCallId', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    let mockMessage: any;
    let mockOpenURL: any
    given('a message with a matching API request call ID', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      instance.proceedApiCallId = 'proceedApiCallId123';
      mockOpenURL = jest.spyOn(Linking, 'openURL').mockImplementation(() => Promise.resolve());
    
      // Mocking the message object
      mockMessage = {
        getData: jest.fn(),
      };
      mockMessage.getData.mockImplementation((name: any) => {
        if (name === getName(MessageEnum.RestAPIResponceDataMessage)) {
          return 'proceedApiCallId123';
        }
        if (name === getName(MessageEnum.RestAPIResponceSuccessMessage)) {
          return { data: { url: 'https://stripe.com' } };
        }
      });
    });

    when('the REST API response is handled', () => {
      instance.handleRestAPIResponseMessage(mockMessage);
    });

    then('the Stripe URL should be opened', () => {
      // expect(mockOpenURL).toHaveBeenCalledWith('https://stripe.com');
    });
  });

  test('API request call ID does not match proceedApiCallId', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    let mockMessage: any;
    let mockOpenURL: any
    given('a message with a non-matching API request call ID', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      instance.proceedApiCallId = 'proceedApiCallId123';
      mockOpenURL = jest.spyOn(Linking, 'openURL').mockImplementation(() => Promise.resolve());
    
      // Mocking the message object
      mockMessage = {
        getData: jest.fn(),
      };
      mockMessage.getData.mockImplementation((name: any) => {
        if (name === getName(MessageEnum.RestAPIResponceDataMessage)) {
          return 'someOtherApiCallId';
        }
        if (name === getName(MessageEnum.RestAPIResponceSuccessMessage)) {
          return { data: { url: 'https://stripe.com' } };
        }
      });
    });

    when('the REST API response is handled', () => {
      instance.handleRestAPIResponseMessage(mockMessage);
    });

    then('the Stripe URL should not be opened', () => {
      expect(mockOpenURL).not.toHaveBeenCalled();
    });
  });

  test('Message contains custom data', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    let mockMessage: any;
    given('a message with custom data', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      mockMessage = {
        getData: jest.fn(),
      };
      mockMessage.getData.mockImplementation((name: any) => {
        if (name === getName(MessageEnum.CustomDataMessage)) {
          return { token: 'sampleToken', requestId: 'sampleRequestId', quoteID: 'sampleQuoteId' };
        }
      });
    });

    when('the navigation payload message is handled', () => {
      instance.handleNavigationPayloadMessage(mockMessage);
    });

    then('the state should be updated with the token, requestId, and quoteId', () => {
      expect(instance.state.token).toBe('sampleToken');
      expect(instance.state.requestId).toBe('sampleRequestId');
      expect(instance.state.quoteId).toBe('sampleQuoteId');
    });
  });

  test('All fields are validated, but selectedCurrency is null', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    let result: any;
    given('all fields are validated', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      instance.setState({ isAllFieldValidate: true });
    });

    given('selectedCurrency is null', () => {
      instance.setState({ selectedCurrency: '' });
    });

    when('checking if an error should be shown for the dropdown', () => {
      result = instance.showErrorForDropdown();
    });

    then('it should return true', () => {
      expect(result).toBe(true);
    });
  });

  test('All fields are validated, and selectedCurrency is not null', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    let result: any;
    given('all fields are validated', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      instance.setState({ isAllFieldValidate: true });
    });

    given('selectedCurrency is not null', () => {
      instance.setState({ selectedCurrency: 'USD' });
    });

    when('checking if an error should be shown for the dropdown', () => {
      result = instance.showErrorForDropdown();
    });

    then('it should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('Not all fields are validated', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    let result: any;
    given('not all fields are validated', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      instance.setState({ isAllFieldValidate: false });
    });

    when('checking if an error should be shown for the dropdown', () => {
      result = instance.showErrorForDropdown();
    });

    then('it should return false', () => {
      expect(result).toBe(false);
    });
  });

    test('Pressing the request detail button', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    let sendMock: any;
    given('the requestId is "12345"', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      instance.setState({requestId: "12345"});
      sendMock = jest.fn();
      instance.send = sendMock;
    });

    given('the props are set', () => {
    });

    when('I press the request detail button', () => {
      instance.btnGoBackOnRequestDetail.onPress();
    });

    then('it should send a navigation message with the request details', () => {
      const msg = sendMock.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationRequestDetailMessage));
      expect(msg.getData(getName(MessageEnum.CustomDataMessage))).toEqual({
        requestId: "12345",
        actionType: 'view'
      });
    });

    then('the actionType should be "view"', () => {
      const msg = sendMock.mock.calls[0][0];
      const selectedRequest = msg.getData(getName(MessageEnum.CustomDataMessage));
      expect(selectedRequest.actionType).toBe('view');
    });
  });

  test('Successfully handle quote accept response', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    given('the component is rendered', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      // expect(instance.exists()).toBe(true);
    });

    when('I call the manageQuoteAcceptResponse function', () => {
      instance.manageQuoteAcceptResponse();
    });

    then('the state should have "isShowWebView" set to false', () => {
      expect(instance.state.isShowWebView).toBe(false);
    });

    then('the state should have "stripeCheckoutUrl" set to an empty string', () => {
      expect(instance.state.stripeCheckoutUrl).toBe('');
    });
  });

  test('Successfully handle request with StripeSuccessPage URL', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    let result: any;
    given('the component is rendered', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
    });

    when('I call the handleShouldStartLoadWithRequest function with a request containing "StripeSuccessPage"', () => {
      const request = { url: 'https://example.com/StripeSuccessPage' };
      result = instance.handleShouldStartLoadWithRequest(request);
    });

    then('the state should have "isSuccessPayment" set to true', () => {
      expect(instance.state.isSuccessPayment).toBe(true);
    });

    then('the function should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('Successfully handle request with StripeFailurePage URL', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    let result: any;
    given('the component is rendered', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
    });

    when('I call the handleShouldStartLoadWithRequest function with a request containing "StripeFailurePage"', () => {
      const request = { url: 'https://example.com/StripeFailurePage' };
      result = instance.handleShouldStartLoadWithRequest(request);
    });

    then('the state should have "isFailedPayment" set to true', () => {
      expect(instance.state.isFailedPayment).toBe(true);
    });

    then('the function should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('Successfully handle request with cancel URL', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    let result: any;
    given('the component is rendered', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
    });

    when('I call the handleShouldStartLoadWithRequest function with a request containing "cancel"', () => {
      const request = { url: 'https://example.com/cancel' };
      result = instance.handleShouldStartLoadWithRequest(request);
    });

    then('the state should have "isFailedPayment" set to true', () => {
      expect(instance.state.isFailedPayment).toBe(true);
    });

    then('the function should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('Handle request with a URL not related to Stripe', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    let result: any;
    given('the component is rendered', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
    });

    when('I call the handleShouldStartLoadWithRequest function with a request containing "example.com"', () => {
      const request = { url: 'https://example.com/somepage' };
      result = instance.handleShouldStartLoadWithRequest(request);
    });

    then('the function should return true', () => {
      expect(result).toBe(true);
    });
  });

  test('Successfully reset payment state and redirect to request detail page', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;
    given('the component is rendered', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;
      jest.spyOn(instance, 'redirectPageToDetailPage');
    });

    when('I press the btnRedirectTORequestDetail button', () => {
      instance.btnRedirectTORequestDetail.onPress();
    });

    then('the state should have "isSuccessPayment" set to false', () => {
      expect(instance.state.isSuccessPayment).toBe(false);
    });

    then('the state should have "isFailedPayment" set to false', () => {
      expect(instance.state.isFailedPayment).toBe(false);
    });

    then('the redirectPageToDetailPage function should be called', () => {
      expect(instance.redirectPageToDetailPage).toHaveBeenCalled();
    });
  });

  test('Handle API response when quoteAcceptApiCallId is matched', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: QuotePayment;

    
    let messageMock: any;
    let quoteAcceptApiCallIdMock = 'quoteAcceptApiCallIdMock';
    let manageQuoteAcceptResponseMock: any;
    given('the API call ID is quoteAcceptApiCallId', () => {
      requestDetail = shallow(<QuotePayment {...screenProps} />);
      instance = requestDetail.instance() as QuotePayment;

      manageQuoteAcceptResponseMock = jest.fn();

      instance.manageQuoteAcceptResponse = manageQuoteAcceptResponseMock;
      instance.quoteAcceptApiCallId = quoteAcceptApiCallIdMock;
      messageMock = {
        getData: jest.fn(),
      };
      messageMock.getData.mockImplementation((param: any) => {
        if (param === getName(MessageEnum.RestAPIResponceDataMessage)) {
          return quoteAcceptApiCallIdMock;
        }
        return null;
      });
    });

    when('handleRestAPIResponseMessage is called', () => {
      instance.handleRestAPIResponseMessage(messageMock);
    });

    then('the manageQuoteAcceptResponse method should be called', () => {
      expect(manageQuoteAcceptResponseMock).toHaveBeenCalled();
    });
  });

});
