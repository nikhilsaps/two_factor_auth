import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

// ===============================
// 🔐 AUTH
// ===============================

// SIGNUP
export const signupUser = async ({ email, password, mfaMethod, phone = null }) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  // Store user data in Firestore
  await setDoc(doc(db, "users", userCred.user.uid), {
    email,
    phone,
    mfaMethod, // "email" or "sms"
    createdAt: Date.now()
  });

  return userCred.user;
};

// LOGIN
export const loginUser = async (email, password) => {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  return userCred.user;
};

// LOGOUT
export const logoutUser = async () => {
  await signOut(auth);
};

// GET USER DATA
export const getUserData = async (uid) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
};

// ===============================
// 📱 SMS OTP (FIREBASE)
// ===============================

// INIT RECAPTCHA
export const initRecaptcha = (containerId = "recaptcha") => {
  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
    } catch (_) {}
    window.recaptchaVerifier = null;
  }

  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    containerId,
    {
      size: "invisible"
    }
  );
};

// SEND SMS OTP
export const sendSMSOtp = async (phone) => {
  if (!window.recaptchaVerifier) {
    throw new Error("Recaptcha not initialized");
  }

  const confirmation = await signInWithPhoneNumber(
    auth,
    phone,
    window.recaptchaVerifier
  );

  // Save session globally
  window.smsConfirmation = confirmation;

  return true;
};

// VERIFY SMS OTP
export const verifySMSOtp = async (code) => {
  if (!window.smsConfirmation) {
    throw new Error("No OTP session found. Please request OTP again.");
  }

  const result = await window.smsConfirmation.confirm(code);
  return result.user;
};

// ===============================
// 🔐 SECURITY Q&A (OPTIONAL)
// ===============================

export const saveSecurityQA = async (uid, question, answer) => {
  await setDoc(doc(db, "securityQA", uid), {
    question,
    answer
  });
  return true;
};

export const verifySecurityQA = async (uid, answer) => {
  const snap = await getDoc(doc(db, "securityQA", uid));

  if (!snap.exists()) {
    throw new Error("No security question set");
  }

  if (snap.data().answer !== answer) {
    throw new Error("Wrong answer");
  }

  return true;
};

// ===============================
// 🧩 MFA LOGIC
// ===============================

// GET MFA METHOD
export const getUserMFA = async (uid) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data().mfaMethod : null;
};

// TRIGGER MFA
export const triggerMFA = async (uid) => {
  const method = await getUserMFA(uid);
  return method || "email";
};



// ===============================
// 📧 EMAIL MAGIC LINK
// ===============================

export const sendEmailLink = async (email) => {
  const actionCodeSettings = {
    url: window.location.origin + "/verify-email",
    handleCodeInApp: true,
  };

  await sendSignInLinkToEmail(auth, email, actionCodeSettings);

  // Save email locally for later verification
  localStorage.setItem("emailForSignIn", email);

  return true;
};

export const completeEmailSignIn = async () => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = localStorage.getItem("emailForSignIn");

    if (!email) {
      email = window.prompt("Please confirm your email");
    }

    const result = await signInWithEmailLink(auth, email, window.location.href);

    localStorage.removeItem("emailForSignIn");

    return result.user;
  }

  return null;
};