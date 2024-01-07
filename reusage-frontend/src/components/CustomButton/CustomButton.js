import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const buttonHeight = "30px"; // Define a common height for buttons and text field

const StyledButton = styled(Button)({
  backgroundImage: "linear-gradient(45deg, #7b1fa2, #e91e63)", // Gradient for Choose File
  color: "white",
  boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    backgroundImage: "linear-gradient(45deg, #6a1b9a, #d81b60)", // Slightly darker gradient on hover
    transform: "translateY(-2px)",
    boxShadow: "0px 5px 7px rgba(0,0,0,0.3)",
  },
  height: buttonHeight,
  width: "500px",
  lineHeight: buttonHeight,
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "-35px",
});

function CustomButton({ text, handleSubmit }) {
  return <StyledButton onClick={handleSubmit}>{text}</StyledButton>;
}

export default CustomButton;
