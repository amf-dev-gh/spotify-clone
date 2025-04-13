import { Component, Input } from '@angular/core';
import { IconComponent } from "../../icon/icon.component";
import { Playlist } from '../../../consts/interfaces';

@Component({
  selector: 'app-aside-card',
  imports: [IconComponent],
  templateUrl: './aside-card.component.html'
})
export class AsideCardComponent {

  @Input() playList?: Playlist;

}
