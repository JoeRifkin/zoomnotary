import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
  TextInput,
  Dimensions,
  Keyboard
} from "react-native";
import { GenericButton } from "../../../components/src/GenericButton";
import { GenericHeader } from "../../../components/src/GenericHeader";
import { GenericSucessView } from "../../../components/src/GenericSucessView";
import { GenericTextWithHperLink } from "../../../components/src/GenericTextWithHperLink";
import { GenericDocSelectionModel } from "../../../components/src/GenericDocSelectionModel";
import CustomLoader  from "../../../components/src/CustomLoader";

import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  imgBackArrow, corssRedImg, uploadBlueImg, PlusGreenImg, crossBlueImg,
  upArrowImg, rightArrow, dateTimeImg, greenDotImg, orangeDotImg, redDotImg,
  fileIconImg, rightArrowBlueImg, imgCheckbox, downArrowBlackImg
} from "./assets";
import { Calendar } from 'react-native-calendars';
import { GenericCustomModel } from "../../../components/src/GenericCustomModel";

const nextDay = new Date();
const today = new Date();
nextDay.setDate(today.getDate() + 1);
const todayString = nextDay.toISOString().split('T')[0];

const thirtyDaysFromNow = new Date(today);
thirtyDaysFromNow.setDate(today.getDate() + 30);
const thirtyDaysFromNowString = thirtyDaysFromNow.toISOString().split('T')[0];


interface DocumentView {
  id: number;
  name: string;
  path: string;
  recipients: Recipient[];
}

interface Recipient {
  name: string;
  email: string;
  is_signatory: boolean;
}

// Customizable Area End
import ContinueAsGuestController, { Props, configJSON } from "./ContinueAsGuestController";

export default class ContinueAsGuest extends ContinueAsGuestController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start

  renderRightIcon = (isDropdownOpen: boolean) => (
    <View>
      <Image style={styles.arrowUpDownView} source={isDropdownOpen ? upArrowImg : downArrowBlackImg} />
    </View>
  );

  renderServicesDropdownView = () => {
    return (
      <View>
        {this.renderTitleAndDescriptionOfDropdown(configJSON.servicesTitle, configJSON.servicesDes)}

        <Dropdown
          maxHeight={300}
          style={[
            styles.bgMobileInput,
            (this.state.isStepOneValidation && this.state.selectedService === null) ? styles.errorOfField : styles.textFieldBg
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          labelField="label"
          valueField="value"
          value={(this.state.selectedService && this.state.selectedService.value) ? this.state.selectedService.value : ''}
          placeholder={!this.state.selectedService ? 'Type of Notary Services' : this.state.selectedService}
          data={this.state.servicesList}
          testID="serviceListId"
          onChange={(item: any) => this.txtInputServicesPrpos(item)}
          onFocus={this.openServicesDropdown}
          onBlur={this.closeDropDownOfServices}
          renderRightIcon={() => this.renderRightIcon(this.state.isServiceDropdownOpen)}
          disable={this.state.reponseMsg === "Accept" ? true : false}
        />
        {this.renderErrorText(configJSON.errorOfServiceEmpty, this.state.selectedService, "errorServiceText")}
      </View>
    )
  }

  renderErrorText = (errorMessageKey: string, stateVariable: string, testID: string) => {
    return (this.state.isStepOneValidation && stateVariable === null) && (
      <Text testID={testID} style={styles.errorTextView}>
        {errorMessageKey}
      </Text>
    );
  }

  renderMethodOfNotrazationView = () => {
    return (
      <View>
        {this.renderTitleAndDescriptionOfDropdown(configJSON.notarisationTitle, configJSON.notarisationDes)}

        <Dropdown
          maxHeight={300}
          style={[
            styles.bgMobileInput,
            (this.state.isStepOneValidation && this.state.selectedNotarisation === null) ? styles.errorOfField : styles.textFieldBg
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          labelField="label"
          valueField="value"
          value={(this.state.selectedNotarisation && this.state.selectedNotarisation.value) ? this.state.selectedNotarisation.value : ''}
          placeholder={!this.state.selectedNotarisation ? 'Method of Notarisation' :this.state.selectedNotarisation}
          data={this.state.notrizationList}
          onChange={(item: any) => this.txtInputdNotarisationPrpos(item)}
          testID="methodOfNotarisationID"
          onFocus={this.openCloseDropdown}
          onBlur={this.closeDropDownOfNotarization}
          renderRightIcon={() => this.renderRightIcon(this.state.isDropdownOpen)}
          disable={this.state.reponseMsg === "Accept" ? true : false}
        /> 
        {this.renderErrorText(configJSON.errorOfNotarisationEmpty, this.state.selectedNotarisation, "errorNotarizationText")}
      </View>
    )
  }

  renderDataAndTimeView = () => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} 
      accessible={false}>
      <View>
        <Text style={styles.titleText}>{'Date & Time'}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <Text style={[styles.descriptionText, styles.dateTimeMarginTop]}>{'Select the date and time slot for your notary service.'}</Text>

        <View style={styles.bgPasswordContainer}>
          <TextInput
            testID={"dataAndTimeId"}
            style={[styles.bgMobileInputForDataTime, styles[this.renderStyleOfDataTImeFieldAccordingToOS()], styles.bgPasswordInput, styles[this.renderUIStyleOfDateAndTime()]]}
            placeholder={'Date & Time'}
            value={this.handleDateInputField()}
            onFocus={() => this.getCalendarModalOpen()}
          />
          <TouchableOpacity
            testID={'calendarIconId'}
            style={styles.passwordShowHide}
            {...this.btnOpenCalendarProps}
          >
            <Image
              source={dateTimeImg}
              style={styles.calendarImg}
            />
          </TouchableOpacity>
        </View>
        {(this.state.isStepOneValidation && this.state.selectedDay === '') && <Text testID="errorDateTimeText" style={styles.errorTextView}>{configJSON.errorOfDataAndTimeEmpty}</Text>}
      </View>
      </TouchableWithoutFeedback>
    )
  }

  renderAddNotesView = () => {
    return (
      <View>
        <Text style={styles.titleText}>{'Add Note'}</Text>
        <Text style={styles.descriptionText}>{'You can leave special instructions or additional information.'}</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          maxLength={1000}
          testID={"addNoeID"}
          style={[styles.textAreaView]}
          textAlignVertical="top"
          placeholder={'Note'}
          {...this.txtInputAddNotesProps}
        />
      </View>
    )
  }

  renderTitleAndDescriptionOfDropdown = (title: string, description: string) => {
    return (
      <View>
        <Text style={styles.titleText}>{title}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    )
  }

  renderJuridicationDropdownView = () => {
    return (
      <View>
        {this.renderTitleAndDescriptionOfDropdown(configJSON.jurisdictionTitle, configJSON.jurisdictionDes)}
        <Dropdown
          maxHeight={300}
          style={[
            styles.bgMobileInput,
            (this.state.isStepOneValidation && this.state.selectedJurisdiction === null) ? styles.errorOfField : styles.textFieldBg
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          labelField="label"
          valueField="value"
          value={(this.state.selectedJurisdiction && this.state.selectedJurisdiction.value) ? this.state.selectedJurisdiction.value : ''}
          placeholder={!this.state.selectedJurisdiction ? 'Jurisdiction' : '...'}
          data={this.state.countryList}
          onChange={(item: any) => this.txtInputJurisdictionPrpos(item)}
          testID="typeOfJurisdictionID"
          onFocus={this.openJuridactionDropdown}
          onBlur={this.closeDropDownOfJuridaction}
          renderRightIcon={() => this.renderRightIcon(this.state.isJuridactionDropdownOpen)}
        />
        {this.renderErrorText(configJSON.errorOfJurisdictionEmpty, this.state.selectedJurisdiction, "errorJurisdicationText")}
      </View>
    )
  }

  renderDocumentCountView = () => {
    return (
      <View>
        <Text style={styles.titleText}>{'No of document(s) to be notarised'}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <Text style={styles.descriptionText}>{'Select the number of notary document.'}</Text>

        <View style={[styles.bgMobileInput, styles.viewOfDocumentAdd, (this.state.isStepOneValidation && this.state.noOfDocument === 0) ? styles.errorOfField : styles.textFieldBg]}>
          <TouchableOpacity testID="plusMinusDocCountID" onPress={() => this.increaseDecreaseNoOfDocument('minus')}>
            <Text style={[styles.plusMinusView, this.state.noOfDocument === 0 ? styles.disbaledBtnColor : styles.enabledBtnColor]}>{'-'}</Text>
          </TouchableOpacity>
          <Text style={this.state.noOfDocument > 0 ? styles.selectedNoView : styles.unselectedNoDoc}>{this.state.noOfDocument > 0 ? this.state.noOfDocument : 'No. of document(s)'}</Text>
          <TouchableOpacity onPress={() => this.increaseDecreaseNoOfDocument('plus')}>
            <Text style={[styles.plusMinusView, this.state.noOfDocument === 10 ? styles.disbaledBtnColor : styles.enabledBtnColor]}>{'+'}</Text>
          </TouchableOpacity>
        </View>
        {(this.state.isStepOneValidation && this.state.noOfDocument === 0) && <Text testID="errorNoOfDocText" style={styles.errorTextView}>{configJSON.errorOfChooseDocNoEmpty}</Text>}
      </View>
    )
  }

  renderStepSecondView() {
    return (
      <View>
        {this.renderServicesDropdownView()}

        {this.renderMethodOfNotrazationView()}
        {this.renderDataAndTimeView()}
        {this.renderAddNotesView()}
        {this.renderDocumentCountView()}
        <GenericButton
          testID={"btnNextStepsFirstId"}
          btnProps={{ ...this.btnNextStepsFirstProps }}
          btnDisable={this.getFirstStepBtnEnabled()}
          btnTextLabel={'Next'}
          filledBtn={true}
        />

        <View style={styles.marTopForTxt}>
          <GenericTextWithHperLink
            hyperText={'Cancel'}
            redirectProps={{ ...this.cancelNewNotary }}
            testid={"btnCancelNotaryID"}
          />
        </View>

        <GenericCustomModel
          visible={this.state.isModelOpen}
          onClose={() => this.closeCalendarModel()}
          height={'auto'}
          width={337}>
          <Calendar
            hideExtraDays={true}
            testID="calendarSelectDataID"
            minDate={todayString}
            maxDate={thirtyDaysFromNowString}
            markedDates={this.state.markedDates}
            markingType={'custom'}
            firstDay={1}
            onDayPress={selectDay => {
              this.handleDateSelect(selectDay.dateString)
            }}
            onMonthChange={(date)=>this.handleMonthChange(date.dateString)}
          />
          <View>
            <View style={styles.viewOfPriority}>
              <View style={[styles.viewOfPriority, styles.alignItem]}>
                <Image style={styles.dotImgView} source={greenDotImg} />
                <Text style={styles.priorityTextView}>{configJSON.standard}</Text>
              </View>
              <View style={[styles.viewOfPriority, styles.alignItem]}>
                <Image style={styles.dotImgView} source={orangeDotImg} />
                <Text style={styles.priorityTextView}>{configJSON.priority}</Text>
              </View>
              <View style={[styles.viewOfPriority, styles.alignItem]}>
                <Image style={styles.dotImgView} source={redDotImg} />
                <Text style={styles.priorityTextView}>{configJSON.superPriority}</Text>
              </View>
            </View>

            {
              this.state.reponseMsg === "Accept" ? null :
            <View style={styles.viewOfPriority}>
              <TouchableOpacity testID="selectBtnID" onPress={() => this.selectBtn(configJSON.morning)} style={[styles.btnOnCalendarView, this.state.selectedDayTime === configJSON.morning ? styles.selectedBtnView : styles.unselectedBtnView]}>
                <Text style={[styles.btnTextView, this.state.selectedDayTime === configJSON.morning ? styles.selectedBtnText : styles.unselectedBtnText]}>{configJSON.morning}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.selectBtn(configJSON.afternoon)} style={[styles.btnOnCalendarView, this.state.selectedDayTime === configJSON.afternoon ? styles.selectedBtnView : styles.unselectedBtnView]}>
                <Text style={[styles.btnTextView, this.state.selectedDayTime === configJSON.afternoon ? styles.selectedBtnText : styles.unselectedBtnText]}>{configJSON.afternoon}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.selectBtn(configJSON.evening)} style={[styles.btnOnCalendarView, this.state.selectedDayTime === configJSON.evening ? styles.selectedBtnView : styles.unselectedBtnView]}>
                <Text style={[styles.btnTextView, this.state.selectedDayTime === configJSON.evening ? styles.selectedBtnText : styles.unselectedBtnText]}>{configJSON.evening}</Text>
              </TouchableOpacity>
            </View>
            }

          </View>
          {this.state.notAvailable && <Text style={styles.error}>No time slot are available for the selected service,
            Choose another date to continue.</Text>}
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
                <Text style={[styles.loginBtnText, styles.filledBtnText]}>{'Save'}</Text>
              </TouchableOpacity>
            </View>

          </View>
          <CustomLoader loader={this.state.isLoader} />
        </GenericCustomModel>
      </View>
    )
  }

  renderDocumentHeader = (item: DocumentView, index: number) => (
    <View style={[styles.docHeadView, styles.marTopDoc]}>
      <View>
        <Text style={styles.docView}>
          {`Document #${index + 1}`}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
      </View>
      {this.canBeRemoved(item, index) && (
        <TouchableOpacity
          testID="removeDocTxtID"
          onPress={() => this.removeDocFromList(index)}
          style={styles.removeView}
        >
          <Text style={styles.removeTxt}>{'Remove'}</Text>
          <Image style={styles.crossRedImgView} source={corssRedImg} />
        </TouchableOpacity>
      )}
    </View>
  );

  renderDocumentDetails = () => (
    <View>
      <Text style={styles.detailOfDoc}>{'Your Documents to be Notarised.'}</Text>
      <Text style={styles.detailOfDoc}>{'PDF, Word or Image file (2MB Max).'}</Text>
    </View>
  );

  renderFileView = (item: DocumentView, index: number) => (
    <View style={styles.selectedFileView}>
      <TouchableOpacity
        style={styles.iconAnfNameView}
        onPress={() => this.uploadDocumentFile(index)}
      >
        <Image style={styles.fileIconView} source={fileIconImg} />
        <Text style={styles.btnText}>
          {this.truncatedText(item.name || this.getSelectedFileName(item.path), 20)}
        </Text>
      </TouchableOpacity>
      {this.canBeRemoved(item, index) && (
        <TouchableOpacity
          testID="txtRemoveFileDocId"
          onPress={() => this.removeFilesOrDoc(index)}
        >
          <Image style={styles.closeBlusIcon} source={crossBlueImg} />
        </TouchableOpacity>
      )}
    </View>
  );

  renderUploadButton = (item: DocumentView, index: number) => (
    <TouchableOpacity
      onPress={() => this.uploadDocumentFile(index)}
      style={[
        styles.uploadBtnView,
        ((!this.state.docValidationMsg && this.state.selectedDocument === index) ||
          this.renderErrorMsg(item))
          ? styles.errorBorder
          : styles.normalBorder
      ]}
    >
      <Image style={styles.uploadImgView} source={uploadBlueImg} />
      <Text style={styles.btnText}>{'Upload document'}</Text>
    </TouchableOpacity>
  );

  renderErrorMessages = (item: DocumentView, index: number) => (
    <>
      {this.renderErrorMsg(item) && (
        <Text style={styles.errorTextView}>{configJSON.fileValidationMsg}</Text>
      )}
      {!this.state.docValidationMsg && this.state.selectedDocument === index && (
        <Text style={styles.errorTextView}>{configJSON.errorOfInvalidFile}</Text>
      )}
    </>
  );

  renderDocumentView = (item: DocumentView, index: number) => (
    <View key={index}>
      {this.renderDocumentHeader(item, index)}
      {this.renderDocumentDetails()}
      {item.name || item.path
        ? this.renderFileView(item, index)
        : this.renderUploadButton(item, index)}
      {this.renderErrorMessages(item, index)}
    </View>
  );

  renderStepThiredView() {
    return (
      <View>
        {this.viewsOfDocArray.map((item: DocumentView, index: number) => this.renderDocumentView(item, index))}

        {this.state.noOfDocument <= 9 && <TouchableOpacity testID="addMoreDocTxtID" style={styles.addMoreDocView} onPress={() => this.addDocInList()}>
          <Text style={styles.addMoreDocTxt}>{'Add more documents'}</Text>
          <Image style={styles.plusIconView} source={PlusGreenImg} />
        </TouchableOpacity>}
        <View>
          <View style={styles.checkBoxContainerView}>
            <TouchableOpacity {...this.btnFirstCheckBoxProps} style={styles.checkboxContainer} testID={"firstCustomCheckBoxID"}>
              <View style={[styles.checkbox, this.CustomCheckBoxFirstProps.isChecked && styles.checked]}>
                {this.CustomCheckBoxFirstProps.isChecked && <Icon name="check" size={16} color="#fff" />}
              </View>
            </TouchableOpacity>

            <Text
              testID={"btnRememberMe"} //Merge Engine::From BDS
              style={styles.rememberMe} //UI Engine::From Sketch
            >
              {'By uploading these files, I understand that a notary may modify permissions and settings of uploaded files and/or merge form content with document master in order to complete the online document notarisation process.'} {/*UI Engine::From Sketch*/}
            </Text>
          </View>

          <View style={styles.checkBoxContainerView}>
            <TouchableOpacity {...this.btnSecCheckBoxProps} style={styles.checkboxContainer} testID={"secCustomCheckBoxID"}>
              <View style={[styles.checkbox, this.CustomCheckBoxSecProps.isChecked && styles.checked]}>
                {this.CustomCheckBoxSecProps.isChecked && <Icon name="check" size={16} color="#fff" />}
              </View>
            </TouchableOpacity>

            <Text
              testID={"btnRememberMe"} //Merge Engine::From BDS
              style={styles.rememberMe} //UI Engine::From Sketch
            >
              {'I understand that I am requesting remote digital notarisation. I will need to have audio/video capability for the actual signing.'}
            </Text>
          </View>
        </View>

        <GenericButton
          testID={"btnNextStepsSecId"}
          btnProps={{ ...this.btnNextStepsSecProps }}
          btnDisable={this.getenabledSecStepBtn()}
          btnTextLabel={'Next'}
          filledBtn={true}
        />
      </View>
    )
  }

  renderStepFourthView() {
    return (
      <View>
        {Object.keys(this.state.documnetDetail).map((document: string, docIndex: number) => (
          <View key={docIndex}>
            <View style={styles.docHeadView}>
              <Text style={styles.docView}>{`Document #${docIndex + 1}`}
                <Text style={styles.astrickSign}>*</Text>
              </Text>
              <TouchableOpacity style={styles.toogleArrowImg} onPress={() => this.toggleDocument(document)}>
                <Image style={styles.arrowImgView} source={this.getArrowImg(document)} />
              </TouchableOpacity>
            </View>
            <Text style={styles.docFileName}>
              {this.state.documnetDetail[document][0].fileDetail.name ?
                this.state.documnetDetail[document][0].fileDetail.name :
                this.truncatedText(this.getSelectedFileName(this.state.documnetDetail[document][0].fileDetail.path), 40)}</Text>
            {!this.state.toggledDocuments[document] && this.state.documnetDetail[document][0].recipients?.map((recipient: Recipient, recipientIndex: number) => (
              <View style={[styles.viewOfDoc, styles.marTop]} key={recipientIndex}>
                <View style={styles.docHeadView}>
                  <Text style={styles.receipentView}>{`Recipient #${recipientIndex + 1}`}</Text>
                  <TouchableOpacity testID="txtRemoveID" style={styles.removeView}
                    onPress={() => this.removeParticipant(document, recipientIndex)}>
                    <Text style={styles.removeTxt}>Remove</Text>
                    <Image style={styles.crossRedImgView} source={corssRedImg} />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={styles.emailTitle}>Name of Recipient</Text>
                  <TextInput
                    style={[styles.bgInputView, styles[this.renderStyleAccordingToOS()], (this.getValidateMsgOfRecipantName(recipient.name)) ? styles.recipantsErrorBorder : styles.recipantsBorder]}
                    placeholder={'Name of Recipient'}
                    value={recipient.name}
                    testID="recipientNameID"
                    maxLength={30}
                    onChangeText={(text) => this.changeRecipientName(document, recipientIndex, text)}
                  />
                  {this.getValidateMsgOfRecipantName(recipient.name) && <Text style={styles.errorTextView}>{configJSON.nameOfRecipient}</Text>}
                  {this.getRecipantNameValidation(recipient.name) && <Text style={styles.errorTextView}>{configJSON.nameOfRecipientError}</Text>}
                </View>
                <View>
                  <Text style={styles.emailTitle}>Email Address of Recipient</Text>
                  <TextInput
                    style={[styles.bgInputView, styles[this.renderStyleAccordingToOS()], (this.state.isStepThiredValidation && recipient.email === '') ? styles.recipantsErrorBorder : styles.recipantsBorder]}
                    placeholder={'Email Address of Recipient'}
                    value={recipient.email}
                    testID="recipientEmailID"
                    onChangeText={(text) => this.changeRecipientEmail(document, recipientIndex, text)}
                  />
                  {(this.state.isStepThiredValidation && recipient.email === '') && <Text style={styles.errorTextView}>{configJSON.emailOfRecipient}</Text>}
                  {(this.state.isValidateField && (!this.isValidRecipientEmail(recipient.email) && recipient.email !== '')) && <Text style={styles.errorTextView}>{configJSON.errorForValidEmail}</Text>}
                </View>
                <View style={styles.checkBoxContainerView}>
                  <TouchableOpacity style={styles.checkboxCont} onPress={() => this.changeRecipientSignatoryValue(document, recipientIndex)}>
                    <View style={[styles.checkbox, recipient.is_signatory && styles.checked]}>
                      {recipient.is_signatory && <Icon name="check" size={16} color="#fff" />}
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.alsoARemoView}>Also a signatory</Text>
                </View>
              </View>
            ))}
            {(this.state.isValidateField && !this.checkIsSignatoryForSingleDocument(this.state.documnetDetail[document][0].recipients)) && <Text style={styles.errorTextView}>{configJSON.notSelectedIsSignatoryErrorMsg}</Text>}
            <TouchableOpacity testID="txtAddMoreRecipientsId" style={styles.addMoreDocView}
              onPress={() => this.addParticipant(document)}>
              <Text style={styles.addMoreDocTxt}>Add more Recipients</Text>
              <Image style={styles.plusIconView} source={PlusGreenImg} />
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.marBottom}>
          <GenericButton
            testID={"btnCreateRequestId"}
            btnProps={{ ...this.btnNextStepsThiredProps }}
            btnDisable={this.getCreateRequestBtnEnabled()}
            btnTextLabel={this.getButtonName()}
            filledBtn={true}
          />
        </View>
      </View>
    );
  }

  renderStepsView = (stepNumber: number, text: string) => {
    return (
      <TouchableOpacity key={stepNumber} testID={`txtStep${stepNumber}ID`} onPress={() => this.goToSteps(stepNumber)} style={styles.stepImgText}>
        <Text style={[styles.stepTextView, this.state.stepsNo === stepNumber ? styles.selectedSteps : styles.unSelectedSteps]}>
          {text}
        </Text>
        {stepNumber !== 4 && <Image style={styles.rightArrowImgView} source={this.state.stepsNo === stepNumber ? rightArrowBlueImg : rightArrow} />}
      </TouchableOpacity>
    )
  }

  renderTouchableOption(text: string) {
    return (
      <View>
        {text !== 'Cancel' ?
          <TouchableOpacity testID={`document-${text}`} onPress={() => this.openDocumentPicker(text)} style={styles.thouChableViewBtn}>
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

  renderStepFirstView = () => {
    return (
      <View>
        <View>
        <Text style={styles.titleText}>{'First & last name'}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <Text style={styles.descriptionText}>{'Enter your first & last name'}</Text>
        <TextInput
          maxLength={30}
          testID={"userNameID"}
          value={this.state.userName}
          style={[styles.bgMobileZeroStepInput, styles[this.getStyleOfTextBox(this.state.userName)]]}
          textAlignVertical="top"
          placeholder={'First & last name'}
          {...this.txtInputUserNameProps}
          editable={this.state.reponseMsg === "Accept" ? false : true}
        />
        {this.getErrorMessageForView(this.state.userName) && <Text style={styles.errorTextView}>{configJSON.userNameError}</Text>}
      </View>

      <View>
        <Text style={styles.titleText}>{'Email Address'}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <Text style={styles.descriptionText}>{'Enter your Email Address'}</Text>
        <TextInput
          maxLength={30}
          testID={"emailID"}
          style={[styles.bgMobileZeroStepInput, styles[this.getStyleOfTextBox(this.state.email)]]}
          textAlignVertical="top"
          placeholder={'Email Address'}
          value={this.state.email}
          {...this.txtInputEmailProps}
          editable={this.state.reponseMsg === "Accept" ? false : true}
        />
        {(this.state.isStepZeroValidation && (this.state.email === '' || !this.isValidRecipientEmail(this.state.email))) && <Text style={styles.errorTextView}>{configJSON.emailError}</Text>}
      </View>

      <View>
      <Text style={styles.titleText}>{'Mobile Number'}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <Text style={styles.descriptionText}>{'Enter your mobile number'}</Text>
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
              value={this.state.countryCode}
              placeholder={'+44'}
              data={this.state.countryCodeList}
              testID="CountryCodeId"
              onChange={(item: any) => this.txtInputCountryCodePrpos(item.value)}
              onFocus={this.openDropdownOfCountryCode}
              onBlur={this.closeDropDownOfCountryCode}
              renderRightIcon={() => this.renderRightIcon(this.state.isCountryCodeDropDownOpen)}
              disable={this.state.reponseMsg === "Accept" ? true : false}
            />
          </View>
          <TextInput
            testID={"Mobile NumberID"}
            style={[styles.bgMobileInputForNumber, styles.numberView, styles[this.getStyleOfTextBox(this.state.mobileNumber)]]}
            placeholder={'Mobile number'}
            value={this.state.mobileNumber}
            maxLength={12}
            keyboardType={"phone-pad"}
            textContentType="telephoneNumber"
            {...this.txtInputPhoneNumProps}
            editable={this.state.reponseMsg === "Accept" ? false : true}
          />
        </View>
        {this.getErrorMessageForView(this.state.mobileNumber) && <Text style={styles.errorTextView}>{configJSON.mobileError}</Text>}
      </View>

      <View>
        <Text style={styles.titleText}>{'Address Line 1'}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <Text style={styles.descriptionText}>{'Enter Address line 1'}</Text>
        <TextInput
          maxLength={30}
          value={this.state.addressOne}
          testID={"addressoneID"}
          style={[styles.bgMobileZeroStepInput, styles[this.getStyleOfTextBox(this.state.addressOne)]]}
          textAlignVertical="top"
          placeholder={'Address Line 1'}
          {...this.txtInputAddressOneProps}
        />
        {this.getErrorMessageForView(this.state.addressOne) && <Text style={styles.errorTextView}>{configJSON.addressOneError}</Text>}
      </View>

      <View>
        <Text style={styles.titleText}>{'Address Line 2 (Optional)'}
        </Text>
        <Text style={styles.descriptionText}>{'Enter Address line 2'}</Text>
        <TextInput
          maxLength={30}
          testID={"addressTwoID"}
          style={[styles.bgMobileZeroStepInput, styles.textFieldBg ]}
          textAlignVertical="top"
          placeholder={'Address Line 2'}
          {...this.txtInputAddressTwoProps}
        />
      </View>

      <View>
        <Text style={styles.titleText}>{'City'}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <Text style={styles.descriptionText}>{'Enter your city name'}</Text>
        <TextInput
          maxLength={30}
          testID={"cityID"}
          value={this.state.city}
          style={[styles.bgMobileZeroStepInput, styles[this.getStyleOfTextBox(this.state.city)]]}
          textAlignVertical="top"
          placeholder={'City'}
          {...this.txtInputCityProps}
        />
        {this.getErrorMessageForView(this.state.city) && <Text style={styles.errorTextView}>{configJSON.cityError}</Text>}
      </View>

      <View>
      <Text style={styles.titleText}>{'Jurisdiction'}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <Text style={styles.descriptionText}>{'Choose your jurisdiction where you need a notary service'}</Text>
      <View>
          <Dropdown
            maxHeight={200}
            style={[
              styles.bgMobileInputDropdown,
              styles[this.getStyleOfTextBox(this.state.country)]
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            labelField="label"
            valueField="value"
            value={this.state.country}
            placeholder={'Country'}
            data={this.state.countryList}
            onChange={(item: any) => this.selectCountryOption(item.value)}
            onFocus={this.openDropdownOfCountry}
            onBlur={this.closeDropDownOfCountry}
            renderRightIcon={() => this.renderRightIcon(this.state.isCountryDropDownOpen)}
          />
          {this.getErrorMessageForView(this.state.country) && <Text style={styles.errorTextView}>{configJSON.countryError}</Text>}
        </View>
      </View>
      <View>
        <Text style={styles.titleText}>{'Post Code'}
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        </Text>
        <Text style={styles.descriptionText}>{'Enter your post code.'}</Text>
        <TextInput
          maxLength={8}
          testID={"postCodeID"}
          value={this.state.postCode}
          style={[styles.bgMobileZeroStepInput, styles[this.getStyleOfTextBox(this.state.postCode)]]}
          textAlignVertical="top"
          placeholder={'Post Code'}
          {...this.txtInputPostCodeProps}
        />
        {this.getErrorMessageForView(this.state.postCode) && <Text style={styles.errorTextView}>{configJSON.postCodeError}</Text>}
      </View>
        <GenericButton
          testID={"btnNextStepsFirstId"}
          btnProps={{ ...this.btnNextStepsZeroProps }}
          btnDisable={this.getZeroStepBtnEnabled()}
          btnTextLabel={'Next'}
          filledBtn={true}
        />

        <View style={styles.marTopForTxt}>
          <GenericTextWithHperLink
            hyperText={'Cancel'}
            redirectProps={{ ...this.cancelNewNotary }}
            testid={"btnCancelNotaryID"}
          />
        </View>
      </View>
    )
  }

  renderCurrentStepView = () => {
    switch (this.state.stepsNo) {
      case 1:
        return this.renderStepFirstView();
      case 2:
        return this.renderStepSecondView();
      case 3:
        return this.renderStepThiredView();
      default:
        return this.renderStepFourthView();
    }
  };

  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      //Merge Engine DefaultContainer
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
        ref={this.scrollViewRef}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}


          {this.state.isNewRequestCreated ? <View>
            <GenericHeader
              imgBackArrow={imgBackArrow}
              btnGoBack={{ ...this.btnGoBack }}
              testID={"btnbackArrowOnSucess"}
              isOtherMsg={true}
            />
            <GenericSucessView
              imgCheckbox={imgCheckbox}
              passchanged={this.getSucessMsgScreenPage()}
              chnagedDetail={configJSON.sucessMsgDetail}
              login={'Check status'}
              btnLoginProps={{ ...this.btnDashboardRedirect }}
              testID={"sucessNotaryID"}
            />
          </View>
            : <View>
              <GenericHeader
                labelTitle={this.getTitleOfNotaryFlowPage()}
                imgBackArrow={imgBackArrow}
                btnGoBack={{ ...this.btnGoBack }}
                testID={"btnbackArrow"}
                isOtherMsg={true}
              />
              <View style={styles.fieldsView}>
                <View style={styles.stepView}>
                  {[1, 2, 3, 4].map((stepNumber) => (
                    this.renderStepsView(stepNumber, `STEP ${stepNumber}`)
                  ))}
                </View>
                {this.renderCurrentStepView()}
                
              </View>
              {this.state.isLoader && <View style={styles.loaderStyles}>
                <ActivityIndicator size="large" color="#012275" />
              </View>}

              <GenericCustomModel
                visible={this.state.isOpenEmailAlreadyExitmodel}
                height={'auto'}
                width={337}>
                <Text style={styles.confirmationMsgView}>{configJSON.alertMsgForEmailWhichAlreadyExits}</Text>
                <View style={styles.btnView}>
                  <View style={styles.btnViewWid}>
                    <TouchableOpacity
                      testID={"btnNoToProceed"}
                      style={[styles.blankBtn]}
                      {...this.closeEmailAlertModel}>
                      <Text style={[styles.loginBtnText, styles.blankBtnText]}>{'Ok'}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.btnViewWidofYes}>
                    <TouchableOpacity
                      testID={"btnYesProceed"}
                      style={[styles.viewOfBtn, styles.filledBtn]}
                      {...this.goToLoginPage}>
                      <Text style={[styles.loginBtnText, styles.filledBtnText]}>{'Login'}</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </GenericCustomModel>

              <GenericDocSelectionModel
                visible={this.state.isDocSelectionModelOpen}
                onClose={() => this.closeModelOfDocument()}
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
                  {this.renderTouchableOption("Document")}
                  {this.renderTouchableOption("Cancel")}
                </View>
              </GenericDocSelectionModel>
            </View>}
          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  error:{
    textAlign:'center',
    color:'red',
    marginTop:-10,
    marginBottom:20,
    fontWeight:'400',
    fontSize:12
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  stepView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
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
  titleText: {
    marginTop: 20,
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
  bgMobileInput: {
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
    padding: 10
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
  errorOfField: {
    borderColor: '#DC2626',
    backgroundColor: '#fff'
  },
  textFieldBg: {
    backgroundColor: "#F8FAFC",
    borderColor: "#CBD5E1",
  },
  textAreaView: {
    borderRadius: 8,
    borderColor: '#CBD5E1',
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: '#F8FAFC',
    fontWeight: '400',
    lineHeight: 22,
    fontSize: 14,
    marginBottom: 5,
    marginTop: 15,
    height: 88,
    includeFontPadding: true,
    padding: 10,
  },
  placeholderStyle: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 22,
    fontStyle: 'normal',
    color: '#64748B'
  },
  selectedTextStyle: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 22,
    fontStyle: 'normal',
    color: '#000'
  },
  iconStyle: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  bgPasswordContainer: {
    flexDirection: "row",
    borderRadius: 8,
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
  viewOfDocumentAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center'
  },
  plusMinusView: {
    fontSize: 18,
    fontWeight: 'bold',
    bottom: 3
  },
  disbaledBtnColor: {
    color: '#CBD5E1'
  },
  enabledBtnColor: {
    color: '#011342'
  },
  unselectedNoDoc: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: '#64748B'
  },
  selectedNoView: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    lineHeight: 17
  },
  unSelectedNoView: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: '#64748B'
  },
  marTopForTxt: {
    marginTop: 30
  },
  docView: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22,
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  docHeadView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  marTopDoc: {
    marginTop: 20,
  },
  removeView: {
    flexDirection: 'row',
    alignItems: 'center',
    right: 10
  },
  toogleArrowImg: {
    height: 40,
    width: 40,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    right: 10
  },
  arrowImgView: {
    height: 24,
    width: 24
  },
  removeTxt: {
    color: '#DC2626',
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '600'
  },
  crossRedImgView: {
    height: 20,
    width: 20,
    left: 10
  },
  detailOfDoc: {
    color: "#475569",
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 7
  },
  uploadBtnView: {
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    marginBottom: 20
  },
  normalBorder: {
    borderColor: '#012275',
  },
  errorBorder: {
    borderColor: '#DC2626',
  },
  uploadImgView: {
    height: 24,
    width: 24,
    right: 10
  },
  btnText: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 22,
    color: '#012275'
  },
  addMoreDocView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  addMoreDocTxt: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.36,
    color: '#059669'
  },
  plusIconView: {
    height: 12,
    width: 12,
    left: 10
  },
  checkBoxContainerView: {
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: -7,
    zIndex: -1,
    color: '#011342'
  },
  rememberMe: {
    color: "#64748B",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 19.02,
    fontStyle: 'normal',
    marginRight: 30,
    marginLeft: 10
  },
  forgetAndRemb: {
    flexDirection: 'row',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 5
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
  upArrowImgView: {
    height: 8,
    width: 12,
    left: 10
  },
  downArrowImgView: {
    height: 24,
    width: 24,
    left: 10
  },
  docFileName: {
    color: "#475569",
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 7
  },
  viewOfDoc: {
    height: 'auto',
    backgroundColor: '#F3F6FA',
    borderRadius: 8,
    padding: 10
  },
  receipentView: {
    color: '#012275',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  emailTitle: {
    marginBottom: 5,
    marginTop: 5,
    color: '#475569',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 17,
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  bgInputView: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 10,
    includeFontPadding: true,
    height: 44,
    fontWeight: '400',
    lineHeight: 22,
    fontStyle: 'normal',
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: '#FFF'
  },
  recipantsBorder: {
    borderColor: '#CBD5E1',
  },
  recipantsErrorBorder: {
    borderColor: '#DC2626',
  },
  alsoARemoView: {
    color: "#000",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
    fontStyle: 'normal',
    marginTop: 12
  },
  checkboxCont: {
    flexDirection: 'row',
    marginTop: 10
  },
  marTop: {
    marginTop: 15
  },
  fieldsView: {
    padding: 16
  },
  viewOfPriority: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  alignItem: {
    alignItems: 'center',
    marginRight: 10,
    marginTop: 10
  },
  dotImgView: {
    height: 12,
    width: 12,
    marginRight: 5
  },
  priorityTextView: {
    color: "#64748B",
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 18
  },
  btnOnCalendarView: {
    height: 40,
    width: 94,
    borderWidth: 1.5,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30
  },
  selectedBtnView: {
    borderColor: "#012275",
    backgroundColor: "#012275"
  },
  selectedBtnText: {
    color: "#fff"
  },
  unselectedBtnView: {
    borderColor: "#334155",
  },
  unselectedBtnText: {
    color: "#334155"
  },
  btnTextView: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
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
  selectedFileView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3
  },
  fileIconView: {
    height: 20,
    width: 16,
    marginRight: 15
  },
  closeBlusIcon: {
    height: 14,
    width: 14,
    marginRight: 20
  },
  iconAnfNameView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20
  },
  errorTextView: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18,
    marginBottom: 10
  },
  loaderStyles: {
    justifyContent: 'center',
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(44, 44, 46, 0.6)',
    zIndex: 9999,
    opacity: 1
  },
  otherButtonModelView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(44, 44, 46, 0.4)',
    paddingBottom: 30,
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
  arrowUpDownView: {
    marginRight: 10,
    height:24,
    width:24,
    resizeMode:'contain'
  },
  calendarImg: {
    marginRight: 8,
    height:24,
    width:24,
    resizeMode:'contain'
  },
  marBottom: {
    marginBottom: 200
  },
  bgMobileZeroStepInput: {
    fontSize: 14,
    marginBottom: 5,
    marginTop: 8,
    includeFontPadding: true,
    height: 44,
    fontWeight: '400',
    lineHeight: 22,
    fontStyle: 'normal',
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'solid',
    flexDirection: "row",
    textAlign: "left",
    paddingLeft: 10,
    paddingBottom: 10,
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
  bgMobileInputForNumber: {
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
  confirmationMsgView: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 26.6,
    textAlign: 'left'
  },

});
// Customizable Area End
