import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LNCK_';
  rutas = [
    { path: 'home', title: 'Home'},
    { path: 'about', title: 'Quién Soy'},
  ];
}
