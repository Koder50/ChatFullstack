import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError,filter,map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlockedUsersList } from 'src/app/blocked-users-list/models/blocked-users-list.interface';

@Injectable({
  providedIn: 'root'
})
export class BlockedUsersListService {

  exists: boolean = false;

  constructor(private http: HttpClient) { }

  getBlockedUsersLists(): Observable<BlockedUsersList[]> {
      return this.http.get<BlockedUsersList[]>(`${environment.apiURL}/blocked-users-lists`).pipe(
        tap((data: BlockedUsersList[]) => data),
        catchError(err => throwError(() => err))
     )
    }

  getBlockedUsersList(id: string): Observable<BlockedUsersList> {
    return this.http.get<BlockedUsersList>(`${environment.apiURL}/blocked-users-lists/${id}`).pipe(
       tap((data: BlockedUsersList) => data),
       catchError(err => throwError(() => err))
    )
   }

  addBlockedUsersList(blockedUsersList: BlockedUsersList) : Observable<BlockedUsersList> {
    return this.http.post<BlockedUsersList>(`${environment.apiURL}/blocked-users-lists`, blockedUsersList).pipe(
      tap((data: BlockedUsersList) => data),
      catchError(err => throwError(() => err))
   )
  }

  updateBlockedUsersList(blockedUsersList: BlockedUsersList) : Observable<BlockedUsersList> {
    return this.http.put<BlockedUsersList>(`${environment.apiURL}/blocked-users-lists/${blockedUsersList.id}`, blockedUsersList).pipe(
      catchError(err => throwError(() => err))
    )
  }

   deleteBlockedUsersList(id:string) : Observable<BlockedUsersList> {
    return this.http.delete<BlockedUsersList>(`${environment.apiURL}/blocked-users-lists/${id}`).pipe(
      catchError(err => throwError(() => err))
   )
  }

}
