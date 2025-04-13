import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Playlist } from '../../../../consts/interfaces';
import { IconComponent } from "../../../icon/icon.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-col-card',
  imports: [CommonModule, IconComponent, RouterLink],
  templateUrl: './col-card.component.html'
})
export class ColCardComponent {

  @Input()playList?:Playlist;

}
