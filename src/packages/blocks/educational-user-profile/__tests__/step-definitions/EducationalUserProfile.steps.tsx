import React from "react";
import { ActivityIndicator, Modal } from "react-native";
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import EducationalUserProfile from "../../src/EducationalUserProfile";
import ProjectsResponse from "../../__mocks__/ProjectsResponse";
import AwardsResponse from "../../__mocks__/AwardsResponse";
import PatentsResponse from "../../__mocks__/PatentsResponse";
import QualificationsResponse from "../../__mocks__/QualificationsResponse";
import { Tab, configJSON } from "../../src/EducationalUserProfileController";
import { Projects } from "../../src/components/Projects";
import { Awards } from "../../src/components/Awards";
import { PublicationPatents } from "../../src/components/PublicationPatents";
import { EducationalQualifications } from "../../src/components/EducationalQualifications";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "EducationalUserProfile",
};

const feature = loadFeature(
  "./__tests__/features/EducationalUserProfile-scenario.feature"
);

const simulateResponse = (
  instance: any,
  messageIdProperty: string,
  data: any
) => {
  const requestMessage = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );

  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    requestMessage.messageId
  );

  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    data
  );

  instance[messageIdProperty] = requestMessage.messageId;

  runEngine.sendMessage("Unit Test", requestMessage);
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
  });

  test("User navigates to EducationalUserProfile", ({ given, when, then }) => {
    let educationalUserProfileBlock: ShallowWrapper;
    let instance: EducationalUserProfile;
    let spy: jest.SpyInstance;
    let projectsButton: ShallowWrapper<any, any>;
    let awardsButton: ShallowWrapper<any, any>;
    let patentsButton: ShallowWrapper<any, any>;

    given("I am a User loading EducationalUserProfile", () => {
      educationalUserProfileBlock = shallow(
        <EducationalUserProfile {...screenProps} />
      );
    });

    when("I navigate to the EducationalUserProfile", () => {
      instance =
        educationalUserProfileBlock.instance() as EducationalUserProfile;

      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);
    });

    then("EducationalUserProfile will load with out errors", () => {
      expect(educationalUserProfileBlock.exists()).toEqual(true);
    });

    then("EducationalUserProfile opening on Project page", () => {
      expect(instance.state.activeTab).toBe(Tab.Projects);
    });

    when("I press the screen", () => {
      const screen = educationalUserProfileBlock.findWhere(
        (node) => node.prop("testID") === configJSON.hideKeyboardTestID
      );

      spy = jest.spyOn(instance, "hideKeyboard");

      screen.simulate("press");
    });

    then("The dismiss keyboard function can be called", () => {
      expect(spy).toHaveBeenCalledTimes(1);
    });

    when("I press Award button", () => {
      awardsButton = educationalUserProfileBlock.findWhere(
        (node) => node.prop("testID") === configJSON.btnAwardsTestId
      );
      awardsButton.simulate("press");
    });

    then("Active Tab updated correctly on setActiveTab", () => {
      expect(instance.state.activeTab).toBe(Tab.Awards);
    });

    then("Awards List show ActivityIndicator", () => {
      const awardsList = educationalUserProfileBlock.find(Awards);
      const activityIndicator = awardsList.dive().find(ActivityIndicator);

      expect(activityIndicator.exists()).toEqual(true);
    });

    when("I press Patent button", () => {
      patentsButton = educationalUserProfileBlock.findWhere(
        (node) => node.prop("testID") === configJSON.btnPatentsTestId
      );
      patentsButton.simulate("press");
    });

    then("Active Tab updated correctly on setActiveTab", () => {
      expect(instance.state.activeTab).toBe(Tab.Patents);
    });

    then("Patent List show ActivityIndicator", () => {
      const awardsList = educationalUserProfileBlock.find(PublicationPatents);
      const activityIndicator = awardsList.dive().find(ActivityIndicator);

      expect(activityIndicator.exists()).toEqual(true);
    });

    when("I press Project button", () => {
      projectsButton = educationalUserProfileBlock.findWhere(
        (node) => node.prop("testID") === configJSON.btnProjectsTestId
      );
      projectsButton.simulate("press");
    });

    then("Active Tab updated correctly on setActiveTab", () => {
      expect(instance.state.activeTab).toBe(Tab.Projects);
    });

    then("Project List show ActivityIndicator", () => {
      const awardsList = educationalUserProfileBlock.find(Projects);
      const activityIndicator = awardsList.dive().find(ActivityIndicator);

      expect(activityIndicator.exists()).toEqual(true);
    });

    when("Qualifications list is loading", () => {
      expect(instance.state.loadingEQ).toEqual(true);
    });

    then("Qualifications list show ActivityIndicator", () => {
      const list = educationalUserProfileBlock.find(EducationalQualifications);
      const activityIndicator = list.dive().find(ActivityIndicator);

      expect(activityIndicator.exists()).toEqual(true);
    });

    when("Receive projects list", () => {
      simulateResponse(instance, "getProjectCallId", ProjectsResponse);
    });

    then("State update correctly", () => {
      expect(JSON.stringify(instance.state.projectList)).toEqual(
        JSON.stringify(ProjectsResponse.data)
      );
    });

    when("Receive awards list", () => {
      simulateResponse(instance, "getAwardsCallId", AwardsResponse);
    });

    then("State update correctly", () => {
      expect(JSON.stringify(instance.state.awardList)).toEqual(
        JSON.stringify(AwardsResponse.data)
      );
    });

    when("Receive patents list", () => {
      simulateResponse(instance, "getPatentCallId", PatentsResponse);
    });

    then("State update correctly", () => {
      expect(JSON.stringify(instance.state.patentList)).toEqual(
        JSON.stringify(PatentsResponse.data)
      );
    });

    when("Receive qualifications list", () => {
      simulateResponse(instance, "getEducationCallId", QualificationsResponse);
    });

    then("State update correctly", () => {
      expect(JSON.stringify(instance.state.educationQualificationList)).toEqual(
        JSON.stringify(QualificationsResponse.data)
      );
    });

    then("EducationalQualifications render all items", () => {
      const list = educationalUserProfileBlock.find(EducationalQualifications);
      const recordsList = list.dive().find("View");

      expect(recordsList).toHaveLength(QualificationsResponse.data.length);
    });

    when("Qualifications List is empty", () => {
      simulateResponse(instance, "getEducationCallId", { data: [] });
    });

    then("Qualifications List return Empty Text", () => {
      const list = educationalUserProfileBlock.find(EducationalQualifications);
      const emptyText = list
        .dive()
        .find({ testID: configJSON.qualificationsEmptyTestId });

      expect(emptyText.exists()).toEqual(true);
    });

    when("I opening Projects tab", () => {
      projectsButton.simulate("press");
    });

    then("I can press Show More Button on the first item", () => {
      const showMoreButton = educationalUserProfileBlock
        .find(Projects)
        .dive()
        .find({ testID: configJSON.btnProjectsShowMoreTestId })
        .first();

      showMoreButton.simulate("press");

      expect(showMoreButton.exists()).toEqual(true);
    });

    then("State update correctly", () => {
      expect(JSON.stringify(instance.state.modalItem)).toEqual(
        JSON.stringify(ProjectsResponse.data[0])
      );
    });

    then("I can open url from project", () => {
      const modal = educationalUserProfileBlock.find(Modal);
      const openUrlButton = modal
        .dive()
        .find({ testID: configJSON.openUrlTestId });

      spy = jest.spyOn(instance, "openUrl");

      openUrlButton.simulate("press");

      expect(spy).toHaveBeenCalledWith(ProjectsResponse.data[0].attributes.url);
    });

    when("I press on Modal Close Button", () => {
      const closeButton = educationalUserProfileBlock.find({
        testID: configJSON.modalWindowTestId,
      });

      spy = jest.spyOn(instance, "hideModal");

      closeButton.simulate("press");
    });

    then("Modal Window is Closed without error", () => {
      expect(spy).toHaveBeenCalledTimes(1);
    });

    when("Projects List is empty", () => {
      simulateResponse(instance, "getProjectCallId", { data: [] });
    });

    then("Projects List return Empty Text", () => {
      const emptyText = educationalUserProfileBlock
        .find(Projects)
        .dive()
        .find({ testID: configJSON.projectsEmptyTestId });

      expect(emptyText.exists()).toEqual(true);
    });

    when("I opening Awards tab", () => {
      awardsButton.simulate("press");
    });

    then("I can press Show More Button on the first item", () => {
      const showMoreButton = educationalUserProfileBlock
        .find(Awards)
        .dive()
        .find({ testID: configJSON.btnAwardsShowMoreTestId })
        .first();

      showMoreButton.simulate("press");

      expect(showMoreButton.exists()).toEqual(true);
    });

    then("State update correctly", () => {
      expect(JSON.stringify(instance.state.modalItem)).toEqual(
        JSON.stringify(AwardsResponse.data[0])
      );
    });

    when("Awards List is empty", () => {
      simulateResponse(instance, "getAwardsCallId", { data: [] });
    });

    then("Awards List return Empty Text", () => {
      const emptyText = educationalUserProfileBlock
        .find(Awards)
        .dive()
        .find({ testID: configJSON.awardsEmptyTestId });

      expect(emptyText.exists()).toEqual(true);
    });

    when("I opening Patents tab", () => {
      patentsButton.simulate("press");
    });

    then("I can press Show More Button on the first item", () => {
      const showMoreButton = educationalUserProfileBlock
        .find(PublicationPatents)
        .dive()
        .find({ testID: configJSON.btnPatentsShowMoreTestId })
        .first();

      showMoreButton.simulate("press");

      expect(showMoreButton.exists()).toEqual(true);
    });

    then("State update correctly", () => {
      expect(JSON.stringify(instance.state.modalItem)).toEqual(
        JSON.stringify(PatentsResponse.data[0])
      );
    });

    then("I can open url from project", () => {
      const modal = educationalUserProfileBlock.find(Modal);
      const openUrlButton = modal
        .dive()
        .find({ testID: configJSON.openUrlTestId });

      spy = jest.spyOn(instance, "openUrl");

      openUrlButton.simulate("press");

      expect(spy).toHaveBeenCalledWith(PatentsResponse.data[0].attributes.url);
    });

    when("Patents List is empty", () => {
      simulateResponse(instance, "getPatentCallId", { data: [] });
    });

    then("Patents List return Empty Text", () => {
      const emptyText = educationalUserProfileBlock
        .find(PublicationPatents)
        .dive()
        .find({ testID: configJSON.patentsEmptyTestId });

      expect(emptyText.exists()).toEqual(true);
    });

    when("Projects resonse return error", () => {
      spy = jest.spyOn(instance, "showAlert");

      simulateResponse(instance, "getProjectCallId", {
        errors: [{ token: "Wrong Input Params" }],
      });
    });

    then("Show alert has invoked", () => {
      expect(spy).toHaveBeenCalledTimes(1);
    });

    when("Awards resonse return error", () => {
      spy = jest.spyOn(instance, "showAlert");

      simulateResponse(instance, "getAwardsCallId", {
        errors: [{ token: "Wrong Input Params" }],
      });
    });

    then("Show alert has invoked", () => {
      expect(spy).toHaveBeenCalledTimes(2);
    });

    when("Patents resonse return error", () => {
      spy = jest.spyOn(instance, "showAlert");

      simulateResponse(instance, "getPatentCallId", {
        errors: [{ token: "Wrong Input Params" }],
      });
    });

    then("Show alert has invoked", () => {
      expect(spy).toHaveBeenCalledTimes(3);
    });
  });
});
