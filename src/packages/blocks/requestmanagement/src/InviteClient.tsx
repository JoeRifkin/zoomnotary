import React from "react";

// Customizable Area Start
import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Keyboard,
    ActivityIndicator
} from "react-native";
import { GenericHeader } from "../../../components/src/GenericHeader";
import {
    imgBackArrow,
    downArrowBlackImg,
    imgDate,
    imgTime,
    imgClose
} from "./assets";
import Scale from "../../../components/src/Scale";
import Icon from 'react-native-vector-icons/FontAwesome';
import { GenericDropDownInput } from "../../../components/src/GenericDropDownInput";
import DatePicker from 'react-native-date-picker'
const nextDay = new Date();
const today = new Date();
nextDay.setDate(today.getDate() + 1);
const todayString = nextDay.toISOString().split('T')[0];

const thirtyDaysFromNow = new Date(today);
thirtyDaysFromNow.setDate(today.getDate() + 30);
const thirtyDaysFromNowString = thirtyDaysFromNow.toISOString().split('T')[0];

const currencyList = [{ value: "£", label: "£" }]

// Customizable Area End

import InviteClientController, {
    configJSON,
    Props,
} from "./InviteClientController";
import { GenericCustomModel } from "../../../components/src/GenericCustomModel";
import { Calendar } from "react-native-calendars";
import CustomLoader from "../../../components/src/CustomLoader";
import { Dropdown } from "react-native-element-dropdown";
import { imgCheckbox, upArroImg } from "../../../blocks/dashboard/src/assets";
import { GenericSucessView } from "../../../components/src/GenericSucessView";
import { GenericButton } from "../../../components/src/GenericButton";
export default class InviteClient extends InviteClientController {

    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    renderModal = () => {
        return (
            <GenericCustomModel
                visible={this.state.onModalOpen}
                height={'auto'}
                width={337}>
                <View>
                    <View style={styles.warningIcon}>
                        <Text style={styles.exclamation}>!</Text>
                    </View>
                    <Text style={styles.modalTitle}>
                        {`Client is not registered\n Please register and try again`}
                    </Text>

                    <GenericButton
                        testID={"onclickYesCancelID"}
                        btnProps={{ ...this.onCancelRequestBtnProps }}
                        btnDisable={true}
                        btnTextLabel={'OK'}
                        filledBtn={true}
                    />

                </View>
            </GenericCustomModel>
        )
    }

    renderTitleAndDescriptionOfDropdown = (title: string, description: string) => {
        return (
            <View>
                <Text style={styles.label}>{title}
                    <View>
                        <Text style={styles.astrickSign}>*</Text>
                    </View>
                </Text>
                <Text style={styles.label2}>{description}</Text>
            </View>
        )
    }

    renderViewMethodOfNotrazation = () => {
        return (
            <View>
                <Dropdown
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    style={[styles.inputView, styles[this.getStyleOfTextBox(this.state.isAllFieldValidate && this.state.selectedNotarisation === null)]]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    onChange={(item: any) => this.txtInputdNotarisationPrpos(item)}
                    testID="methodOfNotarisationID"
                    onFocus={this.openCloseDropdown}
                    onBlur={this.closeDropDownOfNotarization}
                    value={(this.state.selectedNotarisation && this.state.selectedNotarisation.value) ? this.state.selectedNotarisation.value : ''}
                    placeholder={!this.state.selectedNotarisation ? 'Method of Notarisation' : '...'}
                    data={this.state.notrizationList}
                    renderRightIcon={() => this.renderRightIcon(this.state.isDropdownOpen)}
                />
                {(this.state.isAllFieldValidate && this.state.selectedNotarisation === null) && <Text style={styles.errorTextView}>{configJSON.notarisationErrorTxt}</Text>}
            </View>
        )
    }

    renderErrorText = (errorMessageKey: string, stateVariable: string, testID: string) => {
        return (stateVariable === null) && (
            <Text testID={testID} style={styles.errorTextView}>
                {errorMessageKey}
            </Text>
        );
    }

    renderServicesDropdownView = () => {
        return (
            <View>

                <Dropdown
                    maxHeight={300}
                    style={[
                        styles.inputView,
                        styles[this.getStyleOfTextBox(this.state.isAllFieldValidate && this.state.selectedService === null)]
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    labelField="label"
                    valueField="value"
                    value={(this.state.selectedService && this.state.selectedService.value) ? this.state.selectedService.value : ''}
                    placeholder={!this.state.selectedService ? 'Type of Notary Services' : '...'}
                    data={this.state.servicesList}
                    testID="serviceListId1"
                    onChange={(item: any) => this.txtInputServicesPrpos(item)}
                    onFocus={this.openServicesDropdown}
                    onBlur={this.closeDropDownOfServices}
                    renderRightIcon={() => this.renderRightIcon(this.state.isServiceDropdownOpen)}
                />
                {(this.state.isAllFieldValidate && this.state.selectedService === null) && <Text style={styles.errorTextView}>{configJSON.servicesErrorTxt}</Text>}

            </View>
        )
    }

    renderMobileNumber = () => {
        return (
            <View>
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
                            onChange={(item: any) => this.txtInputCountryCodePrpos(item?.value)}
                            onFocus={this.openDropdownOfBirth}
                            onBlur={this.closeDropDownOfBirth}
                            renderRightIcon={() => this.renderRightIcon(this.state.isBirthDropDownOpen)}
                        />
                    </View>
                    <TextInput
                        testID={"txtInputPhoneNumber"}
                        value={this.state.mobileNumber}
                        onChangeText={(mobileNumber) => this.setState({ mobileNumber })}
                        style={[styles.bgMobileInputForNumber, styles.numberView, styles[this.getStyleOfTextBox(this.state.isAllFieldValidate && (this.isStringNullOrBlank(this.state.mobileNumber) || this.checkValidMobileNumber()))]]}
                        // style={[styles.bgMobileInput, styles.numberView, styles.textFieldBg]}
                        placeholder={'Mobile number'}
                        maxLength={12}
                        keyboardType={"phone-pad"}
                        textContentType="telephoneNumber"
                    />

                </View>
                {(this.state.isAllFieldValidate && (this.isStringNullOrBlank(this.state.mobileNumber) || this.checkValidMobileNumber())) && <Text style={styles.errorTextView}>{configJSON.mobileErrorTxt}</Text>}

            </View>
        )
    }

    renderRightIcon = (isDropdownOpen: boolean) => (
        <View>
            <Image style={isDropdownOpen ? styles.arrowUpDownView : styles.downArrowView} source={isDropdownOpen ? upArroImg : downArrowBlackImg} />
        </View>
    );

    renderNameUI = () => {
        return (
            <View>
                {this.renderTitleAndDescriptionOfDropdown(configJSON.clientNameTitle, configJSON.clientNameDes)}  
                <TextInput
                    style={[styles.inputView, styles[this.getStyleOfTextBox(this.state.isAllFieldValidate && this.isStringNullOrBlank(this.state.name))]]}
                    testID="InputNameTestID"
                    placeholder="Enter client’s first & last name"
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                />
                {(this.state.isAllFieldValidate && this.isStringNullOrBlank(this.state.name)) && <Text style={styles.errorTextView}>{configJSON.nameErrorTxt}</Text>}
            </View>
        )
    }

    renderEmailUI = () => {
        return (
            <View>
                {this.renderTitleAndDescriptionOfDropdown(configJSON.clientEmailTitle, configJSON.clientEmailDes)}
                
                <TextInput
                    testID="InputEmailTestID"
                    style={[styles.inputView, styles[this.getStyleOfTextBox(this.state.isAllFieldValidate && (this.isStringNullOrBlank(this.state.email) || !this.isValidRecipientEmail(this.state.email)))]]}
                    placeholder="Enter client’s email address"
                    keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                />
                {(this.state.isAllFieldValidate && (this.isStringNullOrBlank(this.state.email) || !this.isValidRecipientEmail(this.state.email))) && <Text style={styles.errorTextView}>{configJSON.emailErrorTxt}</Text>}
            </View>
        )
    }

    renderMobileUI = () => {
        return (
            <View>
                {this.renderTitleAndDescriptionOfDropdown(configJSON.clientMobileTitle, configJSON.clientMobileDes)}
                {this.renderMobileNumber()}
            </View>
        )
    }

    renderServiceUI = () => {
        return (
            <View>
                {this.renderTitleAndDescriptionOfDropdown(configJSON.servicesTitle, configJSON.servicesDes)}
                {this.renderServicesDropdownView()}
            </View>
        )
    }

    renderNotrazisationUI = () => {
        return (
            <View>
                {this.renderTitleAndDescriptionOfDropdown(configJSON.notarisationTitle, configJSON.notarisationDes)}
                {this.renderViewMethodOfNotrazation()}
            </View>
        )
    }

    renderFeesUI = () => {
        return (
            <View>
                {this.renderTitleAndDescriptionOfDropdown(configJSON.mobileTitle, configJSON.mobileDes)}
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
                        style={[styles.bgInput, styles.numberView, styles[this.getStyleOfTextBox(this.state.isAllFieldValidate && this.state.fees === '')]]}
                        placeholder={'Fees'}
                        value={this.state.fees}
                        maxLength={12}
                        keyboardType={"phone-pad"}
                        textContentType="telephoneNumber"
                        placeholderTextColor="#64748B"
                        {...this.txtInputFeesProps}
                    />
                </View>
                {(this.state.isAllFieldValidate && this.state.fees === '') && <Text style={styles.errorTextView}>{configJSON.feesErrorTxt}</Text>}
            </View>
        )
    }

    renderDateUI = () => {
        return (
            <View>
                {this.renderTitleAndDescriptionOfDropdown(configJSON.dateTitle, configJSON.dateDes)}
                <View style={styles.bgPasswordContainerForCal}>
                    <TextInput
                        testID={"dataAndTimeId"}
                        style={[styles.bgMobileInputForDataTimeForCal, styles[this.renderStyleOfDataTImeFieldAccordingToOS()], styles.bgPasswordInput, styles[this.getStyleOfTextBox(this.state.isAllFieldValidate && this.state.selectedDay === '')]]}
                        placeholder={'Date & Time'}
                        value={this.state.selectedDay !== '' ? this.formatDate(this.state.selectedDay) : ''}
                        onFocus={() => this.getCalendarModalOpen()}
                    />
                    <TouchableOpacity
                        testID={'calendarIconId'}
                        style={styles.passwordShowHide}
                        {...this.btnOpenCalendarProps}
                    >
                        <Image
                            source={imgDate}
                            style={styles.calendarImg}
                        />
                    </TouchableOpacity>

                </View>
                {(this.state.isAllFieldValidate && this.state.selectedDay === '') && <Text style={styles.errorTextView}>{configJSON.dateErrorTxt}</Text>}

            </View>
        )
    }

    renderTimeUI = () => {
        return (
            <View>
                <View style={styles.mobileFieldView}>
                    <View style={[styles.bgPasswordContainer, styles.timeFieldWidth]}>
                        <TextInput
                            testID={"startTImeId"}
                            style={[styles.bgMobileInputForDataTime, styles[this.renderStyleOfDataTImeFieldAccordingToOS()], styles.bgPasswordInput, styles[this.getStyleOfTextBox(this.state.isAllFieldValidate && this.state.selectedStartTimeTxt === "")]]}
                            placeholder={configJSON.startTimePlaceholder}
                            value={this.state.selectedStartTimeTxt}
                            editable={false}
                            placeholderTextColor="#64748B"
                            onFocus={() => {
                                Keyboard.dismiss();
                                this.getTimeSelectionModalOpen('Start Time')
                            }
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
                            style={[styles.bgMobileInputForDataTime, styles[this.renderStyleOfDataTImeFieldAccordingToOS()], styles.bgPasswordInput, styles[this.getStyleOfTextBox(this.state.isAllFieldValidate && this.state.selectedEndTimeTxt === "")]]}
                            placeholder={configJSON.endTimePlaceholder}
                            value={this.state.selectedEndTimeTxt}
                            placeholderTextColor="#64748B"
                            onFocus={() => {
                                Keyboard.dismiss()
                                this.getTimeSelectionModalOpen('End Time')
                            }
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

                {this.state.isAllFieldValidate && (this.state.selectedStartTimeTxt === "" || this.state.selectedEndTimeTxt === "") && (
                    <Text style={styles.errorTextView}>
                        {configJSON.timeErrorTxt}
                    </Text>
                )}
                {(this.state.isAllFieldValidate && this.checkTimeDifferenceErrorMsg()) && (
                    <Text style={styles.errorTextView}>
                        {'Start time must be less than end time.'}
                    </Text>
                )}
            </View>
        )
    }

    renderCheckBoxUI = () => {
        return (
            <View>
                <View style={styles.textContainer}>
                    <TouchableOpacity {...this.btnFirstCheckBoxProps} style={styles.checkboxContainer} testID={"firstCustomCheckBoxID"}>
                        <View style={[styles.checkbox, this.CustomCheckBoxFirstProps.isChecked && styles.checked]}>
                            {this.CustomCheckBoxFirstProps.isChecked && <Icon name="check" size={16} color="#fff" />}
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.checkboxLabel4}>Video call required</Text>
                    {this.showAstrickForVide() &&
                        <View>
                            <Text style={[styles.marginLeftOfAstrick]}>*</Text>
                        </View>
                    }
                </View>
                {(this.state.isAllFieldValidate && (!this.state.checkedFirstBox) && this.showAstrickForVide()) && (
                    <Text style={styles.errorTextView}>
                        {configJSON.errorMsgOfVideoCallReq}
                    </Text>
                )}
                <Text style={styles.desOfVideoCall}>I understand that I am requesting remote digital notarisation. I will
                    need to have audio/video capability for the actual signing.</Text>
            </View>
        )
    }

    renderMessageUI = () => {
        return (
            <View>
                <Text style={styles.label4}>Add message (Optional)</Text>
                <Text style={styles.subText}>
                    You can leave special instructions or additional information.
                </Text>
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    maxLength={500}
                    testID={"addMessageID"}
                    style={[styles.textAreaView]}
                    textAlignVertical="top"
                    placeholder={'Add Message'}
                    placeholderTextColor="#64748B"
                    value={this.state.additionalMessage}
                    {...this.txtInputAddMessageProps}
                />
            </View>
        )
    }

    renderFeesCheckBoxUI = () => {
        return (
            <View>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity {...this.btnFirstCheckfeesProps} style={styles.checkboxContainer} testID={"firstFeesCheckBoxID"}>
                        <View style={[styles.checkbox, this.CustomCheckBoxfeesProps.isCheckedFees && styles.checked]}>
                            {this.CustomCheckBoxfeesProps.isCheckedFees && <Icon name="check" size={16} color="#fff" />}
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginLeft: Scale(15) }}>Including platform fees</Text>
                </View>
                <Text style={styles.label5}>tick the checkbox if your fees includes platform fees</Text>
            </View>
        )
    }

    renderInviteDetail = () => {
        return (
            <View style={styles.nameContainer}>
                <View style={{ flexDirection: "column", justifyContent: "space-between" }} >
                    {this.renderNameUI()}
                    {this.renderEmailUI()}

                    {this.renderMobileUI()}
                    {this.renderServiceUI()}
                    {this.renderNotrazisationUI()}

                    {this.renderFeesUI()}

                    {this.renderFeesCheckBoxUI()}

                </View>

                {this.renderDateUI()}

                <GenericCustomModel
                    height={'auto'}
                    visible={this.state.isModelOpen}
                    onClose={() => this.closeCalendarModel()}
                    width={337}>
                    <Calendar
                        minDate={todayString}
                        maxDate={thirtyDaysFromNowString}
                        markedDates={this.state.markedDates}
                        markingType={'custom'}
                        hideExtraDays={true}
                        testID="calendarSelectDataID"
                        firstDay={1}
                        onDayPress={selectDay => {
                            this.handleDateSelect(selectDay.dateString)
                        }}
                        onMonthChange={(date) => this.handleMonthChange(date.dateString)}
                    />


                    <View style={styles.btnView}>
                        <View style={styles.btnViewWid}>
                            <TouchableOpacity
                                testID={"btnNoToProceed"}
                                style={[styles.blankBtn]}
                                {...this.noToChanges}>
                                <Text style={[styles.loginBtnTextView, styles.blankBtnText]}>{'Cancel'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btnVieefYes}>
                            <TouchableOpacity
                                testID={"btnYesProceed"}
                                disabled={!this.getButtonEnabled()} // Disable button dynamically

                                style={[styles.viewOfBtn, this.getButtonEnabled() ? styles.filledBtn : styles.btnDisableView]}
                                {...this.yesProceedToChanges}>
                                <Text style={[styles.loginBtnTextView, styles.filledBtnViewText]}>{'Save'}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <CustomLoader loader={this.state.isLoader} />
                </GenericCustomModel>

                {this.renderTimeUI()}

                {this.renderCheckBoxUI()}

                {this.renderMessageUI()}

                <GenericButton
                    testID={"InviteClientTestId"}
                    btnProps={{ ...this.validateFormProps }}
                    btnDisable={!this.isInvalidForm()}
                    btnTextLabel={'Send Invite'}
                    filledBtn={true}
                />

                <TouchableOpacity style={styles.cancelButton} {...this.btnDashboardRedirect}>
                    <View style={styles.bottomBorder}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </View>
                </TouchableOpacity>
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
                        <TouchableOpacity {...this.noToChangesTimeSelection}>
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
                            {this.state.selectedStartTimeTxt ? <Text style={styles.timeValue}>{this.state.selectedStartTimeTxt}</Text>
                                : <Text style={styles.timeValuenot}>{"-- -- --"}</Text>}
                        </View>
                        <View style={styles.timetxtView}>
                            <Text style={styles.timeTxt}>{configJSON.endTimePlaceholder}</Text>
                            {this.state.selectedEndTimeTxt ? <Text style={styles.timeValue}>{this.state.selectedEndTimeTxt}</Text>
                                : <Text style={styles.timeValuenot}>{"-- -- --"}</Text>}
                        </View>
                    </View>
                    <View style={styles.btnView}>
                        <View style={styles.btnViewWid}>
                            <TouchableOpacity
                                testID={"btnNoToProceed"}
                                style={[styles.blankBtn]}
                                {...this.noToChangesTimeSelection}>
                                <Text style={[styles.loginBtnText, styles.blankBtnText]}>{'Cancel'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btnViewWidofYes}>
                            <TouchableOpacity
                                testID={"btnYesProceed"}
                                style={[styles.viewOfBtn, this.getButtonEnabledForTimeSave() ? styles.filledBtn : styles.btnDisableView]}
                                {...this.yesProceedToChangesTimeSelection}>
                                <Text style={[styles.loginBtnText, styles.filledBtnText]}>{'Next'}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </GenericCustomModel>
            </View>
        )
    }
    // Customizable Area End

    render() {
        // Customizable Area Start
        return (

            <KeyboardAvoidingView
                behavior={this.isPlatformiOS() ? "padding" : undefined}
                style={{ flex: 1 }}>
                {this.state.isNewRequestCreated ?

                    <View>
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
                    </View> :
                    <View>
                        <GenericHeader
                            labelTitle={configJSON.inviteClientText}
                            imgBackArrow={imgBackArrow}
                            btnGoBack={{ ...this.btnGoBack }}
                            testID={"btnbackArrowOnSucess"}
                            isOtherMsg={true}
                        />
                    </View>
                }
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    ref={this.scrollViewRef}
                >
                    <View style={styles.fieldsView}>
                        {this.renderInviteDetail()}
                        {this.renderModal()}
                        {this.renderTimeSelectionModel()}
                    </View>
                    {this.state.isLoader && <View style={styles.loaderStyles}>
                        <ActivityIndicator size="large" color="#012275" />
                    </View>}
                </ScrollView>

            </KeyboardAvoidingView>
        );
        // Customizable Area End
    }
};

// Customizable Area Start
const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        marginBottom: 5,
        fontWeight: 'bold',
        lineHeight: 22,
        color: '#000'
    },
    container: {
        flex: 1,
        backgroundColor: "#ffffffff",
    },
    fieldsView: {
        padding: 16
    },
    label2: {
        color: "#64748B",
        marginBottom: 8,
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 18,
    },
    label3: {
        color: "#64748B",
        marginBottom: 5,
        width: Scale(340)
    },
    label5: {
        color: "#64748B",
        width: Scale(340),
        bottom: 10,
        marginLeft: Scale(40)
    },
    contentContainer: {
        paddingBottom: 30,
    },
    nameContainer: {
        top: 20,
        // left: 20,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    inputView: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        height: Scale(44),
        color: "black",
    },
    input2: {
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
        // width: Scale(250),
        height: Scale(44),
        marginLeft: Scale(10),
        backgroundColor: '#F8FAFC'
    },
    nameText: {
        fontWeight: '400',
        fontSize: 16
    },
    nameText2: {
        color: "#64748B"
    },
    nameMainContainer: {
        flexDirection: "row",
        justifyContent: "center",
        top: Scale(5),
        height: Scale(44),
        width: Scale(327),
        backgroundColor: "red",
        paddingHorizontal: Scale(14),
        paddingVertical: Scale(12)
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkboxLabel10: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    textContainer: {
        flex: 1,
        marginTop: Scale(10),
        flexDirection: "row"
    },
    checkboxLabel4: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        marginLeft: Scale(10),
    },
    marginLeftOfAstrick: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        paddingLeft: 5,
        color: '#DC2626',
    },
    subText: {
        fontSize: 14,
        color: '#666',
        width: Scale(330),
        marginTop: Scale(10)
    },
    label4: {
        fontSize: 16,
        marginTop: Scale(15),
        fontWeight: 'bold',
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        height: 80,
        marginTop: Scale(10),
        textAlignVertical: 'top',
        width: Scale(355)
    },
    submitButton: {
        backgroundColor: '#012275',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Scale(25),
        height: 44
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        alignItems: 'center',
        marginTop: Scale(20),
        marginBottom: Scale(20),
    },
    cancelButtonText: {
        color: '#012275',
        fontSize: 16,
        fontWeight: 'bold',
    },
    alignItem: {
        marginRight: 10,
        marginTop: 10,
        alignItems: 'center',
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
    btnVieefYes: {
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
    filledBtnViewText: {
        color: '#fff',
    },
    blankBtnText: {
        color: '#012275',
    },
    loginBtnTextView: {
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 24,
        fontSize: 16,
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
        marginBottom: 15
    },
    mobileFieldView: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginBottom: 10
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
        marginRight: 10,
        height: 24,
        width: 24,
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
    bgMobileInput: {
        flexDirection: "row",
        fontSize: 14,
        textAlign: "left",
        marginBottom: 8,
        width: Scale(350),

        marginTop: 8,
        includeFontPadding: true,
        paddingLeft: 10,
        height: 44,
        fontWeight: '500',
        lineHeight: 16.94,
        alignItems: 'center',
        borderWidth: 1,
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
    calendarImg: {
        height: 24,
        width: 24,
        resizeMode: 'contain'
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
    bgPasswordContainer: {
        flexDirection: "row",
    },
    passwordShowHide: {
        alignSelf: "center",
        position: 'absolute',
        right: 16,
        paddingTop: 7
    },
    warningIcon: {
        backgroundColor: '#FFE2C2',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    exclamation: {
        color: '#FF8C00',
        fontSize: 32,
        fontWeight: 'bold',
    },
    modalTitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '600',
        color: '#333',
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
    marTopNon: {},
    topMar: {
        marginTop: 14
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
    desOfVideoCall: {
        color: '#64748B',
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 18.2,
        marginLeft: 30,
        marginBottom: 10
    },
    timeFieldWidth: {
        width: '48%'
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
    marLeft: {
        marginLeft: 15
    },
    bgPasswordInput: {
        flex: 1,
        textAlign: 'left'
    },
    closeIconView: {
        height: 24,
        width: 24
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
    filledBtnText: {
        color: '#fff',
    },
    loginBtnText: {
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 24
    },
    btnViewWidofYes: {
        width: '46%',
        marginLeft: 15
    },
    bgPasswordContainerForCal: {
        flexDirection: "row",
        borderRadius: 8,
    },
    bgMobileInputForDataTimeForCal: {
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
    bottomBorder: {
        borderBottomWidth: 2,
        borderBottomColor: '#012275'
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
