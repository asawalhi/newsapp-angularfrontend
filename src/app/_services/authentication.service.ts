import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserToken: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  baseUrl = "http://localhost:2938/"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'})
    }
  constructor(private http: HttpClient) { 
    this.currentUserToken = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserToken.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserToken.value;
}

login(username: string, password: string){
  return this.http.post<any>(this.baseUrl+"login",{"username": username, "password":password})
  .pipe(map(user => {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserToken.next(user);
    return user;
  }))
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.currentUserToken.next(null!);
}

registerUser(user: string, email: string, password: string){
  return this.http.post<any>((this.baseUrl+"createAdmin"), 
    { "username": user, "email": email, "password": password, "admin":null},
    this.httpOptions)
}
}
