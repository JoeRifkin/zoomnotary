import React from "react";
// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
export const configJSON = require("./config");
import {
  imgInfo,
  imgVerified,
  imgArrowOutward
} from "./assets";
import Icon from 'react-native-vector-icons/FontAwesome';
import { GenericButton } from "../../../components/src/GenericButton";
// Customizable Area End

import KnowYourCustomerKycVerificationController, {
  Props,
} from "./KnowYourCustomerKycVerificationController";
import { Formik } from "formik";
import Scale from "../../../components/src/Scale";
const StartingValues = {
  firstNameDefault: "",
  lastNameDefault: "",
  middleNameDefault: "",
  emailStateDefault: "",
  nationalityDefault: "",
  dateOfBirth: "",
  phoneNumber: ""

}

export default class KnowYourCustomerKycVerification extends KnowYourCustomerKycVerificationController {

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  

  renderLoader = () => {
    return (
      <View style={styles.loaderStyles}>
        <ActivityIndicator size="large" color="#012275" />
      </View>
    )
  }

  renderNotaryUserFirstView = () => {
    let kycStatus = this.state.createdKycResponse?.data?.attributes?.kyc_status
    return (
      <View>
        {this.state.createdKycResponse?.data.attributes.requested_kyc_documents.map((item: any, index: number) => {
          return (
            <View key={index} style={[styles.selectView]}>
              <View style={[styles.listView]}>
                <View style={styles.allSelectView}>
                  <Text style={[styles.selectAllView]}>{item?.document_details?.data?.attributes?.document_type}</Text>
                </View>
                <View style={styles.allSelectView}>
                  <Image style={styles.radioBtnImg} source={imgInfo} />
                  <View style={[styles.statusView, styles[this.statucCheckForView(kycStatus ? kycStatus?.toLowerCase() : '')] ]}>
                    <Text style={[styles.statusTxt, styles[this.statucCheckForTxt(kycStatus ? kycStatus?.toLowerCase() : '')] ]}>{this.getTxtForStatus(kycStatus ?kycStatus.toLowerCase() : '') }</Text>
                  </View>
                </View>
              </View>
              <View style={styles.borderLine} />
            </View>
          )
        })}
        <View style={styles.marTop120}>
          <GenericButton
            testID={"btnDownloadReportId"}
            btnProps={{ ...this.btnDownloadReportProps }}
            btnDisable={false}
            btnTextLabel={'Download Report'}
            filledBtn={true}
          />
        </View>
      </View>
    )
  }

  renderEndUserFirstView = () => {
    return (
      <View>
        <View>
          <Text style={styles.listOfRequestedTxt}>{configJSON.listOfRequested}</Text>
          <View>
            {this.state.createdKycResponse?.data.attributes.requested_kyc_documents.map((item: any, index: number) => {
              return (
                <View style={[styles.listView, styles.marBott15]} key={index}>
                  <View style={styles.allSelectView}>
                    <Text style={[styles.documentTxt]}>•  {item?.document_details?.data?.attributes?.document_type}</Text>
                  </View>
                  <View style={styles.allSelectView}>
                    <Image style={styles.radioBtnImg} source={imgInfo} />
                  </View>
                </View>
              )
            })}
          </View>
          <View style={styles.marTop20}>
            <TouchableOpacity {...this.btnVerifyNowProps} style={styles.verifyNowBtn} >
              <Image style={styles.imgVerifyNow} source={imgArrowOutward} />
              <Text style={styles.verifyNowtxt}>{'Verify Now'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  renderWhenKycStarted = () => {
    return (
      <View>
        {this.showNotaryUserView() ?
          this.renderNotaryUserFirstView() :
          this.renderEndUserFirstView()
        }
      </View>
    )
  }
 
  renderNotaryUserSecondView =() => {
    return (
      <View>
        <View>
          <Text style={styles.suggestMsgView}>{configJSON.suggestionMsg}</Text>
        </View>

        <View>
          {this.state.kycDocumentList && this.state.kycDocumentList.map((item: any, index: number) => {
            return (
              <View key={index} style={[styles.selectView]}>
                <View style={styles.borderLine} />
                <View style={styles.listView}>
                  <View style={styles.allSelectView}>
                    <TouchableOpacity onPress={() => this.clickOnSelect(item?.id)} style={styles.checkboxContainer} testID={"CustomCheckBox"}>
                      <View style={[styles.checkbox, (this.state.selectedDocument.includes(item?.id)) && styles.checked]}>
                        {(this.state.selectedDocument.includes(item?.id)) && <Icon name="check" size={16} color="#fff" />}
                      </View>
                    </TouchableOpacity>
                    <Text style={[styles.selectAllView]}>{item.document_type}</Text>
                  </View>
                  <View>
                    <Image style={styles.radioBtnImg} source={imgInfo} />
                  </View>
                </View>
              </View>
            )
          })}
        </View>

        <View style={styles[this.getMarTop(this.state.selectedRadioBtn)]}>
          <GenericButton
            testID={"btnSendRequestId"}
            btnProps={{ ...this.btnSendRequestProps }}
            btnDisable={this.isSendRequestBtnDisbale()}
            btnTextLabel={'Send Request'}
            filledBtn={true}
          />
        </View>
      </View>
    )
  }

  renderEndUserSecondView = () => {
    return (
      <View>
        <View style={[styles.emptyFolderView]}>
          <Image style={styles.verifiedImg} source={imgVerified} />
          <Text style={styles.emptyMsg}>{configJSON.noKycVerifiedYet}</Text>
          <Text style={[styles.emptyMsgDetail, styles.emptyMsgDetailForKYC]}>{configJSON.noKycVerifiedDes}</Text>
        </View>
      </View>
    )
  }

  renderSecondView = () => {
    return (
      <View>
        {this.state.userType === 'notary' ? 
        this.renderNotaryUserSecondView()
         :
         this.renderEndUserSecondView()
        }
      </View>
    )
  }

  renderMainContent = () => {
    return (
      <View>
        {this.state.createdKycResponse?.data ?
          this.renderWhenKycStarted()
          :
          this.renderSecondView()
        }
      </View>
    )
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        {this.state.isLoader ?
          this.renderLoader()
          :
          this.renderMainContent()
        }
      </ScrollView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: "#ffffffff",
  },

  suggestMsgView: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22.8
  },
  radioAndTxtView: {
    flexDirection: 'column',
  },
  radioAndTxt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  radioBtnImg: {
    height: 20,
    width: 20
  },
  radioLabelTxt: {
    color: '#334155',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 10
  },
  radioLabelTxtselected: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 10
  },
  selectView: {
    width: '100%',
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectAllView: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000'
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
  },
  checked: {
    backgroundColor: '#012275',
    borderColor: '#012275',
  },
  allSelectView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  borderLine: {
    borderBottomColor: '#CBD5E1',
    borderBottomWidth: 1,
    marginBottom: 15,
    marginTop: 15
  },
  marTop220: {
    marginTop: 220
  },
  marTop20: {
    marginTop: 20
  },
  marTop120: {
    marginTop: 120
  },
  statusTxt: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: '500',
  },
  inprogreeTxt: {
    color: '#D97706'
  },
  completeTxt: {
    color: '#059669'
  },
  statusView: {
    height: 24,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 6,
    paddingBottom: 6,
    marginLeft: 7,
    borderRadius: 6
  },
  inprogreeView: {
    backgroundColor: '#FEF3C7'
  },
  completeView: {
    backgroundColor: '#D1FAE5'
  },
  emptyFolderView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  verifiedImg: {
    height: 77,
    width: 77,
  },
  emptyMsg: {
    color: '#1E293B',
    fontSize: 14,
    lineHeight: 28,
    fontWeight: '600'
  },
  emptyMsgDetail: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 28,
    fontWeight: '400'
  },
  emptyMsgDetailForKYC: {
    textAlign: 'center'
  },

  listOfRequestedTxt: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 26,
    marginBottom: 20
  },
  documentTxt: {
    color: '#334155',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 24,
    marginLeft: 10
  },
  marBott15: {
    marginBottom: 15
  },
  verifyNowBtn: {
    height: 44,
    backgroundColor: '#012275',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  imgVerifyNow: {
    height: 24,
    width: 24
  },
  verifyNowtxt: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22.4,
    marginLeft: 10
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
