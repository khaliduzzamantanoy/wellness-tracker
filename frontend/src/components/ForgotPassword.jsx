import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export default function ForgotPassword({ onBack, showNotification }) {
  const [step, setStep] = useState(1); // 1: send OTP, 2: reset password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const sendOtp = async () => {
    if (!email) {
      showNotification("Please enter your email", "error");
      return;
    }
    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email", "error");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_URL}/forgot-password`, { email });
      showNotification("OTP sent to your email", "success");
      setStep(2);
    } catch (err) {
      showNotification(
        err.response?.data?.message || "Failed to send OTP",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!otp) {
      showNotification("Please enter the OTP", "error");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      showNotification("Password must be at least 6 characters", "error");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_URL}/reset-password`, {
        email,
        otp,
        newPassword,
      });
      showNotification("Password reset successful! Please login.", "success");
      onBack(); // go back to login page
    } catch (err) {
      showNotification(
        err.response?.data?.message || "Password reset failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded shadow-lg">
      {step === 1 && (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Forgot Password
          </h2>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <button
            onClick={sendOtp}
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded hover:bg-secondary transition"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
          <button
            onClick={onBack}
            disabled={loading}
            className="mt-3 w-full text-center text-gray-600 hover:underline"
          >
            Back to Login
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Reset Password
          </h2>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={loading}
          />
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full p-3 border border-gray-300 rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-600 hover:text-gray-900"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 011.175-4.625M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3l18 18"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
          <button
            onClick={resetPassword}
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded hover:bg-secondary transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
          <button
            onClick={onBack}
            disabled={loading}
            className="mt-3 w-full text-center text-gray-600 hover:underline"
          >
            Back to Login
          </button>
        </>
      )}
    </div>
  );
}
