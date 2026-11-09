import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';
import { runEngine } from '../../../../framework/src/RunEngine';
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Calendar from "../../src/Calendar";
import Timeline from 'react-native-timeline-flatlist';

const navigation = require("react-navigation");

const screenProps = {
    navigation: {
        goBack: jest.fn()
    },
    id: "Calendar"
};
import { GoogleSignin } from "@react-native-community/google-signin"; // Import after mocking
import { googleImg, outlookImg, renotaryImg } from "../../src/assets";
import moment from "moment";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { title } from "process";
import StorageProvider from "../../../../framework/src/StorageProvider";

const feature = loadFeature('./__tests__/features/calendar-scenario.feature');


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

const responseRenotary = {
    zoom_meetings:[{
        "accounts": [
            {
                "data": {
                    "id": "1733",
                    "type": "profile_zoom",
                    "attributes": {
                        "name": "test sep",
                        "role": "end_user",
                        "photo": {
                            "url": "https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaWtIIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--20445b785d574ff31ac4c681aa0427940cb2d745/Image%20Pasted%20at%202024-9-16%2010-23.png"
                        }
                    }
                }
            }
        ],
        "notary_request_id": 1142,
        "meeting": {
            "id": 71624973032,
            "type": 2,
            "uuid": "SNNLhm8lSNyr5Ookbvi4yw==",
            "topic": "Zoom Meeting",
            "status": "waiting",
            "host_id": "kAm2Z1iqTbavhDzX2jNwHg",
            "duration": 0,
            "join_url": "https://us04web.zoom.us/j/71624973032?pwd=RzWDJqn5Ftb3jt8mS9jYh9Lx5iYabm.1",
            "password": "ks0g96",
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
                    "channel_id": "web_sch_74043ec9f5d546b69aacb83344d836c0",
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
            "start_url": "https://us04web.zoom.us/s/71624973032?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJ3ZWIiLCJjbHQiOjAsIm1udW0iOiI3MTYyNDk3MzAzMiIsImF1ZCI6ImNsaWVudHNtIiwidWlkIjoia0FtMloxaXFUYmF2aER6WDJqTndIZyIsInppZCI6Ijk5ZTVjYmNjZDZhMjRhNGViODgxNjJiNWJjY2Q0MmRmIiwic2siOiIwIiwic3R5IjoxLCJ3Y2QiOiJ1czA0IiwiZXhwIjoxNzI5MDk1OTc1LCJpYXQiOjE3MjkwODg3NzUsImFpZCI6Il9kSmlDNXAzU1NLOERuSlNzQUNSTmciLCJjaWQiOiIifQ.ZDGcHm6ZvAGwGIw71d2mGJZKFDvxzVt5T6O74l2th3k",
            "created_at": "2024-10-16T14:26:15Z",
            "host_email": "nikhil.upadhyay@builder.ai",
            "start_time": "2024-10-16T14:26:15Z",
            "pre_schedule": false,
            "h323_password": "876922",
            "pstn_password": "876922",
            "encrypted_password": "RzWDJqn5Ftb3jt8mS9jYh9Lx5iYabm.1"
        },
        "start_time": "2024-10-30T14:25:14.632Z",
        "end_time": "2024-10-30T15:25:14.637Z",
        type:'renotary'
    }]
}

const googleCalendarResponse ={
    items:[
        {
            "kind": "calendar#event",
            "etag": "\"3462599927738000\"",
            "id": "6lge4f2fpuv58hl2d9xmd9t1al0_20241122T054500Z",
            "status": "confirmed",
            "htmlLink": "https://www.google.com/calendar/evebbnt?eid=NmxnZTRmMmZwdXY1OGhsMmQ5bWQ5dDFhbDBfMjAyNDExMjJUMDU0NTAwWiBhYnJhckBtZXRhZmljLmNv",
            "created": "2024-07-18T08:22:27.000Z",
            "updated": "2024-11-11T04:39:23.869Z",
            "summary": "Zoom Notary Daily Scrum",
            "description": "Agenda: \n\n<ul><li>Everyone should be present in this call</li><li>Experts should update about their tasks/blockers/dependencies</li><li>All the tracker tickets should be updated with expert comments with complete details</li><li>Sensei help tickets to be raised/discussed if not actioned</li><li>Tracker ticket status should be updated</li><li>Any challenges related to MR should be discussed by experts</li><li>If more grooming is needed for any task/story/feature Ninja should be informed</li><li>If Ninja is not present in the call, then QA should lead the call and take the statuses from developers and share the blockers/dependencies/help needed with Ninja immediately</li><li>Any expert who is not present in this call will be marked as absent for the day and hours will be deducted from monthly billing cycle</li></ul>\n\n --------------------------------------------------------------\n\nNikhil Upadhyay is inviting you to a scheduled meeting.\n\n Topic: Zoom Notary Daily Scrum\n\n Time: Nov 07,2024 11:15 AM Asia/Calcutta \n\n Dial by your location: \n\n Meeting ID: 0841365528 \n\n Passcode: 069014 \n\n +918000403712 INDIA \n\n+448081694144 United Kingdom \n\n+18449814698 USA",
            "location": "https://meet.builder.ai/096cae2756e1e6ff5d03f0vv5d17528cfeca9cf9637e417b47339db5ed5b7e@avFU3h0om9pkr0lR-UKd9g?passcode=756e1e6ff",
            "creator": {
                "email": "nikhil.upadhyay@builder.ai"
            },
            "organizer": {
                "email": "nikhil.upadhyay@builder.ai"
            },
            "start": {
                "dateTime": "2024-11-22T11:15:00+05:30",
                "timeZone": "Asia/Kolkata"
            },
            "end": {
                "dateTime": "2024-11-22T12:15:00+05:30",
                "timeZone": "Asia/Kolkata"
            },
            "recurringEventId": "6lge4f2fpussv58hl2d9md9t1al0",
            "originalStartTime": {
                "dateTime": "2024-11-22T11:15:00+05:30",
                "timeZone": "Asia/Kolkata"
            },
            "iCalUID": "6lge4f2fpuv58hl2dsd9md9t1al0@google.com",
            "sequence": 2,
            "attendees":[],
            "reminders": {
                "useDefault": true
            },
            "eventType": "default"
        }
    ]
}


export type Tab = {
    label?: string;
    id: number;
    isImg?: boolean;
    icon?: number;
    style?: {
      width: number;
    }
  };
  
  export const TABS: Tab[] = [
    { label: 'All', id: 1  },
    { id: 2, isImg: true, icon: renotaryImg, style: { width: 83 } },
    { id: 3, isImg: true, icon: googleImg },
    { id: 4, isImg: true, icon: outlookImg },
  ];
  
export const SELECTION_TYPES = [
    { label: 'Month', id: 1 },
    { label: 'Week', id: 2 },
  ];


  
jest.mock('@react-native-async-storage/async-storage', () => {
    return {
        setItem: () => { return 'accessToken' },
        getItem: () => { return true },
    }
})
 jest.mock("react-native-timeline-flatlist", function() {
                const mockComponent = require("react-native/jest/mockComponent");
                return mockComponent("react-native-timeline-flatlist");
              });
defineFeature(feature, (test) => {
    beforeEach(async () => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        
        jest.useFakeTimers()        
                await StorageProvider.set("accessToken", "mocked-token");
                await StorageProvider.set("refreshToken", "mocked-token");  
    });

    test('User navigates to Calendar', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: Calendar;
        given('I am a User loading Calendar', () => {
            exampleBlockA = shallow(<Calendar {...screenProps} />);
            const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
            msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            msgToken.addData(getName(MessageEnum.SessionResponseData),JSON.stringify(userData));
            runEngine.sendMessage("Unit Test", msgToken);

            const tabs = exampleBlockA.findWhere((node) => node.prop('testID') === 'TabList');

            const render_item = tabs.renderProp("renderItem")({ item: TABS[0]})
            tabs.props().keyExtractor({ item: TABS[0] });
            tabs.props().renderItem({ item: TABS[0] });



            const selectTabItem = render_item.findWhere((node) => node.prop("testID") == "selectTabItem")
            selectTabItem.simulate('press');
            selectTabItem.props().onPress()

        });

        when('I navigate to the Calendar', async () => {
        

            instance = exampleBlockA.instance() as Calendar;
            let monthCalendar = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "monthCalendar"
              );
            monthCalendar.props().onDayPress({dateString:'2024-11-15'})
            monthCalendar.props().renderArrow('left')
            monthCalendar.props().renderArrow('right')
            mockAPICall(instance,'getRenotaryMeetingsApiCallId',responseRenotary)
            
        });

        then('Calendar will load without errors', async () => {
            expect(exampleBlockA).toBeTruthy();
        });

        when('user tap on the month or week', async () => {
            instance = exampleBlockA.instance() as Calendar;
            let selectType = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "selectType"
              );
              selectType.simulate("press");        
        });

        then('he will see the modal and change the calendar view', async () => {
            const selectionTypeList = exampleBlockA.findWhere((node) => node.prop('testID') === 'selectionTypeList');
            const render_item = selectionTypeList.renderProp("renderItem")({ item: SELECTION_TYPES[1], index: 0 })
            selectionTypeList.props().keyExtractor({ item: SELECTION_TYPES[1] });
            selectionTypeList.props().renderItem({ item: SELECTION_TYPES[1] });
            
            const onSelectType = render_item.findWhere((node) => node.prop("testID") == "onSelectType")
            onSelectType.simulate('press');

            expect(exampleBlockA).toBeTruthy();


            const bottomNavigation = exampleBlockA.findWhere((node) => node.prop('testID') === 'bottomNavigation'); 
            bottomNavigation.props().onChangeBottomTab(4)


            let GenericHeader = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "GenericHeader"
            );
            GenericHeader.props().btnGoBack.onPress()
            console.log('GenericHeader',GenericHeader.props())
        });


        when('user tap renotary tab', async () => {
            instance = exampleBlockA.instance() as Calendar;
            const tabs = exampleBlockA.findWhere((node) => node.prop('testID') === 'TabList');

            const render_item = tabs.renderProp("renderItem")({ item: TABS[1]})
            tabs.props().keyExtractor({ item: TABS[1] });
            tabs.props().renderItem({ item: TABS[1] });


            const selectTabItem = render_item.findWhere((node) => node.prop("testID") == "selectTabItem")
            selectTabItem.simulate('press');
            selectTabItem.props().onPress()
        });

        then('he will see timelines', async () => {
            expect(exampleBlockA).toBeTruthy();
          
        });

 
        when('user tap google tab and he isnt logged in', async () => {
            instance = exampleBlockA.instance() as Calendar;
            const tabs = exampleBlockA.findWhere((node) => node.prop('testID') === 'TabList');

            const render_item = tabs.renderProp("renderItem")({ item: TABS[2]})
            tabs.props().keyExtractor({ item: TABS[2] });
            tabs.props().renderItem({ item: TABS[2] });


            const selectTabItem = render_item.findWhere((node) => node.prop("testID") == "selectTabItem")
            selectTabItem.simulate('press');
            selectTabItem.props().onPress()
        });

        then('he will see sync now button', async () => {
            expect(exampleBlockA).toBeTruthy();
          
        });

        when('user tap on the sync now button', async () => {
            instance = exampleBlockA.instance() as Calendar;
           
            let syncNowBtn = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "syncNowBtn"
            );
            // syncNowBtn.simulate('press');
            
            instance.syncNow('google')
            instance.checkGoogleSignInStatus()
            instance.updateAccessToken()
            instance.setState({
                googleAccessToken: 'token',
                isGoogleSignedIn: true,
            })
            let CalendarProvide = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "CalendarProvide"
              );
            CalendarProvide.props().onDateChanged('2024-11-15')
             mockAPICall(instance,'getEventCallId', googleCalendarResponse)
        });

        then('he will see timelines', async () => {
            expect(exampleBlockA).toBeTruthy();
          
        });


        // ------------------------


        when('user tap outlook tab and he isnt logged in', async () => {
            instance = exampleBlockA.instance() as Calendar;
            const tabs = exampleBlockA.findWhere((node) => node.prop('testID') === 'TabList');

            const render_item = tabs.renderProp("renderItem")({ item: TABS[3] })
            tabs.props().keyExtractor({ item: TABS[3] });
            tabs.props().renderItem({ item: TABS[3] });


            const selectTabItem = render_item.findWhere((node) => node.prop("testID") == "selectTabItem")
            selectTabItem.simulate('press');
            selectTabItem.props().onPress()
        });

        then('he will see sync now button', async () => {
            expect(exampleBlockA).toBeTruthy();

        });

        when('user tap on the sync now button', async () => {
            instance = exampleBlockA.instance() as Calendar;
           
             mockAPICall(instance,'getOutlookCalaenderApiCallId', googleCalendarResponse)
        });

        then('he will see timelines', async () => {

            const item = {
                ...responseRenotary.zoom_meetings[0],
                start: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                end: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
                title:'dfsf',
                summary:'',
                color:'#sdf',
                type:"renotary"
            }
            instance.onEventPress(item)


            let joinMeetingBtn = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "joinMeetingBtn"
            );
            // joinMeetingBtn.props().onPress('link')

            // let CloseMeetingModal = exampleBlockA.findWhere(
            //     (node) => node.prop("testID") === "CloseMeetingModal"
            // );
            // CloseMeetingModal.simulate('press')

            expect(exampleBlockA).toBeTruthy();

        });
        test('Successfully sign in with Microsoft', ({ given, when, then }) => {

            let transactionPage: ShallowWrapper;
            let instance: Calendar;
            let signInWithMicrosoft: any;
          let mockAuthorize: any;
          let mockSetState: any;
            given('I have a valid configuration for Microsoft login', () => {
              transactionPage = shallow(<Calendar {...screenProps} />);
              instance = transactionPage.instance() as Calendar;
              mockSetState = jest.fn();
            mockAuthorize = jest.fn();
            Alert.alert = jest.fn();
            AsyncStorage.setItem = jest.fn();
              mockAuthorize.mockResolvedValue({ accessToken: 'valid-token' });

            });
            when('I call the "signInWithMicrosoft" function', async () => {
                await instance.signInWithMicrosoft();
            });
            
            then('the access token should be saved in AsyncStorage', async () => {
                const token = await AsyncStorage.getItem('accessToken');
                expect(token).toBe(true);
            });
            
            then('I should see a success alert', () => {
                expect(Alert.alert).toHaveBeenCalledWith('Success', 'You are logged in.');
            });
          });
        
      
          test('Sign-in process throws an error', ({ given, when, then }) => {
            let transactionPage: ShallowWrapper;
            let instance: Calendar;
            let signInWithMicrosoft: any;
          let mockAuthorize: any;
          let mockSetState: any;
given('I have an invalid configuration for Microsoft login', () => {
              transactionPage = shallow(<Calendar {...screenProps} />);
              instance = transactionPage.instance() as Calendar;
              mockSetState = jest.fn();
            mockAuthorize = jest.fn();
            Alert.alert = jest.fn();
            AsyncStorage.setItem = jest.fn();
              mockAuthorize.mockRejectedValue(new Error('Invalid configuration'));
              
            });
        
        when('I call the "signInWithMicrosoft" function', async () => {
           
              
          await instance.signInWithMicrosoft();
        });
        
        then('I should see an error alert for sign-in failure', () => {
          expect(Alert.alert).toHaveBeenCalledWith("Success", "You are logged in.");

        });

        then("I can sync outlook calander successfully" , () => {
            mockAPICall(instance,'getOutlookCalaenderApiCallId', googleCalendarResponse);
            expect(Alert.alert).toHaveBeenCalledWith("Success", "You are logged in.");

            let response = {
                error: {
                    code: "Invalid token"
                }
            }
            mockAPICall(instance,'getOutlookCalaenderApiCallId', response);
            let responseSuccess = {
                value: [{
                    code: "event fetched successfully"
                }]
            }
            mockAPICall(instance,'getOutlookCalaenderApiCallId', responseSuccess);

        })
    });
})
    


});
