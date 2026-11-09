import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
import { runEngine } from "../../../../framework/src/RunEngine";
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import CatalogueNotaryServices from "../../src/CatalogueNotaryServices";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    goBack: jest.fn(),
    addListener: jest.fn((event, callback) => {
      if (event === 'willFocus') {
        callback();
      }
      return { remove: jest.fn() }; // To mimic the real behavior
    }),
  },
  id: "CatalogueNotaryServices",
};

const feature = loadFeature("./__tests__/features/catalogue-notary-services-scenario.feature");

const mockAPICall = (instance: any, apiCallID: string, apiData: any) => {
  const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
  instance[apiCallID] = msgSucessRestAPI.messageId
  runEngine.sendMessage("Unit Test", msgSucessRestAPI)
  return instance[apiCallID];
}

const userData = {
  meta: {
    profile: {
      data: {
        attributes: {
          name: "John Doe",
          "activated": false,
          "address": null,
          "address_line_2": null,
          "age": null,
          "city": null,
          "company_name": null,
          "contact_name": "",
          "country": null,
          "country_code": null,
          "date_of_birth": null,
          "email": "",
          "first_name": null,
          "full_name": "",
          "full_phone_number": "",
          "gender": null,
          "id": 0,
          "last_name": null,
          "phone_number": null,
          "photo": {
            "url": null,
          },
          "platform": null,
          "post_code": null,
          "role_id": 0,
          "status": "",
          "suspend_until": null,
          "user_name": null,
          "user_type": "",
        }
      }
    },
    token: 'valid_token',
    role: 'end_user'
  }
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
        "service_description": "asdfsdfy ",
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
        "service_name": "short",
        "service_description": "sdfasdf",
        "is_selected": false
      }
    },
  ]
};
const searchResponse = {
  "data": {
    services: {
      data: [
        {
          "id": "2s3",
          "type": "service",
          "attributes": {
            "id": 23,
            "service_icon": {
              "url": "img"
            },
            "service_name": "short",
            "service_description": "Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory  Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory Preparing and certifying affidavits and statutory ",
            "is_selected": false
          }
        },
      ]
    }
  }
};


defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.useFakeTimers();
  });

  test("User navigates to CatalogueNotaryServices", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: CatalogueNotaryServices;

    given("I am a User loading CatalogueNotaryServices", () => {
      exampleBlockA = shallow(<CatalogueNotaryServices {...screenProps} />);
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      msgToken.addData(getName(MessageEnum.SessionResponseData),JSON.stringify(userData));
      runEngine.sendMessage("Unit Test", msgToken);
    });

    when("I navigate to the CatalogueNotaryServices", () => {
      instance = exampleBlockA.instance() as CatalogueNotaryServices;
      jest.advanceTimersByTime(1000);
      mockAPICall(instance, "getNotaryServicesApiCallId", {});
      mockAPICall(instance, "getNotaryServicesApiCallId", notaryServicesRes);

    });

    then("CatalogueNotaryServices will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();

      const notaryServices = exampleBlockA.findWhere((node) => node.prop('testID') === 'notaryServices')
      notaryServices.renderProp('renderItem')({ item:notaryServicesRes.data[0] })
      notaryServices.props().keyExtractor( notaryServicesRes.data[0])
      expect(notaryServices).toHaveLength(1) 
    });


    when("user enters and remove it", () => {
      let searchBox = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "searchBox"
      );
      // search with empty 
      searchBox.props().onChange('')
      jest.advanceTimersByTime(1000);

      mockAPICall(instance, "searchApiCallId", {});
      
    });

    then("user wont see any result", () => {
      const bottomNavigation = exampleBlockA.findWhere((node) => node.prop('testID') === 'bottomNavigation'); 
      bottomNavigation.props().onChangeBottomTab(12);

      let customHeader = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "customHeader"
      );

      customHeader.props().goBack()
      console.log('customHeader',customHeader.props())
    });

    when("user enters the search query without any failure", () => {
      let searchBox = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "searchBox"
      );
      searchBox.props().onChange('short')
      jest.advanceTimersByTime(1000);

      mockAPICall(instance, "searchApiCallId", searchResponse);
      
    });

    then("user can see the search result", () => {
      const notaryServices = exampleBlockA.findWhere((node) => node.prop('testID') === 'notaryServices')
      notaryServices.renderProp('renderItem')({ item:searchResponse.data.services.data[0] })
      expect(notaryServices).toHaveLength(1) 

      const bottomNavigation = exampleBlockA.findWhere((node) => node.prop('testID') === 'bottomNavigation'); 
      bottomNavigation.props().onChangeBottomTab(12);

      let customHeader = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "customHeader"
      );

      customHeader.props().goBack()
      console.log('customHeader',customHeader.props())
    });

    when("user enters the search query without any failure and clicks on cross icon", () => {
      let searchBox = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "searchBox"
      );
      jest.advanceTimersByTime(1000);

      searchBox.props().onChange('short')
      searchBox.props().onClear()

      mockAPICall(instance, "searchApiCallId", searchResponse);
      
    });

    then("user can see the list", () => {
      expect(exampleBlockA).toBeTruthy();
      instance.componentWillUnmount()
    });
   
  });
});
