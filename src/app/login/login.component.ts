import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../shared/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  correo: string = '';
  clave: string = '';
  datosDePrueba: any[] = [
    { correo: 'test1@example.com', clave: 'password' },
    { correo: 'test2@example.com', clave: 'password' }
  ]

  constructor(private usuarioService: UsuarioService,
              private router: Router) { }

  enviar(): void {
    this.usuarioService.login(this.correo, this.clave)
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
