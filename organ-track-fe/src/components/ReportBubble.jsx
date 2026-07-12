import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import ProgressRing from "./ProgressRing";

const ReportBubble = () => {
  const navigate = useNavigate();

  const [reportId, setReportId] = useState(() =>
    localStorage.getItem("pendingReportId"),
  );
  const [status, setStatus] = useState("pending"); // pending, processing, completed, failed
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const pollingRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // ---------- Helpers ----------
  const clearPendingReport = () => {
    localStorage.removeItem("pendingReportId");
    setReportId(null);
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  const stopProgressSimulation = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const simulateProgress = () => {
    stopProgressSimulation();
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressIntervalRef.current);
          return 90; // hold at 90% until real completion
        }
        return prev + Math.random() * 2;
      });
    }, 800);
  };

  const startPolling = (id) => {
    stopPolling();
    pollingRef.current = setInterval(async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/report-status/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        const newStatus = res.data.status;
        setStatus(newStatus);

        if (newStatus === "completed") {
          stopPolling();
          stopProgressSimulation();
          setProgress(100);
        } else if (newStatus === "failed") {
          stopPolling();
          stopProgressSimulation();
          setProgress(0);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 3000);
  };

  // ---------- Effects ----------
  // On mount, if reportId exists, start everything
  useEffect(() => {
    if (reportId) {
      simulateProgress();
      startPolling(reportId);
    }
    return () => {
      stopPolling();
      stopProgressSimulation();
    };
  }, [reportId]);

  useEffect(() => {
    const handleStorageChange = () => {
      const id = localStorage.getItem("pendingReportId");
      setReportId(id);
      // also reset progress if id changed
    };
    window.addEventListener("pendingReportChanged", handleStorageChange);
    return () =>
      window.removeEventListener("pendingReportChanged", handleStorageChange);
  }, []);

  // ---------- Handlers ----------
  const handleBubbleClick = () => {
    if (status === "completed") {
      clearPendingReport();
      navigate(`/`); // or your report route
    } else if (status === "failed") {
      setShowModal(true);
    } else {
      // pending / processing -> show modal with progress
      setShowModal(true);
    }
  };

  const handleRetry = async () => {
    setShowModal(false);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/retry-report/${reportId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );
      // Reset state and restart polling + simulation
      setProgress(0);
      setStatus("pending");
      stopPolling();
      stopProgressSimulation();
      simulateProgress();
      startPolling(reportId);
    } catch (err) {
      console.error("Retry failed", err);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    clearPendingReport(); // dismiss bubble forever
  };

  // ---------- Render logic ----------
  if (!reportId) return null;

  // Determine bubble content
  let bubbleContent;
  if (status === "completed") {
    bubbleContent = (
      <div style={{ position: "relative", width: 56, height: 56 }}>
        <svg width={56} height={56}>
          <circle cx={28} cy={28} r={23} fill="#4caf50" />
        </svg>
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 28,
            color: "white",
            fontWeight: "bold",
          }}
        >
          ✓
        </span>
      </div>
    );
  } else if (status === "failed") {
    bubbleContent = (
      <div style={{ position: "relative", width: 56, height: 56 }}>
        <svg width={56} height={56}>
          <circle cx={28} cy={28} r={23} fill="#f44336" />
        </svg>
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 28,
            color: "white",
            fontWeight: "bold",
          }}
        >
          ↻
        </span>
      </div>
    );
  } else {
    // pending or processing
    bubbleContent = <ProgressRing progress={progress} />;
  }

  return (
    <>
      {/* Floating bubble – top right corner */}
      <div
        onClick={handleBubbleClick}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          cursor: "pointer",
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        {bubbleContent}
      </div>

      {/* Modal overlay */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: 30,
              textAlign: "center",
              maxWidth: 320,
              width: "90%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {status === "failed" ? (
              <>
                <h3>Report generation failed</h3>
                <p>Would you like to try again?</p>
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <button
                    onClick={handleRetry}
                    style={{
                      padding: "8px 24px",
                      background: "#4caf50",
                      color: "white",
                      border: "none",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                  >
                    Try Again
                  </button>
                  <button
                    onClick={handleCancel}
                    style={{
                      padding: "8px 24px",
                      background: "#ccc",
                      border: "none",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>Generating your report</h3>
                <ProgressRing progress={progress} size={80} strokeWidth={6} />
                <p style={{ marginTop: 16 }}>Please wait…</p>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    marginTop: 16,
                    padding: "6px 20px",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ReportBubble;
