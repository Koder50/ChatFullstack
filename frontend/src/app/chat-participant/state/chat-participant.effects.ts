import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, forkJoin } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ChatParticipant } from '../models/chat-participant.interface';
import { ChatParticipantService } from '../services/chat-participant.service';
import { ChatParticipantActions } from './chat-participant.actions';
import { delay } from "rxjs/operators";

 
@Injectable()
export class ChatParticipantEffects {

  // get list of chat participants in the external API
  // set retrieved chat participant list in the state
  getChatParticipants$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(ChatParticipantActions.GET_CHAT_PARTICIPANT_LIST),
        mergeMap(() => this.chatParticipantService.getChatParticipants() //chatParticipants are taken
                                                                        //from api
          .pipe(
            map(chatParticipants => ({ type: ChatParticipantActions.SET_CHAT_PARTICIPANT_LIST,
                chatParticipants})),  //reducer listens to SET_CHAT_PARTICIPANT_LIST and takes it here
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true}
  );
  
  // add chat-participants in the database
  addChatParticipant$ = createEffect(() =>{
    return this.actions$.pipe(
        ofType(ChatParticipantActions.ADD_CHAT_PARTICIPANT_API),
        mergeMap((data: {type: string, payload: ChatParticipant}) => this.chatParticipantService.addChatParticipant(data.payload)
          .pipe(
            map(chatParticipants => ({ type: ChatParticipantActions.ADD_CHAT_PARTICIPANT_STATE, chatParticipant: data.payload })),
            tap(() =>  this.router.navigate(["chat-participants"])),
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true})

   modifyChatParticipant$ = createEffect(() =>{
    return this.actions$.pipe(
        ofType(ChatParticipantActions.MODIFY_CHAT_PARTICIPANT_API),
        mergeMap((data: {type: string, payload: ChatParticipant}) => this.chatParticipantService.updateChatParticipant(data.payload.id, data.payload)
          .pipe(
            map(chatParticipants => ({ type: ChatParticipantActions.MODIFY_CHAT_PARTICIPANT_STATE, chatParticipant: data.payload })),
            tap(() =>  this.router.navigate(["chat-participants"])),
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true})

  // remove chat-participants in the database
  removeChatParticipant$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(ChatParticipantActions.REMOVE_CHAT_PARTICIPANT_API),
        mergeMap((data: { payload: string}) => this.chatParticipantService.deleteChatParticipant(data.payload)
          .pipe(
            map(() => ({ type: ChatParticipantActions.REMOVE_CHAT_PARTICIPANT_STATE, chatParticipantId: data.payload })),
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true}
  );
  // remove all chat-participants in the database
  removeAllChatParticipant$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(ChatParticipantActions.REMOVE_ALL_CHAT_PARTICIPANT_API),
        mergeMap((data: {type: string, payload: string[]}) => 
        forkJoin([...data.payload.map((id) => this.chatParticipantService.deleteChatParticipant(id))])
          .pipe(
            map(() => ({ type: ChatParticipantActions.REMOVE_ALL_CHAT_PARTICIPANT_STATE })),
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true}
  );
 
  constructor(
    private actions$: Actions,
    private chatParticipantService: ChatParticipantService,
    private router: Router
  ) {}

  deleteOldPosts(postDate: string): boolean{
            let nowDate: Date = new Date();
            let nowUtc: number = Date.UTC(nowDate.getUTCFullYear(), nowDate.getUTCMonth(),
                         nowDate.getUTCDate(), nowDate.getUTCHours(),
                         nowDate.getUTCMinutes(), nowDate.getUTCSeconds());

            let tempNowUtc:string=new Date(nowUtc).toISOString().replace("T"," ");
            //delete older than one hour
            return postDate.slice(0,13)==tempNowUtc.slice(0,13);
      }
}