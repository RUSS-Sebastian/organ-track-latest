import ReportHistory from "../components/TrackReport";

export default function Report() {
  return (
    <div className="min-h-[982px] w-full flex justify-center bg-white">
      {/* Mobile container */}
      <div className="w-full max-w-[402px] px-1 pt-6 pb-10">
        {/* Header + Button Row */}
        <div className="flex justify-between items-center">
          <h1 className="text-[#14AE5C] font-bold text-[24px] font-['Roboto']">
            Report Store
          </h1>

          <button
            className="bg-[#14AE5C] text-white font-bold text-[12px] font-['Montserrat'] px-4 py-2 rounded-[8px]"
            style={{ width: "123px", height: "32px" }}
          >
            + New Report
          </button>
        </div>

        <div className="w-full max-w-[402px] rounded-lg mt-8">
          <ReportHistory />
        </div>

        {/* Other content below */}
      </div>
    </div>
  );
}
