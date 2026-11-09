import React from "react";

import {
  Container,
  Box,
  Input,
  Button,
  InputLabel,
  Typography,
  InputAdornment,
  IconButton,
  // Customizable Area Start
  styled,
  Select,
  TextField,
  Modal,
  FormControl,
  Dialog,
  DialogTitle,
  DialogActions,
  Menu,
  MenuItem,
  TextareaAutosize,
  Pagination,
  // Customizable Area End
} from "@mui/material";

// Customizable Area Start
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Customizable Area End

import QuoteManagementController, {
  Props,
  OrganizationDetail,
  QuoteManagementAll,
} from "./QuoteManagementController.web";

export default class QuoteManagement extends QuoteManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  dataBox = () => {
    return (
      <DataBox>
        <RecordNotFound>{this.state.status}</RecordNotFound>
        {this.state.getUserData?.map(
          (item: QuoteManagementAll, index: number) => (
            <DataRow key={index}>
              <div>
                <HeadTypography>Serial_id:</HeadTypography>
                <HeadTypography>Organisation:</HeadTypography>
                <HeadTypography>Item_Name:</HeadTypography>
                <HeadTypography>Item_Price:</HeadTypography>
                <HeadTypography>Item_Quantity:</HeadTypography>
                <HeadTypography>Discount:</HeadTypography>
                <HeadTypography>Total Amount:</HeadTypography>
                <HeadTypography>Status:</HeadTypography>{" "}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <DataTypography>{item.id}</DataTypography>
                <DataTypography>
                  {item.attributes.organization.name}
                </DataTypography>
                <DataTypography>{item.attributes.item_name}</DataTypography>
                <DataTypography>
                  {item.attributes.item_price} INR
                </DataTypography>
                <DataTypography>{item.attributes.item_quantity}</DataTypography>
                <DataTypography>{item.attributes.discount} %</DataTypography>
                <DataTypography>
                  {item.attributes.total_amount} INR
                </DataTypography>
                <DataTypography>{item.attributes.status}</DataTypography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <Button
                  variant="contained"
                  data-test-id="viewData"
                  onClick={() => this.viewData(item)}
                >
                  View
                </Button>
                <div>
                  {item.attributes.account_id === this.state.userAccountID &&
                  this.state.userRole === "creater" ? (
                    <div>
                      {item.attributes.status === "rejected" ||
                      item.attributes.status === "under_review" ? (
                        <div>
                          <Button
                            variant="contained"
                            data-test-id="onEditBtnClcik"
                            onClick={() => this.onEditBtnClcik(item)}
                          >
                            Edit
                          </Button>
                        </div>
                      ) : null}{" "}
                    </div>
                  ) : (
                    <div> </div>
                  )}
                </div>
                <div>
                  <div>
                    {this.state.userRole === "final_approver" ||
                    this.state.userRole === "approver" ? (
                      <div>
                        {item.attributes.status !== "approved" &&
                        item.attributes.status !== "rejected" ? (
                          <Button
                            variant="contained"
                            onClick={() => this.openModalforLevelOne(item)}
                          >
                            Update Status
                          </Button>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>
            </DataRow>
          )
        )}
      </DataBox>
    );
  };
  pagination() {
    return (
      <div>
        {this.state.showPagination && (
          <PagiantionBox>
            <Pagination
              data-test-id="handlePageChange"
              color="primary"
              count={this.state.total_page}
              page={this.state.currentPage}
              onChange={this.handleChange}
            />
          </PagiantionBox>
        )}
      </div>
    );
  }
  customModal() {
    return (
      <div>
        <Modal open={this.state.leveOneModal} onClose={this.onCloseLevelOne}>
          <ThirdBox style={{ backgroundColor: "#a381a3" }}>
            {this.state.selectedRowData && (
              <div>
                <SelectedUserData>
                  Organisation:{" "}
                  <CutomSpanStyle>
                    {this.state.selectedRowData.attributes.organization.name}
                  </CutomSpanStyle>{" "}
                </SelectedUserData>
                <SelectedUserData>
                  Item_Name:{" "}
                  <CutomSpanStyle>
                    {this.state.selectedRowData.attributes.item_name}
                  </CutomSpanStyle>{" "}
                </SelectedUserData>
                <SelectedUserData>
                  {" "}
                  item_price:{" "}
                  <CutomSpanStyle>
                    {this.state.selectedRowData.attributes.item_price} INR
                  </CutomSpanStyle>{" "}
                </SelectedUserData>
                <SelectedUserData>
                  {" "}
                  item_quantity:{" "}
                  <CutomSpanStyle>
                    {this.state.selectedRowData.attributes.item_quantity}
                  </CutomSpanStyle>{" "}
                </SelectedUserData>
                <SelectedUserData>
                  {" "}
                  discount:
                  <CutomSpanStyle>
                    {this.state.selectedRowData.attributes.discount} %
                  </CutomSpanStyle>{" "}
                </SelectedUserData>
                <SelectedUserData>
                  total_amount:
                  <CutomSpanStyle>
                    {this.state.selectedRowData.attributes.total_amount} INR
                  </CutomSpanStyle>{" "}
                </SelectedUserData>
                <SelectedUserData>
                  description:
                  <CutomSpanStyle>
                    {this.state.selectedRowData.attributes.description}
                  </CutomSpanStyle>{" "}
                </SelectedUserData>
                <SelectedUserData>
                  Status:
                  <CutomSpanStyle>
                    {this.state.statusForlevelOne}
                  </CutomSpanStyle>{" "}
                </SelectedUserData>
              </div>
            )}
            <div>
              <SelectedUserData>Comments :</SelectedUserData>
              <TextareaAutosize
                data-test-id="handleCommentChange"
                minRows={8}
                style={{
                  width: "99%",
                  border: "none",
                  marginTop: "5px",
                  fontSize: "16px",
                  padding: "5px",
                }}
                onChange={this.handleCommentChange}
              />
              <SelectedUserData>Status:</SelectedUserData>
              <Box>
                <div>
                  <div
                    data-test-id="handleClickStatus"
                    onClick={this.handleClick}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      background: "white",
                      cursor: "pointer",
                      padding: "8px",
                      border: "1px solid #E2E8F0",
                      borderRadius: "4px",
                      width: "155px",
                    }}
                  >
                    <DataSelecTypo>{this.state.selectedOption}</DataSelecTypo>
                    <ArrowDropDownIcon />
                  </div>
                  <div>
                    <Menu
                      anchorEl={this.state.anchorEl}
                      open={Boolean(this.state.anchorEl)}
                      data-test-id="handleCloseMenu"
                      onClose={this.handleClose}
                      PaperProps={{
                        style: {
                          width: "173px",
                          marginTop: "47px",
                          marginLeft: "0px",
                          left: 411,
                        },
                      }}
                    >
                      {this.state.userRole === "final_approver" ? (
                        <div>
                          <MenuItem
                            onClick={() => this.handleOptionSelect("approved")}
                            data-test-id="selectapproved"
                          >
                            approved
                          </MenuItem>
                        </div>
                      ) : (
                        <MenuItem
                          onClick={() =>
                            this.handleOptionSelect("partially_approved")
                          }
                          data-test-id="myButton"
                        >
                          partially_approved
                        </MenuItem>
                      )}
                      <MenuItem
                        onClick={() => this.handleOptionSelect("rejected")}
                        data-test-id="mySelect"
                      >
                        rejected
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </Box>
            </div>
            <SubmitCancel>
              <CusBtn
                variant="contained"
                data-test-id="updateLevel1"
                onClick={this.handleUpdatelevelOne}
              >
                <Typography>Submit</Typography>
              </CusBtn>
              <CusBtn
                variant="contained"
                data-test-id="handleModalCloseAll1"
                onClick={this.handleModalCloseAll}
              >
                Cancel
              </CusBtn>
            </SubmitCancel>
          </ThirdBox>
        </Modal>
      </div>
    );
  }
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <div>
        <MainBox>
          <HeaderBox>
            <div></div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <SortinButton
                  variant="contained"
                  data-test-id="handleClickSorting"
                  onClick={this.handleClickSorting}
                >
                  {this.state.sortedBy}
                </SortinButton>
                <Menu
                  anchorEl={this.state.anchorElSorting}
                  open={Boolean(this.state.anchorElSorting)}
                  onClose={this.handleClickSortingClose}
                >
                  <MenuItem
                    data-test-id="handleOptionSort0"
                    onClick={() => this.handleOptionSorting("all")}
                  >
                    All
                  </MenuItem>
                  <MenuItem
                    data-test-id="handleOptionSort1"
                    onClick={() => this.handleOptionSorting("under_review")}
                  >
                    Under_review
                  </MenuItem>
                  <MenuItem
                    data-test-id="handleOptionSort2"
                    onClick={() => this.handleOptionSorting("approved")}
                  >
                    Approved
                  </MenuItem>
                  <MenuItem
                    data-test-id="handleOptionSort3"
                    onClick={() =>
                      this.handleOptionSorting("partially_approved")
                    }
                  >
                    Partially_approved
                  </MenuItem>
                  <MenuItem
                    data-test-id="handleOptionSort4"
                    onClick={() => this.handleOptionSorting("rejected")}
                  >
                    Rejected
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </HeaderBox>
          <div>
            {this.state.userRole === "creater" && (
              <AddCircleRoundedIcon
                data-test-id={"addCircleIcon"}
                onClick={this.openModal}
                style={{
                  color: "blue",
                  height: "50px",
                  width: "50px",
                  cursor: "pointer",
                  position: "fixed",
                  bottom: "10px",
                  right: "20px",
                }}
              />
            )}
          </div>
          {this.dataBox()}
          {this.pagination()}
          <Button
            data-test-id="testing1"
            onClick={this.isfinalApprover}
            style={{ color: "white" }}
            disabled
          >
            Click
          </Button>
        </MainBox>
        <Modal
          open={this.state.isModalOpen}
          data-test-id="modalClose"
          onClose={this.closeModal}
        >
          <MainBoxtwo>
            {this.state.isEditModalOpen ? (
              ""
            ) : (
              <div>
                {" "}
                <NameHeading>organization_Name</NameHeading>
                <FormControl variant="outlined">
                  <CustomSelect
                    native
                    name="organizationName"
                    value={this.state.organizationId}
                    data-test-id="handleChangeSelect"
                    onChange={this.handleChangeSelect}
                  >
                    <option value="" disabled hidden>
                      Select Organization
                    </option>
                    {Array.isArray(this.state.getorganizationsDetails) &&
                      this.state.getorganizationsDetails.map(
                        (item: OrganizationDetail) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        )
                      )}
                  </CustomSelect>
                </FormControl>
              </div>
            )}
            <NameHeading>Item_Name</NameHeading>
            <InputTextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="itemName"
              name="itemName"
              value={this.state.itemName}
              data-test-id="handleInputChange"
              onChange={this.handleInputChange}
            />
            <NameHeading>Item_Price INR</NameHeading>
            <InputTextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="itemPrice"
              name="itemPrice"
              value={this.state.itemPrice}
              onChange={this.handleInputChange}
            />
            <NameHeading>Item_Quantity</NameHeading>
            <InputTextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="itemQuantity"
              name="itemQuantity"
              value={this.state.itemQuantity}
              onChange={this.handleInputChange}
            />
            <NameHeading>Discount in %</NameHeading>
            <InputTextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="discount"
              name="discount"
              value={this.state.discount}
              onChange={this.handleInputChange}
            />
            <NameHeading>Description</NameHeading>

            <TextareaAutosize
              minRows={5}
              style={{
                width: "99%",
                border: "none",
                fontSize: "16px",
                padding: "5px",
              }}
              value={this.state.description}
              data-test-id="handleChangediscription"
              onChange={this.handleChangediscription}
            />
            {this.state.isEditModalOpen ? (
              <CommentDiv>
                <NameHeading>Comment: </NameHeading>
                <Typography
                  style={{
                    marginTop: "10px",
                    marginLeft: "10px",
                    fontSize: "16px",
                  }}
                >
                  {" "}
                  {this.state.showComment}
                </Typography>
              </CommentDiv>
            ) : (
              ""
            )}
            <BtnBox>
              {this.state.isEditModalOpen ? (
                <StyleButton
                  variant="contained"
                  data-test-id="editUpdateLevelZero"
                  onClick={this.editUpdateLevelZero}
                >
                  Update
                </StyleButton>
              ) : (
                <StyleButton
                  variant="contained"
                  data-test-id="createQuote"
                  onClick={this.createQuote}
                >
                  Submit
                </StyleButton>
              )}
              <StyleButton
                variant="contained"
                data-test-id="handleModalCloseAll"
                onClick={this.handleModalCloseAll}
              >
                Cancel
              </StyleButton>
            </BtnBox>
          </MainBoxtwo>
        </Modal>
        <Box>
          <Dialog open={this.state.openDialog}>
            <DialogTitle>{"Successfully Generated"}</DialogTitle>
            <DialogActions>
              <Button
                data-test-id="handleCancleDialog"
                onClick={this.handleCancleDialog}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                data-test-id="handleCloseDialog"
                onClick={this.handleCloseDialog}
                color="primary"
                autoFocus
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

        <Modal
          open={this.state.viewDataModal}
          data-test-id="viewDataModalClose"
          onClose={this.viewDataModalClose}
        >
          <SecondBox style={{ backgroundColor: "#a381a3" }}>
            {this.state.viewData && (
              <div>
                <ViewData>
                  Organisation:{" "}
                  <SpanStyle>
                    {this.state.viewData.attributes.organization.name}
                  </SpanStyle>{" "}
                </ViewData>
                <ViewData>
                  User Name:
                  <SpanStyle>
                    {this.state.viewData.attributes.full_name}
                  </SpanStyle>{" "}
                </ViewData>
                <ViewData>
                  User ID:
                  <SpanStyle>
                    {this.state.viewData.attributes.account_id}
                  </SpanStyle>{" "}
                </ViewData>
                <ViewData>
                  Item_Name:{" "}
                  <SpanStyle>
                    {this.state.viewData.attributes.item_name}
                  </SpanStyle>{" "}
                </ViewData>
                <ViewData>
                  {" "}
                  Item_quantity:{" "}
                  <SpanStyle>
                    {this.state.viewData.attributes.item_quantity}
                  </SpanStyle>{" "}
                </ViewData>
                <ViewData>
                  {" "}
                  Item_price:{" "}
                  <SpanStyle>
                    {this.state.viewData.attributes.item_price} INR
                  </SpanStyle>{" "}
                </ViewData>
                <ViewData>
                  {" "}
                  Discount:
                  <SpanStyle>
                    {this.state.viewData.attributes.discount} %
                  </SpanStyle>{" "}
                </ViewData>
                <ViewData>
                  Total_amount:
                  <SpanStyle>
                    {this.state.viewData.attributes.total_amount} INR
                  </SpanStyle>{" "}
                </ViewData>
                <ViewData>
                  Description:
                  <SpanStyle>
                    {this.state.viewData.attributes.description}
                  </SpanStyle>{" "}
                </ViewData>
                <ViewData>
                  comment:
                  <SpanStyle>
                    {this.state.viewData.attributes.comment}
                  </SpanStyle>{" "}
                </ViewData>
              </div>
            )}
            <ButtonBox>
              <CustomButton
                variant="contained"
                data-test-id="updateLevel"
                onClick={this.viewDataModalClose}
              >
                <Typography>OK</Typography>
              </CustomButton>
              <CustomButton
                variant="contained"
                onClick={this.viewDataModalClose}
              >
                Cancel
              </CustomButton>
            </ButtonBox>
          </SecondBox>
        </Modal>
        <div>{this.customModal()}</div>
      </div>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const CommentDiv = styled("div")({
  display: "flex",
});
const PagiantionBox = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "25px",
  fontSize: "16px",
  marginBottom: "20px",
});
const HeaderBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});
const MainBox = styled(Box)({
  padding: "30px",
  height: "100vh",
});

const DataBox = styled(Box)({});
const HeadTypography = styled(Typography)({
  fontSize: "16px",
  fontWeight: 500,
});
const DataTypography = styled(Typography)({
  color: "white",
  fontSize: "16px",
  fontWeight: 500,
});

const DataRow = styled("div")({
  display: "flex",
  cursor: "pointer",
  marginTop: "20px",
  backgroundColor: "rgb(199 134 227)",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  padding: "10px 20px 10px 20px",
});
const BtnBox = styled(Box)({
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-around",
});

const MainBoxtwo = styled(Box)({
  marginTop: "20px",
  maxWidth: "500px",
  margin: "auto",
  backgroundColor: "lightgray",
  padding: "10px",
  maxHeight: "600px",
  minHeight: "600px",
  overflowY: "auto",
});
const InputTextField = styled(TextField)({
  backgroundColor: "white",
  borderRadius: "5px",
  border: "1px black",
});

const NameHeading = styled(Typography)({
  fontSize: "16px",
  fontWeight: 700,
  marginTop: "10px",
});

const StyleButton = styled(Button)({
  padding: "8px 30px 8px 30px",
  borderRadius: "10px",
  backgroundColor: "purple",
  color: "white",
  fontSize: "13px",
  fontWeight: 600,
  marginTop: "20px",
});
const CustomSelect = styled(Select)({
  background: "white",
  width: "210px",
  border: "1px black",
  height: "50px",
  marginTop: "5px",
});
const SortinButton = styled(Button)({
  fontSize: "16px",
  fontWeight: "bold",
  marginRight: "40px",
  background: "blue",
  color: "white",
});
const RecordNotFound = styled(Typography)({
  margin: "auto",
  maxWidth: "144px",
  fontSize: "16px",
  fontWeight: 500,
});

const SpanStyle = styled("span")({
  color: "white",
  padding: "10px",
});

const ViewData = styled(Typography)({
  marginTop: "15px",
  fontSize: "16px",
  fontWeight: 600,
});

const ButtonBox = styled(Box)({
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-around",
});

const SecondBox = styled(Box)({
  marginTop: "20px",
  maxWidth: "500px",
  margin: "auto",
  backgroundColor: "lightgray",
  padding: "10px",
  maxHeight: "600px",
  overflowY: "auto",
});

const CustomButton = styled(Button)({
  padding: "8px 30px 8px 30px",
  borderRadius: "10px",
  backgroundColor: "purple",
  color: "white",
  fontSize: "13px",
  fontWeight: 600,
  marginTop: "20px",
});

const CutomSpanStyle = styled("span")({
  color: "white",
  padding: "10px",
});
const SubmitCancel = styled(Box)({
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-around",
});

const ThirdBox = styled(Box)({
  marginTop: "20px",
  maxWidth: "500px",
  margin: "auto",
  backgroundColor: "lightgray",
  padding: "10px",
  maxHeight: "600px",
  overflowY: "auto",
});

const CusBtn = styled(Button)({
  padding: "8px 30px 8px 30px",
  borderRadius: "10px",
  backgroundColor: "purple",
  color: "white",
  fontSize: "13px",
  fontWeight: 600,
  marginTop: "20px",
});

const DataSelecTypo = styled(Typography)({
  textAlign: "center",
  color: "red",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "22px",
  width: "142px",
  cursor: "pointer",
});
const SelectedUserData = styled(Typography)({
  marginTop: "15px",
  fontSize: "16px",
  fontWeight: 600,
});
// Customizable Area End
