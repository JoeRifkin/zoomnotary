import React from "react";

// Customizable Area Start
import { Project } from "../model/Project";
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
  itemsList: Project[];
  selected: Project;
  onItemClick: (value: Project) => void;
  modalOnClose: () => void;
  // Customizable Area End
}

export const Projects: React.FC<Props> = ({
  modalIsVisible,
  itemsList,
  selected,
  onItemClick,
  modalOnClose,
}) => {
  // Customizable Area Start
  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h5">{configJSON.projectsLabel} :</Typography>
      {itemsList.length > 0 ? (
        itemsList.map((project: Project) => (
          <Box key={project.id}>
            <Box style={webStyle.qualificationBlock}>
              <Typography>{project.attributes.project_name}</Typography>
              <Typography>{`${project.attributes.start_date} ${configJSON.toLabel} ${project.attributes.end_date}`}</Typography>
              <Typography
                style={webStyle.learnMore}
                onClick={() => onItemClick(project)}
                data-testid={configJSON.btnProjectsShowMoreTestId}
              >
                {configJSON.showMore}
              </Typography>
            </Box>
          </Box>
        ))
      ) : (
        <p data-testid={configJSON.projectsEmptyTestId}>{configJSON.noProjectsLabel}</p>
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
                  {configJSON.projectDetailsLabel}
                </Typography>{" "}
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {`${configJSON.projectNameLabel}: ${selected.attributes.project_name}`}
                </Typography>{" "}

              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {`${configJSON.descriptionLabel}: ${selected.attributes.description}`}
                </Typography>{" "}

              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {`${configJSON.projectDurationLabel}: ${selected.attributes.start_date} ${configJSON.toLabel} ${selected.attributes.end_date}`}
                </Typography>

              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                <Typography variant="h6" gutterBottom display="inline">
                  {configJSON.urlLabel}:
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
