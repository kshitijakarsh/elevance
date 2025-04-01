import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState()

  function handleFileChange(event) {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  }

  async function extractText() {
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3000/submit", formData, {
        headers: { "Content-Type": "application/pdf" },
      });
      setText(response.data);
      
    } catch (error) {
      console.error("Error extracting text:", error);
    }
  }

  return (
    <>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={extractText}>Upload</button>
      <p>{JSON.stringify(text)}</p>
    </>
  );
}

export default App;
