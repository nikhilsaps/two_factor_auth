import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../firebase/firebaseAPI";
import { saveSecurityQA } from "../firebase/firebaseAPI";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [phone, setPhone]       = useState("");
  const [password, setPassword] = useState("");
  const [mfa, setMfa] = useState("sms");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validatePhone = (p) => /^\+[1-9]\d{9,14}$/.test(p);

  const handleSignup = async () => {
    try {
      setError("");
      setLoading(true);

      if (!name || !email || !password) return setError("All fields are required");
      if (!validateEmail(email))         return setError("Enter a valid email");
      if (password.length < 6)           return setError("Password must be at least 6 characters");

      if (mfa === "sms") {
        if (!phone)                return setError("Phone number is required for SMS OTP");
        if (!validatePhone(phone)) return setError("Use format: +919876543210");
      }

     const user = await signupUser({
  name,
  email,
  password,
  mfaMethod: mfa,
  phone: mfa === "sms" ? phone : null
});
      // 🔥 Save security QA
      if (mfa === "security") {
  if (!question || !answer) {
    setLoading(false);
    return setError("Please enter security question and answer");
  }

  await saveSecurityQA(user.uid, question, answer);
}


      alert("Signup successful! Please check your email to confirm your account.");
      navigate("/");

    } catch (err) {
      if      (err.message?.includes("already registered")) setError("Email already registered. Please login.");
      else if (err.message?.includes("invalid"))            setError("Invalid email format");
      else if (err.message?.includes("Password"))           setError("Password should be at least 6 characters");
      else setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg border-0" style={{ width: "600px", borderRadius: "20px" }}>
        <div className="card-body p-4">
          <h3 className="text-center mb-4 fw-bold">Create Your Account 🚀</h3>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <div className="form-floating mb-3">
            <input type="text"
              className={`form-control ${error && !name ? "is-invalid" : ""}`}
              id="name" placeholder="Name"
              value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="name">Full Name</label>
          </div>

          <div className="form-floating mb-3">
            <input type="email"
              className={`form-control ${error && !validateEmail(email) ? "is-invalid" : ""}`}
              id="email" placeholder="Email"
              value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input type="password"
              className={`form-control ${error && password.length < 6 ? "is-invalid" : ""}`}
              id="password" placeholder="Password"
              value={password} onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="password">Password</label>
          </div>

          {/* MFA Selection */}
          <div className="mb-3">
            <p className="fw-semibold mb-2">Select MFA Method</p>
            {[
  { value: "sms", label: "SMS OTP" },
  { value: "security", label: "Security Question" },
  { value: "email", label: "Email Magic Link" }
].map(({ value, label }) => (
              <div className="form-check" key={value}>
                <input className="form-check-input" type="radio" name="mfa"
                  id={`mfa-${value}`} value={value}
                  checked={mfa === value}
                  onChange={(e) => setMfa(e.target.value)} />
                <label className="form-check-label" htmlFor={`mfa-${value}`}>
                  {label}
                </label>
              </div>
            ))}
          </div>

          {mfa === "security" && (
  <>
    <div className="form-floating mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <label>Security Question</label>
    </div>

    <div className="form-floating mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Your answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <label>Answer</label>
    </div>
  </>
)}

          {/* Phone — only shown when SMS is selected */}
          {mfa === "sms" && (
            <div className="form-floating mb-3">
              <input type="tel"
                className={`form-control ${error && mfa === "sms" && !validatePhone(phone) ? "is-invalid" : ""}`}
                id="phone" placeholder="+919876543210"
                value={phone} onChange={(e) => setPhone(e.target.value)} />
              <label htmlFor="phone">Phone number (with country code)</label>
              <div className="form-text text-muted">Example: +919876543210</div>
            </div>
          )}

          <button onClick={handleSignup}
            className="btn btn-primary w-100 py-2 fw-semibold"
            style={{ borderRadius: "10px" }}
            disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
            <span className="text-primary fw-semibold" style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}