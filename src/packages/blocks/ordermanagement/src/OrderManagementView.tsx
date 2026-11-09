import * as React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
// Customizable Area End
import { configJSON, ViewProps } from "./OrderManagement";

const OrderManagementView: React.FC<ViewProps> = ({
  // Customizable Area Start
  testID,
  orders,
  loading,
  hideKeyboard,
  openCreateModal,
  isVisibleCreateModal,
  catalogueId,
  setCatalogueId,
  catalogueVariantId,
  setCatalogueVariantId,
  quantity,
  setQuantity,
  onSubmitCreateOrder,
  navigateToOrderDetail,
  openAddItemModalHandler,
  resetCreateOrderModal,
  selectedOrderId,
  // Customizable Area End
}) => {
  // Customizable Area Start
  // Customizable Area End

  return (
    // Customizable Area Start
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <View>
          <View testID={testID}>
            <View style={styles.topBtnContainer}>
              <TouchableOpacity
                onPress={openCreateModal}
                style={styles.btnStyle}
                testID="createNewOrderBtn"
              >
                <Text style={styles.btnTextStyle}>
                  {configJSON.createNewOrderText}
                </Text>
              </TouchableOpacity>
            </View>
            {loading ? (
              <Text testID="loading" style={styles.loadingText}>
                {configJSON.loadingText}
              </Text>
            ) : (
              orders.map((order) => {
                return (
                  <TouchableOpacity
                    onPress={() => navigateToOrderDetail(order.id)}
                    key={order.id}
                    testID="order"
                  >
                    <View style={styles.orderCard}>
                      <View style={styles.orderCardTitle}>
                        <Text testID="orderNumber" style={styles.orderNumber}>
                          {configJSON.orderNumberText}:{" "}
                          {order.attributes.order_number}
                        </Text>
                        <Text style={styles.orderStatus}>
                          {order.attributes.status
                            .split("_")
                            .join(" ")
                            .toUpperCase()}
                        </Text>
                      </View>
                      <View>
                        {order.attributes.order_items?.map((orderItem) => {
                          return (
                            <View style={styles.orderItem} key={orderItem.id}>
                              <View>
                                <Text style={styles.orderItemName}>
                                  {
                                    orderItem.attributes.catalogue.attributes
                                      .name
                                  }
                                </Text>
                                <Text>
                                  {
                                    orderItem.attributes.catalogue.attributes
                                      .description
                                  }
                                </Text>
                                <Text>
                                  {
                                    orderItem.attributes.catalogue.attributes
                                      .category.name
                                  }
                                </Text>
                              </View>
                              <View>
                                <Text style={styles.orderItemPrice}>
                                  ${orderItem.attributes.total_price}
                                </Text>
                                <Text>
                                  {configJSON.quantityText}:{" "}
                                  {orderItem.attributes.quantity}
                                </Text>
                                <Text>
                                  {configJSON.orderedOnText}:{" "}
                                  {new Date(
                                    orderItem.attributes.updated_at
                                  ).toLocaleDateString()}
                                </Text>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                      <View style={styles.orderCardBtnWrapper}>
                        {(order.attributes.status === "in_cart" ||
                          order.attributes.status === "created") && (
                          <TouchableOpacity
                            testID="addOrderItem"
                            onPress={() =>
                              openAddItemModalHandler(order.attributes.id)
                            }
                          >
                            <Text style={styles.addNewOrderBtnStyle}>
                              {configJSON.addNewOrderItem}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isVisibleCreateModal}
            onRequestClose={resetCreateOrderModal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.textInputWrapper}>
                  <Text style={styles.modalTitle}>
                    {selectedOrderId
                      ? configJSON.createNewOrderItemText
                      : configJSON.createNewOrderTitle}
                  </Text>
                  <TextInput
                    value={catalogueId}
                    onChangeText={setCatalogueId}
                    placeholder={configJSON.catalogueIdPlaceholder}
                    style={styles.textInputStyle}
                  />
                  <TextInput
                    value={catalogueVariantId}
                    onChangeText={setCatalogueVariantId}
                    placeholder={configJSON.catalogueVariantIdPlaceholder}
                    style={styles.textInputStyle}
                  />
                  <TextInput
                    value={quantity}
                    onChangeText={setQuantity}
                    placeholder={configJSON.quantityPlaceholder}
                    style={styles.textInputStyle}
                  />
                </View>
                <View style={styles.modalActionView}>
                  <TouchableOpacity
                    onPress={resetCreateOrderModal}
                    style={styles.cancelbtnStyle}
                  >
                    <Text style={styles.btnTextStyle}>
                      {configJSON.cancelBtnLabel}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onSubmitCreateOrder}
                    style={styles.btnStyle}
                  >
                    <Text style={styles.btnTextStyle}>
                      {configJSON.createBtnLabel}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
    // Customizable Area End
  );
};

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
  contentContainer: {
    paddingBottom: 30,
  },
  btnStyle: {
    backgroundColor: "#6200ee",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  btnTextStyle: {
    color: "#fff",
  },
  topBtnContainer: {
    alignItems: "flex-end",
    marginBottom: 15,
  },
  loadingText: {
    textAlign: "center",
  },
  orderCard: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderRadius: 5,
  },
  orderCardTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderStatus: {
    fontWeight: "bold",
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: "300",
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  orderItemName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  orderItemPrice: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  cancelButton: {
    textAlign: "center",
    paddingTop: 12,
    paddingBottom: 5,
    color: "#ff0000",
    fontWeight: "500",
    paddingLeft: 15,
  },
  addNewOrderBtnStyle: {
    textAlign: "center",
    paddingTop: 12,
    paddingBottom: 5,
    color: "#6200ee",
    fontWeight: "500",
    paddingLeft: 15,
  },
  orderCardBtnWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.6)",
  },
  modalView: {
    margin: 20,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalActionView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  cancelbtnStyle: {
    backgroundColor: "#ccc",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  textInputWrapper: {
    flexDirection: "column",
    width: "100%",
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
});
// Customizable Area End

export default OrderManagementView;
