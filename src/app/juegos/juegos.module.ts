import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegosComponent } from './juegos.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './mayor-o-menor/mayor-o-menor.component';
import { PantallaVictoriaComponent } from './pantalla-victoria/pantalla-victoria.component';
import { PantallaDerrotaComponent } from './pantalla-derrota/pantalla-derrota.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    JuegosComponent,
    AhorcadoComponent,
    MayorOMenorComponent,
    PantallaVictoriaComponent,
    PantallaDerrotaComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FontAwesomeModule
  ]
})
export class JuegosModule { }
