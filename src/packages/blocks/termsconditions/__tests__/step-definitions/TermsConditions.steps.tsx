import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import TermsConditions from "../../src/TermsConditions";
import { ITermsConds } from "../../src/TermsConditionsController";
const navigation = require("react-navigation");

const screenProps = {
  navigation,
  id: "TermsConditions",
};

const feature = loadFeature(
  "./__tests__/features/TermsConditions-scenario.feature"
);

const testTermsCondsList: ITermsConds[] = [
  {
    id: "1",
    description: "description",
    accepted_by: "",
    created_at: "2099-04-12T23:40:46.740Z",
    title: "hello"
  },
  {
    id: "2",
    description: "description2",
    accepted_by: "",
    created_at: "2099-04-12T23:40:48.740Z",
    title: "this"
  },
];

const accountGroups = [
  {
    attributes: {
      accounts: [
        {
          id: 1,
          role_id: 1,
        },
      ],
    },
  },
];

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to TermsConditions", ({ given, when, then }) => {
    let termsConditionsWrapper: ShallowWrapper;
    let instance: TermsConditions;
    let termsCondsList: ShallowWrapper<any, any>;

    given("I am a User loading TermsConditions", () => {
      termsConditionsWrapper = shallow(<TermsConditions {...screenProps} />);
    });

    when("I navigate to TermsConditions", () => {
      instance = termsConditionsWrapper.instance() as TermsConditions;
      jest.spyOn(instance, "send");
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      msgToken.addData(
        getName(MessageEnum.SessionResponseData),
        JSON.stringify({ meta: { id: 1 } })
      );
      runEngine.sendMessage("Unit Test", msgToken);

      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );

      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: testTermsCondsList,
          meta: {
            message: "termsconds data",
          },
        }
      );

      instance.getTermsCondsListCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);

      const msgAccountGroupsAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgAccountGroupsAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgAccountGroupsAPI.messageId
      );

      msgAccountGroupsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: accountGroups,
          meta: {
            message: "accountGroups data",
          },
        }
      );

      instance.getTermsCondsListCallId = msgAccountGroupsAPI.messageId;
      runEngine.sendMessage("Unit Test", msgAccountGroupsAPI);
    });

    then("TermsConditions will load with out errors", () => {
      expect(termsConditionsWrapper).toBeTruthy();
    });
    then('I can select the back button with out errors', () => {
      let buttonComponent = termsConditionsWrapper.findWhere((node) => node.prop('testID') === 'btnbackArrow');
      buttonComponent.simulate('press');
      instance.btnGoBack.onPress()
    });

    then("I can leave the screen", () => {
      instance.componentWillUnmount();
      expect(termsConditionsWrapper).toBeTruthy();
    });
  });

  test('Extracting title and description from HTML data', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: TermsConditions;
    let htmlData: string;
    let extractedSections: any;
    given('HTML data string value', () => {
      dashboardWrapper = shallow(<TermsConditions {...screenProps} />);
      htmlData = "<h2>1. OUR SERVICES</h2><blockquote>The information provided when using the Services.</blockquote><h2>2. INTELLECTUAL PROPERTY RIGHTS</h2><blockquote>Our intellectual property all source code.";
    });

    when('I extract titles and descriptions', async () => {
      instance = dashboardWrapper.instance() as TermsConditions;
      extractedSections = instance.extractTitleAndDescription(htmlData);
    });

    then('I should get the following extracted sections', () => {
      const dataTable = [{title: "1. OUR SERVICES", description: "The information provided when using the Services."},
      {title: "2. INTELLECTUAL PROPERTY RIGHTS", description: "Our intellectual property all source code."}]
      const expectedSections = dataTable.map((row: any) => ({
        title: row.title,
        description: row.description
      }));
    
      expect(extractedSections).toEqual(expectedSections);
    });
  });

  test('Generating HTML content when termsConds is populated', ({ given, when, then }) => {
    let result: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: TermsConditions;
    given('the termsConds state contains a title and description', () => {
      dashboardWrapper = shallow(<TermsConditions {...screenProps} />);
      instance = dashboardWrapper.instance() as TermsConditions;
      instance.setState({
        termsConds: {
          title: 'Terms & Conditions: ',
          description: 'Please read and accept the terms.',
          created_at: '',
          id: '',
          accepted_by: ''
        },
      });
    });

    when('the getSource function is called', () => {
      result = instance.getSource();
    });

    then('it should return an object with the concatenated HTML content', () => {
      expect(result).toEqual({
        html: 'Terms & Conditions: Please read and accept the terms.',
      });
    });
  });

  test('Generating HTML content when termsConds is empty', ({ given, when, then }) => {
    let result: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: TermsConditions;
    given('the termsConds state is empty', () => {
      dashboardWrapper = shallow(<TermsConditions {...screenProps} />);
      instance = dashboardWrapper.instance() as TermsConditions;
      instance.setState({ termsConds: {title: '',
        description: '',
        created_at: '',
        id: '',
        accepted_by: ''} });
    });

    when('the getSource function is called', () => {
      result = instance.getSource();
    });

    then('it should return an object with an empty string as the HTML content', () => {
      expect(result).toEqual({ html: '' });
    });
  });
});
