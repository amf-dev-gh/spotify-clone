import { Component, ElementRef, ViewChild } from '@angular/core';
import { IconComponent } from "../icon/icon.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Song } from '../../consts/interfaces';
import { SONGS } from '../../consts/data';

@Component({
  selector: 'app-footer',
  imports: [IconComponent, CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  // hardcodeada la cancion aleatoria
  song: Song = SONGS[Math.floor(Math.random() * 20) + 1];

  @ViewChild('audioPlayer', { static: true }) audioPlayer?: ElementRef<HTMLAudioElement>;
  durationSongTime: number = 0;
  currentTime: number = 0;
  playing: boolean = false;
  volume: number = 100;

  playPause() {
    if (this.audioPlayer && this.audioPlayer.nativeElement) {
      if (this.playing) {
        this.audioPlayer.nativeElement.pause()
      } else {
        this.audioPlayer.nativeElement.play()
      }
      this.playing = !this.playing;
    }
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
    console.log(this.volume);
    if (this.audioPlayer && this.audioPlayer.nativeElement) {
      this.audioPlayer.nativeElement.volume = this.volume / 100;
      document.documentElement.style.setProperty('--volume', `${this.volume}%`);
    }
  }

  volumeMaxMin() {
    if (this.audioPlayer && this.audioPlayer.nativeElement) {
      if (this.volume > 0) {
        this.volume = 0;
      }else{
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