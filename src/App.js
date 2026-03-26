import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verify2FA from "./pages/Verify2FA";
import Dashboard from "./pages/Dashboard";
import './App.css'
import ForgetPassword from "./pages/ForgetPassword";
import HomePage from "./pages/HomePage";
import VerifyEmail from "./pages/VerifyEmail";
import VerifySecurity from "./pages/VerifySecurity";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/verify-security" element={<VerifySecurity />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verify2FA />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgetpassword" element={<ForgetPassword/>} />
      </Routes>
    </BrowserRouter>
  );
}