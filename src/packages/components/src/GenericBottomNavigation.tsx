import MessageEnum from '../../framework/src/Messages/MessageEnum';
import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Dimensions, Platform, Alert } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const inactiveDashboard = require("../src/inactive-dashboard.png");
const activeDashboard = require("../src/active-dashboard.png");

const InActiveRequest = require("../src/inactive-requests.png");
const ActiveRequest = require("../src/active-requests.png");

const inactiveCatalogue = require("../src/inactive-catalogue.png");
const activeCatalogue = require("../src/active-catalogue.png");

const inactiveCaledar = require("../src/inactive-caledar.png");
const activeCaledar = require("../src/active-caledar.png");

interface MenuItem {
  id: number;
  icon: number;
  inActiveIcon: number;
  text: string;
  key: number
}


const end_user = [
  { id: 1, icon: activeDashboard, inActiveIcon: inactiveDashboard, text: 'Dashboard', key: MessageEnum.NavigationDashboardMessage, },
  { id: 2, icon: ActiveRequest, inActiveIcon: InActiveRequest, text: "Request", key: MessageEnum.NavigationSearchMessage, },
  { id: 3, icon: activeCatalogue, inActiveIcon: inactiveCatalogue, text: "Catalogue", key: MessageEnum.NavigationCatalogueMessage },
  { id: 4, icon: activeCaledar, inActiveIcon: inactiveCaledar, text: "Calendar", key: MessageEnum.NavigationCalendarMessage, }
]
const notary = [
  { id: 1, icon: activeDashboard, inActiveIcon: inactiveDashboard, text: 'Dashboard', key: MessageEnum.NavigationDashboardMessage, },
  { id: 2, icon: ActiveRequest, inActiveIcon: InActiveRequest, text: "Request", key: MessageEnum.NavigationSearchMessage, },
  { id: 4, icon: activeCaledar, inActiveIcon: inactiveCaledar, text: "Calendar", key: MessageEnum.NavigationCalendarMessage, }
]


interface Props {
  userType:  string;
  onChangeBottomTab: (key: number) => void;
  id: number;
  testID: string
}

export const GenericBottomNavigation = (props: Props) => {
  const insets = useSafeAreaInsets(); 

  const {
    userType,
    onChangeBottomTab
  } = props;

  const redirectToPage = (key: number, id: number) => {
    onChangeBottomTab(key)
  }

  const menus = userType == 'end_user' ? end_user : userType == 'notary' ? notary : []

  return (
    <View style={[styles.footer, { paddingBottom: insets.bottom ? insets.bottom || 20 :20}]}>
      <View style={styles.footerImages}>
        {menus?.map((item: MenuItem, index: number) => (
          <TouchableOpacity onPress={() => redirectToPage(item.key, item.id)} key={index} style={styles.imageContainer}>
            <Image source={props.id === item.id ? item.icon : item.inActiveIcon} style={styles.image} />
            <Text style={[styles.imageText, props.id == item.id && styles.selectedText]}>{(userType === 'notary' && item.text === 'Request') ? 'Requests' : item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {

    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0, 
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 10,
     top: Platform.OS === 'ios' ? Dimensions.get('window').height - 90 : Dimensions.get('window').height - 95,
   flexDirection: 'column',
  },
  footerImages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    marginTop: 20
  },
  imageText: {
    marginTop: 10,
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
    lineHeight: 12.1,
  },
  selectedText: {
    color: '#012275'
  }
})