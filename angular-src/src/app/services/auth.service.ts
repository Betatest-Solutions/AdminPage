import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { map, catchError, tap } from 'rxjs/operators';
import { Observable } from "rxjs";
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { throwError } from "rxjs/internal/observable/throwError";

// interface TokenResponse {
//   token: string;
// }

@Injectable()
export class AuthService {

  // private token: string;
  authToken: any;
  user: any;

  constructor(private http: HttpClient, private router: Router) {}

  // private saveToken(token: string): void {
  //   localStorage.setItem('id_token', token);
  //   this.token = token;
  // }

  registerUser(user): Observable<any> {
    return this.http.post('http://localhost:3000/users/register',user).pipe(map((data: string) => {
      return data;
    }))
  }

  authenticateUser(user): Observable<any>{
    return this.http.post('http://localhost:3000/users/authenticate',user).pipe(map((data: string) => {
      return data;
    }))
  }

  // getProfile(): Observable<any>{
  //   this.loadToken();
  //   // const httpOptions = {
  //   //   headers: new HttpHeaders({
  //   //     'Content-Type':  'application/json',
  //   //     'Authorization': 'my-auth-token'
  //   //   })
  //   // };
  //
  //   // const headers = new HttpHeaders();
  //   // headers.append("Authorization", this.authToken);
  //   // headers.append("Content-Type", 'application/json');
  //   console.log('inside getProfile authservice before return');
  //   return this.http.get('http://localhost:3000/users/profile',{ headers: { Authorization: 'Bearer ${this.authToken}' }}).pipe(
  //     map((data: TokenResponse) => {
  //       if (data.token) {
  //         this.saveToken(data.token);
  //       }
  //       return data;
  //     })
  //   );
  //   //   .pipe(
  //   //   map((data: any[]) => {
  //   //     this.user = data;
  //   //     return true;
  //   //   }), catchError( error => {
  //   //     return throwError( 'Something went wrong!' + error)
  //   //   })
  //   // )
  // }

  // getProfile() {
  //   let headers = new httHeaders();
  //   this.loadToken();
  //   headers.append('Authorization', this.authToken);
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.get('users/profile', {headers: headers})
  //     .map(res => res.json());
  // }

  getProfile(): Observable<any> {
    // let headers = new HttpHeaders();
    this.loadToken();
    // headers.set('Authorization', this.authToken);
    // headers.set('Content-Type', 'application/json');
    console.log('inside profile');
    return this.http.get<any>('http://localhost:3000/users/profile',{ headers: { Authorization: this.authToken }}).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  getDashboard(): Observable<any> {
    this.loadToken();
    return this.http.get<any>('http://localhost:3000/users/dashboard',{ headers: { Authorization: this.authToken }}).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleErrorAndRoute.bind(this)),
    );
  }

  private handleError(err:HttpErrorResponse){
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  private handleErrorAndRoute(error: any) {
    let errorMessage = '';
    if (error) {
      this.router.navigate(['/home']);
      {
        // return Observable.throw(error.json().error || 'Server error');
        return throwError(errorMessage);
      }
    }
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }



  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
    console.log(this.authToken);
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}

