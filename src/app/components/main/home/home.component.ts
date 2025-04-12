import { Component } from '@angular/core';
import { Playlist, PLAYLISTS } from '../../../consts/data';
import { CommonModule } from '@angular/common';
import { IconComponent } from "../../icon/icon.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, IconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  playLists:Playlist[] = PLAYLISTS;

}
