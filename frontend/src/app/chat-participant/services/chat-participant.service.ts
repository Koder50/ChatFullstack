import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError,filter,map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatParticipant } from '../models/chat-participant.interface';
import { SocketService } from 'src/app/socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatParticipantService {

  private _isChatCreated:boolean = false;
  private _isAddedOrRemoved:boolean = false;
  chatWith: string;
  blocked: string[]=[];

  constructor(private socketService: SocketService,private http: HttpClient) { }

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

  //getters and setters detects changes of value of the object, thanks to this also chat works in real time
  get isChatCreated(): boolean {
      return this._isChatCreated;
    }

  set isChatCreated(value: boolean) {
    if(value==true && this._isChatCreated==false) {
       console.log('Zmieniono _isChatCreated z', this._isChatCreated, 'na', 'true');
       this._isChatCreated = value;
       this.socketService.sendMessage("Napisałem początek!");
    }
    else if(value==false && this._isChatCreated==true) {
       console.log('Zmieniono _isChatCreated z', this._isChatCreated, 'na', 'false');
       this._isChatCreated = value;
    }
  }

  get isAddedOrRemoved(): boolean {
        return this._isAddedOrRemoved;
      }

  set isAddedOrRemoved(value: boolean) {
     if(value==true && this._isAddedOrRemoved==false) {
        console.log('Zmieniono _isAddedOrRemoved z', this._isAddedOrRemoved, 'na', 'true');
        this._isAddedOrRemoved = value;
        this.socketService.sendMessage("Napisałem początek!");
        this._isAddedOrRemoved = false;
     }
     else if(value==false && this._isAddedOrRemoved==true) {
        console.log('Zmieniono _isAddedOrRemoved z', this._isAddedOrRemoved, 'na', 'false');
        this._isAddedOrRemoved = value;
     }
  }

}
