import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError,filter,map } from 'rxjs';
import{ User } from "src/app/auth/models/user.interface";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
          return this.http.get<User[]>(`${environment.apiURL}/users`).pipe(
            tap((data: User[]) => data),
            catchError(err => throwError(() => err))
         )
    }
}
