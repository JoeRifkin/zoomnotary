
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Platform } from 'react-native';
import { GenericHeader } from "./GenericHeader";
import { Dropdown } from 'react-native-element-dropdown';
import { imgUnChecked, imgChecked, upArrowImg, downArrowBlackImg, dateTimeImg, imgBackArrow } from "../../blocks/search/src/assets";
export const configJSON = require("../../blocks/search/src/config");

interface FilterOption {
    title: string;
    key: string;
    img: any;
}
interface ServiceType {
    value: string;
    label: string;
}

interface Props {
    closeFilterPage: any;
    PriorityFilterType: FilterOption[];
    selectedPriorityFilter: FilterOption | null;
    getSelectPriorityFilter: any;
    requestStatusType: FilterOption[];
    selectedRequestStatusFilter: FilterOption | null;
    getSelectRequestStatus: any;
    selectedServiceType: ServiceType | null;
    txtInputServicesPrpos: any;
    closeDropDownOfServices: any;
    openServicesDropdown: any;
    servicesList: ServiceType[];
    isServiceDropdownOpen: boolean;
    selectedDateType: string;
    onSelectSingleDate: any;
    onSelectRangeDate: any;
    selectedDateRange: string | undefined;
    getCalendarModalOpen: any;
    btnOpenCalendarProps: any;
    onResetFilter: any;
    onApplyFilter: any;
    getButtonEnabled: any;
}


const GenericRequestListFilterPage: React.FC<Props> = ({ getButtonEnabled, onApplyFilter, onResetFilter, btnOpenCalendarProps, getCalendarModalOpen, selectedDateRange, onSelectRangeDate, onSelectSingleDate, selectedDateType, isServiceDropdownOpen, servicesList, openServicesDropdown, closeDropDownOfServices, txtInputServicesPrpos, selectedServiceType, closeFilterPage, PriorityFilterType, selectedPriorityFilter, getSelectPriorityFilter, requestStatusType, selectedRequestStatusFilter, getSelectRequestStatus }) => {

    const renderStyleOfDataTImeFieldAccordingToOS = () => {
        if (Platform.OS === 'ios') {
            return 'paddTopBott'
        } else {
            return 'padd'
        }
    }

    return (
        <View>
            <View>
                <GenericHeader
                    labelTitle={'Filter'}
                    imgBackArrow={imgBackArrow}
                    btnGoBack={{ ...closeFilterPage }}
                    testID={"btnbackArrow"}
                    isOtherMsg={true}
                />
                <View style={styles.wrapper}>
                    <View>
                        <Text style={[styles.urgencyLevelTxt, styles.margBott10]}>{configJSON.urgencyLevel}</Text>
                    </View>
                    <View style={styles.filterRow}>
                        {PriorityFilterType.map((item: FilterOption) => (
                            <TouchableOpacity key={item.key} style={[styles.daysFilterView, selectedPriorityFilter?.key === item.key ? styles.daysBackColorSelected : styles.daysBackColorNormal]} onPress={() => getSelectPriorityFilter(item)}>
                                <Text style={[styles.daysFiltertxt, selectedPriorityFilter?.key === item.key ? styles.daysFiltertxtSelected : styles.daysFiltertxtNormal]}>{item.title}</Text>
                                <Image source={item.img} style={styles.dotImgView} />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View>
                        <Text style={[styles.urgencyLevelTxt, styles.margBott10]}>{configJSON.requestStatus}</Text>
                    </View>
                    <View style={styles.filterRow}>
                        {requestStatusType.map((item: FilterOption) => (
                            <TouchableOpacity key={item.key} style={[styles.daysFilterView, selectedRequestStatusFilter?.key === item.key ? styles.daysBackColorSelected : styles.daysBackColorNormal]} onPress={() => getSelectRequestStatus(item)}>
                                <Text style={[styles.daysFiltertxt, selectedRequestStatusFilter?.key === item.key ? styles.daysFiltertxtSelected : styles.daysFiltertxtNormal]}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View>
                        <Text style={styles.urgencyLevelTxt}>{configJSON.typeofNotaryService}</Text>
                        <Text style={styles.typeofNotaryDesTxt}>{configJSON.typeofNotaryServiceDes}</Text>
                    </View>

                    <Dropdown
                        maxHeight={300}
                        style={[
                            styles.bgMobileInput
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        labelField="label"
                        valueField="value"
                        value={(selectedServiceType && selectedServiceType?.value) ? selectedServiceType?.value : ''}
                        placeholder={!selectedServiceType ? 'Type of Notary Services' : '...'}
                        data={servicesList}
                        testID="serviceListId"
                        onChange={(item: ServiceType) => txtInputServicesPrpos(item)}
                        onFocus={openServicesDropdown}
                        onBlur={closeDropDownOfServices}
                        renderRightIcon={() => (
                            <View>
                                <Image style={styles.arrowUpDownView} source={isServiceDropdownOpen ? upArrowImg : downArrowBlackImg} />
                            </View>)}
                    />

                    <View>
                        <Text style={[styles.urgencyLevelTxt, styles.margBott10, styles.marTop10]}>{configJSON.date}</Text>
                    </View>
                    <View style={[styles.radioBtnVIew, styles.margBott10]}>
                        <TouchableOpacity style={styles.radioBtnVIew} {...onSelectSingleDate}>
                            <Image style={styles.radioBtnImg} source={selectedDateType === 'request' ? imgChecked : imgUnChecked} />
                            <Text style={styles.radioLabelTxt}>Request Date</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.radioBtnVIew, styles.marLeft20]} {...onSelectRangeDate}>
                            <Image style={styles.radioBtnImg} source={selectedDateType === 'completion' ? imgChecked : imgUnChecked} />
                            <Text style={styles.radioLabelTxt}>Completion Date</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bgPasswordContainer}>
                        <TextInput
                            testID={"dataAndTimeId"}
                            style={[styles.bgMobileInputForDataTime, styles[renderStyleOfDataTImeFieldAccordingToOS()], styles.bgPasswordInput, styles.textFieldBg]}
                            placeholder={'Select Date'}
                            value={selectedDateRange}
                            onFocus={() => getCalendarModalOpen()}
                        />
                        <TouchableOpacity
                            testID={'calendarIconId'}
                            style={styles.passwordShowHide}
                            {...btnOpenCalendarProps}
                        >
                            <Image
                                source={dateTimeImg}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={[styles.btnView, styles.marTop30]}>
                    <View style={styles.btnViewWid}>
                        <TouchableOpacity
                            testID={"btnNoToProceed"}
                            style={[styles.blankBtn]}
                            {...onResetFilter}>
                            <Text style={[styles.loginBtnText, styles.blankBtnText]}>{configJSON.reset}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnViewWidofYes}>
                        <TouchableOpacity
                            testID={"btnYesProceed"}
                            style={[styles.viewOfBtn, getButtonEnabled() ? styles.filledBtn : styles.btnDisableView]}
                            {...onApplyFilter}>
                            <Text style={[styles.loginBtnText, styles.filledBtnText]}>{configJSON.applyFilter}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({

    dotImgView: {
        width: 8,
        height: 8,
        marginLeft: 8
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
    wrapper: {
        padding: 15,
        flex: 1
    },

    daysFilterView: {
        height: 34,
        borderRadius: 26,
        paddingBottom: 4,
        paddingTop: 4,
        paddingLeft: 12,
        paddingRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 5,
        flexDirection: 'row'
    },
    filterRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    daysBackColorNormal: {
        backgroundColor: '#F0E5FF'
    },
    daysBackColorSelected: {
        backgroundColor: '#F0E5FF',
        borderColor: '#012275',
        borderWidth: 1.5
    },
    daysFiltertxt: {
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 18.02
    },
    daysFiltertxtNormal: {
        color: '#475569'
    },
    daysFiltertxtSelected: {
        color: '#012275'
    },

    bgPasswordContainer: {
        flexDirection: "row",
        borderRadius: 8,
    },
    bgMobileInputForDataTime: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 25,
        includeFontPadding: true,
        height: 44,
        fontWeight: '500',
        lineHeight: 19.94,
        fontStyle: 'normal',
        borderRadius: 8,
        borderWidth: 2,
        borderStyle: 'solid',
    },
    bgPasswordInput: {
        flex: 1,
        textAlign: 'left'
    },
    paddTopBott: {
        paddingLeft: 10,
        paddingBottom: 6,
    },
    padd: {
        padding: 10
    },
    textFieldBg: {
        backgroundColor: "#F8FAFC",
        borderColor: "#CBD5E1",
    },
    passwordShowHide: {
        alignSelf: "center",
        position: 'absolute',
        right: 16,
        paddingBottom: 22
    },
    btnDisableView: {
        backgroundColor: '#CCD3E3'
    },
    urgencyLevelTxt: {
        color: '#1E293B',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 22,
    },
    margBott10: {
        marginBottom: 10
    },
    typeofNotaryDesTxt: {
        color: '#64748B',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 18,
    },
    bgMobileInput: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 5,
        marginTop: 15,
        includeFontPadding: true,
        height: 44,
        fontWeight: '400',
        lineHeight: 22,
        fontStyle: 'normal',
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 10,
        borderColor: '#CBD5E1',
        backgroundColor: '#F8FAFC'
    },
    placeholderStyle: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 22,
        fontStyle: 'normal',
        color: '#64748B'
    },
    selectedTextStyle: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 22,
        fontStyle: 'normal',
        color: '#000'
    },
    iconStyle: {
        width: 40,
        height: 40,
        marginRight: 8,
    },
    arrowUpDownView: {
        marginRight: 10
    },
    radioBtnVIew: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    marLeft20: {
        marginLeft: 20
    },
    radioLabelTxt: {
        color: '#334155',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 16.94,
        marginLeft: 10
    },
    radioBtnImg: {
        height: 20,
        width: 20
    },
    marTop10: {
        marginTop: 10
    },
    marTop30: {
        marginTop: 80
    },

});

export default GenericRequestListFilterPage