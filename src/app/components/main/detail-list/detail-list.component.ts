import { Component, inject, OnInit } from '@angular/core';
import { Playlist, Song } from '../../../consts/interfaces';
import { ALL_PLAYLIST, SONGS } from '../../../consts/data';
import { IconComponent } from "../../icon/icon.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SongService } from '../../../services/song.service';

@Component({
  selector: 'app-detail-list',
  imports: [IconComponent, CommonModule],
  templateUrl: './detail-list.component.html'
})
export class DetailListComponent implements OnInit {

  private readonly songService = inject(SongService);
  readonly currentSong = this.songService.$currentSong;
  readonly playing = this.songService.$playing;

  playlist?: Playlist;
  playListSongs: Song[] = [];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getPlayList(id);
    });
  }

  getPlayList(id: string) {
    const playlist = ALL_PLAYLIST.find(pl => pl.id === id);
    if (playlist) {
      this.playlist = playlist;
      this.getSongs(playlist.albumId);
    } else {
      console.error("Playlist not found")
      this.router.navigate(['/home']);
    }
  }

  getSongs(albumId: number) {
    this.playListSongs = SONGS.filter(s => s.albumId === albumId);
  }

  selectSong(song: Song) {
    this.songService.setSong(song);
  }

  startPlayList() {
    const song = this.playListSongs[0];
    if (song) {
      this.songService.setSong(song);
    }
  }

  pauseSong() {
    this.songService.setPause();
  }
}
