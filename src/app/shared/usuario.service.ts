import { Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection } from '@angular/fire/firestore';
import { Auth, NextOrObserver, User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { SpinnerService } from '../spinner/shared/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  constructor(private firestore: Firestore,
              private auth: Auth,
              private spinnerService: SpinnerService) {  }

  async login(correo: string, clave: string): Promise<boolean> {
    return await this.setUsuario(correo, clave, signInWithEmailAndPassword);
  }

  async registro(correo: string, clave: string): Promise<boolean> {
    return await this.setUsuario(correo, clave, createUserWithEmailAndPassword);
  }

  async setUsuario(correo: string, clave: string, func: Function): Promise<boolean> {
    try {
      this.spinnerService.loading.next(true);
      await func(this.auth, correo, clave);
      await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: correo, fechaInicio: Timestamp.now() });
      return true;
    } catch (err: any) {
      await addDoc(collection(this.firestore, 'logErrores'), { error: err.toString(), fecha: Timestamp.now() });
      return false;
    } finally {
      this.spinnerService.loading.next(false);
    }
  }

  async logout(): Promise<void> {
    try {
      this.spinnerService.loading.next(true);
      await signOut(this.auth);
    } catch (err: any) {
      await addDoc(collection(this.firestore, 'logErrores'), { error: err.toString(), fecha: Timestamp.now() });
    } finally {
      this.spinnerService.loading.next(false);
    }
  }

  getUsuario(func: NextOrObserver<User>) {
    return onAuthStateChanged(this.auth, func);
  }

}
