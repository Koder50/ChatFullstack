import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';
import { TableActions } from '../../enums/table-actions.enum';
import { ChatParticipant } from '../../models/chat-participant.interface';
import { ChatParticipantActions } from '../../state/chat-participant.actions';
import { selectChatParticipants } from '../../state/chat-participant.selectors';
import { Subscription } from 'rxjs';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ChatParticipantService } from '../../services/chat-participant.service';
import { BlockedUsersList } from 'src/app/blocked-users-list/models/blocked-users-list.interface';
import { BlockedUsersListActions } from 'src/app/blocked-users-list/state/blocked-users-list.actions';
import { selectBlockedUsersLists } from 'src/app/blocked-users-list/state/blocked-users-list.selectors';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // sample data of anti hero
  chatParticipants: Array<ChatParticipant> = [];
  chatParticipants$ = this.store.select(selectChatParticipants());  //look at selector,return
                                                                    //state.chatParticipants
                                                                    //as observable
  blockedUsersLists: Array<BlockedUsersList> = [];
  blockedUsersLists$ = this.store.select(selectBlockedUsersLists());
  subscriptionChP: Subscription=Subscription.EMPTY;
  subscriptionBUL: Subscription=Subscription.EMPTY;

  headers: {headerName: string, fieldName: keyof ChatParticipant}[] = [
    {headerName: "Speaker", fieldName: "speaker"},
    {headerName: "Content", fieldName: "talkContent"},
    {headerName: "CreatedAt",fieldName: "createdAt"},
    {headerName: "ChatWith", fieldName: "chatWith"},
  ];

  chatParticipantsToDelete: ChatParticipant[]=[];
  chatParticipantService: ChatParticipantService;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    chatParticipantService: ChatParticipantService
    ) {
        this.chatParticipantService=chatParticipantService;
  }

  ngOnInit(): void {
    localStorage.setItem("mainPage",'true');
    localStorage.setItem('refresh','true');

    this.store.dispatch({type: ChatParticipantActions.GET_CHAT_PARTICIPANT_LIST});
    this.assignChatParticipants();
    this.deleteTooOldPosts();

    this.store.dispatch({type: BlockedUsersListActions.GET_BLOCKED_USERS_LIST_LIST});
    this.assignBlockedUsersLists();

    setInterval(() =>{
        if(localStorage.getItem("mainPage")=="true" && localStorage.getItem("refresh")=='true') {
            this.deleteTooOldPosts();
            this.store.dispatch({type: ChatParticipantActions.GET_CHAT_PARTICIPANT_LIST});
        }
    },2000);

  }

  ngOnDestroy() {
        this.subscriptionChP.unsubscribe();
        this.subscriptionBUL.unsubscribe();
  }

  assignChatParticipants() {
      this.subscriptionChP= this.chatParticipants$.subscribe((data:Array<ChatParticipant>) =>{
      for(let i=0;i<data.length;i++) {  //just works, deletes not demanded undefined objects
        if(data[i].createdAt==undefined || data[i].createdAt==null) data.splice(i, 1);
      }
      this.chatParticipants = data;
    });
  }

  assignBlockedUsersLists() {
        this.subscriptionBUL=this.blockedUsersLists$.subscribe((data:Array<BlockedUsersList>) =>{
        this.blockedUsersLists=data;
      });
  }


  selectChatParticipant(data: {chatParticipant: ChatParticipant, action: TableActions}) {
    switch(data.action) {
      case TableActions.View: {
        this.router.navigate(['chat-participants', 'form', data.chatParticipant.id]);
        return;
      }
      case TableActions.Delete: {
        this.store.dispatch({type: ChatParticipantActions.REMOVE_CHAT_PARTICIPANT_API, payload: data.chatParticipant.id});
        return;

      }
      default: ""
    }
  }

  executeCommandBarAction(action: CommandBarActions) {
    switch(action) {
      case CommandBarActions.Create: {
        this.router.navigate(["chat-participants", "form"]);
        return;
      }
      case CommandBarActions.DeleteAll: {
        this.store.dispatch({type: ChatParticipantActions.REMOVE_ALL_CHAT_PARTICIPANT_API, payload: [...this.chatParticipants.map(d => d.id)]})
        return;

      }
      case CommandBarActions.Logout: {
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            this.refresh();
            return;
        }
    case CommandBarActions.Refresh: {
        if(localStorage.getItem('refresh')=='true') localStorage.setItem('refresh','false');
        else localStorage.setItem('refresh','true');
            return;
    }
    default: ""

    }
  }

  refresh(): void {
      window.location.reload();
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
