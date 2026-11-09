import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  Platform,
  ScrollView,
} from "react-native";
import CustomLoader from "../../../components/src/CustomLoader";
import { GenericHeader } from "../../../components/src/GenericHeader";
import { GenericBottomNavigation } from "../../../components/src/GenericBottomNavigation";
import {  account, crossBlueImg, downArrowImg, leftArrowImg, menu, notificationImg, pin, rightArrowImg, sync, topic, upArroImg, } from "./assets";
import moment from "moment";
import { CalendarProvider, WeekCalendar , Calendar as MonthCalendar, TimelineList, TimelineProps } from "react-native-calendars";
import { Avatar } from "react-native-elements";
import CustomButton from "../../../components/src/CustomButton";
import Timeline from 'react-native-timeline-flatlist';

// Customizable Area End

import CalendarController, { Props, SELECTION_TYPES, Tab, TABS, ZoomMeetingFilterd } from "./CalendarController";

export default class Calendar extends CalendarController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  renderTypeSelectionModal = () => {
    return this.state.modalVisible && (
      <View style={styles.modalView}>
        <FlatList
          testID="selectionTypeList"
          data={SELECTION_TYPES}
          renderItem={({ item }) => (
            <TouchableOpacity testID="onSelectType" onPress={() => this.onTypeSelect(item)}>
              <Text style={[styles.modalText, this.state.selectedType === item?.label && styles.modalSelectedText]}>
                {item?.label}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id + ''}
        />
      </View>
    )
  }


  renderHeader = () => {
    return <View style={styles.header}>
      <TouchableOpacity testID="selectType" style={styles.selectedType} onPress={this.toggleModal}>
        <Text style={styles.selectedTypeText}>{this.state.selectedType}</Text>
        <Image source={this.state.modalVisible ? upArroImg : downArrowImg} style={[styles.arrowImg,]} />
      </TouchableOpacity>
      <Text style={styles.selectedDate}>{moment(this.state.currentDate).format('D MMMM')}</Text>
    </View>
  }


  renderTimeLineOutLook = () => {
    return (
      <View style={[styles.flex, {
        paddingBottom: 80
      }]}
      testID="renderviewTimeline"

      >
        <Timeline 

        data={this.state.allSlotsEvent}
          circleColor="transparent"
          lineColor="transparent"
          timeStyle={{
            color: '#bbb',
            fontSize: 12
          }}
          renderDetail={(rowData) => (
            <View style={styles.eventItem}>
              {rowData.title ? ( 
                <View
                  style={{
                    backgroundColor: '#1A73E8ed',
                    height: 55,
                    justifyContent: 'center',
                    paddingVertical:10
                  }}
                >
                  <Text style={styles.eventTitle}>{rowData.title}</Text>
                   <Text style={styles.eventDescription}>
                    {moment(rowData.start).format("hh:mm")} : {moment(rowData.end).format("hh:mm")}
                     </Text>
                </View>
              ) : (
                <View style={{padding:10}}>

                  </View>
              )}
            </View>
          )}
        />
      </View>
    );
  };
  renderTimeLine = () => {

    return <View style={[styles.flex, {paddingBottom:80}]} >
      <TimelineList
        key={new Date().getTime()}
        events={this.getTimeLineData()}
        showNowIndicator
        scrollToFirst
      />
    </View>
  }

  renderAuth = (accountType:'google'|'outlook') => {
    const style: Record<string, object> = {
      'Week': styles.authWrapper
    }
    return <View style={[style[this.state.selectedType]]}>
      <Text style={styles.authDes}>Auto-sync is off on this application. Changes made on {accountType} Calendar won’t be backed up here until Synced.</Text>
      <TouchableOpacity style={styles.syncNowBtn}
        onPress={() => this.syncNow(accountType)}
        testID="syncNowBtn"
      >
        <Image source={sync} style={styles.syncImg} />
        <Text style={styles.syncNowText}>Sync now</Text>
      </TouchableOpacity>
    </View>
  }


  renderSelectedTab = () => {
    const screens: Record<number, {
      component: () => void
    }> = {
      1: { component: () => this.renderTimeLine() },
      2: { component: () => this.renderTimeLine() },
      3: { component: () => this.state.isGoogleSignedIn ? this.renderTimeLine() : this.renderAuth('google') },
      4: { component: () => this.state.isOutlookSignedIn ? this.renderTimeLine() : this.renderAuth('outlook') },
    };

    return screens[this.state.selectedTab]?.component()
  }

  renderArrow = (direction: 'left' | 'right') => {
    const style = {
      'left': {
        marginLeft: -10,
      },
      'right': {
        marginRight: -10,
      }
    }
    return <Image
      style={[styles.monthArrow, style[direction]]}
      source={direction === 'right' ? rightArrowImg : leftArrowImg} />
  }

  renderCalendar = () => {
    return <CalendarProvider
      date={this.state.currentDate}
      onDateChanged={this.handleDateChange}
      showTodayButton
      disabledOpacity={0.6}
      style={[styles.flex]}
      testID='CalendarProvide'
    >
      <>
      {this.state.selectedType === 'Week' ? (
        <WeekCalendar firstDay={1}
         markedDates={this.state.markedDates}
        />
      ) : (
        <MonthCalendar
          testID="monthCalendar"
          firstDay={1}
          enableSwipeMonths
          markedDates={this.state.markedDates}
          style={styles.monthCalendar}
          onDayPress={(day:{dateString:string})=>{
              this.handleDateChange(day.dateString)
          }}
          renderArrow={(direction) => this.renderArrow(direction)}
          theme={{ weekVerticalMargin:1 }}
        />
      )}
      
      {this.renderTabs()}
      {this.renderSelectedTab()}
      </>
    </CalendarProvider>
  }

  renderTabItem = (item: Tab) => (
    <TouchableOpacity
      key={item?.id}
      testID="selectTabItem"
      style={[styles.tabItem, this.state.selectedTab === item?.id && styles.selectedTab]}
      onPress={() => this.setState({ selectedTab: item?.id })}
    >
      {item?.isImg && item?.icon ? (
        <Image source={item.icon} style={[styles.tabImg,item.style]}/>
      ) : (
        <Text style={[this.state.selectedTab === item?.id && styles.selectedTab ? styles.selectedTabText: styles.tabText]}>{item?.label}</Text>
      )}
    </TouchableOpacity>
  );


  renderTabs = () => {
    return <View >
      <FlatList
        contentContainerStyle={styles.tabContainer}
        data={TABS}
        renderItem={({ item }) => this.renderTabItem(item)}
        keyExtractor={(item) => item.id + ''}
        horizontal
        showsHorizontalScrollIndicator={false}
        testID="TabList"
      />
    </View>
  }

  
  renderMeetingModal = () => {
    const selectedEvent = this.state.selectedEvent as ZoomMeetingFilterd

    return (
      <Modal
        visible={this.state.meetingModal}
        animationType="slide"
        transparent={true}
        onRequestClose={this.onCloseMeetingModal}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedEvent?.meeting?.topic || "Meeting Details"}</Text>
              <TouchableOpacity
                testID="CloseMeetingModal"
                onPress={this.onCloseMeetingModal}>
                <Image source={crossBlueImg} style={styles.crossIcon} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalContent}>
              <View style={styles.detailRow}>
                <Image source={topic}
                  style={styles.topicIcon}
                />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Renotary Meeting</Text>
                  <Text style={styles.detailValue}>
                    {moment(selectedEvent?.start_time).format("dddd, D MMMM | h:mm A")} -{" "}
                    {moment(selectedEvent?.end_time).format("h:mm A")}
                  </Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Image source={pin}
                  style={styles.pinIcon}
                />
                <View style={styles.detailTextContainer}>
                  <Text
                    style={styles.linkText}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {selectedEvent?.meeting?.start_url}
                  </Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Image source={account}
                  style={styles.guestsIcon}

                />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailValue}>
                    {selectedEvent?.accounts?.length || 0} Guests
                  </Text>
                </View>
              </View>

              {selectedEvent?.accounts?.map((account:any, index:number) => (
                <View style={styles.guestRow} key={index}>
                  <Avatar
                    rounded
                    size={'medium'}
                    source={{
                      uri:
                        account.data.attributes.photo.url
                    }}
                    title={account.data.attributes.name.substring(0, 1)}
                    containerStyle={styles.img}
                  />
                  <Text style={styles.guestName}>{account.data.attributes.name}</Text>
                </View>
              ))}

              <View style={[styles.detailRow, styles.mt10]}>
                <Image source={menu} style={styles.topicIcon} />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailValue}>
                    {selectedEvent?.meeting?.host_email} is inviting you to a scheduled Zoom meeting.
                  </Text>
                </View>
              </View>

              <View style={styles.joinMeetingSection}>
                <Text style={styles.sectionLabel}>Join Zoom Meeting</Text>
                <TouchableOpacity onPress={() => this.openLink(selectedEvent.meeting.start_url)}>
                  <Text style={styles.linkText} numberOfLines={3} >{selectedEvent?.meeting?.start_url}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.meetingInfo}>
                <Text style={styles.meetingInfoText}>
                  Meeting ID: {selectedEvent?.meeting?.id}
                </Text>
                <Text style={styles.meetingInfoText}>
                  Passcode: {selectedEvent?.meeting?.h323_password}
                </Text>
              </View>

              <CustomButton
                title="Join Meeting"
                testID="joinMeetingBtn"
                onPress={() => this.openLink(selectedEvent.meeting.start_url)}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  // Customizable Area End

  render() {
    // Customizable Area Start

    return (
      <View style={styles.container}>
          <GenericHeader
            labelTitle={''}
            imgBackArrow={this.state.profilePic}
            thiredImg={notificationImg}
            testID={"GenericHeader"}
            isOtherMsg={true}
            btnGoBack={{ ...this.onClickOfAvatatIcon }}
            isImgAvatar={true}
            UserName={this.state.full_name?.charAt(0)}
          />
          {this.renderHeader()}
          {this.renderCalendar()}
          {this.renderTypeSelectionModal()}
          <CustomLoader loader={this.state.loading} />
          <GenericBottomNavigation
            testID='bottomNavigation'
            id={4} onChangeBottomTab={this.onChangeBottomTab}
            userType={this.state.user_role}
          />
      </View>

    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  monthArrow:{
    width:15,
    height:15,
    resizeMode:'contain'
  },
  mt10: {
    marginTop: 10
  },
  topicIcon:{
    width:30,
    height:30,
    resizeMode:'contain',
    marginRight:10
  },
  pinIcon:{
    width:25,
    height:25,
    resizeMode:'contain',
    marginRight:15

  },
  img:{
    width:24,
    height:24,
    resizeMode:'contain',
    marginRight:10

  },
  guestsIcon:{
    width:30,
    height:30,
    resizeMode:'contain',
    marginRight:10
  },
  crossIcon:{
    resizeMode:'contain'
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingBottom: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },
  closeButton: {
    fontSize: 18,
    color: "red",
  },
  modalContent: {
    paddingBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  icon: {
    color: "#012275",
    marginRight: 10,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  detailValue: {
    fontSize: 14,
    color: "#475569",
  },
  linkText: {
    fontSize: 14,
    color: "#0131A8",
    textDecorationLine: "underline",
  },
  guestRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  guestName: {
    marginLeft: 10,
    fontSize: 14,
    color: "#475569",
  },
  joinMeetingSection: {
    marginTop: 15,
    width:'100%'

  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#475569",
    marginBottom: 5,
  },
  meetingInfo: {
    marginTop: 15,
    marginBottom:20
  },
  meetingInfoText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#011342",
    marginBottom: 5,
  },
  authWrapper:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  syncNowBtn: {
    backgroundColor: "#012275",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf:'center',
    flexDirection:'row',
    alignItems:'center',
    marginTop:8
  },
  syncNowText:{
    color:'white', 
    fontWeight:'500',
    fontSize:14,
    marginLeft:5
  },
  syncImg: {
    width: 18,
    height: 18,
    resizeMode: 'contain'
  },
  authDes: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22.4,
    textAlign: 'center',
    textDecorationLine: 'none',
    color:'#64748B',
    paddingHorizontal:20
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems:'center'
  },
  tabItem: {
    alignItems: 'center',
    padding: 10,
  },
  tabImg:{
    width:35,
    height:35,
    resizeMode:'contain'
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748B',
    marginTop:1
  },
  selectedTabText:{
    fontSize: 16,
    fontWeight: '500',
    color: '#012275',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#012275',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',

  },
  monthCalendar:{
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  arrowImg: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  modalView: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 163 : 140,
    left: 20,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 180,
  },
  modalText: {
    width: 180,
    height: 48,
    padding: 12,
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
  },
  modalSelectedText: {
    fontWeight: 'bold',
  },
  selectedType: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  selectedTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginRight: 10
  },
  selectedDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#012275',
    paddingHorizontal: 20,
    paddingVertical: 12
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  flex: {
    flex: 1
  },
  eventItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee', },
  eventTime: { fontSize: 16, fontWeight: 'bold', color: 'red' },
  eventTitle: { fontSize: 13, fontWeight: 'bold', marginVertical: 5 ,color:'#fff',left:15},
  eventDescription: { fontSize: 13, color: '#fff', left:15},
  noEvents: { textAlign: 'center', marginTop: 20, color: '#999' },
});
// Customizable Area End