import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon/pokemon.service';
import { Pokemon } from '../pokemon/entities/pokemon';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { FormControl } from '@angular/forms';
import { PokemonDomain } from '../pokemon/pokemon-domain';
import { PokemonSpecies } from '../pokemon/entities/pokemon-species';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pokemons: Pokemon[];

  myControl = new FormControl();
  tests: string[] = ['One', 'Two', 'Three'];

  constructor(
    private pokemonService: PokemonService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
    ) {
      this.myControl.valueChanges.subscribe(newValue=>{
        this.tests = this.testMethod();
    })
    }

  ngOnInit() {
    // if (this.isLogged()) {
      this.listPokemons();
    // }
  }

  get isListPokemonsEmpty(): boolean {
    return !this.pokemons || this.pokemons.length == 0;
  }

  testMethod() {
    return ["one", "two", "three"];
  }

  listPokemons() {
    this.pokemonService.listPokemons().subscribe(resp => {
      this.pokemons = resp;
    });
  }

  deletePokemon(pokemon_id: number) {
    this.pokemonService.deletePokemon(pokemon_id).subscribe(resp => {
      this.listPokemons();
      this.toastr.success('Pokemon was deleted succesfully');
    })
  }

  editPokemon(pokemon_id: number) {
    this.router.navigate([`/pokemon`, pokemon_id, "isEdit"]);
  }

  simulateBattle(id: number) {
    this.router.navigate([`/simulation`, id]);
  }

  getCSSClass() {
    if (window.innerWidth <= 760) {
      return 'collapse';
    }
    return '';
  }

  isLogged() {
    return this.authService.isLogged();
  }

  getImgUrl(pokemonSpecies: PokemonSpecies) {
    return PokemonDomain.getImgUrl(pokemonSpecies);
  }

}
