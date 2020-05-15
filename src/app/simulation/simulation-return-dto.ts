export class SimulationReturnDto {
    damage: number;
    effect: string;

    constructor(damage: number, effect: string) {
        this.damage = damage;
        this.effect = effect;
    }
}