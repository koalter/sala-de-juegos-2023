import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PalabrasService {

  constructor(private http: HttpClient) { }

  getPalabra() {
    return this.http.get('https://clientes.api.greenborn.com.ar/public-random-word')
      .pipe(take(1));
  }
}
