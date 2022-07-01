import axios from "axios";

const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

//Expulsar siempre por default cuando se trabaja con AXIOS, para luego poder trabjar con interceptores, tokes, etc
export default pokeApi;
