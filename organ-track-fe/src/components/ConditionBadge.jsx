export default function ConditionBadge({ status, displayLabel }) {
  const getColor = () => {
    switch (status) {
      case "Good":
        return "bg-[#2DF251] text-black";
      case "Moderate":
        return "bg-[#FDE31E] text-black";
      case "Needs Attention":
        return "bg-[#ED0C05] text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <div
      className={`flex items-center justify-center 
      w-[171px] h-[36px] 
      rounded-[16px] 
      font-semibold text-sm md:text-base 
      ${getColor()}`}
    >
      {displayLabel || status}
    </div>
  );
}
