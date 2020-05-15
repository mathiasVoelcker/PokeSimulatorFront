import { Pokemon } from "../pokemon/entities/pokemon";

export class BattleResults {
    attacking_pokemon: Pokemon
    defending_pokemon: Pokemon
    damage: number

    constructor(attacking_pokemon: Pokemon, defending_pokemon: Pokemon, damage: number) {
        this.attacking_pokemon = attacking_pokemon;
        this.defending_pokemon = defending_pokemon;
        this.damage = damage;
    }
}