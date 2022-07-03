import { FC } from "react";
import Head from "next/head";

import { Navbar } from "../ui";

interface Props {
  title?: string;
  children: React.ReactNode;
}

export const Layout: FC<Props> = ({ children, title = "Pokedex App" }) => {
  //en origin obtengo la url actual
  const origin = typeof window === "undefined" ? "" : window.location.origin;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Jorge Quintero" />
        <meta
          name="description"
          content={`Informacioon sobre el pokemon ${title}`}
        />
        <meta name="keywords" content={`${title}. pokemon, pokedex`} />

        <meta property="og:title" content={`Informacion sobre: ${title}`} />
        <meta
          property="og:description"
          content={`Esta es la pagina sobre las estadisticas y habilidades de ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/rotomdex.jpeg`} />
      </Head>

      <Navbar />

      <main
        style={{
          padding: "0px 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
