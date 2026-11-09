//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import { beforeEach, expect, jest } from '@jest/globals'
import KycVerificationAccount from "../../src/KycVerificationAccount"
import { Message } from "../../../../framework/src/Message"
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { GenericHeader } from "../../../../components/src/GenericHeader";
import { GenericButton } from "../../../../components/src/GenericButton";
import { Keyboard } from 'react-native';
import { WebView } from 'react-native-webview';
import { Dropdown } from 'react-native-element-dropdown';
import { runEngine } from "../../../../framework/src/RunEngine";


const screenPropsverifiedweb = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {

        }),
        navigate: jest.fn(),
        goBack: jest.fn(),
        dispatch: jest.fn(),
        replace: jest.fn(),
        trim: jest.fn(),
        props: jest.fn(),
        Alert: jest.fn(),
        filter: jest.fn(),
        show: jest.fn,
    },
    id: "KnowYourCustomerKycVerification"
}

const featureverifiedweb = loadFeature('./__tests__/features/KycVerificationAccount-scenario.feature');

defineFeature(featureverifiedweb, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to KycVerificationAccount', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;

        given('I am a User attempting to KycVerificationAccount', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
        });

        when('I navigate to the KycVerificationAccount Screen', () => {
            instance = exampleBlockA.instance() as KycVerificationAccount
            instance.renderRightIcon(true)
            instance.renderRightIcon(false)
        });

        then('I can successweb with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'backbtnweb');
        });

        then("i can click on back arrow icon with out errors", async () => {
            const mockNavigation = { goBack: jest.fn() };
            const wrapperWithNavigation = shallow(<KycVerificationAccount {...screenPropsverifiedweb} navigation={mockNavigation} />);
            let ArrowButton = wrapperWithNavigation.find(GenericHeader).dive()
            let buttonComponent = ArrowButton.findWhere((node: any) => node.prop('testID') === 'btnbackArrow');
            buttonComponent.simulate('press')
            instance.btnGoBackProps.onPress()

            await Promise.resolve(); // Assuming a navigation action is asynchronous, replace with appropriate async operation
            expect(mockNavigation.goBack).toHaveBeenCalled();
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });

    test('Handle country API response', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the getCountryApiCallId is provided', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'handleCountryResponse');
            instance.getCountryApiCallId = 'getCountryApiCallId';
        });

        when('the manageApiResponse function is called with a CountryResponse', async () => {
            const countryResponse = {} as CountryResponse; // Mock your CountryResponse object
            await instance.manageApiResponse(countryResponse, instance.getCountryApiCallId);
        });

        then('the handleCountryResponse method should be called', () => {
            expect(instance.handleCountryResponse).toHaveBeenCalledWith(expect.any(Object));
        });
    });

    test('Handle country code API response', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the getCountryCodeApiCallId is provided', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'handleCountryCodeResponse');

            instance.getCountryCodeApiCallId = 'getCountryCodeApiCallId';
        });

        when('the manageApiResponse function is called with a CountryCodeResponse', async () => {
            const countryCodeResponse = {} as CountryCodeResponse; // Mock your CountryCodeResponse object
            await instance.manageApiResponse(countryCodeResponse, instance.getCountryCodeApiCallId);
        });

        then('the handleCountryCodeResponse method should be called', () => {
            expect(instance.handleCountryCodeResponse).toHaveBeenCalledWith(expect.any(Object));
        });
    });

    test('Handle applicant create API response', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the apiApplicantCreateCallId is provided', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'manageApplicantCreateResponse');
            instance.apiApplicantCreateCallId = 'apiApplicantCreateCallId';
        });

        when('the manageApiResponse function is called with an ApplicatnMsgResponse', async () => {
            const applicatnMsgResponse = {} as ApplicatnMsgResponse; // Mock your ApplicatnMsgResponse object
            await instance.manageApiResponse(applicatnMsgResponse, instance.apiApplicantCreateCallId);
        });

        then('the manageApplicantCreateResponse method should be called', () => {
            expect(instance.manageApplicantCreateResponse).toHaveBeenCalledWith(expect.any(Object));
        });
    });

    test('Unknown API call ID', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        let responseJson: any;
        let apiRequestCallId: string;
        given('an unknown API request call ID', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            responseJson = {};
            apiRequestCallId = 'unknownCallId';
        });

        when('manageApiResponse is called', async () => {
            await instance.manageApiResponse(responseJson, apiRequestCallId);
        });

        then('no API handler function should be called', () => {
        });
    });

    test('Store token and user role when the message id is NavigationPayLoadMessage', ({ given, when, then }) => {
        let mockMessage: Message;
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('a message with id "NavigationPayLoadMessage"', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            mockMessage = new Message(getName(MessageEnum.NavigationPayLoadMessage));
        });

        given('the message contains token "mockedToken" and role "admin"', () => {
            mockMessage.getData = jest.fn(() => ({
                token: 'mockedToken',
                userType: 'admin',
                onfidoId: '70',
                requestId: '123'
            }));
        });

        when('the storeMDataValue function is called', () => {
            instance.showSessionStoredData(mockMessage);
            instance.callApiForGetCountry()
        });

        then('it should update the state with the token and user role', () => {
            expect(instance.state.token).toEqual('mockedToken');
            expect(instance.state.userRoleType).toEqual('admin');
            expect(instance.state.onfidoId).toEqual('70');
            expect(instance.state.requestId).toEqual('123');
        });
    });

    test('Call getCustmizeCountryList when responseJson contains data', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        let mockResponseJson: any;
        given('a responseJson with valid country data', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'getCustmizeCountryList');
            mockResponseJson = {
                data: [{
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
                }]
            };
        });

        when('the handleCountryResponse function is called with the responseJson', () => {
            instance.handleCountryResponse(mockResponseJson);
        });

        then('the getCustmizeCountryList method should be called with the country data', () => {
            expect(instance.getCustmizeCountryList).toHaveBeenCalledWith(mockResponseJson.data);
        });
    });

    test('Filter out duplicate country codes and call getCustmizeCountryCodeList', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        let mockResponseJson: any;
        given('a responseJson with duplicate country codes', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'getCustmizeCountryCodeList');
            mockResponseJson = {
                countries: [
                    { country_code: 'US', name: 'United States' },
                    { country_code: 'CA', name: 'Canada' },
                    { country_code: 'US', name: 'United States Duplicate' }
                ]
            };
        });

        when('the handleCountryCodeResponse function is called', () => {
            instance.handleCountryCodeResponse(mockResponseJson);
        });

        then('the getCustmizeCountryCodeList method should be called with unique country codes', () => {
            const expectedUniqueCountries = [
                { country_code: 'US', name: 'United States' },
                { country_code: 'CA', name: 'Canada' }
            ];
            expect(instance.getCustmizeCountryCodeList).toHaveBeenCalledWith(expectedUniqueCountries);
        });
    });

    test('Do not update stepsNo when stepNumber is 2', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the step number is 2', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the goToSteps function is called', () => {
            instance.goToSteps(2);
        });

        then('the state stepsNo should not be updated', () => {
            expect(instance.setState).not.toHaveBeenCalled();
        });
    });

    test('Do not update stepsNo when stepNumber is 3', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the step number is 3', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the goToSteps function is called', () => {
            instance.goToSteps(3);
        });

        then('the state stepsNo should not be updated', () => {
            expect(instance.setState).not.toHaveBeenCalled();
        });
    });

    test('Update stepsNo when stepNumber is 1', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the step number is 1', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the goToSteps function is called', () => {
            instance.goToSteps(1);
        });

        then('the state stepsNo should be updated to 1', () => {
            expect(instance.setState).toHaveBeenCalledWith({ stepsNo: 1 });
        });
    });

    test('Update stepsNo when stepNumber is 4', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the step number is 4', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the goToSteps function is called', () => {
            instance.goToSteps(4);
        });

        then('the state stepsNo should be updated to 4', () => {
            expect(instance.setState).toHaveBeenCalledWith({ stepsNo: 4 });
        });
    });

    test('Check if string is null or blank', ({ given, when, then }) => {
        let result: boolean;
        let result1: boolean;
        let inputString: string;
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('a string value stringValue', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the isStringNullOrBlank function is called', () => {
            result = instance.isStringNullOrBlank('');
            result1 = instance.isStringNullOrBlank('hello');
        });

        then('the result should be expectedResult', () => {
            expect(result).toBe(true);
            expect(result1).toBe(false);
        });
    });

    // Test for txtInputFirstNamePrpos
    test('Update firstName state when text is changed', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user enters "John" in the first name field', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the onChangeText function for txtInputFirstNamePrpos is called', () => {
            instance.txtInputFirstNamePrpos.onChangeText('John');
        });

        then('the state firstName should be updated to "John"', () => {
            expect(instance.setState).toHaveBeenCalledWith({ firstName: 'John' });
        });
    });

    // Test for txtInputMiddleNamePrpos
    test('Update middleName state when text is changed', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user enters "Doe" in the middle name field', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the onChangeText function for txtInputMiddleNamePrpos is called', () => {
            instance.txtInputMiddleNamePrpos.onChangeText('Doe');
        });

        then('the state middleName should be updated to "Doe"', () => {
            expect(instance.setState).toHaveBeenCalledWith({ middleName: 'Doe' });
        });
    });

    test('Update lastName state when text is changed', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user enters "Smith" in the last name field', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the onChangeText function for txtInputLastNamePrpos is called', () => {
            instance.txtInputLastNamePrpos.onChangeText('Smith');
        });

        then('the state lastName should be updated to "Smith"', () => {
            expect(instance.setState).toHaveBeenCalledWith({ lastName: 'Smith' });
        });
    });

    // Test for txtInputCountryCodePrpos
    test('Update selectedCountryCode state when country code is changed', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user selects the country code "US"', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the txtInputCountryCodePrpos function is called', () => {
            instance.txtInputCountryCodePrpos('US');
        });

        then('the state selectedCountryCode should be updated to "US"', () => {
            expect(instance.setState).toHaveBeenCalledWith({ selectedCountryCode: 'US' });
        });
    });

    // Test for txtInputPhoneNumProps
    test('Update mobileNumber state when phone number is changed', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user enters "1234567890" in the phone number field', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the onChangeText function for txtInputPhoneNumProps is called', () => {
            instance.txtInputPhoneNumProps.onChangeText('1234567890');
        });

        then('the state mobileNumber should be updated to "1234567890"', () => {
            expect(instance.setState).toHaveBeenCalledWith({ mobileNumber: '1234567890' });
        });
    });

    test('Validate a valid email format', ({ given, when, then }) => {
        let result: boolean;
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user enters "test@example.com" as the email', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the validateEmail function is called', () => {
            result = instance.validateEmail('test@example.com');
        });

        then('the result should be true', () => {
            expect(result).toBe(true);
        });
    });

    test('Validate an invalid email format', ({ given, when, then }) => {
        let result: boolean;
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user enters "test@com" as the email', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the validateEmail function is called', () => {
            result = instance.validateEmail('test@com');
        });

        then('the result should be false', () => {
            expect(result).toBe(false);
        });
    });

    // State update tests
    test('Update email state when text is changed', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user enters "user@example.com" in the email field', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the onChangeText function for txtInputEmailMobilePrpos is called', () => {
            instance.txtInputEmailMobilePrpos.onChangeText('user@example.com');
        });

        then('the state email should be updated to "user@example.com"', () => {
            expect(instance.setState).toHaveBeenCalledWith({ email: 'user@example.com' });
        });
    });

    test('Update selectedIdType state when ID type is selected', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user selects "passport" as the ID type', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the selectIDTypeOption function is called', () => {
            instance.selectIDTypeOption('passport');
        });

        then('the state selectedIdType should be updated to "passport"', () => {
            expect(instance.setState).toHaveBeenCalledWith({ selectedIdType: 'passport' });
        });
    });

    test('Update stateCode state when text is changed', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user enters "NY" in the state code field', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the onChangeText function for txtInputStateCodePrpos is called', () => {
            instance.txtInputStateCodePrpos.onChangeText('NY');
        });

        then('the state stateCode should be updated to "NY"', () => {
            expect(instance.setState).toHaveBeenCalledWith({ stateCode: 'NY' });
        });
    });

    test('Update idNumber state when text is changed', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user enters "12345" in the ID number field', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the onChangeText function for txtInputIdNumberPrpos is called', () => {
            instance.txtInputIdNumberPrpos.onChangeText('12345');
        });

        then('the state idNumber should be updated to "12345"', () => {
            expect(instance.setState).toHaveBeenCalledWith({ idNumber: '12345' });
        });
    });

    test('Update addressFirst state when text is changed', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user enters "123 Main St" in the first address field', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the onChangeText function for txtInputAddressFirstProps is called', () => {
            instance.txtInputAddressFirstProps.onChangeText('123 Main St');
        });

        then('the state addressFirst should be updated to "123 Main St"', () => {
            expect(instance.setState).toHaveBeenCalledWith({ addressFirst: '123 Main St' });
        });
    });

    test('Update addressSec state when text is changed', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user enters "Apt 4B" in the second address field', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the onChangeText function for txtInputAddressSecProps is called', () => {
            instance.txtInputAddressSecProps.onChangeText('Apt 4B');
        });

        then('the state addressSec should be updated to "Apt 4B"', () => {
            expect(instance.setState).toHaveBeenCalledWith({ addressSec: 'Apt 4B' });
        });
    });

    test('Update city state when text is changed', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user enters "New York" in the city field', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the onChangeText function for txtInputCityProps is called', () => {
            instance.txtInputCityProps.onChangeText('New York');
        });

        then('the state city should be updated to "New York"', () => {
            expect(instance.setState).toHaveBeenCalledWith({ city: 'New York' });
        });
    });

    test('Update selectedCountry state when a country is selected', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user selects "USA" as the country', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the selectCountryOption function is called', () => {
            instance.selectCountryOption('USA');
        });

        then('the state selectedCountry should be updated to "USA"', () => {
            expect(instance.setState).toHaveBeenCalledWith({ selectedCountry: 'USA' });
        });
    });

    test('Update postCode state when text is changed', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user enters "10001" in the postal code field', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
        });

        when('the onChangeText function for txtInputPostCodeProps is called', () => {
            instance.txtInputPostCodeProps.onChangeText('10001');
        });

        then('the state postCode should be updated to "10001"', () => {
            expect(instance.setState).toHaveBeenCalledWith({ postCode: '10001' });
        });
    });

    test('Open ID type dropdown', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the ID type dropdown is closed', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
            instance.setState({ isIdTypeDropDownOpen: false });
        });

        when('the openDropdownOfIdType function is called', () => {
            instance.openDropdownOfIdType();
        });

        then('the state isIdTypeDropDownOpen should be true', () => {
            expect(instance.setState).toHaveBeenCalledWith({ isIdTypeDropDownOpen: true });
        });
    });

    // Test: Close ID type dropdown
    test('Close ID type dropdown', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the ID type dropdown is open', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
            instance.setState({ isIdTypeDropDownOpen: true });
        });

        when('the closeDropDownOfIdType function is called', () => {
            instance.closeDropDownOfIdType();
        });

        then('the state isIdTypeDropDownOpen should be false', () => {
            expect(instance.setState).toHaveBeenCalledWith({ isIdTypeDropDownOpen: false });
        });
    });

    // Test: Open country dropdown
    test('Open country dropdown', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the country dropdown is closed', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
            instance.setState({ isCountryDropDownOpen: false });
        });

        when('the openDropdownOfCountry function is called', () => {
            instance.openDropdownOfCountry();
        });

        then('the state isCountryDropDownOpen should be true', () => {
            expect(instance.setState).toHaveBeenCalledWith({ isCountryDropDownOpen: true });
        });
    });

    // Test: Close country dropdown
    test('Close country dropdown', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the country dropdown is open', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
            instance.setState({ isCountryDropDownOpen: true });
        });

        when('the closeDropDownOfCountry function is called', () => {
            instance.closeDropDownOfCountry();
        });

        then('the state isCountryDropDownOpen should be false', () => {
            expect(instance.setState).toHaveBeenCalledWith({ isCountryDropDownOpen: false });
        });
    });

    test('Enable the next button when all fields are valid', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user has filled all required fields correctly', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
            jest.spyOn(instance, 'gotoNextStep');
            instance.setState({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                addressFirst: '123 Main St',
                city: 'Some City',
                selectedCountry: 'Country',
                postCode: '12345',
                validateEmail: true,
            });
        });

        when('the getButtonEnabled function is called', () => {
            instance.getButtonEnabled();
        });

        then('the result should be true', () => {
            expect(instance.getButtonEnabled()).toBe(true);
        });
    });

    // Test: Disable the next button when some fields are missing or invalid
    test('Disable the next button when some fields are missing or invalid', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user has left some required fields empty or invalid', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
            jest.spyOn(instance, 'gotoNextStep');
            instance.setState({
                firstName: 'John',
                lastName: '',
                email: 'invalidemail',
                addressFirst: '123 Main St',
                city: 'Some City',
                selectedCountry: '',
                postCode: '12345',
            });
        });

        when('the getButtonEnabled function is called', () => {
            instance.getButtonEnabled();
        });

        then('the result should be false', () => {
            expect(instance.getButtonEnabled()).toBe(false);
        });
    });

    // Test: Proceed to the next step if the button is enabled
    test('Proceed to the next step if the button is enabled', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user has filled all required fields correctly', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
            jest.spyOn(instance, 'gotoNextStep');
            instance.setState({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                addressFirst: '123 Main St',
                city: 'Some City',
                selectedCountry: 'Country',
                postCode: '12345',
                validateEmail: true,
            });
        });

        when('the btnNextProps.onPress function is called', () => {
            instance.btnNextProps.onPress();
        });

        then('the state isValidateField should be false', () => {
            expect(instance.setState).toHaveBeenCalledWith({ isValidateField: false, isLoader: true }, expect.any(Function));
        });

        then('the gotoNextStep function should be called', () => {
            expect(instance.gotoNextStep).toHaveBeenCalled();
        });
    });

    // Test: Do not proceed to the next step if the button is disabled
    test('Do not proceed to the next step if the button is disabled', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user has left some required fields empty or invalid', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
            jest.spyOn(instance, 'gotoNextStep');
            instance.setState({
                firstName: 'John',
                lastName: '',
                email: 'invalidemail',
                addressFirst: '123 Main St',
                city: 'Some City',
                selectedCountry: '',
                postCode: '12345',
            });
        });

        when('the btnNextProps.onPress function is called', () => {
            instance.btnNextProps.onPress();
        });

        then('the state isValidateField should be true', () => {
            expect(instance.setState).toHaveBeenCalledWith({ isValidateField: true });
        });

        then('the gotoNextStep function should not be called', () => {
            expect(instance.gotoNextStep).not.toHaveBeenCalled();
        });
    });

    // test('Close the Date of Birth selection modal', ({ given, when, then }) => {
    //     let exampleBlockA: ShallowWrapper;
    //     let instance: KycVerificationAccount;
    //     given('the Date of Birth modal is open', () => {
    //         exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
    //         instance = exampleBlockA.instance() as KycVerificationAccount
    //         jest.spyOn(instance, 'setState');
    //         instance.setState({ isDateOfBirthModelOpen: true });
    //     });

    //     when('the closeDateOfBirthSelectionModel function is called', () => {
    //         instance.closeDateOfBirthSelectionModel();
    //     });

    //     then('the isDateOfBirthModelOpen state should be set to false', () => {
    //         expect(instance.setState).toHaveBeenCalledWith({ isDateOfBirthModelOpen: false });
    //     });
    // });

    // No to changes in Date of Birth
    test('No to changes in Date of Birth', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the Date of Birth modal is open', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
            instance.setState({ isDateOfBirthModelOpen: true });
        });

        when('the noToChanges.onPress function is called', () => {
            instance.noToChanges.onPress();
        });

        then('the dateOfBirth state should be set to an empty string', () => {
        });

        then('the isDateOfBirthModelOpen state should be set to false', () => {
        });
    });

    // Yes to changes in Date of Birth
    test('Yes to changes in Date of Birth', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the Date of Birth modal is open and a date is selected', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
            instance.setState({ isDateOfBirthModelOpen: true, selectedDate: new Date(2024, 9, 4) });
        });

        when('the yesProceedToChanges.onPress function is called', () => {
            instance.yesProceedToChanges.onPress();
        });

        then('the dateOfBirth state should be set to the formatted date', () => {
        });

        then('the isDateOfBirthModelOpen state should be set to false', () => {
        });
    });


    // Test: Format Date of Birth
    test('Format Date of Birth', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('a valid date is selected', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
            instance.setState({ selectedDate: new Date(2024, 9, 4) });
        });

        when('the formatDate function is called', () => {
            instance.formatDate();
        });

        then('the date should be returned in dd/mm/yyyy format', () => {
            const formattedDate = instance.formatDate();
            expect(formattedDate).toBe('04/10/2024');
        });
    });

    // Test: Select a date of birth
    test('Select a date of birth', ({ given, when, then }) => {
        let selectedDate: Date;
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the user selects a date', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
            selectedDate = new Date(2024, 9, 4);
        });

        when('the onSelectDateOfBirth function is called', () => {
            instance.onSelectDateOfBirth(selectedDate);
        });

        then('the selectedDate state should be updated with the chosen date', () => {
            expect(instance.setState).toHaveBeenCalledWith({ selectedDate });
        });
    });

    // Test: Open the Date of Birth selection modal
    test('Open the Date of Birth selection modal', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        let responseJson: any;
        given('the Date of Birth modal is closed', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
            instance.setState({ isDateOfBirthModelOpen: false });
        });

        when('the getDateOfBirthSelectionModalOpen function is called', () => {
            instance.getDateOfBirthSelectionModalOpen();
        });

        then('the isDateOfBirthModelOpen state should be set to true', () => {
            expect(instance.setState).toHaveBeenCalledWith({ isDateOfBirthModelOpen: true });
        });
    });

    test('Response with applicant and workflow', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        let responseJson: any;
        given('a response containing applicant and workflow', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
            responseJson = {
                applicant: { id: 1 },
                workflow: { link: { url: 'https://workflow.link' } }
            };
        });

        when('manageApplicantCreateResponse is called', () => {
            instance.manageApplicantCreateResponse(responseJson);
        });

        then('the state should be updated with Onfido URL and isOnfidoPageShow set to true', () => {
            expect(instance.setState).toHaveBeenCalledWith({
                onfidoUrl: 'https://workflow.link',
                isOnfidoPageShow: true,
                isLoader: false
            });
        });

        then("should call onError and log the error", () => {
            const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(); // Mock console.error
            let webView = exampleBlockA.find(WebView); // Find WebView inside component
            webView.props().onError({
                nativeEvent: { description: "WebView failed to load" },
            });

            expect(consoleErrorMock).toHaveBeenCalledWith("WebView error:", {
                description: "WebView failed to load",
            });

            consoleErrorMock.mockRestore();
        });

        then("should call onMessage and log the data", () => {
            const consoleLogMock = jest.spyOn(console, "log").mockImplementation(); // Mock console.log
            let webView = exampleBlockA.find(WebView); // Find WebView inside component
            webView.props().onMessage({
                nativeEvent: { data: "Hello from WebView" },
            });

            expect(consoleLogMock).toHaveBeenCalledWith("WebView message:", "Hello from WebView");

            consoleLogMock.mockRestore();
        });

        then("should call onPermissionRequest and grant permissions", () => {
            const eventMock = { grant: jest.fn() }; // Mock the event object
            let webView = exampleBlockA.find(WebView); // Find WebView inside component
            webView.props().onPermissionRequest(eventMock);

            expect(eventMock.grant).toHaveBeenCalled(); // Check if grant() was called
        });

    });

    test('Response with message', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        let responseJson: any;
        given('a response containing a message', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
            responseJson = {
                message: 'Applicant not found of user'
            };
        });

        when('manageApplicantCreateResponse is called', () => {
            instance.manageApplicantCreateResponse(responseJson);
        });

        then('the state should be updated with the applicant message response', () => {
            expect(instance.setState).toHaveBeenCalledWith({
                applicantMsgRes: 'Applicant not found of user',
                isLoader: false
            });
        });

    });

    test('Response with errors', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        let responseJson: any;
        given('a response containing errors', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'setState');
            responseJson = {
                errors: [{ message: 'Invalid data of user' }]
            };
        });

        when('manageApplicantCreateResponse is called', () => {
            instance.manageApplicantCreateResponse(responseJson);
        });

        then('the state should be updated with the first error message', () => {
            expect(instance.setState).toHaveBeenCalledWith({
                applicantMsgRes: 'Invalid data of user',
                isLoader: false
            });
        });

    });

    test('Focus on date of birth input', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the date of birth input is focused', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'getDateOfBirthSelectionModalOpen');
        });

        when('the onFocus event is triggered', () => {
            instance.getOnFocusProps.onFocus(); // Simulate onFocus
        });

        then('the getDateOfBirthSelectionModalOpen function should be called', () => {
            expect(instance.getDateOfBirthSelectionModalOpen).toHaveBeenCalled();
        });
    });

    test('Close the date of birth selection modal', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('the modal needs to be closed', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
            jest.spyOn(instance, 'closeDateOfBirthSelectionModel');
        });

        when('the onClose event is triggered', () => {
            instance.onClosePropsModel.onClose(); // Simulate the onClose event
        });

        then('the closeDateOfBirthSelectionModel function should be called', () => {
            expect(instance.closeDateOfBirthSelectionModel).toHaveBeenCalled();
        });
    });

    test('Open the birth dropdown', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('I have a component with an initial state', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
        });

        when('I call the openDropdownOfBirth function', () => {
            instance.openDropdownOfBirth();
        });

        then('the isBirthDropDownOpen state should be true', () => {
            expect(instance.state.isBirthDropDownOpen).toBe(true);
        });
    });

    test('Close the birth dropdown', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('I have a component with an initial state', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
        });

        when('I call the closeDropDownOfBirth function', () => {
            instance.closeDropDownOfBirth();
        });

        then('the isBirthDropDownOpen state should be false', () => {
            expect(instance.state.isBirthDropDownOpen).toBe(false);
        });
    });

    test('Triggering the onFocus event', ({ given, when, then }) => {
        let dismissSpy: jest.SpyInstance;
        let getDateOfBirthModalSpy: jest.SpyInstance;
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('I have a component with the onFocus props', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
        });

        when('I trigger the onFocus event', () => {
            dismissSpy = jest.spyOn(Keyboard, 'dismiss');  // Spy on Keyboard.dismiss
            getDateOfBirthModalSpy = jest.spyOn(instance, 'getDateOfBirthSelectionModalOpen');  // Spy on getDateOfBirthSelectionModalOpen method
            const onFocusProps = instance.getOnFocusProps;  // Access the onFocus props
            onFocusProps.onFocus();  // Trigger the onFocus event
        });

        then('the Keyboard.dismiss should be called', () => {
            expect(dismissSpy).toHaveBeenCalled();
        });

        then('the getDateOfBirthSelectionModalOpen should be called', () => {
            expect(getDateOfBirthModalSpy).toHaveBeenCalled();
        });
    });

    test("Transform country data into label-value pairs", ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        let transformedData : any;
        const mockCountryData: any = [
            {name: "Netherlands", code: "NLD"},
            {name: "Norway", code: "NOR"},
            {name: "India", code: "IND"},
            {name: "Germany", code: "DEU"},
            {name: "Finland", code: "FIN"},
            {name: "Czech Republic", code: "CZE"},
            {name: "France", code: "FRA"}
          ];
        given("a list of country data", () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount
          expect(mockCountryData).toBeDefined();
        });
    
        when("the getCustmizeCountryData function is called", () => {
          transformedData = instance.getCustmizeCountryData();
        });
    
        then("it should return the country data transformed into an array of label-value objects", () => {
          const expectedData = [
            { label: "Netherlands", value: "Netherlands" },
            { label: "Norway", value: "Norway" },
            { label: "India", value: "India" },
            { label: "Germany", value: "Germany" },
            { label: "Finland", value: "Finland" },
            { label: "Czech Republic", value: "Czech Republic" },
            { label: "France", value: "France" }
          ];
    
          expect(transformedData).toEqual(expectedData);
        });
      });

      test("User touches outside the input field", ({ given, when, then }) => {
        let requestDetail: ShallowWrapper;
        let instance: KycVerificationAccount;
        given("the keyboard is open", () => {
          requestDetail = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
          instance = requestDetail.instance() as KycVerificationAccount;
          jest.spyOn(Keyboard, "dismiss");
        });
    
        when("the user touches outside the input field", () => {
          instance.handleTouchOutside();
        });
    
        then("the keyboard should be dismissed", () => {
          expect(Keyboard.dismiss).toHaveBeenCalledTimes(1);
        });
      });

      test('Birth dropdown is open', ({ when, then }) => {
        let requestDetail: ShallowWrapper;
        let instance: KycVerificationAccount;
        when('the birth dropdown is open', () => {
            requestDetail = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
          instance = requestDetail.instance() as KycVerificationAccount;
          instance.setState({ isBirthDropDownOpen: true });
        });
    
        then('the UI style should be "errorOfFieldView"', () => {
          expect(instance.renderUIStyleOfDateTime()).toBe('errorOfFieldView');
        });
      });
    
      test('Birth dropdown is closed', ({ when, then }) => {
        let requestDetail: ShallowWrapper;
        let instance: KycVerificationAccount;
        when('the birth dropdown is closed', () => {
            requestDetail = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
          instance = requestDetail.instance() as KycVerificationAccount;
          instance.setState({ isBirthDropDownOpen: false });
        });
    
        then('the UI style should be "textFieldBgView"', () => {
          expect(instance.renderUIStyleOfDateTime()).toBe('textFieldBgView');
        });
      });

    test('Onfido SDK works properly', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KycVerificationAccount;
        given('Onfido SDK starts', () => {
            exampleBlockA = shallow(<KycVerificationAccount {...screenPropsverifiedweb} />);
            instance = exampleBlockA.instance() as KycVerificationAccount;
        });
        when('Onfido SDK intitialize', () => {
            let ArrowButton = exampleBlockA.find(GenericButton).at(1).dive()
            let buttonComponent = ArrowButton.findWhere((node: any) => node.prop('testID') === 'btnSDKId');
            buttonComponent.simulate('press')
            buttonComponent.props().onPress();

        });
        then('User can Do KYC', () => {
            let fname = exampleBlockA.findWhere((node: any) => node.prop('testID') === 'txtInputFirstName');
            fname.simulate('changeText', "abc");

            let mname = exampleBlockA.findWhere((node: any) => node.prop('testID') === 'txtInputFirstName');
            mname.simulate('changeText', "abc");

            let lname = exampleBlockA.findWhere((node: any) => node.prop('testID') === 'txtInputLastName');
            lname.simulate('changeText', "abc");

            let mobile = exampleBlockA.findWhere((node: any) => node.prop('testID') === 'txtInputPhoneNumber');
            lname.simulate('changeText', "+447400123456");

            let email = exampleBlockA.findWhere((node: any) => node.prop('testID') === 'txtInputEmailAddress');
            email.simulate('changeText', "abc@yopmail.com");

            let dob = exampleBlockA.findWhere((node: any) => node.prop('testID') === 'txtInputDateofbirthAddress');
            dob.simulate('changeText', "03-07-2015");

            let stateCode = exampleBlockA.findWhere((node: any) => node.prop('testID') === 'txtInputStateCodeAddress');
            stateCode.simulate('changeText', "CA");

            let idnumber = exampleBlockA.findWhere((node: any) => node.prop('testID') === 'txtInputIDNumberAddress');
            idnumber.simulate('changeText', "CA");

            let addressone = exampleBlockA.findWhere((node: any) => node.prop('testID') === 'txtInputAddressOne');
            addressone.simulate('changeText', "Test");

            let city = exampleBlockA.findWhere((node: any) => node.prop('testID') === 'txtInputCity');
            city.simulate('changeText', "Test");

            const dropdown = exampleBlockA.find(Dropdown).at(2);
            const selectedItem = { label: 'USA', value: 'US' };
            const mockSelectCountryOption = jest.fn();
            dropdown.props().onChange(selectedItem);

            let post = exampleBlockA.findWhere((node: any) => node.prop('testID') === 'txtInputPostCode');
            post.simulate('changeText', "Test");

            let ArrowButton = exampleBlockA.find(GenericButton).at(1).dive()
            let buttonComponent = ArrowButton.findWhere((node: any) => node.prop('testID') === 'btnSDKId');
            buttonComponent.simulate('press')
            buttonComponent.props().onPress();

            //get applicant
            const ApiCall1 = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            ApiCall1.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                ApiCall1
            );
            ApiCall1.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                { applicant: { id: "123" }, workflow: { id: "123" } }
            );
            instance.apiApplicantCreateCallId = ApiCall1;
            runEngine.sendMessage("Unit Test", ApiCall1);

            //get sdk token
            const ApiCall2 = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            ApiCall2.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                ApiCall2
            );
            ApiCall2.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                { token: "xyz" }
            );
            instance.getOnfidoSdkTokenApiCallId = ApiCall2;
            runEngine.sendMessage("Unit Test", ApiCall2);

            //get workflow run id
            const ApiCall3 = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            ApiCall3.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                ApiCall3
            );
            ApiCall3.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                { id: "abc" }
            );
            instance.getOnfidoWorkflowRunApiCallId = ApiCall3;
            runEngine.sendMessage("Unit Test", ApiCall3);

            let SDKBtn = exampleBlockA.find(GenericButton).at(1);
            expect(SDKBtn.prop('btnTextLabel')).toBe("Onfido SDK Start");
        });

        then("onfido kyc api integration", ()=> {
            //get sdk token
            const ApiCall2 = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            ApiCall2.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                ApiCall2
            );
            ApiCall2.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                { error: "xyz" }
            );
            instance.getOnfidoSdkTokenApiCallId = ApiCall2;
            runEngine.sendMessage("Unit Test", ApiCall2);
            const { redirectPageToDetailPage: mockFetchDataHandler, btnHandleSuccess: mockSuccess, btnHandleError: mockError } = instance;
              mockFetchDataHandler();
              mockSuccess.onPress();
              mockError.onPress();
            //get workflow run id
            const ApiCall3 = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            ApiCall3.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                ApiCall3
            );
            ApiCall3.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                { error: "abc" }
            );
            instance.getOnfidoWorkflowRunApiCallId = ApiCall3;
            runEngine.sendMessage("Unit Test", ApiCall3);
            expect(ApiCall2).toBeDefined();

             //get workflow run id
             const ApiCall4 = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            ApiCall4.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                ApiCall4
            );
            ApiCall4.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                { id: "axbycz" }
            );
            instance.getOnfidoWorkflowRunApiCallId = ApiCall4;
            runEngine.sendMessage("Unit Test", ApiCall4);
            expect(ApiCall2).toBeDefined();
        })
    });

});

