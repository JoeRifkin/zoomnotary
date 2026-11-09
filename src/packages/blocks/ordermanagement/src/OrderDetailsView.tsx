import * as React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
// Customizable Area End

import { configJSON, ViewProps } from "./OrderDetails";

const OrderDetailsView: React.FC<ViewProps> = ({
  // Customizable Area Start
  testID,
  order,
  hideKeyboard,
  deleteOrderItem,
  couponCode,
  setCouponCode,
  applyCouponCode,
  navigateToAddress,
  loading,
  handledeleteOrder,
  handleCancelOrder,
  // Customizable Area End
}) => {
  // Customizable Area Start
  const renderAddress = () => {
    const dAddresses =
      order?.attributes.delivery_addresses &&
      order.attributes.delivery_addresses.length > 0
        ? order.attributes.delivery_addresses[0]
        : null;
    if (dAddresses) {
      return (
        <View>
          <Text style={styles.addressTitle}>{configJSON.addressLabel}</Text>
          {dAddresses.name ? <Text>{dAddresses.name}</Text> : <></>}
          {dAddresses.flat_no ? <Text>{dAddresses.flat_no}</Text> : <></>}
          {dAddresses.address ? <Text>{dAddresses.address}</Text> : <></>}
          {dAddresses.address_line_2 ? (
            <Text>{dAddresses.address_line_2}</Text>
          ) : (
            <></>
          )}
          {dAddresses.landmark ? <Text>{dAddresses.landmark}</Text> : <></>}
          {dAddresses.country ? <Text>{dAddresses.country}</Text> : <></>}
          {dAddresses.zip_code ? <Text>{dAddresses.zip_code}</Text> : <></>}
          {dAddresses.phone_number ? (
            <Text>{dAddresses.phone_number}</Text>
          ) : (
            <></>
          )}
        </View>
      );
    }
  };
  // Customizable Area End

  return (
    // Customizable Area Start
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <View testID={testID}>
          <View>
            {!order || loading ? (
              <Text testID="loading" style={styles.loadingText}>
                {configJSON.loadingText}
              </Text>
            ) : (
              <>
                <View style={styles.orderCard}>
                  <View style={styles.orderCardTitle}>
                    <Text style={styles.orderNumber} testID="orderNumber">
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
                  {order.attributes.order_items?.map((orderItem) => {
                    return (
                      <View style={styles.orderItem} key={orderItem.id}>
                        <View style={styles.namePriceWrapper}>
                          <Text style={styles.orderItemName}>
                            {orderItem.attributes.catalogue.attributes.name}
                          </Text>
                          <Text style={styles.orderItemPrice}>
                            ${orderItem.attributes.total_price}
                          </Text>
                        </View>
                        <Text>
                          {configJSON.descriptionText}
                          {
                            orderItem.attributes.catalogue.attributes
                              .description
                          }
                        </Text>
                        <Text>
                          {configJSON.categoryText}
                          {
                            orderItem.attributes.catalogue.attributes.category
                              .name
                          }
                        </Text>

                        <Text>
                          {configJSON.quantityText}:{" "}
                          {orderItem.attributes.quantity}
                        </Text>
                        <Text>
                          {configJSON.orderedOnText}:
                          {new Date(
                            orderItem.attributes.updated_at
                          ).toLocaleDateString()}
                        </Text>
                        {(orderItem.attributes.status === "in_cart" ||
                          orderItem.attributes.status === "created") && (
                          <TouchableOpacity
                            onPress={() =>
                              deleteOrderItem(orderItem.attributes.id)
                            }
                            testID={
                              "deleteOrderItem-" + orderItem.attributes.id
                            }
                          >
                            <Text style={styles.deleteItemBtnStyle}>
                              {configJSON.deleteItemBtnLabel}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                  })}
                </View>

                <View style={styles.orderCard}>
                  {renderAddress()}
                  <TouchableOpacity
                    onPress={() =>
                      navigateToAddress(
                        order.attributes.delivery_addresses.length > 0
                          ? order.attributes.delivery_addresses[0].id
                          : null,
                        order.attributes.id
                      )
                    }
                    testID={"navigateToAddress-" + order.id}
                  >
                    {order.attributes.status !== "cancelled" && (
                      <Text style={styles.selectAddressBtnStyle}>
                        {order.attributes.delivery_addresses.length > 0
                          ? configJSON.changeAddress
                          : configJSON.selectAddress}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>

                {order.attributes.status === "in_cart" && (
                  <View style={styles.orderCard}>
                    <View style={styles.couponCodeWrapper}>
                      <TextInput
                        value={couponCode}
                        onChangeText={setCouponCode}
                        style={styles.couponCodeInputStyle}
                        placeholder={configJSON.couponCodePlaceholder}
                      />
                      <TouchableOpacity
                        onPress={applyCouponCode}
                        style={styles.btnStyle}
                      >
                        <Text style={styles.btnTextStyle}>
                          {configJSON.applyBtnLabel}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                <View style={styles.orderCard}>
                  <View style={styles.totalTextWrapper}>
                    <Text style={styles.totalTextLabel}>
                      {configJSON.subTotalText}
                    </Text>
                    <Text style={styles.totalTextPrice}>
                      {configJSON.currencySymbole} {order.attributes.sub_total}
                    </Text>
                  </View>
                  <View style={styles.totalTextWrapper}>
                    <Text style={styles.totalTextLabel}>
                      {configJSON.shippingChargeText}
                    </Text>
                    <Text style={styles.totalTextPrice}>
                      {configJSON.currencySymbole}{" "}
                      {order.attributes.shipping_total}
                    </Text>
                  </View>
                  <View style={styles.totalTextWrapper}>
                    <Text style={styles.totalTextLabel}>
                      {configJSON.totalTaxText}
                    </Text>
                    <Text style={styles.totalTextPrice}>
                      {configJSON.currencySymbole} {order.attributes.total_tax}
                    </Text>
                  </View>
                  <View style={styles.totalTextWrapper}>
                    <Text style={styles.totalTextLabel}>
                      {configJSON.discountText}
                    </Text>
                    <Text style={styles.totalTextPrice}>
                      - {configJSON.currencySymbole}{" "}
                      {order.attributes.applied_discount}
                    </Text>
                  </View>
                  <View style={styles.grandTotalTextWrapper}>
                    <Text style={styles.totalTextLabel}>
                      {configJSON.totalText}
                    </Text>
                    <Text style={styles.totalTextPrice}>
                      {configJSON.currencySymbole} {order.attributes.total}
                    </Text>
                  </View>
                </View>

                {order.attributes.status === "created" ? (
                  <TouchableOpacity onPress={handleCancelOrder}>
                    <Text style={styles.cancelButton}>
                      {configJSON.cancelOrderText}
                    </Text>
                  </TouchableOpacity>
                ) : null}

                <TouchableOpacity onPress={handledeleteOrder}>
                  <Text style={styles.cancelButton}>
                    {configJSON.deleteOrderText}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
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
    paddingBottom: 50,
  },
  orderCard: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderRadius: 5,
  },
  loadingText: {
    textAlign: "center",
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
    fontWeight: "600",
    marginBottom: 12,
  },
  orderItem: {
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  orderItemName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    flex: 1,
  },
  orderItemPrice: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  cancelButton: {
    textAlign: "center",
    paddingTop: 15,
    color: "#ff0000",
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
  deleteItemBtnStyle: {
    textAlign: "center",
    color: "#ff0000",
    paddingTop: 12,
    paddingBottom: 5,
  },
  totalTextWrapper: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
  },
  grandTotalTextWrapper: {
    borderColor: "#ccc",
    borderTopWidth: 0.5,
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    paddingTop: 10,
  },
  totalTextLabel: {
    flex: 1,
  },
  totalTextPrice: {
    fontWeight: "600",
  },
  couponCodeInputStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
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
  couponCodeWrapper: {
    flexDirection: "row",
  },
  addressTitle: {
    fontWeight: "600",
    marginBottom: 5,
  },
  selectAddressBtnStyle: {
    textAlign: "center",
    color: "#6200ee",
  },
  namePriceWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
});
// Customizable Area End

export default OrderDetailsView;
