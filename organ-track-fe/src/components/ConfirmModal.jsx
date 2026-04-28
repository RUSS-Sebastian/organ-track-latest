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
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm p-4">
    {/* Modal box – fluid width, soft limits */}
    <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white rounded-xl shadow-lg p-5 sm:p-6 flex flex-col gap-4">
      <h2 className="text-lg sm:text-xl font-medium text-gray-800">{title}</h2>
      <p className="text-gray-600 text-sm sm:text-base">{message}</p>
      <div className="flex justify-end gap-3 mt-3">
        <button
          className={`px-4 py-2 rounded-md text-sm sm:text-base transition ${
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
          className={`px-4 py-2 rounded-md text-sm sm:text-base transition ${
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
