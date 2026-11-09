import React from "react";

// Customizable Area Start
import { Container, Box, Typography, Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import { userProfileImg } from "./assets";

import { EducationalQualifications } from "./components/EducationalQualifications.web";
import { Projects } from "./components/Projects.web";
import { Awards } from "./components/Awards.web";
import { PublicationPatents } from "./components/PublicationPatents.web";

import { Project } from "./model/Project";
import { Award } from "./model/Award";
import { PublicationPatent } from "./model/PublicationPatent";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});

const webStyle = {
  imageStyle: {
    width: 100,
  },
  qualificationBlock: {
    marginTop: 40,
  },
};
// Customizable Area End

import EducationalUserProfileController, {
  Props,
  Tab as PageTab,
  configJSON,
} from "./EducationalUserProfileController";

export default class EducationalUserProfile extends EducationalUserProfileController {
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    // Customizable Area Start
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              padding: "10px 0px",
            }}
          >
            <Box>
              <img src={userProfileImg} style={webStyle.imageStyle} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4">{configJSON.userNameLabel}</Typography>
              <Typography>{this.state.userName}</Typography>
            </Box>
          </Box>
          <EducationalQualifications
            itemsList={this.state.educationQualificationList}
          />

          <TabContext value={this.state.activeTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList aria-label="lab API tabs example">
                <Tab
                  label={configJSON.projectLabel}
                  value={PageTab.Projects}
                  onClick={() => this.setActiveTab(PageTab.Projects)}
                />
                <Tab
                  label={configJSON.awardsLabel}
                  onClick={() => this.setActiveTab(PageTab.Awards)}
                />
                <Tab
                  label={configJSON.publicationPatentLabel}
                  value={PageTab.Patents}
                  onClick={() => this.setActiveTab(PageTab.Patents)}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Projects
                modalIsVisible={this.state.isModalOpen}
                modalOnClose={this.hideModal}
                itemsList={this.state.projectList}
                onItemClick={this.showModal}
                selected={this.state.modalItem as Project}
              />
            </TabPanel>
            <TabPanel value="2">
              <Awards
                modalIsVisible={this.state.isModalOpen}
                modalOnClose={this.hideModal}
                itemsList={this.state.awardList}
                onItemClick={this.showModal}
                selected={this.state.modalItem as Award}
                dateFormatter={this.formatDate}
              />
            </TabPanel>
            <TabPanel value="3">
              <PublicationPatents
                modalIsVisible={this.state.isModalOpen}
                modalOnClose={this.hideModal}
                itemsList={this.state.patentList}
                onItemClick={this.showModal}
                selected={this.state.modalItem as PublicationPatent}
              />
            </TabPanel>
          </TabContext>
        </Container>
      </ThemeProvider>
    );
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
}
