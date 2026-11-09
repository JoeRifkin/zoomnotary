//@ts-nocheck
import React from "react";

import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  // Customizable Area Start
  ActivityIndicator,
  FlatList,
  Modal,
  TextInput,
  Button,
  ScrollView,
  // Customizable Area End
} from "react-native";
import { normalize } from "react-native-elements";
import Scale from "../../../components/src/Scale";
import AntDesign from "react-native-vector-icons/AntDesign";

import ContentManagementController, {
  Props,
  configJSON,
} from "./ContentManagementController";

interface Item {
  id: string;
  type: string;
  attributes: {
    title: string;
    description: string;
    status: boolean;
    price: number;
    user_type: string;
    quantity: string;
    created_at: string;
    updated_at: string;
    images: [
      {
        id: number;
        url: string;
        type: string;
        filename: string;
      }
    ];
  };
}

export default class ContentManagement extends ContentManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderItem = ( item : Item) => {
    return (
      <TouchableOpacity
        testID="cardPress"
        activeOpacity={0.5}
        style={styles.renderView}
        key={item.id.toString()}
      >
        <Image
          source={{ uri: item.attributes.images[0]?.url }}
          style={styles.productImage}
        />
        <Text style={styles.description}>{item.attributes.title}</Text>
        <Text style={styles.description}>{item.attributes.description}</Text>
        <Text style={styles.price}>${item.attributes.price}</Text>
        <Text style={styles.description}>{configJSON.status} {item.attributes.status? configJSON.approved:configJSON.pending}</Text>
        
      </TouchableOpacity>
    );
  };

  renderDropDownCard =({item,index})=>{
    return(
      <TouchableOpacity
      testID="click_dropdown_item"
      style={styles.itemTouch}
      onPress={() => this.onSelectCategory(item)}
    >
      <Text style={styles.itemTitle}>{item?.title}</Text>
    </TouchableOpacity>
    )
  }

  dropDown = () => {
    return (
      <View>
        <Text style={styles.userTilte}>{configJSON.users}</Text>
        <View style={styles.dropMainView}>
          <TouchableOpacity
            testID="demo-user-select"
            activeOpacity={0.8}
            onPress={this.showCategory}
            style={styles.dropTouch}
          >
            <Text style={styles.dropValue}>{this.state.category.title}</Text>
            <AntDesign
              name={this.state.showCategory ? "up" : "down"}
              color={"#565a82"}
              size={18}
            />
          </TouchableOpacity>
          {this.state.showCategory && (
            <FlatList
              style={{ marginBottom: 10 }}
              data={this.state.catagorydata}
              ItemSeparatorComponent={() => <View style={styles.saparator} />}
              renderItem={this.renderDropDownCard}
            />
          )}
        </View>
      </View>
    );
  };

 renderImageViewCard =({item,index})=>{
  return (
    <View style={styles.selectImage}>
      <Image
        style={styles.selectImageStyle}
        source={{ uri: item?.uris }}
      />
    </View>
  );
}

  renderImageView = () => {
    return (
      <View style={styles.renderImageView}>
        <FlatList
          data={this.state.images}
          horizontal
          renderItem={this.renderImageViewCard}
        />
      </View>
    );
  };

  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <View style={styles.container} testID='main_block'>
        <TouchableWithoutFeedback>
          {/* Customizable Area Start */}
          {/* Merge Engine UI Engine Code */}
          <View style={styles.container}>
            <View style={styles.topView}>
              {this.dropDown()}
              <TouchableOpacity
                style={styles.button}
                onPress={this.addNewProduct}
                testID={"add_new_button"}
              >
                <Text style={styles.buttonText}>{configJSON.addNewButton}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>{configJSON.productList}</Text>
            {this.state.loading ? (
              <ActivityIndicator
                size={"large"}
                color={"blue"}
                style={styles.loader}
              />
            ) : (
              <View >
                <ScrollView 
                contentContainerStyle={styles.map}
                >
                {this.state.userDataList?.map(item=>this.renderItem(item))}
                </ScrollView>
              </View>
            )}

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.showModel}
              testID='model_add'
            >
              <View style={styles.centeredView}>
                <Text testID="cancel_modal_button" style={styles.cancel} onPress={this.hideModal}>
                  {configJSON.cancel}
                </Text>
                <Text style={styles.addProduct}>{configJSON.addProduct}</Text>
                <TextInput
                  testID="title"
                  placeholder={configJSON.title}
                  value={this.state.title}
                  onChangeText={this.onChangeTitle}
                  style={styles.input}
                />
                <TextInput
                  testID="description"
                  placeholder={configJSON.description}
                  value={this.state.description}
                  onChangeText={this.onChangeDescription}
                  style={styles.input}
                />
                <TextInput
                  testID="price"
                  placeholder={configJSON.price}
                  value={this.state.price}
                  onChangeText={this.onChangePrice}
                  style={styles.input}
                />
                <TextInput
                  testID="quantity"
                  placeholder={configJSON.quantity}
                  value={this.state.quantity}
                  onChangeText={this.onChangeQuantity}
                  style={styles.input}
                />
                <Text
                testID="image_button"
                  style={styles.productImages}
                  onPress={this.openImagePicker}
                >
                  {configJSON.productImages}
                </Text>
                {this.state.images.length > 0 && this.renderImageView()}
                <Button
                  title={configJSON.btnExampleTitle}
                  testID="submit"
                  onPress={this.postAddDataApi}
                />
                {this.state.loading && (
                  <ActivityIndicator
                    size={"large"}
                    color={"blue"}
                    style={styles.loader}
                  />
                )}
              </View>
            </Modal>
          </View>
          {/* Merge Engine UI Engine Code */}
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </View>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  loader: {
    marginVertical: normalize(20),
  },
  title: {
    color: "black",
    fontSize: 20,
    marginStart: 20,
  },
  renderView: {
    width: "43%",
    margin: "3%",
    elevation: 3,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  productImage: { width: "100%", height: Scale(170), borderRadius: 10 },
  description: { marginVertical: 5, fontSize: 14, color: "black" },
  price: { color: "green", fontSize: 14 },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    height: Scale(50),
    borderRadius: 15,
    paddingHorizontal: 8,
  },
  buttonText: {
    color: "white",
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  userTilte: { color: "#565a82", marginBottom: 8 },
  dropMainView: {
    borderRadius: 18,
    borderColor: "#565a82",
    borderWidth: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  dropValue: { color: "#565a82" },
  saparator: { backgroundColor: "#565a82", height: 0.5 },
  itemTouch: { padding: 5 },
  itemTitle: { color: "#565a82" },
  dropTouch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: Scale(50),
  },
  centeredView: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  cancel: {
    color: "red",
    alignSelf: "flex-end",
    margin: 10,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 8,
    paddingStart: 10,
    color: "black",
    borderRadius: 5,
  },
  addProduct: {
    color: "black",
    fontWeight: "bold",
    fontSize: 24,
    marginStart: 15,
  },
  productImages: {
    alignSelf: "center",
    color: "green",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  selectImage: {
    flexDirection: "row",
    width: Scale(80),
    height: Scale(80),
    marginRight: Scale(15),
  },
  selectImageStyle: {
    flexDirection: "row",
    width: Scale(80),
    height: Scale(80),
    marginRight: Scale(15),
  },
  renderImageView: { height: Scale(80), marginVertical: 10 },
  map:{flexWrap:'wrap'}
});
// Customizable Area End
