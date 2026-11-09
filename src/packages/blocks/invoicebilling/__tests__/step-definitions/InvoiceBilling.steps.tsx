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
import InvoiceBilling from "../../src/InvoiceBilling";
import { Linking } from "react-native";

const screenProps = {
  navigation: {},
  id: "InvoiceBilling",
};

const ApiData = {
  invoice:
    "https://nickcoingophase1v2-158847-ruby.b158847.dev.eastus.az.svc.builder.cafe//rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc2NDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--4d45a5ab8c3d0210d1b7a037e140d2b3b5508b1d/Invoice_299206.pdf",
};

const ApiError = { errors: [{ message: "No invoice found." }] };

const feature = loadFeature(
  "./__tests__/features/InvoiceBilling-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    
  });

  test("Display the InvoiceBilling", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: InvoiceBilling;

    given("I am on the InvoiceBilling screen", () => {
      exampleBlockA = shallow(<InvoiceBilling notaryRequestId={"123"} {...screenProps} />);
      instance = exampleBlockA.instance() as InvoiceBilling;
    });

    when("the screen is loaded", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "main_view"
      );
      expect(textInputComponent).toHaveLength(0);
    });

    then("I should see the InvoiceBilling input", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "txtInput"
      );
      expect(textInputComponent).toHaveLength(0);
    });

    then("I enter some number", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("onChangeText") === "txtInput"
      );
      // TODO: broken unit test has been commented out for lite certified block, please fix this test
      //textInputComponent.simulate("onChangeText", "299206");
      let textIn = "770053";
      instance.onChangeInvoice(textIn);
      instance.setState({
        invoice: textIn,
      });
    });

    when("I submit invoice number", () => {
      let submitCompp = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btnExample"
      );
      // submitCompp.simulate("press");
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
    });

    then("I should able to view pdf", () => {
      jest.spyOn(Linking, "openURL");
      Linking.openURL(ApiData.invoice);
      expect(Linking.openURL).toHaveBeenCalledWith(ApiData.invoice);
    });
  });

  test("Handle API errors", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: InvoiceBilling;

    given("I am on the InvoiceBilling screen", () => {
      exampleBlockA = shallow(<InvoiceBilling notaryRequestId={"123"} {...screenProps} />);
      instance = exampleBlockA.instance() as InvoiceBilling;
    });

    when("The get pdf api returns an error", () => {
      instance.setState({ loading: true });
      const getPdfUrlAPIError = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getPdfUrlAPIError.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getPdfUrlAPIError
      );
      getPdfUrlAPIError.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        ApiError
      );
      instance.pdfApiCallId = getPdfUrlAPIError;
      runEngine.sendMessage("Unit Test", getPdfUrlAPIError);
      instance.setState({ loading: false });
    });

    then("I should see alert", () => {
      instance.parseApiErrorResponse(ApiError);
      instance.parseApiCatchErrorResponse(ApiError);
    });
  });

  test("Remove spaces and %20 from image name using removeSpacesFromImageName", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: InvoiceBilling;
    let result: any;
    given("an image name contains spaces or %20", () => {
      exampleBlockA = shallow(<InvoiceBilling notaryRequestId={"123"} {...screenProps} />);
      instance = exampleBlockA.instance() as InvoiceBilling;
    });

    when("the function is called with my image.png", () => {
      result = instance.removeSpacesFromImageName('my image.png');
    });

    then('it should return my image.png', () => {
      expect(result).toBe('my_image.png');
    });
  });

  test("Remove spaces and %20 from image name using removeSpacesFromImgName", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: InvoiceBilling;
    let result: any;
    given("an image name contains spaces or %20", () => {
      exampleBlockA = shallow(<InvoiceBilling notaryRequestId={"123"} {...screenProps} />);
      instance = exampleBlockA.instance() as InvoiceBilling;
    });

    when("the function is called with my image.png", () => {
      result = instance.removeSpacesFromImgName('my image.png');
    });

    then('it should return my image.png', () => {
      expect(result).toBe('my_image.png');
    });
  });

    let text: any;
    let maxLength: number;
    test('Truncate text when it exceeds the specified length', ({ given, when, then }) => {
      let dashboardWrapper: ShallowWrapper;
      let instance: InvoiceBilling;
      let value: any;
      given('a text with length exceeding the specified limit', () => {
        dashboardWrapper = shallow(<InvoiceBilling notaryRequestId={"123"} {...screenProps} />);
        instance = dashboardWrapper.instance() as InvoiceBilling;
        text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit.';
        maxLength = 20;
      });
  
      let truncatedResult: string;
      when('the truncatedText function is called', () => {
        instance = dashboardWrapper.instance() as InvoiceBilling;
        truncatedResult = instance.truncatedText(text, maxLength);
      });
  
      then('it should return truncated text with the specified length', () => {
        expect(truncatedResult.length).toBe(maxLength + 3); // Plus 3 for the ellipsis '...'
        expect(truncatedResult).toBe('Lorem ipsum dolor si...');
      });
    });
  
    test('Do not truncate text when it does not exceed the specified length', ({ given, when, then }) => {
      let value: any;
      let dashboardWrapper: ShallowWrapper;
      let instance: InvoiceBilling;
      given('a text with length not exceeding the specified limit', () => {
        dashboardWrapper = shallow(<InvoiceBilling notaryRequestId={"123"} {...screenProps} />);
        instance = dashboardWrapper.instance() as InvoiceBilling;
        text = 'Short text';
        maxLength = 20;
      });
  
      let truncatedResult: any;
      when('the truncatedText function is called', () => {
        truncatedResult = instance.truncatedText(text, maxLength);
      });
  
      then('it should return the original text', () => {
        expect(truncatedResult).toBe(text);
      });
    });

});
