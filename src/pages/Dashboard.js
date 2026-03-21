export default function Dashboard() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="mt-6 bg-white p-6 rounded-xl shadow">
        <p>Logged in successfully 🎉</p>

        <h3 className="mt-4 font-semibold">Active MFA Methods:</h3>
        <ul className="list-disc ml-5 mt-2">
          <li>OTP</li>
          <li>Fingerprint</li>
        </ul>
      </div>
    </div>
  );
}