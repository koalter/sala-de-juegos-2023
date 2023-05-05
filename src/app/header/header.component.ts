import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faSteam } from '@fortawesome/free-brands-svg-icons';
import { faGamepad, faDiceD20 } from '@fortawesome/free-solid-svg-icons'
import { AppRoutingModule } from '../app-routing.module';
import { Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
  logo = faSteam;
}
