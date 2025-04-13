import { Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { DetailListComponent } from './components/main/detail-list/detail-list.component';

export const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'list/:id', component:DetailListComponent},
  {path:'**', component:HomeComponent}
];
