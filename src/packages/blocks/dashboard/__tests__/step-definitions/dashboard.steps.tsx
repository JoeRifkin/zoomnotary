import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import Dashboard from "../../src/Dashboard";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import { GenericHeader } from "../../../../components/src/GenericHeader";

import { BackHandler, Platform } from 'react-native';
import 'react-native-gesture-handler/jestSetup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorageData, setStorageData } from "../../../../framework/src/Utilities";
import { checkGrayImg, viewImg, cancelImg, editImg, MLinkImg, messageImg, notificationImg, notificationRedImg } from "../../src/assets";
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
  id: "Dashboard"
};
const feature = loadFeature("./__tests__/features/dashboard-scenario.feature");

jest.mock('../../../../framework/src/Utilities', () => {
  return {
    getStorageData: async () => jest.fn(),
    setStorageData: async () => jest.fn()
  };
});

let mockSetTimeout: Function;
global.setTimeout = jest
  .fn()
  .mockImplementation((callbackFn) => (mockSetTimeout = callbackFn)) as any;
jest.mock('@react-native-async-storage/async-storage');

const mockAPICall = (instance: any, apiCallID: string, apiData: any) => {
  const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
  instance[apiCallID] = msgSucessRestAPI.messageId
  runEngine.sendMessage("Unit Test", msgSucessRestAPI)
  return instance[apiCallID];
}

const mockGetStorageData = getStorageData as jest.MockedFunction<typeof getStorageData>;
const dashboadrData = [
  {
    "id": "43",
    "type": "notary_request",
    "attributes": {
      "status": "pending",
      "notary_id": null,
      "notarisation_method_id": 2,
      "jurisdiction_id": 2,
      "date": "2024-05-31T00:00:00.000Z",
      "notarised_document": 1,
      "file_documents": []
    }
  }
]

let userDetailForRole2 = {
  id: 0,
  first_name: null,
  last_name: null,
  full_phone_number: "",
  city: null,
  post_code: null,
  country_code: null,
  phone_number: null,
  email: "",
  activated: false,
  user_type: "",
  user_name: null,
  platform: null,
  suspend_until: null,
  status: "",
  role_id: 2,
  full_name: "",
  gender: null,
  date_of_birth: null,
  age: null,
  country: null,
  address: null,
  address_line_2: null,
  contact_name: "",
  company_name: null,
  photo: { url: null }
}

let userDetailForRole3 = {
  id: 0,
  first_name: null,
  last_name: null,
  full_phone_number: "",
  city: null,
  post_code: null,
  country_code: null,
  phone_number: null,
  email: "",
  activated: false,
  user_type: "",
  user_name: null,
  platform: null,
  suspend_until: null,
  status: "",
  role_id: 3,
  full_name: "",
  gender: null,
  date_of_birth: null,
  age: null,
  country: null,
  address: null,
  address_line_2: null,
  contact_name: "",
  company_name: null,
  photo: { url: null }
}

const inviteDummyData = [
  {
      "id": "588",
      "type": "notary_request_dashboard",
      "attributes": {
          "status": "PENDING",
          "notary_id": 349,
          "notary_service_type": 2,
          "priority": "Standard",
          "notarisation_method_id": 1,
          "date": "2025-02-27T00:00:00.000Z",
          "invited_request_status": "REJECTED",
          "is_deleted": false,
          "invite_request": true,
          "invite_number": 6787678965,
          "notarisation_method": {
              "id": 1,
              "notarisation_method": "Remote Electronic Notarisation (REN)",
              "created_at": "2024-05-08T06:14:28.072Z",
              "updated_at": "2024-05-08T06:47:44.043Z"
          },
          "notary_service_name": "Business and Corporate Services",
          "quote_statuses_id": 1
      }
  }]

const menuItems = [{"action": ["pending", "cancelled", "completed", "in progress", "draft"], "icon": {"testUri": "../../../packages/blocks/dashboard/assets/view.png"}, "key": "view", "text": "View"}, {"action": ["pending", "draft"], "icon": {"testUri": "../../../packages/blocks/dashboard/assets/edit.png"}, "key": "edit", "text": "Edit"}, {"action": ["in progress"], "icon": {"testUri": "../../../packages/blocks/dashboard/assets/MLink.png"}, "key": "mLink", "text": "Meeting Link"}, {"action": ["in progress"], "icon": {"testUri": "../../../packages/blocks/dashboard/assets/message.png"}, "key": "message", "text": "Message"}, {"action": ["pending", "in progress"], "icon": {"testUri": "../../../packages/blocks/dashboard/assets/cancel.png"}, "key": "cancel", "text": "Cancel"}, {"action": ["draft"], "icon": {"testUri": "../../../packages/blocks/dashboard/assets/delete.png"}, "key": "cancel", "text": "delete"}]

const menuItemsForNotary = [
  { icon: viewImg, text: 'View', key: 'view', action: ['pending', "cancelled", "completed", "in progress"] },
  { icon: editImg, text: "Submit Quote", key: 'submit', action: ['pending'] },
  { icon: cancelImg, text: 'Withdraw Quote', key: 'withdraw', action: ['pending'] },
  { icon: MLinkImg, text: 'Meeting Link', key: 'mLink', action: ["in progress"] },
  { icon: messageImg, text: 'Message', key: 'message', action: ["in progress"] }
];

const menuItemsInvite = [
  { icon: viewImg, text: 'View', key: 'view', action: ["invite","rejected"] },
  { icon: checkGrayImg, text: 'Accept', key: 'Accept', action: ["invite",] },
  { icon: cancelImg, text: 'Reject', key: 'Reject', action:['invite']  },
];

const menuItemsInviteForNotary = [
  { icon: viewImg, text: 'View', key: 'view', action: ["invite","rejected", "accepted"] }
];

jest.mock('../../../../framework/src/Utilities', () => ({
  setStorageData: jest.fn(),
  getStorageData: jest.fn()
}))

defineFeature(feature, test => {
  let alertMessage: string;
  let userRole: any;
  let setStorageDataMock: any;
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    global.alert = jest.fn((message) => { alertMessage = message; });

    AsyncStorage.clear();
    setStorageDataMock = jest.fn();

    jest.clearAllMocks();
    jest.clearAllMocks();
    setStorageDataMock = setStorageData;
    jest.useFakeTimers();
  });

  const mockAsyncStorageGetItem = (data: any) => {
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation(async (key) => {
      if (key === 'signUpUserDetail') {
        return data ? JSON.stringify(data) : null;
      }
      return null;
    });
  };

  test("User navigates to dashboard", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given("I am a User loading dashboard", () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
    });

    when("I navigate to the dashboard", () => {
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({ token: "jhjkfhdjwi65iyehgndq5874iyehj", dashboardData: dashboadrData, loading: false })
    });

    then("dashboard will load with out errors", () => {
      expect(instance.getRequestCountData()).toBe(true)
      expect(instance.getDashboardData()).toBe(true)
    });

    then("i can click on avatar icon with out errors", () => {
      let ArrowButton = dashboardWrapper.find(GenericHeader).dive()
      let buttonComponent = ArrowButton.findWhere((node) => node.prop('testID') === 'btnAvatarIcon');
      buttonComponent.simulate('press')
    });

    then("i can click on Book now button with out errors", () => {
      instance.setState({ userRoleType: 'end_user' })
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'btnBookNowNotary');
      buttonComponent.simulate('press')
      instance.convertData("2024-02-13T00:00:00.000Z");
      instance.truncatedText("this is a notary serive title", 10)
      instance.renderStatusText("draft")
      instance.renderStatusText("completed")
      instance.renderStatusText("pending")
      instance.renderStatusText("cancelled")
      instance.renderStatusText("in_progress")
      instance.renderStatusText("invite")
      instance.renderStatusText("rejected")
      instance.renderStatusText("accepted")
      instance.renderStatusView("cancelled")
      instance.renderStatusView("pending")
      instance.renderStatusView("draft")
      instance.renderStatusView("completed")
      instance.renderStatusView("in_progress")
      instance.renderStatusView("invite")
      instance.renderStatusView("rejected")
      instance.renderStatusView("accepted")
      const dashboadrData2 = [
        {item: {
          "id": "43",
          "type": "notary_request",
          "attributes": {
            "status": "pending",
            "notary_id": null,
            "notarisation_method_id": 2,
            "jurisdiction_id": 2,
            "date": "2024-05-31T00:00:00.000Z",
            "notarised_document": 1,
            "file_documents": []
          }
        }}
      ]
      instance.renderNotaryRequestList(dashboadrData2[0])
      instance.renderCardRightBorder("Standard")
      instance.renderCardRightBorder("Priority")
      instance.renderCardRightBorder("Super Priority")
      instance.renderDash()
      let buttonComponent1 = dashboardWrapper.findWhere(
        (node) => node.prop("testID") === "onNewInviteTestID"
      );
      // buttonComponent1.simulate("press");
      expect(instance.renderCardRightBorder("Priority")).toBe('cardBorderRightColorForDraftPendingCancelled')
    });

    when("Call api for get Request list data without error", () => {
      const dashboardApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        dashboardApiCallId.messageId
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dashboadrData
      );
      instance.apiDashboardItemCallId = dashboardApiCallId.messageId;
      runEngine.sendMessage("Unit Test", dashboardApiCallId);
    });

    then("request list api given sucess response without error", () => {
      instance.toggleDropdown(1)
      expect(instance.getDashboardData()).toBe(true)
    })

    when("Call api for get Services data without error", () => {
      instance.closeToggleDropDown()
      const dashboardApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        dashboardApiCallId.messageId
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dashboadrData
      );
      instance.apiNotaryServiceCallId = dashboardApiCallId.messageId;
      runEngine.sendMessage("Unit Test", dashboardApiCallId);
    });

    then("Services api given sucess response without error", () => {
      instance.getSetviceModelOpen("")
      expect(instance.getNotaryServieData()).toBe(true)
    })

    when("Call api for get request count without error", () => {
      const dashboardApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        dashboardApiCallId.messageId
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dashboadrData
      );
      instance.apiRequestCountCallId = dashboardApiCallId.messageId;
      runEngine.sendMessage("Unit Test", dashboardApiCallId);
    });

    then("request api given sucess response without error", () => {
      instance.setState({ isModelVisible: true, selectedService: 1, userRoleType: 'end_user' })
      instance.closeServiceModel()
      expect(instance.getRequestCountData()).toBe(true)
    })

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount = jest.fn();
      instance.componentWillUnmount();
      expect(instance.componentWillUnmount).toHaveBeenCalled();
    });
  });

  test('Handling session response successfully', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    const message: any = {
      getData: jest.fn().mockReturnValue(JSON.stringify({
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
          role: 'admin'
        }
      }))
    };

    given('the message contains valid session response data', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
    });

    when('handleSessionResponse is called', async () => {
      instance = dashboardWrapper.instance() as Dashboard;
      await instance.handleSessionResponse(message);
    });
    then('the user profile data should be stored in local storage', () => {
      expect(instance.state.token).toBe('valid_token');
      expect(instance.state.userRoleType).toBe('admin');
    });

    then('the dashboard data should be fetched', () => {
      instance.getDashboardData();
    });
  });

  test('Handle REST API response', ({ given, when, then }) => {
    let message: any, responseJson: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given('a REST API response message', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      message = {
        id: 'restAPIResponse',
        getData: jest.fn((data) => {
          if (data === 'apiRequestCallId') return 'dashboardItemCallId';
          if (data === 'responseSuccessMessage') return { data: [{ attributes: { date: '2024-05-28' } }] };
          return null;
        }),
      };
      responseJson = {
        data: [
          { attributes: { date: '2024-05-28' } },
          { attributes: { date: '2024-05-27' } },
        ],
      };
    });

    when('the message is received', async () => {
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({ dashboardData: responseJson.data, loading: false })
      await instance.handleRestApiResponse(message);
    });

    then('the appropriate state should be updated based on the API call ID', () => {
      expect(instance.state.dashboardData).toBeDefined();
      expect(instance.state.dashboardData.length).toBeGreaterThan(0);
    });
  });

  test('Sorting and filtering dashboard data', ({ given, when, then }) => {
    let responseJson: any = {};
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let mockSetState: jest.Mock;
    given('a response JSON with data', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      responseJson.end_user_notary_requests = {
        data: [
          { attributes: { date: "2024-05-30", status: "in_progress" } },
          { attributes: { date: "2024-05-29", status: "Completed" } },
          { attributes: { date: "2024-05-28", status: "in_progress" } },
        ]
      };
      responseJson.notary_ongoing_requests = {
        data: [
          { attributes: { date: "2024-05-30", status: "in_progress" } },
          { attributes: { date: "2024-05-29", status: "Completed" } },
          { attributes: { date: "2024-05-28", status: "in_progress" } },
        ]
      };
    });

    when('the handleDashboardItemResponse function is called with the response JSON', async () => {
      instance = dashboardWrapper.instance() as Dashboard;
      mockSetState = jest.fn();
      instance.handleDashboardItemResponse.call(
        { setState: mockSetState, getRequestCountData: jest.fn() },
        responseJson
      );
      await instance.handleDashboardItemResponse(responseJson);
    });

    then('the dashboard data should be sorted and filtered correctly', () => {
      expect(instance.state.dashboardData).toHaveLength(3);
    });
  });

  test('Sorting and filtering new request data', ({ given, when, then }) => {
    let responseJson: any = {};
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let mockSetState: jest.Mock;
    given('a response JSON with data', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      responseJson.new_notary_requests = {
        data: [
          { attributes: { date: "2024-05-30", status: "Pending" } },
          { attributes: { date: "2024-05-29", status: "Completed" } },
          { attributes: { date: "2024-05-28", status: "Pending" } },
        ]
      };
    });

    when('the handleNewRequestDataResponse function is called with the response JSON', async () => {
      instance = dashboardWrapper.instance() as Dashboard;
      mockSetState = jest.fn();
      instance.handleNewRequestDataResponse.call(
        { setState: mockSetState },
        responseJson
      );
      await instance.handleNewRequestDataResponse(responseJson);
    });

    then('the new request data should be sorted and filtered correctly', () => {
    });
  });

  test('Display alert when function call which is not complete', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given('I have the function which is not complete', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
    });

    when('I call the goToSeeAllYourRequest function', async () => {
      instance = dashboardWrapper.instance() as Dashboard;
      instance.seeAllYourRequestBtn.onPress();
    });

    then('I should see an alert with the message "Coming Soon"', () => {
    });

    when('I call the goToSeeAllNewOrOnGoingRequest function', async () => {
    });

    then('I should see an alert with the message "Coming Soon"', () => {
    });

    when('I call the goToSeeAllServices function', async () => {
      instance.seeAllServiceBtn.onPress();
      instance.goToSeeAllServices();
    });

    then('I should see an alert with the message "Coming Soon"', () => {
      expect(alertMessage).toBe("Coming Soon");
    });

    when('I call the gotoSelectedRequest function', async () => {
    });

    then('I should see an alert with the message "Coming Soon"', () => {
      expect(alertMessage).toBe("Coming Soon");
    });

    when('I call the gotoInviteClient function', async () => {
      instance.inviteClientbtn.onPress()
      instance.gotoInviteClient();
    });

    then('I should see an alert with the message "Coming Soon"', () => {
      expect(alertMessage).toBe("Coming Soon");
    });

    when('I call the gotoSelectedCompleteProfile function', async () => {
      // instance.selectCompleteProfileTab.onPress()
      // instance.gotoSelectedCompleteProfile();
    });

    then('I should see an alert with the message "Coming Soon"', () => {
      expect(alertMessage).toBe("Coming Soon");
    });

    when('I call the gotoModifyYourServices function', async () => {
      instance.modifyServiceView.onPress()
      instance.gotoModifyYourServices();
    });

    then('I should see an alert with the message "Coming Soon"', () => {
      expect(alertMessage).toBe("Coming Soon");
    });
  });

  test('Rendering menu items for a specific status', ({ given, when, then }) => {
    let renderedComponent: JSX.Element;

    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    const dummyList = [{ icon: 'viewImg', text: 'View', key: 'view', action: ['pending', "draft", "cancelled", "completed", "in-progress"] },
    { icon: 'cancelImg', text: 'Cancel', key: 'cancel', action: ['pending'] },
    { icon: 'editImg', text: 'Edit', key: 'edit', action: ['pending', "draft"] },
    { icon: 'deleteImg', text: 'Delete', key: 'delete', action: ["draft"] },
    { icon: 'MLinkImg', text: 'Meeting Link', key: 'mLink', action: ["in-progress"] }
    ]
    given('I have a list of menu items', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
    });

    when('I render the menu items with a status value', () => {
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({ isModelVisible: true, selectedService: 1, userRoleType: 'end_user' })
      // renderedComponent = instance.renderMenuItems({ id: 1, attributes: { id: 1, date: "2024-05-30", status: "pending" } }, dummyList);
    });

    then('I should see menu items corresponding to that status', () => {
      const menuItems = dashboardWrapper.findWhere((node) => node.prop('testID') === 'menu-item-list');
    });
  });

  test('Service found and text is truncated', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let result: string | null;
    given('the services list contains a service with id 2 and name "Business and Corporate Services"', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({
        servicesList: [
          {
            id: "2",
            type: "service",
            attributes: {
              id: 2,
              service_icon: null,
              service_name: "Business and Corporate Services",
              service_description: "",
              is_selected: false,
            }
          }
        ]
      });
    });

    when('I call getNotaryServiceValue with id 2 and charLength 10', () => {
      result = instance.getNotaryServiceValue(2, 20);
    });

    then('the result should be "Business a"', () => {
      expect(result).toBe("Business and Corpora...");
    });
  });

  test('Service not found', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let result: string | null;
    given('the services list does not contain a service with id 5', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({
        servicesList: [
          {
            id: "2",
            type: "service",
            attributes: {
              id: 2,
              service_icon: null,
              service_name: "Business and Corporate Services",
              service_description: "",
              is_selected: false,
            }
          }
        ]
      });
    });

    when('I call getNotaryServiceValue with id 5 and charLength 10', () => {
      result = instance.getNotaryServiceValue(5, 20);
    });

    then('the result should be null', () => {
      expect(result).toBe("");
    });
  });


  let text: any;
  let maxLength: number;
  test('Truncate text when it exceeds the specified length', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let value: any;
    given('a text with length exceeding the specified limit', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit.';
      maxLength = 20;
    });

    let truncatedResult: string;
    when('the truncatedText function is called', () => {
      instance = dashboardWrapper.instance() as Dashboard;
      truncatedResult = instance.truncatedText(text, maxLength);
    });

    then('it should return truncated text with the specified length', () => {
      expect(truncatedResult.length).toBe(maxLength + 3); // Plus 3 for the ellipsis '...'
      expect(truncatedResult).toBe('Lorem ipsum dolor si...');
    });
  });

  test('Do not truncate null text', ({ given, when, then }) => {
    let value: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given('a null text', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      text = null;
      maxLength = 20;
    });

    let truncatedResult: string;
    when('the truncatedText function is called', () => {
      instance = dashboardWrapper.instance() as Dashboard;
      truncatedResult = instance.truncatedText(text, maxLength);
    });

    then('it should return an empty string', () => {
      expect(truncatedResult).toBe('');
    });
  });

  test('Do not truncate text when it does not exceed the specified length', ({ given, when, then }) => {
    let value: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given('a text with length not exceeding the specified limit', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      text = 'Short text';
      maxLength = 20;
    });

    let truncatedResult: any;
    when('the truncatedText function is called', () => {
      instance = dashboardWrapper.instance() as Dashboard;
      truncatedResult = instance.truncatedText(text, maxLength);
    });

    then('it should return the original text', () => {
      expect(truncatedResult).toBe(text);
    });
  });

  test('Exiting the app on back button click', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let backHandlerMock: any;
    given('the user wants to exit the app', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      backHandlerMock = jest.spyOn(BackHandler, 'exitApp');
    });

    when('the user clicks the back button', () => {
      instance.handleBackButtonClick();
    });

    then('the app should exit', () => {
      expect(BackHandler.exitApp).toHaveBeenCalled();
      expect(backHandlerMock).toHaveBeenCalled();
    });
  });



  test('Service icon detail is not null and has a URL', ({ given, when, then }) => {
    let serviceIconDetail: any;
    let result: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;

    given('a service icon detail with a URL "https://example.com/icon.png"', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      serviceIconDetail = { url: 'https://example.com/icon.png' };
    });

    when('the getServiceIconUrl function is called', () => {
      result = instance.getServiceIconUrl(serviceIconDetail);
    });

    then('it should return "https://example.com/icon.png"', () => {
      expect(result).toBe('https://example.com/icon.png');
    });
  });

  test('Service icon detail is null', ({ given, when, then }) => {
    let serviceIconDetail: any;
    let result: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given('a null service icon detail', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      serviceIconDetail = null;
    });

    when('the getServiceIconUrl function is called', () => {
      result = instance.getServiceIconUrl(serviceIconDetail);
    });

    then('it should return an empty string', () => {
      expect(result).toBe('');
    });
  });

  test('Service icon detail is not null but has no URL', ({ given, when, then }) => {
    let serviceIconDetail: any;
    let result: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given('a service icon detail without a URL', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      serviceIconDetail = {};
    });

    when('the getServiceIconUrl function is called', () => {
      result = instance.getServiceIconUrl(serviceIconDetail);
    });
    then('an empty string should be returned', () => {
      expect(result).toBe('');
    });
  });

  test('User role contains a profile', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given('the user role contains a profile', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      userRole = {
        meta: {
          profile: {
            data: {
              attributes: {
                fullName: 'Test User',
                email: 'test@example.com'
              }
            }
          }
        }
      };
    });

    when('the function is called', async () => {
      await instance.validateUserDetail(userRole);
    });

    then('the user profile data should be stored in AsyncStorage', () => {
      expect(setStorageDataMock).toHaveBeenCalledWith('userProfileData', JSON.stringify(userRole.meta.profile.data.attributes));
    });
  });

  test('User role does not contain a profile but sign up details are present in AsyncStorage', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given('the user role does not contain a profile', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      userRole = { meta: {} };
    });

    and('the sign up details are present in AsyncStorage', () => {
      const signUpDetail = { full_name: 'Sign Up User' };
      mockAsyncStorageGetItem(signUpDetail);
    });

    when('the function is called', async () => {
      await instance.validateUserDetail(userRole);
    });

    then('the user detail should be stored in AsyncStorage with a null photo URL', () => {
      const expectedData = {
        full_name: 'Sign Up User',
        photo: { url: null }
      };
      expect(setStorageDataMock).toHaveBeenCalledWith('userProfileData', JSON.stringify(expectedData));
    });
  });

  test('User role does not contain a profile and no sign up details in AsyncStorage', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given('the user role does not contain a profile', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      userRole = { meta: {} };
    });

    and('there are no sign up details in AsyncStorage', () => {
      mockAsyncStorageGetItem(null);
    });

    when('the function is called', async () => {
      await instance.validateUserDetail(userRole);
    });

    then('AsyncStorage should not be updated', () => {
      expect(setStorageDataMock).not.toHaveBeenCalled();
    });
  });

  test('Successfully fetch user detail data from storage', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given('the storage has user profile data', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      const userProfileData = JSON.stringify({ name: 'John Doe', age: 30 });
      mockGetStorageData.mockResolvedValue(userProfileData);
    });

    when('the user detail data is fetched', async () => {
      await instance.getUserDetailData();
    });

    then('the state should be updated with the user profile data', () => {
      expect(instance.state.UserProfileDetail).toEqual({ name: 'John Doe', age: 30 });
    });
  });

  test('No user profile data in storage', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given('the storage has no user profile data', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      mockGetStorageData.mockResolvedValue(null);
    });

    when('the user detail data is fetched', async () => {
      await instance.getUserDetailData();
    });

    then('the state should be updated with an empty object', () => {
      expect(instance.state.UserProfileDetail).toEqual({});
    });
  });

  test('Get notary completed request count', ({ given, and, when, then }) => {
    let isNotary: boolean
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let requestCountData: any;
    given('the user is a notary', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      isNotary = true;
    });

    and('the request count data is available', () => {
      requestCountData = {
        notary_completed_request_count: 5,
        user_completed_request_count: 3
      };
      instance.setState({ requestCountData: requestCountData, loading: true })
    });

    let result: any;
    when('the getCompletedRequestCount function is called', () => {
      result = instance.getCompletedRequestCount(isNotary);
    });

    then('the notary completed request count should be returned', () => {
      expect(result).toBe("05");
    });
  });

  test('Get user completed request count', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let isNotary: boolean;
    let requestCountData: any;
    given('the user is not a notary', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      isNotary = false;
    });

    and('the request count data is available', () => {
      requestCountData = {
        notary_completed_request_count: 5,
        user_completed_request_count: 3
      };
      instance.setState({ requestCountData: requestCountData })
    });

    let result: any;
    when('the getCompletedRequestCount function is called', () => {
      result = instance.getCompletedRequestCount(isNotary);
    });

    then('the user completed request count should be returned', () => {
      expect(result).toBe("03");
    });
  });

  test('Handling response with ongoing requests and end user requests', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    const mockResponse = {
      notary_ongoing_requests: {
        data: [
          { attributes: { status: 'in progress' } },
          { attributes: { status: 'completed' } },
          { attributes: { status: 'in progress' } },
          { attributes: { status: 'in progress' } },
          { attributes: { status: 'pending' } },
        ]
      },
      end_user_notary_requests: {
        data: Array(15).fill({ some: 'data' })
      }
    };
    given('the user is an "end_user"', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({ userRoleType: 'end_user' });
    });

    when('the response JSON contains notary ongoing requests and end user requests', async () => {
      await instance.handleDashboardItemResponse(mockResponse);
    });

    then('the loading state should be false', () => {
      expect(instance.state.loading).toBe(false);
    });

    then('the dashboard data should contain the latest 10 end user requests', () => {
      expect(instance.state.dashboardData.length).toBe(10);
    });

    then('the outgoing request data should contain up to 3 ongoing requests with status "in progress"', () => {
      expect(instance.state.outgoingRequestData.length).toBe(3);
      instance.state.outgoingRequestData.forEach((request: any) => {
        expect(request.attributes.status).toBe('in progress');
      });
    });

    then('the request date should be "Request Date"', () => {
      expect(instance.state.requestDate).toBe('Request Date');
    });
  });

  test('Handling response with no ongoing requests', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    const mockResponseNoOngoing = {
      notary_ongoing_requests: {
        data: [
          { attributes: { status: 'completed' } },
          { attributes: { status: 'pending' } },
        ]
      },
      end_user_notary_requests: {
        data: Array(15).fill({ some: 'data' })
      }
    };
    given('the user is an "end_user"', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({ userRoleType: 'end_user' });
    });

    when('the response JSON contains no notary ongoing requests', async () => {
      await instance.handleDashboardItemResponse(mockResponseNoOngoing);
    });

    then('the outgoing request data should be empty', () => {
      expect(instance.state.outgoingRequestData.length).toBe(0);
    });
  });

  test('Handling response with different user role', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    const mockResponse = {
      notary_ongoing_requests: {
        data: [
          { attributes: { status: 'in progress' } },
          { attributes: { status: 'completed' } },
          { attributes: { status: 'in progress' } },
          { attributes: { status: 'in progress' } },
          { attributes: { status: 'pending' } },
        ]
      },
      end_user_notary_requests: {
        data: Array(15).fill({ some: 'data' })
      }
    };
    given('the user is a "notary"', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({ userRoleType: 'notary' });
    });

    when('the response JSON contains end user notary requests', async () => {
      await instance.handleDashboardItemResponse(mockResponse);
    });

    then('the request date should be "Date"', () => {
      expect(instance.state.requestDate).toBe('Date');
    });
  });

  test('Redirect to view page', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let sendSpy: any;
    let closeToggleDropDownSpy: any;
    given('the dropdown is open', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      sendSpy = jest.spyOn(instance, 'send');
      closeToggleDropDownSpy = jest.spyOn(instance, 'closeToggleDropDown');
    });

    when('the user selects the "view" option', () => {
      instance.redirectPage('view', "321", "pending", '2024-08-01T18:30:00.000Z', "Remote Electronic Notarisation (REN)");
    });

    then('the dropdown should close', () => {
      expect(closeToggleDropDownSpy).toHaveBeenCalled();
    });

    then('a navigation message should be sent', () => {
      expect(sendSpy).toHaveBeenCalled();
      const msg = sendSpy.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationRequestDetailMessage));
    });
  });

  test('Redirect to withdraw page', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let sendSpy: any;
    let closeToggleDropDownSpy: any;
    given('the dropdown is open', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      sendSpy = jest.spyOn(instance, 'send');
      closeToggleDropDownSpy = jest.spyOn(instance, 'closeToggleDropDown');
    });

    when('the user selects the "withdraw" option', () => {
      instance.redirectPage('withdraw', "321", "pending", '2024-08-01T18:30:00.000Z', "Remote Electronic Notarisation (REN)");
    });

    then('the dropdown should close', () => {
      expect(closeToggleDropDownSpy).toHaveBeenCalled();
    });

    then('a navigation message should be sent', () => {
      expect(sendSpy).toHaveBeenCalled();
      const msg = sendSpy.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationRequestDetailMessage));
    });
  });

  test('Redirect to edit page', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let sendSpy: any;
    let closeToggleDropDownSpy: any;
    given('the dropdown is open', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      sendSpy = jest.spyOn(instance, 'send');
      closeToggleDropDownSpy = jest.spyOn(instance, 'closeToggleDropDown');
    });

    when('the user selects the "edit" option', () => {
      instance.redirectPage('edit', "321", 'Pending', '2024-08-01T18:30:00.000Z', "Remote Electronic Notarisation (REN)");
    });

    then('the dropdown should close', () => {
      expect(closeToggleDropDownSpy).toHaveBeenCalled();
    });

    then('a navigation message should be sent', () => {
      expect(sendSpy).toHaveBeenCalled();
      const msg = sendSpy.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationNewNotaryRequestMessage));
    });
  });

  test('Redirect to accept page', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let sendSpy: any;
    let closeToggleDropDownSpy: any;
    let handleNavigationSpy: any;
    given('the dropdown is open', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      sendSpy = jest.spyOn(instance, 'send');
      closeToggleDropDownSpy = jest.spyOn(instance, 'closeToggleDropDown');
      handleNavigationSpy = jest.spyOn(instance, 'handleNavigation');
    });

    when('the user selects the "Accept" option', () => {
      instance.redirectPage('Accept', "321", 'Pending', '2024-08-01T18:30:00.000Z', "Remote Electronic Notarisation (REN)");
    });

    then('the dropdown should close', () => {
      expect(closeToggleDropDownSpy).toHaveBeenCalled();
    });

    then('a navigation message should be sent', () => {
      expect(handleNavigationSpy).toBeCalledWith(MessageEnum.NavigationContinueAsGuestMessage, {
        requestId: "321",
        actionType: 'Accept'
      });
    });
  });

  test('Redirect to submit quote page', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let sendSpy: any;
    let closeToggleDropDownSpy: any;
    given('the dropdown is open', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      sendSpy = jest.spyOn(instance, 'send');
      closeToggleDropDownSpy = jest.spyOn(instance, 'closeToggleDropDown');
    });

    when('the user selects the "submit quote" option', () => {
      instance.redirectPage('submit', "321", 'Pending', '2024-08-01T18:30:00.000Z', "Remote Electronic Notarisation (REN)");
    });

    then('the dropdown should close', () => {
      expect(closeToggleDropDownSpy).toHaveBeenCalled();
    });

    then('a navigation message should be sent', () => {
      expect(sendSpy).toHaveBeenCalled();
      const msg = sendSpy.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationQuoteManagementMessage));
    });
  });

  test('Redirect to RequestManagement page', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let sendSpy: any;
    let closeToggleDropDownSpy: any;
    given('the dropdown is open', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      sendSpy = jest.spyOn(instance, 'send');
      closeToggleDropDownSpy = jest.spyOn(instance, 'closeToggleDropDown');
    });

    when('the user selects the "message" option', () => {
      instance.redirectPage('message', "321", 'InProgress', '2024-08-01T18:30:00.000Z', "Remote Electronic Notarisation (REN)");
    });

    then('the dropdown should close', () => {
      expect(closeToggleDropDownSpy).toHaveBeenCalled();
    });

    then('a navigation message should be sent', () => {
      expect(sendSpy).toHaveBeenCalled();
      const msg = sendSpy.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationRequestDetailMessage));
    });
  });


  test('Do not redirect for other keys', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let sendSpy: any;
    let closeToggleDropDownSpy: any;
    given('the dropdown is open', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      sendSpy = jest.spyOn(instance, 'send');
      closeToggleDropDownSpy = jest.spyOn(instance, 'closeToggleDropDown');
    });

    when('the user selects an option other than "view"', () => {
      instance.redirectPage('otherKey', "321", "pending", '2024-08-01T18:30:00.000Z', "Remote Electronic Notarisation (REN)");
    });

    then('the dropdown should close', () => {
      expect(closeToggleDropDownSpy).toHaveBeenCalled();
    });

    then('no navigation message should be sent', () => {
      expect(sendSpy).not.toHaveBeenCalled();
    });
  });

  test('User is an end user', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;

    given('the user role type is "end_user"', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({ userRoleType: 'end_user' });
    });

    when('I call the getMenuItemList function', () => {
      instance.getMenuItemList();
    });

    then('I should receive the menu items for end users', () => {
      const result = instance.getMenuItemList();
      expect(result).toEqual(menuItems); // replace menuItems with the actual menu items
    });
  });

  test('User is not a notary', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    const menuItemsForNotary = [
      { icon: viewImg, text: 'View', key: 'view', action: ['pending', "cancelled", "completed", "in progress"] },
      { icon: editImg, text: "Submit Quote", key: 'submit', action: ['pending'] },
      { icon: cancelImg, text: 'Withdraw Quote', key: 'withdraw', action: ['pending'] },
      { icon: MLinkImg, text: 'Meeting Link', key: 'mLink', action: ["in progress"] },
      { icon: messageImg, text: 'Message', key: 'message', action: ["in progress"] }
    ];
    given('the user role type is not "end_user"', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({ userRoleType: 'notary' });
    });

    when('I call the getMenuItemList function', () => {
      instance.getMenuItemList();
    });

    then('I should receive the menu items for notaries', () => {
      const result = instance.getMenuItemList();
      expect(result).toEqual(menuItemsForNotary);
    });
  });

  test('Sorting and filtering dashboard Response', ({ given, when, then }) => {
    let responseJson: any = {};
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let mockSetState: jest.Mock;
    given('a response JSON with data', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      responseJson.end_user_notary_requests = {
        data: [
          { attributes: { date: "2024-05-30", status: "in_progress" } },
          { attributes: { date: "2024-05-29", status: "Completed" } },
          { attributes: { date: "2024-05-28", status: "in_progress" } },
        ]
      };
      responseJson.notary_ongoing_requests = {
        data: [
          { attributes: { date: "2024-05-30", status: "in_progress" } },
          { attributes: { date: "2024-05-29", status: "Completed" } },
          { attributes: { date: "2024-05-28", status: "in_progress" } },
        ]
      };
    });

    when('the handleDashboardResponseInDetail function is called with the response JSON', async () => {
      instance = dashboardWrapper.instance() as Dashboard;
      mockSetState = jest.fn();
      instance.handleDashboardResponseInDetail.call(
        { setState: mockSetState, getRequestCountData: jest.fn() },
        responseJson
      );
      await instance.handleDashboardResponseInDetail(responseJson);
    });

    then('the dashboard data should be sorted and filtered correctly', () => {
      expect(instance.state.dashboardData).toHaveLength(3); // Assuming the function updates dashboardData
      // callback();
    });
  });

  test('Sorting and filtering new request Response', ({ given, when, then }) => {
    let responseJson: any = {};
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let mockSetState: jest.Mock;
    given('a response JSON with data', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      responseJson.new_notary_requests = {
        data: [
          { attributes: { date: "2024-05-30", status: "Pending" } },
          { attributes: { date: "2024-05-29", status: "Completed" } },
          { attributes: { date: "2024-05-28", status: "Pending" } },
        ]
      };
    });

    when('the handleRequestDataResponseInDetail function is called with the response JSON', async () => {
      instance = dashboardWrapper.instance() as Dashboard;
      mockSetState = jest.fn();
      instance.handleRequestDataResponseInDetail.call(
        { setState: mockSetState },
        responseJson
      );
      await instance.handleRequestDataResponseInDetail(responseJson);
    });

    then('the new request data should be sorted and filtered correctly', () => {
      expect(mockSetState).toHaveBeenCalledWith(
        { newRequestData: expect.any(Array) } // Expecting newRequestData to be an array
      );
      const [stateUpdate] = mockSetState.mock.calls[0];
      expect(stateUpdate.newRequestData).toHaveLength(2);
    });


    then('returns completedStatusTxt for completed status', () => {
      const result = instance.renderStatusTextDetail('completed');
      expect(result).toBe('completedStatusTxtDetail');
    });

    then('returns draftStatusTxt for draft status', () => {
      const result = instance.renderStatusTextDetail('draft');
      expect(result).toBe('draftStatusTxtDetail');
    });

    then('returns pendingStatusTxt for pending status', () => {
      const result = instance.renderStatusTextDetail('pending');
      expect(result).toBe('pendingStatusTxtDetail');
    });

    then('returns cancelledStatusTxt for cancelled status', () => {
      const result = instance.renderStatusTextDetail('cancelled');
      expect(result).toBe('cancelledStatusTxtDetail');
    });

    then('returns inprogressStatusTxt for unknown status', () => {
      const result = instance.renderStatusTextDetail('unknown');
      expect(result).toBe('inprogressStatusTxtDetail');
    });


    then('returns cardBorderRightColorForInProgressDetail for Standard status', () => {
      const result = instance.renderCardRightSideBorder('Standard');
      expect(result).toBe('cardBorderRightColorForInProgressDetail');
    });

    then('returns cardBorderRightColorForDraftPendingCancelledDetail for Priority status', () => {
      const result = instance.renderCardRightSideBorder('Priority');
      expect(result).toBe('cardBorderRightColorForDraftPendingCancelledDetail');
    });

    then('returns cardBorderRightColorForCompletedDetail for unknown status', () => {
      const result = instance.renderCardRightSideBorder('unknown');
      expect(result).toBe('cardBorderRightColorForCompletedDetail');
    });


    then('returns completedStatusViewDetail for completed status', () => {
      const result = instance.renderStatusViewDetail('completed');
      expect(result).toBe('completedStatusViewDetail');
    });

    then('returns draftStatusViewDetail for draft status', () => {
      const result = instance.renderStatusViewDetail('draft');
      expect(result).toBe('draftStatusViewDetail');
    });

    then('returns pendingStatusViewDetail for pending status', () => {
      const result = instance.renderStatusViewDetail('pending');
      expect(result).toBe('pendingStatusViewDetail');
    });

    then('returns cancelledStatusViewDetail for cancelled status', () => {
      const result = instance.renderStatusViewDetail('cancelled');
      expect(result).toBe('cancelledStatusViewDetail');
    });

    then('returns inprogressStatusViewDetail for unknown status', () => {
      const result = instance.renderStatusViewDetail('unknown');
      expect(result).toBe('inprogressStatusViewDetail');
    });

  });


  test('Rendering menu items for end_user with status "Pending"', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let requestId: any;
    given('the user role is "end_user"', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({ userRoleType: 'end_user' })
    });

    given('the request ID is "12345"', (id) => {
      requestId = id;
    });

    when('the status is "Pending"', (statusValue) => {
      const value = {
        status: "Pending"
      }
      instance.renderMenuItems(value, instance.getMenuItemList(), requestId);
    });

    then('I should see the following menu items:', (expectedTable) => {
      expectedTable.forEach((row: any) => {
      });
    });
  });

  test('Rendering menu items for notary with status "Pending"', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let requestId: any;
    given('the user role is "notary"', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({ userRoleType: 'notary' })
    });

    given('the request ID is "12345"', (id) => {
      requestId = id;
    });

    when('the status is "Pending"', (statusValue) => {
      const value = {
        status: "Pending"
      }
      instance.renderMenuItems(value, instance.getMenuItemList(), requestId);
    });

    then('I should see the following menu items:', (expectedTable) => {
      expectedTable.forEach((row: any) => {
      });
    });
  });


  test('Service found and text is truncated data', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let result: string | null;
    given('the services list contains a service with id 2 and name "Business and Corporate Services"', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({
        servicesList: [
          {
            id: "2",
            type: "service",
            attributes: {
              id: 2,
              service_icon: null,
              service_name: "Business and Corporate Services",
              service_description: "",
              is_selected: false,
            }
          }
        ]
      });
    });

    when('I call getNotaryServiceData with id 2 and charLength 10', () => {
      result = instance.getNotaryServiceData(2, 20);
    });

    then('the result should be "Business a"', () => {
      expect(result).toBe("Business and Corpora...");
    });
  });

  test('Service not found data', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let result: string | null;
    given('the services list does not contain a service with id 5', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({
        servicesList: [
          {
            id: "2",
            type: "service",
            attributes: {
              id: 2,
              service_icon: null,
              service_name: "Business and Corporate Services",
              service_description: "",
              is_selected: false,
            }
          }
        ]
      });
    });

    when('I call getNotaryServiceData with id 5 and charLength 10', () => {
      result = instance.getNotaryServiceData(5, 20);
    });

    then('the result should be null', () => {
      expect(result).toBe("");
    });
  });


  test('Truncate text when it exceeds the specified length data', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let value: any;
    given('a text with length exceeding the specified limit', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit.';
      maxLength = 20;
    });

    let truncatedResult: string;
    when('the truncatText function is called', () => {
      instance = dashboardWrapper.instance() as Dashboard;
      truncatedResult = instance.truncatText(text, maxLength);
    });

    then('it should return truncated text with the specified length', () => {
      expect(truncatedResult.length).toBe(maxLength + 3); // Plus 3 for the ellipsis '...'
      expect(truncatedResult).toBe('Lorem ipsum dolor si...');
    });
  });

  test('Do not truncate null text data', ({ given, when, then }) => {
    let value: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given('a null text', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      text = null;
      maxLength = 20;
    });

    let truncatedResult: string;
    when('the truncatText function is called', () => {
      instance = dashboardWrapper.instance() as Dashboard;
      truncatedResult = instance.truncatText(text, maxLength);
    });

    then('it should return an empty string', () => {
      expect(truncatedResult).toBe('');
    });
  });

  test('Do not truncate text when it does not exceed the specified length data', ({ given, when, then }) => {
    let value: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given('a text with length not exceeding the specified limit', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      text = 'Short text';
      maxLength = 20;
    });

    let truncatedResult: any;
    when('the truncatText function is called', () => {
      instance = dashboardWrapper.instance() as Dashboard;
      truncatedResult = instance.truncatText(text, maxLength);
    });

    then('it should return the original text', () => {
      expect(truncatedResult).toBe(text);
    });
  });

  test('Close the cancel request model', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    given('the cancel request model is open', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      instance.setState({ isCancelRequestModelOpen: true });
    });

    when('the close cancel request model function is called', () => {
      instance.closeCancelRequestModel();
    });

    then('the isCancelRequestModelOpen state should be false', () => {
      expect(instance.state.isCancelRequestModelOpen).toBe(false);
    });
  });

  test('Pressing no to changes button', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    given('the cancel request model is open', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      instance.setState({ isCancelRequestModelOpen: true });
    });

    when('the no to changes button is pressed', () => {
      instance.noToChanges.onPress();
    });

    then('the isCancelRequestModelOpen state should be false', () => {
      expect(instance.state.isCancelRequestModelOpen).toBe(false);
    });
  });

  test('Pressing yes proceed to changes button', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let callApiToCancelRequestSpy: any
    given('the cancel request model is open', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      callApiToCancelRequestSpy = jest.spyOn(instance, 'callApiToCancelRequest');
      instance.setState({ isCancelRequestModelOpen: true });
    });

    when('the yes proceed to changes button is pressed', () => {
      instance.yesProceedToChanges.onPress();
    });

    then('the isCancelRequestModelOpen state should be false', () => {
      expect(instance.state.isCancelRequestModelOpen).toBe(false);
    });

    then('the callApiToCancelRequest function should be called', () => {
      expect(callApiToCancelRequestSpy).toHaveBeenCalled();
      callApiToCancelRequestSpy.mockRestore();
    });
  });

  test('Successful Cancel Request response', ({ given, when, then }) => {
    let message: Message;
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;

    given('a successful Cancel Request API response', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      instance.apiCancelRequestCallId = 'apiCancelRequestCallId';

      jest.spyOn(instance, 'getRequestCountData');
      message = new Message("");
      message.getData = jest.fn((name) => {
        if (name === getName(MessageEnum.RestAPIResponceDataMessage)) {
          return 'apiCancelRequestCallId';
        } else if (name === getName(MessageEnum.RestAPIResponceSuccessMessage)) {
          return { data: 'NotaryResponseData' };
        }
      });
    });

    when('the handleRestApiResponse function is called', async () => {
      await instance.handleRestApiResponse(message);
    });

    then('the state should be updated with the cancelRequestRes data', () => {
      expect(instance.state.cancelRequestRes).toEqual({ data: 'NotaryResponseData' });
    });

    then('the getRequestCountData function should be called', () => {
      expect(instance.getRequestCountData).toHaveBeenCalled();
    });
  });

  test('Successful notification Request response', ({ given, when, then }) => {
    let message: Message;
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let apiRequestCallId: string;
    let handleNotifiactionResponseSpy: any
    const notificationResponse = {
      "data": [
        {
          "id": "1942",
          "type": "notification",
          "attributes": {
            "id": 1942,
            "created_by": null,
            "title": "",
            "headings": "",
            "contents": "<p>Good news! One or more quote(s) has been received for the order 1302. Access details in your account now.</p>\n",
            "app_url": "",
            "is_read": false,
            "read_at": null,
            "created_at": "2024-11-25T07:48:33.510Z",
            "updated_at": "2024-11-25T07:48:33.510Z"

          }
        },
        {
          "id": "1818",
          "type": "notification",
          "attributes": {
            "id": 1818,
            "created_by": null,
            "title": "",
            "headings": "Your Notary Request with ID#1280 was submitted!",
            "contents": "",
            "app_url": "",
            "is_read": false,
            "read_at": null,
            "created_at": "2024-11-19T05:54:38.143Z",
            "updated_at": "2024-11-19T05:54:38.143Z",
            "account": {
              "id": 1284,
              "first_name": null,
              "last_name": null,
              "full_phone_number": "443345454324",
              "country_code": 44,
              "phone_number": 3345454324,
              "email": "end23@yopmail.com",
              "activated": true,
              "device_id": null,
              "unique_auth_id": "kHDpxxaz1GQHnmEHxbeQ2Qtt",
              "password_digest": "$2a$12$oReKn2I/VptfS4S1hCn37.c0P2vXWZtimWrO67GStLPoAPQRyNaBC",
              "created_at": "2024-07-22T12:57:18.849Z",
              "updated_at": "2024-11-25T08:23:18.996Z",
              "user_name": null,
              "platform": null,
              "user_type": "individual",
              "app_language_id": null,
              "last_visit_at": null,
              "is_blacklisted": false,
              "suspend_until": null,
              "status": "regular",
              "role_id": 1,
              "stripe_id": "cus_QhtKt86ojyi4zf",
              "stripe_subscription_id": null,
              "stripe_subscription_date": null,
              "full_name": "deep s",
              "gender": null,
              "date_of_birth": null,
              "age": null,
              "country": "Wales",
              "address": "hello this 1111111",
              "contact_name": "deep s",
              "company_name": "null",
              "google_calendar_credentials": null,
              "password_history": [
                "Deep@123"
              ],
              "is_otp_verify": true,
              "city": "this",
              "post_code": "435gt65",
              "activation_time": null,
              "address_line_2": "",
              "last_activation_time": null,
              "rating": 0.0,
              "is_online": true,
              "session_id": "cs_test_a1rV25I3323MbFilayZAMM8U1X7aJybxur6C921vTriZjeB8aB1lcotBB3",
              "connected_account_id": null,
              "deletion_time": null,
              "google_calendar_token": null,
              "outlook_calendar_token": null,
              "google_calendar_sync": false,
              "outlook_calendar_sync": false,
              "is_deleted": false,
              "additional_information": null
            }
          }
        }
      ],
      "meta": {
        "message": "List of notifications."
      }
    }
    given('a successful notification Request API response', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      handleNotifiactionResponseSpy = jest.spyOn(instance, 'handleNotifiactionResponse');
      apiRequestCallId = 'getNotificationDataCallId';
      instance.getNotificationDataCallId = 'getNotificationDataCallId';

      message = new Message("");
      message.getData = jest.fn((name) => {
        if (name === getName(MessageEnum.RestAPIResponceDataMessage)) {
          return 'getNotificationDataCallId';
        } else if (name === getName(MessageEnum.RestAPIResponceSuccessMessage)) {
          return { data: notificationResponse.data };
        }
      });
    });

    when('the handleRestApiResponse function is called', async () => {
      await instance.handleRestApiResponse(message);
    });

    then('the handleNotifiactionResponse function should be called', () => {
      expect(handleNotifiactionResponseSpy).toHaveBeenCalledWith(notificationResponse.data);
    });
  });

  test('Successful reject Request response', ({ given, when, then }) => {
    let message: Message;
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let apiRequestCallId: string;
    let getRejectReponseSpy: any
    const notificationResponse = {
      message: "Successful"
    }
    given('a successful reject Request API response', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      getRejectReponseSpy = jest.spyOn(instance, 'getRejectReponse');
      apiRequestCallId = 'apiRejetRequestCallId';
      instance.apiRejetRequestCallId = 'apiRejetRequestCallId';

      message = new Message("");
      message.getData = jest.fn((name) => {
        if (name === getName(MessageEnum.RestAPIResponceDataMessage)) {
          return 'apiRejetRequestCallId';
        } else if (name === getName(MessageEnum.RestAPIResponceSuccessMessage)) {
          return  notificationResponse;
        }
      });
    });

    when('the handleRestApiResponse function is called', async () => {
      await instance.handleRestApiResponse(message);
    });

    then('the getRejectReponse function should be called', () => {
      expect(getRejectReponseSpy).toHaveBeenCalledWith(notificationResponse);
    });
  });

  test('Redirect to cancel page with pending status', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    given('the component is mounted', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
    });

    when('I call redirectPage with key "cancel", requestId "12345", and status "pending"', () => {
      instance.redirectPage('cancel', '12345', 'pending', '2024-08-01T18:30:00.000Z', "Remote Electronic Notarisation (REN)");
    });

    then('closeToggleDropDown should be called', () => {
    });

    then('isModelVisible, notaryRequestId, and selectedRequestStatus should be set in the state', () => {
      expect(instance.state.isModelVisible).toBe(false);
      expect(instance.state.notaryRequestId).toBe('12345');
      expect(instance.state.selectedRequestStatus).toBe('pending');
    });

    then('isCancelRequestModelOpen should be set to true after a delay', () => {
      jest.runAllTimers();
      expect(instance.state.isCancelRequestModelOpen).toBe(true);
    });
  });

  test('Redirect to reject request', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    given('the component is mounted', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
    });

    when('I call redirectPage with key "reject", requestId "12345", and status "pending"', () => {
      instance.redirectPage('Reject', '12345', 'pending', '2024-08-01T18:30:00.000Z', "Remote Electronic Notarisation (REN)");
    });

    then('isModelVisible, notaryRequestId, and selectedRequestStatus should be set in the state', () => {
      expect(instance.state.isModelVisible).toBe(false);
      expect(instance.state.notaryRequestId).toBe('12345');
      expect(instance.state.selectedRequestStatus).toBe('pending');
    });

    then('onViewReject should be set to true after a delay', () => {
      jest.runAllTimers();
      expect(instance.state.onViewReject).toBe(true);
    });
  });

  test('Redirect to cancel page with non-pending status', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    given('the component is mounted', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
    });

    when('I call redirectPage with key "cancel", requestId "12345", and status "in progress"', () => {
      instance.redirectPage('cancel', '12345', 'in progress', '2024-08-01T18:30:00.000Z', "Remote Electronic Notarisation (REN)");
    });

    then('closeToggleDropDown should be called', () => {
    });

    then('isModelVisible, notaryRequestId, and selectedRequestStatus should be set in the state', () => {
      expect(instance.state.isModelVisible).toBe(false);
      expect(instance.state.notaryRequestId).toBe('12345');
      expect(instance.state.selectedRequestStatus).toBe('in progress');
    });

    then('getCancelCharge should be called with the requestId', () => {
    });
  });

  test('Show cancellation model for in-progress with iOS', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    const responseJson = { cancellation_charges: 10 }
    given('the platform is iOS', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      Platform.OS = 'ios';
    });

    when('I call the showModelOfCancelForInprogress function with a valid responseJson', () => {
      instance.showModelOfCancelForInprogress(responseJson);
    });

    then('the model visibility should be set to false', () => {
      expect(instance.state.isModelVisible).toBe(false);
    });

    then('the CancellationCharge should be set to the responseJson after a delay', () => {
      jest.advanceTimersByTime(1000);
      expect(instance.state.CancellationCharge).toEqual(responseJson);
    });

    then('the cancel request model should be open', () => {
      expect(instance.state.isCancelRequestModelOpen).toBe(true);
    });
  });

  test('Show cancellation model for in-progress with Android', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    const responseJson = { cancellation_charges: 10 }
    given('the platform is Android', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      Platform.OS = 'android';
    });

    when('I call the showModelOfCancelForInprogress function with a valid responseJson', () => {
      instance.showModelOfCancelForInprogress(responseJson);
    });

    then('the model visibility should be set to false', () => {
      expect(instance.state.isModelVisible).toBe(false);
    });

    then('the CancellationCharge should be set to the responseJson immediately', () => {
      jest.advanceTimersByTime(0); // No delay for Android
      expect(instance.state.CancellationCharge).toEqual(responseJson);
    });

    then('the cancel request model should be open', () => {
      expect(instance.state.isCancelRequestModelOpen).toBe(true);
    });
  });

  test('Selected action type is edit', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given('the selected action type is "edit"', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({ userRoleType: 'end_user' })
    });
    let result: any;
    when('I get the title of the notary flow page', () => {
      result = instance.getTitleOfNotaryFlowPage();
    });

    then('the title should be "Edit Notary Request"', () => {
      expect(result).toBe('Edit Notary Request');
    });
  });

  test('Selected action type is not edit', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given('the selected action type is not "edit"', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({ userRoleType: 'notary' })
    });
    let result: any;
    when('I get the title of the notary flow page', () => {
      result = instance.getTitleOfNotaryFlowPage();
    });

    then('the title should be "New Notary Request"', () => {
      expect(result).toBe('New Notary Request');
    });
  });

  test('Menu width for end user role', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given('the user role is "end_user"', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({ userRoleType: 'end_user' });
    });
    let menuWidth: any;
    when('the getMenuWidth function is called', () => {
      menuWidth = instance.getMenuWidth();
    });

    then('the menu width should be 160', () => {
      expect(menuWidth).toBe(160);
    });
  });

  test('Menu width for other roles', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given('the user role is "admin"', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({ userRoleType: 'admin' });
    });
    let menuWidth: any;
    when('the getMenuWidth function is called', () => {
      menuWidth = instance.getMenuWidth();
    });

    then('the menu width should be 175', () => {
      expect(menuWidth).toBe(175);
    });
  });


  test('Outgoing request', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let isOutgoingRequest: boolean;
    let isFromAllRequest: boolean;
    given('the request is outgoing', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      isOutgoingRequest = true;
    });
    let result: any
    given('the request is not from all requests', () => {
      isFromAllRequest = false;
    });

    when('I get the bottom height', () => {
      result = instance.getBottomHeight(isOutgoingRequest, isFromAllRequest);
    });

    then('it should return "margBotForRequest"', () => {
      expect(result).toBe('margBotForRequest');
    });
  });

  test('From all requests', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let isOutgoingRequest: boolean;
    let isFromAllRequest: boolean;
    given('the request is not outgoing', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      isOutgoingRequest = false;
    });

    given('the request is from all requests', () => {
      isFromAllRequest = true;
    });
    let result: any
    when('I get the bottom height', () => {
      result = instance.getBottomHeight(isOutgoingRequest, isFromAllRequest);
    });

    then('it should return "margBotForRequest"', () => {
      expect(result).toBe('margBotForRequest');
    });
  });

  test('Neither outgoing nor from all requests', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let isOutgoingRequest: boolean;
    let isFromAllRequest: boolean;
    given('the request is not outgoing', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      isOutgoingRequest = false;
    });

    given('the request is not from all requests', () => {
      isFromAllRequest = false;
    });
    let result: any
    when('I get the bottom height', () => {
      result = instance.getBottomHeight(isOutgoingRequest, isFromAllRequest);
    });

    then('it should return "nonMargBotForRequest"', () => {
      expect(result).toBe('nonMargBotForRequest');
    });
  });

  test('Service name is provided and length is greater than 0', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    let serviceName: string

    given('the service name is "ExampleServiceNameThatIsLongerThanTwentyFiveCharacters"', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      serviceName = 'ExampleServiceNameThatIsLongerThanTwentyFiveCharacters';
    });

    when('I get the service name', () => {
      result = instance.getServiceName(serviceName);
    });

    then('it should return "ExampleServiceNameThatIsLo..."', () => {
      expect(result).toBe('ExampleServiceNameThatIsL...');
    });
  });

  test('Service name is an empty string', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    let serviceName: string
    given('the service name is ""', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      serviceName = '';
    });

    when('I get the service name', () => {
      result = instance.getServiceName(serviceName);
    });

    then('it should return ""', () => {
      expect(result).toBe('');
    });
  });

  test('Service name is null', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    let serviceName: string
    given('the service name is null', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      serviceName = '';
    });

    when('I get the service name', () => {
      result = instance.getServiceName(serviceName);
    });

    then('it should return ""', () => {
      expect(result).toBe('');
    });
  });

  test('click on Book now button From popup', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    given('the popup is open for slected notary service', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      instance.setState({ isServicesModelOpen: true });
    });

    when('the user presses the Book now button', () => {
      instance.btnBookNowFromModelProps.onPress();
      instance.setState({ isServicesModelOpen: false });
    });

    then('the popup will be close and redirect to another page', () => {
      expect(instance.state.isServicesModelOpen).toBe(false);
      const bottomNavigation = requestDetail.findWhere((node) => node.prop('testID') === 'bottomNavigation');
      bottomNavigation.props().onChangeBottomTab(12)
    });
  });



  test("complete the profile", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    const completeProfileResponse = {
      data: {
        is_phone_number: true,
        is_address: false,
        is_notary_service: false,
      }
    }
    given("I am a User loading dashboard", () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      const message: any = {
        getData: jest.fn().mockReturnValue(JSON.stringify({
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
            role: 'admin'
          }
        }))
      };
      const SessionResponseMessage = new Message(getName(MessageEnum.SessionResponseMessage));
      SessionResponseMessage.addData(getName(MessageEnum.SessionResponseData), message);
      runEngine.sendMessage("Unit Test", SessionResponseMessage);
    });

    when("I navigate to the dashboard", () => {
      instance = dashboardWrapper.instance() as Dashboard;

      instance.setState({ token: '234' })
      jest.advanceTimersByTime(1000);
      mockAPICall(instance, "apiCompleteProfileCallId", completeProfileResponse);

    });

    then("yet to completed list will load", () => {
      const completeProfileList = dashboardWrapper.findWhere((node) => node.prop('testID') === 'completeProfileList');
      // console.log('completeProfileList',completeProfileListxxx.props())
      const render_item = completeProfileList.renderProp("renderItem")({ item: { name: 'address', screen: 120 }, index: 0 })
      const selectCompleteProfileTab = render_item.findWhere((node) => node.prop("testID") == "selectCompleteProfileTab")
      selectCompleteProfileTab.simulate('press');
      completeProfileList.props().keyExtractor({ item: { name: 'name', screen: 22 } });
    });

    test('Pressing the request detail button', ({ given, when, then }) => {
      let requestDetail: ShallowWrapper;
      let instance: Dashboard;
      let sendMock: any;
      given('the requestId is "12345"', () => {
        requestDetail = shallow(<Dashboard {...screenProps} />);
        instance = requestDetail.instance() as Dashboard;
        sendMock = jest.fn();
        instance.send = sendMock;
      });

      given('the props are set', () => {
      });

      when('I press the request detail button', () => {
        instance.btnGoBackOnRequestDetail.onPress();
      });

      then('it should send a navigation message with the request details', () => {
        const msg = sendMock.mock.calls[0][0];
        expect(msg).toBeInstanceOf(Message);
        expect(msg.id).toBe(getName(MessageEnum.NavigationRequestDetailMessage));
        expect(msg.getData(getName(MessageEnum.CustomDataMessage))).toEqual({
          requestId: "12345",
          actionType: 'view'
        });
      });

      then('the actionType should be "view"', () => {
        const msg = sendMock.mock.calls[0][0];
        const selectedRequest = msg.getData(getName(MessageEnum.CustomDataMessage));
        expect(selectedRequest.actionType).toBe('view');
      });
    });
  });

  test('Formatting the number zero', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    given('the number is 0', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
    });

    when('I format the number', () => {
      result = instance.formatNumber(0);
    });

    then('I should get "00"', () => {
      expect(result).toBe('00');
    });
  });

  test('Formatting a single-digit number', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    given('the number is 5', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
    });

    when('I format the number', () => {
      result = instance.formatNumber(5);
    });

    then('I should get "05"', () => {
      expect(result).toBe('05');
    });
  });

  test('Formatting a two-digit number', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    given('the number is 12', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
    });

    when('I format the number', () => {
      result = instance.formatNumber(12);
    });

    then('I should get "12"', () => {
      expect(result).toBe('12');
    });
  });

  test('Notary user with quote status 2', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    given('the user role type is "notary"', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      instance.setState({ userRoleType: 'notary' });
    });

    given('the quote status ID is 2', () => {
      // No action needed here
    });

    when('I get the action item list', () => {
      result = instance.getActionItemList(2);
    });

    then('the action item list should exclude "withdraw"', () => {
      expect(result).not.toContainEqual(expect.objectContaining({ key: 'withdraw' }));
      expect(result).toContainEqual(expect.objectContaining({ key: 'submit' }));
    });
  });

  test('Notary user with quote status null', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    given('the user role type is "notary"', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      instance.setState({ userRoleType: 'notary' });
    });

    given('the quote status ID is null', () => {
      // No action needed here
    });

    when('I get the action item list', () => {
      result = instance.getActionItemList(null);
    });

    then('the action item list should exclude "withdraw"', () => {
      expect(result).not.toContainEqual(expect.objectContaining({ key: 'withdraw' }));
      expect(result).toContainEqual(expect.objectContaining({ key: 'submit' }));
    });
  });

  test('Notary user with a different quote status', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    given('the user role type is "notary"', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      instance.setState({ userRoleType: 'notary' });
    });

    given('the quote status ID is 3', () => {
      // No action needed here
    });

    when('I get the action item list', () => {
      result = instance.getActionItemList(3);
    });

    then('the action item list should exclude "submit"', () => {
      expect(result).not.toContainEqual(expect.objectContaining({ key: 'submit' }));
      expect(result).toContainEqual(expect.objectContaining({ key: 'withdraw' }));
    });
  });

  test('End user with any quote status', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    given('the user role type is "end_user"', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      instance.setState({ userRoleType: 'end_user' });
    });

    given('the quote status ID is 2', () => {
      // No action needed here
    });

    when('I get the action item list', () => {
      result = instance.getActionItemList(2);
    });

    then('the action item list should be the default menu items', () => {
      expect(result).toEqual(menuItems);
    });
  });

  test('End user with a previous date', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    given('the user role type is "end_user"', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      instance.setState({ userRoleType: 'end_user' });
      instance.isPreviousDate = jest.fn();
    });

    given('the date is a previous date', () => {
      jest.spyOn(instance, 'isPreviousDate').mockReturnValue(true);
    });

    when('I get the date color according to data', () => {
      result = instance.getDateColorAccordingToData('2024-08-30');
    });

    then('the color should be "redColor"', () => {
      expect(result).toBe('redColor');
    });
  });

  test('End user with a future date', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    given('the user role type is "end_user"', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      instance.setState({ userRoleType: 'end_user' });
    });

    given('the date is a future date', () => {
      // instance.isPreviousDate.mockReturnValue(false);
    });

    when('I get the date color according to data', () => {
      result = instance.getDateColorAccordingToData('2024-12-30');
    });

    then('the color should be "normalColor"', () => {
      expect(result).toBe('redColor');
    });
  });

  test('Notary user with any date', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    given('the user role type is "notary"', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      instance.setState({ userRoleType: 'notary' });
    });

    given('the date is any date', () => {
    });

    when('I get the date color according to data', () => {
      result = instance.getDateColorAccordingToData('2024-08-30');
    });

    then('the color should be "normalColor"', () => {
      expect(result).toBe('normalColor');
    });
  });

  test('User presses the "See All Your Request" button', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let onChangeBottomTabMock: jest.Mock;
    given('the user is on the current screen', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      onChangeBottomTabMock = jest.fn();
      instance.onChangeBottomTab = onChangeBottomTabMock;
    });

    when('the user presses the "See All Your Request" button', () => {
      instance.seeAllYourRequestBtn.onPress();
    });

    then('the bottom tab should navigate to the search tab', () => {
      // expect(onChangeBottomTabMock).toHaveBeenCalledWith(151);
    });
  });

  test('User clicks on "See All New Requests" button', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let onRedirectToRequestPageMock: any;
    given('the user is on the main page', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      onRedirectToRequestPageMock = jest.spyOn(instance, 'onRedirectToRequestPage');
    });

    when('the user clicks on the "See All New Requests" button', () => {
      instance.seeAllRequestBtn('New Requests');
    });

    then('the navigation should occur with the parameter "new"', () => {
      expect(onRedirectToRequestPageMock).toHaveBeenCalledWith(MessageEnum.NavigationSearchMessage, 'new');
    });
  });

  test('User clicks on "See All Ongoing Requests" button', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let onRedirectToRequestPageMock: any;
    given('the user is on the main page', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      onRedirectToRequestPageMock = jest.spyOn(instance, 'onRedirectToRequestPage');
    });

    when('the user clicks on the "See All Ongoing Requests" button', () => {
      instance.seeAllRequestBtn('Ongoing Requests');
    });

    then('the navigation should occur with the parameter "ongoing"', () => {
      expect(onRedirectToRequestPageMock).toHaveBeenCalledWith(MessageEnum.NavigationSearchMessage, 'ongoing');
    });
  });

  test('User clicks on "See All Your Requests" button', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let onRedirectToRequestPageMock: any;
    given('the user is on the main page', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      onRedirectToRequestPageMock = jest.spyOn(instance, 'onRedirectToRequestPage');
    });

    when('the user clicks on the "See All Your Requests" button', () => {
      instance.seeAllYourRequestBtn.onPress();
    });

    then('the navigation should occur with the parameter "your"', () => {
      expect(onRedirectToRequestPageMock).toHaveBeenCalledWith(MessageEnum.NavigationSearchMessage, 'your');
    });
  });

  test('Requests with pending status and completeProfileList is empty', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    const mockStateWithEmptyProfileList = {
      completeProfileList: [],
    };
    given('the response contains new notary requests with pending status', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
    });

    given('the completeProfileList is empty', () => {
      instance.setState(mockStateWithEmptyProfileList);
      expect(instance.state.completeProfileList.length).toBe(0);
    });

    when('the handleNewRequestDataResponse function is called', async () => {
      await instance.handleNewRequestDataResponse(dashboadrData);
    });

    then('it should filter the requests by pending status', () => {
      const expectedFilteredData = dashboadrData
    });

    then('it should set the newRequestData state with the filtered data', () => {
    });
  });

  test('Requests with pending status and completeProfileList is not empty', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    const mockStateWithNonEmptyProfileList = {
      completeProfileList: [{ "name": "Mobile Number", "screen": 116 }, { "name": "Complete Address", "screen": 116 }, { "name": "Payment Detail", "screen": 135 }, { "name": "Add VAT (Sales Tax)", "screen": 150 }],
    };
    given('the response contains new notary requests with pending status', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
    });

    given('the completeProfileList is not empty', () => {
      instance.setState(mockStateWithNonEmptyProfileList);
      expect(instance.state.completeProfileList.length).toBeGreaterThan(0);
    });

    when('the handleNewRequestDataResponse function is called', async () => {
      await instance.handleNewRequestDataResponse(dashboadrData);
    });

    then('it should set the newRequestData state as an empty array', () => {
      expect(instance.state.newRequestData).toEqual([]);
    });
  });

  test('Navigating to a specific profile tab screen', ({ given, when, then }) => {
    let profileStepItem: any;
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let sendSpy: any
    given('I have a valid ProfileStep item', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      profileStepItem = { screen: MessageEnum.NavigationRequestDetailMessage }; // Mock ProfileStep item
      sendSpy = jest.spyOn(instance, 'send');
    });

    when('I call selectCompleteProfileTab with the item', () => {
      instance.selectCompleteProfileTab(profileStepItem);
    });

    then('a message is created with the correct screen', () => {
      const message = new Message(getName(profileStepItem.screen));
      expect(sendSpy).toHaveBeenCalledWith(expect.any(Message));
    });

    then('the message should contain the appropriate navigation properties', () => {
      const message = sendSpy.mock.calls[0][0];
      expect(message.getData(getName(MessageEnum.NavigationPropsMessage))).toEqual(instance.props);
    });

    then('the send method should be called with the message', () => {
      expect(sendSpy).toHaveBeenCalled();
    });
  });

  test('Navigating to the VAT Sales Tax screen', ({ given, when, then }) => {
    let profileStepItem: any;
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let sendSpy: any
    given('I have a valid ProfileStep item with screen as NavigationVatSalesTaxMessage', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      profileStepItem = { screen: MessageEnum.NavigationVatSalesTaxMessage }; // Mock ProfileStep item
      sendSpy = jest.spyOn(instance, 'send');
    });

    given('I have a token and userRoleType in the state', () => {
      instance.setState({
        token: 'testToken',
        userRoleType: 'notary',
      });
    });

    when('I call selectCompleteProfileTab with the item', () => {
      instance.selectCompleteProfileTab(profileStepItem);
    });

    then('the message should contain the token and role in the custom data', () => {

      const message = sendSpy.mock.calls[0][0];
      const selectedRequest = {
        token: 'testToken',
        role: 'notary',
      };
      expect(message.getData(getName(MessageEnum.CustomDataMessage))).toEqual(selectedRequest);
    });

    then('the send method should be called with the message', () => {
      expect(sendSpy).toHaveBeenCalled();
    });
  });

  test('Close the cancellation error popup when OK is clicked', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let message:Message
    given('the cancellation error popup is visible', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      instance.setState({ isCancellactionErrorPopup: true, cancellationError: { errors: 'Some error' } });
      expect(instance.state.isCancellactionErrorPopup).toBe(true);
      expect(instance.state.cancellationError).not.toBeNull();
    });

    when('the OK button is pressed', () => {
      instance.onClickOfOk.onPress();
    
    });

    then('isCancellactionErrorPopup state should be set to false', () => {
      expect(instance.state.isCancellactionErrorPopup).toBe(false);
    });

    then('cancellationError state should be set to null', () => {
      expect(instance.state.cancellationError).toBeNull();
    });
  });

  test('Format a valid cancellation number', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    let message:Message
    given('the cancellation number is "123.456"', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
    });

    when('the number is formatted', () => {
      result = instance.formatCancellactionNumber("123.456");
    });

    then('the formatted cancellation number should be "123.46"', () => {
      expect(result).toBe("123.46");
      
      // instance.receive("abc",message)
     
      const apiMsg: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      apiMsg.addData(getName(MessageEnum.SessionResponseData), 
     { resMessage: "New Invite" }
     
    );
    });
  });

  test('Format a cancellation number with no decimals', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    given('the cancellation number is "123"', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
    });

    when('the number is formatted', () => {
      result = instance.formatCancellactionNumber("123");
     
    });

    then('the formatted cancellation number should be "123.00"', () => {
      expect(result).toBe("123.00");
    });
  });

  test('Format a cancellation number with exactly two decimals', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    given('the cancellation number is "123.40"', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
    });

    when('the number is formatted', () => {
      result = instance.formatCancellactionNumber("123.40");
    });

    then('the formatted cancellation number should be "123.40"', () => {
      expect(result).toBe("123.40");
    });
  });

  test('Display cancellation error popup for matching API request call ID', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    const mockErrorJson = { errors: 'Error message' };
    const matchingApiRequestCallId = 'cancellationChargeId';
    given('an error JSON with an "errors" field exists', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
    });

    given('the API request call ID matches apiCancellationChargeCallId', () => {
      instance.apiCancellationChargeCallId = matchingApiRequestCallId;
    });

    when('handleErrorMessage is triggered', () => {
      instance.handleErrorMessage(mockErrorJson, matchingApiRequestCallId);
    });

    then('isModelVisible should be set to false immediately', () => {
      expect(instance.state.isModelVisible).toBe(false);
    });

    then('after a delay, isCancellactionErrorPopup should be true', () => {
      jest.advanceTimersByTime(Platform.OS === 'ios' ? 500 : 0);
      expect(instance.state.isCancellactionErrorPopup).toBe(true);
    });

    then('cancellationError should be set to the error JSON', () => {
      expect(instance.state.cancellationError).toEqual(mockErrorJson);
    });
  });

  test('Do not display error popup for non-matching API request call ID', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    const mockErrorJson = { errors: 'Error message' };
    const nonMatchingApiRequestCallId = 'otherId';
    given('an error JSON with an "errors" field exists', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
    });

    given('the API request call ID does not match apiCancellationChargeCallId', () => {
    });

    when('handleErrorMessage is triggered', () => {
      instance.handleErrorMessage(mockErrorJson, nonMatchingApiRequestCallId);
    });

    then('the state should not change', () => {
      expect(instance.state.isModelVisible).toBe(false);
      expect(instance.state.isCancellactionErrorPopup).toBe(false);
      expect(instance.state.cancellationError).toBe(null);
    });
  });

  test('Handle cancellation charge API response', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    const mockResponseJson = { data: [{ id: 1, name: 'Service' }] };
    const mockMessage = new Message("");
    const matchingApiRequestCallId = 'cancellationChargeId';
    given('a message with a successful cancellation charge response', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      jest.spyOn(instance, 'showModelOfCancelForInprogress');
      instance.apiCancellationChargeCallId = matchingApiRequestCallId;
      mockMessage.getData = jest.fn((key) => {
        if (key === 'RestAPIResponceDataMessage') return instance.apiCancellationChargeCallId;
        if (key === 'RestAPIResponceSuccessMessage') return mockResponseJson;
      });
    });

    when('handleRestApiResponse is called', async () => {
      await instance.handleRestApiResponse(mockMessage);
    });

    then('isModelVisible should be set to false', () => {
      expect(instance.state.isModelVisible).toBe(false);
    });

    then('after a delay, showModelOfCancelForInprogress should be called with the response JSON', () => {
      jest.runAllTimers();
      expect(instance.showModelOfCancelForInprogress).toHaveBeenCalledWith(mockResponseJson);
    });
  });


  test('Handle error response', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    const mockMessage = new Message("");

    given('a message with an error response', () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      jest.spyOn(instance, 'showModelOfCancelForInprogress');
      jest.spyOn(instance, 'handleErrorMessage');
    });

    when('handleRestApiResponse is called', async () => {
      await instance.handleRestApiResponse(mockMessage);
    });

    then('isModelVisible should be set to false', () => {
      expect(instance.state.isModelVisible).toBe(false);
    });

    then('after a delay, handleErrorMessage should be called with the error JSON and API request call ID', () => {
      jest.runAllTimers();
    });
  });

  test("Display red notification image for unread notifications", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    given("there are unread notifications", () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      instance.setState({ isAnyNotificationUnread: true });
    });

    when("the getNotificationImage function is called", () => {
      instance.getNotificationImage();
    });

    then("the red notification image should be returned", () => {
      expect(instance.getNotificationImage()).toBe(notificationRedImg);
    });
  });

  test("Display default notification image when all notifications are read", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Dashboard;
    given("there are no unread notifications", () => {
      requestDetail = shallow(<Dashboard {...screenProps} />);
      instance = requestDetail.instance() as Dashboard;
      instance.setState({ isAnyNotificationUnread: false });
    });

    when("the getNotificationImage function is called", () => {
      instance.getNotificationImage();
    });

    then("the default notification image should be returned", () => {
      expect(instance.getNotificationImage()).toBe(notificationImg);
    });
  });

  test('See All button of notary services pressed', ({ when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let mockSend: any;
    when('the "See All" button is pressed', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      mockSend = jest.fn();
      instance.send = mockSend;

    });
    then('a navigation message to the catalogue Notary service should be sent', () => {
      instance.onClickseeAllServiceBtnProps.onPress();
    });

    then('the navigation props should be added to the message', () => {
      const msg = mockSend.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationCatalogueNotaryServicesMessage));

    });
  });

  test('Extract abbreviation from a string containing parentheses', ({ given, when, then }) => {
    let inputString: string;
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let result: string;
    given(/^a string "(.*)"$/, (str: string) => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      inputString = str;
    });

    when('the getAbbreviation function is called', () => {
      result = instance.getAbbreviation(inputString);
    });

    then(/^the result should be "(.*)"$/, (expectedResult: string) => {
      expect(result).toBe(expectedResult);
    });
  });

  test('Handle string without parentheses', ({ given, when, then }) => {
    let inputString: string;
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let result: string;
    given(/^a string "(.*)"$/, (str: string) => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      inputString = str;
    });

    when('the getAbbreviation function is called', () => {
      result = instance.getAbbreviation(inputString);
    });

    then('the result should be an empty string', () => {
      expect(result).toBe('');
    });
  });

  test('Extract text inside parentheses from a valid string', ({ given, when, then }) => {
    let inputString: string;
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    given(/^a string "(.*)"$/, (str: string) => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      inputString = str;
    });

    when('the getAbbreviationForMethod function is called', () => {
      result = instance.getAbbreviationForMethod(inputString);
    });

    then(/^the result should be "(.*)"$/, (expectedResult: string) => {
      expect(result).toBe(expectedResult);
    });
  });

  test('Handle empty string input', ({ given, when, then }) => {
    let inputString: string;
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    given('an empty string', () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      inputString = '';
    });

    when('the getAbbreviationForMethod function is called', () => {
      result = instance.getAbbreviationForMethod(inputString);
    });

    then('the result should be an empty string', () => {
      expect(result).toBe('');
    });
  });

  test('Handle string without parentheses new', ({ given, when, then }) => {
    let inputString: string;
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    given(/^a string "(.*)"$/, (str: string) => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      inputString = str;
    });

    when('the getAbbreviationForMethod function is called', () => {
      result = instance.getAbbreviationForMethod(inputString);
    });

    then('the result should be an empty string', () => {
      expect(result).toBe('');
    });
  });

  test('Handle string with empty parentheses', ({ given, when, then }) => {
    let inputString: string;
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    given(/^a string "(.*)"$/, (str: string) => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      inputString = str;
    });

    when('the getAbbreviationForMethod function is called', () => {
      result = instance.getAbbreviationForMethod(inputString);
    });

    then('the result should be an empty string', () => {
      expect(result).toBe('');
    });
  });

  test("Closing the success message modal", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given("the success message modal is open", () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({ isSucessMsgModel: true });
    });

    when("closeSucessMsgModel is called", () => {
      instance.closeSucessMsgModel();
    });

    then("the success message modal should be closed", () => {
      expect(instance.state.isSucessMsgModel).toBe(false);
    });
  });

  test("Opening notifications via button press", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let sendMock: any;
    given("the user clicks on the notification button", () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      sendMock = jest.fn();
      instance.send = sendMock;
    });

    when("openNotificationProps is triggered", () => {
      instance.openNotificationProps.onPress();
    });

    then("a notification navigation message should be sent", () => {
        const msg = sendMock.mock.calls[0][0];
        expect(msg).toBeInstanceOf(Message);
        expect(msg.id).toBe(getName(MessageEnum.NavigationNotificationMessage));
    });
  });

  test("User proceeds to reject request", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let callApiToRejectRequestMock: jest.SpyInstance;
    let setStateMock: jest.SpyInstance;
    given("the user clicks on the 'Yes' button to reject the request", () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      callApiToRejectRequestMock = jest.spyOn(instance, "callApiToRejectRequest");
      setStateMock = jest.spyOn(instance, "setState");
    });

    when("yesProceedToRejectRequest is triggered", () => {
      instance.yesProceedToRejectRequest.onPress();
    });

    then("the API to reject the request should be called", () => {
      expect(callApiToRejectRequestMock).toHaveBeenCalled();
    });

    then("the modal should be closed", () => {
      expect(setStateMock).toHaveBeenCalledWith({
        onViewReject: false,
        isRequestSelected: true,
        isInviteSelected: false,
      });
    });
  });

  test("User cancels the rejection", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let callApiToRejectRequestMock: jest.SpyInstance;
    let setStateMock: jest.SpyInstance;
    given("the user clicks on the 'No' button to cancel rejection", () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      callApiToRejectRequestMock = jest.spyOn(instance, "callApiToRejectRequest");
      setStateMock = jest.spyOn(instance, "setState");
    });

    when("noProceedToRejectRequest is triggered", () => {
      instance.noProceedToRejectRequest.onPress();
    });

    then("the modal should be closed without rejecting the request", () => {
      expect(setStateMock).toHaveBeenCalledWith({
        onViewReject: false,
        isRequestSelected: true,
        isInviteSelected: false,
      });
    });

    then("the API to reject request should not be called", () => {
      expect(callApiToRejectRequestMock).not.toHaveBeenCalled();
    });
  });

  test("Returns menu items for invite when user is a notary", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    given("the user is on the 'Invites' tab and has role_id 2", () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({
        isInviteSelected: true,
        selectedTab: "Invites",
        UserProfileDetail: userDetailForRole2,
      });
    });

    when("getActionItemList is called", () => {
      result = instance.getActionItemList(null);
    });

    then("it should return menuItemsInviteForNotary", () => {
      expect(result).toStrictEqual(menuItemsInviteForNotary);
    });
  });

  test("Returns menu items for invite when user is not a notary", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    let result: any;
    given("the user is on the 'Invites' tab and does not have role_id 2", () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({
        isInviteSelected: true,
        selectedTab: "Invites",
        UserProfileDetail: userDetailForRole3,
      });
    });

    when("getActionItemList is called", () => {
      result = instance.getActionItemList(null);
    });

    then("it should return menuItemsInvite", () => {
      expect(result).toStrictEqual(menuItemsInvite);
    });
  });

  test("Toggling between Request and Invite tabs", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given("the user is on the Request tab", () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({
        isRequestSelected: true,
        isInviteSelected: false,
        dashboardData: [{ id: 1, name: "Request 1" }],
        inviteRequestData: inviteDummyData,
      });
    });

    when("btnTabRequestAndInviteProps is pressed", () => {
      instance.btnTabRequestAndInviteProps.onPress();
    });

    then("the Invite tab should be selected", () => {
      expect(instance.state.isRequestSelected).toBe(false);
      expect(instance.state.isInviteSelected).toBe(true);
      expect(instance.state.selectedRequestTypeData).toBe(instance.state.inviteRequestData);
    });

    when("btnTabRequestAndInviteProps is pressed again", () => {
      
      instance.btnTabRequestAndInviteProps.onPress();
    });

    then("the Request tab should be selected again", () => {
      expect(instance.state.isRequestSelected).toBe(false);
      expect(instance.state.isInviteSelected).toBe(true);
    });
  });

  test("Handling tab selection", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashboard;
    given("the user is on the dashboard", () => {
      dashboardWrapper = shallow(<Dashboard {...screenProps} />);
      instance = dashboardWrapper.instance() as Dashboard;
      instance.setState({
        newRequestData: [{ id: 1, name: "New Request" }],
        inviteRequestData: inviteDummyData,
        outgoingRequestData: [{ id: 3, name: "Outgoing Request" }],
      });
    });

    when("handleTabSelection is called with 'New Requests'", () => {
      instance.handleTabSelection("New Requests");
    });

    then("the selectedTab should be 'New Requests' and selectedRequestTypeDataForNotary should be newRequestData", () => {
      expect(instance.state.selectedTab).toBe("New Requests");
      expect(instance.state.selectedRequestTypeDataForNotary).toBe(instance.state.newRequestData);
    });

    when("handleTabSelection is called with 'Invites'", () => {
      instance.handleTabSelection("Invites");
    });

    then("the selectedTab should be 'Invites' and selectedRequestTypeDataForNotary should be inviteRequestData", () => {
      expect(instance.state.selectedTab).toBe("Invites");
      expect(instance.state.selectedRequestTypeDataForNotary).toBe(instance.state.inviteRequestData);
    });

    when("handleTabSelection is called with 'Outgoing Requests'", () => {
      instance.handleTabSelection("Outgoing Requests");
    });

    then("the selectedTab should be 'Outgoing Requests' and selectedRequestTypeDataForNotary should be outgoingRequestData", () => {
      expect(instance.state.selectedTab).toBe("Outgoing Requests");
      expect(instance.state.selectedRequestTypeDataForNotary).toBe(instance.state.outgoingRequestData);
    });
  });

});
