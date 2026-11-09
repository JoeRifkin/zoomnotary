//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { beforeEach, expect, jest } from "@jest/globals";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ContentManagement from "../../src/ContentManagement";

const screenProps = {
  navigation:{},
  idContent: "ContentManagement",
};

const userData = [
  {
    id: "1",
    type: "content",
    attributes: {
      title: "idkfkdk",
      description: "loreimmmmmm",
      status: false,
      price: 16000.0,
      user_type: "user_1",
      quantity: "4",
      created_at: "2023-03-09T07:22:13.860Z",
      updated_at: "2023-03-09T07:24:35.679Z",
      images: [
        {
          id: 736,
          url: "https://nickcoingophase1v2-158847-ruby.b158847.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdUFDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6c48abb98e9d554e62d8be6ff16cbdf10cb66315/290134_draw_edit_pen_pencil_write_icon%201.png",
          type: "images",
          filename: "290134_draw_edit_pen_pencil_write_icon 1.png",
        },
      ],
    },
  },
];

const Item = {
  id: "9",
  type: "content",
  attributes: {
    title: "fgsgsgsg",
    description: "fgrgfdgfdgdfg",
    status: null,
    price: 1234.0,
    user_type: "user_1",
    quantity: "1",
    created_at: "2023-03-13T09:25:30.198Z",
    updated_at: "2023-03-13T09:25:30.216Z",
    images: [
      {
        id: 759,
        url: "https://nickcoingophase1v2-158847-ruby.b158847.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdmNDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d8af81b3a5608302adafeb7c99f6373539514d70/image",
        type: "images",
        filename: "image",
      },
    ],
  },
};
const updatedUserData = [
  {
    id: "1",
    type: "content",
    attributes: {
      title: "idkfkdk",
      description: "loreimmmmmm",
      status: false,
      price: 16000.0,
      user_type: "user_1",
      quantity: "4",
      created_at: "2023-03-09T07:22:13.860Z",
      updated_at: "2023-03-09T07:24:35.679Z",
      images: [
        {
          id: 736,
          url: "https://nickcoingophase1v2-158847-ruby.b158847.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdUFDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6c48abb98e9d554e62d8be6ff16cbdf10cb66315/290134_draw_edit_pen_pencil_write_icon%201.png",
          type: "images",
          filename: "290134_draw_edit_pen_pencil_write_icon 1.png",
        },
      ],
    },
  },
  {
    id: "2",
    type: "content",
    attributes: {
      title: "idkfggfkdk",
      description: "loredddimmmmmm",
      status: false,
      price: 100.0,
      user_type: "user_2",
      quantity: "4",
      created_at: "2023-03-09T07:22:13.860Z",
      updated_at: "2023-03-09T07:24:35.679Z",
      images: [
        {
          id: 736,
          url: "https://nickcoingophase1v2-158847-ruby.b158847.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdUFDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6c48abb98e9d554e62d8be6ff16cbdf10cb66315/290134_draw_edit_pen_pencil_write_icon%201.png",
          type: "images",
          filename: "290134_draw_edit_pen_pencil_write_icon 1.png",
        },
      ],
    },
  },
];

const AddData = {
  data: {
    id: "7",
    type: "content",
    attributes: {
      title: "idkfkdk",
      description: "loreimmmmmm ddrghj gfh ghk k whkg h h k rh rk",
      status: true,
      price: 16000.0,
      user_type: "user_1",
      quantity: "4",
      created_at: "2023-03-13T08:24:23.964Z",
      updated_at: "2023-03-13T08:24:23.981Z",
      images: [
        {
          id: 754,
          url: "https://nickcoingophase1v2-158847-ruby.b158847.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdklDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4a3c3cf26129ab7eb90010d9bb362a0c76fd3360/290104_calendar_clock_date_event_schedule_icon%202.png",
          type: "images",
          filename: "290104_calendar_clock_date_event_schedule_icon 2.png",
        },
        {
          id: 755,
          url: "https://nickcoingophase1v2-158847-ruby.b158847.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdk1DIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7cf752e54c062dd48f2a6a4feffd6c7ee0d21228/7695982_office_business_work_workplace_home_icon%201.png",
          type: "images",
          filename: "7695982_office_business_work_workplace_home_icon 1.png",
        },
        {
          id: 756,
          url: "https://nickcoingophase1v2-158847-ruby.b158847.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdlFDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--58dbfb91989a83bb9fc4e33e8c59d6fcfe5d9df5/086a4f0ecc940e0342b85f0cdbb3a2c568519fd0%20(1).png",
          type: "images",
          filename: "086a4f0ecc940e0342b85f0cdbb3a2c568519fd0 (1).png",
        },
        {
          id: 757,
          url: "https://nickcoingophase1v2-158847-ruby.b158847.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdlVDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--72d2d9d5cef87a24dce19d274630f50fc3416303/Adress%20icon.png",
          type: "images",
          filename: "Adress icon.png",
        },
      ],
    },
  },
  meta: {
    message: "Content Created Successfully",
  },
};

const feature = loadFeature(
  "./__tests__/features/ContentManagement-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to ContentManagement", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: ContentManagement;

    given("I am a User loading ContentManagement", () => {
      exampleBlockA = shallow(<ContentManagement {...screenProps} />);
      instance = exampleBlockA.instance() as ContentManagement;
      const UserDataListAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      UserDataListAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        UserDataListAPI
      );
      UserDataListAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: userData,
        }
      );
      instance.userDataListCall = UserDataListAPI;
      runEngine.sendMessage("Unit Test", UserDataListAPI);
      instance.setState({ loading: false, userDataList: userData });
    });

    then("I can see the products", () => {
      let prodListCompp = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "cardPress"
      );
      expect(prodListCompp.length).toEqual(1);
    });

    when("user click on dropdown select user", () => {
      let dropdownClick = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "demo-user-select"
      );
      dropdownClick.simulate("press");
      let index = 0;
      instance.renderDropDownCard(
        { idss: 1, title: "fsdfgsgs", value: "fggg" },
        index
      );
      instance.setState({
        showCategory: !instance.state.showCategory,
      });
      instance.onSelectCategory({ idss: 1, title: "fsdfgsgs", value: "fggg" });
      const UserDataListAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      UserDataListAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        UserDataListAPI
      );
      UserDataListAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: updatedUserData,
        }
      );
      instance.userDataListCall = UserDataListAPI;
      runEngine.sendMessage("Unit Test", UserDataListAPI);
      instance.setState({ loading: false, userDataList: userData });
    });

    then("I can see the products based on selected user", () => {
      let prodListCompp = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "cardPress"
      );
      expect(prodListCompp.length).toEqual(1);
    });

    when("user click on Add new product button", () => {
      let buttonCompone = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "add_new_button"
      );
      buttonCompone.simulate("click");
      instance.addNewProduct();
    });

    then("model will open to fill form", () => {
      let addModelCompp = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "model_add"
      );
      expect(addModelCompp.length).toBeGreaterThan(0);
      expect(instance.state.showModel).toEqual(true);
    });

    when("user fill all inputs and fields", () => {
      let title = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "title"
      );
      title.simulate("onChangeText", "builder test");
      let text = "builder test";
      instance.onChangeTitle(text);
      instance.setState({ title: text });

      let description = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "description"
      );
      description.simulate("onChangeText", "builder test");
      instance.onChangeDescription(text);
      instance.setState({ description: "builder test" });

      let price = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "price"
      );
      price.simulate("onChangeText", "456");
      instance.onChangePrice(text);
      instance.setState({ price: "456" });

      let quantity = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "quantity"
      );
      quantity.simulate("onChangeText", "5");
      instance.onChangeQuantity(text);
      instance.setState({ quantity: "5" });

      let imageComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "image_button"
      );
      imageComponent.simulate("press");
      let index = 1;
      instance.renderImageView();
      instance.renderImageViewCard(
        { uris: "www.google.com", width: "", height: "" },
        index
      );
    });

    then("all fields are fill", () => {
      expect(instance.state.title).toEqual("builder test");
      expect(instance.state.description).toEqual("builder test");
      expect(instance.state.price).toEqual("456");
      expect(instance.state.quantity).toEqual("5");
    });

    when("user click on submit button", () => {
      let addProduct = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "submit"
      );
      addProduct.simulate("click");
      instance.postAddDataApi();
      const AddDataListAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      AddDataListAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        AddDataListAPI
      );
      AddDataListAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: updatedUserData,
        }
      );
      instance.addDataCall = AddDataListAPI;
      runEngine.sendMessage("Unit Test", AddDataListAPI);
      instance.setState({ loading: false, userDataList: updatedUserData });
      instance.hideModal();
    });

    then("new product will added in list", () => {
      let prodListCompp = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "cardPress"
      );
      expect(prodListCompp.length).toEqual(2);
    });
  });

  test("Handle API errors", ({ given, when, then }) => {
    let exampleBlockD: ShallowWrapper;
    let instance: ContentManagement;

    given("I am a User loading ContentManagement", () => {
      exampleBlockD = shallow(<ContentManagement {...screenProps} />);
      instance = exampleBlockD.instance() as ContentManagement;
    });

    when("the get product API returns an error", () => {
      const UserDataListError = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      UserDataListError.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        UserDataListError
      );
      UserDataListError.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [],
        }
      );
      instance.userDataListCall = UserDataListError;
      runEngine.sendMessage("Unit Test", UserDataListError);
      instance.setState({ loading: false, userDataList: [] });
    });

    then("I should not see the list of products with 0 element", () => {
      let prodListCompp = exampleBlockD.findWhere(
        (node) => node.prop("testID") === "cardPress"
      );
      expect(prodListCompp).toHaveLength(0);
    });
  });
});
