import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MainService } from '../shared/services/main.service';
import { Observable } from 'rxjs';
import { PokemonSpecies } from './entities/pokemon-species';

@Injectable()
export class PokemonSpeciesService extends MainService {

  constructor(
    private http: HttpClient
  ) {
    super('pokemonSpecies/');
  }

  listPokemonSpecies(name: string): Observable<PokemonSpecies[]> {
    const body = { params: new HttpParams().set('name', name)}
    return this.http.get<PokemonSpecies[]>(this.url + "getByName/", body);
  }

  getPokemonSpecies(id: string): Observable<PokemonSpecies> {
    const body = { params: new HttpParams().set('id', id)}
    return this.http.get<PokemonSpecies>(this.url + "getById/", body);
  }

}
