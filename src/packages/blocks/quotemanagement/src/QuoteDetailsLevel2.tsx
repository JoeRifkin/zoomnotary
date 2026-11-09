
import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  View,
  Text,

  StyleSheet,

  TouchableOpacity,

  TextInput,

  ScrollView,
  TouchableWithoutFeedback,

} from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import SelectDropdown from "react-native-select-dropdown";


// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start

// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import QuoteManagementController, {
  Props,

} from "./QuoteManagementController";
import Scale from "../../../components/src/Scale";

export default class QuoteDetailsLevel2 extends QuoteManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const setValues2 = this.getLevel2Data();
           // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.containerQuoteLevel2} >
        <ScrollView keyboardShouldPersistTaps="always" style={styles.containerQuoteLevel2} contentContainerStyle={{ flexGrow: 1 }} >
          <TouchableWithoutFeedback
            testID="quotedetail"
            style={{ flex: 1 }}
            onPress={() => {
              this.hideKeyboard();

            }}
          >
            <View style={{
              flex: 1,
              justifyContent: "space-between",
              height: Scale(100),
              backgroundColor: '#D2B4DE',
              marginVertical: 5,
              marginHorizontal: 0,
              borderRadius: 5,
              marginBottom: 20
            }}>
              <View>
                < View style={{ flexDirection: "row", justifyContent: "space-around", alignSelf: "baseline", top: 5 }}>
                  <Text style={styles.titleQuoteLevel2}>Organisation_id :  </Text>
                  <Text style={styles.valueQuoteLevel2}> {setValues2?.attributes?.organization.name}</Text>
                </View>
                < View style={{ flexDirection: "row", justifyContent: "space-around", alignSelf: "baseline", top: 5 }}>
                  <Text style={styles.titleQuoteLevel2}>Item_Name : </Text>
                  <Text style={styles.valueQuoteLevel2}> {setValues2?.attributes?.item_name}</Text>
                </View>
                < View style={{ flexDirection: "row", justifyContent: "space-around", alignSelf: "baseline", top: 5 }}>
                  <Text style={styles.titleQuoteLevel2}>Item_Price : </Text>
                  <Text style={styles.valueQuoteLevel2}> {setValues2?.attributes?.item_price}</Text>
                </View>
                < View style={{ flexDirection: "row", justifyContent: "space-around", alignSelf: "baseline", top: 5 }}>
                  <Text style={styles.titleQuoteLevel2}>Item_Quantity : </Text>
                  <Text style={styles.valueQuoteLevel2}> {setValues2?.attributes?.item_quantity}</Text>
                </View>
                < View style={{ flexDirection: "row", justifyContent: "space-around", alignSelf: "baseline", top: 5 }}>
                  <Text style={styles.titleQuoteLevel2}>item_Discount (%): </Text>
                  <Text style={styles.valueQuoteLevel2}> {setValues2?.attributes?.discount}</Text>
                </View>
                < View style={{ flexDirection: "row", justifyContent: "space-around", alignSelf: "baseline", top: 5 }}>
                  <Text style={styles.titleQuoteLevel2}>total_amount: </Text>
                  <Text style={styles.valueQuoteLevel2}> {setValues2?.attributes?.total_amount}</Text>
                </View>
                < View style={{ flexDirection: "row", justifyContent: "space-around", alignSelf: "baseline", top: 5 }}>
                  <Text style={styles.titleQuoteLevel2}>Description :  </Text>
                  <Text style={{
                    fontSize: 18,
                    marginLeft: 5,
                    color: "#fff",
                    width: "70%",
                    margin: 11,
                  }} numberOfLines={5}> {setValues2?.attributes?.description}</Text>
                </View>
                <Text style={styles.titleQuoteLevel2}>Comments : </Text>
                <TextInput
                  testID="comments"
                  placeholder="Write your comments"
                  style={styles.textDesQuoteLevel2}
                  value={this.state.itemComments}
                  onChangeText={(text) => this.setComment(text)}
                />
                <Text style={styles.titleQuoteLevel2}>Status : </Text>
                <SelectDropdown
                  data-test-id="selectdropdown"
                  data={this.state.listOfStatusFinal}
                  onSelect={(selectedItem, index) => {
                  
                   this.selectedItemStatus(selectedItem)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) =>
                    selectedItem
                  }
                  defaultButtonText={setValues2?.attributes?.status}
                  rowTextForSelection={(item, index) => item}
                  buttonStyle={styles.dropdown1BtnStyleQuoteLevel2}
                  buttonTextStyle={styles.dropdown1BtnTxtStyleQuoteLevel2}
                  renderDropdownIcon={(isOpened) => (
                    <AntDesign
                      name={isOpened ? "caretup" : "caretdown"}
                      size={18}
                    />
                  )}
                  dropdownIconPosition="right"
                  dropdownStyle={styles.dropdown1DropdownStyleQuoteLevel2}
                  rowStyle={styles.dropdown1RowStyleQuoteLevel2}
                  rowTextStyle={styles.dropdown1RowTxtStyleQuoteLevel2}
                />

                <View style={{
                  flexDirection: "row", justifyContent: "space-around", alignContent: "center",
                  marginTop: 20, marginBottom: 0
                }}>
                  {/* update command  for comment and status */}

                  <TouchableOpacity
                    testID="submit"
                    style={{
                      backgroundColor: "green", width: "30%", borderRadius: 10, padding: 10,
                      marginBottom: 10
                    }}
                    onPress={() => {
                      this.comment_Quote();
                    }}
                  
                  >
                    <Text style={{ textAlign: "center", color: "white" }}>Submit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    testID="cancel"
                    onPress={() => this.goBack()}
                    style={{ backgroundColor: "red", width: "30%", borderRadius: 10, padding: 10, marginBottom: 10 }} >
                    <Text style={{ textAlign: "center", color: "white" }}>cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  containerQuoteLevel2: {
    flex: 1,
    backgroundColor: "#EBDEF0",
    marginTop: 10
  },
  titleQuoteLevel2: {
    marginTop: 10,
    fontSize: 18,
    marginVertical: 5,
    fontWeight: "bold",
    color: "black",
    left: 10
  },
  dropdown1BtnStyleQuoteLevel2: {
    marginTop: 0,
    width: '70%',
    height: 50,
    backgroundColor: '#D2B4DE',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    left: 10
  },
  dropdown1BtnTxtStyleQuoteLevel2: { color: 'red', textAlign: 'left' },
  dropdown1DropdownStyleQuoteLevel2: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyleQuoteLevel2: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyleQuoteLevel2: { color: '#444', textAlign: 'left' },
  textInputQuoteLevel2: {
    marginTop: 0,
    borderWidth: 1,
    width: "90%",
    borderRadius: 5,
    left: 10
  },
  textDesQuoteLevel2: {
    marginTop: 0,
    borderWidth: 1,
    width: "90%",
    borderRadius: 5,
    left: 10,
    color: "blue",
    height: 100,
    fontSize: 18,
    textAlignVertical: 'top',
  },
  dropdownQuoteLevel2: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  iconQuoteLevel2: {
    marginRight: 5,
  },
  placeholderStyleQuoteLevel2: {
    fontSize: 16,
  },
  selectedTextStyleQuoteLevel2: {
    fontSize: 16,
  },
  iconStyleQuoteLevel2: {
    width: 20,
    height: 20,
  },
  inputSearchStyleQuoteLevel2: {
    height: 40,
    fontSize: 16,
  },
  valueQuoteLevel2: {
    fontSize: 18,
    marginLeft: 5,
    color: "#fff",
    margin: 11,
    // fontWeight:"bold"
  },
});
// Customizable Area End
