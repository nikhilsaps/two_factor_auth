// ===============================
// 🔥 FIREBASE API SERVICE (ALL-IN-ONE)
// ===============================

import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

// ===============================
// 🔑 CONFIG
// ===============================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID",
};

// ===============================
// 🚀 INIT
// ===============================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ===============================
// 🧠 HELPER FUNCTIONS
// ===============================

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const isOtpExpired = (createdAt) =>
  Date.now() - createdAt > 5 * 60 * 1000; // 5 min

// ===============================
// 🔐 AUTH FUNCTIONS
// ===============================

// SIGNUP
export const signupUser = async ({ email, password, mfaMethods }) => {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCred.user.uid), {
      email,
      mfaMethods, // ["sms", "email", "security"]
      createdAt: Date.now()
    });

    return userCred.user;
  } catch (err) {
    throw err.message;
  }
};

// LOGIN
export const loginUser = async (email, password) => {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    return userCred.user;
  } catch (err) {
    throw err.message;
  }
};

// LOGOUT
export const logoutUser = async () => {
  await signOut(auth);
};

// ===============================
// 📱 SMS OTP (FIREBASE)
// ===============================

// INIT RECAPTCHA
export const initRecaptcha = (containerId = "recaptcha") => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
    });
  }
};

// SEND SMS OTP
export const sendSMSOtp = async (phone) => {
  try {
    const confirmation = await signInWithPhoneNumber(
      auth,
      phone,
      window.recaptchaVerifier
    );

    window.smsConfirmation = confirmation;
    return true;
  } catch (err) {
    throw err.message;
  }
};

// VERIFY SMS OTP
export const verifySMSOtp = async (code) => {
  try {
    const result = await window.smsConfirmation.confirm(code);
    return result.user;
  } catch (err) {
    throw err.message;
  }
};

// ===============================
// 📧 EMAIL OTP (SIMULATED)
// ===============================

// SEND EMAIL OTP
export const sendEmailOtp = async (uid) => {
  try {
    const otp = generateOTP();

    await setDoc(doc(db, "emailOtp", uid), {
      otp,
      createdAt: Date.now()
    });

    // 🔴 Replace this with real email service later
    console.log("EMAIL OTP:", otp);

    return true;
  } catch (err) {
    throw err.message;
  }
};

// VERIFY EMAIL OTP
export const verifyEmailOtp = async (uid, inputOtp) => {
  try {
    const snap = await getDoc(doc(db, "emailOtp", uid));

    if (!snap.exists()) throw "OTP not found";

    const { otp, createdAt } = snap.data();

    if (isOtpExpired(createdAt)) throw "OTP expired";

    if (otp !== inputOtp) throw "Invalid OTP";

    return true;
  } catch (err) {
    throw err;
  }
};

// ===============================
// 🔐 SECURITY QUESTIONS
// ===============================

// SAVE SECURITY Q&A
export const saveSecurityQA = async (uid, question, answer) => {
  try {
    await setDoc(doc(db, "securityQA", uid), {
      question,
      answer // ⚠️ hash in production
    });

    return true;
  } catch (err) {
    throw err.message;
  }
};

// VERIFY SECURITY Q&A
export const verifySecurityQA = async (uid, answer) => {
  try {
    const snap = await getDoc(doc(db, "securityQA", uid));

    if (!snap.exists()) throw "No security question set";

    const data = snap.data();

    if (data.answer !== answer) throw "Wrong answer";

    return true;
  } catch (err) {
    throw err;
  }
};

// ===============================
// 🧩 MFA CONTROL LOGIC
// ===============================

// GET USER MFA METHODS
export const getUserMFA = async (uid) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data().mfaMethods || [] : [];
};

// TRIGGER MFA STEP
export const triggerMFA = async (uid, phone) => {
  const methods = await getUserMFA(uid);

  if (methods.includes("sms")) {
    await sendSMSOtp(phone);
    return "sms";
  }

  if (methods.includes("email")) {
    await sendEmailOtp(uid);
    return "email";
  }

  if (methods.includes("security")) {
    return "security";
  }

  return null;
};