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
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { ITask, ITaskList } from "./types";
// Customizable Area End

import TaskListController, { configJSON, Props } from "./TaskListController";

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

export default class TaskList extends TaskListController {
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
                data-test-id="btnAddTaskListModal"
                variant="contained"
                color="primary"
                onClick={this.showAddModal}
              >
                {configJSON.textAddTaskList}
              </Button>
              <Box sx={webStyles.secondButtonViewStyle}>
                <Button
                  data-test-id="btnGetTaskLists"
                  variant="contained"
                  color="primary"
                  onClick={() => this.getTaskLists(this.state.token)}
                >
                  {configJSON.textShowTaskList}
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
                      <TableCell>{configJSON.textCreatedAt}</TableCell>
                      <TableCell>{configJSON.textUpdatedAt}</TableCell>
                      <TableCell>{configJSON.textActions}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.taskLists &&
                      this.state.taskLists.map(
                        (taskList: ITaskList, index: number) => {
                          return (
                            <TableRow key={taskList.id}>
                              <TableCell scope="row">{taskList.id}</TableCell>
                              <TableCell>{taskList.attributes.name}</TableCell>
                              <TableCell>
                                {taskList.attributes.created_at.toLocaleString()}
                              </TableCell>
                              <TableCell>
                                {taskList.attributes.updated_at.toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <Box sx={webStyles.tableButtonViewStyle}>
                                  <Button
                                    data-test-id="btnEditTaskList"
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                      this.handleEditSelect(taskList)
                                    }
                                  >
                                    {configJSON.textEdit}
                                  </Button>
                                  <Button
                                    data-test-id="btnDeleteTaskList"
                                    variant="contained"
                                    color="primary"
                                    style={webStyles.secondButtonViewStyle}
                                    onClick={() => {
                                      this.deleteTaskList(taskList.id);
                                    }}
                                  >
                                    {configJSON.textDelete}
                                  </Button>
                                </Box>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Add/Edit TaskList modal */}
            <Modal open={this.state.isVisibleModal} onClose={this.hideModal}>
              <Box sx={webStyles.modalStyle}>
                <Box sx={webStyles.modalRowViewStyle}>
                  <Input
                    data-test-id={"inputName"}
                    placeholder={configJSON.textName}
                    defaultValue={this.state.editMode ? this.state.name : ""}
                    onChange={(e) => this.handleInputName(e.target.value)}
                  />
                </Box>

                <Box sx={webStyles.dropdownViewStyle}>
                  <p>{configJSON.selectTasks}</p>
                  <IconButton
                    data-test-id="btnExpandTasksView"
                    onClick={this.expandTasksView}
                    edge="end"
                    size="large"
                  >
                    {this.state.dropdownTasks ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>
                {this.state.dropdownTasks && (
                  <Paper style={webStyles.dropdownListContainer}>
                    <List>
                      {this.state.tasksData.map(
                        (task: ITask, index: number) => {
                          const labelId = `checkbox-list-label-${index}`;
                          return (
                            <ListItem
                              key={index}
                              data-test-id={"btnHandleTasksSelect" + index}
                              dense
                              button
                              onClick={() => this.handleTasksSelect(task.id)}
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={task.isSelected}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                id={labelId}
                                primary={task.attributes.title}
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
                    data-test-id="btnAddTaskList"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.state.editMode
                        ? this.editTaskList(this.state.id)
                        : this.addTaskList();
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
    justifyContent: "flex-end",
    padding: "10px 0px",
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
