import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Preguntados } from '../shared/preguntados.model';

@Component({
  selector: 'preguntados-card',
  templateUrl: './preguntados-card.component.html',
  styleUrls: ['./preguntados-card.component.scss']
})
export class PreguntadosCardComponent {
  @Input() pregunta!: Preguntados;
  @Input() imagenURL!: string;
  @Output() respuesta: EventEmitter<number> = new EventEmitter<number>();

  enviarRespuesta(i: number) {
    this.respuesta.emit(i);
  }
}
