import { Injectable } from '@angular/core';
import { MainService } from '../shared/services/main.service';
import { Observable } from 'rxjs';
import { Nature } from './nature';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NatureService extends MainService {

  constructor(private http: HttpClient) {
    super('natures/');
  }

  listNatures(): Observable<Nature[]> {
    return this.http.get<Nature[]>(`${this.url}getAll/`);
  }
}
