
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
import { runEngine } from "../../../../framework/src/RunEngine";
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import NotaryServices from "../../src/NotaryServices";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "NotaryServices",
};

const feature = loadFeature("./__tests__/features/notary-services-scenario.feature");

const mockAPICall = (instance: any, apiCallID: string, apiData: any) => {
  const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
  instance[apiCallID] = msgSucessRestAPI.messageId
  runEngine.sendMessage("Unit Test", msgSucessRestAPI)
  return instance[apiCallID];
}

const notaryServicesRes = {
  "data": [
    {
      "id": "23",
      "type": "service",
      "attributes": {
        "id": 23,
        "service_icon": {
          "url": "img"
        },
        "service_name": "Affidavits and Declarations",
        "service_description": "Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory ",
        "is_selected": false
      }
    },

    {
      "id": "2d3",
      "type": "service",
      "attributes": {
        "id": 23,
        "service_icon": {
          "url": "img"
        },
        "service_name": "Affidavits and Declarations",
        "service_description": "Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory ",
        "is_selected": false
      }
    },

    {
      "id": "2s3",
      "type": "service",
      "attributes": {
        "id": 23,
        "service_icon": {
          "url": "img"
        },
        "service_name": "Affidavits and Declarations",
        "service_description": "Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory ",
        "is_selected": false
      }
    },

    {
      "id": "23g",
      "type": "service",
      "attributes": {
        "id": 23,
        "service_icon": {
          "url": "img"
        },
        "service_name": "Affidavits and Declarations",
        "service_description": "Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory ",
        "is_selected": false
      }
    },
  ]
};

const noSelectedServices = {
  services: []
}

const serviceResponse={
  "data": [
      {
          "id": "29",
          "type": "service",
          "attributes": {
              "id": 29,
              "service_icon": {
                  "url": ""
              },
              "service_name": " Other (Translation, Diploma verification, apostille)",
              "service_description": "Other services will be added after launch. Prior to the launch, they should be grayed out.",
              "is_selected": false
          }
      },
      
  ]
}

const serviceErrorResponse={
  message:"You have unchecked some services for which the corresponding requests need to be completed"
}

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout").mockImplementation((callback: Function) => callback());

  });

  test("User navigates to NotaryServices with zero selected services", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: NotaryServices;

    given("I am a User loading NotaryServices it will load with out errors", () => {
      exampleBlockA = shallow(<NotaryServices {...screenProps} />);
      instance = exampleBlockA.instance() as NotaryServices;
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "token-sdfkajsdlhksdjhf");
      runEngine.sendMessage("Unit Test", msgToken);

      jest.advanceTimersByTime(1000);

      mockAPICall(instance, "getServicesApiCallId", notaryServicesRes);
      mockAPICall(instance, "getSelectedServicesApiCallId", noSelectedServices);
    });

    when("the user tap on any services checkbox", () => {
      let servicesList = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "servicesList"
      );
      jest.advanceTimersByTime(1000);
      servicesList.props().clickOnSelect('23')
      servicesList.props().clickOnSelect('23')
      servicesList.props().clickOnAllSelect()
      servicesList.props().clickOnAllSelect()
      servicesList.props().clickOnSelect('23')
    });

    then("it will get selected", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    when("the user tap save button", () => {
      let SaveBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "SaveBtn"
      );
      SaveBtn.props().onPress()
    });

    then("the pop up will show", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    when("the user click on Yes button", () => {
      let yes = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "yes"
      );
      mockAPICall(instance, "addServicesApiCallId", serviceResponse);
      yes.props().onPress()
    });

    then("the add service api will be called", () => {
      let yes = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "yes"
      );
      expect(yes.props().title).toBe('Yes')
    });

  });

  test("User navigates to NotaryServices with zero selected services with error", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: NotaryServices;

    given("I am a User loading NotaryServices it will load with out errors", () => {
      exampleBlockA = shallow(<NotaryServices {...screenProps} />);
      instance = exampleBlockA.instance() as NotaryServices;
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "token-sdfkajsdlhksdjhf");
      runEngine.sendMessage("Unit Test", msgToken);

      jest.advanceTimersByTime(1000);

      mockAPICall(instance, "getServicesApiCallId", notaryServicesRes);
      mockAPICall(instance, "getSelectedServicesApiCallId", noSelectedServices);
    });

    when("the user tap on any services checkbox", () => {
      let servicesList = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "servicesList"
      );
      jest.advanceTimersByTime(1000); 
      servicesList.props().clickOnSelect('23')
      servicesList.props().clickOnSelect('23')
      servicesList.props().clickOnAllSelect()
      servicesList.props().clickOnAllSelect()
      servicesList.props().clickOnSelect('23')
    });

    then("it will get selected", () => {
      let servicesList = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "servicesList"
      );
      expect(servicesList.props().isChecked).toBe(true)
    });

    when("the user tap save button", () => {
      let SaveBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "SaveBtn"
      );
      SaveBtn.props().onPress()
    });

    then("the pop up will show", () => {
      let SaveBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "SaveBtn"
      );
      expect(SaveBtn.props().title).toBe('Save')
    });

    when("the user click on Yes button", () => {
      let yes = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "yes"
      );
      mockAPICall(instance, "addServicesApiCallId", serviceErrorResponse);
      jest.runAllTimers();
      exampleBlockA.update();
      yes.props().onPress()
    });

    then("the add service api will be called", () => {
      let yes = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "yes"
      );
      expect(yes.props().title).toBe('Yes')
    });

  });
});
