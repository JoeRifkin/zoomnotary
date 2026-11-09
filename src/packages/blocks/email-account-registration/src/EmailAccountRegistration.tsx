import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native";

import {imgBackArrow, imgError, imgInfo, imgSucess} from "./assets";
export const configJSON = require("./config");
import {GenericTextInput} from "../../../components/src/GenericTextInput";
import {GenericPasswordInput} from "../../../components/src/GenericPasswordInput";
import {GenericButton} from "../../../components/src/GenericButton";
import {GenericTextWithHperLink} from "../../../components/src/GenericTextWithHperLink";
import {GenericToggleButton} from "../../../components/src/GenericToggleButton";
import {GenericHeader} from "../../../components/src/GenericHeader";
import {GenericWelcomeView} from "../../../components/src/GenericWelcomeView";
import {GenericDropDownInput} from "../../../components/src/GenericDropDownInput";
import {GenericPasswordMessage} from "../../../components/src/GenericPasswordMessage";
// Customizable Area End

import EmailAccountRegistrationController, {
  Props
} from "./EmailAccountRegistrationController";

export default class EmailAccountRegistration extends EmailAccountRegistrationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={styles.keyboardPadding}
      >
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
          <TouchableWithoutFeedback
            testID={"Background"}
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            {/* Customizable Area Start */}
            <View>
              
              <GenericHeader 
                labelTitle={configJSON.labelTitle}
                imgBackArrow={imgBackArrow}
                btnGoBack={{...this.btnGoBack}}
                testID={"btnbackArrow"}
              />

              <GenericWelcomeView 
                title={configJSON.welcomeMsg}
                description={ this.state.selectedUser === 'need' ? configJSON.suggestionMsgForNeed : configJSON.suggestionMsg}
              />
             
              {this.state.selectedUser === 'need' && <View style={[styles.toggleButton, this.state.isIndividualSelected ? styles.padLeft : styles.padRight]}>
                <GenericToggleButton 
                  testID={"btnIndividual"}
                  isSelected={this.state.isIndividualSelected}
                  text={configJSON.individualText}
                  btnTabIndividualProps={{...this.btnTabIndividualProps}}
                />
                <GenericToggleButton 
                  testID={"btnBusiness"}
                  isSelected={this.state.isBusinessSelected}
                  text={configJSON.businessText}
                  btnTabIndividualProps={{...this.btnTabIndividualProps}}
                />
              </View> }

              <View style={styles.fieldsView}>
                <GenericTextInput 
                  labelName={this.labelFirstName}
                  isAstrick={true}
                  isValidateField={this.state.isValidateField}
                  placeholder={configJSON.namePlaceholder}
                  value={this.state.firstName}
                  nameError={configJSON.nameError}
                  txtInputNamePrpos= {{...this.txtInputFirstNamePrpos}}
                  testID={"txtInputFirstName"}
                  maxCharLength={30}
                  isFullName={true}
                />
                  
                {(this.state.isBusinessSelected || this.state.selectedUser === 'am') &&
                  <GenericTextInput 
                  labelName={configJSON.businessName}
                  isAstrick={true}
                  isValidateField={this.state.isValidateField}
                  placeholder={configJSON.businessPlaceholder}
                  value={this.state.businessName}
                  nameError={configJSON.businessNameError}
                  txtInputNamePrpos= {{...this.txtInputBusinessNamePrpos}}
                  testID={"txtInputBusinessName"}
                  maxCharLength={30}
                />
                }  

                <GenericTextInput 
                  labelName={this.labelEmail}
                  isAstrick={true}
                  isValidateField={this.state.isValidateField}
                  placeholder={configJSON.emailPlaceholder}
                  value={this.state.email}
                  nameError={configJSON.emailError}
                  txtInputNamePrpos= {{...this.txtInputEmailPrpos}}
                  testID={"txtInputEmailSignUp"}
                  secError={!this.isStringNullOrBlank(this.state.email) && (!this.validateEmail(this.state.email))}
                  secErrorMsg={configJSON.inCorrectEmailError}
                />

                {(this.state.selectedUser === 'am' && this.state.countryList) && 
                <GenericDropDownInput
                  labelName={configJSON.country}
                  isAstrick={true}
                  isValidateField={this.state.isValidateField}
                  placeholder={configJSON.countryPlaceholder}
                  value={this.state.selectedCountry}
                  nameError={configJSON.countryError}
                  txtInputNamePrpos={this.txtInputCountryPrpos}
                  testID="txtDropdownCountryInput"
                  dropdownOptions={this.state.countryList}
                />}

                <GenericPasswordInput 
                  labelName={this.labelOfPass}
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
                  secError={!this.isStringNullOrBlank(this.state.password) && !this.validatePassword(this.state.password)}
                  secErrorMsg={configJSON.errorPasswordNotValid}
                />

                <GenericPasswordInput 
                  labelName={this.labelOfRePass}
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
                  secError={this.state.password !== this.state.reTypePassword}
                  secErrorMsg={configJSON.passNotMatchError}
                />
                {this.state.isSignUpFailed && this.state.signUpFailedMsg !== '' && 
                <Text style={styles.errorTextView}>{this.state.signUpFailedMsg}</Text>}

                <GenericPasswordMessage 
                  validationList={[configJSON.passValdationFirst, configJSON.passValdationSec,
                    configJSON.passValdationThired]}
                  validationType={[this.state.firstValidationPass, this.state.secValidationPass, this.state.thiredValidationPass]}
                  sucessImg={imgSucess}
                  errorImg={imgError}
                  infoImg={imgInfo}
                  value={this.state.password}
                />

                <GenericButton 
                  testID={"btnSignUpPage"}
                  btnProps={{...this.btnSignUpProps}}
                  btnDisable={this.getButtonEnable()}
                  btnTextLabel={this.btnTextSignUp}
                  filledBtn={true}
                />

                {this.state.selectedUser === 'need' && 
                  <GenericButton 
                    testID={"btnContinueAsGuest"}
                    filledBtn={false}
                    btnProps={{...this.continueAsGuestBtnProps}}
                    btnTextLabel={configJSON.continueAsGuest}
                  />
                }
                
                <View style={this.state.selectedUser === 'am' && styles.topMargin}>
                <GenericTextWithHperLink 
                  normalText={configJSON.alreadyhaveAccount}
                  hyperText={configJSON.logIn}
                  redirectProps={{...this.btnLoginRedirect}}
                  testid={"btnLogin"}
                />
                </View>
              </View>
            </View>
            {/* Customizable Area End */}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  async componentDidMount() {
    // Customizable Area Start
    this.getValidations();
    // Customizable Area End
  }
}

const styles = StyleSheet.create({
  // Customizable Area Start
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#fff"
  },
  keyboardPadding: { flex: 1 },

  toggleButton: {
    flexDirection: 'row',
    width: 295,
    borderWidth: 2,
    borderRadius: 80,
    borderColor: '#012275',
    marginTop: 24,
    height: 50,
    marginLeft: 40,
    marginRight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  padRight: {
    paddingRight: 6
  },
  padLeft: {
    paddingLeft: 6
  },
  fieldsView: {
    padding: 16
  },
  errorTextView: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18
  },
  topMargin: {
    marginTop: 20
  }
  // Customizable Area End
});
