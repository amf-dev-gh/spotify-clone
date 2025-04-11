import { Component } from '@angular/core';
import { IconComponent } from "../icon/icon.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-nav',
  imports: [IconComponent, CommonModule, FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  inputSearch:string = '';

  clearInput(){
    this.inputSearch = '';
  }

}
