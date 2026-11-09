import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Image, Modal
} from "react-native";
// Customizable Area End

// Customizable Area Start
import {imgSucessIcon, removeImg, imgClose, warningImg } from "./assets";
export const configJSON = require("./config");
import { GenericBottomNavigation } from "../../../components/src/GenericBottomNavigation";
import { GenericCustomModel } from "../../../components/src/GenericCustomModel";
import { Calendar } from 'react-native-calendars';
import GenericRequestListFilterPage from "../../../components/src/GenericRequestListFilterPage";
import GenericRequestListPage from "../../../components/src/GenericRequestListPage";
import { GenericDocSelectionModel } from "../../../components/src/GenericDocSelectionModel";

const today = new Date();
const todayString = today.toISOString().split('T')[0];
// Customizable Area End

import SearchController, { Props } from "./SearchController";
import InviteClientComponent from "../../../components/src/InviteClientComponent";

export default class Search extends SearchController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    
    return (
      <View style={styles.mainView}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}
          onScroll={this.handleScroll}
          scrollEventThrottle={1} >
          {/* Customizable Area Start */}
          <TouchableWithoutFeedback
            testID={"KeyboardTestID"}
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            <View>
             
              {(() => {
                if (this.state.isFilterPageOpen) {
                  return (
                    <View>
                      <GenericRequestListFilterPage
                        closeFilterPage={{ ...this.closeFilterPage }}
                        PriorityFilterType={this.PriorityFilterType}
                        selectedPriorityFilter={this.state.selectedPriorityFilter}
                        getSelectPriorityFilter={this.getSelectPriorityFilter}
                        requestStatusType={this.requestStatusType}
                        selectedRequestStatusFilter={this.state.selectedRequestStatusFilter}
                        getSelectRequestStatus={this.getSelectRequestStatus}
                        selectedServiceType={this.state.selectedServiceType}
                        txtInputServicesPrpos={this.txtInputServicesPrpos}
                        closeDropDownOfServices={this.closeDropDownOfServices}
                        openServicesDropdown={this.openServicesDropdown}
                        servicesList={this.state.servicesList}
                        isServiceDropdownOpen={this.state.isServiceDropdownOpen}
                        selectedDateType={this.state.selectedDateType}
                        onSelectSingleDate={{ ...this.onSelectSingleDate }}
                        onSelectRangeDate={{ ...this.onSelectRangeDate }}
                        selectedDateRange={this.state.selectedDateRange}
                        getCalendarModalOpen={this.getCalendarModalOpen}
                        btnOpenCalendarProps={{ ...this.getCalendarModalOpen }}
                        onResetFilter={{ ...this.onResetFilter }}
                        onApplyFilter={{ ...this.onApplyFilter }}
                        getButtonEnabled={this.getButtonEnabled}
                      />
                    </View>
                  );
                } else if (this.state.inviteDataTypes === "New Invite") {
                  return (
                    <View>
                      <InviteClientComponent
                        UserProfileDetail={this.state.UserProfileDetail}
                        onClickOfAvatatIcon={{ ...this.onClickOfAvatatIcon }}
                        searchQuery={this.state.searchQuery}
                        onChange={this.onChange}
                        onSearch={{ ...this.onSearch }}
                        selectedPriorityFilter={this.state.selectedPriorityFilter}
                        InviteListData={this.state.inviteRequestData}
                        InvitetoggleDropdown={this.toggleDropdown}
                        InviteisModelVisible={this.state.isModelVisible}
                        InviteisselectedService={this.state.selectedService}
                        InviteCloseToggleDropDown={this.closeToggleDropDown}
                        InvitegetActionItemList={this.getActionItemList}
                        InvitegetNotaryServiceValue={this.getNotaryServiceValue}
                        getMenuWidthInvite={this.getMenuWidth}
                        redirectPageInvite={this.redirectPage}
                        requestDateInvite={this.state.requestDate}
                        isLoaderInvite={this.state.isLoader}
                        isCancelRequestModelOpenInvite={this.state.isCancelRequestModelOpen}
                        InvitecloseCancelRequestModel={this.closeCancelRequestModel}
                        InviteCancellationCharge={this.state.CancellationCharge}
                        InviteselectedRequestStatus={this.state.selectedRequestStatus}
                        InvitenoToChanges={{ ...this.noToChanges }}
                        InviteyesProceedToChanges={{ ...this.yesProceedToChanges }}
                        InviteformatCancellactionNumber={this.formatCancellactionNumber}
                      />
                    </View>
                  );
                } else {
                  return (
                    <View>
                      <GenericRequestListPage
                        UserProfileDetail={this.state.UserProfileDetail}
                        onClickOfAvatatIcon={{ ...this.onClickOfAvatatIcon }}
                        searchQuery={this.state.searchQuery}
                        onChange={this.onChange}
                        onSearch={{ ...this.onSearch }}
                        selectedPriorityFilter={this.state.selectedPriorityFilter}
                        filterStandered={this.filterStandered}
                        filterPriority={this.filterPriority}
                        filterHighPriority={this.filterHighPriority}
                        onClickOfFilterIcon={{ ...this.onClickOfFilterIcon }}
                        requestListData={this.state.userType === 'end_user' ? this.state.selectedRequestTypeData : this.state.selectedRequestTypeDataForNotary}
                        toggleDropdown={this.toggleDropdown}
                        isModelVisible={this.state.isModelVisible}
                        selectedService={this.state.selectedService}
                        closeToggleDropDown={this.closeToggleDropDown}
                        getActionItemList={this.getActionItemList}
                        getNotaryServiceValue={this.getNotaryServiceValue}
                        getMenuWidth={this.getMenuWidth}
                        redirectPage={this.redirectPage}
                        requestDate={this.state.requestDate}
                        isLoader={this.state.isLoader}
                        isCancelRequestModelOpen={this.state.isCancelRequestModelOpen}
                        closeCancelRequestModel={this.closeCancelRequestModel}
                        CancellationCharge={this.state.CancellationCharge}
                        selectedRequestStatus={this.state.selectedRequestStatus}
                        noToChanges={{ ...this.noToChanges }}
                        yesProceedToChanges={{ ...this.yesProceedToChanges }}
                        formatCancellactionNumber={this.formatCancellactionNumber}
                        onthiredImageClick={{ ...this.openNotificationProps }}
                        getNotificationImage={this.getNotificationImage()}
                        userType={this.state.userType}
                        btnTabRequestAndInviteProps={{...this.btnTabRequestAndInviteProps}}
                        isRequestSelected={this.state.isRequestSelected}
                        isInviteSelected={this.state.isInviteSelected}
                        selectedTab={this.state.selectedTab}
                        handleTabSelection={this.handleTabSelection}
                      />
                    </View>
                  );
                }
              })()}

              <GenericCustomModel
                visible={this.state.isCalendarForDateSelect}
                onClose={() => this.closeCalendarModel()}
                height={'auto'}
                width={337}>

                <View style={styles.modelHeaderView}>
                  <Text style={styles.timeTypeView}>
                    {configJSON.chooseDate}
                  </Text>
                  <TouchableOpacity {...this.closeCalendar}>
                    <Image source={imgClose} style={styles.closeIconView} />
                  </TouchableOpacity>
                </View>

                <View style={styles.marTop20}>
                  <Calendar
                    testID="calendarSelectDataID"
                    maxDate={todayString}
                    markingType={'custom'}
                    firstDay={1}
                    markedDates={this.getMarkedDates()}
                    onDayPress={this.handleDayPress}
                  />
                </View>

                <View style={styles.btnViewOfModel}>
                  <View style={styles.btnViewWidofDone}>
                    <TouchableOpacity
                      testID={"btnYesProceed"}
                      style={[styles.viewOfBtn, this.getDoneButtonEnabled() ? styles.filledBtn : styles.btnDisableView]}
                      {...this.onDateSelectDone}>
                      <Text style={[styles.loginBtnText, styles.filledBtnText]}>{'Done'}</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </GenericCustomModel>
              <View style={styles.containerView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.onViewReject}

                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                      <View style={styles.iconContainer}>
                        <Image source={warningImg} style={styles.warningImg} />
                      </View>
                      <Text style={styles.modalText}>Are you sure you want to reject this request?</Text>
                      <View style={styles.buttonGroup}>
                        <TouchableOpacity
                          testID="onTextIDReject"
                          style={[styles.modalButton, { backgroundColor: '#003399' }]}
                          onPress={() => {
                            this.callApiToRejectRequest()
                            this.onCloseModal()
                          }}>
                          <Text style={styles.buttonText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          testID="onClosemodalID"
                          style={[styles.modalButton, { backgroundColor: '#FFFFFF', borderColor: '#003399', borderWidth: 1 }]}
                          onPress={() => this.onCloseModal()}>
                          <Text style={[styles.buttonText, { color: '#003399' }]}>No</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>


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

              <GenericDocSelectionModel
                  visible={this.state.isSucessMsgModel}
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
            </View>

            {/* Customizable End Start */}
          </TouchableWithoutFeedback>
        </ScrollView>

        {(this.state.UserProfileDetail?.role_id === 1 && !this.state.isFilterPageOpen) && <TouchableOpacity style={styles.buttonBookNow} testID={"btnBookNowNotary"} {...this.btnBookNowProps}>
          <Text style={styles.buttonBookNowText}>{'+  Book Now'}</Text>
        </TouchableOpacity>}
        {!this.state.isFilterPageOpen && <GenericBottomNavigation
          testID="bottomNavigation"
          id={2} userType={this.state.userType} onChangeBottomTab={this.onChangeBottomTab} />
        }
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
    backgroundColor: "#ffffffff"
  },
  mainView: {
    flex: 1
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
  filledBtnText: {
    color: '#fff',
  },
  loginBtnText: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24
  },
  btnViewWidofDone: {
    width: '100%'
  },
  btnDisableView: {
    backgroundColor: '#CCD3E3'
  },
  marTop20: {
    marginTop: 20,
    marginBottom: 10
  },
  modelHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timeTypeView: {
    color: '#000000',
    fontWeight: '500',
    lineHeight: 25.8,
    fontSize: 15
  },
  closeIconView: {
    height: 24,
    width: 24
  },
  btnViewOfModel: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
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
  btnOkForCancel: {
    width: '100%',
  },
  btnView: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#003399',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  warningIcon: {
    fontSize: 30,
    color: '#003399',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  warningImg: {
    height: 48,
    width: 48,
    resizeMode: 'contain',
    marginBottom: 10
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
  

});
// Customizable Area End
