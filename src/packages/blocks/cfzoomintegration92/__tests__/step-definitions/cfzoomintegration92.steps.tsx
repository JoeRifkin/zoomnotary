import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';

import React from 'react';
import { Dimensions } from 'react-native';
import Cfzoomintegration92 from '../../src/Cfzoomintegration92';

const screenProps = {
	navigation: {},
	id: 'Cfzoomintegration92',
};

const feature = loadFeature('./__tests__/features/cfzoomintegration92-scenario.feature');

defineFeature(feature, (test) => {
	let dimensionsGetSpy: jest.SpyInstance;
	let dimensionsAddEventListenerSpy: jest.SpyInstance;
	let forcedUpdateSpy: jest.SpyInstance;

	beforeEach(() => {
		jest.resetModules();
		jest.doMock('react-native', () => ({ Platform: { OS: 'ios' } }));
		jest.spyOn(helpers, 'getOS').mockImplementation(() => 'ios');

		dimensionsGetSpy = jest.spyOn(Dimensions, 'get').mockImplementation((dim: 'window' | 'screen') => ({
			width: 320,
			height: 640,
			scale: 1,
			fontScale: 1,
		}));

		dimensionsAddEventListenerSpy = jest.spyOn(Dimensions, 'addEventListener');

		forcedUpdateSpy = jest.spyOn(Cfzoomintegration92.prototype, 'forceUpdate');
	});

	test('User can input text into cfzoomintegration92', ({ given, when, then }) => {
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

		then('I can select the button with with out errors', () => {
			let buttonComponent = exampleBlockA.findWhere((node) => {
			return node.prop('data-test-id') === 'btnExample'});
			expect(instance.state.txtSavedValue).toEqual("A");
		});

		then('I can leave the screen with out errors', () => {
			instance.componentWillUnmount();
			expect(exampleBlockA.exists()).toBe(true);
		});
	});

	test('User can toggle showing and hiding non-secure and secure text', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Cfzoomintegration92;

		given('I am a User loading cfzoomintegration92', () => {
			exampleBlockA = shallow(<Cfzoomintegration92 {...screenProps} />);
		});

		when('I navigate to the cfzoomintegration92', () => {
			instance = exampleBlockA.instance() as Cfzoomintegration92;
		});

		then('the text will be shown in plain text', () => {
		});

		then('I press the toggle secure text button and it will be displayed securely', () => {
			let textInput = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInput');

			exampleBlockA.update();
			textInput = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'txtInput');

		});
	});

	test('User navigates away from cfzoomintegration92', ({ given, when, then }) => {
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

		then('I can dismiss cfzoomintegration92', () => {
			let touchableWithoutFeedback = exampleBlockA.findWhere(
				(node) => node.prop('data-test-id') === 'touchableWithoutFeedback'
			);
			touchableWithoutFeedback.simulate('press');
			expect(exampleBlockA.exists()).toBe(true);
		});
	});

	test('cfzoomintegration92 has event listeners for screen size changes added', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Cfzoomintegration92;

		given('I am a user loading cfzoomintegration92', () => {
			exampleBlockA = shallow(<Cfzoomintegration92 {...screenProps} />);
		});

		when('I Load cfzoomintegration92', () => {
			instance = exampleBlockA.instance() as Cfzoomintegration92;
		});

		then('the dimensions function has an event listener added', () => {
			expect(dimensionsAddEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
		});
	});

	test('cfzoomintegration92 resizing events are triggered', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Cfzoomintegration92;

		given('I am a user loading cfzoomintegration92', () => {
			exampleBlockA = shallow(<Cfzoomintegration92 {...screenProps} />);
		});

		when('I load cfzoomintegration92 and change screen size', () => {
			instance = exampleBlockA.instance() as Cfzoomintegration92;
			dimensionsAddEventListenerSpy.mock.calls[0][1]({
				width: 320,
				height: 640,
				scale: 1,
				fontScale: 1,
			});
		});

		then('the window change event is fired', () => {
			expect(forcedUpdateSpy).toHaveBeenCalled();
		});
	});

	test('Selected tab has the correct style', ({ given, when, then }) => {
		let result: string;
		let requestDetail: ShallowWrapper;
		let instance: Cfzoomintegration92;
		given('the selected tab key is "tab1"', () => {
		  requestDetail = shallow(<Cfzoomintegration92 {...screenProps} />);
		  instance = requestDetail.instance() as Cfzoomintegration92;
		  instance.setState({ selectedTab: 'tab1' });
		});
	
		when('the tabViewStyleCheck function is called with "tab1"', () => {
		  result = instance.tabViewStyleCheck('tab1');
		});
	
		then('it should return "tabBorderCheck"', () => {
		  expect(result).toBe('tabBorderCheck');
		});
	  });
	
	  test('Unselected tab has the correct style', ({ given, when, then }) => {
		let result: string;
		let requestDetail: ShallowWrapper;
		let instance: Cfzoomintegration92;
		given('the selected tab key is "tab1"', () => {
		  requestDetail = shallow(<Cfzoomintegration92 {...screenProps} />);
		  instance = requestDetail.instance() as Cfzoomintegration92;
		  instance.setState({ selectedTab: 'tab1' });
		});
	
		when('the tabViewStyleCheck function is called with "tab2"', () => {
		  result = instance.tabViewStyleCheck('tab2');
		});
	
		then('it should return "unselectedTabBorderCHeck"', () => {
		  expect(result).toBe('unselectedTabBorderCHeck');
		});
	  });

	  test("Go back when button is pressed", ({ given, when, then }) => {
		  let requestDetail: ShallowWrapper;
		  let instance: Cfzoomintegration92;
		  let goBackMock: any;
		  given("the component is rendered", () => {
			requestDetail = shallow(<Cfzoomintegration92 {...screenProps} />);
			instance = requestDetail.instance() as Cfzoomintegration92;
			goBackMock = jest.spyOn(instance, "tabViewStyleCheck");
			expect(instance).toBeDefined();
		  });
	  
		  when("the go back button is pressed", () => {
			instance.btnGoBackOnRequestDetail.onPress();
		  });
	  
		  then("the goBack function should be called", () => {
			expect(goBackMock).toHaveBeenCalledWith('tab1');
		  });
		});
});
