import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { completeEmailSignIn } from "../firebase/firebaseAPI";

export default function VerifyEmail() {
  const navigate = useNavigate();

  useEffect(() => {
    const finishLogin = async () => {
      try {
        const user = await completeEmailSignIn();

        if (user) {
          navigate("/dashboard");
        }
      } catch (err) {
        console.error(err);
        alert("Email verification failed");
        navigate("/");
      }
    };

    finishLogin();
  }, [navigate]);

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <h4>Verifying your email...</h4>
    </div>
  );
}