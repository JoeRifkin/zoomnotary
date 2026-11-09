
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

export default class CreateQuote extends QuoteManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
  
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
    <SafeAreaView style={styles.containerCreate} >
        <ScrollView keyboardShouldPersistTaps="always" style={styles.containerCreate  } contentContainerStyle={{flexGrow:1}} >
          <TouchableWithoutFeedback
          testID="level0feedback"
          style={{flex:1}}
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            <View style={{
                flex:1,
               }}>
             <Text style={styles.titleCreate}>Organization_Name</Text>
             
              <SelectDropdown
                data-test-id="selectdropdown"
                data={this.state.selectOrganisation}
                onSelect={(selectedItem) => {
                  this.selectedItem(selectedItem?.id);
                
                }}

                defaultButtonText="select"
               buttonTextAfterSelection={(selectedItem) =>
                selectedItem.name
               }
               rowTextForSelection={(item) => item?.name}
                buttonStyle={styles.dropdown1BtnStyleCreate}
                buttonTextStyle={styles.dropdown1BtnTxtStyleCreate}
                renderDropdownIcon={(isOpened) => (
                  <AntDesign
                    name={isOpened ?  "caretup" :"caretdown"}
                    size={18}/>
                )}
                dropdownIconPosition="right"
                dropdownStyle={styles.dropdown1DropdownStyleCreate}
                rowStyle={styles.dropdown1RowStyleCreate}
                rowTextStyle={styles.dropdown1RowTxtStyleCreate}
              />
             
              <Text style={styles.titleCreate}>Item_Name</Text>
              <TextInput
              testID="name"
               placeholder="Item_Name"
               style={styles.textInputCreate}
               value={this.state.itemName}
               onChangeText={(text)=>this.setName(text)}
              />
              <Text style={styles.titleCreate}>Item_Price</Text>
              <TextInput
              testID="price"
               placeholder="Item_Price"
               style={styles.textInputCreate}
               keyboardType="numeric"
               value={this.state.itemPrice}
               onChangeText={(text)=>this.setPrice(text)}
              />
              <Text style={styles.titleCreate}>Item_Quantity</Text>
              <TextInput
              testID="quantity"
               placeholder="Item_Quantity"
               style={styles.textInputCreate}
               keyboardType="numeric"
               value={this.state.itemQuantity}
               onChangeText={(text)=>this.setQuantity(text)}
               
              />
               <Text style={styles.titleCreate}>Discount (%)</Text>
              <TextInput
              testID="discount"
               placeholder="Dicount"
               keyboardType="numeric"
               style={styles.textInputCreate}
               value={this.state.itemDiscount}
               onChangeText={(text)=>this.setDiscount(text)}
              />        
              <Text style={styles.titleCreate}>Description</Text>
              <TextInput
              testID="description"
               placeholder="Description"
               style={styles.textDesCreate}
           multiline={true}
               value={this.state.itemDescription}
               onChangeText={(text)=>this.setDescription(text)}
              />    
          
               <View style={{flexDirection:"row",justifyContent:"space-around",alignContent:"center",
                            marginTop:20,marginBottom:0}}>
               <TouchableOpacity 
               testID="level0submit"
               style={{backgroundColor:"#65115B",width:"30%",borderRadius:10,padding:10,marginBottom:10}}
               onPress={
                ()=>this.create_Quote()}
               >
              <Text style={{textAlign:"center",color:"white",fontSize:17}}>Submit</Text>
           </TouchableOpacity>
            <TouchableOpacity 
            testID="level0cancel"
            onPress={()=>this.goBack()}
            style={{backgroundColor:"#65115B",width:"30%",borderRadius:10,padding:10,marginBottom:10}} >
              <Text style={{textAlign:"center",color:"white",fontSize:17}}>Cancel</Text>
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
  containerCreate: {
    flex: 1,
      backgroundColor: "#D9D8DD",
  },
  titleCreate: {  
    marginTop:10,
    fontSize: 18,
    marginVertical:5,
    fontWeight:"bold",
    color:"black",
    left:10
  },
   dropdown1BtnStyleCreate: {
    marginTop:0,
    width: '50%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    left:10
  },
  dropdown1BtnTxtStyleCreate: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyleCreate: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyleCreate: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyleCreate: { color: '#444', textAlign: 'left' },
  textInputCreate:{marginTop:0,
    borderWidth:0.5,
    padding:10,
    width: "90%",
    borderRadius: 5,
    backgroundColor:"white",
    fontSize:17,
    left:10},
  textDesCreate:{marginTop:0,
    borderWidth:0.5,
    width: "90%",
    borderRadius: 5,
    backgroundColor:"white",
    fontSize:17,
    left:10,
      color:"black",
    padding:10,
    height:Scale(100),
    textAlignVertical:'top',
  },
    dropdownCreate: {
      margin: 16,
      height: 50,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    iconCreate: {
      marginRight: 5,
    },
    placeholderStyleCreate: {
      fontSize: 16,
    },
    selectedTextStyleCreate: {
      fontSize: 16,
    },
    iconStyleCreate: {
      width: 20,
      height: 20,
    },
    inputSearchStyleCreate: {
      height: 40,
      fontSize: 16,
    },
});
// Customizable Area End



