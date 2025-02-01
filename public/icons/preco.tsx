import { FaDollarSign } from "react-icons/fa";

export default function Preco() {
  return (
    <div>
      <div className="flex justify-around pl-4">
        {/* Ícone Home */}
        <div className="flex flex-row items-center">
          <FaDollarSign size={15} style={{ color: "green", marginRight: 5 }} />
          <p className="text-black">Ótimo Preço</p>
        </div>
      </div>
    </div>
  );
}
