import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { GenericHeader } from "../../../components/src/GenericHeader";
import { notificationImg, emptyFolderImg, headsetImg, cancelImg } from "./assets";
import { GenericBottomNavigation } from "../../../components/src/GenericBottomNavigation";
import { GenericDocSelectionModel } from "../../../components/src/GenericDocSelectionModel";
import CustomButton from "../../../components/src/CustomButton";
// Customizable Area End
import ContinueAsGuestController, { Props } from "./ContinueAsGuestController";

export default class ContinueAsGuestDashboard extends ContinueAsGuestController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  renderNotaryServices = () => {
    return (
      <View>
        <View style={[styles.servicesViewGuest, styles.marTopGuest]}>
          <Text style={styles.notaryServiceTxtGuest}>Notary Services</Text>
          <TouchableOpacity {...this.openLoginSignUpModel}>
            <View style={styles.borderBottGuest}>
              <Text style={styles.seeAllTextGuest}>See All</Text>
            </View>
          </TouchableOpacity>
        </View>

        {(this.state.servicesListData && this.state.servicesListData.length > 0) && <View>
          <FlatList
            data={this.state.servicesListData}
            renderItem={(item) => this.renderServicesListForGuest(item)}
            extraData={this.state}
            keyExtractor={(item: any) => item.id}
            horizontal={true}
          />
        </View>}

      </View>
    )
  }

  renderServicesListForGuest = (item: any) => {
    let detail = item.item.attributes;
    return (
      <TouchableOpacity key={detail.id} style={styles.servicesListViewGuest} {...this.openLoginSignUpModel} >
        <View style={styles.servicesViewGuest}>
          <Text style={styles.serviceNameTxtGuest}>{this.truncatedText(detail.service_name, 22)}</Text>
          <Image style={styles.serviceIconViewGuest} source={{ uri: detail.service_icon?.url }} />
        </View>
        <View>
          <Text style={styles.serviceDesViewGuest}>{this.truncatedText(detail.service_description, 65)}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderContent = () => {

    return (
      <View style={[styles.emptyFolderView]}>
        <Image style={styles.emptyFolderImg} source={emptyFolderImg} />
        <Text style={styles.emptyMsg}>{'Empty'}</Text>
        <TouchableOpacity {...this.openLoginSignUpModel} style={styles.signUpLoginView}>
          <Text style={styles.signUpLoginTxt}>{'Sign up / Login'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderRequestListView = () => {
    return (
      <View>
        <View style={[styles.servicesViewGuest, styles.marginYourRequestGuest]}>
          <Text style={styles.notaryServiceTxtGuest}>Your Request</Text>
          <TouchableOpacity testID="allYourRequestID" {...this.openLoginSignUpModel} >
            <View style={styles.borderBottGuest}>
              <Text style={styles.seeAllTextGuest}>See All</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this.renderContent()}
      </View>
    )
  }

  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      //Merge Engine DefaultContainer
      <View style={{ flex: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={styles.container}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            {/* Customizable Area Start */}
            <View style={styles.parentView}>
              <GenericHeader
                labelTitle={''}
                secImg={headsetImg}
                thiredImg={notificationImg}
                testID={"btnAvatarIcon"}
                isOtherMsg={true}
              />
              <View style={styles.fieldView}>

                {this.renderNotaryServices()}
                {this.renderRequestListView()}

              </View>
              <GenericDocSelectionModel
                visible={this.state.isOpenLoginSignUpModel}
                height={'auto'}
                hasBackdrop={false}
                coverScreen={false}
                width={Dimensions.get('window').width - 12}
                buttonModelView={styles.otherButtonModelView}
                isModelView={true}>
                <TouchableOpacity {...this.closeModelOfLoginSign} style={styles.cancelView}>
                  <Image source={cancelImg} style={styles.cancelImgView} />
                </TouchableOpacity>
                <View style={[styles.otherBtnModel]}>
                  <Text style={styles.signUpLoginTxtInModel}>{'Log in/Sign up'}</Text>
                </View>
                <View style={[styles.otherBtnModel]}>
                  <Text style={styles.titleModelView}>Please Signup/Login to view the quotes sent by the notary.</Text>
                </View>
                <View style={styles.btnViewInModel}>
                  <CustomButton
                    testID='logInID'
                    title={'LOG IN'}
                    onPress={this.callLogInBtn}
                  />
                  <CustomButton
                    testID='signupID'
                    title={'SIGN UP'}
                    onPress={this.callSignUpBtn}
                    outlined={true}
                  />
                </View>
              </GenericDocSelectionModel>
            </View>

            {/* Customizable Area End */}
          </TouchableWithoutFeedback>
        </ScrollView>
        {<TouchableOpacity style={styles.buttonBookNow} testID={"btnBookNowNotary"} {...this.btnBookNowProps}>
          <Text style={styles.buttonBookNowText}>{'+  Book Now'}</Text>
        </TouchableOpacity>}
        <GenericBottomNavigation
          testID="bottomNavigation"
          id={1} userType={'end_user'} onChangeBottomTab={this.onChangeBottomTab} />
      </View>
      //Merge Engine End DefaultContainer
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffff",
  },
  parentView: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  fieldView: {
    padding: 24,
    overflow: 'scroll',
  },
  buttonBookNow: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    backgroundColor: '#012275',
    borderRadius: 20,
    width: 124,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center'
  },
  otherButtonModelView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(44, 44, 46, 0.4)',
    paddingBottom: 20,
  },
  otherBtnModel: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  titleModelView: {
    color: '#011342',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 24,
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 10
  },
  buttonBookNowText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22
  },
  servicesViewGuest: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  marTopGuest: {
    marginTop: 30,
    marginBottom: 15
  },

  marginYourRequestGuest: {
    marginTop: 20,
  },
  notaryServiceTxtGuest: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21
  },
  seeAllTextGuest: {
    color: '#012275',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17
  },
  borderBottGuest: {
    borderBottomWidth: 2,
    borderBottomColor: '#012275'
  },
  servicesListViewGuest: {
    backgroundColor: '#F6F8FF',
    width: 240,
    height: 92,
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 10
  },
  serviceNameTxtGuest: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'bold',
    color: '#011342'
  },
  serviceIconViewGuest: {
    height: 24,
    width: 24,
    marginRight: 10,
    borderRadius: 100
  },
  serviceDesViewGuest: {
    color: "#64748B",
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20
  },
  emptyFolderView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  emptyFolderImg: {
    height: 72,
    width: 72,
    opacity: 0.6
  },
  emptyMsg: {
    color: '#9E9E9E',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '700'
  },
  signUpLoginTxt: {
    color: '#012275',
    fontSize: 16,
    lineHeight: 17,
    fontWeight: '700'
  },
  signUpLoginTxtInModel: {
    color: '#0131A8',
    fontSize: 18,
    lineHeight: 26,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  signUpLoginView: {
    marginTop: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: '#012275'
  },
  cancelImgView: {
    height: 32,
    width: 32
  },
  cancelView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20
  },
  btnViewInModel: {
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  }

});
// Customizable Area End
