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
    navigate(`/questions/${selectedOrgan}`);

    onClose();
  };

  return (
  // Overlay background – full screen, centred
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
    {/* White card – fluid width, responsive max-width */}
    <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white rounded-2xl shadow-lg p-4 sm:p-5">
      {/* Text */}
      <p className="text-[#14AE5C] font-semibold font-['Montserrat'] text-sm sm:text-base lg:text-lg text-left">
        Select one of these organs you think your symptom is related to
      </p>

      {/* Dropdown */}
      <select
        className="mt-3 sm:mt-4 w-full border border-gray-300 rounded-xl px-3 py-2.5 sm:py-3 font-['Montserrat'] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#14AE5C]"
        value={selectedOrgan}
        onChange={(e) => setSelectedOrgan(e.target.value)}
      >
        <option value="">Choose an organ</option>
        {organList.map((organ) => (
          <option key={organ.id} value={organ.id}>
            {organ.name}
          </option>
        ))}
      </select>

      {/* Buttons Row – flexible side by side, no fixed widths */}
      <div className="mt-4 sm:mt-5 flex gap-3">
        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="flex-1 h-11 sm:h-12 border-2 border-[#14AE5C] text-[#14AE5C] bg-white rounded-[30px] font-semibold font-['Montserrat'] text-sm sm:text-base"
        >
          Cancel
        </button>

        {/* Answer Button */}
        <button
          onClick={handleAnswer}
          className="flex-1 h-11 sm:h-12 bg-[#14AE5C] text-white rounded-[30px] font-semibold font-['Montserrat'] text-sm sm:text-base"
        >
          Answer
        </button>
      </div>
    </div>
  </div>
);
}
