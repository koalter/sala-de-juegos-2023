import { Component, Input } from '@angular/core';
import { JuegoDetalles } from './juego-detalles.model';

@Component({
  selector: 'juego-detalles',
  templateUrl: './juego-detalles.component.html',
  styleUrls: ['./juego-detalles.component.scss']
})
export class JuegoDetallesComponent {
  @Input() juego!: JuegoDetalles;
}
