import React from "react";
// Customizable Area Start
import { Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import {GenericNotaryServices} from "../../../components/src/GenericNotaryServices";
import {GenericCustomModel} from "../../../components/src/GenericCustomModel";
import CustomButton from "../../../components/src/CustomButton";
import CustomLoader from "../../../components/src/CustomLoader";

import { imgBackArrow } from "./assets";
import Feather from "react-native-vector-icons/Feather"
import Scale from "../../../components/src/Scale";
// Customizable Area End

import NotaryServicesController, {
    Props,
    configJSON,
} from "./NotaryServicesController";

export default class NotaryServices extends NotaryServicesController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    renderHeader = () => {
        return (
            <View style={[styles.headerView]}>
                <TouchableOpacity
                    onPress={this.goBack}
                    testID="goBack"
                >
                    <Image style={styles.imgArrowBack} source={imgBackArrow} />
                </TouchableOpacity>
                <Text style={styles.titleView}>{configJSON.headerTitle}</Text>
                <View />
            </View>
        )
    }

    renderModal = () => {
        return (
            <GenericCustomModel
                visible={this.state.showModal}
                onClose={this.toggleModal}
                width={337}>
                <Text style={styles.confirmationMsgView}>{configJSON.saveChanges}</Text>
                <View style={styles.btnView}>
                    <CustomButton
                        testID='No'
                        title="No"
                        outlined
                        onPress={this.toggleModal}
                        containerStyle={styles.btn1}
                        disabled={this.state.loading}
                    />
                    <CustomButton
                        testID='yes'
                        title="Yes"
                        onPress={this.onSubmit}
                        containerStyle={styles.btn2}
                        disabled={this.state.loading}
                    />
                </View>
            </GenericCustomModel>
        )
    }
    // Customizable Area End

    render() {
        // Customizable Area Start

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={'#012275'} />
                {this.renderHeader()}

                {this.state.services.length > 0 ?
                    <>
                        <ScrollView keyboardShouldPersistTaps="always" style={styles.scrollView}>
                            <GenericNotaryServices
                                testID='servicesList'
                                servicesList={this.state.services}
                                selectedService={this.state.selectedServices}
                                isChecked={this.state.isAllServicesSelected}
                                clickOnAllSelect={this.clickOnAllSelect}
                                clickOnSelect={this.clickOnSelect}
                            />
                        </ScrollView>
                        <Text style={styles.notaryErrorServiceText}>{this.state.notarySeviceErrorMssg}</Text>
                        <Modal animationType="slide" transparent={true} visible={this.state.isChangesDone}>
                            <TouchableWithoutFeedback
                            >
                                <View style={[styles.modalCardMainContainer]}>
                                    <TouchableOpacity activeOpacity={1} style={styles.modalCard}>
                                        <View style={styles.validationsSubContainer}>
                                            <View style={styles.validationCorrectBackGround}>
                                                <Feather name="check" size={20} color="#fff" />
                                            </View>
                                            <Text style={styles.validationLabel}>{configJSON.textChangesSaved}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                        <View style={styles.btnWrapper}>
                            <CustomButton
                                testID='SaveBtn'
                                title="Save"
                                onPress={this.toggleModal}
                                disabled={this.disableBtn()}
                            /> 
                        </View>
                    </> : null}

                {this.renderModal()}
                <CustomLoader loader={this.state.loading }/>
            </SafeAreaView>

        );

        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    btn1:{
        flex:.47,
        marginTop:34
    },
    btn2:{
        flex:.47
    },
    btnView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    confirmationMsgView: {
        color: '#475569',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 26.6,
        textAlign: 'left'
    },
    container: {
        flex: 1,
    },
    scrollView: { flex: 1 },
    btnWrapper:{
        paddingHorizontal:24,
        paddingBottom: 40,
    },
    headerView: {
        backgroundColor: '#012275',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    titleView: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 24,
        marginRight: 20
    },
    imgArrowBack: {
        height: 24,
        width: 24,
        resizeMode: 'contain'
    },
    notaryErrorServiceText:{
        color:"red",fontSize:16,
        marginLeft:23
    },

    modalCardMainContainer: {
        backgroundColor: "rgba(0,0,0,0.3)",
        flex: 1,
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",  
        paddingBottom:Scale(120)      
      },

      modalCard: {
        backgroundColor: "#fff",
        padding:10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius:5,
        width:175,
      },

      validationsSubContainer:{
        flexDirection:"row",
        alignItems:"center",
      },
    
      validationCorrectBackGround:{
        height:25,
        width:25,
        borderRadius:30,
        backgroundColor:"#0f7d2c",
        alignItems:"center",
        justifyContent:"center"
      }, 

      validationLabel:{
        color:"#000",
        fontSize:17,
        fontWeight:"500",
        lineHeight:22,
        marginLeft:10
      },
});
// Customizable Area End