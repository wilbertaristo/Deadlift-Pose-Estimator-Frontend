import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import SwapHoriz from "@material-ui/icons/SwapHoriz";
import PhotoLibrary from "@material-ui/icons/PhotoLibrary";
import Settings from "@material-ui/icons/Settings";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Project Specifications</h2>
          <h5 className={classes.description}></h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Input & Output"
              description="Input: RGB Image / A Video Frame"
              description2="Output: Bounding box coordinates, scores and the corresponding class detected in that particular frame / image"
              icon={SwapHoriz}
              iconColor="primary"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Dataset"
              description="We collected our own dataset by recording multiple videos of our team members and volunteers doing deadlifts."
              icon={PhotoLibrary}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Architecture"
              description="We used YOLOv4 Tiny Architecture which is very lightweight and thus suitable for real-time detection in browsers."
              icon={Settings}
              iconColor="info"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
