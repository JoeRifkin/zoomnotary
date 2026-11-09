//@ts-nocheck
import React, { Fragment } from "react";
import { createTheme, ThemeProvider, Theme, StyledEngineProvider, adaptV4Theme } from "@mui/material/styles";
import CancelIcon from '@mui/icons-material/Cancel';
// Customizable Area Start
import {
  Container,
  Input,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  Divider,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box, Typography, Button 
} from "@mui/material";
// Customizable Area End

import ContentManagementController, {
  Props,
  configJSON,
} from "./ContentManagementController";
// Customizable Area Start


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


interface ProductItem {
  id: string;
  type: string;
  attributes: {
    title: string;
    description: string;
    status: boolean;
    price: number;
    user_type: string;
    quantity: string;
    created_at: string;
    updated_at: string;
    images: [
      {
        id: number;
        url: string;
        type: string;
        filename: string;
      }
    ];
  };
}
const theme = createTheme(
  {palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
    secondary: {
      main: "#376fd0",
      contrastText: "#fff",
    },
    error: {
      main: "#f44336",
      contrastText: "#fff",
    }
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});
// Customizable Area End


export default class ContentManagement extends ContentManagementController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start


  // Customizable Area End

  render() {

    return (
      // Customizable Area Start
      // Customizable Area End
      <div id="main_block">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container>
            <Box m={4}>
              <Grid container spacing={4}>
                <Grid item md={4} sm={6} xs={12} >
                  {this.state.catagorydata.length > 0 && <FormControl variant="outlined"
                    fullWidth>
                    <InputLabel id="demo-user">{configJSON.users}</InputLabel>
                    <Select
                      labelId="demo-user"
                      label={configJSON.users}
                      value={this.state.category.value}
                      id="demo-user-select"
                      
                      onChange={(event) => this.onSelectCategoryWeb(event.target.value)}
                    >
                      {
                        this.state.catagorydata.map((item, index) =>
                          <MenuItem key={`user-${index}`} value={item.value}>{item.title}</MenuItem>
                        )
                      }

                    </Select>
                  </FormControl>}
                </Grid>
                <Grid item md={8} sm={6} xs={12}>
                  <Button id="add_new_button" variant="contained" color="secondary" onClick={this.addNewProduct}>{configJSON.addNewButton}</Button>
                </Grid>

              </Grid>
            </Box>

            {this.state.loading ?
            <LinearProgress color="secondary"/>
            :<Box my={4}>
              <Grid container spacing={4}>
                { this.state.userDataList && this.state.userDataList.map((item: ProductItem, index: number) =>
                 { return(
                    <Fragment key={index}>
                    <Grid id="prod_list" item lg={3} md={4} sm={6} xs={12}>
                      <Card>
                        <CardMedia
                          style={{ height: 150 }}
                          image={item.attributes.images.length>0 && item.attributes.images[0].url }
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.attributes.title}
                          </Typography>
                          <Typography gutterBottom variant="h5" component="div">
                            ${item.attributes.price}
                          </Typography>
                          <Typography variant="body2">
                            {item.attributes.description}
                          </Typography>  
                           <Typography variant="body2">
                           {configJSON.status} {item.attributes.status? configJSON.approved:configJSON.pending}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    </Fragment>
                  )}
                )}
              </Grid>
            </Box> }
       

          </Container>
          <Dialog id="model_add" maxWidth="sm" fullWidth open={this.state.showModel} onClose={this.hideModal}>
            <DialogTitle>{configJSON.addProduct}</DialogTitle>
            <Divider />
            <DialogContent>
              <Box my={2}>
                <InputLabel>
                  {configJSON.title}
                </InputLabel>
                <Input
                  data-test-id={"form-title"}
                  type={"text"}
                  fullWidth={true}
                  value={this.state.title}
                  onChange={(event) => this.onChangeTitle(event.target.value)}
                />
              </Box>

              <Box my={2}>
                <InputLabel >
                  {configJSON.description}
                </InputLabel>
                <Input
                  data-test-id={"form-description"}
                  type={"text"}
                  fullWidth={true}
                  value={this.state.description}
                  onChange={(event) => this.onChangeDescription(event.target.value)}
                />
              </Box>
              <Box my={2}>
                <InputLabel >
                  {configJSON.price}
                </InputLabel>
                <Input
                 data-test-id={"form-price"}
                  type={"text"}
                  fullWidth={true}
                  value={this.state.price}
                  onChange={(event) => this.onChangePrice(event.target.value)}
                />
              </Box>
              <Box my={2}>
                <InputLabel>
                  {configJSON.quantity}
                </InputLabel>
                <Input
                  data-test-id={"form-quantity"}
                  type={"text"}
                  fullWidth={true}
                  value={this.state.quantity}
                  onChange={(event) => this.onChangeQuantity(event.target.value)}
                />
              </Box>
              <Box my={2}>
                <InputLabel >
                  {configJSON.productImages}
                </InputLabel>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  onChange={(event) => this.onChangeImage(event)}

                  type="file"
                />
                <label htmlFor="raised-button-file">
                  <Button variant="outlined" component="span" >
                    {configJSON.upload}
                  </Button>
                </label>
              </Box>

              <Box my={4} display="flex">
                {this.state.baseImages?.map((imges, index) => {
                  return (
                    <Fragment key={`unique-img-${index}`}>
                      <img style={Styles.ImgTagStyle} src={imges} alt="mainImg" />
                    </Fragment>
                  )
                })}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button data-test-id="cancel_modal_button" onClick={this.hideModal}>{configJSON.cancel} </Button>
              <Button
                onClick={this.postAddDataApi} id="add_product_button" variant="contained" color="secondary">{configJSON.btnExampleTitle} </Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </StyledEngineProvider>
      </div>
    );
  }
}
// Customizable Area Start

const Styles = {
  ImgTagStyle: {
    width: '100px',
    height: '100px',
    padding: '10px'
  },
}
// Customizable Area End
