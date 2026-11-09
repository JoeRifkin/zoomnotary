import React from "react";

// Customizable Area Start
import {
  View,
  Button,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import {GenericHeader} from "../../../components/src/GenericHeader";
import {GenericPasswordInput} from "../../../components/src/GenericPasswordInput";
import {GenericPasswordMessage} from "../../../components/src/GenericPasswordMessage";
import {GenericButton} from "../../../components/src/GenericButton";
import {GenericTextWithHperLink} from "../../../components/src/GenericTextWithHperLink";
import {GenericSucessView} from "../../../components/src/GenericSucessView";
export const configJSON = require("./config");
import {imgBackArrow, imgError, imgInfo, imgSucess, imgCheckbox} from "./assets";
import * as Yup from "yup";

// Customizable Area End

import ForgotPasswordController, { Props } from "./ForgotPasswordController";

export default class NewPassword extends ForgotPasswordController {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.isChangePassword = true;
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={
            Platform.OS === "web" ? styles.containerWeb : styles.containerMobile
          }
        >
          {/* ------------------- HEADER ---------------------- */}
          {/* Customizable Area Start */}
          {this.state.changePassWOrdSuccessFull ? <View>
          <View>
            <GenericHeader   
                labelTitle={configJSON.newPassTitle}
                imgBackArrow={imgBackArrow}
                btnGoBack={{...this.btnGoBack}}
                testID={"btnbackArrow"}
                isOtherMsg={true}
              />
          </View>
          <View style={styles.fieldView}>
            <GenericPasswordInput 
              labelName={configJSON.labelOfPass}
              isAstrick={true}
              isValidateField={this.state.isValidateField}
              placeholder={configJSON.passPlaceholder}
              value={this.state.password}
              nameError={configJSON.passErrorMsg}
              txtInputNamePrpos= {{...this.txtInputPasswordProps}}
              btnPasswordShowHideProps={{...this.btnPasswordShowHideProps}}
              testID={"txtInputPasswordSignUp"}
              idOfShowHideBtn={"btnPasswordShowHide"}
              imgEnablePasswordFieldProps={{...this.imgEnablePasswordFieldProps}}
              imgTestID={"imgEnablePasswordField"}
            />
            
            <GenericPasswordInput 
              labelName={configJSON.labelOfRePass}
              isAstrick={true}
              isValidateField={this.state.isValidateField}
              placeholder={configJSON.confirmPassPlaceholder}
              value={this.state.reTypePassword}
              nameError={configJSON.confirmPassError}
              txtInputNamePrpos= {{...this.txtInputConfirmPasswordProps}}
              btnPasswordShowHideProps={{...this.btnConfirmPasswordShowHideProps}}
              testID={"txtInputConfirmPassword"}
              idOfShowHideBtn={"btnConfirmPasswordShowHide"}
              imgEnablePasswordFieldProps={{...this.imgEnableRePasswordFieldProps}}
              imgTestID={"imgEnableRePasswordField"}
              secError={this.getSecondErrorOnRePass()}
              secErrorMsg={configJSON.passNotMatchError}
            />
            {(this.state.isValidation && this.state.isErrorMsg) && <Text style={styles.errorTextView}>{this.state.errorMsg}</Text>}
            
            <GenericPasswordMessage 
              validationList={[configJSON.passValdationFirst, configJSON.passValdationSec,
                configJSON.passValdationThired]}
              validationType={[this.state.firstValidationPass, this.state.secValidationPass, this.state.thiredValidationPass]}
              sucessImg={imgSucess}
              errorImg={imgError}
              infoImg={imgInfo}
              value={this.state.password}
            />

            <View style={styles.marTopForBtn}>
              <GenericButton 
                testID={"btnResetPasswordProps"}
                btnProps={{...this.btnResetPassProps}}
                btnDisable={this.getBtnEnable()}
                btnTextLabel={configJSON.resetPass}
                filledBtn={true}
              />
            </View>
            <View style={styles.marTopForTxt}>
              <GenericTextWithHperLink 
                normalText={configJSON.backTO}
                hyperText={configJSON.logIn}
                redirectProps={{...this.btnLoginRedirect}}
                testid={"btnLogin"}
              />
            </View>
          </View>
          </View>
          : 
          <View>
              <GenericHeader   
                // labelTitle={configJSON.newPassTitle}
                imgBackArrow={imgBackArrow}
                btnGoBack={{...this.btnGoBackOnSucess}}
                testID={"btnbackArrowOnSucess"}
                isOtherMsg={true}
              />
              <GenericSucessView 
                imgCheckbox={imgCheckbox}
                passchanged={configJSON.passchanged}
                chnagedDetail={configJSON.chnagedDetail}
                login={configJSON.login}
                btnLoginProps={{...this.btnLoginRedirect}}
              />
          </View>
          }
          {/* Customizable Area End */}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  containerMobile: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#fff",
  },
  containerWeb: {
    padding: 16,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 650,
  },
  countryCodeSelector: {
    flex: 3,
    marginTop: 20,
    textAlign: "left",
    textAlignVertical: "center",
  },
  button: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    zIndex: -1,
  },

  flexContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    width: "100%",
  },

  headline: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  webInput: {
    marginTop: 20,
    width: "100%",
    zIndex: -1,
  },

  inputAfterCountryCode: {
    width: "100%",
    zIndex: -1,
  },

  mobileInput: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
  },

  codeInput: {
    marginTop: 20,
    width: "30%",
  },

  phoneInput: {
    flex: 3,
    marginTop: 20,
  },

  noBorder: {
    borderBottomWidth: 0,
  },

  titleText: {
    fontSize: 32,
    color: "#6200EE",
    fontWeight: "bold",
  },

  stepText: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },

  emailText: {
    marginBottom: 16,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
    fontWeight: "bold",
  },

  bgRectBorder: {
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    marginTop: 20,
    minHeight: 40,
    fontSize: 18,
    textAlignVertical: "center",
    padding: 10,
  },

  bgRectWeb: {
    marginTop: 40,
  },

  errorStyle: {
    color: "red",
    textAlign: "center",
  },

  passwordShowHide: {
    alignSelf: "center",
  },

  passwordRulesStyle: {
    padding: 15,
  },

  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },

  passwordContainerWeb: {
    flexDirection: "row",
    borderBottomWidth: 1,
    backgroundColor: "#00000000",
    borderColor: "#767676",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  bgPasswordInput: {
    flex: 1,
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    minHeight: 40,
    includeFontPadding: true,
  },
  passwordInputWeb: {
    flex: 1,
    fontSize: 18,
    textAlign: "left",
    backgroundColor: "#00000000",
    minHeight: 40,
    includeFontPadding: true,
    borderColor: "#767676",
    borderRadius: 2,
  },
  imgPasswordShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},

  fieldView: {
    padding: 16
  },
  marTopForBtn: {
    marginTop: Dimensions.get('window').height - 645
  },
  marTopForTxt: {
    marginTop: 20
  },
  errorTextView: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18
  },
});
// Customizable Area End
