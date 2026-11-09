// Customizable Area Start
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import DocumentContet from "../../src/DocumentContet"
const navigation = {
    navigate:()=>jest.fn(),
    goBack:()=>jest.fn(),
    state:{params:{screen:'terms'}}
};
const screenProps = {
    navigation: navigation,
    id: "DocumentContet"
  }
  
const feature = loadFeature('./__tests__/features/DocumentContet-scenario.feature');

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to DocumentContet', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:DocumentContet; 

        given('I am a User loading DocumentContet', () => {
            exampleBlockA = shallow(<DocumentContet {...screenProps}/>);
        });

        when('I navigate to the DocumentContet', () => {
             instance = exampleBlockA.instance() as DocumentContet
        });

        then('DocumentContet will load with out errors', () => {
            expect(exampleBlockA).toBeDefined();
        });

        when('I can click back button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'BACK_BUTTON');
            buttonComponent.simulate('press');
        });

        then('I can click sign button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'SIGN_BUTTON');
            buttonComponent.simulate('press');
            expect(exampleBlockA).toBeDefined();
        });

        when('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeDefined();
        });
    });


});
// Customizable Area End
