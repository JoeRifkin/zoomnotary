import React from "react";

// Customizable Area Start
import { Award } from "../model/Award";
import { Box, Button, Modal, Typography } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

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

import { configJSON } from "../EducationalUserProfileController";

interface Props {
  // Customizable Area Start
  modalIsVisible: boolean;
  itemsList: Award[];
  selected: Award;
  onItemClick: (value: Award) => void;
  modalOnClose: () => void;
  dateFormatter: (value: string) => string;
  // Customizable Area End
}

export const Awards: React.FC<Props> = ({
  modalIsVisible,
  itemsList,
  selected,
  onItemClick,
  modalOnClose,
  dateFormatter
}) => {
  // Customizable Area Start
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h5">{configJSON.awardsLabel} :</Typography>
      {itemsList.length > 0 ? (
        itemsList.map((award: Award) => {
          return (
            <Box key={award.id}>
              <Box style={webStyle.qualificationBlock}>
                <Typography>{`${configJSON.titleLabel}: ${award.attributes.title}`}</Typography>
                <Typography>{`${configJSON.issueDateLabel}: ${dateFormatter(award.attributes.issue_date)}`}</Typography>
                <Typography
                  style={webStyle.learnMore}
                  onClick={() => onItemClick(award)}
                  data-testid={configJSON.btnAwardsShowMoreTestId}
                >
                  {configJSON.showMore}
                </Typography>
              </Box>
            </Box>
          );
        })
      ) : (
        <p data-testid={configJSON.awardsEmptyTestId}>{configJSON.noAwardsLabel}</p>
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
                  {configJSON.awardDetailsLabel}
                </Typography>
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {`${configJSON.titleLabel}: ${selected.attributes.title}`}
                </Typography>
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {`${configJSON.associatedWithLabel}: ${selected.attributes.associated_with}`}
                </Typography>
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {`${configJSON.issuerLabel}: ${selected.attributes.issuer}`}
                </Typography>
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {`${configJSON.descriptionLabel}: ${selected.attributes.description}`}
                </Typography>
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {`${configJSON.issueDateLabel}: ${dateFormatter(selected.attributes.issue_date)}`}
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
              {configJSON.closeText}
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
