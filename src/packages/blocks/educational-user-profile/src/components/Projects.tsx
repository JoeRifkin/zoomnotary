import React from "react";

// Customizable Area Start
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { configJSON } from "../EducationalUserProfileController";
import { Project } from "../model/Project";

// Customizable Area End

interface Props {
  // Customizable Area Start
  loading: boolean;
  projectList: Project[];
  onPress: (value: Project) => void;
  // Customizable Area End
}

export const Projects: React.FC<Props> = ({
  loading,
  projectList,
  onPress,
}) => {
  // Customizable Area Start

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      {projectList.length > 0 ? (
        projectList.map((project: Project, index: number) => {
          return (
            <View style={styles.listsWrapper} key={index}>
              <Text style={styles.listTitle}>
                {project.attributes.project_name}
              </Text>
              <Text>{`${project.attributes.start_date} to ${project.attributes.end_date}`}</Text>
              <TouchableOpacity
                onPress={() => onPress(project)}
                testID={configJSON.btnProjectsShowMoreTestId}
              >
                <Text style={styles.showMore}>{configJSON.showMore}</Text>
              </TouchableOpacity>
            </View>
          );
        })
      ) : (
        <Text testID={configJSON.projectsEmptyTestId}>
          {configJSON.noProjectText}
        </Text>
      )}
    </>
  );

  // Customizable Area End
};

// Customizable Area Start
const styles = StyleSheet.create({
  listsWrapper: {
    paddingBottom: 15,
  },
  listTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  showMore: {
    color: "#6200ee",
  },
});
// Customizable Area End
