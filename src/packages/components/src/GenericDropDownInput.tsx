import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export const GenericDropDownInput = (props: any) => {
  const {
    labelName,
    isAstrick,
    isValidateField,
    placeholder,
    value,
    nameError,
    txtInputNamePrpos,
    testID,
    dropdownOptions,
    labelStyle,
    isNewField
  } = props;
  const [selectedValue, setSelectedValue] = useState(value);

  const selectOption = (selectedValue: string) => {
    txtInputNamePrpos(selectedValue);
    setSelectedValue(selectedValue);
  };

  const renderError = (error: string) => {
    return <Text style={styles.errorTextView}>{error}</Text>;
  };

  const isStringNullOrBlank = (str: string) => {
    return str === null || str.length === 0;
  }
  return (
    <View>
      {labelStyle === undefined && <Text style={labelStyle ? labelStyle :styles.emailTitle}>
        {labelName}
        {isAstrick && (
          <View>
            <Text style={styles.astrickSign}>*</Text>
          </View>
        )}
      </Text> }
      <Dropdown
        maxHeight={200}
        style={[
          styles.bgMobileInput,
          isValidateField && (selectedValue === '' || selectedValue === null)
            ? styles.errorOfField
            : isNewField ? styles.newTextBg :styles.textFieldBg,
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        labelField="value"
        valueField="value"
        value={selectedValue}
        placeholder={!selectedValue ? placeholder : '...'}
        data={dropdownOptions}
        onChange={(item: any) => selectOption(item.value)}
      />
      {(isValidateField && isStringNullOrBlank(selectedValue)) && renderError(nameError)}
    </View>
  );
};

const styles = StyleSheet.create({
  emailTitle: {
    marginTop: 10,
    color: '#334155',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 18,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  astrickSign: {
    color: '#DC2626',
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 18,
    paddingLeft: 5,
  },
  bgMobileInput: {
    fontSize: 14,
    textAlign: "left",
    marginTop: 5,
    includeFontPadding: true,
    paddingLeft: 13,
    height: 44,
    fontWeight: '400',
    lineHeight: 22,
    fontStyle: 'normal',
    borderRadius: 8,
    alignItems: 'center',
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
  textFieldBg: {
    backgroundColor: '#F1F5F9',
  },
  newTextBg: {
    borderColor: '#D1FAE5',
    backgroundColor: '#F8FAFC',
    borderWidth: 1
  },
  errorTextView: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18,
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
});
