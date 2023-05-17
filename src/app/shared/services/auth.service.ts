import { Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection } from '@angular/fire/firestore';
import { Auth, NextOrObserver, User, UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { SpinnerService } from '../../spinner/shared/spinner.service';
import { FirebaseError } from '@angular/fire/app';
import { AuthError } from '../domains/auth.error';

interface UserCredentialDelegate {
  (auth: Auth, email: string, password: string): Promise<UserCredential>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  usuario!: User | null;

  get username() {
    return this.usuario?.displayName || this.usuario?.email;
  }

  constructor(private firestore: Firestore,
              private auth: Auth,
              private spinnerService: SpinnerService) { 
    this.getUsuario(user => 
      this.usuario = user);
  }

  async login(correo: string, clave: string): Promise<void> {
    return await this.setUsuario(correo, clave, signInWithEmailAndPassword);
  }

  async registro(correo: string, clave: string): Promise<void> {
    return await this.setUsuario(correo, clave, createUserWithEmailAndPassword);
  }

  async setUsuario(correo: string, clave: string, func: UserCredentialDelegate): Promise<void> {
    try {
      this.spinnerService.loading.next(true);
      const credenciales = await func(this.auth, correo, clave);
      this.usuario = credenciales.user;
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
      this.usuario = null;
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
