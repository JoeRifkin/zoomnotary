import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
// Customizable Area End

import RequestManagementController, {
  Props,
  configJSON,
} from "./RequestManagementController";

export default class RequestManagement extends RequestManagementController {
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
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <View>
            <View style={styles.topBtnWrapper}>
              <TextInput
                value={this.state.filterKey}
                onChangeText={this.onChangeTextFilterKey}
                style={styles.inputStyle}
                placeholder={configJSON.filterInputLabel}
                testID="filterKeyInput"
              />
              <TouchableOpacity
                style={styles.btnStyle}
                onPress={() => this.navigateHandler()}
                testID="sendRequestBtn"
              >
                <Text style={styles.btnTextStyle}>
                  {configJSON.sendRequestBtnLabel}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.titleStyle}>
                {configJSON.receiveRequestText}
              </Text>
              {this.state.receivedRequests
                .filter(request => this.state.filterKey === '' ? true : this.state.filterKey === request.id)
                .map((request) => {
                const color =
                  request.attributes.status === "accepted"
                    ? "green"
                    : request.attributes.status === "rejected"
                    ? "red"
                    : "black";
                return (
                  <View key={request.id} style={styles.requestWrapper}>
                    <Text>
                      {configJSON.nameLabelText}:{" "}
                      <Text style={styles.requestText}>
                        {request.attributes.sender_full_name}
                      </Text>
                    </Text>
                    <Text>
                      {configJSON.requestLabelText}:{" "}
                      <Text style={styles.requestText}>
                        {request.attributes.request_text}
                      </Text>
                    </Text>
                    <Text>
                      {configJSON.statusLabelText}:{" "}
                      <Text style={{ color }}>{request.attributes.status}</Text>
                    </Text>
                    <View style={styles.actionBtnWrapper}>
                      {request.attributes.status === "pending" && (
                        <>
                          <TouchableOpacity
                            style={[styles.btnStyle, styles.btnRightMargin]}
                            onPress={() =>
                              this.updateRequestReview(request.id, true)
                            }
                            testID={"acceptBtn-" + request.id}
                          >
                            <Text style={styles.btnTextStyle}>
                              {configJSON.acceptBtnLabel}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.btnStyle, styles.btnRightMargin]}
                            onPress={() => this.setSelectedId(request.id)}
                            testID={"rejectBtn-" + request.id}
                          >
                            <Text style={styles.btnTextStyle}>
                              {configJSON.rejectBtnLabel}
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}
                      <TouchableOpacity
                        style={[styles.btnStyle, styles.btnRightMargin]}
                        onPress={() => this.setViewRequest(request)}
                        testID={"viewBtn-" + request.id}
                      >
                        <Text style={styles.btnTextStyle}>
                          {configJSON.viewBtnLabel}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btnStyle}
                        onPress={() => this.deleteRequest(request.id)}
                        testID={"deleteBtn-" + request.id}
                      >
                        <Text style={styles.btnTextStyle}>
                          {configJSON.deleteBtnLabel}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={!!this.state.selectedId}
              onRequestClose={() => this.setSelectedId(null)}
            >
              <View style={styles.modal}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>
                    {configJSON.rejectRequestDialogTitle}
                  </Text>
                  <TextInput
                    value={this.state.rejectText}
                    onChangeText={this.onChangeTextRejectText}
                    style={styles.inputStyle}
                    placeholder={configJSON.rejectReasonInputLabel}
                    testID="rejectReasonTextInput"
                  />
                  {!!this.state.rejectTextError && (
                    <Text style={styles.errorText}>
                      {this.state.rejectTextError}
                    </Text>
                  )}
                  <View style={styles.modalBtnWrapper}>
                    <TouchableOpacity
                      style={[styles.btnStyle, styles.btnRightMargin]}
                      onPress={() => this.setSelectedId(null)}
                      testID="cancelRejectModalBtn"
                    >
                      <Text style={styles.btnTextStyle}>
                        {configJSON.cancelBtnLabel}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnStyle}
                      onPress={() =>
                        this.state.selectedId &&
                        this.updateRequestReview(this.state.selectedId, false)
                      }
                      testID="rejectRequestReviewBtn"
                    >
                      <Text style={styles.btnTextStyle}>
                        {configJSON.rejectBtnLabel}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            {this.state.viewRequest && (
              <Modal
                animationType="slide"
                transparent={true}
                visible={!!this.state.viewRequest}
                onRequestClose={this.closeViewModal}
              >
                <View style={styles.modal}>
                  <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle} testID="viewRequestId">
                      {configJSON.requestIdLabel}: {this.state.viewRequest.id}
                    </Text>

                    <Text>
                      {configJSON.nameLabelText}:{" "}
                      <Text style={styles.requestText}>
                        {this.state.viewRequest.attributes.sender_full_name}
                      </Text>
                    </Text>
                    <Text>
                      {configJSON.requestLabelText}:{" "}
                      <Text style={styles.requestText}>
                        {this.state.viewRequest.attributes.request_text}
                      </Text>
                    </Text>
                    <Text>
                      {configJSON.statusLabelText}:{" "}
                      <Text
                        style={{
                          color:
                            this.state.viewRequest.attributes.status ===
                            "accepted"
                              ? "green"
                              : this.state.viewRequest.attributes.status ===
                                "rejected"
                              ? "red"
                              : "black",
                        }}
                      >
                        {this.state.viewRequest.attributes.status}
                      </Text>
                    </Text>
                    {this.state.viewRequest.attributes.rejection_reason && (
                      <Text>
                        {configJSON.rejectReasonLabelText}:{" "}
                        <Text style={styles.requestText}>
                          {this.state.viewRequest.attributes.rejection_reason}
                        </Text>
                      </Text>
                    )}
                    <View style={styles.modalBtnWrapper}>
                      <TouchableOpacity
                        style={styles.btnStyle}
                        onPress={this.closeViewModal}
                        testID="cancelViewModal"
                      >
                        <Text style={styles.btnTextStyle}>
                          {configJSON.cancelBtnLabel}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            )}
          </View>
          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffffff",
  },
  contentContainer: {
    paddingBottom: 30,
  },
  btnStyle: {
    backgroundColor: "#6200ee",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  btnTextStyle: {
    color: "#fff",
  },
  topBtnWrapper: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  requestWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  requestText: {
    color: "#000",
  },
  btnRightMargin: {
    marginRight: 10,
  },
  actionBtnWrapper: {
    flexDirection: "row",
    marginTop: 10,
  },
  titleStyle: {
    color: "#000",
    marginTop: 10
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.8)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "85%",
  },
  modalTitle: {
    color: "#000",
    fontWeight: "700",
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  modalBtnWrapper: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  errorText: {
    fontSize: 12,
    color: "red",
  },
});
// Customizable Area End
