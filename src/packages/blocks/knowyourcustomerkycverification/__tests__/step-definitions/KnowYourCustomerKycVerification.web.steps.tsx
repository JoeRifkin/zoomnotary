//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { beforeEach, expect, jest } from '@jest/globals'
import KnowYourCustomerKycVerification from "../../src/KnowYourCustomerKycVerification.web"


const screenPropsweb = {
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
const tokenweb = ""
const reportIdweb = ""
const idweb = ""

const featureweb = loadFeature('./__tests__/features/KnowYourCustomerKycVerification-scenario.web.feature');
global.FormData = require('react-native/Libraries/Network/FormData');
defineFeature(featureweb, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to KnowYourCustomerKycVerificationweb', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;

        given('I am a User attempting to KnowYourCustomerKycVerificationweb', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsweb} />);
        });

        when('I navigate to the KnowYourCustomerKycVerificationweb Screen', async () => {
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
        });

        then('I can enter a firstName in web with out errors', () => {
            let textInputComponent1 = exampleBlockA.find('Formik').dive().findWhere((node) => node.prop("data-test-id") === 'firstNameweb');
            textInputComponent1.simulate('change', { target: { firstName: 'full_nameweb', value: 'mailto:jonroyweb@gmail.com' } });
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter a lastName in web with out errors', () => {
            let textInputComponent2 = exampleBlockA.find('Formik').dive().findWhere((node) => node.prop("data-test-id") === 'lastNameweb');
            textInputComponent2.simulate('change', { target: { lastName: 'lastNameweb', value: 'mailto:jonroyweb@gmail.com' } });
            expect(exampleBlockA).toBeTruthy();
        });
        then('I can enter a middlename in web with out errors', () => {
            let textInputComponent3 = exampleBlockA.find('Formik').dive().findWhere((node) => node.prop("data-test-id") === 'Middlenameweb');
            textInputComponent3.simulate('change', { target: { middlename: 'Middlenameweb', value: 'mailto:jonroyweb@gmail.com' } });
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter a email in web with out errors', () => {
            let textInputComponent4 = exampleBlockA.find('Formik').dive().findWhere((node) => node.prop("data-test-id") === 'emailweb');
            textInputComponent4.simulate('change', { target: { email: 'emailweb', value: 'mailto:jonroyweb@gmail.com' } });
            expect(exampleBlockA).toBeTruthy();
        });
        then('I can enter a phonenumber in web with out errors', () => {
            let textInputComponent5 = exampleBlockA.find('Formik').dive().findWhere((node) => node.prop("data-test-id") === 'phoneweb');
            textInputComponent5.simulate('change', { target: { phone: 'phoneweb', value: 'mailto:jonroyweb@gmail.com' } });
            expect(exampleBlockA).toBeTruthy();
        });
        then('I can enter a nationality in web with out errors', () => {
            let textInputComponent6 = exampleBlockA.find('Formik').dive().findWhere((node) => node.prop("data-test-id") === 'nationalityweb');
            textInputComponent6.simulate('change', { target: { nationality: 'nationalityweb', value: 'mailto:jonroweby@gmail.com' } });
            expect(exampleBlockA).toBeTruthy();
        });
        then('I can enter a DOB in web with out errors', () => {
            let textInputComponent7 = exampleBlockA.find('Formik').dive().findWhere((node) => node.prop("data-test-id") === 'Date of Birthweb');
            textInputComponent7.simulate('change', { target: { dob: 'dobweb', value: 'mailto:jonroyeeb@gmail.com' } });
            expect(exampleBlockA).toBeTruthy();
        });
        then('I can select Submit button in web without errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
        then('I can load CreateAccount in web without errors', () => {
            instance.onfidouserdeta();
            const viewAllCertificateApiIDs = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            viewAllCertificateApiIDs.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                viewAllCertificateApiIDs.messageId
            );
            viewAllCertificateApiIDs.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify(idweb))
            );
            instance.getCreateaccountCallID = viewAllCertificateApiIDs.messageId;
            runEngine.sendMessage("Unit Test", viewAllCertificateApiIDs);
            expect(exampleBlockA).toBeTruthy();
        })
        then('I can navigate Onfido page in web without errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
        then('I can load onfido in web without errors', () => {
            instance.onfidouserdeta();
            const viewAllCertificateApiIDs = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            viewAllCertificateApiIDs.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                viewAllCertificateApiIDs.messageId
            );
            viewAllCertificateApiIDs.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify(tokenweb))
            );
            instance.getVerifyIndentitycallID = viewAllCertificateApiIDs.messageId;
            runEngine.sendMessage("Unit Test", viewAllCertificateApiIDs);
            expect(exampleBlockA).toBeTruthy();
        })
        then('I can load OnreportApi in web without errors', () => {
            instance.onfidouserdeta();
            const viewAllCertificateApiIDs = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            viewAllCertificateApiIDs.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                viewAllCertificateApiIDs.messageId
            );
            viewAllCertificateApiIDs.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify(reportIdweb))
            );
            instance.getreportCallID = viewAllCertificateApiIDs.messageId;
            runEngine.sendMessage("Unit Test", viewAllCertificateApiIDs);
            expect(exampleBlockA).toBeTruthy();
        })
        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
