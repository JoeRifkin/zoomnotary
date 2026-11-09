import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import OrderManagementView from "../../src/OrderManagementView";

const orders: any = [
  {
    id: "23",
    type: "order",
    attributes: {
      id: 23,
      order_number: "OD00000022",
      account_id: 2,
      sub_total: "9.0",
      total: "-10.5",
      status: "created",
      applied_discount: "10.5",
      tax_charges: "0.0",
      order_status_id: 3,
      total_tax: 10.62,
      created_at: "2023-02-13T19:56:26.921Z",
      order_items: [
        {
          id: "27",
          attributes: {
            id: 27,
            quantity: 1,
            total_price: "9.0",
            created_at: "2023-02-13T19:56:26.933Z",
            updated_at: "2023-02-15T14:13:54.027Z",
            order: {
              id: 23,
            },
            catalogue: {
              attributes: {
                name: "",
                category: {
                  name: "food",
                },
              },
            },
          },
        },
      ],
    },
  },
];

const screenProps = {
  testID: "",
  orders,
  loading: false,
  hideKeyboard: jest.fn(),
  openCreateModal: jest.fn(),
  isVisibleCreateModal: false,
  catalogueId: "",
  setCatalogueId: jest.fn(),
  catalogueVariantId: "",
  setCatalogueVariantId: jest.fn(),
  quantity: "",
  setQuantity: jest.fn(),
  onSubmitCreateOrder: jest.fn(),
  navigateToOrderDetail: jest.fn(),
  openAddItemModalHandler: jest.fn(),
  resetCreateOrderModal: jest.fn(),
  selectedOrderId: null,
};

describe("OrderManagementView", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("should loading component render on initial render", () => {
    const { queryByTestId } = render(
      <OrderManagementView {...screenProps} loading={true} />
    );
    const loading = queryByTestId("loading");
    expect(loading).toBeDefined();
    expect(loading?.props.children).toBe("Loading...");
  });

  it("should order number render correctly when order will get", () => {
    const { queryByTestId } = render(<OrderManagementView {...screenProps} />);
    const orderNumber = queryByTestId("orderNumber");
    expect(orderNumber?.props.children.join("")).toBe(
      "Order Number: " + orders[0].attributes.order_number
    );
  });

  it("should add order item modal open when user press on add new order item in order id button", () => {
    const { queryByTestId } = render(<OrderManagementView {...screenProps} selectedOrderId={23} />);
    const addOrderItem = queryByTestId("addOrderItem");
    addOrderItem && fireEvent.press(addOrderItem);
    expect(screenProps.openAddItemModalHandler).toBeCalledWith(23);
  });

  it("should add order modal open when user press on add new order button", () => {
    const { queryByTestId } = render(<OrderManagementView {...screenProps} />);
    const createNewOrderBtn = queryByTestId("createNewOrderBtn");
    createNewOrderBtn && fireEvent.press(createNewOrderBtn);
    expect(screenProps.openCreateModal).toBeCalled();
  });

  it("should navigation function call when user click on any order", () => {
    const { queryByTestId } = render(<OrderManagementView {...screenProps} />);
    const order = queryByTestId("order");
    order && fireEvent.press(order);
    expect(screenProps.navigateToOrderDetail).toBeCalledWith("23");
  });
});
