import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material";

// Customizable Area Start

interface ApiRequestData {
  contentType: string;
  method: string;
  endPoint: string;
  body?: {};
  type?: string;
}
export interface SelectedRowData {
  id: string;
  attributes: {
    id: string;
    organization: {
      name: string;
      id: string;
    };
    item_name: string;
    status: string;
    item_price: string;
    item_quantity: string;
    discount: string;
    description: string;
    total_amount: string;
  };
}
export interface UserData {
  id: string;
  attributes: {
    organization: {
      name: string;
      id: string;
    };

    item_name: string;
    status: string;
    total_amount: string;
    discount: string;
    item_price: string;
    item_quantity: string;
  };
}
export interface CombinedData {
  id: string;
  attributes: {
    organization: {
      name: string;
    };
    item_name: string;
    status: string;
    item_price: string;
    item_quantity: string;
    discount: string;
    description: string;
    total_amount: string;
  };
}
export interface OrganizationDetail {
  id: number;
  name: string;
}

export interface UserDatatest {
  id: string;
  type: string;
  attributes: {
    account_id: number;
    item_name: string;
    item_quantity: string;
    item_price: string;
    description: string;
    discount: string;
    status: string;
    total_amount: number;
    archived: boolean;
    organization: {
      id: number;
      name: string;
      created_at: string;
      updated_at: string;
    };
    comments: [];
    full_name?: string;
    comment?: string;
  };
}
export interface QuoteManagementData {
  id: string;
  type: string;
  attributes: {
    account_id: number;
    item_name: string;
    item_quantity: number;
    item_price: number;
    description: string;
    discount: number;
    status: string;
    total_amount: number;
    archived: boolean;
    comment: string | null;
    organization: {
      id: number;
      name: string;
      created_at: string;
      updated_at: string;
    };
    full_name: string;
  };
}
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

// Customizable Area End

export const configJSON = require("./config");
export interface Props {
  statusForlevelOne: string;
  selectedRowData: {};
  leveOneModal: boolean;
  navigation: any;
  id: string;
  // Customizable Area Start

  // Customizable Area End
}
interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  errors: {
    [key: string]: string;
  };
  isModalOpen: boolean;
  isEditBtn: boolean;
  getUserData: QuoteManagementAll[];
  isArchiveModalOpen: boolean;
  getorganizationsDetails: OrganizationDetail[];
  organizationId: string | unknown;
  itemName: string;
  itemPrice: string;
  itemQuantity: string;
  discount: string;
  description: string;
  getIndexDataLevelOne: [];
  leveOneModal: boolean;
  selectedRowData: QuoteManagementAll | null;
  statusForlevelOne: string;
  selectedStatus: string;
  anchorEl: HTMLElement | null;
  selectedOption: string;
  isEditModalOpen: boolean;
  serialIdEdit: string | undefined;
  openDialog: boolean;
  selectedRowLevelTesting: string | undefined;
  comment: string;
  showComment: string;
  anchorElSorting: HTMLElement | null;
  itemsPerPage: number;
  currentPage: number;
  total_page: number;
  status: string;
  showPagination: boolean;
  sortedBy: string;
  sortingData: string;
  showCommentLevelPerson: string | null | undefined;
  tokennew: string;
  userRole: string | null;
  userAccountID: number;
  viewData: QuoteManagementAll | null;
  viewDataModal: boolean;
  // Customizable Area End
}
interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class QuoteManagementController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  AttendancDetailsApi: string = "";
  AttendancePostApi: string = "";
  organizationsApi: string = "";
  editUpdateLevelZeroApi: string = "";
  levelPersonRejectAndApproveApi: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];
    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      errors: {},
      isModalOpen: false,
      isEditBtn: false,
      getUserData: [],
      isArchiveModalOpen: false,
      getorganizationsDetails: [],
      organizationId: "",
      itemName: "",
      itemPrice: "",
      itemQuantity: "",
      discount: "",
      description: "",
      getIndexDataLevelOne: [],
      leveOneModal: false,
      selectedRowData: null,
      statusForlevelOne: "",
      selectedStatus: "under_review",
      anchorEl: null,
      selectedOption: "under_review",
      isEditModalOpen: false,
      serialIdEdit: "",
      openDialog: false,
      selectedRowLevelTesting: "",
      comment: "",
      showComment: "",
      showCommentLevelPerson: "",
      anchorElSorting: null,
      itemsPerPage: 15,
      currentPage: 1,
      total_page: 1,
      status: "",
      showPagination: true,
      sortedBy: "Sorted By",
      sortingData: "all",
      viewData: null,
      viewDataModal: false,
      // Before start you can put the token and Role  userAccountID
      tokennew: "",
      userRole: " ",
      userAccountID: 0,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  // Customizable Area Start

  async componentDidMount(): Promise<void> {
    this.attendancDetails();
    this.organizations();
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      switch (apiRequestCallId) {
        case this.AttendancDetailsApi:
          if (!responseJson.errors) {
            this.setState({
              getUserData: responseJson.quotes?.data,
              total_page: responseJson.total_page,
              showPagination: true,
              status: "",
            });
          }

          break;
        case this.organizationsApi:
          this.setState({ getorganizationsDetails: responseJson });
          break;
        case this.AttendancePostApi:

        case this.editUpdateLevelZeroApi:
          this.handleClickOpenDialog();
          this.attendancDetails();
          break;
        case this.levelPersonRejectAndApproveApi:
          this.attendancDetails();
      }
    }
  }
  handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    this.setState({ currentPage: page }, () => {
      this.attendancDetails();
    });
  };

  apidatafunction = async (data: ApiRequestData) => {
    const { contentType, method, endPoint, body, type } = data;
    const header = {
      "Content-Type": contentType,
      token: this.state.tokennew,
    };
    const request = new Message(getName(MessageEnum.RestAPIRequestMessage));
    request.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    request.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    request.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);

    body && type != "formData"
      ? request.addData(
          getName(MessageEnum.RestAPIRequestBodyMessage),
          JSON.stringify(body)
        )
      : request.addData(getName(MessageEnum.RestAPIRequestBodyMessage), body);
    runEngine.sendMessage(request.id, request);
    return request.messageId;
  };
  attendancDetails = async () => {
    this.AttendancDetailsApi = await this.apidatafunction({
      contentType: configJSON.validationApiContentType,
      method: "GET",
      endPoint: `bx_block_quotemanagement/quotemanagements?status=${this.state.sortingData}&page=${this.state.currentPage}&per_page=15`,
    });
  };

  organizations = async () => {
    this.organizationsApi = await this.apidatafunction({
      contentType: configJSON.validationApiContentType,
      method: "GET",
      endPoint: configJSON.endPointOrganization,
    });
  };
  attendancePostDetails = async () => {
    const payload = {
      item_name: this.state.itemName,
      item_quantity: this.state.itemQuantity,
      item_price: this.state.itemPrice,
      description: this.state.description,
      discount: this.state.discount,
      organization_id: this.state.organizationId,
    };
    this.AttendancePostApi = await this.apidatafunction({
      contentType: configJSON.validationApiContentType,
      method: "POST",
      endPoint: configJSON.getIndexEndPoint,
      body: payload,
    });
  };
  editUpdateLevelZero = async () => {
    const payload = {
      item_name: this.state.itemName,
      item_quantity: this.state.itemQuantity,
      item_price: this.state.itemPrice,
      description: this.state.description,
      discount: this.state.discount,
      status: "under_review",
      id: this.state.serialIdEdit,
    };
    this.editUpdateLevelZeroApi = await this.apidatafunction({
      contentType: configJSON.validationApiContentType,
      method: "PATCH",
      endPoint: `bx_block_quotemanagement/quotemanagements/${this.state.serialIdEdit}`,
      body: payload,
    });
  };
  onEditBtnClcik = (item: QuoteManagementAll) => {
    const rejectionComment = item.attributes.comment || "";
    this.setState({
      isEditModalOpen: true,
      itemName: item.attributes.item_name,
      itemPrice: item.attributes.item_price,
      itemQuantity: item.attributes.item_quantity,
      discount: item.attributes.discount,
      description: item.attributes.description,
      serialIdEdit: item.id,
      isModalOpen: true,
      showComment: rejectionComment,
    });
  };
  editcloseModal = () => {
    this.setState({
      isEditModalOpen: false,
      itemName: "",
      itemPrice: "",
      itemQuantity: "",
      discount: "",
      description: "",
      serialIdEdit: "",
      isModalOpen: false,
    });
  };

  handleChangediscription = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    this.setState({ description: event.target.value });
  };
  handleChangeSelect = (event: SelectChangeEvent<unknown>) => {
    this.setState({ organizationId: event.target.value });
  };
  createQuote = () => {
    this.attendancePostDetails();
    this.handleClickOpenDialog();
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
    this.setState({ isEditBtn: false });
    this.editcloseModal();
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  onCloseLevelOne = () => {
    this.setState({
      leveOneModal: false,
      statusForlevelOne: "",
    });
  };

  openModalforLevelOne = (item: QuoteManagementAll) => {
    this.setState({
      leveOneModal: true,
      selectedRowData: item,
      statusForlevelOne: item.attributes.status,
      selectedRowLevelTesting: item.id,
      showCommentLevelPerson: this.state.selectedRowData?.attributes.comment,
    });
  };

  handleUpdatelevelOne = () => {
    this.levelPersonRejectAndApprove();
    this.handleClickOpenDialog();
  };
  levelPersonRejectAndApprove = async () => {
    const payload = {
      status: this.state.selectedStatus,
      comment: this.state.comment,
    };
    this.levelPersonRejectAndApproveApi = await this.apidatafunction({
      contentType: configJSON.validationApiContentType,
      method: "PATCH",
      endPoint: `bx_block_quotemanagement/approve_or_reject/${this.state.selectedRowLevelTesting}`,
      body: payload,
    });
  };

  handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleOptionSelect = (option: string) => {
    this.setState({
      selectedStatus: option,
      anchorEl: null,
      selectedOption: option,
    });
  };
  handleClickOpenDialog = () => {
    this.setState({ openDialog: true });
  };
  handleCloseDialog = () => {
    this.setState({ openDialog: false });
    this.closeModal();
    this.setState({ selectedOption: "under_review" });
    this.attendancDetails();
    this.onCloseLevelOne();
  };
  handleCancleDialog = () => {
    this.setState({ openDialog: false });
  };
  handleModalCloseAll = () => {
    this.editcloseModal();
    this.closeModal();
    this.onCloseLevelOne();
  };
  handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ comment: event.target.value });
  };

  handleClickSorting = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.setState({ anchorElSorting: event.currentTarget });
  };
  isfinalApprover = () => {
    this.setState({ userRole: "final_approver" });
  };
  handleClickSortingClose = () => {
    this.setState({ anchorElSorting: null });
  };
  handleOptionSorting = (item: string) => {
    this.setState({ sortingData: item, sortedBy: item }, () => {
      this.attendancDetails();
    });
    this.handleClickSortingClose();
  };

  handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    this.setState({
      [event.target.name]: event.target.value,
    } as unknown as Pick<S, keyof S>);
  };
  viewData = (item: QuoteManagementAll) => {
    this.setState({ viewData: item, viewDataModal: true });
  };
  viewDataModalClose = () => {
    this.setState({ viewDataModal: false });
  };
  // Customizable Area End
}
