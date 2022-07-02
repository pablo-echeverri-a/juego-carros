import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  sendPlayers() {
    this.dataService.sendPlayers();
  }
}
