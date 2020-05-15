export class SimulationDto {
    attacking_pokemon_id: number;
    defending_pokemon_id: number;
    moveid: number;
    modifier: number;

    constructor(attacking_pokemon_id: number, defending_pokemon_id: number, moveid: number, modifier: number) {
        this.attacking_pokemon_id = attacking_pokemon_id;
        this.defending_pokemon_id = defending_pokemon_id;
        this.moveid = moveid;
        this.modifier = modifier;
    }
}