import TrackHistory from "../components/TrackHistory"; // adjust path if needed
import OrganSelectOverlay from "../components/OrganSelectOverlay";
import { useState, useEffect } from "react";
import { getAllDrafts, deleteDraft } from "../utils/draftStorage";
import { useNavigate } from "react-router-dom";

export default function TrackSyms() {
  const [showOverlay, setShowOverlay] = useState(false);

  const navigate = useNavigate();
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    setDrafts(getAllDrafts());
  }, []);

  const handleDelete = (organId) => {
    deleteDraft(organId);
    setDrafts(getAllDrafts());
  };

  const handleResume = (organId) => {
    navigate(`/questions/${encodeURIComponent(organId)}`);
  };

  return (
    <div className="min-h-[982px] w-full flex justify-center bg-white">
      {/* Mobile container */}
      <div className="w-full max-w-[402px] px-1 pt-6 pb-10">
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

        <div className="overflow-x-auto">
          {drafts.length === 0 ? (
            // ✅ EMPTY STATE
            <div className="flex flex-col items-center justify-center py-16 text-left text-gray-500">
              <p className="text-lg font-medium">No in-progress drafts</p>
              <p className="text-sm mt-1">
                Start a check-in and it will appear here
              </p>
            </div>
          ) : (
            // ✅ NORMAL DRAFT LIST
            <div className="flex gap-4 p-4 min-w-max">
              {drafts.map((draft) => (
                <div
                  key={draft.organId}
                  className="bg-white rounded-xl shadow p-4 w-40 flex-shrink-0"
                >
                  <h3 className="font-semibold mb-2">{draft.organId}</h3>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleResume(draft.organId)}
                      className="bg-[#14AE5C] text-white rounded-md py-1 text-sm"
                    >
                      Resume
                    </button>

                    <button
                      onClick={() => handleDelete(draft.organId)}
                      className="border rounded-md py-1 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

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

        <div className="w-full max-w-[402px] rounded-lg ">
          <TrackHistory />
        </div>
      </div>

      {showOverlay && (
        <OrganSelectOverlay onClose={() => setShowOverlay(false)} />
      )}
    </div>
  );
}
