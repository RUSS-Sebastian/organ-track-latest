import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Thanks() {
  const navigate = useNavigate();
  const { type } = useParams(); // type = "daily" or "syms"

  return (
    <div className="min-h-[874px] w-full flex justify-center items-start bg-[#14AE5C] pt-20">
      <div className="w-[362px] h-[398px] bg-white rounded-[20px] p-6 flex flex-col justify-center">
        <h1 className="text-[36px] font-bold font-['Roboto'] mb-4">
          Thank You
        </h1>

        <h2 className="text-[24px] font-medium font-['Roboto'] mb-2">
          For Taking Questions
        </h2>

        <p className="text-[20px] font-['Roboto'] mb-6">
          {type === "daily"
            ? "Check your results at Home"
            : "Check your results"}
        </p>

        <button
          className="w-[132px] h-[50px] bg-[#354CDF] text-white font-semibold font-['Roboto'] rounded-md"
          onClick={() => {
            if (type === "daily") {
              navigate("/"); // home
            } else {
              navigate("/report"); // organ results
            }
          }}
        >
          {type === "daily" ? "Go Home" : "View Now"}
        </button>
      </div>
    </div>
  );
}
