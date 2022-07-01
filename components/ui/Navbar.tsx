import NextLink from "next/link";
import Image from "next/image";
import { Link, Spacer, Text, useTheme } from "@nextui-org/react";

export const Navbar = () => {
  // usar el ThemeProvider

  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0px 20px",
        backgroundColor: theme?.colors.gray50.value,
      }}
    >
      <NextLink href="/" passHref>
        <Link>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <Image
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
              alt="icono app"
              width={100}
              height={100}
            />
            <Text color="white" h2>
              P
            </Text>
            <Text color="white" h3>
              okémon
            </Text>
          </div>
        </Link>
      </NextLink>
      <Spacer
        css={{
          flex: 1,
        }}
      />
      <NextLink href="/favorites" passHref>
        <Link>
          <Text color="white">Favoritos</Text>
        </Link>
      </NextLink>
    </div>
  );
};
