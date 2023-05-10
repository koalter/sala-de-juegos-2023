import { Injectable } from '@angular/core';
import { ToastInfo } from './toast-info.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: ToastInfo[] = [];

  constructor() { }

  mostrar(mensaje: string): void {
    this.toasts.push({ mensaje });
  }

  remover(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}
