import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import Task from "../../src/Task";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
export const configJSON = require("../../config.json");
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { IAccount, IGroup, ITask } from "../../src/types";

const screenPropsForTask = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "Task",
};

const feature = loadFeature("./__tests__/features/Task-scenario.feature");

const testTaskData: ITask[] = [
  {
    isSelected: false,
    id: "10",
    attributes: {
      id: 10,
      account_id: 2,
      title: "Test taslk1111",
      description: "Test desc",
      status: "to_do",
      priority: "medium",
      created_at: new Date(),
      updated_at: new Date(),
      assigned_to: {
        id: "17",
        type: "group",
        attributes: {
          name: "testx",
          accounts: [
            {
              id: 5,
              type: "account",
              first_name: "Nirmal",
              last_name: "Vaja",
            },
          ],
        },
      },
    },
  },
  {
    isSelected: false,
    id: "10",
    attributes: {
      id: 10,
      account_id: 2,
      title: "Test taslk1111",
      description: "Test desc",
      status: "to_do",
      priority: "medium",
      created_at: new Date(),
      updated_at: new Date(),
      assigned_to: {
        id: "17",
        type: "account",
        isSelected: false,
        attributes: {
          first_name: "string",
          last_name: "string",
        },
      },
    },
  },
];

export const testGroupData: IGroup[] = [
  {
    id: "1",
    type: "group",
    attributes: {
      name: "Developers",
      accounts: [
        {
          id: 1,
          type: "account",
          first_name: "test",
          last_name: "test",
        },
        {
          id: 2,
          type: "account",
          first_name: "test",
          last_name: "test",
        },
      ],
    },
  },
];

export const testAccountData: IAccount[] = [
  {
    isSelected: false,
    id: "1",
    type: "account",
    attributes: {
      first_name: "test",
      last_name: "test",
    },
  },
  {
    isSelected: false,
    id: "2",
    type: "account",
    attributes: {
      first_name: "testing",
      last_name: "account",
    },
  },
];

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
  });

  test("User navigates to Task", ({ given, when, then }) => {
    let taskWrapper: ShallowWrapper;
    let instance: Task;

    given("I am a User loading Task", () => {
      taskWrapper = shallow(<Task {...screenPropsForTask} />);
    });

    when("I navigate to the Task", () => {
      instance = taskWrapper.instance() as Task;
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
          errors: true,
        }
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        msgValidationAPI.messageId
      );
      instance.getTasksApiCallId = msgValidationAPI.messageId;
      instance.postTaskApiCallId = msgValidationAPI.messageId;
      instance.putTaskApiCallId = msgValidationAPI.messageId;
      instance.deleteTaskApiCallId = msgValidationAPI.messageId;
      instance.getGroupsApiCallId = msgValidationAPI.messageId;
      instance.assignGroupApiCallId = msgValidationAPI.messageId;
      instance.getAccountsApiCallId = msgValidationAPI.messageId;
      const msgToken = new Message(getName(MessageEnum.RestAPIResponceMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", msgToken);
    });

    then("Task will load without errors", () => {
      expect(taskWrapper).toBeTruthy();
    });

    then("I can click the buttons", () => {
      let buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("testID") === "hideKeyboard"
      );
      buttonComponent.simulate("press");
    });

    then("User can select Add task modal button without errors", () => {
      let buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("testID") === "btnAddTaskModal"
      );
      buttonComponent.simulate("press");
      instance.setState({ isVisibleModal: true, editMode: false });
    });

    then("I can input the information and click the add button", () => {
      let textInputComponent = taskWrapper.findWhere(
        (node) => node.prop("testID") === "inputTitle"
      );
      textInputComponent.simulate("changeText", "Session development");

      textInputComponent = taskWrapper.findWhere(
        (node) => node.prop("testID") === "inputDescription"
      );
      textInputComponent.simulate(
        "changeText",
        "Implement session for application"
      );

      instance.setState({ editMode: true });

      let buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("testID") === "btnExpandPriorityView"
      );
      buttonComponent.simulate("press");

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("testID") === "btnExpandStatusView"
      );
      buttonComponent.simulate("press");

      instance.setState({
        dropdownPriority: true,
        dropdownStatus: true,
        dropdownGroup: true,
        taskList: testTaskData,
      });

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("testID") === "btnAssignPriority0"
      );
      buttonComponent.simulate("press");

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("testID") === "btnAssignStatus0"
      );
      buttonComponent.simulate("press");

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("testID") === "btnAddTask"
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
          data: testTaskData,
        }
      );

      instance.postTaskApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);

      instance.setState({ isVisibleModal: false });
    });

    when("the user clicks on the get tasks", () => {
      let buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("testID") === "btnGetTasks"
      );
      buttonComponent.simulate("press");
      instance.setState({
        selectedAccounts: testGroupData[0].attributes.accounts,
      });
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
          data: testTaskData,
        }
      );

      instance.getTasksApiCallId = msgValidationAPI.messageId;
      instance.getAccountsApiCallId = msgValidationAPI.messageId;
      instance.getGroupsApiCallId = msgValidationAPI.messageId;
      instance.setState({ taskList: testTaskData, isVisibleModal: false });
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("the Task data will load without errors", () => {
      let buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("testID") === "btnDeleteTask0"
      );
      buttonComponent.simulate("press");

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("testID") === "btnAssignTo0"
      );
      buttonComponent.simulate("press");

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("testID") === "btnEditTask0"
      );
      buttonComponent.simulate("press");

      instance.setState({
        isVisibleModal: true,
        editMode: true,
        id: "1",
        title: "test title",
        description: "Test description",
        priority: "low",
        status: "to_do",
      });
      expect(taskWrapper).toBeTruthy();
    });

    when("the user edit task details and save the data", () => {
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
          data: testTaskData,
        }
      );
      instance.addTask();
      instance.editTask("1");
      instance.putTaskApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      instance.setState({
        isVisibleModal: false,
        editMode: true,
        id: "1",
        groupList: testGroupData,
        isVisibleAssignModal: true,
        dropdownAccount: true,
        dropdownGroup: true,
        accountsData: testAccountData,
      });
    });

    when("the user try to assign data without selection", () => {
      let buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("testID") === "btnAssignTaskToAccount0"
      );
      buttonComponent.simulate("press");

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("testID") === "btnAssignTaskToGroup0"
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

      instance.getAccountsApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      instance.handleAssignTo("1", "account", "1");
    });

    when("the user open assign task to group or account modal", () => {
      let buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("testID") === "btnExpandAccountsView"
      );
      buttonComponent.simulate("press");

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("testID") === "btnExpandGroupView"
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

      instance.handleAccountSelect("1");
      instance.assignGroupApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("I can leave the screen without errors", () => {
      instance.componentWillUnmount();
      expect(taskWrapper).toBeTruthy();
    });
  });
});
