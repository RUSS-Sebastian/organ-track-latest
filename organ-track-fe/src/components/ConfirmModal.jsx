import React from "react";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Overlay */}
      <div className="absolute w-[402px] max-w-full h-auto bg-black bg-opacity-25 backdrop-blur-sm rounded-xl pointer-events-auto"></div>

      {/* Modal box */}
      <div className="relative w-[402px] max-w-full bg-white rounded-xl p-5 shadow-lg flex flex-col gap-4 font-roboto pointer-events-auto z-10">
        <h2 className="text-lg font-medium text-gray-800">{title}</h2>
        <p className="text-gray-600 text-sm">{message}</p>
        <div className="flex justify-end gap-3 mt-3">
          <button
            className={`px-4 py-2 rounded-md text-sm transition ${
              loading
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm transition ${
              loading
                ? "bg-red-400 text-white cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
