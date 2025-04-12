import { Component, Input } from '@angular/core';
import { Playlist } from '../../../consts/data';
import { IconComponent } from "../../icon/icon.component";

@Component({
  selector: 'app-playlist-card',
  imports: [IconComponent],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.css'
})
export class PlaylistCardComponent {

  @Input() playList?:Playlist;

}
