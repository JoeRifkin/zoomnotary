import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import EducationalUserProfile from "../../src/EducationalUserProfile.web";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import {
  Tab as TabEnum,
  configJSON,
} from "../../src/EducationalUserProfileController";

import { Tab } from "@material-ui/core";
import ProjectsResponse from "../../__mocks__/ProjectsResponse";
import AwardsResponse from "../../__mocks__/AwardsResponse";
import PatentsResponse from "../../__mocks__/PatentsResponse";
import QualificationsResponse from "../../__mocks__/QualificationsResponse";
import { EducationalQualifications } from "../../src/components/EducationalQualifications.web";
import { Projects } from "../../src/components/Projects.web";
import { Awards } from "../../src/components/Awards.web";
import { PublicationPatents } from "../../src/components/PublicationPatents.web";

const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "EducationalUserProfile",
};

const feature = loadFeature(
  "./__tests__/features/EducationalUserProfile-scenario.web.feature"
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
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
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
      expect(instance.state.activeTab).toBe(TabEnum.Projects);
    });

    when("I press Award button", () => {
      awardsButton = educationalUserProfileBlock.find(Tab).at(1);
      awardsButton.simulate("click");
    });

    then("Active Tab updated correctly on setActiveTab", () => {
      expect(instance.state.activeTab).toBe(TabEnum.Awards);
    });

    when("I press Patent button", () => {
      patentsButton = educationalUserProfileBlock.find(Tab).at(2);
      patentsButton.simulate("click");
    });

    then("Active Tab updated correctly on setActiveTab", () => {
      expect(instance.state.activeTab).toBe(TabEnum.Patents);
    });

    when("I press Project button", () => {
      projectsButton = educationalUserProfileBlock.find(Tab).at(0);
      projectsButton.simulate("click");
    });

    then("Active Tab updated correctly on setActiveTab", () => {
      expect(instance.state.activeTab).toBe(TabEnum.Projects);
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
      const recordsList = list
        .dive()
        .find({ "data-testid": configJSON.qualificationsListItemTestId });

      expect(recordsList).toHaveLength(QualificationsResponse.data.length);
    });

    when("Qualifications List is empty", () => {
      simulateResponse(instance, "getEducationCallId", { data: [] });
    });

    then("Qualifications List return Empty Text", () => {
      const list = educationalUserProfileBlock.find(EducationalQualifications);
      const emptyText = list
        .dive()
        .find({ "data-testid": configJSON.qualificationsEmptyTestId });

      expect(emptyText.exists()).toEqual(true);
    });

    when("I opening Projects tab", () => {
      projectsButton.simulate("click");
    });

    then("I can press Show More Button on the first item", () => {
      const showMoreButton = educationalUserProfileBlock
        .find(Projects)
        .dive()
        .findWhere(
          (node) =>
            node.prop("data-testid") === configJSON.btnProjectsShowMoreTestId
        )
        .first();

      showMoreButton.simulate("click");

      expect(showMoreButton.exists()).toEqual(true);
    });

    then("State update correctly", () => {
      expect(JSON.stringify(instance.state.modalItem)).toEqual(
        JSON.stringify(ProjectsResponse.data[0])
      );
    });

    when("Projects List is empty", () => {
      simulateResponse(instance, "getProjectCallId", { data: [] });
    });

    then("Projects List return Empty Text", () => {
      const emptyText = educationalUserProfileBlock
        .find(Projects)
        .dive()
        .find({ "data-testid": configJSON.projectsEmptyTestId });

      expect(emptyText.exists()).toEqual(true);
    });

    when("I opening Awards tab", () => {
      awardsButton.simulate("click");
    });

    then("I can press Show More Button on the first item", () => {
      const showMoreButton = educationalUserProfileBlock
        .find(Awards)
        .dive()
        .findWhere(
          (node) =>
            node.prop("data-testid") === configJSON.btnAwardsShowMoreTestId
        )
        .first();

      showMoreButton.simulate("click");

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
        .find({ "data-testid": configJSON.awardsEmptyTestId });

      expect(emptyText.exists()).toEqual(true);
    });

    when("I opening Patents tab", () => {
      patentsButton.simulate("click");
    });

    then("I can press Show More Button on the first item", () => {
      const showMoreButton = educationalUserProfileBlock
        .find(PublicationPatents)
        .dive()
        .findWhere(
          (node) =>
            node.prop("data-testid") === configJSON.btnPatentsShowMoreTestId
        )
        .first();

      showMoreButton.simulate("click");

      expect(showMoreButton.exists()).toEqual(true);
    });

    then("State update correctly", () => {
      expect(JSON.stringify(instance.state.modalItem)).toEqual(
        JSON.stringify(PatentsResponse.data[0])
      );
    });

    when("Patents List is empty", () => {
      simulateResponse(instance, "getPatentCallId", { data: [] });
    });

    then("Patents List return Empty Text", () => {
      const emptyText = educationalUserProfileBlock
        .find(PublicationPatents)
        .dive()
        .find({ "data-testid": configJSON.patentsEmptyTestId });

      expect(emptyText.exists()).toEqual(true);
    });
  });
});
