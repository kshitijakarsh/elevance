import React, { useState } from "react";
import axios from "axios";
import { Input } from "./components/Input";

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState();
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  function handleFileChange(event) {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
    setUploaded(true);
  }

  async function extractText() {
    setUploaded(false)
    setLoading(true);
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/submit",
        formData,
        {
          headers: { "Content-Type": "application/pdf" },
        }
      );

      setText(response.data);
      setLoading(false);
      setCompleted(true);
    } catch (error) {
      console.error("Error extracting text:", error);
    }
  }

  return (
    <>
      <div className="grid place-content-center mx-auto w-screen h-screen">
        <h1 className="mx-auto font-thin text-2xl">Look for jobs</h1>
        <br />
        <Input
          isUploaded={uploaded}
          handleFileChange={handleFileChange}
          isCompleted={completed}
          isLoading={loading}
        />

        <button
          className="m-4 h-12 w-52 grid place-content-center mx-auto rounded-lg drop-shadow-md border-solid border-2 bg-zinc-400 text-black hover:bg-zinc-600 hover:text-white"
          onClick={extractText}
        >
          {loading ? "uploading" : "upload"}
        </button>

        <br />

        <p>{JSON.stringify(text)}</p>
      </div>
    </>
  );
}

export default App;
