import React from "react";

// Customizable Area Start
import { PublicationPatent } from "../model/PublicationPatent";
import { Box, Button, Modal, Typography } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { configJSON } from "../EducationalUserProfileController";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});

const webStyle = {
  imageStyle: {
    width: 100,
  },
  qualificationBlock: {
    marginTop: 40,
  },
  learnMore: {
    color: "#0000FF",
    cursor: "pointer",
  },
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Customizable Area End

interface Props {
  // Customizable Area Start
  modalIsVisible: boolean;
  itemsList: PublicationPatent[];
  selected: PublicationPatent;
  onItemClick: (value: PublicationPatent) => void;
  modalOnClose: () => void;
  // Customizable Area End
}

export const PublicationPatents: React.FC<Props> = ({
  modalIsVisible,
  itemsList,
  selected,
  onItemClick,
  modalOnClose,
}) => {
  // Customizable Area Start
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h5">{configJSON.publicationPatentLabel} :</Typography>
      {itemsList.length > 0 ? (
        itemsList.map((patent: PublicationPatent) => {
          return (
            <Box key={patent.id}>
              <Box style={webStyle.qualificationBlock}>
                <Typography>{`${configJSON.titleLabel}: ${patent.attributes.title}`}</Typography>
                <Typography>{`${configJSON.publicationsLabel}: ${patent.attributes.publication}`}</Typography>
                <Typography>{`${configJSON.authorLabel}: ${patent.attributes.authors}`}</Typography>
                <Typography
                  style={webStyle.learnMore}
                  onClick={() => onItemClick(patent)}
                  data-testid={configJSON.btnPatentsShowMoreTestId}
                >
                  show more
                </Typography>
              </Box>
            </Box>
          );
        })
      ) : (
        <p data-testid={configJSON.patentsEmptyTestId}>
          {configJSON.patentsEmptyText}
        </p>
      )}
      <Modal
        open={modalIsVisible}
        onClose={modalOnClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {selected && (
            <Box sx={{ minHeight: 250 }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                align="center"
              >
                <Typography variant="h5" gutterBottom display="inline">
                  {configJSON.patentDetailsLabel}
                </Typography>{" "}
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {` Title: ${selected.attributes.title}`}
                </Typography>{" "}
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {` Publication: ${selected.attributes.publication}`}
                </Typography>{" "}
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {` Author: ${selected.attributes.authors}`}
                </Typography>
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {` Description: ${selected.attributes.description}`}
                </Typography>
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  Url:{" "}
                  <a href={selected.attributes.url}>
                    {`${selected.attributes.url}`}
                  </a>
                </Typography>
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0px",
            }}
          >
            <Button
              data-test-id="btnCloseModal"
              variant="contained"
              onClick={modalOnClose}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );

  // Customizable Area End
};

// Customizable Area Start
// Customizable Area End
