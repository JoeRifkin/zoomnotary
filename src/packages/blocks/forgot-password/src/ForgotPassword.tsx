import React from "react";

//Customizable Area Start
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import CodeInput from 'react-native-confirmation-code-input';
import ForgotPasswordController, { Props } from "./ForgotPasswordController";
import {GenericHeader} from "../../../components/src/GenericHeader";
import {imgBackArrow} from "./assets";
import {GenericTextInput} from "../../../components/src/GenericTextInput";
import {GenericTextWithHperLink} from "../../../components/src/GenericTextWithHperLink";
import {GenericButton} from "../../../components/src/GenericButton";

export const configJSON = require("./config");
const screenWidth = Dimensions.get('window').width;
const space = screenWidth * 0.04;
//Customizable Area End

export default class ForgotPassword extends ForgotPasswordController {
  constructor(props: Props) {
    super(props);
    //Customizable Area Start
    //Customizable Area End
  }

  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={
            this.isPlatformWeb() ? styles.containerWeb : styles.containerMobile
          }
        >
          <TouchableWithoutFeedback onPress={() => this.hideKeyboard()}>
            {/* Customizable Area Start */}

            {this.state.isOTPViewDisplay ?
              <View>
                <GenericHeader 
                  labelTitle={'OTP Verification'}
                  imgBackArrow={imgBackArrow}
                  btnGoBack={{...this.btnGoBackForOTP}}
                  testID={"btnbackArrow"}
                  isOtherMsg={true}
                />
                <View style={styles.fieldView}>
                  <Text style={styles.titleWhySignUp}>{configJSON.otpDes} {/*UI Engine::From Sketch*/}
                  </Text>

                  <CodeInput
                    ref="codeInputRef2"
                    keyboardType="numeric"
                    codeLength={configJSON.otpSizeBox}
                    activeColor={!this.state.isValidation ? '#5D5D5D' : '#DC2626'}
                    inactiveColor={!this.state.isValidation ? '#5D5D5D' : '#DC2626'}
                    autoFocus={true}
                    size={44}
                    space={space}
                    inputPosition='left'
                    onFulfill={(code: any) => this.onFinishCheckingCode1(code)}
                    containerStyle={styles.constainerCodeInput}
                    codeInputStyle={styles.codeInputSty }
                  />

                  {this.state.isValidation && !this.getButtonEnableForOTP() && <Text style={styles.errorTextView}>{'Invalid OTP'}</Text>}
                  {(this.state.isValidation && this.state.isErrorMsg) && <Text style={styles.errorTextView}>{this.state.errorMsg}</Text>}
                  <View style={styles.timeAndTextView}>
                    <View style={styles.forgetView}>
                      <View style={styles.unableResendBorder }>
                        <Text
                          testID={"btnResendCode"} //Merge Engine::From BDS
                          style={[styles.forgotPassword, styles.unableResend]} //UI Engine::From Sketch
                          {...this.btnResnedProps} >
                          {configJSON.resendText}
                        </Text>
                      </View>
                      {/* <View style={[styles.line, styles.lineOfForget]}></View> */}
                    </View>

                    <Text testID="btnTimerId" style={styles.timerView}>{`${Math.floor(this.state.timer / 60)}:${(this.state.timer % 60)
                      .toString()
                      .padStart(2, '0')}`}
                    </Text>
                  </View>

                  <View style={styles.padTop}>
                    <GenericButton 
                        testID={"btnSubmitOTP"}
                        btnProps={{...this.btnSubmitOTPProps}}
                        btnDisable={this.getButtonEnableForOTP()}
                        btnTextLabel={'Next'}
                        filledBtn={true}
                      />
                    </View>
                </View>
              </View>
            : <View>
              {/* headline */}
              <GenericHeader   
                labelTitle={configJSON.forgotPassTitle}
                imgBackArrow={imgBackArrow}
                btnGoBack={{...this.btnGoBack}}
                testID={"btnbackArrow"}
                isOtherMsg={true}
              />

              {/* ---------------------------------------------------------ENTER EMAIL---------------------------------------------------------------------- */}

              <View >
                <View style={styles.desView}>
                  <Text style={styles.desText}>{configJSON.desMsg}</Text>
                </View>

                <View style={styles.fieldView}>
                <GenericTextInput 
                  labelName={configJSON.firstInputPlaceholder}
                  isAstrick={true}
                  isValidateField={this.state.isValidateField}
                  placeholder={configJSON.emailPlaceholder}
                  value={this.state.email}
                  nameError={configJSON.emailError}
                  txtInputNamePrpos= {{...this.txtInputEmailPrpos}}
                  testID={"txtInputFirstName"}
                  secError={!this.isStringNullOrBlank(this.state.email) && (!this.validateEmail(this.state.email))}
                  secErrorMsg={configJSON.inCorrectEmailError}
                />
                {(this.state.isValidation && this.state.isErrorMsg ) && <Text style={styles.errorTextView}>{this.state.errorMsg}</Text>}
                <View style={styles.marTopForBtn}>
                  <GenericButton 
                    testID={"btnSignUpPage"}
                    btnProps={{...this.btnNextProps}}
                    btnDisable={this.getButtonEnable()}
                    btnTextLabel={configJSON.btnText}
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

            </View>
            }
            {/* Customizable Area End */}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  containerMobile: {
    flex: 1,
    // padding: 16,
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

  headline: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  desView: {
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 10,
    marginRight: 20,
  },
  desText:{
    color: "#475569",
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22.4,
  },
  fieldView: {
    paddingLeft:20,
    paddingRight:20
  },
  marTopForBtn: {
    marginTop: Dimensions.get('window').height - 420
  },
  marTopForTxt: {
    marginTop: 20
  },
  titleWhySignUp: {
    fontSize: 14,
    fontWeight: '400',
    color: '#475569',
    textAlign: "left",
    lineHeight: 22.5,
    marginTop: 20,
  },
  lineOfForget: {
    width: "30%"
  },
  line: {
    height: 1.5,
    backgroundColor: '#012275', // Adjust the color of the line as needed
  },
  timeAndTextView: {
    flexDirection: 'row',
    paddingRight: 10,
    paddingTop: 15,
  },
  timerView: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 22,
    color: '#012275'
  },
  errorTextView: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18,
    marginTop: 15
  },
  padTop: {
    paddingTop:Dimensions.get('window').height - 420
  },
  forgetView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  unableResendBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#012275',
  },
  disableResendBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#64748B',
  },
  forgotPassword: {
    fontWeight: "bold",
    fontSize: 14,
    fontStyle: 'normal',
    textDecorationColor: '#012275',
    zIndex: 1,
  },

  unableResend: {
    color: "#012275",
    borderBottomColor: '#012275',
  },
  disableResend: {
    color: "#64748B",
    borderBottomColor: '#64748B',
  },
  codeInputSty: {
    borderWidth: 1.5, 
    borderRadius: 8, 
    color: '#000A34', 
    fontWeight: '500',
    fontSize: 16,
  },
  constainerCodeInput: { 
    // paddingRight: 16
  }

});
