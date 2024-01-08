import { useEffect, useState } from "react";
import "./App.css";
import FileUpload from "./components/fileUpload/fileUpload";
import DropdownWithContinue from "./components/dropdownWithContinue/dropdownWithContinue";
import JsonToCSV from "./components/jsonToCSV/jsonToCSV";
import CustomButton from "./components/CustomButton/CustomButton";

function App() {
  const [steps, setSteps] = useState(0);
  const [industryValues, setIndustryValues] = useState([]);
  const [industryFilteredData, setIndustryFilteredData] = useState([]);
  const [relevantData, setRelevantData] = useState([]); // Data filtered by relevance
  const sampleIndustryValues = [
    { Problem: "P1", Solution: "S1", Industry: "I1" },
    { Problem: "P2", Solution: "S2", Industry: "I2" },
    { Problem: "P3", Solution: "S3", Industry: "I3" },
    { Problem: "P4", Solution: "S4", Industry: "I4" },
    { Problem: "P5", Solution: "S5", Industry: "I5" },
    { Problem: "P6", Solution: "S6", Industry: "I6" },
    { Problem: "P7", Solution: "S7", Industry: "I7" },
    { Problem: "P8", Solution: "S8", Industry: "I8" },
    { Problem: "P9", Solution: "S9", Industry: "I9" },
    { Problem: "P10", Solution: "S10", Industry: "I10" },
    { Problem: "P11", Solution: "S11", Industry: "I11" },
    { Problem: "P12", Solution: "S12", Industry: "I12" },
    { Problem: "P13", Solution: "S13", Industry: "I13" },
    { Problem: "P14", Solution: "S14", Industry: "I14" },
    { Problem: "P15", Solution: "S15", Industry: "I15" },
    { Problem: "P16", Solution: "S16", Industry: "I16" },
    { Problem: "P17", Solution: "S17", Industry: "I17" },
    { Problem: "P18", Solution: "S18", Industry: "I18" },
    { Problem: "P19", Solution: "S19", Industry: "I19" },
    { Problem: "P20", Solution: "S20", Industry: "I20" },
    { Problem: "P21", Solution: "S21", Industry: "I21" },
    { Problem: "P22", Solution: "S22", Industry: "I22" },
    { Problem: "P23", Solution: "S23", Industry: "I23" },
    { Problem: "P24", Solution: "S24", Industry: "I24" },
    { Problem: "P25", Solution: "S25", Industry: "I25" },
    { Problem: "P10", Solution: "S10", Industry: "I10" },
    { Problem: "P11", Solution: "S11", Industry: "I11" },
    { Problem: "P12", Solution: "S12", Industry: "I12" },
    { Problem: "P13", Solution: "S13", Industry: "I13" },
    { Problem: "P14", Solution: "S14", Industry: "I14" },
    { Problem: "P15", Solution: "S15", Industry: "I15" },
    { Problem: "P16", Solution: "S16", Industry: "I16" },
    { Problem: "P17", Solution: "S17", Industry: "I17" },
    { Problem: "P18", Solution: "S18", Industry: "I18" },
    { Problem: "P19", Solution: "S19", Industry: "I19" },
    { Problem: "P20", Solution: "S20", Industry: "I20" },
    { Problem: "P21", Solution: "S21", Industry: "I21" },
    { Problem: "P22", Solution: "S22", Industry: "I22" },
    { Problem: "P23", Solution: "S23", Industry: "I23" },
    { Problem: "P24", Solution: "S24", Industry: "I24" },
    { Problem: "P25", Solution: "S25", Industry: "I25" },
    { Problem: "P10", Solution: "S10", Industry: "I10" },
    { Problem: "P11", Solution: "S11", Industry: "I11" },
    { Problem: "P12", Solution: "S12", Industry: "I12" },
    { Problem: "P13", Solution: "S13", Industry: "I13" },
    { Problem: "P14", Solution: "S14", Industry: "I14" },
    { Problem: "P15", Solution: "S15", Industry: "I15" },
    { Problem: "P16", Solution: "S16", Industry: "I16" },
    { Problem: "P17", Solution: "S17", Industry: "I17" },
    { Problem: "P18", Solution: "S18", Industry: "I18" },
    { Problem: "P19", Solution: "S19", Industry: "I19" },
    { Problem: "P20", Solution: "S20", Industry: "I20" },
    { Problem: "P21", Solution: "S21", Industry: "I21" },
    { Problem: "P22", Solution: "S22", Industry: "I22" },
    { Problem: "P23", Solution: "S23", Industry: "I23" },
    { Problem: "P24", Solution: "S24", Industry: "I24" },
    { Problem: "P25", Solution: "S25", Industry: "I25" },
    { Problem: "P10", Solution: "S10", Industry: "I10" },
    { Problem: "P11", Solution: "S11", Industry: "I11" },
    { Problem: "P12", Solution: "S12", Industry: "I12" },
    { Problem: "P13", Solution: "S13", Industry: "I13" },
    { Problem: "P14", Solution: "S14", Industry: "I14" },
    { Problem: "P15", Solution: "S15", Industry: "I15" },
    { Problem: "P16", Solution: "S16", Industry: "I16" },
    { Problem: "P17", Solution: "S17", Industry: "I17" },
    { Problem: "P18", Solution: "S18", Industry: "I18" },
    { Problem: "P19", Solution: "S19", Industry: "I19" },
    { Problem: "P20", Solution: "S20", Industry: "I20" },
    { Problem: "P21", Solution: "S21", Industry: "I21" },
    { Problem: "P22", Solution: "S22", Industry: "I22" },
    { Problem: "P23", Solution: "S23", Industry: "I23" },
    { Problem: "P24", Solution: "S24", Industry: "I24" },
    { Problem: "P25", Solution: "S25", Industry: "I25" },
    { Problem: "P10", Solution: "S10", Industry: "I10" },
    { Problem: "P11", Solution: "S11", Industry: "I11" },
    { Problem: "P12", Solution: "S12", Industry: "I12" },
    { Problem: "P13", Solution: "S13", Industry: "I13" },
    { Problem: "P14", Solution: "S14", Industry: "I14" },
    { Problem: "P15", Solution: "S15", Industry: "I15" },
    { Problem: "P16", Solution: "S16", Industry: "I16" },
    { Problem: "P17", Solution: "S17", Industry: "I17" },
    { Problem: "P18", Solution: "S18", Industry: "I18" },
    { Problem: "P19", Solution: "S19", Industry: "I19" },
    { Problem: "P20", Solution: "S20", Industry: "I20" },
    { Problem: "P21", Solution: "S21", Industry: "I21" },
    { Problem: "P22", Solution: "S22", Industry: "I22" },
    { Problem: "P23", Solution: "S23", Industry: "I23" },
    { Problem: "P24", Solution: "S24", Industry: "I24" },
    { Problem: "P25", Solution: "S25", Industry: "I25" },
    { Problem: "P10", Solution: "S10", Industry: "I10" },
    { Problem: "P11", Solution: "S11", Industry: "I11" },
    { Problem: "P12", Solution: "S12", Industry: "I12" },
    { Problem: "P13", Solution: "S13", Industry: "I13" },
    { Problem: "P14", Solution: "S14", Industry: "I14" },
    { Problem: "P15", Solution: "S15", Industry: "I15" },
    { Problem: "P16", Solution: "S16", Industry: "I16" },
    { Problem: "P17", Solution: "S17", Industry: "I17" },
    { Problem: "P18", Solution: "S18", Industry: "I18" },
    { Problem: "P19", Solution: "S19", Industry: "I19" },
    { Problem: "P20", Solution: "S20", Industry: "I20" },
    { Problem: "P21", Solution: "S21", Industry: "I21" },
    { Problem: "P22", Solution: "S22", Industry: "I22" },
    { Problem: "P23", Solution: "S23", Industry: "I23" },
    { Problem: "P24", Solution: "S24", Industry: "I24" },
    { Problem: "P25", Solution: "S25", Industry: "I25" },
    { Problem: "P10", Solution: "S10", Industry: "I10" },
    { Problem: "P11", Solution: "S11", Industry: "I11" },
    { Problem: "P12", Solution: "S12", Industry: "I12" },
    { Problem: "P13", Solution: "S13", Industry: "I13" },
    { Problem: "P14", Solution: "S14", Industry: "I14" },
    { Problem: "P15", Solution: "S15", Industry: "I15" },
    { Problem: "P16", Solution: "S16", Industry: "I16" },
    { Problem: "P17", Solution: "S17", Industry: "I17" },
    { Problem: "P18", Solution: "S18", Industry: "I18" },
    { Problem: "P19", Solution: "S19", Industry: "I19" },
    { Problem: "P20", Solution: "S20", Industry: "I20" },
    { Problem: "P21", Solution: "S21", Industry: "I21" },
    { Problem: "P22", Solution: "S22", Industry: "I22" },
    { Problem: "P23", Solution: "S23", Industry: "I23" },
    { Problem: "P24XXXXXXXXXXXXXxx", Solution: "S24", Industry: "I24" },
    { Problem: "P25XXXXXXXXXXXXXx", Solution: "S25", Industry: "I25" },
  ];

  // File ingestion
  if (steps === 0) {
    return (
      <FileUpload setIndustryValues={setIndustryValues} setSteps={setSteps} />
    );
  }

  // Render dropdown after GPT returns the industry values
  if (steps === 1) {
    console.log(steps);
    return (
      <DropdownWithContinue
        data={industryValues}
        setIndustryFilteredData={setIndustryFilteredData}
        setSteps={setSteps}
      />
    );
  }

  // Render industry filtered page after user selects continue
  if (steps === 2) {
    console.log(steps);
    return (
      <div style={{ display: "flex", "flex-direction": "column" }}>
        <JsonToCSV jsonData={industryFilteredData} />
      </div>
    );
  }

  // Render relevance filtered page after user selects "Get Relevance Scores" with tool tip!
  if (steps === 3) {
    console.log(steps);
    return <JsonToCSV jsonData={sampleIndustryValues} />;
  }

  // Render Market Size scores after user selects "Get Market Size Scores" with tool
  // (steps === 4) {

  // Render final page after user selects "Enter score thresholds"

  // Render final page after user selects "Download CSV"
}

export default App;
