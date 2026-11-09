import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { GenericHeader } from "../../../components/src/GenericHeader";
const imgBackArrow = require("../assets/arrow_back.png")
import RenderHTML from 'react-native-render-html';
interface ParsedObject {
  title: string;
  description: string;
}
// Customizable Area End

import TermsConditionsController, {
  Props,
  configJSON,
  ITermsConds,
} from "./TermsConditionsController";

export default class TermsConditions extends TermsConditionsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return this.state.isLoading ? (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator color="#000" size={30} />
      </View>
    ) :

      (<View style={styles.container}>
        <GenericHeader
          labelTitle={this.getCurrentPageType === 'pandp' ? configJSON.privacyPolicy : configJSON.termOfServices}
          imgBackArrow={imgBackArrow}
          btnGoBack={{ ...this.btnGoBack }}
          testID={"btnbackArrow"}
          isOtherMsg={true}
        />
        <ScrollView>
          <View style={styles.fieldView}>
            <RenderHTML
              contentWidth={Dimensions.get('window').width}
              source={this.getSource()}
              tagsStyles={{
                h2: {color: '#1E293B', fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
                blockquote: {color: '#475569', fontSize: 16, marginVertical: 5 },
                strong: { fontWeight: 'bold' },
                p: {color: '#475569', fontSize: 18 },
              }}
            />
            <View style={styles.belowDesView}>
              <Text style={styles.anyQueryText}>{configJSON.anyQuery}</Text>
              <View style={styles.viewOfMail}>
                <Text style={styles.mailToView}>{configJSON.mailTO}</Text>
                <TouchableOpacity onPress={() => this.handleEmailLink('mail_id@gmail.com')}>
                  <Text style={styles.mailIdView}>{'mail_id@gmail.com'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>)
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  fieldView: {
    padding: 16
  },
  tandcView: {
    fontSize: 14,
    fontWeight: '400',
    color: '#475569',
    lineHeight: 23.8
  },
  belowDesView: {
    marginTop: 20,
    flexDirection: 'column',
    marginBottom: 40
  },
  viewOfMail: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  anyQueryText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 22.4
  },
  mailToView: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22
  },
  mailIdView: {
    color: '#012275',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 16.94,
    borderBottomColor: '#012275',
    borderBottomWidth: 1.5
  },
  spinnerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  termsCondsTitle: {
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 34,
    color: '#1E293B',
  },
  viewOfContent: {
    flexDirection: 'column',
    marginBottom: 20
  },
  titleView: {
    color: "#1E293B",
    fontSize: 20,
    lineHeight: 34,
    fontWeight: 'bold'
  },
  descriptionView: {
    color: "#334155",
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '400'
  }
});
// Customizable Area End
