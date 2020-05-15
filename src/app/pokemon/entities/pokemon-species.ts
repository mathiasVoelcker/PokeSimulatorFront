import { Type } from "../../type/type";
import { Move } from "../../moves/move";


export class PokemonSpecies {
    id: number;
    nationalNumb: number;
    name: string;
    baseHp: number;
    baseAttack: number;
    baseDefense: number;
    baseSpAttack: number;
    baseSpDefense: number
    baseSpeed: number;
    firstType: Type;
    secondType: Type;
    moves: Move[];
}
