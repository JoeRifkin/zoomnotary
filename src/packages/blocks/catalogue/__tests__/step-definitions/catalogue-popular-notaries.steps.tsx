import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
import { runEngine } from "../../../../framework/src/RunEngine";
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import CataloguePopularNotaries from "../../src/CataloguePopularNotaries";
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
  id: "CataloguePopularNotaries",
};

const feature = loadFeature("./__tests__/features/catalogue-popular-notaries-scenario.feature");

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
  ],
  pagination:{
    next_page:1,
    total_pages:3
  }
}

const searchResponse = {
  "data": {
    accounts: {
      data: [
        {
          "id": "2s3",
          "type": "service",
          "attributes": {
            "id": 23,
            "photo": {
              "url": "img"
            },
            "full_name": "short",
            "jurisdiction": 'Wales',
            "rating": 1,
            "total_notaries": 3
          }
        },
      ]
    },
    pagination:{
      next_page:1,
      total_pages:3
    }
  },
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



defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.useFakeTimers();
  });

  test("User navigates to CataloguePopularNotaries", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: CataloguePopularNotaries;

    given("I am a User loading CataloguePopularNotaries", () => {
      exampleBlockA = shallow(<CataloguePopularNotaries {...screenProps} />);
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      msgToken.addData(getName(MessageEnum.SessionResponseData),JSON.stringify(userData));
      runEngine.sendMessage("Unit Test", msgToken);
    });

    when("I navigate to the CataloguePopularNotaries", () => {
      instance = exampleBlockA.instance() as CataloguePopularNotaries;
      jest.advanceTimersByTime(1000);
      
      mockAPICall(instance, "getPopularNotariesApiCallId", {});
      mockAPICall(instance, "getPopularNotariesApiCallId", popularNotariesSuccessRes);
      mockAPICall(instance, "getJurisdictionsApiCallId", jurisdictionSuccessRes);

    });

    then("CataloguePopularNotaries will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();

      const popularNotaries = exampleBlockA.findWhere((node) => node.prop('testID') === 'popularNotaries')
      popularNotaries.renderProp('renderItem')({ item:popularNotariesSuccessRes.data[0] })
      popularNotaries.props().keyExtractor( popularNotariesSuccessRes.data[0])
      expect(popularNotaries).toHaveLength(1) 
    });


    when("user scroll down another api call wil happen", () => {
      const popularNotaries = exampleBlockA.findWhere((node) => node.prop('testID') === 'popularNotaries')
      console.log('popularNotaries', popularNotaries.props())
      jest.advanceTimersByTime(1000);
      popularNotaries.props().onEndReached()
    });

    then("user can see the search result", () => {
      expect(exampleBlockA).toBeTruthy();
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
      const popularNotaries = exampleBlockA.findWhere((node) => node.prop('testID') === 'popularNotaries')
      popularNotaries.renderProp('renderItem')({ item: searchResponse.data.accounts.data[0] })
      expect(popularNotaries).toHaveLength(1) 

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
    });

    when("user press on filter icon", () => {
      let customHeader = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "customHeader"
      );

      customHeader.props().onPressFilter()
    });

    then("he will see the jurisdiction sheet", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    when("user select the jurisdiction", () => {

      let JurisdictionList = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "JurisdictionList"
      );

     


      console.log('JurisdictionList',JurisdictionList.props())
     const renderItem =  JurisdictionList.renderProp('renderItem')({ item: jurisdictionSuccessRes[0] })
      JurisdictionList.props().keyExtractor(jurisdictionSuccessRes)
      renderItem.simulate('press')

      let clearFilterBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "clearFilterBtn"
      );

      clearFilterBtn.simulate('press')
      
    });

    then("he will see the selected jurisdiction below searchbox", () => {
      expect(exampleBlockA).toBeTruthy();
      let btnBookNowNotary = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnBookNowNotary"
      );
      btnBookNowNotary.simulate("press");
      instance.componentWillUnmount()
    });
   
  });
});
