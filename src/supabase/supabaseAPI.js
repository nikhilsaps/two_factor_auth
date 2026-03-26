import { supabase } from "./supabaseClient";

// ===============================
// 🔐 AUTH — SIGNUP
// Supabase creates the user AND sends email OTP automatically
// ===============================
export const signupUser = async ({ email, password, phone = null, mfaMethod }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        mfaMethod,  // stored in user metadata
        phone
      }
    }
  });

  if (error) throw error;
  return data.user;
};

// ===============================
// 🔐 AUTH — LOGIN
// Just validates email + password, OTP is sent separately
// ===============================
export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data.user;
};

// ===============================
// 🔐 AUTH — LOGOUT
// ===============================
export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// ===============================
// 👤 GET USER DATA
// Returns mfaMethod + phone from user metadata
// ===============================
export const getUserData = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;

  const user = data.user;
  return {
    uid:       user.id,
    email:     user.email,
    phone:     user.user_metadata?.phone     || null,
    mfaMethod: user.user_metadata?.mfaMethod || "email"
  };
};

// ===============================
// 📧 EMAIL OTP
// Supabase sends the OTP email automatically — no backend needed
// ===============================
// In supabaseAPI.js — make sure this is correct
export const sendEmailOtp = async (email) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false }
  });
  if (error) throw error;
  return true;
};

export const verifyEmailOtp = async (email, token) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email"
  });
  if (error) throw error;
  return data.user;
};

// ===============================
// 📱 SMS OTP (requires Twilio connected in Supabase dashboard)
// ===============================
export const sendSMSOtp = async (phone) => {
  const { error } = await supabase.auth.signInWithOtp({ phone });
  if (error) throw error;
  return true;
};

// VERIFY SMS OTP
export const verifySMSOtp = async (phone, otp) => {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token: otp,
    type:  "sms"
  });

  if (error) throw error;
  return data.user;
};

// ===============================
// 🔐 SECURITY Q&A
// Stored in Supabase database (profiles table)
// ===============================
export const saveSecurityQA = async (uid, question, answer) => {
  const { error } = await supabase
    .from("security_qa")
    .upsert({ uid, question, answer });

  if (error) throw error;
  return true;
};

export const verifySecurityQA = async (uid, answer) => {
  const { data, error } = await supabase
    .from("security_qa")
    .select("answer")
    .eq("uid", uid)
    .single();

  if (error) throw error;
  if (data.answer !== answer) throw new Error("Wrong answer");
  return true;
};

// ===============================
// 🧩 MFA LOGIC — get user's chosen method
// ===============================
export const getUserMFA = async () => {
  const userData = await getUserData();
  return userData.mfaMethod || "email";
};