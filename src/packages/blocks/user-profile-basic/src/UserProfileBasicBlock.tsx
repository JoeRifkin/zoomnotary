import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";

import CountryCodeSelector from "../../country-code-selector/src/CountryCodeSelector";
import { GenericHeader } from "../../../components/src/GenericHeader";
import { GenericButton } from "../../../components/src/GenericButton";
import { imgBackArrow, imgEdit, imgSucessIcon, upArrowImg, downArrowBlackImg } from "./assets";
import { GenericDropDownInput } from "../../../components/src/GenericDropDownInput";
import { GenericCustomModel } from "../../../components/src/GenericCustomModel";
import { GenericDocSelectionModel } from "../../../components/src/GenericDocSelectionModel";
const countryCodeList = [{ value: "+44", label: "+44" }]
import { Dropdown } from 'react-native-element-dropdown';
export const configJSON = require("./config");
// Customizable Area End

import UserProfileBasicController, {
  Props
} from "./UserProfileBasicController";

export default class UserProfileBasicBlock extends UserProfileBasicController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderTouchableOption(text: string) {
    return (
      <View>
        {text !== 'Cancel' ?
          <TouchableOpacity onPress={() => this.openCamera(text)} style={styles.thouChableViewBtn}>
            <Text style={styles.otherBtnTxt}>{text}</Text>
          </TouchableOpacity> :
          <View>
            <View style={styles.borderCancelLine} />
            <TouchableOpacity onPress={() => this.closeModelOfDocument()} style={[styles.cancelBtnModel]}>
              <Text style={styles.cancelBtnTxt}>Cancel</Text>
            </TouchableOpacity>
          </View>}
      </View>
    );
  }

  renderFirstFourEditField = () => {
    return (
      <View>
        <Text style={styles.title}>{configJSON.fullname}</Text>
        <TextInput
          testID={"txtInputFirstName"} //Merge Engine::From BDS
          style={[styles.bgInput, (this.isErrorMesVisible(this.state.firstName)) ? styles.errorInput : styles.normalInput]} //UI Engine::From Sketch
          placeholder={this.labelFirstName} //UI Engine::From Sketch
          value={this.state.firstName}
          maxLength={30}
          {...this.txtInputFirstNameProps}
        />
        {(this.isErrorMesVisible(this.state.firstName)) && <Text testID="errorNameText" style={styles.errorTextView}>{configJSON.nameErrorMsg}</Text>}
        <Text style={styles.title}>{configJSON.emailID}</Text>
        <TextInput
          testID={"txtInputEmail"} //Merge Engine::From BDS
          style={[styles.bgInput, (this.isErrorMesVisible(this.state.email)) ? styles.errorInput : styles.normalInput]} //UI Engine::From Sketch
          placeholder={configJSON.emailID} //UI Engine::From Sketch
          value={this.state.email}
          {...this.txtInputEmailProps} //Merge Engine::From BDS - {...this.testIDProps}
        />
        {(this.isErrorMesVisible(this.state.email)) && <Text testID="errorEmailText" style={styles.errorTextView}>{configJSON.emailErrorMsg}</Text>}
        {this.isBusinessFieldVisible() && <View>
          <Text style={styles.title}>{configJSON.companyLabel}</Text>
          <TextInput
            testID={"txtInputLastName"} //Merge Engine::From BDS
            style={[styles.bgInput, (this.isErrorMesVisible(this.state.lastName)) ? styles.errorInput : styles.normalInput]} //UI Engine::From Sketch
            placeholder={configJSON.companyLabelPlaceholder} //UI Engine::From Sketch
            value={this.state.lastName}
            maxLength={30}
            {...this.txtInputLastNameProps} //Merge Engine::From BDS - {...this.testIDProps}
          />
          {(this.checkForBusinessName() && this.state.isValidateField) && <Text testID="errorEmailText" style={styles.errorTextView}>{configJSON.businessErroMsg}</Text>}
        </View>}

        <Text style={styles.title}>{configJSON.mobile}</Text>
        <View style={styles.mobileFieldView}>
          <View style={styles.countryCodeView}>
            <GenericDropDownInput
              labelStyle={[styles.bgInput]}
              placeholder={configJSON.contryCodePlace}
              value={this.state.selectedCountryCode}
              txtInputNamePrpos={this.txtInputCountryCodePrpos}
              testID="txtInputCountryCode"
              dropdownOptions={countryCodeList}
              // isValidateField={this.state.isValidateField}
            />
          </View>
          <TextInput
            testID={"txtInputPhoneNumber"} //Merge Engine::From BDS
            style={[styles.bgInput, styles.numberView, (this.isErrorMesVisible(this.state.phoneNumber)) ? styles.errorInput : styles.normalInput]} //UI Engine::From Sketch
            placeholder={this.labelMobile} //UI Engine::From Sketch
            value={this.state.phoneNumber}
            maxLength={12}
            keyboardType={"phone-pad"}
            textContentType="telephoneNumber"
            {...this.txtInputPhoneNumProps} //Merge Engine::From BDS - {...this.testIDProps}
          />
        </View>
        {(this.isErrorMesVisible(this.state.phoneNumber)) && <Text testID="errorPhoneNumberText" style={styles.errorTextView}>{configJSON.mobileErrorMsg}</Text>}
        {this.checkValidMobileNumber() && <Text testID="errorPhoneNumberText" style={styles.errorTextView}>{configJSON.phoneErrorMsg}</Text>}

      </View>
    )
  }

  renderRightIcon = (isDropdownOpen: boolean) => (
    <View>
      <Image style={styles.arrowUpDownView} source={isDropdownOpen ? upArrowImg : downArrowBlackImg} />
    </View>
  );

  renderLastFiveEditField = () => {
    return (
      <View>
        <Text style={styles.title}>{configJSON.addressOne}</Text>
        <TextInput
          testID={"txtInputAddressFirst"} //Merge Engine::From BDS
          style={[styles.bgInput, (this.isErrorMesVisible(this.state.addressFirst)) ? styles.errorInput : styles.normalInput]} //UI Engine::From Sketch
          placeholder={configJSON.addressOne} //UI Engine::From Sketch
          maxLength={50}
          {...this.txtInputAddressFirstProps} //Merge Engine::From BDS - {...this.testIDProps}
        />
        {(this.isErrorMesVisible(this.state.addressFirst)) && <Text testID="errorAddressFirstText" style={styles.errorTextView}>{configJSON.addressErrorMsg}</Text>}

        <Text style={styles.title}>{configJSON.addressSec}</Text>
        <TextInput
          testID={"txtInputAddressSec"} //Merge Engine::From BDS
          style={[styles.bgInput, styles.normalInput]} //UI Engine::From Sketch
          placeholder={configJSON.addressSec} //UI Engine::From Sketch
          maxLength={50}
          {...this.txtInputAddressSecProps} //Merge Engine::From BDS - {...this.testIDProps}
        />
        <View style={styles.mobileFieldView}>
          <View style={styles.cityView}>
            <Text style={styles.title}>{configJSON.city}</Text>
            <TextInput
              testID={"txtInputCity"} //Merge Engine::From BDS
              style={[styles.bgInput, (this.isErrorMesVisible(this.state.city)) ? styles.errorInput : styles.normalInput]} //UI Engine::From Sketch
              placeholder={configJSON.city} //UI Engine::From Sketch
              maxLength={30}
              {...this.txtInputCityProps} //Merge Engine::From BDS - {...this.testIDProps}
            />
            {(this.isErrorMesVisible(this.state.city)) && <Text testID="errorCityText" style={styles.errorTextView}>{configJSON.cityErrorMsg}</Text>}
          </View>
          <View style={[styles.countryView, (this.isErrorMesVisible(this.state.selectedCountry)) ? styles.errorShow : styles.errorHidden]}>
            <Text style={styles.title}>{configJSON.country}</Text>

            {this.state.countryList &&
            <View>
              <Dropdown
                maxHeight={300}
                style={[
                  styles.bgMobileInputDropDown,
                  (this.state.isValidateField && this.state.selectedCountry === "") ? styles.errorOfField : styles.textFieldBg
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                labelField="label"
                valueField="value"
                value={(this.state.selectedCountry && this.state.selectedCountry.value) ? this.state.selectedCountry.value : ''}
                placeholder={configJSON.countryPlaceholder}
                data={this.state.countryList}
                testID="serviceListId"
                onChange={(item: any) => this.txtInputCountryPrpos(item)}
                onFocus={this.openCountryDropdown}
                onBlur={this.closeCountryDropdown}
                renderRightIcon={() => this.renderRightIcon(this.state.isCountryDropdownOpen)}
              />
              {(this.state.isValidateField && this.state.selectedCountry === "") && <Text testID="errorCityText" style={styles.errorTextView}>{configJSON.countryErrorMsg}</Text>}
            </View>}
          </View>
        </View>

        <Text style={styles.title}>{configJSON.postCode}</Text>
        <TextInput
          testID={"txtInputPost"} //Merge Engine::From BDS
          style={[styles.bgInput, (this.isErrorMesVisible(this.state.postCode)) ? styles.errorInput : styles.normalInput]} //UI Engine::From Sketch
          placeholder={configJSON.postCode} //UI Engine::From Sketch
          maxLength={8}
          {...this.txtInputPostProps} //Merge Engine::From BDS - {...this.testIDProps}
        />
        {(this.isErrorMesVisible(this.state.postCode)) && <Text testID="errorPostcodeText" style={styles.errorTextView}>{configJSON.postCodeErrorMsg}</Text>}

        <View style={{ marginTop: 24, marginBottom: 32 }}>
          {/* <Button
                  testID={"btnSubmit"} //Merge Engine::From BDS
                  title={configJSON.btnEditProfile} //UI Engine::From Sketch
                  color="#012275"
                  borderRadius={8}
                  disabled={this.state.saveButtonDisable}
                  onPress={() => this.validateMobileAndThenUpdateUserProfile()}
                /> */}
          <GenericButton
            testID={"btnSubmitUserChanges"}
            btnProps={this.confirmationForSaveChanges}
            btnDisable={this.getSaveChangesButtonEnabled()}
            btnTextLabel={configJSON.btnTextSaveChanges}
            filledBtn={true}
          />
        </View>
      </View>
    )
  }

  renderEditUserProfileView = () => {
    return (
      <View style={styles.fieldView}>
        {this.renderFirstFourEditField()}
        {this.renderLastFiveEditField()}

      </View>
    )
  }

  renderUserProfileView = () => {
    return (
      <View style={styles.fieldView}>
        <View style={styles.detailContainer}>
          <View style={styles.fullNameView}>
            <Text style={styles.fullNameTxt}>
              {configJSON.fullname}
            </Text>
            <Text style={styles.fullNameValue}>
              {this.state.firstName}
            </Text>
            <View style={styles.borderLine} />
          </View>

          <View style={styles.fullNameView}>
            <Text style={styles.fullNameTxt}>
              {configJSON.emailID}
            </Text>
            <Text style={styles.fullNameValue}>
              {this.state.email}
            </Text>
            <View style={styles.borderLine} />
          </View>

          {this.isBusinessFieldVisible() ? <View style={styles.fullNameView}>
            <Text style={styles.fullNameTxt}>
              {configJSON.companyLabelPlaceholder}
            </Text>
            <Text style={styles.fullNameValue}>
              {this.state.lastName}
            </Text>
            <View style={styles.borderLine} />
          </View> : null}

          <View style={styles.fullNameView}>
            <Text style={styles.fullNameTxt}>
              {configJSON.mobile}
            </Text>
            <Text style={styles.fullNameValue}>
              {this.state.selectedCountryCode}&nbsp;&nbsp;{this.state.phoneNumber}
            </Text>
            <View style={styles.borderLine} />
          </View>

          <View style={styles.fullNameView}>
            <Text style={styles.fullNameTxt}>
              {configJSON.addressOne}
            </Text>
            <Text style={styles.fullNameValue}>
              {this.state.addressFirst}
            </Text>
            <View style={styles.borderLine} />
          </View>

          <View style={styles.fullNameView}>
            <Text style={styles.fullNameTxt}>
              {configJSON.addressSec}
            </Text>
            <Text style={styles.fullNameValue}>
              {this.state.addressSec}
            </Text>
            <View style={styles.borderLine} />
          </View>
          <View style={styles.addCountryCity}>
            <View style={styles.cityANdCountryView}>
              <Text style={styles.fullNameTxt}>
                {configJSON.city}
              </Text>
              <Text style={styles.fullNameValue}>
                {this.state.city}
              </Text>
              <View style={styles.borderLine} />
            </View>

            <View style={[styles.cityANdCountryView, styles.marLeft]}>
              <Text style={styles.fullNameTxt}>
                {configJSON.country}
              </Text>
              <Text style={styles.fullNameValue}>
                {this.state.selectedCountry.label}
              </Text>
              <View style={styles.borderLine} />
            </View>
          </View>

          <View style={styles.fullNameView}>
            <Text style={styles.fullNameTxt}>
              {configJSON.postCode}
            </Text>
            <Text style={styles.fullNameValue}>
              {this.state.postCode}
            </Text>
          </View>

        </View>
        <GenericButton
          testID={"btnSubmitToGoEditPage"}
          btnProps={{ ...this.gotToEditUserProfile }}
          btnDisable={true}
          btnTextLabel={configJSON.btnEditProfile}
          filledBtn={true}
        />

        <GenericDocSelectionModel
          visible={this.state.isSucessMsgModel}
          onClose={() => this.closeSucessMsgModel()}
          height={42}
          hasBackdrop={false}
          coverScreen={false}
          width={'auto'}
          buttonModelView={styles.sucessModel}
          isModelView={false}>
          <View style={[styles.sucessChangesView]}>
            <Image style={styles.sucessImg} source={imgSucessIcon} />
            <Text style={styles.changesSavedTxt}>{configJSON.sucessMsg}</Text>
          </View>
        </GenericDocSelectionModel>
      </View>
    )
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      //Required for all blocks
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {/* Required for all blocks */}
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            {/* Customizable Area Start */}
            {/* Merge Engine UI Engine Code */}
            <View>
              <GenericHeader
                labelTitle={this.state.isEditModeActive ? configJSON.editProfile : configJSON.myProfile}
                imgBackArrow={imgBackArrow}
                btnGoBack={{ ...this.btnGoBack }}
                testID={"btnbackArrow"}
                isOtherMsg={true}
              />
              <View style={styles.userProfileWrapper}>
                {this.state.imageSource ?
                  <View style={styles.profieView}>
                    <Image source={{ uri: this.getUserProfleImage()}} style={styles.userProfileView} />
                   </View>
                  : 
                  <View style={styles.userProfile}>
                    <Text style={[styles.userFirstCharView]}>{this.state.firstName.charAt(0).toUpperCase()}</Text>
                  </View>}
                {this.state.isEditModeActive && <TouchableOpacity testID="idImageClick" onPress={this.openToSelectImage} style={styles.editImageView}>
                  <Image source={imgEdit} style={styles.borderImage} />
                </TouchableOpacity>}
              </View>
              {this.state.isEditModeActive && <TouchableOpacity onPress={this.openToSelectImage} style={styles.editTxtView}>
                <Text style={styles.editText}>{configJSON.editImage}</Text>
              </TouchableOpacity>}
              {this.state.isEditModeActive ?
                this.renderEditUserProfileView() :
                this.renderUserProfileView()
              }

              <GenericCustomModel
                visible={this.state.isOpenModel}
                onClose={() => this.setState({ isOpenModel: false })}
                height={142}
                width={337}>
                <Text style={styles.confirmationMsgView}>{configJSON.confirmationMsg}</Text>
                <View style={styles.btnView}>
                  <View style={styles.btnViewWid}>
                    <TouchableOpacity
                      testID={"btnNoToProceed"}
                      style={[styles.blankBtn]}
                      {...this.noToChanges}>
                      <Text style={[styles.loginBtnText, styles.blankBtnText]}>{configJSON.cancel}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.btnViewWidofYes}>
                    <TouchableOpacity
                      testID={"btnYesProceed"}
                      style={[styles.viewOfBtn, styles.filledBtn]}
                      {...this.yesProceedToChanges}>
                      <Text style={[styles.loginBtnText, styles.filledBtnText]}>{configJSON.yesProceed}</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </GenericCustomModel>


              <GenericDocSelectionModel
                visible={this.state.isDocSelectionModelOpen}
                onClose={() => this.setState({ isDocSelectionModelOpen: false })}
                height={'auto'}
                hasBackdrop={false}
                coverScreen={false}
                width={Dimensions.get('window').width - 12}
                buttonModelView={styles.otherButtonModelView}
                isModelView={true}>
                <View style={[styles.otherBtnModel]}>
                  <Text style={styles.titleModelView}>Document(s) to be notarised upload via</Text>
                </View>
                <View style={styles.borderModelLine} />
                <View >
                  {this.renderTouchableOption("Camera")}
                  {this.renderTouchableOption("Photos")}
                  {this.renderTouchableOption("Cancel")}
                </View>
              </GenericDocSelectionModel>

            </View>
            {/* Customizable Area End */}
            {/* Merge Engine UI Engine Code */}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    this.getValidations();
    this.requestSessionData();
    // Customizable Area End
  }
  
  // Customizable Area Start
  // Customizable Area End
  
}
// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 14,
    textAlign: "left",
    marginTop: 16
  },
  titleOtpInfo: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8
  },
  bgInput: {
    flexDirection: "row",
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16.94,
    textAlign: "left",
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 8,
    includeFontPadding: true,
    padding: 10,
    height: 44,
    color: '#000'
  },
  errorInput: {
    backgroundColor: '#fff',
    borderColor: '#DC2626',
  },
  normalInput: {
    backgroundColor: "#F1F5F9",
    borderColor: "#F1F5F9",
  },
  bgDummyPassword: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    marginTop: 0,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10,
    opacity: 0.4,
    fontWeight: "bold",
    paddingStart: 10
  },
  bgRectBorder: {
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    marginBottom: 0,
    padding: 12,
    marginTop: 0
  },
  bgPasswordInput: {
    flex: 1,
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    minHeight: 40,
    includeFontPadding: true
  },
  passwordShowHide: {
    alignSelf: "center"
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginTop: 0,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 5,
    paddingStart: 10
  },
  bgMobileInput: {
    flexDirection: "row",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#00000000",
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    includeFontPadding: true,
    padding: 10,
    marginTop: 0,
    paddingStart: 10
  },
  bgMobileInputDropDown: {
    fontSize: 14,
    textAlign: "left",
    marginTop: 5,
    includeFontPadding: true,
    padding: 10,
    paddingStart: 10,
    height: 44,
    fontWeight: '500',
    lineHeight: 16.94,
    fontStyle: 'normal',
    borderRadius: 8,
  },
  placeholderStyle: {
    color: '#64748B'
  },
  selectedTextStyle: {
    color: '#000'
  },
  imgPasswordShowhide: {},
  helperText: { marginTop: 10 },

  userProfileWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    position: 'relative',
  },
  profieView: { },

  userProfile: {
    height: 92,
    width: 92,
    borderRadius: 100,
    backgroundColor: '#012275'
  },
  userProfileView: {
    height: 92,
    width: 92,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#012275',
  },
  fieldView: {
    padding: 16
  },
  detailContainer: {
    marginTop: 20,
  },
  fullNameView: {
    width: '100%'
  },
  fullNameTxt: {
    fontWeight: '500',
    fontSize: 12,
    color: '#64748B',
    lineHeight: 14.52
  },
  fullNameValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#334155',
    lineHeight: 19.36,
    marginTop: 5,
    marginBottom: 5
  },
  borderLine: {
    borderBottomColor: '#E2E8F0',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 15
  },
  addCountryCity: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  marLeft: {
    marginLeft: 20
  },
  cityANdCountryView: {
    width: '47%'
  },
  borderImage: {
    height: 14,
    width: 14,
  },
  editImageView: {
    bottom: 22,
    left: 35, 
    backgroundColor: '#fff',
    borderRadius: 34,
    padding: 4,
    height: 24,
    width: 24,
  },
  editText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: '#012275'
  },
  editTxtView: {
    justifyContent: "center",
    alignItems: "center",
  },
  mobileFieldView: {
    flexDirection: 'row',
    width: '100%',
  },
  countryCodeView: {
    width: '30%',
  },
  numberView: {
    width: '66%',
    marginLeft: 15
  },
  countryView: {
    width: '47%',
    marginLeft: 15
  },
  cityView: {
    width: '47%',
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
  sucessChangesView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
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
    borderRadius: 8,
  },
  filledBtn: {
    backgroundColor: '#012275',
  },
  blankBtn: {
    borderWidth: 2,
    borderColor: "#012275",
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 8,
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
  otherButtonModelView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(44, 44, 46, 0.4)',
    paddingBottom: 30,
  },
  sucessModel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(44, 44, 46, 0.4)',
    paddingBottom: 60,
  },
  cancelBtnModel: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    height: 55,
    borderRadius: 13,
    paddingTop: 20
  },
  otherBtnModel: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  cancelBtnTxt: {
    color: '#DC2626',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  titleModelView: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17
  },
  borderModelLine: {
    borderBottomColor: '#E2E8F0',
    borderBottomWidth: 1,
    marginTop: 20,
    marginBottom: 10
  },
  borderCancelLine: {
    borderBottomColor: 'rgba(44, 44, 46, 0.4)',
    borderBottomWidth: 4,
  },
  otherBtnTxt: {
    color: '#012275',
    lineHeight: 20,
    fontSize: 16,
    fontWeight: '500'
  },
  thouChableViewBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: Dimensions.get('window').width - 15,
  },
  errorTextView: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18,
    marginBottom: 10
  },
  changesSavedTxt: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24
  },
  sucessImg: {
    height: 21,
    width: 21,
    marginRight: 8
  },
  userFirstCharView: {
    fontSize: 40,
    lineHeight: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingTop: 45
  },
  errorHidden: {
    
  },
  errorShow: {
    
  },
  textFieldBg: {
    backgroundColor: '#F1F5F9',
  },
  errorOfField: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DC2626',
    backgroundColor: '#fff'
  },
  iconStyle: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  arrowUpDownView: {
    marginRight: 10,
    height:24,
    width:24,
    resizeMode:'contain'
  },
});
// Customizable Area End
