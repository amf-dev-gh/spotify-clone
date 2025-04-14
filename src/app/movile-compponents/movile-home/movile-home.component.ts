import { Component, inject } from '@angular/core';
import { IconComponent } from "../../components/icon/icon.component";
import { Song } from '../../consts/interfaces';
import { SONGS } from '../../consts/data';
import { CommonModule } from '@angular/common';
import { SongService } from '../../services/song.service';
import { MovileFooterComponent } from "../movile-footer/movile-footer.component";

@Component({
  selector: 'app-movile-home',
  imports: [IconComponent, CommonModule, MovileFooterComponent],
  templateUrl: './movile-home.component.html'
})
export class MovileHomeComponent {

  allSongs: Song[] = SONGS;

  private readonly songService = inject(SongService);
  readonly currentSong = this.songService.$currentSong;
  readonly isPlaying = this.songService.$playing;

  playSong(song: Song) {
    this.songService.setSong(song);
  }

}
