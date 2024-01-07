// Loading.js
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Loading({ initialText }) {
  const transitionTexts = [
    "Analyzing",
    "Processing",
    "Evaluating",
    "Finalizing",
  ];
  const [currentText, setCurrentText] = useState(
    initialText || transitionTexts[0]
  );
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentText === "Finalizing") {
        clearInterval(intervalId); // Stop changing text when it reaches "Finalizing"
        return;
      }

      setTextIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % transitionTexts.length;
        setCurrentText(transitionTexts[nextIndex]);
        return nextIndex;
      });
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(intervalId);
  }, [currentText]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #6e8efb, #a777e3)",
      }}
    >
      <CircularProgress />
      <p style={{ marginTop: "20px" }}>{currentText}</p>
    </Box>
  );
}

export default Loading;
