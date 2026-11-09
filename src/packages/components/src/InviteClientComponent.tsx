
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
    selectedPriorityFilter: FilterOption | null;
    InviteListData: any;
    InvitetoggleDropdown: any;
    InviteisModelVisible: boolean;
    InviteisselectedService: number | null;
    InviteCloseToggleDropDown: any;
    InvitegetActionItemList: any;
    InvitegetNotaryServiceValue: any;
    getMenuWidthInvite: any;
    redirectPageInvite: any;
    requestDateInvite: string;
    isLoaderInvite: boolean;
    isCancelRequestModelOpenInvite: boolean;
    InvitecloseCancelRequestModel: any;
    InviteCancellationCharge: CancellationPolicy | null;
    InviteselectedRequestStatus: string;
    InvitenoToChanges: any;
    InviteyesProceedToChanges: any;
    InviteformatCancellactionNumber: any;

   
}


const InviteClientComponent: React.FC<Props> = ({  InviteformatCancellactionNumber, InviteyesProceedToChanges, InvitenoToChanges, InviteselectedRequestStatus, InviteCancellationCharge, InvitecloseCancelRequestModel, isCancelRequestModelOpenInvite, isLoaderInvite, requestDateInvite, InvitegetNotaryServiceValue, redirectPageInvite, getMenuWidthInvite, InvitegetActionItemList, InviteCloseToggleDropDown, InviteisselectedService, InviteisModelVisible, InvitetoggleDropdown, InviteListData, UserProfileDetail, onClickOfAvatatIcon }) => {

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
            case 'completed':
                return 'completedStatusTxt';
            case 'draft':
                return 'draftStatusTxt';
            case 'pending':
                return 'pendingStatusTxt';
            case 'cancelled':
                return 'cancelledStatusTxt';
            case 'invite':
                return 'inviteStatusTxt';
            case 'rejected':
                return 'rejectStatusTxt';
            default:
                return 'inprogressStatusTxt';
        }
    };

    const renderStatusView = (status: string) => {
        console.log("status@@", status.toLowerCase())
        switch (status.toLowerCase()) {

            case 'completed':
                return 'completedStatusView';
            case 'draft':
                return 'draftStatusView';
            case 'pending':
                return 'pendingStatusView';
            case 'cancelled':
                return 'cancelledStatusView';
            case 'invite':
                return 'inviteStatusView1';
            case 'rejected':
                return 'rejectStatusView1';
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

    return (
        <View>
            <GenericHeader
                labelTitle={''}
                imgBackArrow={UserProfileDetail?.photo?.url}
                secImg={null}
                thiredImg={null}
                btnGoBack={{ ...onClickOfAvatatIcon }}
                testID={"btnAvatarIcon"}
                isOtherMsg={true}
                isImgAvatar={true}
                UserName={UserProfileDetail?.full_name?.charAt(0).toUpperCase()}
            />
            <View style={styles.fieldView} >
                <View style={styles.flatListBottom}>
                    {InviteListData && InviteListData.length > 0 ?
                        <FlatList
                            data={InviteListData}
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
                                                <View style={[styles.statusView, styles[renderStatusView(item.attributes?.invited_request_status)]]}>
                                                    <Text style={[styles.statusText, styles[renderStatusText(item.attributes?.invited_request_status)]]}>
                                                        {item.attributes.invited_request_status.toUpperCase().replace(/_/g, ' ')}</Text>
                                                </View>
                                                <TouchableOpacity testID="threeDotImgID" style={styles.dotImgBackColor} onPress={() => InvitetoggleDropdown(Number(item.id))}>
                                                    <Image style={styles.dotViewImg} source={threeDotsImg} />
                                                </TouchableOpacity>
                                                <View>
                                                    <Menu
                                                        testID="menu-item-list"
                                                        visible={InviteisModelVisible && InviteisselectedService === Number(item.id)}
                                                        onRequestClose={() => InviteCloseToggleDropDown()}
                                                        style={styles.menuListView}>
                                                        <View testID="menu-item-list">
                                                            {InvitegetActionItemList(item?.attributes?.quote_statuses_id).map((itemMenu: any, index: number) => (
                                                                itemMenu.action.includes(item?.attributes?.invited_request_status?.toLowerCase()) &&
                                                                <MenuItem style={[styles.menuItem, { width: getMenuWidthInvite() }]}
                                                                    onPress={() => redirectPageInvite(itemMenu.key, item.id, 
                                                                    item?.attributes?.invited_request_status, item?.attributes?.date, 
                                                                    item?.attributes?.notarisation_method.notarisation_method)} key={index}>
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
                                                    <Text style={styles.providerView}>{InvitegetNotaryServiceValue(item.attributes.notary_service_type, 20)}</Text>
                                                </View>
                                            </View>
                                            <View style={[styles.cardInsideView, styles.alignView, styles.marRight]}>
                                                <View style={[styles.servieProviderView, styles.noDocView]}>
                                                    <Text style={styles.serviceText}>No. of documents</Text>
                                                    {
                                                        item.attributes.notarised_document ?
                                                            <Text style={[styles.providerView, styles.alignText]}>{item.attributes.notarised_document}</Text>
                                                            :
                                                            <Text style={{alignSelf :'center' }}>-</Text>
                                                    }
                                                </View>
                                            </View>
                                        </View>

                                        <View style={[styles.cardInsideView, styles.marginFive, styles.justifuView]}>
                                            <View style={[styles.cardInsideView, styles.alignView]}>
                                                <View style={styles.servieProviderView}>
                                                    <Text style={styles.serviceText}>{requestDateInvite}</Text>
                                                    <Text style={[styles.dateProviderView, styles[getDateColorAccordingToData(item.attributes.date)]]}>{convertData(item.attributes.date)}</Text>
                                                </View>
                                            </View>
                                            <View style={[styles.cardInsideView, styles.alignView, styles.marRight]}>
                                                <View style={[styles.servieProviderView, styles.noDocView]}>
                                                    <Text style={[styles.serviceText, styles.alignText]}>Level of urgency</Text>
                                                    <Text style={[styles.providerView, styles.alignText]}>{item.attributes.priority}</Text>
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
                        /> : isLoaderInvite ?
                            <ActivityIndicator size="large" color="#001569" style={styles.loaderStyles} />
                            : <View style={[styles.emptyFolderView]}>
                                <Image style={styles.emptyFolderImg} source={emptyFolderImg} />
                                <Text style={styles.emptyMsg}>{configJSON.emptyRequestMsg}</Text>
                            </View>}
                </View>

            </View>

            <GenericCustomModel
                visible={isCancelRequestModelOpenInvite}
                onClose={() => InvitecloseCancelRequestModel()}
                height={'auto'}
                width={337}>
                <Text style={styles.confirmationMsgView}>{configJSON.cancelCofirmMsg}</Text>
                {(InviteCancellationCharge && InviteselectedRequestStatus.toLowerCase() === 'in progress') &&
                    <Text style={styles.requestChargeMsgView}>{configJSON.chargeRequest}<Text style={styles.chargeAmountView}>{InviteformatCancellactionNumber(InviteCancellationCharge.cancellation_charges.toString())}£</Text></Text>}
                <View style={styles.btnView}>
                    <View style={styles.btnViewWid}>
                        <TouchableOpacity
                            testID={"btnNoToProceed"}
                            style={[styles.blankBtn]}
                            {...InvitenoToChanges}>
                            <Text style={[styles.loginBtnText, styles.blankBtnText]}>{configJSON.back}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnViewWidofYes}>
                        <TouchableOpacity
                            testID={"btnYesProceed"}
                            style={[styles.viewOfBtn, styles.filledBtn]}
                            {...InviteyesProceedToChanges}>
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
    rejectStatusView1: {
        backgroundColor: "#ffcacc",
    },
    inviteStatusView1: {
        backgroundColor: "#f0e5ff"
    },
    cancelledStatusTxt: {
        color: "#DC2626"
    },
    inviteStatusTxt: {
        color: "#6201ea"
    },
    rejectStatusTxt: {
        color: "#ff0100"
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


});

export default InviteClientComponent