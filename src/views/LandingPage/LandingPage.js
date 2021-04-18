import React, { useRef, useState, useReducer, useEffect } from "react";
import ReactPlayer from "react-player";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import {
  Box,
  Typography,
  Divider,
  Modal,
  Backdrop,
  Fade,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import axios from "axios";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);
const useChipStyles = makeStyles(() =>
  createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210,
    },
  })
);
const useLoaderStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: "100px 0",
    justifyContent: "center",
    alignItems: "center",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const initialState = { fetched: false };
const ROOT_URL = "http://127.0.0.1:5000";

function reducer(video, action) {
  switch (action.type) {
    case "fetched":
      return { fetched: true };
    case "reset":
      return { fetched: false };
    default:
      throw new Error();
  }
}

export default function LandingPage(props) {
  const classes = useStyles();
  const chipClasses = useChipStyles();
  const loaderClasses = useLoaderStyles();
  const { ...rest } = props;

  const [openModal, setOpenModal] = useState(false);
  const [attachedFile, setAttachedFile] = useState();
  const [modelProcessing, setModelProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fetchedUrl, setFetchedUrl] = useState();
  const [progress, setProgress] = React.useState(0);

  const [video, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 3
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const teamRef = useRef(null);
  const teamScroller = () =>
    teamRef.current.scrollIntoView({ behaviour: "smooth" });

  const handleOpenModal = () => {
    setErrorMessage("");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setErrorMessage("");
    setOpenModal(false);
  };

  const handleFileChange = (file) => {
    setErrorMessage("");
    setAttachedFile(file);
  };

  const handleProcessFile = async (file) => {
    let data = new FormData();
    data.append("file", attachedFile[0]);
    console.log(attachedFile[0]);
    console.log(data);
    setModelProcessing(true);
    await axios
      .post(`${ROOT_URL}/video`, data, {})
      .then((uploadResponse) => {
        setProgress(100);
        setFetchedUrl(uploadResponse.data);
        setModelProcessing(false);
        dispatch({
          type: "fetched",
        });
      })
      .catch((uploadError) => {
        setErrorMessage(uploadError.message);
        setModelProcessing(false);
        dispatch({
          type: "reset",
        });
      });
  };

  const handleUploadAnother = () => {
    dispatch({
      type: "reset",
    });
    setErrorMessage("");
    setOpenModal(false);
  };

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Computer Vision Group 9"
        rightLinks={<HeaderLinks teamScroller={teamScroller} />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        teamScroller={teamScroller}
        {...rest}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Model Demo</h2>
            <Divider />
            {video.fetched ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "20px",
                }}
              >
                <ReactPlayer
                  url={fetchedUrl}
                  controls
                  height="711px"
                  width="400px"
                />
                <Button
                  color="info"
                  size="lg"
                  onClick={handleUploadAnother}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: "20px" }}
                >
                  Back To Home
                </Button>
              </div>
            ) : (
              <div>
                {modelProcessing ? (
                  <div className={loaderClasses.root}>
                    <Box position="relative" display="inline-flex">
                      <CircularProgress
                        size={100}
                        variant="determinate"
                        value={progress}
                      />
                      <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Typography
                          variant="caption"
                          component="div"
                          color="textSecondary"
                        >
                          {`${Math.round(progress)}%`}
                        </Typography>
                      </Box>
                    </Box>
                  </div>
                ) : (
                  <div>
                    <h4
                      id="transition-modal-description"
                      style={{ marginBottom: "15px", color: "#999" }}
                    >
                      Please upload a video or image file of your choice:
                    </h4>
                    {errorMessage.length > 0 ? (
                      <Alert severity="error" style={{ marginBottom: "20px" }}>
                        {errorMessage}
                      </Alert>
                    ) : null}
                    <DropzoneArea
                      style={{ marginBottom: 100 }}
                      showPreviews={true}
                      filesLimit={1}
                      showPreviewsInDropzone={false}
                      useChipsForPreview
                      previewGridProps={{
                        container: { spacing: 1, direction: "row" },
                      }}
                      previewChipProps={{
                        classes: { root: chipClasses.previewChip },
                      }}
                      previewText="Uploaded video:"
                      maxFileSize={300000000}
                      acceptedFiles={["video/*"]}
                      dropzoneText={"Drag and drop an image here"}
                      onChange={handleFileChange}
                    />
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    disabled={modelProcessing}
                    color="info"
                    size="lg"
                    onClick={handleProcessFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginTop: "25px" }}
                  >
                    {modelProcessing ? "Processing Your Video" : "Upload Video"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Fade>
      </Modal>
      <Parallax filter image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6} style={{ maxWidth: "50%" }}>
              <h1 className={classes.title}>Deadlift Posture Estimator</h1>
              <h4>
                A computer vision model capable of giving fast & accurate
                feedback on deadlift stance, specifically in the back area.
              </h4>
              <br />
              <Button
                color="info"
                size="lg"
                onClick={handleOpenModal}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" style={{ marginRight: "10px" }} />
                Model Demo
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <Divider />
          <TeamSection teamRef={teamRef} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
