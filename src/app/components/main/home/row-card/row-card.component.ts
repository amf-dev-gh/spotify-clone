import { Component, Input } from '@angular/core';
import { Playlist } from '../../../../consts/interfaces';
import { IconComponent } from "../../../icon/icon.component";

@Component({
  selector: 'app-row-card',
  imports: [IconComponent],
  templateUrl: './row-card.component.html'
})
export class RowCardComponent {

  @Input()playList?:Playlist;

}
