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
import ContentManagement from "../../src/ContentManagement.web";

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
  "./__tests__/features/ContentManagement-scenario.web.feature"
);
let data = new Uint8Array([
  137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 8, 0,
  0, 0, 8, 8, 2, 0, 0, 0, 75, 109, 41, 220, 0, 0, 0, 34, 73, 68, 65, 84, 8, 215,
  99, 120, 173, 168, 135, 21, 49, 0, 241, 255, 15, 90, 104, 8, 33, 129, 83, 7,
  97, 163, 136, 214, 129, 93, 2, 43, 2, 0, 181, 31, 90, 179, 225, 252, 176, 37,
  0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130,
]);
let blob = new Blob([data], { type: "image/png" });
const event = {
  preventDefault() {},
  target: { value: "builder test", files: [blob] },
};
defineFeature(feature, (test) => {
  URL.createObjectURL = jest.fn();

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
        (node) => node.prop("id") === "prod_list"
      );
      expect(prodListCompp.length).toEqual(1);
    });

    when("user click on dropdown select user", () => {
      let dropdownClick = exampleBlockA.findWhere(
        (node) => node.prop("id") === "demo-user-select"
      );
      const eventUser = {
        preventDefault() {},
        target: { value: "user_1" },
      };
      dropdownClick.simulate("change", eventUser);
      instance.onSelectCategory("user_1");
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
      instance.setState({ loading: false, userDataList: updatedUserData });
    });

    then("I can see the products based on selected user", () => {
      let prodListCompp = exampleBlockA.findWhere(
        (node) => node.prop("id") === "prod_list"
      );
      expect(prodListCompp).toHaveLength(2);
    });

    when("user click on Add new product button", () => {
      let buttonCompone = exampleBlockA.findWhere(
        (node) => node.prop("id") === "add_new_button"
      );
      buttonCompone.simulate("click");
      instance.addNewProduct();
    });

    then("model will open to fill form", () => {
      let addModelCompp = exampleBlockA.findWhere(
        (node) => node.prop("id") === "model_add"
      );
      expect(addModelCompp.length).toBeGreaterThan(0);
      expect(instance.state.showModel).toEqual(true);
    });

    when("user fill all inputs fields and submit button", () => {
      let title = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "form-title"
      );
      title.simulate("change", event);
      let text = "builder test";
      instance.onChangeTitle(text);
      instance.setState({ title: text });

      let description = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "form-description"
      );
      description.simulate("change", event);
      instance.onChangeDescription(text);
      instance.setState({ description: "builder test" });

      let price = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "form-price"
      );
      price.simulate("change", event);
      instance.onChangePrice(text);
      instance.setState({ price: "123" });

      let quantity = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "form-quantity"
      );
      quantity.simulate("change", event);
      instance.onChangeQuantity(text);
      instance.setState({ quantity: "12" });

      // let image = exampleBlockC.findWhere(
      //   (node) => node.prop("id") === "raised-button-file"
      // );
      // let imagetype = {
      //   uri: 'https://picsum.photos/200',
      //   width: 120,
      //   height: 120
      // }
      // const base64 = URL.createObjectURL(blob)
      // image.simulate("change", event);
      // instance.onChangeImage(event);
      // instance.setState({ images: [imagetype], baseImages: [base64] });
      // expect(instance.state.images).toEqual([imagetype]);
      // expect(instance.state.baseImages).toEqual([base64]);

      // let removeimage = exampleBlockC.findWhere(
      //   (node) => node.prop("id") === "remove_img"
      // );
      // removeimage.simulate('click', 'https://picsum.photos/200', 0)
      // instance.onRemoveImg('https://picsum.photos/200', 0)
    });

    then("all fields are fill", () => {
      expect(instance.state.title).toEqual("builder test");
      expect(instance.state.description).toEqual("builder test");
      expect(instance.state.price).toEqual("123");
      expect(instance.state.quantity).toEqual("12");
    });

    when("user click on submit button", () => {
      let addProduct = exampleBlockA.findWhere(
        (node) => node.prop("id") === "add_product_button"
      );
      addProduct.simulate("click");
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
    });

    then("new product will added in list", () => {
      let prodListCompp = exampleBlockA.findWhere(
        (node) => node.prop("id") === "prod_list"
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
        (node) => node.prop("id") === "prod_list"
      );
      expect(prodListCompp).toHaveLength(0);
    });
  });
});
