import { Component, inject, Input } from '@angular/core';
import { IconComponent } from "../../icon/icon.component";
import { Playlist, Song } from '../../../consts/interfaces';
import { RouterLink } from '@angular/router';
import { SongService } from '../../../services/song.service';
import { CommonModule } from '@angular/common';
import { SONGS } from '../../../consts/data';

@Component({
  selector: 'app-aside-card',
  imports: [IconComponent, RouterLink, CommonModule],
  templateUrl: './aside-card.component.html'
})
export class AsideCardComponent {

  private readonly songService = inject(SongService);
  readonly currentPlaylistName = this.songService.$currentPlayListName;
  readonly currentSong = this.songService.$currentSong;
  playListSongs: Song[] = [];

  @Input() playList?: Playlist;

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
