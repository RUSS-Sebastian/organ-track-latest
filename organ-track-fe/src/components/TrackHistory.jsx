import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // ⬅️ added

// ---------- Translations ----------
const translations = {
  trackName: { en: "Track Name", mm: "မှတ်တမ်းအမည်" },
  date: { en: "Date", mm: "ရက်စွဲ" },
  actions: { en: "Actions", mm: "လုပ်ဆောင်ချက်များ" },
  noData: {
    en: "No track history available.",
    mm: "မှတ်တမ်းရာဇဝင်မရှိသေးပါ။",
  },
  previous: { en: "Previous", mm: "နောက်သို့" },
  next: { en: "Next", mm: "ရှေ့သို့" },
  pageText: (current, total) => ({
    en: `Page ${current} of ${total}`,
    mm: `စာမျက်နှာ ${current} / ${total}`,
  }),
  renamePrompt: {
    en: "Enter new track name:",
    mm: "မှတ်တမ်းအမည်သစ်ထည့်ပါ-",
  },
  deleteConfirm: {
    en: "Are you sure you want to delete this track?",
    mm: "ဤမှတ်တမ်းကို ဖျက်လိုသည်မှာသေချာပါသလား။",
  },
  ariaRename: { en: "Rename", mm: "အမည်ပြောင်းရန်" },
  ariaDelete: { en: "Delete", mm: "ဖျက်ရန်" },
};

export default function TrackHistory() {
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const [trackData, setTrackData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:8000/api";

  // ---------- Language ----------
  const { user } = useUser();
  const isBurmese = user?.language_preference === "Bur";
  const t = (en, mm) => (isBurmese ? mm : en);

  // Fetch tracks from Laravel API
  const fetchTrackData = async (page) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${API_URL}/tracks?page=${page}&perPage=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const result = await response.json();

      const formatted = result.data.map((item) => ({
        id: item.id,
        trackName: item.report_name ?? `Track ${item.id}`,
        date: new Date(item.answered_date).toLocaleString(),
      }));

      setTrackData(formatted);
      setTotalPages(result.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      setTrackData([]);
      setTotalPages(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrackData(currentPage);
  }, [currentPage]);

  // Rename track
  const handleRename = async (id) => {
    const newName = prompt(
      t(translations.renamePrompt.en, translations.renamePrompt.mm),
    );
    if (!newName) return;

    const token = localStorage.getItem("token");

    try {
      await fetch(`${API_URL}/tracks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({ report_name: newName }),
      });
      fetchTrackData(currentPage);
    } catch (error) {
      console.error("Rename error:", error);
    }
  };

  // Delete track
  const handleDelete = async (id) => {
    if (
      !confirm(t(translations.deleteConfirm.en, translations.deleteConfirm.mm))
    )
      return;

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      await fetch(`${API_URL}/tracks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      fetchTrackData(currentPage);
    } catch (error) {
      console.error("Delete error:", error);
    }
    setLoading(false);
  };

  const handleRowClick = (id) => {
    navigate(`/trackResult/${id}`);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md flex flex-col p-2 sm:p-4 lg:p-6">
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <table className="w-full border-collapse min-w-[500px]">
          <thead className="bg-[#14AE5C]">
            <tr>
              <th
                className={`text-white font-bold text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-3 text-left whitespace-nowrap ${
                  isBurmese ? "leading-relaxed" : ""
                }`}
              >
                {t(translations.trackName.en, translations.trackName.mm)}
              </th>
              <th
                className={`text-white font-bold text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-3 text-left whitespace-nowrap ${
                  isBurmese ? "leading-relaxed" : ""
                }`}
              >
                {t(translations.date.en, translations.date.mm)}
              </th>
              <th
                className={`text-white font-bold text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-3 text-left whitespace-nowrap ${
                  isBurmese ? "leading-relaxed" : ""
                }`}
              >
                {t(translations.actions.en, translations.actions.mm)}
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="py-8 text-center">
                  <ClipLoader color="#14AE5C" size={40} />
                </td>
              </tr>
            ) : trackData.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className={`py-8 text-center text-gray-500 text-sm sm:text-base ${
                    isBurmese ? "leading-relaxed" : ""
                  }`}
                >
                  {t(translations.noData.en, translations.noData.mm)}
                </td>
              </tr>
            ) : (
              trackData.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item.id)}
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <td className="px-3 py-3 sm:px-4 sm:py-3 text-sm sm:text-base whitespace-nowrap">
                    {item.trackName}
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-3 text-sm sm:text-base whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-3">
                    <div className="flex gap-3 sm:gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRename(item.id);
                        }}
                        className="text-[#14AE5C] hover:text-green-600 transition-colors"
                        aria-label={t(
                          translations.ariaRename.en,
                          translations.ariaRename.mm,
                        )}
                      >
                        <FiEdit2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label={t(
                          translations.ariaDelete.en,
                          translations.ariaDelete.mm,
                        )}
                      >
                        <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between items-center gap-2 text-sm sm:text-base">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || loading}
          className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 rounded-md disabled:opacity-50 hover:bg-gray-200 transition-colors w-full sm:w-auto"
        >
          {t(translations.previous.en, translations.previous.mm)}
        </button>

        <span className="text-gray-600">
          {t(
            translations.pageText(currentPage, totalPages).en,
            translations.pageText(currentPage, totalPages).mm,
          )}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages || loading}
          className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 rounded-md disabled:opacity-50 hover:bg-gray-200 transition-colors w-full sm:w-auto"
        >
          {t(translations.next.en, translations.next.mm)}
        </button>
      </div>
    </div>
  );
}
