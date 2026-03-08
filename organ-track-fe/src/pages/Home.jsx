import { useState, useEffect } from "react";
import ConditionBadge from "../components/ConditionBadge";
import organImages from "../data/organImages";
import { useUser } from "../context/UserContext";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "../api/axios";

export default function Home() {
  const [user1, setUser] = useState(null);
  const { user } = useUser();
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("/latest-organ-status", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching organ status:", error);
        setUser(null);
      } finally {
        setLoading(false); // hide spinner
      }
    };

    fetchUser();
  }, []);

  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 16) return "Good Afternoon";
    if (hour >= 16 && hour < 20) return "Good Evening";
    return "Good Night";
  };

  const organStatuses = user1?.organHealth
    ? Object.values(user1.organHealth)
        .filter((organ) => organ !== null)
        .map((organ) => organ.status)
    : [];

  const goodCount = organStatuses.filter((s) => s === "Good").length;
  const moderateCount = organStatuses.filter((s) => s === "Moderate").length;
  const needsAttentionCount = organStatuses.filter(
    (s) => s === "Needs Attention",
  ).length;

  const organEntries = user1?.organHealth
    ? Object.entries(user1.organHealth).filter(([key, value]) => value !== null)
    : [];

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 bg-white bg-opacity-50 flex items-center justify-center">
          <ClipLoader color="#4DD880" size={80} />
        </div>
      )}
      {/* Scrollable content */}
      <div className="flex-1 overflow-auto ">
        <div className="max-w-[402px] md:max-w-3xl mx-auto px-4 py-4  space-y-6">
          {/* Dynamic Greeting */}
          <p className="text-left text-[20px] md:text-3xl font-roboto font-semibold">
            {getGreeting()}!{" "}
            <span className="font-bold text-[#4DD880]">{user.name}</span>
          </p>

          {/* Subtitle */}
          <p className="text-left text-[16px] md:text-lg font-normal mt-2">
            Track today’s habits and see how they affect your organs.
          </p>

          {/* Section Title */}
          <p className="text-center text-[16px] md:text-xl font-semibold mt-6">
            Your Organ Health Overview
          </p>

          {/* Condition Summary Section */}
          <div className="flex items-center gap-6 mt-6">
            {/* Good */}
            <div className="flex items-center gap-2">
              <div className="w-[20px] h-[20px] md:w-[28px] md:h-[28px] rounded-full bg-[#2DF251]" />
              <p className="text-[14px] md:text-base font-medium">
                {goodCount}
              </p>
            </div>

            {/* Moderate */}
            <div className="flex items-center gap-2">
              <div className="w-[20px] h-[20px] md:w-[28px] md:h-[28px] rounded-full bg-[#FDE31E]" />
              <p className="text-[14px] md:text-base font-medium">
                {moderateCount}
              </p>
            </div>

            {/* Needs Attention */}
            <div className="flex items-center gap-2">
              <div className="w-[20px] h-[20px] md:w-[28px] md:h-[28px] rounded-full bg-[#ED0C05]" />
              <p className="text-[14px] md:text-base font-medium">
                {needsAttentionCount}
              </p>
            </div>
          </div>
          {/* Organ Grid */}
          <div className="grid grid-cols-2  gap-6 mt-8">
            {organEntries.map(([organName, organData]) => (
              <div
                key={organName}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => console.log(organName)}
              >
                {/* Image Container */}
                <div className="w-[171px] h-[171px]  bg-[#1E1B39] flex items-center justify-center rounded-xl border border-yellow-500">
                  <img
                    src={organImages[organName]}
                    alt={organName}
                    className="w-[150px] h-[150px]  object-contain"
                  />
                </div>

                {/* Status Badge */}
                <div className="mt-3">
                  <ConditionBadge status={organData.status} />
                </div>
              </div>
            ))}
          </div>

          {/* Future content goes here */}
        </div>
      </div>
    </div>
  );
}
