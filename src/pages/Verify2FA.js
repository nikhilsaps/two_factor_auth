import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { verifySMSOtp, sendSMSOtp, initRecaptcha } from "../firebase/firebaseAPI";

export default function Verify2FA() {
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp]         = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [resent, setResent]   = useState(false);

  const { uid, method, contact, phone } = location.state || {};

  // ✅ Guard
  if (!method || !contact) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <h4>Session expired.</h4>
          <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // ✅ Mask phone
  const maskContact = (value) => {
    if (!value) return "";
    return "xxxxxxx" + value.slice(-2);
  };

  // ✅ RESEND OTP
  const handleResend = async () => {
    try {
      setError("");
      setResent(false);

      initRecaptcha(); // 🔥 required
      await sendSMSOtp(phone);

      setResent(true);
    } catch (err) {
      setError(err.message || "Failed to resend OTP");
    }
  };

  // ✅ VERIFY OTP
  const handleVerify = async () => {
    try {
      setError("");
      setLoading(true);

      if (!otp || otp.length !== 6) {
        return setError("Enter a valid 6-digit OTP");
      }

      await verifySMSOtp(otp);

      navigate("/dashboard", {
        state: { uid, method, contact }
      });

    } catch (err) {
      if (err.message?.includes("invalid")) {
        setError("Invalid OTP. Please try again.");
      } else {
        setError(err.message || "Verification failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0" style={{ width: "500px", borderRadius: "20px" }}>
        <div className="card-body p-4 text-center">
          <h3 className="fw-bold mb-3">Verify Your Identity 🔐</h3>

          <p className="text-muted mb-4">
            Enter the 6-digit code sent to{" "}
            <span className="fw-semibold text-dark">
              {maskContact(contact)}
            </span>
          </p>

          {error && <div className="alert alert-danger py-2">{error}</div>}
          {resent && <div className="alert alert-success py-2">OTP resent successfully!</div>}

          <input
            type="text"
            maxLength="6"
            inputMode="numeric"
            className="form-control text-center mb-3"
            style={{
              fontSize: "24px",
              letterSpacing: "10px",
              borderRadius: "10px"
            }}
            placeholder="------"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          />

          <button
            onClick={handleVerify}
            className="btn btn-primary w-100 py-2 fw-semibold"
            style={{ borderRadius: "10px" }}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          {/* 🔥 REQUIRED FOR FIREBASE */}
          <div id="recaptcha"></div>

          <p className="mt-3 text-muted small">
            Didn't receive code?{" "}
            <span
              className="text-primary fw-semibold"
              style={{ cursor: "pointer" }}
              onClick={handleResend}
            >
              Resend
            </span>
          </p>

          <p className="mt-1 text-muted small">
            <span
              className="text-secondary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Back to Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}