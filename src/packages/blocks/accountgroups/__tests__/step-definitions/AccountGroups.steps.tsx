import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import AccountGroups from "../../src/AccountGroups";
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
  "./__tests__/features/AccountGroups-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
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
      runEngine.sendMessage("Unit Test", msgToken);
    });

    then("Group will load without errors", () => {
      expect(groupWrapper).toBeTruthy();
    });

    then("I can click the buttons", () => {
      let buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("testID") === "hideKeyboard"
      );
      buttonComponent.simulate("press");
    });

    then("User can select Add group modal button without errors", () => {
      let buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("testID") === "btnAddGroupModal"
      );
      buttonComponent.simulate("press");
      instance.setState({ isVisibleModal: true, editMode: false, name: "" });
    });

    then("user try to add group without entering the group name", () => {
      instance.addGroup();
    });

    when("the user add group name and save group data", () => {
      let textInputComponent = groupWrapper.findWhere(
        (node) => node.prop("testID") === "inputName"
      );
      textInputComponent.simulate("changeText", "Developers");

      let buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("testID") === "btnAddGroup"
      );
      buttonComponent.simulate("press");

      buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("testID") === "btnCloseModal"
      );
      buttonComponent.simulate("press");

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
        (node) => node.prop("testID") === "btnGetGroups"
      );
      buttonComponent.simulate("press");

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
        (node) => node.prop("testID") === "btnHandleAddAccounts"
      );
      buttonComponent.simulate("press");

      buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("testID") === "btnHandleDeleteAccounts"
      );
      buttonComponent.simulate("press");

      buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("testID") === "btnDeleteGroup"
      );
      buttonComponent.simulate("press");

      buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("testID") === "btnEditGroup"
      );
      buttonComponent.simulate("press");

      instance.setState({
        isVisibleModal: true,
        editMode: true,
        id: "1",
        name: "Developers",
      });
      expect(groupWrapper).toBeTruthy();
    });

    when("the user edit group name and save group data", () => {
      groupWrapper = shallow(<AccountGroups {...screenPropsForGroup} />);
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

      instance.editGroup("1");
      instance.putGroupApiCallId = msgValidationAPI.messageId;
      instance.deleteGroupApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      instance.setState({
        isVisibleModal: false,
        editMode: true,
        id: "1",
        name: "",
        selectedAccounts: testGroupData[0].attributes.accounts,
        isVisibleAddAccountModal: true,
        dropdownAccountStatus: true,
        accountsData: testAccountData,
      });
    });

    then("user edit group name without entering the group name", () => {
      instance.editGroup("1");
      instance.setState({
        id: "1",
      });
    });

    when("the user open and update add account modal and data", () => {
      let buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("testID") === "btnExpandAccountsView"
      );
      buttonComponent.simulate("press");

      buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("testID") === "btnSaveAccountsToGroup"
      );
      buttonComponent.simulate("press");

      buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("testID") === "btnCloseAddAccountModal"
      );
      buttonComponent.simulate("press");

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
        name: "Developers",
        selectedAccounts: testGroupData[0].attributes.accounts,
        isVisibleDeleteAccountModal: true,
        dropdownAccountStatus: true,
        modalAccData: testAccountData,
      });
    });

    when("the user opens delete account modal and updates the data", () => {
      let buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("testID") === "btnHandleRemoveAccountsToGroup"
      );
      buttonComponent.simulate("press");

      buttonComponent = groupWrapper.findWhere(
        (node) => node.prop("testID") === "btnHideDeleteAccountModal"
      );
      buttonComponent.simulate("press");

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
        name: "Developers",
        selectedAccounts: testGroupData[0].attributes.accounts,
        isVisibleDeleteAccountModal: true,
        dropdownAccountStatus: true,
      });
      instance.handleSaveAccountsToGroup("1")
    });

    then("I can leave the screen without errors", () => {
      instance.componentWillUnmount();
      expect(groupWrapper).toBeTruthy();
    });
  });
});
