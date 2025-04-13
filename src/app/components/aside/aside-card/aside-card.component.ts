import { Component, Input } from '@angular/core';
import { IconComponent } from "../../icon/icon.component";
import { Playlist } from '../../../consts/interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-aside-card',
  imports: [IconComponent, RouterLink],
  templateUrl: './aside-card.component.html'
})
export class AsideCardComponent {

  @Input() playList?: Playlist;

}
