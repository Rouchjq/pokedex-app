import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import confetti from 'canvas-confetti';

import { Layout } from '../../components/layouts';
import { getPokemonInfo, localFavorites } from '../../utils';
import { pokeApi } from '../../api';
import { PokemonInfo } from '../../components/pokemon';
import { Pokemon } from '../../interfaces';
import { Sprites } from '../../interfaces/pokemon-info';
import {
  PokemonListResponse,
  SmallPokemon,
} from '../../interfaces/pokemon-list';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInfavorites, setIsInfavorites] = useState(false);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorites(pokemon.id);
    setIsInfavorites(!isInfavorites);

    if (!isInfavorites) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        },
      });
    }
  };

  useEffect(() => {
    setIsInfavorites(localFavorites.existInFavorites(pokemon.id));
  }, [pokemon.id]);

  return (
    <Layout title={pokemon.name}>
      <PokemonInfo
        pokemon={pokemon}
        onToggleFavorite={onToggleFavorite}
        isInfavorites={isInfavorites}
      />
    </Layout>
  );
};

export default PokemonPage;

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>(`pokemon?limit=151`);
  const pokemonsName151: string[] = data.results.map((pokemon) => pokemon.name);

  return {
    paths: pokemonsName151.map((name) => ({ params: { name } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { name } = ctx.params as { name: string };
  const pokemon = await getPokemonInfo(name);
  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      pokemon,
    },
    revalidate: 10,
  };
};
