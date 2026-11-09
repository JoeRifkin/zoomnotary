import React from "react";
// Customizable Area Start
import {
    Box, Typography, Button, Container
} from "@mui/material";
import KnowYourCustomerKycVerificationController, {
    Props,
} from "./KnowYourCustomerKycVerificationController";
import { Success } from "./assets";
// Customizable Area End




export default class KnowYourCustomerKycVerificationAccount extends KnowYourCustomerKycVerificationController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Star
        // Customizable Area End
    }
    // Customizable Area Start
    // Customizable Area End
    render() {
        // Customizable Area Start
        return (
            <Container style={styles.container}>
                <Box style={styles.groupiconviewstyle}>
                    <img src={Success} style={styles.groupiconstyle} />
                </Box>
                <Box style={styles.textviewstyle1}>
                    <Typography style={styles.textstyle1}>
                        Your document has Submitted Sucessfully
                    </Typography>
                </Box>
                <Box style={styles.textviewstyle2}>
                    <Typography style={styles.textstyle2}>
                        Lorem Ipsum is Simply dummy Typography of the printing and typesetting industry.Lorem dten like Aldus
                        PageMaker including version.
                    </Typography>
                </Box>
                <Box style={styles.btnview}>
                    
                </Box>
            </Container>
        );

        // Customizable Area End
    }
}

// Customizable Area Start
const styles = {
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#ffffffff",
    },
    groupiconviewstyle: {
        marginTop: 60, alignItems: 'center'
    },
    groupiconstyle: {
        width: 90, height: 85
    },
    textviewstyle1: {
        alignItems: 'center',
        marginTop: 20,

    },
    textstyle1: {
        fontSize: 22,
        fontWeight: 700,
        color: '#282828'
    },
    textviewstyle2: {
        alignItems: 'center',
        marginTop: 20,

    },
    textstyle2: {

        fontSize: 16,
        fontWeight: 600,
        color: '#282828'
    },
    btnstyle: {
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: "#6C4695",
    },
    btntext: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 700,
        color: '#FFFFFF'
    },
    btnview: {
        marginTop: 20,
    }
};
// Customizable Area End
