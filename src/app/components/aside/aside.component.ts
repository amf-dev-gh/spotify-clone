import { Component } from '@angular/core';
import { IconComponent } from "../icon/icon.component";
import { PlaylistCardComponent } from "./playlist-card/playlist-card.component";
import { Playlist, PLAYLISTS } from '../../consts/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aside',
  imports: [IconComponent, PlaylistCardComponent, CommonModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {

  playLists:Playlist[] = PLAYLISTS;

}
