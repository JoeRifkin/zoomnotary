
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

export default class QuoteDetails extends QuoteManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const setValues2 = this.getLevel1Data();
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.containerQuote} >
        <ScrollView keyboardShouldPersistTaps="always" style={styles.containerQuote} contentContainerStyle={{ flexGrow: 1 }} >
          <TouchableWithoutFeedback
            testID="quotedetail"
            style={{ flex: 1 }}
            onPress={() => {
              this.hideKeyboard();

            }}
          >
            <View style={styles.subrow}>
              <View>
                < View style={styles.dividerow}>
                  <Text style={styles.titleQuote}>Organisation_id :  </Text>
                  <Text style={styles.valueQuote}> {setValues2?.attributes?.organization?.name}</Text>
                </View>
                < View style={styles.dividerow}>
                  <Text style={styles.titleQuote}>Item_Name : </Text>
                  <Text style={styles.valueQuote}> {setValues2?.attributes?.item_name}</Text>
                </View>
                < View style={styles.dividerow}>
                  <Text style={styles.titleQuote}>Item_Price : </Text>
                  <Text style={styles.valueQuote}> {setValues2?.attributes?.item_price}</Text>
                </View>
                < View style={styles.dividerow}>
                  <Text style={styles.titleQuote}>Item_Quantity : </Text>
                  <Text style={styles.valueQuote}> {setValues2?.attributes?.item_quantity}</Text>
                </View>
                < View style={styles.dividerow}>
                  <Text style={styles.titleQuote}>item_Discount: (%) </Text>
                  <Text style={styles.valueQuote}> {setValues2?.attributes?.discount}</Text>
                </View>
                < View style={styles.dividerow}>
                  <Text style={styles.titleQuote}>total_amount: </Text>
                  <Text style={styles.valueQuote}> {setValues2?.attributes?.total_amount}</Text>
                </View>
                < View style={styles.dividerow}>
                  <Text style={styles.titleQuote}>Description :  </Text>
                  <Text style={styles.comment} numberOfLines={5}> {setValues2?.attributes?.description}</Text>
                </View>
                <Text style={styles.titleQuote}>Comments : </Text>
                <TextInput
                  testID="comments"
                  placeholder="Write your comments"
                  style={styles.textDesQuote}
                  value={this.state.itemComments}
                  onChangeText={(text) => this.setComment(text)}
                />
                <Text style={styles.titleQuote}>Status : </Text>
                <SelectDropdown
                  data-test-id="selectdropdown"
                  data={this.state.listOfStatus}
                  onSelect={(selectedItem, index) => {

                    this.selectedItemStatus(selectedItem)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) =>
                    selectedItem
                  }
                  defaultButtonText={setValues2?.attributes?.status}
                  rowTextForSelection={(item, index) => item}
                  buttonStyle={styles.dropdown1BtnStyleQuote}
                  buttonTextStyle={styles.dropdown1BtnTxtStyleQuote}
                  renderDropdownIcon={(isOpened) => (
                    <AntDesign
                      name={isOpened ? "caretup" : "caretdown"}
                      size={18}
                    />
                  )}
                  dropdownIconPosition="right"
                  dropdownStyle={styles.dropdown1DropdownStyleQuote}
                  rowStyle={styles.dropdown1RowStyleQuote}
                  rowTextStyle={styles.dropdown1RowTxtStyleQuote}
                />

                <View style={{
                  flexDirection: "row", justifyContent: "space-around", alignContent: "center",
                  marginTop: 20, marginBottom: 0
                }}>
                  {/* update command  for comment and status */}

                  <TouchableOpacity
                    testID="submit"
                    style={styles.submit}
                    onPress={() => {
                      this.comment_Quote();
                    }}

                  >
                    <Text style={styles.submittxt}>Submit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    testID="cancel"
                    onPress={() => this.goBack()}
                    style={styles.cancel} >
                    <Text style={styles.canceltxt}>cancel</Text>
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
  containerQuote: {
    flex: 1,
    backgroundColor: "#EBDEF0",
    marginTop: 10
  },
  subrow: {
    flex: 1,
    justifyContent: "space-between",
    height: Scale(100),
    backgroundColor: '#D2B4DE',
    marginVertical: 5,
    marginHorizontal: 0,
    borderRadius: 5,
    marginBottom: 20
  },
  cancel:{ backgroundColor: "red", width: "30%", borderRadius: 10, padding: 10, marginBottom: 10 },
  submittxt:{
    textAlign: "center", color: "white" 
  } ,
  dividerow: {
    flexDirection: "row", justifyContent: "space-around", alignSelf: "baseline", top: 5
  },
  comment: {
    fontSize: 18,
    marginLeft: 5,
    color: "#fff",
    width: "70%",
    margin: 11
  },
  canceltxt:{ textAlign: "center", color: "white" },
  submit:{
    backgroundColor: "green", width: "30%", borderRadius: 10, padding: 10,
                      marginBottom: 10
  },
  titleQuote: {
    marginTop: 10,
    fontSize: 18,
    marginVertical: 5,
    fontWeight: "bold",
    color: "black",
    left: 10
  },
  dropdown1BtnStyleQuote: {
    marginTop: 0,
    width: '70%',
    height: 50,
    backgroundColor: '#D2B4DE',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    left: 10
  },
  dropdown1BtnTxtStyleQuote: { color: 'red', textAlign: 'left' },
  dropdown1DropdownStyleQuote: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyleQuote: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyleQuote: { color: '#444', textAlign: 'left' },
  textInputQuote: {
    marginTop: 0,
    borderWidth: 1,
    width: "90%",
    borderRadius: 5,
    left: 10
  },
  textDesQuote: {
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
  dropdownQuote: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  iconQuote: {
    marginRight: 5,
  },
  placeholderStyleQuote: {
    fontSize: 16,
  },
  selectedTextStyleQuote: {
    fontSize: 16,
  },
  iconStyleQuote: {
    width: 20,
    height: 20,
  },
  inputSearchStyleQuote: {
    height: 40,
    fontSize: 16,
  },
  valueQuote: {
    fontSize: 18,
    marginLeft: 5,
    color: "#fff",
    margin: 11,
    // fontWeight:"bold"
  },
});
// Customizable Area End
