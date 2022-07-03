import { NextPage, GetStaticProps } from "next";

import { Grid } from "@nextui-org/react";

import { Layout } from "../components/layouts";
import { pokeApi } from "../api";
import { PokemonListResponse, SmallPokemon } from "../interfaces";
import { PokemonCard } from "../components/pokemon";

interface Props {
  pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Pokedex App">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon, i) => (
          <PokemonCard key={i} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

export default Home;

//solo se ejecuta en build time 1 sola vez
//usarlo siempre y cuando sepa que es una pagina estatica y que su contenido no va a cambiar
export const getStaticProps: GetStaticProps = async (ctx) => {
  const resp = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  const { data } = resp;

  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg

  const pokemons: SmallPokemon[] = data.results.map((pokemon, i) => ({
    ...pokemon, //name, url
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
      i + 1
    }.png`,
  }));
  //asi se escribe un .map sin return, el ultimo parentesis de adentro hace de un "return"
  return {
    props: {
      pokemons: pokemons,
    },
  };
};
