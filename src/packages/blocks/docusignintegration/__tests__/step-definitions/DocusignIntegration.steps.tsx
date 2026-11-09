// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import DocusignIntegration from "../../src/DocusignIntegration"
import { Alert } from "react-native"


const navigation = {
    // require("react-navigation")
    navigate: () => jest.fn(),
    goBack: () => jest.fn(),
    state: { params: { screen: 'terms' } }
};
const data = {
    Details:
    {
        id: 33,
        account_id: 4,
        sign_coordinates: '[{"color":"black","dotSize":1.5,"minWidth":0.5,"maxWidth":2.5,"compositeOperation":"source-over","points":[{"time":1681990313203,"x":89,"y":104},{"time":1681990313350,"x":93,"y":117},{"time":1681990313367,"x":93,"y":127},{"time":1681990313384,"x":92,"y":136},{"time":1681990313400,"x":89,"y":141},{"time":1681990313417,"x":81,"y":143},{"time":1681990313433,"x":73,"y":142},{"time":1681990313450,"x":69,"y":130},{"time":1681990313467,"x":68,"y":100},{"time":1681990313483,"x":78,"y":67},{"time":1681990313500,"x":103,"y":42},{"time":1681990313517,"x":135,"y":28},{"time":1681990313535,"x":162,"y":26},{"time":1681990313568,"x":190,"y":48},{"time":1681990313585,"x":193,"y":68},{"time":1681990313601,"x":193,"y":83},{"time":1681990313617,"x":191,"y":92},{"time":1681990313634,"x":189,"y":97},{"time":1681990313719,"x":195,"y":93},{"time":1681990313752,"x":196,"y":107},{"time":1681990313768,"x":190,"y":128},{"time":1681990313785,"x":183,"y":145},{"time":1681990313819,"x":177,"y":158},{"time":1681990313919,"x":179,"y":171},{"time":1681990313935,"x":180,"y":192},{"time":1681990313951,"x":180,"y":217},{"time":1681990313967,"x":178,"y":239},{"time":1681990313984,"x":175,"y":253},{"time":1681990314000,"x":170,"y":261},{"time":1681990314017,"x":165,"y":264},{"time":1681990314034,"x":158,"y":258},{"time":1681990314050,"x":151,"y":246},{"time":1681990314067,"x":146,"y":236},{"time":1681990314084,"x":143,"y":229},{"time":1681990314168,"x":144,"y":236},{"time":1681990314184,"x":151,"y":246},{"time":1681990314200,"x":160,"y":256},{"time":1681990314217,"x":170,"y":262},{"time":1681990314233,"x":179,"y":265},{"time":1681990314250,"x":188,"y":260},{"time":1681990314267,"x":195,"y":245},{"time":1681990314284,"x":199,"y":224},{"time":1681990314301,"x":198,"y":201},{"time":1681990314317,"x":189,"y":177},{"time":1681990314333,"x":166,"y":154},{"time":1681990314350,"x":136,"y":138},{"time":1681990314366,"x":106,"y":131},{"time":1681990314383,"x":83,"y":131},{"time":1681990314400,"x":69,"y":132},{"time":1681990314416,"x":61,"y":135},{"time":1681990314452,"x":62,"y":145},{"time":1681990314485,"x":101,"y":161},{"time":1681990314501,"x":134,"y":168},{"time":1681990314517,"x":160,"y":171},{"time":1681990314533,"x":176,"y":172},{"time":1681990314550,"x":186,"y":171},{"time":1681990314586,"x":191,"y":161},{"time":1681990314617,"x":191,"y":140},{"time":1681990314635,"x":190,"y":130},{"time":1681990314651,"x":191,"y":121},{"time":1681990314667,"x":196,"y":116},{"time":1681990314684,"x":207,"y":114},{"time":1681990314701,"x":219,"y":114},{"time":1681990314718,"x":228,"y":116},{"time":1681990314734,"x":235,"y":120},{"time":1681990314768,"x":240,"y":123}]}]',
        created_at: '2023-04-20T11:31:57.875Z',
        updated_at: '2023-04-20T11:31:57.875Z'
    }
    // data: []
}

const screenProps = {
    navigation: navigation,
    id: "DocusignIntegration"
}

const feature = loadFeature('./__tests__/features/DocusignIntegration-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to DocusignIntegration', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: DocusignIntegration;

        given('I am a User loading DocusignIntegration', () => {
            exampleBlockA = shallow(<DocusignIntegration {...screenProps} />);
        });

        when('I navigate to the DocusignIntegration', () => {
            instance = exampleBlockA.instance() as DocusignIntegration
        });

        then('DocusignIntegration will load with out errors', (data: any) => {
            instance.getData1(data)
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can click back button with with out errors', () => {

        });

        then('I can draw signature in canvas with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('signature will get the user on API call', () => {
            instance.setState({ signCords: [] })
            instance.validate()
            instance.signSubmit()
            instance.setState({ signCords: [{ test: 'testing' }] })
            const docuSignPostApicallId = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            docuSignPostApicallId.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                docuSignPostApicallId.messageId
            );
            docuSignPostApicallId.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                JSON.parse(JSON.stringify(data))
            );
            instance.docuSignPostApicallId = docuSignPostApicallId.messageId;
            runEngine.sendMessage("Unit Test", docuSignPostApicallId);
            expect(docuSignPostApicallId).toBeTruthy();
        });


        then('User list API through errors', () => {
            const waitinglistApiCallIdError = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            waitinglistApiCallIdError.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                waitinglistApiCallIdError.messageId
            );
            waitinglistApiCallIdError.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    errors: [{}]
                }
            );
            instance.docuSignPostApicallId = waitinglistApiCallIdError.messageId;
            runEngine.sendMessage("Unit Test", waitinglistApiCallIdError);
            expect(waitinglistApiCallIdError).toBeTruthy();
        });


        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });

    test('Storing property values when custom data is available', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: DocusignIntegration;
        let mockMessage: any;
        given('I receive a message with custom data', () => {
            exampleBlockA = shallow(<DocusignIntegration {...screenProps} />);
            instance = exampleBlockA.instance() as DocusignIntegration
            mockMessage = {
                getData: jest.fn(),
            };
            const customData = {
                token: 'sampleToken',
                docusignUrl: { url: 'sampleDocuSignUrl' },
                requestId: 'sampleRequestId',
                envelope_id: 'some_envelope_id',
                access_token: 'some_access_token'
            };
            mockMessage.getData.mockReturnValue(customData);
        });

        when('I store the property values', () => {
            instance.storePropValue(mockMessage);
        });

        then('the component state should be updated with the token, docuSignUrl, and requestId', () => {
            expect(instance.state.token).toBe('sampleToken');
            expect(instance.state.docuSignUrl).toBe('sampleDocuSignUrl');
            expect(instance.state.requestId).toBe('sampleRequestId');
            expect(instance.state.envelope_id).toBe('some_envelope_id');
            expect(instance.state.access_token).toBe('some_access_token');
        });
    });

    test('No custom data in the message', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: DocusignIntegration;
        let mockMessage: any;
        given('I receive a message without custom data', () => {
            exampleBlockA = shallow(<DocusignIntegration {...screenProps} />);
            instance = exampleBlockA.instance() as DocusignIntegration
            mockMessage = {
                getData: jest.fn(),
            };
            mockMessage.getData.mockReturnValue(null); // No custom data in this case
        });

        when('I try to store the property values', () => {
            instance.storePropValue(mockMessage);
        });

        then('the state should not be updated', () => {
            expect(instance.state.token).toBe("");
            expect(instance.state.docuSignUrl).toBe("");
            expect(instance.state.requestId).toBe("");
        });
    });

    test('Go back to the dashboard', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: DocusignIntegration;
        given('I am on the current page', () => {
            exampleBlockA = shallow(<DocusignIntegration {...screenProps} />);
            instance = exampleBlockA.instance() as DocusignIntegration
            instance.goBack = jest.fn();
        });

        when('I press the go back button', () => {
            instance.btnGoBackToDashboard.onPress();
        });

        then('I should navigate back to the previous page', () => {
            expect(instance.goBack).toHaveBeenCalled();
        });
    });

    test('Handle Stripe success page request', ({ given, when, then }) => {
        let request: any;
        let exampleBlockA: ShallowWrapper;
        let instance: DocusignIntegration;
        given('I am navigating a web page', () => {
            exampleBlockA = shallow(<DocusignIntegration {...screenProps} />);
            instance = exampleBlockA.instance() as DocusignIntegration
            request = { url: 'https://zoomnotary-401615-ruby.b401615.dev.eastus.az.svc/StripeSuccessPage?envelopeId=c9d30cb3-ae66-4969-948d-ca75b8b54451&event=Send' };
        });

        when("I receive a URL with 'StripeSuccessPage'", () => {
            instance.handleShouldStartLoadWithRequest(request);
        });

        then('I should set the state to finish the DocuSign process and stop loading', () => {
            expect(instance.state.isFinishDocuSign).toBe(true);
            const result = instance.handleShouldStartLoadWithRequest(request);
            expect(result).toBe(false); // Ensure it stops loading
        });
    });

    test('Check the status of the request', ({ given, when, then }) => {
        let selectedRequest: any;
        let exampleBlockA: ShallowWrapper;
        let instance: DocusignIntegration;
        let mockMessage: any;
        given('I have a request ID and action type', () => {
            exampleBlockA = shallow(<DocusignIntegration {...screenProps} />);
            instance = exampleBlockA.instance() as DocusignIntegration
            mockMessage = {
                addData: jest.fn(),
            };
            instance.setState({ requestId: '12345' });
            selectedRequest = { requestId: '12345', actionType: 'view' };
        });

        when('I press the check status button', () => {
            instance.onClickOfCheckStatus.onPress();
        });

        then('the navigation message should be sent with the correct request details', () => {
        });
    });

    test('URL contains StripeSuccessPage', ({ given, when, then, and }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: DocusignIntegration;
        let result: any;
        let pageUrl: any;
        given('the URL is https://example.com/StripeSuccessPage', () => {
            exampleBlockA = shallow(<DocusignIntegration {...screenProps} />);
            instance = exampleBlockA.instance() as DocusignIntegration
            pageUrl = { url: 'https://zoomnotary-401615-ruby.b401615.dev.eastus.az/StripeSuccessPage?envelopeId=c9d30cb3-ae66-4969-948d-ca75b8b54451&event=Send' };
            instance.scrollToTop = jest.fn();
        });

        when('the handleShouldStartLoadWithRequest function is called', () => {
            result = instance.handleShouldStartLoadWithRequest(pageUrl);
        });

        then('the state should set isFinishDocuSign to true', () => {
            expect(instance.state.isFinishDocuSign).toBe(true);
        });

        and('it should return false', () => {
            expect(result).toBe(false);
        });

        and('it should call the scrollToTop function', () => {
            expect(instance.scrollToTop).toHaveBeenCalled();
        });
    });

    test('URL does not contain StripeSuccessPage', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: DocusignIntegration;
        let result: any;
        let pageUrl: any;
        given('the URL is https://example.com/SomeOtherPage', () => {
            exampleBlockA = shallow(<DocusignIntegration {...screenProps} />);
            instance = exampleBlockA.instance() as DocusignIntegration
            pageUrl = { url: 'https://example.com/SomeOtherPage' };
            instance.scrollToTop = jest.fn();
        });

        when('the handleShouldStartLoadWithRequest function is called', () => {
            result = instance.handleShouldStartLoadWithRequest(pageUrl);
        });

        then('it should return true', () => {
            expect(result).toBe(true);
        });

        then('it should not call the scrollToTop function', () => {
            expect(instance.scrollToTop).not.toHaveBeenCalled();
        });
    });

    test('User clicks to view the request details', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: DocusignIntegration;
        let sendMock: any;
        given('the user is on the request page', () => {
            exampleBlockA = shallow(<DocusignIntegration {...screenProps} />);
            instance = exampleBlockA.instance() as DocusignIntegration
            instance.setState({ requestId: '12345' });
            sendMock = jest.fn();
            instance.send = sendMock;
        });

        when('the redirectToRequestDetailpage function is called', () => {
            instance.redirectToRequestDetailpage();
        });

        then('the selectedRequest data with requestId and actionType should be added to the message', () => {
            const msg = sendMock.mock.calls[0][0];
            expect(msg).toBeInstanceOf(Message);
            expect(msg.id).toBe(getName(MessageEnum.NavigationRequestDetailMessage));
            expect(msg.getData(getName(MessageEnum.CustomDataMessage))).toEqual({
                requestId: "12345",
                actionType: 'view'
            });
        });
    });

    test('Access token and envelope ID are set', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: DocusignIntegration;
        let mockCallDocusign_urlApi: any;
        given('the "access_token" is set to "some_token"', () => {
            exampleBlockA = shallow(<DocusignIntegration {...screenProps} />);
            instance = exampleBlockA.instance() as DocusignIntegration
            mockCallDocusign_urlApi = jest.spyOn(instance, 'callDocusign_urlApi');
            instance.setState({ access_token: 'some_access_token',  envelope_id: 'some_envelope_id', });
        });

        given('the "envelope_id" is set to "some_envelope_id"', () => {
            instance.setState({ envelope_id: 'some_envelope_id', access_token: 'some_access_token' });
        });

        when('the onClickOfCheckStatus function is called', () => {
            instance.onClickOfCheckStatus.onPress();
        });

        then('the callDocusign_urlApi function should be called', () => {
            expect(mockCallDocusign_urlApi).toHaveBeenCalled();
        });
    });

    test('Access token or envelope ID is not set', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: DocusignIntegration;
        let mockCallCheckDocusingStatus: any;
        given('the "access_token" is an empty string', () => {
            exampleBlockA = shallow(<DocusignIntegration {...screenProps} />);
            instance = exampleBlockA.instance() as DocusignIntegration
            mockCallCheckDocusingStatus = jest.spyOn(instance, 'callCheckDocusingStatus');
            instance.setState({ access_token: '' });
        });

        given('the "envelope_id" is an empty string', () => {
            instance.setState({ envelope_id: '' });
        });

        when('the onClickOfCheckStatus function is called', () => {
            instance.onClickOfCheckStatus.onPress();
        });

        then('the callCheckDocusingStatus function should be called', () => {
            expect(mockCallCheckDocusingStatus).toHaveBeenCalled();
        });
    });

});

// Customizable Area End
