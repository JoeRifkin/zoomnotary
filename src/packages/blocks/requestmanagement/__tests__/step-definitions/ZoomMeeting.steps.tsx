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
import {  FlatList, Platform, PermissionsAndroid } from "react-native";
import ZoomMeeting from "../../src/ZoomMeeting";
import { imgRequestDownArrow, imgRequestUpArrow } from '../../src/assets';
export const configJSON = require("../../src/config");
import { Linking } from 'react-native';

const navigate = jest.fn();

const screenProps = {
  navigation: {
    navigate,
  },
  goBack:()=>jest.fn(),
  id: "ZoomMeeting",
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
  "./__tests__/features/ZoomMeeting-scenario.feature"
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





defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
    jest.spyOn(runEngine, "sendMessage");
    jest.spyOn(RNFV, "open");
    jest.spyOn(PermissionsAndroid,"request").mockImplementation(((event:string,data:{})=>{
      return true
  }) as any);
  });

  test("User navigates to ZoomMeeting", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ZoomMeeting;

    given("I am a User loading ZoomMeeting", () => {
      Platform.OS = 'android' 
      requestDetail = shallow(<ZoomMeeting {...screenProps} />);
    });

    when("I navigate to the ZoomMeeting", async () => {
      instance = requestDetail.instance() as ZoomMeeting;

    });

    when("User click on launch meeting button", () => {
        let BackarrowBtnComponent = requestDetail.findWhere((node) => node.prop("testID") === "webViewTestId")
        BackarrowBtnComponent.simulate("navigationStateChange","")
        let btnn = requestDetail.findWhere((node) => node.prop("testID") === "webViewTestId")
        // btnn.props().onShouldStartLoadWithRequest( {url : "https://dhbvhfbhhb.com"});
    });

    then("User will be navigate on webview screen", () => {
        let BackarrowBtnComponent = requestDetail.findWhere((node) => node.prop("testID") === "webViewTestId")
        expect(BackarrowBtnComponent.props().testID).toMatch("webViewTestId")
        instance.goBack()
    });

  });

  test("Go back when button is pressed", ({ given, when, then }) => {
    let requestDetail: ShallowWrapper;
    let instance: ZoomMeeting;
    let goBackMock: any;
    given("the component is rendered", () => {
      requestDetail = shallow(<ZoomMeeting {...screenProps} />);
      instance = requestDetail.instance() as ZoomMeeting;
      goBackMock = jest.spyOn(instance, "goBack");
      expect(instance).toBeDefined();
    });

    when("the go back button is pressed", () => {
      instance.btnGoBackOnRequestDetail.onPress();
    });

    then("the goBack function should be called", () => {
      expect(goBackMock).toHaveBeenCalled();
    });
  });


})
