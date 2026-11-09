import * as React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
// Customizable Area End

import { configJSON, ViewProps } from "./SelectAddress";

const SelectAddressView: React.FC<ViewProps> = ({
  // Customizable Area Start
  testID,
  addresses,
  hideKeyboard,
  openCreateAddress,
  isVisibleCreateAddress,
  resetCreateModal,
  textFields,
  setTextFields,
  addAddressHandler,
  addressId,
  orderId,
  selectAddress,
  loading,
  // Customizable Area End
}) => {
  // Customizable Area Start
  if (!orderId || loading) {
    return (
      <Text testID="loading" style={styles.loadingText}>
        {loading ? configJSON.loadingText : configJSON.addressNavigationAlert}
      </Text>
    );
  }
  // Customizable Area End

  return (
    // Customizable Area Start
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <View testID={testID}>
          {isVisibleCreateAddress ? (
            <View style={styles.addressFormWrapper}>
              <Text style={styles.createAddressTitle}>
                {configJSON.createNewAddressText}
              </Text>
              {textFields.map((textField, index) => {
                return (
                  <TextInput
                    key={index}
                    value={textField.value}
                    onChangeText={(text) =>
                      setTextFields({ type: textField.name, payload: text })
                    }
                    placeholder={textField.placeholder}
                    style={styles.textInputStyle}
                    testID={textField.testId}
                  />
                );
              })}
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  onPress={resetCreateModal}
                  style={styles.cancelbtnStyle}
                >
                  <Text style={styles.btnTextStyle}>
                    {configJSON.cancelBtnLabel}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={addAddressHandler}
                  style={styles.btnStyle}
                >
                  <Text style={styles.btnTextStyle}>
                    {configJSON.createBtnLabel}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <View style={styles.topBtnContainer}>
                <TouchableOpacity
                  onPress={openCreateAddress}
                  style={styles.btnStyle}
                >
                  <Text style={styles.btnTextStyle}>
                    {configJSON.createNewAddressText}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                {addresses.map((address) => {
                  return (
                    <View
                      style={
                        addressId === address.id
                          ? styles.selectedAddressWrapper
                          : styles.addressWrapper
                      }
                      key={address.id}
                    >
                      <Text testID={"addressName-" + address.id}>
                        {configJSON.addressNameLabel} :{" "}
                        {address.attributes.name}
                      </Text>
                      <Text>
                        {configJSON.addressTypeLabel} :{" "}
                        {address.attributes.address_type}
                      </Text>
                      <Text>
                        {configJSON.flatNoLabel} :{address.attributes.flat_no}
                      </Text>
                      <Text>
                        {configJSON.landmarkLabel} :{" "}
                        {address.attributes.landmark}
                      </Text>
                      <Text>
                        {configJSON.addressLabel} : {address.attributes.address}
                      </Text>
                      <Text>
                        {configJSON.addressLine2Label} :{" "}
                        {address.attributes.address_line_2}
                      </Text>
                      <Text>
                        {configJSON.cityLabel} : {address.attributes.city}
                      </Text>
                      <Text>
                        {configJSON.stateLabel} : {address.attributes.state}
                      </Text>
                      <Text>
                        {configJSON.countryLabel} : {address.attributes.country}
                      </Text>
                      <Text>
                        {configJSON.zipcodeLabel} :{" "}
                        {address.attributes.zip_code}
                      </Text>

                      {addressId !== address.id && (
                        <TouchableOpacity
                          onPress={() => selectAddress(address)}
                          testID={"selectAddressBtn-" + address.id}
                        >
                          <Text style={styles.selectAddressBtn}>
                            {configJSON.selectThisAddressBtn}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </View>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
    // Customizable Area End
  );
};

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
  contentContainer: {
    paddingBottom: 50,
  },
  addressWrapper: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  selectedAddressWrapper: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#6200ee",
  },
  topBtnContainer: {
    alignItems: "flex-end",
    marginBottom: 15,
  },
  btnStyle: {
    backgroundColor: "#6200ee",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  btnTextStyle: {
    color: "#fff",
  },
  addressFormWrapper: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  createAddressTitle: {
    fontWeight: "600",
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  cancelbtnStyle: {
    backgroundColor: "#ccc",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  selectAddressBtn: {
    color: "#6200ee",
    textAlign: "center",
    marginTop: 10,
  },
  loadingText: {
    textAlign: "center",
  },
});
// Customizable Area End

export default SelectAddressView;
