import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PokemonSpeciesService } from '../pokemon-species.service';
import { PokemonSpecies } from '../entities/pokemon-species';
import { Nature } from '../../nature/nature';
import { NatureService } from '../../nature/nature.service';
import { Stat } from '../../shared/enums/stat.enum';
import { Pokemon } from '../entities/pokemon';
import { PokemonService } from '../pokemon.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth.service';
import { NatureDomain } from '../../nature/nature-domain';
import { Move } from '../../moves/move';
import { MoveService } from '../../moves/move.service';
import { MoveDomain } from '../../moves/move-domain';
import { PokemonDomain } from '../pokemon-domain';

@Component({
  selector: 'app-pokemon-register',
  templateUrl: './pokemon-register.component.html',
  styleUrls: ['./pokemon-register.component.css']
})
export class PokemonRegisterComponent implements OnInit {

  speciesIdParam: string;
  pokemonIdParam: string;
  pokemon_species: PokemonSpecies;
  pokemon: Pokemon = new Pokemon();
  pokemonForm: FormGroup;
  natures: Nature[];
  moves: Move[];
  totalEvLeft: number = 510;

  constructor(
    private route: ActivatedRoute,
    private pokemonSpeciesService: PokemonSpeciesService,
    private pokemonService: PokemonService,
    private natureService: NatureService,
    private moveService: MoveService,
    private toastr: ToastrService,
    private authService: AuthService,
    fb: FormBuilder) {
      this.route.params.subscribe( params => {
        this.speciesIdParam = params.species_id;
        this.pokemonIdParam = params.pokemon_id;
      });
      this.pokemonForm = fb.group({
        level: [5, Validators.compose([Validators.required, Validators.min(1), Validators.max(100)])],
        nature: [null, Validators.compose([Validators.required])],
        ivHp: [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(31)])],
        ivAttack: [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(31)])],
        ivDefense: [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(31)])],
        ivSpAttack: [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(31)])],
        ivSpDefense: [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(31)])],
        ivSpeed: [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(31)])],
        evHp: [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(252)])],
        evAttack: [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(252)])],
        evDefense: [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(252)])],
        evSpAttack: [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(252)])],
        evSpDefense: [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(252)])],
        evSpeed: [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(252)])],
        move1: [null],
        move2: [null],
        move3: [null],
        move4: [null]
      });
      this.initializeObjects();
      this.pokemonForm.valueChanges.subscribe(values => {
        this.refreshStats();
      });
    }

  ngOnInit(): void {
    if (!this.isLogged()) {
      this.toastr.warning(
        'You have to log in to register a Pokemon',
        'Warning',
        { disableTimeOut : true}
      );
    }
  }

  getImgUrl(pokemonSpecies: PokemonSpecies) {
    return PokemonDomain.getImgUrl(pokemonSpecies);
  }

  private initializeObjects() {
    if (!!this.pokemonIdParam) {
      this.pokemonService.getPokemon(this.pokemonIdParam).subscribe(resp => {
        this.pokemon = resp;
        this.pokemon_species = resp.pokemonSpecies;
        this.pokemonForm.patchValue(resp);
      })
    }
    else {
      this.pokemonSpeciesService.getPokemonSpecies(this.speciesIdParam).subscribe(resp => {
        this.pokemon_species = resp;
        this.refreshStats();
      });
    }

    this.moveService.listMoves().subscribe( resp => {
      this.moves = resp;
      this.moves.forEach(move => {
        move.name = MoveDomain.setMoveName(move);
      });
    });
    this.natureService.listNatures().subscribe( resp => {
      this.natures = resp;
      this.natures.forEach(nature => {
        nature.name = NatureDomain.defineNatureText(nature);
      });
    });
  }

  savePokemon() {
    let newPokemon: Pokemon = Object.assign(this.pokemon, this.pokemonForm.value);
    newPokemon.pokemonSpecies = this.pokemon_species;
    if (!this.pokemonIdParam) {
      this.pokemonService.savePokemon(newPokemon).subscribe(
        resp => {
          this.toastr.success('Pokemon successfully created');
        },
        err => {
          console.log(err);
          this.toastr.error(err.error.message);
        });
    }
    else {
      this.pokemonService.updatePokemon(newPokemon, this.pokemonIdParam).subscribe(
        resp => {
          this.toastr.success('Pokemon successfully updated');
        },
        err => {
          console.log(err);
          this.toastr.error(err.error.message);
        });
    }
  
  }

  isLogged() {
    return this.authService.isLogged();
  }

  //STATS
  validateIVs() {
    return this.pokemonForm.get('ivHp').valid &&
      this.pokemonForm.get('ivAttack').valid &&
      this.pokemonForm.get('ivDefense').valid &&
      this.pokemonForm.get('ivSpAttack').valid &&
      this.pokemonForm.get('ivSpDefense').valid &&
      this.pokemonForm.get('ivSpeed').valid;
  }

  validateEVs() {
    return this.pokemonForm.get('evHp').valid &&
      this.pokemonForm.get('evAttack').valid &&
      this.pokemonForm.get('evDefense').valid &&
      this.pokemonForm.get('evSpAttack').valid &&
      this.pokemonForm.get('evSpDefense').valid &&
      this.pokemonForm.get('evSpeed').valid;
  }

  validateEVsTotal() {
    const ev_total = this.pokemonForm.get('evHp').value +
    this.pokemonForm.get('evAttack').value +
    this.pokemonForm.get('evDefense').value +
    this.pokemonForm.get('evSpAttack').value +
    this.pokemonForm.get('evSpDefense').value +
    this.pokemonForm.get('evSpeed').value;
    this.totalEvLeft = 510 - ev_total;
    return ev_total <= 510;
  }

  SetIvsToMax() {
    this.pokemonForm.get('ivHp').setValue(31);
    this.pokemonForm.get('ivAttack').setValue(31);
    this.pokemonForm.get('ivDefense').setValue(31);
    this.pokemonForm.get('ivSpAttack').setValue(31);
    this.pokemonForm.get('ivSpDefense').setValue(31);
    this.pokemonForm.get('ivSpeed').setValue(31);
  }

  private refreshStats(){
    this.pokemon.hp = Math.round(this.calculateHP());
    this.pokemon.attack = Math.round(this.calculateStat('Attack', Stat.Attack, this.pokemon_species.baseAttack));
    this.pokemon.defense = Math.round(this.calculateStat('Defense', Stat.Defense, this.pokemon_species.baseDefense));
    this.pokemon.spAttack = Math.round(this.calculateStat('SpAttack', Stat.SpecialAttack, this.pokemon_species.baseSpAttack));
    this.pokemon.spDefense = Math.round(this.calculateStat('SpDefense', Stat.SpecialDefense, this.pokemon_species.baseSpDefense));
    this.pokemon.speed = Math.round(this.calculateStat('Speed', Stat.Speed, this.pokemon_species.baseSpeed));
  }

  private calculateHP(): number {
    const iv = this.pokemonForm.get('ivHp').value;
    const ev = this.pokemonForm.get('evHp').value;
    const level = this.pokemonForm.get('level').value;
    return (((this.pokemon_species.baseHp * 2 + iv + ( ev / 4 )) * level ) / 100 ) + level + 10;
  }

  private calculateStat(statString: string, stat: Stat, baseStat: number): number {
    const iv = this.pokemonForm.get(`iv${statString}`).value;
    const ev = this.pokemonForm.get(`ev${statString}`).value;
    const level = this.pokemonForm.get('level').value;
    return ((((baseStat * 2 + iv  + ( ev / 4 )) * level ) / 100 ) + 5) * this.calculateNature(stat);
  }

  //MOVE

  setMove1(move: Move) {
    this.pokemonForm.get("move1").setValue(move);
  }

  setMove2(move: number) {
    this.pokemonForm.get("move2").setValue(move);
  }

  setMove3(move: number) {
    this.pokemonForm.get("move3").setValue(move);
  }

  setMove4(move: number) {
    this.pokemonForm.get("move4").setValue(move);
  }

  //NATURE

  setNature(natureId: Nature) {
    this.pokemonForm.get('nature').setValue(natureId);
    this.refreshStats();
  }

  private calculateNature(stat: Stat): number {
    const natureSelected = this.pokemonForm.get('nature').value
    if (!natureSelected) {
      return 1;
    }
    if (natureSelected.strongStat == stat) {
      return 1.1
    }
    if (natureSelected.weakStat == stat) {
      return 0.9
    }
    return 1;
  }

}
