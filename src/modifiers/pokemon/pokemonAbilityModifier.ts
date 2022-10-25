import {
  PokemonAbilities,
  PokemonSearchResponse,
} from "../../interfaces/pokemon";
export const pokemonAbilityModifier = ({
  abilities,
}: PokemonSearchResponse): PokemonAbilities => {
  return abilities.map((ability) => ability.ability);
};
