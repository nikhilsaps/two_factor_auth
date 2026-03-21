import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verify2FA from "./pages/Verify2FA";
import Dashboard from "./pages/Dashboard";
import './App.css'
import ForgetPassword from "./pages/ForgetPassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verify2FA />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgetpassword" element={<ForgetPassword/>} />
      </Routes>
    </BrowserRouter>
  );
}