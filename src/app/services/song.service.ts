import { Injectable, signal } from '@angular/core';
import { Song } from '../consts/interfaces';
import { SONGS } from '../consts/data';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private song: Song = SONGS[Math.floor(Math.random() * SONGS.length)];
  $currentSong = signal<Song>(this.song);

  setSong(song: Song) {
    this.$currentSong.set(song);
  }

  nextSong() {
    const index = this.currentIndex();
    if (index != -1) {
      const nextSong = SONGS[index + 1];
      if (nextSong) {
        this.setSong(nextSong);
      } else {
        this.setSong(SONGS[0]);
      }
    }
  }

  prevSong() {
    const index = this.currentIndex();
    if (index != -1) {
      const prevSong = SONGS[index - 1];
      if (prevSong) {
        this.setSong(prevSong);
      } else {
        this.setSong(SONGS[SONGS.length-1]);
      }
    }
  }

  private currentIndex(): number {
    const currentSongId = this.$currentSong().id;
    const currentAlbumId = this.$currentSong().albumId
    return SONGS.findIndex(song => song.id === currentSongId && song.albumId === currentAlbumId);
  }

}
