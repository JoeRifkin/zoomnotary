//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import { beforeEach, expect, jest } from '@jest/globals'
import KnowYourCustomerKycVerificationAccount from "../../src/KnowYourCustomerKycVerificationAccount.web"


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

const featureverifiedweb = loadFeature('./__tests__/features/KnowYourCustomerKycVerifiedAccount2-scenario.web.feature');

defineFeature(featureverifiedweb, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to KnowYourCustomerKycVerifiedAccount2web', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerificationAccount;

        given('I am a User attempting to KnowYourCustomerKycVerifiedAccount2web', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerificationAccount {...screenPropsverifiedweb} />);
        });

        when('I navigate to the KnowYourCustomerKycVerifiedAccount2web Screen', () => {
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerificationAccount
        });

        then('I can successweb with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'backbtnweb');
        });


        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
