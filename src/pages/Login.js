import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  loginUser,
  getUserData,
  sendSMSOtp,
  initRecaptcha,
  sendEmailLink   // ✅ ADD THIS
} from "../firebase/firebaseAPI";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const handleLogin = async () => {
  try {
    setError("");
    setLoading(true);

    // ✅ Basic validation
    if (!email || !password) {
      return setError("All fields are required");
    }

    if (!validateEmail(email)) {
      return setError("Please enter a valid email address");
    }

    // ✅ Step 1: Login user
    const user = await loginUser(email, password);

    // ✅ Step 2: Get user data
    const userData = await getUserData(user.uid);

    if (!userData) {
      return setError("User data not found");
    }

    const method  = userData.mfaMethod || "email";
    const contact = method === "sms" ? userData.phone : userData.email;

    if (!contact) {
      return setError("No contact method found for this account");
    }

    // ✅ Step 3: Handle MFA
    if (method === "sms") {
      // 🔥 Initialize reCAPTCHA
      initRecaptcha();

      // 🔥 Send SMS OTP
      await sendSMSOtp(userData.phone);

      // 🔥 Go to OTP verify page
      navigate("/verify", {
        state: {
          uid: user.uid,
          method,
          phone: userData.phone,
          contact
        }
      });

    } else if (method === "email") {
      // 🔥 Send Email Magic Link
      await sendEmailLink(userData.email);

      // 🔥 Go to email verification info page
      navigate("/verify-email", {
        state: {
          email: userData.email
        }
      });

    } 
    else if (method === "security") {
  navigate("/verify-security", {
    state: {
      uid: user.uid
    }
  });
}else {
      // fallback (in case new methods added later)
      navigate("/dashboard");
    }

  } catch (err) {
    console.error(err);

    if (err.message?.includes("auth/invalid-credential")) {
      setError("Incorrect email or password");
    } else if (err.message?.includes("auth/user-not-found")) {
      setError("User not found");
    } else {
      setError(err.message || "Login failed");
    }

  } finally {
    setLoading(false);
  }
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

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <div className="form-floating mb-3">
            <input
              type="email"
              className={`form-control ${error && !validateEmail(email) ? "is-invalid" : ""}`}
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className={`form-control ${error && !password ? "is-invalid" : ""}`}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>
<div id="recaptcha"></div>
          <button
            onClick={handleLogin}
            className="btn btn-primary w-100 py-2 fw-semibold"
            style={{ borderRadius: "10px" }}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <div className="text-center my-3 text-muted">── or ──</div>

          <p className="text-center mb-1">
            Don't have an account?{" "}
            <span
              className="text-primary fw-semibold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
          <p className="text-center mb-0">
            Forgot your password?{" "}
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
