import React from "react";

// Customizable Area Start
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { userProfileImg } from "./assets";

import EducationalUserProfileController, {
  configJSON,
  Props,
  Tab,
} from "./EducationalUserProfileController";

import { Projects } from "./components/Projects";
import { Awards } from "./components/Awards";
import { PublicationPatents } from "./components/PublicationPatents";
import { EducationalQualifications } from "./components/EducationalQualifications";
import { Project } from "./model/Project";
import { Award } from "./model/Award";
import { PublicationPatent } from "./model/PublicationPatent";

// Customizable Area End

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

export default class EducationalUserProfile extends EducationalUserProfileController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  renderActiveTabContent = () => {
    switch (this.state.activeTab) {
      case Tab.Projects:
        return (
          <Projects
            loading={this.state.loadingProject}
            projectList={this.state.projectList}
            onPress={(project) => this.showModal(project)}
          />
        );
      case Tab.Awards:
        return (
          <Awards
            loading={this.state.loadingAwards}
            awardList={this.state.awardList}
            onPress={(award) => this.showModal(award)}
            dateFormatter={this.formatDate}
          />
        );
      case Tab.Patents:
        return (
          <PublicationPatents
            loading={this.state.loadingPub}
            patentList={this.state.patentList}
            onPress={(patent) => this.showModal(patent)}
          />
        );
    }
  };

  renderProjectModalContent = (project: Project) => {
    return (
      <>
        <Text style={styles.listTitle}>{configJSON.projectDetailsLabel}</Text>
        <Text style={styles.modalText}>
          {configJSON.projectNameLabel}: {project.attributes.project_name}
        </Text>
        <Text style={styles.modalText}>
          {configJSON.descriptionLabel}: {project.attributes.description}
        </Text>
        <Text style={styles.modalText}>
          {configJSON.projectDurationLabel}: {project.attributes.start_date} {configJSON.toLabel}
          {project.attributes.end_date}
        </Text>
        <Text style={styles.modalText}>
          {configJSON.urlLabel}:
          <Text
            style={{ color: "#6200ee" }}
            onPress={() => this.openUrl(project.attributes.url)}
            testID={configJSON.openUrlTestId}
          >
            {project.attributes.url}
          </Text>
        </Text>
      </>
    );
  };

  renderAwardModalContent = (award: Award) => {
    return (
      <>
        <Text style={styles.listTitle}>{configJSON.awardDetailsLabel}</Text>
        <Text style={styles.modalText}>{configJSON.titleLabel}: {award.attributes.title}</Text>
        <Text style={styles.modalText}>
          {configJSON.associatedWithLabel}: {award.attributes.associated_with}
        </Text>
        <Text style={styles.modalText}>{configJSON.issuerLabel}: {award.attributes.issuer}</Text>
        <Text style={styles.modalText}>
          {configJSON.descriptionLabel}: {award.attributes.description}
        </Text>
        <Text style={styles.modalText}>
          {configJSON.issueDateLabel}: {" "}
          {this.formatDate(award.attributes.issue_date)}
        </Text>
      </>
    );
  };

  renderPublicationPatentModalContent = (patent: PublicationPatent) => {
    return (
      <>
        <Text style={styles.listTitle}>{configJSON.patentDetailsLabel}</Text>
        <Text style={styles.modalText}>{configJSON.titleLabel}: {patent.attributes.title}</Text>
        <Text style={styles.modalText}>
          {configJSON.associatedWithLabel}: {patent.attributes.publication}
        </Text>
        <Text style={styles.modalText}>
          {configJSON.issuerLabel}: {patent.attributes.authors}
        </Text>
        <Text style={styles.modalText}>
          {configJSON.descriptionLabel}: {patent.attributes.description}
        </Text>
        <Text style={styles.modalText}>
          {configJSON.urlLabel}:
          <Text
            style={{ color: "#6200ee" }}
            onPress={() => this.openUrl(patent.attributes.url)}
            testID={configJSON.openUrlTestId}
          >
            {patent.attributes.url}
          </Text>
        </Text>
      </>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => this.hideKeyboard()}
          testID={configJSON.hideKeyboardTestID}
        >
          <View>
            <View style={styles.profileHeaderWrapper}>
              <Image
                source={userProfileImg}
                style={{ height: 100, width: 100 }}
              />
              <View style={styles.nameWrapper}>
                <Text style={styles.name}>User name</Text>
                <Text style={styles.address}>{this.state.userName}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.title}>{configJSON.educationalTitle}</Text>
              <EducationalQualifications
                loading={this.state.loadingEQ}
                educationQualificationList={
                  this.state.educationQualificationList
                }
              />
            </View>

            <View>
              <View style={styles.tabWrapper}>
                <TouchableOpacity
                  style={
                    this.state.activeTab === Tab.Projects
                      ? styles.activeTab
                      : styles.tab
                  }
                  onPress={() => this.setActiveTab(Tab.Projects)}
                  testID={configJSON.btnProjectsTestId}
                >
                  <Text style={styles.tabTitle}>{configJSON.projectLabel}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    this.state.activeTab === Tab.Awards
                      ? styles.activeTab
                      : styles.tab
                  }
                  onPress={() => this.setActiveTab(Tab.Awards)}
                  testID={configJSON.btnAwardsTestId}
                >
                  <Text style={styles.tabTitle}>{configJSON.awardsLabel}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    this.state.activeTab === Tab.Patents
                      ? styles.activeTab
                      : styles.tab
                  }
                  onPress={() => this.setActiveTab(Tab.Patents)}
                  testID={configJSON.btnPatentsTestId}
                >
                  <Text style={styles.tabTitle}>
                    {configJSON.publicationPatentLabel}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>{this.renderActiveTabContent()}</View>

            <Modal transparent={true} visible={this.state.isModalOpen}>
              <TouchableOpacity
                onPressOut={this.hideModal}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  backgroundColor: "rgba(0,0,0,.4)",
                }}
              >
                <TouchableWithoutFeedback>
                  <View
                    style={{
                      flexDirection: "column",
                      backgroundColor: "#fff",
                      width: "80%",
                      borderRadius: 20,
                      padding: 15,
                    }}
                  >
                    {this.state.modalItem?.type === "project" &&
                      this.renderProjectModalContent(
                        this.state.modalItem as Project
                      )}
                    {this.state.modalItem?.type === "award" &&
                      this.renderAwardModalContent(
                        this.state.modalItem as Award
                      )}
                    {this.state.modalItem?.type === "publication_patent" &&
                      this.renderPublicationPatentModalContent(
                        this.state.modalItem as PublicationPatent
                      )}

                    <TouchableOpacity
                      onPress={() => this.hideModal()}
                      testID={configJSON.modalWindowTestId}
                    >
                      <Text style={{ color: "#498ECC", marginTop: 5 }}>
                        {configJSON.closeText}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </TouchableOpacity>
            </Modal>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  profileHeaderWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  nameWrapper: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 15,
    justifyContent: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
  },
  address: {
    fontSize: 16,
    marginTop: 5,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  tabWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  activeTab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: "#6200ee",
    borderBottomWidth: 2,
    fontWeight: "bold",
  },
  tabTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  listTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  modalText: {
    marginVertical: 5,
  },
});
// Customizable Area End
