import { Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { IconComponent } from "../icon/icon.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-footer',
  imports: [IconComponent, CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  private readonly songService = inject(SongService);
  readonly song = this.songService.$currentSong;
  readonly playing = this.songService.$playing;

  @ViewChild('audioPlayer', { static: true }) audioPlayer?: ElementRef<HTMLAudioElement>;
  durationSongTime: number = 0;
  currentTime: number = 0;
  volume: number = 100;

  constructor() {
    let isFirstSongLoad = true;
    // evento que escucha cambios de cancion
    effect(() => {
      const newSong = this.song();
      if (newSong && this.audioPlayer?.nativeElement) {
        const audioEl = this.audioPlayer.nativeElement;
        // Cada cancion deberia tener un id diferente y acceder por el id
        // pero por ahora dejo esto que sirve para el caso
        // '/music/1/01.mp3'
        audioEl.src = `/music/${newSong.albumId}/0${newSong.id}.mp3`;
        audioEl.load();
        // En la primer carga del componente no reproduce automaticamente para no dar problemas en los navegadores.
        if(!isFirstSongLoad){
          this.playSong();
        }else{
          isFirstSongLoad = false;
        }
      }
    });

    // evento que escucha cambios en la reproduccion actual
    effect(() => {
      const playing = this.playing();
      if (playing) {
        this.playSong()
      } else {
        this.pauseSong();
      }
    });
  }

  playSong() {
    if (this.audioPlayer && this.audioPlayer.nativeElement) {
      this.audioPlayer.nativeElement.play()
      this.songService.setPlay();
    }
  }

  pauseSong() {
    if (this.audioPlayer && this.audioPlayer.nativeElement) {
      this.audioPlayer.nativeElement.pause()
      this.songService.setPause();
    }
  }

  playNextSong() {
    this.songService.nextSong();
  }

  playPrevSong() {
    this.songService.prevSong();
  }

  onTimeUpdate() {
    if (this.audioPlayer && this.audioPlayer.nativeElement) {
      this.currentTime = this.audioPlayer.nativeElement.currentTime;
      const progressPercent = (this.currentTime * 100) / this.durationSongTime;
      document.documentElement.style.setProperty('--progress', `${progressPercent}%`);
      this.changeVolume();
    }
  }

  updateDurationSong() {
    if (this.audioPlayer && this.audioPlayer.nativeElement) {
      this.durationSongTime = this.audioPlayer.nativeElement.duration;
    }
  }

  changeCurrentTime() {
    if (this.audioPlayer && this.audioPlayer.nativeElement) {
      this.audioPlayer.nativeElement.currentTime = this.currentTime;
    }
  }

  formatTime(seconds: number | undefined): string {
    if (seconds) {
      const min = Math.floor(seconds / 60);
      const sec = Math.floor(seconds % 60);
      return `${min}:${sec < 10 ? '0' + sec : sec}`;
    }
    return '0:00';
  }

  changeVolume() {
    if (this.audioPlayer && this.audioPlayer.nativeElement) {
      this.audioPlayer.nativeElement.volume = this.volume / 100;
      document.documentElement.style.setProperty('--volume', `${this.volume}%`);
    }
  }

  volumeMaxMin() {
    if (this.audioPlayer && this.audioPlayer.nativeElement) {
      if (this.volume > 0) {
        this.volume = 0;
      } else {
        this.volume = 100;
      }
      this.changeVolume();
    }
  }

  toggleFullscreen() {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        console.error(`Error al intentar entrar en pantalla completa: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }
}