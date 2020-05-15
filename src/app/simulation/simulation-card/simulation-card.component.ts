import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { PokemonService } from '../../pokemon/pokemon.service';
import { Pokemon } from '../../pokemon/entities/pokemon';
import { BasicDropdownEntity } from '../../shared/layouts/basic-dropdown/basic-dropdown-entity';
import { MoveCategoryPipe } from '../../shared/pipes/move-category.pipe';
import { SimulationPokemon } from '../simulation-pokemon';
import { FormGroup } from '../../../../node_modules/@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { PokemonDomain } from '../../pokemon/pokemon-domain';
import { BasicDropdownComponent } from 'src/app/shared/layouts/basic-dropdown/basic-dropdown.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-simulation-card',
  templateUrl: './simulation-card.component.html',
  styleUrls: ['./simulation-card.component.css'],
})
export class SimulationCardComponent implements OnInit {

  pokemonsDropdown: BasicDropdownEntity[] = [];
  movesDropdown: BasicDropdownEntity[];
  pokemons: Pokemon[];
  simulationPokemon: SimulationPokemon;

  POKEMON_DROPDOWN_TITLE = 'Pokemon';
  moveDROPDOWN_TITLE = 'Move'

  @Input()
  simulationForm: FormGroup;

  @Input()
  title: string

  @Input()
  isAttacking: boolean = false;
  
  @Input()
  selectedPokemon: number;

  @Output()
  changed = new EventEmitter<SimulationPokemon>();

  clearMoveDrop: Subject<boolean> = new Subject();

  constructor(
    private authService: AuthService,
    private pokemonService: PokemonService) {
   }

  ngOnInit() {
    this.listPokemons();
  }

  listPokemons() {
    this.pokemonService.listPokemons().subscribe( resp => {
      this.pokemons = resp;
      resp.forEach(pokemon => {
        const pokemonName = `${pokemon.pokemonSpecies.name.toUpperCase()} - level ${pokemon.level}`
        this.pokemonsDropdown.push(new BasicDropdownEntity(pokemon.id, pokemonName));
      });
      if (!!this.selectedPokemon) {
        this.setPokemon(this.selectedPokemon.toString());
      }
    })
  }

  setPokemon(id: string) {
    this.clearForm();
    if (this.authService.isLogged())
    {
      this.pokemonService.getPokemon(id).subscribe(resp => {
        this.simulationPokemon = new SimulationPokemon(resp);
        if (this.isAttacking) {
          this.simulationForm.get('attacking_pokemon_id').setValue(resp.id);
          this.movesDropdown = []
          if(!!resp.move1) {
            let move1_text = `${resp.move1.name} - Power: ${resp.move1.basePower} - ${resp.move1.category}`
            this.movesDropdown.push(new BasicDropdownEntity(1, move1_text));
          }
          if (!!resp.move2) {
            let move2_text = `${resp.move2.name} - Power: ${resp.move2.basePower} - ${resp.move2.category}`
            this.movesDropdown.push(new BasicDropdownEntity(2, move2_text));
          }
          if (!!resp.move3) {
            let move3_text = `${resp.move3.name} - Power: ${resp.move3.basePower} - ${resp.move3.category}`
            this.movesDropdown.push(new BasicDropdownEntity(3, move3_text));
          }
          if (!!resp.move4) {
            let move4_text = `${resp.move4.name} - Power: ${resp.move4.basePower} - ${resp.move4.category}`
            this.movesDropdown.push(new BasicDropdownEntity(4, move4_text));
          }
        } else {
          this.simulationForm.get('defending_pokemon_id').setValue(resp.id);
        }
        this.changed.emit(this.simulationPokemon);
      });
    }
    else {
      this.setPokemonCache(+id);
    }
  }

  clearForm() {
    this.movesDropdown = []
    this.clearMoveDrop.next(true);
    // if (this.isAttacking)
    // {
    //   this.simulationForm.get('moveid').setValue(0);
    // }
    this.changed.emit(null);
    
  }

  setPokemonCache(id: number) {
    let selectedPokemon = this.pokemons.find(x => x.id == id);
    this.simulationPokemon = new SimulationPokemon(selectedPokemon);
    if (this.isAttacking) {
      this.simulationForm.get('attacking_pokemon_id').setValue(selectedPokemon.id);
      if(!!selectedPokemon.move1) {
        let move1_text = `${selectedPokemon.move1.name} - Power: ${selectedPokemon.move1.basePower} - ${selectedPokemon.move1.category}`
        this.movesDropdown.push(new BasicDropdownEntity(1, move1_text));
      }
      if (!!selectedPokemon.move2) {
        let move2_text = `${selectedPokemon.move2.name} - Power: ${selectedPokemon.move2.basePower} - ${selectedPokemon.move2.category}`
        this.movesDropdown.push(new BasicDropdownEntity(2, move2_text));
      }
      if (!!selectedPokemon.move3) {
        let move3_text = `${selectedPokemon.move3.name} - Power: ${selectedPokemon.move3.basePower} - ${selectedPokemon.move3.category}`
        this.movesDropdown.push(new BasicDropdownEntity(3, move3_text));
      }
      if (!!selectedPokemon.move4) {
        let move4_text = `${selectedPokemon.move4.name} - Power: ${selectedPokemon.move4.basePower} - ${selectedPokemon.move4.category}`
        this.movesDropdown.push(new BasicDropdownEntity(4, move4_text));
      }
    } else {
      this.simulationForm.get('defending_pokemon_id').setValue(selectedPokemon.id);
    }
    this.changed.emit(this.simulationPokemon);
  }

  setMove(id: string) {
    let move
    switch(id) {
      case '1': {
        move = this.simulationPokemon.pokemon.move1
        break;
      }
      case '2': {
        move = this.simulationPokemon.pokemon.move2
        break;
      }
      case '3': {
        move = this.simulationPokemon.pokemon.move3
        break;
      }
      case '4': {
        move = this.simulationPokemon.pokemon.move4
        break;
      }
      default: {
        move = null;
      }
    }
    this.simulationForm.get('moveid').setValue(!!move ? move.id : 0);
    this.simulationPokemon.move = move
    this.changed.emit(this.simulationPokemon);
  }

  validatePokemon(): boolean {
    if (this.isAttacking) {
      return this.simulationForm.get('attacking_pokemon_id').valid || !this.simulationForm.get('attacking_pokemon_id').dirty;
    }
    return this.simulationForm.get('defending_pokemon_id').valid || !this.simulationForm.get('defending_pokemon_id').dirty;
  }

  validateMove(): boolean {
    return this.simulationForm.get('moveid').valid || !this.simulationForm.get('moveid').dirty;
  }

  getImgUrl() {
    if(!this.simulationPokemon) {
      return null;
    }
    return PokemonDomain.getImgUrl(this.simulationPokemon.pokemon.pokemonSpecies);
  }

  isLogged() {
    return this.authService.isLogged();
  }

}
