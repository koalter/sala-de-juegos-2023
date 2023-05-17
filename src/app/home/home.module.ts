import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { JuegoDetallesComponent } from './juego-detalles/juego-detalles.component';


@NgModule({
  declarations: [
    HomeComponent,
    JuegoDetallesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
