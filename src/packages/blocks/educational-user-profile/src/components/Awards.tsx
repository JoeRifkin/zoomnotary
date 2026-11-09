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
import { Award } from "../model/Award";
// Customizable Area End

interface Props {
  // Customizable Area Start
  loading: boolean;
  awardList: Award[];
  onPress: (value: Award) => void;
  dateFormatter: (value: string) => string;
  // Customizable Area End
}

export const Awards: React.FC<Props> = ({ loading, awardList, onPress, dateFormatter }) => {
  // Customizable Area Start
  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      {awardList.length > 0 ? (
        awardList.map((award: Award, index: number) => {
          return (
            <View style={styles.listsWrapper} key={index}>
              <Text
                style={styles.listTitle}
              >{`${configJSON.titleLabel}: ${award.attributes.title}`}</Text>
              <Text>{`${configJSON.issueDateLabel}: ${dateFormatter(award.attributes.issue_date)}`}</Text>
              <TouchableOpacity
                onPress={() => onPress(award)}
                testID={configJSON.btnAwardsShowMoreTestId}
              >
                <Text style={styles.showMore}>{configJSON.showMore}</Text>
              </TouchableOpacity>
            </View>
          );
        })
      ) : (
        <Text testID={configJSON.awardsEmptyTestId}>{configJSON.noAwards}</Text>
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
