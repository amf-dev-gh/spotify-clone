import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";
import { AsideComponent } from "./components/aside/aside.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { MovileHomeComponent } from "./movile-compponents/movile-home/movile-home.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, AsideComponent, FooterComponent, CommonModule, MovileHomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isMobile = false;

  ngOnInit(): void {
    this.checkIfMobile();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

}
