import React from "react";

interface TextProps {
  variant?: "h1" | "h2" | "h3" | "p"; // Tipos de texto: título, parágrafo
  children: React.ReactNode; // Conteúdo a ser exibido
  className?: string; // Classe adicional para customização
}

const Text: React.FC<TextProps> = ({
  variant = "p",
  children,
  className = "",
}) => {
  // Renderiza de acordo com o tipo (h1, h2, h3 ou p)
  switch (variant) {
    case "h1":
      return <h1 className={`text-3xl font-bold ${className}`}>{children}</h1>;
    case "h2":
      return (
        <h2 className={`text-2xl font-semibold ${className}`}>{children}</h2>
      );
    case "h3":
      return <h3 className={`text-xl font-medium ${className}`}>{children}</h3>;
    default:
      return <p className={`text-base ${className}`}>{children}</p>;
  }
};

export default Text;
