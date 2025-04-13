import { Component } from '@angular/core';
import { IconComponent } from "../icon/icon.component";
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-nav',
  imports: [IconComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  inputSearch:string = '';

  constructor(private location: Location) {}

  clearInput(){
    this.inputSearch = '';
  }

  goBack() {
    this.location.back();
  }

  goForward() {
    this.location.forward();
  }

}
