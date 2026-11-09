import React from "react";
// Customizable Area Start
import {
Box,Typography,Button,Container,TextField
} from "@mui/material";

// Customizable Area End

import KnowYourCustomerKycVerificationController, {
  Props,
} from "./KnowYourCustomerKycVerificationController";
import { Formik } from "formik";
const initialValues = {
  firstNameDefault: "",
  lastNameDefault: "",
  middleNameDefault: "",
  emailStateDefault: "",
  nationalityDefault: "",
  dateOfBirth: "",
  phoneNumber: ""
}

export default class KnowYourCustomerKycVerification extends KnowYourCustomerKycVerificationController {
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
      <Container  style={styles.container}>
          <Typography style={styles.textstyle1}>
            User Details
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={this.signupValidationSchema}
          onSubmit={(values, { resetForm }) => {
            
          }}
          validateOnBlur={true}
          >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            handleSubmit,
            touched
          }) => (
            <>
              <Box style={{ marginTop: 10, marginLeft: 10 }}>
                <Typography style={styles.textheadingstyle}>firstNameDefault</Typography>
                <Box style={styles.textinputviewstyle}>
                  <TextField style={{ flex: 1, height: 40, fontSize: 14, fontWeight: 600, borderWidth: 0 }}
                     data-test-id={"firstNameweb"}
                    placeholder="Enter the firstNameDefault"
                    onChange={(() =>handleChange("firstNameDefault"))}
                    value={values.firstNameDefault}
                  />
                </Box>
                {errors?.firstNameDefault && touched?.firstNameDefault && (<Typography style={styles.errorText}>{errors?.firstNameDefault}</Typography>)}

                <Typography style={styles.textheadingstyle}>middleNameDefault</Typography>
                <Box style={styles.textinputviewstyle}>
                  <TextField style={{ flex: 1, height: 40, fontSize: 14, fontWeight: 600, borderWidth: 0 }}
                   data-test-id={"Middlenameweb"}
                   placeholder="Enter the middleNameDefault"
                    onChange={(() =>handleChange("middleNameDefault"))}
                    onBlur={handleBlur('middleNameDefault')}
                    value={values.middleNameDefault}
                  />
                </Box>
                {errors?.middleNameDefault && touched?.middleNameDefault && (<Typography style={styles.errorText}>{errors?.middleNameDefault}</Typography>)}
                <Typography style={styles.textheadingstyle}>lastNameDefault</Typography>
                <Box style={styles.textinputviewstyle}>
                  <TextField style={{ flex: 1, height: 40, fontSize: 14, fontWeight: 600, borderWidth: 0 }}
                    data-test-id={"lastNameweb"}
                    placeholder="Enter the lastNameDefault"
                    onChange={(() =>handleChange("lastNameDefault"))}
                    onBlur={handleBlur('lastNameDefault')}
                    value={values.lastNameDefault}
                  />
                </Box>
                {errors?.lastNameDefault && touched?.lastNameDefault && (<Typography style={styles.errorText}>{errors?.lastNameDefault}</Typography>)}
                <Typography style={styles.textheadingstyle}> Eamil  Address</Typography>
                <Box style={styles.textinputviewstyle}>
                  <TextField style={{ flex: 1, height: 40, fontSize: 14, fontWeight:600, borderWidth: 0 }}
                    data-test-id={"emailweb"}
                    placeholder="Enter the Mail id"
                    onChange={(() =>handleChange("email"))}
                    value={values.emailStateDefault}
                  />
                </Box>
                {errors?.emailStateDefault && touched?.emailStateDefault && (<Typography style={styles.errorText}>{errors?.emailStateDefault}</Typography>)}
                <Typography style={styles.textheadingstyle}>Phone Number</Typography>
                <Box style={styles.textinputviewstyle}>
                  <TextField style={{ flex: 1, height: 40, fontSize: 14, fontWeight: 600, borderWidth: 0 }}
                    data-test-id={"phoneweb"}
                    placeholder="Enter the Phone Number"
                    onChange={(() =>handleChange("phone"))}
                    value={values.phoneNumber}
                  />
                </Box>
                {errors?.phoneNumber && touched?.phoneNumber && (<Typography style={styles.errorText}>{errors?.phoneNumber}</Typography>)}
                <Typography style={styles.textheadingstyle} >nationalityDefault </Typography>
                <Box style={styles.textinputviewstyle}>
                  <TextField style={{ flex: 1, height: 40, fontSize: 14, fontWeight:600, borderWidth: 0 }}
                    data-test-id={"nationalityweb"}
                    placeholder="Enter the nationalityDefault"
                    onChange={(() =>handleChange("nationalityDefault"))}
                    value={values.nationalityDefault}
                  />
                </Box>
                {errors?.nationalityDefault && touched?.nationalityDefault &&
                  (<Typography style={styles.errorText}>
                    {errors?.nationalityDefault}</Typography>
                  )}
                <Typography style={styles.textheadingstyle} >Date of Birth </Typography>
                <Box style={styles.textinputviewstyle}>
                  <TextField style={{ flex: 1, height: 40, fontSize: 14, fontWeight: 600, borderWidth: 0 }}
                    data-test-id={"Date of Birthweb"}
                    placeholder="Enter the dateOfBirth"
                    onChange={(() =>handleChange("dateOfBirth"))}
                    value={values.dateOfBirth}
                  />
                </Box>
                {errors?.dateOfBirth && touched?.dateOfBirth && (<Typography style={styles.errorText}>{errors?.dateOfBirth}</Typography>)}
              </Box>
              <Box style={styles.btnview}>
               
              </Box>
            </>
          )}
        </Formik>
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
  textviewstyle1: {
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  textstyle1: {
    fontSize: 32,
    fontWeight: 700,
    color: '#282828'
  } ,
  textinputviewstyle: {
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 10,
    padding: 5, borderWidth: 1,
    borderColor: 'gray'
  }as React.CSSProperties,
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textheadingstyle: {
    fontSize: 16,
    fontWeight: 700,
    marginLeft: 10,
    marginTop: 10,
    color: 'gray'
  },
  btnstyle: {
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor:'#6C4695'
  },
  btntext: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 700,
    color: '#FFFFFF'
  },
  btnview: {
    marginTop: 10,
    marginBottom: 30
  },
  errorText: {
    fontSize: 10,
    color: "rgba(220, 96, 104, 1)",
    fontWeight: 700,
    marginTop:5
  },
};
// Customizable Area End
