import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
  Text,
  FlatList,
} from "react-native";
import CustomHeader  from "../../../components/src/CustomHeader";
import { Avatar } from 'react-native-elements';
import { Card } from "react-native-paper";
import { GenericBottomNavigation } from "../../../components/src/GenericBottomNavigation";
import CustomSearchBox  from "../../../components/src/CustomSearchBox";
import CustomLoader  from "../../../components/src/CustomLoader";

// Customizable Area End

import CatalogueNotaryServicesController, { Props , ServiceItemType} from "./CatalogueNotaryServicesController";

export default class CatalogueNotaryServices extends CatalogueNotaryServicesController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderServiceItem = (item: ServiceItemType) => {
    return <Card style={[styles.serviceItem]}>
      <View style={styles.row}> 
      <View>
        <Avatar 
          rounded
          size={'medium'}
          source={{
            uri:
              item?.attributes?.service_icon?.url,
          }}
          title={item?.attributes?.service_name.substring(0,1)}
          containerStyle={styles.avatarContainer}
        />
      </View>

      <View style={styles.serviceItemContent}>
        <Text style={styles.serviceItemTitle}>{item.attributes.service_name}</Text>
        <Text style={styles.serviceItemDesc}>{this.truncateText(item.attributes.service_description, 150)}</Text>
      </View>
      </View>

    </Card>
  }

  noDataFound = () => {
    const { loading } = this.state;

    if (!loading) {
      return (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No services are available</Text>
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
              title='Notary Services'
              showBackIcon
              goBack={this.goBack}
              testID="customHeader"
            />
            <View  style={styles.flex}>
              <CustomSearchBox
                value={this.state.searchQuery}
                onChange={(text: string) => this.onChange(text)}
                onClear={this.onClearSearch}
                type='outline'
                testID="searchBox"
              />
                <FlatList
                  testID="notaryServices"
                  data={this.state.notaryServices}
                  renderItem={({ item }) => this.renderServiceItem(item)}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={this.noDataFound()}
                />
              <View style={styles.gap} />
            </View>
        <CustomLoader loader={this.state.loading} />
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
  row:{
    flexDirection:'row', 
  },
  gap:{
    marginTop:100,
  },
  avatarContainer:{
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
  serviceItem: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom:20,
    marginHorizontal:20
  },
 
  serviceItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#011342',
  },
 
  serviceItemDesc:{
    color: '#011342',
    fontSize: 14,
    marginTop:10
  },
  serviceItemContent: {
   marginLeft:15,
   flex:1
  },
  flex:{
    flex:1
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
