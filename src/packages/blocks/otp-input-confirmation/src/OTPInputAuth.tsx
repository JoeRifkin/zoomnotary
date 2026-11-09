import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
  TouchableOpacity
} from "react-native";
import {GenericHeader} from "../../../components/src/GenericHeader";
import {GenericButton} from "../../../components/src/GenericButton";
import {GenericSucessView} from "../../../components/src/GenericSucessView";
import {GenericNotaryServices} from "../../../components/src/GenericNotaryServices";
import {GenericWelcomeView} from "../../../components/src/GenericWelcomeView";
import {GenericCustomModel} from "../../../components/src/GenericCustomModel";
import CodeInput from 'react-native-confirmation-code-input';
export const configJSON = require("./config");
import {imgBackArrow, imgCheckbox, imgPendingVerify} from "./assets";
const screenWidth = Dimensions.get('window').width;
const space = screenWidth * 0.04;
// Customizable Area End

import OTPInputAuthController, { Props } from "./OTPInputAuthController";

export default class OTPInputAuth extends OTPInputAuthController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      //Merge Engine DefaultContainer
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={
          Platform.OS === "web" ? styles.containerWeb : styles.containerMobile
        }
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
          testID="hideKeyboard"
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          {this.state.isOtpVerified ? 
            <View>
              {!this.state.isServiceListVisible  ? 
                <View>
                  <GenericHeader 
                    testID={"btnGobackArrowId"}
                    isOtherMsg={true}
                  />
                  {this.state.selectedUser === 'need' ?<GenericSucessView 
                    imgCheckbox={imgCheckbox}
                    passchanged={'Account Created '}
                    chnagedDetail={'You can browse application and create new notary request'}
                    login={'Dashboard'}
                    btnLoginProps={{...this.btnRedirectToDashboard}}
                    testID={"sucessEndUserSignUpID"}
                  /> :
                  <GenericSucessView 
                    imgCheckbox={imgPendingVerify}
                    passchanged={'Verification Pending '}
                    chnagedDetail={'Your account is under verification, you’ll be notified once done.'}
                    login={'Login'}
                    pending={true}
                    btnLoginProps={{...this.btnLoginRedirect}}
                    testID={"sucessNotarySignUpID"}
                  /> }
                </View> : 
                <View>
                  <GenericHeader 
                    btnGoBack={{...this.btnGoBack}}
                    testID={"btnbackArrow"}
                    isOtherMsg={false}
                    clickedRightView={this.clickedRightView}
                  />

                  <GenericWelcomeView 
                    title={'Notary services'}
                    description={'Select the services you want to provide to the clients'}
                  />
                  {(this.state.servicesList !== null && this.state.servicesList !== '' && this.state.servicesList.length > 0) ?
                  <GenericNotaryServices 
                    servicesList={this.state.servicesList}
                    selectedService={this.state.selectedServices}
                    isChecked={this.state.isAllServicesSelected}
                    clickOnAllSelect={this.clickOnAllSelect}
                    clickOnSelect={this.clickOnSelect}
                  /> : 
                  <View style={[styles.fieldButtonView, styles.padTopOfText]}>
                    <Text>{'No services available'}</Text>
                  </View>}
                  <View style={styles.fieldButtonView}>
                    <GenericButton 
                      testID={"btnSaveServices"}
                      btnProps={{...this.btnSubmitServicesProps}}
                      btnDisable={this.getSaveButtonEnable()}
                      btnTextLabel={this.getSaveButtonEnable() ? "Save" : 'Continue'}
                      filledBtn={true}
                    />
                    <TouchableOpacity testID="btnSkip" onPress={this.clickedRightView} style={styles.skipView}>
                      <View style={styles.viewSkipText}>
                        <Text style={styles.skipTextView}>{'Skip'}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <GenericCustomModel
                    visible={this.state.isOpenModel}
                    onClose={() => this.setState({isOpenModel: false}) }
                    height={160}
                    width={337}>
                    <Text style={styles.confirmationMsgView}>{'you can choose the desired services later in '}<Text style={styles.confirmMsgView}>{'Profile › Notary Services'}</Text></Text>
                    <View style={styles.btnView}>
                      <View style={styles.btnViewWid}>
                        <TouchableOpacity
                          testID={"btnNoToProceed"}
                          style={[styles.viewOfBtn, styles.blankBtn ]}
                          {...this.noToChanges}>
                          <Text style={[styles.loginBtnText, styles.blankBtnText] }>{'Back'}</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.btnViewWidofYes}>
                        <TouchableOpacity
                          testID={"btnYesProceed"}
                          style={[styles.viewOfBtn, styles.filledBtn ]}
                          {...this.yesProceedToChanges}>
                          <Text style={[styles.loginBtnText, styles.filledBtnText] }>{'Yes, proceed'}</Text>
                        </TouchableOpacity>
                      </View>
                      
                    </View>
                  </GenericCustomModel>
                </View>
              }
            </View> :
            <View>
              <GenericHeader 
                labelTitle={'OTP Verification'}
                imgBackArrow={imgBackArrow}
                btnGoBack={{...this.btnGoBack}}
                testID={"btnbackArrow"}
                isOtherMsg={true}
              />
              <View style={styles.fieldView}>
                <Text style={styles.titleWhySignUp} >{'Enter your OTP below, the code has been sent to your registered Email Address'}</Text>

                  <CodeInput
                    ref="codeInputRef2"
                    keyboardType="numeric"
                    codeLength={6}
                    activeColor={this.getColorOfBox()}
                    inactiveColor={this.getColorOfBox()}
                    autoFocus={true}
                    size={44}
                    space={space}
                    inputPosition='left'
                    onFulfill={(code: any) => this.onFulfill(code)}
                    containerStyle={styles.constainerCodeInput}
                    codeInputStyle={styles.codeInputSty }
                  />
                {this.showErrorMsg() && <Text style={styles.errorTextView}>{'Invalid OTP'}</Text>}
                <View style={styles.timeAndTextView}>
                  <View style={styles.forgetView}>
                    <View style={styles.boderBottomView}>
                      <Text
                        testID={"btnResendCode"} //Merge Engine::From BDS
                        style={styles.forgotPassword} //UI Engine::From Sketch
                        {...this.btnResnedProps} >
                        {'Resend code?'}
                      </Text>
                    </View>
                  </View>

                  <Text testID="btnTimerId" style={styles.timerView}>
                    {`${Math.floor(this.state.timer / 60)
                      .toString()
                      .padStart(2, '0')}:${(this.state.timer % 60).toString().padStart(2, '0')}`}
                  </Text>
                </View>

                <View style={styles.padTop}>
                  <GenericButton 
                      testID={"btnSubmitOTP"}
                      btnProps={{...this.btnSubmitOTPProps}}
                      btnDisable={this.getButtonEnable()}
                      btnTextLabel={'Next'}
                      filledBtn={true}
                    />
                  </View>
              </View>
            </View> 
          }
          {/* Customizable Area End */}
          {/* Merge Engine UI Engine Code */}
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  containerWeb: {
    flex: 1,
    padding: 16,
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 650,
    backgroundColor: "#fff",
  },
  containerMobile: {
    flex: 1,
    // padding: 16,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 650,
    backgroundColor: "#fff",
  },
  titleWhySignUp: {
    fontSize: 14,
    fontWeight: '400',
    color: '#475569',
    lineHeight: 22.5,
    marginTop: 20,
  },
  fieldView: {
    padding: 16
  },
  padTopOfText: {
    paddingTop: 40
  },
  fieldButtonView: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 40
  },
  padTop: {
    paddingTop:Dimensions.get('window').height - 420
  },
  forgetView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  boderBottomView: {
    borderBottomWidth: 2,
    borderBottomColor: '#012275'
  },
  forgotPassword: {
    color: "#012275",
    fontWeight: "bold",
    fontSize: 14,
    fontStyle: 'normal',
    textDecorationColor: '#012275',
    zIndex: 1,
  },
  timeAndTextView: {
    flexDirection: 'row',
    paddingRight: 10,
    paddingTop: 20,
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
  codeInputSty: {
    borderWidth: 1.5, 
    borderRadius: 8, 
    color: '#000A34', 
    fontWeight: '500',
    fontSize: 16,
  },
  constainerCodeInput: { 
    // paddingRight: 16
  },
  skipTextView: {
    fontSize: 14,
    lineHeight: 16.94,
    fontWeight: 'bold',
    color: '#012275'
  },
  skipView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20
  },
  viewSkipText: {
    borderBottomColor: '#012275',
    borderBottomWidth: 2,
  },
  confirmationMsgView: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 26.6,
    textAlign: 'left'
  },
  btnView: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnViewWid: {
    width: '46%'
  },
  btnViewWidofYes: {
    width: '46%',
    marginLeft: 15
  },
  viewOfBtn: {
    height: 44,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius:8,
  },
  filledBtn: {
    backgroundColor: '#012275',
  },
  blankBtn: {
    borderWidth: 2,
    borderColor: "#012275",
  },
  filledBtnText: {
    color: '#fff',
  },
  blankBtnText: {
    color: '#012275',
  },
  loginBtnText: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24
  },
  confirmMsgView: {
    color: '#012275',
    lineHeight: 22.4,
    fontSize: 14,
    fontWeight: 'bold'
  }

});
// Customizable Area End
