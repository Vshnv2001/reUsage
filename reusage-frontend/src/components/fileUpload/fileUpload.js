import React, { useState } from "react";
import axios from "axios";
import "./fileUpload.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Loading from "../loading/Loading";

const buttonHeight = "30px"; // Define a common height for buttons and text field

const Input = styled("input")({
  display: "none",
});

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
  lineHeight: buttonHeight,
});

const UploadButton = styled(Button)({
  backgroundImage: "linear-gradient(45deg, #43a047, #76ff03)", // Gradient for Upload
  color: "white",
  boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    backgroundImage: "linear-gradient(45deg, #388e3c, #64dd17)", // Slightly darker gradient on hover
    transform: "translateY(-2px)",
    boxShadow: "0px 5px 7px rgba(0,0,0,0.3)",
  },
  height: buttonHeight,
  lineHeight: buttonHeight,
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    height: buttonHeight,
    alignItems: "center", // Center align the text vertically
    "& input": {
      height: "calc(100% - 20px)", // Adjust input height within the TextField
    },
  },
});

function FileUpload({ setIndustryValues, setSteps }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // Set the file name
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIndustryValues(response.data.industryValues);
      setSteps(1);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setLoading(false);
  };

  return loading ? (
    <Loading initialText={"Finding industries to create your filter..."} />
  ) : (
    <div className="fileUploadContainer">
      <h1>AI Idea Evaluator</h1>
      <form onSubmit={handleSubmit} className="fileUploadForm">
        <label htmlFor="contained-button-file">
          <Input
            accept=".csv"
            id="contained-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <StyledButton variant="contained" component="span">
            Choose File
          </StyledButton>
        </label>
        <StyledTextField
          id="file-name"
          variant="outlined"
          disabled
          value={fileName}
          placeholder="No file chosen"
          style={{
            marginLeft: "10px",
            marginRight: "10px",
            width: "350px",
          }}
        />
        <UploadButton variant="contained" type="submit">
          Upload
        </UploadButton>
      </form>
    </div>
  );
}

export default FileUpload;
