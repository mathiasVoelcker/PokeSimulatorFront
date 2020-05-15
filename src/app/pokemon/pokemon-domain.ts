import { PokemonSpecies } from './entities/pokemon-species';

export class PokemonDomain {

  static getImgUrl(pokemonSpecies: PokemonSpecies) {
    if (!!pokemonSpecies) {
      return `https://img.pokemondb.net/artwork/${pokemonSpecies.name}.jpg`;
    }
    return '';
  }
}
