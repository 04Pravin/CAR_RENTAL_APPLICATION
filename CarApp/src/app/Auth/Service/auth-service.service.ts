import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/Model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loginUrl = 'http://localhost:8081/auth-api/login';
  private registerUrl = 'http://localhost:8081/auth-api/register';
  currentUser!: User;

  constructor(private _httpClient:HttpClient, private _router:Router, private jwtHelper:JwtHelperService) { }

  
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { username, password };
    return this._httpClient.post<any>(this.loginUrl, body, { headers });
  }

  register(user: User): Observable<any> {
    return this._httpClient.post<any>(this.registerUrl, user);
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getUserRoles(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this._httpClient.get<any>(`${this.loginUrl}/roles`, { headers });
  }

  public getUserDetails(username: string): Observable<User>{
    return this._httpClient.get<User>('http://localhost:8081/auth-api/username/'+username);
  }

  public getUser(username:string, email:string): Observable<User>{
    return this._httpClient.get<User>('http://localhost:8081/auth-api/resetPassword/username/'+username+'/email/'+email);
  }

  public updateUser(user: User, userId:number): Observable<any>{
    const updateUser = this.cleanUserObject(user); 
    return this._httpClient.put<any>('http://localhost:8081/auth-api/update/userId/'+userId, updateUser);
  }

  cleanUserObject(user: any): any {
    const { authorities, ...cleanedUser } = user;
    return cleanedUser;
  }

}
