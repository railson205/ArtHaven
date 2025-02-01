import Image from "next/image";

interface RedeSocialProps {
  src: string;
  alt: string;
  nome: string;
}

export default function RedeSocial({ src, alt, nome }: RedeSocialProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingRight: "2.5rem", // pr-10 equivalente
      }}
    >
      {/* Contêiner da imagem */}
      <div
        style={{
          position: "relative",
          width: "4rem", // w-32 equivalente
          height: "4rem", // h-32 equivalente
          alignContent: "center",
        }}
      >
        <Image
          src={src}
          alt={alt}
          height={64}
          width={64}
          style={{
            borderRadius: "0.5rem", // rounded-lg equivalente
            objectFit: "cover",
          }}
        />
      </div>

      {/* Texto abaixo da imagem */}
      <p
        style={{
          color: "black",
          marginTop: "0.5rem", // mt-2 equivalente
        }}
      >
        {nome}
      </p>
    </div>
  );
}
