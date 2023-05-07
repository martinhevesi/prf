import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerlUrl = environment.baseUrl;
  public isLoggedInGlobal = false;

  constructor(private http: HttpClient) { }

  public getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiServerlUrl}/users/${id}`);
  }

  public getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerlUrl}/users`);
  }

  public createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiServerlUrl}/users`, user);
  }

  public deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerlUrl}/users/${id}`);
  }

  public loginUser(loginUser: any): Observable<string> {
    return this.http.post<any>(`${this.apiServerlUrl}/users/login`, loginUser)
      .pipe(user => {
        console.log(user);
        this.isLoggedInGlobal = true;
        return user;
      });
  }

  public logoutUser(): Observable<string> {
    return this.http.post<any>(`${this.apiServerlUrl}/users/logout`, null)
      .pipe(msg => {
        console.log(msg);
        this.isLoggedInGlobal = true;
        return msg;
      });
  }

  public getActualUser(): Observable<any> {
    return this.http.get<void>(`${this.apiServerlUrl}/users/status`)
      .pipe(user => {
        console.log(user);
        return user;
      });
  }

  public isLoggedIn(): boolean {
    return this.isLoggedInGlobal;
  }

}
