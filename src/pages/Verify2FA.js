import { useNavigate } from "react-router-dom";

export default function Verify2FA() {
  const navigate = useNavigate();

  return (
    <div className="center">
      <div className="card">
        <h2>Verify Identity</h2>

        <p className="text-sm text-gray-500">
          Enter the 6-digit code sent to your device
        </p>

        <input placeholder="------" className="input text-center mt-4" />

        <button
          onClick={() => navigate("/dashboard")}
          className="btn mt-5"
        >
          Verify
        </button>
      </div>
    </div>
  );
}