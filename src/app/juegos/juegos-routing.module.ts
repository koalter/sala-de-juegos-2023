import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './mayor-o-menor/mayor-o-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { TetrisComponent } from './tetris/tetris.component';

const routes: Routes = [
  { path: '', component: JuegosComponent },
  { path: 'ahorcado', component: AhorcadoComponent },
  { path: 'mayor-o-menor', component: MayorOMenorComponent },
  { path: 'consultados', component: PreguntadosComponent },
  { path: 'tetris', component: TetrisComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
