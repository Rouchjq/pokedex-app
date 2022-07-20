import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import confetti from 'canvas-confetti';

import { Layout } from '../../components/layouts';
import { getPokemonInfo, localFavorites } from '../../utils';
import { pokeApi } from '../../api';
import { PokemonInfo } from '../../components/pokemon';
import { Pokemon } from '../../interfaces';
interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const router = useRouter();
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
  //crear un array con 151 ids
  const pokemons151: string[] = Array.from(
    { length: 151 },
    (_, i) => `${i + 1}`
  );
  return {
    paths: pokemons151.map((id) => ({ params: { id } })),
    // fallback: false, //Hace que muestre el 404 si no encuentra la pagina id
    fallback: 'blocking', //permite que pase la pagina si no encuentra la pagina id

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
  const pokemon = await getPokemonInfo(id);
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
      pokemon: await getPokemonInfo(id),
    },
    revalidate: 10, //Genera el ISR para la pagina
  };
};
