import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';
import { runEngine } from '../../../../framework/src/RunEngine';
import { Message } from '../../../../framework/src/Message';

import MessageEnum, { getName } from '../../../../framework/src/Messages/MessageEnum';
import React from 'react';
import Cfzoomintegration92 from '../../src/Cfzoomintegration92.web';

const screenProps = {
	navigation: {},
	id: 'Cfzoomintegration92',
};

const feature = loadFeature('./__tests__/features/cfzoomintegration92-scenario.web.feature');

defineFeature(feature, (test) => {
	beforeEach(() => {
		jest.resetModules();
		jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
		jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
	});

	test('User navigates to cfzoomintegration92 and inputs text', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Cfzoomintegration92;

		given('I am a User loading cfzoomintegration92', () => {
			exampleBlockA = shallow(<Cfzoomintegration92 {...screenProps} />);
		});

		when('I navigate to the cfzoomintegration92', () => {
			instance = exampleBlockA.instance() as Cfzoomintegration92;
		});

		then('cfzoomintegration92 will load with out errors', () => {
			expect(exampleBlockA.exists()).toBe(true);
		});

		then('I can enter text with out errors', () => {
			expect(instance.state.txtInputValue).toEqual("");
		});

		then('I can select the button with out errors', () => {
		});

		then('I can leave the screen with out errors', () => {
			instance.componentWillUnmount();
			expect(exampleBlockA.exists()).toBe(true);
		});
	});

	test('User navigates to cfzoomintegration92 and inputs a password', ({ given, when, then, and }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Cfzoomintegration92;

		given('I am a User loading cfzoomintegration92', () => {
			exampleBlockA = shallow(<Cfzoomintegration92 {...screenProps} />);
		});

		when('I navigate to the cfzoomintegration92', () => {
			instance = exampleBlockA.instance() as Cfzoomintegration92;
		});

		when('I want to enter a password', () => {
			instance.setState({ enableField: true });
			exampleBlockA.update();
		});

		then('cfzoomintegration92 will load with out errors', () => {
			expect(exampleBlockA.exists()).toBe(true);
		});

		then('the text input field will be a password field', () => {
		});

		then('I can enter text with out errors', () => {
			
			expect(instance.state.txtInputValue).toEqual("");
		});

		then('I can toggle to show the password', () => {
		});

		then('I can select the button with out errors', () => {
			
			expect(exampleBlockA.exists()).toBe(true);
		});

		then('I can leave the screen with out errors', () => {
			instance.componentWillUnmount();
			expect(exampleBlockA.exists()).toBe(true);
		});
	});
});
