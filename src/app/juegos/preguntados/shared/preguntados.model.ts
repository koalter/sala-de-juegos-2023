export class Preguntados {
    id! : string;
    categoria : string;
    imagen : number;
    pregunta : string;
    respuestas : Respuesta[];

    constructor(pregunta : string, categoria : string, imagen : number, respuestas : Respuesta[]) {
        this.pregunta = pregunta;
        this.categoria = categoria;
        this.imagen = imagen;
        this.respuestas = respuestas;
    }
}

export class Respuesta {
    texto : string;
    solucion : boolean;

    constructor(texto : string, solucion : boolean) {
        this.texto = texto;
        this.solucion = solucion;
    }
}