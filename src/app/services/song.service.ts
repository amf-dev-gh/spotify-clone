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

}
