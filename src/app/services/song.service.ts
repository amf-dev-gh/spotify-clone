import { Injectable, signal } from '@angular/core';
import { Playlist, Song } from '../consts/interfaces';
import { SONGS } from '../consts/data';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private song: Song = SONGS[Math.floor(Math.random() * SONGS.length)];
  $currentSong = signal<Song>(this.song);
  $playing = signal<boolean>(false);
  $currentPlayListName = signal<string>(this.song.album);

  setSong(song: Song, playListName?:string) {
    this.$currentSong.set(song);
    if(playListName){
      this.$currentPlayListName.set(playListName);
    }
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
        this.setSong(SONGS[SONGS.length - 1]);
      }
    }
  }

  setPause() {
    this.$playing.set(false);
  }

  setPlay() {
    this.$playing.set(true);
  }

  private currentIndex(): number {
    const currentSongId = this.$currentSong().id;
    const currentAlbumId = this.$currentSong().albumId
    return SONGS.findIndex(song => song.id === currentSongId && song.albumId === currentAlbumId);
  }

}
