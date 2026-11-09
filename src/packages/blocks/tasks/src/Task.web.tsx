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
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { IAccount, IGroup, Priority, Status, ITask } from "./types";
// Customizable Area End

import TaskController, { Props, configJSON } from "./TaskController";

// Customizable Area Start
const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});
// Customizable Area End

export default class Task extends TaskController {
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
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="md">
            <Box sx={webStyles.headerButtonViewStyle}>
              <Button
                data-test-id="btnAddTaskModal"
                variant="contained"
                color="primary"
                onClick={this.showAddModal}
              >
                {configJSON.textAddTask}
              </Button>
              <Box sx={webStyles.secondButtonViewStyle}>
                <Button
                  data-test-id="btnGetTasks"
                  variant="contained"
                  color="primary"
                  onClick={() => this.getTasks(this.state.token)}
                >
                  {configJSON.textShowTask}
                </Button>
              </Box>
            </Box>

            <Paper style={webStyles.tableViewStyle}>
              <TableContainer style={webStyles.tableContainerStyle}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>{configJSON.textId}</TableCell>
                      <TableCell>{configJSON.textTitle}</TableCell>
                      <TableCell>{configJSON.textDescription}</TableCell>
                      <TableCell>{configJSON.textStatus}</TableCell>
                      <TableCell>{configJSON.textPriority}</TableCell>
                      <TableCell>{configJSON.textAssignedTo}</TableCell>
                      <TableCell>{configJSON.textActions}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.taskList &&
                      this.state.taskList.map((task: ITask, index: number) => {
                        return (
                          <TableRow key={task.id}>
                            <TableCell scope="row">{task.id}</TableCell>
                            <TableCell>{task.attributes.title}</TableCell>
                            <TableCell>{task.attributes.description}</TableCell>
                            <TableCell>{task.attributes.priority}</TableCell>
                            <TableCell>{task.attributes.status}</TableCell>
                            <TableCell>
                              {task.attributes.assigned_to &&
                              task.attributes.assigned_to.type === "group"
                                ? task.attributes.assigned_to.attributes.name
                                : //@ts-ignore #R18RN640524 This TS error is a result of running React 18 with RN 0.64 and will be resolved when we upgrade to RN 0.70
                                  task.attributes.assigned_to?.attributes
                                    ?.first_name}
                            </TableCell>
                            <TableCell>
                              <Box sx={webStyles.tableButtonViewStyle}>
                                <Button
                                  data-test-id={"btnAssignTo" + index}
                                  variant="contained"
                                  color="primary"
                                  onClick={() => this.handleAssignToModal(task)}
                                >
                                  {configJSON.textAssign}
                                </Button>
                                <Button
                                  data-test-id={"btnEditTask" + index}
                                  variant="contained"
                                  color="primary"
                                  style={webStyles.secondButtonViewStyle}
                                  onClick={() => this.handleEditTask(task)}
                                >
                                  {configJSON.textEdit}
                                </Button>
                                <Button
                                  data-test-id={"btnDeleteTask" + index}
                                  variant="contained"
                                  color="primary"
                                  style={webStyles.secondButtonViewStyle}
                                  onClick={() => {
                                    this.deleteTask(task.id);
                                  }}
                                >
                                  {configJSON.textDelete}
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Add/Edit Task details modal */}
            <Modal open={this.state.isVisibleModal} onClose={this.hideModal}>
              <Box sx={webStyles.modalStyle}>
                <Box sx={webStyles.modalRowViewStyle}>
                  <Typography variant="h6">
                    {configJSON.textTitle + ": "}
                  </Typography>
                  <Input
                    data-test-id={"inputTitle"}
                    placeholder={configJSON.textTitle}
                    defaultValue={this.state.editMode ? this.state.title : ""}
                    onChange={(e) => this.handleInputTitle(e.target.value)}
                  />
                </Box>
                <Box sx={webStyles.modalRowViewStyle}>
                  <Typography variant="h6">
                    {configJSON.textDescription + ": "}
                  </Typography>
                  <Input
                    data-test-id={"inputDescription"}
                    placeholder={configJSON.textDescription}
                    defaultValue={
                      this.state.editMode ? this.state.description : ""
                    }
                    onChange={(e) =>
                      this.handleInputDescription(e.target.value)
                    }
                  />
                </Box>

                <Box sx={webStyles.dropdownViewStyle}>
                  <p>
                    {this.state.priority !== ""
                      ? this.state.priority
                      : configJSON.selectTaskPriority}
                  </p>
                  <IconButton
                    data-test-id="btnExpandPriorityView"
                    onClick={this.expandPriorityView}
                    edge="end"
                    size="large"
                  >
                    {this.state.dropdownPriority ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </IconButton>
                </Box>
                {this.state.dropdownPriority && (
                  <Paper style={webStyles.dropdownListContainer}>
                    <List>
                      {this.state.priorityList.map(
                        (priority: Priority, index: number) => {
                          const labelId = `checkbox-list-label-${index}`;
                          return (
                            <ListItem
                              key={index}
                              data-test-id={"btnAssignPriority" + index}
                              dense
                              button
                              onClick={() =>
                                this.handleSelectPriority(priority)
                              }
                            >
                              <ListItemText
                                id={labelId}
                                primary={priority.name}
                              />
                            </ListItem>
                          );
                        }
                      )}
                    </List>
                  </Paper>
                )}

                <Box sx={webStyles.dropdownViewStyle}>
                  <p>
                    {this.state.status !== ""
                      ? this.state.status
                      : configJSON.selectTaskStatus}
                  </p>
                  <IconButton
                    data-test-id="btnExpandStatusView"
                    onClick={this.expandStatusView}
                    edge="end"
                    size="large"
                  >
                    {this.state.dropdownStatus ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </IconButton>
                </Box>
                {this.state.dropdownStatus && (
                  <Paper style={webStyles.dropdownListContainer}>
                    <List>
                      {this.state.statusList.map(
                        (status: Status, index: number) => {
                          const labelId = `checkbox-list-label-${index}`;
                          return (
                            <ListItem
                              key={index}
                              data-test-id={"btnAssignStatus" + index}
                              dense
                              button
                              onClick={() => this.handleSelectStatus(status)}
                            >
                              <ListItemText
                                id={labelId}
                                primary={status.name}
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
                    data-test-id="btnAddTask"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.state.editMode
                        ? this.editTask(this.state.id)
                        : this.addTask();
                    }}
                  >
                    {this.state.editMode
                      ? configJSON.textEdit
                      : configJSON.textAdd}
                  </Button>
                  <Button
                    data-test-id="btnCloseModal"
                    variant="contained"
                    onClick={this.hideModal}
                  >
                    {configJSON.textClose}
                  </Button>
                </Box>
              </Box>
            </Modal>

            {/* Assign task to the accounts/groups modal */}
            <Modal
              open={this.state.isVisibleAssignModal}
              onClose={this.hideAssignModal}
            >
              <Box sx={webStyles.modalStyle}>
                <Box sx={webStyles.modalRowViewStyle}>
                  <Typography variant="h6">
                    {configJSON.textTitle + ": " + this.state.title}
                  </Typography>
                </Box>

                <Box sx={webStyles.dropdownViewStyle}>
                  <p>
                    {this.state.assign_to_type === "account"
                      ? this.state.assign_to
                      : configJSON.selectAccount}
                  </p>
                  <IconButton
                    data-test-id="btnExpandAccountsView"
                    onClick={this.expandAccountsView}
                    edge="end"
                    size="large"
                  >
                    {this.state.dropdownAccount ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </IconButton>
                </Box>
                {this.state.dropdownAccount && (
                  <Paper style={webStyles.dropdownListContainer}>
                    <List>
                      {this.state.accountsData.map(
                        (account: IAccount, index: number) => {
                          const labelId = `checkbox-list-label-${index}`;
                          return (
                            <ListItem
                              key={index}
                              data-test-id={"btnAssignTaskToAccount" + index}
                              dense
                              button
                              onClick={() =>
                                this.handleAssignTo(
                                  this.state.id,
                                  "Account",
                                  account.id
                                )
                              }
                            >
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

                <Box sx={webStyles.dropdownViewStyle}>
                  <p>
                    {this.state.assign_to_type === "group"
                      ? this.state.assign_to
                      : configJSON.selectGroup}
                  </p>
                  <IconButton
                    data-test-id="btnExpandGroupView"
                    onClick={this.expandGroupView}
                    edge="end"
                    size="large"
                  >
                    {this.state.dropdownGroup ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>
                {this.state.dropdownGroup && (
                  <Paper style={webStyles.dropdownListContainer}>
                    <List>
                      {this.state.groupList.map(
                        (group: IGroup, index: number) => {
                          const labelId = `checkbox-list-label-${index}`;
                          return (
                            <ListItem
                              key={index}
                              data-test-id={"btnAssignTaskToGroup" + index}
                              dense
                              button
                              onClick={() =>
                                this.handleAssignTo(
                                  this.state.id,
                                  "Group",
                                  group.id
                                )
                              }
                            >
                              <ListItemText
                                id={labelId}
                                primary={group.attributes.name}
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
                    data-test-id="btnHandleAssignTo"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.state.editMode
                        ? this.editTask(this.state.id)
                        : this.addTask();
                    }}
                  >
                    {this.state.editMode
                      ? configJSON.textEdit
                      : configJSON.textAdd}
                  </Button>
                  <Button
                    data-test-id="btnHideAssignModal"
                    variant="contained"
                    onClick={this.hideAssignModal}
                  >
                    {configJSON.textClose}
                  </Button>
                </Box>
              </Box>
            </Modal>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
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
  modalButtonViewStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  tableViewStyle: {
    width: "100%",
    overflow: "hidden",
  },
  tableContainerStyle: {
    maxHeight: 440,
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
  dropdownListContainer: {
    maxHeight: 200,
    overflow: "auto",
    width: 300,
  },
};
// Customizable Area End
