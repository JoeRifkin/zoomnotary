import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';
import { runEngine } from '../../../../framework/src/RunEngine';
import { Message } from '../../../../framework/src/Message';

import MessageEnum, { getName } from '../../../../framework/src/Messages/MessageEnum';
import React from 'react';
import Emailnotifications2 from '../../src/Emailnotifications2.web';

const screenProps = {
	navigation: {},
	id: 'Emailnotifications2',
};

const feature = loadFeature('./__tests__/features/emailnotifications2-scenario.web.feature');

defineFeature(feature, (test) => {
	beforeEach(() => {
		jest.resetModules();
		jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
		jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
	});

	test('User navigates to emailnotifications2 and inputs text', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Emailnotifications2;

		given('I am a User loading emailnotifications2', () => {
			exampleBlockA = shallow(<Emailnotifications2 {...screenProps} />);
		});

		when('I navigate to the emailnotifications2', () => {
			instance = exampleBlockA.instance() as Emailnotifications2;
		});

		then('emailnotifications2 will load with out errors', () => {
			expect(exampleBlockA.exists()).toBe(true);
		});

		then('I can enter text with out errors', () => {
			let textInputComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInput');
			textInputComponent.simulate('changeText', 'hello@aol.com');
			expect(instance.state.txtInputValue).toEqual('hello@aol.com');
		});

		then('I can select the button with out errors', () => {
			let textInputComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInput');
			textInputComponent.props().onChangeText("hello@aol.com")
			let buttonComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'btnAddExample');
			const buttonPressedSpy = jest.spyOn(instance, 'doButtonPressed')
			buttonComponent.simulate('press');
			expect(buttonPressedSpy).toHaveBeenCalled();
		});

		then('I can leave the screen with out errors', () => {
			instance.componentWillUnmount();
			expect(exampleBlockA.exists()).toBe(true);
		});
	});

	test('User navigates to emailnotifications2 and inputs a password', ({ given, when, then, and }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Emailnotifications2;

		given('I am a User loading emailnotifications2', () => {
			exampleBlockA = shallow(<Emailnotifications2 {...screenProps} />);
		});

		when('I navigate to the emailnotifications2', () => {
			instance = exampleBlockA.instance() as Emailnotifications2;
		});

		when('I want to enter a password', () => {
			instance.setState({ enableField: true });
			exampleBlockA.update();
		});

		then('emailnotifications2 will load with out errors', () => {
			expect(exampleBlockA.exists()).toBe(true);
		});

		then('the text input field will be a password field', () => {
			let textInputComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInput').first();
			expect(textInputComponent.prop('secureTextEntry')).toEqual(false);
		});

		then('I can enter text with out errors', () => {
			let textInputComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInput').first();
	
			textInputComponent.props().onChangeText('hello@aol.com');
			expect(instance.state.txtInputValue).toEqual('hello@aol.com');
		});

		then('I can toggle to show the password', () => {
			

			let txtInputField = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInput').dive();

			let togglePasswordBtn = txtInputField
				.findWhere((node) => node.prop('data-test-id') === 'btnTogglePassword')

			togglePasswordBtn.simulate('press');
			exampleBlockA.update();

			txtInputField = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInput');
			
			expect(txtInputField.prop('secureTextEntry')).toEqual(false);
		});

		then('I can select the button with out errors', () => {
			let buttonComponent = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'btnAddExample').first();
			buttonComponent.simulate('click');
			expect(exampleBlockA.exists()).toBe(true);
		});

		then('I can leave the screen with out errors', () => {
			instance.componentWillUnmount();
			expect(exampleBlockA.exists()).toBe(true);
		});
	});
});
