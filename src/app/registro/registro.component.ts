import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../shared/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  formulario: FormGroup;

  get correo() {
    return this.formulario.get('correo')?.value as string;
  }
  set correo(value) {
    this.formulario.get('correo')?.setValue(value);
  }

  get clave() {
    return this.formulario.get('clave')?.value as string;
  }
  set clave(value) {
    this.formulario.get('clave')?.setValue(value);
  }

  get clave_repetir() {
    return this.formulario.get('clave_repetir')?.value as string;
  }
  set clave_repetir(value) {
    this.formulario.get('clave_repetir')?.setValue(value);
  }

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.formulario = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl('', Validators.required),
      clave_repetir: new FormControl('', Validators.required)
    });
  }

  enviar(): void {
    this.usuarioService.registro(this.correo, this.clave)
      .then(res => {
        if (res) {
          this.router.navigateByUrl('home');
        }
      });
  }
}
