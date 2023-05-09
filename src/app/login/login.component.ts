import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../shared/usuario.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formulario: FormGroup;
  datosDePrueba: any[] = [
    { correo: 'test1@example.com', clave: 'password' },
    { correo: 'test2@example.com', clave: 'password' }
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

  constructor(private usuarioService: UsuarioService,
              private router: Router) {
    this.formulario = new FormGroup({
      correo: new FormControl('', [Validators.email, Validators.required]),
      clave: new FormControl('', [Validators.required])
    });
  }

  enviar(): void {
    this.usuarioService.login(this.correo?.value, this.clave?.value)
      .then(res => {
        if (res) {
          this.router.navigateByUrl('/home');
        }
      });
  }

  setUsuario(jugador: number) {
    this.correo = this.datosDePrueba[jugador].correo;
    this.clave = this.datosDePrueba[jugador].clave;
  }
}
