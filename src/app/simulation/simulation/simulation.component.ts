import { Component, OnInit } from '@angular/core';
import { SimulationPokemon } from '../simulation-pokemon';
import { SimulationService } from '../simulation.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent {

  attackingPokemon: SimulationPokemon;
  paramId: number;
  defendingPokemon: SimulationPokemon;
  ATTACKING_POKEMON: string = "Attacking Pokemon";
  DEFENDING_POKEMON: string = "Defending Pokemon";
  battleResultsTitle: string;
  battleResults: string;
  damage: number;
  simulationForm: FormGroup;

  constructor(
    private simulationService: SimulationService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService,
    fb: FormBuilder
    ) {
      this.route.params.subscribe( params => {
        this.paramId = params.id;
      });
      this.simulationForm = fb.group({
        attacking_pokemon_id: [null, Validators.required],
        defending_pokemon_id: [null, Validators.required],
        moveid: [null, Validators.required],
        modifier: [1]
      })
  }

  isLogged() {
    return this.authService.isLogged();
  }

  updateAttackingPokemon(attackingPokemon: SimulationPokemon) {
    this.attackingPokemon = attackingPokemon;
  }

  updateDefendingPokemon(defendingPokemon: SimulationPokemon) {
    this.defendingPokemon = defendingPokemon;
  }

  simulateBattle() {
    let simulationDto = this.simulationForm.getRawValue();
    this.simulationService.getDamage(simulationDto).subscribe( resp => {
      const damage = resp.damage;
      const attacker_name = this.attackingPokemon.pokemon.pokemonSpecies.name
      const defender_name = this.defendingPokemon.pokemon.pokemonSpecies.name
      const movename = this.attackingPokemon.move.name
      const defenderHp = this.defendingPokemon.pokemon.hp
      this.battleResultsTitle = `Pokemon ${attacker_name.toUpperCase()} attacked ${defender_name.toUpperCase()} with ${movename}.`
      this.battleResults = `${movename} took ${damage} of damage.\n
      ${defender_name.toUpperCase()} HP dropped from ${defenderHp} to ${defenderHp - damage}.\n ${((damage/defenderHp) * 100).toFixed(0)}% of its total HP.\n
      ${resp.effect}`
    });
  }

  getCSSClass() {
    if (window.innerWidth <= 760) { // 768px portrait
      return '';
    }
    return 'flex-row flex-row-align-strech';
  }

}
