import { Injectable } from '@angular/core';
import { MainService } from '../shared/services/main.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from './entities/pokemon';

@Injectable()
export class PokemonService extends MainService {

  constructor(
    private http: HttpClient) {
    super('pokemons/');
  }

  listPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.url}getAll`);
  }

  getPokemon(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.url}getByid/${id}`);
  }

  savePokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(`${this.url}create`, pokemon);
  }

  updatePokemon(pokemon: Pokemon, id: string): Observable<Pokemon> {
    return this.http.put<Pokemon>(`${this.url}update/${id}`, pokemon)
  }

  deletePokemon(id: number): Observable<Pokemon> {
    return this.http.delete<Pokemon>(`${this.url}delete/${id}`);
  }

}
