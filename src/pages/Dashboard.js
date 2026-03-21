import { useNavigate, useLocation } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // 👉 Data passed after login (simulate for now)
  const {
    name = "Nikhil Singh",
    email = "nikhil@example.com",
    mfa = "sms"
  } = location.state || {};

  return (
    <div className="bg-light min-vh-100">
      
      {/* NAVBAR */}
      <nav className="navbar navbar-light bg-white shadow-sm px-4">
        <span className="navbar-brand fw-bold">MFA Dashboard</span>

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => navigate("/")}
        >
          Logout
        </button>
      </nav>

      <div className="container py-4">

        {/* WELCOME */}
        <div className="mb-4">
          <h3 className="fw-bold">Welcome, {name} 👋</h3>
          <p className="text-muted">Here’s your account overview</p>
        </div>

        <div className="row g-4">

          {/* USER INFO CARD */}
          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="fw-semibold mb-3">Profile Info</h5>

                <p className="mb-2">
                  <strong>Name:</strong> {name}
                </p>

                <p className="mb-2">
                  <strong>Email:</strong> {email}
                </p>

                <p className="mb-0">
                  <strong>Status:</strong>{" "}
                  <span className="badge bg-success">Active</span>
                </p>
              </div>
            </div>
          </div>

          {/* MFA CARD */}
          <div className="col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="fw-semibold mb-3">Security</h5>

                <p className="mb-2">
                  <strong>Primary MFA:</strong>{" "}
                  <span className="text-capitalize">{mfa}</span>
                </p>

                <p className="mb-3 text-muted small">
                  Your account is protected with two-factor authentication.
                </p>

                <button className="btn btn-outline-primary btn-sm">
                  Manage MFA
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ACTIVITY / STATUS */}
        <div className="card shadow-sm border-0 mt-4">
          <div className="card-body">
            <h5 className="fw-semibold mb-3">Recent Activity</h5>

            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Logged in successfully ✅
              </li>
              <li className="list-group-item">
                MFA verified ({mfa})
              </li>
              <li className="list-group-item">
                Account created 🎉
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}