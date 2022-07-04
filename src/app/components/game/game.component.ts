import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  @ViewChild('gameForm') gameForm: any;

  gameId: string = '';
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void { }

  sendPlayers() {
    console.log(this.gameForm);
    const gameId = Math.floor(Math.random() * 1000);
    const gameInformation = {
      "kilometros": this.gameForm.value.kilometers,
      "juegoId": gameId,
      "jugadores": {
        [this.gameForm.value.id1]: this.gameForm.value.user1,
        [this.gameForm.value.id2]: this.gameForm.value.user2,
        [this.gameForm.value.id3]: this.gameForm.value.user3
      }
    }

    this.dataService.setGameInformation(gameInformation);
    //console.log(this.dataService.getGameInformation());
    

    this.dataService.sendPlayers(gameInformation).subscribe(
      (gameId) => {
        this.gameId = gameId;
      }
    );
  }

  startGame(gameId: string) {
    this.dataService.setGameId(gameId);
    //this.dataService.getCars(gameId);
    this.dataService.startGame(gameId).subscribe();
    this.dataService.connectToWebSocket(this.dataService.getGameId()).subscribe((x: any) => {
      console.log(x);
    });
    this.router.navigate(['game']);
  }
}
