import React from "react";

// Customizable Area Start
import { ActivityIndicator, Text, View } from "react-native";
import { configJSON } from "../EducationalUserProfileController";
import { EducationalQualification } from "../model/EducationalQualification";

// Customizable Area End

interface Props {
  // Customizable Area Start
  loading: boolean;
  educationQualificationList: EducationalQualification[];
  // Customizable Area End
}

export const EducationalQualifications: React.FC<Props> = ({
  loading,
  educationQualificationList,
}) => {
  // Customizable Area Start
  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      {educationQualificationList.length > 0 ? (
        educationQualificationList.map(
          (educationQualification: EducationalQualification, index: number) => {
            return (
              <View key={index}>
                <Text>{educationQualification.attributes.school_name}</Text>
                <Text>{educationQualification.attributes.degree_name}</Text>
                <Text>{`Grades: ${educationQualification.attributes.grades}`}</Text>
                <Text>{`Duration: ${educationQualification.attributes.start_date} to ${educationQualification.attributes.end_date}`}</Text>
              </View>
            );
          }
        )
      ) : (
        <Text testID={configJSON.qualificationsEmptyTestId}>
          {configJSON.noQualiText}
        </Text>
      )}
    </>
  );
  // Customizable Area End
};
// Customizable Area Start
// Customizable Area End
