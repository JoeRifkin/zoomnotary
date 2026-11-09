import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import CustomHeader from "../../../components/src/CustomHeader";
import { Avatar } from 'react-native-elements';
import { GenericBottomNavigation } from "../../../components/src/GenericBottomNavigation";
import CustomSearchBox from "../../../components/src/CustomSearchBox";
import CustomLoader from "../../../components/src/CustomLoader";
import { halfRating } from "./assets";
import { imgClose } from "../../user-profile-basic/src/assets";

// Customizable Area End

import CataloguePopularNotariesController, { Jurisdiction, PopularNotariesAttributes, Props } from "./CataloguePopularNotariesController";

export default class CataloguePopularNotaries extends CataloguePopularNotariesController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  renderPopularItem = ({ item }: { item: PopularNotariesAttributes }) => {
    return <View style={styles.popularItem}>
      <Avatar
        rounded
        size={'large'}
        source={{
          uri:
            item.photo
        }}
        title={item?.name?.charAt(0)}
      />
      <Text style={styles.popularItemTitle}>{item.name}</Text>
      <Text style={styles.popularItemDesig}>{item.jurisdiction}</Text>
      <View style={styles.popularItemInfo}>
        <Text style={styles.popularItemCount}>{item.total_notaries} Notaries {item.rating} </Text>
        <Image source={halfRating} style={styles.ratingImg} />
      </View>
    </View>
  }


  renderJurisdictionItem = ({ item }: { item: Jurisdiction }) => {
    const isSelected = item.jurisdiction == this.state.selectedJurisdiction
    return (
      <TouchableOpacity onPress={() => this.onSelectJurisdiction(item.jurisdiction)} style={[styles.thouChableViewBtn, ]}>
        <Text style={[styles.otherBtnTxt,isSelected && styles.selectedJurisdiction]}>{item.jurisdiction}</Text>
      </TouchableOpacity>
    );
  }

  renderJurisdictionSheet = () => {
    return <Modal
    transparent={true}
    animationType="slide"
    visible={this.state.showJurisdictionSheet}
  >
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <View style={styles.titleContainer}>
        <Text style={styles.title}>Choose your Jurisdiction</Text>
        </View>
        <View style={styles.jurisdictionListContainer}>

        <FlatList
          testID="JurisdictionList"
          data={this.state.jurisdictions}
          renderItem={this.renderJurisdictionItem}
          keyExtractor={(index) => index.toString()}
        />
        </View>

          {this.state.selectedJurisdiction ?
            <TouchableOpacity
              onPress={this.clearFilter} style={styles.clearButton}>
              <Text style={styles.clearText}>Clear Filter</Text>
            </TouchableOpacity> : null
          }
        <TouchableOpacity onPress={this.toggleSheet} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  }

  noDataFound = () => {
    const { loading } = this.state;

    if (!loading) {
      return (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No notaries are available</Text>
        </View>
      );
    }
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.container}>
          <CustomHeader
            title='Popular Notaries'
            showBackIcon
            goBack={this.goBack}
            testID="customHeader"
            showFilterIcon
            onPressFilter={this.toggleSheet}
          />
          <View style={styles.flex}>
            <CustomSearchBox
              value={this.state.searchQuery}
              onChange={(text: string) => this.onChange(text)}
              onClear={this.onClearSearch}
              type='outline'
              testID="searchBox"
            />
          {this.state.selectedJurisdiction ?
            <View style={styles.selectedFilter}>
              <Text style={styles.selectedFilterText}>{this.state.selectedJurisdiction}
              </Text>
              <TouchableOpacity
                testID="clearFilterBtn"
              onPress={this.clearFilter}>
                <Image source={imgClose} style={styles.seletedfilterImg} />
              </TouchableOpacity>
            </View> : null
          }

            <FlatList
              testID="popularNotaries"
              data={this.state.popularNotaries}
              renderItem={this.renderPopularItem}
              keyExtractor={(index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={this.noDataFound()}
              numColumns={2}
              contentContainerStyle={styles.listContainer}
              onEndReachedThreshold={0.3}
              onEndReached={this.onEndReached}
            />
            <View style={styles.gap} />
          </View>
          {this.renderJurisdictionSheet()}
        <CustomLoader loader={this.state.loading} />
        {this.state.user_role === 'end_user' && <TouchableOpacity style={styles.buttonBookNow} testID={"btnBookNowNotary"}
          onPress={this.bookNow}
        >
          <Text style={styles.buttonBookNowText}>{'+  Book Now'}</Text>
        </TouchableOpacity>}
        <GenericBottomNavigation
          testID='bottomNavigation'
          id={3}
          onChangeBottomTab={this.onChangeBottomTab}
          userType={this.state.user_role}
        />
      </View>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
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
  selectedFilter:{
    backgroundColor: '#f2f5f9',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 15,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'flex-start', // Prevents full-width expansion
    marginTop:-5,
    marginBottom:5
  },
    
  selectedFilterText:{
    color:'#012275'
  },
  seletedfilterImg:{
    width:18,
    height:18,
    resizeMode:'contain'
  },
  selectedJurisdiction:{
    color:'#486bf2'
  },
  clearButton: {
    backgroundColor: '#003366',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop:5,
    marginBottom:10,
  },
  clearText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 18,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius:10
  },
  cancelText: {
    color: '#df3738',
    fontWeight:'bold'
  },
  jurisdictionListContainer:{
    backgroundColor:"white",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom:10
  },

  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color:'black',
    textAlign:'center'
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalContainer: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    marginBottom:10,
  },
  titleContainer:{
    backgroundColor:'white',
    borderBottomColor:'gray',
    borderBottomWidth:.5,
    padding:10,
    paddingTop:15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  otherBtnTxt: {
    color: '#012275',
    lineHeight: 20,
    fontSize: 16,
    fontWeight: '500'
  },
  thouChableViewBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: Dimensions.get('window').width - 15,
  },
  cancelBtnModel: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    height: 55,
    borderRadius: 13,
    paddingTop: 20
  },
  

  listContainer: {
    justifyContent: 'center',
    paddingHorizontal:10,
  },
  popularItem: {
    backgroundColor: '#f6f8ff',
    width: Dimensions.get('screen').width / 2 - 28,
    margin: 10,
    padding: 16,
    paddingHorizontal: 25,
    borderRadius: 6,
    alignItems: 'center',
  },
  popularItemImg: {
    width: 75,
    height: 75,
    resizeMode: 'cover'
  },
  popularItemTitle: {
    fontWeight: '600',
    color: '#011342',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center'
  },
  popularItemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center'

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
    textAlign: 'center'

  },
  row: {
    flexDirection: 'row',
  },
  gap: {
    marginTop: 70,
  },
  avatarContainer: {
    backgroundColor: 'lightgray',
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

  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#fff",
  },
});
// Customizable Area End