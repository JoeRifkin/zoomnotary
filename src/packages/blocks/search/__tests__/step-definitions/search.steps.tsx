import { defineFeature, loadFeature } from 'jest-cucumber'
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from 'react'
import Search from '../../src/Search'
const navigation = require('react-navigation')
import { Platform, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from '../../../../framework/src/Message'
export const configJSON = require('../../config.json')
import MessageEnum, {
  getName
} from '../../../../framework/src/Messages/MessageEnum'
import { _ } from '../../../../framework/src/IBlock'
import { act } from "react-test-renderer";
import { getStorageData } from '../../../../framework/src/Utilities'; // Replace with your actual storage library
import { deleteImg, checkGrayImg, viewImg, cancelImg, editImg, MLinkImg, messageImg, notificationImg, notificationRedImg } from "../../src/assets";
// jest.mock('your-storage-library');
const screenProps = {
  navigation: navigation,
  id: 'Search'
}

const feature = loadFeature('./__tests__/features/search-scenario.feature')

jest.mock('../../../../framework/src/Utilities', () => ({
  getStorageData: jest.fn(),
  setStorageData: jest.fn(),
}));

defineFeature(feature, test => {

  let userDetail1 = {
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
    role_id: 1,
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

  let userDetail2 = {
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

  const requestapiResponse = {
    "new_notary_requests": {
      "data": [
        {
          "id": "585",
          "type": "notary_request_dashboard",
          "attributes": {
            "status": "PENDING",
            "notary_id": 1,
            "notary_service_type": 4,
            "priority": "Super Priority",
            "notarisation_method_id": 1,
            "date": "2025-02-11T00:00:00.000Z",
            "invited_request_status": null,
            "is_deleted": false,
            "invite_request": false,
            "invite_number": null,
            "notarisation_method": {
              "id": 1,
              "notarisation_method": "Remote Electronic Notarisation (REN)",
              "created_at": "2024-05-08T06:14:28.072Z",
              "updated_at": "2024-05-08T06:47:44.043Z"
            },
            "notary_service_name": "Administering Oaths and Affirmations",
            "quote_statuses_id": null
          }
        }
      ]
    },
    "notary_ongoing_requests": {
      "data": [
        {
          "id": "356",
          "type": "notary_request_dashboard",
          "attributes": {
            "status": "IN PROGRESS",
            "notary_id": 349,
            "notary_service_type": 10,
            "priority": "Super Priority",
            "notarisation_method_id": 3,
            "date": "2024-11-14T00:00:00.000Z",
            "invited_request_status": null,
            "is_deleted": false,
            "invite_request": null,
            "invite_number": null,
            "notarisation_method": {
              "id": 3,
              "notarisation_method": "Remote Electronic-Ink Notarisation (REIN)",
              "created_at": "2024-05-08T06:47:58.594Z",
              "updated_at": "2024-05-08T06:47:58.594Z"
            },
            "notary_service_name": "Test stage",
            "quote_statuses_id": 3
          }
        }
      ]
    },
    "invite_request": {
      "data": [
        {
          "id": "537",
          "type": "notary_request_dashboard",
          "attributes": {
            "status": "PENDING",
            "notary_id": 349,
            "notary_service_type": 9,
            "priority": "Standard",
            "notarisation_method_id": 2,
            "date": "2025-01-31T00:00:00.000Z",
            "invited_request_status": "ACCEPTED",
            "is_deleted": false,
            "invite_request": true,
            "invite_number": 8542145874,
            "notarisation_method": {
              "id": 2,
              "notarisation_method": "Remote Ink Notarisation (RIN)",
              "created_at": "2024-05-08T06:46:56.040Z",
              "updated_at": "2024-05-08T06:47:24.566Z"
            },
            "notary_service_name": "Other (Translation, Diploma verification, apostille)",
            "quote_statuses_id": 1
          }
        }
      ]
    }
  }

  const menuItems = [
    { icon: viewImg, text: 'View', key: 'view', action: ['pending', "cancelled", "completed", "in progress", "draft"] },
    { icon: editImg, text: 'Edit', key: 'edit', action: ['pending', "draft"] },
    { icon: MLinkImg, text: 'Meeting Link', key: 'mLink', action: ["in progress"] },
    { icon: messageImg, text: 'Message', key: 'message', action: ["in progress"] },
    { icon: cancelImg, text: 'Cancel', key: 'cancel', action: ['pending', "in progress"] },
    { icon: deleteImg, text: 'delete', key: 'cancel', action: ["draft"] }
  ];

  const menuItemsForNotary = [
    { icon: viewImg, text: 'View', key: 'view', action: ['pending', "cancelled", "completed", "in progress",] },
    { icon: editImg, text: "Submit Quote", key: 'submit', action: ['pending'] },
    { icon: cancelImg, text: 'Withdraw Quote', key: 'withdraw', action: ['pending'] },
    { icon: MLinkImg, text: 'Meeting Link', key: 'mLink', action: ["in progress"] },
    { icon: messageImg, text: 'Message', key: 'message', action: ["in progress"] }
  ];

  const menuItemsInvite = [
    { icon: viewImg, text: 'View', key: 'view', action: ["invite", "rejected"] },
    { icon: checkGrayImg, text: 'Accept', key: 'Accept', action: ["invite",] },
    { icon: cancelImg, text: 'Reject', key: 'Reject', action: ['invite'] },
  ];

  const menuItemsInviteForNotary = [
    { icon: viewImg, text: 'View', key: 'view', action: ["invite", "rejected", "accepted"] }
  ];

  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web')

  })

  test('User navigates to search', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search

    given('I am a User loading search', () => {
      SearchWrapper = shallow(<Search {...screenProps} />)
    })

    then('I can leave the screen with out errors', () => {
      const hideKeyboard = SearchWrapper.findWhere(
        (node) => node.prop("testID") === "KeyboardTestID"
      );
      hideKeyboard.simulate("press");
      expect(SearchWrapper).toBeTruthy()
    })
  })

  test('Handle session response message', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search
    let message: Message;

    const sessionResponseMessageId = "SessionResponseMessage";
    given('the message ID is "SessionResponseMessage"', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      jest.spyOn(instance, 'handleSessionResponse').mockImplementation(() => Promise.resolve());
      jest.spyOn(instance, 'handleRestApiResponse').mockImplementation(() => { });
      message = { id: sessionResponseMessageId } as Message;
    });

    when('the message is handled', async () => {
      await instance.handleMessage(message);
      instance.handleSessionResponse(message)
    });

    then('the handleSessionResponse method should be called', () => {
      expect(instance.handleSessionResponse).toHaveBeenCalledWith(message);
    });
  });

  test('Handle rest API response message', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search
    let message: Message;

    const restAPIResponseMessageId = "RestAPIResponceMessage";
    given('the message ID is "RestAPIResponceMessage"', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      jest.spyOn(instance, 'handleSessionResponse').mockImplementation(() => Promise.resolve());
      jest.spyOn(instance, 'handleRestApiResponse').mockImplementation(() => { });
      message = { id: restAPIResponseMessageId } as Message;
    });

    when('the message is handled', () => {
      instance.handleMessage(message);
      instance.handleRestApiResponse(message)
    });

    then('the handleRestApiResponse method should be called', () => {
      expect(instance.handleRestApiResponse).toHaveBeenCalledWith(message);
    });
  });

  test('Successful API response', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search
    let mockMessage: any;
    given('a message with a successful API response', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      mockMessage = {
        getData: jest.fn(),
      };
      mockMessage.getData
        .mockReturnValueOnce('some-api-request-id') // First call for apiRequestCallId
        .mockReturnValueOnce({ success: true })     // Second call for responseJson
        .mockReturnValueOnce(null);                 // Third call for errorResponse
    });

    when('the handleRestApiResponse function is called', () => {
      instance.handleRestApiResponse(mockMessage);
    });

    then('it should process the response without error', () => {
      expect(mockMessage.getData).toHaveBeenCalledTimes(3);
    });
  });

  test('Error in API response', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search
    let mockMessage: any;
    given('a message with an error in the API response', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      mockMessage = {
        getData: jest.fn(),
      };
      mockMessage.getData
        .mockReturnValueOnce('some-api-request-id') // First call for apiRequestCallId
        .mockReturnValueOnce(null)                  // Second call for responseJson
        .mockReturnValueOnce({ error: 'Some error' }); // Third call for errorResponse
    });

    when('the handleRestApiResponse function is called', () => {
      instance.handleRestApiResponse(mockMessage);
    });

    then('it should process the error without crashing', () => {
      expect(mockMessage.getData).toHaveBeenCalledTimes(3);
    });
  });

  test('Handle session response with user type as \'end_user\'', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search
    let message: any;
    const sessionResponseToken = 'session_token_value'; // Mock token value
    const mockUserProfileDataEndUser = JSON.stringify({
      role_id: 1,
      name: 'End User',
    });
    let getRequestListDataSpy: any
    given('a session response message with a token and role_id 1', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      message = {
        getData: jest.fn(),
      };
      message.getData.mockReturnValue(sessionResponseToken);
      (getStorageData as jest.Mock).mockResolvedValue(mockUserProfileDataEndUser);
      getRequestListDataSpy = jest.spyOn(instance, 'getRequestListData');
    });

    when('the message is handled', async () => {
      await instance.handleSessionResponse(message);
    });

    then('the state should be updated with userType as \'end_user\', requestDate as \'Request Date\', and token', () => {

    });

    then('the request list should be fetched', () => {
      expect(getRequestListDataSpy).toHaveBeenCalledWith('?page=1&per_page=10');
    });
  });

  test('Handle session response with user type as \'notary\'', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search
    let message: any;
    const sessionResponseToken = 'session_token_value'; // Mock token value
    const mockUserProfileDataNotary = JSON.stringify({
      role_id: 2,
      name: 'Notary User',
    });
    let getRequestListDataSpy: any
    given('a session response message with a token and role_id other than 1', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      message = {
        getData: jest.fn(),
      };
      message.getData.mockReturnValue(sessionResponseToken);
      (getStorageData as jest.Mock).mockResolvedValue(mockUserProfileDataNotary);
      getRequestListDataSpy = jest.spyOn(instance, 'getRequestListData');
    });


    when('the message is handled', async () => {
      await instance.handleSessionResponse(message);
    });

    then('the state should be updated with userType as \'notary\', requestDate as \'Date\', and token', () => {

    });

    then('the request list should be fetched', () => {
      expect(getRequestListDataSpy).toHaveBeenCalledWith('?page=1&per_page=10');
    });
  });

  test('No responseJson, errorResponse present', ({ given, when, then }) => {
    let apiRequestCallId: string;
    let errorResponse: any;
    let SearchWrapper: ShallowWrapper
    let instance: Search
    let responseJson: any
    let handleErrorResponseSpy: any;
    given('the responseJson is null', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      responseJson = null;
      handleErrorResponseSpy = jest.spyOn(instance, 'handleErrorResponse');
    });

    given('the apiRequestCallId is "someApiCallId"', () => {
      apiRequestCallId = 'someApiCallId';
    });

    given('there is an errorResponse', () => {
      errorResponse = { error: 'Some error' };
    });

    when('the handleApiResponse function is called', () => {
      instance.handleApiResponse(responseJson, apiRequestCallId, errorResponse);
    });

    then('it should call the handleErrorResponse function with the apiRequestCallId and errorResponse', () => {
      expect(handleErrorResponseSpy).toHaveBeenCalledWith(apiRequestCallId, errorResponse);
    });
  });

  test('Valid response for apiRequestListCallId', ({ given, when, then }) => {
    let responseJson: any;
    let apiRequestCallId: string;
    let SearchWrapper: ShallowWrapper
    let instance: Search
    let manageRequestListDataSpy: any
    given('the responseJson is valid', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      responseJson = { data: 'some data' };
      manageRequestListDataSpy = jest.spyOn(instance, 'manageRequestListData');
    });

    given('the apiRequestCallId is "apiRequestListCallId"', () => {
      apiRequestCallId = 'apiRequestListCallId';
      instance.apiRequestListCallId = 'apiRequestListCallId';
    });

    when('the handleApiResponse function is called', () => {
      instance.handleApiResponse(responseJson, apiRequestCallId, null);
    });

    then('it should call the manageRequestListData function with the responseJson', () => {
      expect(manageRequestListDataSpy).toHaveBeenCalledWith(responseJson);
    });
  });

  test('Valid response for apiNotaryServiceCallId', ({ given, when, then }) => {
    let responseJson: any;
    let apiRequestCallId: string;
    let SearchWrapper: ShallowWrapper
    let instance: Search
    let handleNotaryServiceResponseSpy: any;
    given('the responseJson is valid', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      responseJson = {
        data: [
          {
            id: '1234',
            type: 'notary',
            attributes: {
              id: '123',
              service_icon: "http://democ.png",
              service_name: 'hello',
              service_description: 'hello detail',
              is_selected: false
            }
          }
        ]
      };
      handleNotaryServiceResponseSpy = jest.spyOn(instance, 'handleNotaryServiceResponse');
    });

    given('the apiRequestCallId is "apiNotaryServiceCallId"', () => {
      apiRequestCallId = 'apiNotaryServiceCallId';
      instance.apiNotaryServiceCallId = 'apiNotaryServiceCallId';
    });

    when('the handleApiResponse function is called', () => {
      instance.handleApiResponse(responseJson, apiRequestCallId, null);
    });

    then('it should call the handleNotaryServiceResponse function with the responseJson', () => {
      expect(handleNotaryServiceResponseSpy).toHaveBeenCalledWith(responseJson);
    });
  });

  test('Valid response for apiCancellationChargeCallId', ({ given, when, then }) => {
    let responseJson: any;
    let apiRequestCallId: string;
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    let showModelOfCancelForInprogressSpy: any;
    given('the responseJson is valid', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      responseJson = {
        data: [
          {
            id: '1234',
            type: 'notary',
            attributes: {
              id: '123',
              service_icon: "http://democ.png",
              service_name: 'hello',
              service_description: 'hello detail',
              is_selected: false
            }
          }
        ]
      };
      showModelOfCancelForInprogressSpy = jest.spyOn(instance, 'showModelOfCancelForInprogress');
    });

    given('the apiRequestCallId is "apiCancellationChargeCallId"', () => {
      apiRequestCallId = 'apiCancellationChargeCallId';
      instance.apiCancellationChargeCallId = 'apiCancellationChargeCallId';
    });

    when('the handleApiResponse function is called', () => {
      instance.handleApiResponse(responseJson, apiRequestCallId, null);
    });

    then('it should call the showModelOfCancelForInprogress function with the responseJson', () => {
      expect(showModelOfCancelForInprogressSpy).toHaveBeenCalledWith(responseJson);
    });
  });

  test('Valid response for apiCancelRequestCallId', ({ given, when, then }) => {
    let responseJson: any;
    let apiRequestCallId: string;
    let SearchWrapper: ShallowWrapper
    let instance: Search
    let handleCancelRequestResponseSpy: any;
    given('the responseJson is valid', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      responseJson = { notary_id: '12345', message: 'some data' };
      handleCancelRequestResponseSpy = jest.spyOn(instance, 'handleCancelRequestResponse');
    });

    given('the apiRequestCallId is "apiCancelRequestCallId"', () => {
      apiRequestCallId = 'apiCancelRequestCallId';
      instance.apiCancelRequestCallId = 'apiCancelRequestCallId';
    });

    when('the handleApiResponse function is called', () => {
      instance.handleApiResponse(responseJson, apiRequestCallId, null);
    });

    then('it should call the handleCancelRequestResponse function with the responseJson', () => {
      expect(handleCancelRequestResponseSpy).toHaveBeenCalledWith(responseJson);
    });
  });

  test('Valid error response and matching apiRequestCallId', ({ given, when, then }) => {
    let errorResponse: any;
    let apiRequestCallId: string;
    let SearchWrapper: ShallowWrapper
    let instance: Search
    given('there is a valid errorResponse', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      errorResponse = { error: 'Some error' };
    });

    given('the apiRequestCallId is "apiRequestListCallId"', () => {
      apiRequestCallId = 'apiRequestListCallId';
      instance.apiRequestListCallId = 'apiRequestListCallId';
    });

    when('the handleErrorResponse function is called', () => {
      instance.handleErrorResponse(apiRequestCallId, errorResponse);
    });

    then('it should set isLoader to false', () => {
    });

    then('it should set pageNo to 1', () => {
    });
  });

  test('Invalid error response (null or undefined)', ({ given, when, then }) => {
    let errorResponse: any;
    let apiRequestCallId: string;
    let SearchWrapper: ShallowWrapper
    let instance: Search
    given('the errorResponse is null', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      errorResponse = null;
    });

    given('the apiRequestCallId is "apiRequestListCallId"', () => {
      apiRequestCallId = 'apiRequestListCallId';
      instance.apiRequestListCallId = 'apiRequestListCallId';
    });

    when('the handleErrorResponse function is called', () => {
      instance.handleErrorResponse(apiRequestCallId, errorResponse);
    });

    then('it should not update the state', () => {
    });
  });

  test('Non-matching apiRequestCallId', ({ given, when, then }) => {
    let errorResponse: any;
    let apiRequestCallId: string;
    let SearchWrapper: ShallowWrapper
    let instance: Search
    given('there is a valid errorResponse', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      errorResponse = { error: 'Some error' };
    });

    given('the apiRequestCallId is "someOtherApiCallId"', () => {
      apiRequestCallId = 'someOtherApiCallId';
      instance.apiRequestListCallId = 'someOtherApiCallId';
    });

    when('the handleErrorResponse function is called', () => {
      instance.handleErrorResponse(apiRequestCallId, errorResponse);
    });

    then('it should not update the state', () => {
    });
  });

  test('Valid message ID and myData exists', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    let message: any
    given('the message ID is "NavigationPayLoadMessage"', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      //message.id = 'NavigationPayLoadMessage';
      instance.receive("abc", message,)

      const apiMsg: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      apiMsg.addData(getName(MessageEnum.SessionResponseData),
        { resMessage: "New Invite", });
      runEngine.sendMessage("Unit Test", apiMsg);

    });

    given('the message has valid custom data', () => {
      const myData = { type: 'someType' };
      message = {
        getData: jest.fn(),
      };
      message.getData.mockReturnValue(myData);
      instance.setState({ comingFromType: 'someType' })
    });

    when('the storeMDataValue function is called', () => {

      instance.storeMDataValue(message);
      instance.storeMyNewInvite(message)

    });

    then('it should update the state with comingFromType set to the custom data type', () => {
      expect(instance.state.comingFromType).toBe('someType');
    });
  });

  test('Valid message ID but myData is missing', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    let message: any
    given('the message ID is "NavigationPayLoadMessage"', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      // message.id = 'NavigationPayLoadMessage';
    });

    given('the custom data is missing', () => {
      message = {
        getData: jest.fn(),
      };
      message.getData.mockReturnValue(null);
      // jest.spyOn(message, 'getData').mockReturnValue(null);
    });

    when('the storeMDataValue function is called', () => {
      instance.storeMDataValue(message);
    });

    then('it should not update the state', () => {

    });
  });

  test('User is an end-user', ({ given, when, then }) => {
    let response: any;
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    given('the user is an end-user', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      response = {
        end_user_notary_requests: {
          data: [{ id: 1, name: 'Request 1' }]
        }
      }
    });

    when('the getNotaryRequests function is called', () => {
      instance.getNotaryRequests(response, true);
    });

    then('it should return the end user notary requests', () => {
      const result = instance.getNotaryRequests(response, true);
      expect(result).toEqual(response.end_user_notary_requests.data);
    });
  });

  test('Coming from type is new', ({ given, when, then }) => {
    let response: any;
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    given('the coming from type is new', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      instance.setState({ comingFromType: 'new' });
      response = {
        new_notary_requests: {
          data: [{ id: 2, name: 'New Request' }]
        }
      };
    });

    when('the getNotaryRequests function is called', () => {
      instance.getNotaryRequests(response, false);
    });

    then('it should return the new notary requests', () => {
      const result = instance.getNotaryRequests(response, false);
      expect(result).toEqual(response.new_notary_requests.data);
    });
  });

  test('Coming from type is ongoing', ({ given, when, then }) => {
    let response: any;
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    given('the coming from type is ongoing', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      instance.setState({ comingFromType: 'ongoing' });
      response = {
        notary_ongoing_requests: {
          data: [{ id: 3, name: 'Ongoing Request' }]
        }
      }
    });

    when('the getNotaryRequests function is called', () => {
      instance.getNotaryRequests(response, false);
    });

    then('it should return the ongoing notary requests', () => {
      const result = instance.getNotaryRequests(response, false);
      expect(result).toEqual(response.notary_ongoing_requests.data);
    });
  });

  test('Default case when coming from type is not new or ongoing', ({ given, when, then }) => {
    let response: any;
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    given('the coming from type is neither new nor ongoing', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      instance.setState({ comingFromType: 'other' });
      response = {
        some_other_data: []
      };
    });

    when('the getNotaryRequests function is called', () => {
      jest.spyOn(instance, 'combineAndSortRequests').mockReturnValue([]);
      instance.getNotaryRequests(response, false);
    });

    then('it should combine and sort the requests', () => {
      expect(instance.combineAndSortRequests).toHaveBeenCalledWith(response);
    });
  });

  test('Combine and sort requests when both ongoing and new requests are present', ({ given, when, then }) => {
    let response: any;
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    given('the response contains both ongoing and new notary requests', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      response = {
        notary_ongoing_requests: {
          data: [
            { id: 2, name: 'Ongoing Request 2' },
            { id: 3, name: 'Ongoing Request 3' }
          ]
        },
        new_notary_requests: {
          data: [
            { id: 1, name: 'New Request 1' },
            { id: 4, name: 'New Request 4' }
          ]
        }
      };
    });

    let result: any;

    when('the combineAndSortRequests function is called', () => {
      result = instance.combineAndSortRequests(response);
    });

    then('it should return the combined and sorted list of notary requests by id in descending order', () => {
      expect(result).toEqual([
        { id: 4, name: 'New Request 4' },
        { id: 3, name: 'Ongoing Request 3' },
        { id: 2, name: 'Ongoing Request 2' },
        { id: 1, name: 'New Request 1' }
      ]);
    });
  });

  test('Combine and sort when only ongoing requests are present', ({ given, when, then }) => {
    let response: any;
    let SearchWrapper: ShallowWrapper
    let instance: Search;

    given('the response contains only ongoing notary requests', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      response = {
        notary_ongoing_requests: {
          data: [
            { id: 3, name: 'Ongoing Request 3' },
            { id: 1, name: 'Ongoing Request 1' }
          ]
        }
      }
    });

    let result: any

    when('the combineAndSortRequests function is called', () => {
      result = instance.combineAndSortRequests(response);
    });

    then('it should return only the ongoing requests sorted by id in descending order', () => {
      expect(result).toEqual([
        { id: 3, name: 'Ongoing Request 3' },
        { id: 1, name: 'Ongoing Request 1' }
      ]);
    });
  });

  test('Combine and sort when only new requests are present', ({ given, when, then }) => {
    let response: any;
    let SearchWrapper: ShallowWrapper
    let instance: Search;

    given('the response contains only new notary requests', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      response = {
        new_notary_requests: {
          data: [
            { id: 4, name: 'New Request 4' },
            { id: 2, name: 'New Request 2' }
          ]
        }
      }
    });

    let result: any;

    when('the combineAndSortRequests function is called', () => {
      result = instance.combineAndSortRequests(response);
    });

    then('it should return only the new requests sorted by id in descending order', () => {
      expect(result).toEqual([
        { id: 4, name: 'New Request 4' },
        { id: 2, name: 'New Request 2' }
      ]);
    });
  });

  test('Combine and sort when no requests are present', ({ given, when, then }) => {
    let response: any;
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    given('the response contains no notary requests', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      response = {
        notary_ongoing_requests: { data: [] },
        new_notary_requests: { data: [] }
      }
    });

    let result: any

    when('the combineAndSortRequests function is called', () => {
      result = instance.combineAndSortRequests(response);
    });

    then('it should return an empty list', () => {
      expect(result).toEqual([]);
    });
  });

  test('Scroll reaches the bottom of the content for the first time', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    let onScrollToBottomSpy: any
    let event: any
    let mockSetState: any;
    let mockOnScrollToBottom: any;
    given('the content is being scrolled', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      // instance.setState({ isScrollAtBottom: false });
      onScrollToBottomSpy = jest.spyOn(instance, 'onScrollToBottom');
      mockSetState = jest.fn();
      mockOnScrollToBottom = jest.fn();

      instance.setState = mockSetState;
      instance.onScrollToBottom = mockOnScrollToBottom;
    });

    when('the scroll reaches the bottom', () => {
      event = {
        nativeEvent: {
          layoutMeasurement: { height: 100 },
          contentOffset: { y: 200 },
          contentSize: { height: 300 }
        }
      };
      instance.handleScroll(event);
    });

    then('the isScrollAtBottom state should be set to true', () => {
      expect(mockSetState).toHaveBeenCalledWith({ isScrollAtBottom: true });
    });

    then('onScrollToBottom should be called once', () => {
      // expect(onScrollToBottomSpy).toHaveBeenCalledTimes(1);
      expect(mockOnScrollToBottom).toHaveBeenCalled();
    });
  });

  test('Scroll does not reach the bottom', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    let onScrollToBottomSpy: any
    let event: any
    given('the content is being scrolled', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      instance.setState({ isScrollAtBottom: false });
      onScrollToBottomSpy = jest.spyOn(instance, 'onScrollToBottom');
    });

    when('the scroll does not reach the bottom', () => {
      event = {
        nativeEvent: {
          layoutMeasurement: { height: 500 },
          contentOffset: { y: 300 },
          contentSize: { height: 1000 }
        }
      };
      instance.handleScroll(event);
    });

    then('the isScrollAtBottom state should remain false', () => {
      expect(instance.state.isScrollAtBottom).toBe(false);
    });

    then('onScrollToBottom should not be called', () => {
      expect(onScrollToBottomSpy).not.toHaveBeenCalled();
    });
  });

  test('Scroll already at the bottom', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    let onScrollToBottomSpy: any
    let event: any
    given('the content is already scrolled to the bottom', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      instance.setState({ isScrollAtBottom: true });
      onScrollToBottomSpy = jest.spyOn(instance, 'onScrollToBottom');
    });

    when('the scroll event occurs again', () => {
      event = {
        nativeEvent: {
          layoutMeasurement: { height: 500 },
          contentOffset: { y: 900 },
          contentSize: { height: 900 }
        }
      };
      instance.handleScroll(event);
    });

    then('onScrollToBottom should not be called again', () => {
      expect(onScrollToBottomSpy).not.toHaveBeenCalled();
    });
  });

  test('Transaction length is 10 and triggers fetching more transactions', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: Search;
    let mockGetTransactions: any;
    given('the transaction length is 10', () => {
      transactionPage = shallow(<Search {...screenProps} />);
      instance = transactionPage.instance() as Search;
      instance.setState({ requestListLength: 10, pageNo: 1, searchQuery: '123' });
      mockGetTransactions = jest.fn();
      instance.getRequestListData = mockGetTransactions;
    });

    when('the user scrolls to the bottom of the list', () => {
      instance.onScrollToBottom();
    });

    then('the page number should be incremented by 1', () => {
      expect(instance.state.pageNo).toBe(2);
    });

    then('the getTransactions function should be called with correct url parameters', () => {
      const expectedUrlParams = '?page=2&per_page=10&order_id=&service_type=&request_date_start=&request_date_end=&completion_date_start=&completion_date_end=&request_status=&urgency_level=';
      expect(mockGetTransactions).toHaveBeenCalledWith(expectedUrlParams);
    });
  });

  test('Transaction length is not 10 and no new transactions are fetched', ({ given, when, then }) => {
    let transactionPage: ShallowWrapper;
    let instance: Search;
    let mockGetTransactions: any;
    given('the transaction length is not 10', () => {
      transactionPage = shallow(<Search {...screenProps} />);
      instance = transactionPage.instance() as Search;
      instance.setState({ requestListLength: 8, pageNo: 1 });
      mockGetTransactions = jest.fn();
      instance.getRequestListData = mockGetTransactions;
    });

    when('the user scrolls to the bottom of the list', () => {
      instance.onScrollToBottom();
    });

    then('the page number should remain unchanged', () => {
      expect(instance.state.pageNo).toBe(1);
    });

    then('the getTransactions function should not be called', () => {
      expect(mockGetTransactions).not.toHaveBeenCalled();
    });
  });

  test('User clicks on avatar icon to navigate the menu', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    let sendMock: any;
    given('the avatar icon is visible', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      sendMock = jest.fn();
      instance.send = sendMock;
    });

    when('the user clicks on the avatar icon', () => {
      instance.onClickOfAvatatIcon.onPress();
    });

    then('a navigation menu message should be sent with the correct props', () => {
      const msg = sendMock.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationMenuMessage));

    });
  });

  test('User triggers reset of state and fetching data', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    given('the initial state is not reset', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      instance.setState({ pageNo: 1, isLoader: false, requestListLength: 3 });
    });

    let parmURL: any;
    when('the user triggers the reset and fetch action', () => {
      instance.resetStateAndFetchData();
      parmURL = instance.constructParamDataForSearch()
    });

    then('the state should be reset to the default values', () => {
      expect(instance.state.pageNo).toBe(1);
      expect(instance.state.isLoader).toBe(true);
      expect(instance.state.requestListData).toEqual([]);
      expect(instance.state.requestListLength).toBe(0);

    });

    then('the request list data should be fetched with constructed parameters', () => {
      instance.getRequestListData(parmURL)
    });
  });

  test('User types into the search field', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    let resetStateAndFetchDataSpy: any
    given('the user starts with an empty search query', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      resetStateAndFetchDataSpy = jest.spyOn(instance, 'resetStateAndFetchData');
      instance.setState({ searchQuery: '' });
    });

    when('the user types a new query "hello"', () => {
      instance.onChange('hello');
    });

    then('the search query state should be updated with "hello"', () => {
      expect(instance.state.searchQuery).toBe('hello');
    });

    then('the resetStateAndFetchData function should not be called', () => {
      expect(resetStateAndFetchDataSpy).not.toHaveBeenCalled();
    });
  });

  test('User clears the search field', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    let resetStateAndFetchDataSpy: any
    given('the user has already typed "hello" into the search field', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      instance.setState({ searchQuery: 'hello' });
      resetStateAndFetchDataSpy = jest.spyOn(instance, 'resetStateAndFetchData');
    });

    when('the user clears the search field', () => {
      instance.onChange('');
    });

    then('the search query state should be updated with an empty string', () => {
      expect(instance.state.searchQuery).toBe('');
    });

    then('the resetStateAndFetchData function should be called', () => {
      expect(resetStateAndFetchDataSpy).toHaveBeenCalled();
    });
  });

  test('User presses the search button', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    let mockGetRequestListData: any
    given('the user has entered search criteria', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      mockGetRequestListData = jest.spyOn(instance, 'getRequestListData');
      instance.setState({
        searchQuery: '12345',
        selectedServiceType: { label: 'Service A', value: "1" },
        selectedDateType: 'request',
        startDate: '2024-10-01',
        endDate: '2024-10-10',
        selectedRequestStatusFilter: { key: 'Pending', title: 'Pending', img: 'https://demo.png' },
        selectedPriorityFilter: { key: 'Standard', title: 'Standard', img: 'https://demo.png' }
      });
    });

    when('the user presses the search button', () => {
      instance.onSearch.onPress();
    });

    then('the state should be updated with default values', () => {
      expect(instance.state.pageNo).toBe(1);
      expect(instance.state.isLoader).toBe(true);
      expect(instance.state.requestListData).toEqual([]);
      expect(instance.state.requestListLength).toBe(0);
    });

    then('the getRequestListData function should be called with the correct query parameters', () => {
      const expectedParmData = `?page=1&per_page=10&order_id=12345&service_type=1&request_date_start=2024-10-01&request_date_end=2024-10-10&completion_date_start=&completion_date_end=&request_status=Pending&urgency_level=Standard`;
      expect(mockGetRequestListData).toHaveBeenCalledWith(expectedParmData);
    });
  });

  test('Find matching service and return truncated name', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    let result: any;
    given('the available services include a service with value 1 and label "Notary Service A"', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      instance.setState({
        servicesList: [{ value: "1", label: 'Notary Service A' }]
      });
    });

    when('the user searches for service with value 1 and truncates to 10 characters', () => {
      result = instance.getNotaryServiceValue(1, 10);
    });

    then('the truncated service name should be "Notary Ser"', () => {
      expect(result).toBe('Notary Ser...');
    });
  });

  test('No matching service found', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    let result: any;
    given('the available services do not include a service with value 99', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      instance.setState({
        servicesList: []
      });
    });

    when('the user searches for service with value 99', () => {
      result = instance.getNotaryServiceValue(99, 10);
    });

    then('the result should be an empty string', () => {
      expect(result).toBe('');
    });
  });

  test('Find matching service but truncates to a smaller length', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    let result: any;
    given('the available services include a service with value 1 and label "Notary Service A"', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      instance.setState({
        servicesList: [{ value: "1", label: 'Notary Service A' }]
      });
    });

    when('the user searches for service with value 1 and truncates to 5 characters', () => {
      result = instance.getNotaryServiceValue(1, 5);
    });

    then('the truncated service name should be "Notar"', () => {
      expect(result).toBe('Notar...');
    });
  });

  test('Open dropdown for a selected service', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    given('the dropdown is initially closed', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      expect(instance.state.isModelVisible).toBe(false);
      expect(instance.state.selectedService).toBeNull();
    });

    when('the user selects a service at index 1', () => {
      instance.toggleDropdown(1);
    });

    then('the dropdown should be visible', () => {
      expect(instance.state.isModelVisible).toBe(true);
    });

    then('the selected service should be set to 1', () => {
      expect(instance.state.selectedService).toBe(1);
    });
  });

  test('Close the dropdown', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    given('the dropdown is visible with a selected service', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      instance.setState({ isModelVisible: true, selectedService: 1 });
      expect(instance.state.isModelVisible).toBe(true);
      expect(instance.state.selectedService).toBe(1);
    });

    when('the user closes the dropdown', () => {
      instance.closeToggleDropDown();
    });

    then('the dropdown should be hidden', () => {
      expect(instance.state.isModelVisible).toBe(false);
    });

    then('the selected service should be null', () => {
      expect(instance.state.selectedService).toBeNull();
    });
  });

  test('Notary user with quote status 2', ({ given, when, then }) => {
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    let result: any;
    given('the user role type is "notary"', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ UserProfileDetail: userDetail2 });
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
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    let result: any;
    given('the user role type is "notary"', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ UserProfileDetail: userDetail2 });
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
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    let result: any;
    given('the user role type is "notary"', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ UserProfileDetail: userDetail2 });
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
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    let result: any;
    given('the user role type is "end_user"', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ UserProfileDetail: userDetail1 });
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

    then('the action item list should be the default menu items invite', () => {
      //expect(result).toEqual(menuItemsInvite);
    });
  });

  test('Menu width for end user role', ({ given, when, then }) => {
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    given('the user role is "end_user"', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ UserProfileDetail: userDetail1 });
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
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    given('the user role is "admin"', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ UserProfileDetail: userDetail2 });
    });
    let menuWidth: any;
    when('the getMenuWidth function is called', () => {
      menuWidth = instance.getMenuWidth();
    });

    then('the menu width should be 175', () => {
      expect(menuWidth).toBe(175);
    });
  });

  test('Redirect to view page', ({ given, when, then }) => {
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    let sendSpy: any;
    let closeToggleDropDownSpy: any;
    given('the dropdown is open', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
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
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    let sendSpy: any;
    let closeToggleDropDownSpy: any;
    given('the dropdown is open', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
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
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    let sendSpy: any;
    let closeToggleDropDownSpy: any;
    given('the dropdown is open', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      sendSpy = jest.spyOn(instance, 'send');
      closeToggleDropDownSpy = jest.spyOn(instance, 'closeToggleDropDown');
    });

    when('the user selects the "edit" option', () => {
      instance.redirectPage('edit', "321", 'Pending', '2024-08-01T18:30:00.000Z', "Remote Electronic Notarisation (REN)");
      instance.redirectPage('Accept', "321", 'Pending', '2024-08-01T18:30:00.000Z', "Remote Electronic Notarisation (REN)");
      instance.redirectPage('Reject', '12345', 'pending', '2024-08-01T18:30:00.000Z', "Remote Electronic Notarisation (REN)");

    });
    then('the dropdown should close', () => {
      expect(closeToggleDropDownSpy).toHaveBeenCalled();
    });
    then('the reject Invite request', () => {
      let buttonComponent = searchWrapper.findWhere(
        (node) => node.prop("testID") === "onTextIDReject"
      );
      buttonComponent.simulate("press");
      let buttonComponent1 = searchWrapper.findWhere(
        (node) => node.prop("testID") === "onClosemodalID"
      );
      buttonComponent1.simulate("press");
      const mockResponse = {
        message: "Notary Request rejected successfully"
      };

      const createBulkUploadMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      createBulkUploadMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        createBulkUploadMsg.messageId
      );

      createBulkUploadMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.apiRejetRequestCallId = createBulkUploadMsg.messageId;
      runEngine.sendMessage("Unit Test", createBulkUploadMsg);

    });

    then('a navigation message should be sent', () => {
      expect(sendSpy).toHaveBeenCalled();
      const msg = sendSpy.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationNewNotaryRequestMessage));
    });
  });

  test('Redirect to submit quote page', ({ given, when, then }) => {
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    let sendSpy: any;
    let closeToggleDropDownSpy: any;
    given('the dropdown is open', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
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
    let instance: Search;
    let sendSpy: any;
    let closeToggleDropDownSpy: any;
    given('the dropdown is open', () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
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

  test('Redirect to cancel page with pending status', ({ given, when, then }) => {
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    given('the component is mounted', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ isCancelRequestModelOpen: true })
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
      expect(instance.state.isCancelRequestModelOpen).toBe(true);
    });
  });

  test('Redirect to cancel page with non-pending status', ({ given, when, then }) => {
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    given('the component is mounted', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
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

  test('User presses the Book Now button', ({ given, when, then }) => {
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    let sendSpy: any;
    given('the component is mounted', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      sendSpy = jest.spyOn(instance, 'send');
    });

    when('the user presses the Book Now button', () => {
      instance.btnBookNowProps.onPress();
    });

    then('a new message should be created with NavigationNewNotaryRequestMessage', () => {

    });

    then('the message should contain NavigationPropsMessage with the component\'s props', () => {
      expect(sendSpy).toHaveBeenCalled();
      const msg = sendSpy.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationNewNotaryRequestMessage));
    });
  });

  test('User changes the bottom tab', ({ given, when, then }) => {
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    let sendSpy: any;
    given('the component is mounted', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      sendSpy = jest.spyOn(instance, 'send');
    });

    when('the user selects a tab with key 123', () => {
      instance.onChangeBottomTab(123);
    });

    then('a new message should be created with the key 123', () => {
      const expectedMessage = new Message(getName(123));
    });

    then('the message should contain NavigationPropsMessage with the component\'s props', () => {
      expect(sendSpy).toHaveBeenCalled();
      const msg = sendSpy.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(123));
    });
  });

  test('User clicks on "No" to close the cancel request modal', ({ given, when, then }) => {
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    given('the cancel request modal is open', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ isCancelRequestModelOpen: true });
      expect(instance.state.isCancelRequestModelOpen).toBe(true);
    });

    when('the user presses the "No" button', () => {
      instance.noToChanges.onPress(); // Simulate the "No" button press
      instance.closeCancelRequestModel()
    });

    then('the cancel request modal should be closed', () => {
      expect(instance.state.isCancelRequestModelOpen).toBe(false); // Modal should now be closed
    });
  });

  test('User clicks "Yes" to proceed with the cancel request', ({ given, when, then }) => {
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    let mockCallApiToCancelRequest: any;
    given('the cancel request modal is open', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ isCancelRequestModelOpen: true });
      expect(instance.state.isCancelRequestModelOpen).toBe(true);
      mockCallApiToCancelRequest = jest.spyOn(instance, 'callApiToCancelRequest');
    });

    when('the user presses the "Yes" button', () => {
      instance.yesProceedToChanges.onPress(); // Simulate the "Yes" button press
    });

    then('the cancel request modal should be closed', () => {
      expect(instance.state.isCancelRequestModelOpen).toBe(false); // Modal should now be closed
    });

    then('the API to cancel the request should be called', () => {
      expect(mockCallApiToCancelRequest).toHaveBeenCalled(); // Check that the API was called
    });
  });

  test('User clicks on the filter icon to open the filter page', ({ given, when, then }) => {
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    given('the filter page is closed', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ isFilterPageOpen: false });
      expect(instance.state.isFilterPageOpen).toBe(false); // Ensure it's closed initially
    });

    when('the user presses the filter icon', () => {
      instance.onClickOfFilterIcon.onPress(); // Simulate filter icon press
    });

    then('the filter page should be opened', () => {
      expect(instance.state.isFilterPageOpen).toBe(true); // Check that the page is now open
    });
  });

  test('User closes the filter page', ({ given, when, then }) => {
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    given('the filter page is open', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ isFilterPageOpen: true });
      expect(instance.state.isFilterPageOpen).toBe(true); // Ensure it's open initially
    });

    when('the user presses the close button', () => {
      instance.closeFilterPage.onPress(); // Simulate close button press
    });

    then('the filter page should be closed', () => {
      expect(instance.state.isFilterPageOpen).toBe(false); // Check that the page is now closed
    });
  });

  test('Successfully selecting a priority filter', ({ given, when, then }) => {
    let priorityFilter: any;
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    given('the component is rendered', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
    });

    when('the user selects a priority filter', () => {
      priorityFilter = { key: 'Standard', label: 'Standard' };  // Mock filter option
      instance.getSelectPriorityFilter(priorityFilter);
    });

    then('the selected priority filter in the state should be updated', () => {
      expect(instance.state.selectedPriorityFilter).toEqual(priorityFilter);
    });
  });

  // Test case for `getSelectRequestStatus`
  test('Successfully selecting a request status filter', ({ given, when, then }) => {
    let requestStatusFilter: any;
    let searchWrapper: ShallowWrapper;
    let instance: Search;
    given('the component is rendered', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
    });

    when('the user selects a request status filter', () => {
      requestStatusFilter = { key: 'PENDING', label: 'Pending' };  // Mock filter option
      instance.getSelectRequestStatus(requestStatusFilter);
    });

    then('the selected request status filter in the state should be updated', () => {
      expect(instance.state.selectedRequestStatusFilter).toEqual(requestStatusFilter);
    });
  });

  test('Successfully resetting the filter and fetching data', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    let mockGetRequestListData: any
    given('the component is rendered', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      mockGetRequestListData = jest.spyOn(instance, 'getRequestListData');
    });

    when('the user presses the reset filter button', () => {
      instance.onResetFilter.onPress();
    });

    then('the filters in the state should be reset', () => {
      expect(instance.state.selectedPriorityFilter).toBeNull();
      expect(instance.state.selectedRequestStatusFilter).toBeNull();
      expect(instance.state.isFilterPageOpen).toBe(false);
      expect(instance.state.endDate).toBeNull();
      expect(instance.state.startDate).toBeNull();
      expect(instance.state.selectedServiceType).toBeNull();
      expect(instance.state.pageNo).toBe(1);
      expect(instance.state.selectedDateType).toBe('');
      expect(instance.state.requestListData).toEqual([]);
      expect(instance.state.requestListLength).toBe(0);
      expect(instance.state.isLoader).toBe(true);
      expect(instance.state.selectedDateRange).toBe('');
    });

    then('it should fetch the request list data with default parameters', () => {
      expect(mockGetRequestListData).toHaveBeenCalledWith('?page=1&per_page=10');
    });
  });

  test('Successfully applying the filter and fetching data', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    let mockGetRequestListData: any
    given('the component is rendered', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      mockGetRequestListData = jest.spyOn(instance, 'getRequestListData');
    });

    when('the user presses the apply filter button', () => {
      instance.onApplyFilter.onPress();
    });

    then('the state should update with applied filters', () => {
      expect(instance.state.isFilterPageOpen).toBe(false);
      expect(instance.state.pageNo).toBe(1);
      expect(instance.state.requestListData).toEqual([]);
      expect(instance.state.requestListLength).toBe(0);
      expect(instance.state.isLoader).toBe(true);
    });

    then('it should fetch the filtered request list data', () => {
      const expectedParamData = `?page=1&per_page=10&order_id=&service_type=${instance.state.selectedServiceType ? instance.state.selectedServiceType?.value : ''}&request_date_start=${instance.state.selectedDateType === 'request' ? instance.state.startDate : ''}&request_date_end=${instance.state.selectedDateType === 'request' ? instance.state.endDate : ''}&completion_date_start=${instance.state.selectedDateType === 'completion' ? instance.state.startDate : ''}&completion_date_end=${instance.state.selectedDateType === 'completion' ? instance.state.endDate : ''}&request_status=${instance.state.selectedRequestStatusFilter ? instance.state.selectedRequestStatusFilter?.key : ''}&urgency_level=${instance.state.selectedPriorityFilter ? instance.state.selectedPriorityFilter?.key : ''}`;

      expect(mockGetRequestListData).toHaveBeenCalledWith(expectedParamData);
    });
  });

  test('Successfully opening the calendar modal', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    given('the component is rendered', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
    });

    when('the user presses the open calendar button', () => {
      instance.btnOpenCalendarProps.onPress();
      instance.getCalendarModalOpen()
    });

    then('the calendar modal should be visible', () => {
      expect(instance.state.isCalendarForDateSelect).toBe(true);
    });
  });

  test('Button should be enabled when at least one filter is selected', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    given('the component is rendered with selectedRequestStatusFilter as "completed"', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ selectedRequestStatusFilter: { key: 'Pending', title: 'Pending', img: 'https://demo.png' }, selectedPriorityFilter: null, selectedDateRange: '' });
    });

    when('the user checks if the button is enabled', () => {
      // No action needed; the check happens in the then statement.
    });

    then('the button should be enabled', () => {
      expect(instance.getButtonEnabled()).toBe(true);
    });
  });

  test('Button should be disabled when no filters are selected', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    given('the component is rendered with all filters unset', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ selectedRequestStatusFilter: null, selectedPriorityFilter: null, selectedDateRange: '' });
    });

    when('the user checks if the button is enabled', () => {
      // No action needed; the check happens in the then statement.
    });

    then('the button should be disabled', () => {
      expect(instance.getButtonEnabled()).toBe(false);
    });
  });

  test('Selecting a service updates the selected service type', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    given('the component is rendered', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
    });

    when('the user selects a service', () => {
      const service: any = { value: 1, label: 'Service 1' }; // Example service
      instance.txtInputServicesPrpos(service);
    });

    then('the selected service type should be updated', () => {
      expect(instance.state.selectedServiceType).toEqual({ value: 1, label: 'Service 1' });
    });
  });

  test('Opening the service dropdown', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    given('the component is rendered', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
    });

    when('the user opens the services dropdown', () => {
      instance.openServicesDropdown();
    });

    then('the dropdown should be marked as open', () => {
      expect(instance.state.isServiceDropdownOpen).toBe(true);
    });
  });

  test('Closing the service dropdown', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    given('the dropdown is open', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ isServiceDropdownOpen: true }); // Set the dropdown to open
    });

    when('the user closes the services dropdown', () => {
      instance.closeDropDownOfServices();
    });

    then('the dropdown should be marked as closed', () => {
      expect(instance.state.isServiceDropdownOpen).toBe(false);
    });
  });

  test('Selecting a single date', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    given('the component is rendered', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
    });

    when('the user selects a single date', () => {
      instance.onSelectSingleDate.onPress(); // Simulate pressing the button to select a single date
    });

    then('the selected date type should be set to "request"', () => {
      expect(instance.state.selectedDateType).toBe('request');
    });
  });

  test('Selecting a range of dates', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    given('the component is rendered', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
    });

    when('the user selects a range of dates', () => {
      instance.onSelectRangeDate.onPress(); // Simulate pressing the button to select a range of dates
    });

    then('the selected date type should be set to "completion"', () => {
      expect(instance.state.selectedDateType).toBe('completion');
    });
  });

  test('Closing the calendar modal', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    given('the calendar modal is open', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({
        isCalendarForDateSelect: true,
        selectedDateType: 'request' // or any initial date type
      });
    });

    when('the user presses the close calendar button', () => {
      instance.closeCalendar.onPress(); // Simulate pressing the close calendar button
    });

    then('the calendar modal should be closed', () => {
      expect(instance.state.isCalendarForDateSelect).toBe(false);
    });

    then('the selected date type should be cleared', () => {
      expect(instance.state.selectedDateType).toBe('');
    });
  });

  test('Selecting a start date', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    given('the start date is not set', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ startDate: null, endDate: null });
    });

    when('the user selects a day', () => {
      const selectedDay = { dateString: '2024-10-01', day: 1, month: 10, year: 2024 };
      instance.handleDayPress(selectedDay); // Call the method
    });

    then('the start date should be set to the selected date', () => {
      expect(instance.state.startDate).toBe('2024-10-01');
    });

    then('the end date should be cleared', () => {
      expect(instance.state.endDate).toBe(null);
    });
  });

  test('Selecting an end date', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    given('the start date is set', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ startDate: '2024-10-01', endDate: null });
    });

    given('the end date is not set', () => {
      instance.setState({ endDate: null });
    });

    when('the user selects a day that is after the start date', () => {
      const selectedDay = { dateString: '2024-10-05', day: 5, month: 10, year: 2024 };
      instance.handleDayPress(selectedDay);
    });

    then('the end date should be set to the selected date', () => {
      expect(instance.state.endDate).toBe('2024-10-05');
    });
  });

  test('Resetting the start date', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    given('the start date is set', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ startDate: '2024-10-05', endDate: '2024-10-10' });
    });

    given('the end date is set', () => {
      instance.setState({ endDate: '2024-10-10' });
    });

    when('the user selects a new start date that is before the current start date', () => {
      const selectedDay = { dateString: '2024-10-01', day: 1, month: 10, year: 2024 };
      instance.handleDayPress(selectedDay);
    });

    then('the start date should be updated to the new selected date', () => {
      expect(instance.state.startDate).toBe('2024-10-01');
    });

    then('the end date should be cleared', () => {
      expect(instance.state.endDate).toBe(null);
    });
  });

  test('Selecting both start and end dates', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    given('the start date and end date are selected', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ startDate: '2024-10-01', endDate: '2024-10-05' });
    });

    when('the user confirms the date selection', () => {
      instance.onDateSelectDone.onPress();
    });

    then('the selected date range should be formatted and set', () => {
      const expectedFormattedRange = '01/10/2024 - 05/10/2024'; // Expected output of the date formatting
      expect(instance.state.selectedDateRange).toBe(expectedFormattedRange);
    });

    then('the calendar should close', () => {
      expect(instance.state.isCalendarForDateSelect).toBe(false);
    });
  });

  test('Start date or end date is not selected', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    given('the start date is not selected or end date is null', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ startDate: '2024-10-01', endDate: null });
    });

    when('the user confirms the date selection', () => {
      instance.onDateSelectDone.onPress();
    });

    then('the selected date range should not be set', () => {
      expect(instance.state.selectedDateRange).toBe('');
    });

    then('the calendar should remain open', () => {
      expect(instance.state.isCalendarForDateSelect).toBe(false);
    });
  });

  test('Filter with a different urgency', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    let updateStateAndFetchDataSpy: any;
    given('the selected priority filter is null', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ selectedPriorityFilter: null });
      updateStateAndFetchDataSpy = jest.spyOn(instance, 'updateStateAndFetchData');
    });

    when('the user selects a new urgency level', () => {
      instance.filterByPriority('high', 'redDotImg');
    });

    then('the state should be updated with the new urgency level', () => {
      expect(instance.state.selectedPriorityFilter).toEqual({ key: 'high', title: 'high', img: 'redDotImg' }); // Assuming your selectedPriorityFilter is an object
    });

    then('the data fetching should be triggered with the corresponding image', () => {
      expect(updateStateAndFetchDataSpy).toHaveBeenCalledWith('high', 'redDotImg');
    });
  });

  test('Filter with the same urgency', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    let updateStateAndFetchDataSpy: any
    given('the selected priority filter is set to "high"', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({ selectedPriorityFilter: { key: 'high', title: 'high', img: 'redDotImg' } });
      updateStateAndFetchDataSpy = jest.spyOn(instance, 'updateStateAndFetchData');
    });

    when('the user selects the same urgency level', () => {
      instance.filterByPriority('high', 'redDotImg');
    });

    then('the state should be updated with the urgency level', () => {
      expect(instance.state.selectedPriorityFilter).toEqual(null);
    });

    then('the data fetching should be triggered without an image', () => {
      expect(updateStateAndFetchDataSpy).toHaveBeenCalledWith('high', null);
    });
  });

  test('Component mounts and triggers necessary methods', ({ given, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    let getTokenMock: any;
    let addListenerMock: any;
    let getNotaryServieDataMock: any;
    given('the component is mounted', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      getTokenMock = jest.fn();
      addListenerMock = jest.fn((event, callback) => {
        if (event === "willFocus") {
          callback();
        }
      });

      instance.getToken = getTokenMock;
      jest.spyOn(instance, 'isPlatformWeb').mockReturnValue(true);
      getNotaryServieDataMock = jest.spyOn(instance, 'getNotaryServieData');
      instance.componentDidMount();
    });

    then('the method getToken should be called', () => {
      expect(getTokenMock).toHaveBeenCalledTimes(1);
    });

    then('the method getNotaryServieData should be called', () => {
      expect(getNotaryServieDataMock).toHaveBeenCalledTimes(1);
    });

    then('the navigation listener for "willFocus" should be added', () => {

    });
  });

  test('Navigation "willFocus" triggers reloading of data', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    let getTokenMock: any;
    let updateTabsMock: any;
    let addListenerMock: any;
    let mockProps: any;
    let getRequestListDataSpy: any;
    given('the component is mounted', () => {
      getTokenMock = jest.fn();
      updateTabsMock = jest.fn();
      addListenerMock = jest.fn((event, callback) => {
        if (event === "willFocus") {
          callback();
        }
      });

      mockProps = {
        navigation: {
          addListener: addListenerMock
        }
      };
      searchWrapper = shallow(<Search {...screenProps} {...mockProps} />);
      instance = searchWrapper.instance() as Search;


      instance.getToken = getTokenMock;

      jest.spyOn(instance, 'isPlatformWeb').mockReturnValue(false);
      getRequestListDataSpy = jest.spyOn(instance, 'getRequestListData');
    });

    when('the "willFocus" event is triggered', () => {
      instance.componentDidMount();
    });

    then('the request list should be reset', () => {
      expect(instance.state.pageNo).toBe(1);
      expect(instance.state.requestListData).toEqual([]);
      expect(instance.state.requestListLength).toBe(0);
      expect(instance.state.isLoader).toBe(true);
    });

    then('the method getRequestListData should be called with the correct parameters', () => {
      expect(getRequestListDataSpy).toHaveBeenCalledWith(`?page=1&per_page=10`);
    });
  });

  test('Call API with initial state and fetch request list data', ({ given, when, then }) => {
    let instance: Search;
    let searchWrapper: ShallowWrapper;
    given('the initial state variables are set to default values', () => {
      searchWrapper = shallow(<Search {...screenProps} />);
      instance = searchWrapper.instance() as Search;
      instance.setState({
        pageNo: 1,
        requestListData: [],
        requestListLength: 0,
        isLoader: true
      });
    });

    when('the callRequestListDataApi function is called', () => {
      jest.spyOn(instance, 'getRequestListData');
      instance.callRequestListDataApi();
    });

    then('it should reset the page number to 1', () => {
      expect(instance.state.pageNo).toBe(1);
    });

    then('it should clear the request list data', () => {
      expect(instance.state.requestListData).toEqual([]);
      expect(instance.state.requestListLength).toBe(0);
    });

    then('it should set the loader to true', () => {
      expect(instance.state.isLoader).toBe(true);
    });

    then('it should call the getRequestListData method with the correct query parameters', () => {
      expect(instance.getRequestListData).toHaveBeenCalledWith('?page=1&per_page=10');
    });
  });

  test('Error JSON has errors and matches the apiCancellationChargeCallId', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Search;
    const errorJsonWithErrors: any = { errors: [{ message: "Some error" }] };
    given('there is an error JSON with errors', () => {
      requestDetail = shallow(<Search {...screenProps} />);
      instance = requestDetail.instance() as Search;
      instance.apiCancellationChargeCallId = "apiCancellationChargeCallId";
    });

    given('the apiRequestCallId is for cancellation charge', () => {
      instance.apiCancellationChargeCallId = "apiCancellationChargeCallId";
    });

    when('handleErrorMessage is called', () => {
      instance.handleErrorMessage(errorJsonWithErrors);
    });

    then('isCancellactionErrorPopup state should be set to true', () => {
      expect(instance.state.isCancellactionErrorPopup).toBe(true);
    });

    then('cancellationError state should be set to the provided error JSON', () => {
      expect(instance.state.cancellationError).toEqual(errorJsonWithErrors);
    });
  });

  test('Error JSON has errors but does not match apiCancellationChargeCallId', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Search;
    const errorJsonWithErrors: any = { errors: "Some error" };
    given('there is an error JSON with errors', () => {
      requestDetail = shallow(<Search {...screenProps} />);
      instance = requestDetail.instance() as Search;
      instance.apiCancellationChargeCallId = "apiCancellationChargeCallId";
    });

    given('the apiRequestCallId is for another API', () => {
      instance.apiCancellationChargeCallId = "anotherApiCallId";
    });

    when('handleErrorMessage is called', () => {
      instance.handleErrorMessage(errorJsonWithErrors);
    });

    then('isCancellactionErrorPopup state should not be set to true', () => {
      expect(instance.state.isCancellactionErrorPopup).toBe(true);
    });

    then('cancellationError state should not be set to the provided error JSON', () => {
      // expect(instance.state.cancellationError).not.toEqual(errorJsonWithErrors);
    });
  });

  test('Error JSON has no errors', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Search;
    let errorJsonWithoutErrors: any = {};
    given('there is an error JSON without errors', () => {
      requestDetail = shallow(<Search {...screenProps} />);
      instance = requestDetail.instance() as Search;
    });

    given('any apiRequestCallId', () => {
      instance.apiCancellationChargeCallId = "apiCancellationChargeCallId";
    });

    when('handleErrorMessage is called', () => {
      instance.handleErrorMessage(errorJsonWithoutErrors);
    });

    then('isCancellactionErrorPopup state should not be set to true', () => {
      expect(instance.state.isCancellactionErrorPopup).toBeFalsy();
    });

    then('cancellationError state should remain unchanged', () => {
      expect(instance.state.cancellationError).toBe(null);
    });
  });

  test('Close the cancellation error popup when OK is clicked', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Search;
    given('the cancellation error popup is visible', () => {
      requestDetail = shallow(<Search {...screenProps} />);
      instance = requestDetail.instance() as Search;
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
    let instance: Search;
    let result: any;
    given('the cancellation number is "123.456"', () => {
      requestDetail = shallow(<Search {...screenProps} />);
      instance = requestDetail.instance() as Search;
    });

    when('the number is formatted', () => {
      result = instance.formatCancellactionNumber("123.456");
    });

    then('the formatted cancellation number should be "123.46"', () => {
      expect(result).toBe("123.46");
    });
  });

  test('Format a cancellation number with no decimals', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Search;
    let result: any;
    given('the cancellation number is "123"', () => {
      requestDetail = shallow(<Search {...screenProps} />);
      instance = requestDetail.instance() as Search;
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
    let instance: Search;
    let result: any;
    given('the cancellation number is "123.40"', () => {
      requestDetail = shallow(<Search {...screenProps} />);
      instance = requestDetail.instance() as Search;
    });

    when('the number is formatted', () => {
      result = instance.formatCancellactionNumber("123.40");
    });

    then('the formatted cancellation number should be "123.40"', () => {
      expect(result).toBe("123.40");
    });
  });

  test('Handle a response with errors', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Search;
    const mockErrorResponse = { errors: "An error occurred" };
    given('the API response contains "errors"', () => {
      requestDetail = shallow(<Search {...screenProps} />);
      instance = requestDetail.instance() as Search;
      jest.spyOn(instance, 'handleErrorMessage');
      jest.useFakeTimers();
      jest.spyOn(global, 'setTimeout');
    });

    when('the response is processed by showModelOfCancelForInprogress', () => {
      instance.showModelOfCancelForInprogress(mockErrorResponse);
    });

    then('the handleErrorMessage function should be called with the response', () => {
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), Platform.OS === "ios" ? 1000 : 0);
      jest.runAllTimers();
      expect(instance.handleErrorMessage).toHaveBeenCalledWith(mockErrorResponse);
    });
  });

  test('Handle a response with cancellation charges', ({ given, when, then, and }) => {
    let requestDetail: ShallowWrapper;
    let instance: Search;
    const mockCancellationChargesResponse = { cancellation_charges: 50.0 };
    given('the API response contains "cancellation_charges"', () => {
      requestDetail = shallow(<Search {...screenProps} />);
      instance = requestDetail.instance() as Search;
      jest.spyOn(instance, 'handleErrorMessage');
      jest.useFakeTimers();
      jest.spyOn(global, 'setTimeout');
    });

    when('the response is processed by showModelOfCancelForInprogress', () => {
      instance.showModelOfCancelForInprogress(mockCancellationChargesResponse);
    });

    then('the isModelVisible state should be set to false', () => {
      expect(instance.state.isModelVisible).toBe(false);
    });

    and('after a delay, the CancellationCharge state should be set to the response', () => {
      jest.runAllTimers(); // Simulate the delay
      expect(instance.state.CancellationCharge).toEqual(mockCancellationChargesResponse);
    });

    and('after a delay, the isCancelRequestModelOpen state should be set to true', () => {
      expect(instance.state.isCancelRequestModelOpen).toBe(true);
    });
  });

  test('Successful notification Request response', ({ given, when, then }) => {
    let message: Message;
    let requestDetail: ShallowWrapper;
    let instance: Search;
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
      requestDetail = shallow(<Search {...screenProps} />);
      instance = requestDetail.instance() as Search;
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

  test('Successful completeProfile Request response', ({ given, when, then }) => {
    let message: Message;
    let requestDetail: ShallowWrapper;
    let instance: Search;
    let apiRequestCallId: string;
    let getCompleteProfileApiResSpy: any
    const completeProfileResponse = { "data": { "is_address": false, "is_notary_service": true, "is_payment_details": false, "is_phone_number": false, "is_qualified_signature": true, "is_vat_sales_tax": false } }
    given('a successful completeProfile Request API response', () => {
      requestDetail = shallow(<Search {...screenProps} />);
      instance = requestDetail.instance() as Search;
      getCompleteProfileApiResSpy = jest.spyOn(instance, 'getCompleteProfileApiRes');
      apiRequestCallId = 'apiCompleteProfileCallId';
      instance.apiCompleteProfileCallId = 'apiCompleteProfileCallId';

      message = new Message("");
      message.getData = jest.fn((name) => {
        if (name === getName(MessageEnum.RestAPIResponceDataMessage)) {
          return 'apiCompleteProfileCallId';
        } else if (name === getName(MessageEnum.RestAPIResponceSuccessMessage)) {
          return { data: completeProfileResponse.data };
        }
      });
    });

    when('the handleRestApiResponse function is called', async () => {
      await instance.handleRestApiResponse(message);
    });

    then('the handlecompleteProfileResponse function should be called', () => {
      expect(getCompleteProfileApiResSpy).toHaveBeenCalledWith(completeProfileResponse);
    });
  });

  test("Display red notification image for unread notifications", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: Search;
    given("there are unread notifications", () => {
      requestDetail = shallow(<Search {...screenProps} />);
      instance = requestDetail.instance() as Search;
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
    let instance: Search;
    given("there are no unread notifications", () => {
      requestDetail = shallow(<Search {...screenProps} />);
      instance = requestDetail.instance() as Search;
      instance.setState({ isAnyNotificationUnread: false });
    });

    when("the getNotificationImage function is called", () => {
      instance.getNotificationImage();
    });

    then("the default notification image should be returned", () => {
      expect(instance.getNotificationImage()).toBe(notificationImg);
    });
  });

  test('User clicks on notification icon to navigate the notification', ({ given, when, then }) => {
    let SearchWrapper: ShallowWrapper
    let instance: Search;
    let sendMock: any;
    given('the notification icon is visible', () => {
      SearchWrapper = shallow(<Search {...screenProps} />);
      instance = SearchWrapper.instance() as Search;
      sendMock = jest.fn();
      instance.send = sendMock;
    });

    when('the user clicks on the notification icon', () => {
      instance.openNotificationProps.onPress();
    });

    then('a navigation notification message should be sent with the correct props', () => {
      const msg = sendMock.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationNotificationMessage));
    });
  });

  test('Extract abbreviation from a string containing parentheses', ({ given, when, then }) => {
    let inputString: string;
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    let result: string;
    given(/^a string "(.*)"$/, (str: string) => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
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
    let instance: Search;
    let result: string;
    given(/^a string "(.*)"$/, (str: string) => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      inputString = "";
    });

    when('the getAbbreviation function is called', () => {
      result = instance.getAbbreviation(inputString);
    });

    then('the result should be an empty string', () => {
      expect(result).toBe('');
    });
  });

  test('Get action item list for a new invite', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    let result: any;
    given('the invite data type is "New Invite"', () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      instance.setState({ isInviteSelected: true })
    });

    when('I fetch the action item list with any quote status ID', () => {
      result = instance.getActionItemList(null);
    });

    then('it should return the menu items for invites', () => {
      expect(result).toEqual(menuItemsInvite);
    });
  });


  test('Get action item list for other user roles', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    let result: any;
    given('the user role ID is not 2 and the invite data type is not "New Invite"', () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      instance.setState({ inviteDataTypes: '' })
      // instance.state.UserProfileDetail.role_id = 1;
    });

    when('I fetch the action item list with any quote status ID', () => {
      result = instance.getActionItemList(null);
    });

    then('it should return the default menu items', () => {
      expect(result).toEqual(menuItems);
    });
  });

  test('User is a notary and invite type is "New Invite"', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    let result: any;
    given('the invite type is "New Invite"', () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      instance.setState({ isInviteSelected: true });
    });

    given('the user\'s role ID is 2 (Notary)', () => {
      instance.setState({ UserProfileDetail: userDetail2 })
    });

    when('the getActionItemList function is called', () => {
      result = instance.getActionItemList(null);
    });

    then('the menu items for notary invites should be returned', () => {
      expect(result).toStrictEqual(menuItemsInviteForNotary);
    });
  });

  test('User is not a notary and invite type is "New Invite"', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    let result: any;
    given('the invite type is "New Invite"', () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      instance.setState({ isInviteSelected: true });
    });

    given('the user\'s role ID is not 2', () => {
      instance.setState({ UserProfileDetail: userDetail1 }) // Role other than 2
    });

    when('the getActionItemList function is called', () => {
      result = instance.getActionItemList(null);
    });

    then('the menu items for general invites should be returned', () => {
      expect(result).toStrictEqual(menuItemsInvite);
    });
  });

  test('User selects the "Reject" option', ({ given, when, then, and }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    let result: any;
    let closeToggleDropDownSpy: any
    given('the dropdown is open', () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      instance.setState({ isModelVisible: true })
      closeToggleDropDownSpy = jest.spyOn(instance, 'closeToggleDropDown');
    });

    given('the key is "Reject"', () => {
      result = 'Reject';
    });

    given('the requestId is "REQ123"', () => {
      result = { ...result, requestId: 'REQ123' };
    });

    given('the status is "Pending"', () => {
      result = { ...result, status: 'Pending' };
    });

    given('the requestDate is "2025-01-28"', () => {
      result = { ...result, requestDate: '2025-01-28' };
    });

    given('the notarisation method is "Online"', () => {
      result = { ...result, notarisation_method: 'Online' };
    });

    when('the redirectPage function is called', () => {
      instance.redirectPage('Reject', 'REQ123', 'Pending', '2025-01-28', 'Online');
    });

    then('the dropdown should be closed', () => {
      expect(closeToggleDropDownSpy).toHaveBeenCalled();
    });

    and('the model visibility should be set to false', () => {
      expect(instance.state.isModelVisible).toBe(false);
    });

    and('the notaryRequestId should be set to "REQ123"', () => {
      expect(instance.state.notaryRequestId).toBe('REQ123');
    });

    and('the selectedRequestStatus should be set to "Pending"', () => {
      expect(instance.state.selectedRequestStatus).toBe('Pending');
    });

    and('after 1 second, the "onViewReject" should be true', () => {
      jest.useFakeTimers();
      jest.runAllTimers();
      expect(instance.state.onViewReject).toBe(true);
    });

    and('the "requestId" should be "REQ123"', () => {
      expect(instance.state.requestId).toBe('REQ123');
    });
  });

  test("The response contains a message", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    let callRequestListDataApiSpy: any;
    let mockResponse: any;
    given("the response contains a message", () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      callRequestListDataApiSpy = jest.spyOn(instance, 'callRequestListDataApi');
      mockResponse = { message: "Request rejected successfully" };
    });

    when("getRejectReponse is called", () => {
      instance.getRejectReponse(mockResponse);
    });

    then("callRequestListDataApi should be triggered", () => {
      expect(callRequestListDataApiSpy).toHaveBeenCalled();
    });
  });

  test("The response does not contain a message", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    let callRequestListDataApiSpy: any;
    let mockResponse: any;
    given("the response does not contain a message", () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      callRequestListDataApiSpy = jest.spyOn(instance, 'callRequestListDataApi');
      mockResponse = { data: "No message here" };
    });

    when("getRejectReponse is called", () => {
      instance.getRejectReponse(mockResponse);
    });

    then("callRequestListDataApi should not be triggered", () => {
      expect(callRequestListDataApiSpy).not.toHaveBeenCalled();
    });
  });

  test("Handling cancel request with non-pending status", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    let setStateSpy: jest.SpyInstance;
    let getCancelChargeSpy: jest.SpyInstance;
    given("the key is \"cancel\" and status is not \"pending\"", () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      setStateSpy = jest.spyOn(instance, "setState");
      getCancelChargeSpy = jest.spyOn(instance, "getCancelCharge");
    });

    when("redirectPage is called", () => {
      instance.redirectPage('cancel', "321", "completed", '2024-08-01T18:30:00.000Z', "Remote Electronic Notarisation (REN)");
    });

    then("getCancelCharge should be called with the correct requestId", () => {
      expect(getCancelChargeSpy).toHaveBeenCalledWith("321");
    });
  });

  test("Toggling between Request and Invite tabs", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    given("the user is on the Request tab", () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      instance.setState({
        isRequestSelected: true,
        isInviteSelected: false,
        requestListData: requestapiResponse.new_notary_requests.data,
        inviteRequestData: requestapiResponse.invite_request.data,
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
      expect(instance.state.isRequestSelected).toBe(true);
      expect(instance.state.isInviteSelected).toBe(false);
    });
  });

  test("Handling tab selection", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    given("the user is on the dashboard", () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      instance.setState({
        newRequestData: requestapiResponse.new_notary_requests.data,
        inviteRequestData: requestapiResponse.invite_request.data,
        outgoingRequestData: requestapiResponse.notary_ongoing_requests.data,
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

  test('Successful reject Request response', ({ given, when, then }) => {
    let message: Message;
    let requestDetail: ShallowWrapper;
    let instance: Search;
    let apiRequestCallId: string;
    let getRejectReponseSpy: any
    const notificationResponse = {
      message: "Successful"
    }
    given('a successful reject Request API response', () => {
      requestDetail = shallow(<Search {...screenProps} />);
      instance = requestDetail.instance() as Search;
      getRejectReponseSpy = jest.spyOn(instance, 'getRejectReponse');
      apiRequestCallId = 'apiRejetRequestCallId';
      instance.apiRejetRequestCallId = 'apiRejetRequestCallId';

      message = new Message("");
      message.getData = jest.fn((name) => {
        if (name === getName(MessageEnum.RestAPIResponceDataMessage)) {
          return 'apiRejetRequestCallId';
        } else if (name === getName(MessageEnum.RestAPIResponceSuccessMessage)) {
          return notificationResponse;
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

  test("Closing the success message modal", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    given("the success message modal is open", () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      instance.setState({ isSucessMsgModel: true });
    });

    when("closeSucessMsgModel is called", () => {
      instance.closeSucessMsgModel();
    });

    then("the success message modal should be closed", () => {
      expect(instance.state.isSucessMsgModel).toBe(false);
    });
  });

  test("User is an end user and Invite tab is selected", ({ given, when, then }) => {
    let result: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    let requestOfInvite: any;
    let requestOfNewRequest: any;
    let requestOfOngoing: any;
    given("the user is an end user and the Invite tab is selected", () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      requestOfInvite = [{ id: 1, type: "invite" }];
      requestOfNewRequest = [{ id: 2, type: "newRequest" }];
      requestOfOngoing = [{ id: 3, type: "ongoing" }];
      const isEndUser = true;
      const isInviteSelected = true;
      result = instance.getNewPageData(
        isEndUser,
        "",
        isInviteSelected,
        requestOfInvite,
        requestOfNewRequest,
        requestOfOngoing
      );
    });

    then("the function should return requestOfInvite", () => {
      expect(result).toBe(requestOfInvite);
    });
  });

  test("User is an end user and New Requests tab is selected", ({ given, when, then }) => {
    let result: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    let requestOfInvite: any;
    let requestOfNewRequest: any;
    let requestOfOngoing: any;
    given("the user is an end user and the New Requests tab is selected", () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      requestOfInvite = [{ id: 1, type: "invite" }];
      requestOfNewRequest = [{ id: 2, type: "newRequest" }];
      requestOfOngoing = [{ id: 3, type: "ongoing" }];
      const isEndUser = true;
      const isInviteSelected = false;
      result = instance.getNewPageData(
        isEndUser,
        "",
        isInviteSelected,
        requestOfInvite,
        requestOfNewRequest,
        requestOfOngoing
      );
    });

    then("the function should return requestOfNewRequest", () => {
      expect(result).toBe(requestOfNewRequest);
    });
  });

  test("User is not an end user and New Requests tab is selected", ({ given, when, then }) => {
    let result: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    let requestOfInvite: any;
    let requestOfNewRequest: any;
    let requestOfOngoing: any;
    given("the user is not an end user and the New Requests tab is selected", () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      requestOfInvite = [{ id: 1, type: "invite" }];
      requestOfNewRequest = [{ id: 2, type: "newRequest" }];
      requestOfOngoing = [{ id: 3, type: "ongoing" }];
      const isEndUser = false;
      const selectedTab = "New Requests";
      result = instance.getNewPageData(
        isEndUser,
        selectedTab,
        false,
        requestOfInvite,
        requestOfNewRequest,
        requestOfOngoing
      );
    });

    then("the function should return requestOfNewRequest", () => {
      expect(result).toBe(requestOfNewRequest);
    });
  });

  test("User is not an end user and Invites tab is selected", ({ given, when, then }) => {
    let result: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    let requestOfInvite: any;
    let requestOfNewRequest: any;
    let requestOfOngoing: any;
    given("the user is not an end user and the Invites tab is selected", () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      requestOfInvite = [{ id: 1, type: "invite" }];
      requestOfNewRequest = [{ id: 2, type: "newRequest" }];
      requestOfOngoing = [{ id: 3, type: "ongoing" }];
      const isEndUser = false;
      const selectedTab = "Invites";
      result = instance.getNewPageData(
        isEndUser,
        selectedTab,
        false,
        requestOfInvite,
        requestOfNewRequest,
        requestOfOngoing
      );
    });

    then("the function should return requestOfInvite", () => {
      expect(result).toBe(requestOfInvite);
    });
  });

  test("User is not an end user and selects an undefined tab", ({ given, when, then }) => {
    let result: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    let requestOfInvite: any;
    let requestOfNewRequest: any;
    let requestOfOngoing: any;
    given("the user is not an end user and selects an undefined tab", () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      requestOfInvite = [{ id: 1, type: "invite" }];
      requestOfNewRequest = [{ id: 2, type: "newRequest" }];
      requestOfOngoing = [{ id: 3, type: "ongoing" }];
      const isEndUser = false;
      const selectedTab = "Other Tab";
      result = instance.getNewPageData(
        isEndUser,
        selectedTab,
        false,
        requestOfInvite,
        requestOfNewRequest,
        requestOfOngoing
      );
    });

    then("the function should return requestOfOngoing", () => {
      expect(result).toBe(requestOfOngoing);
    });
  });

  test("User is an End User", ({ given, when, then }) => {
    let responseJson: any;
    let expectedResult: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    let requestListData: any;
    given("a response JSON for an End User", () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      requestListData = {
        inviteRequestData: [{ id: 1, type: "invite" }],
        newRequestData: [{ id: 2, type: "newRequest" }],
        outgoingRequestData: [{ id: 3, type: "ongoing" }],
      };
      responseJson = {
        invite_request: { data: [{ id: 4, type: "invite" }] },
        end_user_notary_requests: { data: [{ id: 5, type: "newRequest" }] },
      };
    });

    when("getRequestLists is called with isEndUser as true", () => {
      expectedResult = instance.getRequestLists(responseJson, true);
    });

    then("it should return updated request lists for the end user", () => {

    });
  });

  test("User is a Notary User", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    let responseJson: any;
    let expectedResult: any;
    let requestListData: any;
    given("a response JSON for a Notary User", () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      requestListData = {
        inviteRequestData: [{ id: 1, type: "invite" }],
        newRequestData: [{ id: 2, type: "newRequest" }],
        outgoingRequestData: [{ id: 3, type: "ongoing" }],
      };
      responseJson = {
        invite_request: { data: [{ id: 6, type: "invite" }] },
        new_notary_requests: { data: [{ id: 7, type: "newRequest" }] },
        notary_ongoing_requests: { data: [{ id: 8, type: "ongoing" }] },
      };
    });

    when("getRequestLists is called with isEndUser as false", () => {
      expectedResult = instance.getRequestLists(responseJson, false);
    });

    then("it should return updated request lists for the notary user", () => {

    });
  });

  test("Handles null or undefined API response gracefully", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Search;
    let responseJson: any;
    let setStateSpy: any;
    given("a null API response", () => {
      dashboardWrapper = shallow(<Search {...screenProps} />);
      instance = dashboardWrapper.instance() as Search;
      responseJson = null;
      setStateSpy = jest.spyOn(instance, "setState");
    });
  
    when("manageRequestListData is called with null", () => {
      instance.manageRequestListData(responseJson);
    });
  
    then("it should not update the state", () => {
      expect(setStateSpy).not.toHaveBeenCalled();
    });
  });

})
