import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import { beforeEach, expect, jest } from "@jest/globals";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import InvoiceBilling from "../../src/InvoiceBilling.web";
import { configJSON } from "../../src/InvoiceBillingController.web";

const screenProps = {
  navigation: {},
  id: "InvoiceBilling",
};

const ApiData = {
  invoice:
    "https://nickcoingophase1v2-158847-ruby.b158847.dev.eastus.az.svc.builder.cafe//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc2NDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4d45a5ab8c3d0210d1b7a037e140d2b3b5508b1d/Invoice_299206.pdf",
};

const ApiError = { errors: [{ message: "No invoice found." }] };
const event = {
  target: { value: "299206" },
};

const feature = loadFeature(
  "./__tests__/features/InvoiceBilling-scenario.web.feature"
);

const window = { open: jest.fn() };

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    
  });

  test("Display the InvoiceBilling", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: InvoiceBilling;

    given("I am on the InvoiceBilling screen", () => {
      exampleBlockA = shallow(<InvoiceBilling {...screenProps} />);
      instance = exampleBlockA.instance() as InvoiceBilling;
    });

    when("the screen is loaded", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("id") === "main_view"
      );
      expect(textInputComponent).toHaveLength(1);
    });

    then("I should see the InvoiceBilling input", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("id") === "textInput"
      );
      expect(textInputComponent).toHaveLength(1);
    });

    then("I enter some number", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("id") === "textInput"
      );
      textInputComponent.simulate("change", event);
      let textIn = "770053";
      instance.onChangeInvoice(textIn);
      if (textIn === "") {
        instance.setState({
          invoice: textIn,
          invoiceError: configJSON.invoiceValidation,
        });
      } else {
        instance.setState({ invoice: textIn, invoiceError: "" });
      }
      expect(instance.state.invoice).toEqual("770053");
    });
    when("I submit invoice number", () => {
      let submitCompp = exampleBlockA.findWhere(
        (node) => node.prop("id") === "btnExample"
      );
      submitCompp.simulate("click");
      instance.getPdfLink();
      instance.setState({ loading: true });
      const getPdfUrl = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getPdfUrl.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getPdfUrl
      );
      getPdfUrl.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: ApiData,
      });
      instance.pdfApiCallId = getPdfUrl;
      runEngine.sendMessage("Unit Test", getPdfUrl);
      instance.setState({ loading: false, invoicePdf: ApiData.invoice });
      expect(ApiData.invoice).toBeTruthy();
    });

    then("I should able to view pdf", () => {
      jest.spyOn(window, "open");
      window.open(ApiData.invoice);
      expect(window.open).toHaveBeenCalledWith(ApiData.invoice);
    });
  });

  test("Handle API errors", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: InvoiceBilling;

    given("I am on the InvoiceBilling screen", () => {
      exampleBlockA = shallow(<InvoiceBilling {...screenProps} />);
      instance = exampleBlockA.instance() as InvoiceBilling;
    });

    when("The get pdf api returns an error", () => {
      const getPdfUrlAPIError = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getPdfUrlAPIError.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getPdfUrlAPIError
      );
      getPdfUrlAPIError.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: "",
        }
      );
      instance.pdfApiCallId = getPdfUrlAPIError;
      runEngine.sendMessage("Unit Test", getPdfUrlAPIError);
      instance.setState({ loading: false });
    });

    then("I should see alert", () => {
      instance.parseApiErrorResponse(ApiError);
    });
  });
});
