
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getAllUsers():Observable<any> {
    return this.http.get(`${this.URL}/getusers`);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.URL}/login`, { email, password });
  }

//   addUser(userData: { name: string, age: number, email: string, password: string, phone: string, country: string, role: string }): Observable<any> {
//     return this.http.post(`${this.URL}/adduser`,userData);
//   }

  updateUser(id : number,  updatedData: { age: number, email: string, phone: string, country: string }): Observable<any> {
    return this.http.put(`${this.URL}/edituser/${id}`,updatedData);
  }

  getUserById(id: number): Observable<any>{
    return this.http.get(`${this.URL}/getuser/${id}`);
  }

  getUserByRole(role:string): Observable<any> {
    return this.http.get(`${this.URL}/filter?role=${role}`);
    // let url = this.URL;
    // if(role){
    //   url += `/getuser?role=${role}`;
    // }
    // return this.http.get(url);
  }
  // logout(): void {
  //   localStorage.removeItem('user');
  // }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

//   deleteUser(id:number) : Observable<any> {
//     return this.http.delete(`${this.URL}/deleteuser/${id}`);
//   }

// getAllUsers():Observable<any> {
//     return this.http.get(`${this.URL}/getusers`);
//   }

//   login(credentials:any): Observable<any> {
//     return this.http.post(`${this.URL}/login`, credentials);
//   }

  addUser(user:any): Observable<any> {
    return this.http.post(`${this.URL}/adduser`,user);
  }

  // updateUser(id : number, user:any): Observable<any> {
  //   return this.http.put(`${this.URL}/edituser/${id}`,user);
  // }

  deleteUser(id:number) : Observable<any> {
    return this.http.delete(`${this.URL}/deleteuser/${id}`);
  }
}
