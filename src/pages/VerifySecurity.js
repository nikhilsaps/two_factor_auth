import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { verifySecurityQA } from "../firebase/firebaseAPI";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function VerifySecurity() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const uid = state?.uid;

  useEffect(() => {
    const fetchQuestion = async () => {
      const snap = await getDoc(doc(db, "securityQA", uid));
      if (snap.exists()) {
        setQuestion(snap.data().question);
      }
    };

    if (uid) fetchQuestion();
  }, [uid]);

  const handleVerify = async () => {
    try {
      setError("");

      await verifySecurityQA(uid, answer);

      navigate("/dashboard");

    } catch (err) {
      setError("Wrong answer");
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card p-4 shadow" style={{ width: "500px" }}>
        <h4 className="mb-3">Security Verification 🔐</h4>

        <p className="fw-semibold">{question}</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={handleVerify}>
          Verify
        </button>
      </div>
    </div>
  );
}