import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import CameraAccess from "../../src/CameraAccess"

const screenProps = {
    navigation: {},
    id: "CameraAccess"
  }

const feature = loadFeature('./__tests__/features/CameraAccessBlock-scenario.feature');

jest.mock("react-native-image-crop-picker", () => {
  return {
    openPicker: jest.fn(),
    openCamera: jest.fn(() => Promise.resolve("string")),
  };
});

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'ios' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'ios');
    });

    test('User navigates to CameraAccess', ({ given, when, then }) => {
        let CameraAccessBlock:ShallowWrapper;
        let instance:CameraAccess; 

        given('I am a User loading CameraAccess', () => {
            CameraAccessBlock = shallow(<CameraAccess {...screenProps}/>)
        });

        when('I navigate to the CameraAccess', () => {
             instance = CameraAccessBlock.instance() as CameraAccess
        });

        then('CameraAccess will load with out errors', () => {
            expect(CameraAccessBlock).toBeTruthy()
        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = CameraAccessBlock.findWhere((node) => node.prop('testID') === 'btnGetCameraAccess');
            buttonComponent.simulate('press')
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(CameraAccessBlock).toBeTruthy()
        });
    });


});
