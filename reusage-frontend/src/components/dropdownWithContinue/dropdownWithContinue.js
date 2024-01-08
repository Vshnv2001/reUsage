import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Loading from "../loading/Loading";
import "./dropdownWithContinue.css"; // Import the CSS file
import axios from "axios"; // Import axios

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ContinueButton = styled(Button)({
  // Copy the style from your Upload button in fileUpload.js
  backgroundImage: "linear-gradient(45deg, #43a047, #76ff03)",
  color: "white",
  boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    backgroundImage: "linear-gradient(45deg, #388e3c, #64dd17)",
    transform: "translateY(-2px)",
    boxShadow: "0px 5px 7px rgba(0,0,0,0.3)",
  },
  height: "30px",
  lineHeight: "56px",
  marginTop: "10px",
});

function DropdownWithContinue({ data, setIndustryFilteredData, setSteps }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedOptions(typeof value === "string" ? value.split(",") : value);
  };

  const handleContinue = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/industry_selection",
        {
          industries: selectedOptions,
        }
      );

      const data = response.data;
      setIndustryFilteredData(data);
      setSteps(2);
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loading initialText={"Filtering your selections"} />
  ) : (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>
        Which industry are you interested in?
      </h1>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">
          Select Industry
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput label="Select Options" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {data.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={selectedOptions.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ContinueButton onClick={handleContinue}>Continue</ContinueButton>
    </div>
  );
}

export default DropdownWithContinue;
