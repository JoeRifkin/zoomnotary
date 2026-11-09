import React from "react";
import { fireEvent, render } from "@testing-library/react";

import OrderDetailsView from "../../src/OrderDetailsView.web";

const order: any = {
  id: "23",
  type: "order",
  attributes: {
    id: 23,
    order_number: "OD00000022",
    account_id: 2,
    sub_total: "9.0",
    total: "-10.5",
    status: "in_cart",
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
          status: "in_cart",
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
    delivery_addresses: [
      {
        id: 1,
        name: "",
        flat_no: "",
        address: "",
        address_line_2: "",
        landmark: "",
        country: "",
        zip_code: "",
        phone_number: ""
      }
    ]
  },
};

const order2: any = {
  id: "24",
  type: "order",
  attributes: {
    id: 24,
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
          status: "created",
          total_price: "9.0",
          created_at: "2023-02-13T19:56:26.933Z",
          updated_at: "2023-02-15T14:13:54.027Z",
          order: {
            id: 24,
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
    delivery_addresses: [
      {
        id: 1,
        name: "home",
        flat_no: "f-1",
        address: "address line 1",
        address_line_2: "address line 2",
        landmark: "landmark",
        country: "country",
        zip_code: "123456",
        phone_number: "9876543210"
      }
    ]
  },
};

const screenProps = {
  order: order,
  testID: "",
  hideKeyboard: jest.fn(),
  deleteOrderItem: jest.fn(),
  couponCode: "",
  setCouponCode: jest.fn(),
  applyCouponCode: jest.fn(),
  navigateToAddress: jest.fn(),
  loading: false,
  handledeleteOrder: jest.fn,
  handleCancelOrder: jest.fn(),
};

describe("OrderDetailsWeb", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("should loading component render on initial render", () => {
    const { queryByTestId } = render(
      <OrderDetailsView {...screenProps} loading={true} />
    );
    const loading = queryByTestId("loading");
    expect(loading).toBeDefined();
    expect(loading?.textContent).toBe("Loading...");
  });

  it("should order number render correctly when order will get", () => {
    const { queryByTestId } = render(<OrderDetailsView {...screenProps} />);
    const orderNumber = queryByTestId("orderNumber");
    expect(orderNumber?.textContent).toBe(
      "Order Number: " + order.attributes.order_number
    );
  });

  it("should deleteOrderItem function call when user click on delete order item button", () => {
    const { queryByTestId } = render(<OrderDetailsView {...screenProps} />);
    const deleteOrderItem = queryByTestId("deleteOrderItem-27");
    deleteOrderItem && fireEvent.click(deleteOrderItem);
    expect(screenProps.deleteOrderItem).toBeCalledWith(27)
  });

  it("should deleteOrderItem function call when user click on delete order item button", () => {
    const { queryByTestId } = render(<OrderDetailsView {...screenProps} order={order2} />);
    const navigateToAddress = queryByTestId("navigateToAddress-24");
    navigateToAddress && fireEvent.click(navigateToAddress);
    expect(screenProps.navigateToAddress).toBeCalledWith(1, 24)
  });

  it("should setCouponCode function call when user type coupon code in text field", () => {
    const { queryByTestId } = render(<OrderDetailsView {...screenProps} />);
    const couponCodeTextField = queryByTestId("couponCodeTextField")?.querySelector("input") as HTMLInputElement;
    const event = {
      target: { value: "code-12" }
    }
    fireEvent.change(couponCodeTextField, event);
    expect(screenProps.setCouponCode).toBeCalledWith("code-12")
  });

  it("should applyCouponCode function call when user click on apply button", () => {
    const { queryByTestId } = render(<OrderDetailsView {...screenProps} />);
    const applyCoupon = queryByTestId("applyCoupon");
    applyCoupon && fireEvent.click(applyCoupon);
    expect(screenProps.applyCouponCode).toBeCalled()
  });

  it("should render select address button when user was not selected delivery address", () => {
    const { queryByTestId } = render(
      <OrderDetailsView
        {...screenProps}
        order={{
          ...order,
          attributes: { ...order.attributes, delivery_addresses: [] },
        }}
      />
    );
    const navigateToAddressBtn = queryByTestId("navigateToAddress-23");

    expect(navigateToAddressBtn?.textContent).toBe("Select Add");

    navigateToAddressBtn && fireEvent.click(navigateToAddressBtn);
    expect(screenProps.navigateToAddress).toBeCalledWith(null, 23);
  });
});
