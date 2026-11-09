import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
export const GenericNotaryServices = (props: any) => {
  const {
    servicesList,
    selectedService,
    isChecked,
    clickOnAllSelect,
    clickOnSelect
  } = props;

  const truncatedText = (text: string, charLength: number) => {
    if (text.length <= charLength) {
      return text;
    } else {
      const truncated = text.substring(0, charLength) + '...';
      return truncated;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.selectView, styles.heightOfSelectAllBox]}>
        <View>
          <Text style={[styles.selectAllView, styles.selectAllTitle]}>{'Select All'}</Text>
        </View>
        <View style={styles.allSelectView}>
          <TouchableOpacity onPress={clickOnAllSelect} style={styles.checkboxContainer} testID={"CustomCheckBox"}>
            <View style={[styles.checkbox, isChecked && styles.Allchecked]}>
              {isChecked && <Icon name="check" size={16} color="#fff" />}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {servicesList?.map((item: any, index: number) => {
        return (
          <View key={index} style={[styles.selectView, styles.heightOfListBox, (selectedService.includes(item?.attributes?.id) || isChecked) ? styles.selectedView : styles.unSelectedView]}>
            <View style={styles.listView}>
              <Text style={[styles.selectAllView, (selectedService.includes(item?.attributes?.id) || isChecked) ? styles.selectedTitleText : styles.unSelectedTitleText]}>{truncatedText(item?.attributes?.service_name, 40)}</Text>
              <View style={styles.allSelectView}>
                <TouchableOpacity onPress={() => clickOnSelect(item?.attributes?.id)} style={styles.checkboxContainer} testID={"CustomCheckBox"}>
                  <View style={[styles.checkbox, (selectedService.includes(item?.attributes?.id) || isChecked) && styles.checked]}>
                    {(selectedService.includes(item?.attributes?.id) || isChecked) && <Icon name="check" size={16} color="#012275" />}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={[styles.selectDesView, (selectedService.includes(item?.attributes?.id) || isChecked) ? styles.selectedDesText : styles.unSelectedDesText]}>{truncatedText(item?.attributes?.service_description, 105)}</Text>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  selectView: {
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
  },
  selectedView: {
    borderColor: '#012275',
    backgroundColor: '#012275'
  },
  unSelectedView: {
    borderColor: '#64748B',
  },
  heightOfSelectAllBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom:  12,
    paddingLeft: 8,
    paddingRight: 8,
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  heightOfListBox: {
    paddingTop: 12,
    paddingBottom:  12,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 20,
    justifyContent: 'center'
  },
  selectAllView: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 22,
  },
  selectAllTitle: {
    color: '#1E293B',
  },
  selectDesView: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 19.2,
  },
  selectedDesText: {
    color: '#CBD5E1'
  },
  unSelectedDesText: {
    color: '#64748B',
  },
  selectedTitleText: {
    color: '#F8FAFC'
  },
  unSelectedTitleText: {
    color: '#1E293B',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#012275',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8
  },
  checked: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },

  Allchecked: {
    backgroundColor: '#012275',
    borderColor: '#012275',
  },
  allSelectView: {

  }
})