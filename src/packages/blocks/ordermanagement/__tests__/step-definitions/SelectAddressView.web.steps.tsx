import React from "react";
import { fireEvent, render } from "@testing-library/react";

import SelectAddressView from "../../src/SelectAddressView.web";

const address: any = [
  {
    id: "1",
    type: "addresses",
    attributes: {
      id: 1,
      name: "Home",
      flat_no: "f-12",
      address: "address-line-1",
      address_line_2: "address-line-2",
      address_type: "shipping",
      zip_code: "123456",
      phone_number: "+445253345322",
      address_for: "shipping",
      city: "city name",
      state: "state name",
      country: "country name",
      landmark: "landmark",
      created_at: "2023-02-16T16:01:19.557Z",
      updated_at: "2023-02-16T16:01:19.557Z",
    },
  },
  {
    id: "2",
    type: "addresses",
    attributes: {
      id: 2,
      name: "Home",
      flat_no: "f-13",
      address: "address-line-1",
      address_line_2: "address-line-2",
      address_type: "shipping",
      zip_code: "123456",
      phone_number: "+445253345322",
      address_for: "shipping",
      city: "city name",
      state: "state name",
      country: "country name",
      landmark: "landmark",
      created_at: "2023-02-16T16:01:19.557Z",
      updated_at: "2023-02-16T16:01:19.557Z",
    },
  },
];

const textFields = [
  {
    name: "phone_number",
    value: "",
    placeholder: "please enter phone number",
    testId: "phone_number",
  },
  {
    name: "name",
    value: "",
    placeholder: "please enter address name",
    testId: "name",
  },
];

const screenProps = {
  testID: "SelectAddressView",
  addresses: address,
  hideKeyboard: jest.fn(),
  openCreateAddress: jest.fn(),
  isVisibleCreateAddress: false,
  resetCreateModal: jest.fn(),
  textFields,
  setTextFields: jest.fn(),
  addAddressHandler: jest.fn(),
  addressId: "2",
  orderId: "12",
  selectAddress: jest.fn(),
  loading: false,
};

describe("SelectAddressViewWeb", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("should loading component render on initial render", () => {
    const { queryByTestId } = render(
      <SelectAddressView {...screenProps} loading={true} />
    );
    const loading = queryByTestId("loading");
    expect(loading).toBeDefined();
    expect(loading?.textContent).toBe("Loading...");
  });

  it("should show alert message when order id is not present", () => {
    const { queryByTestId } = render(
      <SelectAddressView {...screenProps} orderId={undefined} />
    );
    const loading = queryByTestId("loading");
    expect(loading).toBeDefined();
    expect(loading?.textContent).toBe("Order ID not present");
  });

  it("should address name of zeroth index render correctly when address list will get", () => {
    const { queryByTestId } = render(<SelectAddressView {...screenProps} />);
    const addressName = queryByTestId("addressName-1");
    expect(addressName?.textContent).toBe("Name : Home");
  });

  it("should selectAddress function call when user click on select address button", () => {
    const { queryByTestId } = render(<SelectAddressView {...screenProps} />);
    const selectAddressBtn = queryByTestId("selectAddressBtn-1");
    selectAddressBtn && fireEvent.click(selectAddressBtn);
    expect(screenProps.selectAddress).toBeCalledWith(address[0]);
  });

  it("should setPhoneNo function call when user type phone number", () => {
    const { queryByTestId } = render(
      <SelectAddressView {...screenProps} isVisibleCreateAddress={true} />
    );
    const phone_number = queryByTestId("phone_number")?.querySelector(
      "input"
    ) as HTMLInputElement;
    const event = {
      target: { value: "123456789" },
    };
    phone_number && fireEvent.change(phone_number, event);
    expect(screenProps.setTextFields).toBeCalledWith({
      type: "phone_number",
      payload: "123456789",
    });
  });
});
