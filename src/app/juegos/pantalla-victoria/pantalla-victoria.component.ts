import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pantalla-victoria',
  templateUrl: './pantalla-victoria.component.html',
  styleUrls: ['./pantalla-victoria.component.scss']
})
export class PantallaVictoriaComponent {
  @Output() reintentar: EventEmitter<void> = new EventEmitter<void>();
  @Input() flag!: boolean;

  reintentar_click(): void {
    this.reintentar.emit();
  }
}
