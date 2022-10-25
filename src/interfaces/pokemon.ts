// Do not modify these interfaces
export interface PokemonAbility {
  name: string;
  url: string;
  image?: string;
}

export type PokemonAbilities = Array<PokemonAbility>;

export interface PokemonSearchResponseAbility {
  ability: PokemonAbility;
  is_hidden: boolean;
}

export interface PokemonSearchResponse {
  abilities: Array<PokemonSearchResponseAbility>;
  id: number;
  name: string;
  moves: unknown[];
}

export interface PokemonSearchForm {
  searchValue: string;
}
