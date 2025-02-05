import { FaStar } from "react-icons/fa";

interface AvalicaoProps {
  avaliacao: number;
}

export default function Avaliacao({ avaliacao }: AvalicaoProps) {
  return (
    <div className="flex justify-around ">
      {/* Ícone Home */}
      <div className="flex flex-row items-center">
        <p className="text-black">{avaliacao.toFixed(1)}</p>
        <FaStar size={15} style={{ color: "#FFDA03", marginLeft: 5 }} />
      </div>
    </div>
  );
}
