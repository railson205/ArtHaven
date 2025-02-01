import Image from "next/image";

const imagens = [
  "/assets/lista-midias/imagem_1.jpg",
  "/assets/lista-midias/imagem_2.jpg",
  "/assets/lista-midias/imagem_3.jpg",
  "/assets/lista-midias/imagem_4.jpg",
  "/assets/lista-midias/imagem_5.png",
  "/assets/lista-midias/imagem_6.jpg",
  "/assets/lista-midias/imagem_7.jpeg",
  "/assets/lista-midias/imagem_8.jpg",
  "/assets/lista-midias/imagem_9.jpg",
  "/assets/lista-midias/imagem_10.jpg",
];

export default function Midias() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "16px",
        padding: "16px",
      }}
    >
      {imagens.map((src, index) => (
        <div
          key={index}
          style={{
            width: "100%",
            maxWidth: "300px",
            backgroundColor: "#f4f4f4",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "256px",
            }}
          >
            <Image
              src={src}
              alt={`Imagem ${index + 1}`}
              width={300}
              height={300}
              style={{
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
