import { Component, OnInit } from '@angular/core';
import { Playlist } from '../../../consts/interfaces';
import { ALL_PLAYLIST } from '../../../consts/data';
import { IconComponent } from "../../icon/icon.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-list',
  imports: [IconComponent],
  templateUrl: './detail-list.component.html'
})
export class DetailListComponent implements OnInit {

  playlist?:Playlist;

  constructor(private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('Id de la lista:', id);
      this.getPlayList(id);
    });
  }

  getPlayList(id:string){
    const playlist = ALL_PLAYLIST.find(pl => pl.id === id);
    if(playlist){
      this.playlist = playlist;
    }else{
      console.error("Playlist not found")
      this.router.navigate(['/home']);
    }
  }
}
