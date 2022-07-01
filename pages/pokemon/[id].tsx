import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { pokeApi } from "../../api";

import { Layout } from "../../components/layouts";
import { PokemonInfo } from "../../components/pokemon";
import { Pokemon } from "../../interfaces";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const router = useRouter();

  return (
    <Layout title={pokemon.name}>
      <PokemonInfo pokemon={pokemon} />
    </Layout>
  );
};

export default PokemonPage;

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  // const { data } = await
  //crear un array con 15 ids
  const pokemons151 = Array.from({ length: 151 }, (_, i) => `${i + 1}`);
  return {
    paths: pokemons151.map((id) => ({ params: { id } })),
    fallback: false,

    //asi funciona!!!
    // paths: [
    //   {
    //     params: {
    //       id: "1",
    //     },
    //   },
    //   {
    //     params: {
    //       id: "2",
    //     },
    //   },
    //   {
    //     params: {
    //       id: "3",
    //     },
    //   },
    // ],
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  //Obtengo el Id del pokemon de los parametros del URL utilizando el contexto (ctx)
  const { id } = ctx.params as { id: string };

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data,
    },
  };
};
