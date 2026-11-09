
import React from "react";

// Customizable Area Start
import {
  SafeAreaView,


  View,
  Text,

  StyleSheet,

  TouchableOpacity,
 
  ScrollView,
  TouchableWithoutFeedback,


} from "react-native";



// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start

// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import QuoteManagementController, {
  Props,

} from "./QuoteManagementController";
import Scale from "../../../components/src/Scale";


export default class QuoteManagement extends QuoteManagementController {
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
    <SafeAreaView style={styles.container} >
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container} contentContainerStyle={{flexGrow:1}} >
          <TouchableWithoutFeedback
          testID="touch"
          style={{flex:1}}
            onPress={() => {
              this.hideKeyboard();
              
            }}
          >
           <View style={{backgroundColor:"#4B199C",width:"100%",height:Scale(590),
           borderBottomStartRadius:Scale(150),borderBottomEndRadius:5
        }}>
            <View>
              <Text style={{color:"white",fontSize:40,fontWeight:"bold",alignSelf:"center",marginTop:200}}>Welcome Back !!!</Text>
            </View>
            <View style={{flexDirection:"column",justifyContent:"space-around" ,marginTop:50,alignSelf:"center",width:"100%"}}>
            
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
  container: {
    flex: 1,
       backgroundColor: "#fff",
  },
  });
// Customizable Area End

