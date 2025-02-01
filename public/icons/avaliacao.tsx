import { FaStar } from "react-icons/fa";

export default function Avaliacao() {
  return (
    <div className="flex justify-around ">
      {/* Ícone Home */}
      <div className="flex flex-row items-center">
        <p className="text-black">4.9</p>
        <FaStar size={15} style={{ color: "#FFDA03", marginLeft: 5 }} />
      </div>
    </div>
  );
}
