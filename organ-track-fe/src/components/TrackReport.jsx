import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi"; // rename & delete icons
import ClipLoader from "react-spinners/ClipLoader"; // professional spinner

export default function TrackReport() {
  const itemsPerPage = 10;

  // --- State ---
  const [reportData, setReportData] = useState([]); // current page's data
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // --- Fetch function simulating backend ---
  const fetchReportData = async (page) => {
    setLoading(true); // prevent multiple clicks

    // simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 700));

    // simulate backend total
    const simulatedTotal = 47; // assume backend has 47 reports
    const simulatedData = Array.from({ length: itemsPerPage }, (_, i) => {
      const id = (page - 1) * itemsPerPage + i + 1;
      if (id > simulatedTotal) return null; // don't exceed total
      return {
        id,
        reportName: `Report ${id}`,
        date: new Date(Date.now() - id * 86400000).toLocaleString(),
      };
    }).filter(Boolean);

    setReportData(simulatedData);
    setTotalPages(Math.ceil(simulatedTotal / itemsPerPage));
    setLoading(false);
  };

  // --- Load data on page change ---
  useEffect(() => {
    fetchReportData(currentPage);
  }, [currentPage]);

  // --- Rename Report Handler ---
  const handleRename = (id) => {
    const newName = prompt("Enter new Report name:");
    if (!newName) return;

    // simulate backend update
    setReportData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, reportName: newName } : item,
      ),
    );
    // In real backend:
    // fetch(`/api/track-history/${id}`, { method: "PUT", body: JSON.stringify({ trackName: newName }) })
  };

  // --- Delete Report Handler ---
  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this report?")) return;

    // simulate backend delete
    setLoading(true);
    setTimeout(() => {
      // After delete, refetch current page
      fetchReportData(currentPage);
    }, 500);
    // In real backend:
    // fetch(`/api/track-history/${id}`, { method: "DELETE" })
  };

  const handleRowClick = (id) => {
    alert(`Clicked row with ID ${id}`);
    // Later you can navigate or show report details
    // e.g., router.push(`/report/${id}`) in React Router
  };

  return (
    <div className="w-full bg-white p-1 rounded-lg shadow-md  flex flex-col">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#14AE5C]">
            <tr>
              <th className="text-white font-bold font-['Montserrat'] text-[14px] px-2 py-2 text-left">
                Report Name
              </th>
              <th className="text-white font-bold font-['Montserrat'] text-[14px] px-2 py-2 text-left">
                Generated at
              </th>
              <th className="text-white font-bold font-['Montserrat'] text-[14px] px-2 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="py-8 text-center">
                  {/* Professional spinner */}
                  <ClipLoader color="#14AE5C" size={40} />
                </td>
              </tr>
            ) : reportData.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-black">
                  No report history available.
                </td>
              </tr>
            ) : (
              reportData.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item.id)}
                  className="cursor-pointer hover:bg-gray-200"
                >
                  {/* Report Name with padding */}
                  <td className="px-2 py-3 text-black font-['Montserrat'] text-[14px]">
                    {item.reportName}
                  </td>
                  <td className="px-2 py-3 text-black font-['Montserrat'] text-[14px]">
                    {item.date}
                  </td>
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
        <span className="text-black font-['Montserrat']">
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
