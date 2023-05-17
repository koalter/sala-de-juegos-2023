import { Component, OnInit } from '@angular/core';
import { faHeart, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { PalabrasService } from './shared/palabras.service';
import { ToastService } from 'src/app/toasts/shared/toast.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit {

  palabra : string[] = [];
  palabraOculta : string[] = [];
  vida : any[] = [1, 2, 3, 4, 5, 6, 7];
  perdiste : boolean = false;
  ganaste : boolean = false;
  instrucciones : boolean = true;
  keys : any[] = [];
  heart = faHeart;
  cruz = faXmark;
  exito = faCheck;

  constructor(private palabrasService: PalabrasService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.ganaste = false;
    this.perdiste = false;
    this.vida = [1, 2, 3, 4, 5, 6, 7];
    
    if (this.keys.length > 0) {
      for (let key of this.keys) {
        key.disabled = false;
      }
    }

    // El servicio toma UNA sola respuesta de la petición y se completa, utilizando la función take(1) de rxjs, por lo que no hace falta desuscribirse
    this.palabrasService.getPalabra()
      .subscribe(res => {
        if (res) {
          const palabra = (res as string[])[0].toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          this.palabraOculta = palabra.split('');
          this.palabra = this.palabraOculta.map(v => v).fill('_');
        } else {
          this.toastService.mostrar('Error al cargar el juego.');
        }
    });
  }

  seleccionarLetra(ev: any) {
    this.keys.push(ev.target);
    ev.target.disabled = true;
    const char = ev.target.childNodes[0].textContent;
    let indices : number[] = [];
    let existe = false;

    for (let i = 0; i < this.palabraOculta.length; i++) {
      if (this.palabraOculta[i] === char) {
        indices.push(i);
        existe = true;
      }
    }

    for (let num of indices) {
      this.palabra.splice(num, 1, char);
    }

    if (!existe) {
      this.vida.pop();
    }
    
    if (this.vida.length <= 0) {
      this.perdiste = true;
    }

    if (this.palabra.toString() === this.palabraOculta.toString()) {
      this.ganaste = true;
    }
  }
}
