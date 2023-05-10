import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../shared/usuario.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../toasts/shared/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formulario: FormGroup;
  datosDePrueba: any[] = [
    { correo: 'jugador1@lnck.com', clave: 'jugador1@lnck.com' },
    { correo: 'jugador2@lnck.com', clave: 'jugador2@lnck.com' }
  ];

  get correo() {
    return this.formulario.get('correo');
  }
  set correo(value) {
    this.formulario.get('correo')?.setValue(value);
  }

  get clave() {
    return this.formulario.get('clave');
  }
  set clave(value) {
    this.formulario.get('clave')?.setValue(value);
  }

  constructor(
    private usuarioService: UsuarioService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.formulario = new FormGroup({
      correo: new FormControl('', [Validators.email, Validators.required]),
      clave: new FormControl('', [Validators.required])
    });
  }

  enviar(): void {
    this.usuarioService.login(this.correo?.value, this.clave?.value)
      .then(() => this.router.navigateByUrl('/home'))
      .catch(err => this.toastService.mostrar(err.message));
  }

  setUsuario(jugador: number) {
    this.correo = this.datosDePrueba[jugador].correo;
    this.clave = this.datosDePrueba[jugador].clave;
  }
}
