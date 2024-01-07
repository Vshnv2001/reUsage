import { useEffect, useState } from "react";
import "./App.css";
import FileUpload from "./components/fileUpload/fileUpload";
import DropdownWithContinue from "./components/dropdownWithContinue/dropdownWithContinue";
import JsonToCSV from "./components/jsonToCSV/jsonToCSV";

function App() {
  const [steps, setSteps] = useState(0);
  const [industryValues, setIndustryValues] = useState([]);
  const sampleIndustryValues = [
    { Problem: "P1", Solution: "S1" },
    { Problem: "P2", Solution: "S2" },
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
    return <DropdownWithContinue data={industryValues} />;
  }

  // Render preview page after user selects continue
  if (steps === 2) {
    console.log(steps);
    return <JsonToCSV jsonData={sampleIndustryValues} />;
  }
}

export default App;
