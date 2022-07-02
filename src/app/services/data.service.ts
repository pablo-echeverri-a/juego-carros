import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  sendPlayers() {
    const players = {
      kilometros: 3,
      juegoId: 'ffff-xxxx-gggg6',
      jugadores: {
        '1122334': 'Camilo andres',
        '44554434': 'Pedro',
        fffff4: 'Santiago',
      },
    };
    return this.http.post<any>('', players);
  }
}
