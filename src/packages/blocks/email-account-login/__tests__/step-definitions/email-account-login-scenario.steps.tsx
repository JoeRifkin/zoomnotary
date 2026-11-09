import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import EmailAccountLoginBlock from "../../src/EmailAccountLoginBlock";
import { GenericPasswordInput } from "../../../../components/src/GenericPasswordInput";
import { GenericTextWithHperLink } from "../../../../components/src/GenericTextWithHperLink";
import { GenericToggleButton } from "../../../../components/src/GenericToggleButton";
import { GenericButton } from "../../../../components/src/GenericButton";
import { GenericTextInput } from "../../../../components/src/GenericTextInput";
import { BackHandler } from 'react-native'
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "EmailAccountLoginBlock"
}

const feature = loadFeature('./__tests__/features/email-account-login-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to Email Log In', ({ given, when, then }) => {
        let mobileAccountLogInWrapper: ShallowWrapper;
        let instance: EmailAccountLoginBlock;

        given('I am a User attempting to Log In with a Email', () => {
            mobileAccountLogInWrapper = shallow(<EmailAccountLoginBlock {...screenProps} />)
            expect(mobileAccountLogInWrapper).toBeTruthy()

            instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;

            const msgValidationAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgValidationAPI.messageId);
            msgValidationAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "data": [
                        {
                            "email_validation_regexp": "^[a-zA-Z0-9.!\\#$%&‘*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
                            "password_validation_regexp": "^(?=.*[A-Z])(?=.*[#!@$&*?<>',\\[\\]}{=\\-)(^%`~+.:;_])(?=.*[0-9])(?=.*[a-z]).{8,}$",
                            "password_validation_rules": "Password should be a minimum of 8 characters long, contain both uppercase and lowercase characters, at least one digit, and one special character (!@#$&*?<>',[]}{=-)(^%`~+.:;_)."
                        }
                    ]
                });
            instance.validationApiCallId = msgValidationAPI.messageId
            runEngine.sendMessage("Unit Test", msgValidationAPI)

        });

        when('I navigate to the Log In Screen', () => {
            instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock
        });

        then('I can select the Log In button with out errors', () => {
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btnEmailLogIn');
            buttonComponent.simulate('press');
            instance.btnEmailLogInProps.onPress()
        });

        then('I can select the Forgot Password button with out errors', () => {
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btnForgotPassword');
            buttonComponent.simulate('press');
            instance.btnForgotPasswordProps()
        });

        then('I can select the back button with out errors', () => {
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btnbackArrow');
            buttonComponent.simulate('press');
            instance.btnGoBack.onPress()
        });

        // then('I can select the Sign up button with out errors', () => {
        //     let signUpHyperLink = mobileAccountLogInWrapper.find(GenericTextWithHperLink).dive()
        //     let buttonComponent = signUpHyperLink.findWhere((node) => node.prop('testID') === 'btnSignUp');
        //     buttonComponent.simulate('press');
        // });

        then('I can enter a email address with out errors', () => {
            let textInputEmail = mobileAccountLogInWrapper.find(GenericTextInput).dive()
            let textInputComponent = textInputEmail.findWhere((node) => node.prop('testID') === 'txtInputEmail');
            textInputComponent.simulate('changeText', 'hello@aol.com');
        });

        then('I can enter a password with out errors', () => {
            let textInputPass = mobileAccountLogInWrapper.find(GenericPasswordInput).dive()
            let textInputComponent = textInputPass.findWhere((node) => node.prop('testID') === 'txtInputPassword');
            textInputComponent.simulate('changeText', 'passWord1!');
        });

        then('I can select the Show Hide button with out errors', () => {
            let showHideBtn = mobileAccountLogInWrapper.find(GenericPasswordInput).dive()
            let buttonComponent = showHideBtn.findWhere((node) => node.prop('testID') === 'btnPasswordShowHide');
            instance.setState({ enablePasswordField: true })
            instance.setState({ enablePasswordField: false })
            buttonComponent.simulate('press');
        });

        then('I can select the Checkbox button with out errors', () => {
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'CustomCheckBox');
            instance.setState({ checkedRememberMe: true })
            instance.setState({ checkedRememberMe: false })
            buttonComponent.simulate('press');
            instance.CustomCheckBoxProps.onChangeValue(true)
        });

        then('I can select the Remember button with out errors', () => {
            let buttonComponent = mobileAccountLogInWrapper.findWhere((node) => node.prop('testID') === 'btnRememberMe');
            instance.setState({ checkedRememberMe: true })
            instance.setState({ checkedRememberMe: false })
            buttonComponent.simulate('press');
            instance.CustomCheckBoxProps.onChangeValue(false)
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount();
            expect(mobileAccountLogInWrapper).toBeTruthy();
        });
    });

    test('Empty Email Address', ({ given, when, then }) => {
        let mobileAccountLogInWrapper: ShallowWrapper;
        let instance: EmailAccountLoginBlock;

        given('I am a User attempting to Log In with a Email Address', () => {
            mobileAccountLogInWrapper = shallow(<EmailAccountLoginBlock {...screenProps} />);
            expect(mobileAccountLogInWrapper).toBeTruthy();
        });

        when('I Log In with an empty Email Address', () => {
            instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock;
            instance.setState({ email: "", password: "password!" });
        });

        then('Log In Should Fail', () => {

            expect(instance.doLogInWithEmail()).toBe(false);
            instance.validateEmail('deependra@gmail.com')
            instance.validateEmail('deependra@gmail.c')
            const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
            msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "errors": [
                        {
                            "failed_login": "Login Failed"
                        }
                    ]
                });

            msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
            instance.apiEmailLoginCallId = msgLogInErrorRestAPI.messageId
            runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
        });

    });

    test('Email Address and Empty Password', ({ given, when, then }) => {
        let mobileAccountLogInWrapper: ShallowWrapper;
        let instance: EmailAccountLoginBlock;

        given('I am a User attempting to Log In with a Email Address', () => {
            mobileAccountLogInWrapper = shallow(<EmailAccountLoginBlock {...screenProps} />);
            expect(mobileAccountLogInWrapper).toBeTruthy();
        });

        when('I Log In with a Email Address and empty Password', () => {
            instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock
            instance.setState({ email: "test@aol.com", password: "" })
        });

        then('Log In Should Fail', () => {
            expect(instance.doLogInWithEmail()).toBe(false);
        });
    });

    test('Password and Empty Email Address', ({ given, when, then }) => {
        let mobileAccountLogInWrapper: ShallowWrapper;
        let instance: EmailAccountLoginBlock;

        given('I am a User attempting to Log In with a Email Address', () => {
            mobileAccountLogInWrapper = shallow(<EmailAccountLoginBlock {...screenProps} />);
            expect(mobileAccountLogInWrapper).toBeTruthy();
        });

        when('I Log In with a Password and empty Email Address', () => {
            instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock
            instance.setState({ email: "", password: "password" })
        });

        then('Log In Should Fail', () => {
            expect(instance.doLogInWithEmail()).toBe(false);
        });
    });

    test('Email Address and Password', ({ given, when, then }) => {

        let mobileAccountLogInWrapper: ShallowWrapper;
        let instance: EmailAccountLoginBlock;

        given('I am a Registed User attempting to Log In with a Email Address', () => {
            mobileAccountLogInWrapper = shallow(<EmailAccountLoginBlock {...screenProps} />);
            expect(mobileAccountLogInWrapper).toBeTruthy();
        });

        when('I Log In with Email Address and Password', () => {
            instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock
            instance.setState({ email: "abc@aol.com", password: "Deep@123" })
        });

        then('Log In Should Succeed', () => {
            expect(instance.doLogInWithEmail()).toBe(true);
        });

        then('RestAPI will return token', () => {
            const msgLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInSucessRestAPI.messageId);
            msgLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "meta": {
                    "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAsInR5cGUiOiJTbXNBY2NvdW50IiwiZXhwIjoxNTc2Njk1ODk4fQ.kB2_Z10LNwDmbo6B39esgM0vG9qTAG4U9uLxPBYrCX5PCro0LxQHI9acwVDnfDPsqpWYvQmoejC2EO8MFoEz7Q"
                }
            });
            instance.validateEmail('deependra@gmail.com')
            instance.validateEmail('deependra@gmail.c')
            instance.apiEmailLoginCallId = msgLogInSucessRestAPI.messageId
            runEngine.sendMessage("Unit Test", msgLogInSucessRestAPI)

        });
    });

    test('Remember Me - Email Address Account Log In', ({ given, when, then }) => {
        let mobileAccountLogInWrapper: ShallowWrapper;
        let instance: EmailAccountLoginBlock;

        given('I am a Registed User who has already Logged In and selected Remember Me', () => {
            //Force ios to render mobile layout once.
            jest.spyOn(helpers, 'getOS').mockImplementation(() => 'ios');
            mobileAccountLogInWrapper = shallow(<EmailAccountLoginBlock {...screenProps} />);
            expect(mobileAccountLogInWrapper).toBeTruthy();
        });

        when('I navigate to Email Address Account Log In', () => {
            instance = mobileAccountLogInWrapper.instance() as EmailAccountLoginBlock
            const msgRestoreCreds = new Message(getName(MessageEnum.ReciveUserCredentials))
            msgRestoreCreds.addData(getName(MessageEnum.LoginPassword), "passWord1!")
            msgRestoreCreds.addData(getName(MessageEnum.LoginUserName), "test@aol.com")
            runEngine.sendMessage("Unit Test", msgRestoreCreds)
        });

        then('The Country Code, Email Address and Password will be restored', () => {
            expect(mobileAccountLogInWrapper).toBeTruthy();
        });
    });

    test('Exiting the app on back button click', ({ given, when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: EmailAccountLoginBlock;
        let backHandlerMock: any;
        given('the user wants to exit the app', () => {
            dashboardWrapper = shallow(<EmailAccountLoginBlock {...screenProps} />);
            instance = dashboardWrapper.instance() as EmailAccountLoginBlock;
            backHandlerMock = jest.spyOn(BackHandler, 'exitApp');
        });

        when('the user clicks the back button', () => {
            instance.handleBackButtonClick();
        });

        then('the app should exit', () => {
            expect(BackHandler.exitApp).toHaveBeenCalled();
            expect(backHandlerMock).toHaveBeenCalled();
        });
    });

    test('Navigating to the dashboard page', ({ given, when, then }) => {
        let createdMessage: Message;
        let dashboardWrapper: ShallowWrapper;
        let instance: EmailAccountLoginBlock;
        let mockSend: any;
        given('the initial state of isLoader is true', () => {
            dashboardWrapper = shallow(<EmailAccountLoginBlock {...screenProps} />);
            instance = dashboardWrapper.instance() as EmailAccountLoginBlock;
            mockSend = jest.fn();
            instance.send = mockSend;

            // Set initial state
            instance.setState({ isLoader: true });
            expect(instance.state.isLoader).toBe(true);
        });

        when('the user triggers the gotoDashboardPage method', () => {
            instance.gotoDashboardPage();
        });

        then('the isLoader state should be set to false', () => {
            expect(instance.state.isLoader).toBe(false);
        });

        then('a navigation message should be created with the dashboard name', () => {

            const msg = mockSend.mock.calls[0][0];
            expect(msg).toBeInstanceOf(Message);
            expect(msg.id).toBe(getName(MessageEnum.NavigationDashboardMessage));
        });
    });

    test('Continue as guest button is pressed', ({ when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: EmailAccountLoginBlock;
        let mockSend: any;
        when('the "Continue as Guest" button is pressed', () => {
            dashboardWrapper = shallow(<EmailAccountLoginBlock {...screenProps} />);
            instance = dashboardWrapper.instance() as EmailAccountLoginBlock;
            mockSend = jest.fn();
            instance.send = mockSend;

        });
        then('a navigation message to the guest dashboard should be sent', () => {
            instance.continueAsGuestBtnProps.onPress();
        });

        then('the navigation props should be added to the message', () => {
            const msg = mockSend.mock.calls[0][0];
            expect(msg).toBeInstanceOf(Message);
            expect(msg.id).toBe(getName(MessageEnum.NavigationContinueAsGuestDashboardMessage));

        });
    });
});
