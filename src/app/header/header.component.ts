import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { AppRoutingModule } from '../app-routing.module';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-header',
  // standalone: true,
  // imports: [CommonModule, AppRoutingModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() rutas?: Routes;
  @Input() titulo?: string;
  logo = faGithub;
}
