import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import NavigationMenu from "../../src/NavigationMenu";
import { GenericHeader } from "../../../../components/src/GenericHeader";
import { getStorageData, removeStorageData } from "../../../../framework/src/Utilities";
import { Linking } from 'react-native';
import { imgDownArrow, imgUpArrow } from "../../src/assets";
const navigation = require("react-navigation")

const screenProps = {
  navigation: navigation,
  id: "NavigationMenu"
}
jest.mock('../../../../framework/src/Utilities');
const feature = loadFeature('./__tests__/features/NavigationMenu-scenario.feature');
const mockGetStorageData = getStorageData as jest.MockedFunction<typeof getStorageData>;

defineFeature(feature, (test) => {
  let userDetail = {
    id: 0,
    first_name: null,
    last_name: null,
    full_phone_number: "",
    city: null,
    post_code: null,
    country_code: null,
    phone_number: null,
    email: "",
    activated: false,
    user_type: "",
    user_name: null,
    platform: null,
    suspend_until: null,
    status: "",
    role_id: 0,
    full_name: "",
    gender: null,
    date_of_birth: null,
    age: null,
    country: null,
    address: null,
    address_line_2: null,
    contact_name: "",
    company_name: null,
    photo: { url: null }
  }
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    mockGetStorageData.mockClear();
  });

  test('User navigates to NavigationMenu', ({ given, when, then }) => {
    let navigationMenuBlock: ShallowWrapper;
    let instance: NavigationMenu;

    given('I am a User loading NavigationMenu', () => {
      navigationMenuBlock = shallow(<NavigationMenu {...screenProps} />)
    });

    when('I navigate to the NavigationMenu', () => {
      instance = navigationMenuBlock.instance() as NavigationMenu
    });

    then('NavigationMenu will load with out errors', () => {

      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);
      const userData = tokenMsg.getData(getName(MessageEnum.SessionResponseData));
      // const userRole = JSON.parse(userData);
      instance.setState({ getUserRole: 'end_user' })
      let data = '{"data":{"id":"4","type":"navigation_menu","attributes":{"id":4,"position":"row1","items":[]}}},{"data":{"id":"2","type":"navigation_menu","attributes":{"id":2,"position":"right","items":[{"name":"Builder.ai","url":"http://builder.ai/"}]}}},{"data":{"id":"1","type":"navigation_menu","attributes":{"id":1,"position":"left","items":[{"name":"Builder.ai","url":"http://builder.ai/"},{"name":"Home","url":"Home"}]}}},{"data":{"id":"3","type":"navigation_menu","attributes":{"id":3,"position":"center","items":[{"name":"Builder.ai","url":"http://builder.ai/"},{"name":"Builder.aiw","url":"http://builder.aieee/"}]}}}'
      const msgNavigastionMenuAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
      msgNavigastionMenuAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgNavigastionMenuAPI.messageId);
      msgNavigastionMenuAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        data
      );

      runEngine.sendMessage("Unit Test", msgNavigastionMenuAPI)

      expect(navigationMenuBlock).toBeTruthy()

    });
    then('I can change Status Offline to oline without errors', () => {
      instance.changeStatus()
      instance.getFaqData()
      instance.setState({ isOnlineStatus: !instance.state.isOnlineStatus })
    });

    then('I can select the back button with out errors', () => {
      const mockNavigation = { goBack: jest.fn() };
      const wrapperWithNavigation = shallow(<NavigationMenu {...screenProps} navigation={mockNavigation} />);
      let ArrowButton = wrapperWithNavigation.find(GenericHeader).dive()
      let buttonComponent = ArrowButton.findWhere((node) => node.prop('testID') === 'btnbackArrow');
      buttonComponent.simulate('press');
      instance.btnGoBack.onPress()
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });

    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
      expect(navigationMenuBlock).toBeTruthy()
    });
  });

  test('Successfully fetch user details from storage', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: NavigationMenu;
    
    given('there is user profile data stored', () => {
      dashboardWrapper = shallow(<NavigationMenu {...screenProps} />);
      instance = dashboardWrapper.instance() as NavigationMenu;
      const mockUserProfileData = JSON.stringify(userDetail);
      mockGetStorageData.mockResolvedValue(mockUserProfileData);
    });
    when('the getUserDetail function is called', async () => {
      await instance.getUserDetail();
    });

    then('the UserProfileDetail should be populated with the user data', () => {
      expect(instance.state.UserProfileDetail).toEqual(userDetail);
    });
  });

  test('Handle empty or null user profile data', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: NavigationMenu;
    given('there is no user profile data stored', () => {
      dashboardWrapper = shallow(<NavigationMenu {...screenProps} />);
      instance = dashboardWrapper.instance() as NavigationMenu;
      mockGetStorageData.mockResolvedValue(null);
    });

    when('the getUserDetail function is called', async () => {
      await instance.getUserDetail();
    });

    then('the UserProfileDetail should be an empty object', () => {
      expect(instance.state.UserProfileDetail).toEqual({});
    });
  });


  test('Redirecting to Terms and Conditions page', ({ given, when, then }) => { 
    let dashboardWrapper: ShallowWrapper;
    let instance: NavigationMenu;
    let sendMock: any;
    given('I have a key tandc', () => {
      dashboardWrapper = shallow(<NavigationMenu {...screenProps} />);
      instance = dashboardWrapper.instance() as NavigationMenu;
      sendMock = jest.fn();
      instance.send = sendMock;
    });

    when('I call the redirectToPage function with the key', () => {
      instance.redirectToPage('tandc');
    });

    then('it should send a NavigationTermAndConditionMessage', () => {
      const msg = sendMock.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationTermAndConditionMessage));
    });
  });

  test('Redirecting to Privacy and Policy page', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: NavigationMenu;
    let sendMock: any;
    given('I have a key pandp', () => {
      dashboardWrapper = shallow(<NavigationMenu {...screenProps} />);
      instance = dashboardWrapper.instance() as NavigationMenu;
      sendMock = jest.fn();
      instance.send = sendMock;
    });

    when('I call the redirectToPage function with the key', () => {
      instance.redirectToPage('pandp');
    });

    then('it should send a NavigationTermAndConditionMessage', () => {
      const msg = sendMock.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationTermAndConditionMessage));
    });
  });

  test('Redirecting to Profile page', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: NavigationMenu;
    let sendMock: any;
    given('I have a key profile', () => {
      dashboardWrapper = shallow(<NavigationMenu {...screenProps} />);
      instance = dashboardWrapper.instance() as NavigationMenu;
      sendMock = jest.fn();
      instance.send = sendMock;
    });

    when('I call the redirectToPage function with the key', () => {
      instance.redirectToPage('profile');
    });

    then('it should send a NavigationBasicUserProfileMessage', () => {
      const msg = sendMock.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationBasicUserProfileMessage));
    });
  });

  test('Redirecting to Notary Services page', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: NavigationMenu;
    let sendMock: any;
    given('I have a key service', () => {
      dashboardWrapper = shallow(<NavigationMenu {...screenProps} />);
      instance = dashboardWrapper.instance() as NavigationMenu;
      sendMock = jest.fn();
      instance.send = sendMock;
    });

    when('I call the redirectToPage function with the key', () => {
      instance.redirectToPage('service');
    });

    then('it should send a NavigationNotaryServicesMessage', () => {
      const msg = sendMock.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationNotaryServicesMessage));
    });
  });

  test('Redirecting to Transaction History page', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: NavigationMenu;
    let sendMock: any;
    given('have a key pay', () => {
      dashboardWrapper = shallow(<NavigationMenu {...screenProps} />);
      instance = dashboardWrapper.instance() as NavigationMenu;
      sendMock = jest.fn();
      instance.send = sendMock;
    });

    when('call the redirectToPage function with the key', async () => {
      await instance.redirectToPage('pay');
    });

    then('the function should send a NavigationTransactionHistoryMessage', () => {
      const msg = sendMock.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationTransactionHistoryMessage));
    });
  });

  test('Redirecting to Setting page', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: NavigationMenu;
    let sendMock: any;
    given('have a key setting', () => {
      dashboardWrapper = shallow(<NavigationMenu {...screenProps} />);
      instance = dashboardWrapper.instance() as NavigationMenu;
      sendMock = jest.fn();
      instance.send = sendMock;
      
    });

    when('call the redirectToPage function with the key', async () => {
      await instance.redirectToPage('setting');
    });

    then('the function should send a NavigationSettingsMessage', () => {
      const msg = sendMock.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationSettingsMessage));
    });
  });

  test('Redirecting to FAQs page', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: NavigationMenu;
    given('have a key FAQs', () => {
      dashboardWrapper = shallow(<NavigationMenu {...screenProps} />);
      instance = dashboardWrapper.instance() as NavigationMenu;
      instance.setState({isFAQsPageOpen: false})
    });

    when('call the redirectToPage function with the key', async () => {
      await instance.redirectToPage('faq');
    });

    then('the function should send a NavigationFAQsMessage', () => {
      expect(instance.state.isFAQsPageOpen).toBe(true);
    });
  });

  describe('NavigationMenu', () => {
    it('should call send method when key is "tandc"', () => {

      const sendMock = jest.fn();

      const wrapper = shallow<NavigationMenu>(<NavigationMenu {...screenProps} />);
      const instance = wrapper.instance();
      instance.redirectToPage('tandc');
      instance.redirectToPage('profile');
      instance.redirectToPage('service');
      instance.redirectToPage('pay');
    });

    it('should not call send method when key is not "tandc"', () => {

      const sendMock = jest.fn();
      const wrapper = shallow<NavigationMenu>(<NavigationMenu {...screenProps} />);
      const instance = wrapper.instance();

      instance.redirectToPage('someOtherKey');

      expect(sendMock).not.toHaveBeenCalled(); // Assert that send method has not been called
    });
  });

  test('logout user', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: NavigationMenu;
    given('user navigates to profile screen', () => {
      dashboardWrapper = shallow(<NavigationMenu {...screenProps} />);
    
    });

    when('user taps the logout modal', async () => {
    instance = dashboardWrapper.instance() as NavigationMenu;

      let logout = dashboardWrapper.findWhere(
        (node) => node.prop("testID") === "logoutBtn"
      );
      logout.simulate('press')
     
    });

    then('then will click yes to logout', () => {
      let btn = dashboardWrapper.findWhere(
        (node) => node.prop("testID") === "yesProceed"
      );
      btn.props().onPress()
    });
  });

  test('Process API response containing FAQs', ({ given, when, then }) => {
    let faqsResponse: any;
    let fAQsListBlock: ShallowWrapper;
    let instance: NavigationMenu;
    let mockMessage: any;
    given('an API response message containing FAQs', () => {
      fAQsListBlock = shallow(<NavigationMenu {...screenProps} />)
      instance = fAQsListBlock.instance() as NavigationMenu
      mockMessage = new Message("");
      jest.spyOn(mockMessage, 'getData');
      faqsResponse = {
        "faq_title": "Frequently asked questions",
        "faqs": [
          {
            "id": 1,
            "question": "What is renotary?!!!!!",
            "answer": "This is demo Answer of renotary test question ssssss",
            "created_at": "2024-07-23T12:29:24.646Z",
            "updated_at": "2024-07-31T17:15:18.366Z"
          }
        ]
      }

      mockMessage.getData.mockReturnValue(faqsResponse);
    });

    when('the handleFAQsApiResponse function is called', () => {
      instance.handleFAQsApiResponse(mockMessage);
    });

    then('the state should be updated with FAQs data', () => {
      expect(mockMessage.getData).toHaveBeenCalledWith(getName(MessageEnum.RestAPIResponceSuccessMessage));
      expect(instance.state.FAQsData).toBe(faqsResponse.faqs)
      expect(instance.state.filteredFAQsData).toBe(faqsResponse.faqs)
      expect(instance.state.isLoader).toBe(false)
    });
  });

  test('Open email client with specified email address', ({ given, when, then }) => {
    let fAQsListBlock: ShallowWrapper;
    let instance: NavigationMenu;
    let linkingSpy: jest.SpyInstance;
    given('a user wants to send an email', () => {
      fAQsListBlock = shallow(<NavigationMenu {...screenProps} />)
      instance = fAQsListBlock.instance() as NavigationMenu
      linkingSpy = jest.spyOn(Linking, 'openURL').mockImplementation(() => Promise.resolve());
    });

    when('the handleEmailLink function is triggered', () => {
      instance.handleEmailLink.onPress();
    });

    then('the default email client should open with the correct email address', () => {
      expect(linkingSpy).toHaveBeenCalledWith('mailto:mail_id@gmail.com');
    });
  });

  test('Filter FAQs based on the user input', ({ given, when, then }) => {
    let fAQsListBlock: ShallowWrapper;
    let instance: NavigationMenu;
    given('a list of FAQs and a search query', () => {
      fAQsListBlock = shallow(<NavigationMenu {...screenProps} />)
      instance = fAQsListBlock.instance() as NavigationMenu
      instance.setState({
        FAQsData: [
          {
            "id": 1,
            question: 'What is React?', answer: 'React is a library for building UI.',
            "created_at": "2024-07-23T12:29:24.646Z",
            "updated_at": "2024-07-31T17:15:18.366Z"
          }
        ],
        filteredFAQsData: [],
        searchQuery: '',
        openedQueNo: null,
      });
    });

    when('the user enters a search query', () => {
      instance.onChangeTxtValueProps.onChangeText('React');
    });

    then('the FAQs should be filtered based on the query', () => {
      expect(instance.state.filteredFAQsData).toEqual([
        {"id": 1, question: 'What is React?', answer: 'React is a library for building UI.',"created_at": "2024-07-23T12:29:24.646Z",
            "updated_at": "2024-07-31T17:15:18.366Z" },
      ]);
      expect(instance.state.searchQuery).toBe('React');
      expect(instance.state.openedQueNo).toBeNull();
    });
  });
  test('Display all FAQs when the search query is cleared', ({ given, when, then }) => {
    let fAQsListBlock: ShallowWrapper;
    let instance: NavigationMenu;
    given('a list of FAQs and a search query', () => {
      fAQsListBlock = shallow(<NavigationMenu {...screenProps} />)
      instance = fAQsListBlock.instance() as NavigationMenu
    });
    when('the user clears the search query', () => {
      instance.onChangeTxtValueProps.onChangeText('');
    });

    then('all FAQs should be displayed', () => {
      expect(instance.state.filteredFAQsData).toEqual(instance.state.FAQsData);
      expect(instance.state.searchQuery).toBe('');
      expect(instance.state.openedQueNo).toBeNull();
    });
  });

  test('Open a closed question', ({ given, when, then }) => {
    let fAQsListBlock: ShallowWrapper;
    let instance: NavigationMenu;
    given('no question is currently open', () => {
      fAQsListBlock = shallow(<NavigationMenu {...screenProps} />)
      instance = fAQsListBlock.instance() as NavigationMenu
      expect(instance.state.openedQueNo).toBeNull();
    });

    when('the user toggles a question with index 1', () => {
      instance.toggleQuestion(1);
    });

    then('the question with index 1 should be opened', () => {
      expect(instance.state.openedQueNo).toBe(1);
    });
  });

  test('Close an already opened question', ({ given, when, then }) => {
    let fAQsListBlock: ShallowWrapper;
    let instance: NavigationMenu;
    given('a question with index 2 is currently open', () => {
      fAQsListBlock = shallow(<NavigationMenu {...screenProps} />)
      instance = fAQsListBlock.instance() as NavigationMenu
      instance.setState({ openedQueNo: 2 });
      expect(instance.state.openedQueNo).toBe(2);
    });

    when('the user toggles the same question with index 2', () => {
      instance.toggleQuestion(2);
    });

    then('no question should be open', () => {
      expect(instance.state.openedQueNo).toBeNull();
    });
  });

  test('Open a different question', ({ given, when, then }) => {
    let fAQsListBlock: ShallowWrapper;
    let instance: NavigationMenu;
    given('a question with index 2 is currently open', () => {
      fAQsListBlock = shallow(<NavigationMenu {...screenProps} />)
      instance = fAQsListBlock.instance() as NavigationMenu
      instance.setState({ openedQueNo: 2 });
      expect(instance.state.openedQueNo).toBe(2);
    });

    when('the user toggles a different question with index 3', () => {
      instance.toggleQuestion(3);
    });

    then('the question with index 3 should be opened', () => {
      expect(instance.state.openedQueNo).toBe(3);
    });
  });

  test('Go back to the menu page', ({ given, when, then }) => {
    let fAQsListBlock: ShallowWrapper;
    let instance: NavigationMenu;
    given('the FAQs page is open', () => {
      fAQsListBlock = shallow(<NavigationMenu {...screenProps} />)
      instance = fAQsListBlock.instance() as NavigationMenu
    });

    when('the user clicks the "Go Back to Menu" button', () => {
      instance.btnGoBackToMenuPage.onPress(); 
    });

    then('the FAQs page should be closed', () => {
      expect(instance.state.isFAQsPageOpen).toBe(false);
    });
  }); 

  test('Get selected FAQ question status', ({ given, when, then }) => {
    let fAQsListBlock: ShallowWrapper;
    let instance: NavigationMenu;
    given('a question is selected with index number 1', () => {
      fAQsListBlock = shallow(<NavigationMenu {...screenProps} />)
      instance = fAQsListBlock.instance() as NavigationMenu
      instance.setState({ openedQueNo: 1 });
    });

    when('I check if the question with index number 1 is selected', () => {
      const isSelected = instance.getSelectedFaqsques(1);
      expect(isSelected).toBe(true);
    });

    then('it should return true', () => {
      expect(instance.getSelectedFaqsques(1)).toBe(true);
    });

    when('I check if the question with index number 2 is selected', () => {
      const isSelected = instance.getSelectedFaqsques(2);
      expect(isSelected).toBe(false);
    });

    then('it should return false', () => {
      expect(instance.getSelectedFaqsques(2)).toBe(false);
    });
  });

  test('Get selected FAQ arrow image', ({ given, when, then }) => {
    let fAQsListBlock: ShallowWrapper;
    let instance: NavigationMenu;

    given('a question is selected with index number 1', () => {
      fAQsListBlock = shallow(<NavigationMenu {...screenProps} />)
      instance = fAQsListBlock.instance() as NavigationMenu
      instance.setState({ openedQueNo: 1 });
    });

    when('I check the arrow image for the selected question with index number 1', () => {
      const arrowImage = instance.getSelectedFaqArroqImg(1);
      expect(arrowImage).toBe(imgUpArrow);
    });

    then('it should return the up arrow image', () => {
      expect(instance.getSelectedFaqArroqImg(1)).toBe(imgUpArrow);
    });

    when('I check the arrow image for a non-selected question with index number 2', () => {
      const arrowImage = instance.getSelectedFaqArroqImg(2);
      expect(arrowImage).toBe(imgDownArrow);
    });

    then('it should return the down arrow image', () => {
      expect(instance.getSelectedFaqArroqImg(2)).toBe(imgDownArrow);
    });
  });

  test('User logs out successfully', ({ given, when, then, and }) => {
    let fAQsListBlock: ShallowWrapper;
    let instance: NavigationMenu;
    let sendMock: any
    given('the user is logged in', () => {
      fAQsListBlock = shallow(<NavigationMenu {...screenProps} />)
      instance = fAQsListBlock.instance() as NavigationMenu
      sendMock = jest.fn();
      instance.send = sendMock;
      instance.setState({ logoutModal: true });
    });

    when('the onSubmitLogout function is called', () => {
      instance.onSubmitLogout();
    });

    then('all session data should be cleared', () => {
      expect(removeStorageData).toHaveBeenCalledTimes(18);
      expect(removeStorageData).toHaveBeenCalledWith('userProfileData');
      expect(removeStorageData).toHaveBeenCalledWith('email');
      expect(removeStorageData).toHaveBeenCalledWith('token');
      expect(removeStorageData).toHaveBeenCalledWith('userprofile');
      expect(removeStorageData).toHaveBeenCalledWith('accessToken');
      expect(removeStorageData).toHaveBeenCalledWith('UserType');
      expect(removeStorageData).toHaveBeenCalledWith('signUpUserDetail');
      expect(removeStorageData).toHaveBeenCalledWith('deviceToken');
    });

    and('the user should be navigated to the login screen', () => {
      
      const msg = sendMock.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.SessionSaveMessage));
    });

    and('the logout modal should be closed', () => {
      expect(instance.state.logoutModal).toBe(false);
    });
  });

});
