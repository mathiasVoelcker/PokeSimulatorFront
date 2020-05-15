import { Pokemon } from "../pokemon/entities/pokemon";
import { Move } from "../moves/move";

export class SimulationPokemon {
    pokemon: Pokemon;
    move: Move;

    constructor(pokemon: Pokemon) {
        this.pokemon = pokemon;
    }
}