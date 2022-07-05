import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  distanceData1: number = 0;
  distanceData2: number = 0;
  distanceData3: number = 0;

  player1: {"carrilId": string, "imagen": string} = {"carrilId": '', "imagen": ''};
  player2: {"carrilId": string, "imagen": string} = {"carrilId": '', "imagen": ''};
  player3: {"carrilId": string, "imagen": string} = {"carrilId": '', "imagen": ''};

  kilometersLimit = 0;

  carro: {
    carroId: string,
    carrilId: string
  } = {carroId: '', carrilId: ''};

  gameInformation : {
    "kilometros": string, 
    "juegoId": string, 
    "jugadores": {}
  } = {"kilometros": '', "juegoId": '', 'jugadores':{}};

  players: {"carrilId": string, "imagen": string}[] = [];
  llegada: {"carrilId": string}[] = [];

  primerLugar: string = '';
  segundoLugar: string = '';
  tercerLugar: string = '';

  imagenPrimerLugar: string = '';
  imagenSegundoLugar: string = '';
  imagenTercerLugar: string = '';

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.kilometersLimit = Number(this.dataService.getGameInformation().kilometros)*1000;
    this.getRaceData();
  }

  setPlayersId(){
    this.dataService.getCars(this.dataService.getGameId()).subscribe((x: any) => {
      this.player1 = {"carrilId": x[0].carrilId, "imagen": '/assets/carro3.png'};
      this.players.push(this.player1);
      this.player2 = {"carrilId": x[1].carrilId, "imagen": '/assets/carro2.png'};
      this.players.push(this.player2);
      this.player3 = {"carrilId": x[2].carrilId, "imagen": '/assets/carro1.png'};
      this.players.push(this.player3);
      console.log(this.players);
    });
  }

  getRaceData() {
    console.log('oe', (this.dataService.getGameId()));

    this.setPlayersId();

    this.dataService.connectToWebSocket(this.dataService.getGameId()).subscribe((x: any) => {
      console.log(x);

      if(x.type === 'carro.KilometrajeCambiado'){
        console.log(x.carrilId.uuid);
        console.log(this.player1);
        
        switch(x.carrilId.uuid) { 
          case this.player1.carrilId: {
             this.distanceData1 += x.distancia; 
             break; 
          } 
          case this.player2.carrilId: { 
             this.distanceData2 += x.distancia; 
             break; 
          } 
          case this.player3.carrilId: { 
             this.distanceData3 += x.distancia; 
             break; 
          } 
       } 

      }

      if(x.type === 'carril.CarroFinalizoSuRecorrido'){
        this.llegada.push(x.aggregateRootId);
      }

      if(x.type === 'juego.JuegoFinalizado'){
        this.primerLugar = x.podio.primerLugar.nombre.value;
        this.segundoLugar = x.podio.segundoLugar.nombre.value;
        this.tercerLugar = x.podio.tercerLugar.nombre.value;

        console.log(this.llegada);
        
        this.players.forEach((player) => {
          if(player.carrilId == this.llegada[0].toString()){
            this.imagenPrimerLugar = player.imagen;
          } else if(player.carrilId == this.llegada[1].toString()){
            this.imagenSegundoLugar = player.imagen;
          } else if(player.carrilId == this.llegada[2].toString()){
            this.imagenTercerLugar = player.imagen;
          }
        });
      }
    });
  }

  goToSettings() {

    this.players = [];
    this.llegada = [];

    this.primerLugar = '';
    this.segundoLugar = '';
    this.tercerLugar = '';
    this.imagenPrimerLugar = '';
    this.imagenSegundoLugar = '';
    this.imagenTercerLugar = '';
    
    this.router.navigate(['dashboard']);
  }

}
