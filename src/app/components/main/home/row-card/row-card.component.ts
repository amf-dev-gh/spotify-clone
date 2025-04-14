import { Component, inject, Input } from '@angular/core';
import { Playlist, Song } from '../../../../consts/interfaces';
import { IconComponent } from "../../../icon/icon.component";
import { RouterLink } from '@angular/router';
import { SongService } from '../../../../services/song.service';
import { SONGS } from '../../../../consts/data';

@Component({
  selector: 'app-row-card',
  imports: [IconComponent, RouterLink],
  templateUrl: './row-card.component.html'
})
export class RowCardComponent {

  @Input()playList?:Playlist;
  private readonly songService = inject(SongService);
  readonly currentPlaylistName = this.songService.$currentPlayListName;
  readonly currentSong = this.songService.$currentSong;
  playListSongs: Song[] = [];

  startPlayList() {
    if (this.playList) {
      this.getSongs(this.playList.albumId);
      const song = this.playListSongs[0];
      if (song) {
        if (song === this.currentSong()) {
          this.songService.setPlay()
          return;
        }
        this.songService.setSong(song, this.playList?.title);
      }
    }
  }

  getSongs(albumId: number) {
    this.playListSongs = SONGS.filter(s => s.albumId === albumId);
  }

}
