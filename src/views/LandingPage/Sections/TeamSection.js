import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import kiat from "assets/img/faces/kiat.jpg";
import daniel from "assets/img/faces/daniel.jpg";
import wilb from "assets/img/faces/wilb.jpg";
import jeremy from "assets/img/faces/jeremy.jpg";
import joel from "assets/img/faces/joel.jpg";

const useStyles = makeStyles(styles);

export default function TeamSection(props) {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const { teamRef } = props;
  return (
    <div className={classes.section} style={{ paddingTop: "45px" }}>
      <h2 className={classes.title}>Our Team (Group 9)</h2>
      <div ref={teamRef}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={joel} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Joel Lim
                <br />
                <small className={classes.smallTitle}>1003504</small>
              </h4>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={jeremy} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Jeremy Ng
                <br />
                <small className={classes.smallTitle}>1003565</small>
              </h4>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={wilb} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Wilbert Aristo
                <br />
                <small className={classes.smallTitle}>1003742</small>
              </h4>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer style={{ justifyContent: "center" }}>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={kiat} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Tay Kiat Hong
                <br />
                <small className={classes.smallTitle}>1003305</small>
              </h4>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={daniel} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Daniel Teo
                <br />
                <small className={classes.smallTitle}>1003571</small>
              </h4>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
