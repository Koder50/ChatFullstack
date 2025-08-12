import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError,filter,map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatParticipant } from '../models/chat-participant.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatParticipantService {

  isChatCreated:boolean = false;
  chatWith: string;
  blocked: string[]=[];

  constructor(private http: HttpClient) { }

  getChatParticipants(): Observable<ChatParticipant[]> {
      return this.http.get<ChatParticipant[]>(`${environment.apiURL}/chat-participants`).pipe(
        tap((data: ChatParticipant[]) => data),
        /*map((chatParticipants: ChatParticipant[]) =>{
            return (chatParticipants.filter((chatParticipant: ChatParticipant) =>{
            return this.deleteOldPosts(chatParticipant.createdAt )}))}),*/
        //tap((data: ChatParticipant[]) => console.log("data: "+data)),
        catchError(err => throwError(() => err))
     )
    }

//first condition was this: chatParticipant.createdAt<"2024-06-03 13:20:00 UTC";
 deleteOldPosts(postDate: string): boolean{
        let nowDate: Date = new Date();
        let nowUtc: number = Date.UTC(nowDate.getUTCFullYear(), nowDate.getUTCMonth(),
                     nowDate.getUTCDate(), nowDate.getUTCHours(),
                     nowDate.getUTCMinutes(), nowDate.getUTCSeconds());

        let tempNowUtc:string=new Date(nowUtc).toISOString().replace("T"," ");
        //delete older than one hour
        return postDate.slice(0,13)==tempNowUtc.slice(0,13);
  }

  getChatParticipant(id: string): Observable<ChatParticipant> {
    return this.http.get<ChatParticipant>(`${environment.apiURL}/chat-participants/${id}`).pipe(
       tap((data: ChatParticipant) => data),
       catchError(err => throwError(() => err))
    )
   }

  addChatParticipant(chatParticipant: ChatParticipant) : Observable<ChatParticipant> {
    return this.http.post<ChatParticipant>(`${environment.apiURL}/chat-participants`, chatParticipant).pipe(
      tap((data: ChatParticipant) => data),
      catchError(err => throwError(() => err))
   )
  }

  updateChatParticipant(id:string, chatParticipant: ChatParticipant) : Observable<ChatParticipant> {
    return this.http.put<ChatParticipant>(`${environment.apiURL}/chat-participants/${id}`, chatParticipant).pipe(
      catchError(err => throwError(() => err))
   )
  }

   deleteChatParticipant(id:string) : Observable<ChatParticipant> {
    return this.http.delete<ChatParticipant>(`${environment.apiURL}/chat-participants/${id}`).pipe(
      catchError(err => throwError(() => err))
   )
  }

}
