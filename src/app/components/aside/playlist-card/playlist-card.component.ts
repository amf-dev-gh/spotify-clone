import { Component, Input } from '@angular/core';
import { IconComponent } from "../../icon/icon.component";
import { Playlist } from '../../../consts/interfaces';

@Component({
  selector: 'app-playlist-card',
  imports: [IconComponent],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.css'
})
export class PlaylistCardComponent {

  @Input() playList?:Playlist;

}
