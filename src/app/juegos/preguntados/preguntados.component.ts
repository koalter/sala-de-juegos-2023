import { Component } from '@angular/core';
import { PreguntadosService } from './shared/preguntados.service';
import { Preguntados } from './shared/preguntados.model';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent {
  instrucciones: boolean = true;
  victoria: boolean = false;
  derrota: boolean = false;
  pregunta!: Preguntados;
  imagenURL: string = "";

  constructor(private preguntadosService: PreguntadosService) { }

  ngOnInit(): void {
    this.generarPregunta();
  }

  comenzar() {
    this.instrucciones = false;
    if (!this.pregunta) {
      this.generarPregunta();
    }
  }

  generarPregunta() {
    this.victoria = false;
    this.derrota = false;

    this.preguntadosService.generarPregunta()
    .then(res => {
      this.pregunta = res;
      this.preguntadosService.obtenerImagen(res.imagen)
      .then(foto => this.imagenURL = foto);
    })
    .catch(err => console.log(err))
  }

  responder(index: number) {
    if (this.pregunta.respuestas[index].solucion) {
      this.victoria = true;
    } else {
      this.derrota = true;
    }
  }
}
