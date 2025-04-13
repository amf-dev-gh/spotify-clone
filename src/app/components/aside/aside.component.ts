import { Component } from '@angular/core';
import { IconComponent } from "../icon/icon.component";
import { AsideCardComponent } from "./aside-card/aside-card.component";
import { PLAYLISTS } from '../../consts/data';
import { CommonModule } from '@angular/common';
import { Playlist } from '../../consts/interfaces';

@Component({
  selector: 'app-aside',
  imports: [IconComponent, AsideCardComponent, CommonModule],
  templateUrl: './aside.component.html'
})
export class AsideComponent {

  playLists: Playlist[] = PLAYLISTS;

}
