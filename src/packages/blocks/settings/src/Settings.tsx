import React from "react";

// Customizable Area Start
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator,
} from "react-native";

import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
import CustomButton from "../../../components/src/CustomButton";
import { GenericTextInput } from "../../../components/src/GenericTextInput";
import { imgClose,successTick} from "./assets";
//@ts-ignore
import { GenericHeader } from "../../../components/src/GenericHeader";
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;

import {
  imgDeleteAcc,
  imgBackArrow
} from "./assets";
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import SettingsController, {
  Props,
  configJSON,
} from "./SettingsController";

export default class Settings extends SettingsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", (e) => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width
      );
      this.forceUpdate();
    });
    // Customizable Area End
  }

  // Customizable Area Start
  menuItemRender = (item: any, index: number) => {
    return (
      <TouchableOpacity onPress={() => this.redirectToPage(item.key,item.screenName)} style={styles.viewOfMenu} key={index}>
        <Image source={item.icon} style={styles.menuIcon} />
        <Text style={styles.menuText}>{item.text}</Text>
      </TouchableOpacity>
    )
  };

  renderDeleteAccountPopup = () => {
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={this.state.deleteaccountModal}
        onRequestClose={this.toggleDeleteAccountPopup}>  
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Are you sure you want to delete account!</Text>
            <View style={styles.buttonContainer}>
              <View style={[styles.btn,styles.m15]}>
                <CustomButton
                  outlined
                  testID='yesProceed'
                  title={'Yes, Proceed'}
                  onPress={this.onSubmitDeleteAccount}
                />
              </View>
              <View style={styles.btn}>
                <CustomButton
                  testID='No'
                  title={'No'}
                  onPress={this.toggleDeleteAccountPopup}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderEnterPasswordPopup = () => {
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={this.state.confirmdeleteaccountModal}
        onRequestClose={this.toggleConfirmDeleteAccountPopup}>  
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>

          <View style={styles.headerView}>
            <Text style={styles.titletext}>Enter password to delete your account</Text>
            <TouchableOpacity testID="btnpress" onPress={() => 
                this.setState({ confirmdeleteaccountModal: false})}>
            <Image source={imgClose} style={{marginLeft:10, height: 24,width: 24}} />
            </TouchableOpacity>
          </View>

            <View style={{width:'100%',marginBottom:10,marginTop:-15}}>
            <GenericTextInput 
                  placeholderTextColor="#D1FAE5"
                  isAstrick={false}
                  isValidateField={this.state.isValidateFieldPassword}
                  placeholder={"Enter Password"}
                  value={this.state.password}
                  nameError={"Please enter password"}
                  txtInputNamePrpos= {{...this.txtInputPasswordPrpos}}
                  testID={"txtenterpassword"}/>
                  </View>

            <View style={styles.buttonContainer}>
            <View style={styles.btn1}>
                <CustomButton
                  testID='Cancel'
                  title={'Cancel'}
                  onPress={this.toggleConfirmDeleteAccountPopup}/>
              </View>
              <View style={[styles.btn1,styles.m151]}>
                <CustomButton
                  isdisabled={this.state.password === "" ? "true":"false"}
                  outlined
                  testID='Yesdelete'
                  title={'Yes,delete'}
                  onPress={this.onDeleteAccount}
                  disabled={this.state.password === "" ? true:false}
                />
              </View>
            </View>

          </View>
        </View>
      </Modal>
    );
  }

  renderSuccess = () => {
    return <View style={styles.successContainer}>
      <Image source={successTick} style={styles.successImg} />
      <Text style={styles.successLabel}>Account deleted Successfully</Text>
      <Text style={styles.successDes}>Your account has been deleted successfully</Text>

      <TouchableOpacity
        testID="gotoDashBoard"
        style={styles.successBtn} onPress={this.gotologinscreen}>
        <Text style={styles.successBtnText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    const {success}=this.state
    return  success ?  this.renderSuccess() : <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <View>
          {this.renderDeleteAccountPopup()}
          {this.renderEnterPasswordPopup()}
            <GenericHeader
              labelTitle={configJSON.SettingsLabel}
              imgBackArrow={imgBackArrow}
              btnGoBack={{ ...this.btnGoBack }}
              testID={"btnbackArrow"}
              isOtherMsg={true}
            />
            
            <View style={styles.fieldView}>
              {this.menuItems.map((item, index) => (
                item.users.includes(this.state.getUserRole) && this.menuItemRender(item, index)
              ))}
              <TouchableOpacity  testID="btndeleteaccount" onPress={() => 
                this.setState({ deleteaccountModal:true,isValidateFieldPassword: false,password:""})}>
              <View style={styles.logOutView}>
              
                <Image source={imgDeleteAcc} style={styles.menuIcon} />
                <Text style={styles.logOutText}>{configJSON.deleteAccount}</Text>
              </View>
              </TouchableOpacity>
            </View>
          </View>   
        </TouchableWithoutFeedback>
        {this.state.isLoader && <View style={styles.loaderStyles}>
                <ActivityIndicator size="large" color="#012275" />
              </View>}
      </ScrollView>
      
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  loaderStyles: {
    justifyContent: 'center',
    flex: 1,
   ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    opacity: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  fieldView: {
    padding: 16
  },
  viewOfMenu: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10
  },
  menuIcon: {
    height: 24,
    width: 24,
    marginRight: 10,
    bottom: 2
  },
  logoutIcon: {
    height: 24,
    width: 24,
    marginRight: 10
  },
  menuText: {
    color: '#334155',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19.36
  },
  logOutText: {
    color: '#DC2626',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19.36
  },
  logOutView: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '90%', // Adjust the width as necessary
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 25.6,
    marginTop: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  btn: {
    flex: .9,
    marginRight:0
  },
  m15:{
    marginRight:15
  },
  btn1: {
    flex: .9,
    marginRight:0
  },
  m151:{
    marginLeft:15
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titletext: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 25.6,
  },
  successImg: {
    width: 72,
    height: 72,
    resizeMode: 'contain',
    marginBottom:20
  },
  successLabel: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 33.6,
    textAlign: 'center',
    color: '#fff',
    marginBottom:10
  },
  successDes: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    textAlign: 'center',
    color: '#fff',
    marginBottom:40

  },
  successBtn: {
    padding: 14,
    borderRadius: 8,
    backgroundColor:'white',
    paddingHorizontal:50,
  },

  successBtnText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: '#012275'
  },
  successContainer:{
    backgroundColor: '#012275',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:55,
    paddingBottom:38
  },
});
// Customizable Area End
