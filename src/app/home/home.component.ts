import { Component } from '@angular/core';
import { JuegoDetalles } from './juego-detalles/juego-detalles.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  juegos: JuegoDetalles[] = [
    {
      titulo: 'Ahorcado',
      descripcion: 'Adiviná letra por letra la palabra secreta y escapá del destino fatal.',
      imagen: '../../../assets/ahorcado.png',
      ruta: 'ahorcado'
    },
    {
      titulo: 'Mayor o Menor',
      descripcion: '¿Será más grande? ¿Será más chico? Poné a prueba tu suerte.',
      imagen: '../../../assets/mayor_o_menor.png',
      ruta: 'mayor-o-menor'
    },
    {
      titulo: 'Preguntados',
      descripcion: 'Respondé preguntas de distintas categorías y comprobá qué tanto sabes de lo que sea.',
      imagen: '../../../assets/preguntados.png',
      ruta: 'consultados'
    },
    {
      titulo: 'Tetris',
      descripcion: 'Pulí tus habilidades en el emblemático Tetris clásico.',
      imagen: '../../../assets/tetris.png',
      ruta: 'tetris'
    }
  ]
}
