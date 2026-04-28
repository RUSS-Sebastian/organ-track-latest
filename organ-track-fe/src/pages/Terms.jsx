import { useLocation, useNavigate } from "react-router-dom";

export default function Terms() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData ?? {};
  const fromRegister = location.state?.from === "register";

  const handleAccept = () => {
    navigate("/register", {
      state: { ...formData, termsAccepted: true },
    });
  };

  const handleDecline = () => {
    navigate("/register", {
      state: { ...formData, termsAccepted: false },
    });
  };

  return (
  <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
    {/* Header with back button */}
    <div className="flex items-center gap-3 mb-6">
      {!fromRegister && (
        <button
          onClick={() => navigate("/")}
          className="text-xl sm:text-2xl px-2 py-1 rounded-full hover:bg-gray-100"
          aria-label="Go back"
        >
          ←
        </button>
      )}
      <p className="text-sm sm:text-base text-[#9F9F9F] uppercase tracking-wide font-medium" style={{ fontFamily: "Montserrat", fontWeight: 400 }}>
        AGREEMENT
      </p>
    </div>

    {/* Main Title */}
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#14AE5C] mb-8" style={{ fontFamily: "Montserrat" }}>
      Terms of Service
    </h1>

    {/* Content Section – responsive spacing and typography */}
    <div className="space-y-6 sm:space-y-8 max-w-4xl">
      {/* 1. Terms */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ fontFamily: "Roboto" }}>1. Terms</h2>
        <p className="text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
          By registering, logging in, or using Organ Track, you acknowledge that you have read, understood, and agreed to these Terms and Conditions. If you do not agree with any part of these terms, you must not use the system.
        </p>
      </div>

      {/* 2. Purpose of the System */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ fontFamily: "Roboto" }}>2. Purpose of the System</h2>
        <p className="text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
          Organ Track is a health habit and symptom tracking system designed to help users:
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-2 text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
          <li>Track daily habits and lifestyle choices</li>
          <li>Monitor symptoms related to specific organs</li>
          <li>View health insights, trends, and summaries</li>
        </ul>
        <p className="text-sm sm:text-base mt-2 font-bold text-yellow-600" style={{ fontFamily: "Roboto" }}>
          ⚠️ Organ Track is not a medical diagnosis tool and does not replace professional medical advice.
        </p>
      </div>

      {/* 3. User Eligibility */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ fontFamily: "Roboto" }}>3. User Eligibility</h2>
        <p className="text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>To use Organ Track, you must:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2 text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
          <li>Be able to provide accurate personal information</li>
          <li>Use the system for personal, non-commercial purposes</li>
          <li>Be responsible for maintaining the confidentiality of your login credentials</li>
        </ul>
      </div>

      {/* 4. User Responsibilities */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ fontFamily: "Roboto" }}>4. User Responsibilities</h2>
        <p className="text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>As a user, you agree to:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2 text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
          <li>Provide accurate and truthful information</li>
          <li>Use the system only for lawful and intended purposes</li>
          <li>Not misuse, hack, or attempt to disrupt system functionality</li>
          <li>Keep your account credentials secure</li>
          <li>You are fully responsible for all activities that occur under your account.</li>
        </ul>
      </div>

      {/* 5. Health Disclaimer */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ fontFamily: "Roboto" }}>5. Health Disclaimer</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
          <li>The health results, scores, suggestions, and warnings provided by Organ Track are informational only.</li>
          <li>They are based on predefined rules and user inputs.</li>
          <li>The system does not guarantee medical accuracy.</li>
          <li>Always consult a qualified healthcare professional for medical concerns.</li>
          <li>Organ Track is intended to support awareness and prevention, not diagnosis or treatment.</li>
        </ul>
      </div>

      {/* 6. Data Collection & Usage */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ fontFamily: "Roboto" }}>6. Data Collection & Usage</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
          <li>Organ Track may collect and store: Personal account information (name, email)</li>
          <li>Daily habit responses</li>
          <li>Symptom tracking data</li>
          <li>Generated results and reports</li>
          <li>
            This data is used only to:
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li>Generate health insights</li>
              <li>Display results and reports</li>
              <li>Improve system functionality</li>
            </ul>
          </li>
          <li>User data will not be shared with third parties without consent.</li>
        </ul>
      </div>

      {/* 7. Data Security */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ fontFamily: "Roboto" }}>7. Data Security</h2>
        <p className="text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>We take reasonable measures to protect user data. However:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2 text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
          <li>No system is completely secure</li>
          <li>Organ Track cannot guarantee absolute data protection</li>
          <li>Users are responsible for safeguarding their login details</li>
        </ul>
      </div>

      {/* 8. Account Modification & Termination */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ fontFamily: "Roboto" }}>8. Account Modification & Termination</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
          <li>Users may edit their profile information at any time</li>
          <li>Organ Track reserves the right to suspend or terminate accounts if misuse or violations occur</li>
          <li>Users may log out at any time to protect their data</li>
        </ul>
      </div>

      {/* 9. System Availability */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ fontFamily: "Roboto" }}>9. System Availability</h2>
        <p className="text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
          Organ Track is provided on an “as-is” basis. Temporary downtime may occur due to maintenance or technical issues. The system does not guarantee uninterrupted availability.
        </p>
      </div>

      {/* 10. Limitation of Liability */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ fontFamily: "Roboto" }}>10. Limitation of Liability</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
          <li>Organ Track and its developers shall not be held liable for: Health decisions made based on system outputs</li>
          <li>Data loss due to technical issues</li>
          <li>Any indirect or consequential damages</li>
          <li>Use of the system is at your own risk.</li>
        </ul>
      </div>

      {/* 11. Changes to Terms */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ fontFamily: "Roboto" }}>11. Changes to Terms</h2>
        <p className="text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
          Organ Track reserves the right to update or modify these Terms and Conditions at any time. Continued use of the system after changes indicates acceptance of the updated terms.
        </p>
      </div>

      {/* 12. Contact Information */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ fontFamily: "Roboto" }}>12. Contact Information</h2>
        <p className="text-sm sm:text-base" style={{ fontFamily: "Roboto" }}>
          If you have questions or concerns regarding these Terms and Conditions, please contact the Organ Track development team.
        </p>
      </div>
    </div>

    {/* Accept/Decline Buttons – only if fromRegister */}
    {fromRegister && (
      <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:justify-between w-full max-w-md mx-auto">
        <button
          type="button"
          onClick={handleDecline}
          className="w-full sm:w-48 py-3 border-2 border-[#2DF251] rounded-lg bg-white text-[#2DF251] font-semibold text-base sm:text-lg"
          style={{ fontFamily: "Montserrat", fontWeight: 600 }}
        >
          Decline
        </button>

        <button
          type="button"
          onClick={handleAccept}
          className="w-full sm:w-48 py-3 rounded-lg bg-[#2DF251] text-black font-semibold text-base sm:text-lg"
          style={{ fontFamily: "Montserrat", fontWeight: 600 }}
        >
          Accept
        </button>
      </div>
    )}
  </div>
);
}
