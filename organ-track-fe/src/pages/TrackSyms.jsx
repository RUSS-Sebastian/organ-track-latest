import TrackHistory from "../components/TrackHistory"; // adjust path if needed
import OrganSelectOverlay from "../components/OrganSelectOverlay";
import { useState, useEffect } from "react";
import { getUserDrafts, deleteDraft } from "../utils/draftStorage";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function TrackSyms() {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState([]);
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;
    setDrafts(getUserDrafts(userId));
  }, [userId]);

  const handleDelete = (organId) => {
    if (!userId) return;
    deleteDraft(organId, userId);
    setDrafts(getUserDrafts(userId));
  };

  const handleResume = (organId) => {
    navigate(`/questions/${encodeURIComponent(organId)}`);
  };

  return (
  <div className="min-h-screen w-full bg-white flex flex-col">
    {/* Content container – fluid width, no max‑w */}
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-10">
      {/* Header */}
      <h1 className="text-[#14AE5C] font-bold text-2xl sm:text-3xl lg:text-4xl font-['Roboto']">
        Symptom Track
      </h1>

      {/* Subtitle */}
      <p className="mt-1 text-black text-sm sm:text-base lg:text-lg font-medium font-['Montserrat']">
        Don’t feel well today?
      </p>

      {/* Bottom Helper Text */}
      <p className="mt-1 text-black text-sm sm:text-base lg:text-lg font-medium font-['Montserrat']">
        Select the organ you think that is related to and answer the questions
      </p>

      {/* Button – full width on mobile, auto on larger */}
      <button
        className="mt-4 px-6 py-3 bg-[#14AE5C] text-white rounded-xl font-semibold text-sm sm:text-base w-full sm:w-auto transition-all hover:bg-green-700"
        onClick={() => setShowOverlay(true)}
      >
        Answer Now
      </button>

      {/* Drafts section */}
      <div className="mt-8">
        {drafts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
            <p className="text-lg sm:text-xl font-medium">No in-progress drafts</p>
            <p className="text-sm sm:text-base mt-1">
              Start a check-in and it will appear here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {drafts.map((draft) => (
              <div
                key={draft.organId}
                className="bg-white rounded-xl shadow p-4 sm:p-5 flex flex-col"
              >
                <h3 className="font-semibold text-base sm:text-lg mb-3">
                  {draft.organName}
                </h3>

                <div className="flex flex-col gap-2 mt-auto">
                  <button
                    onClick={() => handleResume(draft.organId)}
                    className="bg-[#14AE5C] text-white rounded-md py-2 text-sm sm:text-base"
                  >
                    Resume
                  </button>

                  <button
                    onClick={() => handleDelete(draft.organId)}
                    className="border border-gray-300 rounded-md py-2 text-sm sm:text-base"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Track History title */}
      <h2 className="mt-8 text-[#14AE5C] font-bold text-xl sm:text-2xl lg:text-3xl font-['Montserrat'] text-left">
        Track History
      </h2>

      {/* Track History content – no width clamp */}
      <div className="w-full mt-2">
        <TrackHistory />
      </div>
    </div>

    {showOverlay && (
      <OrganSelectOverlay onClose={() => setShowOverlay(false)} />
    )}
  </div>
);
}
