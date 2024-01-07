import React, { useState } from "react";
import axios from "axios";

function FileUpload({ setIndustryValues, setSteps }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".csv" />
        <button type="submit">Upload</button>
      </form>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default FileUpload;
