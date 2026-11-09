import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { GenericHeader } from "../../../components/src/GenericHeader";
import { imgBackArrow, imgDate, imgTime, imgClose, imgCheckbox, imgFailCross } from "./assets";
import Icon from 'react-native-vector-icons/FontAwesome';
import { GenericDropDownInput } from "../../../components/src/GenericDropDownInput";
import { GenericButton } from "../../../components/src/GenericButton";
import { GenericTextWithHperLink } from "../../../components/src/GenericTextWithHperLink";
import { GenericCustomModel } from "../../../components/src/GenericCustomModel";
import DatePicker from 'react-native-date-picker'
import { GenericSucessView } from "../../../components/src/GenericSucessView";
const currencyList = [{ value: "£", label: "£" }]
//const colorScheme = useColorScheme();
// Customizable Area End

import QuoteManagementController, {
  Props,
  configJSON,
} from "./QuoteManagementController";

export default class QuoteManagement extends QuoteManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  renderDateOfNotaryField = () => {
    return (
      <View>
        <Text style={styles.titleText}>{'Date'}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <Text style={[styles.descriptionText, styles.dateTimeMarginTop]}>{'Date of notary'}</Text>
        <View style={styles.bgPasswordContainer}>
          <TextInput
            testID={"dataAndTimeId"}
            style={[styles.bgMobileInputForDataTime, styles.txtColor, styles[this.renderStyleOfDataTImeFieldAccordingToOS()], styles.bgPasswordInput, styles.textFieldBg]}
            placeholder={configJSON.datePlaceholder}
            value={this.formatDate(this.state.selectedDate)}
            placeholderTextColor="#64748B"
            {...this.txtRequestDateProps}
          />
          <TouchableOpacity
            testID={'calendarIconId'}
            style={styles.passwordShowHide}
          >
            <Image
              style={styles.dateIcon}
              source={imgDate}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderSelectStartAndEndField = () => {
    return (
      <View>
        <Text style={styles.titleText}>{configJSON.chooseTime}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <Text style={[styles.descriptionText, styles.dateTimeMarginTop]}>{configJSON.timeDes}</Text>
        <View style={styles.mobileFieldView}>
          <View style={[styles.bgPasswordContainer, styles.timeFieldWidth]}>
            <TextInput
              testID={"startTImeId"}
              style={[styles.bgMobileInputForDataTime, styles[this.renderStyleOfDataTImeFieldAccordingToOS()], styles.bgPasswordInput, styles[this.renderUIStyleOfStartTime()]]}
              placeholder={configJSON.startTimePlaceholder}
              value={this.state.startTime}
              editable={false}
              placeholderTextColor="#64748B"
              onFocus={() => {
                Keyboard.dismiss();
                this.getTimeSelectionModalOpen('Start Time')}
              }
            />
            <TouchableOpacity
              testID={'calendarIconId'}
              style={styles.passwordShowHide}
              onPress={() => this.getTimeSelectionModalOpen('Start Time')}
            >
              <Image
                style={styles.dateIcon}
                source={imgTime}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.bgPasswordContainer, styles.timeFieldWidth, styles.marLeft]}>
            <TextInput
             editable={false}
              testID={"endTimeId"}
              style={[styles.bgMobileInputForDataTime, styles[this.renderStyleOfDataTImeFieldAccordingToOS()], styles.bgPasswordInput, styles[this.renderUIStyleOfEndTime()]]}
              placeholder={configJSON.endTimePlaceholder}
              value={this.state.endTime}
              placeholderTextColor="#64748B"
              onFocus={() => {
                Keyboard.dismiss()
                this.getTimeSelectionModalOpen('End Time')}
              }
            />
            <TouchableOpacity
              testID={'calendarIconId'}
              style={styles.passwordShowHide}
              onPress={() => this.getTimeSelectionModalOpen('End Time')}
            >
              <Image
                style={styles.dateIcon}
                source={imgTime}
              />
            </TouchableOpacity>
          </View>
        </View>
        {(this.isErrorMesVisible(this.state.endTime) || this.isErrorMesVisible(this.state.startTime)) && <Text testID="errorEndTimeText" style={styles.errorTextView}>{configJSON.endTimeErrorMsg}</Text>}
        {(this.state.isAllFieldValid && this.checkStartAndEndTime()) && <Text style={styles.errorTextView}>{'Start time must be less than end time.'}</Text>}
      </View>
    )
  }

  renderVideoCallReqCheckBox = () => {
    return (
      <View>
        <View style={styles.checkBoxContainerView}>
          <TouchableOpacity {...this.btnRememberMeProps} style={styles.checkboxContainer} testID={"CustomCheckBox"}>
            <View style={[styles.checkbox, this.CustomCheckBoxProps.isChecked && styles.checked]}>
              {this.CustomCheckBoxProps.isChecked && <Icon name="check" size={16} color="#fff" />}
            </View>
          </TouchableOpacity>
          <Text testID={"btnRememberMe"} style={styles.rememberMe} {...this.btnRememberMeProps} >
            {configJSON.videoCallRequired}
            {!this.notarisationMethodType.includes('RIN') && <View>
              <Text style={styles.astrickSign}>*</Text>
            </View>}
          </Text>
        </View>
        <Text style={styles.desOfVideoCall}>{configJSON.videoCallReqDes}</Text>
        {(this.showVideoReqError()) && <Text testID="errorVideoCallReq" style={[styles.errorViewText]}>{configJSON.errorMsgOfVideoCallReq}</Text>}
      </View>
    )
  }

  renderEnterFeesField = () => {
    return (
      <View>
        <Text style={styles.titleText}>{configJSON.yourFees}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <Text style={[styles.descriptionText, styles.dateTimeMarginTop]}>{configJSON.yourFeesDes}</Text>
        <View style={styles.mobileFieldView}>
          <View style={[styles.countryCodeView, styles[this.getMarTopOnError()]]}>
            <GenericDropDownInput
              labelStyle={[styles.bgInput, (this.isErrorMesVisible(this.state.selectedCurrency)) ? styles.errorInput : styles.normalInput]}
              placeholder={'£'}
              value={this.state.selectedCurrency}
              txtInputNamePrpos={this.txtInputCurrencyPrpos}
              testID="txtInputCurrenct"
              dropdownOptions={currencyList}
              isValidateField={this.isErrorMesVisible(this.state.selectedCurrency)}
              isNewField={true}
            />
          </View>
          <TextInput
            testID={"txtInputFees"}
            style={[styles.bgInput, styles.numberView, (this.isErrorMesVisible(this.state.fees)) ? styles.errorInput : styles.normalInput]}
            placeholder={'Fees'}
            value={this.state.fees}
            maxLength={12}
            keyboardType={"phone-pad"}
            textContentType="telephoneNumber"
            placeholderTextColor="#64748B"
            {...this.txtInputFeesProps}
          />
        </View>
        {(this.isErrorMesVisible(this.state.fees) || this.isErrorMesVisible(this.state.selectedCurrency)) && <Text testID="errorFeesText" style={[styles.errorViewText, this.isErrorMesVisible(this.state.selectedCurrency) ? styles.noMarErrorMsg : styles.marErrorMsg]}>{configJSON.feesErrorMsg}</Text>}
        {(this.showFeesErrorMsg()) && <Text testID="errorFeesText" style={[styles.errorViewText]}>{configJSON.feesLimitMsg}</Text>}
      </View>
    )
  }

  renderIncludePlatformFeeCheckbox = () => {
    return (
      <View>
        <View style={styles.checkBoxContainerView}>
          <TouchableOpacity {...this.btnincludPlatformFeeProps} style={styles.checkboxContainer} testID={"includingPlatformFees"}>
            <View style={[styles.checkbox, this.includPlatFormFeesProps.isChecked && styles.checked]}>
              {this.includPlatFormFeesProps.isChecked && <Icon name="check" size={16} color="#fff" />}
            </View>
          </TouchableOpacity>
          <Text testID={"btnIncludePlatFrom"} style={styles.rememberMe} {...this.btnincludPlatformFeeProps} >
            {configJSON.includingPlatformFees}
          </Text>
        </View>
        <Text style={styles.desOfVideoCall}>{configJSON.includingPlatformFeesDes}</Text>
      </View>
    )
  }

  renderAddMessageField = () => {
    return (
      <View>
        <Text style={styles.titleText}>{configJSON.addMesage}</Text>
        <Text style={[styles.descriptionText, styles.dateTimeMarginTop]}>{configJSON.addMessageDes}</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          maxLength={500}
          testID={"addMessageID"}
          style={[styles.textAreaView]}
          textAlignVertical="top"
          placeholder={'Add Message'}
          placeholderTextColor="#64748B"
          {...this.txtInputAddMessageProps}
        />
      </View>
    )
  }

  renderButtonAndHyperLinkText = () => {
    return (
      <View>
        <GenericButton
          testID={"btnMakeQuote"}
          btnProps={{ ...this.btnMakeQuoteProps }}
          btnDisable={this.getMakeQuoteEnabled()}
          btnTextLabel={configJSON.submit}
          filledBtn={true}
        />
        <View style={styles.marTop}>
          <GenericTextWithHperLink
            normalText={""}
            hyperText={configJSON.cancelBtnLabel}
            redirectProps={{ ...this.btnGoBack }}
            testid={"btnCancel"}
          />
        </View>
      </View>
    )
  }

  renderTimeSelectionModel = () => {
    return (
      <View>
        <GenericCustomModel
          visible={this.state.isTimeSelectionModelOpen}
          onClose={() => this.closeTimeSelectionModel()}
          height={'auto'}
          width={337}>
          <View style={styles.headerView}>
            <Text style={styles.timeTypeView}>
              {this.state.timeType}
            </Text>
            <TouchableOpacity {...this.noToChanges}>
              <Image source={imgClose} style={styles.closeIconView} />
            </TouchableOpacity>
          </View>
          <View style={styles.dateView}>
            <DatePicker
              theme={'light'}
              mode="time"
              date={this.state.timeType.toLowerCase() === 'start time' ? (this.state.selectedStartTime || new Date()) : (this.state.selectedEndTime || new Date())}
              onDateChange={this.onStartAndEndTimeChange}
            />
          </View>
          <View style={styles.timeStartEnd}>
            <View style={styles.timetxtView}>
              <Text style={styles.timeTxt}>{configJSON.startTimePlaceholder}</Text>
              {this.state.startTime ? <Text style={styles.timeValue}>{this.state.startTime}</Text>
                : <Text style={styles.timeValuenot}>{"-- -- --"}</Text>}
            </View>
            <View style={styles.timetxtView}>
              <Text style={styles.timeTxt}>{configJSON.endTimePlaceholder}</Text>
              {this.state.endTime ? <Text style={styles.timeValue}>{this.state.endTime}</Text>
                : <Text style={styles.timeValuenot}>{"-- -- --"}</Text>}
            </View>
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
                style={[styles.viewOfBtn, this.getButtonEnabled() ? styles.filledBtn : styles.btnDisableView]}
                {...this.yesProceedToChanges}>
                <Text style={[styles.loginBtnText, styles.filledBtnText]}>{'Next'}</Text>
              </TouchableOpacity>
            </View>

          </View>
        </GenericCustomModel>
      </View>
    )
  }

  renderMainView = () => {
    let content;

    if (this.state.isMakeQuoteGenerated) {
      content = (
        <View>
          <GenericHeader
            testID={"btnbackArrowOnSucess"}
            isOtherMsg={true}
          />
          <GenericSucessView
            imgCheckbox={imgCheckbox}
            passchanged={configJSON.sucessMsgTitle}
            chnagedDetail={configJSON.sucessMsgDetail}
            login={'Check status'}
            btnLoginProps={{ ...this.btnRequestDetailRedirect }}
            testID={"sucessNotaryID"}
          />
        </View>
      );
    } else if (this.state.isMakeQuoteFailed) {
      content = (
        <View>
          <GenericHeader
            testID={"btnbackArrowOnSucess"}
            isOtherMsg={true}
          />
          <GenericSucessView
            imgCheckbox={imgFailCross}
            passchanged={configJSON.failMsgTitle}
            chnagedDetail={configJSON.failMsgDetail}
            login={'Ok'}
            btnLoginProps={{ ...this.onClickOfFailOkBtn }}
            testID={"btnOkId"}
          />
        </View>
      );
    } else {
      content = (
        <View>
          <GenericHeader
            labelTitle={configJSON.makeQuotation}
            imgBackArrow={imgBackArrow}
            btnGoBack={{ ...this.btnGoBack }}
            testID={"btnbackArrow"}
            isOtherMsg={true}
          />
          <View style={styles.fieldView}>
            {this.renderDateOfNotaryField()}
            {this.renderSelectStartAndEndField()}
            {this.renderVideoCallReqCheckBox()}
            {this.renderEnterFeesField()}
            {this.renderIncludePlatformFeeCheckbox()}
            {this.renderAddMessageField()}
            {this.renderButtonAndHyperLinkText()}
          </View>
          {this.renderTimeSelectionModel()}
        </View>
      );
    }

    return content;
  }

  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{ flex: 1 }}
      >
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        ref={this.scrollViewRef}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <View>
            {this.state.isLoader && <View style={styles.loaderStyles}>
              <ActivityIndicator size="large" color="#012275" />
            </View>}
            {this.renderMainView()}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      </KeyboardAvoidingView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  contentContainer: {
    paddingBottom: 30,
  },

  fieldView: {
    padding: 24
  },
  bgPasswordContainer: {
    flexDirection: "row",
    borderRadius: 8,
  },
  timeFieldWidth: {
    width: '48%'
  },
  marLeft: {
    marginLeft: 15
  },
  bgPasswordInput: {
    flex: 1,
    textAlign: 'left'
  },
  passwordShowHide: {
    alignSelf: "center",
    position: 'absolute',
    right: 16,
    paddingTop: 7
  },
  bgMobileInputForDataTime: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 15,
    includeFontPadding: true,
    height: 44,
    fontWeight: '400',
    lineHeight: 22,
    fontStyle: 'normal',
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'solid',
    color: '#334155'
  },
  errorOfField: {
    borderColor: '#DC2626',
    backgroundColor: '#fff'
  },
  textFieldBg: {
    backgroundColor: "#F8FAFC",
    borderColor: "#D1FAE5",
  },
  paddTopBott: {
    paddingLeft: 10,
    paddingBottom: 6,
  },
  paddBottTop: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  padd: {
    padding: 10
  },
  dateIcon: {
    height: 24,
    width: 24
  },
  titleText: {
    marginTop: 15,
    color: '#000000',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  astrickSign: {
    color: '#DC2626',
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
    paddingLeft: 5,
  },
  descriptionText: {
    marginTop: 2,
    color: '#64748B',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  dateTimeMarginTop: {
    marginTop: 7
  },
  checkBoxContainerView: {
    flexDirection: "row",
    marginBottom: 7,
    marginTop: 20,
    marginLeft: -7,
    zIndex: -1,
    color: '#011342'
  },
  rememberMe: {
    color: "#1E293B",
    fontWeight: "600",
    alignSelf: "center",
    fontSize: 15,
    lineHeight: 21,
    fontStyle: 'normal'
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
  desOfVideoCall: {
    color: '#64748B',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18.2,
    marginLeft: 30,
    marginBottom: 10
  },
  mobileFieldView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  countryCodeView: {
    width: '25%',
  },
  numberView: {
    width: '71%',
    marginLeft: 15
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
    color: '#000000'
  },
  errorInput: {
    backgroundColor: '#fff',
    borderColor: '#DC2626',
  },
  normalInput: {
    backgroundColor: "#F1F5F9",
    borderColor: "#D1FAE5",
  },
  textAreaView: {
    borderRadius: 8,
    borderColor: '#D1FAE5',
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: '#F8FAFC',
    fontWeight: '500',
    lineHeight: 16.94,
    fontSize: 14,
    marginTop: 15,
    height: 88,
    includeFontPadding: true,
    padding: 10,
    color: '#000000'
  },
  marTop: {
    marginTop: 10
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
  closeIconView: {
    height: 24,
    width: 24
  },
  txtColor: {
    color:'#334155'
  },
  timeTypeView: {
    color: '#334155',
    fontWeight: '600',
    lineHeight: 24.2,
    fontSize: 20
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dateView: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 20
  },
  timeStartEnd: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 20,
    paddingTop: 20
  },
  timetxtView: {
    flexDirection: 'column',
    alignItems: 'center',

  },
  timeTxt: {
    color: '#64748B',
    fontSize: 12,
    lineHeight: 14.52,
    fontWeight: '400',
    marginBottom: 10
  },
  timeValue: {
    color: '#1E293B',
    fontSize: 16,
    lineHeight: 19.36,
    fontWeight: '600'
  },
  timeValuenot: {
    color: '#D1FAE5',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19.36
  },
  errorTextView: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18,
    marginTop: 3
  },
  marTopNon: {},
  topMar: {
    marginTop: 14
  },
  errorViewText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18
  },
  marErrorMsg: {
    marginTop: 10
  },
  noMarErrorMsg: {
    marginTop: -3
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
