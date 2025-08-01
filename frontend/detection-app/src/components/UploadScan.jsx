import React, { useState, useEffect } from "react";
import "../styles/UploadScan.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const UploadScan = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patientId, setPatientId] = useState("");
  const [message, setMessage] = useState("");
  const [resultInfo, setResultInfo] = useState(null);
  const navigate = useNavigate();

  // fetch the patient ID based on name and surname
  useEffect(() => {
    const fetchPatientId = async () => {
      if (!name || !surname) {
        setPatientId("");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8080/api/patient/find?name=${name}&surname=${surname}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setPatientId(data.patientId);
        } else {
          setPatientId("Patient not found");
        }
      } catch (err) {
        setPatientId("Error fetching patient ID");
      }
    };

    fetchPatientId();
  }, [name, surname]);

  // add file and send it to the backend
  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!file || !name || !surname) {
      setMessage("Please fill in all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("ctImage", file);
    formData.append("name", name);
    formData.append("surname", surname);

    try {
      const response = await fetch("http://localhost:8080/api/diagnosis/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      // check if the response contains a diagnosis
      if (data && data.diagnosis) {
        setMessage("");
        setResultInfo({
          confidence: data.diagnosis.confidence_score,
          imagePath: data.diagnosis.output_path,
          name,
          surname,
          patientId,
        });

      // Store the latest diagnosis in localStorage
        localStorage.setItem("latestDiagnosis", JSON.stringify({
          name,
          surname,
          confidence: data.diagnosis.confidence_score,
          date: new Date().toISOString()
        }));

        // cleanup
        setName("");
        setSurname("");
        setFile(null);
        setPatientId("");
      } else {
        setMessage("Error: Diagnosis unsuccessful!");
        setResultInfo(null);
      }
    } catch (err) {
      setMessage("Failed to upload scan. Please try again.");
      setResultInfo(null);
    }
  };

  return (
    <>
      <Navbar />

      <div className="upload-page-wrapper">
        <div className={`upload-sections ${resultInfo ? "with-result" : ""}`}>
          <div className="upload-left">
            <h2 className="upload-title">Upload CT Scan</h2>
            <form onSubmit={handleUpload} className="upload-form">
              <input
                type="text"
                placeholder="Patient Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Patient Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              {patientId && <p className="patient-id">Patient ID: {patientId}</p>}

              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button
                type="submit"
                disabled={!patientId || patientId === "Patient not found"}
              >
                Upload
              </button>
            </form>
            {message && <p className="upload-message">{message}</p>}
          </div>

          {resultInfo && (
            <div className="upload-right">
              <div className="result-box">
                <h3>Result Information</h3>
                <p><strong>Patient:</strong> {resultInfo.name} {resultInfo.surname}</p>
                <p><strong>Patient ID:</strong> {resultInfo.patientId}</p>
                <p className="diagnosis-result">
                  Diagnosis:{" "}
                  {resultInfo.confidence > 0.5 ? (
                    <span style={{ color: "#e53935" }}>
                      High Risk — Further evaluation recommended
                    </span>
                  ) : (
                    <span style={{ color: "#4caf50" }}>
                      Low Risk
                    </span>
                  )}
                </p>

                <p>Confidence Score: {resultInfo.confidence}</p>
                <p>Diagnosis Date: {new Date().toLocaleDateString()}</p>
              </div>

              {resultInfo.imagePath && (
                <div className="image-preview">
                  <h4>Detected CT Image</h4>
                  <img
                    src={`http://localhost:8080/lungscans/${resultInfo.imagePath.split("LungScans/")[1]}`}
                    alt="Detected scan"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UploadScan;
