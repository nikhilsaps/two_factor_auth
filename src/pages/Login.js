import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ Email validation regex
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      return setError("All fields are required");
    }

    if (!validateEmail(email)) {
      return setError("Please enter a valid email address");
    }

    // 👉 if everything valid
    navigate("/verify");
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card shadow-lg border-0"
        style={{ width: "600px", borderRadius: "20px" }}
      >
        <div className="card-body p-4">
          <h3 className="text-center mb-4 fw-bold">
            Welcome to Two Factor Authentication 👋
          </h3>

          {/* ERROR ALERT */}
          {error && <div className="alert alert-danger py-2">{error}</div>}

          {/* Email */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className={`form-control ${
                error && !validateEmail(email) ? "is-invalid" : ""
              }`}
              id="email"
              placeholder="name@example.com"
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
                error && !password ? "is-invalid" : ""
              }`}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="btn btn-primary w-100 py-2 fw-semibold"
            style={{ borderRadius: "10px" }}
          >
            Login
          </button>

          <div className="text-center my-3 text-muted">── or ──</div>

          <p className="text-center mb-0">
            Don’t have an account?{" "}
            <span
              className="text-primary fw-semibold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>

          <p className="text-center mb-0">
            Did you forgot your password {" "}
            <span
              className="text-primary fw-semibold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/forgetpassword")}
            >
              Forget Password
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
