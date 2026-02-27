import { useState, useRef, useEffect } from "react";
import "./Signup.css";

export default function IdentityVerification({ onDone }) {
  const [status, setStatus] = useState("idle"); // idle | requesting | scanning | verified | denied
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const handleAllow = async () => {
    setStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStatus("scanning");

      // Simulate face detection after 3 seconds
      setTimeout(() => {
        setStatus("verified");
        // Stop camera after verified
        stream.getTracks().forEach((t) => t.stop());
      }, 3000);
    } catch (err) {
      setStatus("denied");
    }
  };

  const isVerified = status === "verified";
  const isScanning = status === "scanning";
  const isDenied   = status === "denied";

  return (
    <div className="identity-card">
      {/* Top icon */}
      <div className={`identity-card__icon ${isVerified ? "identity-card__icon--done" : "identity-card__icon--pending"}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      <p className="identity-card__title">IDENTITY VERIFICATION</p>

      {/* Camera box */}
      <div className="identity-card__camera">
        {/* Live video feed */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: isScanning || isVerified ? "block" : "none",
            borderRadius: "8px",
          }}
        />

        {/* Circle overlay */}
        <div className={`identity-card__circle ${
          isVerified ? "identity-card__circle--green" :
          isScanning ? "identity-card__circle--scanning" :
          "identity-card__circle--red"
        }`} />

        {/* Status badge */}
        <span className="identity-card__loading">
          {isScanning ? "Scanning..." : isVerified ? "Done ✓" : "Loading..."}
        </span>
      </div>

      {/* Bottom content */}
      {isVerified && (
        <>
          <p className="identity-card__status"><strong>Identity Verified Successfully!</strong></p>
          <div className="identity-card__progress">
            <div className="identity-card__progress-bar identity-card__progress-bar--done" />
          </div>
          <button className="identity-card__btn-allow" onClick={onDone}>Continue →</button>
        </>
      )}

      {isDenied && (
        <>
          <p className="identity-card__status" style={{ color: "#e05555" }}>
            Camera access denied. Please allow camera and try again.
          </p>
          <button className="identity-card__btn-allow" onClick={handleAllow}>Try Again</button>
          <div className="identity-card__progress">
            <div className="identity-card__progress-bar identity-card__progress-bar--pending" />
          </div>
        </>
      )}

      {(status === "idle" || status === "requesting") && (
        <>
          <p className="identity-card__status">Use Camera</p>
          <button
            className="identity-card__btn-allow"
            onClick={handleAllow}
            disabled={status === "requesting"}
          >
            {status === "requesting" ? "Opening camera..." : "Allow"}
          </button>
          <div className="identity-card__progress">
            <div className="identity-card__progress-bar identity-card__progress-bar--pending" />
          </div>
        </>
      )}

      {isScanning && (
        <>
          <p className="identity-card__status">Scanning your face...</p>
          <div className="identity-card__progress">
            <div className="identity-card__progress-bar identity-card__progress-bar--scanning" />
          </div>
        </>
      )}
    </div>
  );
}