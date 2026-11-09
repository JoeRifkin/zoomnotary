import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";

import KycVerificationAccountController, {
  Props,
  configJSON,
} from "./KycVerificationAccountController";
import {
  imgBackArrow,
  rightArrowBlueImg, 
  rightArrow,
  upArrowImg,
  downArrowBlackImg,
  imgCheckbox,
  removeImg
} from "./assets";
import { GenericHeader } from "../../../components/src/GenericHeader";
import { Dropdown } from 'react-native-element-dropdown';
import { GenericButton } from "../../../components/src/GenericButton";
import DatePicker from 'react-native-date-picker';
import { GenericCustomModel } from "../../../components/src/GenericCustomModel";
import { WebView } from 'react-native-webview';
import { GenericSucessView } from "../../../components/src/GenericSucessView";

const IDTypeList = [
  { value: "social_insurance", label: "UK National Insurance" },
  { value: "tax_id", label: "Tax Id" },
  { value: "identity_card", label: "Identity Card" },
  { value: "driving_licence", label: "Driving Licence" },
  { value: "voter_id", label: "Voter Id" },
  { value: "passport", label: "Passport" },
  { value: "work_permit", label: "Work Permit" },
  { value: "other", label: "Other" }
]
const todayString = new Date();

type CustomPermissionEventType = {
  origin: string;
  resources: string[];
  grant: () => void;
  deny: () => void;
};
// Customizable Area End

export default class KycVerificationAccount extends KycVerificationAccountController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderHeaderSection = () => {
    return (
      <GenericHeader
        labelTitle={'KYC Verification'}
        imgBackArrow={imgBackArrow}
        btnGoBack={{ ...this.btnGoBackProps }}
        testID={"btnbackArrow"}
        isOtherMsg={true}
      />
    );
  };

  renderStepsView = (stepNumber: number, text: string) => {
    return (
      <TouchableOpacity key={stepNumber} testID={`txtStep${stepNumber}ID`} onPress={() => this.goToSteps(stepNumber)} style={styles.stepImgText}>
        <Text style={[styles.stepTextView, this.state.stepsNo === stepNumber ? styles.selectedSteps : styles.unSelectedSteps]}>
          {text}
        </Text>
        {stepNumber !== 3 && <Image style={styles.rightArrowImgView} source={this.state.stepsNo === stepNumber ? rightArrowBlueImg : rightArrow} />}
      </TouchableOpacity>
    )
  }

  renderRightIcon = (isDropdownOpen: boolean) => (
    <View>
      <Image style={isDropdownOpen ? styles.arrowUpDownView : styles.downArrowView} source={isDropdownOpen ? upArrowImg : downArrowBlackImg} />
    </View>
  );

  renderTimeSelectionModel = () => {
    return (
      <View>
        <GenericCustomModel
          visible={this.state.isDateOfBirthModelOpen}
          {...this.onClosePropsModel}
          height={'auto'}
          width={337}>
          <View style={styles.dateView}>
            <DatePicker
              theme='auto'
              mode="date"
              date={this.state.selectedDate}
              onDateChange={this.onSelectDateOfBirth}
              maximumDate={todayString}
            />
          </View>
          <View style={styles.btnView}>
            <View style={styles.btnViewWid}>
              <TouchableOpacity
                testID={"btnNoToProceed"}
                style={[styles.blankBtn]}
                {...this.noToChanges}>
                <Text style={[styles.loginBtnText, styles.blankBtnText]}>{'Cancel'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnViewWidofYes}>
              <TouchableOpacity
                testID={"btnYesProceed"}
                style={[styles.viewOfBtn, styles.filledBtn]}
                {...this.yesProceedToChanges}>
                <Text style={[styles.loginBtnText, styles.filledBtnText]}>{'Ok'}</Text>
              </TouchableOpacity>
            </View>

          </View>
        </GenericCustomModel>
      </View>
    )
  }

  renderFirstName = () => {
    return (
      <View>
        <Text style={styles.labelTitle}>{'First name'}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <TextInput
          testID={'txtInputFirstName'}
          style={[styles.bgMobileInput, ((this.state.isValidateField && (this.isStringNullOrBlank(this.state.firstName)))) ? styles.errorOfField : styles.textFieldBg]}
          placeholder={'First name'}
          value={this.state.firstName}
          {...this.txtInputFirstNamePrpos}
          maxLength={30}
        />
        {(this.state.isValidateField && this.isStringNullOrBlank(this.state.firstName)) && <Text style={styles.errorTextView}>{configJSON.firstNameError}</Text>}

      </View>
    )
  }

  renderMiddleName = () => {
    return (
      <View>
        <Text style={styles.labelTitle}>{'Middle name'}</Text>
        <TextInput
          testID={'txtInputMiddleName'}
          style={[styles.bgMobileInput, styles.textFieldBg]}
          placeholder={'Middle name'}
          value={this.state.middleName}
          {...this.txtInputMiddleNamePrpos}
          maxLength={30}
        />
      </View>
    )
  }

  renderLastName = () => {
    return (
      <View>
        <Text style={styles.labelTitle}>{'Last name'}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <TextInput
          testID={'txtInputLastName'}
          style={[styles.bgMobileInput, ((this.state.isValidateField && (this.isStringNullOrBlank(this.state.lastName)))) ? styles.errorOfField : styles.textFieldBg]}
          placeholder={'Last name'}
          value={this.state.lastName}
          {...this.txtInputLastNamePrpos}
          maxLength={30}
        />
        {(this.state.isValidateField && this.isStringNullOrBlank(this.state.lastName)) && <Text style={styles.errorTextView}>{configJSON.lastNameError}</Text>}

      </View>
    )
  }

  renderMobileNumber = () => {
    return (
      <View>
        <Text style={styles.labelTitle}>{'Mobile Number (Optional)'}</Text>
        <View style={styles.mobileFieldView}>
          <View style={styles.countryCodeView}>
            <Dropdown
              maxHeight={300}
              style={[
                styles.bgMobileInputDropdown,
                styles.textFieldBg
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              labelField="label"
              valueField="value"
              value={this.state.selectedCountryCode}
              placeholder={'+44'}
              data={this.state.countryCodeList}
              testID="serviceListId"
              onChange={(item: any) => this.txtInputCountryCodePrpos(item.value)}
              onFocus={this.openDropdownOfBirth}
              onBlur={this.closeDropDownOfBirth}
              renderRightIcon={() => this.renderRightIcon(this.state.isBirthDropDownOpen)}
            />
          </View>
          <TextInput
            testID={"txtInputPhoneNumber"}
            style={[styles.bgMobileInput, styles.numberView, styles.textFieldBg]}
            placeholder={'Mobile number'}
            value={this.state.mobileNumber}
            maxLength={12}
            keyboardType={"phone-pad"}
            textContentType="telephoneNumber"
            {...this.txtInputPhoneNumProps}
          />
        </View>
      </View>
    )
  }

  renderEmailView = () => {
    return (
      <View>
        <Text style={styles.labelTitle}>{'Email Address'}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <TextInput
          testID={'txtInputEmailAddress'}
          style={[styles.bgMobileInput, ((this.state.isValidateField && (this.isStringNullOrBlank(this.state.email)))) ? styles.errorOfField : styles.textFieldBg]}
          placeholder={'Email Address'}
          value={this.state.email}
          {...this.txtInputEmailMobilePrpos}
        />
        {(this.state.isValidateField && this.isStringNullOrBlank(this.state.email)) && <Text style={styles.errorTextView}>{configJSON.emailError}</Text>}
        {(this.state.isValidateField && !this.isStringNullOrBlank(this.state.email) && !this.validateEmail(this.state.email)) && <Text style={styles.errorTextView}>{configJSON.validEmailError}</Text>}
      </View>
    )
  }

  renderDateOfBirth = () => {
    return (
      <View>
        <Text style={styles.labelTitle}>{'Date of birth'}</Text>
        <TextInput
          testID={'txtInputDateofbirthAddress'}
          style={[styles.bgMobileInput, styles.textFieldBg]}
          placeholder={'Date of birth'}
          value={this.state.dateOfBirth}
          {...this.getOnFocusProps}
        />
      </View>
    )
  }

  renderIdType = () => {
    return (
      <View>
        <Text style={styles.labelTitle}>{'ID Type'}</Text>
        <View>
          <Dropdown
            maxHeight={200}
            style={[
              styles.bgMobileInputDropdown,
              styles.textFieldBg,
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            labelField="label"
            valueField="value"
            value={this.state.selectedIdType}
            placeholder={'ID type'}
            data={IDTypeList}
            onChange={(item: any) => this.selectIDTypeOption(item.value)}
            onFocus={this.openDropdownOfIdType}
            onBlur={this.closeDropDownOfIdType}
            renderRightIcon={() => this.renderRightIcon(this.state.isIdTypeDropDownOpen)}
          />
        </View>
      </View>
    )
  }

  renderStateCode = () => {
    return (
      <View>
        <Text style={styles.labelTitle}>{'State Code'}</Text>
        <TextInput
          testID={'txtInputStateCodeAddress'}
          style={[styles.bgMobileInput, styles.textFieldBg]}
          placeholder={'State Code'}
          value={this.state.stateCode}
          {...this.txtInputStateCodePrpos}
        />
      </View>
    )
  }

  renderIdNumber = () => {
    return (
      <View>
        <Text style={styles.labelTitle}>{'ID Number'}</Text>
        <TextInput
          testID={'txtInputIDNumberAddress'}
          style={[styles.bgMobileInput, styles.textFieldBg]}
          placeholder={'ID Number'}
          value={this.state.idNumber}
          {...this.txtInputIdNumberPrpos}
        />
      </View>
    )
  }

  renderAddressFirst = () => {
    return (
      <View>
        <Text style={styles.labelTitle}>{'Address Line 1'}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <TextInput
          testID={'txtInputAddressOne'}
          style={[styles.bgMobileInput, ((this.state.isValidateField && (this.isStringNullOrBlank(this.state.addressFirst)))) ? styles.errorOfField : styles.textFieldBg]}
          placeholder={'Address Line 1'}
          value={this.state.addressFirst}
          {...this.txtInputAddressFirstProps}
        />
        {(this.state.isValidateField && this.isStringNullOrBlank(this.state.addressFirst)) && <Text style={styles.errorTextView}>{configJSON.addressLineError}</Text>}

      </View>
    )
  }

  renderAddressSec = () => {
    return (
      <View>
        <Text style={styles.labelTitle}>{'Address Line 2 (Optional)'}</Text>
        <TextInput
          testID={'txtInputAddressSec'}
          style={[styles.bgMobileInput, styles.textFieldBg]}
          placeholder={'Address Line 2 (Optional)'}
          value={this.state.addressSec}
          {...this.txtInputAddressSecProps}
        />
      </View>
    )
  }

  renderCity = () => {
    return (
      <View>
        <Text style={styles.labelTitle}>{'City'}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <TextInput
          testID={'txtInputCity'}
          style={[styles.bgMobileInput, ((this.state.isValidateField && (this.isStringNullOrBlank(this.state.city)))) ? styles.errorOfField : styles.textFieldBg]}
          placeholder={'City'}
          value={this.state.city}
          {...this.txtInputCityProps}
        />
        {(this.state.isValidateField && this.isStringNullOrBlank(this.state.city)) && <Text style={styles.errorTextView}>{configJSON.cityError}</Text>}

      </View>
    )
  }

  renderCountry = () => {
    return (
      <View>
        <Text style={styles.labelTitle}>{'Country'}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <View>
          <Dropdown
            maxHeight={200}
            style={[
              styles.bgMobileInputDropdown,
              (this.state.isValidateField && this.state.selectedCountry === '') ? styles.errorOfField : styles.textFieldBg
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            labelField="label"
            valueField="value"
            value={this.state.selectedCountry}
            placeholder={'Country'}
            data={this.state.countryList}
            onChange={(item: any) => this.selectCountryOption(item.value)}
            onFocus={this.openDropdownOfCountry}
            onBlur={this.closeDropDownOfCountry}
            renderRightIcon={() => this.renderRightIcon(this.state.isCountryDropDownOpen)}
          />
          {(this.state.isValidateField && this.isStringNullOrBlank(this.state.selectedCountry)) && <Text style={styles.errorTextView}>{configJSON.countryError}</Text>}
        </View>
      </View>
    )
  }

  renderPostCode = () => {
    return (
      <View>
        <Text style={styles.labelTitle}>{'Post Code'}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <TextInput
          testID={'txtInputPostCode'}
          style={[styles.bgMobileInput, ((this.state.isValidateField && (this.isStringNullOrBlank(this.state.postCode)))) ? styles.errorOfField : styles.textFieldBg]}
          placeholder={'Post Code'}
          value={this.state.postCode}
          {...this.txtInputPostCodeProps}
          maxLength={8}
        />
        {(this.state.isValidateField && this.isStringNullOrBlank(this.state.postCode)) && <Text style={styles.errorTextView}>{configJSON.postcodeError}</Text>}
      </View>
    )
  }

  renderWebViewPage = () => {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
      <View>
        <GenericHeader
          labelTitle={'KYC Verification'}
          imgBackArrow={imgBackArrow}
          btnGoBack={{ ...this.btnGoBackProps }}
          testID={"btnbackArrow"}
          isOtherMsg={true}
        />
        <WebView
          source={{ uri: this.state.onfidoUrl }}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mixedContentMode="always"
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback={true}
          style={{
            height: Dimensions.get('screen').height + 100,
            width: Dimensions.get('screen').width,
          }}
          userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
          onPermissionRequest={(event: CustomPermissionEventType) => {
            event.grant();
          }}
          onError={(event) => console.error('WebView error:', event.nativeEvent)}
          onMessage={(event) => console.log('WebView message:', event.nativeEvent.data)}
        />
      </View>
      </ScrollView>
    )
  }

  renderContent = () => {
    if (this.state.isKycSuccess || this.state.isKycFailure) {
      return this.renderModal();
    }
    else {
      return this.renderData();
    }
  }

  renderModal = () => {
    return (
      <View>
        {this.renderHeaderSection()}
        {this.state.isKycSuccess ? (
          <GenericSucessView
            imgCheckbox={imgCheckbox}
            passchanged={configJSON.successPaymentTitle}
            chnagedDetail={"Congratulations! \n Your KYC verification is successful."}
            login={'Check status'}
            btnLoginProps={{ ...this.btnHandleSuccess }}
            testID={"sucessNotaryID"}
          />
        ) : (
          <GenericSucessView
            imgCheckbox={removeImg}
            passchanged={configJSON.failPaymentTitle}
            chnagedDetail={"Oops! \n Please try again."}
            login={'Retry'}
            btnLoginProps={{ ...this.btnHandleError }}
            testID={"failNotaryID"}
          />
        )}
      </View>
    );
  }

  renderData = () => {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {this.renderHeaderSection()}
        <View style={styles.stepView}>
          {[1, 2, 3].map((stepNumber) => (
            this.renderStepsView(stepNumber, `STEP ${stepNumber}`)
          ))}
        </View>

        <View style={styles.fieldView}>

          {this.renderFirstName()}
          {this.renderMiddleName()}
          {this.renderLastName()}
          {this.renderMobileNumber()}
          {this.renderEmailView()}
          {this.renderDateOfBirth()}
          {this.renderIdType()}
          {this.renderStateCode()}
          {this.renderIdNumber()}
          {this.renderAddressFirst()}
          {this.renderAddressSec()}
          {this.renderCity()}
          {this.renderCountry()}
          {this.renderPostCode()}

          {(!this.state.isValidateField && this.state.applicantMsgRes !== '') && <Text style={styles.errorTextView}>{this.state.applicantMsgRes}</Text>}
          <View>
            <GenericButton
              testID={"btnNextId"}
              btnProps={{ ...this.btnNextProps }}
              btnDisable={this.getButtonEnabled()}
              btnTextLabel={'Next'}
              filledBtn={true}
            />

            <GenericButton
              testID={"btnSDKId"}
              btnProps={{ ...this.btnSDKProps }}
              btnDisable={this.getButtonEnabled()}
              btnTextLabel={'Onfido SDK Start'}
              filledBtn={true}
            />
          </View>
        </View>
        {this.renderTimeSelectionModel()}

        {this.state.isLoader && <View style={styles.loaderStyles}>
          <ActivityIndicator size="large" color="#012275" />
        </View>}
      </ScrollView>
    )
  }
  
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View>
          {this.state.isOnfidoPageShow ?
            this.renderWebViewPage() :
            this.renderContent()
          }
        </View>

      </KeyboardAvoidingView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffffff",
  },
  contentContainer: {
    paddingBottom: 30,
  },
  stepView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  fieldView: {
    padding: 24
  },
  stepTextView: {
    fontSize: 14,
    lineHeight: 22,
    marginLeft: 10,
    marginRight: 10
  },
  selectedSteps: {
    color: '#012275',
    fontWeight: '700',
  },
  unSelectedSteps: {
    color: '#64748B',
    fontWeight: '400',
  },
  stepImgText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightArrowImgView: {
    height: 12,
    width: 7,
    marginLeft: 10,
    marginRight: 10
  },
  labelTitle: {
    marginTop: 10,
    color: '#000000',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22,
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  astrickSign: {
    color: '#DC2626',
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22,
    paddingLeft: 5,
  },
  bgMobileInput: {
    flexDirection: "row",
    fontSize: 14,
    textAlign: "left",
    marginBottom: 8,
    marginTop: 8,
    includeFontPadding: true,
    paddingLeft: 10,
    height: 44,
    fontWeight: '500',
    lineHeight: 16.94,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,

  },
  bgMobileInputDropdown: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 8,
    includeFontPadding: true,
    paddingLeft: 10,
    paddingBottom: 10,
    height: 44,
    fontWeight: '500',
    lineHeight: 16.94,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  placeholderStyle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    fontStyle: 'normal',
    color: '#64748B'
  },
  selectedTextStyle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    fontStyle: 'normal',
    color: '#000'
  },
  errorOfField: {
    borderColor: '#DC2626',
    backgroundColor: '#fff'
  },
  textFieldBg: {
    backgroundColor: "#F8FAFC",
    borderColor: "#CBD5E1",
  },
  errorTextView: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18,
    marginBottom: 10
  },
  mobileFieldView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  countryCodeView: {
    width: '30%',
  },
  numberView: {
    width: '66%',
    marginLeft: 15
  },
  iconStyle: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  arrowUpDownView: {
    marginRight: 10
  },
  downArrowView: {
    height: 24,
    width: 24,
    marginRight: 10
  },
  dateView: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 20
  },
  btnView: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnViewWid: {
    width: '46%',
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
  btnDisableView: {
    backgroundColor: '#CCD3E3'
  },
  blankBtn: {
    borderWidth: 2,
    borderColor: "#012275",
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
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
