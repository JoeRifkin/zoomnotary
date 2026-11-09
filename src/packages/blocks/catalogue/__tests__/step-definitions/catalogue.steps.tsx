import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
import { runEngine } from "../../../../framework/src/RunEngine";
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import Catalogue from "../../src/Catalogue";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Catalogue",
};

const feature = loadFeature("./__tests__/features/catalogue-scenario.feature");


const mockAPICall = (instance: any, apiCallID: string, apiData: any) => {
  const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
  instance[apiCallID] = msgSucessRestAPI.messageId
  runEngine.sendMessage("Unit Test", msgSucessRestAPI)
  return instance[apiCallID];
}

const getProductApiCallIdFailure = {
  data: null
}

const getProductApiCallIdSucces = {
  "data": [
    {
      "id": "1",
      "attributes": {
        "name": "Product 1",
        "price": "100",
        "average_rating": "4.5",
        "images": [
          { "url": "http://example.com/image1.jpg" } 
        ]
      }
    },
    { 
      "id": "2",
      "attributes": {
        "name": "Product 2",
        "price": "200",
        "average_rating": "4.0",
        "images": [
          { "url": "http://example.com/image2.jpg" }
        ]
      }
    }
  ]
}

const popularServicesRes = {
  "data": {
    data:[
      {
          "id": "23",
          "type": "service",
          "attributes": {
            "id": 23,
            "service_icon": {
              "url": "img"
            },
            "service_name": "Affidavits and Declarations",
            "service_description": "Preparing and certifying affidavits and statutory ",
            "is_selected": false
          }
        }
    ]
  }
};

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

const jurisdictionSuccessRes = [{
  id: 'ss',
  jurisdiction: 'Palestine',
  created_at: 'string',
  updated_at: 'string'
},

{
  id: 'ss',
  jurisdiction: 'Palese',
  created_at: 'string',
  updated_at: 'string'
},

{
  id: 'ss',
  jurisdiction: 'Pale',
  created_at: 'string',
  updated_at: 'string'
}
]


const popularNotariesSuccessRes = {
  data:[{
    photo: 'ss',
    jurisdiction: 'Palestine',
    rating: 3,
    name: 'string',
    total_notaries:2
  },
  
  {
    photo: 'ss',
    jurisdiction: 'Palee',
    rating: 3,
    name: 'string',
    total_notaries:2
  }
  ]
}

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.useFakeTimers();
  });

  test("User navigates to catalogue", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Catalogue;

    given("I am a User loading catalogue", () => {
      exampleBlockA = shallow(<Catalogue {...screenProps} />);
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", msgToken);
    });

    when("I navigate to the catalogue", () => {
      instance = exampleBlockA.instance() as Catalogue;
      mockAPICall(instance, "getProductApiCallId", getProductApiCallIdFailure);
      mockAPICall(instance, "getProductApiCallId", getProductApiCallIdSucces);

      jest.advanceTimersByTime(1000);
      mockAPICall(instance, "getJurisdictionsApiCallId", jurisdictionSuccessRes);
      mockAPICall(instance, "getPopularServicesApiCallId", popularServicesRes);
      mockAPICall(instance, "getPopularNotariesApiCallId", popularNotariesSuccessRes);
      mockAPICall(instance, "getNotaryServicesApiCallId", notaryServicesRes);




      const popularservicelist = exampleBlockA.findWhere((node) => node.prop('testID') === 'popularservicelist')
      popularservicelist.renderProp('renderItem')({ item:popularServicesRes.data.data[0] })
      popularservicelist.props().keyExtractor( popularServicesRes.data.data[0])
      expect(popularservicelist).toHaveLength(1)

      

      const popularnotaries = exampleBlockA.findWhere((node) => node.prop('testID') === 'popularnotaries')
      popularnotaries.props().keyExtractor(popularNotariesSuccessRes.data[0] )
      popularnotaries.renderProp('renderItem')({ item:popularNotariesSuccessRes.data[0] })
      expect(popularnotaries).toHaveLength(1)

      const notaryServices = exampleBlockA.findWhere((node) => node.prop('testID') === 'notaryServices')
      notaryServices.renderProp('renderItem')({ item:notaryServicesRes.data[0] })
      notaryServices.props().keyExtractor( notaryServicesRes.data[0])
      expect(notaryServices).toHaveLength(1) 
      
    });

    then("catalogue will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
      
    });

   

    when("user tap on change and search with wrong query", () => {
      let taptochange = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "tapChange"
      );
      taptochange.simulate("press");
      let searchQuery = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "searchQuery"
      );
      searchQuery.props().onChangeText('Search')
    });

    then("he will no result found", () => {
      const dropdownlist = exampleBlockA.findWhere((node) => node.prop('testID') === 'dropdownlist')
      dropdownlist.renderProp('ListEmptyComponent')()
    });

    when("user enters the right searh query", () => {
      let searchQuery = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "searchQuery"
      );
      searchQuery.props().onChangeText('Palestine')
    });

    then("he can see the filtered values", () => {
      const dropdownlist = exampleBlockA.findWhere((node) => node.prop('testID') === 'dropdownlist');
      const render_item = dropdownlist.renderProp("renderItem")({ item: jurisdictionSuccessRes[0], index: 0 })
      const selectJurisdiction = render_item.findWhere((node) => node.prop("testID") == "selectJurisdiction")
      selectJurisdiction.simulate('press');
      dropdownlist.renderProp('ListEmptyComponent')()
      dropdownlist.props().keyExtractor({ item: jurisdictionSuccessRes[0] });
      dropdownlist.props().renderItem({ item: jurisdictionSuccessRes[0] });

      const bottomNavigation = exampleBlockA.findWhere((node) => node.prop('testID') === 'bottomNavigation'); 
      bottomNavigation.props().onChangeBottomTab(12)
    });
  });


  test("User navigates to catalogue to book now", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Catalogue;

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

    given("I am a User loading catalogue", () => {
      exampleBlockA = shallow(<Catalogue {...screenProps} />);
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      msgToken.addData(getName(MessageEnum.SessionResponseData),JSON.stringify(userData));
      runEngine.sendMessage("Unit Test", msgToken);
    });

    when("user taps on the book now", () => {
      instance = exampleBlockA.instance() as Catalogue;
      let btnBookNowNotary = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnBookNowNotary"
      );
      btnBookNowNotary.simulate("press");

      let goto = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "goto"
      );
      goto.props().onPress()
      btnBookNowNotary.simulate("press");

    });

    then("he will go to another screen", () => {
      expect(exampleBlockA).toBeTruthy();
    });
  });

  test('Continue as guest button is pressed', ({ when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Catalogue;
    let mockSend: any;
    when('the "Continue as Guest" button is pressed', () => {
        dashboardWrapper = shallow(<Catalogue {...screenProps} />);
        instance = dashboardWrapper.instance() as Catalogue;
        mockSend = jest.fn();
        instance.send = mockSend;

    });
    then('a navigation message to the guest dashboard should be sent', () => {
        instance.continueAsGuestBtnProps.onPress();
    });

    then('the navigation props should be added to the message', () => {
        const msg = mockSend.mock.calls[0][0];
        expect(msg).toBeInstanceOf(Message);
        expect(msg.id).toBe(getName(MessageEnum.NavigationContinueAsGuestDashboardMessage));

    });
});
});
