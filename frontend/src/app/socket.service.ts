import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { BlockedUsersListActions } from 'src/app/blocked-users-list/state/blocked-users-list.actions';
import { BlockedUsersList } from 'src/app/blocked-users-list/models/blocked-users-list.interface';
import { FormGroup, FormControl } from "@angular/forms";
import { ChatParticipantActions } from 'src/app/chat-participant/state/chat-participant.actions';
import { ChatParticipant } from 'src/app/chat-participant/models/chat-participant.interface';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket:Socket;
  blockedUsersLists: Array<BlockedUsersList> = [];
  blockedForm = new FormGroup({
      blocked: new FormControl(),
    });
  chatParticipants: Array<ChatParticipant> = [];
  chatParticipantsToDelete: ChatParticipant[]=[];

  constructor(private store: Store<AppState>) {
    // Initialize the Socket.io connection with the server address.
    this.socket = io('http://localhost:3000');

    this.socket.on("reply", (msg: string) => {
            console.log("W kliencie!");
            console.log("Jest 9");
            this.store.dispatch({type: BlockedUsersListActions.GET_BLOCKED_USERS_LIST_LIST});
            if(this.blockedUsersLists!=undefined && this.blockedUsersLists) {
               this.initBlockedInForm();
            }
            this.deleteTooOldPosts();
            console.log("Przed");
            setTimeout(()=>{
                this.store.dispatch({type: ChatParticipantActions.GET_CHAT_PARTICIPANT_LIST});
                console.log("Po");
            },5000);

    });
  }

  // Method to send a message to the server.
  public sendMessage(message: string) {
    this.socket.emit('message', message); // Emits a 'message' event to the server with the provided message.
    console.log("Przed if message: "+message);
    //this.socket.emit("reply", "Serwer mówi: " + message);


  }

  // Method to listen for incoming messages from the server.
  public onMessage() {
    return new Observable(observer => {
      this.socket.on('message', (message) => { // Listens for the 'message' event from the server.
        observer.next(message); // Pushes the received message to the observer.
      });
    });
  }



  initBlockedInForm() {
      for(let i=0; i<this.blockedUsersLists.length; i++) {
          if(this.blockedUsersLists[i].userEmail==localStorage.getItem('userEmail')){
              this.blockedForm.patchValue({
                  blocked: this.blockedUsersLists[i].blockedUsersList
              });
          }
      }
    }

    deleteTooOldPosts() {
          if(this.chatParticipants!=undefined && this.chatParticipants.length>0){
              this.chatParticipantsToDelete=this.chatParticipants.filter((data: ChatParticipant) =>
              data.createdAt.slice(0,13)
              !=new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(),
              new Date().getUTCDate(), new Date().getUTCHours(), new Date().getUTCMinutes(),
              new Date().getUTCSeconds())).toISOString().replace("T"," ").slice(0,13));
              for(let i=0;i<this.chatParticipantsToDelete.length;i++) {
                  this.store.dispatch({type: ChatParticipantActions.REMOVE_CHAT_PARTICIPANT_API,
                      payload: this.chatParticipantsToDelete[i].id});
              }
          }
      }
}
