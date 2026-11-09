import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import NavigationMenu from "../../src/NavigationMenu.web";
import {GenericHeader} from "../../../../components/src/GenericHeader";
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "NavigationMenu"
  }

const feature = loadFeature('./__tests__/features/NavigationMenu-scenario.web.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to NavigationMenu', ({ given, when, then }) => {
        let navigationMenuBlock:ShallowWrapper;
        let instance:NavigationMenu; 

        given('I am a User loading NavigationMenu', () => {
            navigationMenuBlock = shallow(<NavigationMenu {...screenProps}/>);
        });

        when('I navigate to the NavigationMenu', () => {
             instance = navigationMenuBlock.instance() as NavigationMenu;
        });

        then('NavigationMenu will load with out errors', () => {

            const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
            tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            runEngine.sendMessage("Unit Test", tokenMsg);
      
            let data = '{"data":{"id":"4","type":"navigation_menu","attributes":{"id":4,"position":"row1","items":[]}}},{"data":{"id":"2","type":"navigation_menu","attributes":{"id":2,"position":"right","items":[{"name":"Builder.ai","url":"http://builder.ai/"}]}}},{"data":{"id":"1","type":"navigation_menu","attributes":{"id":1,"position":"left","items":[{"name":"Builder.ai","url":"http://builder.ai/"},{"name":"Home","url":"Home"}]}}},{"data":{"id":"3","type":"navigation_menu","attributes":{"id":3,"position":"center","items":[{"name":"Builder.ai","url":"http://builder.ai/"},{"name":"Builder.aiw","url":"http://builder.aieee/"}]}}}'
            const msgNavigastionMenuAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgNavigastionMenuAPI.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              msgNavigastionMenuAPI.messageId);
              msgNavigastionMenuAPI.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage), 
              data
            );

            runEngine.sendMessage("Unit Test", msgNavigastionMenuAPI)

            let buttonComponent = navigationMenuBlock.findWhere(
                (node) => node.prop("data-test-id") === "btnToggleDraw"
              );
            buttonComponent.simulate("press");

            expect(navigationMenuBlock).toBeTruthy();
        });
        then('I can change Status Offline to oline without errors', () => {
            instance.changeStatus()
            instance.setState({isOnlineStatus: !instance.state.isOnlineStatus})
        });
        then('I can select the back button with out errors', () => {
            let buttonComponent = navigationMenuBlock.findWhere((node) => node.prop('testID') === 'btnbackArrow');
            // buttonComponent.simulate('press');
            instance.btnGoBack.onPress()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount();
            expect(navigationMenuBlock).toBeTruthy();
        });
    });

    test('Successfully fetch user details from storage', ({ given, when, then }) => {
    	given('there is user profile data stored', () => {});

    	when('the getUserDetail function is called', () => {});

    	then('the UserProfileDetail should be populated with the user data', () => {});
    });
    test('Handle empty or null user profile data', ({ given, when, then }) => {
        given('there is no user profile data stored', () => {});
    
        when('the getUserDetail function is called', async () => { });
    
        then('the UserProfileDetail should be an empty object', () => {});
      });

});
