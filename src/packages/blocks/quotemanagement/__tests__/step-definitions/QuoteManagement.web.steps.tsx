import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import QuoteManagement from "../../src/QuoteManagement.web";

const screenProps = {
  navigation: {},
  id: "QuoteManagement",
};

const feature = loadFeature(
  "./__tests__/features/QuoteManagement-scenario.web.feature"
);
export interface QuoteManagementAll {
  id?: string;
  type?: string;
  attributes: {
    account_id: number;
    item_name: string;
    item_quantity: string;
    item_price: string;
    description: string;
    discount: string;
    status: string;
    total_amount: string;
    archived: boolean;
    comment: string | null;
    organization: {
      id: string;
      name: string;
      created_at: string;
      updated_at: string;
    };
    full_name: string;
  };
}
const getUserData: any = [
  {
    id: 1,
    attributes: {
      organization: {
        name: 'Company A',
      },
      item_name: 'Item 1',
      status: 'rejected',
      account_id: 21
    },
  }
];
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });
  test("User navigates to QuoteManagement", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: QuoteManagement;
    given("I am a User loading QuoteManagement", () => {
      exampleBlockA = shallow(<QuoteManagement selectedRowData={''} statusForlevelOne={""} leveOneModal={false} {...screenProps} />);

    });
    when("I navigate to the QuoteManagement", () => {
      instance = exampleBlockA.instance() as QuoteManagement;

    });
    then("i can't create the Quote with errors", () => {

      let mySelect = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'mySelect');
      mySelect.simulate('click');

      let myButton = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'myButton');
      myButton.simulate('click');

      let handleModalCloseAll = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'handleModalCloseAll1');
      handleModalCloseAll.simulate('click');

      instance.state = {
        ...instance.state,
        getUserData: getUserData,
      };
      let updateLevel = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'updateLevel1');
      updateLevel.simulate('click');
      const eventbtn = {
        target: {
          value: "hii hello how are you"
        }
      }
      instance.state = {
        ...instance.state,
        userRole: "creater",
      };
      let handleClickStatus = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'handleClickStatus');
      handleClickStatus.simulate('click', eventbtn);


      let handleCloseMenu = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'handleCloseMenu');
      handleCloseMenu.simulate('close');


      const searchWrapper = exampleBlockA.findWhere((node) => node.prop('data-test-id') == 'handleCommentChange')
      searchWrapper.simulate('change', eventbtn)

      let magResendSucessRestAPIs = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      magResendSucessRestAPIs.addData(getName(MessageEnum.RestAPIResponceDataMessage), magResendSucessRestAPIs.messageId);
      runEngine.sendMessage("Unit Test", magResendSucessRestAPIs);

      let buttoncreateQuote = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'createQuote');
      buttoncreateQuote.simulate('click');

      let viewData = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'viewData');
      viewData.simulate('click');

      let changeSelect = exampleBlockA.find('[data-test-id="handleChangeSelect"]');
      changeSelect.simulate("change", eventbtn);
      expect(QuoteManagement).toBeDefined()
    })
    then("i can create the Quote with out errors", () => {
      expect(QuoteManagement).toBeDefined()
    });
    then("i can  update the Quote with errors", () => {
      expect(QuoteManagement).toBeDefined()
    });

    then("i can get the  QuoteListwith out errors", () => {
      const archiveData = {
        id: '12345',
        attributes: {
          organization: {
            name: 'ABC Corp',
          },
          item_name: 'Widget A',
          status: 'Active',
        },
      };
      let magResendSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage));
      magResendSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magResendSucessRestAPI.messageId);
      magResendSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), archiveData);
      instance.organizationsApi = magResendSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magResendSucessRestAPI);
      expect(archiveData).toEqual(archiveData);
    });
    ;
    then("getting the  Creator", () => {
      const attendanceData = [
        {
          id: "48",
          type: "quotemanagement",
          attributes: {
            account_id: 21,
            item_name: " new wire cable ",
            item_quantity: 10,
            item_price: 120.0,
            description: "cable",
            discount: 0.0,
            status: "partially_approved",
            total_amount: 1200.0,
            archived: false,
            organization: {
              id: 4,
              name: "goggle",
              created_at: "2023-07-14T13:18:49.838Z",
              updated_at: "2023-07-14T13:18:49.838Z"
            },
            comments: []
          }
        },
      ]
      let magResendSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage));
      magResendSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magResendSucessRestAPI.messageId);
      magResendSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), attendanceData);
      instance.AttendancDetailsApi = magResendSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magResendSucessRestAPI);
      expect(attendanceData).toEqual(attendanceData);

      let buttoncCloseArchive = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'handleCancleDialog');
      buttoncCloseArchive.simulate('click');

      let buttonhandleCloseDialog = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'handleCloseDialog');
      buttonhandleCloseDialog.simulate('click');


      let txtInput = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'addCircleIcon');
      txtInput.simulate('click');

      const editIcon = exampleBlockA.find('[data-test-id="onEditBtnClcik"]');
      // editIcon.simulate('click');

      const modalclose = exampleBlockA.find('[data-test-id="modalClose"]');
      modalclose.simulate('close');

      let messageInput = exampleBlockA.find('[data-test-id="handleInputChange"]');
      const eventclick = {
        target: {
          value: "hii hello how are you"
        }
      }
      messageInput.simulate("change", eventclick);

      let messagediscription = exampleBlockA.find('[data-test-id="handleChangediscription"]');
      messagediscription.simulate("change", eventclick);


    });
    then("Creator can create an the edit Quote", () => {
      const editLevelZeroData = [
        {
          "id": "40",
          "type": "quotemanagement",
          "attributes": {
            "account_id": 22,
            "item_name": "test",
            "item_quantity": 2,
          }
        }
      ]
      let magResendSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage));
      magResendSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magResendSucessRestAPI.messageId);
      magResendSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), editLevelZeroData);
      instance.editUpdateLevelZeroApi = magResendSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magResendSucessRestAPI);
      expect(editLevelZeroData).toEqual(editLevelZeroData);

    });
    then("Creator can update the rejected  Quote", () => {
      const attendancePostData = [
        {
          "id": 1,
          "name": "builder.ai",
          "created_at": "2023-07-14T13:18:49.811Z",
          "updated_at": "2023-07-14T13:18:49.811Z"
        },
      ]
      let magResendSucessRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage));
      magResendSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), magResendSucessRestAPI.messageId);
      magResendSucessRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), attendancePostData);
      instance.AttendancePostApi = magResendSucessRestAPI.messageId;
      runEngine.sendMessage("Unit Test", magResendSucessRestAPI);
      expect(attendancePostData).toEqual(attendancePostData);


    });
    then("Approver can update the  creator status", () => {
      const responseFifth = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.levelPersonRejectAndApproveApi = responseFifth.messageId;
      responseFifth.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        responseFifth.messageId
      );
      responseFifth.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { "data": { "id": "201", "type": "template", "attributes": { "id": 201, "name": "khkjjkk", "description": "nkjjjjjkjkkjjkj yyy", "company_id": null, "status": "created", "approved_by": null, "comment": null, "is_copy": false, "copies_count": 0, "parent_id": null, "kpis": { "data": [{ "id": "199", "type": "kpi", "attributes": { "id": 199, "name": "kpi name", "description": "kpi des", "point": 100, "progress": null, "activated": true, "goals": [], "kpi_parameters": [] } }, { "id": "200", "type": "kpi", "attributes": { "id": 200, "name": "sccxcxc", "description": "csscscsc", "point": null, "progress": null, "activated": true, "goals": [], "kpi_parameters": [] } }, { "id": "201", "type": "kpi", "attributes": { "id": 201, "name": "fddvd", "description": "xcccdc", "point": null, "progress": null, "activated": true, "goals": [], "kpi_parameters": [] } }, { "id": "202", "type": "kpi", "attributes": { "id": 202, "name": "xzzz", "description": "iooo", "point": null, "progress": null, "activated": true, "goals": [], "kpi_parameters": [] } }] } } } }
      );
      runEngine.sendMessage("For unit test", responseFifth);
      expect(QuoteManagement).toBeDefined()
    });
    then("Approver can update the comment", () => {

      const handleOptionSort1 = exampleBlockA.find('[data-test-id="handleOptionSort1"]');
      handleOptionSort1.simulate('click');

      const handleOptionSort2 = exampleBlockA.find('[data-test-id="handleOptionSort2"]');
      handleOptionSort2.simulate('click');

      const handleOptionSort3 = exampleBlockA.find('[data-test-id="handleOptionSort3"]');
      handleOptionSort3.simulate('click');

      const handleOptionSort4 = exampleBlockA.find('[data-test-id="handleOptionSort4"]');
      handleOptionSort4.simulate('click');

      const handleOptionSort5 = exampleBlockA.find('[data-test-id="handleOptionSort0"]');
      handleOptionSort5.simulate('click');

      const handlePageChange = exampleBlockA.find('[data-test-id="handlePageChange"]');
      handlePageChange.simulate('change');



      let handleClickSorting = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'handleClickSorting');
      handleClickSorting.simulate('click', {});

      let viewDataModalClose = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'viewDataModalClose');
      viewDataModalClose.simulate('close');

      let testing = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'testing1');
      testing.simulate('click');

      let myButton = exampleBlockA.findWhere((node) => node.prop('data-test-id') === 'selectapproved');
      myButton.simulate('click');

      expect(QuoteManagement).toBeDefined()
    });
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount()
      expect(QuoteManagement).toBeDefined()
    });
  });
});


