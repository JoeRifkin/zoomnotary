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
  ActivityIndicator,
  Dimensions,
  Platform
} from "react-native";
import { ProfileStep, configJSON } from "./DashboardController";
import { GenericCustomModel } from "../../../components/src/GenericCustomModel";
import { GenericButton } from "../../../components/src/GenericButton";
import { GenericHeader } from "../../../components/src/GenericHeader";
import { warningImg, imgSucessIcon, removeImg, rightArrowGreyImg, chevron_rightImg, inviteClientImg, emptyFolderImg, headsetImg, threeDotsImg, rightGreenArrowImg, crossBlueImg } from "./assets";
import { GenericBottomNavigation } from "../../../components/src/GenericBottomNavigation";
import { Menu, MenuItem, } from 'react-native-material-menu';
import { GenericDocSelectionModel } from "../../../components/src/GenericDocSelectionModel";

interface NotaryRequest {
  id: string;
  type: string;
  attributes: {
    status: string;
    notary_id: number;
    notary_service_type: number;
    priority: string;
    notarisation_method_id: number;
    date: string;
    invited_request_status: string;
    is_deleted: boolean;
    invite_request: boolean;
    invite_number: number;
    notarisation_method: NotarisationMethod;
    notary_service_name: string;
    quote_statuses_id: number;
  };
};

interface NotarisationMethod {
  id: number;
  notarisation_method: string;
  created_at: string;
  updated_at: string;
}

type NotaryRequestArray = NotaryRequest[];

// Customizable Area End
import DashboardController, { Props } from "./DashboardController";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
export default class Dashboard extends DashboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  renderNotaryRequestList(item: any) {
    let value = item.item.attributes;
    return (
      <TouchableOpacity testID={`flatListItemID-${item.item.id}`} style={[styles.cardView, styles[this.renderCardRightBorder(value.priority)]]}>
        <View style={styles.cardFirstWidth}>
          <View style={[styles.cardInsideView, styles.marginFive, styles.justifuView]}>
            <View style={[styles.cardInsideView, styles.alignView]}>
              <View style={styles.servieProviderView}>
                <Text style={styles.serviceText}>Order ID</Text>
                <Text style={styles.providerView}>{item.item.id}</Text>
              </View>
            </View>
            <View style={[styles.cardInsideView, styles.alignView, styles.marRight20]}>
              <View style={[styles.statusView, styles[this.renderStatusView(value.invite_request && (this.state.isInviteSelected || this.state.selectedTab === 'Invites') ? value.invited_request_status : value.status)]]}>
                <Text style={[styles.statusText, styles[this.renderStatusText(value.invite_request && (this.state.isInviteSelected || this.state.selectedTab === 'Invites') ? value.invited_request_status : value.status)]]}>{value.invite_request && (this.state.isInviteSelected || this.state.selectedTab === 'Invites') ? value.invited_request_status : value.status.toUpperCase().replace(/_/g, ' ')}</Text>
              </View>
              <TouchableOpacity testID="threeDotImgID" style={styles.dotImgBackColor} onPress={() => this.toggleDropdown(item.item.id)}>
                <Image style={styles.dotViewImg} source={threeDotsImg} />
              </TouchableOpacity>
              <View >
                <Menu
                  testID="menu-item-list"
                  visible={this.state.isModelVisible && this.state.selectedService === item.item.id}
                  onRequestClose={() => this.closeToggleDropDown()}
                  style={styles.menuListView}>
                  {this.renderMenuItems(value, this.getActionItemList(value.quote_statuses_id), item.item.id)}

                </Menu>
              </View>
            </View>
          </View>
          <View style={styles.borderLine} />

          <View style={[styles.cardInsideView, styles.marginFiveLeftRight, styles.justifuView]}>
            <View style={[styles.cardInsideView, styles.alignView]}>
              <View style={styles.servieProviderView}>
                <Text style={styles.serviceText}>Service Request</Text>

                {
                  value.notary_service_type ?

                    <Text style={styles.providerView}>{this.getNotaryServiceValue(value.notary_service_type, 20)}</Text>
                    :
                    this.renderDash()
                }
              </View>
            </View>
            <View style={[styles.cardInsideView, styles.alignView, styles.marRight]}>
              <View style={[styles.servieProviderView, styles.noDocView]}>
                <Text style={styles.serviceText}>Method</Text>
                {
                  value?.notarisation_method ?
                    <Text style={[styles.providerView, styles.alignText]}>{this.getAbbreviationForMethod(value?.notarisation_method?.notarisation_method)}</Text>
                    :
                    this.renderDash()
                }
              </View>
            </View>
          </View>

          <View style={[styles.cardInsideView, styles.marginFive, styles.justifuView]}>
            <View style={[styles.cardInsideView, styles.alignView]}>
              <View style={styles.servieProviderView}>
                <Text style={styles.serviceText}>{this.state.requestDate}</Text>
                {
                  value.date ?
                    <Text style={[styles.dateProviderView, styles[this.getDateColorAccordingToData(value.date)]]}>{this.convertData(value.date)}</Text>
                    :
                    this.renderDash()
                }
              </View>
            </View>
            <View style={[styles.cardInsideView, styles.alignView, styles.marRight]}>
              <View style={[styles.servieProviderView, styles.noDocView]}>
                <Text style={[styles.serviceText, styles.alignText]}>Level of urgency</Text>
                {
                  value.priority ?
                    <Text style={[styles.providerView, styles.alignText]}>{value.priority}</Text>
                    :
                    this.renderDash()
                }
              </View>
            </View>
          </View>
        </View>
        <View style={styles.cardSecWidth}>
          <Image source={rightGreenArrowImg} style={styles.rightArrowImgVIew} />
        </View>
      </TouchableOpacity>
    )
  }

  renderDash = () => {
    return (
      <Text style={styles.dashStyle}>-</Text>
    )
  }

  renderMenuItems = (value: any, menuItemList: any, requestId: string) => {
    return (
      <View testID="menu-item-list">
        {menuItemList.map((item: any, index: number) => (
          item.action.includes(value.invite_request && (this.state.isInviteSelected || this.state.selectedTab === 'Invites') ? value.invited_request_status.toLowerCase() : value.status.toLowerCase()) &&
          <MenuItem style={[styles.menuItem, { width: this.getMenuWidth() }]} onPress={() => this.redirectPage(item.key, requestId, value.invite_request && (this.state.isInviteSelected || this.state.selectedTab === 'Invites') ? value.invited_request_status : value.status, value.date, value?.notarisation_method?.notarisation_method)} key={index}>
            <View testID="selectedMenuID" style={styles.menuItemView}>
              <Image style={styles.menuIconView} source={item.icon} />
              <Text style={styles.menuTextView}>{item.text}</Text>
            </View>
          </MenuItem>
        ))}
      </View>
    )
  }

  renderCountOfBoxes = (isNotary = false) => {
    const { requestCountData } = this.state;

    const boxStyle = isNotary ? styles.requestNotaryCountBox : styles.requestUserCountBox;
    const extraBoxStyle = isNotary ? styles.outGoingColorOfBox : null;

    return (
      <View style={styles.requestcountBoxView}>
        <View style={[styles.requestCountBox, boxStyle, styles.requestColorOfBox]}>
          <Text style={[styles.requestCountView, styles.requestCountViewColor]}>
            {this.formatNumber(requestCountData?.all_request_count ?? 0)}
          </Text>
          <Text style={[styles.countTextView, styles.requestCountViewColor]}>Requests</Text>
        </View>

        <View style={[styles.requestCountBox, boxStyle, styles.progressColorOfBox, styles.marginLet]}>
          <Text style={[styles.requestCountView, styles.progressCountViewColor]}>
            {this.formatNumber(requestCountData?.in_progress_request_count ?? 0)}
          </Text>
          <Text style={[styles.countTextView, styles.progressCountViewColor]}>In Progress</Text>
        </View>

        <View style={[styles.requestCountBox, boxStyle, styles.completedColorOfBox, styles.marginLet]}>
          <Text style={[styles.requestCountView, styles.completedCountViewColor]}>
            {this.getCompletedRequestCount(isNotary)}
          </Text>
          <Text style={[styles.countTextView, styles.completedCountViewColor]}>Completed</Text>
        </View>

        {isNotary && (
          <View style={[styles.requestCountBox, boxStyle, extraBoxStyle, styles.marginLet]}>
            <Text style={[styles.requestCountView, styles.outgoingCountViewColor]}>
              00
            </Text>
            <Text style={[styles.countTextView, styles.outgoingCountViewColor]}>Outgoing</Text>
          </View>
        )}
      </View>
    );
  };


  renderNotaryServices = () => {
    return (
      <View style={styles.margBotForRequest}>
        <View style={[styles.servicesView, styles.marTop]}>
          <Text style={styles.notaryServiceTxt}>Notary Services</Text>
          <TouchableOpacity {...this.onClickseeAllServiceBtnProps}>
            <View style={styles.borderBott}>
              <Text style={styles.seeAllText}>See All</Text>
            </View>
          </TouchableOpacity>
        </View>

        {(this.state.servicesList && this.state.servicesList.length > 0) && <View>
          <FlatList
            data={this.state.servicesList}
            renderItem={(item) => this.renderServicesList(item)}
            extraData={this.state}
            keyExtractor={(item: any) => item.id}
            horizontal={true}
          />
        </View>}
        <GenericCustomModel
          visible={this.state.isServicesModelOpen}
          onClose={() => this.closeServiceModel()}
          height={'auto'}
          width={332}>
          <View style={styles.serviceView}>
            <View style={styles.servicesNameView}>
              <View>
                <Text style={styles.txtserviceNameView}>{this.getServiceName(this.state.selectedServiceForModel.service_name)}</Text>
              </View>
              <TouchableOpacity onPress={() => this.getSetviceModelOpen(this.state.selectedServiceForModel)}>
                <Image style={styles.modelCrossIcon} source={crossBlueImg} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.desOfServiceView}>{this.state.selectedServiceForModel.service_description}</Text>
            </View>
            <GenericButton
              testID={"btnBookNowFromModel"}
              btnProps={{ ...this.btnBookNowFromModelProps }}
              btnDisable={true}
              btnTextLabel={'Book Now'}
              filledBtn={true}
            />
          </View>
        </GenericCustomModel>
      </View>
    )
  }

  renderServicesList = (item: any) => {
    let detail = item.item.attributes;
    return (
      <TouchableOpacity key={detail.id} onPress={() => this.getSetviceModelOpen(detail)} style={styles.servicesListView}>
        <View style={styles.servicesView}>
          <Text style={styles.serviceNameTxt}>{this.truncatedText(detail.service_name, 22)}</Text>
          <Image style={styles.serviceIconView} source={{ uri: detail.service_icon?.url }} />
        </View>
        <View>
          <Text style={styles.serviceDesView}>{this.truncatedText(detail.service_description, 65)}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderCompleteProfileView = () => {
    return this.state.completeProfileList.length > 0 ? (
      <View>
        <View >
          <Text style={styles.completeProfileTxt}>{configJSON.completeProfile}</Text>
          <Text style={styles.toStartTxt}>{configJSON.toStart}</Text>
        </View>
        <FlatList
          data={this.state.completeProfileList}
          renderItem={({ item }) => (
            <TouchableOpacity
              testID="selectCompleteProfileTab"
              onPress={() => this.selectCompleteProfileTab(item)} style={[styles.servicesView, styles.viewOfProfileCom]}>
              <Text style={styles.nameOfComProfile}>{item.name}</Text>
              <Image source={chevron_rightImg} />
            </TouchableOpacity>
          )}
          extraData={this.state}
          keyExtractor={(item: ProfileStep) => item.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          testID="completeProfileList"
        />
      </View>
    ) : null
  }

  renderContent = (loading: boolean, data: NotaryRequestArray, isOutgoingRequest: boolean, emptyMsg: string, isFromAllRequest: boolean) => {
    if (loading && (!data || data.length === 0)) {
      return <ActivityIndicator size="large" color="#001569" style={styles.loaderStyles} />;
    } else if (data && data.length > 0) {
      return (
        <View style={styles[this.getBottomHeight(isOutgoingRequest, false)]}>
          <FlatList
            data={data}
            renderItem={item => this.renderNotaryRequestList(item)}
            extraData={this.state}
            keyExtractor={(item) => item.id}
          />
        </View>
      );
    } else {
      return (
        <View style={[styles.emptyFolderView, isOutgoingRequest ? styles.margBotForRequest : null]}>
          <Image style={styles.emptyFolderImg} source={emptyFolderImg} />
          <Text style={styles.emptyMsg}>{emptyMsg}</Text>
        </View>
      );
    }
  }

  renderRequestListUI = (title: string, data: any, emptyMsg: string) => {
    const isOutgoingRequest = configJSON.outgoingRequest === title;
    return (
      <View>
        {this.renderContent(this.state.loading, data, isOutgoingRequest, emptyMsg, false)}
        <GenericButton
          testID={"allYourRequestID"}
          btnProps={{ ...this.seeAllYourRequestBtn }}
          btnDisable={true}
          btnTextLabel={'See All'}
          filledBtn={true}
        />
      </View>
    )
  }

  renderModifyServiceView = () => {
    return (
      <View style={styles.margBotForRequest}>
        <TouchableOpacity {...this.modifyServiceView} style={[styles.modifyServicesView]}>
          <View style={styles.textMargiin}>
            <Text style={styles.modifyServicetxt}>{configJSON.modifyServiceTitle}</Text>
            <Text style={styles.modifyServicedes}>{configJSON.modifyServiceDes}</Text>
          </View>
          <View>
            <Image style={styles.rightArrowGray} source={rightArrowGreyImg} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderRequestListView = () => {
    return (
      <View>
        {this.renderContent(this.state.loading, this.state.selectedRequestTypeData, false, configJSON.emptyRequestMsg, true)}
        <GenericButton
          testID={"allYourRequestID"}
          btnProps={{ ...this.seeAllYourRequestBtn }}
          btnDisable={true}
          btnTextLabel={'See All'}
          filledBtn={true}
        />
      </View>
    )
  }

  renderFaileCancelRequestModel = () => {
    return (
      <GenericCustomModel
        visible={this.state.isCancellactionErrorPopup}
        height={'auto'}
        width={337}>
        <View style={styles.failedTxtView}>
          <Image style={styles.removeImgView} source={removeImg} />
          <Text style={styles.firstHeadingForCancelFaile} >{'Request Cancellation Failed'}</Text>
          <Text style={styles.secHeadingForCancelFaile}>{this.state.cancellationError?.errors}</Text>
        </View>
        <View style={styles.btnView}>
          <View style={styles.btnOkForCancel}>
            <TouchableOpacity
              testID={"btnOkId"}
              style={[styles.viewOfBtn, styles.filledBtn]}
              {...this.onClickOfOk}>
              <Text style={[styles.loginBtnText, styles.filledBtnText]}>{'Ok'}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </GenericCustomModel>
    )
  }

  showToggleBtn = () => {
    const { isRequestSelected, isInviteSelected } = this.state
    return (
      <View style={[styles.toggleButton, isRequestSelected ? styles.padLeft : styles.padRight]}>

        <TouchableOpacity testID={"btnRequests"} style={[styles.toggleBtnView, isRequestSelected ? styles.selectedBtn : styles.unSelectedBtn]} {...this.btnTabRequestAndInviteProps}>
          <Text style={[styles.textOfTggleBtn, isRequestSelected ? styles.selectedText : styles.unSelectedText]}>{'Requests'}</Text>
        </TouchableOpacity>

        <TouchableOpacity testID={"btnInvites"} style={[styles.toggleBtnView, isInviteSelected ? styles.selectedBtn : styles.unSelectedBtn]} {...this.btnTabRequestAndInviteProps}>
          <Text style={[styles.textOfTggleBtn, isInviteSelected ? styles.selectedText : styles.unSelectedText]}>{'Invites'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  showToggleBtnForNotary = () => {
    const { selectedTab } = this.state;
    const tabs = ['New Requests', 'Ongoing', 'Invites'];

    return (
      <View style={styles.toggleButton}>
        {tabs.map((tab) => {
          const isSelected = selectedTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              testID={`btn${tab.replace(/\s+/g, '')}`}
              style={[styles.toggleBtnViewForNotary, isSelected ? styles.selectedBtn : styles.unSelectedBtn]}
              onPress={() => this.handleTabSelection(tab)}
            >
              <Text style={[styles.textOfTggleBtn, isSelected ? styles.selectedText : styles.unSelectedText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };


  openRejectConfirmModel = () => {
    return (
      <GenericCustomModel
        visible={this.state.onViewReject}
        height={'auto'}
        width={337}>
        <View style={styles.iconContainer}>
          <Image source={warningImg} style={styles.warningImg} />
        </View>
        <Text style={styles.confirmationMsgForRejectView}>{
          'Are you sure you want to reject this request?'
        }</Text>

        <View style={styles.btnView}>
          <View style={styles.btnViewWid}>
            <TouchableOpacity
              testID={"btnNoToProceed"}
              style={[styles.blankBtn]}
              {...this.noProceedToRejectRequest}>
              <Text style={[styles.loginBtnText, styles.blankBtnText]}>{'No'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnViewWidofYes}>
            <TouchableOpacity
              testID={"btnYesProceed"}
              style={[styles.viewOfBtn, styles.filledBtn]}
              {...this.yesProceedToRejectRequest}>
              <Text style={[styles.loginBtnText, styles.filledBtnText]}>{'Yes'}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </GenericCustomModel>
    )
  }

  showSuccessMsgOfRejectRequest = () => {
    return (
      <GenericDocSelectionModel
        visible={this.state.isSucessMsgModel}
        onClose={() => this.closeSucessMsgModel()}
        height={42}
        hasBackdrop={false}
        coverScreen={false}
        width={'auto'}
        buttonModelView={styles.sucessModel}
        isModelView={false}>
        <View style={[styles.sucessChangesView]}>
          <Image style={styles.sucessImg} source={imgSucessIcon} />
          <Text style={styles.changesSavedTxt}>{configJSON.sucessMsg}</Text>
        </View>
      </GenericDocSelectionModel>
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
            {/* Merge Engine UI Engine Code */}


            <View style={styles.parentView}>
              <GenericHeader
                labelTitle={''}
                imgBackArrow={this.state.UserProfileDetail?.photo?.url}
                secImg={headsetImg}
                thiredImg={this.getNotificationImage()}
                btnGoBack={{ ...this.onClickOfAvatatIcon }}
                onthiredImageClick={{ ...this.openNotificationProps }}
                testID={"btnAvatarIcon"}
                isOtherMsg={true}
                isImgAvatar={true}
                UserName={this.state.UserProfileDetail?.full_name?.charAt(0).toUpperCase()}
              />
              <View style={styles.fieldView}>
                {this.renderCountOfBoxes(this.state.userRoleType !== 'end_user')}

                {this.state.userRoleType === 'end_user' ?
                  <View>
                    {this.showToggleBtn()}
                    {this.renderRequestListView()}
                    {this.renderNotaryServices()}
                  </View> :
                  <View>
                    {this.renderCompleteProfileView()}
                    {this.showToggleBtnForNotary()}
                    {this.renderRequestListUI(configJSON.newRequest, this.state.selectedRequestTypeDataForNotary, configJSON.emptyRequestMsg)}
                    {this.renderModifyServiceView()}
                  </View>
                }
                {this.renderFaileCancelRequestModel()}
                {this.showSuccessMsgOfRejectRequest()}
                <GenericCustomModel
                  visible={this.state.isCancelRequestModelOpen}
                  onClose={() => this.closeCancelRequestModel()}
                  height={'auto'}
                  width={337}>
                  <Text style={styles.confirmationMsgView}>{
                    this.state.selectedRequestStatus.toLowerCase() === 'draft' ?
                      configJSON.deleteCofirmMsg
                      :
                      configJSON.cancelCofirmMsg
                  }</Text>
                  {(this.state.CancellationCharge && this.state.selectedRequestStatus.toLowerCase() === 'in progress') &&
                    <Text style={styles.requestChargeMsgView}>{configJSON.chargeRequest}<Text style={styles.chargeAmountView}>{this.formatCancellactionNumber(this.state.CancellationCharge.cancellation_charges.toString())}£</Text></Text>}
                  <View style={styles.btnView}>
                    <View style={styles.btnViewWid}>
                      <TouchableOpacity
                        testID={"btnNoToProceed"}
                        style={[styles.blankBtn]}
                        {...this.noToChanges}>
                        <Text style={[styles.loginBtnText, styles.blankBtnText]}>{configJSON.back}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.btnViewWidofYes}>
                      <TouchableOpacity
                        testID={"btnYesProceed"}
                        style={[styles.viewOfBtn, styles.filledBtn]}
                        {...this.yesProceedToChanges}>
                        <Text style={[styles.loginBtnText, styles.filledBtnText]}>{configJSON.yesProceed}</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                </GenericCustomModel>
                {this.openRejectConfirmModel()}
              </View>
            </View>
            {/* Merge Engine UI Engine Code */}
            {/* Customizable Area End */}
          </TouchableWithoutFeedback>
        </ScrollView>
        {this.state.userRoleType === 'end_user' ?
          <TouchableOpacity style={styles.buttonBookNow} testID={"btnBookNowNotary"} {...this.btnBookNowProps}>
            <Text style={styles.buttonBookNowText}>{'+  Book Now'}</Text>
          </TouchableOpacity> :
          <TouchableOpacity style={[styles.buttonBookNow, styles.inviteClientInBottom]} testID={"btnInviteClient"} {...this.inviteClientbtn}>
            <Image style={styles.inviteImage} source={inviteClientImg} />
            <Text style={styles.buttonBookNowText}>{configJSON.inviteClient}</Text>
          </TouchableOpacity>}
        <GenericBottomNavigation
          testID="bottomNavigation"
          id={1} userType={this.state.userType} onChangeBottomTab={this.onChangeBottomTab} />
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
  loaderStyles: { flex: 1, opacity: 1 },
  cardView: {
    backgroundColor: '#F6F8FF',
    marginTop: '4%',
    borderRadius: 8,
    borderRightWidth: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  buttonBookNowText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22
  },
  cardInsideView: {
    flexDirection: 'row'
  },
  marginFive: {
    margin: "5%"
  },
  marginFiveLeftRight: {
    marginLeft: "5%",
    marginRight: "5%"
  },
  userImgView: {
    height: 28,
    width: 28,
    borderRadius: 100
  },
  servieProviderView: {
    flexDirection: 'column',
    marginLeft: 10
  },
  justifuView: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  alignView: {
    alignItems: 'center'
  },
  serviceText: {
    color: '#64748B',
    lineHeight: 10,
    fontSize: 10,
    fontWeight: '400'
  },
  providerView: {
    color: '#334155',
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '600'
  },
  dateProviderView: {
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '600'
  },
  dashStyle: {
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '600',
    alignSelf: 'center'
  },
  normalColor: {
    color: '#334155',
  },
  redColor: {
    color: '#DC2626'
  },
  alignText: {
    textAlign: 'right'
  },
  dotViewImg: {
    height: 4,
    width: 16,
  },
  marRight: {
    marginRight: 10
  },
  marRight20: {
    marginRight: 25
  },
  statusView: {
    height: 22,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontWeight: '700',
    lineHeight: 10,
    fontSize: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 5,
    textTransform: 'uppercase',
  },
  noDocView: {
    justifyContent: 'flex-end'
  },
  borderLine: {
    borderBottomColor: '#CBD5E1',
    borderBottomWidth: 1,
    marginBottom: 20,
    width: "90%",
    marginLeft: 20
  },
  requestcountBoxView: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  requestCountBox: {
    height: 75,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestUserCountBox: {
    width: (Dimensions.get('window').width - 68) / 3
  },
  requestNotaryCountBox: {
    width: (Dimensions.get('window').width - 78) / 4
  },
  requestColorOfBox: {
    backgroundColor: '#CCD3E3',
  },
  progressColorOfBox: {
    backgroundColor: '#FEF3C7',
  },
  completedColorOfBox: {
    backgroundColor: '#D1FAE5',
  },
  outGoingColorOfBox: {
    backgroundColor: '#F0E5FF',
  },
  requestCountViewColor: {
    color: '#012275'
  },
  progressCountViewColor: {
    color: '#D97706'
  },
  completedCountViewColor: {
    color: '#059669'
  },
  outgoingCountViewColor: {
    color: '#5500CC'
  },
  requestCountView: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold'
  },
  countTextView: {
    fontSize: 11,
    lineHeight: 18,
    fontWeight: '500'
  },
  marginLet: {
    marginLeft: 10
  },
  servicesView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  marTop: {
    marginTop: 30,
    marginBottom: 15
  },
  marginYourRequest: {
    marginTop: 20,
  },
  notaryServiceTxt: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21
  },
  seeAllText: {
    color: '#012275',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17
  },
  borderBott: {
    borderBottomWidth: 2,
    borderBottomColor: '#012275'
  },
  servicesListView: {
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
  serviceNameTxt: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'bold',
    color: '#011342'
  },
  serviceIconView: {
    height: 24,
    width: 24,
    marginRight: 10,
    borderRadius: 100
  },
  serviceDesView: {
    color: "#64748B",
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20
  },
  rightArrowImgVIew: {
    height: 8,
    width: 5,
    right: 10,
    top: 4
  },
  cardFirstWidth: {
    width: "98%"
  },
  cardSecWidth: {
    width: "3%"
  },
  draftStatusView: {
    backgroundColor: "#CCD3E3"
  },
  draftStatusTxt: {
    color: "#334155"
  },
  completedStatusView: {
    backgroundColor: "#D1FAE5"
  },
  completedStatusTxt: {
    color: "#059669"
  },
  inprogressStatusView: {
    backgroundColor: "#FEF3C7"
  },
  inprogressStatusTxt: {
    color: "#D97706"
  },
  pendingStatusView: {
    backgroundColor: "#F0E5FF"
  },
  pendingStatusTxt: {
    color: "#6200EA"
  },
  cancelledStatusView: {
    backgroundColor: "#FEE2E2"
  },
  cancelledStatusTxt: {
    color: "#DC2626"
  },
  cardBorderRightColorForDraftPendingCancelled: {
    borderRightColor: '#F59E0B'
  },
  cardBorderRightColorForCompleted: {
    borderRightColor: '#F87171'
  },
  cardBorderRightColorForInProgress: {
    borderRightColor: '#34D399'
  },
  serviceView: {

  },
  servicesNameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  txtserviceNameView: {
    color: "#011342",
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 25
  },
  modelCrossIcon: {
    height: 24,
    width: 24
  },
  desOfServiceView: {
    color: "#475569",
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginTop: 8
  },
  dotImgBackColor: {
    height: 15,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    left: 10,
  },
  menuItemView: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: Platform.OS === 'ios' ? 14 : 3,
    paddingRight: 5,
    height: 20,
  },
  menuItem: {
    height: 38,
  },
  menuIconView: {
    width: 20,
    height: 20,
    marginTop: 2,
  },
  menuTextView: {
    color: '#475569',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
    marginLeft: 10
  },
  emptyFolderView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  emptyFolderImg: {
    height: 72,
    width: 72,
    opacity: 0.6
  },
  emptyMsg: {
    color: '#012275',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '700'
  },
  inviteBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inviteClientVIew: {
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#012275",
    marginTop: 20,
    marginBottom: 25,
    width: '48%'
  },
  inviteText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.36,
    marginLeft: 10
  },
  inviteImage: {
    height: 16,
    width: 22,
    marginRight: 7
  },
  completeProfileTxt: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.36
  },
  toStartTxt: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18
  },
  viewOfProfileCom: {
    height: 48,
    width: 235,
    backgroundColor: '#012275',
    borderRadius: 8,
    marginRight: 10,
    marginTop: 10
  },
  nameOfComProfile: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22.5,
    marginLeft: 10
  },
  modifyServicesView: {
    height: 78,
    backgroundColor: "#D1FAE5",
    borderRadius: 8,
    marginTop: 40,
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  inviteClientsView: {
    height: 70,
    backgroundColor: "#012275",
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  modifyServicetxt: {
    color: "#1E293B",
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24
  },
  newInvitestxt: {
    color: "#fff",
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25,
  },
  modifyServicedes: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18
  },
  newInvitedes: {
    color: "#fff",
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 17
  },
  rightArrowGray: {
    marginRight: 12
  },
  textMargiin: {
    marginLeft: 12
  },
  margBotForRequest: {
    paddingBottom: 90
  },
  nonMargBotForRequest: {},
  newInviteCount: {
    color: "#012275",
    fontWeight: '700',
    lineHeight: 12,
    fontSize: 12
  },
  inviteCountView: {
    height: 20,
    width: 28,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  inviteView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  confirmationMsgView: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 26.6,
    textAlign: 'left'
  },
  requestChargeMsgView: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.6,
    textAlign: 'left'
  },
  chargeAmountView: {
    color: '#DC2626'
  },
  btnView: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnViewWid: {
    width: '46%'
  },
  btnViewWidofYes: {
    width: '46%',
    marginLeft: 15
  },
  btnOkForCancel: {
    width: '100%',
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
  blankBtn: {
    borderWidth: 2,
    borderColor: "#012275",
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: '#F8FAFC'
  },
  filledBtnText: {
    color: '#fff',
  },
  blankBtnText: {
    color: '#012275',
  },
  loginBtnText: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24
  },
  menuListView: {
    marginTop: 35,
    marginLeft: 25,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    width: 'auto'
  },
  removeImgView: {
    height: 72,
    width: 72
  },
  firstHeadingForCancelFaile: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 33.6,
    textAlign: 'center',
    marginTop: 10
  },
  secHeadingForCancelFaile: {
    color: '#334155',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 10,
    marginTop: 10
  },
  failedTxtView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width - 40,
    borderWidth: 2,
    borderRadius: 80,
    borderColor: '#012275',
    marginTop: 24,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  padRight: {
    paddingRight: 1
  },
  padLeft: {
    paddingLeft: 1
  },

  toggleBtnView: {
    width: ((Dimensions.get('screen').width - 40) / 2) - 5,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 58,
  },
  selectedText: {
    color: '#fff',
  },
  unSelectedText: {
    color: '#012275',
  },
  textOfTggleBtn: {
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
    padding: 6,
  },
  selectedBtn: {
    backgroundColor: '#012275',
  },
  unSelectedBtn: {
  },
  rejectedStatusTxt: {
    color: "#FF0000"
  },
  invitedStatusTxt: {
    color: "#6200EA"
  },
  acceptedStatusTxt: {
    color: "#059669"
  },
  rejectedStatusView: {
    backgroundColor: "#FF000038"
  },
  invitedStatusView: {
    backgroundColor: "#F0E5FF"
  },
  acceptedStatusView: {
    backgroundColor: "#D1FAE5"
  },
  inviteClientInBottom: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: "#012275",
    width: '38%'
  },
  toggleButtonForNotary: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width - 40,
    borderWidth: 2,
    borderRadius: 80,
    borderColor: '#012275',
    marginTop: 24,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 2,
  },
  toggleBtnViewForNotary: {
    width: ((Dimensions.get('screen').width - 40) / 3) - 5,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 58,
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
  changesSavedTxt: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24
  },
  sucessImg: {
    height: 21,
    width: 21,
    marginRight: 8
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  warningImg: {
    height: 48,
    width: 48,
    resizeMode: 'contain',
  },
  confirmationMsgForRejectView: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 26.6,
    textAlign: 'center'
  },
});
// Customizable Area End
