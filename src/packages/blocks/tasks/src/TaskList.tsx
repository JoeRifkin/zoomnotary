import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { downArrow, upArrow } from "./assets";
import { ITask, ITaskList } from "./types";
// Customizable Area End

import TaskListController, { configJSON, Props } from "./TaskListController";

export default class TaskList extends TaskListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
          <TouchableWithoutFeedback
            testID={"hideKeyboard"}
            onPress={this.hideKeyboard}
          >
            <>
              <View style={styles.buttonBox}>
                <TouchableOpacity
                  testID={"btnAddTaskListModal"}
                  style={styles.styledBtn}
                  onPress={this.showAddModal}
                >
                  <Text style={styles.labelTextInput}>
                    {configJSON.textAddTaskList}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID={"btnGetTaskLists"}
                  style={styles.styledBtn}
                  onPress={() => {
                    this.getTaskLists(this.state.token);
                  }}
                >
                  <Text style={styles.labelTextInput}>
                    {configJSON.textShowTaskList}
                  </Text>
                </TouchableOpacity>
              </View>
              {!this.state.isVisibleModal &&
                this.state.taskLists.map(
                  (taskList: ITaskList, index: number) => {
                    return (
                      <View key={index} style={styles.tableBox}>
                        <Text style={styles.infoText}>
                          <Text style={styles.labelText}>
                            {configJSON.textId + ": "}
                          </Text>
                          {taskList.id}
                        </Text>
                        <Text style={styles.infoText}>
                          <Text style={styles.labelText}>
                            {configJSON.textName + ": "}
                          </Text>
                          {taskList.attributes.name}
                        </Text>
                        <Text style={styles.infoText}>
                          <Text style={styles.labelText}>
                            {configJSON.textCreatedAt + ": "}
                          </Text>
                          {taskList.attributes.created_at.toString()}
                        </Text>
                        <Text style={styles.infoText}>
                          <Text style={styles.labelText}>
                            {configJSON.textUpdatedAt + ": "}
                          </Text>
                          {" "}
                          {taskList.attributes.updated_at.toString()}
                        </Text>
                        <Text style={styles.infoText}>
                          <Text style={styles.labelText}>
                            {configJSON.textTasks + ": "}
                          </Text>
                        </Text>
                        <View style={styles.buttonBox}>
                          <TouchableOpacity
                            testID={"btnEditTaskList"}
                            style={styles.styledBtn}
                            onPress={() => this.handleEditSelect(taskList)}
                          >
                            <Text style={styles.labelTextInput}>
                              {configJSON.textEdit}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            testID={"btnDeleteTaskList"}
                            style={styles.styledBtn}
                            onPress={() => {
                              this.deleteTaskList(taskList.id);
                            }}
                          >
                            <Text style={styles.labelTextInput}>
                              {configJSON.textDelete}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  }
                )}
            </>
          </TouchableWithoutFeedback>
        </ScrollView>

        {/* Add/Edit TaskList modal */}
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.isVisibleModal}
        >
          <View style={styles.modal}>
            <View style={styles.buttonBox}>
              <TextInput
                testID={"inputName"}
                style={styles.nameTextInput}
                placeholder={configJSON.textName}
                defaultValue={this.state.editMode ? this.state.name : ""}
                onChangeText={(name: string) => this.handleInputName(name)}
              />
            </View>
            <View style={styles.tableBoxTasks}>
              <View style={styles.innerTableBox}>
                <Text style={styles.infoText}>{configJSON.selectTasks}</Text>
                <TouchableOpacity
                  testID={"btnExpandTasksView"}
                  onPress={this.expandTasksView}
                >
                  <Image
                    style={styles.arrow}
                    source={this.state.dropdownTasks ? upArrow : downArrow}
                  />
                </TouchableOpacity>
              </View>
              {this.state.dropdownTasks && (
                <View style={styles.dropdownView}>
                  <ScrollView>
                    {this.state.tasksData.map((task: ITask, index: number) => {
                      return (
                        <TouchableOpacity
                          testID={"btnHandleTasksSelect" + index}
                          key={index}
                          style={styles.checkbtn}
                          onPress={() => {
                            this.handleTasksSelect(task.id);
                          }}
                        >
                          <Text style={styles.checktxt}>
                            {task.attributes.title}
                          </Text>
                          {task.isSelected && (
                            <View style={styles.checkCircle} />
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              )}
            </View>
            <View style={styles.buttonBox}>
              <TouchableOpacity
                testID={"btnAddTaskList"}
                style={styles.styledBtn}
                onPress={() => {
                  this.state.editMode
                    ? this.editTaskList(this.state.id)
                    : this.addTaskList();
                }}
              >
                <Text style={styles.labelTextInput}>{configJSON.textSave}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID={"btnCloseModal"}
                style={styles.closeBtn}
                onPress={this.hideModal}
              >
                <Text style={styles.closeBtnText}>{configJSON.textClose}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  tableBox: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    marginBottom: 30,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 4,
  },
  labelText: {
    fontWeight: "bold",
  },
  buttonBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
  },
  nameTextInput: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10,
    flex: 1,
  },
  styledBtn: {
    backgroundColor: "blue",
    marginLeft: 10,
    width: 120,
    height: 40,
    display: "flex",
    justifyContent: "center",
    borderRadius: 4,
    alignSelf: "flex-end",
  },
  labelTextInput: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  closeBtn: {
    backgroundColor: "#fff",
    width: 120,
    height: 40,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  modalBox: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  modal: {
    width: "80%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 80,
    marginLeft: 40,
    padding: 15,
  },
  closeBtnText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
  },
  tableBoxTasks: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#767676",
    padding: 10,
    marginVertical: 10,
    marginBottom: 30,
  },
  innerTableBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrow: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  dropdownView: {
    height: 150,
  },
  checkbtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    paddingBottom: 5,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
  },
  checkCircle: {
    height: 10,
    width: 10,
    backgroundColor: "green",
    borderRadius: 5,
  },
  checktxt: {
    paddingLeft: 10,
    marginLeft: 10,
  },
});
// Customizable Area End
