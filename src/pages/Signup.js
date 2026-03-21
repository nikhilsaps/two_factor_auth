export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6">Create Account</h2>

        <input placeholder="Name" className="input" />
        <input placeholder="Email" className="input mt-3" />
        <input type="password" placeholder="Password" className="input mt-3" />

        <div className="mt-4">
          <p className="text-sm font-semibold">Select MFA Methods</p>

          <label className="block mt-2">
            <input type="checkbox" /> OTP
          </label>

          <label className="block">
            <input type="checkbox" /> Authenticator App
          </label>

          <label className="block">
            <input type="checkbox" /> Fingerprint
          </label>

          <label className="block">
            <input type="checkbox" /> Image Recognition
          </label>
        </div>

        <button className="btn mt-6 w-full">Sign Up</button>
      </div>
    </div>
  );
}