interface BotaoInterface {
  nome: string;
  clicar: () => void;
}
export const Botao_historico = ({ nome, clicar }: BotaoInterface) => (
  <button
    onClick={clicar}
    className="bg-white hover:bg-gray-500 text-sm sm:text-base px-4 py-2 rounded-md flex items-center justify-center border"
  >
    <p>{nome}</p>
  </button>
);
