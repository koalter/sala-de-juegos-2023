import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Unsubscribe, User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { SpinnerService } from './spinner/shared/spinner.service';
import { Router } from '@angular/router';
import { ToastService } from './toasts/shared/toast.service';

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
  getUsuario$!: Unsubscribe;
  
  constructor(private authService: AuthService,
              private spinnerService: SpinnerService,
              private toastService: ToastService,
              private router: Router) { }
  
  ngOnInit(): void {
    this.getUsuario$ = this.authService.getUsuario(usuario => {
      this.usuario = usuario;
    });
    this.spinnerSubscription = this.spinnerService.loading.subscribe(state => {
      this.spinner = state;
    });
  }

  ngOnDestroy(): void {
      this.spinnerSubscription.unsubscribe();
      this.getUsuario$();
  }

  cerrarSesion() {
    this.authService.logout()
      .then(loggedOut => {
        if (loggedOut) {
          this.router.navigateByUrl('login');
        }
      })
      .catch(() => this.toastService.mostrar('¡Hubo un error durante el cierre de sesión!'));
  }
}
