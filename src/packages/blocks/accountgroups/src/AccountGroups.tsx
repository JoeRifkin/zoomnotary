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
import { Account, Group, GroupAccount } from "./types";
// Customizable Area End

import AccountGroupsController, {
  configJSON,
  Props,
} from "./AccountGroupsController";

export default class AccountGroups extends AccountGroupsController {
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
        <View style={styles.buttonBox}>
          <TouchableOpacity
            testID={"btnAddGroupModal"}
            style={styles.styledBtn}
            onPress={this.showAddModal}
          >
            <Text style={styles.labelTextInput}>
              {configJSON.textAddGroup}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID={"btnGetGroups"}
            style={styles.btnStyleSecondary}
            onPress={this.handleGetGroups}
          >
            <Text style={styles.labelTextInput}>
              {configJSON.textShowGroup}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>

          <TouchableWithoutFeedback
            testID={"hideKeyboard"}
            onPress={this.hideKeyboard}
          >
            <>
              {!this.state.isVisibleModal &&
                this.state.groupList.map((group: Group) => {
                  return (
                    <View key={group.id} style={styles.tableBox}>
                      <Text style={styles.infoText}>
                        <Text style={styles.labelText}>
                          {configJSON.textId + ": "}
                        </Text>
                        {group.id}
                      </Text>
                      <Text style={styles.infoText}>
                        <Text style={styles.labelText}>
                          {configJSON.textName + ": "}
                        </Text>
                        {group.attributes.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={styles.labelText}>
                          {configJSON.textAccounts + ": "}
                        </Text>
                        <View style={styles.buttonBoxAccounts}>
                          <TouchableOpacity
                            testID="btnHandleAddAccounts"
                            style={styles.btnAddAccounts}
                            onPress={() => this.handleAddAccounts(group)}
                          >
                            <Text style={styles.labelTextInput}>
                              {configJSON.textAddAcc}
                            </Text>
                          </TouchableOpacity>
                          {group.attributes.accounts.length > 0 && (
                            <TouchableOpacity
                              testID="btnHandleDeleteAccounts"
                              style={styles.btnDeleteAccounts}
                              onPress={() => this.handleDeleteAccounts(group)}
                            >
                              <Text style={styles.labelTextInput}>
                                {configJSON.textDeleteAcc}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                      {group.attributes?.accounts.length > 0 && (
                        <>
                          {group.attributes.accounts.map(
                            (account: GroupAccount) => (
                              <Text key={account.id}>
                                {account.first_name + " " + account.last_name}
                              </Text>
                            )
                          )}
                        </>
                      )}

                      <View style={styles.buttonBox}>
                        <TouchableOpacity
                          testID={"btnEditGroup"}
                          style={styles.styledBtn}
                          onPress={() => this.handleEditGroup(group)}
                        >
                          <Text style={styles.labelTextInput}>
                            {configJSON.textEdit}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          testID={"btnDeleteGroup"}
                          style={styles.btnStyleSecondary}
                          onPress={() => this.deleteGroup(group.id)}
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

        {/* Add/Edit group details modal */}
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.isVisibleModal}
        >
          <View style={styles.modalContainer}>
            {this.state.fieldError && <Text style={styles.errorMsg}>{configJSON.errorAllFieldsAreMandatory}</Text>}
            <TextInput
              testID={"inputName"}
              style={styles.nameTextInput}
              placeholder={configJSON.textName}
              defaultValue={this.state.editMode ? this.state.name : ""}
              onChangeText={(name: string) => this.handleInputName(name)}
            />
            <View style={styles.buttonBox}>
              <TouchableOpacity
                testID={"btnAddGroup"}
                style={styles.styledBtn}
                onPress={() => {
                  this.state.editMode
                    ? this.editGroup(this.state.id)
                    : this.addGroup();
                }}
              >
                <Text style={styles.labelTextInput}>
                  {this.state.editMode
                    ? configJSON.textUpdate
                    : configJSON.textSave}
                </Text>
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

        {/* Add/Edit Accounts to the group modal */}
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.isVisibleAddAccountModal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.accountModalTitle}>{this.state.name}</Text>
            <View style={styles.pickerBox}>
              <TouchableOpacity
                testID={"btnExpandAccountsView"}
                onPress={this.expandAccountsView}
                style={styles.innerTableBox}
              >
                <Text style={styles.infoText}>
                  {configJSON.textSelectAccounts}
                </Text>
                <Image
                  style={styles.arrow}
                  source={
                    this.state.dropdownAccountStatus ? upArrow : downArrow
                  }
                />
              </TouchableOpacity>
              {this.state.dropdownAccountStatus && (
                <View style={styles.dropdownView}>
                  <ScrollView>
                    {this.state.modalAccData.map((account: Account, index: number) => {
                      return (
                        <TouchableOpacity
                          testID={"listItem" + index}
                          key={account.id}
                          style={styles.checkbtn}
                          onPress={() => {
                            this.handleAccountSelect(account.id);
                          }}
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
                    })}
                  </ScrollView>
                </View>
              )}
            </View>
            <View style={styles.buttonBox}>
              <TouchableOpacity
                testID={"btnSaveAccountsToGroup"}
                style={styles.styledBtn}
                onPress={() => this.handleSaveAccountsToGroup(this.state.id)}
              >
                <Text style={styles.labelTextInput}>{configJSON.textSave}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID={"btnCloseAddAccountModal"}
                style={styles.closeBtn}
                onPress={this.hideAddAccountModal}
              >
                <Text style={styles.closeBtnText}>{configJSON.textClose}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Delete Accounts from the group modal */}
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.isVisibleDeleteAccountModal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.accountModalTitle}>{this.state.name}</Text>
            <View style={styles.pickerBox}>
              <ScrollView style={styles.dropdownView}>
                {this.state.selectedAccounts.map((account: GroupAccount, index: number) => {
                  return (
                    <TouchableOpacity
                      testID={"deleteListItem" + index}
                      key={account.id}
                      style={styles.checkbtn}
                      onPress={() => {
                        this.handleDeleteAccountSelect(account.id);
                      }}
                    >
                      <Text style={styles.checktxt}>
                        {account.first_name + " " + account.last_name}
                      </Text>
                      {account.isSelected && (
                        <View style={styles.checkCircleRed} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <View style={styles.buttonBox}>
              <TouchableOpacity
                testID={"btnHandleRemoveAccountsToGroup"}
                style={styles.styledBtn}
                onPress={() => this.handleRemoveAccountsToGroup(this.state.id)}
              >
                <Text style={styles.labelTextInput}>
                  {configJSON.textDelete}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID={"btnHideDeleteAccountModal"}
                style={styles.closeBtn}
                onPress={this.hideDeleteAccountModal}
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
    padding: 10,
    width: "100%",
    backgroundColor: "#fff",
  },
  tableBox: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.25,
    elevation: 3,
    backgroundColor: "#fff",
  },
  infoText: {
    fontSize: 14,
    marginVertical: 3,
  },
  labelText: {
    fontWeight: "bold",
  },
  buttonBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
  },
  nameTextInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    includeFontPadding: true,
    padding: 10,
    width: "100%",
  },
  accountModalTitle: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "bold",
    borderColor: "#767676",
    includeFontPadding: true,
    marginBottom: 10,
  },
  styledBtn: {
    backgroundColor: "#0000FF",
    marginHorizontal: 10,
    flex: 1,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 5,
  },
  btnStyleSecondary: {
    backgroundColor: "#E1325A",
    marginHorizontal: 10,
    flex: 1,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 5,
  },
  buttonBoxAccounts: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnAddAccounts: {
    backgroundColor: "#005500",
    marginHorizontal: 5,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  btnDeleteAccounts: {
    backgroundColor: "#990000",
    marginHorizontal: 5,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  labelTextInput: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  closeBtn: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  modalContainer: {
    padding: 25,
    marginTop: 50,
  },
  closeBtnText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
  },
  pickerBox: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    padding: 10,
    margin: 10,
    marginBottom: 25,
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
    height: 200,
    paddingTop: 10,
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
  checkCircleRed: {
    height: 10,
    width: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  checktxt: {
    paddingLeft: 10,
    marginLeft: 10,
  },
  errorMsg: {
    color: "red",
    margin: 10,
    textAlign: "center"
  }
});
// Customizable Area End
