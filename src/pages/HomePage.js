import React from 'react'
import { useNavigate } from 'react-router-dom'
import {  loginUser,
  signupUser,
  triggerMFA,
  verifySMSOtp,
  verifyEmailOtp,
  initRecaptcha
} from "../firebase/firebaseAPI";
export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="bg-light min-vh-100">

      {/* HEADER */}
      <div className="bg-white shadow-sm py-3">
        <div className="container d-flex align-items-center justify-content-between">
          
          <div className="d-flex align-items-center gap-3">
            <img 
              src="./uni_logo.png"   
              alt="logo"
              style={{ height: "50px" }}
            />
            <div>
              <h5 className="mb-0 fw-bold">Integral University</h5>
              <small className="text-muted">BCA Project</small>
            </div>
          </div>

          <button
            className="btn btn-primary px-4"
            onClick={() => navigate('/signin')}
          >
            Get Started
          </button>

        </div>
      </div>

      {/* HERO */}
      <div className="container py-5">
        <div className="row align-items-center">

          <div className="col-md-6">
            <h1 className="fw-bold display-5 mb-3">
              🔐 Two Factor Authentication System
            </h1>

            <p className="text-muted">
              A secure and modern authentication system built using React and Firebase. 
              This project implements multi-layer security using Email OTP, SMS OTP, 
              and Secret Questions to protect user accounts.
            </p>

            <button
              className="btn btn-primary btn-lg mt-3 px-4"
              onClick={() => navigate('/signin')}
            >
              Get Started →
            </button>
          </div>

          <div className="col-md-6 text-center">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
              alt="security"
              style={{ maxWidth: "300px" }}
            />
          </div>

        </div>
      </div>

      {/* FEATURES */}
      <div className="container pb-5">
        <h3 className="text-center fw-bold mb-4">✨ Key Features</h3>

        <div className="row g-4">

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 p-4 text-center">
              <h5>📧 Email OTP</h5>
              <p className="text-muted small">
                Verification using OTP sent to registered email.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 p-4 text-center">
              <h5>📱 SMS OTP</h5>
              <p className="text-muted small">
                Phone-based authentication using Firebase services.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 p-4 text-center">
              <h5>❓ Secret Questions</h5>
              <p className="text-muted small">
                Extra security layer with personal verification.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ABOUT */}
      <div className="bg-white py-5 border-top">
        <div className="container">

          <h3 className="text-center fw-bold mb-4">📘 About Project</h3>

          <p className="text-center text-muted mx-auto" style={{ maxWidth: "800px" }}>
            This Two Factor Authentication system is developed as part of an academic project.
            It enhances login security by implementing multiple authentication factors.
            The system is built using React for frontend and Firebase for backend services,
            including authentication, database, and OTP handling.
          </p>

        </div>
      </div>

      {/* TEAM */}
      <div className="container py-5">
        <h3 className="text-center fw-bold mb-4">👨‍🎓 Project Team</h3>

        <div className="row g-4">

          <div className="col-md-4">
            <div className="card shadow-sm border-0 text-center p-4">
              <h5>Student 1 Name</h5>
              <p className="text-muted small mb-1">Enrollment: XXXXXXXX</p>
              <p className="text-muted small">BCA - Section A</p>
              <span className="badge bg-primary">Frontend (React)</span>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 text-center p-4">
              <h5>Student 2 Name</h5>
              <p className="text-muted small mb-1">Enrollment: XXXXXXXX</p>
              <p className="text-muted small">BCA - Section A</p>
              <span className="badge bg-success">Backend (Firebase)</span>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 text-center p-4">
              <h5>Student 3 Name</h5>
              <p className="text-muted small mb-1">Enrollment: XXXXXXXX</p>
              <p className="text-muted small">BCA - Section A</p>
              <span className="badge bg-warning text-dark">Security Logic</span>
            </div>
          </div>

              <div className="col-md-4">
            <div className="card shadow-sm border-0 text-center p-4">
              <h5>Student 4 Name</h5>
              <p className="text-muted small mb-1">Enrollment: XXXXXXXX</p>
              <p className="text-muted small">BCA - Section A</p>
              <span className="badge bg-warning text-dark">Security Logic</span>
            </div>
          </div>
          

        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-dark text-white text-center py-3">
        <small>© 2026 Integral University | BCA Project</small>
      </div>

    </div>
  )
}