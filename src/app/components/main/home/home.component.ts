import { Component } from '@angular/core';
import { PLAYLISTS, SIDEBAR_PLAYLIST } from '../../../consts/data';
import { CommonModule } from '@angular/common';
import { Playlist } from '../../../consts/interfaces';
import { ColCardComponent } from "./col-card/col-card.component";
import { RowCardComponent } from "./row-card/row-card.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, ColCardComponent, RowCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  playLists:Playlist[] = PLAYLISTS;

  sidebarPlayLists:Playlist[] = SIDEBAR_PLAYLIST;

}
