import { useEffect, useState } from "react";
import "./App.css";
import FileUpload from "./components/fileUpload/fileUpload";
import DropdownWithContinue from "./components/dropdownWithContinue/dropdownWithContinue";
import JsonToCSV from "./components/jsonToCSV/jsonToCSV";

function App() {
  const [steps, setSteps] = useState(0);
  const [industryValues, setIndustryValues] = useState([]);
  const sampleValues = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  // File ingestion
  if (steps === 0) {
    return (
      <FileUpload setIndustryValues={setIndustryValues} setSteps={setSteps} />
    );
  }

  // Render dropdown after GPT returns the industry values
  if (steps === 1) {
    console.log(steps);
    return <DropdownWithContinue data={sampleValues} />;
  }

  // Render preview page after user selects continue
}

export default App;
