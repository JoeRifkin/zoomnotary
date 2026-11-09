
import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";


// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start

// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import QuoteManagementController, {
  Comments,
  Props, 

} from "./QuoteManagementController";
import Scale from "../../../components/src/Scale";

export default class EditQuotation extends QuoteManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const editedValue = this.getEditUserData();
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.containerEdit} >
        <ScrollView keyboardShouldPersistTaps="always" style={styles.containerEdit} contentContainerStyle={{ flexGrow: 1 }} >
          <TouchableWithoutFeedback
            testID="touch"
            style={{ flex: 1 }}
            onPress={() => {
              this.hideKeyboard();

            }}
          >
            <View style={{
              flex: 1,
            }}>
              <Text style={styles.titleEdit}>Item_Name</Text>
              <TextInput
                testID="name"
                value={this.state.itemName}
                placeholder="Item_Name"
                style={styles.textInputEdit}
                onChangeText={(text) => this.setName(text)}
              />
              <Text style={styles.titleEdit}>Item_Price</Text>
              <TextInput
                testID="price"
                value={this.state.itemPrice}
                placeholder="Item_Price"
                style={styles.textInputEdit}
                onChangeText={(text) => this.setPrice(text)}
              />
              <Text style={styles.titleEdit}>Item_Quantity</Text>
              <TextInput
                testID="quantity"
                value={this.state.itemQuantity}
                placeholder="Item_Quantity"
                style={styles.textInputEdit}
                onChangeText={(text) => this.setQuantity(text)}

              />
              <Text style={styles.titleEdit}>Discount (%)</Text>
              <TextInput
                testID="discount"
                value={this.state.itemDiscount}
                placeholder="Discount"
                style={styles.textInputEdit}
                onChangeText={(text) => this.setDiscount( text )}
              />
              <Text style={styles.titleEdit}>Description</Text>
              <TextInput  
                testID="description"
                value={this.state.itemDescription}
                placeholder="Description"
                style={styles.textDesEdit}
                multiline={true}
                onChangeText={(text) => this.setDescription( text)}
              />
              <Text style={styles.titleEdit}>Comments</Text>
              <FlatList
                testID="flatlistEdituser"
                data={editedValue?.attributes?.comments}
                renderItem={({item}:{item:Comments}) => {
                  return (
                    <View>
                      <Text style={{ color: "red", fontSize: 16, marginLeft: 10 }} numberOfLines={2}> {item?.rejection_comment} </Text>
                    </View>
                  )
                }}

              />
              <View style={{ flexDirection: "row", justifyContent: "space-around", alignContent: "center", marginTop: 20 }}>
                <TouchableOpacity
                  testID="update"
                  style={{ backgroundColor: "green", width: "30%", borderRadius: 10, padding: 10, marginBottom: 10 }}
                  onPress={() => this.update_Quote()}
                >
                  <Text style={{ textAlign: "center", color: "white" }}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="cancel"
                  onPress={() =>this.goBack()}
                  style={{ backgroundColor: "green", width: "30%", borderRadius: 10, padding: 10, marginBottom: 10 }} >
                  <Text style={{ textAlign: "center", color: "white" }}>Cancel</Text>
                </TouchableOpacity>
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
  containerEdit: {
    flex: 1,
    // height:Scale(200),
    backgroundColor: "#EBDEF0",
    marginTop: 10
  },
  titleEdit: {
    marginTop: 10,
    fontSize: 18,
    marginVertical: 5,
    fontWeight: "bold",
    color: "black",
    left: 10
  },
  dropdown1BtnStyleEdit: {
    marginTop: 0,
    width: '50%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    left: 10
  },
  dropdown1BtnTxtStyleEdit: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyleEdit: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyleEdit: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyleEdit: { color: '#444', textAlign: 'left' },
  textInputEdit: {
    marginTop: 0,
    borderWidth: 1,
    width: "90%",
    borderRadius: 5,
    color: "black",
    left: 10,
    padding:Scale(15)
  },
  textDesEdit: {
      borderWidth: 1,
    width: "90%",
    borderRadius: 5,
    left: 10,
    color: "black",
    height: "20%",
    textAlignVertical:"top",
  }

});
// Customizable Area End
