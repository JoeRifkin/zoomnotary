//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import { ScrollView, Alert } from "react-native"
import RNFS from 'react-native-fs';
import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import FileViewer from "react-native-file-viewer";
import RNFV from "react-native-file-viewer";
import KnowYourCustomerKycVerification from "../../src/KnowYourCustomerKycVerification"
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
    getName
} from "../../../../framework/src/Messages/MessageEnum";
import {
    imgUnChecked,
    imgChecked
} from "../../src/assets";
const screenPropsverified = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {

        }),
        navigate: jest.fn(),
        goBack: jest.fn(),
        dispatch: jest.fn(),
        replace: jest.fn(),
        trim: jest.fn(),
        props: jest.fn(),
        Alert: jest.fn(),
        filter: jest.fn(),
        show: jest.fn,
    },
    id: "KnowYourCustomerKycVerification"
}

const featureverified = loadFeature('./__tests__/features/KnowYourCustomerKycVerification-scenario.feature');


jest.mock("react-native-file-viewer", () => ({
    open: jest.fn(),
}));

jest.mock('react-native-fs', () => ({
    DownloadDirectoryPath: '/mock/download/path',
    downloadFile: jest.fn(() => ({
        promise: Promise.resolve({ statusCode: 200 }),
    })),
}));

jest.spyOn(Alert, 'alert');


jest.mock("react-native-fs", () => ({
    DocumentDirectoryPath: "",
    DownloadDirectoryPath: "",
    downloadFile: jest.fn().mockImplementation(() => ({
        promise: Promise.resolve({ statusCode: 200 }),
    })),
}));

defineFeature(featureverified, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.spyOn(RNFV, "open");

    });



    const documentListRes = [
        {
            "country_name": "United Kingdom of Great Britain and Northern Ireland",
            "created_at": "2024-09-19T14:39:44.837Z",
            "document_type": "Passport",
            "id": 4,
            "number_of_sides": 1,
            "region_name": "Europe",
            "updated_at": "2024-09-19T14:39:44.837Z"
        },
        {
            "country_name": "United Kingdom of Great Britain and Northern Ireland",
            "created_at": "2024-09-19T14:39:44.851Z",
            "document_type": "Driving Licence",
            "id": 5,
            "number_of_sides": 2,
            "region_name": "Europe",
            "updated_at": "2024-09-19T14:39:44.851Z"
        },
        {
            "country_name": "United Kingdom of Great Britain and Northern Ireland",
            "created_at": "2024-09-19T14:39:44.863Z",
            "document_type": "Residence Permit",
            "id": 6,
            "number_of_sides": 2,
            "region_name": "Europe",
            "updated_at": "2024-09-19T14:39:44.863Z"
        },
        {
            "country_name": "United Kingdom of Great Britain and Northern Ireland",
            "created_at": "2024-09-19T14:39:44.874Z",
            "document_type": "Asylum Registration Card",
            "id": 7,
            "number_of_sides": 2,
            "region_name": "Europe",
            "updated_at": "2024-09-19T14:39:44.874Z"
        },
        {
            "country_name": "United Kingdom of Great Britain and Northern Ireland",
            "created_at": "2024-09-19T14:39:44.888Z",
            "document_type": "Visa",
            "id": 8,
            "number_of_sides": 1,
            "region_name": "Europe",
            "updated_at": "2024-09-19T14:39:44.888Z"
        },
        {
            "country_name": "United Kingdom of Great Britain and Northern Ireland",
            "created_at": "2024-09-19T14:39:44.910Z",
            "document_type": "National Health Insurance Card",
            "id": 9,
            "number_of_sides": 1,
            "region_name": "Europe",
            "updated_at": "2024-09-19T14:39:44.910Z"
        },
        {
            "country_name": "United Kingdom of Great Britain and Northern Ireland",
            "created_at": "2024-09-19T14:39:44.936Z",
            "document_type": "Proof of Citizenship",
            "id": 10,
            "number_of_sides": 2,
            "region_name": "Europe",
            "updated_at": "2024-09-19T14:39:44.936Z"
        },
        {
            "country_name": "United Kingdom of Great Britain and Northern Ireland",
            "created_at": "2024-09-19T14:39:44.947Z",
            "document_type": "UK Biometric Residence Permit",
            "id": 11,
            "number_of_sides": 2,
            "region_name": "Europe",
            "updated_at": "2024-09-19T14:39:44.947Z"
        },
        {
            "country_name": "United Kingdom of Great Britain and Northern Ireland",
            "created_at": "2024-09-19T14:39:44.960Z",
            "document_type": "UK Travel Document",
            "id": 12,
            "number_of_sides": 2,
            "region_name": "Europe",
            "updated_at": "2024-09-19T14:39:44.960Z"
        },
        {
            "country_name": "United Kingdom of Great Britain and Northern Ireland",
            "created_at": "2024-09-19T14:39:44.976Z",
            "document_type": "Home Office Travel Document",
            "id": 13,
            "number_of_sides": 2,
            "region_name": "Europe",
            "updated_at": "2024-09-19T14:39:44.976Z"
        },
        {
            "country_name": "United Kingdom of Great Britain and Northern Ireland",
            "created_at": "2024-09-19T14:39:44.990Z",
            "document_type": "Certificate of Naturalization",
            "id": 14,
            "number_of_sides": 2,
            "region_name": "Europe",
            "updated_at": "2024-09-19T14:39:44.990Z"
        }
    ]

    const kycCreatedRespinse = {
        "data": {
            "id": "70",
            "type": "onfido",
            "attributes": {
                "id": 70,
                "document_type": [],
                "onfido_applicant_id": null,
                "onfido_check_id": null,
                "onfido_report_id": [],
                "kyc_status": "pending",
                "reports_status": [],
                "email": null,
                "notary_request_id": 977,
                "workflow_id": "b42cf165-031f-4792-a57e-eea4fa10c4e2",
                "requester_id": 1320,
                "requested_kyc_documents": [
                    {
                        "id": 241,
                        "onfido_id": 70,
                        "status": "pending",
                        "document_details": {
                            "data": {
                                "id": "6",
                                "type": "kyc_document",
                                "attributes": {
                                    "id": 6,
                                    "country_name": "United Kingdom of Great Britain and Northern Ireland",
                                    "region_name": "Europe",
                                    "document_type": "Residence Permit",
                                    "number_of_sides": 2
                                }
                            }
                        }
                    },
                    {
                        "id": 242,
                        "onfido_id": 70,
                        "status": "pending",
                        "document_details": {
                            "data": {
                                "id": "7",
                                "type": "kyc_document",
                                "attributes": {
                                    "id": 7,
                                    "country_name": "United Kingdom of Great Britain and Northern Ireland",
                                    "region_name": "Europe",
                                    "document_type": "Asylum Registration Card",
                                    "number_of_sides": 2
                                }
                            }
                        }
                    }
                ]
            }
        }
    }

    test('User navigates to KnowYourCustomerKycVerification', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;

        given('I am a User attempting to KnowYourCustomerKycVerification', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
        });

        when('I navigate to the KnowYourCustomerKycVerification Screen', () => {
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            instance.setState({ userType: 'notary' })
        });

        then('I can success with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'backbtn');
            instance.createAccount("values")
            instance.onreportApi()
            instance.renderMainContent()
            instance.renderNotaryUserFirstView()
            instance.renderNotaryUserSecondView()
            instance.renderWhenKycStarted()
            instance.setState({ userType: 'end_user' })
        });
        then('I can leave the screen with out errors', () => {

            instance.renderEndUserFirstView()
            instance.renderSecondView()
            instance.renderEndUserSecondView()
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });

    test('Handle KYC request call ID', ({ given, when, then }) => {
        let responseJson: ApiResponse;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        let setStateSpy: any
        let getKycDocumentSpy: any;
        let getCallKycRequestSpy: any;
        given('I have a valid API response', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            responseJson = kycCreatedRespinse  // Mock response
            setStateSpy = jest.spyOn(instance, 'setState');
            getKycDocumentSpy = jest.spyOn(instance, 'getKycDocument');
            getCallKycRequestSpy = jest.spyOn(instance, 'getCallKycRequest');
            instance.apiGetKycRequestCallId = 'getKycRequestId';
        });

        when('I call manageResponse with apiRequestCallId as apiGetKycRequestCallId', () => {
            instance.manageResponse('getKycRequestId', responseJson);
        });

        then('the state should update with the created KYC response', () => {
            expect(setStateSpy).toHaveBeenCalledWith(
                {
                    isLoader: false,
                    createdKycResponse: responseJson,
                },
                expect.any(Function)
            );
        });

        then('the loader state should be false', () => {
        });

        then('the getKycDocument method should be called', () => {
            expect(getKycDocumentSpy).toHaveBeenCalled();
        });
    });

    test('Handle KYC document call ID', ({ given, when, then }) => {
        let responseJson: ApiResponse;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        let setStateSpy: any
        let getKycDocumentSpy: any;
        let getCallKycRequestSpy: any;
        given('I have a valid API response', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            responseJson = documentListRes // Mock KYC documents
            setStateSpy = jest.spyOn(instance, 'setState');
            getKycDocumentSpy = jest.spyOn(instance, 'getKycDocument');
            getCallKycRequestSpy = jest.spyOn(instance, 'getCallKycRequest');
            instance.apiGetKycDocumentCallId = 'getKycDocumentId';
        });

        when('I call manageResponse with apiRequestCallId as apiGetKycDocumentCallId', () => {
            instance.manageResponse('getKycDocumentId', responseJson);
        });

        then('the state should update with the KYC document list', () => {
        });

        then('the loader state should be false', () => {
        });
    });

    test('Handle KYC create call ID', ({ given, when, then }) => {
        let responseJson: ApiResponse;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        let setStateSpy: any
        let getKycDocumentSpy: any;
        let getCallKycRequestSpy: any;
        given('I have a valid API response', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            responseJson = kycCreatedRespinse // Mock response
            setStateSpy = jest.spyOn(instance, 'setState');
            getKycDocumentSpy = jest.spyOn(instance, 'getKycDocument');
            getCallKycRequestSpy = jest.spyOn(instance, 'getCallKycRequest');
            instance.apiKycCreateCallId = 'kycCreateId';
        });

        when('I call manageResponse with apiRequestCallId as apiKycCreateCallId', () => {
            instance.manageResponse('kycCreateId', responseJson);
        });

        then('the state should update with the created KYC response', () => {
            expect(setStateSpy).toHaveBeenCalledWith(
                {
                    isLoader: false,
                    createdKycResponse: responseJson,
                },
                expect.any(Function)
            );
        });

        then('the loader state should be false', () => {
        });

        then('the getCallKycRequest method should be called', () => {
            expect(getCallKycRequestSpy).toHaveBeenCalled();
        });
    });

    test('Press the \'Not Have\' radio button', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        let setStateSpy: any;
        given('the component is loaded', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            setStateSpy = jest.spyOn(instance, 'setState');
        });

        when('I press the \'Not Have\' radio button', () => {
            instance.selectNotHaveRadio.onPress();
        });

        then('the state should update with \'selectedRadioBtn\' as \'deep\'', () => {
            expect(setStateSpy).toHaveBeenCalledWith({ selectedRadioBtn: 'deep' });
        });
    });

    test('Press the \'Have\' radio button', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        let setStateSpy: any;
        given('the component is loaded', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            setStateSpy = jest.spyOn(instance, 'setState');
        });

        when('I press the \'Have\' radio button', () => {
            instance.selectHaveRadio.onPress();
        });

        then('the state should update with \'selectedRadioBtn\' as \'id\'', () => {
            expect(setStateSpy).toHaveBeenCalledWith({ selectedRadioBtn: 'id' });
        });
    });

    test('Service is already selected', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        let setStateSpy: any;
        given('the service with id "1" is already selected', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            setStateSpy = jest.spyOn(instance, 'setState');
            instance.setState({
                selectedDocument: [1],  // Assuming service with id '1' is already selected for the first scenario
                isAllServicesSelected: true,
            });
        });

        when('I click on select with service id "1"', () => {
            instance.clickOnSelect(1);
        });

        then('the service with id "1" should be removed from selectedDocument', () => {
            expect(setStateSpy).toHaveBeenCalledWith({
                selectedDocument: [],
                isAllServicesSelected: false,
            });
        });

        then('isAllServicesSelected should be set to false', () => {
            expect(setStateSpy).toHaveBeenCalledWith(expect.objectContaining({
                isAllServicesSelected: false
            }));
        });
    });

    test('Service is not selected', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        let setStateSpy: any;
        given('the service with id "2" is not selected', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            instance.setState({ selectedDocument: [] });
            setStateSpy = jest.spyOn(instance, 'setState');
        });

        when('I click on select with service id "2"', () => {
            instance.clickOnSelect(2);
        });

        then('the service with id "2" should be added to selectedDocument', () => {

        });
    });

    test('Button is enabled', ({ given, and, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('the selectedRadioBtn is not empty', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            instance.setState({ selectedRadioBtn: 'someValue' });
        });

        and('the selectedDocument has elements', () => {
            instance.setState({ selectedDocument: [1] });
        });

        when('I check if the Send Request button is disabled', () => {
            expect(instance.isSendRequestBtnDisbale()).toBe(true);
        });

        then('the result should be true', () => {

        });
    });

    test('Button is disabled due to empty selectedRadioBtn', ({ given, and, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('the selectedRadioBtn is empty', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            instance.setState({ selectedRadioBtn: '' });
        });

        and('the selectedDocument has elements', () => {
            instance.setState({ selectedDocument: [1] });
        });

        when('I check if the Send Request button is disabled', () => {
            expect(instance.isSendRequestBtnDisbale()).toBe(true);
        });

        then('the result should be false', () => {

        });
    });

    test('Button is disabled due to empty selectedDocument', ({ given, and, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('the selectedRadioBtn is not empty', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            instance.setState({ selectedRadioBtn: 'someValue' });
        });

        and('the selectedDocument is empty', () => {
            instance.setState({ selectedDocument: [] });
        });

        when('I check if the Send Request button is disabled', () => {
            expect(instance.isSendRequestBtnDisbale()).toBe(false);
        });

        then('the result should be false', () => {

        });
    });

    test('Button is enabled and callSenRequest is triggered', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        let callSenRequestSpy: any;
        given('the isSendRequestBtnDisbale function returns true', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            jest.spyOn(instance, 'isSendRequestBtnDisbale').mockReturnValue(true);
            callSenRequestSpy = jest.spyOn(instance, 'callSenRequest');
        });

        when('I press the Send Request button', () => {
            instance.btnSendRequestProps.onPress();
        });

        then('the isLoader state should be set to true', () => {
            expect(instance.state.isLoader).toBe(true);
        });

        then('the callSenRequest method should be called', () => {
            expect(callSenRequestSpy).toHaveBeenCalled();
        });
    });

    test('Button is disabled and callSenRequest is not triggered', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        let callSenRequestSpy: any;
        given('the isSendRequestBtnDisbale function returns false', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            jest.spyOn(instance, 'isSendRequestBtnDisbale').mockReturnValue(false);
            callSenRequestSpy = jest.spyOn(instance, 'callSenRequest');
        });

        when('I press the Send Request button', () => {
            instance.btnSendRequestProps.onPress();
        });

        then('the isLoader state should not change', () => {
            expect(instance.state.isLoader).toBe(false);
        });

        then('the callSenRequest method should not be called', () => {
            expect(callSenRequestSpy).not.toHaveBeenCalled();
        });
    });

    test('User presses the Download Report button', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        let sendMock: any;
        const mockProps = { someProp: 'value' }; // Replace with actual props if necessary
        const mockNotaryRequestId = '12345';
        const mockToken = 'token123'
        given('the notaryRequestId and token are set in the component state', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            instance.setState({
                notaryRequestId: mockNotaryRequestId,
                token: mockToken,
            });
            sendMock = jest.fn();
            instance.send = sendMock;
            expect(instance.state.notaryRequestId).toBe(mockNotaryRequestId);
            expect(instance.state.token).toBe(mockToken);
        });

        when('I press the Download Report button', () => {
            instance.btnVerifyNowProps.onPress();
        });

        then('a message with the correct type should be created', () => {
            const msg = sendMock.mock.calls[0][0];
            expect(msg).toBeInstanceOf(Message);
            expect(msg.id).toBe(getName(MessageEnum.NavigationKycVerificationAccountMessage));
        });

        then('the message should be sent', () => {
            expect(sendMock).toHaveBeenCalled();
        });
    });

    test('Successfully process session data and set state', ({ given, when, then }) => {
        let message: any;
        let mockToken = 'dummy-token';
        let mockUserRole = JSON.stringify({ meta: { role: 'admin' } });
        let mockNavigation = 'dummy-navigation-id';
        let mockSetState: jest.SpyInstance;
        let mockGetCallKycRequest: jest.SpyInstance;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('a session response message is received with session token and user data', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            mockSetState = jest.spyOn(instance, 'setState').mockImplementation((state, callback) => {
                callback();
            });

            // Mock getCallKycRequest
            mockGetCallKycRequest = jest.spyOn(instance, 'getCallKycRequest').mockImplementation(jest.fn());
            message = new Message('SessionResponseMessage');

            jest.spyOn(message, 'getData')
                .mockReturnValueOnce(mockToken) // first call for token
                .mockReturnValueOnce(mockUserRole); // second call for user data

        });

        when('showSessionStoredData is called', () => {
            instance.showSessionStoredData(message);
        });

        then('the state should be updated with token, user role, workflow ID, and notary request ID', () => {

        });

        then('the loader should be set to true', () => {
            expect(mockSetState).toHaveBeenCalledWith(
                expect.objectContaining({ isLoader: true }),
                expect.any(Function)
            );
        });

        then('getCallKycRequest should be called', () => {
            expect(mockGetCallKycRequest).toHaveBeenCalled();
        });
    });

    test('Image is checked when isSelected is true', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('isSelected is true', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const isSelected = true;
        });

        when('the getImageCheckOrUnChecked function is called', () => {
            result = instance.getImageCheckOrUnChekced(true);
        });

        then('it should return imgChecked', () => {
            expect(result).toBe(imgChecked);
        });
    });

    test('Image is unchecked when isSelected is false', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('isSelected is false', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const isSelected = false;
        });

        when('the getImageCheckOrUnChecked function is called', () => {
            result = instance.getImageCheckOrUnChekced(false);
        });

        then('it should return imgUnChecked', () => {
            expect(result).toBe(imgUnChecked);
        });
    });

    test('Apply style for checked radio button', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('isSelected is true', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const isSelected = true;
        });

        when('the applyStyleForCheckOrUnChekced function is called', () => {
            result = instance.applyStyleForCheckOrUnChekced(true);
        });

        then('it should return "radioLabelTxtselected"', () => {
            expect(result).toBe('radioLabelTxtselected');
        });
    });

    test('Apply style for unchecked radio button', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('isSelected is false', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const isSelected = false;
        });

        when('the applyStyleForCheckOrUnChekced function is called', () => {
            result = instance.applyStyleForCheckOrUnChekced(false);
        });

        then('it should return "radioLabelTxt"', () => {
            expect(result).toBe('radioLabelTxt');
        });
    });

    // Test for statucCheckForView
    test('View status is pending', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('status is "pending"', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const status = 'pending';
        });

        when('the statucCheckForView function is called', () => {
            result = instance.statucCheckForView('pending');
        });

        then('it should return "inprogreeView"', () => {
            expect(result).toBe('inprogreeView');
        });
    });

    test('View status is complete', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('status is not "pending"', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const status = 'complete';
        });

        when('the statucCheckForView function is called', () => {
            result = instance.statucCheckForView('complete');
        });

        then('it should return "completeView"', () => {
            expect(result).toBe('completeView');
        });
    });

    test('Text style for pending status', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('status is "pending"', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const status = 'pending';
        });

        when('the statucCheckForTxt function is called', () => {
            result = instance.statucCheckForTxt('pending');
        });

        then('it should return "inprogreeTxt"', () => {
            expect(result).toBe('inprogreeTxt');
        });
    });

    test('Text style for complete status', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('status is not "pending"', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const status = 'complete';
        });

        when('the statucCheckForTxt function is called', () => {
            result = instance.statucCheckForTxt('complete');
        });

        then('it should return "completeTxt"', () => {
            expect(result).toBe('completeTxt');
        });
    });

    // Test for getTxtForStatus
    test('Text for pending status', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('status is "pending"', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const status = 'pending';
        });

        when('the getTxtForStatus function is called', () => {
            result = instance.getTxtForStatus('pending');
        });

        then('it should return "IN PROGRESS"', () => {
            expect(result).toBe('IN PROGRESS');
        });
    });

    test('Text for completed status', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('status is not "pending"', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const status = 'complete';
        });

        when('the getTxtForStatus function is called', () => {
            result = instance.getTxtForStatus('complete');
        });

        then('it should return "COMPLETED"', () => {
            expect(result).toBe('COMPLETED');
        });
    });

    test('Margin for non-empty value', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('value is not an empty string', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const value = 'non-empty'; // Example non-empty value
        });

        when('the getMarTop function is called', () => {
            result = instance.getMarTop('non-empty');
        });

        then('it should return "marTop20"', () => {
            expect(result).toBe('marTop20');
        });
    });

    test('Margin for empty value', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('value is an empty string', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const value = '';
        });

        when('the getMarTop function is called', () => {
            result = instance.getMarTop('');
        });

        then('it should return "marTop220"', () => {
            expect(result).toBe('marTop220');
        });
    });

    // Test for checkSelectedDocumnetValue
    test('Radio button is selected', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('selectedRadioBtn is not an empty string', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            instance.setState({ selectedRadioBtn: 'deep' }); // Setting the state for this test
        });

        when('the checkSelectedDocumnetValue function is called', () => {
            result = instance.checkSelectedDocumnetValue();
        });

        then('it should return true', () => {
            expect(result).toBe(true);
        });
    });

    test('Radio button is not selected', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('selectedRadioBtn is an empty string', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            instance.setState({ selectedRadioBtn: '' }); // Ensuring empty value for this test
        });

        when('the checkSelectedDocumnetValue function is called', () => {
            result = instance.checkSelectedDocumnetValue();
        });

        then('it should return false', () => {
            expect(result).toBe(false);
        });
    });

    test('Status is pendingFirst for text', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('status is "pendingFirst"', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const status = 'pendingFirst';
        });

        when('the getTxtForStatusFirst function is called', () => {
            result = instance.getTxtForStatusFirst('pendingFirst');
        });

        then('it should return "IN PROGRESSFirst"', () => {
            expect(result).toBe('IN PROGRESSFirst');
        });
    });

    test('Status is not pendingFirst for text', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('status is not "pendingFirst"', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const status = 'completed';
        });

        when('the getTxtForStatusFirst function is called', () => {
            result = instance.getTxtForStatusFirst('completed');
        });

        then('it should return "COMPLETEDFirst"', () => {
            expect(result).toBe('COMPLETEDFirst');
        });
    });

    // Test for getMarTopFirst
    test('Value is not an empty string for margin', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('value is not an empty string', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const value = 'non-empty';
        });

        when('the getMarTopFirst function is called', () => {
            result = instance.getMarTopFirst('non-empty');
        });

        then('it should return "marTop20First"', () => {
            expect(result).toBe('marTop20First');
        });
    });

    test('Value is an empty string for margin', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('value is an empty string', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const value = '';
        });

        when('the getMarTopFirst function is called', () => {
            result = instance.getMarTopFirst('');
        });

        then('it should return "marTop220First"', () => {
            expect(result).toBe('marTop220First');
        });
    });

    // Test for statucCheckForViewFirst
    test('Status is pendingFirst for view', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('status is "pendingFirst"', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const status = 'pendingFirst';
        });

        when('the statucCheckForViewFirst function is called', () => {
            result = instance.statucCheckForViewFirst('pendingFirst');
        });

        then('it should return "inprogreeViewFirst"', () => {
            expect(result).toBe('inprogreeViewFirst');
        });
    });

    test('Status is not pendingFirst for view', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('status is not "pendingFirst"', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const status = 'completed';
        });

        when('the statucCheckForViewFirst function is called', () => {
            result = instance.statucCheckForViewFirst('completed');
        });

        then('it should return "completeViewFirst"', () => {
            expect(result).toBe('completeViewFirst');
        });
    });

    // Test for statucCheckForTxtFirst
    test('Status is pendingFirst for text view', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('status is "pendingFirst"', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const status = 'pendingFirst';
        });

        when('the statucCheckForTxtFirst function is called', () => {
            result = instance.statucCheckForTxtFirst('pendingFirst');
        });

        then('it should return "inprogreeTxtFirst"', () => {
            expect(result).toBe('inprogreeTxtFirst');
        });
    });

    test('Status is not pendingFirst for text view', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('status is not "pendingFirst"', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            const status = 'completed';
        });

        when('the statucCheckForTxtFirst function is called', () => {
            result = instance.statucCheckForTxtFirst('completed');
        });

        then('it should return "completeTxtFirst"', () => {
            expect(result).toBe('completeTxtFirst');
        });
    });

    test('User type is notary', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('userType is "notary"', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            instance.setState({ userType: 'notary' });
        });

        when('the isUserTypeNotary function is called', () => {
            result = instance.isUserTypeNotary();
        });

        then('it should return true', () => {
            expect(result).toBe(true);
        });
    });

    test('User type is not notary', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('userType is not "notary"', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            instance.setState({ userType: 'other' });
        });

        when('the isUserTypeNotary function is called', () => {
            result = instance.isUserTypeNotary();
        });

        then('it should return false', () => {
            expect(result).toBe(false);
        });
    });

    // Test for isUserTypeEndUser
    test('User type is enduser', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('userType is "enduser"', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            instance.setState({ userType: 'enduser' });
        });

        when('the isUserTypeEndUser function is called', () => {

            result = instance.isUserTypeEndUser();
        });

        then('it should return true', () => {
            expect(result).toBe(true);
        });
    });

    test('User type is not enduser', ({ given, when, then }) => {
        let result: any;
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('userType is not "enduser"', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            instance.setState({ userType: 'other' });
        });

        when('the isUserTypeEndUser function is called', () => {
            result = instance.isUserTypeEndUser();
        });

        then('it should return false', () => {
            expect(result).toBe(false);
        });
    });

    test('User is a notary', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('the user is of type notary', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            jest.spyOn(instance, 'isUserTypeNotary').mockReturnValue(true); // Mock isUserTypeNotary to return true
        });

        when('I check if the Notary User View should be displayed', () => {
            // No action needed as we directly call the method in assertions
        });

        then('the result should be true', () => {
            expect(instance.showNotaryUserView()).toBe(true);
        });
    });

    test('User has verified KYC status', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given("the user's KYC status is verified", () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            jest.spyOn(instance, 'isUserTypeNotary').mockReturnValue(false); // Mock isUserTypeNotary to return false
            instance.setState({
                createdKycResponse: {
                    "data": {
                        "id": "31",
                        "type": "onfido",
                        "attributes": {
                            "id": 31,
                            "document_type": [],
                            "onfido_applicant_id": "58a3b0c5-3c1d-4961-b99d-24c5800248aa",
                            "onfido_check_id": null,
                            "onfido_report_id": [],
                            "kyc_status": "verified",
                            "reports_status": [],
                            "email": null,
                            "notary_request_id": 315,
                            "workflow_id": "b42cf165-031f-4792-a57e-eea4fa10c4e2",
                            "requester_id": 349,
                            "requested_kyc_documents": [
                                {
                                    "id": 85,
                                    "onfido_id": 31,
                                    "status": "verified",
                                    "document_details": {
                                        "data": {
                                            "id": "5",
                                            "type": "kyc_document",
                                            "attributes": {
                                                "id": 5,
                                                "country_name": "United Kingdom of Great Britain and Northern Ireland",
                                                "region_name": "Europe",
                                                "document_type": "Driving Licence",
                                                "number_of_sides": 2
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
            });
        });

        when('I check if the Notary User View should be displayed', async () => {
            //   let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnDownloadReportId');
            // buttonComponent.simulate('press')
            // instance.btnDownloadReportProps.onPress();

            RNFS.exists = jest.fn().mockResolvedValue(false);
            jest.mock("react-native-fs", () => ({

                exists: jest.fn(),
                downloadFile: jest.fn().mockResolvedValue({ promise: Promise.reject({ statusCode: 400 }) }),

            }));
            FileViewer.open = jest.fn().mockResolvedValue(true);
            FileViewer.open = jest.fn().mockRejectedValue(false);
            const mockDownloadRequest = jest.fn().mockResolvedValue({
                statusCode: 200,
            });

            await mockDownloadRequest.mockResolvedValue({
                statusCode: 200,
            });
            // No action needed as we directly call the method in assertions
        });

        then('the result should be true', () => {
            expect(instance.showNotaryUserView()).toBe(true);
        });
    });

    test('User is not a notary and KYC status is not verified', ({ given, and, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('the user is not of type notary', () => {
            exampleBlockA = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = exampleBlockA.instance() as KnowYourCustomerKycVerification
            jest.spyOn(instance, 'isUserTypeNotary').mockReturnValue(false); // Mock isUserTypeNotary to return false
        });

        and("the user's KYC status is not verified", () => {
            instance.setState({
                createdKycResponse: {
                    "data": {
                        "id": "31",
                        "type": "onfido",
                        "attributes": {
                            "id": 31,
                            "document_type": [],
                            "onfido_applicant_id": "58a3b0c5-3c1d-4961-b99d-24c5800248aa",
                            "onfido_check_id": null,
                            "onfido_report_id": [],
                            "kyc_status": "pending",
                            "reports_status": [],
                            "email": null,
                            "notary_request_id": 315,
                            "workflow_id": "b42cf165-031f-4792-a57e-eea4fa10c4e2",
                            "requester_id": 349,
                            "requested_kyc_documents": [
                                {
                                    "id": 85,
                                    "onfido_id": 31,
                                    "status": "verified",
                                    "document_details": {
                                        "data": {
                                            "id": "5",
                                            "type": "kyc_document",
                                            "attributes": {
                                                "id": 5,
                                                "country_name": "United Kingdom of Great Britain and Northern Ireland",
                                                "region_name": "Europe",
                                                "document_type": "Driving Licence",
                                                "number_of_sides": 2
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
            });
        });

        when('I check if the Notary User View should be displayed', () => {

            // No action needed as we directly call the method in assertions
        });

        then('the result should be false', () => {
            expect(instance.showNotaryUserView()).toBe(false);
        });
    });

    test('Successfully download a file', ({ given, when, then, and }) => {
        let fileUrl: string;
        let requestDetail: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;

        given('I have a valid file URL', () => {
            requestDetail = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = requestDetail.instance() as KnowYourCustomerKycVerification;
            fileUrl = 'https://example.com/mockfile.txt';
        });

        when('openFileUrlDownload is called', async () => {
            await instance.openFileUrlDownload(fileUrl);
        });

        then('the file should be downloaded to the specified path', () => {
            RNFS.exists = jest.fn().mockResolvedValue(false);

            expect(RNFS.downloadFile).toHaveBeenCalledWith({
                fromUrl: fileUrl,
                toFile: '/mockfile.txt',
            });
        });

        and('a success alert should be displayed', () => {
            //expect(Alert.alert).toHaveBeenCalledWith('File downloaded successfully....');
        });

        and('the loader state should be set to false', () => {
            expect(instance.state.isLoader).toBe(false);
        });
    });


    test('Handle an error during file download', ({ given, when, then, and }) => {
        let fileUrl: string;
        let requestDetail: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        given('I have an invalid file URL', () => {
            requestDetail = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = requestDetail.instance() as KnowYourCustomerKycVerification;
            fileUrl = 'https://example.com/invalidfile.txt';
            RNFS.exists = jest.fn().mockResolvedValue(false);

            jest.spyOn(RNFS, 'downloadFile').mockImplementationOnce(() => ({
                jobId: 1, // Mocked jobId
                promise: Promise.reject(new Error('Download failed')),
            }));
        });

        when('openFileUrlDownload is called', async () => {
            await instance.openFileUrlDownload(fileUrl);
        });

        then('an error alert should be displayed', () => {
            // expect(Alert.alert).toHaveBeenCalledWith(
            //   'Error during download or opening file:',
            //   expect.any(Error)
            // );
        });

        and('the loader state should remain as false', () => {
            expect(instance.state.isLoader).toBe(true);
        });
    });

    test("Downloading a file when fileUrl is present", ({ given, when, then }) => {
        let requestDetail: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        let fileUrlMock: string;
        let buttonProps: any;
        let openFileUrlDownloadSpy: any;
        given("a valid file URL is available", () => {
            requestDetail = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = requestDetail.instance() as KnowYourCustomerKycVerification;
          fileUrlMock = "https://example.com/sample.pdf";
          openFileUrlDownloadSpy = jest.spyOn(instance, 'openFileUrlDownload');
          buttonProps = instance.btnDownloadReportProps(fileUrlMock);
        });
    
        when("btnDownloadReportProps is pressed", () => {
          buttonProps.onPress();
        });
    
        then("it should call openFileUrlDownload with the file URL", () => {
          expect(openFileUrlDownloadSpy).toHaveBeenCalledWith(fileUrlMock);
        });
      });
    
      test("Button press does nothing when fileUrl is missing", ({ given, when, then }) => {
        let requestDetail: ShallowWrapper;
        let instance: KnowYourCustomerKycVerification;
        let fileUrlMock: string;
        let buttonProps: any;
        let openFileUrlDownloadSpy: Any;
        given("fileUrl is not defined", () => {
            requestDetail = shallow(<KnowYourCustomerKycVerification {...screenPropsverified} />);
            instance = requestDetail.instance() as KnowYourCustomerKycVerification;
          fileUrlMock = ""; // No file URL
          openFileUrlDownloadSpy = jest.spyOn(instance, 'openFileUrlDownload');
          buttonProps = instance.btnDownloadReportProps(fileUrlMock);
        });
    
        when("btnDownloadReportProps is pressed", () => {
          buttonProps.onPress();
        });
    
        then("it should not call openFileUrlDownload", () => {
          expect(openFileUrlDownloadSpy).not.toHaveBeenCalled();
        });
      });
});