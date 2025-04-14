import { Component, inject } from '@angular/core';
import { IconComponent } from "../../components/icon/icon.component";
import { Song } from '../../consts/interfaces';
import { PLAYLISTS, SONGS } from '../../consts/data';
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
  backgroundColor:string = '';

  private readonly songService = inject(SongService);
  readonly currentSong = this.songService.$currentSong;
  readonly isPlaying = this.songService.$playing;

  playSong(song: Song) {
    if(song === this.currentSong()){
      this.songService.setPlay();
      return;
    }
    this.songService.setSong(song);
    this.setBackground(song.albumId);
  }

  pauseSong(){
    this.songService.setPause();
  }

  setBackground(albumId:number){
    const playlist = PLAYLISTS.find(p => p.albumId === albumId);
    if(playlist){
      this.backgroundColor = playlist.color.accent;
    }
  }

}
