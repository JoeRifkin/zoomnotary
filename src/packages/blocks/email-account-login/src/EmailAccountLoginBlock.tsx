import React from "react";
// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  PixelRatio,
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  Button,
  TouchableOpacity,
  Switch,
  Platform,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import CheckBox from '@react-native-community/checkbox';
import {Picker} from "@react-native-picker/picker";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from "react-native-simple-radio-button";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";

//@ts-ignore
import CustomCheckBox from "../../../components/src/CustomCheckBox";
import Icon from 'react-native-vector-icons/FontAwesome';
import {imgBackArrow} from "./assets";
import {GenericTextInput} from "../../../components/src/GenericTextInput";
import {GenericPasswordInput} from "../../../components/src/GenericPasswordInput";
import {GenericHeader} from "../../../components/src/GenericHeader";
import {GenericWelcomeView} from "../../../components/src/GenericWelcomeView";
import {GenericButton} from "../../../components/src/GenericButton";
import {GenericTextWithHperLink} from "../../../components/src/GenericTextWithHperLink";
export const configJSON = require("./config");

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import EmailAccountLoginController, {
  Props,
} from "./EmailAccountLoginController";

export default class EmailAccountLoginBlock extends EmailAccountLoginController {
  // Customizable Area Start
  // Customizable Area End

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

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      // Required for all blocks
     // <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          testID={"Background"}
          onPress={() => {
            this.hideKeyboard();
          }}
        >
           <View style={{flex:1}}>
            {this.isPlatformWeb() ? (
              <Text style={styles.labelTitle}>{this.labelTitle}</Text>
            ) : null}

            
            <GenericHeader 
              labelTitle={this.labelTitle}
              imgBackArrow={imgBackArrow}
              btnGoBack={{...this.btnGoBack}}
              testID={"btnbackArrow"}
            />

            <GenericWelcomeView 
              title={configJSON.welcomeMsg}
              description={configJSON.suggestionMsg}
            />
            
            <View style={styles.fieldsView}>
                <View style={{flex:1}}>
                <GenericTextInput 
                  labelName={configJSON.titleEmail}
                  isAstrick={true}
                  isValidateField={this.state.isEmailPassValid}
                  placeholder={this.state.placeHolderEmail}
                  value={this.state.email}
                  nameError={configJSON.emailValid}
                  txtInputNamePrpos= {{...this.txtInputEmailProps}}
                  testID={"txtInputEmail"}
                  secError={!this.isStringNullOrBlank(this.state.email) && (!this.validateEmail(this.state.email))}
                  secErrorMsg={configJSON.loginFailMsg}
                />

                <GenericPasswordInput 
                  labelName={configJSON.titlePassword}
                  isAstrick={true}
                  isValidateField={this.state.isEmailPassValid}
                  placeholder={this.state.placeHolderPassword}
                  value={this.state.password}
                  nameError={configJSON.passValid}
                  txtInputNamePrpos= {{...this.txtInputPasswordProps}}
                  btnPasswordShowHideProps={{...this.btnPasswordShowHideProps}}
                  testID={"txtInputPassword"}
                  idOfShowHideBtn={"btnPasswordShowHide"}
                  imgEnablePasswordFieldProps={{...this.btnPasswordShowHideImageProps}}
                  imgTestID={"btnPasswordShowHideImage"}
                  secError={!this.isStringNullOrBlank(this.state.password) && !this.validatePassword(this.state.password)}
                  secErrorMsg={configJSON.loginFailMsgForPass}
                />

            <View style={styles.forgetAndRemb}>
            <View style={styles.checkBoxContainerView}>
              {/* Refactor for custom CheckBox   */}

              <TouchableOpacity {...this.btnRememberMeProps} style={styles.checkboxContainer} testID={"CustomCheckBox"}>
                <View style={[styles.checkbox, this.CustomCheckBoxProps.isChecked && styles.checked]}>
                  {this.CustomCheckBoxProps.isChecked && <Icon name="check" size={16} color="#fff" />} 
                </View>
              </TouchableOpacity>

              <Text
                testID={"btnRememberMe"} //Merge Engine::From BDS
                style={styles.rememberMe} //UI Engine::From Sketch
                {...this.btnRememberMeProps} //Merge Engine::From BDS - {...this.testIDProps}
              >
                {this.state.labelRememberMe} {/*UI Engine::From Sketch*/}
              </Text>
            </View>
            <View style={styles.forgetView}>
              <View style={styles.boderBottomView}>
                <Text
                  testID={"btnForgotPassword"} //Merge Engine::From BDS
                  style={styles.forgotPassword} //UI Engine::From Sketch
                  onPress={() => {
                    this.btnForgotPasswordProps();
                  }}
                >
                  {configJSON.forgetPass}
                </Text>
              </View>
            {/* <View style={[styles.line, styles.lineOfForget]}></View> */}
            </View>
            </View>
            {this.state.isLoginFail && 
                <Text style={styles.errorTextView}>{this.state.loginFailedMsg}</Text>}
                </View>
            <View style={styles.mrBott}>
              <GenericButton 
                testID={"btnEmailLogIn"}
                btnProps={{...this.btnEmailLogInProps}}
                btnDisable={this.getButtonEnable()}
                btnTextLabel={this.state.btnTxtLogin}
                filledBtn={true}
              />
            </View>

            <GenericButton 
              testID={"btnContinueAsGuest"}
              filledBtn={false}
              btnProps={{...this.continueAsGuestBtnProps}}
              btnTextLabel={this.state.continueAsGuest}
            />

            <GenericTextWithHperLink 
              normalText={configJSON.dnthaveAccount}
              hyperText={configJSON.signUp}
              redirectProps={{...this.btnSignUpRedirect}}
              testid={"btnSignUp"}
            />
          </View>
          {this.state.isLoader && <View style={styles.loaderStyles}>
            <ActivityIndicator size="large" color="#012275" />
          </View>}
          </View>
        </TouchableWithoutFeedback>
     // </ScrollView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  fieldsView: {
    padding: 16,
    flex:1,
    justifyContent: 'flex-start',
  },

  mrBott: {
    marginTop: 0,
    justifyContent: 'flex-end'
  },

  labelTitle: {
    marginTop: 24,
    marginBottom: 32,
    fontSize: 32,
    textAlign: "left",
    marginVertical: 8,
    color: "#6200EE",
  },

  forgotPassword: {
    color: "#012275",
    fontWeight: "bold",
    fontSize: 14,
    fontStyle: 'normal',
    textDecorationColor: '#012275',
    zIndex: 1,
  },
  checkBoxContainerView: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: -7,
    zIndex: -1,
    color: '#011342'
  },
  rememberMe: {
    color: "#011342",
    fontWeight: "400",
    alignSelf: "center",
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'normal'
  },
  forgetAndRemb:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',

  },
  
  errorTextView: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18
  },
  lineOfForget: {
    width: "52%"
  },
  line: {
    height: 1.5,
    backgroundColor: '#012275', // Adjust the color of the line as needed
  },
  
  forgetView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  boderBottomView: {
    borderBottomWidth: 2,
    borderBottomColor: '#012275'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#012275',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginLeft: 8
  },
  checked: {
    backgroundColor: '#012275', 
    borderColor: '#012275', 
  },
  loaderStyles: {
    justifyContent: 'center',
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(44, 44, 46, 0.6)',
    zIndex: 9999,
    opacity: 1
  },
});
// Customizable Area End
