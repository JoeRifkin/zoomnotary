//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import { beforeEach, expect, jest } from '@jest/globals'
import KycVerificationAccount from "../../src/KycVerificationAccount.web"


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

const featureverifiedweb = loadFeature('./__tests__/features/KycVerificationAccount-scenario.web.feature');

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
