import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from '@angular/fire/auth';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { ToastService } from '../toasts/shared/toast.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  nuevosMensajes: boolean = false;
  toggleChat: boolean = false;
  mensajes: any[] = []; //TODO crear entidad para los mensajes
  mensajesLeidos!: number;
  mensajes$!: Unsubscribe;

  constructor(private firestore: Firestore,
    private toastService: ToastService) { }
  
  ngOnInit(): void {
    this.mensajes$ = onSnapshot(collection(this.firestore, 'chat'), snapshot => {
      const mensajes: any[] = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        mensajes.push({ mensaje: data['mensaje'], usuario: data['usuario'], tiempo: data['tiempo'].toDate() });
      });

      this.mensajes = mensajes.sort((before, after) => {
        if (before.tiempo > after.tiempo) return 1;
        if (after.tiempo > before.tiempo) return -1;
        return 0;
      });
    })
  }

  ngOnDestroy(): void {
    this.mensajes$();
  }

  abrirChat(): void {
    this.nuevosMensajes = false;
    this.toggleChat = true;
  }

  cerrarChat(cantidadDeMensajes: number): void {
    this.toggleChat = !this.toggleChat;
    this.mensajesLeidos = cantidadDeMensajes;
  }

  enviarMensaje(chatDetalles: any) {
    addDoc(collection(this.firestore, 'chat'), {
      mensaje: chatDetalles.mensaje,
      usuario: chatDetalles.usuario,
      tiempo: chatDetalles.tiempo
    })
    .then(res => console.log(res))
    .catch(err => this.toastService.mostrar(err));
  }
}
