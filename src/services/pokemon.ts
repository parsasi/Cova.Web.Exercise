import { PokemonAbilities } from "../interfaces/pokemon";
import { POKEMON_BASE_URL, POKEMON_ENDPOINTS } from "./endpoints";
import { getUrlGetterFromEndpoints } from "../utils/getUrl";
import { pokemonAbilityModifier } from "../modifiers/pokemon/pokemonAbilityModifier";
import axios from "axios";

const getPokemonUrl = getUrlGetterFromEndpoints(
  POKEMON_BASE_URL,
  POKEMON_ENDPOINTS
);

export const getPokemonAbilities = async (
  pokemon: string
): Promise<PokemonAbilities> => {
  if (pokemon) {
    const searchUrl = getPokemonUrl("SEARCH", [pokemon]);
    const rawResults = await axios.get(searchUrl);
    return pokemonAbilityModifier(rawResults.data);
  }

  return Promise.resolve([]);
};
