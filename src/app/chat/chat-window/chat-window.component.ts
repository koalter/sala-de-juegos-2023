import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { faXmark, faArrowTurnRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent {

  @Output() toggle: EventEmitter<number> = new EventEmitter<number>();
  @Output() mensajero: EventEmitter<any> = new EventEmitter<any>();
  @Input() mensajes!: any[];
  mensaje: string = '';
  iconoCerrar = faXmark;
  iconoEnter = faArrowTurnRight;

  get email() {
    return this.auth.currentUser?.email;
  }

  constructor(private auth: Auth) { }
  
  cerrarChat(): void {
    this.toggle.emit(this.mensajes.length);
  }

  enviarMensaje(): void {
    if (this.mensaje) {
      const usuario = this.auth.currentUser;
      if (usuario) {
        const mensaje = { mensaje: this.mensaje, usuario: usuario.email, tiempo: new Date(Date.now()) };
        this.mensajero.emit(mensaje);
        this.mensaje = '';
      }
    }
  }

  enviarMensaje_keydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.enviarMensaje();
    }
  }

  scrollTop(chats: any): void {
    chats.scrollTop = chats.scrollHeight;
  }
}
