import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import CustomHeader from "../../../components/src/CustomHeader";
import CustomLoader from "../../../components/src/CustomLoader";
import CustomButton from "../../../components/src/CustomButton";
import { GenericPasswordMessage } from "../../../components/src/GenericPasswordMessage";
import CustomInput from "../../../components/src/CustomInput";
import { imgError, imgInfo, imgSucess } from '.././../email-account-registration/src/assets';
import { successTick } from "./assets";
// Customizable Area End

import ChangePasswordController, { Props } from "./ChangePasswordController";

export default class ChangePassword extends ChangePasswordController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderSuccess = () => {
    return <View style={styles.successContainer}>
      <Image source={successTick} style={styles.successImg} />
      <Text style={styles.successLabel}>Password Changed</Text>
      <Text style={styles.successDes}>You can browse application and create new notary request</Text>

      <TouchableOpacity
        testID="gotoDashBoard"
        style={styles.successBtn} onPress={this.gotoDashBoard}>
        <Text style={styles.successBtnText}>Dashboard</Text>
      </TouchableOpacity>
    </View>
  }
  // Customizable Area End

  render() {
    // Customizable Area Start

    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={styles.flex}>
        <View style={styles.flex}>

          <CustomHeader
            title={this.state.success ? '' : 'Change Password'}
            showBackIcon
            goBack={this.goBack}
            testID="customHeader"
          />
          {this.state.success ?
            this.renderSuccess() :
            <ScrollView contentContainerStyle={styles.container}>
              <View style={styles.inputContainer}>
                <CustomInput
                  testID='currentPassword'
                  label="Current Password"
                  placeholder="Enter your old password"
                  isRequired={true}
                  value={this.state.currentPassword}
                  onChangeText={(text: string) => this.onChangeCurrentPassword(text)}
                  isPassword={true}
                  errorMessage={this.state.currentPasswordError}
                />

                <CustomInput
                  testID='newPassword'
                  label="New Password"
                  placeholder="Enter your password"
                  isRequired={true}
                  value={this.state.newPassword}
                  onChangeText={(text: string) => this.onChangeNewPassword(text)}
                  isPassword={true}
                  errorMessage={this.state.newPasswordError}
                />

                <CustomInput
                  testID='confirmPassword'
                  label="Confirm new password"
                  placeholder="Confirm your password"
                  isRequired={true}
                  value={this.state.confirmNewPassword}
                  onChangeText={(text: string) => this.onChangeConfirmNewPassword(text)}
                  isPassword={true}
                  errorMessage={this.state.confirmNewPasswordError}
                />

                <GenericPasswordMessage
                  validationList={this.validationList}
                  validationType={[this.state.firstValidationPass, this.state.secValidationPass, this.state.thiredValidationPass, this.state.fourthValidationPass]}
                  sucessImg={imgSucess}
                  errorImg={imgError}
                  infoImg={imgInfo}
                  value={this.state.newPassword}
                />
              </View>


              <View style={styles.btn}>
                <CustomButton
                  testID='changepasswordBtn'
                  title={'Change password'}
                  onPress={this.onSubmitChangePassword}
                  disabled={this.validation()}
                />
              </View>
            </ScrollView>
          }

          <CustomLoader loader={this.state.loading} />
        </View>
      </KeyboardAvoidingView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
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
  inputContainer: {
    marginVertical: 10,
    flex: 1,
  },
  btn: {
    marginBottom: 20,
  },
  flex: { flex: 1 },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 25,
  },
});
// Customizable Area End