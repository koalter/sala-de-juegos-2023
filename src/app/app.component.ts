import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from './shared/usuario.service';
import { User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { SpinnerService } from './spinner/shared/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'LNCK_';
  rutas = [
    { path: 'home', title: 'Home'},
    { path: 'about', title: 'Quién Soy'},
  ];
  usuario?: User | null = undefined;
  spinner: boolean = false;
  spinnerSubscription!: Subscription;
  
  constructor(private usuarioService: UsuarioService,
              private spinnerService: SpinnerService) { }
  
  ngOnInit(): void {
    this.usuarioService.getUsuario(usuario => {
      this.usuario = usuario;
    });
    this.spinnerSubscription = this.spinnerService.loading.subscribe(state => {
      this.spinner = state;
    });
  }

  ngOnDestroy(): void {
      this.spinnerSubscription.unsubscribe();
  }

  cerrarSesion() {
    this.usuarioService.logout();
  }
}
