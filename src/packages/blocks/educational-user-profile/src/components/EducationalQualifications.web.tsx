import React from "react";

// Customizable Area Start
import { EducationalQualification } from "../model/EducationalQualification";
import { Box, Typography } from "@material-ui/core";
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
};

// Customizable Area End

interface Props {
  // Customizable Area Start
  itemsList: EducationalQualification[];
  // Customizable Area End
}

export const EducationalQualifications: React.FC<Props> = ({ itemsList }) => {
  // Customizable Area Start
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box style={webStyle.qualificationBlock}>
          <Typography variant="h5">{configJSON.educationalTitle}</Typography>
          {itemsList.length > 0 ? (
            itemsList.map(
              (educationQualification: EducationalQualification) => {
                return (
                  <div
                    key={educationQualification.id}
                    style={{ marginTop: 20 }}
                    data-testid={configJSON.qualificationsListItemTestId}
                  >
                    <Typography>
                      {educationQualification.attributes.school_name}
                    </Typography>
                    <Typography>
                      {educationQualification.attributes.degree_name}
                    </Typography>
                    <Typography>{`${configJSON.gradesLabel}: ${educationQualification.attributes.grades}`}</Typography>
                    <Typography>{`${configJSON.durationLabel}: ${educationQualification.attributes.start_date} ${configJSON.toLabel} ${educationQualification.attributes.end_date}`}</Typography>
                  </div>
                );
              }
            )
          ) : (
            <p data-testid={configJSON.qualificationsEmptyTestId}>
              {configJSON.noQualiText}
            </p>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
  // Customizable Area End
};

// Customizable Area Start
// Customizable Area End
