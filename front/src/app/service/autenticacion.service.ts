import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor() {
    //checa si hay algo en el localStorage y si esta available
    let storedUser = null;
    if (this.isLocalStorageAvailable()) {
      storedUser = localStorage.getItem('currentUser');
    }
    this.userSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.user = this.userSubject.asObservable();
  }
//checar si esta disponible el localStorage
  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  login(user: User): void {
    //guarda en el localStorage
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.userSubject.next(user);
  }

  logout(): void {
    //borra en el localStorage el currentUser
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('currentUser');
    }
    this.userSubject.next(null);
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }
}
