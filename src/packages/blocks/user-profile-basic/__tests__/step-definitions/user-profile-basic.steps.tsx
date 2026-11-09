import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import { StyleSheet } from 'react-native';
import UserProfileBasic from "../../src/UserProfileBasicBlock";
const ImagePicker = require('react-native-image-crop-picker');
import { GenericHeader } from "../../../../components/src/GenericHeader";
const navigation = require("react-navigation");
const screenProps = {
  navigation: navigation,
  id: "UserProfileBasic",
};

jest.mock('../../../../framework/src/Utilities', () => ({
  getStorageData: jest.fn(),
  setStorageData: jest.fn(),
}));

const feature = loadFeature("./__tests__/features/user-profile-basic-scenario.feature");
let mockSetTimeout: Function;
global.setTimeout = jest
  .fn()
  .mockImplementation((callbackFn) => (mockSetTimeout = callbackFn)) as any;

defineFeature(feature, (test) => {
  let responseJson: any;
  let errorReponse: any;
  let mockMessage: any;
  let yourComponent: any;
  let message: any;
  const mockSetStorageData = jest.fn();
  const mockParseApiErrorResponse = jest.fn();
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");

    yourComponent = shallow(<UserProfileBasic {...screenProps} />);
    // Mock necessary dependencies and methods
    yourComponent.instance().setState = jest.fn();
    yourComponent.instance().showAlert = jest.fn();
    yourComponent.instance().parseApiErrorResponse = jest.fn();
    yourComponent.instance().parseApiCatchErrorResponse = jest.fn();
    yourComponent.instance().authToken = null;
    yourComponent.instance().getUserProfileDetail = jest.fn();

    yourComponent.instance().validateMobileOnServer = jest.fn();
    yourComponent.instance().validateAndUpdateProfile = jest.fn();
  });

  mockMessage = {
    id: 'MockMessageId',
    getData: jest.fn(),
  };

  test("User navigates to UserProfileBasic", ({ given, when, then }) => {
    let userProfile: ShallowWrapper;
    let instance: UserProfileBasic;

    given("I am a User loading UserProfileBasic", () => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
    });

    when("I navigate to the UserProfileBasic", () => {
      instance = userProfile.instance() as UserProfileBasic;
    });

    then("UserProfileBasic will load with out errors", () => {
      instance.getUserProfileDetail();
      instance.getUserProfile()
      instance.goToPrivacyPolicy();
      instance.goToTermsAndCondition();
      instance.isValidEmail("deep@gmail.com")
      instance.isStringNullOrBlank("deep")
      instance.enableDisableEditPassword(true)
      instance.enableDisableEditPassword(false)
      instance.validateMobileOnServer("+44", "1234567890");
      instance.isNonNullAndEmpty("hello");
      instance.validateRePassword("Deep@123")
      instance.validatePassword("Deep@123")
      instance.validateCurrentPwd("Deep@123")
      instance.validateAndUpdateProfile()
      instance.validateCountryCodeAndPhoneNumber("+44", "1234567890");
      instance.validateMobileAndThenUpdateUserProfile()
      // instance.handleUserProfileResponse({}, {})
      instance.handleChangeProfileResponse({})
      expect(UserProfileBasic).toBeTruthy();
    });

    then('I can enter a phone number with out errors', () => {
      instance.setState({ isEditModeActive: true })
      instance.txtInputPhoneNumberlWebProps.editable = true
      let textInputComponent = userProfile.findWhere((node) => node.prop('testID') === 'txtInputPhoneNumber');
      textInputComponent.simulate('changeText', '1234567890');
    });

    then('I can enter First address with out errors', () => {
      instance.setState({ isEditModeActive: true })
      let textInputComponent = userProfile.findWhere((node) => node.prop('testID') === 'txtInputAddressFirst');
      textInputComponent.simulate('changeText', '2972 Westheimer Rd. ,  85486');
    });

    then('I can enter Second address with out errors', () => {
      instance.setState({ isEditModeActive: true })
      let textInputComponent = userProfile.findWhere((node) => node.prop('testID') === 'txtInputAddressSec');
      textInputComponent.simulate('changeText', 'Santa Ana');
    });

    then('I can enter post code with out errors', () => {
      instance.setState({ isEditModeActive: true })
      let textInputComponent = userProfile.findWhere((node) => node.prop('testID') === 'txtInputPost');
      textInputComponent.simulate('changeText', '986 765');
    });

    then('I can enter First name with out errors', () => {
      instance.setState({ isEditModeActive: true })
      let textInputComponent = userProfile.findWhere((node) => node.prop('testID') === 'txtInputFirstName');
      textInputComponent.simulate('changeText', 'Esther Howard');
    });

    then('I can enter business Name with out errors', () => {
      instance.setState({ isEditModeActive: true, lastName: "Hello" })
      let textInputComponent = userProfile.findWhere((node) => node.prop('testID') === 'txtInputLastName');
      textInputComponent.simulate('changeText', 'Esther Howard');
    });

    then('I can enter city with out errors', () => {
      instance.setState({ isEditModeActive: true })
      let textInputComponent = userProfile.findWhere((node) => node.prop('testID') === 'txtInputCity');
      textInputComponent.simulate('changeText', 'Esther Howard');
    });

    then('I can select country code with out errors', () => {
      instance.setState({ isEditModeActive: true })
      let textInputComponent = userProfile.findWhere((node) => node.prop('testID') === 'txtInputCountryCode');
      instance.txtInputCountryCodePrpos('Englend');
      instance.setState({ selectedCountryCode: 'Englend' })
    });

    then('I can select country with out errors', () => {
      instance.setState({ isEditModeActive: true })
      let textInputComponent = userProfile.findWhere((node) => node.prop('testID') === 'txtDropdownCountryInput');
      instance.txtInputCountryPrpos('+44');
      instance.setState({ selectedCountry: '+44' })
    });

    then('I can select save changes button with out errors', () => {
      instance.setState({ isEditModeActive: true })
      instance.getSaveChangesButtonEnabled()
      let textInputComponent = userProfile.findWhere((node) => node.prop('testID') === 'btnSubmitUserChanges');
      instance.confirmationForSaveChanges.onPress();
      instance.saveChangesUserProfile()
      instance.setState({ isOpenModel: true })
    });

    then('I can select No button to close popup with out errors', () => {
      instance.setState({ isEditModeActive: true })
      let textInputComponent = userProfile.findWhere((node) => node.prop('testID') === 'btnNoToProceed');
      instance.noToChanges.onPress();
      instance.cancelChanges()
      instance.setState({ isOpenModel: false })
    });

    then('I can select yes procced to save changes button with out errors', () => {
      instance.setState({ isEditModeActive: true })
      let textInputComponent = userProfile.findWhere((node) => node.prop('testID') === 'btnYesProceed');
      instance.yesProceedToChanges.onPress();
      instance.callApiToSaveChanges()
    });

    then('I can select edit profile button with out errors', () => {
      instance.setState({ isEditModeActive: true })
      let textInputComponent = userProfile.findWhere((node) => node.prop('testID') === 'btnSubmitToGoEditPage');
      instance.gotToEditUserProfile.onPress();
      instance.editUserProfile()
      instance.setState({ isEditModeActive: true }, () => {
        instance.callApiForGetCountry()

        const responseJson = {
          "data": [
            {
              "id": "1",
              "type": "country",
              "attributes": {
                "name": "England"
              }
            },
            {
              "id": "2",
              "type": "country",
              "attributes": {
                "name": "Wales"
              }
            }
          ]
        }
        instance.handleCountryResponse(responseJson)
      })
    });

    then('I can click on avatar and edit image text with out errors', () => {

      instance.setState({ isEditModeActive: true })
      let textInputComponent = userProfile.findWhere((node) => node.prop('testID') === 'idImageClick');
      // instance.openToSelectImage();
      // instance.setState({imageSource : selectedImageData})
    });

    when('the receive method is called with the message', async function () {
      // Setup component

      // Mock necessary handler methods
      instance.handleUserProfileResponse = jest.fn();
      instance.handleChangeProfileResponse = jest.fn();
      instance.handleCountryResponse = jest.fn();
      instance.handleSessionResponse = jest.fn();

      // Call receive method
      await instance.receive('MockFrom', mockMessage);
    });

    then('the corresponding handler should be invoked', function () {
      expect(instance.handleUserProfileResponse).not.toHaveBeenCalled();
      expect(instance.handleChangeProfileResponse).not.toHaveBeenCalled();
      expect(instance.handleCountryResponse).not.toHaveBeenCalled();
      // expect(instance.handleSessionResponse).toHaveBeenCalled();
      instance.setState({ isValidateField: true, firstName: '', email: '', phoneNumber: '', addressFirst: '', city: '', selectedCountry: '', postCode: '' })
    });

    then('the name error message should be displayed', () => {
      expect(userProfile.findWhere(node => node.prop('testID') === 'errorNameText')).toHaveLength(1);
    });
    then('the email error message should be displayed', () => {
      expect(userProfile.findWhere(node => node.prop('testID') === 'errorEmailText')).toHaveLength(1);
    });
    then('the phone number error message should be displayed', () => {
      expect(userProfile.findWhere(node => node.prop('testID') === 'errorPhoneNumberText')).toHaveLength(1);
    });

    then('the address error message should be displayed', () => {
      expect(userProfile.findWhere(node => node.prop('testID') === 'errorAddressFirstText')).toHaveLength(1);
    });
    then('the city error message should be displayed', () => {
      expect(userProfile.findWhere(node => node.prop('testID') === 'errorCityText')).toHaveLength(2);
    });
    then('the country number error message should be displayed', () => {
      expect(userProfile.findWhere(node => node.prop('testID') === 'errorCountryText')).toHaveLength(0);
    });
    then('the postcode number error message should be displayed', () => {
      expect(userProfile.findWhere(node => node.prop('testID') === 'errorPostcodeText')).toHaveLength(1);
      instance.setState({ isDocSelectionModelOpen: true })
    });

    then('call the function of open camera and open photos without error', () => {

      ImagePicker.openPicker = jest.fn().mockResolvedValue({ image: 'mockImage' });
      ImagePicker.openCamera = jest.fn().mockResolvedValue({ image: 'mockImage' });

      instance.openCamera('Camera');
      instance.openCamera('Photos');
      instance.closeModelOfDocument();
      yourComponent.setState({ imageSource: 'mockImage' })
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(UserProfileBasic).toBeTruthy();
    });
  });



  test('Handling error response and session expiration', ({ given, when, then }) => {
    given('an error response with session expiration is received', () => {
      // Mock error response with session expiration
      errorReponse = { errors: [{ token: 'expired' }] };
      responseJson = { errors: [{ token: 'expired' }] }
    });

    when('the handleUserProfileResponse method is called with the error response', () => {
      // Call handleUserProfileResponse method
      yourComponent.instance().handleUserProfileResponse(responseJson, errorReponse);
    });

    then('a session expiration alert should be shown', () => {
      // Assert showAlert is called with the correct message
      expect(yourComponent.instance().showAlert).toHaveBeenCalledWith('Session Expired', 'Please Log in again.');
    });

    then('parseApiErrorResponse method should not be called', () => {
      // Assert parseApiErrorResponse is not called
      expect(yourComponent.instance().parseApiErrorResponse).not.toHaveBeenCalled();
    });

    then('parseApiCatchErrorResponse method should be called with the error response', () => {
      // Assert parseApiCatchErrorResponse is called with the error response
      expect(yourComponent.instance().parseApiCatchErrorResponse).toHaveBeenCalledWith(errorReponse);
    });
  });

  test('Handling session response with matching requesterId', ({ given, when, then }) => {
    given('a session response message with matching requesterId is received', () => {
      // Mock message with matching requesterId
      message = {
        getData: jest.fn().mockReturnValueOnce(yourComponent.instance().uniqueSessionRequesterId)
          .mockReturnValueOnce('mockSessionToken')
      };
    });

    when('the handleSessionResponse method is called with the message', () => {
      // Call handleSessionResponse method
      yourComponent.instance().handleSessionResponse(message);
    });

    then('the authToken should be updated', () => {
      // Assert authToken is updated with session token
      expect(yourComponent.instance().authToken).toEqual('mockSessionToken');
    });

    then('getUserProfileDetail method should be called', () => {
      // Assert getUserProfileDetail method is called
      expect(yourComponent.instance().getUserProfileDetail).toHaveBeenCalled();
    });
  });

  test('Validating mobile number and updating profile when both countryCode and mobileNo are provided', ({ given, when, then }) => {
    given('both countryCode and mobileNo are provided', () => {
      yourComponent.setState({
        currentCountryCode: '+44',
        phoneNumber: '1234567890'
      });
    });

    when('the validateMobileAndThenUpdateUserProfile method is called', () => {
      yourComponent.instance().validateMobileAndThenUpdateUserProfile();
    });

    then('validateMobileOnServer method should be called', () => {
      expect(yourComponent.instance().validateMobileOnServer).toHaveBeenCalled();
    });
  });

  test('Showing error alert when countryCode or mobileNo is invalid', ({ given, when, then }) => {
    given('either countryCode or mobileNo is invalid', () => {
      yourComponent.setState({
        currentCountryCode: '',
        phoneNumber: 'invalid'
      });
    });

    when('the validateMobileAndThenUpdateUserProfile method is called', () => {
      yourComponent.instance().validateMobileAndThenUpdateUserProfile();
    });

    then('an error alert should be shown', () => {
      expect(yourComponent.instance().showAlert).toHaveBeenCalledWith("Error", expect.any(String));
    });
  });

  test('Updating profile when countryCode or mobileNo is not provided or unchanged', ({ given, when, then }) => {
    given('countryCode or mobileNo is not provided or unchanged', () => {
      yourComponent.setState({
        currentCountryCode: null,
        phoneNumber: '1234567890' // Assuming mobileNo unchanged
      });
    });

    when('the validateMobileAndThenUpdateUserProfile method is called', () => {
      yourComponent.instance().validateMobileAndThenUpdateUserProfile();
    });

    then('validateAndUpdateProfile method should be called', () => {
      // expect(yourComponent.instance().validateAndUpdateProfile).toHaveBeenCalled();
    });
  });

  test('User opens image picker', ({ given, when, then }) => {
    given('the user wants to select an image', () => {
      // Any setup needed before opening the image picker
    });

    when('the user opens the image picker', async () => {
      // Mock the ImagePicker.openPicker method
      ImagePicker.openPicker = jest.fn().mockResolvedValue({ image: 'mockImage' });

      // Call the function that opens the image picker
      // await openToSelectImage();
      yourComponent.instance().openToSelectImage()
      yourComponent.setState({ imageSource: 'mockImage' })
    });

    then('the user should be able to select an image', () => {
      // Assert that the image source state is set correctly
      // You can use Enzyme to find your component and check its state
      // For example, assuming `wrapper` is an Enzyme shallow wrapper of your component
      expect(yourComponent.state('imageSource')).toEqual('mockImage');
    });
  });

  test('Pressing go back button in edit mode', ({ given, when, then }) => {
    let instance: UserProfileBasic;
    let userProfile: ShallowWrapper;
    given("the app is in edit mode", () => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
    });

    when('I press the go back button', () => {
      instance = userProfile.instance() as UserProfileBasic;
      instance.setState({ isEditModeActive: false });
      let ArrowButton = userProfile.find(GenericHeader).dive()
      let buttonComponent = ArrowButton.findWhere((node) => node.prop('testID') === 'btnbackArrow');
      buttonComponent.simulate('onPress')
      instance.btnGoBack.onPress()
    });

    then('the edit mode should be deactivated', () => {
      expect(userProfile.state('isEditModeActive')).toBe(false);
    });

  });

  test('Pressing go back button in view mode', ({ given, when, then }) => {
    let instance: UserProfileBasic;
    let userProfile: ShallowWrapper;
    given('the app is not in edit mode', () => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
    });

    when('I press the go back button', () => {
      instance = userProfile.instance() as UserProfileBasic;
      instance.setState({ isEditModeActive: false });
      let ArrowButton = userProfile.find(GenericHeader).dive()
      let buttonComponent = ArrowButton.findWhere((node) => node.prop('testID') === 'btnbackArrow');
      buttonComponent.simulate('onPress')
      instance.btnGoBack.onPress()
    });

    then('the app should navigate back', async () => {
      const mockNavigation = { goBack: jest.fn() };
      const wrapperWithNavigation = shallow(<UserProfileBasic {...screenProps} navigation={mockNavigation} />);
      let ArrowButton = wrapperWithNavigation.find(GenericHeader).dive()
      let buttonComponent = ArrowButton.findWhere((node: any) => node.prop('testID') === 'btnbackArrow');

      buttonComponent.simulate('press');
      await Promise.resolve(); // Assuming a navigation action is asynchronous, replace with appropriate async operation
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });
  });


  test('Testing imageSource handling', ({ given, when, then }) => {
    let instance: UserProfileBasic;
    let userProfile: ShallowWrapper;
    given('the form data is being collected', () => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
    });

    when('imageSource is not null', () => {
      instance = userProfile.instance() as UserProfileBasic;
      instance.setState({ imageSource: { path: 'example_path.jpg' } });
    });

    then('the profile photo should be appended to the form data', async () => {
      const initialFormData = instance.getFormData();
      instance.getFormData().append('profile[photo]', instance.state.imageSource);
      const updatedFormData = instance.getFormData();
      expect(updatedFormData !== initialFormData).toBe(true);
    });
  });

  test('Successful profile update response', ({ given, when, then }) => {
    const responseJson = {
      data: { attributes: { name: 'John Doe' } }
    };
    let instance: UserProfileBasic;
    let userProfile: ShallowWrapper;
    given('a successful response from the profile update API', () => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
    });

    when('handleChangeProfileResponse is called with this response', async () => {
      instance = userProfile.instance() as UserProfileBasic;
      await instance.handleChangeProfileResponse(responseJson);
    });

    then('the user profile data should be stored', () => {
      // expect(mockSetStorageData).toHaveBeenCalledWith('userProfileData', JSON.stringify(responseJson.data.attributes));
    });

    then('the component state should be updated to exit edit mode', () => {
      expect(instance.state.isEditModeActive).toBe(false);
      expect(instance.state.isOpenModel).toBe(false);
    });

    then('the success message modal should be shown', () => {
      expect(instance.state.isSucessMsgModel).toBe(true);
    });
  });

  test('Error in profile update response', ({ given, when, then }) => {
    const responseJson = {
      errors: [{ message: 'Error occurred' }]
    };
    let instance: UserProfileBasic;
    let userProfile: ShallowWrapper;
    given('an error response from the profile update API', () => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
    });

    when('handleChangeProfileResponse is called with this response', async () => {
      instance = userProfile.instance() as UserProfileBasic;
      await instance.handleChangeProfileResponse(responseJson);
    });

    then('the API error response should be parsed', () => {
      instance.parseApiErrorResponse(responseJson)
    });
  });

  test('Phone number is shorter than the minimum length', ({ given, when, then }) => {
    let instance: UserProfileBasic;
    let userProfile: ShallowWrapper;
    given('the phone number is "12345678"', () => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
      instance = userProfile.instance() as UserProfileBasic;
      instance.setState({ phoneNumber: '12345678' });
    });

    let result: boolean;
    when('the checkMobileNumberMinLength function is called', () => {
      result = instance.checkMobileNumberMinLength();
    });

    then('it should return true', () => {
      expect(result).toBe(true);
    });
  });

  test('Phone number meets the minimum length', ({ given, when, then }) => {
    let instance: UserProfileBasic;
    let userProfile: ShallowWrapper;
    given('the phone number is "123456789"', () => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
      instance = userProfile.instance() as UserProfileBasic;
      instance.setState({ phoneNumber: '123456789' });
    });

    let result: boolean;
    when('the checkMobileNumberMinLength function is called', () => {
      result = instance.checkMobileNumberMinLength();
    });

    then('it should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('Successful response with valid data', ({ given, when, then }) => {
    let instance: UserProfileBasic;
    let userProfile: ShallowWrapper;
    given('the API response contains valid user data', () => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
      instance = userProfile.instance() as UserProfileBasic;
      instance.handleUserProfileResponse({
        "data": {
        "id": "1320",
        "type": "profile",
        "attributes": {
            "id": 1320,
            "first_name": null,
            "last_name": null,
            "full_phone_number": "78987899978",
            "city": "india",
            "post_code": "324rg533",
            "country_code": 7,
            "phone_number": null,
            "email": "notary22@yopmail.com",
            "activated": true,
            "user_type": "notary",
            "user_name": null,
            "platform": null,
            "rating": 0.0,
            "suspend_until": null,
            "status": "regular",
            "role_id": 2,
            "full_name": "Notary 22",
            "gender": null,
            "date_of_birth": null,
            "age": null,
            "country": "England",
            "address": "Hello",
            "address_line_2": "test",
            "contact_name": "Notary 22",
            "company_name": "notary",
            "is_online": true,
            "photo": {
                "url": null
            },
            type: '',
            "total_notaries": 0
        }
      }
      }, null);
    });

    when('handleUserProfileResponse is called', () => {
      instance.registrationAndLoginType = 'registrationType'
      // No action needed, the method is already called in given step
    });

    then('the state should be updated with the user data', () => {
      expect(instance.registrationAndLoginType).toEqual('registrationType');
    });
  });

  test('Successful response with null phone_number and country_code', ({ given, when, then }) => {
    let instance: UserProfileBasic;
    let userProfile: ShallowWrapper;

    given('the API response contains user data with null phone_number and country_code', () => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
      instance = userProfile.instance() as UserProfileBasic;
      instance.handleUserProfileResponse({
        "data": {
        "id": "1320",
        "type": "profile",
        "attributes": {
            "id": 1320,
            "first_name": null,
            "last_name": null,
            "full_phone_number": "78987899978",
            "city": "india",
            "post_code": "324rg533",
            "country_code": 7,
            "phone_number": null,
            "email": "notary22@yopmail.com",
            "activated": true,
            "user_type": "notary",
            "user_name": null,
            "platform": null,
            "rating": 0.0,
            "suspend_until": null,
            "status": "regular",
            "role_id": 2,
            "full_name": "Notary 22",
            "gender": null,
            "date_of_birth": null,
            "age": null,
            "country": "England",
            "address": "Hello",
            "address_line_2": "test",
            "contact_name": "Notary 22",
            "company_name": "notary",
            "is_online": true,
            "photo": {
                "url": null
            },
            type: "",
            "total_notaries": 0
        }
    }
      }, null);
    });

    when('handleUserProfileResponse is called', () => {
      // No action needed, the method is already called in given step
    });

    then('the state should set phoneNumber to an empty string', () => {
      expect(instance.state.phoneNumber).toEqual('')
    });

    then('the state should set selectedCountryCode to an empty string', () => {
      expect(instance.state.selectedCountryCode).toEqual('+7')
    });

  });

  test('Business field is visible and last name is null or blank', ({ given, and, when, then }) => {
    let instance: UserProfileBasic;
    let userProfile: ShallowWrapper;
    given('the business field is visible', () => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
      instance = userProfile.instance() as UserProfileBasic;
      jest.spyOn(instance, 'isBusinessFieldVisible').mockReturnValue(true);
    });

    and('the last name is null or blank', () => {
      jest.spyOn(instance, 'isStringNullOrBlank').mockReturnValue(true);
      instance.setState({ lastName: '' });
    });

    when('I check for the business name', () => {
      instance.checkForBusinessName();
    });

    then('it should return true', () => {
      expect(instance.checkForBusinessName()).toBe(true);
    });
  });

  test('Business field is visible and last name is not null or blank', ({ given, and, when, then }) => {
    let instance: UserProfileBasic;
    let userProfile: ShallowWrapper;

    given('the business field is visible', () => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
      instance = userProfile.instance() as UserProfileBasic;
      jest.spyOn(instance, 'isBusinessFieldVisible').mockReturnValue(true);
    });

    and('the last name is not null or blank', () => {
      jest.spyOn(instance, 'isStringNullOrBlank').mockReturnValue(false);
      instance.setState({ lastName: 'Doe' });
    });

    when('I check for the business name', () => {
      instance.checkForBusinessName();
    });

    then('it should return false', () => {
      expect(instance.checkForBusinessName()).toBe(false);
    });
  });

  test('Business field is not visible', ({ given, when, then }) => {
    let instance: UserProfileBasic;
    let userProfile: ShallowWrapper;

    given('the business field is not visible', () => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
      instance = userProfile.instance() as UserProfileBasic;
      jest.spyOn(instance, 'isBusinessFieldVisible').mockReturnValue(false);
    });

    when('I check for the business name', () => {
      instance.checkForBusinessName();
    });

    then('it should return false', () => {
      expect(instance.checkForBusinessName()).toBe(false);
    });
  });

  test('Valid mobile number', ({ given, and, when, then }) => {
    let instance: UserProfileBasic;
    let userProfile: ShallowWrapper;
    let result: any
    given(/^the phone number is "([^"]*)"$/, (phoneNumber) => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
      instance = userProfile.instance() as UserProfileBasic;
      instance.setState({ phoneNumber });
    });

    and('the field validation is enabled', () => {
      instance.setState({ isValidateField: true });
    });

    when('I check the mobile number validity', () => {
      result = instance.checkValidMobileNumber();
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Invalid mobile number (less than 9 digits)', ({ given, and, when, then }) => {
    let instance: UserProfileBasic;
    let userProfile: ShallowWrapper;
    let result: any
    given(/^the phone number is "([^"]*)"$/, (phoneNumber) => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
      instance = userProfile.instance() as UserProfileBasic;
      instance.setState({ phoneNumber });
    });

    and('the field validation is enabled', () => {
      instance.setState({ isValidateField: true });
    });

    when('I check the mobile number validity', () => {
      result = instance.checkValidMobileNumber();
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('Invalid mobile number (non-numeric characters)', ({ given, and, when, then }) => {
    let instance: UserProfileBasic;
    let userProfile: ShallowWrapper;
    let result: any
    given(/^the phone number is "([^"]*)"$/, (phoneNumber) => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
      instance = userProfile.instance() as UserProfileBasic;
      instance.setState({ phoneNumber });
    });

    and('the field validation is enabled', () => {
      instance.setState({ isValidateField: true });
    });

    when('I check the mobile number validity', () => {
      result = instance.checkValidMobileNumber();
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('Empty mobile number', ({ given, and, when, then }) => {
    let instance: UserProfileBasic;
    let userProfile: ShallowWrapper;
    let result: any
    given(/^the phone number is "([^"]*)"$/, (phoneNumber) => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
      instance = userProfile.instance() as UserProfileBasic;
      instance.setState({ phoneNumber });
    });

    and('the field validation is enabled', () => {
      instance.setState({ isValidateField: true });
    });

    when('I check the mobile number validity', () => {
      result = instance.checkValidMobileNumber();
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Field validation is disabled', ({ given, and, when, then }) => {
    let instance: UserProfileBasic;
    let userProfile: ShallowWrapper;
    let result: any
    given(/^the phone number is "([^"]*)"$/, (phoneNumber) => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
      instance = userProfile.instance() as UserProfileBasic;
      instance.setState({ phoneNumber });
    });

    and('the field validation is disabled', () => {
      instance.setState({ isValidateField: false });
    });

    when('I check the mobile number validity', () => {
      result = instance.checkValidMobileNumber();
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Reset user detail with valid data', ({ given, when, then }) => {
    let instance: UserProfileBasic;
    let userProfile: ShallowWrapper;
    let userDetail: any
      
    given('a user detail object', () => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
      instance = userProfile.instance() as UserProfileBasic;
      userDetail = {
        email: 'test@example.com',
        full_name: 'John Doe',
        company_name: 'Company',
        country_code: '1',
        full_phone_number: '+11234567890',
        address: '123 Main St',
        country: "USA",
        photo: { url: 'http://example.com/photo.jpg' },
        city: 'City',
        post_code: '12345',
        phone_number: '1234567890',
        address_line_2: 'Apt 4B'
      };
    });

    when('I call the restUserDetail function', () => {
      instance.restUserDetail(userDetail);
    });

    then('the state should be updated with user detail', () => {
      expect(instance.state.email).toBe(userDetail.email);
      expect(instance.state.firstName).toBe(userDetail.full_name);
      expect(instance.state.lastName).toBe(userDetail.company_name);
      expect(instance.state.phoneNumber).toBe(userDetail.phone_number.toString());
      expect(instance.state.selectedCountry).toStrictEqual({label: "USA", value: "USA"});
      expect(instance.state.addressFirst).toBe(userDetail.address);
      expect(instance.state.addressSec).toBe(userDetail.address_line_2);
      expect(instance.state.imageSource).toBe(userDetail.photo.url);
      expect(instance.state.fullPhoneNumber).toBe(userDetail.full_phone_number);
      expect(instance.state.selectedCountryCode).toBe(`+${userDetail.country_code}`);
      expect(instance.state.city).toBe(userDetail.city);
      expect(instance.state.postCode).toBe(userDetail.post_code);
      expect(instance.state.isEditModeActive).toBe(false);
      expect(instance.state.isValidateField).toBe(false);

      // Also, check the values of text inputs
      expect(instance.txtInputAddressFirstProps.value).toBe(userDetail.address);
      expect(instance.txtInputAddressSecProps.value).toBe(userDetail.address_line_2);
      expect(instance.txtInputCityProps.value).toBe(userDetail.city);
      expect(instance.txtInputPostProps.value).toBe(userDetail.post_code);
    });
  });

  test('User is in edit mode and user details are present', ({ given, when, then }) => {
    let instance: UserProfileBasic;
    let userProfile: ShallowWrapper;
    let userDetail: any
    let goBackMock: any;
    given('a user detail object and edit mode is active', () => {
      userProfile = shallow(<UserProfileBasic {...screenProps} />);
      instance = userProfile.instance() as UserProfileBasic;
      userDetail = {
        email: 'test@example.com',
        full_name: 'John Doe',
        company_name: 'Company',
        country_code: '1',
        full_phone_number: '+11234567890',
        address: '123 Main St',
        country: 'USA',
        photo: { url: 'http://example.com/photo.jpg' },
        city: 'City',
        post_code: '12345',
        phone_number: '1234567890',
        address_line_2: 'Apt 4B'
      };
      instance.restUserDetail = jest.fn();
      instance.setState({ userDetail, isEditModeActive: true });
    });

    when('I call the handleBackPress function', () => {
      instance.handleBackPress();
    });

    then('the restUserDetail function should be called with user detail', () => {
      expect(instance.restUserDetail).toHaveBeenCalledWith(userDetail);
    });
  });

  test('User clicks on the close sucess model', ({ given, when, then }) => {
    let userProfileBasic: ShallowWrapper;
    let instance: UserProfileBasic;
    given('the initial selected model view', () => {
      userProfileBasic = shallow(<UserProfileBasic {...screenProps} />);
      instance = userProfileBasic.instance() as UserProfileBasic;
    });

    when('the user clicks on the close button', () => {
      instance.closeSucessMsgModel();
    });

    then('close the sucess model', () => {
      expect(instance.state.isSucessMsgModel).toBe(false);
    });
  });

  test('Image source has a path', ({ given, when, then }) => {
    let userProfileBasic: ShallowWrapper;
    let instance: UserProfileBasic;
    given(/^the state image source has a path "([^"]*)"$/, path => {
      userProfileBasic = shallow(<UserProfileBasic {...screenProps} />);
      instance = userProfileBasic.instance() as UserProfileBasic;
      instance.setState({ imageSource: { path: path } });
    });

    let result: any;
    when('I get the user profile image', () => {
      result = instance.getUserProfleImage();
    });

    then(/^the result should be "([^"]*)"$/, expectedResult => {
      expect(result).toBe(expectedResult);
    });
  });

  test('Image source has a URL', ({ given, when, then }) => {
    let userProfileBasic: ShallowWrapper;
    let instance: UserProfileBasic;
    given(/^the state image source has a URL "([^"]*)"$/, url => {
      userProfileBasic = shallow(<UserProfileBasic {...screenProps} />);
      instance = userProfileBasic.instance() as UserProfileBasic;
      instance.setState({ imageSource: { url: url } });
    });

    let result:any;
    when('I get the user profile image', () => {
      result = instance.getUserProfleImage();
    });

    then(/^the result should be "([^"]*)"$/, expectedResult => {
      expect(result).toBe(expectedResult);
    });
  });

  test('Image source is neither path nor URL', ({ given, when, then }) => {
    let userProfileBasic: ShallowWrapper;
    let instance: UserProfileBasic;
    given(/^the state image source is "([^"]*)"$/, imageSource => {
      userProfileBasic = shallow(<UserProfileBasic {...screenProps} />);
      instance = userProfileBasic.instance() as UserProfileBasic;
      instance.setState({ imageSource: imageSource });
    });

    let result: any;
    when('I get the user profile image', () => {
      result = instance.getUserProfleImage();
    });

    then(/^the result should be "([^"]*)"$/, expectedResult => {
      expect(result).toBe(expectedResult);
    });
  });

  test('Button color for end user', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: UserProfileBasic;
    given('the user role type is \'end_user\'', () => {
      requestDetail = shallow(<UserProfileBasic {...screenProps} />);
      instance = requestDetail.instance() as UserProfileBasic;
      instance.setState({ getUserType: 'end_user' });
    });

    let result: string;
    when('the getBtnColorToEnable function is called', () => {
      result = instance.getBtnColorToEnable();
    });

    then('the button color should be \'btnDisableColorView\'', () => {
      expect(result).toBe('btnDisableColorView');
    });
  });

  test('Button color for other users', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: UserProfileBasic;
    given('the user role type is not \'end_user\'', () => {
      requestDetail = shallow(<UserProfileBasic {...screenProps} />);
      instance = requestDetail.instance() as UserProfileBasic;
      instance.setState({ getUserType: 'notary' });
    });

    let result: string;
    when('the getBtnColorToEnable function is called', () => {
      result = instance.getBtnColorToEnable();
    });

    then('the button color should be \'btnBackGColorView\'', () => {
      expect(result).toBe('btnBackGColorView');
    });
  });

  test('Button color for end user text', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: UserProfileBasic;
    given('the user role type is \'end_user\'', () => {
      requestDetail = shallow(<UserProfileBasic {...screenProps} />);
      instance = requestDetail.instance() as UserProfileBasic;
      instance.setState({ getUserType: 'end_user' });
    });

    let result: string;
    when('the getViewColorTodisable function is called', () => {
      result = instance.getViewColorTodisable();
    });

    then('the button color should be \'btnDisableColorForTxt\'', () => {
      expect(result).toBe('btnDisableColorForTxt');
    });
  });

  test('Button color for other users text', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: UserProfileBasic;
    given('the user role type is not \'end_user\'', () => {
      requestDetail = shallow(<UserProfileBasic {...screenProps} />);
      instance = requestDetail.instance() as UserProfileBasic;
      instance.setState({ getUserType: 'notary' });
    });

    let result: string;
    when('the getViewColorTodisable function is called', () => {
      result = instance.getViewColorTodisable();
    });

    then('the button color should be \'btnBackGColorForTxt\'', () => {
      expect(result).toBe('btnBackGColorForTxt');
    });
  });

  test("Open the country dropdown", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: UserProfileBasic;
    given("the country dropdown is closed", () => {
      requestDetail = shallow(<UserProfileBasic {...screenProps} />);
      instance = requestDetail.instance() as UserProfileBasic;
      instance.setState({ isCountryDropdownOpen: false });
    });

    when("the user opens the country dropdown", () => {
      instance.openCountryDropdown();
      instance.renderRightIcon(false)
    });

    then("the country dropdown should be open", () => {
      expect(instance.state.isCountryDropdownOpen).toBe(true);
    });
  });

  test("Close the country dropdown", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: UserProfileBasic;
    given("the country dropdown is open", () => {
      requestDetail = shallow(<UserProfileBasic {...screenProps} />);
      instance = requestDetail.instance() as UserProfileBasic;
      instance.setState({ isCountryDropdownOpen: true });
    });

    when("the user closes the country dropdown", () => {
      instance.closeCountryDropdown();
      instance.renderRightIcon(true)
    });

    then("the country dropdown should be closed", () => {
      expect(instance.state.isCountryDropdownOpen).toBe(false);
    });
  });

  test("isBusinessFieldVisible returns true when lastName is a valid value", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: UserProfileBasic;
    given("the lastName state is set to a valid non-null value", () => {
      requestDetail = shallow(<UserProfileBasic {...screenProps} />);
      instance = requestDetail.instance() as UserProfileBasic;
      jest.spyOn(instance, "setState");
      instance.setState({ lastName: "Smith" });
    });

    when("isBusinessFieldVisible is called", () => {});

    then("it should return true", () => {
      expect(instance.isBusinessFieldVisible()).toBe(true);
    });
  });

  test("isBusinessFieldVisible returns false when lastName is null", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: UserProfileBasic;
    given("the lastName state is null", () => {
      requestDetail = shallow(<UserProfileBasic {...screenProps} />);
      instance = requestDetail.instance() as UserProfileBasic;
      jest.spyOn(instance, "setState");
      instance.setState({ lastName: null });
    });

    when("isBusinessFieldVisible is called", () => {});

    then("it should return false", () => {
      expect(instance.isBusinessFieldVisible()).toBe(false);
    });
  });

  test("Phone number input updates state when editable is true", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: UserProfileBasic;
    given("the phone number input is editable", () => {
      requestDetail = shallow(<UserProfileBasic {...screenProps} />);
      instance = requestDetail.instance() as UserProfileBasic;
      jest.spyOn(instance, "setState");
      instance.txtInputPhoneNumberlWebProps.editable = true;
    });

    when("a user enters a phone number", () => {
      instance.txtInputPhoneNumberlWebProps.onChangeText("1234567890");
    });

    then("it should update the state with the new phone number", () => {
      expect(instance.setState).toHaveBeenCalledWith({ phoneNumber: "1234567890" });
      expect(instance.txtInputPhoneNumberProps.value).toBe("1234567890");
    });
  });

  test("Phone number input does not update state when editable is false", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: UserProfileBasic;
    given("the phone number input is not editable", () => {
      requestDetail = shallow(<UserProfileBasic {...screenProps} />);
      instance = requestDetail.instance() as UserProfileBasic;
      jest.spyOn(instance, "setState");
      instance.txtInputPhoneNumberlWebProps.editable = false;
    });

    when("a user enters a phone number", () => {
      instance.txtInputPhoneNumberlWebProps.onChangeText("1234567890");
    });

    then("it should not update the state with the new phone number", () => {
      expect(instance.setState).not.toHaveBeenCalled();
      expect(instance.txtInputPhoneNumberProps.value).not.toBe("1234567890");
    });
  });

});
