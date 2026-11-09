import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import AccountGroups from "../../src/AccountGroups.web";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { testGroupData, testAccountData } from "../mockData";

const screenPropsForGroup = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "Group",
};

const feature = loadFeature(
  "./__tests__/features/AccountGroups-scenario.web.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Group", ({ given, when, then }) => {
    let groupWrapper: ShallowWrapper;
    let instance: AccountGroups;

    given("I am a User loading Group", () => {
      groupWrapper = shallow(<AccountGroups {...screenPropsForGroup} />);
    });

    when("I navigate to the Group", () => {
      instance = groupWrapper.instance() as AccountGroups;

      const msgToken = new Message(getName(MessageEnum.RestAPIResponceMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test token", msgToken);
    });

    then("Group will load without errors", () => {
      expect(groupWrapper).toBeTruthy();
    });

    then("User can select Add group modal button without errors", () => {
      let buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnAddGroupModal"
      );
      buttonComponent.simulate("click");
      instance.setState({ isVisibleModal: true, editMode: false, name: "" });
    });

    then("user try to add group without entering the group name", () => {
      instance.addGroup();
    });

    when("the user add group name and save group data", () => {
      let textInputComponent = groupWrapper.findWhere(
        (node) => node.prop("data-test-id") === "inputName"
      );
      textInputComponent.simulate("change", {
        target: { value: "RoR Developers" },
      });

      let buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnAddGroup"
      );
      buttonComponent.simulate("click");

      buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnHideModal"
      );
      buttonComponent.simulate("click");

      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: testGroupData,
        }
      );

      instance.postGroupApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    when("the user clicks on the get groups", () => {
      let buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnGetGroups"
      );
      buttonComponent.simulate("click");

      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: testGroupData,
        }
      );

      instance.getGroupsApiCallId = msgValidationAPI.messageId;
      instance.setState({ groupList: testGroupData, isVisibleModal: false });
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("the Groups data will load without errors", () => {
      let buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnDeleteGroup"
      );
      buttonComponent.simulate("click");

      buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnEditGroup"
      );
      buttonComponent.simulate("click");

      buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnHandleAddAccounts"
      );
      buttonComponent.simulate("click");

      buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnHandleDeleteAccounts"
      );
      buttonComponent.simulate("click");

      instance.setState({
        isVisibleModal: true,
        editMode: true,
        id: "1",
        name: "RoR Developers",
        selectedAccounts: testGroupData[0].attributes.accounts,
      });
      expect(groupWrapper).toBeTruthy();
    });

    when("the user edit group name and save group data", () => {
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: testGroupData,
        }
      );
      instance.getAccountsApiCallId = msgValidationAPI.messageId;
      instance.putGroupApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      instance.setState({
        isVisibleModal: false,
        editMode: true,
        id: "1",
        name: "RoR Developers",
        selectedAccounts: testGroupData[0].attributes.accounts,
        isVisibleAddAccountModal: true,
        dropdownAccountStatus: true,
        accountsData: testAccountData,
      });
    });

    when("the user open and update add account modal and data", () => {
      let buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnExpandAccountsView"
      );
      buttonComponent.simulate("click");

      buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnSaveAccountsToGroup"
      );
      buttonComponent.simulate("click");

      buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnCloseAddAccountModal"
      );
      buttonComponent.simulate("click");

      instance.handleAccountSelect("1");

      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: testGroupData,
        }
      );

      instance.postAddAccountsApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      instance.setState({
        isVisibleAddAccountModal: false,
        editMode: true,
        id: "1",
        name: "RoR Developers",
        selectedAccounts: testGroupData[0].attributes.accounts,
        isVisibleDeleteAccountModal: true,
        dropdownAccountStatus: true,
        modalAccData: testAccountData,
      });
    });

    when("the user opens delete account modal and updates the data", () => {
      let buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("data-test-id") === "listItem0"
      );
      buttonComponent.simulate("click");

      buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnHandleRemoveAccountsToGroup"
      );
      buttonComponent.simulate("click");

      buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnHideDeleteAccountModal"
      );
      buttonComponent.simulate("click");

      instance.handleDeleteAccountSelect(1);

      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: testGroupData,
        }
      );

      instance.postRemoveAccountsApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      instance.setState({
        isVisibleAddAccountModal: false,
        editMode: true,
        id: "1",
        name: "RoR Developers",
        selectedAccounts: testGroupData[0].attributes.accounts,
        isVisibleDeleteAccountModal: true,
        dropdownAccountStatus: true,
      });
    });

    then("I can leave the screen without errors", () => {
      let buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("data-test-id") === "deleteListItem0"
      );
      buttonComponent.simulate("click");
      instance.componentWillUnmount();
      expect(groupWrapper).toBeTruthy();
    });
  });
});
