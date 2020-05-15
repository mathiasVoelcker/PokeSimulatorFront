import { PokemonService } from "../pokemon.service";
import { PokemonSpecies } from "./pokemon-species";
import { Move } from "../../moves/move";
import { Nature } from 'src/app/nature/nature';

export class Pokemon {
    id: number;
    pokemonSpecies: PokemonSpecies;
    nature: Nature;
    userId: number;
    nickname: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number
    speed: number;
    evHp: number;
    evAttack: number;
    evDefense: number;
    evSpAttack: number;
    evSpDefense: number
    evSpeed: number;
    ivHp: number;
    ivAttack: number;
    ivDefense: number;
    ivSpAttack: number;
    ivSpDefense: number
    ivSpeed: number;
    move1: Move;
    move2: Move;
    move3: Move;
    move4: Move;
}
