
import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Platform, Dimensions, FlatList } from 'react-native';
import { GenericHeader } from "./GenericHeader";
import { emptyFolderImg, threeDotsImg, rightGreenArrowImg, filterImg, headsetImg, searchImg, searchIcon, greenDotImg, redDotImg, orangeDotImg } from "../../blocks/search/src/assets";
export const configJSON = require("../../blocks/search/src/config");
import { Menu, MenuItem, } from 'react-native-material-menu';
import { GenericCustomModel } from "./GenericCustomModel";
interface FilterOption {
    title: string;
    key: string;
    img: any;
}

interface CancellationPolicy {
    cancellation_charges: number;
}

interface Props {
    UserProfileDetail: any;
    onClickOfAvatatIcon: any;
    searchQuery: string;
    onChange: any;
    onSearch: any;
    selectedPriorityFilter: FilterOption |null;
    filterStandered: any;
    filterPriority: any;
    filterHighPriority: any
    onClickOfFilterIcon: any
    requestListData: any;
    toggleDropdown: any;
    isModelVisible: boolean;
    selectedService: number| null;
    closeToggleDropDown: any;
    getActionItemList: any;
    getNotaryServiceValue: any;
    getMenuWidth: any;
    redirectPage: any;
    requestDate: string;
    isLoader: boolean;
    isCancelRequestModelOpen: boolean;
    closeCancelRequestModel: any;
    CancellationCharge: CancellationPolicy | null;
    selectedRequestStatus: string;
    noToChanges: any;
    yesProceedToChanges: any;
    formatCancellactionNumber: any;
    onthiredImageClick: any;
    getNotificationImage: any;
    userType: string;
    isRequestSelected: boolean;
    isInviteSelected: boolean;
    selectedTab: string;
    handleTabSelection: any;
    btnTabRequestAndInviteProps: any;
}


const GenericRequestListPage: React.FC<Props> = ({btnTabRequestAndInviteProps, handleTabSelection, selectedTab, isInviteSelected, isRequestSelected, userType, getNotificationImage, onthiredImageClick, formatCancellactionNumber, yesProceedToChanges, noToChanges, selectedRequestStatus, CancellationCharge, closeCancelRequestModel, isCancelRequestModelOpen, isLoader, requestDate, getNotaryServiceValue, redirectPage, getMenuWidth, getActionItemList, closeToggleDropDown, selectedService, isModelVisible, toggleDropdown, requestListData, onClickOfFilterIcon, filterHighPriority, filterPriority, filterStandered, selectedPriorityFilter, onSearch, onChange, searchQuery, UserProfileDetail, onClickOfAvatatIcon }) => {

    const renderCardRightBorder = (priority: string) => {
        switch (priority) {
            case 'Standard':
                return 'cardBorderRightColorForInProgress';
            case 'Priority':
                return 'cardBorderRightColorForDraftPendingCancelled';
            default:
                return 'cardBorderRightColorForCompleted';
        }
    }

    const renderStatusText = (status: string) => {
        switch (status.toLowerCase()) {
            case 'rejected':
                return 'rejectedStatusTxt';
            case 'invite':
                return 'invitedStatusTxt';
            case 'accepted':
                return 'acceptedStatusTxt';
            case 'completed':
                return 'completedStatusTxt';
            case 'draft':
                return 'draftStatusTxt';
            case 'pending':
                return 'pendingStatusTxt';
            case 'cancelled':
                return 'cancelledStatusTxt';
            default:
                return 'inprogressStatusTxt';
        }
    };

    const renderStatusView = (status: string) => {
        switch (status.toLowerCase()) {
            case 'invite':
                return 'invitedStatusView';
            case 'rejected':
                return 'rejectedStatusView';
            case 'accepted':
                return 'acceptedStatusView';
            case 'completed':
                return 'completedStatusView';
            case 'draft':
                return 'draftStatusView';
            case 'pending':
                return 'pendingStatusView';
            case 'cancelled':
                return 'cancelledStatusView';
            default:
                return 'inprogressStatusView';
        }
    };

    const getDateColorAccordingToData = (date: string) => {
        if (UserProfileDetail?.role_id === 1 && isPreviousDate(date)) {
            return 'redColor'
        } else {
            return 'normalColor'
        }
    }

    const isPreviousDate = (inputDate: string) => {
        const currentDate = new Date();
        const dateToCheck = new Date(inputDate);

        currentDate.setHours(0, 0, 0, 0);
        dateToCheck.setHours(0, 0, 0, 0);

        return dateToCheck < currentDate;
    };

    const convertData = (date: any) => {
        const dateObject = new Date(date);
        const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
        return formattedDate
    }

    const getAbbreviationForMethod = (str: string) => {
        if(str){
          const match = str.match(/\(([^()]*)\)/);
          return match ? match[1] : "";
        } else {
          return ""
        }
    };

    const renderDash = () => {
        return (
            <Text style={styles.dashStyle}>-</Text>
        )
    }

    const tabs = ['New Requests', 'Ongoing', 'Invites'];

    return (
        <View>
            <GenericHeader
                labelTitle={''}
                imgBackArrow={UserProfileDetail?.photo?.url}
                // secImg={UserProfileDetail?.role_id === 1 ? headsetImg : searchImg}
                thiredImg={getNotificationImage}
                btnGoBack={{ ...onClickOfAvatatIcon }}
                onthiredImageClick={{...onthiredImageClick}}
                testID={"btnAvatarIcon"}
                isOtherMsg={true}
                isImgAvatar={true}
                UserName={UserProfileDetail?.full_name?.charAt(0).toUpperCase()}
            />
            <View style={styles.fieldView} >
            {userType === 'end_user' ?
                <View style={[styles.toggleButton, isRequestSelected ? styles.padLeft : styles.padRight]}>

                  <TouchableOpacity testID={"btnRequests"} style={[styles.toggleBtnView, isRequestSelected ? styles.selectedBtn : styles.unSelectedBtn]} {...btnTabRequestAndInviteProps}>
                    <Text style={[styles.textOfTggleBtn, isRequestSelected ? styles.selectedText : styles.unSelectedText]}>{'Requests'}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity testID={"btnInvites"} style={[styles.toggleBtnView, isInviteSelected ? styles.selectedBtn : styles.unSelectedBtn]} {...btnTabRequestAndInviteProps}>
                    <Text style={[styles.textOfTggleBtn, isInviteSelected ? styles.selectedText : styles.unSelectedText]}>{'Invites'}</Text>
                  </TouchableOpacity>
                </View>
                :
                <View style={styles.toggleButton}>
                  {tabs.map((tab) => {
                    const isSelected = selectedTab === tab;
                    return (
                      <TouchableOpacity
                        key={tab}
                        testID={`btn${tab.replace(/\s+/g, '')}`}
                        style={[styles.toggleBtnViewForNotary, isSelected ? styles.selectedBtn : styles.unSelectedBtn]}
                        onPress={() => handleTabSelection(tab)}
                      >
                        <Text style={[styles.textOfTggleBtn, isSelected ? styles.selectedText : styles.unSelectedText]}>
                          {tab}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>}
                <View style={styles.searchBarContainer}>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search"
                        placeholderTextColor={'#64748B'}
                        value={searchQuery}
                        onChangeText={(text) => onChange(text)}
                        testID="onChangeSearch"
                    />
                    <TouchableOpacity
                        testID="searchIcon"
                        {...onSearch}
                    >
                        <Image style={styles.searchIcon} source={searchIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.priorityAndFilterTab}>
                    <TouchableOpacity style={[styles.priorityTabView, selectedPriorityFilter?.title === configJSON.SuperPriority ? styles.priorityTabViewselected : styles.priorityTabViewUnselected]} onPress={() => filterHighPriority('Super Priority')}>
                        <Text style={[styles.priorityTxt, selectedPriorityFilter?.title === configJSON.highPriority ? styles.priorityTxtselected : styles.priorityTxtUnselected]}>{configJSON.highPriority}</Text>
                        <Image source={redDotImg} style={styles.dotImgView} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.priorityTabView, selectedPriorityFilter?.title === configJSON.priority ? styles.priorityTabViewselected : styles.priorityTabViewUnselected]} onPress={() => filterPriority('Priority')} >
                        <Text style={[styles.priorityTxt, selectedPriorityFilter?.title === configJSON.priority ? styles.priorityTxtselected : styles.priorityTxtUnselected]}>{configJSON.priority}</Text>
                        <Image source={orangeDotImg} style={styles.dotImgView} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.priorityTabView, selectedPriorityFilter?.title === configJSON.standard ? styles.priorityTabViewselected : styles.priorityTabViewUnselected]} onPress={() => filterStandered('Standard')}>
                        <Text style={[styles.priorityTxt, selectedPriorityFilter?.title === configJSON.standard ? styles.priorityTxtselected : styles.priorityTxtUnselected]}>{configJSON.standard}</Text>
                        <Image source={greenDotImg} style={styles.dotImgView} />
                    </TouchableOpacity>
                    <TouchableOpacity {...onClickOfFilterIcon}>
                        <Image source={filterImg} style={styles.filterImageView} />
                    </TouchableOpacity>
                </View>

                <View style={styles.flatListBottom}>
                    {requestListData && requestListData.length > 0 ?
                        <FlatList
                            data={requestListData}
                            renderItem={({ item }) => (
                                <TouchableOpacity testID={`flatListItemID-${item.id}`} style={[styles.cardView, styles[renderCardRightBorder(item.attributes.priority)]]}>
                                    <View style={styles.cardFirstWidth}>
                                        <View style={[styles.cardInsideView, styles.marginFive, styles.justifuView]}>
                                            <View style={[styles.cardInsideView, styles.alignView]}>
                                                <View style={styles.servieProviderView}>
                                                    <Text style={styles.serviceText}>Order ID</Text>
                                                    <Text style={styles.providerView}>{item.id}</Text>
                                                </View>
                                            </View>
                                            <View style={[styles.cardInsideView, styles.alignView, styles.marRight20]}>
                                                <View style={[styles.statusView, styles[renderStatusView(item.attributes?.invite_request && (isInviteSelected || selectedTab === 'Invites') ? item.attributes?.invited_request_status : item.attributes?.status)]]}>
                                                    <Text style={[styles.statusText, styles[renderStatusText(item.attributes?.invite_request && (isInviteSelected || selectedTab === 'Invites') ? item.attributes?.invited_request_status : item.attributes?.status)]]}>{item.attributes?.invite_request && (isInviteSelected || selectedTab === 'Invites') ? item.attributes?.invited_request_status : item.attributes.status.toUpperCase().replace(/_/g, ' ')}</Text>
                                                </View>
                                                <TouchableOpacity testID="threeDotImgID" style={styles.dotImgBackColor} onPress={() => toggleDropdown(Number(item.id))}>
                                                    <Image style={styles.dotViewImg} source={threeDotsImg} />
                                                </TouchableOpacity>
                                                <View>
                                                    <Menu
                                                        testID="menu-item-list"
                                                        visible={isModelVisible && selectedService === Number(item.id)}
                                                        onRequestClose={() => closeToggleDropDown()}
                                                        style={styles.menuListView}>
                                                        <View testID="menu-item-list">
                                                            {getActionItemList(item?.attributes?.quote_statuses_id).map((itemMenu: any, index: number) => (
                                                                itemMenu.action.includes(item.attributes?.invite_request && (isInviteSelected || selectedTab === 'Invites') ? item.attributes?.invited_request_status.toLowerCase() : item.attributes?.status?.toLowerCase()) &&
                                                                <MenuItem style={[styles.menuItem, { width: getMenuWidth() }]} 
                                                                onPress={() => redirectPage(itemMenu.key, item.id, item.attributes?.invite_request && (isInviteSelected || selectedTab === 'Invites') ? item.attributes?.invited_request_status : item.attributes.status, item.attributes.date, item?.attributes?.notarisation_method?.notarisation_method)} key={index}>
                                                                    <View testID="selectedMenuID" style={styles.menuItemView}>
                                                                        <Image style={styles.menuIconView} source={itemMenu.icon} />
                                                                        <Text style={styles.menuTextView}>{itemMenu.text}</Text>
                                                                    </View>
                                                                </MenuItem>
                                                            ))}
                                                        </View>
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
                                                            getNotaryServiceValue(item.attributes.notary_service_type, 20) !== "" ?
                                                                <Text style={styles.providerView}>{getNotaryServiceValue(item.attributes.notary_service_type, 20)}</Text>
                                                                :
                                                            renderDash()
                                                        }
                                                </View>
                                            </View>
                                            <View style={[styles.cardInsideView, styles.alignView, styles.marRight]}>
                                                <View style={[styles.servieProviderView, styles.noDocView]}>
                                                    <Text style={styles.serviceText}>Method</Text>
                                                        {
                                                            getAbbreviationForMethod(item.attributes.notarisation_method?.notarisation_method) !== "" ?
                                                                <Text style={[styles.providerView, styles.alignText]}>{getAbbreviationForMethod(item.attributes.notarisation_method?.notarisation_method)}</Text>
                                                                :
                                                            renderDash()
                                                        }
                                                </View>
                                            </View>
                                        </View>

                                        <View style={[styles.cardInsideView, styles.marginFive, styles.justifuView]}>
                                            <View style={[styles.cardInsideView, styles.alignView]}>
                                                <View style={styles.servieProviderView}>
                                                    <Text style={styles.serviceText}>{requestDate}</Text>
                                                    {
                                                        item.attributes.date ?
                                                        <Text style={[styles.dateProviderView, styles[getDateColorAccordingToData(item.attributes.date)]]}>{convertData(item.attributes.date)}</Text>
                                                        :
                                                      renderDash()
                                                    }
                                                </View>
                                            </View>
                                            <View style={[styles.cardInsideView, styles.alignView, styles.marRight]}>
                                                <View style={[styles.servieProviderView, styles.noDocView]}>
                                                    <Text style={[styles.serviceText, styles.alignText]}>Level of urgency</Text>
                                                        {
                                                            item.attributes.priority ?
                                                                <Text style={[styles.providerView, styles.alignText]}>{item.attributes.priority}</Text>
                                                                :
                                                                renderDash()
                                                        }
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.cardSecWidth}>
                                        <Image source={rightGreenArrowImg} style={styles.rightArrowImgVIew} />
                                    </View>
                                </TouchableOpacity>
                            )}
                            //   extraData={this.state}
                            keyExtractor={(item) => item.id}
                        /> : isLoader ?
                            <ActivityIndicator size="large" color="#001569" style={styles.loaderStyles} />
                            : <View style={[styles.emptyFolderView]}>
                                <Image style={styles.emptyFolderImg} source={emptyFolderImg} />
                                <Text style={styles.emptyMsg}>{configJSON.emptyRequestMsg}</Text>
                            </View>}
                </View>

            </View>

            <GenericCustomModel
                visible={isCancelRequestModelOpen}
                onClose={() => closeCancelRequestModel()}
                height={'auto'}
                width={337}>
                 <Text style={styles.confirmationMsgView}>{
                    selectedRequestStatus.toLowerCase() === 'draft' ?
                    configJSON.deleteCofirmMsg
                      :
                      configJSON.cancelCofirmMsg
                  }</Text>
                {(CancellationCharge && selectedRequestStatus.toLowerCase() === 'in progress') &&
                    <Text style={styles.requestChargeMsgView}>{configJSON.chargeRequest}<Text style={styles.chargeAmountView}>{formatCancellactionNumber(CancellationCharge.cancellation_charges.toString())}£</Text></Text>}
                <View style={styles.btnView}>
                    <View style={styles.btnViewWid}>
                        <TouchableOpacity
                            testID={"btnNoToProceed"}
                            style={[styles.blankBtn]}
                            {...noToChanges}>
                            <Text style={[styles.loginBtnText, styles.blankBtnText]}>{configJSON.back}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnViewWidofYes}>
                        <TouchableOpacity
                            testID={"btnYesProceed"}
                            style={[styles.viewOfBtn, styles.filledBtn]}
                            {...yesProceedToChanges}>
                            <Text style={[styles.loginBtnText, styles.filledBtnText]}>{configJSON.yesProceed}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </GenericCustomModel>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffffff"
    },
    fieldView: {
        padding: 24,
        overflow: 'scroll',
    },
    mainView: {
        flex: 1
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
        height: 48
    },
    searchIcon: {
        marginRight: 20,
        width: 24,
        height: 24,
    },
    priorityAndFilterTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    priorityTabView: {
        height: 26,
        borderRadius: 22,
        paddingRight: 8,
        paddingLeft: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 5,
        flexDirection: 'row'
    },
    priorityTabViewUnselected: {
        backgroundColor: '#F1F5F9',
    },
    priorityTabViewselected: {
        backgroundColor: '#FFFFFF',
        borderColor: '#012275',
        borderWidth: 1
    },
    priorityTxt: {
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 18.2
    },
    priorityTxtUnselected: {
        color: '#475569',
    },
    priorityTxtselected: {
        color: '#012275'
    },
    dotImgView: {
        width: 8,
        height: 8,
        marginLeft: 8
    },
    filterImageView: {
        height: 24,
        width: 24
    },
    cardView: {
        backgroundColor: '#F6F8FF',
        marginTop: '4%',
        borderRadius: 8,
        borderRightWidth: 4,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    justifuView: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    alignView: {
        alignItems: 'center'
    },
    servieProviderView: {
        flexDirection: 'column',
        marginLeft: 10
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
    rightArrowImgVIew: {
        height: 8,
        width: 5,
        right: 10,
        top: 4
    },
    dotImgBackColor: {
        height: 15,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
        left: 10,
    },
    menuListView: {
        marginTop: 35,
        marginLeft: 25,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        width: 'auto',
        zIndex: 999999
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
    flatListBottom: {
        marginBottom: 70
    },
    loaderStyles: {
        flex: 1,
        opacity: 1,
        marginTop: (Dimensions.get('screen').height / 4),
    },
    emptyFolderView: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: (Dimensions.get('screen').height / 4.5)
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
    dashStyle: {
        alignSelf: 'center'
    },
    toggleButton: {
        flexDirection: 'row',
        width: Dimensions.get('screen').width - 50,
        borderWidth: 2,
        borderRadius: 80,
        borderColor: '#012275',
        marginTop: 16,
        marginBottom: 16,
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
        width: ((Dimensions.get('screen').width - 40) / 2) - 10,
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
      toggleButtonForNotary: {
        flexDirection: 'row',
        width: Dimensions.get('screen').width - 50,
        borderWidth: 2,
        borderRadius: 80,
        borderColor: '#012275',
        marginTop: 16,
        marginBottom: 16,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 2,
      },
      toggleBtnViewForNotary: {
        width: ((Dimensions.get('screen').width - 40) / 3) - 7,
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
});

export default GenericRequestListPage