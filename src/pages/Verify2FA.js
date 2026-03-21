import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Verify2FA() {
  const navigate = useNavigate();
  const location = useLocation();

  // 👉 Get data passed from login (phone/email)
  const { method = "sms", contact = "9876543297" } = location.state || {};

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  // 🔐 Mask function
  const maskContact = (value) => {
    if (!value) return "";

    if (method === "sms") {
      return "xxxxxxx" + value.slice(-2);
    }

    if (method === "email") {
      const [name, domain] = value.split("@");
      return name[0] + "*****@" + domain;
    }

    return value;
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      return setError("Enter valid 6-digit OTP");
    }

    // 👉 later connect Firebase verify
    navigate("/dashboard");
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card shadow-lg border-0"
        style={{ width: "500px", borderRadius: "20px" }}
      >
        <div className="card-body p-4 text-center">
          <h3 className="fw-bold mb-3">Verify Your Identity 🔐</h3>

          <p className="text-muted mb-4">
            Enter the 6-digit code sent to{" "}
            <span className="fw-semibold text-dark">
              {maskContact(contact)}
            </span>
          </p>

          {/* ERROR */}
          {error && (
            <div className="alert alert-danger py-2">{error}</div>
          )}

          {/* OTP INPUT */}
          <input
            type="text"
            maxLength="6"
            className="form-control text-center mb-3"
            style={{
              fontSize: "24px",
              letterSpacing: "10px",
              borderRadius: "10px"
            }}
            placeholder="------"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          {/* VERIFY BUTTON */}
          <button
            onClick={handleVerify}
            className="btn btn-primary w-100 py-2 fw-semibold"
            style={{ borderRadius: "10px" }}
          >
            Verify
          </button>

          {/* RESEND */}
          <p className="mt-3 text-muted small">
            Didn’t receive code?{" "}
            <span
              className="text-primary fw-semibold"
              style={{ cursor: "pointer" }}
              onClick={() => alert("Resend logic here")}
            >
              Resend
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}