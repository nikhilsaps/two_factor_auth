import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfa, setMfa] = useState([]);
  const [error, setError] = useState("");

  // Email validation
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle checkbox
  const toggleMFA = (method) => {
    setMfa((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  };

  const handleSignup = () => {
    setError("");

    if (!name || !email || !password) {
      return setError("All fields are required");
    }

    if (!validateEmail(email)) {
      return setError("Enter a valid email");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (mfa.length === 0) {
      return setError("Select at least one MFA method");
    }

    console.log({ name, email, password, mfa });

    // 👉 Later connect Firebase here
    navigate("/");
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card shadow-lg border-0"
        style={{ width: "600px", borderRadius: "20px" }}
      >
        <div className="card-body p-4">
          <h3 className="text-center mb-4 fw-bold">
            Create Your Account 🚀
          </h3>

          {/* ERROR */}
          {error && (
            <div className="alert alert-danger py-2">{error}</div>
          )}

          {/* Name */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className={`form-control ${error && !name ? "is-invalid" : ""}`}
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Full Name</label>
          </div>

          {/* Email */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className={`form-control ${
                error && !validateEmail(email) ? "is-invalid" : ""
              }`}
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email address</label>
          </div>

          {/* Password */}
          <div className="form-floating mb-3">
            <input
              type="password"
              className={`form-control ${
                error && password.length < 6 ? "is-invalid" : ""
              }`}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>

          {/* MFA Selection */}
<div className="mb-3">
  <p className="fw-semibold mb-2">Select MFA Method</p>

  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="mfa"
      id="mfa-sms"
      value="sms"
      checked={mfa === "sms"}
      onChange={(e) => setMfa(e.target.value)}
    />
    <label className="form-check-label" htmlFor="mfa-sms">
      SMS OTP
    </label>
  </div>

  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="mfa"
      id="mfa-email"
      value="email"
      checked={mfa === "email"}
      onChange={(e) => setMfa(e.target.value)}
    />
    <label className="form-check-label" htmlFor="mfa-email">
      Email OTP
    </label>
  </div>

  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="mfa"
      id="mfa-security"
      value="security"
      checked={mfa === "security"}
      onChange={(e) => setMfa(e.target.value)}
    />
    <label className="form-check-label" htmlFor="mfa-security">
      Security Question
    </label>
  </div>
</div>

          {/* Button */}
          <button
            onClick={handleSignup}
            className="btn btn-primary w-100 py-2 fw-semibold"
            style={{ borderRadius: "10px" }}
          >
            Sign Up
          </button>

          {/* Redirect */}
          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
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