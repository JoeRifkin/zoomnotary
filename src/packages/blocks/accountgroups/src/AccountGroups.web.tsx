import React from "react";

// Customizable Area Start
import {
  Modal,
  Container,
  Box,
  Button,
  Input,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { Account, Group, GroupAccount } from "./types";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});
// Customizable Area End

import AccountGroupsController, {
  configJSON,
  Props,
} from "./AccountGroupsController";

export default class AccountGroups extends AccountGroupsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <Box sx={webStyles.headerButtonViewStyle}>
            <Button
              data-test-id="btnAddGroupModal"
              variant="contained"
              color="primary"
              onClick={this.showAddModal}
            >
              {configJSON.textAddGroup}
            </Button>
            <Box sx={webStyles.secondButtonViewStyle}>
              <Button
                data-test-id="btnGetGroups"
                variant="contained"
                color="secondary"
                onClick={() => this.handleGetGroups()}
              >
                {configJSON.textShowGroup}
              </Button>
            </Box>
          </Box>

          <Paper style={webStyles.tableViewStyle}>
            <TableContainer style={webStyles.tableContainerStyle}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>{configJSON.textId}</TableCell>
                    <TableCell>{configJSON.textName}</TableCell>
                    <TableCell>{configJSON.textAccounts}</TableCell>
                    <TableCell>{configJSON.textActions}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.groupList &&
                    this.state.groupList.map((group: Group) => {
                      return (
                        <TableRow key={group.id}>
                          <TableCell scope="row">{group.id}</TableCell>
                          <TableCell>{group.attributes.name}</TableCell>
                          <TableCell>
                            <List component="nav">
                              {group.attributes.accounts.map(
                                (account: GroupAccount) => (
                                  <ListItem key={account.id} button>
                                    <ListItemText
                                      primary={
                                        account.first_name +
                                        " " +
                                        account.last_name
                                      }
                                    />
                                  </ListItem>
                                )
                              )}
                            </List>
                          </TableCell>
                          <TableCell>
                            <Box sx={webStyles.tableButtonViewStyle}>
                              <Button
                                data-test-id="btnEditGroup"
                                variant="contained"
                                color="default"
                                size="small"
                                onClick={() => this.handleEditGroup(group)}
                              >
                                {configJSON.textEdit}
                              </Button>
                              <Button
                                data-test-id="btnDeleteGroup"
                                variant="contained"
                                color="secondary"
                                size="small"
                                style={webStyles.secondButtonViewStyle}
                                onClick={() => this.deleteGroup(group.id)}
                              >
                                {configJSON.textDelete}
                              </Button>
                              <Button
                                data-test-id="btnHandleAddAccounts"
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{
                                  ...webStyles.btnAddAccounts,
                                  textTransform: "none",
                                }}
                                onClick={() => this.handleAddAccounts(group)}
                              >
                                {configJSON.textAddAcc}
                              </Button>
                              {group.attributes.accounts.length > 0 && (
                                <Button
                                  data-test-id="btnHandleDeleteAccounts"
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  style={{
                                    ...webStyles.btnDeleteAccounts,
                                    textTransform: "none",
                                  }}
                                  onClick={() =>
                                    this.handleDeleteAccounts(group)
                                  }
                                >
                                  {configJSON.textDeleteAcc}
                                </Button>
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Add/Edit group details modal */}
          <Modal open={this.state.isVisibleModal} onClose={this.hideModal}>
            <Box sx={webStyles.modalStyle}>
              {this.state.fieldError && (
                <p style={webStyles.errorMsg}>
                  {configJSON.errorAllFieldsAreMandatory}
                </p>
              )}
              <Box sx={webStyles.modalRowViewStyle}>
                <Input
                  data-test-id={"inputName"}
                  placeholder={configJSON.textName}
                  defaultValue={this.state.editMode ? this.state.name : ""}
                  onChange={(e) => this.handleInputName(e.target.value)}
                />
                <Button
                  data-test-id="btnAddGroup"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.state.editMode
                      ? this.editGroup(this.state.id)
                      : this.addGroup();
                  }}
                >
                  {this.state.editMode
                    ? configJSON.textUpdate
                    : configJSON.textSave}
                </Button>
              </Box>

              <Box sx={webStyles.modalButtonViewStyle}>
                <Button
                  data-test-id="btnHideModal"
                  variant="contained"
                  onClick={this.hideModal}
                >
                  {configJSON.textClose}
                </Button>
              </Box>
            </Box>
          </Modal>

          {/* Add/Edit Accounts to the group modal */}
          <Modal
            open={this.state.isVisibleAddAccountModal}
            onClose={this.hideAddAccountModal}
          >
            <Box sx={webStyles.modalStyle}>
              <Box sx={webStyles.modalRowViewStyle}>
                <p>{this.state.name}</p>
              </Box>
              <Box sx={webStyles.dropdownViewStyle}>
                <p>{configJSON.textSelectAccounts}</p>
                <IconButton
                  data-test-id={"btnExpandAccountsView"}
                  onClick={this.expandAccountsView}
                  edge="end"
                >
                  {this.state.dropdownAccountStatus ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </IconButton>
              </Box>
              {this.state.dropdownAccountStatus && (
                <Paper style={webStyles.dropdownListContainer}>
                  <List>
                    {this.state.modalAccData.map(
                      (account: Account, index: number) => {
                        const labelId = `checkbox-list-label-${index}`;
                        return (
                          <ListItem
                            key={account.id}
                            data-test-id={"listItem" + index}
                            dense
                            button
                            onClick={() => this.handleAccountSelect(account.id)}
                          >
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={account.isSelected}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ "aria-labelledby": labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              id={labelId}
                              primary={
                                account.attributes.first_name +
                                " " +
                                account.attributes.last_name
                              }
                            />
                          </ListItem>
                        );
                      }
                    )}
                  </List>
                </Paper>
              )}

              <Box sx={webStyles.modalButtonViewStyle}>
                <Button
                  data-test-id="btnSaveAccountsToGroup"
                  variant="contained"
                  color="primary"
                  onClick={() => this.handleSaveAccountsToGroup(this.state.id)}
                >
                  {configJSON.textSave}
                </Button>
                <Button
                  data-test-id="btnCloseAddAccountModal"
                  variant="contained"
                  onClick={this.hideAddAccountModal}
                >
                  {configJSON.textClose}
                </Button>
              </Box>
            </Box>
          </Modal>

          {/* Delete Accounts from the group modal */}
          <Modal
            open={this.state.isVisibleDeleteAccountModal}
            onClose={this.hideDeleteAccountModal}
          >
            <Box sx={webStyles.modalStyle}>
              <Box sx={webStyles.modalRowViewStyle}>
                <p>{this.state.name}</p>
              </Box>
              <Paper style={webStyles.dropdownListContainer}>
                <List>
                  {this.state.selectedAccounts.map(
                    (account: GroupAccount, index: number) => {
                      const labelId = `checkbox-list-label-${index}`;
                      return (
                        <ListItem
                          key={account.id}
                          data-test-id={"deleteListItem" + index}
                          dense
                          button
                          onClick={() =>
                            this.handleDeleteAccountSelect(account.id)
                          }
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={account.isSelected}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            id={labelId}
                            primary={account.first_name + " " + account.last_name}
                          />
                        </ListItem>
                      );
                    }
                  )}
                </List>
              </Paper>
              <Box sx={webStyles.modalButtonViewStyle}>
                <Button
                  data-test-id="btnHandleRemoveAccountsToGroup"
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    this.handleRemoveAccountsToGroup(this.state.id)
                  }
                >
                  {configJSON.textDelete}
                </Button>
                <Button
                  data-test-id="btnHideDeleteAccountModal"
                  variant="contained"
                  onClick={this.hideDeleteAccountModal}
                >
                  {configJSON.textClose}
                </Button>
              </Box>
            </Box>
          </Modal>
        </Container>
      </ThemeProvider>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const webStyles = {
  modalStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  modalRowViewStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownViewStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 280,
    justifyContent: "space-between",
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 5,
  },
  modalButtonViewStyle: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px 0px",
  },
  tableViewStyle: {
    width: "100%",
    overflow: "hidden",
  },
  tableContainerStyle: {
    maxHeight: 600,
  },
  tableButtonViewStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerButtonViewStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  secondButtonViewStyle: {
    marginLeft: 10,
  },
  btnAddAccounts: {
    backgroundColor: "#005500",
    marginLeft: 10,
  },
  btnDeleteAccounts: {
    backgroundColor: "#990000",
    marginLeft: 10,
  },
  checkCircleRed: {
    height: 10,
    width: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  innerTableBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrow: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  dropdownListContainer: {
    maxHeight: 200,
    overflow: "auto",
    width: 300,
  },
  errorMsg: {
    color: "red",
    margin: 10,
  },
};
// Customizable Area End
