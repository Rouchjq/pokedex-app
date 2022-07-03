import { useEffect, useState } from "react";

import { Card, Container, Grid, Image, Text } from "@nextui-org/react";

import { localFavorites } from "../../utils";
import { Layout } from "../../components/layouts";
import { NoFavorites } from "../../components/ui";
import { FavoritePokemon } from "../../components/pokemon";

const FavoritePage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Favoritos">
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemon favoritePokemons={favoritePokemons} />
      )}
    </Layout>
  );
};

export default FavoritePage;
