import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import LandingPage from "../../src/LandingPage"
import { GenericTextWithHperLink } from "../../../../components/src/GenericTextWithHperLink";
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "LandingPage"
}

const feature = loadFeature('./__tests__/features/LandingPage-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to LandingPage', ({ given, when, then }) => {
        let landingPageBlock: ShallowWrapper;
        let instance: LandingPage;

        given('I am a User loading LandingPage', () => {
            landingPageBlock = shallow(<LandingPage {...screenProps} />)
        });

        when('I navigate to the LandingPage', () => {
            instance = landingPageBlock.instance() as LandingPage
        });

        then('LandingPage will load with out errors', () => {
            expect(landingPageBlock).toBeTruthy();
        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = landingPageBlock.findWhere((node) => node.prop('testID') === 'btnContinuePage');
            buttonComponent.simulate('press')
            instance.btnContinueProps.onPress()
        });

        then('I can select the back button with out errors', () => {
            let buttonComponent = landingPageBlock.findWhere((node) => node.prop('testID') === 'btnbackArrow');
            buttonComponent.simulate('press');
            instance.btnGoBack.onPress()
        });

        then('I can select the button login with with out errors', () => {
            let ButtonLogin = landingPageBlock.find(GenericTextWithHperLink).dive()
            let buttonComponent = ButtonLogin.findWhere((node) => node.prop('testID') === 'btnLogin');
            buttonComponent.simulate('press')
            instance.btnLoginRedirect.onPress()
            instance.setState({ isValidateField: true })
            instance.setState({ isValidateField: false })
        });

        then('I can select the button tab need with with out errors', () => {
            let buttonComponent = landingPageBlock.findWhere((node) => node.prop('testID') === 'btnTabNeedNotary');
            buttonComponent.simulate('press');
            instance.setState({ userType: 'need' })
        });

        then('I can select the button tab am with with out errors', () => {
            let buttonComponent = landingPageBlock.findWhere((node) => node.prop('testID') === 'btnTabAmNotary');
            buttonComponent.simulate('press');
            instance.setState({ userType: 'am' })
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(landingPageBlock).toBeTruthy();
        });
    });

    test('User type is am for showIamNotaryImg', ({ given, when, then }) => {
        let landingPageBlock: ShallowWrapper;
        let instance: LandingPage;
        given('the userType is set to am', () => {
            landingPageBlock = shallow(<LandingPage {...screenProps} />)
            instance = landingPageBlock.instance() as LandingPage
            instance.setState({ userType: 'am' });
        });

        when('the showIamNotaryImg function is called', () => {
            instance.showIamNotaryImg();
        });

        then('it should return imgTintColor', () => {
            expect(instance.showIamNotaryImg()).toEqual('imgTintColor');
        });
    });

    test('User type is not am for showIamNotaryImg', ({ given, when, then }) => {
        let landingPageBlock: ShallowWrapper;
        let instance: LandingPage;
        given('the userType is set to need', () => {
            landingPageBlock = shallow(<LandingPage {...screenProps} />)
            instance = landingPageBlock.instance() as LandingPage
            instance.setState({ userType: 'need' });
        });

        when('the showIamNotaryImg function is called', () => {
            instance.showIamNotaryImg();
        });

        then('it should return imgNoTintColor', () => {
            expect(instance.showIamNotaryImg()).toEqual('imgNoTintColor');
        });
    });

    test('User type is need for showINeedNotaryImg', ({ given, when, then }) => {
        let landingPageBlock: ShallowWrapper;
        let instance: LandingPage;
        given('the userType is set to need', () => {
            landingPageBlock = shallow(<LandingPage {...screenProps} />)
            instance = landingPageBlock.instance() as LandingPage
            instance.setState({ userType: 'need' });
        });

        when('the showINeedNotaryImg function is called', () => {
            instance.showINeedNotaryImg();
        });

        then('it should return imgTintColor', () => {
            expect(instance.showINeedNotaryImg()).toEqual('imgTintColor');
        });
    });

    test('User type is not need for showINeedNotaryImg', ({ given, when, then }) => {
        let landingPageBlock: ShallowWrapper;
        let instance: LandingPage;
        given('the userType is set to am', () => {
            landingPageBlock = shallow(<LandingPage {...screenProps} />)
            instance = landingPageBlock.instance() as LandingPage
            instance.setState({ userType: 'am' });
        });

        when('the showINeedNotaryImg function is called', () => {
            instance.showINeedNotaryImg();
        });

        then('it should return imgNoTintColor', () => {
            expect(instance.showINeedNotaryImg()).toEqual('imgNoTintColor');
        });
    });

});
