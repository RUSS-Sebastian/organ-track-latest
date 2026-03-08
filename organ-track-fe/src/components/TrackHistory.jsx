import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

export default function TrackHistory() {
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const [trackData, setTrackData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:8000/api";

  // Fetch tracks from Laravel API
  const fetchTrackData = async (page) => {
    setLoading(true);

    const token = localStorage.getItem("token"); // Get token from localStorage

    try {
      const response = await fetch(
        `${API_URL}/tracks?page=${page}&perPage=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const result = await response.json();

      const formatted = result.data.map((item) => ({
        id: item.id,
        trackName: item.report_name ?? `Track ${item.id}`,
        organ: "Unknown",
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
    const newName = prompt("Enter new track name:");
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
        body: JSON.stringify({
          report_name: newName,
        }),
      });

      fetchTrackData(currentPage);
    } catch (error) {
      console.error("Rename error:", error);
    }
  };

  // Delete track
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this track?")) return;

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
    <div className="w-full bg-white p-1 rounded-lg shadow-md flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#14AE5C]">
            <tr>
              <th className="text-white font-bold text-[14px] px-2 py-2 text-left">
                Track Name
              </th>
              <th className="text-white font-bold text-[14px] px-2 py-2 text-left">
                Organ
              </th>
              <th className="text-white font-bold text-[14px] px-2 py-2 text-left">
                Date
              </th>
              <th className="text-white font-bold text-[14px] px-2 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="py-8 text-center">
                  <ClipLoader color="#14AE5C" size={40} />
                </td>
              </tr>
            ) : trackData.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center">
                  No track history available.
                </td>
              </tr>
            ) : (
              trackData.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item.id)}
                  className="cursor-pointer hover:bg-gray-200"
                >
                  <td className="px-2 py-3 text-[14px]">{item.trackName}</td>
                  <td className="px-2 py-3 text-[14px]">{item.organ}</td>
                  <td className="px-2 py-3 text-[14px]">{item.date}</td>
                  <td className="px-2 py-3 flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRename(item.id);
                      }}
                      className="text-[#14AE5C] hover:text-green-600"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || loading}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages || loading}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

//211