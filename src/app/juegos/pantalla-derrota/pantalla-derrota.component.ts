import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pantalla-derrota',
  templateUrl: './pantalla-derrota.component.html',
  styleUrls: ['./pantalla-derrota.component.scss']
})
export class PantallaDerrotaComponent {
  @Output() reintentar: EventEmitter<void> = new EventEmitter<void>();
  @Input() flag!: boolean;

  reintentar_click(): void {
    this.reintentar.emit();
  }
}
