import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {GenericHeader} from "../../../components/src/GenericHeader";
import {GenericButton} from "../../../components/src/GenericButton";
import {GenericTextWithHperLink} from "../../../components/src/GenericTextWithHperLink";
export const configName = require("./config");
import {imgBackArrow, imgInfoOutline, imgI_am_a_Notary, imgI_need_a_Notary } from "./assets";
// Customizable Area End

import LandingPageController, {
  Props,
  configJSON
} from "./LandingPageController";

export default class LandingPage extends LandingPageController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
      {/* Customizable Area Start */}
      <ScrollView keyboardShouldPersistTaps="always" >
       
          <View>
          <GenericHeader 
            labelTitle={configName.labelTitle}
            imgBackArrow={imgBackArrow}
            btnGoBack={{...this.btnGoBack}}
            testID={"btnbackArrow"}
            isOtherMsg={true}
          />
          <View style={styles.fieldsView}>

            <View style={styles.suggestView}>
              <Image style={styles.suggestImg} source={imgInfoOutline} />
              <Text style={styles.suggestText} >{configName.suggestionMsg}</Text>
            </View>

               <View style={styles.tabOption}>
                <TouchableOpacity testID="btnTabNeedNotary" style={[styles.boxView, this.state.userType === 'need' ? styles.selectedBoxView : styles.unSelectedBoxView]} onPress={() => this.selectTypeOfUser('need')}>
                  <Image style={[styles.boxImgView, styles[this.showINeedNotaryImg()]]} source={imgI_need_a_Notary} />
                  <View style={styles.flexViewText}>
                    <Text style={[this.state.userType === 'need' ? styles.fontSelectedNormal : styles.fontUnSelectedNormal, styles.fontSizeBox, styles.normalText]} >{configName.firstText}</Text>
                    <Text style={[this.state.userType === 'need' ? styles.fontSelectedBold : styles.fontUnSelectedBold, styles.fontSizeBox, styles.boldText]} >{configName.needText}</Text>
                    <Text style={[this.state.userType === 'need' ? styles.fontSelectedNormal : styles.fontUnSelectedNormal, styles.fontSizeBox,styles.normalText]} >{configName.lastText}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity testID="btnTabAmNotary" style={[styles.boxView, this.state.userType === 'am' ? styles.selectedBoxView : styles.unSelectedBoxView, styles.marTop]} onPress={() => this.selectTypeOfUser('am')}>
                  <Image style={[styles.boxImgView, styles[this.showIamNotaryImg()]]} source={imgI_am_a_Notary} />
                  <View style={styles.flexViewText}>
                    <Text style={[this.state.userType === 'am' ? styles.fontSelectedNormal : styles.fontUnSelectedNormal, styles.fontSizeBox, styles.normalText]} >{configName.firstText}</Text>
                    <Text style={[this.state.userType === 'am' ? styles.fontSelectedBold : styles.fontUnSelectedBold, styles.fontSizeBox, styles.boldText]} >{configName.amText}</Text>
                    <Text style={[this.state.userType === 'am' ? styles.fontSelectedNormal : styles.fontUnSelectedNormal, styles.fontSizeBox,styles.normalText]} >{configName.lastText}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            <GenericButton 
              testID={"btnContinuePage"}
              btnProps={{...this.btnContinueProps}}
              btnDisable={this.getButtonEnable()}
              btnTextLabel={configName.btnTextContinue}
              filledBtn={true}
            />
            <View style={styles.topPed}>
              <GenericTextWithHperLink 
                normalText={configJSON.alreadyhaveAccount}
                hyperText={configJSON.logIn}
                redirectProps={{...this.btnLoginRedirect}}
                testid={"btnLogin"}
              />
            </View>
          </View>
        </View> 
        </ScrollView>
      {/* Customizable Area End */}
      </SafeAreaView>
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  fieldsView: {
    padding: 16
  },
  topPed: {
    paddingTop: 20,
    marginBottom: 20
  },
  suggestView: {
    height: 36,
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    backgroundColor: '#FEF3C7',
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  suggestText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
    color: '#D97706',
  },
  suggestImg: {
    height: 20,
    width: 20,
    marginLeft: 16,
    marginRight: 10
  },
  tabOption: {
    flexDirection: 'column',
    paddingTop: 40,
    paddingBottom: 60,
    alignItems: 'center'
  },
  boxView: {
    width: 180,
    height: 180,
    borderRadius: 6,
    borderWidth: 1.5,
    justifyContent:'center',
    alignItems: 'center'
  },
  selectedBoxView: {
    borderColor: '#012275',
    backgroundColor: '#012275'
  },
  unSelectedBoxView: {
    borderColor: '#CCD3E3',
    backgroundColor: '#fff'
  },
  normalText: {
    fontWeight: '400',
  },
  boldText: {
    fontWeight: 'bold',
  },
  fontSizeBox: {
    fontSize: 16,
    lineHeight: 16
  },
  fontSelectedNormal:{
    color: '#CBD5E1'
  }, 
  fontSelectedBold:{
    color: '#FFFFFF'
  }, 
  fontUnSelectedNormal:{
    color: '#4A4A4A'
  }, 
  fontUnSelectedBold:{
    color: '#012275'
  }, 
  boxImgView: {
    height: 62,
    width: 62,
  },
  imgTintColor: {
    tintColor: '#fff'
  },
  imgNoTintColor: {
  },
  marTop: {
    marginTop: 30
  },
  flexViewText: {
    flexDirection: 'row',
    marginTop: 20
  }, 
  
});
// Customizable Area End
