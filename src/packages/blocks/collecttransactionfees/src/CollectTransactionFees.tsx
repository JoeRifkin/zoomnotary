// Customizable Area Start
import React from "react";

import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Button,
  Platform,
} from "react-native";

import CollectTransactionFeesController, {
  Props,
  configJSON
} from "./CollectTransactionFeesController";

export default class CollectTransactionFees extends CollectTransactionFeesController {
  constructor(props: Props) {
    super(props);
  }


  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={ 
            this.hideKeyboard
          }
        >
          {/* Merge Engine UI Engine Code */}
          <View>

            <View style={styles.mainFirstAmountView}>
              <Text style={styles.transactionAmount}>Enter Transaction Amount</Text>
              <View style={styles.firstView}>
                <TextInput style={styles.textInputText}
                  testID="txtInputTransactionAmount"
                  placeholderTextColor="#6B6969"
                  onChangeText={this.amountFunction}
                  value={this.state.transactionAmount}
                  keyboardType="numeric"
                />
              </View>
              {this.state.transactionAmountMessage !== "" && <Text style={styles.messageStyle}>{this.state.transactionAmountMessage}</Text>}
            </View>

            <TouchableOpacity style={styles.totalAmountButtonStyle}
              onPress={this.totalAmount}
              testID="btnTotalAmount"
            >
              <Text style={styles.totalAmountStyle}>Calculate Amount</Text>
            </TouchableOpacity>

            <Text style={styles.totalAmountText}>Total Amount</Text>

            <View style={styles.totalAmountView}>
              <Text style={styles.totalAmount}>{this.state.totalAmount}</Text>
            </View>

            <Text style={styles.transactionFeesText}>Transaction Fees</Text>

            <View style={styles.transactionFeesView}>
              <Text style={styles.transactionFees}>{this.state.percentage}</Text>
            </View>

            <Text style={styles.actualAmountText}>Actual Amount</Text>

            <View style={styles.actualAmountView}>
              <Text style={styles.actualAmount}>{this.state.actualAmount}</Text>
            </View>

            <TouchableOpacity style={styles.totalAmountButtonStyle}
              onPress={this.PayAmount}
              testID="btnPayAmount"
            >
              <Text style={styles.totalAmountStyle}>Pay Amount</Text>
            </TouchableOpacity>

          </View>
          {/* Merge Engine UI Engine Code */}
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    // width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff"
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    // borderWidth: Platform.OS === "web" ? 0 : 1
  },
  bgMobileInput: {
    flex: 1
  },
  showHide: {
    alignSelf: "center"
  },
  // imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},

  mainFirstAmountView: {
    marginTop: 20
  },

  messageStyle: {
    color: "#C30505",
    fontSize: 15,
    fontWeight: "800"
  },
  firstView: {
    height: 50,
    width: 360,
    backgroundColor: "#00000000",
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    paddingHorizontal: 15
  },

  transactionAmount: {
    fontSize: 18,
    fontWeight: "500",
    color: "#767676",
  },

  textInputText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
  totalAmountButtonStyle: {
    height: 40,
    width: 360,
    marginVertical: 10,
    backgroundColor: "blue",
    borderColor: "#767676",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  totalAmountStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  totalAmountView: {
    height: 50,
    width: 360,
    backgroundColor: "#00000000",
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
  transactionFeesText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#767676",
  },
  transactionFeesView: {
    height: 50,
    width: 360,
    backgroundColor: "#00000000",
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  transactionFees: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
  actualAmountText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#767676",
  },
  actualAmountView: {
    height: 50,
    width: 360,
    backgroundColor: "#00000000",
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  actualAmount: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },

  totalAmountText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#767676",
  }
});

// Customizable Area End
