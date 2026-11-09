import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  TextInput
} from "react-native";
import { GenericHeader } from "../../../components/src/GenericHeader";
import CustomButton from "../../../components/src/CustomButton";
import {
  imgBackArrow, imgModeNight, imgOnline, imgGrayMoon, imgUser,
  imgSetting, imgServices, imgFaqs, imgLogOut, imgPayment,
  searchIcon
} from "./assets";

export const confJSON = require("./config");
const menuItems = [
  { icon: imgUser, text: confJSON.myProfile, key: 'profile', users: ['end_user', "notary"] },
  { icon: imgPayment, text: confJSON.payment, key: 'pay', users: ['end_user'] },
  { icon: imgServices, text: confJSON.notaryServices, key: 'service', users: ["notary"] },
  { icon: imgPayment, text: confJSON.transactionHistory, key: 'pay', users: ['notary'] },

  { icon: imgSetting, text: confJSON.setting, key: 'setting', users: ['end_user', "notary"] },
  { icon: imgFaqs, text: confJSON.faqs, key: 'faq', users: ['end_user', "notary"] },
  { icon: imgFaqs, text: confJSON.TandC, key: 'tandc', users: ['end_user', "notary"] },
  { icon: imgFaqs, text: confJSON.privacyPolicy, key: 'pandp', users: ['end_user', 'notary'] }
];

interface FAQ {
  id: number;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
}

// Customizable Area End

import NavigationMenuController, {
  Props,
  configJSON,
} from "./NavigationMenuController";

export default class NavigationMenu extends NavigationMenuController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  menuItemRender = (item: any, index: number) => {
    return (
      <TouchableOpacity onPress={() => this.redirectToPage(item.key)} style={styles.viewOfMenu} key={index}>
        <Image source={item.icon} style={styles.menuIcon} />
        <Text style={styles.menuText}>{item.text}</Text>
      </TouchableOpacity>
    )
  };

  renderLogoutPopup = () => {
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={this.state.logoutModal}
        onRequestClose={this.toggleLogoutPopup} // Handle back button press for Android
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Are you sure you want to logout?</Text>

            <View style={styles.buttonContainer}>
              <View style={[styles.btn, styles.m15]}>
                <CustomButton
                  outlined
                  testID='yesProceed'
                  title={'Yes, Proceed'}
                  onPress={this.onSubmitLogout}
                />
              </View>
              <View style={styles.btn}>
                <CustomButton
                  testID='No'
                  title={'No'}
                  onPress={this.toggleLogoutPopup}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderSearchBox = () => {
    return (
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor={'#333'}
          value={this.state.searchQuery}
          {...this.onChangeTxtValueProps}
          testID="onChangeSearch"
        />
        <TouchableOpacity
          testID="searchIcon"
        >
          <Image style={styles.searchIcon} source={searchIcon} />
        </TouchableOpacity>
      </View>
    )
  }

  renderFaqsList = () => {
    return (
      <View>
        {this.state.filteredFAQsData.map((data: FAQ, indexNo: number) => (
          <View style={styles.mainView} key={indexNo}>
            <TouchableOpacity style={styles.queAndArrow} onPress={() => this.toggleQuestion(indexNo)} >
              <Text style={styles.quesTxt}>{data.question}</Text>
              <Image source={this.getSelectedFaqArroqImg(indexNo)} style={styles.imgView} />
            </TouchableOpacity>
            {this.getSelectedFaqsques(indexNo) && <View>
              <Text style={styles.ansText}>{data.answer}</Text>
            </View>}
          </View>
        ))}
      </View>
    )
  }

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
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}

          <View>
            {this.state.isFAQsPageOpen ?
              <View style={styles.container}>
                <GenericHeader
                  labelTitle={configJSON.faqs}
                  imgBackArrow={imgBackArrow}
                  btnGoBack={{ ...this.btnGoBackToMenuPage }}
                  testID={"btnbackArrow"}
                  isOtherMsg={true}
                />
                <View style={styles.faqFieldView}>
                  {this.renderSearchBox()}
                  {this.renderFaqsList()}
                  <View style={styles.belowDesView}>
                    <Text style={styles.anyQueryText}>{configJSON.anyQuery}</Text>
                    <View style={styles.viewOfMail}>
                      <Text style={styles.mailToView}>{configJSON.mailTO}</Text>
                      <TouchableOpacity {...this.handleEmailLink}>
                        <Text style={styles.mailIdView}>{'mail_id@gmail.com'}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View> :
              <View>
                {this.renderLogoutPopup()}
                <GenericHeader
                  imgBackArrow={imgBackArrow}
                  btnGoBack={{ ...this.btnGoBack }}
                  testID={"btnbackArrow"}
                  isOtherMsg={true}
                />

                <View style={styles.userProfileWrapper}>
                  {this.state.UserProfileDetail?.photo?.url !== null ?
                    <Image source={{ uri: this.state.UserProfileDetail?.photo?.url }} style={styles.userProfile} />
                    : <View style={[styles.userProfile, styles.bgColor]}>
                      <Text style={[styles.userFirstCharView]}>{this.state.UserProfileDetail.full_name?.charAt(0).toUpperCase()}</Text>
                    </View>
                  }
                  <Image source={this.state.isOnlineStatus ? imgGrayMoon : imgOnline} style={styles.borderImage} />
                </View>

                <View style={styles.setProfileView}>
                  <View style={styles.textView}>
                    <Text style={styles.yourSelfView}>{configJSON.setYourSelf}</Text>
                    <TouchableOpacity testID="tetIDChangeStatus" onPress={() => this.changeStatus()}>
                      <Text style={styles.onlineStatus}>{this.state.isOnlineStatus ? configJSON.online : configJSON.offline}</Text>
                    </TouchableOpacity>
                    <Image source={this.state.isOnlineStatus ? imgOnline : imgModeNight} style={styles.statusOnline} />
                  </View>
                </View>
                <View style={styles.borderLine} />
                <View style={styles.fieldView}>
                  {menuItems.map((item, index) => (
                    item.users.includes(this.state.getUserRole) && this.menuItemRender(item, index)
                  ))}
                  <TouchableOpacity
                    testID="logoutBtn"
                    onPress={this.toggleLogoutPopup}
                    style={styles.logOutView}>
                    <Image source={imgLogOut} style={styles.logoutIcon} />
                    <Text style={styles.logOutText}>{configJSON.logOut}</Text>
                  </TouchableOpacity>
                </View>
              </View>}

          </View>

          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  btn: {
    flex: .9,
    marginRight: 10
  },
  m15: {
    marginRight: 15
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '90%', // Adjust the width as necessary
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 25.6,
    marginTop: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',

  },
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  content: {
    flex: 1,
  },
  userProfileWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    position: 'relative',
  },
  userProfile: {
    height: 92,
    width: 92,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#012275'
  },
  bgColor: {
    backgroundColor: '#012275'
  },
  setProfileView: {
    padding: 16,
    marginTop: 10,
    justifyContent: 'center',
  },
  textView: {
    flexDirection: 'row'
  },
  yourSelfView: {
    color: '#334155',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24
  },
  onlineStatus: {
    color: '#012275',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24
  },
  statusOnline: {
    height: 18,
    width: 18,
    marginTop: 5
  },
  borderImage: {
    height: 18,
    width: 18,
    bottom: 22,
    left: 35
  },
  borderLine: {
    borderBottomColor: '#CBD5E1',
    borderBottomWidth: 1,
    marginTop: 10
  },
  fieldView: {
    padding: 16
  },
  viewOfMenu: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10
  },
  menuIcon: {
    height: 24,
    width: 24,
    marginRight: 10,
    bottom: 2
  },
  logoutIcon: {
    height: 24,
    width: 24,
    marginRight: 10
  },
  menuText: {
    color: '#334155',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19.36
  },
  logOutText: {
    color: '#DC2626',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24
  },
  logOutView: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20
  },
  userFirstCharView: {
    fontSize: 40,
    lineHeight: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingTop: 45
  },
  belowDesView: {
    marginTop: 20,
    flexDirection: 'column',
    marginBottom: 40
  },
  viewOfMail: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  anyQueryText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 22.4
  },
  mailToView: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22
  },
  mailIdView: {
    color: '#012275',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 16.94,
    borderBottomColor: '#012275',
    borderBottomWidth: 1.5
  },
  spinnerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 6,
    marginBottom: 10,
    borderRadius: 50,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 10,
    borderRadius: 50,
    color: '#64748b',
  },
  searchIcon: {
    marginRight: 20,
    width: 24,
    height: 24,
  },
  mainView: {
    flexDirection: 'column',
    borderBottomColor: '#E2E8F0',
    borderBottomWidth: 1,
    paddingVertical: 12
  },
  queAndArrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  quesTxt: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    width: "88%"
  },
  imgView: {
    height: 24,
    width: 24
  },
  ansText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    width: "88%",
    marginTop: 12
  },
  faqFieldView: {
    padding: 24
  },
});
// Customizable Area End
