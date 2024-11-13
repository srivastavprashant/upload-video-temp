import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticatedSubject.next(true);
      this.router.navigate(['/upload']);
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }
}