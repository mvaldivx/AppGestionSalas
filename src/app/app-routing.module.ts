import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },  { path: 'aulas', loadChildren: './pages/aulas/aulas.module#AulasPageModule' },
  { path: 'agrega-aula', loadChildren: './agrega-aula/agrega-aula.module#AgregaAulaPageModule' },
  { path: 'calendario', loadChildren: './pages/calendario/calendario.module#CalendarioPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
