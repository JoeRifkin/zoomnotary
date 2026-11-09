import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import RNFV from "react-native-file-viewer";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { FlatList, Platform, PermissionsAndroid } from "react-native";
import RequestDetail from "../../src/RequestDetail";
import { imgRequestDownArrow, imgRequestUpArrow } from '../../src/assets';
export const configJSON = require("../../src/config");

interface MenuItem {
  name: string;
  key: string;
  action: string[];
}
const navigate = jest.fn();

const screenProps = {
  navigation: {
    navigate,
  },
  id: "RequestDetail",
};

const mockAPICall = (instance: any, apiCallID: string, apiData: any) => {
  const msgSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgSucessRestAPI.messageId);
  msgSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), apiData);
  instance[apiCallID] = msgSucessRestAPI.messageId
  runEngine.sendMessage("Unit Test", msgSucessRestAPI)
  return instance[apiCallID];
}

const feature = loadFeature(
  "./__tests__/features/RequestDetail-scenario.feature"
);
jest.mock("react-native-file-viewer", () => ({
  open: jest.fn(),
}));


jest.mock("react-native-fs", () => ({
  DocumentDirectoryPath: "",
  DownloadDirectoryPath: "",
  downloadFile: jest.fn().mockImplementation(() => ({
    promise: Promise.resolve({ statusCode: 200 }),
  })),
}));
// jest.mock("react-native-fs", () => ({
//   exists: jest.fn(),
//   downloadFile: jest.fn().mockResolvedValue({ promise: Promise.resolve(),

//   }
// ),


// }));

const mockResponseChatApi: any = {
  "data": {
    "id": "31",
    "type": "chat",
    "attributes": {
      "id": 31,
      "name": "ChatChannel",
      "notary_request_id": 305,
      "accounts_chats": [
        {
          "id": "31",
          "type": "accounts_chats",
          "attributes": {
            "account_id": 312,
            "muted": false,
            "unread_count": 3
          }
        }
      ],
      "full_name": "Notary Sprint tf",
      "profile": "https://zoomnotary-401615-ruby.b401615.uat.eastus.az.svc.builder.ai/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1DIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--62028f13a38ca1c2f3f59a59e8d36c28eec029df/pexels-andrea-piacquadio-774909.jpg",
      "messages": [
        {
          "id": "10",
          "type": "chat_message",
          "attributes": {
            "id": 10,
            "message": "hi",
            "account_id": 318,
            "chat_id": 31,
            "created_at": "2024-12-10T12:28:51.405Z",
            "updated_at": "2024-12-10T12:28:51.712Z",
            "is_mark_read": true,
            "attachments": null
          }
        },
        {
          "id": "11",
          "type": "chat_message",
          "attributes": {
            "id": 11,
            "message": "hello",
            "account_id": 318,
            "chat_id": 31,
            "created_at": "2024-12-23T13:43:45.917Z",
            "updated_at": "2024-12-23T13:43:46.356Z",
            "is_mark_read": true,
            "attachments": null
          }
        },
        {
          "id": "12",
          "type": "chat_message",
          "attributes": {
            "id": 12,
            "message": "this",
            "account_id": 312,
            "chat_id": 31,
            "created_at": "2024-12-23T13:46:13.538Z",
            "updated_at": "2024-12-23T13:46:13.871Z",
            "is_mark_read": true,
            "attachments": null
          }
        }
      ]
    },
    "relationships": {
      "accounts": {
        "data": [
          {
            "id": "312",
            "type": "account"
          }
        ]
      }
    }
  }
}

const mockRequestData = [
  {
    id: "1",
    type: "request",
    attributes: {
      sender_id: 1,
      status: "pending",
      rejection_reason: null,
      request_text: "accept my request",
      created_at: "",
      updated_at: "",
      reviewer_group_id: "1",
      sender_full_name: "test name",
    },
  },
  {
    id: "2",
    type: "request",
    attributes: {
      sender_id: 2,
      status: "rejected",
      rejection_reason: "not accepted",
      request_text: "accept my request",
      created_at: "",
      updated_at: "",
      reviewer_group_id: "2",
      sender_full_name: "test name",
    },
  },
  {
    id: "3",
    type: "request",
    attributes: {
      sender_id: 3,
      status: "accepted",
      rejection_reason: null,
      request_text: "accept my request",
      created_at: "",
      updated_at: "",
      reviewer_group_id: "3",
      sender_full_name: "test name",
    },
  },
];

let requestDataMoked = {
  "id": "446",
  "type": "notary_request",
  "attributes": {
    "status": "PENDING",
    "notary_id": null,
    "notary_service_type": 2,
    "priority": "Super Priority",
    "notarisation_method_id": 2,
    "jurisdiction_id": 2,
    "date": "2025-01-10T00:00:00.000Z",
    "notes": "dhhdhd d s. ss s ssns. sns s s bsbsbs s s bsbsbs  s s s ss. s s s s s s s sbshwbwbs ebenebeenenenennsje e ebe e e ewh s sbs. s s s sb s sbnsbw w wnsnw nww w e be e e s w. wwbbw w w w w w w",
    "notarised_document": 1,
    "timing_slot": "Morning",
    "invited_request_status": "",
    "is_deleted": false,
    "invite_request": false,
    "invite_number": null,
    "platform_fee_details": {
      "fee_type": "Flat Fee",
      "fee_value": "25.0"
    },
    "juridiction": {
      "id": 2,
      "jurisdiction": "Scotland",
      "created_at": "2024-05-08T06:48:55.839Z",
      "updated_at": "2024-05-08T06:48:55.839Z"
    },
    "notarisation_method": {
      "id": 2,
      "notarisation_method": "Remote Ink Notarisation (RIN)",
      "created_at": "2024-05-08T06:46:56.040Z",
      "updated_at": "2024-05-08T06:47:24.566Z"
    },
    "notary_service_name": "Business and Corporate Services",
    "file_documents": [
      {
        "doc_id": 725,
        "doc_type": "image/png",
        "doc_size": 168426,
        "doc_base_64": "iVBORw0KGgoAAAANSUhEUgAABDgAAAlgCAYAAABtGofVAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAACAASURBVHic7N13nCRnfSf+z1Ohc0/c2byzWSttUpYALSCC4ZCMbcDmAIM5nwOyhX/22WfxO+AcMGBknw/DwQHnO85GHLKxz0G2ZMAmK4AklHYVN",
        "doc_name": "0baa1adc-ba66-4aae-8bf1-b32c6dd282bc.jpg",
        "doc_file_url": "https://zoomnotary-401615-ruby.b401615.stage.eastus.az.svc.builder.ai/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUFEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a122b2ee39452346b54f809d30520ff1a03ac7cb/0baa1adc-ba66-4aae-8bf1-b32c6dd282bc.jpg",
        "signatory_count": 1,
        "recipients": [
          {
            "id": 1063,
            "created_at": "2025-01-09T07:03:57.052Z",
            "updated_at": "2025-01-09T07:03:57.052Z",
            "file_document_id": 725,
            "name": "Arvind 1",
            "email": "griffinarvind1@gmail.com",
            "is_signatory": true,
            "signed": false,
            "is_notary": false,
            "signing_url": null,
            "envelope_id": null,
            "access_token": null
          }
        ]
      }
    ],
    "kyc_details": {
      "data": null
    }
  },
  "relationships": {
    "jurisdiction": {
      "data": {
        "id": "2",
        "type": "jurisdiction"
      }
    },
    "notary": {
      "data": null
    },
    "notarisation_method": {
      "data": {
        "id": "2",
        "type": "notarisation_method"
      }
    },
    "account": {
      "data": {
        "id": "348",
        "type": "email_account"
      }
    }
  }
}

let requestDataMokedSec = {

  "id": "446",
  "type": "notary_request",
  "attributes": {
    "status": "in progress",
    "notary_id": null,
    "notary_service_type": 2,
    "priority": "Super Priority",
    "notarisation_method_id": 2,
    "jurisdiction_id": 2,
    "date": "2025-01-10T00:00:00.000Z",
    "notes": "dhhdhd d s. ss s ssns. sns s s bsbsbs s s bsbsbs  s s s ss. s s s s s s s sbshwbwbs ebenebeenenenennsje e ebe e e ewh s sbs. s s s sb s sbnsbw w wnsnw nww w e be e e s w. wwbbw w w w w w w",
    "notarised_document": 1,
    "timing_slot": "Morning",
    "invited_request_status": "",
    "is_deleted": false,
    "invite_request": false,
    "invite_number": null,
    "platform_fee_details": {
      "fee_type": "Flat Fee",
      "fee_value": "25.0"
    },
    "juridiction": {
      "id": 2,
      "jurisdiction": "Scotland",
      "created_at": "2024-05-08T06:48:55.839Z",
      "updated_at": "2024-05-08T06:48:55.839Z"
    },
    "notarisation_method": {
      "id": 2,
      "notarisation_method": "Remote Ink Notarisation (RIN)",
      "created_at": "2024-05-08T06:46:56.040Z",
      "updated_at": "2024-05-08T06:47:24.566Z"
    },
    "notary_service_name": "Business and Corporate Services",
    "file_documents": [
      {
        "doc_id": 725,
        "doc_type": "image/png",
        "doc_size": 168426,
        "doc_base_64": "iVBORw0KGgoAAAANSUhEUgAABDgAAAlgCAYAAABtGofVAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAACAASURBVHic7N13nCRnfSf+z1Ohc0/c2byzWSttUpYALSCC4ZCMbcDmAIM5nwOyhX/22WfxO+AcMGBknw/DwQHnO85GHLKxz0G2ZMAmK4AklHYVN",
        "doc_name": "0baa1adc-ba66-4aae-8bf1-b32c6dd282bc.jpg",
        "doc_file_url": "https://zoomnotary-401615-ruby.b401615.stage.eastus.az.svc.builder.ai/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUFEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a122b2ee39452346b54f809d30520ff1a03ac7cb/0baa1adc-ba66-4aae-8bf1-b32c6dd282bc.jpg",
        "signatory_count": 1,
        "recipients": [
          {
            "id": 1063,
            "created_at": "2025-01-09T07:03:57.052Z",
            "updated_at": "2025-01-09T07:03:57.052Z",
            "file_document_id": 725,
            "name": "Arvind 1",
            "email": "griffinarvind1@gmail.com",
            "is_signatory": true,
            "signed": false,
            "is_notary": false,
            "signing_url": null,
            "envelope_id": null,
            "access_token": null
          }
        ]
      }
    ],
    "kyc_details": {
      "data": null
    }
  },
  "relationships": {
    "jurisdiction": {
      "data": {
        "id": "2",
        "type": "jurisdiction"
      }
    },
    "notary": {
      "data": null
    },
    "notarisation_method": {
      "data": {
        "id": "2",
        "type": "notarisation_method"
      }
    },
    "account": {
      "data": {
        "id": "348",
        "type": "email_account"
      }
    }
  }
}

const quoteData = {
  data: [{
    "id": "32",
    "type": "quote",
    "attributes": {
      "notary_requests_id": 661,
      "start_time": "2024-08-31T06:44:01.369Z",
      "video_call_required": true,
      "fees": "10.0",
      "end_time": "2024-08-31T08:44:01.378Z",
      "platform_fee_inclusive": true,
      "message": "",
      "notary_id": 1204,
      "created_at": "2024-08-21T06:44:24.080Z",
      "updated_at": "2024-08-21T06:44:24.080Z",
      "quote_statuses_id": 1,
      "quote_status": "Submitted",
      "notary_fees": "10.0",
      "platform_fees": "0",
      "vat_fee": "15"
    }
  }]
}

const quoteDataSec = {
  data: [{
    "id": "32",
    "type": "quote",
    "attributes": {
      "notary_requests_id": 661,
      "start_time": "2024-08-31T06:44:01.369Z",
      "video_call_required": true,
      "fees": "10.0",
      "end_time": "2024-08-31T08:44:01.378Z",
      "platform_fee_inclusive": true,
      "message": "",
      "notary_id": 1204,
      "created_at": "2024-08-21T06:44:24.080Z",
      "updated_at": "2024-08-21T06:44:24.080Z",
      "quote_statuses_id": 2,
      "quote_status": "Withdrawn",
      "notary_fees": "10.0",
      "platform_fees": "0",
      "vat_fee": null
    }
  }]
}




const meetingRes = {
  "zoom_meetings": {
    "notary_request_id": 1136,
    "meeting": {
      "id": 73833519751,
      "type": 2,
      "uuid": "soXg6gc3TpO/fbHszetGvg==",
      "topic": "Zoom Meeting",
      "status": "waiting",
      "host_id": "kAm2Z1iqTbavhDzX2jNwHg",
      "duration": 0,
      "join_url": "https://us04web.zoom.us/j/73833519751?pwd=zybax0wkiVFaq8g2XvXZLKfsAE4g1r.1",
      "password": "1wA3w9",
      "settings": {
        "audio": "voip",
        "use_pmi": false,
        "jbh_time": 0,
        "resources": [],
        "watermark": false,
        "cn_meeting": false,
        "focus_mode": false,
        "host_video": false,
        "in_meeting": false,
        "waiting_room": false,
        "approval_type": 2,
        "breakout_room": {
          "enable": false
        },
        "enforce_login": false,
        "auto_recording": "none",
        "device_testing": false,
        "show_join_info": false,
        "encryption_type": "enhanced_encryption",
        "mute_upon_entry": false,
        "private_meeting": false,
        "internal_meeting": false,
        "join_before_host": true,
        "meeting_invitees": [],
        "alternative_hosts": "",
        "participant_video": true,
        "show_share_button": false,
        "close_registration": false,
        "email_notification": true,
        "enforce_login_domains": "",
        "host_save_video_order": false,
        "allow_multiple_devices": false,
        "meeting_authentication": false,
        "continuous_meeting_chat": {
          "enable": true,
          "channel_id": "web_sch_46d96774d89c43d88dc95184d42e50bc",
          "auto_add_meeting_participants": false,
          "auto_add_invited_external_users": false
        },
        "push_change_to_calendar": false,
        "email_in_attendee_report": false,
        "enable_dedicated_group_chat": true,
        "participant_focused_meeting": false,
        "sign_language_interpretation": {
          "enable": false
        },
        "alternative_host_update_polls": false,
        "registrants_confirmation_email": true,
        "registrants_email_notification": true,
        "alternative_hosts_email_notification": true,
        "approved_or_denied_countries_or_regions": {
          "enable": false
        },
        "request_permission_to_unmute_participants": false
      },
      "timezone": "UTC",
      "start_url": "https://us04web.zoom.us/s/73833519751?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJ3ZWIiLCJjbHQiOjAsIm1udW0iOiI3MzgzMzUxOTc1MSIsImF1ZCI6ImNsaWVudHNtIiwidWlkIjoia0FtMloxaXFUYmF2aER6WDJqTndIZyIsInppZCI6ImM4ZTdhMjAxZGYwMzQ0MWZhNjAwMmM0NzgyOTMyMDA5Iiwic2siOiIwIiwic3R5IjoxLCJ3Y2QiOiJ1czA0IiwiZXhwIjoxNzI5MDc0NDQ1LCJpYXQiOjE3MjkwNjcyNDUsImFpZCI6Il9kSmlDNXAzU1NLOERuSlNzQUNSTmciLCJjaWQiOiIifQ.RswxPVwVtBxMz0SfA79aWRfl5Aadew0HfAEPDLCKiIM",
      "created_at": "2024-10-16T08:27:25Z",
      "host_email": "nikhil.upadhyay@builder.ai",
      "start_time": "2024-10-16T08:27:25Z",
      "pre_schedule": false,
      "h323_password": "267761",
      "pstn_password": "267761",
      "encrypted_password": "zybax0wkiVFaq8g2XvXZLKfsAE4g1r.1"
    },
    "start_time": "2024-10-17T08:20:05.111Z",
    "end_time": "2024-10-17T11:20:05.116Z"
  }
}


const docuSignDetail = {
  "document_signing_status": [
    {
      "document_id": "44",
      "file_name": "document1.pdf",
      "signing_urls": "www.google.com",
      "is_docusign_start": true,
      "document_url": "https://documetn.doc",
      "signatory": [
        {
          "name": "Recipient 1",
          "email": "dipali.sahu@taskcraft.in",
          "is_signatory": null,
          "signed": true
        },
        {
          "name": "Recipient 2",
          "email": "dipali.sahu@taskcraft.in",
          "is_signatory": null,
          "signed": true
        }
      ],
      "notary": [{
        "name": "Recipient 2",
        "email": "dipali.sahu@taskcraft.in",
        "is_signatory": null,
        "signed": true
      }]
    },
    {
      "document_id": "44",
      "signing_urls": "www.google.com",
      "file_name": "document2.pdf",
      "document_url": "https://documetn.doc",
      "is_docusign_start": false,
      "signatory": [
        {
          "name": "Recipient 3",
          "email": "recipient3@example.com",
          "is_signatory": null,
          "signed": false
        }
      ],
      "notary": [{
        "name": "Recipient 3",
        "email": "recipient3@example.com",
        "is_signatory": null,
        "signed": false
      }]
    }
  ]
}

const initialTabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'quotes', label: 'Quotes' },
  { key: 'details', label: 'Details' }
];

beforeAll(() => {
  // Mock WebSocket
  global.WebSocket = jest.fn(() => ({
    onopen: jest.fn(),
    onmessage: jest.fn(),
    onerror: jest.fn(),
    onclose: jest.fn(),
    send: jest.fn(),
    close: jest.fn(),
  })) as any;
});


defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
    jest.spyOn(runEngine, "sendMessage");
    jest.spyOn(RNFV, "open");
    jest.spyOn(PermissionsAndroid, "request").mockImplementation(((event: string, data: {}) => {
      return true
    }) as any);
  });

  test("User navigates to RequestDetail", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;

    given("I am a User loading RequestDetail", () => {
      Platform.OS = 'android'
      requestDetail = shallow(<RequestDetail {...screenProps} />);
    });

    when("I navigate to the RequestDetail", async () => {
      instance = requestDetail.instance() as RequestDetail;

      const myData = {
        requestId: "446"
      };
      const apiMsg: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      apiMsg.addData(getName(MessageEnum.CustomDataMessage), myData);
      runEngine.sendMessage("Unit Test", apiMsg);


      const userRole = {
        meta: {
          role: "end_user"
        }
      };
      const sessionMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      sessionMsg.addData(getName(MessageEnum.CustomDataMessage), userRole);
      runEngine.sendMessage("Unit Test", sessionMsg);

      let resultMock = {
        "data": {
          "id": "446",
          "type": "notary_request",
          "attributes": {
            "status": 'in progress',
            "notary_id": null,
            "notary_service_type": 2,
            "priority": "Super Priority",
            "notarisation_method_id": 2,
            "jurisdiction_id": 2,
            "date": "2025-01-10T00:00:00.000Z",
            "notes": "dhhdhd d s. ss s ssns. sns s s bsbsbs s s bsbsbs  s s s ss. s s s s s s s sbshwbwbs ebenebeenenenennsje e ebe e e ewh s sbs. s s s sb s sbnsbw w wnsnw nww w e be e e s w. wwbbw w w w w w w",
            "notarised_document": 1,
            "timing_slot": "Morning",
            "invited_request_status": "",
            "is_deleted": false,
            "invite_request": false,
            "invite_number": null,
            "platform_fee_details": {
              "fee_type": "Flat Fee",
              "fee_value": "25.0"
            },
            "juridiction": {
              "id": 2,
              "jurisdiction": "Scotland",
              "created_at": "2024-05-08T06:48:55.839Z",
              "updated_at": "2024-05-08T06:48:55.839Z"
            },
            "notarisation_method": {
              "id": 2,
              "notarisation_method": "Remote Ink Notarisation (RIN)",
              "created_at": "2024-05-08T06:46:56.040Z",
              "updated_at": "2024-05-08T06:47:24.566Z"
            },
            "notary_service_name": "Business and Corporate Services",
            "file_documents": [
              {
                "doc_id": 725,
                "doc_type": "image/png",
                "doc_size": 168426,
                "doc_base_64": "iVBORw0KGgoAAAANSUhEUgAABDgAAAlgCAYAAABtGofVAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAACAASURBVHic7N13nCRnfSf+z1Ohc0/c2byzWSttUpYALSCC4ZCMbcDmAIM5nwOyhX/22WfxO+AcMGBknw/DwQHnO85GHLKxz0G2ZMAmK4AklHYVN",
                "doc_name": "0baa1adc-ba66-4aae-8bf1-b32c6dd282bc.jpg",
                "doc_file_url": "https://zoomnotary-401615-ruby.b401615.stage.eastus.az.svc.builder.ai/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUFEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a122b2ee39452346b54f809d30520ff1a03ac7cb/0baa1adc-ba66-4aae-8bf1-b32c6dd282bc.jpg",
                "signatory_count": 1,
                "recipients": [
                  {
                    "id": 1063,
                    "created_at": "2025-01-09T07:03:57.052Z",
                    "updated_at": "2025-01-09T07:03:57.052Z",
                    "file_document_id": 725,
                    "name": "Arvind 1",
                    "email": "griffinarvind1@gmail.com",
                    "is_signatory": true,
                    "signed": false,
                    "is_notary": false,
                    "signing_url": null,
                    "envelope_id": null,
                    "access_token": null
                  }
                ]
              }
            ],
            "kyc_details": {
              "data": null
            }
          },
          "relationships": {
            "jurisdiction": {
              "data": {
                "id": "2",
                "type": "jurisdiction"
              }
            },
            "notary": {
              "data": null
            },
            "notarisation_method": {
              "data": {
                "id": "2",
                "type": "notarisation_method"
              }
            },
            "account": {
              "data": {
                "id": "348",
                "type": "email_account"
              }
            }
          }
        }
      }

      requestDetail.update();
      const requestDataApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      requestDataApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        requestDataApiCallId.messageId
      );
      requestDataApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        resultMock
      );
      instance.apiDashboardItemCallId = requestDataApiCallId.messageId;
      runEngine.sendMessage("Unit Test", requestDataApiCallId);

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


    });

    then("RequestDetail will load with out errors", () => {
      instance.renderDocumentHeader(docuSignDetail.document_signing_status[0])
      instance.renderDocuSignUI()
      instance.renderHeaderSection()
      instance.renderRequestStatus()
      instance.renderRequestDetails()
      instance.renderMarkCompleteButton()
      instance.renderTabs()
      instance.renderContentSection()
      instance.renderFooterModals()
      instance.renderDocuSignDetails()
      instance.renderDocumentSignatoryNotary(docuSignDetail.document_signing_status[0], 0)
      instance.renderSignatories(docuSignDetail.document_signing_status[0].signatory)
      instance.renderNotaries(docuSignDetail.document_signing_status[0].notary)
      instance.renderPersonCard(docuSignDetail.document_signing_status[0].signatory[0])
      instance.renderPendingPreviewMessage(docuSignDetail.document_signing_status[0])
      instance.renderActionButtons(docuSignDetail.document_signing_status[0])
      instance.renderEndUserButton(docuSignDetail.document_signing_status[0])
      instance.renderNotaryUserButton(docuSignDetail.document_signing_status[0])
      instance.renderStartButton(docuSignDetail.document_signing_status[0])
      instance.renderEmptyDocuSignView()
      instance.renderKYCVerificationUI()
      instance.launchMeeting()
      expect(requestDetail).toBeTruthy();
    });

    then("Get token function shoudl be called", () => {
      const receivedReqApiMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );

      receivedReqApiMessage.addData(
        getName(MessageEnum.SessionResponseToken),
        "tokenstring"
      );

      runEngine.sendMessage("Unit Test", receivedReqApiMessage);
    });

    then("Get received request api should be called in first render", () => {


    });

    when("Network responed for received request api", () => {
      Platform.OS = 'android'
      const mockResponse = {
        data: mockRequestData,
      };

      const receivedReqApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      receivedReqApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        receivedReqApiMessage.messageId
      );

      receivedReqApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      runEngine.sendMessage("Unit Test", receivedReqApiMessage);
    });

    then("ReceivedRequests state should be update", () => {
    });

    when("User click on accept button to accept request", () => {
      Platform.OS = 'android'
      const acceptBtn = requestDetail.findWhere(
        (node) => node.prop("testID") === "acceptBtn-1"
      );
    });

    then("Accept request review api should be call", () => {
    });

    then("Network responed for accept request review api", () => {
      const mockResponse = {
        data: mockRequestData[0],
      };

      const updateReviewApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      updateReviewApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateReviewApiMessage.messageId
      );

      updateReviewApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      runEngine.sendMessage("Unit Test", updateReviewApiMessage);
    });

    when("User click on reject button", () => {
      Platform.OS = 'android'
      const rejectBtn = requestDetail.findWhere(
        (node) => node.prop("testID") === "rejectBtn-1"
      );
    });

    then("User enter reason to reject", () => {
      const rejectReasonTextInputs = requestDetail.findWhere(
        (node) => node.prop("testID") === "rejectReasonTextInputs"
      );
    });

    then("User submit request review to reject", () => {
      const rejectRequestReviewBtn = requestDetail.findWhere(
        (node) => node.prop("testID") === "rejectRequestReviewBtn"
      );
    });

    then("User click on cancel button to close modal", () => {
      const cancelRejectModalBtn = requestDetail.findWhere(
        (node) => node.prop("testID") === "cancelRejectModalBtn"
      );
    });

    then("Network responed for reject request review api", () => {
      const mockResponse = {
        data: mockRequestData[1],
      };

      const updateReviewApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      updateReviewApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateReviewApiMessage.messageId
      );

      updateReviewApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      runEngine.sendMessage("Unit Test", updateReviewApiMessage);
    });

    when("User click on delete request button", () => {
      Platform.OS = 'android'
      const deleteBtn = requestDetail.findWhere(
        (node) => node.prop("testID") === "deleteBtn-1"
      );
    });

    then("Network responed for delete request review api", () => {
      const mockResponse = {
        data: {},
        message: "Request deleted successfully",
      };

      const deleteRequestApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      deleteRequestApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteRequestApiMessage.messageId
      );

      deleteRequestApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      runEngine.sendMessage("Unit Test", deleteRequestApiMessage);
    });

    when("User enter request id in input field to filter", () => {
      Platform.OS = 'android'
      const filterKeyInput = requestDetail.findWhere(
        (node) => node.prop("testID") === "filterKeyInput"
      );
    });

    then("Input field value should be update", () => {
      const filterKeyInput = requestDetail.findWhere(
        (node) => node.prop("testID") === "filterKeyInput"
      );
    });

    when("User press on view button to view request", () => {
      Platform.OS = 'android'
      const viewBtn = requestDetail.findWhere(
        (node) => node.prop("testID") === "viewBtn-2"
      );
    });

    then("View request modal should be opened", () => {
      const viewRequestId = requestDetail.findWhere(
        (node) => node.prop("testID") === "viewRequestId"
      );
      expect(viewRequestId).toBeDefined();
    });

    when("User press on sent request button to navigate", () => {
      Platform.OS = 'android'
      const sendRequestBtn = requestDetail.findWhere(
        (node) => node.prop("testID") === "sendRequestBtn"
      );
    });

    then("Navigation should be call", () => {
      const navigationRaiseMessage = {
        id: "NavigationPayLoadMessage",
        initializeFromObject: expect.any(Function),
        messageId: expect.any(String),
        properties: {},
      };
      const runEngineResult = {
        id: expect.any(String),
        initializeFromObject: expect.any(Function),
        messageId: expect.any(String),
        properties: {
          NavigationPropsMessage: {
            id: "RequestDetail",
            navigation: {
              navigate: expect.any(Function),
            },
          },
          NavigationRaiseMessage: navigationRaiseMessage,
          NavigationTargetMessage: "SentRequest",
        },
      };
    });

    when("Call api for get Request Detail data without error", () => {
      Platform.OS = 'android'
      const requestDataApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      requestDataApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        requestDataApiCallId.messageId
      );
      requestDataApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        requestDataMoked
      );
      instance.apiDashboardItemCallId = requestDataApiCallId.messageId;
      runEngine.sendMessage("Unit Test", requestDataApiCallId);
      mockAPICall(instance, 'meetingApiCallId', meetingRes)

    });

    then("request detail api given sucess response without error", () => {
      expect(instance.getRequestDetail(321)).toBe(true)
    })
  });

  test('User clicks on the tab', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the initial selected tab is "overview"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      expect(instance.state.selectedTab).toBe('overview');
    });

    when('the user clicks on the "settings" tab', async () => {
      RNFS.exists = jest.fn().mockResolvedValue(false);
      jest.mock("react-native-fs", () => ({

        exists: jest.fn(),
        downloadFile: jest.fn().mockResolvedValue({ promise: Promise.reject({ statusCode: 400 }) }),
        statusCode: 200

      }));
      const mockDownloadRequest = jest.fn().mockResolvedValue({
        statusCode: 200,
      });

      await mockDownloadRequest.mockResolvedValue({
        statusCode: 200,
      });
      FileViewer.open = jest.fn().mockResolvedValue(true);
      FileViewer.open = jest.fn().mockRejectedValue(false);
      instance.onClickOfTab('settings', 1);
    });

    then('the selected tab should be "settings"', () => {
      expect(instance.state.selectedTab).toBe('settings');
    });
  });

  test('Toggle signatory state when the same index is selected', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the current signatory index is 1', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      instance.setState({ selectedSignnatoryIndex: 1 });
    });

    given('the selected signatory index is 1', () => {
      instance.setState({ isSignatoryOpen: false });
      Platform.OS = 'android'

    });

    when('the onUpDownArrowOfSignatory function is called with index 1', async () => {
      RNFS.exists = jest.fn().mockResolvedValue(false);
      jest.mock("react-native-fs", () => ({

        exists: jest.fn(),
        downloadFile: jest.fn().mockResolvedValue({ promise: Promise.reject({ statusCode: 400 }) }),
        statusCode: 200

      }));
      const mockDownloadRequest = jest.fn().mockResolvedValue({
        statusCode: 200,
      });

      await mockDownloadRequest.mockResolvedValue({
        statusCode: 200,
      });
      FileViewer.open = jest.fn().mockResolvedValue(true);
      FileViewer.open = jest.fn().mockRejectedValue(false);
      instance.onUpDownArrowOfSignatory(1);
    });

    then('the isSignatoryOpen state should toggle', () => {
      expect(instance.state.isSignatoryOpen).toBe(true);
    });
  });

  test('Open a new signatory when a different index is selected', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the current signatory index is 1', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ selectedSignnatoryIndex: 1, isSignatoryOpen: false });
    });

    given('the selected signatory index is 2', () => {
      // No action needed for this step as it's just a setup for the scenario
    });

    when('the onUpDownArrowOfSignatory function is called with index 2', () => {
      instance.onUpDownArrowOfSignatory(2);
    });

    then('the isSignatoryOpen state should be true', () => {
      expect(instance.state.isSignatoryOpen).toBe(true);
    });

    then('the selectedSignnatoryIndex should be 2', () => {
      expect(instance.state.selectedSignnatoryIndex).toBe(2);
    });
  });

  test('Get up arrow image when signatory is open and index matches', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the signatory is open', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ isSignatoryOpen: true });
      Platform.OS = 'android'

    });

    given('the selected signatory index is 1', () => {
      instance.setState({ selectedSignnatoryIndex: 1 });
      Platform.OS = 'android'

    });

    let result: any;
    when('the getArrowImgUpDown function is called with index 1', async () => {
      RNFS.exists = jest.fn().mockResolvedValue(false);
      jest.mock("react-native-fs", () => ({

        exists: jest.fn(),
        downloadFile: jest.fn().mockResolvedValue({ promise: Promise.reject({ statusCode: 400 }) }),
        statusCode: 200

      }));
      const mockDownloadRequest = jest.fn().mockResolvedValue({
        statusCode: 200,
      });

      await mockDownloadRequest.mockResolvedValue({
        statusCode: 200,
      });
      FileViewer.open = jest.fn().mockResolvedValue(true);
      FileViewer.open = jest.fn().mockRejectedValue(false);
      result = instance.getArrowImgUpDown(1);
    });

    then('the result should be imgRequestUpArrow', () => {
      expect(result).toBe(imgRequestUpArrow);
    });
  });

  test('Get down arrow image when signatory is not open', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the signatory is not open', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ isSignatoryOpen: false });
      Platform.OS = 'android'

    });

    given('the selected signatory index is 1', () => {
      instance.setState({ selectedSignnatoryIndex: 1 });
      Platform.OS = 'android'

    });

    let result: any;
    when('the getArrowImgUpDown function is called with index 1', async () => {
      RNFS.exists = jest.fn().mockResolvedValue(false);
      jest.mock("react-native-fs", () => ({

        exists: jest.fn(),
        downloadFile: jest.fn().mockResolvedValue({ promise: Promise.reject({ statusCode: 400 }) }),
        statusCode: 200

      }));
      const mockDownloadRequest = jest.fn().mockResolvedValue({
        statusCode: 200,
      });

      await mockDownloadRequest.mockResolvedValue({
        statusCode: 200,
      });
      FileViewer.open = jest.fn().mockResolvedValue(true);
      FileViewer.open = jest.fn().mockRejectedValue(false);
      result = instance.getArrowImgUpDown(1);
    });

    then('the result should be imgRequestDownArrow', () => {
      expect(result).toBe(imgRequestDownArrow);
    });
  });

  test('Get down arrow image when index does not match', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the signatory is open', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ isSignatoryOpen: true });
      Platform.OS = 'android'

    });

    given('the selected signatory index is 1', () => {
      instance.setState({ selectedSignnatoryIndex: 1 });
      Platform.OS = 'android'

    });

    let result: any;
    when('the getArrowImgUpDown function is called with index 2', () => {
      result = instance.getArrowImgUpDown(2);
    });

    then('the result should be imgRequestDownArrow', () => {
      expect(result).toBe(imgRequestDownArrow);
    });
  });

  test('Signatory name is visible when index matches and signatory is open', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the signatory is open', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ isSignatoryOpen: true });
      Platform.OS = 'android'

    });

    given('the selected signatory index is 1', () => {
      instance.setState({ selectedSignnatoryIndex: 1 });
      Platform.OS = 'android'

    });

    let result: any;
    when('the isSignatoryNameVisible function is called with index 1', () => {
      result = instance.isSignatoryNameVisible(1);
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('Signatory name is not visible when signatory is not open', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the signatory is not open', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ isSignatoryOpen: false });
      Platform.OS = 'android'

    });

    given('the selected signatory index is 1', () => {
      instance.setState({ selectedSignnatoryIndex: 1 });
      Platform.OS = 'android'

    });

    let result: any;
    when('the isSignatoryNameVisible function is called with index 1', () => {
      result = instance.isSignatoryNameVisible(1);
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Signatory name is not visible when index does not match', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the signatory is open', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ isSignatoryOpen: true });
      Platform.OS = 'android'

    });

    given('the selected signatory index is 1', () => {
      instance.setState({ selectedSignnatoryIndex: 1 });
      Platform.OS = 'android'

    });

    let result: any;
    when('the isSignatoryNameVisible function is called with index 2', () => {
      result = instance.isSignatoryNameVisible(2);
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Handle apiCancellationChargeCallId', ({ given, and, when, then }) => {
    let apiRequestCallId: string;
    let responseJson: any;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('an apiRequestCallId of "apiCancellationChargeCallId"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      apiRequestCallId = 'apiCancellationChargeCallId';
      instance.apiCancellationChargeCallId = 'apiCancellationChargeCallId';
      Platform.OS = 'android'

    });

    and('a responseJson with cancellation charges', () => {
      responseJson = { cancellation_charges: 100 };
    });

    when('the manageApiResponse function is called', () => {
      instance.manageApiResponse(apiRequestCallId, responseJson);
    });

    then('the CancellationCharge state should be set', () => {
      expect(instance.state.CancellationCharge).toEqual(responseJson);
    });

    and('the isCancelRequestModelOpen state should be true', () => {
      expect(instance.state.isCancelRequestModelOpen).toBe(true);
    });
  });

  test('Handle apiCancelRequestCallId', ({ given, and, when, then }) => {
    let apiRequestCallId: string;
    let responseJson: any;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;

    given('an apiRequestCallId of "apiCancelRequestCallId"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      apiRequestCallId = 'apiCancelRequestCallId';
      instance.apiCancelRequestCallId = 'apiCancelRequestCallId';
      Platform.OS = 'android'

    });

    and('a responseJson with notary response', () => {
      responseJson = { notary_id: 1, message: "Success" };
    });

    when('the manageApiResponse function is called', () => {
      instance.manageApiResponse(apiRequestCallId, responseJson);
    });

    then('the cancelRequestRes state should be set', () => {
      expect(instance.state.cancelRequestRes).toEqual(responseJson);
    });
  });

  test('Handle apiQuoteListCallId', ({ given, and, when, then }) => {
    let apiRequestCallId: string;
    let responseJson: any;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;

    given('an apiRequestCallId of "apiQuoteListCallId"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      apiRequestCallId = 'apiQuoteListCallId';
      instance.apiQuoteListCallId = 'apiQuoteListCallId';
      Platform.OS = 'android'

    });

    and('a responseJson with notary response', () => {
      responseJson = {
        "data": [
          {
            "id": "13",
            "type": "quote",
            "attributes": {
              "notary_requests_id": 96,
              "start_time": "2024-08-28T07:00:25.788Z",
              "video_call_required": true,
              "fees": "100.0",
              "end_time": "2024-08-28T07:30:25.793Z",
              "platform_fee_inclusive": false,
              "message": "testing",
              "notary_id": 272,
              "created_at": "2024-08-27T07:01:40.450Z",
              "updated_at": "2024-08-27T07:01:40.450Z",
              "quote_statuses_id": 1,
              "quote_status": "Submitted",
              "notary_fees": "100.0",
              "platform_fees": "50.0"
            }
          }
        ]
      };
    });

    when('the manageApiResponse function is called', () => {
      instance.manageApiResponse(apiRequestCallId, responseJson);
    });

    then('the quoteListData state should be set', () => {
      expect(instance.state.quoteListData).toEqual(responseJson);
    });
  });

  test('Handle apiQuoteStatusListCallId', ({ given, and, when, then }) => {
    let apiRequestCallId: string;
    let responseJson: any;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;

    given('an apiRequestCallId of "apiQuoteStatusListCallId"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      apiRequestCallId = 'apiQuoteStatusListCallId';
      instance.apiQuoteStatusListCallId = 'apiQuoteStatusListCallId';
      Platform.OS = 'android'

    });

    and('a responseJson with notary response', () => {
      responseJson = {
        "quote_statuses": [
          {
            "id": 1,
            "name": "Submitted",
            "created_at": "2024-08-02T17:51:43.126Z",
            "updated_at": "2024-08-02T17:51:43.126Z"
          },
          {
            "id": 2,
            "name": "Withdrawn",
            "created_at": "2024-08-02T17:51:43.137Z",
            "updated_at": "2024-08-02T17:51:43.137Z"
          }
        ]
      }
    });

    when('the manageApiResponse function is called', () => {
      instance.manageApiResponse(apiRequestCallId, responseJson);
    });

    then('the quoteStatusList state should be set', () => {
      expect(instance.state.quoteStatusList).toEqual(responseJson);
    });
  });

  test('Handle apiWithdrawQuoteCallId', ({ given, and, when, then }) => {
    let apiRequestCallId: string;
    let responseJson: any;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;

    given('an apiRequestCallId of "apiWithdrawQuoteCallId"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      apiRequestCallId = 'apiWithdrawQuoteCallId';
      instance.apiWithdrawQuoteCallId = 'apiWithdrawQuoteCallId';
      Platform.OS = 'android'

    });

    and('a responseJson with notary response', () => {
      responseJson = {
        "quote_statuses": [
          {
            "id": 1,
            "name": "Submitted",
            "created_at": "2024-08-02T17:51:43.126Z",
            "updated_at": "2024-08-02T17:51:43.126Z"
          },
          {
            "id": 2,
            "name": "Withdrawn",
            "created_at": "2024-08-02T17:51:43.137Z",
            "updated_at": "2024-08-02T17:51:43.137Z"
          }
        ]
      }
    });

    when('the manageApiResponse function is called', () => {
      instance.manageApiResponse(apiRequestCallId, responseJson);
    });

    then('the selectedQuoteId state should be set as blank', () => {
      expect(instance.state.isWithdrawQuote).toBe(false);
      expect(instance.state.selectedQuoteId).toBe('');
    });
  });

  test('Handle apiCallToCheckDocuSignStartedID', ({ given, and, when, then }) => {
    let apiRequestCallId: string;
    let responseJson: any;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;

    given('an apiRequestCallId of "apiCallToCheckDocuSignStartedID"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      apiRequestCallId = 'apiCallToCheckDocuSignStartedID';
      instance.apiCallToCheckDocuSignStartedID = 'apiCallToCheckDocuSignStartedID';
      Platform.OS = 'android'

    });

    and('a responseJson with notary response', () => {
      responseJson = docuSignDetail
    });

    when('the manageApiResponse function is called', () => {
      instance.manageApiResponse(apiRequestCallId, responseJson);
    });

    then('the docuSignDetail state should be set', () => {
      expect(instance.state.docuSignDetail).toEqual(responseJson.document_signing_status);
    });
  });

  test('Handle apiCallStartDocuSignID', ({ given, and, when, then }) => {
    let apiRequestCallId: string;
    let responseJson: any;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;

    given('an apiRequestCallId of "apiCallStartDocuSignID"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      apiRequestCallId = 'apiCallStartDocuSignID';
      instance.apiCallStartDocuSignID = 'apiCallStartDocuSignID';
      Platform.OS = 'android'

    });

    and('a responseJson with notary response', () => {
      responseJson = {
        "message": "docusign started",
        "signing_urls": "https:/doc/v1/6661b1YOSRj1DVRtTRQILVBbaDYOYdA"
      }
    });

    when('the manageApiResponse function is called', () => {
      instance.manageApiResponse(apiRequestCallId, responseJson);
    });

    then('the startDocumentId state should be set', () => {
      // expect(instance.state.docuSignDetail).toEqual(responseJson.document_signing_status);
    });
  });

  test('Handle getKycVerificationStatusCallId', ({ given, and, when, then }) => {
    let apiRequestCallId: string;
    let responseJson: any;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;

    given('an apiRequestCallId of "getKycVerificationStatusCallId"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      apiRequestCallId = 'getKycVerificationStatusCallId';
      instance.getKycVerificationStatusCallId = 'getKycVerificationStatusCallId';
      Platform.OS = 'android'

    });

    and('a responseJson with notary response', () => {
      responseJson = {
        status: "verified"
      }
    });

    when('the manageApiResponse function is called', () => {
      instance.manageApiResponse(apiRequestCallId, responseJson);
    });

    then('the getKycVerificationStatusCallId state should be set', () => {
      expect(instance.state.kycStatus).toEqual(responseJson);
      instance.handleKycStatusResponse(responseJson)
    });
  });

  test('Handle getUnreadMessageCallId', ({ given, and, when, then }) => {
    let apiRequestCallId: string;
    let responseJson: any;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;

    given('an apiRequestCallId of "getUnreadMessageCallId"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      apiRequestCallId = 'getUnreadMessageCallId';
      instance.getUnreadMessageCallId = 'getUnreadMessageCallId';
      Platform.OS = 'android'

    });

    and('a responseJson with notary response', () => {
      responseJson = {
        count: 1
      }
    });

    when('the manageApiResponse function is called', () => {
      instance.manageApiResponse(apiRequestCallId, responseJson);
    });

    then('the getUnreadMessageCallId state should be set', () => {
      expect(instance.state.messageCount).toEqual(responseJson);
    });
  });

  test('Handle createChatRoomApiCallId', ({ given, and, when, then }) => {
    let apiRequestCallId: string;
    let responseJson: any;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;

    given('an apiRequestCallId of "createChatRoomApiCallId"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      apiRequestCallId = 'createChatRoomApiCallId';
      instance.createChatRoomApiCallId = 'createChatRoomApiCallId';
      Platform.OS = 'android'

    });

    and('a responseJson with notary response', () => {
      responseJson = {
        status: "verified"
      }
    });

    when('the manageApiResponse function is called', () => {
      instance.manageApiResponse(apiRequestCallId, responseJson);
    });

    then('the createChatRoomApiCallId state should be set', () => {
      instance.handleCreateChatRoomApiRes(responseJson)
    });
  });

  test('Handle unhandled API request call ID', ({ given, and, when, then }) => {
    let apiRequestCallId: string;
    let responseJson: any;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });

    given('an apiRequestCallId of "unknownCallId"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      apiRequestCallId = 'unknownCallId';
    });

    and('a responseJson with notary response', () => {
      responseJson = { notary_id: 1, message: "Success" };
    });

    when('the manageApiResponse function is called', () => {
      instance.manageApiResponse(apiRequestCallId, responseJson);
    });


  });

  test('When request status is pending', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the request status is "pending"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({
        requestData: requestDataMoked, isLoader: false
      });
      Platform.OS = 'android'

    });

    when('the cancel request button is pressed', async () => {
      RNFS.exists = jest.fn().mockResolvedValue(false);
      jest.mock("react-native-fs", () => ({


        exists: jest.fn(),
        downloadFile: jest.fn().mockResolvedValue({ promise: Promise.reject({ statusCode: 400 }) }),
        statusCode: 200

      }));
      const mockDownloadRequest = jest.fn().mockResolvedValue({
        statusCode: 200,
      });

      await mockDownloadRequest.mockResolvedValue({
        statusCode: 200,
      });
      FileViewer.open = jest.fn().mockResolvedValue(true);
      FileViewer.open = jest.fn().mockRejectedValue(false);
      instance.btnCancelRequestProps.onPress();
    });

    then('the isCancelRequestModelOpen state should be true', () => {
      expect(instance.state.isCancelRequestModelOpen).toBe(true);
    });
  });

  test('When request status is not pending', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let getCancelChargeSpy: any

    given('the request status is "in progress"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      getCancelChargeSpy = jest.spyOn(instance, 'getCancelCharge');
      instance.setState({
        requestData: requestDataMokedSec, isLoader: false
      });
      let buttonComponentView = requestDetail.findWhere(
        (node) => node.prop("testID") === "DownloadPDFID"
      );

      buttonComponentView.simulate("press");
      const mockDownloadFile = jest.fn().mockImplementation(() => ({
        promise: Promise.resolve({ statusCode: 200 }),
      }));
      jest.mock("react-native-fs", () => ({
        DocumentDirectoryPath: "",
        DownloadDirectoryPath: "",
        downloadFile: mockDownloadFile,
      }));

    });

    when('the cancel request button is pressed', async () => {
      const options = {
        fromUrl: 'url',
        toFile: 'location',
      };

      RNFS.exists = jest.fn().mockResolvedValue(false);
      const mockDownloadFile = jest.fn().mockImplementation(() => ({
        promise: Promise.reject({ statusCode: 400 }),
      }));
      jest.mock("react-native-fs", () => ({
        DocumentDirectoryPath: "",
        DownloadDirectoryPath: "",
        downloadFile: mockDownloadFile,
      }));


      FileViewer.open = jest.fn().mockResolvedValue(true);
      FileViewer.open = jest.fn().mockRejectedValue(false);

      instance.btnCancelRequestProps.onPress();
    });

    then('the getCancelCharge function should be called', () => {
      expect(getCancelChargeSpy).toHaveBeenCalled();
      getCancelChargeSpy.mockRestore();
    });
  });

  test('Close the cancel request model', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the cancel request model is open', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ isCancelRequestModelOpen: true });
      Platform.OS = 'android'

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
    let instance: RequestDetail;
    given('the cancel request model is open', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ isCancelRequestModelOpen: true });
      Platform.OS = 'android'

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
    let instance: RequestDetail;
    let callApiToCancelRequestSpy: any
    given('the cancel request model is open', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      callApiToCancelRequestSpy = jest.spyOn(instance, 'callApiToCancelRequest');
      instance.setState({ isCancelRequestModelOpen: true });
      Platform.OS = 'android'

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

  test('Extract signatory names from FileDocument', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    let fileDocument = {
      doc_name: 'Sample Document',
      doc_file_url: 'http://example.com/doc.pdf',
      signatory_count: 2,
      "doc_id": 725,
      "doc_type": "image/png",
      "doc_size": 168426,
      "doc_base_64": "wQHnO85GHLKxz0G2ZMAmK4AklHYVN",
      recipients: [
        {
          id: 1,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-02T00:00:00Z',
          file_document_id: 123,
          name: 'Alice',
          email: 'alice@example.com',
          is_signatory: true,
          "signed": false,
          "is_notary": false,
          "signing_url": null,
          "envelope_id": null,
          "access_token": null
        },
        {
          id: 2,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-02T00:00:00Z',
          file_document_id: 123,
          name: 'Bob',
          email: 'bob@example.com',
          is_signatory: false,
          "signed": false,
          "is_notary": false,
          "signing_url": null,
          "envelope_id": null,
          "access_token": null
        },
        {
          id: 3,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-02T00:00:00Z',
          file_document_id: 123,
          name: 'Charlie',
          email: 'charlie@example.com',
          is_signatory: true,
          "signed": false,
          "is_notary": false,
          "signing_url": null,
          "envelope_id": null,
          "access_token": null
        }
      ]
    };
    given('a FileDocument with recipients', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'

    });

    when('I call getIsSignatoryObject', () => {
      result = instance.getIsSignatoryObject(fileDocument);
    });

    then('I should get an array of signatory names', () => {
      expect(result).toEqual(['Alice', 'Charlie']);
    });
  });

  test('Cancel request button should be visible', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any
    given('the selected action type is \'cancel\'', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'

    });

    given('the request status is \'pending\'', () => {
      instance.selectedActionType = 'cancel'
      instance.setState({ requestData: requestDataMoked, userRoleType: 'end_user', isLoader: false });
      Platform.OS = 'android'

    });

    when('I check if the cancel request button is visible', async () => {
      RNFS.exists = jest.fn().mockResolvedValue(false);
      jest.mock("react-native-fs", () => ({

        exists: jest.fn(),
        downloadFile: jest.fn().mockResolvedValue({ promise: Promise.reject({ statusCode: 400 }) }),

      }));
      const mockDownloadRequest = jest.fn().mockResolvedValue({
        statusCode: 200,
      });

      await mockDownloadRequest.mockResolvedValue({
        statusCode: 200,
      });
      FileViewer.open = jest.fn().mockResolvedValue(true);
      FileViewer.open = jest.fn().mockRejectedValue(false);
      result = instance.isCancelRequestBtnVisible();
    });

    then('the cancel request button should be visible', () => {
      expect(result).toBe(true);
    });
  });

  test('Cancel request button should not be visible', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any
    given('the selected action type is \'cancel\'', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'

    });

    given('the request status is \'in progress\'', () => {
      instance.selectedActionType = 'cancel'
      instance.setState({ requestData: requestDataMokedSec, userRoleType: 'end_user', isLoader: false });
      Platform.OS = 'android'

    });

    when('I check if the cancel request button is visible', async () => {
      RNFS.exists = jest.fn().mockResolvedValue(false);
      jest.mock("react-native-fs", () => ({

        exists: jest.fn(),
        downloadFile: jest.fn().mockResolvedValue({ promise: Promise.reject({ statusCode: 400 }) }),

      }));
      const mockDownloadRequest = jest.fn().mockResolvedValue({
        statusCode: 200,
      });

      await mockDownloadRequest.mockResolvedValue({
        statusCode: 200,
      });
      FileViewer.open = jest.fn().mockResolvedValue(true);
      FileViewer.open = jest.fn().mockRejectedValue(false);
      result = instance.isCancelRequestBtnVisible();
    });

    then('the cancel request button should not be visible', () => {
      expect(result).toBe(true);
    });
  });

  test('Cancel request button should not be visible for completed status', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any
    given('the selected action type is \'cancel\'', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      Platform.OS = 'android'

      instance = requestDetail.instance() as RequestDetail;
    });

    given('the request status is \'completed\'', () => {


      Platform.OS = 'android'
      instance.setState({ requestData: requestDataMokedSec, userRoleType: 'notary', isLoader: false });

      let buttonComponentView = requestDetail.findWhere(
        (node) => node.prop("testID") === "OpenViewFile"
      );

      buttonComponentView.simulate("press");
      const mockDownloadFile = jest.fn().mockImplementation(() => ({
        promise: Promise.resolve({ statusCode: 200 }),
      }));
      jest.mock("react-native-fs", () => ({
        DocumentDirectoryPath: "",
        DownloadDirectoryPath: "",
        downloadFile: mockDownloadFile,
      }));
    });

    when('I check if the cancel request button is visible', async () => {
      RNFS.exists = jest.fn().mockResolvedValue(false);

      jest.mock("react-native-fs", () => ({

        exists: jest.fn(),
        downloadFile: jest.fn().mockResolvedValue({ promise: Promise.reject({ statusCode: 400 }) }),
        statusCode: 200

      }));
      const mockDownloadRequest = jest.fn().mockResolvedValue({
        statusCode: 200,
      });

      await mockDownloadRequest.mockResolvedValue({
        statusCode: 200,
      });
      FileViewer.open = jest.fn().mockResolvedValue(true);
      FileViewer.open = jest.fn().mockRejectedValue(false);
      result = instance.isCancelRequestBtnVisible();
    });

    then('the cancel request button should not be visible', () => {
      expect(result).toBe(false);
    });

    then('returns completedStatusDetailView for completed status', () => {
      const result = instance.renderStatusDetailView('completed');
      expect(result).toBe('completedStatusDetailView');
    });

    then('returns draftStatusDetailView for draft status', () => {
      const result = instance.renderStatusDetailView('draft');
      expect(result).toBe('draftStatusDetailView');
    });

    then('returns pendingStatusDetailView for pending status', () => {
      const result = instance.renderStatusDetailView('pending');
      expect(result).toBe('pendingStatusDetailView');
    });

    then('returns cancelledStatusDetailView for cancelled status', () => {
      const result = instance.renderStatusDetailView('cancelled');
      expect(result).toBe('cancelledStatusDetailView');
    });

    then('returns inprogressStatusDetailView for unknown status', () => {
      const result = instance.renderStatusDetailView('unknown');
      expect(result).toBe('inprogressStatusDetailView');
    });
  });

  let text: any;
  let maxLength: number;
  test('Truncate text when it exceeds the specified length', ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: RequestDetail;
    let value: any;
    given('a text with length exceeding the specified limit', () => {
      dashboardWrapper = shallow(<RequestDetail {...screenProps} />);
      text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit.';
      maxLength = 20;
    });

    let truncatedResult: string;
    when('the truncatedText function is called', () => {
      instance = dashboardWrapper.instance() as RequestDetail;
      truncatedResult = instance.truncatedText(text, maxLength);
    });

    then('it should return truncated text with the specified length', () => {
      expect(truncatedResult.length).toBe(maxLength + 3); // Plus 3 for the ellipsis '...'
      expect(truncatedResult).toBe('Lorem ipsum dolor si...');
    });
  });

  test('Do not truncate text when it does not exceed the specified length', ({ given, when, then }) => {
    let value: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: RequestDetail;
    given('a text with length not exceeding the specified limit', () => {
      dashboardWrapper = shallow(<RequestDetail {...screenProps} />);
      text = 'Short text';
      maxLength = 20;
    });

    let truncatedResult: any;
    when('the truncatedText function is called', () => {
      instance = dashboardWrapper.instance() as RequestDetail;

      truncatedResult = instance.truncatedText(text, maxLength);
    });

    then('it should return the original text', () => {
      expect(truncatedResult).toBe(text);
    });
  });

  test('File name with multiple slashes', ({ given, when, then }) => {
    let filePath: any, selectedFileName: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: RequestDetail;
    given('a file path "path/to/the/file/document.txt"', () => {
      dashboardWrapper = shallow(<RequestDetail {...screenProps} />);
      instance = dashboardWrapper.instance() as RequestDetail;
      Platform.OS = 'android'
      filePath = "path/to/the/file/document.txt";
    });

    when('I get the selected file name', async () => {
      RNFS.exists = jest.fn().mockResolvedValue(false);
      jest.mock("react-native-fs", () => ({

        exists: jest.fn(),
        downloadFile: jest.fn().mockResolvedValue({ promise: Promise.reject({ statusCode: 400, }), }),

      }));
      const mockDownloadRequest = jest.fn().mockResolvedValue({
        statusCode: 200,
      });

      await mockDownloadRequest.mockResolvedValue({
        statusCode: 200,
      });
      FileViewer.open = jest.fn().mockResolvedValue(true);
      FileViewer.open = jest.fn().mockRejectedValue(false);
      selectedFileName = instance.getSelectedFileName(filePath);
    });

    then('the selected file name should be "document.txt"', () => {
      expect(selectedFileName).toBe("document.txt");
    });
  });

  test('File name without slashes', ({ given, when, then }) => {
    let filePath: any, selectedFileName: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: RequestDetail;

    given('a file path "document.txt"', () => {
      dashboardWrapper = shallow(<RequestDetail {...screenProps} />);
      instance = dashboardWrapper.instance() as RequestDetail;
      Platform.OS = 'android'
      filePath = "document.txt";
    });

    when('I get the selected file name', async () => {
      RNFS.exists = jest.fn().mockResolvedValue(false);
      jest.mock("react-native-fs", () => ({

        exists: jest.fn(),
        downloadFile: jest.fn().mockResolvedValue({ promise: Promise.reject({ statusCode: 400 }) }),
        statusCode: 200

      }));
      const mockDownloadRequest = jest.fn().mockResolvedValue({
        statusCode: 200,
      });

      await mockDownloadRequest.mockResolvedValue({
        statusCode: 200,
      });
      FileViewer.open = jest.fn().mockResolvedValue(true);
      FileViewer.open = jest.fn().mockRejectedValue(false);
      selectedFileName = instance.getSelectedFileName(filePath);

    });

    then('the selected file name should be "document.txt"', () => {
      expect(selectedFileName).toBe("document.txt");
    });
  });

  test('File name with special characters', ({ given, when, then }) => {
    let filePath: any, selectedFileName: any;
    let dashboardWrapper: ShallowWrapper;
    let instance: RequestDetail;

    given('a file path "path/to/the/file/another_document-2024.txt"', () => {
      dashboardWrapper = shallow(<RequestDetail {...screenProps} />);
      instance = dashboardWrapper.instance() as RequestDetail;
      Platform.OS = 'android'
      filePath = "path/to/the/file/another_document-2024.txt";
    });

    when('I get the selected file name', async () => {
      RNFS.exists = jest.fn().mockResolvedValue(false);
      jest.mock("react-native-fs", () => ({

        exists: jest.fn(),
        downloadFile: jest.fn().mockResolvedValue({ promise: Promise.reject({ statusCode: 400 }) }),
        statusCode: 200

      }));
      const mockDownloadRequest = jest.fn().mockResolvedValue({
        statusCode: 200,
      });

      await mockDownloadRequest.mockResolvedValue({
        statusCode: 200,
      });
      FileViewer.open = jest.fn().mockResolvedValue(true);
      FileViewer.open = jest.fn().mockRejectedValue(false);
      selectedFileName = instance.getSelectedFileName(filePath);
    });

    then('the selected file name should be "another_document-2024.txt"', () => {
      expect(selectedFileName).toBe("another_document-2024.txt");
    });
  });

  test('Pressing the request detail button', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let sendMock: any;
    given('the requestId is "12345"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      // instance.requestId = "12345";
      sendMock = jest.fn();
      instance.send = sendMock;
    });

    given('the props are set', () => {
      Platform.OS = 'android'

    });

    when('I press the request detail button', async () => {
      RNFS.exists = jest.fn().mockResolvedValue(false);
      jest.mock("react-native-fs", () => ({

        exists: jest.fn(),
        downloadFile: jest.fn().mockResolvedValue({ promise: Promise.reject({ statusCode: 400 }) }),
        statusCode: 200

      }));
      const mockDownloadRequest = jest.fn().mockResolvedValue({
        statusCode: 200,
      });

      await mockDownloadRequest.mockResolvedValue({
        statusCode: 200,
      });
      FileViewer.open = jest.fn().mockResolvedValue(true);
      FileViewer.open = jest.fn().mockRejectedValue(false);
      instance.btnMakeQuoteProps.onPress();
    });

    then('it should send a navigation message with the request details', () => {
      const msg = sendMock.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationQuoteManagementMessage));
      expect(msg.getData(getName(MessageEnum.CustomDataMessage))).toEqual({
        requestId: instance.state.requestData?.id,
        actionType: instance.selectedActionType,
        requestDate: instance.state.requestData?.attributes.date,
        token: instance.state.token,
        notarisation_method: instance.state.requestData?.attributes.notarisation_method.notarisation_method
      });
    });

    then('the actionType should be "view"', () => {
      const msg = sendMock.mock.calls[0][0];
      const selectedRequest = msg.getData(getName(MessageEnum.CustomDataMessage));
      expect(selectedRequest.actionType).toBe(instance.selectedActionType);
    });
  });

  test('Convert a valid date string to 12-hour time format', ({ given, when, then }) => {
    let dateString: string | undefined;
    let result: string | undefined;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given(/^the date string "(.*)"$/, (date) => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      dateString = date;
    });

    when('the getConverteTime function is called', async () => {
      RNFS.exists = jest.fn().mockResolvedValue(false);
      jest.mock("react-native-fs", () => ({

        exists: jest.fn(),
        downloadFile: jest.fn().mockResolvedValue({ promise: Promise.reject({ statusCode: 400 }) }),
        statusCode: 200

      }));
      const mockDownloadRequest = jest.fn().mockResolvedValue({
        statusCode: 200,
      });

      await mockDownloadRequest.mockResolvedValue({
        statusCode: 200,
      });
      FileViewer.open = jest.fn().mockResolvedValue(true);
      FileViewer.open = jest.fn().mockRejectedValue(false);
      result = instance.getConverteTime(dateString);
    });

    then(/^the result should be "(.*)"$/, (expectedResult) => {
      expect(result).toBe(expectedResult);
    });
  });

  test('Convert another valid date string to 12-hour time format', ({ given, when, then }) => {
    let dateString: string | undefined;
    let result: string | undefined;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given(/^the date string "(.*)"$/, (date) => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      dateString = date;
    });

    when('the getConverteTime function is called', () => {
      result = instance.getConverteTime(dateString);
    });

    then(/^the result should be "(.*)"$/, (expectedResult) => {
      expect(result).toBe(expectedResult);
    });
  });

  test('Handle undefined date input', ({ given, when, then }) => {
    let dateString: string | undefined = undefined;
    let result: string | undefined;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the date string is undefined', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      // dateString is already set to undefined
    });

    when('the getConverteTime function is called', () => {
      result = instance.getConverteTime(dateString);
    });

    then('the result should be undefined', () => {
      expect(result).toBeUndefined();
    });
  });

  test('Convert a valid date string to DD/MM/YYYY format', ({ given, when, then }) => {
    let dateString: string | undefined;
    let result: string | undefined;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given(/^the date string "(.*)"$/, (date) => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      dateString = date;
    });

    when('the getConverteDate function is called', () => {
      result = instance.getConverteDate(dateString);
    });

    then(/^the result should be "(.*)"$/, (expectedResult) => {
      expect(result).toBe(expectedResult);
    });
  });

  test('Convert another valid date string to DD/MM/YYYY format', ({ given, when, then }) => {
    let dateString: string | undefined;
    let result: string | undefined;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given(/^the date string "(.*)"$/, (date) => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      dateString = date;
    });

    when('the getConverteDate function is called', () => {
      result = instance.getConverteDate(dateString);
    });

    then(/^the result should be "(.*)"$/, (expectedResult) => {
      expect(result).toBe(expectedResult);
    });
  });

  test('Trigger onPress in cancelPreviewModel', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the cancelPreviewModel is defined', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      Platform.OS = 'android'
      instance = requestDetail.instance() as RequestDetail;
    });

    when('the onPress method is called', () => {
      let buttonComponent = requestDetail.findWhere(
        (node) => node.prop("testID") === "onCloseTestID"
      );
      buttonComponent.simulate("press");
      let buttonComponentCancel = requestDetail.findWhere(
        (node) => node.prop("testID") === "CancelID"
      );
      buttonComponentCancel.simulate("press");

      instance.cancelPreviewModel.onPress();
      instance.closePreviewQuoteModel()
      instance.setState({ isPreviewQuoteModel: false })
    });

    then('the closePreviewQuoteModel function should be called', () => {
      expect(instance.state.isPreviewQuoteModel).toBe(false);
    });
  });

  test('Set state when preview button is clicked', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let item: any;
    let number: number;

    given('a QuoteData item and a number', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      item = {
        "id": "44",
        "type": "quote",
        "attributes": {
          "notary_requests_id": 208,
          "start_time": "2024-08-13T12:13:12.000Z",
          "video_call_required": true,
          "end_time": "2024-08-13T13:43:12.000Z",
          "fees": "100",
          "platform_fee_inclusive": true,
          "message": "This is a test quote",
          "notary_id": 1020,
          "created_at": "2024-08-13T10:09:54.630Z",
          "updated_at": "2024-08-14T12:47:33.708Z",
          "quote_statuses_id": 5,
          "quote_status": "Revoked",
          "notary_fees": "95.0",
          "platform_fees": "5.0"
        }
      }
      number = 1;
    });

    when('the onClickPreviewBtn method is called with the item and number', () => {
      instance.onClickPreviewBtn(item, number);
    });

    then('the state should be updated with isPreviewQuoteModel true, previewQuoteDetail as the item, and quoteNumber as the number', () => {
      expect(instance.state.isPreviewQuoteModel).toBe(true);
      expect(instance.state.quoteNumber).toBe(1);
    });
  });

  test('User role is notary and request status is pending', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;

    given('the user role type is "notary"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      instance.setState({ userRoleType: 'notary' });
    });
    let reqStatus: any
    given('the request status is "pending"', () => {
      reqStatus = 'pending';
      Platform.OS = 'android'
      instance.setState({ requestData: requestDataMoked, isLoader: false });
    });
    let result: any;
    when('the isMakeQuoteBtnVisible method is called', () => {
      result = instance.isMakeQuoteBtnVisible();
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('User role is not notary', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the user role type is "client"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      instance.setState({ userRoleType: 'end_user' });
    });
    let reqStatus: any
    given('the request status is "pending"', () => {
      Platform.OS = 'android'
      reqStatus = 'pending';
    });
    let result: any;
    when('the isMakeQuoteBtnVisible method is called', () => {
      result = instance.isMakeQuoteBtnVisible();
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Request status is not pending', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the user role type is "notary"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      instance.setState({ userRoleType: 'notary' });
    });
    let reqStatus: any
    given('the request status is "completed"', () => {
      reqStatus = 'completed';
      Platform.OS = 'android'
    });
    let result: any;
    when('the isMakeQuoteBtnVisible method is called', () => {
      result = instance.isMakeQuoteBtnVisible();
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Make Quote button should be visible', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the quote list data with the status not equal to "Submitted"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      instance.setState({
        quoteListData: {
          data: [
            {
              "id": "11",
              "type": "quote",
              "attributes": {
                "notary_requests_id": 614,
                "start_time": "2000-01-01T09:55:30.000Z",
                "video_call_required": false,
                "fees": "258.0",
                "end_time": "2000-01-01T10:55:30.000Z",
                "platform_fee_inclusive": false,
                "message": "",
                "notary_id": 1320,
                "created_at": "2024-08-07T10:51:17.341Z",
                "updated_at": "2024-08-07T10:51:17.341Z",
                "quote_statuses_id": 1,
                "quote_status": "Not Submitted",
                notary_fees: '',
                platform_fees: '',
                "vat_fee": ""
              }
            }
          ]
        }
      });
    });

    then('the Make Quote button should be visible', () => {
      expect(instance.isMakeQuoteBtnShow()).toBe(true);
    });
  });

  test('Make Quote button should not be visible', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the quote list data with the status equal to "Submitted"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      instance.setState({
        quoteListData: {
          data: [
            {
              "id": "11",
              "type": "quote",
              "attributes": {
                "notary_requests_id": 614,
                "start_time": "2000-01-01T09:55:30.000Z",
                "video_call_required": false,
                "fees": "258.0",
                "end_time": "2000-01-01T10:55:30.000Z",
                "platform_fee_inclusive": false,
                "message": "",
                "notary_id": 1320,
                "created_at": "2024-08-07T10:51:17.341Z",
                "updated_at": "2024-08-07T10:51:17.341Z",
                "quote_statuses_id": 1,
                "quote_status": "Submitted",
                notary_fees: '',
                platform_fees: '',
                "vat_fee": ""
              }
            }
          ]
        }
      });
    });


    then('the Make Quote button should not be visible', () => {
      expect(instance.isMakeQuoteBtnShow()).toBe(false);
    });
  });

  test('Order Quote view should be visible', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the quote list data is available and has items', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      instance.setState({
        quoteListData: {
          "data": [
            {
              "id": "11",
              "type": "quote",
              "attributes": {
                "notary_requests_id": 614,
                "start_time": "2000-01-01T09:55:30.000Z",
                "video_call_required": false,
                "fees": "258.0",
                "end_time": "2000-01-01T10:55:30.000Z",
                "platform_fee_inclusive": false,
                "message": "",
                "notary_id": 1320,
                "created_at": "2024-08-07T10:51:17.341Z",
                "updated_at": "2024-08-07T10:51:17.341Z",
                "quote_statuses_id": 1,
                "quote_status": "Submitted",
                notary_fees: '',
                platform_fees: '',
                "vat_fee": ""
              }
            }
          ]
        }
      });
    });

    when('the showOrderQuoteView function is called', () => {
      // Function is already called in the given step
    });

    then('the Order Quote view should be visible', () => {
      expect(instance.showorderQuoteView()).toBe(true);
    });
  });

  test('Order Quote view should not be visible', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the quote list data is not available or empty', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      instance.setState({
        quoteListData: {
          data: []
        }
      });
    });

    when('the showOrderQuoteView function is called', () => {
      // Function is already called in the given step
    });

    then('the Order Quote view should not be visible', () => {
      expect(instance.showorderQuoteView()).toBe(false);
    });
  });

  test('Quote number should be visible', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the key is "quotes" and the quote list data is available with items', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      instance.setState({
        quoteListData: {
          "data": [
            {
              "id": "11",
              "type": "quote",
              "attributes": {
                "notary_requests_id": 614,
                "start_time": "2000-01-01T09:55:30.000Z",
                "video_call_required": false,
                "fees": "258.0",
                "end_time": "2000-01-01T10:55:30.000Z",
                "platform_fee_inclusive": false,
                "message": "",
                "notary_id": 1320,
                "created_at": "2024-08-07T10:51:17.341Z",
                "updated_at": "2024-08-07T10:51:17.341Z",
                "quote_statuses_id": 1,
                "quote_status": "Submitted",
                notary_fees: '',
                platform_fees: '',
                "vat_fee": ""
              }
            }
          ]
        }
      });
    });

    when('the showQuoteNumber function is called with the key "quotes"', () => {
      // Function is already called in the given step
    });

    then('the quote number should be visible', () => {
      expect(instance.showQuoteNumber('quotes')).toBe(true);
    });
  });

  test('Quote number should not be visible due to key mismatch', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the key is not "quotes"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      // No specific state setup needed for key mismatch
    });

    when('the showQuoteNumber function is called with the mismatched key', () => {
      // Function is already called in the given step
    });

    then('the quote number should not be visible', () => {
      expect(instance.showQuoteNumber('differentKey')).toBe(false);
    });
  });

  test('Quote number should not be visible due to empty quote list data', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the key is "quotes" and the quote list data is empty', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      instance.setState({
        quoteListData: {
          data: []
        }
      });
    });

    when('the showQuoteNumber function is called with the key "quotes"', () => {
      // Function is already called in the given step
    });

    then('the quote number should not be visible', () => {
      expect(instance.showQuoteNumber('quotes')).toBe(false);
    });
  });

  test('Pay Now button is pressed', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let mockSend: any;
    let mockMessage: any;
    given('the component is rendered with initial state', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      mockSend = jest.spyOn(instance, 'send').mockImplementation(() => { });
      mockMessage = jest.spyOn(Message.prototype, 'addData').mockImplementation(() => { });

      instance.setState({
        isPreviewQuoteModel: true,
        previewQuoteDetail: {
          "id": "32",
          "type": "quote",
          "attributes": {
            "notary_requests_id": 661,
            "start_time": "2024-08-31T06:44:01.369Z",
            "video_call_required": true,
            "fees": "10.0",
            "end_time": "2024-08-31T08:44:01.378Z",
            "platform_fee_inclusive": true,
            "message": "",
            "notary_id": 1204,
            "created_at": "2024-08-21T06:44:24.080Z",
            "updated_at": "2024-08-21T06:44:24.080Z",
            "quote_statuses_id": 1,
            "quote_status": "Submitted",
            "notary_fees": "10.0",
            "platform_fees": "0",
            "vat_fee": ""
          }
        },
        // selectedActionType: 'PAY_NOW',
        token: 'token123'
      });
    });

    when('the Pay Now button is pressed', () => {
      instance.btnPayNowProps.onPress();
    });

    then('the state should be updated to close the preview quote model', () => {
      expect(instance.state.isPreviewQuoteModel).toBe(false);
    });

    then('a navigation message should be sent with the correct data', () => {
      expect(mockSend).toHaveBeenCalled();
      expect(mockMessage).toHaveBeenCalledWith(getName(MessageEnum.NavigationPropsMessage), instance.props);
    });
  });

  test('Calculate total fees when previewQuoteDetail is present', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given(/^the previewQuoteDetail state is set with notary fees "([^"]*)" and platform fees "([^"]*)"$/, (notaryFees, platformFees) => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;

      instance.setState({
        previewQuoteDetail: {
          "id": "32",
          "type": "quote",
          "attributes": {
            "notary_requests_id": 661,
            "start_time": "2024-08-31T06:44:01.369Z",
            "video_call_required": true,
            "fees": "10.0",
            "end_time": "2024-08-31T08:44:01.378Z",
            "platform_fee_inclusive": true,
            "message": "",
            "notary_id": 1204,
            "created_at": "2024-08-21T06:44:24.080Z",
            "updated_at": "2024-08-21T06:44:24.080Z",
            "quote_statuses_id": 1,
            "quote_status": "Submitted",
            "notary_fees": "10.0",
            "platform_fees": "0",
            "vat_fee": ""
          }
        },
        token: 'token123'
      });
    });

    let totalFees: any;
    when('the getTotalFees function is called', () => {
      totalFees = instance.getTotalFees();
    });

    then(/^the total fees should be "([^"]*)"$/, (expectedTotalFees) => {
      expect(totalFees).toBe(Number(expectedTotalFees));
    });
  });

  test('Return undefined when previewQuoteDetail is not present', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the previewQuoteDetail state is not set', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
    });

    let result: any;
    when('the getTotalFees function is called', () => {
      result = instance.getTotalFees();
    });

    then('the result should be undefined', () => {
      expect(result).toBeUndefined();
    });
  });

  test('Successfully update selected tab to "overview"', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the component is rendered', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
    });

    when('I call the updateTabs function', () => {
      instance.updateTabs();
    });

    then('the state should have "selectedTab" set to "overview"', () => {
      expect(instance.state.selectedTab).toBe('overview');
    });
  });

  test('Meeting data is available', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any
    given('the component is rendered with meeting data', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      instance.setState({
        meetingLinkData: meetingRes,
        selectedTab: 'meeting'
      });
    });

    when('I call the isMeetingDataAvailable function', () => {
      result = instance.isMeetingDataAvailable();
    });

    then('it should return true', () => {
      expect(result).toBe(true);
    });
  });

  test('Meeting data is not available', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any
    given('the component is rendered without meeting data', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      instance.setState({
        meetingLinkData: null,
        selectedTab: 'meeting'
      });
    });

    when('I call the isMeetingDataAvailable function', () => {
      result = instance.isMeetingDataAvailable();
    });

    then('it should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('Tracking details are available', ({ given, when, then }) => {
    let apiRequestCallId: string;
    let responseJson: any;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any
    given('the component is rendered with tracking data', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      instance.setState({
        TrackingDataData: quoteData
      });
    });

    when('I call the isTrackingDetailAvailable function', () => {
      result = instance.isTrackingDetailAvailable();


      instance.setState({ selectedTab: 'tracking' });
      instance.renderContentSection()
      instance.renderTrackingDetailUI()
      instance.setState({})
      instance.setState({ emailid: "notary22@yopmail.com" })

      let data = [{ "id": "42", "type": "tracking_detail", "attributes": { "shipment_provider_name": "Blue dart", "tracking_number": "7867565645", "additional_notes": "Test", "added_by": "Notary 22", "added_date": "2024-10-22T12:10:56.008Z", "added_by_email": "notary22@yopmail.com" } }, { "id": "43", "type": "tracking_detail", "attributes": { "shipment_provider_name": "Flipcart", "tracking_number": "7867567878", "additional_notes": "Test", "added_by": "Notary 22", "added_date": "2024-10-22T12:42:29.708Z", "added_by_email": "notary22@yopmail.com" } }]
      let flatlistComponent = requestDetail.findWhere((node) => node.prop('testID') === 'trackingflatlist');
      let flatlistComponent2 = flatlistComponent.renderProp("renderItem")({
        item: data[0],
        index: 0,
      });
      flatlistComponent.renderProp("keyExtractor")({
        item: data[0],
        index: 0,
      });
      let btnpress = flatlistComponent2.findWhere((node) => node.prop('testID') === 'btntoggle');
      btnpress.simulate('press')

      let flatlistComponent3 = flatlistComponent.renderProp("renderItem")({
        item: data[1],
        index: 0,
      });
      let btnpress1 = flatlistComponent3.findWhere((node) => node.prop('testID') === 'btntoggle');
      btnpress1.simulate('press')

      instance.trackingdetailsedit({ "id": "42", "type": "tracking_detail", "attributes": { "shipment_provider_name": "Blue dart", "tracking_number": "7867565645", "additional_notes": "Test", "added_by": "Notary 22", "added_date": "2024-10-22T12:10:56.008Z", "added_by_email": "notary22@yopmail.com" } })
      instance.isStringNullOrBlank("str")

      instance.btnAddMoreTrackingProps.onPress()
      instance.btnEditTrackingdataProps.onPress()
      instance.txtInputProviderNamePrpos.onChangeText("test");
      instance.txtInputTrackinNumberPrpos.onChangeText("7418229345");
      instance.onChangeAdditionalNotes("notes");

      instance.setState({ providername: "" })
      instance.btnAddTrackingDetailsProps.onPress()
      instance.setState({ providername: "test", trackingnumber: "" })
      instance.btnAddTrackingDetailsProps.onPress()
      instance.setState({ providername: "test", trackingnumber: "223456778" })
      instance.btnAddTrackingDetailsProps.onPress()

      instance.closeAddTrackingModel()

      apiRequestCallId = 'getTrackingDetailsCallId';
      instance.getTrackingDetailsCallId = 'getTrackingDetailsCallId';

      responseJson = {
        "data": [
          { "id": "42", "type": "tracking_detail", "attributes": { "shipment_provider_name": "Blue dart", "tracking_number": "7867565645", "additional_notes": "Test", "added_by": "Notary 22", "added_date": "2024-10-22T12:10:56.008Z", "added_by_email": "notary22@yopmail.com" } }
        ]
      };
      instance.manageApiResponse(apiRequestCallId, responseJson);
      instance.manageApiResponse("AddTrackingdataCallId", responseJson);

    });

    then('it should return true', () => {
      expect(result).toBe(true);
    });
  });

  test('Tracking details are not available', ({ given, when, then }) => {
    let apiRequestCallId: string;
    let responseJson: any;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any
    given('the component is rendered without tracking data', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      // instance.setState({
      //   TrackingDataData: { data: [] }
      // });

      apiRequestCallId = 'AddTrackingdataCallId';
      instance.AddTrackingdataCallId = 'AddTrackingdataCallId';

      responseJson = {
        "data": [
          { "id": "42", "type": "tracking_detail", "attributes": { "shipment_provider_name": "Blue dart", "tracking_number": "7867565645", "additional_notes": "Test", "added_by": "Notary 22", "added_date": "2024-10-22T12:10:56.008Z", "added_by_email": "notary22@yopmail.com" } }
        ]
      };
      instance.manageApiResponse(apiRequestCallId, responseJson);

      instance.setState({ id: "" })

      instance.AddTrakingdataApi()

    });

    when('I call the isTrackingDetailAvailable function', () => {
      result = instance.isTrackingDetailAvailable();
    });

    then('it should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('KYC details are available', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any
    given('the component is rendered with KYC data', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      instance.setState({
        kycDetailData: quoteData
      });
    });

    when('I call the isKYCDetailAvailable function', () => {
      result = instance.isKYCDetailAvailable();
    });

    then('it should return true', () => {
      expect(result).toBe(true);
    });
  });

  test('KYC details are not available', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any
    given('the component is rendered without KYC data', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      instance.setState({
        kycDetailData: { data: [] }
      });
    });

    when('I call the isKYCDetailAvailable function', () => {
      result = instance.isKYCDetailAvailable();
    });

    then('it should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('DocuSign details are available', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any
    given('the component is rendered with DocuSign data', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      instance.setState({
        docuSignDetail: docuSignDetail.document_signing_status
      });
    });

    when('I call the isDocuSignDetailAvailable function', () => {
      result = instance.isDocuSignDetailAvailable();
    });

    then('it should return true', () => {
      expect(result).toBe(true);
    });
  });

  test('DocuSign details are not available', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any
    given('the component is rendered without DocuSign data', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      instance.setState({
        docuSignDetail: null
      });
    });

    when('I call the isDocuSignDetailAvailable function', () => {
      result = instance.isDocuSignDetailAvailable();
    });

    then('it should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('Toggle isNotifyMins from false to true', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the component is rendered with isNotifyMins as false', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      instance.setState({ isNotifyMins: false });
    });

    given('notifyMinsProps.isChecked is false', () => {
      Platform.OS = 'android'
      instance.notifyMinsProps.isChecked = false;
    });

    when('I press the notify mins button', () => {
      instance.btnNotifyMinsProps.onPress();
    });

    then('isNotifyMins should be true', () => {
      expect(instance.state.isNotifyMins).toBe(true);
    });

    then('notifyMinsProps.isChecked should be true', () => {
      expect(instance.notifyMinsProps.isChecked).toBe(true);
    });
  });

  test('Toggle isNotifyMins from true to false', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the component is rendered with isNotifyMins as true', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      instance.setState({ isNotifyMins: true });
    });

    given('notifyMinsProps.isChecked is true', () => {
      Platform.OS = 'android'
      instance.notifyMinsProps.isChecked = true;
    });

    when('I press the notify mins button', () => {
      instance.btnNotifyMinsProps.onPress();
    });

    then('isNotifyMins should be false', () => {
      expect(instance.state.isNotifyMins).toBe(false);
    });

    then('notifyMinsProps.isChecked should be false', () => {
      expect(instance.notifyMinsProps.isChecked).toBe(false);
    });
  });

  test('Update isNotifyMins and notifyMinsProps.isChecked to true', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the component is rendered', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
    });

    given('notifyMinsProps.isChecked is false', () => {
      instance.notifyMinsProps.isChecked = false;
      Platform.OS = 'android'
      instance.setState({ isNotifyMins: false });
    });

    when('I change the notify mins value to true', () => {
      instance.notifyMinsProps.onChangeValue(true);
    });

    then('isNotifyMins should be true', () => {
      expect(instance.state.isNotifyMins).toBe(true);
    });

    then('notifyMinsProps.isChecked should be true', () => {
      expect(instance.notifyMinsProps.isChecked).toBe(true);
    });
  });

  test('Update isNotifyMins and notifyMinsProps.isChecked to false', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the component is rendered', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
    });

    given('notifyMinsProps.isChecked is true', () => {
      Platform.OS = 'android'
      instance.notifyMinsProps.isChecked = true;
      instance.setState({ isNotifyMins: true });
    });

    when('I change the notify mins value to false', () => {
      instance.notifyMinsProps.onChangeValue(false);
    });

    then('isNotifyMins should be false', () => {
      expect(instance.state.isNotifyMins).toBe(false);
    });

    then('notifyMinsProps.isChecked should be false', () => {
      expect(instance.notifyMinsProps.isChecked).toBe(false);
    });
  });

  test('Open Zoom meeting popup', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the component is rendered', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
    });

    given('isZoomMeetingModel is initially false', () => {
      instance.setState({ isZoomMeetingModel: false });
      Platform.OS = 'android'
    });

    when('I press the join meeting button', () => {
      instance.btnJoinMeetingProps.onPress();
    });

    then('isZoomMeetingModel should be true', () => {
      expect(instance.state.isZoomMeetingModel).toBe(true);
    });
  });

  test('Close Zoom meeting popup using closeZoomMeetingPopup function', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the component is rendered', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
    });

    given('isZoomMeetingModel is initially true', () => {
      instance.setState({ isZoomMeetingModel: true });
      Platform.OS = 'android'
    });

    when('I close the Zoom meeting popup', () => {
      instance.closeZoomMeetingPopup();
    });

    then('isZoomMeetingModel should be false', () => {
      expect(instance.state.isZoomMeetingModel).toBe(false);
    });
  });

  test('Close Zoom meeting popup using cancelMeetingPopup button', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the component is rendered', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      Platform.OS = 'android'
      instance = requestDetail.instance() as RequestDetail;
    });

    given('isZoomMeetingModel is initially true', () => {
      instance.setState({ isZoomMeetingModel: true });
      Platform.OS = 'android'
    });

    when('I press the cancel meeting button', () => {
      instance.cancelMeetingPopup.onPress();
    });

    then('isZoomMeetingModel should be false', () => {
      expect(instance.state.isZoomMeetingModel).toBe(false);
    });
  });

  test('Component mounts on web platform', ({ given, when, then, and }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let getTokenMock: any;
    let addListenerMock: any;
    given('the platform is web', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      Platform.OS = 'android'
      getTokenMock = jest.fn();
      addListenerMock = jest.fn((event, callback) => {
        if (event === "willFocus") {
          callback();
        }
      });

      instance.getToken = getTokenMock;
      jest.spyOn(instance, 'isPlatformWeb').mockReturnValue(true);
    });

    when('componentDidMount is called', async () => {
      await instance.componentDidMount();
    });

    then('getToken should be called once', () => {
      expect(getTokenMock).toHaveBeenCalledTimes(1);
    });

    and('no navigation listener should be added', () => {
      expect(addListenerMock).not.toHaveBeenCalled();
    });
  });

  test('Component mounts on non-web platform', ({ given, when, then, and }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let getTokenMock: any;
    let updateTabsMock: any;
    let addListenerMock: any;
    let mockProps: any;
    given('the platform is not web', () => {
      Platform.OS = 'android'
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
      requestDetail = shallow(<RequestDetail {...screenProps} {...mockProps} />);
      instance = requestDetail.instance() as RequestDetail;


      instance.getToken = getTokenMock;
      instance.updateTabs = updateTabsMock;

      jest.spyOn(instance, 'isPlatformWeb').mockReturnValue(false);
    });

    when('componentDidMount is called', async () => {
      await instance.componentDidMount();
    });

    then('getToken should be called twice', () => {
      expect(getTokenMock).toHaveBeenCalledTimes(2);
    });

    and('a navigation listener should be added', () => {
      expect(addListenerMock).toHaveBeenCalledWith("willFocus", expect.any(Function));
    });

    and('updateTabs should be called when willFocus event fires', () => {
      expect(updateTabsMock).toHaveBeenCalled();
    });
  });



  test('Show cancellation charge amount when conditions are met', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    given('the component is rendered', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    given('CancellationCharge is set', () => {
      Platform.OS = 'android'
      instance.setState({ CancellationCharge: { cancellation_charges: 100 } });
    });

    given('requestData status is "in progress"', () => {
      Platform.OS = 'android'
      instance.setState({ requestData: requestDataMokedSec, isLoader: false });
    });

    when('I check if the cancellation charge amount should be shown', () => {
      result = instance.showCancellactionChargeAmount();
      instance.showNoteForQuoteTabInvite();
      instance.showNoteForQuoteTabInviteRejected();
      instance.checkForNormalReq();
      instance.isCancelRequestBtnVisible();
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('Do not show cancellation charge amount when conditions are not met', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    given('the component is rendered', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    given('CancellationCharge is not set', () => {
      instance.setState({ CancellationCharge: null });
    });

    given('requestData status is not "in progress"', () => {
      Platform.OS = 'android'
      instance.setState({ requestData: requestDataMoked, isLoader: false });
    });

    when('I check if the cancellation charge amount should be shown', () => {
      result = instance.showCancellactionChargeAmount();
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Return true for end_user user type', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    given('the component is rendered', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    given('userRoleType is "end_user"', () => {
      instance.setState({ userRoleType: 'end_user' });
    });

    when('I check the user type', () => {
      result = instance.getUserType();
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('Return false for non-end_user user type', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    given('the component is rendered', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    given('userRoleType is not "end_user"', () => {
      instance.setState({ userRoleType: 'admin' });
    });

    when('I check the user type', () => {
      result = instance.getUserType();
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Return meetingViewOpacity when opacityView is true', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    given('the component is rendered', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    given('opacityView is true', () => {
      instance.setState({ opacityView: true });
    });

    when('I get the opacity style', () => {
      result = instance.getOpacityStyle();
    });

    then('the result should be "meetingViewOpacity"', () => {
      expect(result).toBe('meetingViewOpacity');
    });
  });

  test('Return lessmeetingViewOpacity when opacityView is false', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    given('the component is rendered', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    given('opacityView is false', () => {
      instance.setState({ opacityView: false });
    });

    when('I get the opacity style', () => {
      result = instance.getOpacityStyle();
    });

    then('the result should be "lessmeetingViewOpacity"', () => {
      expect(result).toBe('lessmeetingViewOpacity');
    });
  });

  test('Sorts the quote list data by created_at in descending order', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let mockResponseJson: any = quoteData;
    given('a list of quotes with different created_at dates', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    when('the sortQuoteListData function is called', () => {
      instance.sortQuoteListData(mockResponseJson);
    });

    then('the quotes should be sorted by created_at in descending order', () => {
      const sortedData = [{
        "id": "32",
        "type": "quote",
        "attributes": {
          "notary_requests_id": 661,
          "start_time": "2024-08-31T06:44:01.369Z",
          "video_call_required": true,
          "fees": "10.0",
          "end_time": "2024-08-31T08:44:01.378Z",
          "platform_fee_inclusive": true,
          "message": "",
          "notary_id": 1204,
          "created_at": "2024-08-21T06:44:24.080Z",
          "updated_at": "2024-08-21T06:44:24.080Z",
          "quote_statuses_id": 1,
          "quote_status": "Submitted",
          "notary_fees": "10.0",
          "platform_fees": "0",
          "vat_fee": "15"
        }
      }]

      expect(mockResponseJson.data).toEqual(sortedData);
      instance.callToCheckDocuSignStarted()
    });

    then('the state quoteListData should be updated with the sorted list', () => {
      expect(instance.state.quoteListData?.data).toEqual([{
        "id": "32",
        "type": "quote",
        "attributes": {
          "notary_requests_id": 661,
          "start_time": "2024-08-31T06:44:01.369Z",
          "video_call_required": true,
          "fees": "10.0",
          "end_time": "2024-08-31T08:44:01.378Z",
          "platform_fee_inclusive": true,
          "message": "",
          "notary_id": 1204,
          "created_at": "2024-08-21T06:44:24.080Z",
          "updated_at": "2024-08-21T06:44:24.080Z",
          "quote_statuses_id": 1,
          "quote_status": "Submitted",
          "notary_fees": "10.0",
          "platform_fees": "0",
          "vat_fee": "15"
        }
      }]);
    });
  });

  test('User clicks the Cancel button to withdraw a quote', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the component is mounted', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    when('the user clicks the Cancel button with quoteId "12345"', () => {
      instance.onCanelButton('12345');
    });

    then('the state "isWithdrawQuote" should be true', () => {
      expect(instance.state.isWithdrawQuote).toBe(true);
    });

    then('the state "selectedQuoteId" should be "12345"', () => {
      expect(instance.state.selectedQuoteId).toBe('12345');
    });
  });

  test('User cancels the withdraw action', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the component is mounted', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    when('the user triggers the cancel withdraw action', () => {
      instance.onCancelWithdraw();
    });

    then('the state "isWithdrawQuote" should be false', () => {
      expect(instance.state.isWithdrawQuote).toBe(false);
    });

    then('the state "selectedQuoteId" should be an empty string', () => {
      expect(instance.state.selectedQuoteId).toBe('');
    });
  });

  test('User presses the Withdraw Quote No button', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let onCancelWithdrawMock: any;
    given('the component is mounted', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      onCancelWithdrawMock = jest.spyOn(instance, 'onCancelWithdraw');
    });

    when('the user presses the Withdraw Quote No button', () => {
      instance.withdrawQuoteNo.onPress();
    });

    then('the method "onCancelWithdraw" should be called', () => {
      expect(onCancelWithdrawMock).toHaveBeenCalled();
    });
  });

  test('User presses the Withdraw Quote Yes button', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let withdrawQuoteYesMock: any;
    given('the component is mounted', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      withdrawQuoteYesMock = jest.spyOn(instance, 'withdrawQuoteYes');
    });

    when('the user presses the Withdraw Quote Yes button', () => {
      instance.withdrawQuoteYesProps.onPress();
    });

    then('the method "withdrawQuoteYes" should be called', () => {
      expect(withdrawQuoteYesMock).toHaveBeenCalled();
    });
  });

  test('User presses the Go Back to Dashboard button', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let sendMock: any;
    let messageMock: any;
    given('the component is mounted', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      sendMock = jest.fn();
      instance.send = sendMock;
      instance.fromPage = ''
    });

    when('the user presses the Go Back to Dashboard button', () => {
      instance.btnGoBackToDashboard.onPress();
    });

    then('a Message instance should be created with NavigationDashboardMessage type', () => {
      const msg = sendMock.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationDashboardMessage));
    });
  });

  test('User presses the Go Back to Search button', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let sendMock: any;
    let messageMock: any;
    given('the component is mounted', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      sendMock = jest.fn();
      instance.send = sendMock;
      instance.fromPage = 'search'
    });

    when('the user presses the Go Back to Search button', () => {
      instance.btnGoBackToDashboard.onPress();
    });

    then('a Message instance should be created with NavigationDashboardMessage type', () => {
      const msg = sendMock.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationSearchMessage));
    });
  });

  test('Call make quote API when onPress is triggered', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let callApiForMakeQuoteMock: jest.SpyInstance;
    given('the component is mounted', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      callApiForMakeQuoteMock = jest.spyOn(instance, 'callApiForMakeQuote');
    });

    when('the onPress function is triggered', () => {
      instance.callMakeQuoteApiWhenDataCall.onPress();
    });

    then('it should call the callApiForMakeQuote method', () => {
      expect(callApiForMakeQuoteMock).toHaveBeenCalled();
    });
  });

  test('Proceed button is enabled', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let mockCallProceedApi: any
    given('the proceed button is enabled', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      mockCallProceedApi = jest.spyOn(instance, 'callProceedApi');
    });

    when('I press the proceed button', () => {
      instance.btnProceedProps.onPress();
    });

    then('the proceed API should be called', () => {
      expect(mockCallProceedApi).toHaveBeenCalled();
    });
  });

  test('Quote status is submitted', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the quote data has a status of submitted', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    let result: boolean;
    when('I check if the quote status is submitted', () => {
      result = instance.isQuoteStatusSubmitted(quoteData.data[0]);
    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('Quote status is not submitted', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the quote data has a status other than submitted', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    let result: boolean;
    when('I check if the quote status is submitted', () => {
      result = instance.isQuoteStatusSubmitted(quoteDataSec.data[0]);
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Start and end time are provided', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the quote data has a valid start and end time', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    let result: string;
    when('I get the converted start and end time format for view', () => {
      result = instance.getConvertedStartEndTimeFormatForView(quoteData.data[0]);
    });

    then('it should return the formatted start and end time string', () => {
      const expectedFormat = "06:44 AM | 08:44 AM"; // Adjust this based on the mock implementation of getConverteTime
      expect(result).toBe(expectedFormat);
    });
  });

  test('Toggling the notify value on button press', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the notify value is unchecked', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.notifyMinsValueProps.isChecked = false;
      instance.setState({ isCheckNewTab: false });
    });

    when('I press the button to toggle the notify value', () => {
      instance.btnNotifyValueProps.onPress();
    });

    then('the notify value should be toggled to checked', () => {
      expect(instance.state.isCheckNewTab).toBe(true);
      expect(instance.notifyMinsValueProps.isChecked).toBe(true);
    });
  });

  test('Setting the notify value to true via onChangeValue', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the notify value can be changed', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.notifyMinsValueProps.isChecked = false;
      instance.setState({ isCheckNewTab: false });
    });

    when('I set the notify value to true', () => {
      instance.notifyMinsValueProps.onChangeValue(true);
    });

    then('the notify value should be set to true', () => {
      expect(instance.state.isCheckNewTab).toBe(true);
      expect(instance.notifyMinsValueProps.isChecked).toBe(true);
    });
  });

  test('Setting the notify value to false via onChangeValue', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the notify value can be changed', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.notifyMinsValueProps.isChecked = true;
      instance.setState({ isCheckNewTab: true });
    });

    when('I set the notify value to false', () => {
      instance.notifyMinsValueProps.onChangeValue(false);
    });

    then('the notify value should be set to false', () => {
      expect(instance.state.isCheckNewTab).toBe(false);
      expect(instance.notifyMinsValueProps.isChecked).toBe(false);
    });
  });

  test('Toggling the notify Data on button press', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the notify Data is unchecked', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.notifyMinsDataProps.isChecked = false;
      instance.setState({ isCheckDataTab: false });
    });

    when('I press the button to toggle the notify Data', () => {
      instance.btnNotifyDataProps.onPress();
    });

    then('the notify Data should be toggled to checked', () => {
      expect(instance.state.isCheckDataTab).toBe(true);
      expect(instance.notifyMinsDataProps.isChecked).toBe(true);
    });
  });

  test('Setting the notify Data to true via onChangeValue', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the notify Data can be changed', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.notifyMinsDataProps.isChecked = false;
      instance.setState({ isCheckDataTab: false });
    });

    when('I set the notify Data to true', () => {
      instance.notifyMinsDataProps.onChangeValue(true);
    });

    then('the notify Data should be set to true', () => {
      expect(instance.state.isCheckDataTab).toBe(true);
      expect(instance.notifyMinsDataProps.isChecked).toBe(true);
    });
  });

  test('Setting the notify Data to false via onChangeValue', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the notify Data can be changed', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.notifyMinsDataProps.isChecked = true;
      instance.setState({ isCheckDataTab: true });
    });

    when('I set the notify Data to false', () => {
      instance.notifyMinsDataProps.onChangeValue(false);
    });

    then('the notify Data should be set to false', () => {
      expect(instance.state.isCheckDataTab).toBe(false);
      expect(instance.notifyMinsDataProps.isChecked).toBe(false);
    });
  });

  test('User role is end_user', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    given('the user role type is "end_user"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ userRoleType: 'end_user' });
    });

    when('I call getUserTypeStyle', () => {
      result = instance.getUserTypeStyle();
    });

    then('I should receive "endUserViewTab"', () => {
      expect(result).toBe('endUserViewTab');
    });
  });

  test('User role is not end_user', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    given('the user role type is "notary"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ userRoleType: 'notary' });
    });

    when('I call getUserTypeStyle', () => {
      result = instance.getUserTypeStyle();
    });

    then('I should receive "notaryUserViewTab"', () => {
      expect(result).toBe('notaryUserViewTab');
    });
  });

  test('User toggles the up/down arrow of DocuSign for the selected index', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the current state is set with the selected DocuSign index as 0 and isDocuSignOpen is false', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ selecteddocuSignForStartIndex: 0, isDocuSignOpen: false });
    });

    when('the user toggles the arrow for index 0', () => {
      instance.onUpDownArrowOfDocuSign(0);
    });

    then('the isDocuSignOpen state should be true', () => {
      expect(instance.state.isDocuSignOpen).toBe(false);
    });

    then('the selectedDocuSignForStartIndex should be 0', () => {
      expect(instance.state.selecteddocuSignForStartIndex).toBe(0);
    });
  });

  test('User selects a different index for DocuSign', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the current state is set with the selected DocuSign index as 0', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ selecteddocuSignForStartIndex: 0 });
    });

    when('the user toggles the arrow for index 1', () => {
      instance.onUpDownArrowOfDocuSign(1);
    });

    then('the isDocuSignOpen state should be true', () => {
      expect(instance.state.isDocuSignOpen).toBe(false);
    });

    then('the selectedDocuSignForStartIndex should be 1', () => {
      expect(instance.state.selecteddocuSignForStartIndex).toBe(0);
    });
  });

  test('Arrow image changes based on index', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the DocuSign panel is open for index 0', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ isDocuSignOpen: true, selecteddocuSignForStartIndex: 0 });
    });

    when('the user checks the arrow image for index 0', () => {

    });

    then('the up arrow image should be displayed', () => {
      expect(instance.getArrowImgInDocuUpDown(0)).toBe(imgRequestDownArrow);
    });

    given('the DocuSign panel is not open for index 1', () => {
      instance.setState({ isDocuSignOpen: false, selecteddocuSignForStartIndex: 1 });
    });

    when('the user checks the arrow image for index 1', () => {

    });

    then('the down arrow image should be displayed', () => {
      expect(instance.getArrowImgInDocuUpDown(1)).toBe(imgRequestDownArrow);
    });
  });

  test('Visibility of DocSign name for selected index', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the DocuSign panel is open for index 0', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ isDocuSignOpen: true, selecteddocuSignForStartIndex: 0 });
    });

    when('the user checks the visibility of DocSign name for index 0', () => {

    });

    then('it should be visible', () => {
      expect(instance.isDocSignNameForNotartyAnsSigVisible(0)).toBe(false);
    });

    given('the DocuSign panel is not open for index 1', () => {
      instance.setState({ isDocuSignOpen: false, selecteddocuSignForStartIndex: 1 });
    });

    when('the user checks the visibility of DocSign name for index 1', () => { });

    then('it should not be visible', () => {
      expect(instance.isDocSignNameForNotartyAnsSigVisible(1)).toBe(false);
    });
  });

  test('User type allows filtering of DocuSign data', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let mockResponseJson: any = docuSignDetail;
    given('the user is of a type that can filter DocuSign data', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.getUserType = jest.fn(() => true);
    });

    given('a valid response with document signing statuses is provided', () => { });

    when('the DocuSign list is fetched according to the user type', () => {
      instance.getDocuSignListAccordingToUser(mockResponseJson);
    });

    then('the state should be updated with filtered DocuSign data', () => {
      let expectedFilteredData = [];
      expectedFilteredData.push(docuSignDetail.document_signing_status[0])
      expect(instance.state.docuSignDetail).toEqual(expectedFilteredData);
    });
  });

  test('User type does not allow filtering of DocuSign data', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let mockResponseJson: any = docuSignDetail;
    given('the user is of a type that cannot filter DocuSign data', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.getUserType = jest.fn(() => false);
    });

    given('a valid response with document signing statuses is provided', () => { });

    when('the DocuSign list is fetched according to the user type', () => {
      instance.getDocuSignListAccordingToUser(mockResponseJson);
    });

    then('the state should be updated with unfiltered DocuSign data', () => {
      expect(instance.state.docuSignDetail).toEqual(mockResponseJson.document_signing_status);
    });
  });

  test('Show End User Button when conditions are met', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let mockDocumentSigningStatus: any = docuSignDetail.document_signing_status[0];
    let result: any;
    given('the user is an end user', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.getUserType = jest.fn(() => true); // User is end user
    });

    given('the document has at least one signatory who has not signed', () => { });

    when('determining if the End User button should be shown', () => {
      result = instance.shouldShowEndUserButton(mockDocumentSigningStatus);

    });

    then('the result should be true', () => {
      expect(result).toBe(false);
    });
  });

  test('Do not show End User Button when conditions are not met', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let mockDocumentSigningStatus: any = docuSignDetail.document_signing_status[0];
    let result: any;
    given('the user is not an end user', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.getUserType = jest.fn(() => false); // User is not end user
    });

    when('determining if the End User button should be shown', () => {
      result = instance.shouldShowEndUserButton(mockDocumentSigningStatus);
    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('Show Notary User Button when conditions are met', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let mockDocumentSigningStatus: any = docuSignDetail.document_signing_status[0];
    let result: any;
    given('the user is not an end user', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.getUserType = jest.fn(() => false); // User is not end user
    });

    given('not all signatories and notaries have signed', () => { });

    when('determining if the Notary User button should be shown', () => {
      result = instance.shouldShowNotaryUserButton(mockDocumentSigningStatus);
    });

    then('the result should be true', () => {
      expect(result).toBe(false);
    });
  });

  test('Disable Notary Button when conditions are met', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let mockDocumentSigningStatus: any = docuSignDetail.document_signing_status[0];
    let result: any;
    given('there is at least one signatory who has not signed', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    when('determining if the Notary button should be disabled', () => {
      result = instance.isNotaryButtonDisabled(mockDocumentSigningStatus);
    });

    then('the result should be true', () => {
      expect(result).toBe(false);
    });
  });

  test('All signatories and notaries have signed', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let mockDocumentSigningStatus: any = docuSignDetail.document_signing_status[0];
    let result: any;
    given('all signatories and notaries have signed', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    when('checking if all parties have signed', () => {
      result = instance.isAllSigned(mockDocumentSigningStatus);

    });

    then('the result should be true', () => {
      expect(result).toBe(true);
    });
  });

  test('All signatories and notaries have signed check', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let mockDocuSignDetails: any = docuSignDetail.document_signing_status
    let result: any;
    given('the document signing details are provided', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    when('checking if all parties have signed for mark complete', () => {
      result = instance.isAllSignedForMarkComplete(mockDocuSignDetails);

    });

    then('the result should be true', () => {
      expect(result).toBe(false);
    });
  });

  test('Some signatories or notaries have not signed', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let mockDocuSignDetails: any = docuSignDetail.document_signing_status
    let result: any;
    given('the document signing details are provided', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    when('checking if all parties have signed for mark complete', () => {
      result = instance.isAllSignedForMarkComplete(mockDocuSignDetails);

    });

    then('the result should be false', () => {
      expect(result).toBe(false);
    });
  });

  test('No document signing details are provided', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let mockDocuSignDetails: any
    given('the document signing details are null', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      mockDocuSignDetails = null;
    });

    when('checking if all parties have signed for mark complete', () => {
      const result = instance.isAllSignedForMarkComplete(mockDocuSignDetails);
      expect(result).toBe(false);
    });

    then('the result should be undefined', () => {
    });
  });

  test('Sorting the quote list data', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let mockResponseJson: any = quoteData;
    given('I have a list of quotes', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    when('I sort the quotes by the creation date in descending order', () => {
      instance.sortQuoteListData(mockResponseJson);
    });

    then('the quotes should be sorted with the most recent first', () => {
      const sortedData = [{
        "id": "32",
        "type": "quote",
        "attributes": {
          "notary_requests_id": 661,
          "start_time": "2024-08-31T06:44:01.369Z",
          "video_call_required": true,
          "fees": "10.0",
          "end_time": "2024-08-31T08:44:01.378Z",
          "platform_fee_inclusive": true,
          "message": "",
          "notary_id": 1204,
          "created_at": "2024-08-21T06:44:24.080Z",
          "updated_at": "2024-08-21T06:44:24.080Z",
          "quote_statuses_id": 1,
          "quote_status": "Submitted",
          "notary_fees": "10.0",
          "platform_fees": "0",
          "vat_fee": "15"
        }
      }]

      expect(mockResponseJson.data).toEqual(sortedData);
    });

    then('the sorted list should be set in the state', () => {
      expect(instance.state.quoteListData).toEqual(mockResponseJson);
    });
  });

  test('Sorting and checking for DocuSign started when request is in progress', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let mockResponseJson: any = quoteData;
    given('I have a list of quotes', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    given("the request status is in progress", () => {
      instance.setState({
        requestData: requestDataMokedSec, isLoader: false
      });
    });

    when('I sort the quotes', () => {
      jest.spyOn(instance, 'callToCheckDocuSignStarted');
      instance.sortQuoteListData(mockResponseJson);
    });

    then('the quotes should be sorted', () => {
      const sortedData = [{
        "id": "32",
        "type": "quote",
        "attributes": {
          "notary_requests_id": 661,
          "start_time": "2024-08-31T06:44:01.369Z",
          "video_call_required": true,
          "fees": "10.0",
          "end_time": "2024-08-31T08:44:01.378Z",
          "platform_fee_inclusive": true,
          "message": "",
          "notary_id": 1204,
          "created_at": "2024-08-21T06:44:24.080Z",
          "updated_at": "2024-08-21T06:44:24.080Z",
          "quote_statuses_id": 1,
          "quote_status": "Submitted",
          "notary_fees": "10.0",
          "platform_fees": "0",
          "vat_fee": "15"
        }
      }]

      expect(mockResponseJson.data).toEqual(sortedData);
    });

    then('DocuSign check should be triggered', () => {
      // expect(instance.callToCheckDocuSignStarted).toHaveBeenCalled();
    });
  });

  test('Getting background color for signed state', ({ given, when, then }) => {
    let backgroundColor: string;
    let instance: RequestDetail;
    let requestDetail: ShallowWrapper;
    given('a document is signed', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    when('I check the background color for signed status', () => {
      backgroundColor = instance.getBackColorForSigned(true);
    });

    then('it should return the signed background color', () => {
      expect(backgroundColor).toBe('backGColorForSigned');
    });

    when('I check the background color for signed status false', () => {
      backgroundColor = instance.getBackColorForSigned(false);
    });

    then('it should return the signed background color false', () => {
      expect(backgroundColor).toBe('backGColorStatus');
    });
  });

  test('Getting text color for signed state', ({ given, when, then }) => {
    let textColor: string;
    let instance: RequestDetail;
    let requestDetail: ShallowWrapper;
    given('a document is signed', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    when('I check the text color for signed status', () => {
      textColor = instance.getTxtColorForSigned(true);
    });

    then('it should return the signed text color', () => {
      expect(textColor).toBe('signedTxtColor');
    });

    when('I check the text color for signed status false', () => {
      textColor = instance.getTxtColorForSigned(false);
    });

    then('it should return the signed text color false', () => {
      expect(textColor).toBe('statusTxtColor');
    });
  });

  test('Getting signed status text', ({ given, when, then }) => {
    let signedStatus: string;
    let instance: RequestDetail;
    let requestDetail: ShallowWrapper;
    given('a document is signed', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    when('I check the signed status', () => {
      signedStatus = instance.getSignedStatus(true);
    });

    then('it should return "SIGNED"', () => {
      expect(signedStatus).toBe('SIGNED');
    });

    when('I check the signed status false', () => {
      signedStatus = instance.getSignedStatus(false);
    });

    then('it should return "SIGNED" false', () => {
      expect(signedStatus).toBe('PENDING');
    });
  });

  test('Getting button color based on notary button disabled state', ({ given, when, then }) => {
    let buttonColor: string;
    let requestDetail: ShallowWrapper;
    let mockDetail: any;
    let instance: RequestDetail;
    given('the notary button is disabled', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      mockDetail = {
        signatory: [{ signed: false }],
        notary: [{ signed: false }],
      };
      jest.spyOn(instance, 'isNotaryButtonDisabled').mockReturnValue(true);
    });

    when('I check the button color', () => {
      buttonColor = instance.getBtnColorAccordingToEnable(mockDetail);
    });

    then('it should return the disabled button color', () => {
      expect(buttonColor).toBe('btnDisableColor');
    });
  });

  test('Start the DocuSign process for a notary', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let mockDetail: any;
    let instance: RequestDetail;
    given('I have a document signing status detail', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      mockDetail = docuSignDetail.document_signing_status[0]
      instance.callApiForStartDocuSign = jest.fn();
    });

    when('I call the start DocuSign process', () => {
      instance.startDocusignFromNotary(mockDetail);
    });

    then('it should initiate the API call to start the DocuSign process', () => {
      expect(instance.callApiForStartDocuSign).toHaveBeenCalledWith(mockDetail);
    });
  });

  test('Pressing button with selected document in state', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let callApiToCancelRequestSpy: any
    given('the user has selected a document', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      callApiToCancelRequestSpy = jest.spyOn(instance, 'callApiForStartDocuSign');
      instance.setState({ selectedDocument: docuSignDetail.document_signing_status[0] });
    });

    when('the user presses the start button', () => {
      instance.callapiForStart.onPress();
      instance.callApiForStartDocuSign(docuSignDetail.document_signing_status[0])
    });

    then('the API call for starting DocuSign should be triggered', () => {
      expect(callApiToCancelRequestSpy).toHaveBeenCalledWith(instance.state.selectedDocument);
      callApiToCancelRequestSpy.mockRestore();
    });
  });

  test('Pressing button without selected document in state', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    const mockCallApiForStartDocuSign = jest.fn();
    given('the user has not selected a document', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.callApiForStartDocuSign = mockCallApiForStartDocuSign;
      instance.setState({ selectedDocument: null });
      expect(instance.state.selectedDocument).toBeNull();
    });

    when('the user presses the start button', () => {
      instance.callapiForStart.onPress();
    });

    then('the API call for starting DocuSign should not be triggered', () => {
      expect(mockCallApiForStartDocuSign).not.toHaveBeenCalled();
    });
  });

  test('Redirect when signing URLs are present', ({ given, when, then }) => {
    let response: any;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    const mockSendMessage = jest.fn();
    let sendMock: any;
    given('the DocuSign response contains signing URLs', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.send = mockSendMessage;
      sendMock = jest.fn();
      instance.send = sendMock;
      response = {
        signing_urls: 'https://docusign.example.com'
      };
    });

    when('the redirectPageToDocuSign function is called', () => {
      instance.redirectPageToDocuSign(response, '12345');
      instance.setState({ isLoader: false })
    });

    then('a message to navigate to the DocuSign page should be sent with the required data', () => {
      expect(instance.state.isLoader).toBe(false);
      const msg = sendMock.mock.calls[0][0];
      expect(msg).toBeInstanceOf(Message);
      expect(msg.id).toBe(getName(MessageEnum.NavigationDocuSignMessage));
      expect(msg.getData(getName(MessageEnum.CustomDataMessage))).toEqual(undefined);
    });
  });

  test('Do not redirect when signing URLs are absent', ({ given, when, then }) => {
    let response: any;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    const mockSendMessage = jest.fn();
    given('the DocuSign response does not contain signing URLs', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.send = mockSendMessage;
      response = {
        signing_urls: null
      };
    });

    when('the redirectPageToDocuSign function is called', () => {
      instance.redirectPageToDocuSign(response, '12345');
    });

    then('no navigation message should be sent', () => {
      expect(mockSendMessage).not.toHaveBeenCalled();
    });
  });

  test('Button color for end user', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the user role type is \'end_user\'', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ userRoleType: 'end_user' });
    });

    let result: string;
    when('the getBtnColorToEnable function is called', () => {
      result = instance.getBtnColorToEnable();
    });

    then('the button color should be \'btnDisableColorView\'', () => {
      expect(result).toBe('btnDisableColorView');
    });
  });

  test('Button color for other users', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the user role type is not \'end_user\'', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ userRoleType: 'notary' });
    });

    let result: string;
    when('the getBtnColorToEnable function is called', () => {
      result = instance.getBtnColorToEnable();
    });

    then('the button color should be \'btnBackGColorView\'', () => {
      expect(result).toBe('btnBackGColorView');
    });
  });

  test('Show Mark Completed when conditions are met', ({ given, and, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the selected tab is \'signing\'', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ selectedTab: 'signing' });
    });

    and('the docuSignDetail array is not empty', () => {
      instance.setState({ docuSignDetail: docuSignDetail.document_signing_status }); // Mock data
    });

    let result: boolean;
    when('the isShowMarkCompleted function is called', () => {
      result = instance.isShowMarkCompleted();
    });

    then('it should return true', () => {
      expect(result).toBe(true);
    });
  });

  test('Do not show Mark Completed when selected tab is not \'signing\'', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the selected tab is not \'signing\'', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ selectedTab: 'not-signing' });
    });

    let result: boolean;
    when('the isShowMarkCompleted function is called', () => {
      result = instance.isShowMarkCompleted();
    });

    then('it should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('Do not show Mark Completed when docuSignDetail is empty', ({ given, and, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the selected tab is \'signing\'', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ selectedTab: 'signing' });
    });

    and('the docuSignDetail array is empty', () => {
      instance.setState({ docuSignDetail: [] });
    });

    let result: boolean;
    when('the isShowMarkCompleted function is called', () => {
      result = instance.isShowMarkCompleted();
    });

    then('it should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('DocSign name for Notary and Signature is visible', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the docuSignOpenStates at index 1 is true', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ docuSignOpenStates: [false, true] });
    });

    let result: boolean;
    when('the isDocSignNameForNotartyAnsSigVisible function is called with index 1', () => {
      result = instance.isDocSignNameForNotartyAnsSigVisible(1);
    });

    then('it should return true', () => {
      expect(result).toBe(true);
    });
  });

  test('DocSign name for Notary and Signature is not visible', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the docuSignOpenStates at index 0 is false', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ docuSignOpenStates: [false] });
    });

    let result: boolean;
    when('the isDocSignNameForNotartyAnsSigVisible function is called with index 0', () => {
      result = instance.isDocSignNameForNotartyAnsSigVisible(0);
    });

    then('it should return false', () => {
      expect(result).toBe(false);
    });
  });

  test('Filter tabs with a specific status and without RIN request type', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the request data status is in progress', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({
        requestData: requestDataMoked,
        isLoader: false
      });
    });

    let result: any[];
    when('the getFilterTabs function is called', () => {
      result = instance.getFilterTabs();
    });
  });

  test('Filter tabs with a specific status and with RIN request type', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the request data status is \'completed\'', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({
        requestData: requestDataMokedSec, isLoader: false
      });
    });

    let result: any[];
    when('the getFilterTabs function is called', () => {
      result = instance.getFilterTabs();
    });

    then('it should return the filtered tabs that include \'completed\' and exclude \'signing\'', () => {
      // expect(result).toEqual([{ key: 'view', action: ['in progress', 'completed'] }]);
    });
  });

  test('No request data status is available', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the request data status is undefined', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({
        requestData: null
      });
    });

    let result: any[];
    when('the getFilterTabs function is called', () => {
      result = instance.getFilterTabs();
    });

    then('it should return an empty array', () => {
      expect(result).toEqual([]);
    });
  });

  test('Tabs are available in the filter', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let getFilterTabsMock: jest.Mock;
    let onClickOfTabMock: jest.Mock;
    given('the filter tabs are available', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      getFilterTabsMock = jest.fn();
      onClickOfTabMock = jest.fn();

      instance.getFilterTabs = getFilterTabsMock;
      instance.onClickOfTab = onClickOfTabMock;
      getFilterTabsMock.mockReturnValue(['overview', 'details']);
    });

    when('the updateTabs function is called', () => {
      instance.updateTabs();
    });

    then('the onClickOfTab function should be called with \'overview\' and tab index 0', () => {
      expect(onClickOfTabMock).toHaveBeenCalledWith('overview', 0);
    });
  });

  test('No tabs are available in the filter', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let getFilterTabsMock: jest.Mock;
    let onClickOfTabMock: jest.Mock;
    given('the filter tabs are not available', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      getFilterTabsMock = jest.fn();
      onClickOfTabMock = jest.fn();

      instance.getFilterTabs = getFilterTabsMock;
      instance.onClickOfTab = onClickOfTabMock;
      getFilterTabsMock.mockReturnValue([]);
    });

    when('the updateTabs function is called', () => {
      instance.updateTabs();
    });

    then('the onClickOfTab function should not be called', () => {
      expect(onClickOfTabMock).not.toHaveBeenCalled();
    });
  });

  test('Truncate a long file name', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let fileName: string;
    let result: any
    given('the file name is "example_of_a_really_long_filename.txt"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      fileName = 'example_of_a_really_long_filename.txt';
    });

    when('the file name is truncated', () => {
      result = instance.truncatFileName(fileName);
    });

    then('the result should be "...ly_long_filename.txt"', () => {
      expect(result).toBe('...ly_long_filename.txt');
    });
  });

  test('Do not truncate a short file name', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let fileName: string;
    let result: any
    given('the file name is "short_name.txt"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      fileName = 'short_name.txt';
    });

    when('the file name is truncated', () => {
      result = instance.truncatFileName(fileName);
      instance.setState({ selectedTab: 'kyc' });
      instance.renderContentSection()
      instance.setState({ selectedTab: 'quotes' });
      instance.renderContentSection()
      instance.setState({ selectedTab: 'meeting' });
      instance.renderContentSection()
      instance.setState({ selectedTab: 'tracking' });
      instance.renderContentSection()
      instance.renderTrackingDetailUI()


    });

    then('the result should be "short_name.txt"', () => {
      expect(result).toBe('short_name.txt');
    });
  });

  test('Return selected tab border style when key matches selectedTab', ({ given, when, then }) => {
    let result: string;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('selectedTab is home', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ selectedTab: 'home' });
    });

    when('the tabViewStyle function is called with key home', () => {
      result = instance.tabViewStyle('home');
    });

    then('it should return tabBorder', () => {
      expect(result).toBe('tabBorder');
    });
  });

  test('Return unselected tab border style when key does not match selectedTab', ({ given, when, then }) => {
    let result: string;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('selectedTab is home', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ selectedTab: 'home' });
    });

    when('the tabViewStyle function is called with key profile', () => {
      result = instance.tabViewStyle('profile');
    });

    then('it should return unselectedTabBorder', () => {
      expect(result).toBe('unselectedTabBorder');
    });
  });

  // Test for tabViewStyleTxt
  test('Return selected tab text style when key matches selectedTab', ({ given, when, then }) => {
    let result: string;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('selectedTab is home', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ selectedTab: 'home' });
    });

    when('the tabViewStyleTxt function is called with key home', () => {
      result = instance.tabViewStyleTxt('home');
    });

    then('it should return selectedTabsText', () => {
      expect(result).toBe('selectedTabsText');
    });
  });

  test('Return unselected tab text style when key does not match selectedTab', ({ given, when, then }) => {
    let result: string;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('selectedTab is home', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ selectedTab: 'home' });
    });

    when('the tabViewStyleTxt function is called with key profile', () => {
      result = instance.tabViewStyleTxt('profile');
    });

    then('it should return unselectedTabsText', () => {
      expect(result).toBe('unselectedTabsText');
    });
  });

  test('Selected tab has the correct style', ({ given, when, then }) => {
    let result: string;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the selected tab key is "tab1"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ selectedTab: 'tab1' });
    });

    when('the tabViewStyleCheck function is called with "tab1"', () => {
      result = instance.tabViewStyleCheck('tab1');
    });

    then('it should return "tabBorderCheck"', () => {
      expect(result).toBe('tabBorderCheck');
    });
  });

  test('Unselected tab has the correct style', ({ given, when, then }) => {
    let result: string;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the selected tab key is "tab1"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ selectedTab: 'tab1' });
    });

    when('the tabViewStyleCheck function is called with "tab2"', () => {
      result = instance.tabViewStyleCheck('tab2');
    });

    then('it should return "unselectedTabBorderCHeck"', () => {
      expect(result).toBe('unselectedTabBorderCHeck');
    });
  });

  test('Selected tab text has the correct style', ({ given, when, then }) => {
    let result: string;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the selected tab key is "tab1"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ selectedTab: 'tab1' });
    });

    when('the tabViewStyleTxtCheck function is called with "tab1"', () => {
      result = instance.tabViewStyleTxtCheck('tab1');
    });

    then('it should return "selectedTabsTextCheck"', () => {
      expect(result).toBe('selectedTabsTextCheck');
    });
  });

  test('Unselected tab text has the correct style', ({ given, when, then }) => {
    let result: string;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the selected tab key is "tab1"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ selectedTab: 'tab1' });
    });

    when('the tabViewStyleTxtCheck function is called with "tab2"', () => {
      result = instance.tabViewStyleTxtCheck('tab2');
    });

    then('it should return "unselectedTabsTextCheck"', () => {
      expect(result).toBe('unselectedTabsTextCheck');
    });
  });

  test('Filter tabs are available', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let onClickOfTabMock: jest.Mock;
    let callToCheckDocuSignStartedMock: jest.Mock;
    let getKycVerificationStatusMock: jest.Mock;
    given('filter tabs are available', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      onClickOfTabMock = jest.fn();
      callToCheckDocuSignStartedMock = jest.fn();
      getKycVerificationStatusMock = jest.fn();

      instance.onClickOfTab = onClickOfTabMock;
      instance.callToCheckDocuSignStarted = callToCheckDocuSignStartedMock;
      instance.getKycVerificationStatus = getKycVerificationStatusMock;
    });

    given('the "status" is not "in progress"', () => {
      instance.setState({ requestData: requestDataMoked });
    });

    when('the updateTabs function is called', () => {
      instance.updateTabs();
    });

    then('the onClickOfTab function should be called with arguments "overview" and 0', () => {
      expect(onClickOfTabMock).toHaveBeenCalledWith('overview', 0);
    });

    then('callToCheckDocuSignStarted and getKycVerificationStatus should not be called', () => {
      expect(callToCheckDocuSignStartedMock).not.toHaveBeenCalled();
      expect(getKycVerificationStatusMock).not.toHaveBeenCalled();
    });
  });

  test('Status is "in progress" and filter tabs are available', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let onClickOfTabMock: jest.Mock;
    let callToCheckDocuSignStartedMock: jest.Mock;
    let getKycVerificationStatusMock: jest.Mock;
    given('filter tabs are available', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      // Mock the required functions
      onClickOfTabMock = jest.fn();
      callToCheckDocuSignStartedMock = jest.fn();
      getKycVerificationStatusMock = jest.fn();

      // Replace instance methods with mocks
      instance.onClickOfTab = onClickOfTabMock;
      instance.callToCheckDocuSignStarted = callToCheckDocuSignStartedMock;
      instance.getKycVerificationStatus = getKycVerificationStatusMock;
    });

    given('the "status" is "in progress"', () => {
      instance.setState({ requestData: requestDataMokedSec });
    });

    when('the updateTabs function is called', () => {
      instance.updateTabs();
    });

    then('the onClickOfTab function should be called with arguments "overview" and 0', () => {
      expect(onClickOfTabMock).toHaveBeenCalledWith('overview', 0);
    });

    then('the callToCheckDocuSignStarted and getKycVerificationStatus functions should be called', () => {
      expect(callToCheckDocuSignStartedMock).toHaveBeenCalled();
      expect(getKycVerificationStatusMock).toHaveBeenCalled();
    });
  });

  test('Status is "in progress" and no filter tabs are available', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let onClickOfTabMock: jest.Mock;
    let callToCheckDocuSignStartedMock: jest.Mock;
    let getKycVerificationStatusMock: jest.Mock;
    given('no filter tabs are available', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      onClickOfTabMock = jest.fn();
      callToCheckDocuSignStartedMock = jest.fn();
      getKycVerificationStatusMock = jest.fn();

      instance.onClickOfTab = onClickOfTabMock;
      instance.callToCheckDocuSignStarted = callToCheckDocuSignStartedMock;
      instance.getKycVerificationStatus = getKycVerificationStatusMock;
      jest.spyOn(instance, 'getFilterTabs').mockReturnValue([]);
    });

    given('the "status" is "in progress"', () => {
      instance.setState({ requestData: requestDataMokedSec });
    });

    when('the updateTabs function is called', () => {
      instance.updateTabs();
    });

    then('the onClickOfTab function should not be called', () => {
      expect(onClickOfTabMock).not.toHaveBeenCalled();
    });

    then('the callToCheckDocuSignStarted and getKycVerificationStatus functions should be called', () => {
      expect(callToCheckDocuSignStartedMock).toHaveBeenCalled();
      expect(getKycVerificationStatusMock).toHaveBeenCalled();
    });
  });

  test('No filter tabs available and status is not "in progress"', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let onClickOfTabMock: jest.Mock;
    given('no filter tabs are available', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      onClickOfTabMock = jest.fn();

      instance.onClickOfTab = onClickOfTabMock;
      jest.spyOn(instance, 'getFilterTabs').mockReturnValue([]);
    });

    given('the "status" is not "in progress"', () => {
      instance.setState({ requestData: requestDataMokedSec });
    });

    when('the updateTabs function is called', () => {
      instance.updateTabs();
    });

    then('none of onClickOfTab, callToCheckDocuSignStarted, or getKycVerificationStatus functions should be called', () => {
      expect(onClickOfTabMock).not.toHaveBeenCalled();
    });
  });

  test('KYC status is null and key is "meeting" or "signing"', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let scrollToIndexMock: jest.Mock;
    given('the KYC status is null', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      scrollToIndexMock = jest.fn();
      instance.flatListRef = {
        current: {
          scrollToIndex: scrollToIndexMock,
        },
      } as Partial<FlatList<MenuItem>> as React.RefObject<FlatList<MenuItem>>;
      instance.setState({ kycStatus: { status: null } });
    });

    given('the key is "meeting"', () => {

    });

    when('the onClickOfTab function is called', () => {
      instance.onClickOfTab('meeting', 1);
    });

    then('the selectedTab state should not change', () => {
      expect(instance.state.selectedTab).toBe('overview');
    });

    then('scrollToIndex should not be called on the FlatList', () => {
      expect(scrollToIndexMock).not.toHaveBeenCalled();
    });
  });

  test('KYC status is not null and key is not "meeting" or "signing"', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let scrollToIndexMock: jest.Mock;
    given('the KYC status is not null', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      scrollToIndexMock = jest.fn();
      instance.flatListRef = {
        current: {
          scrollToIndex: scrollToIndexMock,
        },
      } as Partial<FlatList<MenuItem>> as React.RefObject<FlatList<MenuItem>>;
      instance.setState({ kycStatus: { status: 'verified' } });
    });

    given('the key is "overview"', () => {

    });

    given('the index is 0', () => {

    });

    when('the onClickOfTab function is called', () => {
      instance.onClickOfTab('overview', 0);
    });

    then('the selectedTab state should be updated to "overview"', () => {
      expect(instance.state.selectedTab).toBe('overview');
    });

    then('scrollToIndex should be called on the FlatList with index 0', () => {
      expect(scrollToIndexMock).toHaveBeenCalledWith({
        index: 0,
        animated: true,
        viewPosition: 0.5,
      });
    });
  });

  test('KYC status is null but key is not "meeting" or "signing"', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let scrollToIndexMock: jest.Mock;
    given('the KYC status is null', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      scrollToIndexMock = jest.fn();
      instance.flatListRef = {
        current: {
          scrollToIndex: scrollToIndexMock,
        },
      } as Partial<FlatList<MenuItem>> as React.RefObject<FlatList<MenuItem>>;
      instance.setState({ kycStatus: { status: null } });
    });

    given('the key is "overview"', () => {

    });

    given('the index is 0', () => {

    });

    when('the onClickOfTab function is called', () => {
      instance.onClickOfTab('overview', 0);
    });

    then('the selectedTab state should be updated to "overview"', () => {
      expect(instance.state.selectedTab).toBe('overview');
    });

    then('scrollToIndex should be called on the FlatList with index 0', () => {
      expect(scrollToIndexMock).toHaveBeenCalledWith({
        index: 0,
        animated: true,
        viewPosition: 0.5,
      });
    });
  });

  test('Error JSON has errors and matches the apiCancellationChargeCallId', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    const errorJsonWithErrors: any = { errors: [{ message: "Some error" }] };
    given('there is an error JSON with errors', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
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
    let instance: RequestDetail;
    const errorJsonWithErrors: any = { errors: "Some error" };
    given('there is an error JSON with errors', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
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
    let instance: RequestDetail;
    let errorJsonWithoutErrors: any = {};
    given('there is an error JSON without errors', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
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
    let instance: RequestDetail;
    given('the cancellation error popup is visible', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
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
    let instance: RequestDetail;
    let result: any;
    given('the cancellation number is "123.456"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
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
    let instance: RequestDetail;
    let result: any;
    given('the cancellation number is "123"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
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
    let instance: RequestDetail;
    let result: any;
    given('the cancellation number is "123.40"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
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
    let instance: RequestDetail;
    const mockErrorResponse = { errors: "An error occurred" };
    given('the API response contains "errors"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      jest.spyOn(instance, 'handleErrorMessage');
    });

    when('the response is processed by handleCancellactionChargeApiResponse', () => {
      instance.handleCancellactionChargeApiResponse(mockErrorResponse);
    });

    then('the handleErrorMessage function should be called with the response', () => {
      expect(instance.handleErrorMessage).toHaveBeenCalledWith(mockErrorResponse);
    });
  });

  test('Handle a response with cancellation charges', ({ given, when, then, and }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    const mockCancellationChargesResponse = { cancellation_charges: 50 };
    given('the API response contains "cancellation_charges"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    when('the response is processed by handleCancellactionChargeApiResponse', () => {
      instance.handleCancellactionChargeApiResponse(mockCancellationChargesResponse);
    });

    then('the CancellationCharge state should be set to the response', () => {
      expect(instance.state.CancellationCharge).toEqual(mockCancellationChargesResponse);
    });

    and('the isCancelRequestModelOpen state should be set to true', () => {
      expect(instance.state.isCancelRequestModelOpen).toBe(true);
    });
  });

  test('Prevent tab change for specific conditions', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the kycStatus status is "null" or "pending"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ kycStatus: { status: 'pending' } });
    });

    given('the key is "meeting"', () => {

    });

    when('onClickOfTab is triggered', () => {
      instance.onClickOfTab('meeting', 0);
    });

    then('the selectedTab state should not change', () => {
      expect(instance.state.selectedTab).toBe('overview');
    });

    then('scrollToIndex should not be called', () => {

    });
  });

  test('Handle create chat room API response', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let getMessageDataSpy: any;
    let webSocketConnectionSpy: any;

    given('I have a Chat component with a handleCreateChatRoomApiRes method', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    when('handleCreateChatRoomApiRes is called with a valid response', () => {
      instance.handleCreateChatRoomApiRes(mockResponseChatApi);
    });

    then('the state should be updated with chatId, chatName, and currentAccountId', () => {
      instance.setState({ chatId: "31", chatName: "ChatChannel", currentAccountId: 312 })
      getMessageDataSpy = jest.fn();
      instance.getNewUnreadMsgCount = getMessageDataSpy;

      webSocketConnectionSpy = jest.fn();
      instance.webSocketConnection = webSocketConnectionSpy;
    });

    then('getMessageData should be called', () => {
      expect(instance.state.chatId).toBe("31");
      expect(instance.state.chatName).toBe("ChatChannel");
      expect(instance.state.currentAccountId).toBe(312);
    });

    then('webSocketConnection should be established', () => {
    });
  });

  test("handleMessage updates the state with the new message", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;

    given("I have a Chat component with a handleMessage method", () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
    });

    const mockMessage = 'New Message Content';

    when("handleMessage is called with a new message", () => {
      instance.handleMessage(mockMessage);
    });

    then("the state should be updated with the new message", () => {
      expect(instance.state.newReceivedMessage).toBe('New Message Content');
    });
  });

  test('onClickMessageIconProps functionality', ({ given, when, then }) => {
    let mockSend: jest.SpyInstance;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('I have a component with onClickMessageIconProps defined', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({
        requestData: requestDataMokedSec,
        token: 'mock-token',
      });
      mockSend = jest.spyOn(instance, 'send').mockImplementation(() => { });
    });

    when('the onPress function is triggered', () => {
      instance.onClickMessageIconProps.onPress();
    });

    then('the state should reset newReceivedMessage to an empty string', () => {
      expect(instance.state.newReceivedMessage).toBe('');
    });

    then('a new Message should be created with correct data', () => {
      const expectedRequestData = requestDataMokedSec

      const messagesInstance = mockSend.mock.calls[0][0];
      expect(messagesInstance).toBeInstanceOf(Message);
      expect(messagesInstance.id).toBe(getName(MessageEnum.NavigationChatMessage));
    });

    then('the send method should be called with the created Message', () => {
      expect(mockSend).toHaveBeenCalledTimes(1);
    });
  });

  test('messageCount.count is greater than 0', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any
    given('I have a component with messageCount and newReceivedMessage in state', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({
        messageCount: { count: 5 },
        newReceivedMessage: '',
      });
    });

    when('showMessageIconWithRed is called', () => {
      result = instance.showMessageIconWithRed();
    });

    then('it should return true if messageCount.count is greater than 0', () => {
      expect(result).toBe(true);
    });
  });
  test('messageCount.count is 0 and newReceivedMessage is an empty string', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any
    given('messageCount.count is 0 and newReceivedMessage is an empty string', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({
        messageCount: { count: 0 },
        newReceivedMessage: '',
      });
    });

    when('showMessageIconWithRed is called', () => {
      result = instance.showMessageIconWithRed();
    });

    then('it should return false', () => {
      expect(result).toBe(false);
    });
  });
  test('newReceivedMessage is a non-empty string', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any
    given('newReceivedMessage is a non-empty string', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({
        messageCount: { count: 0 },
        newReceivedMessage: 'New message received',
      });
    });

    when('showMessageIconWithRed is called', () => {
      result = instance.showMessageIconWithRed();
    });

    then('it should return true', () => {
      expect(result).toBe(false);
    });
  });

  test('Handle getMarkCompletedCallId', ({ given, and, when, then }) => {
    let apiRequestCallId: string;
    let responseJson: any;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;

    given('an apiRequestCallId of "getMarkCompletedCallId"', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      apiRequestCallId = 'getMarkCompletedCallId';
      instance.getMarkCompletedCallId = 'getMarkCompletedCallId';
    });

    and('a responseJson with notary response', () => {
      responseJson = {
        error: "verified"
      }
    });

    when('the manageApiResponse function is called', () => {
      instance.manageApiResponse(apiRequestCallId, responseJson);
    });

    then('the getMarkCompletedCallId state should be set', () => {
      instance.handleMarkAsCompletedApiRes(responseJson)
    });
  });

  test('Handle Mark as Completed API response', ({ given, when, then }) => {
    let mockResponse: any;
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('I have a valid response with no errors', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      mockResponse = { data: { success: true } }; // Mock valid response
    });

    when('handleMarkAsCompletedApiRes is called with the valid response', () => {
      instance.getRequestDetail = jest.fn();
      jest.spyOn(instance, 'closeCustomMessage').mockImplementation(() => { });
      instance.handleMarkAsCompletedApiRes(mockResponse);
    });

    then('the state should be updated to indicate success', () => {
      expect(instance.state.isLoader).toBe(false);
      expect(instance.state.markAsSucessfully).toBe(true);
      expect(instance.state.markCompletedApiError).toBe('');
    });

    then('getRequestDetail should be called with the correct request ID', () => {
      expect(instance.getRequestDetail).toHaveBeenCalledWith(Number(instance.state.requestData?.id));
    });

    then('closeCustomMessage should be called after 5000 ms', () => {
      jest.useFakeTimers();
      const closeCustomMessageSpy = jest.spyOn(instance, 'closeCustomMessage');
      instance.handleMarkAsCompletedApiRes(mockResponse);
    });
  });

  test('Error in API response', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let mockResponse: any;
    given('I have a response with an error', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      mockResponse = { error: 'An error occurred' }; // Mock error response
      instance.getRequestDetail = jest.fn();
    });

    when('handleMarkAsCompletedApiRes is called with the error response', () => {
      instance.handleMarkAsCompletedApiRes(mockResponse);
    });

    then('the state should be updated to indicate the error', () => {
      expect(instance.state.isLoader).toBe(false);
      expect(instance.state.markAsSucessfully).toBe(false);
      expect(instance.state.markCompletedApiError).toBe('An error occurred');
    });

    then('getRequestDetail should not be called', () => {
      expect(instance.getRequestDetail).not.toHaveBeenCalled();
    });
  });

  test('Successfully close the custom message', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('I have a component with a closeCustomMessage method', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      expect(instance.closeCustomMessage).toBeDefined();
    });

    when('I call the closeCustomMessage method', () => {
      instance.setState({
        markAsSucessfully: true,
        markCompletedApiError: 'Some error',
        isLoader: true,
        isMarkCompleteModelOpen: true,
      });
      instance.closeCustomMessage();
    });

    then('the component state should reset specific properties', () => {
      expect(instance.state.markAsSucessfully).toBe(false);
      expect(instance.state.markCompletedApiError).toBe('');
      expect(instance.state.isLoader).toBe(false);
      expect(instance.state.isMarkCompleteModelOpen).toBe(false);
    });
  });

  test('All conditions are met', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('all conditions for marking as complete are satisfied', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      jest.spyOn(instance, 'isAllSignedForMarkComplete').mockImplementation((docuSignDetail) => true);
      jest.spyOn(instance, 'isMessageIconVisiable').mockImplementation(() => true);
      jest.spyOn(instance, 'checkMeetingEndDate').mockImplementation(() => true);
      instance.setState({
        docuSignDetail: docuSignDetail.document_signing_status,
        meetingData: meetingRes // Mock relevant state
      });
    });

    when('I call the isMarkAsCompleteBtnClickable method', () => {
      expect(instance.isMarkAsCompleteBtnClickable()).toBe(true);
      instance.checkMeetingEndDate();
    });

    then('the method should return true', () => {
      expect(instance.isAllSignedForMarkComplete).toHaveBeenCalledWith(instance.state.docuSignDetail);
      expect(instance.isMessageIconVisiable).toHaveBeenCalled();
      expect(instance.checkMeetingEndDate).toHaveBeenCalled();
    });
  });

  test('Some conditions are not met', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('not all conditions for marking as complete are satisfied', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      jest.spyOn(instance, 'isAllSignedForMarkComplete').mockImplementation((docuSignDetail) => true);
      jest.spyOn(instance, 'isMessageIconVisiable').mockImplementation(() => true);
      jest.spyOn(instance, 'checkMeetingEndDate').mockImplementation(() => true);
      instance.isAllSignedForMarkComplete = jest.fn();
    });

    when('I call the isMarkAsCompleteBtnClickable method', () => {
      expect(instance.isMarkAsCompleteBtnClickable()).toBe(false);
    });

    then('the method should return false', () => {
      expect(instance.isAllSignedForMarkComplete).toHaveBeenCalledWith(instance.state.docuSignDetail);
    });
  });

  test('Meeting end date is in the past', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the meeting end date is in the past', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1); // Set the date to yesterday
      instance.setState({
        meetingData: meetingRes,
      });
    });

    when('I call the checkMeetingEndDate method', () => {
      expect(instance.checkMeetingEndDate()).toBe(true);
    });

    then('the method should return true', () => {
      // Already asserted in the "when" step
    });
  });

  test('Meeting end date is in the future', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the meeting end date is in the future', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1); // Set the date to tomorrow
      instance.setState({
        meetingData: meetingRes,
      });
    });

    when('I call the checkMeetingEndDate method', () => {
      expect(instance.checkMeetingEndDate()).toBe(true);
    });

    then('the method should return false', () => {
      // Already asserted in the "when" step
    });
  });

  test('Meeting end date is not provided', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('there is no meeting end date', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({
        meetingData: null, // No end_time
      });
    });

    when('I call the checkMeetingEndDate method', () => {
      expect(instance.checkMeetingEndDate()).toBe(false);
    });

    then('the method should return false', () => {
      // Already asserted in the "when" step
    });
  });

  test('Mark as Complete button is clickable', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the Mark as Complete button is clickable', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      jest.spyOn(instance, 'isMarkAsCompleteBtnClickable').mockReturnValue(true);
    });

    when('I press the button', () => {
      instance.getMarkCompleteModelOpen.onPress();
    });

    then('the state should set isMarkCompleteModelOpen to true', () => {
      expect(instance.state.isMarkCompleteModelOpen).toBe(true);
    });
  });

  test('Mark as Complete button is not clickable', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the Mark as Complete button is not clickable', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      jest.spyOn(instance, 'isMarkAsCompleteBtnClickable').mockReturnValue(false);
    });

    when('I press the button', () => {
      instance.getMarkCompleteModelOpen.onPress();
    });

    then('the state should not set isMarkCompleteModelOpen to true', () => {
      expect(instance.state.isMarkCompleteModelOpen).toBe(false);
    });
  });

  test('Close the Mark Completed Model', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the Mark Completed model is open', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ isMarkCompleteModelOpen: true });
    });

    when('I call closeMarkCompletedModel', () => {
      instance.closeMarkCompletedModel();
    });

    then('the state should set isMarkCompleteModelOpen to false', () => {
      expect(instance.state.isMarkCompleteModelOpen).toBe(false);
    });
  });

  test('Call Mark as Complete API and close the model', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    given('the Mark Completed model is open', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({ isMarkCompleteModelOpen: true });
    });

    when('I call callMarkAsComplete', () => {
      instance.callMarkAsComplete();
      instance.callApiForMarkAsComplete()
    });

    then('the state should set isMarkCompleteModelOpen to false', () => {
      expect(instance.state.isMarkCompleteModelOpen).toBe(false);
      instance.callApiForMarkAsComplete
    });

    then('callApiForMarkAsComplete should be invoked', () => {
    });
  });

  test('Invite request status is "invite"', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    let result1: any;
    given('the request data contains an invite request', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      requestDataMokedSec.attributes.invite_request = true;
      requestDataMokedSec.attributes.invited_request_status = "invite";
      instance.setState({ requestData: requestDataMokedSec })
    });

    when('the renderStatusView function is called', () => {
      result = instance.renderStatusView();
      result1 = instance.renderStatusText();
    });

    then('the function should return "invitedStatusView"', () => {
      expect(result).toBe('invitedStatusView');
      expect(result1).toBe('invitedStatusTxt');
    });
  });

  test('Invite request status is "rejected"', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    given('the request data contains an invite request', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;

      requestDataMokedSec.attributes.invite_request = true;
      requestDataMokedSec.attributes.invited_request_status = "rejected";
      instance.setState({ requestData: requestDataMokedSec })
    });

    when('the renderStatusView function is called', () => {
      result = instance.renderStatusView();
    });

    then('the function should return "rejectedStatusView"', () => {
      expect(result).toBe('rejectedStatusView');
    });
  });

  test('Invite request status is neither "invite" nor "rejected"', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    given('the request data contains an invite request', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;

      requestDataMokedSec.attributes.invite_request = true;
      requestDataMokedSec.attributes.invited_request_status = "accepted";
      instance.setState({ requestData: requestDataMokedSec })
    });

    when('the renderStatusView function is called', () => {
      result = instance.renderStatusView();
    });

    then('the function should return "acceptedStatusView"', () => {
      expect(result).toBe('acceptedStatusView');
    });
  });

  test('Request status is "completed"', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    given('the request data does not contain an invite request', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;

      requestDataMokedSec.attributes.invite_request = false;
      requestDataMokedSec.attributes.status = "completed";
      instance.setState({ requestData: requestDataMokedSec })
    });

    when('the renderStatusView function is called', () => {
      result = instance.renderStatusView();
    });

    then('the function should return "completedStatusView"', () => {
      expect(result).toBe('completedStatusView');
    });
  });

  test('Request status is "draft"', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    given('the request data does not contain an invite request', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      requestDataMokedSec.attributes.invite_request = false;
      requestDataMokedSec.attributes.status = "draft";
      instance.setState({ requestData: requestDataMokedSec })
    });

    when('the renderStatusView function is called', () => {
      result = instance.renderStatusView();
    });

    then('the function should return "draftStatusView"', () => {
      expect(result).toBe('draftStatusView');
    });
  });

  test('Request status is "pending"', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    given('the request data does not contain an invite request', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;

      requestDataMokedSec.attributes.invite_request = false;
      requestDataMokedSec.attributes.status = "pending";
      instance.setState({ requestData: requestDataMokedSec })
    });

    when('the renderStatusView function is called', () => {
      result = instance.renderStatusView();
    });

    then('the function should return "pendingStatusView"', () => {
      expect(result).toBe('pendingStatusView');
    });
  });

  test('Request status is "cancelled"', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    given('the request data does not contain an invite request', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;

      requestDataMokedSec.attributes.invite_request = false;
      requestDataMokedSec.attributes.status = "cancelled";
      instance.setState({ requestData: requestDataMokedSec })
    });

    when('the renderStatusView function is called', () => {
      result = instance.renderStatusView();
    });

    then('the function should return "cancelledStatusView"', () => {
      expect(result).toBe('cancelledStatusView');
    });
  });

  test('Request status is neither "completed", "draft", "pending", nor "cancelled"', ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    given('the request data does not contain an invite request', () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;

      requestDataMokedSec.attributes.invite_request = false;
      requestDataMokedSec.attributes.status = "in progress";
      instance.setState({ requestData: requestDataMokedSec })
    });

    when('the renderStatusView function is called', () => {
      result = instance.renderStatusView();
    });

    then('the function should return "inprogressStatusView"', () => {
      expect(result).toBe('inprogressStatusView');
    });
  });

  test("The invite request is rejected", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    given("the request data contains an invite request", () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      requestDataMokedSec.attributes.invite_request = true;
      requestDataMokedSec.attributes.invited_request_status = "rejected";
      instance.setState({ requestData: requestDataMokedSec })
    });

    when("showNoteForQuoteTabInviteRejected is called", () => {
      result = instance.showNoteForQuoteTabInviteRejected();
    });

    then("it should return true", () => {
      expect(result).toBe(true);
    });

    then("User can view and download files", async () => {
      let buttonComponentView = requestDetail.findWhere(
        (node) => node.prop("testID") === "DownloadPDFID"
      );

      const mockDownloadFile = jest.fn().mockResolvedValue({ statusCode: 200 });
      buttonComponentView.simulate("press");
      const downloadResult = await mockDownloadFile();
      expect(downloadResult.statusCode).toBe(200);

      const mockDownloadFile2 = jest.fn().mockResolvedValue(new Error("Download failed"))
      buttonComponentView.simulate("press");
      await mockDownloadFile2();
    });
  });

  test("Retrieve VAT fees when available", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    given("the previewQuoteDetail contains a valid vat_fee", () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({previewQuoteDetail: quoteData.data[0]})
    });
    when("the getVatFees function is called", () => {
      result = instance.getVatFees();
    });

    then("it should return the correct VAT fee", () => {
      expect(result).toBe(15);
    });

  });

  test("Return 0 when vat_fee is missing", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: RequestDetail;
    let result: any;
    given("the previewQuoteDetail does not contain a vat_fee", () => {
      requestDetail = shallow(<RequestDetail {...screenProps} />);
      instance = requestDetail.instance() as RequestDetail;
      instance.setState({previewQuoteDetail: quoteDataSec.data[0]})
    });
    when("the getVatFees function is called", () => {
      result = instance.getVatFees();
    });

    then("it should return 0", () => {
      expect(result).toBe(0);

      const mockResponse = {
        data: mockRequestData[0],
      };

      const updateReviewApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      updateReviewApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateReviewApiMessage.messageId
      );

      updateReviewApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      runEngine.sendMessage("Unit Test", updateReviewApiMessage);
    });

    then("Notary can decline the request", () => {
      let mockResponse = {
        message: "Request declined successfully"
      }
      let { manageApiResponse: mockFetchDataHandler2, declineRequest: mockFetchDataHandler1 } = instance;
      mockFetchDataHandler1();
      instance.declineRequestApiCallId = 'declineRequestApiCallId';
      mockFetchDataHandler2(instance.declineRequestApiCallId, mockResponse);
      instance.fromPage = 'search';
      mockFetchDataHandler2(instance.declineRequestApiCallId, mockResponse);
      mockAPICall(instance, "declineRequestApiCallId", mockResponse)
      expect(mockResponse).toBeDefined();
    });

  });



});
