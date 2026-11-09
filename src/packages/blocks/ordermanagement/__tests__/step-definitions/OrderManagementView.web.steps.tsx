import React from "react";
import { fireEvent, render } from "@testing-library/react";

import OrderManagementView from "../../src/OrderManagementView.web";

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

describe("OrderManagementViewWeb", () => {
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
    expect(loading?.textContent).toBe("Loading...");
  });

  it("should render emplty list text when order not getting from api", () => {
    const { queryByTestId } = render(
      <OrderManagementView {...screenProps} loading={false} orders={[]} />
    );
    const emptyOrderListMsg = queryByTestId("loading");
    expect(emptyOrderListMsg).toBeDefined();
    expect(emptyOrderListMsg?.textContent).toBe("Order list is empty");
  });

  it("should order number render correctly when order will get and click on it", () => {
    const { queryByTestId } = render(<OrderManagementView {...screenProps} />);
    const orderNumber = queryByTestId("orderNumber");
    orderNumber && fireEvent.click(orderNumber);
    expect(orderNumber?.textContent).toBe(
      "Order Number: " + orders[0].attributes.order_number
    );
    expect(screenProps.navigateToOrderDetail).toBeCalledWith("23");
  });

  it("should add order item modal open when user press on add new order item in order id button", () => {
    const { queryByTestId } = render(<OrderManagementView {...screenProps} selectedOrderId={23} />);
    const addOrderItem = queryByTestId("addOrderItem");
    addOrderItem && fireEvent.click(addOrderItem);
    expect(screenProps.openAddItemModalHandler).toBeCalledWith(23);
  });

  it("should navigation function call when user click on view detail button", () => {
    const { queryByTestId } = render(<OrderManagementView {...screenProps} />);
    const viewDetailBtn = queryByTestId("viewDetailBtn");
    viewDetailBtn && fireEvent.click(viewDetailBtn);
    expect(screenProps.navigateToOrderDetail).toBeCalledWith("23");
  });

  it("should add order modal open when user press on add new order button", () => {
    const { queryByTestId } = render(<OrderManagementView {...screenProps} />);
    const createNewOrderBtn = queryByTestId("createNewOrderBtn");
    createNewOrderBtn && fireEvent.click(createNewOrderBtn);
    expect(screenProps.openCreateModal).toBeCalled();
  });

  it("should setCatalogueId function call when user enter cataloque id", () => {
    const { queryByTestId } = render(<OrderManagementView {...screenProps} isVisibleCreateModal={true} />);
    const catalogueId = queryByTestId("catalogueId")?.querySelector("input") as HTMLInputElement;
    const event = {
      target: { value: "2" }
    }
    fireEvent.change(catalogueId, event);
    expect(screenProps.setCatalogueId).toBeCalledWith("2");
  });

  it("should setCatalogueVariantId function call when user enter cataloque variant id", () => {
    const { queryByTestId } = render(<OrderManagementView {...screenProps} isVisibleCreateModal={true} />);
    const catalogueVariantId = queryByTestId("catalogueVariantId")?.querySelector("input") as HTMLInputElement;
    const event = {
      target: { value: "3" }
    }
    fireEvent.change(catalogueVariantId, event);
    expect(screenProps.setCatalogueVariantId).toBeCalledWith("3");
  });

  it("should quantity function call when user enter quantity in text field", () => {
    const { queryByTestId } = render(<OrderManagementView {...screenProps} isVisibleCreateModal={true} />);
    const quantity = queryByTestId("quantity")?.querySelector("input") as HTMLInputElement;
    const event = {
      target: { value: "10" }
    }
    fireEvent.change(quantity, event);
    expect(screenProps.setQuantity).toBeCalledWith("10");
  });


});
