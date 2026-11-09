import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";

import EmailAccountRegistration from "../../src/EmailAccountRegistration"
import { GenericHeader } from "../../../../components/src/GenericHeader";
import { GenericPasswordInput } from "../../../../components/src/GenericPasswordInput";
import { GenericTextWithHperLink } from "../../../../components/src/GenericTextWithHperLink";
import { GenericToggleButton } from "../../../../components/src/GenericToggleButton";
import { GenericButton } from "../../../../components/src/GenericButton";
import { GenericTextInput } from "../../../../components/src/GenericTextInput";

const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "email-account-registration-scenario"
}

const feature = loadFeature('./__tests__/features/email-account-registration-scenario.feature');

jest.mock('@react-native-async-storage/async-storage', () => {
    return {
        setItem: () => { return 'signUpUserDetail' },
        removeItem: () => { return true },
        getItem: () => { return true },
    }
})

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('Register Email Account', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration: ShallowWrapper;
        let instance: EmailAccountRegistration;

        given('I am a User attempting to Register after confirming OTP', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps} />)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });

        when('I navigate to the Registration Screen', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
        });

        then('I can enter a first name with out errors', () => {
            let TextInput1 = emailAccountRegistrationWrapperRegistration.find(GenericTextInput).at(0).dive()
            let textInputComponent = TextInput1.findWhere((node) => node.prop('testID') === 'txtInputFirstName');
            textInputComponent.simulate('changeText', 'FIRST');

            let buttonComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'Background');
            buttonComponent.simulate('press')
        });


        then('I can enter a business name with out errors', () => {
            let TextInput1 = emailAccountRegistrationWrapperRegistration.find(GenericTextInput).at(1).dive()
            let textInputComponent = TextInput1.findWhere((node) => node.prop('testID') === 'txtInputBusinessName');
            if (textInputComponent.length > 0) {
                textInputComponent.simulate('changeText', 'BUSINESS NAME');
            }
        });


        then('I can enter a email with out errors', () => {
            let TextInput1 = emailAccountRegistrationWrapperRegistration.find(GenericTextInput).at(1).dive()
            let textInputComponent = TextInput1.findWhere((node) => node.prop('testID') === 'txtInputEmailSignUp');
            textInputComponent.simulate('changeText', 'a@bb.com');
        });

        then('I can enter a password with out errors', () => {
            let TextInput1 = emailAccountRegistrationWrapperRegistration.find(GenericPasswordInput).at(0).dive()
            let textInputComponent = TextInput1.findWhere((node) => node.prop('testID') === 'txtInputPasswordSignUp');
            textInputComponent.simulate('changeText', 'password');
        });

        then('I can toggle the Password Show/Hide with out errors', () => {
            let Background = emailAccountRegistrationWrapperRegistration.find(GenericPasswordInput).at(0).dive()
            let buttonComponent = Background.findWhere((node) => node.prop('testID') === 'btnPasswordShowHide');
            buttonComponent.simulate('press')
        });

        then('I can enter a confimation password with out errors', () => {
            let TextInput1 = emailAccountRegistrationWrapperRegistration.find(GenericPasswordInput).at(1).dive()
            let textInputComponent = TextInput1.findWhere((node) => node.prop('testID') === 'txtInputConfirmPassword');
            textInputComponent.simulate('changeText', 'password');
        });


        then('I can toggle the Confimation Password Show/Hide with out errors', () => {
            let Background = emailAccountRegistrationWrapperRegistration.find(GenericPasswordInput).at(1).dive()
            let buttonComponent = Background.findWhere((node) => node.prop('testID') === 'btnConfirmPasswordShowHide');
            buttonComponent.simulate('press')
        });

        then('I can select the Submit button with out errors', () => {


            const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
            msgPlayloadAPI.addData(getName(MessageEnum.AuthTokenDataMessage), "USER-TOKEN");
            runEngine.sendMessage("Unit Test", msgPlayloadAPI)
            let ButtonLoginSignup = emailAccountRegistrationWrapperRegistration.find(GenericTextWithHperLink).dive()
            let buttonComponent = ButtonLoginSignup.findWhere((node) => node.prop('testID') === 'btnLogin');
            buttonComponent.simulate('press')

            let ArrowButton = emailAccountRegistrationWrapperRegistration.find(GenericHeader).dive()
            buttonComponent = ArrowButton.findWhere((node) => node.prop('testID') === 'btnbackArrow');
            buttonComponent.simulate('press')

            let ButtonSignUp = emailAccountRegistrationWrapperRegistration.find(GenericButton).at(0).dive()
            buttonComponent = ButtonSignUp.findWhere((node) => node.prop('testID') === 'btnSignUpPage');
            buttonComponent.simulate('press')

            let ShowHidePass = emailAccountRegistrationWrapperRegistration.find(GenericPasswordInput).at(0).dive()
            buttonComponent = ShowHidePass.findWhere((node) => node.prop('testID') === 'btnPasswordShowHide');
            buttonComponent.simulate('press')

            let ShowHideConfPass = emailAccountRegistrationWrapperRegistration.find(GenericPasswordInput).at(1).dive()
            buttonComponent = ShowHideConfPass.findWhere((node) => node.prop('testID') === 'btnConfirmPasswordShowHide');
            buttonComponent.simulate('press')

            let magLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magLogInSucessRestAPI);
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "meta": {
                    "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NCwiZXhwIjoxNzA2NjE1MzQyfQ.x632GYgnZCr0vpQQfo49jkOanQI8FLvOXJlgIeVqv8MI3dwed-9w511NAhRmhgHAbFs7OiRWZl7oG8TMyQ7vGw"
                }
            });
            instance.createAccountApiCallId = magLogInSucessRestAPI
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI)


        });

        when('I can select the Individual tab button with out errors', () => {
            let buttonComponent = emailAccountRegistrationWrapperRegistration.findWhere((node) => node.prop('testID') === 'btnIndividual');
            instance.setState({ isBusinessSelected: !instance.state.isBusinessSelected, isIndividualSelected: !instance.state.isIndividualSelected, email: "", password: "", reTypePassword: "", businessName: '', firstName: "" })
            instance.btnTabIndividualProps.onPress()
            // buttonComponent.simulate('press');

        });

        then("UI should be change according to individual", () => {
            instance.btnTabIndividualProps.onPress()
        });

        when('I call api of country list with out errors', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
            instance.setState({ selectedUser: 'am' });
            instance.callApiForGetCountry();
        });

        then('Country list Should Succeed', () => {
            expect(instance.callApiForGetCountry()).toBe(true);
        });

        then('RestAPI will return response', () => {
            const magLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magLogInSucessRestAPI);
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
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
            });
            instance.getCountryApiCallId = magLogInSucessRestAPI
            instance.manageApiResponse(magLogInSucessRestAPI, instance.getCountryApiCallId, { "error": "somthing went wrong" })
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI)
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount();
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy();
        });

    });


    test('Empty First Name', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration: ShallowWrapper;
        let instance: EmailAccountRegistration;

        given('I am a User attempting to Register with a Email', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps} />)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });

        when('I Register with an empty First Name', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration;
        });

        then('Registration Should Fail', () => {
            // expect(instance.createAccount()).toBe(false);
        });

        then('RestAPI will return an error', () => {

            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "errors": [
                        {
                            "failed_login": "Login Failed"
                        }
                    ]
                });

            instance.createAccountApiCallId = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
        });

    });

    test('Invalid Email', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration: ShallowWrapper;
        let instance: EmailAccountRegistration;

        given('I am a User attempting to Register with a Email', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps} />)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });

        when('I Register with an Invalid Email', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
            instance.validateEmail('deependra@gmail.com')
            instance.validateEmail('deependra@gmail.c')
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

            const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
            msgPlayloadAPI.addData(getName(MessageEnum.AuthTokenDataMessage), "USER-TOKEN");
            runEngine.sendMessage("Unit Test", msgPlayloadAPI)
            instance.setState({ firstName: "FIRST last", isIndividualSelected: true, isBusinessSelected: false, businessName: "BUSINESSNAME", email: "a", password: "Deep@1", reTypePassword: "Deep@123" });

        });

        then('Registration Should Fail', () => {
            // expect(instance.createAccount()).toBe(false);
        });

        then('RestAPI will return an error', () => {

            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "errors": [
                        {
                            "failed_login": "Login Failed"
                        }
                    ]
                });

            instance.createAccountApiCallId = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
        });

    });


    test('Invalid Password', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration: ShallowWrapper;
        let instance: EmailAccountRegistration;

        given('I am a User attempting to Register with a Email', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps} />)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });

        when('I Register with an Invalid Password', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration

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

            const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
            msgPlayloadAPI.addData(getName(MessageEnum.AuthTokenDataMessage), "USER-TOKEN");
            runEngine.sendMessage("Unit Test", msgPlayloadAPI)
            instance.setState({ firstName: "FIRST last", isIndividualSelected: false, isBusinessSelected: true, businessName: "BUSINESSNAME", email: "Deepb@gmail.com", password: "pass", reTypePassword: "pass123" });
        });

        then('Registration Should Fail', () => {
            // expect(instance.createAccount()).toBe(false);
        });

        then('RestAPI will return an error', () => {

            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "errors": [
                        {
                            "failed_login": "Login Failed"
                        }
                    ]
                });

            instance.createAccountApiCallId = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
        });

    });


    test('Password and RePassword do not match', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration: ShallowWrapper;
        let instance: EmailAccountRegistration;

        given('I am a User attempting to Register with a Email', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps} />)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });

        when('I Register with Password and RePassword that do not match', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
            instance.setState({ firstName: "FIRST last", isIndividualSelected: true, isBusinessSelected: false, businessName: "BUSINESSNAME", email: "Deepb@gmail.com", password: "password123!!", reTypePassword: "pass123" });

        });

        then('Registration Should Fail', () => {
            // expect(instance.createAccount()).toBe(false);
        });

        then('RestAPI will return an error', () => {

            let msgRegistrationErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgRegistrationErrorRestAPI);
            msgRegistrationErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "errors": [
                        {
                            "failed_login": "Login Failed"
                        }
                    ]
                });

            instance.createAccountApiCallId = msgRegistrationErrorRestAPI
            runEngine.sendMessage("Unit Test", msgRegistrationErrorRestAPI)
        });

    });

    test('Valid Registration', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration: ShallowWrapper;
        let instance: EmailAccountRegistration;

        given('I am a User attempting to Register with a Email', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps} />)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });

        when('I Register with all valid data', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
            instance.setState({ firstName: "abc dew", isIndividualSelected: true, isBusinessSelected: false, businessName: "BUSINESSNAME", email: "deepabcd@gmail.com", password: "Deep@123", reTypePassword: "Deep@123" });
            instance.validateEmail('deependra@gmail.com')
            instance.validateEmail('deependra@gmail.c')
        });

        then('Registration Should Succeed', () => {
            // expect(instance.createAccount()).toBe(true);
        });

        then('RestAPI will return token', () => {
            const magLogInSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magLogInSucessRestAPI);
            magLogInSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
                "meta": {
                    "token": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6NCwiZXhwIjoxNzA2NjE1MzQyfQ.x632GYgnZCr0vpQQfo49jkOanQI8FLvOXJlgIeVqv8MI3dwed-9w511NAhRmhgHAbFs7OiRWZl7oG8TMyQ7vGw"
                }
            });
            instance.createAccountApiCallId = magLogInSucessRestAPI
            runEngine.sendMessage("Unit Test", magLogInSucessRestAPI)
        });

    });


    test('Handling Validation Response', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration: ShallowWrapper;
        let instance: EmailAccountRegistration;

        given('a validation API response', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps} />)
            expect(emailAccountRegistrationWrapperRegistration).toBeTruthy()
        });

        when('the manageApiResponse function is called with validation API call ID', () => {
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
            instance.setState({ firstName: "abc dew", isIndividualSelected: true, isBusinessSelected: false, businessName: "BUSINESSNAME", email: "deepabcd@gmail.com", password: "Deep@123", reTypePassword: "Deep@123" });
            instance.validateEmail('deependra@gmail.com')
            instance.validateEmail('deependra@gmail.c')
        });

        then('it should handle the validation response correctly', () => {
            // expect(instance.createAccount()).toBe(true);
        });
    });

    test('User creates account successfully', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration: ShallowWrapper;
        let instance: EmailAccountRegistration;
        const responseJson = {
            data: {
                attributes: {
                    email: 'test@example.com'
                },
                meta: {
                    token: "9udffuuo8tyghnmugeo8w4yhsgcjdfusyiwgghf",
                    email_otp_token: "clvgrowoegbvdadiutkhbvhzaew8iubg8r"
                } // Mock meta data
            }
        };
        given('a successful responseJson', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps} />)
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
        });

        when('handleCreateAccountResponse is called', () => {
            instance.handleCreateAccountResponse(responseJson, null);
        });

        then('redirectToOtpPage should be called with userDetails', () => {
            // expect(instance.redirectToOtpPage).toHaveBeenCalledWith({
            //     data: {
            //         attributes: {
            //         email: 'test@example.com'
            //         },
            //         meta: {
            //         token: "9udffuuo8tyghnmugeo8w4yhsgcjdfusyiwgghf",
            //         email_otp_token: "clvgrowoegbvdadiutkhbvhzaew8iubg8r"
            //         } // Mock meta data
            //     }
            // });
        });
    });

    test('User fails to create account', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration: ShallowWrapper;
        let instance: EmailAccountRegistration;
        const responseJson = {
            errors: [
                {
                    isOtpVerified: false,
                    token: 'mockToken',
                    email_otp_token: 'mockEmailOtpToken'
                }
            ]
        };
        given('an error responseJson', () => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps} />)
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
        });
        when('handleCreateAccountResponse is called', () => {
            instance.handleCreateAccountResponse(responseJson, null);
        });

        then('setState should be called with signUpFailedMsg and isSignUpFailed', () => {
            expect(instance.state.signUpFailedMsg).toEqual(instance.formatApiError(responseJson));
            expect(instance.state.isSignUpFailed).toBeTruthy();
        });
    });

    test('Valid email address', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration: ShallowWrapper;
        let instance: EmailAccountRegistration;
        let email: any;
        let result : any;
        given(/^I have a valid email "(.*)"$/, (validEmail) => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps} />)
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
            email = validEmail;
        });

        when('I validate the email', () => {
            result = instance.validateEmail(email);
        });

        then('the result should be true', () => {
            expect(result).toBe(true);
        });
    });

    test('Invalid email address without domain', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration: ShallowWrapper;
        let instance: EmailAccountRegistration;
        let email: any;
        let result : any;
        given(/^I have an invalid email "(.*)"$/, (invalidEmail) => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps} />)
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
            email = invalidEmail;
        });

        when('I validate the email', () => {
            result = instance.validateEmail(email);
        });

        then('the result should be false', () => {
            expect(result).toBe(false);
        });
    });

    test('Invalid email address without username', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration: ShallowWrapper;
        let instance: EmailAccountRegistration;
        let email: any;
        let result : any;
        given(/^I have an invalid email "(.*)"$/, (invalidEmail) => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps} />)
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
            email = invalidEmail;
        });

        when('I validate the email', () => {
            result = instance.validateEmail(email);
        });

        then('the result should be false', () => {
            expect(result).toBe(false);
        });
    });

    test('Invalid email address with invalid characters', ({ given, when, then }) => {
        let emailAccountRegistrationWrapperRegistration: ShallowWrapper;
        let instance: EmailAccountRegistration;
        let email: any;
        let result : any;
        given(/^I have an invalid email "(.*)"$/, (invalidEmail) => {
            emailAccountRegistrationWrapperRegistration = shallow(<EmailAccountRegistration {...screenProps} />)
            instance = emailAccountRegistrationWrapperRegistration.instance() as EmailAccountRegistration
            email = invalidEmail;
        });

        when('I validate the email', () => {
            result = instance.validateEmail(email);
        });

        then('the result should be false', () => {
            expect(result).toBe(false);
        });
    });


    test('Password length is less than 8 characters', ({ given, when, then }) => {
        let forgotPasswordWrapper: ShallowWrapper;
        let instance: EmailAccountRegistration;
        given('the password is "short"', () => {
          forgotPasswordWrapper = shallow(<EmailAccountRegistration {...screenProps} />);
          instance = forgotPasswordWrapper.instance() as EmailAccountRegistration;
          instance.setState({ password: 'short' });
        });
    
        when('the validation is performed', () => {
          instance.getImageForValidation();
        });
    
        then('the first validation should fail', () => {
          expect(instance.state.firstValidationPass).toBe(false);
        });
    
        then('the second validation should fail', () => {
          expect(instance.state.secValidationPass).toBe(false);
        });
    
        then('the third validation should pass', () => {
          expect(instance.state.thiredValidationPass).toBe(true);
        });
      });
    
      test('Password length is 8 or more characters but missing complexity', ({ given, when, then }) => {
        let forgotPasswordWrapper: ShallowWrapper;
        let instance: EmailAccountRegistration;
        given('the password is "longenough"', () => {
          forgotPasswordWrapper = shallow(<EmailAccountRegistration {...screenProps} />);
          instance = forgotPasswordWrapper.instance() as EmailAccountRegistration;
          instance.setState({ password: 'longenough' });
        });
    
        when('the validation is performed', () => {
          instance.getImageForValidation();
        });
    
        then('the first validation should pass', () => {
          expect(instance.state.firstValidationPass).toBe(true);
        });
    
        then('the second validation should fail', () => {
          expect(instance.state.secValidationPass).toBe(false);
        });
    
        then('the third validation should pass', () => {
          expect(instance.state.thiredValidationPass).toBe(true);
        });
      });
    
      test('Password meets all criteria', ({ given, when, then }) => {
        let forgotPasswordWrapper: ShallowWrapper;
        let instance: EmailAccountRegistration;
        given('the password is "Valid1@Password"', () => {
          forgotPasswordWrapper = shallow(<EmailAccountRegistration {...screenProps} />);
          instance = forgotPasswordWrapper.instance() as EmailAccountRegistration;
          instance.setState({ password: 'Valid1@Password' });
        });
    
        when('the validation is performed', () => {
          instance.getImageForValidation();
        });
    
        then('the first validation should pass', () => {
          expect(instance.state.firstValidationPass).toBe(true);
        });
    
        then('the second validation should pass', () => {
          expect(instance.state.secValidationPass).toBe(true);
        });
    
        then('the third validation should pass', () => {
          expect(instance.state.thiredValidationPass).toBe(true);
        });
      });
    
      test('Password fails the third validation criteria', ({ given, when, then }) => {
        let forgotPasswordWrapper: ShallowWrapper;
        let instance: EmailAccountRegistration;
        given('the password is "Valid1Password"', () => {
          forgotPasswordWrapper = shallow(<EmailAccountRegistration {...screenProps} />);
          instance = forgotPasswordWrapper.instance() as EmailAccountRegistration;
          instance.setState({ password: 'Deep@123  ' });
        });
    
        when('the validation is performed', () => {
          instance.getImageForValidation();
        });
    
        then('the first validation should pass', () => {
          expect(instance.state.firstValidationPass).toBe(true);
        });
    
        then('the second validation should pass', () => {
          expect(instance.state.secValidationPass).toBe(true);
        });
    
        then('the third validation should fail', () => {
          expect(instance.state.thiredValidationPass).toBe(false);
        });
      });

      test('Continue as guest button is pressed', ({ when, then }) => {
        let dashboardWrapper: ShallowWrapper;
        let instance: EmailAccountRegistration;
        let mockSend: any;
        when('the "Continue as Guest" button is pressed', () => {
            dashboardWrapper = shallow(<EmailAccountRegistration {...screenProps} />);
            instance = dashboardWrapper.instance() as EmailAccountRegistration;
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



describe("EmailAccountRegistration", () => {
    it("returns 1 if selectedUser is 'need'", () => {
        const wrapper = shallow<EmailAccountRegistration>(<EmailAccountRegistration {...screenProps} />);
        const instance = wrapper.instance();
        instance.setState({ selectedUser: "need" });
        const result = instance.getRoleId()
        expect(result).toEqual(1);
    });

    it("returns 2 if selectedUser is not 'need'", () => {
        const wrapper = shallow<EmailAccountRegistration>(<EmailAccountRegistration {...screenProps} />);
        const instance = wrapper.instance();
        instance.setState({ selectedUser: "not_need" });
        const result = instance.getRoleId();
        expect(result).toEqual(2);
    });
});

describe("EmailAccountRegistration", () => {
    it("returns individual if isIndividualSelected is true", () => {
        const wrapper = shallow<EmailAccountRegistration>(<EmailAccountRegistration {...screenProps} />);
        const instance = wrapper.instance();
        instance.setState({ isIndividualSelected: true });
        const result = instance.getUserType()
        expect(result).toEqual('individual');
    });

    it("returns business if isIndividualSelected is not false", () => {
        const wrapper = shallow<EmailAccountRegistration>(<EmailAccountRegistration {...screenProps} />);
        const instance = wrapper.instance();
        instance.setState({ isIndividualSelected: false });
        const result = instance.getUserType();
        expect(result).toEqual('business');
    });
});

describe('API Response Handling', () => {
    let component: React.ReactElement;
    beforeEach(() => {
        component = <EmailAccountRegistration {...screenProps} />;
        const wrapper = shallow<EmailAccountRegistration>(<EmailAccountRegistration {...screenProps} />);
        const instance = wrapper.instance();
    });

    it('should handle validation response correctly', () => {
        const responseJson = {
            data: [
                {
                    password_validation_regexp: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$',
                    password_validation_rules: 'Password must be at least 8 characters long',
                    email_validation_regexp: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                }
            ]
        };
        const apiRequestCallId = 'validationApiCallId';
        const instance = shallow(component).instance() as EmailAccountRegistration;
        instance.manageApiResponse(responseJson, apiRequestCallId, null);
    });

    it('should handle create account response correctly', async () => {
        const responseJson = {
            errors: null,
            data: {
                attributes: {
                    email: 'test@example.com'
                },
                meta: {}
            }
        };
        const errorResponse = null;
        const instance = shallow(component).instance() as EmailAccountRegistration;
        await instance.handleCreateAccountResponse(responseJson, errorResponse);
        expect(instance.state.signUpFailedMsg).toBe("");
        expect(instance.state.isSignUpFailed).toBe(false);
    });

    it('should handle country response correctly', () => {
        const responseJson = {
            errors: null,
            data: [{ attributes: { name: 'Country1' } }, { attributes: { name: 'Country2' } }]
        };
        const instance = shallow(component).instance() as EmailAccountRegistration;
        instance.handleCountryResponse(responseJson);
    });
});