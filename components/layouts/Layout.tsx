import { FC } from "react";
import Head from "next/head";
import { title } from "process";
import { Navbar } from "../ui";

interface Props {
  title?: string;
  children: React.ReactNode;
}

export const Layout: FC<Props> = ({ children, title = "Pokedex App" }) => {
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
