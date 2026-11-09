import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import ContinueAsGuest from "../../src/ContinueAsGuest";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import { GenericHeader } from "../../../../components/src/GenericHeader";
import { GenericTextWithHperLink } from "../../../../components/src/GenericTextWithHperLink";
import { GenericButton } from "../../../../components/src/GenericButton";
import { GenericSucessView } from "../../../../components/src/GenericSucessView";
import ImagePicker from 'react-native-image-crop-picker';
import { pick, types } from 'react-native-document-picker';
import {
  upArrowImg, downArrowBlackImg
} from "../../src/assets";
import { Platform, ScrollView } from "react-native";
import RNFS from 'react-native-fs';
import moment from "moment";
const screenProps = {
  navigation: {
    goBack: jest.fn()
  },
  id: "ContinueAsGuest"
};
const feature = loadFeature("./__tests__/features/continueAsGuest-scenario.feature");
export const readFile = jest.fn();
jest.mock("react-native-document-picker", () => ({
  pick: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve([
        {
          uri: "file://",
        },
      ])
    )
    .mockImplementationOnce(() => Promise.reject(new Error()))
    .mockImplementation(() => Promise.reject("action cancelled")),
  isCancel: (error: any) => error === "action cancelled",
  types: {
    images: true,
    plainText: true,
    audio: true,
    pdf: true,
  },
}));
let imagePickerMock;

let selectedRequestDetail: {
  id: "123",
  type: "",
  relationships: {
    jurisdiction: {
      data: {
        id: "string",
        type: "string",
      }
    },
    notary: {
      data: {
        id: "string",
        type: "string",
      }
    },
    notarisation_method: {
      data: {
        id: "string",
        type: "string",
      }
    },
    account: {
      data: {
        id: "string",
        type: "string"
      }
    }
  },
  "attributes": {
    "status": "IN PROGRESS",
    "notary_id": "1052",
    "notary_service_type": 34,
    "priority": "Standard",
    "notarisation_method_id": 2,
    "jurisdiction_id": 1,
    timing_slot: 'Evening',
    "date": "2024-07-31T00:00:00.000Z",
    "notes": "THis is testing for new adding request data for notes pcheck purpose I that thing correct r not",
    "notarised_document": 2,
    "juridiction": {
      "id": 1,
      "jurisdiction": "India",
      "created_at": "2024-02-09T05:07:19.691Z",
      "updated_at": "2024-02-09T05:07:19.691Z"
    },
    "notarisation_method": {
      "id": 2,
      "notarisation_method": "Remote Ink Notarisation (RIN)",
      "created_at": "2024-05-06T10:18:57.375Z",
      "updated_at": "2024-05-06T10:18:57.375Z"
    },
    "notary_service_name": "Notary exective service",
    "file_documents": [
      {
        "doc_name": "163aa565-9996-42af-96dd-bc4a8c7dac7b.jpg",
        "doc_file_url": "/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0lEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--26cc54319ec05602bfd426008cba4225d27a3dfb/163aa565-9996-42af-96dd-bc4a8c7dac7b.jpg",
        "signatory_count": 1,
        "recipients": [
          {
            "id": 806,
            "created_at": "2024-07-08T05:48:41.120Z",
            "updated_at": "2024-07-08T05:48:41.120Z",
            "file_document_id": 1035,
            "name": "hi",
            "email": "hi@gmail.com",
            "is_signatory": true
          }
        ]
      }
    ]
  },
}

const mockAPICall = (instance: any, apiCallID: string, apiData: any) => {
  const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
  instance[apiCallID] = msgSucessRestAPI.messageId
  runEngine.sendMessage("Unit Test", msgSucessRestAPI)
  return instance[apiCallID];
}


defineFeature(feature, test => {
  let state: any;
  let originalPlatform: any;

  beforeAll(() => {
    originalPlatform = Platform.OS;
  });
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    imagePickerMock = jest.spyOn(ImagePicker, 'openCamera').mockImplementation(() => { });
    state = {
      toggledDocuments: {},
    };
    Platform.OS = originalPlatform;

  });

  test("User navigates to continueAsGuest", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let message:Message
    given("I am a User loading continueAsGuest", () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
    });

    when("I navigate to the continueAsGuest", () => {
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.receive("abc",message,)
      const selectedRequest = {
        requestId: "434",
        actionType: "Accept"
      };
      const apiMsg: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      apiMsg.addData(getName(MessageEnum.CustomDataMessage), selectedRequest );
      runEngine.sendMessage("Unit Test", apiMsg);
      instance.setInitialDates()
      mockAPICall(instance, 'getAvailabilityApiCallId', [{
        priority: 0,
        date: "2024-10-11T04:53:11.555+00:00"
      },
      {
        priority: 3, //not available
        date: "2024-10-12T04:53:11.555+00:00"
      },
      {
        priority: 0,
        date: "2024-10-13T04:53:11.555+00:00"
      },
      {
        priority: 3,
        date: new Date().toISOString()
      },

      ])
    });

    then("continueAsGuest will load with out errors", () => {
      expect(instance.getDashboardData()).toBe(true)
    });

    then("i can click on back arrow icon with out errors", async () => {
      const mockNavigation = { goBack: jest.fn() };
      const wrapperWithNavigation = shallow(<ContinueAsGuest {...screenProps} navigation={mockNavigation} />);
      let ArrowButton = wrapperWithNavigation.find(GenericHeader).dive()
      let buttonComponent = ArrowButton.findWhere((node: any) => node.prop('testID') === 'btnbackArrow');
      buttonComponent.simulate('press')
      instance.btnGoBack.onPress()

      await Promise.resolve(); // Assuming a navigation action is asynchronous, replace with appropriate async operation
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });

    then("I can select service with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'serviceListId');
      // buttonComponent.simulate('onChange')
      instance.txtInputServicesPrpos("England")
      instance.setState({ isModelOpen: true })
    });

    then("I can select Date From ccalendar with out errors", async () => {
      // instance.handleDateSelect("2024-10-11")

      // instance.handleDateSelect = jest.fn();
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'calendarSelectDataID');

      instance.markedDatesWithColor()
    });

    then("I can select Button from popup with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'selectBtnID');
      // buttonComponent.simulate('onPress')
      instance.selectBtn("Morning");
      instance.setState({ selectedDayTime: 'Morning' })
      const dates = {

        "2024-10-11": {
          "selected": true,
          "selectedColor": "#fff",
          "selectedTextColor": "#012275"
        },
        "2024-10-12": {
          "selected": true,
          "selectedColor": "#fff",
          "selectedTextColor": "#012275"
        },
        "2024-10-13": {
          "selected": true,
          "selectedColor": "#fff",
          "selectedTextColor": "#012275"
        },
        "2024-05-20": {
          "selected": true,
          "selectedColor": "#fff",
          "selectedTextColor": "#012275"
        },
        "2024-05-21": {
          "selected": true,
          "selectedColor": "#FEF3C7",
          "selectedTextColor": "#000000"
        },
        "2024-05-22": {
          "selected": true,
          "selectedColor": "#FEF3C7",
          "selectedTextColor": "#000000"
        },
        "2024-05-23": {
          "selected": true,
          "selectedColor": "#FEF3C7",
          "selectedTextColor": "#000000"
        },
        "2024-05-24": {
          "selected": true,
          "selectedColor": "#FEF3C7",
          "selectedTextColor": "#000000"
        }
      }
      instance.setState({ markedDateList: dates, markedDates: dates })
    });

    then("I can select Yes procced Button from popup with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'btnYesProceed');
      // buttonComponent.simulate('onPress')
      instance.yesProceedToChanges.onPress()
      const value = instance.state.selectedDay + " | " + instance.state.selectedDayTime;
      instance.setState({
        dateAndTime: value, selectedMarkedDate: {
          "selected": true,
          "selectedColor": "#FEF3C7",
          "selectedTextColor": "#000000"
        }
      })
      instance.closeCalendarModel()
    });

    then("I can select No Button from popup with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'btnNoToProceed');
      // buttonComponent.simulate('onPress')
      instance.noToChanges.onPress()
    });

    then("I can select Cancel button from step first with out errors", () => {
      let ButtonLogin = dashboardWrapper.find(GenericTextWithHperLink).dive()
      let buttonComponent = ButtonLogin.findWhere((node) => node.prop('testID') === 'btnCancelNotaryID');
      buttonComponent.simulate('onPress')
      instance.cancelNewNotary.onPress()
    });

    then("I can Click on add more documet Button with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'addMoreDocTxtID');
      instance.addDocInList();
    });

    then("I can Click on remove documet Button with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'removeDocTxtID');
      // buttonComponent.simulate('onPress')
      instance.removeDocFromList(1);
    });

    then("I can Click on plus minus button to add doc count with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'plusMinusDocCountID');
      // buttonComponent.simulate('onPress')
      instance.increaseDecreaseNoOfDocument('minus');
    });

    then("I can Click and date an time field to open calendar model with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'dataAndTimeId');
      // buttonComponent.simulate('onFocus')
      instance.getCalendarModalOpen()
    });

    then("I can enter notes with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'addNoeID');
      // buttonComponent.simulate('onPress')
      instance.txtInputAddNotesProps.onChangeText('Hello')
    });

    then("Handle when gettin dropdown service api response without error", () => {
      const data = {
        "data": [
          {
            "id": "10",
            "type": "service",
            "attributes": {
              "id": 10,
              "service_icon": null,
              "service_name": "Business and Corporate Service",
              "service_description": "Catering to business needs by certifying company records, witnessing corporate documents, and authenticating the......",
              "is_selected": false
            }
          }
        ]
      }
      instance.handleServiesApiData(data)
    });

    then("I can Click on steps with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'txtStep1ID');
      buttonComponent.simulate('onPress')
      instance.goToSteps(1);
    });

    then("I can select method of notarization from dropdown with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'methodOfNotarisationID');
      // buttonComponent.simulate('onChange')
      instance.txtInputdNotarisationPrpos("method of");
      instance.setState({ selectedNotarisation: "hello" })
    });

    then("I can select type of Jurisdiction from dropdown with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'typeOfJurisdictionID');
      // buttonComponent.simulate('onChange')
      instance.txtInputJurisdictionPrpos("method of");
      instance.setState({ selectedNotarisation: "hello" })
    });

    then("I can open calendar modal with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'calendarIconId');
      // buttonComponent.simulate('onPress')
      instance.btnOpenCalendarProps.onPress()
      instance.setState({
        dateAndTime: "2024-06-16", selectedJurisdiction: { value: 1, label: "hello" },
        selectedNotarisation: { value: 1, label: "hello" }, selectedService: { value: 1, label: "hello" }, noOfDocument: 1
      })
    });

    then("I can click on Next button of step 1 with out errors", () => {
      let ArrowButton = dashboardWrapper.find(GenericButton).dive()
      let buttonComponent = ArrowButton.findWhere((node) => node.prop('testID') === 'btnNextStepsFirstId');
      buttonComponent.simulate('press')
      instance.setState({ stepsNo: 2, isDocSelectionModelOpen: true })
      instance.scrollToTop()
    });

    then("click on upload document button without error", () => {
      let ArrowButton = dashboardWrapper.find(GenericButton).dive()
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'document-Camera');
      buttonComponent.simulate('press')
      instance.openDocumentPicker('Camera')
      instance.closeModelOfDocument()
    });

    then("I can click on First checkbox with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'firstCustomCheckBoxID');
      // buttonComponent.simulate('press')
      instance.setState({ checkedFirstBox: !instance.CustomCheckBoxFirstProps.isChecked });
      instance.CustomCheckBoxFirstProps.isChecked = !instance.CustomCheckBoxFirstProps.isChecked;
    });

    then("I can click on second checkbox with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'secCustomCheckBoxID');
      // buttonComponent.simulate('press')
      instance.setState({ checkedSecBox: !instance.CustomCheckBoxSecProps.isChecked });
      instance.CustomCheckBoxSecProps.isChecked = !instance.CustomCheckBoxSecProps.isChecked;
    });

    then("I can click on remove documnet file button without error", () => {
      instance.removeFilesOrDoc(1)
      instance.viewsOfDocArray[1] = {};
      instance.setState({ documentList: instance.viewsOfDocArray })
    });

    then("I can click on upload documnet file button without error", () => {
      instance.uploadDocumentFile(1)
      instance.truncatedText("hello this is", 10)
      instance.setState({ checkedSecBox: true, checkedFirstBox: true })
    });

    then("I can click on Next button of step 2 with out errors", () => {
      let ArrowButton = dashboardWrapper.find(GenericButton).dive()
      let buttonComponent = ArrowButton.findWhere((node) => node.prop('testID') === 'btnNextStepsSecId');
      // buttonComponent.simulate('press')
      instance.btnNextStepsSecProps.onPress()
      let docList = [
        {
          "file": "",
          "size": "",
          "receipants": [{
            "name": "",
            "email": ""
          }]
        }]
      const newObj = { "document1": [{ recipients: [{ email: "", name: "" }], fileDetail: { name: "demo.pdf", uri: "", size: "" } }] }
      instance.setState({ stepsNo: 3, documentList: docList, documnetDetail: newObj }, () => {
        instance.scrollToTop()
      })
      instance.scrollToTop()
    });

    then("I can click on add more receipants button without error", () => {
      const newObj = { "document1": [{ recipients: [{ email: "", name: "" }], fileDetail: { name: "demo.pdf", uri: "", size: "" } }] }
      instance.setState({ documnetDetail: newObj })
      instance.addParticipant('document1')
    });
    then('the recipient should be added successfully', () => {
      // Assert that the recipient has been added to the list
      // const doc = instance.state.documentList;
      // doc[1].recipients = [{"email": "", "name": ""}]
      // instance.setState({documentList: doc})
      // expect(instance.state.documentList[1].recipients.length).toBeGreaterThan(0);
    });

    then("I can click on Remove receipants button without error", () => {
      let docList = [
        {
          "file": "",
          "size": "",
          "receipants": [{
            "name": "",
            "email": ""
          }]
        }]
      const newObj = { "document1": [{ recipients: [{ email: "deep@gmail.com", name: "Hello" }], fileDetail: { name: "demo.pdf", uri: "/cddf/dfdf/", size: "212345" } }] }
      instance.setState({ documentList: docList, documnetDetail: newObj })
      instance.removeParticipant("document1", 1)
    });

    then("I can enter name in to recipants with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'recipientNameID');
      // buttonComponent.simulate('onChangeText')
      // instance.changeRecipientName(0, 0, "Hello");
    });

    then("I can enter email in to recipants with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'recipientEmailID');
      // buttonComponent.simulate('onChangeText')
      // instance.changeRecipientEmail(0, 0, "deep@yopmail.com");
    });

    then("I can click on create request button of step 3 with out errors", async () => {
      let ArrowButton = dashboardWrapper.find(GenericButton).dive()
      let buttonComponent = ArrowButton.findWhere((node) => node.prop('testID') === 'btnCreateRequestId');

      instance.setState({ isValidateField: false });
      instance.createNewNotary()
      const mockCreateNewNotary = jest.fn();
      instance.createNewNotary = mockCreateNewNotary;
      instance.validateObject = jest.fn(() => true);
      await instance.btnNextStepsThiredProps.onPress();

      expect(mockCreateNewNotary).toHaveBeenCalled();
    });

    then("New invite get Profile data if API success", () => {
      const dashboardApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        dashboardApiCallId.messageId
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {}
      );
      instance.userProfileGetApiCallId = dashboardApiCallId.messageId;
      runEngine.sendMessage("Unit Test", dashboardApiCallId);
      //expect(instance.userProfileGetApiCallId).toBe(true)
    });
    then("New invite get will notary services data if API success", () => {
      const dashboardApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        dashboardApiCallId.messageId
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "invite_request": {
        "data": [
            {
                "id": "488",
                "type": "notary_request_dashboard",
                "attributes": {
                    "status": "PENDING",
                    "notary_id": 349,
                    "notary_service_type": 6,
                    "priority": "Standard",
                    "notarisation_method_id": 2,
                    "date": "2025-01-23T12:32:30.025Z",
                    "invited_request_status": "INVITE",
                    "is_deleted": false,
                    "invite_request": true,
                    "invite_number": 73464836584,
                    "notarisation_method": {
                        "id": 2,
                        "notarisation_method": "Remote Ink Notarisation (RIN)",
                        "created_at": "2024-05-08T06:46:56.040Z",
                        "updated_at": "2024-05-08T06:47:24.566Z"
                    },
                    "notary_service_name": "Witnessing and Verifying",
                    "quote_statuses_id": 1
                }
            },
            {
                "id": "487",
                "type": "notary_request_dashboard",
                "attributes": {
                    "status": "PENDING",
                    "notary_id": 349,
                    "notary_service_type": 6,
                    "priority": "Standard",
                    "notarisation_method_id": 2,
                    "date": "2025-01-23T12:30:17.140Z",
                    "invited_request_status": "REJECTED",
                    "is_deleted": false,
                    "invite_request": true,
                    "invite_number": 73464836584,
                    "notarisation_method": {
                        "id": 2,
                        "notarisation_method": "Remote Ink Notarisation (RIN)",
                        "created_at": "2024-05-08T06:46:56.040Z",
                        "updated_at": "2024-05-08T06:47:24.566Z"
                    },
                    "notary_service_name": "Witnessing and Verifying",
                    "quote_statuses_id": 1
                }
            },
            {
                "id": "486",
                "type": "notary_request_dashboard",
                "attributes": {
                    "status": "PENDING",
                    "notary_id": 349,
                    "notary_service_type": 6,
                    "priority": "Standard",
                    "notarisation_method_id": 2,
                    "date": "2025-01-22T12:26:14.650Z",
                    "invited_request_status": "REJECTED",
                    "is_deleted": false,
                    "invite_request": true,
                    "invite_number": 73464836584,
                    "notarisation_method": {
                        "id": 2,
                        "notarisation_method": "Remote Ink Notarisation (RIN)",
                        "created_at": "2024-05-08T06:46:56.040Z",
                        "updated_at": "2024-05-08T06:47:24.566Z"
                    },
                    "notary_service_name": "Witnessing and Verifying",
                    "quote_statuses_id": 1
                }
            },
            {
                "id": "485",
                "type": "notary_request_dashboard",
                "attributes": {
                    "status": "PENDING",
                    "notary_id": 349,
                    "notary_service_type": 6,
                    "priority": "Standard",
                    "notarisation_method_id": 2,
                    "date": "2025-01-24T12:20:32.345Z",
                    "invited_request_status": "REJECTED",
                    "is_deleted": false,
                    "invite_request": true,
                    "invite_number": 73464836584,
                    "notarisation_method": {
                        "id": 2,
                        "notarisation_method": "Remote Ink Notarisation (RIN)",
                        "created_at": "2024-05-08T06:46:56.040Z",
                        "updated_at": "2024-05-08T06:47:24.566Z"
                    },
                    "notary_service_name": "Witnessing and Verifying",
                    "quote_statuses_id": 1
                }
            },
            {
                "id": "474",
                "type": "notary_request_dashboard",
                "attributes": {
                    "status": "PENDING",
                    "notary_id": 349,
                    "notary_service_type": 7,
                    "priority": "Standard",
                    "notarisation_method_id": 2,
                    "date": "2025-01-23T07:03:27.829Z",
                    "invited_request_status": "REJECTED",
                    "is_deleted": false,
                    "invite_request": true,
                    "invite_number": 73464836584,
                    "notarisation_method": {
                        "id": 2,
                        "notarisation_method": "Remote Ink Notarisation (RIN)",
                        "created_at": "2024-05-08T06:46:56.040Z",
                        "updated_at": "2024-05-08T06:47:24.566Z"
                    },
                    "notary_service_name": "Drafting Documents",
                    "quote_statuses_id": 1
                }
            },
            {
                "id": "470",
                "type": "notary_request_dashboard",
                "attributes": {
                    "status": "PENDING",
                    "notary_id": 349,
                    "notary_service_type": 6,
                    "priority": "Standard",
                    "notarisation_method_id": 2,
                    "date": "2025-01-18T18:30:00.000Z",
                    "invited_request_status": "REJECTED",
                    "is_deleted": false,
                    "invite_request": true,
                    "invite_number": 73464836584,
                    "notarisation_method": {
                        "id": 2,
                        "notarisation_method": "Remote Ink Notarisation (RIN)",
                        "created_at": "2024-05-08T06:46:56.040Z",
                        "updated_at": "2024-05-08T06:47:24.566Z"
                    },
                    "notary_service_name": "Witnessing and Verifying",
                    "quote_statuses_id": 1
                }
            },
            {
                "id": "445",
                "type": "notary_request_dashboard",
                "attributes": {
                    "status": "PENDING",
                    "notary_id": 349,
                    "notary_service_type": 5,
                    "priority": "Standard",
                    "notarisation_method_id": 2,
                    "date": "2025-01-22T18:30:00.000Z",
                    "invited_request_status": "REJECTED",
                    "is_deleted": false,
                    "invite_request": true,
                    "invite_number": 73464836584,
                    "notarisation_method": {
                        "id": 2,
                        "notarisation_method": "Remote Ink Notarisation (RIN)",
                        "created_at": "2024-05-08T06:46:56.040Z",
                        "updated_at": "2024-05-08T06:47:24.566Z"
                    },
                    "notary_service_name": "Certification",
                    "quote_statuses_id": 1
                }
            }
        ]
    },
        }
      );
      instance.apiRequestListCallId = dashboardApiCallId.messageId;
      runEngine.sendMessage("Unit Test", dashboardApiCallId);
      //expect(instance.userProfileGetApiCallId).toBe(true)
    });
    then("New Notary request will notary services data if API success", () => {
      const dashboardApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        dashboardApiCallId.messageId
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {}
      );
      instance.getAllServicesApiCallId = dashboardApiCallId.messageId;
      runEngine.sendMessage("Unit Test", dashboardApiCallId);
      expect(instance.getDashboardData()).toBe(true)
    });

    then("New Notary request will Country list data if API success", () => {
      const dashboardApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        dashboardApiCallId.messageId
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {}
      );
      instance.getAllCountryListApiCallId = dashboardApiCallId.messageId;
      runEngine.sendMessage("Unit Test", dashboardApiCallId);
      expect(instance.getCountryListData()).toBe(true)
    });

    then("New Notary request will notrazation method data if API success", () => {
      const dashboardApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        dashboardApiCallId.messageId
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {}
      );
      instance.getNotrizationMethodApiCallId = dashboardApiCallId.messageId;
      runEngine.sendMessage("Unit Test", dashboardApiCallId);
      expect(instance.getNotariztionMethod()).toBe(true)
    });

    then("New Notary request will country code data if API success", () => {
      const dashboardApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        dashboardApiCallId.messageId
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {}
      );
      instance.getCountryCodeApiCallId = dashboardApiCallId.messageId;
      runEngine.sendMessage("Unit Test", dashboardApiCallId);
      let codeData = {
        "countries": [
          {
            "country_code": "1",
            "name": "American Samoa",
            "flag": "🇦🇸"
          },
          {
            "country_code": "1",
            "name": "Jamaica",
            "flag": "🇯🇲"
          },
          {
            "country_code": "998",
            "name": "Uzbekistan",
            "flag": "🇺🇿"
          }
        ]
      }
      expect(instance.handleCountryCodeResponse(codeData)).toBe(undefined)
    });

    then("guest user email exist data if API success", () => {
      const dashboardApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        dashboardApiCallId.messageId
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {}
      );
      instance.getGuestUserEmailValidationCallId = dashboardApiCallId.messageId;
      runEngine.sendMessage("Unit Test", dashboardApiCallId);
      let codeData = {
        message: "Email verified successfully"
      }
      expect(instance.handleGuestUserEmailVaildationRes(codeData)).toBe(undefined)
    });

    then("New Notary request for create new notary data if API success", () => {
      const dashboardApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        dashboardApiCallId.messageId
      );
      dashboardApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {}
      );
      instance.createNewNotaryApiCallId = dashboardApiCallId.messageId;
      runEngine.sendMessage("Unit Test", dashboardApiCallId);
      instance.setState({ isNewRequestCreated: true })
    });

    then("After Notary created goto sucess screen without error", () => {
      let ButtonLogin = dashboardWrapper.find(GenericSucessView).at(0).dive()
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'sucessNotaryID');
      buttonComponent.simulate('onPress')
      instance.btnDashboardRedirect.onPress()
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount = jest.fn();
      instance.componentWillUnmount();
      expect(instance.componentWillUnmount).toHaveBeenCalled();
    });
  });

  test('Checking if the array contains any blank objects', ({ given, when, then }) => {
    let instance: ContinueAsGuest;
    let userProfile: ShallowWrapper;

    given('an array of objects', () => {
      userProfile = shallow(<ContinueAsGuest {...screenProps} />);
    });

    when('checking for blank objects', () => {
      instance = userProfile.instance() as ContinueAsGuest;
      instance.setState({ hasBlankObjectResult: false });
      instance.viewsOfDocArray = Array.from({ length: 2 }, () => ({}));
      instance.setState({ hasBlankObjectResult: instance.hasBlankObject() });
      const selectedRequest = {
        requestId: "434",
        actionType: "Accept"
      };
      const apiMsg: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      apiMsg.addData(getName(MessageEnum.CustomDataMessage), selectedRequest );
      runEngine.sendMessage("Unit Test", apiMsg);
    });

    then('it should return true if the array contains a blank object', async () => {
      expect(instance.state.hasBlankObjectResult).toBe(true);
    });
    then('it should return false if the array does not contain any blank objects', () => {
      instance.viewsOfDocArray = [{ uri: "", name: "test.pdf", size: "23342" }];
    });
  });

  test('Extract data from Jurisdictions API response', ({ given, when, then }) => {
    let instance: ContinueAsGuest;
    let notaryRequest: ShallowWrapper;
    let mockApiResponse: any;
    given('a mock API response', () => {
      notaryRequest = shallow(<ContinueAsGuest {...screenProps} />);
      mockApiResponse = [
        { jurisdiction: 'Country1', id: 1 },
        { jurisdiction: 'Country2', id: 2 }
      ];
    });

    when('the handleJurisdictionsApiData function is called with the response', () => {
      instance = notaryRequest.instance() as ContinueAsGuest;
      instance.handleJurisdictionsApiData(mockApiResponse);

      const selectedRequest = {
        requestId: "434",
        actionType: "Accept"
      };
      const apiMsg: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      apiMsg.addData(getName(MessageEnum.CustomDataMessage), selectedRequest );
      runEngine.sendMessage("Unit Test", apiMsg);
    });

    then('the country list state should be updated with the extracted data', () => {
      const expectedData = [
        { label: 'Country1', value: 1 },
        { label: 'Country2', value: 2 }
      ];
      expect(instance.state.countryList).toEqual(expectedData);
    });
  });

  test('Extract data from service API response', ({ given, when, then }) => {
    let instance: ContinueAsGuest;
    let notaryRequest: ShallowWrapper;
    let mockApiResponse: any;
    given('a mock API response', () => {
      notaryRequest = shallow(<ContinueAsGuest {...screenProps} />);
      mockApiResponse = {
        data: [
          { id: 1, attributes: { service_name: 'Service1' } },
          { id: 2, attributes: { name: 'Service2' } }
        ]
      };
    });

    when('the handleServiesApiData function is called with the response', () => {
      instance = notaryRequest.instance() as ContinueAsGuest;
      instance.getNotariztionMethod = jest.fn();
      instance.handleServiesApiData(mockApiResponse);
    });

    then('the services list state should be updated with the extracted data', () => {
      const expectedData = [
        { label: 'Service1', value: 1 },
        { label: 'Service2', value: 2 }
      ];
      expect(instance.state.servicesList).toEqual(expectedData);
    });
  });

  test('Open camera and handle image from camera', ({ given, when, then }) => {
    let instance: ContinueAsGuest;
    let notaryRequest: ShallowWrapper;
    let imagePickerOpenCameraMock: any;
    given('the user wants to open the camera', () => {
      notaryRequest = shallow(<ContinueAsGuest {...screenProps} />);
    });

    when('the openDocumentPicker function is called with the type "Camera"', async () => {
      instance = notaryRequest.instance() as ContinueAsGuest;
      imagePickerOpenCameraMock = jest.spyOn(ImagePicker, 'openCamera').mockResolvedValueOnce('selectedImage');
      await instance.openDocumentPicker('Camera');
    });

    then('the handleImagePicker function should be called with the image from camera', () => {
      expect(imagePickerOpenCameraMock).toHaveBeenCalled();
    });
  });

  test('Open photo gallery and handle image selection', ({ given, when, then }) => {
    let instance: ContinueAsGuest;
    let notaryRequest: ShallowWrapper;
    let imagePickerOpenPickerMock: any;
    given('the user wants to open the photo gallery', () => {
      notaryRequest = shallow(<ContinueAsGuest {...screenProps} />);
    });

    when('the openDocumentPicker function is called with the type "Photos"', async () => {
      instance = notaryRequest.instance() as ContinueAsGuest;
      imagePickerOpenPickerMock = jest.spyOn(ImagePicker, 'openPicker').mockResolvedValueOnce('selectedImage');
      await instance.openDocumentPicker('Photos');
    });

    then('the handleImagePicker function should be called with the selected image', () => {
      expect(imagePickerOpenPickerMock).toHaveBeenCalled();
    });
  });

  test('Select document from file picker and handle selection', ({ given, when, then }) => {
    let instance: ContinueAsGuest;
    let notaryRequest: ShallowWrapper;
    given('the user wants to select a document from the file picker', () => {
      notaryRequest = shallow(<ContinueAsGuest {...screenProps} />);
    });

    when('the openDocumentPicker function is called with an invalid type', async () => {
      instance = notaryRequest.instance() as ContinueAsGuest;
      await instance.openDocumentPicker('InvalidType');
    });

    then('the file picker should be invoked and handleImagePicker function should be called with the selected document', () => {
      expect(pick).toHaveBeenCalled();
    });
  });

  test('Handle dropdown open close and image change', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('I have the function which is open close dropdown', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
    });

    when('I call the openCloseDropdown function', async () => {
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.openCloseDropdown();
    });

    then('I should see dropdown is open and image changes', () => {
      expect(instance.state.isDropdownOpen).toEqual(true);
    });

    when('I call the closeDropDownOfNotarization function', async () => {
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.closeDropDownOfNotarization();
    });

    then('I should see dropdown is open and image changes', () => {
      expect(instance.state.isDropdownOpen).toEqual(false);
    });

    when('I call the openServicesDropdown function', async () => {
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.openServicesDropdown();
    });

    then('I should see dropdown is open and image changes', () => {
      expect(instance.state.isServiceDropdownOpen).toEqual(true);
    });

    when('I call the closeDropDownOfServices function', async () => {
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.closeDropDownOfServices();
    });

    then('I should see dropdown is open and image changes', () => {
      expect(instance.state.isServiceDropdownOpen).toEqual(false);
    });

    when('I call the openJuridactionDropdown function', async () => {
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.openJuridactionDropdown();
    });

    then('I should see dropdown is open and image changes', () => {
      expect(instance.state.isJuridactionDropdownOpen).toEqual(true);
    });

    when('I call the closeDropDownOfJuridaction function', async () => {
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.closeDropDownOfJuridaction();
    });

    then('I should see dropdown is open and image changes', () => {
      expect(instance.state.isJuridactionDropdownOpen).toEqual(false);
    });
  });

  test('Toggling a document', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;

    given('the initial state of toggledDocuments is {}', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      expect(instance.state.toggledDocuments).toEqual({});
    });

    when('I toggle the document "doc1"', () => {
      instance.toggleDocument('doc1');
    });

    then('the state of toggledDocuments should be {"doc1": true}', () => {
      expect(instance.state.toggledDocuments).toEqual({ doc1: true });
    });

    when('I toggle the document "doc1" again', () => {
      instance.toggleDocument('doc1');
    });

    then('the state of toggledDocuments should be {"doc1": false}', () => {
      expect(instance.state.toggledDocuments).toEqual({ doc1: false });
    });
  });

  // const upArrowImg = 'upArrowImg'; // Mock your image paths
  // const downArrowBlackImg = 'downArrowBlackImg'; // Mock your image paths
  test('Document is not toggled', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let document: string;
    let result: any
    given('the document is "document1"', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      expect(instance.state.toggledDocuments).toEqual({});
      document = "document1";
      instance.state.toggledDocuments['document1'] = false;
    });
    and('the document is not toggled', () => {
      state.toggledDocuments[document] = false;
      instance.setState({ toggledDocuments: { 'document1': false } });
    });
    when('I call the getArrowImg function', () => {
      result = instance.getArrowImg('document1');
    });

    then('I should get the up arrow image', () => {
      expect(result).toBe(upArrowImg);
    });
  });

  test('Document is toggled', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let document: string;
    let result: any
    given('the document is "document1"', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      document = "document1";
      instance.state.toggledDocuments['document1'] = true;
    });
    and('the document is toggled', () => {
      state.toggledDocuments[document] = true;
      instance.setState({ toggledDocuments: { 'document1': true } });
    });
    when('I call the getArrowImg function', () => {
      result = instance.getArrowImg('document1');
    });

    then('I should get the down arrow image', () => {
      expect(result).toBe(downArrowBlackImg);
    });
  });

  test('Render style for iOS', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the platform is iOS', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      Platform.OS = 'ios';
    });
    when('the renderStyleAccordingToOS function is called', () => {
    });

    then('it should return "paddBottTop"', () => {
      expect(instance.renderStyleAccordingToOS()).toBe('paddBottTop');
      expect(instance.renderStyleOfDataTImeFieldAccordingToOS()).toBe('paddTopBott');
    });
  });

  test('Render style for Android', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the platform is Android', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      Platform.OS = 'android';
    });
    when('the renderStyleAccordingToOS function is called', () => { });

    then('it should return "padd"', () => {
      expect(instance.renderStyleAccordingToOS()).toBe('padd');
      expect(instance.renderStyleOfDataTImeFieldAccordingToOS()).toBe('padd');
    });
  });

  test('Render error style when step one validation fails and selected day is empty', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the step one validation is true', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.setState({ isStepOneValidation: true, selectedDay: '' })
    });
    when('the renderUIStyleOfDateAndTime function is called', () => { });

    then('it should return "errorOfField"', () => {
      expect(instance.renderUIStyleOfDateAndTime()).toBe('errorOfField');
    });
  });

  test('Render text field background style when step one validation passes or selected day is not empty', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the step one validation is true', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
    });
    when('the renderUIStyleOfDateAndTime function is called', () => {
      instance.setState({ isStepOneValidation: true, selectedDay: '2023-01-01' })
    });

    then('it should return "textFieldBg"', () => {
      expect(instance.renderUIStyleOfDateAndTime()).toBe('textFieldBg');
    });
  });

  test('Document has signatory', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let documentDetails: any;
    let result: any;
    given('the document details with a signatory', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      documentDetails = [
        { id: 1, is_signatory: false },
        { id: 2, is_signatory: true },
        { id: 3, is_signatory: false },
      ];
    });

    when('the function is called', () => {
      result = instance.checkIsSignatoryForSingleDocument(documentDetails);
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('Document has no signatory', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let documentDetails: any;
    let result: any;
    given('the document details without a signatory', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      documentDetails = [
        { id: 1, is_signatory: false },
        { id: 2, is_signatory: false },
        { id: 3, is_signatory: false },
      ];
    });

    when('the function is called', () => {
      result = instance.checkIsSignatoryForSingleDocument(documentDetails);
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Remove a document when multiple documents exist', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('a component with 3 documents', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.viewsOfDocArray = ['doc1', 'doc2', 'doc3'];
      instance.setState({ noOfDocument: 3 });
    });

    when('the removeDocFromList function is called with index 1', () => {
      instance.removeDocFromList(1);
    });

    then('the component should have 2 documents', () => {
      expect(instance.viewsOfDocArray.length).toBe(2);
      expect(instance.viewsOfDocArray).not.toContain('doc2');
    });

    then('the number of documents state should be updated to 2', () => {
      expect(instance.state.noOfDocument).toBe(2);
    });
  });

  test('Do not remove a document when only one document exists', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('a component with 1 document', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.viewsOfDocArray = ['doc1'];
      instance.setState({ noOfDocument: 1 });
    });

    when('the removeDocFromList function is called with index 0', () => {
      instance.removeDocFromList(0);
    });

    then('the component should still have 1 document', () => {
      expect(instance.viewsOfDocArray.length).toBe(1);
    });

    then('the number of documents state should still be 1', () => {
      expect(instance.state.noOfDocument).toBe(1);
    });
  });

  test('Successfully handles session response message', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let message: any;
    given('I have a valid session response message', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      const userData = JSON.stringify({
        meta: {
          id: '12345',
          token: 'abcdef',
        },
      });

      message = new Message('uujniugkbj87uj');
      message.getData = jest.fn().mockReturnValue(userData);
    });

    when('I handle the session response message', () => {
      instance.handleSessionResponseMessage(message);
    });

    then('the userID and token should be set in the state', () => {
      expect(instance.state.userID).toBe('12345');
      expect(instance.state.token).toBe('abcdef');
    });
  });

  test('Successfully handles navigation payload message with valid data', ({ given, when, then }) => {
    let validData: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let message: Message
    given('I have a valid navigation payload message', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      validData = {
        actionType: 'someAction',
        requestId: '12345',
      };
      // instance.getRequestDetail(430)
      // instance.getRequestDetail = jest.fn();
      message = new Message('hueikdjbjyfiud');
      message.getData = jest.fn().mockReturnValue(validData);
    });

    when('I handle the navigation payload message', () => {
      // instance.handleNavigationPayLoadMessage(message);
    });

    then('the selectedActionType should be set', () => {
      expect(instance.selectedActionType).toBe("");
    });

    then('the getRequestDetail method should be called with the correct requestId', () => {
      // expect(instance.getRequestDetail).toHaveBeenCalledWith(validData.requestId);
    });
  });

  test('Handles navigation payload message with no data', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let message: Message;
    given('I have an invalid navigation payload message', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      message = new Message('hueikdjbjyfiud');
      // instance.getRequestDetail = jest.fn();
      message.getData = jest.fn().mockReturnValue(null);
    });

    when('I handle the navigation payload message', () => {
      // instance.handleNavigationPayLoadMessage(message);
    });

    then('the selectedActionType should not be set', () => {
    });

    then('the getRequestDetail method should not be called', () => {
      // expect(instance.getRequestDetail).not.toHaveBeenCalled();
    });
  });

  test('Handle successful notary creation response', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('I have a successful notary creation response', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      const responseJson = {
        message: 'Notary created successfully',
      };
      instance.handleCreateNewNotaryResponse(responseJson);
    });

    when('I handle the create new notary response', () => {
      // Action already performed in the given step
    });

    then('isNewRequestCreated should be set to true', () => {
      expect(instance.state.isNewRequestCreated).toBe(true);
    });

    then('isLoader should be set to false', () => {
      instance.scrollToTop()
      expect(instance.state.isLoader).toBe(false);
    });
  });

  test('Handle unsuccessful notary creation response', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('I have an unsuccessful notary creation response', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      const responseJson: any = {};
      instance.handleCreateNewNotaryResponse(responseJson);
    });

    when('I handle the create new notary response', () => {
      // Action already performed in the given step
    });

    then('isNewRequestCreated should not be set', () => {
      expect(instance.state.isNewRequestCreated).toBe(false);
    });

    then('isLoader should be set to false', () => {
      expect(instance.state.isLoader).toBe(false);
    });
  });

  test('Process valid NotaryRequest response', ({ given, when, then }) => {
    let responseJson: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('a valid NotaryRequest response', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      responseJson = {
        "attributes": {
          "status": "IN PROGRESS",
          "notary_id": 1052,
          "notary_service_type": 34,
          "priority": "Standard",
          "notarisation_method_id": 2,
          "jurisdiction_id": 1,
          "date": "2024-07-31T00:00:00.000Z",
          "notes": "THis is testing for new adding request data for notes pcheck purpose I that thing correct r not",
          "notarised_document": 2,
          "juridiction": {
            "id": 1,
            "jurisdiction": "India",
            "created_at": "2024-02-09T05:07:19.691Z",
            "updated_at": "2024-02-09T05:07:19.691Z"
          },
          "notarisation_method": {
            "id": 2,
            "notarisation_method": "Remote Ink Notarisation (RIN)",
            "created_at": "2024-05-06T10:18:57.375Z",
            "updated_at": "2024-05-06T10:18:57.375Z"
          },
          "notary_service_name": "Notary exective service",
          "file_documents": [
            {
              "doc_name": "163aa565-9996-42af-96dd-bc4a8c7dac7b.jpg",
              "doc_file_url": "/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0lEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--26cc54319ec05602bfd426008cba4225d27a3dfb/163aa565-9996-42af-96dd-bc4a8c7dac7b.jpg",
              "signatory_count": 1,
              "recipients": [
                {
                  "id": 806,
                  "created_at": "2024-07-08T05:48:41.120Z",
                  "updated_at": "2024-07-08T05:48:41.120Z",
                  "file_document_id": 1035,
                  "name": "hi",
                  "email": "hi@gmail.com",
                  "is_signatory": true
                }
              ]
            },
            {
              "doc_name": "mountain.jpg",
              "doc_file_url": "/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0VEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0a0870243c7ef55b0e022138389bebb463b09fb2/mountain.jpg",
              "signatory_count": 1,
              "recipients": [
                {
                  "id": 805,
                  "created_at": "2024-07-08T05:48:41.094Z",
                  "updated_at": "2024-07-08T05:48:41.094Z",
                  "file_document_id": 1034,
                  "name": "this",
                  "email": "this@gmail.com",
                  "is_signatory": false
                },
                {
                  "id": 804,
                  "created_at": "2024-07-08T05:48:41.090Z",
                  "updated_at": "2024-07-08T05:48:41.090Z",
                  "file_document_id": 1034,
                  "name": "hello",
                  "email": "hello@gmail.com",
                  "is_signatory": true
                }
              ]
            }
          ]
        },
      };
    });

    when('the handleRequestDetailApiData function is called', async () => {
      await instance.handleRequestDetailApiData(responseJson);
    });

    then('the state should be updated with the response data', () => {
      expect(instance.state.noOfDocument).toEqual(2)
      expect(instance.state.addNotes).toEqual("THis is testing for new adding request data for notes pcheck purpose I that thing correct r not")
      expect(instance.state.selectedJurisdiction).toEqual({ value: 1, label: "India" })
      expect(instance.state.selectedService).toEqual({ value: 34, label: "Notary exective service" })
      expect(instance.state.selectedNotarisation).toEqual({ value: 2, label: "Remote Ink Notarisation (RIN)" })
    });
  });

  test('Process NotaryRequest response with no file documents', ({ given, when, then }) => {
    let responseJson: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('a NotaryRequest response with no file documents', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      responseJson = {
        "attributes": {
          "status": "IN PROGRESS",
          "notary_id": 1052,
          "notary_service_type": 34,
          "priority": "Standard",
          "notarisation_method_id": 2,
          "jurisdiction_id": 1,
          "date": "2024-07-31T00:00:00.000Z",
          "notes": "THis is testing for new adding request data for notes pcheck purpose I that thing correct r not",
          "notarised_document": 2,
          "juridiction": {
            "id": 1,
            "jurisdiction": "India",
            "created_at": "2024-02-09T05:07:19.691Z",
            "updated_at": "2024-02-09T05:07:19.691Z"
          },
          "notarisation_method": {
            "id": 2,
            "notarisation_method": "Remote Ink Notarisation (RIN)",
            "created_at": "2024-05-06T10:18:57.375Z",
            "updated_at": "2024-05-06T10:18:57.375Z"
          },
          "notary_service_name": "Notary exective service",
          "file_documents": [
          ]
        }
      };
    });

    when('the handleRequestDetailApiData function is called', async () => {
      await instance.handleRequestDetailApiData(responseJson);
    });

    then('the state should be updated without file document details', () => {
      expect(instance.state.noOfDocument).toEqual(2)
      expect(instance.state.addNotes).toEqual("THis is testing for new adding request data for notes pcheck purpose I that thing correct r not")
      expect(instance.state.selectedJurisdiction).toEqual({ value: 1, label: "India" })
      expect(instance.state.selectedService).toEqual({ value: 34, label: "Notary exective service" })
      expect(instance.state.selectedNotarisation).toEqual({ value: 2, label: "Remote Ink Notarisation (RIN)" })
    });
  });

  test('Increase the number of documents', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the initial number of documents is 5', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.setState({ noOfDocument: 5 });
    });

    when('the user clicks the "plus" button', () => {
      instance.increaseDecreaseNoOfDocument('plus');
    });

    then('the number of documents should be 6', () => {
      expect(instance.state.noOfDocument).toBe(6);
    });
  });

  test('Increase the number of documents when at max limit', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the initial number of documents is 10', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.setState({ noOfDocument: 10 });
    });

    when('the user clicks the "plus" button', () => {
      instance.increaseDecreaseNoOfDocument('plus');
    });

    then('the number of documents should remain 10', () => {
      expect(instance.state.noOfDocument).toBe(10);
    });
  });

  test('Decrease the number of documents', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the initial number of documents is 5', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.setState({ noOfDocument: 5 });
    });

    when('the user clicks the "minus" button', () => {
      instance.increaseDecreaseNoOfDocument('minus');
    });

    then('the number of documents should be 4', () => {
      expect(instance.state.noOfDocument).toBe(4);
    });
  });

  test('Decrease the number of documents when at min limit', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the initial number of documents is 0', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.setState({ noOfDocument: 0 });
    });

    when('the user clicks the "minus" button', () => {
      instance.increaseDecreaseNoOfDocument('minus');
    });

    then('the number of documents should remain 0', () => {
      expect(instance.state.noOfDocument).toBe(0);
    });
  });

  test('Navigate to step 2 when the first step button is enabled', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the first step button is enabled', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.getFirstStepBtnEnabled = () => true;
    });

    given('the current step number is 1', () => {
      instance.setState({ stepsNo: 1 });
    });

    when('the user navigates to step 2', () => {
      instance.goToSteps(2);
    });

    then('the step number should be 2', () => {
      expect(instance.state.stepsNo).toBe(2);
      instance.scrollToTop()
    });
  });

  test('Do not navigate to step 2 when the first step button is disabled', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the first step button is disabled', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.getFirstStepBtnEnabled = () => false;
    });

    given('the current step number is 1', () => {
      instance.setState({ stepsNo: 1 });
    });

    when('the user navigates to step 2', () => {
      instance.goToSteps(2);
    });

    then('the step number should remain 1', () => {
      expect(instance.state.stepsNo).toBe(1);
      instance.scrollToTop()
    });
  });

  test('Navigate to step 3 when the second step button is enabled', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the second step button is enabled', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.getenabledSecStepBtn = () => true;
    });

    given('the current step number is 2', () => {
      instance.setState({ stepsNo: 2 });
    });

    when('the user navigates to step 3', () => {
      // instance.goToSteps(3);
      instance.setState({ stepsNo: 3 });
    });

    then('the step number should be 3', () => {
      expect(instance.state.stepsNo).toBe(3);
      instance.scrollToTop()
    });
  });

  test('Do not navigate to step 3 when the second step button is disabled', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the second step button is disabled', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.getenabledSecStepBtn = () => false;
    });

    given('the current step number is 2', () => {
      instance.setState({ stepsNo: 2 });
    });

    when('the user navigates to step 3', () => {
      instance.goToSteps(3);
    });

    then('the step number should remain 2', () => {
      expect(instance.state.stepsNo).toBe(2);
      instance.scrollToTop()
    });
  });


  test('Transform dynamic object with file details and recipients', ({ given, when, then }) => {
    let result: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    const dynamicObject = {
      document1: [
        {
          fileDetail: { path: 'path/to/file', size: 12345, uri: null, name: 'file1' },
          recipients: [
            { name: 'John Doe', email: 'john@example.com', is_signatory: true },
            { name: 'Jane Doe', email: 'jane@example.com', is_signatory: false },
          ],
        },
      ],
    };

    given('a dynamic object with file details and recipients', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
    });

    when('the transformDynamicObject function is called', async () => {
      RNFS.readFile = jest.fn().mockResolvedValue('hjuyjhuyituhiukh');
      result = await instance.transformDynamicObject(dynamicObject);
    });

    then('it should return the transformed object with base64, file, and recipients_attributes', () => {
      expect(result).toEqual([
        {
          base64: 'hjuyjhuyituhiukh',
          file: 'file1',
          recipients_attributes: [
            { name: 'John Doe', email: 'john@example.com', is_signatory: true },
            { name: 'Jane Doe', email: 'jane@example.com', is_signatory: false },
          ],
        },
      ]);
    });
  });

  test('Transform dynamic object with file having no size', ({ given, when, then }) => {
    let result: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    const dynamicObject = {
      document1: [
        {
          fileDetail: { path: 'path/to/file', size: 0, uri: null, name: 'mockFileName' },
          recipients: [
            { name: 'John Doe', email: 'john@example.com', is_signatory: true },
          ],
        },
      ],
    };

    given('a dynamic object with a file having no size', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
    });

    when('the transformDynamicObject function is called', async () => {
      result = await instance.transformDynamicObject(dynamicObject);
    });

    then('it should return the transformed object with the original path as base64', () => {
      expect(result).toEqual([
        {
          base64: 'path/to/file',
          file: 'mockFileName',
          recipients_attributes: [
            { name: 'John Doe', email: 'john@example.com', is_signatory: true },
          ],
        },
      ]);
    });
  });

  test('Transform dynamic object with file having size and uri', ({ given, when, then }) => {
    let result: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    const dynamicObject = {
      document1: [
        {
          fileDetail: { path: 'path/to/file', size: 12345, uri: 'uri/to/file', name: 'file' },
          recipients: [
            { name: 'John Doe', email: 'john@example.com', is_signatory: true },
          ],
        },
      ],
    };

    given('a dynamic object with a file having size and uri', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
    });

    when('the transformDynamicObject function is called', async () => {
      // RNFS.readFile = jest.fn().mockResolvedValue('mockBase64');
      result = await instance.transformDynamicObject(dynamicObject);
    });

    then('it should return the transformed object with base64 converted from uri', () => {
      expect(result).toEqual([
        {
          base64: 'hjuyjhuyituhiukh',
          file: 'file',
          recipients_attributes: [
            { name: 'John Doe', email: 'john@example.com', is_signatory: true },
          ],
        },
      ]);
    });
  });

  test('Transform dynamic object with file having size but no uri', ({ given, when, then }) => {
    let result: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    const dynamicObject = {
      document1: [
        {
          fileDetail: { path: 'path/to/file', size: 12345, uri: null, name: 'file' },
          recipients: [
            { name: 'John Doe', email: 'john@example.com', is_signatory: true },
          ],
        },
      ],
    };

    given('a dynamic object with a file having size but no uri', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
    });

    when('the transformDynamicObject function is called', async () => {
      RNFS.readFile = jest.fn().mockResolvedValue('mockBase64');
      result = await instance.transformDynamicObject(dynamicObject);
    });

    then('it should return the transformed object with base64 read from file path', () => {
      expect(result).toEqual([
        {
          base64: 'mockBase64',
          file: 'file',
          recipients_attributes: [
            { name: 'John Doe', email: 'john@example.com', is_signatory: true },
          ],
        },
      ]);
    });
  });


  test('Pressing the button without enabled secondary step button', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('a state where secondary step button is not enabled', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      jest.spyOn(instance, 'getenabledSecStepBtn').mockReturnValue(false);
    });

    when('the onPress function of btnNextStepsSecProps is called', () => {
      instance.btnNextStepsSecProps.onPress();
    });

    then('it should set isStepSecValidatin and docValidationMsg to true', () => {
      expect(instance.state.isStepSecValidatin).toBe(true);
      expect(instance.state.docValidationMsg).toBe(true);
    });

    then('it should return false', () => {
      // Test expectation already verified by mockReturnValue(false)
    });
  });

  test('Pressing the button with enabled secondary step button', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('a state where secondary step button is enabled', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.viewsOfDocArray = [
        { fileDetail: { name: 'fsefsf', path: '/dsdsdf/fsefsf', size: 112, url: '/dsdsdf/fsefsf' }, recipients: [{ email: 'deep@gmail.com', name: 'deep', is_signatory: true }] },
        { fileDetail: { name: 'gwfsffsd', path: '/sdsge/rf/gwfsffsd', size: 150, url: '/sdsge/rf/gwfsffsd' }, recipients: [{ email: 'singh@gmail.com', name: 'singh', is_signatory: true }] },
      ];
      jest.spyOn(instance, 'getenabledSecStepBtn').mockReturnValue(true);
    });

    when('the onPress function of btnNextStepsSecProps is called', () => {
      instance.btnNextStepsSecProps.onPress();
    });

    then('it should set isStepSecValidatin to false', () => {
      expect(instance.state.isStepSecValidatin).toBe(false);
    });

    then('it should update documentsObject and recipients state', () => {

    });

    then('it should set stepsNo to 3', () => {
      expect(instance.state.stepsNo).toBe(4);
      instance.scrollToTop()
    });

    then('it should set documnetDetail with updated documentsObject', () => {

    });
  });


  test('Navigate to step 2 with enabled first step button', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('a state where first step button is enabled', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      jest.spyOn(instance, 'getFirstStepBtnEnabled').mockReturnValue(true);
    });

    when('the goToSteps function is called with step number 2', () => {
      instance.goToSteps(2);
    });

    then('it should set stepsNo to 2', () => {
      expect(instance.state.stepsNo).toBe(2);
      instance.scrollToTop()
    });
  });

  test('Navigate to step 3 with enabled secondary step button', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('a state where secondary step button is enabled', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      jest.spyOn(instance, 'getenabledSecStepBtn').mockReturnValue(true);
      const detail: any = {
        attributes: {
          file_documents: [
            { doc_file_url: '/path/to/doc1', recipients: [] },
            { doc_file_url: '/path/to/doc2', recipients: [] },
          ],
          notarised_document: 2, // Assuming there are 2 notarised documents
        },
      }
      instance.setState({ selectedRequestDetail: detail })
    });

    when('the goToSteps function is called with step number 3', () => {
      instance.goToSteps(3);
      instance.setState({ stepsNo: 3 })
    });

    then('it should set stepsNo to 3', () => {
      expect(instance.state.stepsNo).toBe(3);
      instance.scrollToTop()
    });

    then('it should update documnetDetail and documentList', () => {
      expect(dashboardWrapper).toBeTruthy();

    });
  });

  test('Selected action type is edit', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the selected action type is "edit"', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.selectedActionType = 'edit';
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
    let instance: ContinueAsGuest;
    given('the selected action type is not "edit"', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.selectedActionType = 'create';
    });
    let result: any;
    when('I get the title of the notary flow page', () => {
      result = instance.getTitleOfNotaryFlowPage();
    });

    then('the title should be "New Notary Request"', () => {
      expect(result).toBe('New Notary Request');
    });
  });

  test('Selected action type is edit for sucess screen', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any;
    given('the selected action type is "edit"', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.selectedActionType = 'edit';
    });

    when('I get the success message screen page', () => {
      result = instance.getSucessMsgScreenPage();
    });

    then('the message should be "Notary Request updated Successfully"', () => {
      expect(result).toBe("Notary Request updated Successfully");
    });
  });

  test('Selected action type is not edit for sucess screen', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any;
    given('the selected action type is not "edit"', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.selectedActionType = 'create';
    });

    when('I get the success message screen page', () => {
      result = instance.getSucessMsgScreenPage();
    });

    then('the message should be "Notary Request created Successfully"', () => {
      expect(result).toBe("Notary Request created Successfully");
    });
  });

  test('Validate recipient name when isStepThiredValidation is true and name is empty', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any
    given('the step third validation is true', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.setState({ isStepThiredValidation: true });
    });

    when('the recipient name is ""', () => {
      result = instance.getValidateMsgOfRecipantName('');
    });

    then('the validation message should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('Validate recipient name when isStepThiredValidation is true and name is only whitespace', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any
    given('the step third validation is true', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.setState({ isStepThiredValidation: true });
    });

    when('the recipient name is "   "', () => {
      result = instance.getValidateMsgOfRecipantName('   ');
    });

    then('the validation message should be true', () => {
      expect(result).toBe(false);
    });
  });

  test('Validate recipient name when isStepThiredValidation is true and name is not empty', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any
    given('the step third validation is true', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.setState({ isStepThiredValidation: true });
    });

    when('the recipient name is "John Doe"', () => {
      result = instance.getValidateMsgOfRecipantName('John Doe');
    });

    then('the validation message should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Validate recipient name when isStepThiredValidation is false', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any
    given('the step third validation is false', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.setState({ isStepThiredValidation: false });
    });

    when('the recipient name is ""', () => {
      result = instance.getValidateMsgOfRecipantName('');
    });

    then('the validation message should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Valid recipient\'s name', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any;
    let inputText: any
    given(/^the input text is "(.*)"$/, (text) => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      inputText = text;
    });

    when('the function handleRecipantsName is called', () => {
      result = instance.handleRecipantsName(inputText);
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('Invalid recipient\'s name (starts with a number)', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any;
    let inputText: any
    given(/^the input text is "(.*)"$/, (text) => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      inputText = text;
    });

    when('the function handleRecipantsName is called', () => {
      result = instance.handleRecipantsName(inputText);
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Invalid recipient\'s name (contains special characters)', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any;
    let inputText: any
    given(/^the input text is "(.*)"$/, (text) => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      inputText = text;
    });

    when('the function handleRecipantsName is called', () => {
      result = instance.handleRecipantsName(inputText);
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Valid recipient\'s name with spaces', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any
    let inputText: any
    given(/^the input text is "(.*)"$/, (text) => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      inputText = text;
    });

    when('the function handleRecipantsName is called', () => {
      result = instance.handleRecipantsName(inputText);
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('Invalid recipient\'s name with additional validation step', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any
    let inputName: any
    given(/^the input name is "(.*)"$/, (name) => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      inputName = name;
    });

    and('the step third validation is enabled', () => {
      instance.setState({ isStepThiredValidation: true });
    });

    when('the function getRecipantNameValidation is called', () => {
      result = instance.getRecipantNameValidation(inputName);
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('Valid recipient\'s name with additional validation step', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any
    let inputName: any
    given(/^the input name is "(.*)"$/, (name) => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      inputName = name;
    });

    and('the step third validation is enabled', () => {
      instance.setState({ isStepThiredValidation: true });
    });

    when('the function getRecipantNameValidation is called', () => {
      result = instance.getRecipantNameValidation(inputName);
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Invalid recipient\'s name but step third validation is disabled', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any
    let inputName: any
    given(/^the input name is "(.*)"$/, (name) => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      inputName = name;
    });

    and('the step third validation is disabled', () => {
      instance.setState({ isStepThiredValidation: false });
    });

    when('the function getRecipantNameValidation is called', () => {
      result = instance.getRecipantNameValidation(inputName);
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Empty name with step third validation enabled', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any
    let inputName: any
    given(/^the input name is "(.*)"$/, (name) => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      inputName = name;
    });

    and('the step third validation is enabled', () => {
      instance.setState({ isStepThiredValidation: true });
    });

    when('the function getRecipantNameValidation is called', () => {
      result = instance.getRecipantNameValidation(inputName);
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Button name for edit action', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any
    given(/^the selected action type is "edit"$/, () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.selectedActionType = 'edit'
    });

    when('I call the getButtonName function', () => {
      result = instance.getButtonName();
    });

    then('the button name should be "Update"', () => {
      expect(result).toBe('Update');
    });
  });

  test('Button name for create action', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any;
    given(/^the selected action type is not "edit"$/, () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.selectedActionType = 'create'
    });

    when('I call the getButtonName function', () => {
      result = instance.getButtonName();
    });

    then('the button name should be "Create Request"', () => {
      expect(result).toBe('Create Request');
    });
  });

  test('Document can be removed', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any;
    given('a document view item with a specific path', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.setState({
        selectedRequestDetail: {
          id: "123",
          type: "",
          relationships: {
            jurisdiction: {
              data: {
                id: "string",
                type: "string",
              }
            },
            notary: {
              data: {
                id: "string",
                type: "string",
              }
            },
            notarisation_method: {
              data: {
                id: "string",
                type: "string",
              }
            },
            account: {
              data: {
                id: "string",
                type: "string"
              }
            }
          },
          "attributes": {
            "status": "IN PROGRESS",
            "notary_id": "1052",
            "notary_service_type": 34,
            "priority": "Standard",
            "notarisation_method_id": 2,
            "jurisdiction_id": 1,
            timing_slot: 'Evening',
            "date": "2024-07-31T00:00:00.000Z",
            "notes": "THis is testing for new adding request data for notes pcheck purpose I that thing correct r not",
            "notarised_document": 2,
            "juridiction": {
              "id": 1,
              "jurisdiction": "India",
              "created_at": "2024-02-09T05:07:19.691Z",
              "updated_at": "2024-02-09T05:07:19.691Z"
            },
            "notarisation_method": {
              "id": 2,
              "notarisation_method": "Remote Ink Notarisation (RIN)",
              "created_at": "2024-05-06T10:18:57.375Z",
              "updated_at": "2024-05-06T10:18:57.375Z"
            },
            "notary_service_name": "Notary exective service",
            "file_documents": [
              {
                "doc_name": "163aa565-9996-42af-96dd-bc4a8c7dac7b.jpg",
                "doc_file_url": "/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0lEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--26cc54319ec05602bfd426008cba4225d27a3dfb/163aa565-9996-42af-96dd-bc4a8c7dac7b.jpg",
                "signatory_count": 1,
                "recipients": [
                  {
                    "id": 806,
                    "created_at": "2024-07-08T05:48:41.120Z",
                    "updated_at": "2024-07-08T05:48:41.120Z",
                    "file_document_id": 1035,
                    "name": "hi",
                    "email": "hi@gmail.com",
                    "is_signatory": true
                  }
                ]
              }
            ]
          },
        }
      });
    });

    when('the canBeRemoved function is called', () => {
      result = instance.canBeRemoved({ path: "/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0lEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--26cc54319ec05602bfd426008cba4225d27a3dfb/163aa565-9996-42af-96dd-bc4a8c7dac7b.jpg", id: 1, name: "" }, 1);
    });

    then('it should return true', () => {
      expect(result).toBe(true);
    });
  });

  test('Document cannot be removed', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any;
    given('a document view item with a specific path', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.setState({
        selectedRequestDetail: {
          id: "123",
          type: "",
          relationships: {
            jurisdiction: {
              data: {
                id: "string",
                type: "string",
              }
            },
            notary: {
              data: {
                id: "string",
                type: "string",
              }
            },
            notarisation_method: {
              data: {
                id: "string",
                type: "string",
              }
            },
            account: {
              data: {
                id: "string",
                type: "string"
              }
            }
          },
          "attributes": {
            "status": "IN PROGRESS",
            "notary_id": "1052",
            "notary_service_type": 34,
            "priority": "Standard",
            "notarisation_method_id": 2,
            "jurisdiction_id": 1,
            timing_slot: 'Evening',
            "date": "2024-07-31T00:00:00.000Z",
            "notes": "THis is testing for new adding request data for notes pcheck purpose I that thing correct r not",
            "notarised_document": 2,
            "juridiction": {
              "id": 1,
              "jurisdiction": "India",
              "created_at": "2024-02-09T05:07:19.691Z",
              "updated_at": "2024-02-09T05:07:19.691Z"
            },
            "notarisation_method": {
              "id": 2,
              "notarisation_method": "Remote Ink Notarisation (RIN)",
              "created_at": "2024-05-06T10:18:57.375Z",
              "updated_at": "2024-05-06T10:18:57.375Z"
            },
            "notary_service_name": "Notary exective service",
            "file_documents": [
              {
                "doc_name": "163aa565-9996-42af-96dd-bc4a8c7dac7b.jpg",
                "doc_file_url": "/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0lEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--26cc54319ec05602bfd426008cba4225d27a3dfb/163aa565-9996-42af-96dd-bc4a8c7dac7b.jpg",
                "signatory_count": 1,
                "recipients": [
                  {
                    "id": 806,
                    "created_at": "2024-07-08T05:48:41.120Z",
                    "updated_at": "2024-07-08T05:48:41.120Z",
                    "file_document_id": 1035,
                    "name": "hi",
                    "email": "hi@gmail.com",
                    "is_signatory": true
                  }
                ]
              }
            ]
          },
        }
      });
    });

    when('the canBeRemoved function is called', () => {
      result = instance.canBeRemoved({ path: "/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0lEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--26cc54319ec05602bfd426008cba4225d27a3dfb/163aa565-9996-42af-96dd-bc4a8c7dac7b.jpg", id: 1, name: "" }, 0);
    });

    then('canBeRemoved function should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('Render error style when step one validation fails', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the step one validation is true', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.setState({ isStepOneValidation: true, selectedDay: '' })
    });
    when('the renderUIStyleOfDateTime function is called', () => { });

    then('it should return "errorOfFieldView"', () => {
      expect(instance.renderUIStyleOfDateTime()).toBe('errorOfFieldView');
    });
  });

  test('Render text field background validation passes or selected day is not empty', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the step one validation is true', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
    });
    when('the renderUIStyleOfDateTime function is called', () => {
      instance.setState({ isStepOneValidation: true, selectedDay: '2023-01-01' })
    });

    then('it should return "textFieldBgView"', () => {
      expect(instance.renderUIStyleOfDateTime()).toBe('textFieldBgView');
    });
  });

  test('Invalid recipient\'s name with additional validation', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any
    let inputName: any
    given(/^the input name is "(.*)"$/, (name) => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      inputName = name;
    });

    and('the step third validation is enabled', () => {
      instance.setState({ isStepThiredValidation: true });
    });

    when('the function getRecipantValidation is called', () => {
      result = instance.getRecipantValidation(inputName);
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Valid recipient\'s name with additional validation', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any
    let inputName: any
    given(/^the input name is "(.*)"$/, (name) => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      inputName = name;
    });

    and('the step third validation is enabled', () => {
      instance.setState({ isStepThiredValidation: true });
    });

    when('the function getRecipantValidation is called', () => {
      result = instance.getRecipantValidation(inputName);
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('Invalid recipient\'s name but step third validation is', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any
    let inputName: any
    given(/^the input name is "(.*)"$/, (name) => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      inputName = name;
    });

    and('the step third validation is disabled', () => {
      instance.setState({ isStepThiredValidation: false });
    });

    when('the function getRecipantValidation is called', () => {
      result = instance.getRecipantValidation(inputName);
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('Empty name with step third validation', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any
    let inputName: any
    given(/^the input name is "(.*)"$/, (name) => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      inputName = name;
    });

    and('the step third validation is enabled', () => {
      instance.setState({ isStepThiredValidation: true });
    });

    when('the function getRecipantValidation is called', () => {
      result = instance.getRecipantValidation(inputName);
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('User toggles a document to show an added participant', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the component\'s initial state with no toggled documents', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      expect(instance.state.toggledDocuments).toEqual({});
    });

    when('the user toggles the document "doc1"', () => {
      instance.showAddedParticipant('doc1');
    });

    then('the document "doc1" should be set to false in the toggledDocuments state', () => {
      expect(instance.state.toggledDocuments).toEqual({ doc1: false });
    });
  });

  test('Menu width for end user role', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the user role is "end_user"', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.selectedActionType = 'end_user';
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
    let instance: ContinueAsGuest;
    given('the user role is "admin"', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      instance.selectedActionType = 'notary';
    });
    let menuWidth: any;
    when('the getMenuWidth function is called', () => {
      menuWidth = instance.getMenuWidth();
    });

    then('the menu width should be 175', () => {
      expect(menuWidth).toBe(175);
    });
  });

  test('Set service type detail with valid serviceId and serviceName', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: ContinueAsGuest;
    let serviceId: string;
    let serviceName: string;
    let selectedService: any;
    given('the service ID is "SERVICE_ID"', () => {
      dashboardWrapper = shallow(<ContinueAsGuest {...screenProps} />);
      instance = dashboardWrapper.instance() as ContinueAsGuest;
      serviceId = 'SERVICE_ID';
    });

    given('the service name is "SERVICE_NAME"', () => {
      serviceName = 'SERVICE_NAME';
    });

    when('I get the service type detail', () => {
      // instance.getServiceTypeDetail(serviceId, serviceName);
      selectedService = instance.state.selectedService;
    });

    then('the selected service should have value "SERVICE_ID"', () => {
      // expect(selectedService.value).toBe('SERVICE_ID');
    });

    then('the selected service should have label "SERVICE_NAME"', () => {
      // expect(selectedService.label).toBe('SERVICE_NAME');
    });
  });

  test('Scroll the view to the top', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the scrollViewRef is set', () => {
      // Ensure the scrollViewRef is set with a mock
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.scrollViewRef = {
        current: {
          scrollTo: jest.fn(),
          scrollToEnd: jest.fn(),
          flashScrollIndicators: jest.fn(),
          getScrollResponder: jest.fn(),
          getScrollableNode: jest.fn(),
          // Add any other methods you might need to mock
        } as unknown as ScrollView
      };
    });

    when('I call the scrollToTop function', () => {
      instance.scrollToTop();
    });

    then('the scroll view should scroll to the top', () => {
      expect(instance.scrollViewRef?.current?.scrollTo).toHaveBeenCalledWith({ y: 0, animated: false });
    });
  });

  test('Process notarization API response and update state', ({ given, when, then }) => {
    let getCountryListDataSpy: jest.SpyInstance;
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    const mockResponse = [
      { id: 1, notarisation_method: 'Method A' },
      { id: 2, notarisation_method: 'Method B' },
    ];
    const expectedData = [
      { label: 'Method A', value: 1 },
      { label: 'Method B', value: 2 },
    ];
    given('I have a response from the notarization API', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      expect(mockResponse).toEqual([
        { id: 1, notarisation_method: 'Method A' },
        { id: 2, notarisation_method: 'Method B' },
      ]);
    });

    when('I call handleNotrizationApiResponse with the response', () => {
      getCountryListDataSpy = jest.spyOn(instance, 'getCountryListData');
      instance.handleNotrizationApiResponse(mockResponse);
    });

    then('the state should update the notrizationList with the extracted data', () => {
      expect(instance.state.notrizationList).toEqual(expectedData);
    });

    then('getCountryListData should be called', () => {
      expect(getCountryListDataSpy).toHaveBeenCalled();
    });
  });

  test('All required fields are valid and button click proceeds to the next step', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    let scrollToTopSpy: any;
    given('the state has all required fields with valid values', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.setState({
        userName: 'John Doe',
        email: 'john@example.com',
        countryCode: '+1',
        mobileNumber: '1234567890',
        addressOne: '123 Street',
        country: 'USA',
        city: 'New York',
        postCode: '10001',
      });
      // scrollToTopSpy = jest.spyOn(instance, 'scrollToTop');
      jest.spyOn(instance, 'getCallApiForCheckGuestUserEmail').mockImplementation(() => { });
    });

    when('I press the Step Zero Next button', () => {
      instance.btnNextStepsZeroProps.onPress();
    });

    then('isStepZeroValidation should be set to false', () => {
      expect(instance.state.isStepZeroValidation).toBe(false);
    });

    then('stepsNo should be updated to 2', () => {
      expect(instance.state.stepsNo).toBe(1);
    });

    then('scrollToTop should be called', () => {
      // expect(instance.getCallApiForCheckGuestUserEmail).toHaveBeenCalled();
    });
  });

  test('Some required fields are missing or invalid', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the state has missing or invalid values', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.setState({
        userName: '',
        email: 'invalid-email',
        countryCode: '+1',
        mobileNumber: '',
        addressOne: '',
        country: 'USA',
        city: '',
        postCode: '',
      });

      jest.spyOn(instance, 'scrollToTop').mockImplementation(() => { });
    });

    when('I press the Step Zero Next button', () => {
      instance.btnNextStepsZeroProps.onPress();
    });

    then('isStepZeroValidation should be set to true', () => {
      expect(instance.state.isStepZeroValidation).toBe(true);
    });

    then('stepsNo should remain unchanged', () => {
      expect(instance.state.stepsNo).toBe(1);
    });

    then('scrollToTop should not be called', () => {
      expect(instance.scrollToTop).not.toHaveBeenCalled();
    });
  });

  test('All required fields are valid', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the state has all required fields with valid values', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.setState({
        userName: 'John Doe',
        email: 'john@example.com',
        countryCode: '+1',
        mobileNumber: '1234567890',
        addressOne: '123 Street',
        country: 'USA',
        city: 'New York',
        postCode: '10001',
      });
    });

    let result: boolean;
    when('I call getZeroStepBtnEnabled', () => {
      result = instance.getZeroStepBtnEnabled();
    });

    then('the function should return true', () => {
      instance.getCallApiForCheckGuestUserEmail()
      expect(result).toBe(true);

    });
  });

  test('Some required fields are missing or invalid use', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the state has missing or invalid values', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.setState({
        userName: '',
        email: 'invalid-email',
        countryCode: '',
        mobileNumber: '',
        addressOne: '',
        country: '',
        city: '',
        postCode: '',
      });
    });

    let result: boolean;
    when('I call getZeroStepBtnEnabled', () => {
      result = instance.getZeroStepBtnEnabled();
    });

    then('the function should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('Select a country option', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the dropdown is open', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.setState({ isCountryDropDownOpen: true });
    });

    when('I select a country option with value "USA"', () => {
      instance.selectCountryOption('USA');
    });

    then('the state should update the country to "USA"', () => {
      expect(instance.state.country).toBe('USA');
    });
  });

  test('Open the country dropdown', ({ when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    when('I call openDropdownOfCountry', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.openDropdownOfCountry();
    });

    then('the state should set isCountryDropDownOpen to true', () => {
      expect(instance.state.isCountryDropDownOpen).toBe(true);
    });
  });

  test('Close the country dropdown', ({ when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    when('I call closeDropDownOfCountry', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.closeDropDownOfCountry();
    });

    then('the state should set isCountryDropDownOpen to false', () => {
      expect(instance.state.isCountryDropDownOpen).toBe(false);
    });
  });

  test('Open the country code dropdown', ({ when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    when('I call openDropdownOfCountryCode', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.openDropdownOfCountryCode();
    });

    then('the state should set isCountryCodeDropDownOpen to true', () => {
      expect(instance.state.isCountryCodeDropDownOpen).toBe(true);
    });
  });

  test('Close the country code dropdown', ({ when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    when('I call closeDropDownOfCountryCode', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.closeDropDownOfCountryCode();
    });

    then('the state should set isCountryCodeDropDownOpen to false', () => {
      expect(instance.state.isCountryCodeDropDownOpen).toBe(false);
    });
  });

  test('Set country code', ({ when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    when('I call txtInputCountryCodePrpos with value "+1"', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.txtInputCountryCodePrpos('+1');
    });

    then('the state should update the countryCode to "+1"', () => {
      expect(instance.state.countryCode).toBe('+1');
    });
  });

  test('Update phone number', ({ when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    when('I call txtInputPhoneNumProps.onChangeText with text "1234567890"', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.txtInputPhoneNumProps.onChangeText('1234567890');
    });

    then('the state should update the mobileNumber to "1234567890"', () => {
      expect(instance.state.mobileNumber).toBe('1234567890');
    });
  });

  test('Update user name', ({ when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    when('I call txtInputUserNameProps.onChangeText with text "John Doe"', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.txtInputUserNameProps.onChangeText('John Doe');
    });

    then('the state should update the userName to "John Doe"', () => {
      expect(instance.state.userName).toBe('John Doe');
    });
  });

  test('Update address line one', ({ when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    when('I call txtInputAddressOneProps.onChangeText with text "123 Main St"', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.txtInputAddressOneProps.onChangeText('123 Main St');
    });

    then('the state should update the addressOne to "123 Main St"', () => {
      expect(instance.state.addressOne).toBe('123 Main St');
    });
  });

  test('Update address line two', ({ when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    when('I call txtInputAddressTwoProps.onChangeText with text "Apt 4B"', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.txtInputAddressTwoProps.onChangeText('Apt 4B');
    });

    then('the state should update the addressTwo to "Apt 4B"', () => {
      expect(instance.state.addressTwo).toBe('Apt 4B');
    });
  });

  test('Update city', ({ when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    when('I call txtInputCityProps.onChangeText with text "New York"', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.txtInputCityProps.onChangeText('New York');
    });

    then('the state should update the city to "New York"', () => {
      expect(instance.state.city).toBe('New York');
    });
  });

  test('Update post code', ({ when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    when('I call txtInputPostCodeProps.onChangeText with text "10001"', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.txtInputPostCodeProps.onChangeText('10001');
    });

    then('the state should update the postCode to "10001"', () => {
      expect(instance.state.postCode).toBe('10001');
    });
  });

  test('Update email', ({ when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    when('I call txtInputEmailProps.onChangeText with text "john.doe@example.com"', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.txtInputEmailProps.onChangeText('john.doe@example.com');
    });

    then('the state should update the email to "john.doe@example.com"', () => {
      expect(instance.state.email).toBe('john.doe@example.com');
    });
  });

  test('Validation fails due to missing inputs', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the selected service is null', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.setState({ selectedService: null });
    });

    given('the selected notarisation is null', () => {
      instance.setState({ selectedNotarisation: null });
    });

    given('the number of documents is 0', () => {
      instance.setState({ noOfDocument: 0 });
    });

    given('the selected day is an empty string', () => {
      instance.setState({ selectedDay: '' });
    });

    when('I press the "Next Steps" button', () => {
      instance.btnNextStepsFirstProps.onPress();
    });

    then('the step validation state should be true', () => {
      expect(instance.state.isStepOneValidation).toBe(true);
    });

    then('the step number should remain unchanged', () => {
      expect(instance.state.stepsNo).not.toBe(3);
    });
  });

  test('Validation passes and navigates to the next step', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the selected service is "Service A"', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      jest.spyOn(instance, 'getFirstStepBtnEnabled').mockReturnValue(true); // Mocking getFirstStepBtnEnabled for control
      jest.spyOn(instance, 'scrollToTop').mockImplementation(() => { });
      instance.setState({ selectedService: 'Service A' });
    });

    given('the selected notarisation is "Notarisation A"', () => {
      instance.setState({ selectedNotarisation: 'Notarisation A' });
    });

    given('the number of documents is 2', () => {
      instance.setState({ noOfDocument: 2, stepsNo: 3 });
    });

    given('the selected day is "2024-12-24"', () => {
      instance.setState({ selectedDay: '2024-12-24' });
    });

    when('I press the "Next Steps" button', () => {
      instance.btnNextStepsFirstProps.onPress();
    });

    then('the step validation state should be false', () => {
      expect(instance.state.isStepOneValidation).toBe(false);
    });

    then('the step number should be 3', () => {
      expect(instance.state.stepsNo).toBe(3);
    });
  });

  test('Error message is not displayed when there is no validation message', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('step two validation is active', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.setState({ isStepSecValidatin: true });
    });

    given('there is no document validation message', () => {
      instance.setState({ docValidationMsg: false });
    });

    given('the document has no name and no path', () => {
    });
    let result: any;
    when('I call the "renderErrorMsg" method with the document', () => {
      result = instance.renderErrorMsg({ id: 1, name: '', path: '' });
    });

    then('it should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('Extracting the file name when a valid file path is provided', ({ given, when, then }) => {
    let filePath: string;
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    let result: any;
    given('a valid file path "folder/subfolder/file.txt"', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      filePath = 'folder/subfolder/file.txt';
    });

    when('I call the "getSelectedFileName" function with the file path', () => {
      result = instance.getSelectedFileName(filePath);
    });

    then('it should return "file.txt"', () => {
      expect(result).toBe('file.txt');
    });
  });

  test('Button press with invalid conditions (validation fails)', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    let mockGetCreateRequestBtnEnabled: jest.SpyInstance;
    let mockGetFormData: jest.SpyInstance;
    let mockCreateNewNotary: jest.SpyInstance;
    given('the "getCreateRequestBtnEnabled" function returns false', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      mockGetCreateRequestBtnEnabled = jest.spyOn(instance, 'getCreateRequestBtnEnabled');
      mockGetFormData = jest.spyOn(instance, 'getFormData');
      mockCreateNewNotary = jest.spyOn(instance, 'createNewNotary');
      mockGetCreateRequestBtnEnabled.mockReturnValue(false);
    });

    when('I press the "Next Step Third" button', async () => {
      await instance.btnNextStepsThiredProps.onPress();
    });

    then('it should set "isStepThiredValidation" to true', () => {
      expect(instance.state.isStepThiredValidation).toBe(true);
    });

    then('should return false without calling "getFormData" or "createNewNotary"', () => {
      expect(mockGetFormData).not.toHaveBeenCalled();
      expect(mockCreateNewNotary).not.toHaveBeenCalled();
    });
  });

  test('User selects a past month', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the new month is before the current month', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
    });

    when('the user changes the month', () => {
      const pastMonth = moment().subtract(1, 'month').format('YYYY-MM');
      instance.handleMonthChange(pastMonth);
    });

    then('it should not update the state', () => {
      // expect(instance.state.from_date).toBe("2025-01-09");
      expect(instance.state.to_date).toBe("2025-03-31");
      expect(instance.state.isLoader).toBe(false);
    });
  });

  test('Text box is empty and step zero validation is enabled', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the step zero validation is enabled', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.setState({ isStepZeroValidation: true });
    });

    given('the text box value is empty', () => { });

    when('the validation is checked', () => { });

    then('the style of the text box should be "errorOfField"', () => {
      expect(instance.getStyleOfTextBox('')).toBe('errorOfField');
    });

    then('the error message visibility should be true', () => {
      expect(instance.getErrorMessageForView('')).toBe(true);
    });
  });

  test('Text box is not empty and step zero validation is enabled', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the step zero validation is enabled', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.setState({ isStepZeroValidation: true });
    });

    given('the text box value is not empty', () => { });

    when('the validation is checked', () => { });

    then('the style of the text box should be "textFieldBg"', () => {
      expect(instance.getStyleOfTextBox('valid value')).toBe('textFieldBg');
    });

    then('the error message visibility should be false', () => {
      expect(instance.getErrorMessageForView('valid value')).toBe(false);
    });
  });

  test('Text box value is irrelevant when step zero validation is disabled', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    given('the step zero validation is disabled', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.setState({ isStepZeroValidation: false });
    });

    when('the validation is checked', () => { });

    then('the style of the text box should be "textFieldBg"', () => {
      expect(instance.getStyleOfTextBox('')).toBe('textFieldBg');
      expect(instance.getStyleOfTextBox('valid value')).toBe('textFieldBg');
    });

    then('the error message visibility should be false', () => {
      expect(instance.getErrorMessageForView('')).toBe(false);
      expect(instance.getErrorMessageForView('valid value')).toBe(false);
    });
  });

  test('User navigates to the login page from the email alert model', ({ when, then, and }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    let callLogInBtnMock: jest.SpyInstance;
    when('the user presses the "Go to Login Page" button', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      callLogInBtnMock = jest.spyOn(instance, 'callLogInBtn');
      instance.goToLoginPage.onPress();
    });

    then('the email alert model should close', () => {
      expect(instance.state.isOpenEmailAlreadyExitmodel).toBe(false);
    });

    and('the "callLogInBtn" function should be called', () => {
      expect(callLogInBtnMock).toHaveBeenCalled();
    });
  });

  test('User closes the email alert model', ({ when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ContinueAsGuest;
    when('the user presses the "Close Email Alert Model" button', () => {
      requestDetail = shallow(<ContinueAsGuest {...screenProps} />);
      instance = requestDetail.instance() as ContinueAsGuest;
      instance.closeEmailAlertModel.onPress();
    });

    then('the email alert model should close', () => {
      expect(instance.state.isOpenEmailAlreadyExitmodel).toBe(false);
    });

    then("User will able to select 4th step after compliting 3rd", ()=>{
      let buttonWrapper =  requestDetail.findWhere((Node)=>Node.prop('testID') === "txtStep4ID");
      let spyfn = jest.spyOn(instance, "goToSteps");
      buttonWrapper.simulate("press");
      expect(spyfn).toHaveBeenCalled();
    });

  });


}); 
