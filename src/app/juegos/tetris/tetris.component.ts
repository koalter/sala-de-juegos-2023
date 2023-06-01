import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TetrisService } from './shared/tetris.service';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})
export class TetrisComponent implements OnInit, OnDestroy {
  instrucciones : boolean = true;
  victoria : boolean = false;
  derrota : boolean = false;
  intervalo! : number;
  puntos : number = 0;
  puntosSubscriber$! : Subscription;
  mostrarResultados : boolean = true;
  tiempo : Date = new Date(180000);
  
  canvas2dContext! : CanvasRenderingContext2D | null;

  constructor(private tetrisService : TetrisService) { 
      this.puntosSubscriber$ = this.tetrisService.obtenerPuntos().subscribe(puntos => {
        this.puntos = puntos;
      });
  }

  ngOnInit(): void {
    this.derrota = false;
    this.tiempo = new Date(180000);
    this.tetrisService.reiniciarPuntos();
  }

  ngOnDestroy(): void {
    this.puntosSubscriber$.unsubscribe();
  }

  iniciarRenderizado(canvas : HTMLCanvasElement) {
    this.ngOnInit();
    this.instrucciones = false;
    this.intervalo = Date.now();
    this.canvas2dContext = canvas.getContext('2d');

    if (this.canvas2dContext) {
      this.canvas2dContext.canvas.height = this.canvas2dContext.canvas.width * 2;
      this.tetrisService.mappearTabla(this.canvas2dContext);
      this.tetrisService.nuevaFigura(this.canvas2dContext);
      this.automatizarMovimiento();
    }
  }

  moverIzquierda(context : CanvasRenderingContext2D | null) : void {
    if (context) {
      this.tetrisService.moverFiguraIzquierda(context);
    }
  }

  moverDerecha(context : CanvasRenderingContext2D | null) : void {
    if (context) {
      this.tetrisService.moverFiguraDerecha(context);
    }
  }

  moverAbajo(context : CanvasRenderingContext2D | null) : void {
    if (context) {
      try {
        this.tetrisService.moverFiguraAbajo(context);
      } catch {
        this.derrota = true;
      }
    }
  }

  girar(context : CanvasRenderingContext2D | null) : void {
    if (context) {
      this.tetrisService.girarFigura(context);
    }
  }

  tirar(context : CanvasRenderingContext2D | null) {
    if (context) {
      try {
        while (this.tetrisService.moverFiguraAbajo(context)) {}
      } catch {
        this.derrota = true;
      }
    }
  }

  automatizarMovimiento() : void {
    let ahora = Date.now();
    
    if (ahora - this.intervalo > 990) 
    {
      this.tiempo.setSeconds(this.tiempo.getSeconds() - 1);
      this.moverAbajo(this.canvas2dContext);
      this.intervalo = Date.now();

      if (this.tiempo.getTime() === 0) {
        this.derrota = true;
      }
    }

    if(!this.derrota)
    {
      requestAnimationFrame(() => this.automatizarMovimiento());
    }
  }
}
