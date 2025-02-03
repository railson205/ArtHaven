"use client";

import { useState } from "react";
import { Search, User, Menu, ShoppingCart } from "lucide-react"; // Importando o ícone de carrinho
import Link from "next/link";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "rgba(59, 130, 246, 1)",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Botão do Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "black", marginRight: "1rem" }}
          aria-label="Abrir menu"
        >
          <Menu size={24} />
        </button>

        {/* Nome da Página */}
        <h1 style={{ fontSize: "1.25rem", fontWeight: "600", color: "black" }}>
          {title}
        </h1>
      </div>

      {/* Barra de Pesquisa */}
      <div
        style={{
          position: "relative",
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "200px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Search
            style={{ color: "#6b7280", position: "absolute", left: "0.5rem" }}
            size={18}
          />
          <input
            type="text"
            placeholder="Pesquisar"
            style={{
              paddingLeft: "2rem",
              paddingRight: "1rem",
              paddingTop: "0.25rem",
              paddingBottom: "0.25rem",
              backgroundColor: "#e5e7eb",
              borderRadius: "0.375rem",
              border: "none",
              outline: "none",
              width: "100%",
              color: "black",
            }}
          />
        </div>
      </div>

      {/* Botão de Login e Ícone de Perfil */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Botão de Carrinho */}
        <Link href="/carrinho">
          <button
            style={{ color: "black", marginRight: "1rem" }}
            aria-label="Carrinho"
          >
            <ShoppingCart size={24} />
          </button>
        </Link>
        <Link href="/perfil">
          <button className="p-4">
            <User size={24} style={{ color: "black" }} />
          </button>
        </Link>
      </div>
    </header>
  );
}
