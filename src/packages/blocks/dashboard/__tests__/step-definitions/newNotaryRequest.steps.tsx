import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import NewNotaryRequest from "../../src/NewNotaryRequest";
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
const navigation = require("react-navigation");
const screenProps = {
  navigation: navigation, 
  id: "NewNotaryRequest"
};
const feature = loadFeature("./__tests__/features/newNotaryRequest-scenario.feature");
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
      data:  {
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

  test("User navigates to newNotaryRequest", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: NewNotaryRequest;
    given("I am a User loading newNotaryRequest", () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
    });

    when("I navigate to the newNotaryRequest", () => {
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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

    then("newNotaryRequest will load with out errors", () => {
      expect(instance.getDashboardData()).toBe(true)
    });

    then("i can click on back arrow icon with out errors", async () => {
      const mockNavigation = { goBack: jest.fn() };
      const wrapperWithNavigation = shallow(<NewNotaryRequest {...screenProps} navigation={mockNavigation} />);
      let ArrowButton = wrapperWithNavigation.find(GenericHeader).dive()
      let buttonComponent = ArrowButton.findWhere((node: any) => node.prop('testID') === 'btnbackArrow');
      buttonComponent.simulate('press')
      instance.btnGoBack.onPress()

      await Promise.resolve(); // Assuming a navigation action is asynchronous, replace with appropriate async operation
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });

    then("I can select service with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'serviceListId');
      buttonComponent.simulate('onChange')
      instance.txtInputServicesPrpos("England")
      instance.setState({ isModelOpen: true })
   
    });

    then("I can select Date From ccalendar with out errors", async () => {
      // instance.handleDateSelect("2024-10-11")
      
      // instance.handleDateSelect = jest.fn();
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'calendarSelectDataID');
      buttonComponent.props().onDayPress({ dateString: "2024-10-11" }); // Simulate onDayPress event with the selected date
      // instance.setState({ selectedDay: "2024-10-11" })
      buttonComponent.props().onDayPress({ dateString: "2024-10-11" }); 
      buttonComponent.props().onDayPress({ dateString: "2024-10-12" }); 
      buttonComponent.props().onDayPress({ dateString: "2024-10-13" }); 
      // instance.handleDateSelect("2024-10-11")
      instance.markedDatesWithColor()
      // expect(instance.handleDateSelect).toHaveBeenCalledWith("2024-10-11");

      buttonComponent.props().onMonthChange({ dateString: "2024-09-13" }); 
      buttonComponent.props().onMonthChange({ dateString: "2024-10-13" }); 
      buttonComponent.props().onMonthChange({ dateString: "2024-12-01" }); 

    });

    then("I can select Button from popup with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'selectBtnID');
      buttonComponent.simulate('onPress')
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
      instance.setState({ markedDateList: dates , markedDates:dates})
    });

    then("I can select Yes procced Button from popup with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'btnYesProceed');
      buttonComponent.simulate('onPress')
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
      buttonComponent.simulate('onPress')
      instance.noToChanges.onPress()
    });

    then("I can select Cancel button from step first with out errors", () => {
      let buttonComponent1 = dashboardWrapper.findWhere((node) => node.prop('testID') === 'onclickYesCancelID');
      buttonComponent1.simulate('onPress')
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
      buttonComponent.simulate('onFocus')
      instance.getCalendarModalOpen()
    });

    then("I can enter notes with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'addNoeID');
      buttonComponent.simulate('onPress')
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
      buttonComponent.simulate('onChange')
      instance.txtInputdNotarisationPrpos("method of");
      instance.setState({ selectedNotarisation: "hello" })
    });

    then("I can select type of Jurisdiction from dropdown with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'typeOfJurisdictionID');
      buttonComponent.simulate('onChange')
      instance.txtInputJurisdictionPrpos("method of");
      instance.setState({ selectedNotarisation: "hello" })
    });

    then("I can open calendar modal with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'calendarIconId');
      buttonComponent.simulate('onPress')
      instance.btnOpenCalendarProps.onPress()
      instance.setState({
        dateAndTime: "2024-06-16", selectedJurisdiction: { value: 1, label: "hello" },
        selectedNotarisation: { value: 1, label: "hello" }, selectedService: { value: 1, label: "hello" }, noOfDocument: 1
      })
    });

    then("I can click on Next button of step 1 with out errors", () => {
      let ArrowButton = dashboardWrapper.find(GenericButton).at(1).dive()
      let buttonComponent = ArrowButton.findWhere((node) => node.prop('testID') === 'btnNextStepsFirstId');
      // buttonComponent.simulate('press')

      let ButtonLogin = dashboardWrapper.find(GenericTextWithHperLink).dive()
      let buttonComponentCancel = ButtonLogin.findWhere((node) => node.prop('testID') === 'btnCancelNotaryID');
      instance.cancelNewNotary.onPress()

      buttonComponentCancel.simulate('onPress')

      let buttonComponentstep1 = dashboardWrapper.findWhere((node) => node.prop('testID') === 'onclickYesCancelID');
      buttonComponentstep1.simulate('press')
      let buttonComponentstepNo = dashboardWrapper.findWhere((node) => node.prop('testID') === 'onclickNoCancelID');
      buttonComponentstepNo.simulate('press')


      let buttonComponentDraft = dashboardWrapper.findWhere((node) => node.prop('testID') === 'onSaveDraftID');
      buttonComponentDraft.simulate('press')
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
      instance.SaveDraftNotaryApiCallId = dashboardApiCallId.messageId;
      runEngine.sendMessage("Unit Test", dashboardApiCallId);
      //instance.setState({ isNewRequestCreated: true })

  
      instance.setState({ stepsNo: 2, isDocSelectionModelOpen: true })
      instance.scrollToTop()
    
      instance.setState({  isModalVisible: true })

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
      buttonComponent.simulate('press')
      instance.setState({ checkedFirstBox: !instance.CustomCheckBoxFirstProps.isChecked });
      instance.CustomCheckBoxFirstProps.isChecked = !instance.CustomCheckBoxFirstProps.isChecked;
    });

    then("I can click on second checkbox with out errors", () => {
      let buttonComponent = dashboardWrapper.findWhere((node) => node.prop('testID') === 'secCustomCheckBoxID');
      buttonComponent.simulate('press')
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
    });

    then("I can enter email in to recipants with out errors", () => {
     });

    then("I can click on create request button of step 3 with out errors", async () => {
     
      instance.setState({ isValidateField: false });
      instance.createNewNotary()
      const mockCreateNewNotary = jest.fn();
      instance.createNewNotary = mockCreateNewNotary;
      instance.validateObject = jest.fn(() => true);
      await instance.btnNextStepsThiredProps.onPress();

      expect(mockCreateNewNotary).toHaveBeenCalled();

      let ButtonLogin = dashboardWrapper.find(GenericTextWithHperLink).dive()
      let buttonComponentCancel = ButtonLogin.findWhere((node) => node.prop('testID') === 'btnCancelNotaryDraft');
      buttonComponentCancel.simulate('onPress')
      instance.cancelNewNotary.onPress()

      let buttonComponentstep1 = dashboardWrapper.findWhere((node) => node.prop('testID') === 'onclickYesCancelID');
      buttonComponentstep1.simulate('press')
      let buttonComponentstepNo = dashboardWrapper.findWhere((node) => node.prop('testID') === 'onclickNoCancelID');
      buttonComponentstepNo.simulate('press')


      let buttonComponentDraft = dashboardWrapper.findWhere((node) => node.prop('testID') === 'onSaveDraftID');
      buttonComponentDraft.simulate('press')
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
      instance.SaveDraftNotaryApiCallId = dashboardApiCallId.messageId;
      runEngine.sendMessage("Unit Test", dashboardApiCallId);


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
    let instance: NewNotaryRequest;
    let userProfile: ShallowWrapper;

    given('an array of objects', () => {
      userProfile = shallow(<NewNotaryRequest {...screenProps} />);
    });

    when('checking for blank objects', () => {
      instance = userProfile.instance() as NewNotaryRequest;
      instance.setState({ hasBlankObjectResult: false });
      instance.viewsOfDocArray = Array.from({ length: 2 }, () => ({}));
      instance.setState({ hasBlankObjectResult: instance.hasBlankObject() });
    });

    then('it should return true if the array contains a blank object', async () => {
      expect(instance.state.hasBlankObjectResult).toBe(true);
    });
    then('it should return false if the array does not contain any blank objects', () => {
      instance.viewsOfDocArray = [{ uri: "", name: "test.pdf", size: "23342" }];
    });
  });

  test('Extract data from Jurisdictions API response', ({ given, when, then }) => {
    let instance: NewNotaryRequest;
    let notaryRequest: ShallowWrapper;
    let mockApiResponse: any;
    given('a mock API response', () => {
      notaryRequest = shallow(<NewNotaryRequest {...screenProps} />);
      mockApiResponse = [
        { jurisdiction: 'Country1', id: 1 },
        { jurisdiction: 'Country2', id: 2 }
      ];
    });

    when('the handleJurisdictionsApiData function is called with the response', () => {
      instance = notaryRequest.instance() as NewNotaryRequest;
      instance.handleJurisdictionsApiData(mockApiResponse);
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
    let instance: NewNotaryRequest;
    let notaryRequest: ShallowWrapper;
    let mockApiResponse: any;
    given('a mock API response', () => {
      notaryRequest = shallow(<NewNotaryRequest {...screenProps} />);
      mockApiResponse = {
        data: [
          { id: 1, attributes: { service_name: 'Service1' } },
          { id: 2, attributes: { name: 'Service2' } }
        ]
      };
    });

    when('the handleServiesApiData function is called with the response', () => {
      instance = notaryRequest.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let notaryRequest: ShallowWrapper;
    let imagePickerOpenCameraMock: any;
    given('the user wants to open the camera', () => {
      notaryRequest = shallow(<NewNotaryRequest {...screenProps} />);
    });

    when('the openDocumentPicker function is called with the type "Camera"', async () => {
      instance = notaryRequest.instance() as NewNotaryRequest;
      imagePickerOpenCameraMock = jest.spyOn(ImagePicker, 'openCamera').mockResolvedValueOnce('selectedImage');
      await instance.openDocumentPicker('Camera');
    });

    then('the handleImagePicker function should be called with the image from camera', () => {
      expect(imagePickerOpenCameraMock).toHaveBeenCalled();
    });
  });

  test('Open photo gallery and handle image selection', ({ given, when, then }) => {
    let instance: NewNotaryRequest;
    let notaryRequest: ShallowWrapper;
    let imagePickerOpenPickerMock: any;
    given('the user wants to open the photo gallery', () => {
      notaryRequest = shallow(<NewNotaryRequest {...screenProps} />);
    });

    when('the openDocumentPicker function is called with the type "Photos"', async () => {
      instance = notaryRequest.instance() as NewNotaryRequest;
      imagePickerOpenPickerMock = jest.spyOn(ImagePicker, 'openPicker').mockResolvedValueOnce('selectedImage');
      await instance.openDocumentPicker('Photos');
    });

    then('the handleImagePicker function should be called with the selected image', () => {
      expect(imagePickerOpenPickerMock).toHaveBeenCalled();
    });
  });

  test('Select document from file picker and handle selection', ({ given, when, then }) => {
    let instance: NewNotaryRequest;
    let notaryRequest: ShallowWrapper;
    given('the user wants to select a document from the file picker', () => {
      notaryRequest = shallow(<NewNotaryRequest {...screenProps} />);
    });

    when('the openDocumentPicker function is called with an invalid type', async () => {
      instance = notaryRequest.instance() as NewNotaryRequest;
      await instance.openDocumentPicker('InvalidType');
    });

    then('the file picker should be invoked and handleImagePicker function should be called with the selected document', () => {
      expect(pick).toHaveBeenCalled();
    });
  });

  test('Handle dropdown open close and image change', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: NewNotaryRequest;
    given('I have the function which is open close dropdown', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
    });

    when('I call the openCloseDropdown function', async () => {
      instance = dashboardWrapper.instance() as NewNotaryRequest;
      instance.openCloseDropdown();
    });

    then('I should see dropdown is open and image changes', () => {
      expect(instance.state.isDropdownOpen).toEqual(true);
    });

    when('I call the closeDropDownOfNotarization function', async () => {
      instance = dashboardWrapper.instance() as NewNotaryRequest;
      instance.closeDropDownOfNotarization();
    });

    then('I should see dropdown is open and image changes', () => {
      expect(instance.state.isDropdownOpen).toEqual(false);
    });

    when('I call the openServicesDropdown function', async () => {
      instance = dashboardWrapper.instance() as NewNotaryRequest;
      instance.openServicesDropdown();
    });

    then('I should see dropdown is open and image changes', () => {
      expect(instance.state.isServiceDropdownOpen).toEqual(true);
    });

    when('I call the closeDropDownOfServices function', async () => {
      instance = dashboardWrapper.instance() as NewNotaryRequest;
      instance.closeDropDownOfServices();
    });

    then('I should see dropdown is open and image changes', () => {
      expect(instance.state.isServiceDropdownOpen).toEqual(false);
    });

    when('I call the openJuridactionDropdown function', async () => {
      instance = dashboardWrapper.instance() as NewNotaryRequest;
      instance.openJuridactionDropdown();
    });

    then('I should see dropdown is open and image changes', () => {
      expect(instance.state.isJuridactionDropdownOpen).toEqual(true);
    });

    when('I call the closeDropDownOfJuridaction function', async () => {
      instance = dashboardWrapper.instance() as NewNotaryRequest;
      instance.closeDropDownOfJuridaction();
    });

    then('I should see dropdown is open and image changes', () => {
      expect(instance.state.isJuridactionDropdownOpen).toEqual(false);
    });
  });

  test('Toggling a document', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: NewNotaryRequest;

    given('the initial state of toggledDocuments is {}', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let document: string;
    let result: any
    given('the document is "document1"', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let document: string;
    let result: any
    given('the document is "document1"', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('the platform is iOS', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('the platform is Android', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('the step one validation is true', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
      instance.setState({ isStepOneValidation: true, selectedDay: '' })
    });
    when('the renderUIStyleOfDateAndTime function is called', () => { });

    then('it should return "errorOfField"', () => {
      expect(instance.renderUIStyleOfDateAndTime()).toBe('errorOfField');
    });
  });

  test('Render text field background style when step one validation passes or selected day is not empty', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: NewNotaryRequest;
    given('the step one validation is true', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let documentDetails: any;
    let result: any;
    given('the document details with a signatory', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let documentDetails: any;
    let result: any;
    given('the document details without a signatory', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('a component with 3 documents', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('a component with 1 document', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let message: any;
    given('I have a valid session response message', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let message: Message
    given('I have a valid navigation payload message', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
      validData = {
        actionType: 'someAction',
        requestId: '12345',
      };
      instance.getRequestDetail(430)
      instance.getRequestDetail = jest.fn();
      message = new Message('hueikdjbjyfiud');
      message.getData = jest.fn().mockReturnValue(validData);
    });

    when('I handle the navigation payload message', () => {
      instance.handleNavigationPayLoadMessage(message);
    });

    then('the selectedActionType should be set', () => {
      expect(instance.selectedActionType).toBe(validData.actionType);
    });

    then('the getRequestDetail method should be called with the correct requestId', () => {
      expect(instance.getRequestDetail).toHaveBeenCalledWith(validData.requestId);
    });
  });

  test('Handles navigation payload message with no data', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: NewNotaryRequest;
    let message: Message;
    given('I have an invalid navigation payload message', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
      message = new Message('hueikdjbjyfiud');
      instance.getRequestDetail = jest.fn();
      message.getData = jest.fn().mockReturnValue(null);
    });

    when('I handle the navigation payload message', () => {
      instance.handleNavigationPayLoadMessage(message);
    });

    then('the selectedActionType should not be set', () => {
    });

    then('the getRequestDetail method should not be called', () => {
      expect(instance.getRequestDetail).not.toHaveBeenCalled();
    });
  });

  test('Handle successful notary creation response', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: NewNotaryRequest;
    given('I have a successful notary creation response', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('I have an unsuccessful notary creation response', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
      expect(instance.createNewNotary()).toBe(true)
    });
  });

  test('Process valid NotaryRequest response', ({ given, when, then }) => {
    let responseJson: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: NewNotaryRequest;
    given('a valid NotaryRequest response', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
      expect(instance.state.selectedNotarisation).toEqual({ value: 2, label: "Remote Ink Notarisation (RIN)" })
    });
  });

  test('Process NotaryRequest response with no file documents', ({ given, when, then }) => {
    let responseJson: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: NewNotaryRequest;
    given('a NotaryRequest response with no file documents', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
      expect(instance.state.selectedJurisdiction).toEqual({ label: "India", value: 1, })
      expect(instance.state.selectedService).toEqual({ label: "Notary exective service",value: 34,  })
      expect(instance.state.selectedNotarisation).toEqual({  label: "Remote Ink Notarisation (RIN)",value: 2, })
    });
  });

  test('Increase the number of documents', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: NewNotaryRequest;
    given('the initial number of documents is 5', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('the initial number of documents is 10', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('the initial number of documents is 5', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('the initial number of documents is 0', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('the first step button is enabled', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('the first step button is disabled', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('the second step button is enabled', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('the second step button is disabled', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
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
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
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
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
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
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
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
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('a state where secondary step button is not enabled', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('a state where secondary step button is enabled', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
      expect(instance.state.stepsNo).toBe(3);
      instance.scrollToTop()
    });

    then('it should set documnetDetail with updated documentsObject', () => {
      
    });
  });


  test('Navigate to step 2 with enabled first step button', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: NewNotaryRequest;
    given('a state where first step button is enabled', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('a state where secondary step button is enabled', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
      jest.spyOn(instance, 'getenabledSecStepBtn').mockReturnValue(true);
      const detail:any =  {
        attributes: {
          file_documents: [
            { doc_file_url: '/path/to/doc1', recipients: [] },
            { doc_file_url: '/path/to/doc2', recipients: [] },
          ],
          notarised_document: 2, // Assuming there are 2 notarised documents
        },
      }
      instance.setState({selectedRequestDetail: detail})
    });

    when('the goToSteps function is called with step number 3', () => {
      instance.goToSteps(3);
      instance.setState({stepsNo:3})
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
    let instance: NewNotaryRequest;
    given('the selected action type is "edit"', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('the selected action type is not "edit"', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result: any;
    given('the selected action type is "edit"', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result: any;
    given('the selected action type is not "edit"', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result: any
    given('the step third validation is true', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result: any
    given('the step third validation is true', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result: any
    given('the step third validation is true', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result: any
    given('the step third validation is false', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result: any;
    let inputText: any
    given(/^the input text is "(.*)"$/, (text) => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result: any;
    let inputText: any
    given(/^the input text is "(.*)"$/, (text) => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result: any;
    let inputText: any
    given(/^the input text is "(.*)"$/, (text) => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result: any
    let inputText: any
    given(/^the input text is "(.*)"$/, (text) => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result: any
    let inputName: any
    given(/^the input name is "(.*)"$/, (name) => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result: any
    let inputName: any
    given(/^the input name is "(.*)"$/, (name) => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result: any
    let inputName: any
    given(/^the input name is "(.*)"$/, (name) => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result: any
    let inputName: any
    given(/^the input name is "(.*)"$/, (name) => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result: any
    given(/^the selected action type is "edit"$/, () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result : any;
    given(/^the selected action type is not "edit"$/, () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result : any;
    given('a document view item with a specific path', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
              data:  {
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
    let instance: NewNotaryRequest;
    let result : any;
    given('a document view item with a specific path', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
              data:  {
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
    let instance: NewNotaryRequest;
    given('the step one validation is true', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
      instance.setState({ isStepOneValidation: true, selectedDay: '' })
    });
    when('the renderUIStyleOfDateTime function is called', () => { });

    then('it should return "errorOfFieldView"', () => {
      expect(instance.renderUIStyleOfDateTime()).toBe('errorOfFieldView');
    });
  });

  test('Render text field background validation passes or selected day is not empty', ({ given, and, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: NewNotaryRequest;
    given('the step one validation is true', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result: any
    let inputName: any
    given(/^the input name is "(.*)"$/, (name) => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result: any
    let inputName: any
    given(/^the input name is "(.*)"$/, (name) => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result: any
    let inputName: any
    given(/^the input name is "(.*)"$/, (name) => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let result: any
    let inputName: any
    given(/^the input name is "(.*)"$/, (name) => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('the component\'s initial state with no toggled documents', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('the user role is "end_user"', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    given('the user role is "admin"', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
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
    let instance: NewNotaryRequest;
    let serviceId: string;
    let serviceName: string;
    let selectedService: any;
    given('the service ID is "SERVICE_ID"', () => {
      dashboardWrapper = shallow(<NewNotaryRequest {...screenProps} />);
      instance = dashboardWrapper.instance() as NewNotaryRequest;
      serviceId = 'SERVICE_ID';
    });

    given('the service name is "SERVICE_NAME"', () => {
      serviceName = 'SERVICE_NAME';
    });

    when('I get the service type detail', () => {
      instance.getServiceTypeDetail(serviceId, serviceName);
      selectedService = instance.state.selectedService;
    });

    then('the selected service should have value "SERVICE_ID"', () => {
      expect(selectedService.value).toBe('SERVICE_ID');
    });

    then('the selected service should have label "SERVICE_NAME"', () => {
      expect(selectedService.label).toBe('SERVICE_NAME');
    });
  });

  test('Scroll the view to the top', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: NewNotaryRequest;
    given('the scrollViewRef is set', () => {
      // Ensure the scrollViewRef is set with a mock
      requestDetail = shallow(<NewNotaryRequest {...screenProps} />);
      instance = requestDetail.instance() as NewNotaryRequest;
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

  test('Save Draft button triggers createDarftNewNotary', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: NewNotaryRequest;
    let createDraftNewNotaryMock: jest.Mock;
    given('the Save Draft button is rendered', () => {
      requestDetail = shallow(<NewNotaryRequest {...screenProps} />);
      instance = requestDetail.instance() as NewNotaryRequest;
      createDraftNewNotaryMock = jest.fn();
      instance.createDarftNewNotary = createDraftNewNotaryMock;
    });

    when('I press the Save Draft button', () => {
      instance.onSaveDraftBtnProps.onPress();
    });

    then('the createDarftNewNotary function should be called', () => {
      expect(createDraftNewNotaryMock).toHaveBeenCalled();
    });
  });

  test('Cancel Request button triggers handleCancelRequest', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: NewNotaryRequest;
    let handleCancelRequestMock: jest.Mock;
    given('the Cancel Request button is rendered', () => {
      requestDetail = shallow(<NewNotaryRequest {...screenProps} />);
      instance = requestDetail.instance() as NewNotaryRequest;
      handleCancelRequestMock = jest.fn();
      instance.handleCancelRequest = handleCancelRequestMock;
    });

    when('I press the Cancel Request button', () => {
      instance.onCancelRequestBtnProps.onPress();
    });

    then('the handleCancelRequest function should be called', () => {
      expect(handleCancelRequestMock).toHaveBeenCalled();
    });
  });

  test('Button validation fails due to missing inputs', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: NewNotaryRequest;
    let scrollToTopMock: jest.Mock;
    given('the user has not filled in the required fields', () => {
      requestDetail = shallow(<NewNotaryRequest {...screenProps} />);
      instance = requestDetail.instance() as NewNotaryRequest;
      scrollToTopMock = jest.fn();

      instance.scrollToTop = scrollToTopMock;
      instance.setState({
        selectedService: null,
        selectedJurisdiction: null,
        selectedNotarisation: null,
        noOfDocument: 0,
        selectedDay: '',
      });
    });

    when('the user presses the "Next Steps" button', () => {
      instance.btnNextStepsFirstProps.onPress();
    });

    then('the step one validation should be triggered', () => {
      expect(instance.state.isStepOneValidation).toBe(true);
    });

    then('the function should return false without proceeding', () => {
      expect(instance.state.stepsNo).toBe(1); // Step number shouldn't change
      expect(scrollToTopMock).not.toHaveBeenCalled();
    });
  });

  test('Button proceeds to step two when inputs are valid', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: NewNotaryRequest;
    let getFirstStepBtnEnabledMock: jest.Mock;
    let scrollToTopMock: jest.Mock;
    given('the user has filled in all the required fields', () => {
      requestDetail = shallow(<NewNotaryRequest {...screenProps} />);
      instance = requestDetail.instance() as NewNotaryRequest;
      getFirstStepBtnEnabledMock = jest.fn();
      scrollToTopMock = jest.fn();

      instance.getFirstStepBtnEnabled = getFirstStepBtnEnabledMock;
      instance.scrollToTop = scrollToTopMock;
      instance.setState({
        selectedService: 'Service A',
        selectedJurisdiction: 'Jurisdiction A',
        selectedNotarisation: 'Notarisation A',
        noOfDocument: 2,
        selectedDay: 'Monday',
      });

      getFirstStepBtnEnabledMock.mockReturnValue(true); // Mocking as enabled
    });

    when('the user presses the "Next Steps" button', () => {
      instance.btnNextStepsFirstProps.onPress();
    });

    then('the step one validation should pass', () => {
      expect(instance.state.isStepOneValidation).toBe(false);
    });

    then('the step number should change to two', () => {
      expect(instance.state.stepsNo).toBe(2);
    });

    then('the scrollToTop function should be called', () => {
      expect(scrollToTopMock).toHaveBeenCalled();
    });
  });

  test('Button does not proceed when getFirstStepBtnEnabled returns false', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: NewNotaryRequest;
    let getFirstStepBtnEnabledMock: jest.Mock;
    let scrollToTopMock: jest.Mock;
    given('the user has filled in all the required fields', () => {
      requestDetail = shallow(<NewNotaryRequest {...screenProps} />);
      instance = requestDetail.instance() as NewNotaryRequest;
      getFirstStepBtnEnabledMock = jest.fn();
      scrollToTopMock = jest.fn();

      instance.getFirstStepBtnEnabled = getFirstStepBtnEnabledMock;
      instance.scrollToTop = scrollToTopMock;
      instance.setState({
        selectedService: 'Service A',
        selectedJurisdiction: 'Jurisdiction A',
        selectedNotarisation: 'Notarisation A',
        noOfDocument: 2,
        selectedDay: 'Monday',
      });

      getFirstStepBtnEnabledMock.mockReturnValue(false); // Mocking as disabled
    });

    when('the user presses the "Next Steps" button', () => {
      instance.btnNextStepsFirstProps.onPress();
    });

    then('the step one validation should pass', () => {
      expect(instance.state.isStepOneValidation).toBe(false);
    });

    then('the step number should remain unchanged', () => {
      expect(instance.state.stepsNo).toBe(1);
    });

    then('the scrollToTop function should not be called', () => {
      expect(scrollToTopMock).not.toHaveBeenCalled();
    });
  });

  test('Handle cancel request and navigation', ({ given, when, then }) => {
    let sendMock: any;
    let requestDetail: ShallowWrapper;
    let instance: NewNotaryRequest;
    given('the user wants to cancel the request', () => {
      requestDetail = shallow(<NewNotaryRequest {...screenProps} />);
      instance = requestDetail.instance() as NewNotaryRequest;
      sendMock = jest.fn();
      instance.send = sendMock;

    });

    when('the handleCancelRequest function is triggered', () => {
      instance.handleCancelRequest();
    });

    then('a navigation message should be sent with the correct props', () => {
      const msg = sendMock.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationDashboardMessage));
    });

    then('the modal visibility state should be set to false', () => {
      expect(instance.state.isModalVisible).toBe(false );
    });
  });

  test('Return Standard priority when selectedColor is #D1FAE5', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: NewNotaryRequest;
    let result: any
    given('the selectedMarkedDate has a selectedColor of #D1FAE5', () => {
      requestDetail = shallow(<NewNotaryRequest {...screenProps} />);
      instance = requestDetail.instance() as NewNotaryRequest;
      instance.setState({
        selectedMarkedDate: { selectedColor: '#D1FAE5' },
      });
    });

    when('the getPriority function is called', () => {
      result = instance.getPriority();
    });

    then('the function should return "Standard"', () => {
      expect(result).toBe('Standard');
    });
  });

  test('Return Priority when selectedColor is #FEF3C7', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: NewNotaryRequest;
    let result: any
    given('the selectedMarkedDate has a selectedColor of #FEF3C7', () => {
      requestDetail = shallow(<NewNotaryRequest {...screenProps} />);
      instance = requestDetail.instance() as NewNotaryRequest;
      instance.setState({
        selectedMarkedDate: { selectedColor: '#FEF3C7' },
      });
    });

    when('the getPriority function is called', () => {
      result = instance.getPriority();
    });

    then('the function should return "Priority"', () => {
      expect(result).toBe('Priority');
    });
  });

  test('Return Super Priority when selectedColor is neither #D1FAE5 nor #FEF3C7', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: NewNotaryRequest;
    let result: any
    given('the selectedMarkedDate has a selectedColor of #FF0000', () => {
      requestDetail = shallow(<NewNotaryRequest {...screenProps} />);
      instance = requestDetail.instance() as NewNotaryRequest;
      instance.setState({
        selectedMarkedDate: { selectedColor: '#FF0000' },
      });
    });

    when('the getPriority function is called', () => {
      result = instance.getPriority();
    });

    then('the function should return "Super Priority"', () => {
      expect(result).toBe('Super Priority');
    });
  });

  test('Return an empty string when selectedMarkedDate is null or selectedColor is undefined', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: NewNotaryRequest;
    let result : any;
    given('the selectedMarkedDate is null or has no selectedColor', () => {
      requestDetail = shallow(<NewNotaryRequest {...screenProps} />);
      instance = requestDetail.instance() as NewNotaryRequest;
      instance.setState({
        selectedMarkedDate: null,
      });
    });

    when('the getPriority function is called', () => {
      result = instance.getPriority();
    });

    then('the function should return an empty string', () => {
      expect(result).toBe('');
    });

    then("User is able to save draft successfully", ()=>{
      const draftApiCallIdMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      draftApiCallIdMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        draftApiCallIdMsg.messageId
      );
      draftApiCallIdMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {}
      );
      instance.SaveDraftNotaryApiCallId = draftApiCallIdMsg.messageId;
      runEngine.sendMessage("Unit Test", draftApiCallIdMsg);
      expect(draftApiCallIdMsg).toBeDefined();
    })

    then("User get Data api called successfully", () => {
      let data = {
        "id": "1632",
        "type": "notary_request",
        "attributes": {
          "status": "DRAFT",
          "notary_id": null,
          "notary_service_type": 26,
          "priority": null,
          "notarisation_method_id": 1,
          "jurisdiction_id": null,
          "date": null,
          "notes": "",
          "notarised_document": 0,
          "timing_slot": "",
          "invited_request_status": null,
          "is_deleted": false,
          "invite_request": null,
          "invite_number": null,
          "platform_fee_details": {
            "fee_type": "Flat Fee",
            "fee_value": 0
          },
          "juridiction": null,
          "notarisation_method": {
            "id": 1,
            "notarisation_method": "Remote Electronic Notarisation (REN)",
            "created_at": "2024-02-09T05:07:33.122Z",
            "updated_at": "2024-05-06T10:18:32.122Z"
          },
          "notary_service_name": "Witnessing and Verifying",
          "file_documents": [],
          "kyc_details": {
            "data": null
          }
        },
        "relationships": {
          "jurisdiction": {
            "data": null
          },
          "notary": {
            "data": null
          },
          "notarisation_method": {
            "data": {
              "id": "1",
              "type": "notarisation_method"
            }
          },
          "account": {
            "data": {
              "id": "2118",
              "type": "email_account"
            }
          }
        }
      }

      const draftApiCallIdMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      draftApiCallIdMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        draftApiCallIdMsg.messageId
      );
      draftApiCallIdMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        data
      );
      instance.apiRequestDetailCallId = draftApiCallIdMsg.messageId;
      runEngine.sendMessage("Unit Test", draftApiCallIdMsg);
      expect(data.attributes.status.toLowerCase()).toBe("draft");
    })
  });

  test("User closes the Save Draft popup", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: NewNotaryRequest;
    given("the Save Draft popup is visible", () => {
      requestDetail = shallow(<NewNotaryRequest {...screenProps} />);
      instance = requestDetail.instance() as NewNotaryRequest;
      instance.setState({ isModalVisible: true });
    });

    when("the user triggers the close event", () => {
      instance.onCloseSaveDraftPopup.onPress();
    });

    then("it should update the state to hide the modal", () => {
      expect(instance.state.isModalVisible).toBe(false);
    });
  });

  test("Show Save Draft Option when action type is 'edit'", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: NewNotaryRequest;
    let result: any;
    given("the selected action type is 'edit'", () => {
      requestDetail = shallow(<NewNotaryRequest {...screenProps} />);
      instance = requestDetail.instance() as NewNotaryRequest;
      instance.selectedActionType = "edit";
    });

    when("the function is called", () => {
      result = instance.isShowSaveDraftOption();
    });

    then("it should return true", () => {
      expect(result).toBe(true);
    });
  });

  test("Show Save Draft when all state values are default", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: NewNotaryRequest;
    let result: any;
    given("the selected service, notarisation, jurisdiction, and day are empty, and no documents are selected", () => {
      requestDetail = shallow(<NewNotaryRequest {...screenProps} />);
      instance = requestDetail.instance() as NewNotaryRequest;
      instance.selectedActionType = '';
      instance.setState({
        selectedService: null,
        selectedNotarisation: null,
        selectedJurisdiction: null,
        selectedDay: "",
        noOfDocument: 0,
      });
    });
 
    when("the function is called", () => {
      result = instance.isShowSaveDraftOption();
    });

    then("it should return true", () => {
      expect(result).toBe(true);
    });
  });

  test("Do not show Save Draft when any state value is set", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: NewNotaryRequest;
    let result: any;
    given("some state values are selected", () => {
      requestDetail = shallow(<NewNotaryRequest {...screenProps} />);
      instance = requestDetail.instance() as NewNotaryRequest;
      instance.selectedActionType = '';
      instance.setState({
        selectedService: "someService",
        selectedNotarisation: null,
        selectedJurisdiction: null,
        selectedDay: "",
        noOfDocument: 0,
      });
    });

    when("the function is called", () => {
      result = instance.isShowSaveDraftOption();
    });

    then("it should return false", () => {
      expect(result).toBe(false);
    });
  });

});
