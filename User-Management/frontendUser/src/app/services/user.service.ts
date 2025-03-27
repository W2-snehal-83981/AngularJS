
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  //get all users
  getAllUsers():Observable<any> {
    return this.http.get(`${this.URL}/getusers`);
  }

  //login 
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.URL}/login`, { email, password });
  }

  //add new user
  addUser(user:any): Observable<any> {
    return this.http.post(`${this.URL}/adduser`,user);
  }

 //edit existing user
  updateUser(id : number,  updatedData: { age: number, email: string, phone: string, country: string }): Observable<any> {
    return this.http.put(`${this.URL}/edituser/${id}`,updatedData);
  }

  //fetch user by id
  getUserById(id: number): Observable<any>{
    return this.http.get(`${this.URL}/getuser/${id}`);
  }
  
  //fetch user by role
  getUserByRole(role:string): Observable<any> {
    return this.http.get(`${this.URL}/filter?role=${role}`);
  }

  //to retrive user object from localstorage to show profile of user
  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

 //delete user
  deleteUser(id:number) : Observable<any> {
    return this.http.delete(`${this.URL}/deleteuser/${id}`);
  }
}



  //   addUser(userData: { name: string, age: number, email: string, password: string, phone: string, country: string, role: string }): Observable<any> {
//     return this.http.post(`${this.URL}/adduser`,userData);
//   }

//   deleteUser(id:number) : Observable<any> {
//     return this.http.delete(`${this.URL}/deleteuser/${id}`);
//   }

// getAllUsers():Observable<any> {
//     return this.http.get(`${this.URL}/getusers`);
//   }

//   login(credentials:any): Observable<any> {
//     return this.http.post(`${this.URL}/login`, credentials);
//   }


  // updateUser(id : number, user:any): Observable<any> {
  //   return this.http.put(`${this.URL}/edituser/${id}`,user);
  // }

