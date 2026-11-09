import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import TaskList from "../../src/TaskList.web";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
export const configJSON = require("../../config.json");
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { ITask, ITaskList } from "../../src/types";

const screenPropsForTaskList = {
  navigation: {
    navigate: jest.fn(),
  },
  id: "TaskList",
};

const feature = loadFeature(
  "./__tests__/features/TaskList-scenario.web.feature"
);

const testTaskListData: ITaskList[] = [
  {
    isSelected: false,
    id: 1,
    attributes: {
      id: 1,
      account_id: 2,
      name: "Dev task",
      created_at: new Date(),
      updated_at: new Date(),
      tasks: [
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
      ],
    },
  },
];

const testTaskData: ITask[] = [
  {
    id: "10",
    isSelected: false,
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
              type: "account",
              id: 5,
              first_name: "Nirmal",
              last_name: "Vaja",
            },
          ],
        },
      },
    },
  },
];

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to TaskList", ({ given, when, then }) => {
    let taskListWrapper: ShallowWrapper;
    let instance: TaskList;

    given("I am a User loading TaskList", () => {
      taskListWrapper = shallow(<TaskList {...screenPropsForTaskList} />);
    });

    when("I navigate to the TaskList", () => {
      instance = taskListWrapper.instance() as TaskList;
      const msgToken = new Message(getName(MessageEnum.RestAPIResponceMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", msgToken);
    });

    then("TaskList will load without errors", () => {
      expect(taskListWrapper).toBeTruthy();
    });

    then("User can select Add task list modal button without errors", () => {
      let buttonComponent = taskListWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnAddTaskListModal"
      );
      buttonComponent.simulate("click");
      instance.setState({ isVisibleModal: true, editMode: false, name: "" });
    });

    then("user try to add task list without entering the task name", () => {
      instance.addTaskList();
    });

    then("I can input the information and click the add button", () => {
      let textInputComponent = taskListWrapper.findWhere(
        (node) => node.prop("data-test-id") === "inputName"
      );
      textInputComponent.simulate("change", {
        target: { value: "Session development" },
      });

      instance.setState({ editMode: true });
      let buttonComponent = taskListWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnExpandTasksView"
      );
      buttonComponent.simulate("click");

      instance.setState({
        dropdownTasks: true,
        taskLists: testTaskListData,
        tasksData: testTaskData,
        name: "dummy task list",
      });

      buttonComponent = taskListWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnHandleTasksSelect0"
      );
      buttonComponent.simulate("click");

      buttonComponent = taskListWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnAddTaskList"
      );
      buttonComponent.simulate("click");

      buttonComponent = taskListWrapper.findWhere(
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

      instance.postTaskListApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);

      instance.setState({ isVisibleModal: false });
    });

    when("the user clicks on the get tasks list", () => {
      let buttonComponent = taskListWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnGetTaskLists"
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

      instance.getTaskListsApiCallId = msgValidationAPI.messageId;
      instance.setState({ taskLists: testTaskListData, isVisibleModal: false });
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("the Task list data will load without errors", () => {
      let buttonComponent = taskListWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnEditTaskList"
      );
      buttonComponent.simulate("click");

      buttonComponent = taskListWrapper.findWhere(
        (node) => node.prop("data-test-id") === "btnDeleteTaskList"
      );
      buttonComponent.simulate("click");

      instance.setState({
        isVisibleModal: true,
        editMode: true,
        id: 1,
        name: "",
        selectedTasks: testTaskData,
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
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      expect(taskListWrapper).toBeTruthy();
    });

    then("user try to edit task list without entering the task name", () => {
      instance.editTaskList(1);
    });

    when("the user edit task list details and save the data", () => {
      instance.setState({ name: "dumy data", id: 1 });
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
      instance.setState({ isVisibleModal: false });
      instance.addTaskList();
      instance.editTaskList(1);
      instance.putTaskListApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
      instance.setState({
        editMode: true,
        id: 1,
        taskLists: testTaskListData,
        isVisibleModal: true,
        dropdownTasks: true,
      });
    });

    when("the user delete task list data", () => {
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
          data: testTaskListData,
        }
      );

      instance.deleteTaskListApiCallId = msgValidationAPI.messageId;
      runEngine.sendMessage("Unit Test", msgValidationAPI);
    });

    then("I can leave the screen without errors", () => {
      instance.componentWillUnmount();
      expect(taskListWrapper).toBeTruthy();
    });
  });
});
