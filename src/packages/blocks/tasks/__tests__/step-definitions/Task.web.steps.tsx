import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import Task from "../../src/Task.web";

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

const feature = loadFeature("./__tests__/features/Task-scenario.web.feature");

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
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Task", ({ given, when, then }) => {
    let taskWrapper: ShallowWrapper;
    let instance: Task;

    given("I am a User loading Task", () => {
      taskWrapper = shallow(<Task {...screenPropsForTask} />);
    });
    when("I navigate to the Task", () => {
      instance = taskWrapper.instance() as Task;
      const msgToken = new Message(getName(MessageEnum.RestAPIResponceMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", msgToken);
    });

    then("Task will load without errors", () => {
      expect(taskWrapper).toBeTruthy();
    });

    then("User can select Add task modal button without errors", () => {
      let buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnAddTaskModal"
      );
      buttonComponent.simulate("click");
      instance.setState({
        isVisibleModal: true,
        editMode: false,
        title: "",
        description: "",
      });
    });

    then("user try to add task without entering the task details", () => {
      instance.addTask();
    });

    then("I can input the information and click the add button", () => {
      let textInputComponent = taskWrapper.findWhere(
        (node) => node.prop("data-test-id") === "inputTitle"
      );
      textInputComponent.simulate("change", {
        target: { value: "Session development" },
      });

      textInputComponent = taskWrapper.findWhere(
        (node) => node.prop("data-test-id") === "inputDescription"
      );
      textInputComponent.simulate("change", {
        target: { value: "Implement session for application" },
      });

      instance.setState({ editMode: true });
      let buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnExpandPriorityView"
      );
      buttonComponent.simulate("click");

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnExpandStatusView"
      );
      buttonComponent.simulate("click");

      instance.setState({
        dropdownPriority: true,
        dropdownStatus: true,
        dropdownGroup: true,
        taskList: testTaskData,
      });

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnAssignPriority0"
      );
      buttonComponent.simulate("click");

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnAssignStatus0"
      );
      buttonComponent.simulate("click");

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnAddTask"
      );
      buttonComponent.simulate("click");

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnCloseModal"
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
          data: testTaskData,
        }
      );

      instance.postTaskApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);

      instance.setState({ isVisibleModal: false });
    });

    when("the user clicks on the get tasks", () => {
      let buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnGetTasks"
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
          data: testTaskData,
        }
      );

      instance.getTasksApiCallId = msgValidationAPI.messageId;
      instance.setState({ taskList: testTaskData, isVisibleModal: false });
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("the Task data will load without errors", () => {
      let buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnAssignTo0"
      );
      buttonComponent.simulate("click");

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnEditTask0"
      );
      buttonComponent.simulate("click");

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnDeleteTask0"
      );
      buttonComponent.simulate("click");

      instance.setState({
        title: "",
        description: "",
        priority: "",
        status: "",
      });
      expect(taskWrapper).toBeTruthy();
    });

    then("user try to edit task without entering the task details", () => {
      instance.editTask("1");
    });

    when("the user edit task details and save the data", () => {
      instance.setState({
        isVisibleModal: true,
        editMode: true,
        id: "1",
        title: "test title",
        description: "Test description",
        priority: "low",
        status: "to_do",
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
        (node) => node.prop("data-test-id") === "btnAssignTaskToAccount0"
      );
      buttonComponent.simulate("click");

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnAssignTaskToGroup0"
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

      instance.getAccountsApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      instance.handleAssignTo("1", "account", "1");
    });

    when("the user open assign task to group or account modal", () => {
      let buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnExpandAccountsView"
      );
      buttonComponent.simulate("click");

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnExpandGroupView"
      );
      buttonComponent.simulate("click");

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnHandleAssignTo"
      );
      buttonComponent.simulate("click");

      buttonComponent = taskWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnHideAssignModal"
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

      instance.assignGroupApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    when("the user delete task data", () => {
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

      instance.deleteTaskApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("I can leave the screen without errors", () => {
      instance.componentWillUnmount();
      expect(taskWrapper).toBeTruthy();
    });
  });
});
