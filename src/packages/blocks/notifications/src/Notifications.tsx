import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  FlatList,
  Dimensions,
  ActivityIndicator
} from "react-native";
import RenderHTML from 'react-native-render-html';
import { imgBackArrow, imgGrayCheck, imgViewCircle } from "./assets";
// Customizable Area End

import NotificationsController, {
  Props,
  configJSON,
} from "./NotificationsController";

export default class Notifications extends NotificationsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderItems(item: any) {
    return (
      <TouchableOpacity
        key={item.id.toString()}
        style={[styles.itemWrapper, styles[this.backGroundColor(item.attributes.is_read)]]}
        onPress={() => {
          !item.attributes.is_read && this.markAsRead(item.attributes.id);
        }}
      >
        <View>
          <Image {...this.iconBellProps} style={styles.iconStyle} />
        </View>
        <View style={{ flex: 1, marginLeft: 16, paddingTop: 12 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            {item.attributes.contents ? <RenderHTML
              contentWidth={Dimensions.get('window').width -20}
              source={{ html: item.attributes.contents }}
              tagsStyles={{
                p: { color: '#000', fontSize: 14, fontWeight: "bold",
                  margin: 0,
                  flex: 1, },
              }}
            />
              :
              <Text style={styles.itemHeading} >
                {item.attributes.headings}
              </Text>}
          </View>

        </View>
        <View style={styles.dotBlueAndTime}>
        {!item.attributes.is_read ?<Image source={imgViewCircle} style={styles.imgViewCircleView} /> : null }
        <Text style={styles.date}>
              {this.timeSince(item.attributes.created_at)}
            </Text>
        </View>
      </TouchableOpacity>
    );
  }
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container} onScroll={this.handleScroll}
      scrollEventThrottle={1} >
        {/* Customizable Area Start */}
        {/* Merge Engine UI Engine Code */}
        <>
          <View>
            <View style={[styles.headerView]}>
              <TouchableOpacity style={styles.backImg} testID="btnbackArrow" {...this.btnGoBackByArrow}>
                <Image source={imgBackArrow} style={styles.avatarImgView} />
              </TouchableOpacity>
              <Text style={styles.title}>{configJSON.notifications}</Text>
              <View></View>
            </View>
            {this.isShowEmptyMessage() ? 
            <View style={styles.emptyMsgView}>
              <Text style={styles.emptyMsgTxt}>{this.state.notifcationEmptyMsg}</Text>
            </View>
            :<View>
              <TouchableOpacity style={styles.viewOfMarkAll} {...this.markAllReadProps}>
                <Image style={styles.grayCheckImg} source={imgGrayCheck} />
                <Text style={styles.markAllAsReadTxt}>{configJSON.markAllAsRead}</Text>
              </TouchableOpacity>
              {this.state.data.map((data) => (
                data.list.length > 0 ?<View>
                  <Text style={styles.titleOfNotific}>{data.title}</Text>
                  <FlatList
                    data={data.list}
                    renderItem={(item) => this.renderItems(item.item)}
                    keyExtractor={(item: any) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 30 }}
                  />
                </View> : null
              ))}
            </View> }
          </View>
          {this.state.isLoader && <View style={styles.loaderStyles}>
            <ActivityIndicator size="large" color="#012275" />
          </View>}
        </>
        {/* Merge Engine UI Engine Code */}
        {/* Customizable Area End */}
      </ScrollView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  backImg: {
    position: 'absolute',
    left: 16,
    top: Platform.OS === 'ios' ? 55 : 25,
  },
  avatarImgView: {
    height: 24,
    width: 24
  },
  headerView: {
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 30
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 22,
    color: '#0F172A'
  },
  itemWrapper: {
    borderColor: "#E2E8F0",
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingBottom: 26,
    paddingTop: 16,
    flex: 1,
    flexDirection: "row",
    marginTop: 6,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backColor:  {
    backgroundColor: '#F1F5F9'
  },
  backNon: {
     backgroundColor: '#FFF'
  },
  iconStyle: {
    width: 18,
    height: 22,
    marginTop: 16,
  },
  itemHeading: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 0,
    flex: 1,
    color: "#000",
  },
  itemHeadingRead: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 0,
    flex: 1,
    color: "#6200EE",
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 0,
    color: "#000",
  },
  date: {
    color: "#767676",
    fontSize: 14,
  },
  content: {
    fontSize: 14,
    color: "#767676",
    marginTop: 5,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalAction: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  okButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: "#FF0000",
    color: "#FFF",
  },
  grayCheckImg: {
    height: 20,
    width: 20
  },
  viewOfMarkAll: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20
  },
  markAllAsReadTxt: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '500',
    marginLeft: 5
  },
  imgViewCircleView: {
    height: 8,
    width: 8,
    marginLeft: 15,
    marginRight: 15
  },
  dotBlueAndTime: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleOfNotific: {
    color: '#1E293B',
    fontSize: 16,
    lineHeight: 24,
    fontWeight:'700',
    marginLeft: 16
  },
  emptyMsgView: {
    justifyContent: 'center',
    marginTop: 200,
    alignItems: 'center'
  },
  emptyMsgTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 19,
    color: '#000'
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
