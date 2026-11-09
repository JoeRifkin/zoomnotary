
import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
   View,
  Text,
  FlatList,

  StyleSheet,

  TouchableOpacity,
 
  Image,

  TouchableWithoutFeedback, 
} from "react-native";


import { archivein, edit} from "./assets";


// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start

// Merge Engine - Artboard Dimension  - End

import SelectDropdown from "react-native-select-dropdown";
// Customizable Area End

import QuoteManagementController, {
  Props, UserList,
} from "./QuoteManagementController";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Scale from "../../../components/src/Scale";

export default class MainPage extends QuoteManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start

  renderData = ({item}:{item:UserList}) => {
    return (
      <TouchableOpacity 
      testID="renderPress"
       onPress={
        this.onPressCondition.bind(this,item, this.state.selectRole)
       }
      activeOpacity={1}>
      <View style={[styles.item,{backgroundColor: this.getItemColor(this.state.selectRole)}]}>
        <View >
        <View style={{ flexDirection: "row", justifyContent: "space-around", alignSelf: "baseline", top: 5 }}>
          <Text style={styles.title}>serial_id : </Text>
          <Text style={styles.value}>{item.id}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around", alignSelf: "baseline", top: 5 }}>
          <Text style={styles.title}>Organisation: </Text>
          <Text style={styles.value}>{item.attributes.organization.name}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around", alignSelf: "baseline", top: 5 }}>
          <Text style={styles.title}>Item name : </Text>
          <Text style={styles.value}>{item.attributes.item_name}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around", alignSelf: "baseline", top: 5 }}>
          <Text style={styles.title}>Status : </Text>
          <Text style={styles.value}>{item.attributes.status}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around", alignSelf: "baseline", top: 5 }}>
          <Text style={styles.title}>Price : </Text>
          <Text style={styles.value}>{item.attributes.item_price}</Text>
        </View>
        </View>
        <View style={{flexDirection:"column",justifyContent:"space-around",marginRight:15}}>
        {
         this.getEditRole(item.attributes.status, this.state.selectRole, item.attributes.account_id)
        ? 
        <View >
          <TouchableOpacity 
          testID="passuservalue"
          onPress={this.passValue.bind(this,item)}
          >
          <Image source={edit} 
          style={styles.txtedit} 
          />
          </TouchableOpacity>      
        </View> : null }
        </View>
        </View>
    
      </TouchableOpacity>
    )
  }

  // Customizable Area End

  render() {
    // Customizable Area Start
     // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.container}>
      {/* <ScrollView keyboardShouldPersistTaps="always" style={styles.container} contentContainerStyle={{flexGrow:1}} >  */}
        <TouchableWithoutFeedback
        testID="touch"
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <View style={{flex:1}}>
         <TouchableOpacity testID="changeState" onPress={()=>{this.selectState()}} ></TouchableOpacity>
         <TouchableOpacity testID="changeStateCreator" onPress={()=>{this.selectStateCreator()}} ></TouchableOpacity>
          <View style={{flexDirection:"row",justifyContent:"center"}}>
          
              <SelectDropdown
                  data-test-id="selectdropdown"
                  data={this.state.listOfStatusFilter}
                  onSelect={(selectedItem, index) => {
                    this.selectedItemFilter(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) =>
                    selectedItem
                  }
                  defaultButtonText={"All"}
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
          
          </View> 
            <FlatList
            testID="flatlistMainpage"
              data={this.state.userQuoteList}
              renderItem={this.renderData}
              extraData={this.state.userQuoteList}
              onEndReached={this.onReachEndMain.bind(this)}
            />
             {(this.state.selectRole === "creater") && <TouchableOpacity
             testID="addquote"
              onPress={() => this.addQuote()}
              style={{ position: 'absolute', 
              width: 56, 
              height: 56, 
              alignItems: 'center', 
              justifyContent: 'center', 
              right: 20, 
              bottom: 20, 
              backgroundColor: '#0B043B', 
              borderRadius: 30, 
              elevation: 8   }}
            >
                          <Text style={{ fontSize:50,bottom:4, 
      color: 'white'}}>+</Text>
            </TouchableOpacity>}
          
             </View>
           
        </TouchableWithoutFeedback>
     {/* </ScrollView>  */}
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:6,
    backgroundColor: "#fff",
    marginTop: 20
  },
  item: {
  flexDirection:"row",
  justifyContent:"space-between",
    height: Scale(138),
    width: Scale(400),
    marginVertical: 5,
    marginHorizontal:5,
    borderRadius: 5,
    
    },
  title: {
    fontSize: 15,
    marginLeft: 5,
    color: "black",
    fontWeight: "bold"
  },
  value: {
    fontSize: 18,
    marginLeft: 5,
    color: "#fff",
    bottom:3
    // fontWeight:"bold"
  },
  txtedit:{
    width:30, height:30,tintColor:"black",
  },
  txttrash:{
    width:30, height:30,tintColor:"black"
  },
  dropdown1BtnStyleQuote: {
    marginTop: 0,
    width: '55%',
    height: 50,
    backgroundColor: '#D2B4DE',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    left: 10
  },
  dropdown1BtnTxtStyleQuote: { color: 'blue', textAlign: 'left' },
  dropdown1DropdownStyleQuote: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyleQuote: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyleQuote: { color: '#444', textAlign: 'left' },
});
// Customizable Area End
