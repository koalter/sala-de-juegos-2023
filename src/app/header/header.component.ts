import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faSteam } from '@fortawesome/free-brands-svg-icons';
import { AppRoutingModule } from '../app-routing.module';
import { Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AppRoutingModule, FontAwesomeModule ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() rutas?: Routes;
  @Input() titulo?: string;
  @Input() usuario?: User | null;
  @Output() cerrarSesion: EventEmitter<void> = new EventEmitter();
  logo = faSteam;

  constructor() {}
  
  cerrarSesion_click(): void {
    this.cerrarSesion.emit();
  }
}
