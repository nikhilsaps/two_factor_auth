import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {  loginUser,
  signupUser,
  triggerMFA,
  verifySMSOtp,
  verifyEmailOtp,
  initRecaptcha
} from "../firebase/firebaseAPI";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("email");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // STEP 1 → SEND OTP
  const handleSendOtp = () => {
    setError("");

    if (!contact) return setError("Enter email or phone");

    if (method === "email" && !validateEmail(contact)) {
      return setError("Enter valid email");
    }

    if (method === "phone" && contact.length < 10) {
      return setError("Enter valid phone number");
    }

    console.log("Send OTP to:", contact);
    setStep(2);
  };

  // STEP 2 → VERIFY OTP
  const handleVerifyOtp = () => {
    setError("");

    if (otp.length !== 6) {
      return setError("Enter valid 6-digit OTP");
    }

    console.log("OTP Verified");
    setStep(3);
  };

  // STEP 3 → RESET PASSWORD
  const handleResetPassword = () => {
    setError("");

    if (newPassword.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    console.log("Password reset success");
    navigate("/");
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card shadow-lg border-0"
        style={{ width: "500px", borderRadius: "20px" }}
      >
        <div className="card-body p-4">

          <h4 className="text-center fw-bold mb-3">
            Forgot Password 🔐
          </h4>

          {error && (
            <div className="alert alert-danger py-2">{error}</div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <p className="text-muted text-center">
                Choose how you want to receive OTP
              </p>

              {/* METHOD SELECT */}
              <div className="mb-3">
                <div className="form-check">
                  <input
                    type="radio"
                    name="method"
                    id="fp-email"
                    className="form-check-input"
                    checked={method === "email"}
                    onChange={() => setMethod("email")}
                  />
                  <label htmlFor="fp-email" className="form-check-label">
                    Email
                  </label>
                </div>

                <div className="form-check">
                  <input
                    type="radio"
                    name="method"
                    id="fp-phone"
                    className="form-check-input"
                    checked={method === "phone"}
                    onChange={() => setMethod("phone")}
                  />
                  <label htmlFor="fp-phone" className="form-check-label">
                    Phone Number
                  </label>
                </div>
              </div>

              {/* INPUT */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                <label>
                  {method === "email"
                    ? "Enter Email"
                    : "Enter Phone Number"}
                </label>
              </div>

              <button
                onClick={handleSendOtp}
                className="btn btn-primary w-100"
              >
                Send OTP
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <p className="text-muted text-center">
                Enter the OTP sent to your {method}
              </p>

              <input
                className="form-control text-center mb-3"
                placeholder="------"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ letterSpacing: "10px", fontSize: "20px" }}
              />

              <button
                onClick={handleVerifyOtp}
                className="btn btn-primary w-100"
              >
                Verify OTP
              </button>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <p className="text-muted text-center">
                Set your new password
              </p>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <label>New Password</label>
              </div>

              <button
                onClick={handleResetPassword}
                className="btn btn-success w-100"
              >
                Reset Password
              </button>
            </>
          )}

          {/* BACK TO LOGIN */}
          <p className="text-center mt-3 mb-0">
            Remember your password?{" "}
            <span
              className="text-primary fw-semibold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}