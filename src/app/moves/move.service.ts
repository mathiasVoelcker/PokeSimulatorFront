import { Injectable } from '@angular/core';
import { MainService } from '../shared/services/main.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Move } from './move';

@Injectable({
  providedIn: 'root'
})
export class MoveService extends MainService {

  constructor(
    private http: HttpClient
  ) {
    super('moves/');
  }

  listMoves(): Observable<Move[]> {
    return this.http.get<Move[]>(`${this.url}getAll/`)
  }

}
