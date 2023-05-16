import { Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection } from '@angular/fire/firestore';
import { Auth, NextOrObserver, User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { SpinnerService } from '../../spinner/shared/spinner.service';
import { FirebaseError } from '@angular/fire/app';
import { AuthError } from '../domains/auth.error';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private firestore: Firestore,
              private auth: Auth,
              private spinnerService: SpinnerService) {  }

  async login(correo: string, clave: string): Promise<void> {
    return await this.setUsuario(correo, clave, signInWithEmailAndPassword);
  }

  async registro(correo: string, clave: string): Promise<void> {
    return await this.setUsuario(correo, clave, createUserWithEmailAndPassword);
  }

  async setUsuario(correo: string, clave: string, func: Function): Promise<void> {
    try {
      this.spinnerService.loading.next(true);
      await func(this.auth, correo, clave);
      await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: correo, fechaInicio: Timestamp.now() });
    } catch (err: any) {
      await addDoc(collection(this.firestore, 'logErrores'), { error: err.toString(), fecha: Timestamp.now() });
      throw new AuthError(err as FirebaseError);
    } finally {
      this.spinnerService.loading.next(false);
    }
  }

  async logout(): Promise<boolean> {
    try {
      this.spinnerService.loading.next(true);
      await signOut(this.auth);
      return true;
    } catch (err: any) {
      await addDoc(collection(this.firestore, 'logErrores'), { error: err.toString(), fecha: Timestamp.now() });
      return false;
    } finally {
      this.spinnerService.loading.next(false);
    }
  }

  getUsuario(func: NextOrObserver<User>) {
    return onAuthStateChanged(this.auth, func);
  }

}
