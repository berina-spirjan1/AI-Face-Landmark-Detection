import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemash from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";
import useStyles from "./styles";

function App() {
  const classes = useStyles();

  const webCamRef = useRef(null);
  const canvasRef = useRef(null);

  async function runFacemesh() {
    const net = await facemash.load({
      inputResolution: {
        width: "640px",
        height: "480px",
      },
      scale: 0.8,
    });

    setInterval(() => {
      detectFace(net);
    }, 100);
  }

  async function detectFace(net) {
    if (
      typeof webCamRef.current !== "undefined" &&
      webCamRef.current !== null &&
      webCamRef.current.video.readyState === 4
    ) {
      const video = webCamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      video.width = videoWidth;
      video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = await net.estimateFaces(video);
    }
  }

  runFacemesh();
  return (
    <div className={classes.header}>
      <header>
        <Webcam ref={webCamRef} className={classes.container} />
        <canvas ref={canvasRef} className={classes.container} />
      </header>
    </div>
  );
}

export default App;
