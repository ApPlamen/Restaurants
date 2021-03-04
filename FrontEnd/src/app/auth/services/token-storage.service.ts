import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private isLoggedIn = false;

  constructor() { }

  signOut(): void {
    this.isLoggedIn = false;

    sessionStorage.clear();
  }

  public saveToken(token: string): void {
    this.isLoggedIn = true;
    
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    this.isLoggedIn = true;

    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getUserRoles(): string[] {
    return this.getUser().roles ?? [];
  }

  public isUserLoggedIn(): boolean {
    return sessionStorage.getItem(TOKEN_KEY) != null && sessionStorage.getItem(USER_KEY) != null;
  }
}