import { FaClock } from "react-icons/fa";

export default function Rapido() {
  return (
    <div>
      <div className="flex justify-around pl-4">
        {/* Ícone Home */}
        <div className="flex flex-row items-center">
          <FaClock size={15} style={{ color: "green", marginRight: 5 }} />
          <p className="text-black">Rápido</p>
        </div>
      </div>
    </div>
  );
}
