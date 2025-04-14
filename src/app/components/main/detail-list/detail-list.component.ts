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
  totalListTime: number = 0;

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
      this.getTotalListTime();
    } else {
      console.error("Playlist not found")
      this.router.navigate(['/home']);
    }
  }

  getSongs(albumId: number) {
    this.playListSongs = SONGS.filter(s => s.albumId === albumId);
  }

  selectSong(song: Song) {
    if (song === this.currentSong()) {
      this.songService.setPlay()
      return;
    }
    this.songService.setSong(song, this.playlist?.title);
  }

  startPlayList() {
    const song = this.playListSongs[0];
    if (song) {
      if (song === this.currentSong()) {
        this.songService.setPlay()
        return;
      }
      this.songService.setSong(song, this.playlist?.title);
    }
  }

  pauseSong() {
    this.songService.setPause();
  }

  getTotalListTime() {
    let totalSeconds = 0;
    this.playListSongs.forEach(song => {
      const [min, seg] = song.duration.split(":").map(Number);
      totalSeconds += min * 60 + seg;
    });
    this.totalListTime = Math.floor(totalSeconds / 60);
  }
}
