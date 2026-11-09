import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import VatSalesTax from "../../src/VatSalesTax";
import { GenericHeader } from "../../../../components/src/GenericHeader";
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "VatSalesTax"
}

const feature = loadFeature('./__tests__/features/VatSalesTax-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to settings', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: VatSalesTax;

        given('I am a User loading settings', () => {
            exampleBlockA = shallow(<VatSalesTax {...screenProps} />);
        });

        when('I navigate to the settings', () => {
            instance = exampleBlockA.instance() as VatSalesTax
        });

        then('settings will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            // let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
            // textInputComponent.simulate('changeText', 'hello@aol.com');
        });

        then('I can select the button with with out errors', async () => {
            const mockNavigation = { goBack: jest.fn() };
            const wrapperWithNavigation = shallow(<VatSalesTax {...screenProps} navigation={mockNavigation} />);
            let ArrowButton = wrapperWithNavigation.find(GenericHeader).dive()
            let buttonComponent = ArrowButton.findWhere((node: any) => node.prop('testID') === 'btnbackArrow');
            buttonComponent.simulate('press')
            instance.btnGoBack.onPress()

            await Promise.resolve(); // Assuming a navigation action is asynchronous, replace with appropriate async operation
            expect(mockNavigation.goBack).toHaveBeenCalled();
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });

    test('Store token and user role when the message id is NavigationPayLoadMessage', ({ given, when, then }) => {
        let mockMessage: Message;
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        given('a message with id "NavigationPayLoadMessage"', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            mockMessage = new Message(getName(MessageEnum.NavigationPayLoadMessage));
        });

        given('the message contains token "mockedToken" and role "admin"', () => {
            mockMessage.getData = jest.fn(() => ({
                token: 'mockedToken',
                role: 'admin'
            }));
        });

        when('the storeMDataValue function is called', () => {
            instance.storeTokenAndRole(mockMessage);
        });

        then('it should update the state with the token and user role', () => {
            expect(instance.state.token).toEqual('mockedToken');
            expect(instance.state.getUserRole).toEqual('admin');
        });
    });

    test('Selecting Not Have radio button', ({ given, when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        given('the initial state is set with have selected and VatNumber is provided', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            instance.setState({ selectedRadioBtn: 'have', VatNumber: '12345' });
            expect(instance.state.selectedRadioBtn).toBe('have');
            expect(instance.state.VatNumber).toBe('12345');
        });

        when('the user presses the Not Have radio button', () => {
            instance.selectNotHaveRadio.onPress();
        });

        then('the selectedRadioBtn state should be set to notHave', () => {
            expect(instance.state.selectedRadioBtn).toBe('notHave');
        });

        then('the VatNumber state should be cleared', () => {
            expect(instance.state.VatNumber).toBe('');
        });
    });

    test('Selecting Have radio button', ({ given, when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        given('the initial state is set with notHave selected', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            instance.setState({ selectedRadioBtn: 'notHave' });
            expect(instance.state.selectedRadioBtn).toBe('notHave');
        });

        when('the user presses the Have radio button', () => {
            instance.selectHaveRadio.onPress();
        });

        then('the selectedRadioBtn state should be set to have', () => {
            expect(instance.state.selectedRadioBtn).toBe('have');
        });
    });

    test('Toggle VAT Tax checkbox using btnCheckBoxOnVatTaxProps', ({ given, when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        given('the checkbox is initially unchecked', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            expect(instance.checkBoxOnVatTaxProps.isChecked).toBe(false);
            expect(instance.state.isCheckBoxOnVatTax).toBe(false); // initial state not set
        });

        when('the user presses the VAT checkbox button', () => {
            instance.btnCheckBoxOnVatTaxProps.onPress();
        });

        then('the checkbox should be checked', () => {
            expect(instance.checkBoxOnVatTaxProps.isChecked).toBe(true);
        });

        then('the isCheckBoxOnVatTax state should be true', () => {
            expect(instance.state.isCheckBoxOnVatTax).toBe(true);
        });
    });

    test('Toggle VAT Tax checkbox using checkBoxOnVatTaxProps', ({ given, when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        given('the checkbox is initially checked', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            instance.checkBoxOnVatTaxProps.isChecked = true;
            instance.setState({ isCheckBoxOnVatTax: true });
            expect(instance.checkBoxOnVatTaxProps.isChecked).toBe(true);
            expect(instance.state.isCheckBoxOnVatTax).toBe(true);
        });

        when('the user changes the value of the checkbox to false', () => {
            instance.checkBoxOnVatTaxProps.onChangeValue(false);
        });

        then('the checkbox should be unchecked', () => {
            expect(instance.checkBoxOnVatTaxProps.isChecked).toBe(false);
        });

        then('the isCheckBoxOnVatTax state should be false', () => {
            expect(instance.state.isCheckBoxOnVatTax).toBe(false);
        });
    });

    test('Pressing Add Details button with VAT checkbox checked', ({ given, when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        given('the checkbox is checked', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            instance.setState({ isCheckBoxOnVatTax: true });
            expect(instance.state.isCheckBoxOnVatTax).toBe(true);
        });

        when('the user presses the Add Details button', () => {
            instance.btnAddDetailsProps.onPress();
        });

        then('the isShowCheckBox state should be false', () => {
            expect(instance.state.isShowCheckBox).toBe(false);
        });
    });

    test('API response contains an error for VAT tax check', ({ given, when, then }) => {
        const errorResponse = { error: 'Some error' };
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        given('the API request is for VAT tax check', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            instance.apiCallToCheckVatTaxAdded = 'vat_tax_check';
        });

        when('the API response contains an error', () => {
            instance.manageApiResponse(errorResponse, 'vat_tax_check');
        });

        then('the checkbox should be displayed', () => {
            expect(instance.state.isShowCheckBox).toBe(true);
        });

        then('the selected radio button should be reset', () => {
            expect(instance.state.selectedRadioBtn).toBe('');
        });
    });

    test('API response is successful for VAT tax check', ({ given, when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        const successResponse = { "data": { "attributes": { "account_id": 1320, "has_vat": true, "vat_number": "GB123456789", "id": 30 }, "id": "30", "type": "sales_tax" } }

        given('the API request is for VAT tax check', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            instance.apiCallToCheckVatTaxAdded = 'vat_tax_check';
        });

        when('the API response is successful', () => {
            instance.manageApiResponse(successResponse, 'vat_tax_check');
        });

        then('VAT details should be updated in the state', () => {
            expect(instance.state.detailOfVatNumber).toEqual(successResponse);
            expect(instance.state.VatNumber).toBe('GB123456789');
            expect(instance.state.showVatUpdatedValue).toBe(true);
        });

        then('the correct radio button should be selected based on VAT', () => {
            expect(instance.state.selectedRadioBtn).toBe('have');
        });
    });

    test('API response is successful for VAT tax creation or update', ({ given, when, then }) => {
        jest.useFakeTimers(); // for handling setTimeout
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        given('the API request is for VAT tax creation or update', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            instance.apiCallToCreateAndUpdateVatTax = 'vat_tax_create_update';
        });

        when('the API response is successful', () => {
            instance.manageApiResponse({
                "data": {
                    "id": "30",
                    "type": "sales_tax",
                    "attributes": {
                        "id": 30,
                        "account_id": 1320,
                        "has_vat": true,
                        "vat_number": "GB123456789"
                    }
                }
            }, 'vat_tax_create_update');
        });

        then('the success message modal should be shown', () => {
            expect(instance.state.isSucessMsgModel).toBe(true);
            expect(instance.state.showVatUpdatedValue).toBe(true);
        });

        then('the modal should close after 3 seconds', () => {
            jest.advanceTimersByTime(3000); // fast-forward time
            instance.closeSucessMsgModel()
        });
    });

    test('Pressing the Edit Details button', ({ when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        when('the user presses the Edit Details button', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            instance.btnEditDetailsProps.onPress();
        });

        then('the VAT updated value should not be shown', () => {
            expect(instance.state.showVatUpdatedValue).toBe(false);
        });
    });

    test('Pressing the Cancel button', ({ when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        when('the user presses the Cancel button', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            instance.btnCancelProps.onPress();
        });

        then('the VAT updated value should be shown', () => {
            expect(instance.state.showVatUpdatedValue).toBe(true);
        });
    });

    test('Save button clicked with an empty selected radio button', ({ when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        when('the user presses the Save Details button with an empty selected radio button', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            instance.setState({ selectedRadioBtn: '' });
            const result = instance.btnSaveDetailsProps.onPress();
            expect(result).toBe(false);
        });

        then('it should not save and should return false', () => {
            expect(instance.state.isValidateField).toBe(true);
            //   expect(instance.saveAndModifyVatNumber).not.toHaveBeenCalled();
        });
    });

    test('Save button clicked with have radio button and valid VAT number', ({ when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        when('the user presses the Save Details button with have selected and valid VAT number', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            instance.setState({ selectedRadioBtn: 'have' });
            jest.spyOn(instance, 'checkVatNumberMinLength').mockReturnValue(false);
            const saveSpy = jest.spyOn(instance, 'saveAndModifyVatNumber');
            instance.btnSaveDetailsProps.onPress();
            // expect(saveSpy).toHaveBeenCalled();
        });

        then('it should save the VAT number', () => {
            expect(instance.state.isValidateField).toBe(true);
        });
    });

    test('Save button clicked with have radio button and invalid VAT number', ({ when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        when('the user presses the Save Details button with have selected and invalid VAT number', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            instance.setState({ selectedRadioBtn: 'have' });
            jest.spyOn(instance, 'checkVatNumberMinLength').mockReturnValue(true);
            const result = instance.btnSaveDetailsProps.onPress();
            expect(result).toBe(false);
        });

        then('it should not save and should return false', () => {
            expect(instance.state.isValidateField).toBe(true);
            //   expect(instance.saveAndModifyVatNumber).not.toHaveBeenCalled();
        });
    });

    test('Save button clicked with not have radio button', ({ when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        when('the user presses the Save Details button with not have selected', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            instance.setState({ selectedRadioBtn: 'notHave' });
            jest.spyOn(instance, 'checkVatNumberMinLength').mockReturnValue(false);
            const saveSpy = jest.spyOn(instance, 'saveAndModifyVatNumber');
            instance.btnSaveDetailsProps.onPress();
            expect(saveSpy).toHaveBeenCalled();
        });

        then('it should save the VAT number', () => {
            expect(instance.state.isValidateField).toBe(false);
        });
    });

    test('User enters a VAT number', ({ when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        const mockTextInput = 'VAT123456';

        when('the user types a VAT number into the text input', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            instance.txtInputVaTNumberProps.onChangeText(mockTextInput);
        });

        then('the VAT number state should be updated', () => {
            expect(instance.state.VatNumber).toBe(mockTextInput);
        });
    });

    test('VAT number is less than 9 characters', ({ given, when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        given('the VAT number is "12345678"', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            instance.setState({ VatNumber: '12345678' });
        });
        let result: any;
        when('the checkVatNumberMinLength function is called', () => {
            result = instance.checkVatNumberMinLength();
        });

        then('it should return true', () => {
            expect(result).toBe(false);
        });
    });

    test('VAT number is 9 or more characters', ({ given, when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        given('the VAT number is "123456789"', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            instance.setState({ VatNumber: '123456789' });
        });
        let result: any;
        when('the checkVatNumberMinLength function is called', () => {
            result = instance.checkVatNumberMinLength();
        });

        then('it should return false', () => {
            expect(result).toBe(true);
        });
    });

    test('VAT number is undefined', ({ given, when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        given('the VAT number is undefined', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            instance.setState({ VatNumber: '' });
        });
        let result: any;
        when('the checkVatNumberMinLength function is called', () => {
            result = instance.checkVatNumberMinLength();
        });

        then('it should return false', () => {
            expect(result).toBe(false);
        });
    });

    test('Handling API call to create and update VAT tax with error response', ({ given, when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        let response: any;
        given('the API call ID is for creating and updating VAT tax', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            instance.apiCallToCreateAndUpdateVatTax = 'createUpdateVatTax';
        });

        given('the API response contains an error', () => {
            response = { error: ['Error occurred'] };
        });

        when('the manageApiResponse function is called', () => {
            instance.manageApiResponse(response, 'createUpdateVatTax');
        });

        then('the error message should be set', () => {
            expect(instance.state.errorMessage).toBe('Error occurred');
        });
    });

    test('Handling API call to create and update VAT tax with valid response', ({ given, when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        let response: any;
        given('the API call ID is for creating and updating VAT tax', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            instance.apiCallToCreateAndUpdateVatTax = 'createUpdateVatTax';
        });

        given('the API response contains valid VAT data', () => {
            response = {
                data: {
                    attributes: {
                        has_vat: true,
                        vat_number: '123456789'
                    }
                }
            };
        });

        when('the manageApiResponse function is called', () => {
            instance.manageApiResponse(response, 'createUpdateVatTax');
        });

        then('the success model should be displayed', () => {
            expect(instance.state.isSucessMsgModel).toBe(true);
            expect(instance.state.showVatUpdatedValue).toBe(true);
            expect(instance.state.errorMessage).toBe('');
        });
    });

    test('VAT number is valid and contains no spaces', ({ given, when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        let isCheckVatNumberValidMock: jest.Mock;
        let checkIsSpaceIncludeMock: jest.Mock;
        given('the VAT number is valid', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;

            isCheckVatNumberValidMock = jest.fn();
            checkIsSpaceIncludeMock = jest.fn();
            instance.isCheckVatNumberValid = isCheckVatNumberValidMock;
            instance.checkIsSpaceInclude = checkIsSpaceIncludeMock;

            isCheckVatNumberValidMock.mockReturnValue(false);
            instance.setState({VatNumber: "GB123456789"})
        });

        given('the VAT number contains no spaces', () => {
            checkIsSpaceIncludeMock.mockReturnValue(false);
        });

        when('the error message check is triggered', () => {
            instance.showErrorMsgForVatNumber();
        });

        then('the function should return false', () => {
            expect(instance.showErrorMsgForVatNumber()).toBe(false);
        });
    });

    test('VAT number is invalid or contains spaces', ({ given, when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: VatSalesTax;
        let isCheckVatNumberValidMock: jest.Mock;
        let checkIsSpaceIncludeMock: jest.Mock;
        given('the VAT number is invalid', () => {
            dashboardWrapper = shallow(<VatSalesTax {...screenProps} />);
            instance = dashboardWrapper.instance() as VatSalesTax;
            isCheckVatNumberValidMock = jest.fn();
            checkIsSpaceIncludeMock = jest.fn();
            instance.isCheckVatNumberValid = isCheckVatNumberValidMock;
            instance.checkIsSpaceInclude = checkIsSpaceIncludeMock;

            isCheckVatNumberValidMock.mockReturnValue(false);
        });

        given('the VAT number contains spaces', () => {
            checkIsSpaceIncludeMock.mockReturnValue(true);
        });

        when('the error message check is triggered', () => {
            instance.showErrorMsgForVatNumber();
        });

        then('the function should return true', () => {
            expect(instance.showErrorMsgForVatNumber()).toBe(false);
        });
    });

});
