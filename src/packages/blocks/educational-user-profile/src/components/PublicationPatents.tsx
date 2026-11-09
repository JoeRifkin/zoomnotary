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
import { PublicationPatent } from "../model/PublicationPatent";

// Customizable Area End

interface Props {
  // Customizable Area Start
  loading: boolean;
  patentList: PublicationPatent[];
  onPress: (value: PublicationPatent) => void;
  // Customizable Area End
}

export const PublicationPatents: React.FC<Props> = ({
  loading,
  patentList,
  onPress,
}) => {
  // Customizable Area Start

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      {patentList.length > 0 ? (
        patentList.map((patent: PublicationPatent, index: number) => {
          return (
            <View style={styles.listsWrapper} key={index}>
              <Text
                style={styles.listTitle}
              >{`${configJSON.titleLabel}: ${patent.attributes.title}`}</Text>
              <Text>{`${configJSON.publicationsLabel}: ${patent.attributes.publication}`}</Text>
              <Text>{`${configJSON.authorLabel}: ${patent.attributes.authors}`}</Text>
              <TouchableOpacity
                onPress={() => onPress(patent)}
                testID={configJSON.btnPatentsShowMoreTestId}
              >
                <Text style={styles.showMore}>{configJSON.showMore}</Text>
              </TouchableOpacity>
            </View>
          );
        })
      ) : (
        <Text testID={configJSON.patentsEmptyTestId}>
          {configJSON.noPublicationPatents}
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
