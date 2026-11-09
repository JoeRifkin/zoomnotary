import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { halfRating, headsetImg, location, notificationImg, rightArrow } from "./assets";
import { GenericHeader } from "../../../components/src/GenericHeader";
import { PopularNotariesAttributes, ServiceItemType, configJSON } from "./CatalogueController";
import { GenericBottomNavigation } from "../../../components/src/GenericBottomNavigation";
import { Avatar } from 'react-native-elements';
import MessageEnum, {
} from "../../../framework/src/Messages/MessageEnum";
// Customizable Area End

import CatalogueController, { Props } from "./CatalogueController";

export default class Catalogue extends CatalogueController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderSearch = () => {
    return (
      <View style={styles.searchContainer}>
        <Image source={location} style={styles.locationIcon} />
        <View style={styles.locationWrapper}>
          <View style={styles.locationRow}>
            {this.state.isEditingLocation ? (
              <TextInput
                value={this.state.searchQuery}
                style={styles.locationInput}
                placeholder={configJSON.searchbyname}
                onBlur={this.onTapToChange}
                onChangeText={this.onChange}
                testID="searchQuery"
              />
            ) : (
              <>
                <Text style={styles.locationText}>{this.state.selectedJurisdiction}</Text>
                <TouchableOpacity
                  testID="tapChange"
                  onPress={this.onTapToChange}
                >
                  <Text style={styles.editText}>{configJSON.taptochange}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <Text style={styles.infoText}>{configJSON.resultbasedinfo}</Text>
        </View>
      </View>
    );
  };
  renderServicesHeader = (title: string, key?: number) => {
    return (
      <View style={styles.listTitleContainer}>
        <Text style={styles.listTitle}>{title}</Text>
        {key && <TouchableOpacity
          testID="goto"
          style={styles.seeAllWrapper}
          onPress={() => this.goTo(key)}
        >
          <Text style={styles.seeAllText}>See All</Text>
          <Image source={rightArrow} style={styles.rightArrow} />
        </TouchableOpacity>}
      </View>
    )
  };

  renderServiceItem = (item: ServiceItemType) => {
    return <View style={[styles.serviceItem]}>
      <View style={styles.serviceItemAlign}>
        <Text style={styles.serviceItemTitle}>{item.attributes.service_name}</Text>
        {item.attributes && item.attributes.service_icon && item.attributes.service_icon.url &&
          <Image source={{ uri: item.attributes.service_icon.url }}
            style={styles.serviceItemImg}
          />
        }
      </View>
      <Text style={styles.serviceItemContent}>{this.truncateText(item.attributes.service_description, 150)}</Text>
    </View>
  }

  renderPopularItem = ({ item }: { item: PopularNotariesAttributes }) => {

    return <View style={styles.popularItem}>
      <Avatar
        rounded
        size={'large'}
        source={{
          uri:
            item.photo,
        }}
        title={item.name.charAt(0)}
      />
      <Text style={styles.popularItemTitle}>{item.name}</Text>
      <Text style={styles.popularItemDesig}>{item.jurisdiction}</Text>
      <View style={styles.popularItemInfo}>
        <Text style={styles.popularItemCount}>{item.total_notaries} Notaries {item.rating} </Text>
        <Image source={halfRating} style={styles.ratingImg} />
      </View>
    </View>
  }

  renderNoJurisdictionFound = () => {
    return <View style={styles.dropdownItem}>
      <Text style={styles.dropdownItemText}>No Results</Text>
    </View>
  }

  renderDropDown = () => {
    return this.state.isEditingLocation && <View style={styles.dropdown}>
      <FlatList
        data={this.getJurisdictionData()}
        keyExtractor={(item) => item.jurisdiction}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => this.onSelectJurisdiction(item)}
            testID="selectJurisdiction"
          >
            <Text style={styles.dropdownItemText}>{item.jurisdiction}</Text>
          </TouchableOpacity>
        )}
        style={styles.dropdownList}
        testID="dropdownlist"
        ListEmptyComponent={() => {
          return this.getJurisdictionData().length <= 0 ? this.renderNoJurisdictionFound() : null
        }}
      />
    </View>
  }


  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.flex}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container} showsVerticalScrollIndicator={false}>
          <View>
            <GenericHeader
              labelTitle={''}
              imgBackArrow={this.state.profilePic}
              secImg={headsetImg}
              thiredImg={notificationImg}
              testID={"btnAvatarIcon"}
              isOtherMsg={true}
              btnGoBack={{ ...this.onClickOfAvatatIcon }}
              isImgAvatar={true}
              UserName={this.state.full_name.charAt(0)}
            />
            {this.renderSearch()}

            {this.renderDropDown()}

            <View style={styles.wrapper}>

              {this.renderServicesHeader('Popular Services')}

              <View style={styles.flex}>
                <FlatList
                  testID="popularservicelist"
                  data={this.state.popularServices}
                  renderItem={({ item }) => this.renderServiceItem(item)}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.flatListContentContainer}
                />
              </View>
              {this.getPopularNotariesData().length ?
                <View>
                  {this.renderServicesHeader('Popular notaries', MessageEnum.NavigationCataloguePopularNotariesMessage)}
                  <FlatList
                    testID="popularnotaries"
                    data={this.getPopularNotariesData()}
                    renderItem={this.renderPopularItem}
                    keyExtractor={(item) => item.name + item.jurisdiction}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </View> : null
              }


              {this.renderServicesHeader('Notary services', MessageEnum.NavigationCatalogueNotaryServicesMessage)}

              <View style={styles.flex}>
                <FlatList
                  testID="notaryServices"
                  data={this.state.notaryServices.slice(0, 4)}
                  renderItem={({ item }) => this.renderServiceItem(item)}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.flatListContentContainer}
                />
              </View>
            </View>

          </View>
          <View style={styles.emptyBox} />
        </ScrollView>
        {this.state.user_role === 'end_user' && <TouchableOpacity style={styles.buttonBookNow} testID={"btnBookNowNotary"}
          onPress={this.bookNow}
        >
          <Text style={styles.buttonBookNowText}>{'+  Book Now'}</Text>
        </TouchableOpacity>}
        <GenericBottomNavigation
          testID='bottomNavigation'
          id={3} onChangeBottomTab={this.onChangeBottomTab}
          userType={this.state.user_role}
        />
      </View>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  rightArrow: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
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
  dropdownList: {
    maxHeight: 200,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  dropdownItemText: {
    fontSize: 16,
    color: 'black',
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 53,
    marginVertical: 2
  },
  dropdown: {
    position: "absolute",
    top: 170,
    width: Dimensions.get('screen').width,
    zIndex: 1000
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  flex: {
    flex: 1
  },
  flatListContentContainer: {
    paddingRight: 10,
  },
  popularItem: {
    backgroundColor: '#f5f8ff',
    padding: 16,
    paddingHorizontal: 25,
    borderRadius: 6,
    marginRight: 10,
    alignItems: 'center',
  },
  serviceItem: {
    backgroundColor: '#f5f8ff',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 10,
    width: Dimensions.get('window').width - 100,
    marginBottom: 10
  },
  serviceItemAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#011342',
    flex: .8
  },
  serviceItemImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 5
  },
  serviceItemContent: {
    color: '#969fae',
    fontSize: 14,
  },
  popularItemTitle: {
    fontWeight: '600',
    color: '#011342',
    fontSize: 16,
    marginTop: 10,
  },
  popularItemInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratingImg: {
    marginLeft: 5,
    resizeMode: 'cover'
  },
  popularItemDesig: {
    color: '#64748B',
    fontSize: 12,
    marginVertical: 10
  },
  popularItemCount: {
    color: '#3D3D3D',
    fontSize: 12,
  },
  listTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  listTitle: {
    color: '#1E293B',
    fontSize: 14,
    fontWeight: '500'
  },
  seeAllWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#012275',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 7,
  },
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  emptyBox: {
    height: 80
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
    paddingHorizontal: 20,
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  locationIcon: {
    width: 14,
    height: 20,
    resizeMode: 'contain',
  },
  locationWrapper: {
    marginLeft: 5,
    flex: 1,
    paddingHorizontal: 6,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    marginRight: 10,
  },
  locationInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    marginTop: -11,
    marginBottom: -5,
  },
  editText: {
    color: "#059669",
    fontSize: 12,
  },
  infoText: {
    color: "#64748B",
    fontSize: 12,
  },
  row: {
    flex: 1,
    justifyContent: "space-between"
  },
  rating: {
    color: "#000",
    paddingRight: 6
  },
});
// Customizable Area End
