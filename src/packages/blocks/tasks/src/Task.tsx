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
import { upArrow, downArrow } from "./assets";
import { IAccount, IGroup, Priority, Status, ITask } from "./types";
// Customizable Area End

import TaskController, { Props, configJSON } from "./TaskController";

export default class Task extends TaskController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  // Select priority dropdown view
  renderChoosePriority() {
    return (
      <View style={styles.tableBox}>
        <View style={styles.innerTableBox}>
          <Text style={styles.infoText}>
            {this.state.priority !== ""
              ? this.state.priority
              : configJSON.selectTaskPriority}
          </Text>
          <TouchableOpacity
            testID={"btnExpandPriorityView"}
            onPress={this.expandPriorityView}
          >
            <Image
              style={styles.arrow}
              source={this.state.dropdownPriority ? upArrow : downArrow}
            />
          </TouchableOpacity>
        </View>
        {this.state.dropdownPriority && (
          <View style={styles.dropdownView}>
            <ScrollView>
              {this.state.priorityList.map(
                (priority: Priority, index: number) => {
                  return (
                    <TouchableOpacity
                      testID={"btnAssignPriority" + index}
                      key={index}
                      style={styles.checkbtn}
                      onPress={() => this.handleSelectPriority(priority)}
                    >
                      <Text style={styles.checktxt}>{priority.name}</Text>
                    </TouchableOpacity>
                  );
                }
              )}
            </ScrollView>
          </View>
        )}
      </View>
    );
  }

  // Select status dropdown view
  renderChooseStatus() {
    return (
      <View style={styles.tableBox}>
        <View style={styles.innerTableBox}>
          <Text style={styles.infoText}>
            {this.state.status !== ""
              ? this.state.status
              : configJSON.selectTaskStatus}
          </Text>
          <TouchableOpacity
            testID={"btnExpandStatusView"}
            onPress={this.expandStatusView}
          >
            <Image
              style={styles.arrow}
              source={this.state.dropdownStatus ? upArrow : downArrow}
            />
          </TouchableOpacity>
        </View>
        {this.state.dropdownStatus && (
          <View style={styles.dropdownView}>
            <ScrollView>
              {this.state.statusList.map((status: Status, index: number) => {
                return (
                  <TouchableOpacity
                    testID={"btnAssignStatus" + index}
                    key={index}
                    style={styles.checkbtn}
                    onPress={() => this.handleSelectStatus(status)}
                  >
                    <Text style={styles.checktxt}>{status.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
    );
  }

  // Select group dropdown view
  renderGroupsModalView() {
    return (
      <View style={styles.tableBox}>
        <View style={styles.innerTableBox}>
          <Text style={styles.infoText}>
            {this.state.assign_to_type === "group"
              ? this.state.assign_to
              : configJSON.selectGroup}
          </Text>
          <TouchableOpacity
            testID={"btnExpandGroupView"}
            onPress={this.expandGroupView}
          >
            <Image
              style={styles.arrow}
              source={this.state.dropdownGroup ? upArrow : downArrow}
            />
          </TouchableOpacity>
        </View>
        {this.state.dropdownGroup && (
          <View style={styles.dropdownView}>
            <ScrollView>
              {this.state.groupList.map((group: IGroup, index: number) => {
                return (
                  <TouchableOpacity
                    testID={"btnAssignTaskToGroup" + index}
                    key={index}
                    style={styles.checkbtn}
                    onPress={() =>
                      this.handleAssignTo(this.state.id, "Group", group.id)
                    }
                  >
                    <Text style={styles.checktxt}>{group.attributes.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
    );
  }

  // Select accounts dropdown view
  renderAccountsModalView() {
    return (
      <View style={styles.tableBox1}>
        <View style={styles.innerTableBox}>
          <Text style={styles.infoText}>
            {this.state.assign_to_type === "account"
              ? this.state.assign_to
              : configJSON.selectAccount}
          </Text>
          <TouchableOpacity
            testID={"btnExpandAccountsView"}
            onPress={this.expandAccountsView}
          >
            <Image
              style={styles.arrow}
              source={this.state.dropdownAccount ? upArrow : downArrow}
            />
          </TouchableOpacity>
        </View>
        {this.state.dropdownAccount && (
          <View style={styles.dropdownView}>
            <ScrollView>
              {this.state.accountsData.map(
                (account: IAccount, index: number) => {
                  return (
                    <TouchableOpacity
                      testID={"btnAssignTaskToAccount" + index}
                      key={index}
                      style={styles.checkbtn}
                      onPress={() =>
                        this.handleAssignTo(
                          this.state.id,
                          "Account",
                          account.id
                        )
                      }
                    >
                      <Text style={styles.checktxt}>
                        {account.attributes.first_name +
                          " " +
                          account.attributes.last_name}
                      </Text>
                      {account.isSelected && (
                        <View style={styles.checkCircle} />
                      )}
                    </TouchableOpacity>
                  );
                }
              )}
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
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
                  testID={"btnAddTaskModal"}
                  style={styles.styledBtn}
                  onPress={this.showAddModal}
                >
                  <Text style={styles.labelTextInput}>
                    {configJSON.textAddTask}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID={"btnGetTasks"}
                  style={styles.styledBtn}
                  onPress={() => {
                    this.getTasks(this.state.token);
                  }}
                >
                  <Text style={styles.labelTextInput}>
                    {configJSON.textShowTask}
                  </Text>
                </TouchableOpacity>
              </View>
              {!this.state.isVisibleModal &&
                this.state.taskList.map((task: ITask, index: number) => {
                  return (
                    <View key={index} style={styles.tableBox}>
                      <Text style={styles.infoText}>
                        <Text style={styles.labelText}>
                          {configJSON.textId + ":  "}
                        </Text>
                        {task.id}
                      </Text>
                      <Text style={styles.infoText}>
                        <Text style={styles.labelText}>
                          {configJSON.textTitle + ":  "}
                        </Text>
                        {task.attributes.title}
                      </Text>
                      <Text style={styles.infoText}>
                        <Text style={styles.labelText}>
                          {configJSON.textDescription + ":  "}
                        </Text>
                        {task.attributes.description}
                      </Text>
                      <Text style={styles.infoText}>
                        <Text style={styles.labelText}>
                          {configJSON.textPriority + ":  "}
                        </Text>
                        {task.attributes.priority}
                      </Text>
                      <Text style={styles.infoText}>
                        <Text style={styles.labelText}>
                          {configJSON.textStatus + ":  "}
                        </Text>
                        {task.attributes.status}
                      </Text>
                      <Text style={styles.infoText}>
                        <Text style={styles.labelText}>
                          {configJSON.textAssignedTo + ":  "}
                        </Text>
                        {task.attributes.assigned_to &&
                        task.attributes.assigned_to.type === "group"
                          ? task.attributes.assigned_to.attributes?.name
                          : //@ts-ignore #R18RN640524 This TS error is a result of running React 18 with RN 0.64 and will be resolved when we upgrade to RN 0.70
                            task.attributes.assigned_to?.attributes?.first_name}
                      </Text>
                      <View style={styles.buttonBox}>
                        <TouchableOpacity
                          testID={"btnAssignTo" + index}
                          style={styles.styledBtn}
                          onPress={() => this.handleAssignToModal(task)}
                        >
                          <Text style={styles.labelTextInput}>
                            {configJSON.textAssign}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          testID={"btnEditTask" + index}
                          style={styles.styledBtn}
                          onPress={() => this.handleEditTask(task)}
                        >
                          <Text style={styles.labelTextInput}>
                            {configJSON.textEdit}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          testID={"btnDeleteTask" + index}
                          style={styles.styledBtn}
                          onPress={() => {
                            this.deleteTask(task.id);
                          }}
                        >
                          <Text style={styles.labelTextInput}>
                            {configJSON.textDelete}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
            </>
          </TouchableWithoutFeedback>
        </ScrollView>

        {/* Add/Edit Task details modal */}
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.isVisibleModal}
        >
          <View style={styles.modal}>
            <View style={styles.inputBox}>
              <Text style={styles.labelTextWidth100}>
                {configJSON.textTitle + ": "}
              </Text>
              <TextInput
                testID={"inputTitle"}
                style={styles.nameTextInput}
                placeholder={configJSON.textTitle}
                defaultValue={this.state.editMode ? this.state.title : ""}
                onChangeText={(title: string) => this.handleInputTitle(title)}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.labelTextWidth100}>
                {configJSON.textDescription + ": "}
              </Text>
              <TextInput
                testID={"inputDescription"}
                style={styles.nameTextInput}
                placeholder={configJSON.textDescription}
                defaultValue={this.state.editMode ? this.state.description : ""}
                onChangeText={(description: string) =>
                  this.handleInputDescription(description)
                }
              />
            </View>
            {this.renderChoosePriority()}
            {this.renderChooseStatus()}
            <View style={styles.buttonBox}>
              <TouchableOpacity
                testID={"btnAddTask"}
                style={styles.styledBtn}
                onPress={() => {
                  this.state.editMode
                    ? this.editTask(this.state.id)
                    : this.addTask();
                }}
              >
                <Text style={styles.labelTextInput}>
                  {this.state.editMode
                    ? configJSON.textEdit
                    : configJSON.textAdd}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID={"btnCloseModal"}
                style={styles.styledBtn}
                onPress={this.hideModal}
              >
                <Text style={styles.closeBtnText}>{configJSON.textClose}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Assign task to the accounts/groups modal */}
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.isVisibleAssignModal}
        >
          <View style={styles.modal}>
            <Text style={styles.accountModalTitle}>{this.state.title}</Text>

            <Text style={styles.accountModalTitle}>
              {configJSON.textAccounts}
            </Text>
            {this.renderAccountsModalView()}
            <Text style={styles.accountModalTitle}>
              {configJSON.textOr + "\n" + configJSON.textGroups}
            </Text>
            {this.renderGroupsModalView()}
            <View style={styles.buttonBox}>
              <TouchableOpacity
                testID={"btnCloseModal"}
                style={styles.styledBtn}
                onPress={this.toggleAssignModal}
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
  infoText: {
    fontSize: 16,
    marginVertical: 4,
  },
  labelText: {
    fontWeight: "bold",
  },
  labelTextWidth100: {
    fontWeight: "bold",
    width: 100,
  },
  inputBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 10,
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
    flex: 1,
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
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
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
  checktxt: {
    paddingLeft: 10,
    marginLeft: 10,
  },
  accountModalTitle: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#767676",
    includeFontPadding: true,
  },
  tableBox1: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#767676",
    padding: 10,
    marginVertical: 10,
    marginBottom: 30,
  },
  checkCircle: {
    height: 10,
    width: 10,
    backgroundColor: "green",
    borderRadius: 5,
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
});
// Customizable Area End
