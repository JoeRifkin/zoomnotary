import React from "react";
// Customizable Area Start

import { ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
    ActivityIndicator,
    KeyboardAvoidingView, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { imgStripe, imgUnChecked, imgChecked, imgClose, dateTimeImg, filterIcon, imgBackArrow, searchIcon } from "./assets";
import CustomLoader from "../../../components/src/CustomLoader";
import GenericTransactionHistory from "../../../components/src/GenericTransactionHistory";
import { GenericHeader } from "../../../components/src/GenericHeader";
import { GenericCustomModel } from "../../../components/src/GenericCustomModel";
import { Calendar } from 'react-native-calendars';
interface FilterOption {
    title: string;
    key: string;
}

const today = new Date();
const todayString = today.toISOString().split('T')[0];
// Customizable Area End

import TransactionHistoryController, {
    Props,
    configJSON,
} from "./TransactionHistoryController";

export default class TransactionHistory extends TransactionHistoryController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    renderHeader = () => {
        return (
            <GenericHeader
                labelTitle={this.getTitleOfHeader()}
                imgBackArrow={imgBackArrow}
                btnGoBack={{ ...this.onGoBack }}
                onthiredImageClick={{...this.onSecImageClick}}
                thiredImg={filterIcon}
                testID={"btnbackArrow"}
                isOtherMsg={true}
            />
        )
    }

    renderSearchBox = () => {
        return (
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search"
                    placeholderTextColor={'#333'}
                    value={this.state.searchQuery}
                    onChangeText={(text) => this.onChange(text)}
                    testID="onChangeSearch"
                />
                <TouchableOpacity
                    testID="searchIcon"
                    onPress={this.onSearch}
                >
                    <Image style={styles.searchIcon} source={searchIcon} />
                </TouchableOpacity>
            </View>
        )
    }

    noDataFound = () => {
        const { loading, error } = this.state;
    
        if (!loading) {
            return (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>{error || "No Transaction History"}</Text>
                </View>
            );
        }
    }

    renderFilterPageUI = () => {
        return (
            <View>
                <GenericHeader
                    labelTitle={'Filter'}
                    imgBackArrow={imgBackArrow}
                    btnGoBack={{ ...this.closeFilterPage }}
                    testID={"btnbackArrow"}
                    isOtherMsg={true}
                />
                <View style={styles.wrapper}>
                    <View style={styles.filterRow}>
                        {this.daysFilterType.map((item: FilterOption) => (
                            <TouchableOpacity key={item.key} style={[styles.daysFilterView, this.state.selectedDayFilter?.key === item.key ? styles.daysBackColorSelected : styles.daysBackColorNormal]} onPress={() => this.getSelectDaysFilter(item)}>
                                <Text style={[styles.daysFiltertxt, this.state.selectedDayFilter?.key === item.key ? styles.daysFiltertxtSelected : styles.daysFiltertxtNormal]}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View>
                        <Text style={styles.paymenstatusTxt}>{configJSON.date}</Text>
                    </View>
                    <View style={styles.bgPasswordContainer}>
                        <TextInput
                            testID={"dataAndTimeId"}
                            style={[styles.bgMobileInputForDataTime, styles[this.renderStyleOfDataTImeFieldAccordingToOS()], styles.bgPasswordInput, styles.textFieldBg]}
                            placeholder={'Select Date'}
                            value={this.state.selectedDateRange}
                            onFocus={() => this.getCalendarModalOpen()}
                        />
                        <TouchableOpacity
                            testID={'calendarIconId'}
                            style={styles.passwordShowHide}
                            {...this.btnOpenCalendarProps}
                        >
                            <Image
                            source={dateTimeImg}
                            />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.paymenstatusTxt}>{configJSON.paymentStatus}</Text>
                    </View>
                    <View style={styles.filterRow}>
                        {this.paymentStatusType.map((item: FilterOption) => (
                            <TouchableOpacity key={item.key} style={[styles.daysFilterView, this.state.selectedPaymentStatus?.key === item.key ? styles.daysBackColorSelected : styles.daysBackColorNormal]} onPress={() => this.getSelectPaymentStatus(item)}>
                                <Text style={[styles.daysFiltertxt, this.state.selectedPaymentStatus?.key === item.key ? styles.daysFiltertxtSelected : styles.daysFiltertxtNormal]}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View> 
                <View style={styles.btnView}>
                    <View style={styles.btnViewWid}>
                        <TouchableOpacity
                            testID={"btnNoToProceed"}
                            style={[styles.blankBtn]}
                            {...this.onResetFilter}>
                            <Text style={[styles.loginBtnText, styles.blankBtnText]}>{configJSON.reset}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnViewWidofYes}>
                        <TouchableOpacity
                            testID={"btnYesProceed"}
                            style={[styles.viewOfBtn, this.getButtonEnabled() ? styles.filledBtn : styles.btnDisableView]}
                            {...this.onApplyFilter}>
                            <Text style={[styles.loginBtnText, styles.filledBtnText]}>{configJSON.applyFilter}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }

    renderTransactionPageUI = () => {
        return (
            <View>
                {this.renderHeader()}
                <View style={styles.wrapper}>
                    {this.renderSearchBox()}
                    {this.isFilterApplyed() && this.renderFilteredBoxUI()}
                    {this.isShowingHistoryList() ?
                        <FlatList
                            data={this.state.transactions}
                            renderItem={({ item }) => <GenericTransactionHistory {...item} stripeImg={imgStripe} />}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            testID="transactionsList"
                            
                        /> : this.noDataFound()
                    }
                </View>
                <CustomLoader loader={this.state.loading}/>
            </View>
        )
    }

    renderFilteredBoxUI = () => {
        return (
            <View style={styles.filterRow}>
                {this.isPaymentStatusSelectForFilter() &&<TouchableOpacity style={[styles.daysFilterView, styles.daysBackColorNormal, styles.borderViewSelectedFilter]} >
                    <Text style={[styles.daysFiltertxt, styles.daysFiltertxtNormal]}>{this.state.selectedPaymentStatus?.title}</Text>
                </TouchableOpacity> }
                {this.isDayTypeSelectForFilter() &&<TouchableOpacity style={[styles.daysFilterView, styles.daysBackColorNormal, styles.borderViewSelectedFilter]} >
                    <Text style={[styles.daysFiltertxt, styles.daysFiltertxtNormal]}>{this.state.selectedDayFilter?.title}</Text>
                </TouchableOpacity> }
                {this.isDateRangeSelectForFilter() &&<TouchableOpacity style={[styles.daysFilterView, styles.daysBackColorNormal, styles.borderViewSelectedFilter]} >
                    <Text style={[styles.daysFiltertxt, styles.daysFiltertxtNormal]}>{this.state.selectedDateRange}</Text>
                </TouchableOpacity> }
            </View>
        )
    }

    renderCalenderModel = () => {
        return (
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
                <View style={styles.borderLine} />
                <View style={styles.radioBtnVIew}>
                    <TouchableOpacity style={styles.radioBtnVIew} {...this.onSelectSingleDate}>
                        <Image style={styles.radioBtnImg} source={this.state.selectedDateType === 'single' ? imgChecked : imgUnChecked}/>
                        <Text style={styles.radioLabelTxt}>Single Date</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.radioBtnVIew, styles.marLeft20]} {...this.onSelectRangeDate}>
                        <Image style={styles.radioBtnImg} source={this.state.selectedDateType === 'range' ? imgChecked : imgUnChecked}/>
                        <Text style={styles.radioLabelTxt}>Date Range</Text>
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
        )
    }

    // Customizable Area End

    render() {
        // Customizable Area Start

        return (
            <KeyboardAvoidingView
                behavior={this.isPlatformiOS() ? "padding" : undefined}
                style={{ flex: 1 }} >
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={1}
                >
                    <TouchableWithoutFeedback
                    onPress={() => {
                        this.hideKeyboard();
                    }} >
                        {this.state.isFilterPageOpen ? 
                            <View>
                                {this.renderFilterPageUI()}
                                {this.renderCalenderModel()}
                            </View>
                        :
                            this.renderTransactionPageUI()
                        }
                    </TouchableWithoutFeedback>
                    {this.state.isLoader && <View style={styles.loaderStyles}>
                        <ActivityIndicator size="large" color="#012275" />
                    </View>}
                </ScrollView>
            </KeyboardAvoidingView>
        );

        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
    },
    contentContainer: {
        paddingBottom: 30,
    },
    wrapper:{
        padding:15,
        flex:1
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginBottom: 50
    },
    noDataText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
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
    headerView: {
        backgroundColor: '#012275',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    titleView: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 24,
        marginRight: 20,
        marginBottom:5
    },
    headerSideIcon: {
        height: 24,
        width: 24,
        resizeMode: 'contain'
    },
    daysFilterView: {
        height: 28,
        borderRadius: 22,
        paddingBottom: 4,
        paddingTop: 4,
        paddingLeft: 12,
        paddingRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 5
    },
    filterRow: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        marginBottom: 20,
      },
    daysBackColorNormal: {
        backgroundColor: '#F1F5F9'
    },
    daysBackColorSelected: {
        backgroundColor: '#012275'
    },
    daysFiltertxt: {
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 19.06
    },
    daysFiltertxtNormal:{
        color: '#334155'
    },
    daysFiltertxtSelected:{
        color: '#fff'
    },
    borderViewSelectedFilter: {
        borderWidth: 1.5,
        borderColor: '#012275'
    },
    paymenstatusTxt: {
        color: '#1E293B',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 10,
        marginHorizontal:5
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
        marginHorizontal: 5
    },
    bgPasswordInput: {
        flex: 1,
        textAlign: 'left'
    },
    paddTopBott: {
        paddingLeft: 10,
        paddingBottom: 6,
    },
    paddBottTop: {
        paddingLeft: 10,
        paddingBottom: 10,
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
    btnView: {
        flexDirection: 'row',
        marginTop: (Dimensions.get('screen').height/3.5),
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        // marginHorizontal: 5
    },
    btnViewWid: {
        width: '46%',
    },
    btnViewWidofYes: {
        width: '46%',
        marginLeft: 15
    },
    btnViewWidofDone: {
        width: '100%'
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
    btnDisableView: {
        backgroundColor: '#CCD3E3'
    },
    blankBtn: {
        borderWidth: 2,
        borderColor: "#012275",
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
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
        fontWeight: '600',
        lineHeight: 24
    },
    btnViewOfModel: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeIconView: {
        height: 24,
        width: 24
    },
    txtColor: {
        color:'#334155'
    },
    timeTypeView: {
        color: '#000000',
        fontWeight: '500',
        lineHeight: 25.8,
        fontSize: 15
    },
    modelHeaderView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    borderLine: {
        borderBottomColor: '#CBD5E1',
        borderBottomWidth: 1,
        marginBottom: 15,
        marginTop: 10
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
        color: '#1E293B',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 24,
        marginLeft: 10
    },
    radioBtnImg: {
        height: 20,
        width: 20
    },
    marTop20: {
        marginTop: 20,
        marginBottom: 10
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