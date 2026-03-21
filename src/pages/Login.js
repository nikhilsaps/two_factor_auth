import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="center">
      <div className="card">
        <h2>Welcome Back</h2>

        <input placeholder="Email" className="input" />
        <input type="password" placeholder="Password" className="input mt-3" />

        <button onClick={() => navigate("/verify")} className="btn mt-5">
          Login
        </button>
      </div>
    </div>
  );
}