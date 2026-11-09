import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import CustomHeader from "../../../components/src/CustomHeader";
import CustomLoader from "../../../components/src/CustomLoader";
import CustomButton from "../../../components/src/CustomButton";
import GenericCheckbox from "../../../components/src/GenericCheckbox";
import GenericSwitch from "../../../components/src/GenericSwitch";
import { Avatar } from "react-native-elements";
import { imgCloseIcon } from "./assets";

// Customizable Area End

import CalendarSyncController, { Props } from "./CalendarSyncController";

export default class CalendarSync extends CalendarSyncController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderAccountInfo = () => {
    return (
      <View style={styles.accountWrapper}>
        <View style={styles.headerRow}>
          <Text style={styles.loggedlabel}>Google Calendar</Text>
          <View style={[styles.row,styles.mr10]}>
            <Text style={styles.syncNow}>{this.state.isGoogleSyncOn ? 'Sync off ' : 'Sync on'}</Text>
            <GenericSwitch
              testID='isGoogleSyncOn'
              checked={this.state.isGoogleSyncOn}
              onChange={(checked: boolean) => this.onChange('isGoogleSyncOn',checked)}
            />
          </View>
        </View>
        <View style={styles.authenticatedAccount}>
          <View style={[styles.row,styles.alignStart]}>
            <Avatar
              rounded
              size={'small'}
              source={{
                uri: this.state.googleAuthDetails?.photo || ''
              }}
              containerStyle={styles.avatarContainer}
            />
            <View>
              <Text style={styles.accountEmail}>{this.state.googleAuthDetails?.email}</Text>
              <Text style={styles.authStatus}>Authenticated Account</Text>
            </View>
          </View>
          <TouchableOpacity
            testID="logoutGoogle"
            onPress={this.logoutGoogle}
            style={styles.row}>
            <Image source={imgCloseIcon} style={styles.closeIcon} />
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  googleSync = () => {
    return this.state.isGoogleSignedIn ? this.renderAccountInfo():
    <>
    <View style={styles.syncWrapper}>
      <View style={styles.lableHeader}>
        <Text style={styles.label}>Google Calendar</Text>
        <Text style={styles.subLabel}>(Two Way sync) </Text>
      </View>
      <View>
        <Text style={styles.description}>You need to authenticate your Google account to sync
          your Google calendar here.
          On clicking ‘ Authenticate Google’ you will be redirected to your Google Account page.</Text>
      </View>
      <View style={styles.termsWrapper}>
        <GenericCheckbox
          testID='isGoogleCheckedId'
          checked={this.state.isGoogleChecked}
          onChange={(checked: boolean) => this.onChange('isGoogleChecked',checked)}
          />
        <Text style={styles.tncText}>I agree to the providers terms of use and privacy policy and understand that the rights to use this product do not come from renotary</Text>
      </View>
      <View>
        <CustomButton
          testID="AuthGoogleBtn"
          title="Authenticate Google"
          onPress={this.loginGoogle}
          disabled={!this.state.isGoogleChecked}
        />
      </View>
    </View>
     <View style={styles.line}/>
    </>
  }

  renderOutlookAccountInfo = () => {
    return (
      <View style={styles.accountWrapper}>
        <View style={styles.headerRow}>
          <Text style={styles.loggedlabel}>Outlook Calendar</Text>
          <View style={[styles.row, styles.mr10]}>
            <Text style={styles.syncNow}>{this.state.isOutlookSyncOn ? 'Sync off ' : 'Sync on'}</Text>
            <GenericSwitch
              testID='isOutlookSyncOn'
              checked={this.state.isOutlookSyncOn}
              onChange={(checked: boolean) => this.onChange('isOutlookSyncOn', checked)}
            />
          </View>
        </View>
        <View style={styles.authenticatedAccount}>
          <View style={[styles.row, styles.alignStart]}>
            <Avatar
              rounded
              size={'small'}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzK68s4XUT0SMbpKsouYhW-fwkpHriJ8mVc3z7ma9bd3F37rUVMI3XlRwK560xuF5YHVg&usqp=CAU"
              }}
              containerStyle={styles.avatarContainer}
            />
            <View>
              <Text style={styles.accountEmail}>{this.state.outlookAuthDetails?.email}</Text>
              <Text style={styles.authStatus}>Authenticated Account</Text>
            </View>
          </View>
          <TouchableOpacity
            testID="logoutOutlook"
            onPress={this.logoutOutlook}
            style={styles.row}>
            <Image source={imgCloseIcon} style={styles.closeIcon} />
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  outlookSync = () => {
    return this.state.isOutlookSignedIn ? this.renderOutlookAccountInfo() :
      <>
        <View style={styles.syncWrapper}>
          <View style={styles.lableHeader}>
            <Text style={styles.label}>Outlook Calendar</Text>
            <Text style={styles.subLabel}>(Two Way sync) </Text>
          </View>
          <View>
            <Text style={styles.description}>You need to authenticate your Outlook account to sync
              your Google calendar here.
              On clicking ‘ Authenticate Outlook you will be redirected to your Outlook Account page.</Text>
          </View>
          <View style={styles.termsWrapper}>
            <GenericCheckbox
              testID='isOutlookCheckedId'
              checked={this.state.isOutlookChecked}
              onChange={(checked: boolean) => this.onChange('isOutlookChecked', checked)}
            />
            <Text style={styles.tncText}>I agree to the providers terms
              of use and privacy policy and
              understand that the rights to use
              this product do not come from renotary</Text>
          </View>
          <View>
            <CustomButton
              testID="AuthOutlookBtn"
              title="Authenticate Outlook"
              onPress={this.outlookLogin}
              disabled={!this.state.isOutlookChecked}
            />
          </View>
        </View>
      </>
  }


  // Customizable Area End

  render() {
    // Customizable Area Start

    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={styles.flex}>
          <CustomHeader
            title={'Calendar Sync'}
            showBackIcon
            goBack={this.goBack}
            testID="customHeader"
          />
        <ScrollView style={styles.container}>
            {this.googleSync()}
            {this.outlookSync()}
          <CustomLoader loader={this.state.loading} />
        </ScrollView>
      </KeyboardAvoidingView> 
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  accountWrapper: {
    width: '100%',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    marginTop:20
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: 'center',
  },
  profilePic: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  loggedlabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.36,
    textAlign: 'left',
    color: '#000',
  },
  syncNow: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14.52,
    textAlign: 'left',
    color: '#475569',
    marginRight: 10,
  },
  mr10:
    { marginRight: -10 }
  ,
  switch:{
    width:48,
    height:28
  },
  authenticatedAccount: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  alignStart:{
    alignItems:'flex-start'
  },
  avatarContainer:{
    marginRight:10,
    width:24,
    height:24,
    marginTop:4
  },
  accountEmail: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
    textAlign: 'left',
    color: '#000',
  },
  removeText: {
    color: 'red',
    marginLeft: 7,
  },
  authStatus: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 12,
    textAlign: 'left',
    marginTop: 5,
  },
  line:{
    height:1.3,
    width:'100%',
    backgroundColor:'#CCD3E3',
  },
  syncWrapper: {
    marginTop: 10,
    marginBottom: 30
  },
  closeIcon: {
    resizeMode: 'contain',
    width: 16,
    height: 16
  },
  tncText: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: '#334155',
    textAlign: 'justify',
    alignSelf: 'center',
    marginLeft:10,
    marginTop:-2
  },

  termsWrapper: {
    flexDirection: 'row',
    width: '90%' ,
    marginBottom:10
  },
  description: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    color: '#334155',
    textAlign:'justify',
    marginBottom: 20
  },
  lableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  label: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    color: '#000',
    marginRight: 10
  },
  subLabel: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
    color: '#475569'
  },
  flex: { flex: 1 },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 25,
  },
});
// Customizable Area End