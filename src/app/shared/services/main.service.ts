import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

export abstract class MainService {

  protected TOKEN = 'TOKEN';
  protected headers: HttpHeaders

  protected url: string
  constructor(object: string) {
      this.url = environment.baseUrl + object;
  }
}
