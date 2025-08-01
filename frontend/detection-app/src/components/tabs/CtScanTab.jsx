import React, { useEffect, useState } from 'react';
import './CtScanTab.css';

const CtScanTab = ({ patientId }) => {
  const [scans, setScans] = useState([]);
  const [selectedScan, setSelectedScan] = useState(null);

  useEffect(() => {
    if (!patientId) return;
    fetchScans();
  }, [patientId]);

  const fetchScans = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:8080/api/diagnosis/patient/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.error("Scan fetch failed:", res.status);
        setScans([]);
        return;
      }

      const data = await res.json();
      setScans(data);
    } catch (error) {
      console.error("Scan fetch error:", error);
    }
  };

  return (
    <div className="scan-tab">
      {scans.length === 0 ? (
        <p className="no-scans">No CT scans available.</p>
      ) : (
        <div className="scan-grid">
          {scans.map((scan, i) => {
            if (!scan.output_path || !scan.output_path.includes("LungScans")) return null;

            const filename = scan.output_path.split('/').pop() || '';
            const parts = filename.replace('.jpg', '').split('_');
            const date = parts[1] || 'Unknown';
            const time = parts[2]?.replaceAll('-', ':') || '';

            return (
              <div key={i} className="scan-item" onClick={() => setSelectedScan(scan)}>
                <div className="scan-date">{date} {time}</div>
                <img
                  src={`http://localhost:8080/lungscans/${scan.output_path
                    ?.split('LungScans')[1]
                    ?.replaceAll('\\', '/')
                    ?.replace(/^\/+/, '')}`}
                  alt={`CT Scan ${i}`}
                  className="scan-thumb"
                />
                <div className="scan-confidence">
                  Confidence: {scan.confidence_score}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedScan && (
        <div className="modal-overlay" onClick={() => setSelectedScan(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-x" onClick={() => setSelectedScan(null)}>×</button>
            <h3>CT Scan Detail</h3>
            <p><strong>Date:</strong> {
              selectedScan.diagnosis_date
                ? new Date(selectedScan.diagnosis_date).toLocaleString()
                : 'Unknown'
            }</p>
            <p><strong>Confidence:</strong> {selectedScan.confidence_score}</p>
            <img
              src={`http://localhost:8080/lungscans/${selectedScan.output_path
                ?.split('LungScans')[1]
                ?.replaceAll('\\', '/')
                ?.replace(/^\/+/, '')}`}
              alt="Scan"
              className="modal-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CtScanTab;
