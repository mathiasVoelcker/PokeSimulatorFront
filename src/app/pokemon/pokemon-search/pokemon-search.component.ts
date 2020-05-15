import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PokemonSpeciesService } from '../pokemon-species.service';
import { PokemonSpecies } from '../entities/pokemon-species';
import { PokemonDomain } from '../pokemon-domain';


@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css']
})
export class PokemonSearchComponent {

  pokemonSearchForm: FormGroup;
  pokemonSpecies: PokemonSpecies[];

  constructor(
    private pokemonSpeciesServie: PokemonSpeciesService,
    fb: FormBuilder
  ) {
    this.pokemonSearchForm = fb.group({
      name: []
    });
    pokemonSpeciesServie
  }

  searchPokemons() {
    this.pokemonSpeciesServie.listPokemonSpecies(
      this.pokemonSearchForm.get('name').value
    ).subscribe((resp) => {
      this.pokemonSpecies = resp;
    });
  }

  getImgUrl(pokemonSpecies: PokemonSpecies) {
    return PokemonDomain.getImgUrl(pokemonSpecies);
  }

  getBaseStatTotal(pokemon: PokemonSpecies): number {
    return pokemon.baseAttack + pokemon.baseDefense + pokemon.baseHp + pokemon.baseSpAttack + pokemon.baseSpDefense + pokemon.baseSpeed;
  }

}
