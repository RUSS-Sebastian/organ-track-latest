import { useState } from "react";
import { useUser } from "../context/UserContext";
import { organs } from "../data/organ";
import { useNavigate } from "react-router-dom";
import { useOrgan } from "../context/OrganContext";

export default function OrganSelectOverlay({ onClose }) {
  const user = useUser();
  const [selectedOrgan, setSelectedOrgan] = useState("");
  const navigate = useNavigate();
  const { setOrgan } = useOrgan();

  // --- Build gender-based organ list ---
  const organList = [
    ...organs.common,
    ...(user.gender === "male" ? organs.male : organs.female),
  ];

  const handleAnswer = () => {
    if (!selectedOrgan) {
      alert("Please select an organ first.");
      return;
    }
    // Save globally
    setOrgan(selectedOrgan);

    // Navigate safely with URL param
    navigate(`/questions/${encodeURIComponent(selectedOrgan)}`, {
      state: { type: "organ", organId: selectedOrgan },
    });

    onClose();
  };

  return (
    // --- Overlay background ---
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      {/* White card centered inside 402 layout */}
      <div className="w-full max-w-[402px] bg-white rounded-2xl p-5 shadow-lg">
        {/* Text */}
        <p className="text-[#14AE5C] font-semibold font-['Montserrat'] text-[16px] text-left">
          Select one of these organs you think your symptom is related to
        </p>

        {/* Dropdown */}
        <select
          className="mt-4 w-full border border-gray-300 rounded-xl px-3 py-3 font-['Montserrat'] focus:outline-none focus:ring-2 focus:ring-[#14AE5C]"
          value={selectedOrgan}
          onChange={(e) => setSelectedOrgan(e.target.value)}
        >
          <option value="">Choose an organ</option>
          {organList.map((organ) => (
            <option key={organ} value={organ}>
              {organ}
            </option>
          ))}
        </select>

        {/* Buttons Row */}
        <div className="mt-5 flex justify-between">
          {/* Cancel Button (reversed colors) */}
          <button
            onClick={onClose}
            className="w-[144px] h-[46px] border-2 border-[#14AE5C] text-[#14AE5C] bg-white rounded-[30px] font-semibold font-['Montserrat']"
          >
            Cancel
          </button>

          {/* Answer Button */}
          <button
            onClick={handleAnswer}
            className="w-[144px] h-[46px] bg-[#14AE5C] text-white rounded-[30px] font-semibold font-['Montserrat']"
          >
            Answer
          </button>
        </div>
      </div>
    </div>
  );
}
