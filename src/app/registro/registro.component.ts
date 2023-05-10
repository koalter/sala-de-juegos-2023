import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../shared/usuario.service';
import { Router } from '@angular/router';
import { confirmarClaveValidator } from '../shared/confirmar-clave.validator';
import { ToastService } from '../toasts/shared/toast.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  formulario: FormGroup;

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

  get clave_repetir() {
    return this.formulario.get('clave_repetir');
  }
  set clave_repetir(value) {
    this.formulario.get('clave_repetir')?.setValue(value);
  }

  constructor(
    private usuarioService: UsuarioService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.formulario = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl('', [Validators.required, Validators.minLength(6)]),
      clave_repetir: new FormControl('', Validators.required)
    }, [confirmarClaveValidator(), Validators.required]);
  }

  enviar(): void {
    this.usuarioService.registro(this.correo?.value, this.clave?.value)
      .then(() => this.router.navigateByUrl('home'))
      .catch(err => this.toastService.mostrar(err.message));
  }
}
