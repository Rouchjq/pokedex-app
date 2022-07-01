import { FC } from "react";
import {
  Grid,
  Card,
  Button,
  Container,
  Text,
  Image,
  Progress,
} from "@nextui-org/react";
import { Pokemon } from "../../interfaces";

interface Props {
  pokemon: Pokemon;
}

interface StatsColors {
  hp: string;
  attack: string;
  defense: string;
  speed: string;
  ["special-attack"]: string;
  ["special-defense"]: string;
}

export const PokemonInfo: FC<Props> = ({ pokemon }) => {
  console.log(pokemon.moves);

  const colors: StatsColors = {
    hp: "error",
    attack: "success",
    defense: "primary",
    speed: "warning",
    ["special-attack"]: "secondary",
    ["special-defense"]: "default",
  };

  return (
    <Grid.Container
      css={{
        marginTop: "5px",
        width: "100%",
      }}
      gap={2}
    >
      <Grid xs={12} sm={4}>
        <Card
          isHoverable
          css={{
            padding: "30px",
            width: "100%",
          }}
        >
          <Card.Body>
            <Card.Image
              src={
                pokemon.sprites.other?.dream_world.front_default ||
                "no-image.png"
              }
              alt="pokemon.name"
              width="100%"
              height="200px"
            />
          </Card.Body>
        </Card>
      </Grid>
      <Grid xs={12} sm={8}>
        <Card>
          <Card.Header
            css={{
              display: "flex",
              justifyContent: "space-between",
              "@media (max-width: 768px)": {
                flexDirection: "column",
              },
            }}
          >
            <Text h1 transform="capitalize">
              {pokemon.name}
            </Text>
            <Button color="gradient" ghost>
              Guardar en favoritos
            </Button>
          </Card.Header>
          <Card.Body>
            <Text size={30}>Sprites:</Text>
            <Container direction="row" display="flex">
              <Image
                src={pokemon.sprites.front_default}
                alt="pokemon.name"
                width={200}
                height={200}
                css={{
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
              <Image
                src={pokemon.sprites.back_default}
                alt="pokemon.name"
                width={200}
                height={200}
                css={{
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
              <Image
                src={pokemon.sprites.front_shiny}
                alt="pokemon.name"
                width={200}
                height={200}
                css={{
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
              <Image
                src={pokemon.sprites.back_shiny}
                alt="pokemon.name"
                width={200}
                height={200}
                css={{
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
            </Container>
          </Card.Body>
        </Card>
      </Grid>
      {/* //*Container de la segunda seccion */}
      {/* Stats pokemon */}
      <Grid xs={12} sm={6}>
        <Card
          css={{
            padding: "20px",
          }}
        >
          <Card.Header>
            <Text h2>Stats</Text>
          </Card.Header>
          <Card.Divider />
          {pokemon.stats.map((stat) => (
            <Card.Body key={stat.stat.name}>
              <Text
                transform="capitalize"
                css={{
                  fontSize: "1rem",
                }}
              >
                {stat.stat.name}
              </Text>
              <Progress
                shadow
                value={stat.base_stat}
                color={colors[stat.stat.name]}
                status={colors[stat.stat.name]}
              />
              <Text
                css={{
                  mt: "5px",
                  textAlign: "end",
                }}
              >
                {stat.base_stat}/100
              </Text>
            </Card.Body>
          ))}
        </Card>
      </Grid>
      {/* Moves Pokemon */}
      <Grid xs={12} sm={6}>
        <Card
          css={{
            padding: "20px",
            height: "636px",
          }}
        >
          <Card.Header>
            <Text h2 transform="capitalize">
              Moves
            </Text>
          </Card.Header>
          <Card.Divider />
          <Card.Body
            css={{
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {pokemon.moves.map((move, i) => {
              console.log(move);
              return (
                <Container
                  key={move.move.name}
                  css={{
                    margin: "20px 0",
                    border: "solid 1px $gray500",
                    textAlign: "center",
                    borderRadius: "10px",
                  }}
                >
                  <Text size={20} transform="capitalize">
                    {move.move.name}
                  </Text>
                </Container>
              );
            })}
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};
