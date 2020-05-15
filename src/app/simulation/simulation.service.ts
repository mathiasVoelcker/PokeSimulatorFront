import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MainService } from '../shared/services/main.service';
import { Observable } from 'rxjs';
import { SimulationDto } from './simulation-dto';
import { SimulationReturnDto } from './simulation-return-dto';

@Injectable()
export class SimulationService extends MainService {

  constructor(
    private http: HttpClient
  ) {
    super('simulation');
  }

  getDamage(simulationDto: SimulationDto): Observable<SimulationReturnDto> {
    const params = new HttpParams()
      .set('attackingPokemonId', simulationDto.attacking_pokemon_id.toString())
      .set('defendingPokemonId', simulationDto.defending_pokemon_id.toString())
      .set('moveId', simulationDto.moveid.toString())
      .set('modifier', simulationDto.modifier.toString());
    return this.http.get<SimulationReturnDto>(`${this.url}/getDamage`, { headers: this.headers, params: params});
  }

}
