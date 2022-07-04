import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  gameId: any;
  kilometers: any;
  gameInformation : {
    "kilometros": string,
    "juegoId": string,
    "jugadores": {
    }
  } = {"kilometros": '', "juegoId": '', 'jugadores':{}};

  constructor(private http: HttpClient) { }

  setGameId(newGameId: any) {
    this.gameId = newGameId
  }

  getGameId() {
    return this.gameId
  }

  setGameInformation(newGameInformation: any){
    this.gameInformation = newGameInformation;
  }

  getGameInformation(){
    return this.gameInformation;
  }

  setKilometers(newKilometers: any) {
    this.kilometers = newKilometers
  }

  getKilometers() {
    return this.kilometers
  }

  sendPlayers(gameData: any) {
    return this.http.post<any>('http://localhost:8080/crearJuego', gameData);
  }

  startGame(id: string) {
    const gameId = { "juegoId": id };

    return this.http.post<any>('http://localhost:8080/iniciarJuego', gameId);
  }

  getCars(juegoId: string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("juegoId",juegoId);
    return this.http.get(`http://localhost:8080/carros/${juegoId}`);
  }

  connectToWebSocket(juegoId: string) {
    const webSocketSubject: WebSocketSubject<string> = webSocket(`ws://localhost:8080/retrieve/${juegoId}`);
    return webSocketSubject.asObservable();
  }
}
