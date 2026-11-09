import React from "react";

// Customizable Area Start
import {
  ScrollView,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacityProps
} from "react-native";

import { GenericHeader } from "../../../components/src/GenericHeader";
import {
  imgBackArrow,
  imgUnChecked,
  imgChecked,
  imgSucessIcon
} from "./assets";
import Icon from 'react-native-vector-icons/FontAwesome';
import { GenericButton } from "../../../components/src/GenericButton";
import { GenericDocSelectionModel } from "../../../components/src/GenericDocSelectionModel";
// Customizable Area End

import VatSalesTaxController, {
  Props,
  configJSON,
} from "./VatSalesTaxController";

export default class VatSalesTax extends VatSalesTaxController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  renderVatDetails = () => {
    if (!this.state.showVatUpdatedValue) return null;

    return (
      <View>
        <View>
          
          <Text style={styles.txtboxLableView}>{configJSON.vATInformation}</Text>
          <Text style={styles.updatedLabelTxt}>
            {this.state.selectedRadioBtn === 'have' ? configJSON.ihaveVat : configJSON.idonthaveVat}
          </Text>
          {this.state.selectedRadioBtn === 'have' && (
            <Text style={styles.txtboxLableView}>{`${configJSON.VatNumber} ${this.state.VatNumber}`}</Text>
          )}
        </View>

        <View style={styles.editDetailBtn}>
          <GenericButton
            testID={"btnaddDetail"}
            btnProps={{ ...this.btnEditDetailsProps }}
            btnDisable={true}
            btnTextLabel={configJSON.editDetails}
            filledBtn={true}
          />
        </View>
      </View>
    );
  };


  renderCheckBoxSection = () => (
    <View>
      <View style={styles.checkBoxContainerView}>
        <TouchableOpacity
          {...this.btnCheckBoxOnVatTaxProps}
          style={styles.checkboxContainer}
          testID={"includingPlatformFees"}
        >
          <View style={[styles.checkbox, this.checkBoxOnVatTaxProps.isChecked && styles.checked]}>
            {this.checkBoxOnVatTaxProps.isChecked && <Icon name="check" size={16} color="#fff" />}
          </View>
        </TouchableOpacity>
        <Text testID={"btnIncludePlatFrom"} style={styles.rememberMe} {...this.btnCheckBoxOnVatTaxProps}>
          {configJSON.checkBoxForVatDetail}
        </Text>
      </View>

      <View style={styles.editDetailBtn}>
        <GenericButton
          testID={"btnaddDetail"}
          btnProps={{ ...this.btnAddDetailsProps }}
          btnDisable={this.state.isCheckBoxOnVatTax}
          btnTextLabel={configJSON.addDetails}
          filledBtn={true}
        />
        <GenericButton
          testID={"btnCancel"}
          btnProps={{ ...this.btnCancelProps }}
          btnDisable={true}
          btnTextLabel={configJSON.cancel}
          filledBtn={false}
        />
      </View>
    </View>
  );


  renderRadioSection = () => (
    <View>
      <View style={styles.radioAndTxtView}>
        {this.renderRadioOption(
          this.state.selectedRadioBtn === 'notHave',
          this.selectNotHaveRadio,
          configJSON.iDontHaveValueAdded
        )}
        {this.renderRadioOption(
          this.state.selectedRadioBtn === 'have',
          this.selectHaveRadio,
          configJSON.iHaveValueAdded
        )}
      </View>

      {this.state.selectedRadioBtn === 'have' && this.renderVatNumberInput()}

      <View style={this.state.selectedRadioBtn === 'have' ? styles.addMoreTrackingTab : styles.editDetailBtn}>
        <GenericButton
          testID={"btnsaveDetail"}
          btnProps={{ ...this.btnSaveDetailsProps }}
          btnDisable={this.isSaveDetailBtnEnable()}
          btnTextLabel={this.state.detailOfVatNumber !== null ? configJSON.modify : configJSON.saveDetails}
          filledBtn={true}
        />
        <GenericButton
          testID={"btnCancel"}
          btnProps={{ ...this.btnCancelProps }}
          btnDisable={true}
          btnTextLabel={configJSON.cancel}
          filledBtn={false}
        />
      </View>
    </View>
  );

  renderRadioOption = (isSelected: boolean, selectRadioProps: TouchableOpacityProps, labelText: string) => (
    <TouchableOpacity style={styles.radioAndTxt} {...selectRadioProps}>
      <Image style={styles.radioBtnImg} source={isSelected ? imgChecked : imgUnChecked} />
      <Text style={styles.radioLabelTxt}>{labelText}</Text>
    </TouchableOpacity>
  );

  renderVatNumberInput = () => (
    <View>
      <Text style={styles.txtboxLableView}>{configJSON.textFieldLabel}</Text>
      <TextInput
        testID={"txtInputVat"}
        style={[styles.bgInput]}
        placeholder={configJSON.textFieldPlaceholder}
        value={this.state.VatNumber}
        maxLength={14}
        placeholderTextColor={"#64748B"}
        {...this.txtInputVaTNumberProps}
      />
      {this.showErrorMsgForVatNumber() && (
        <Text testID="errorPhoneNumberText" style={styles.errorTextView}>
          {configJSON.vatMinValueErrorMsg}
        </Text>
      )}

      {(this.state.errorMessage !== '' && !this.state.isValidateField) && (
        <Text testID="errorPhoneNumberText" style={styles.errorTextView}>
          {this.state.errorMessage}
        </Text>
      )}
    </View>
  );

  renderSuccessModel = () => (
    <GenericDocSelectionModel
      visible={this.state.isSucessMsgModel}
      onClose={this.closeSucessMsgModel}
      height={42}
      hasBackdrop={false}
      coverScreen={false}
      width={"auto"}
      buttonModelView={styles.sucessModel}
      isModelView={false}
    >
      <View style={[styles.sucessChangesView]}>
        <Image style={styles.sucessImg} source={imgSucessIcon} />
        <Text style={styles.changesSavedTxt}>{configJSON.sucessMsg}</Text>
      </View>
    </GenericDocSelectionModel>
  );

  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <View>
            <GenericHeader
              labelTitle={configJSON.vatSalesTax}
              imgBackArrow={imgBackArrow}
              btnGoBack={{ ...this.btnGoBack }}
              testID={"btnbackArrow"}
              isOtherMsg={true}
            />

            <View style={styles.fieldView}>
              <Text style={styles.headingTxt}>{configJSON.valueAddedTaxVAT}</Text>
              <Text style={styles.detailTxt}>{configJSON.vatValueDetail}</Text>
              {this.renderVatDetails()}

              {this.state.isShowCheckBox && this.renderCheckBoxSection()}

              {!this.state.isShowCheckBox && !this.state.showVatUpdatedValue && this.renderRadioSection()}

              {this.renderSuccessModel()}
            </View>
          </View>

        </TouchableWithoutFeedback>
      </ScrollView>
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
  fieldView: {
    padding: 24
  },
  headingTxt: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 30,
    marginBottom: 7
  },
  detailTxt: {
    color: '#334155',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19.6
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
    color: "#334155",
    fontWeight: "400",
    alignSelf: 'center',
    fontSize: 12,
    lineHeight: 18,
    paddingRight: 34
  },
  checkboxContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#012275',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginLeft: 8,
    marginTop: 4
  },
  checked: {
    backgroundColor: '#012275',
    borderColor: '#012275',
  },
  addMoreTrackingTab: {
    marginTop: (Dimensions.get('screen').height / 3.5) - 10,
  },
  editDetailBtn: {
    marginTop: (Dimensions.get('screen').height / 2.5) - 10,
  },
  radioBtnImg: {
    height: 20,
    width: 20
  },
  radioLabelTxt: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 10
  },
  radioAndTxt: {
    flexDirection: 'row',
    height: 30,
    // justifyContent: 'flex-start',
    marginTop: 15,
    alignItems: 'center'
  },
  radioAndTxtView: {
    flexDirection: 'column',
  },
  txtboxLableView: {
    color: '#1E293B',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 15,
    marginBottom: 5
  },
  bgInput: {
    flexDirection: "row",
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    textAlign: "left",
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 8,
    includeFontPadding: true,
    padding: 10,
    height: 44,
    color: '#64748B',
    backgroundColor: "#F8FAFC",
    borderColor: "#CBD5E1",
  },
  errorTextView: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18,
    marginBottom: 10,
    marginTop: 10
  },

  updatedLabelTxt: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
  },
  sucessModel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(44, 44, 46, 0.4)',
    paddingBottom: 60,
  },
  sucessChangesView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  sucessImg: {
    height: 21,
    width: 21,
    marginRight: 8
  },
  changesSavedTxt: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24
  },

});
// Customizable Area End
