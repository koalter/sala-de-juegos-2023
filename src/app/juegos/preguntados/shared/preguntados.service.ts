import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, Timestamp, query } from '@angular/fire/firestore';
import { Photo, createClient } from 'pexels';
import { environment } from '../../../../environments/environment';
import { Preguntados } from './preguntados.model';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {
  private _apiClient = createClient(environment.pexelsApiKey);

  constructor(private firestore : Firestore) { }

  async generarPregunta() {
    try {
      const q = query(collection(this.firestore, "juegos", "preguntados", "preguntas"));
      const querySnapshot = await getDocs(q);
      const index = Math.floor(Math.random() * querySnapshot.size);
      
      const result = querySnapshot.docs[index].data();
      result["respuestas"] = this.mezclarRespuestas(result["respuestas"]);

      return new Preguntados(result["pregunta"], result["categoria"], result["imagen"], result["respuestas"]);

    } catch (err : any) {
      addDoc(collection(this.firestore, 'logErrores'), { error: err.toString(), fecha: Timestamp.now() });
      throw err;
    }
  }

  private mezclarRespuestas(respuestas : any[]) {
    let count = respuestas.length;
    let index : number;
    let temp : any;
    
    while(count > 0) {
        index = Math.floor(Math.random() * count);
        count--;

        temp = respuestas[count];
        respuestas[count] = respuestas[index];
        respuestas[index] = temp;
    }

    return respuestas;
  }

  async obtenerImagen(id : number): Promise<string> {
    try {
      const result = await this._apiClient.photos.show({ id: id });
      return (result as Photo).src.medium;
      
    } catch (err : any) {
      addDoc(collection(this.firestore, 'logErrores'), { error: err.toString(), fecha: Timestamp.now() });
      return "";
    }
  }
}
