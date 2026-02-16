import TrackHistory from "../components/TrackHistory"; // adjust path if needed
import OrganSelectOverlay from "../components/OrganSelectOverlay";
import { useState } from "react";
export default function TrackSyms() {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="min-h-[982px] w-full flex justify-center bg-white border border-red-500">
      {/* Mobile container */}
      <div className="w-full max-w-[402px] px-4 pt-6 pb-10 border border-blue-500">
        {/* Header */}
        <h1
          className="
          text-[#14AE5C]
          font-bold
          text-[24px]
          font-['Roboto']
        "
        >
          Symptom Track
        </h1>

        {/* Subtitle */}
        <p
          className="
          mt-1
          text-black
          text-[14px]
          font-medium
          font-['Montserrat']
        "
        >
          Don’t feel well today?
        </p>

        {/* Bottom Helper Text */}
        <p
          className="
          mt-1
          text-black
          text-[14px]
          font-medium
          font-['Montserrat']
        "
        >
          Select the organ you think that is related to and answer the questions
        </p>

        {/* Button */}
        <button
          className="
            mt-4
            w-[167px]
            h-[40px]
            bg-[#14AE5C]
            text-white
            rounded-[12px]
            font-semibold
            text-[14px]
            font-['Montserrat']
          "
          onClick={() => setShowOverlay(true)}
        >
          Answer Now
        </button>

        <h2
          className="
            mt-6
            text-[#14AE5C]
            font-bold
            text-[18px]
            font-['Montserrat']
            text-left
          "
        >
          Track History
        </h2>

        <div className="w-full max-w-[402px] rounded-lg mx-auto">
          <TrackHistory />
        </div>
      </div>

      {showOverlay && (
        <OrganSelectOverlay onClose={() => setShowOverlay(false)} />
      )}
    </div>
  );
}
