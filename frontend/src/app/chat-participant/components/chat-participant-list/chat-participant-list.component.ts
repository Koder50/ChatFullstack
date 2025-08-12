import { Component, EventEmitter, Input, OnInit, Output,OnChanges } from '@angular/core';
import { TableActions } from '../../enums/table-actions.enum';
import { ChatParticipant } from '../../models/chat-participant.interface';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ChatParticipantService } from '../../services/chat-participant.service';
import { UserService } from 'src/app/auth/services/user.service';
import { User } from "../../../auth/models/user.interface";
import { tap } from 'rxjs';
import { FormGroup, FormControl } from "@angular/forms";
import { BlockedUsersListService } from 'src/app/blocked-users-list/services/blocked-users-list.service';
import { BlockedUsersList } from 'src/app/blocked-users-list/models/blocked-users-list.interface';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { BlockedUsersListActions } from 'src/app/blocked-users-list/state/blocked-users-list.actions';


@Component({
  selector: 'app-chat-participant-list',
  templateUrl: './chat-participant-list.component.html',
  styleUrls: ['./chat-participant-list.component.scss']
})
export class ChatParticipantListComponent implements OnInit,OnChanges {
  @Input() headers: Array<{headerName: string, fieldName: keyof ChatParticipant}> = [];
  @Input() chatParticipants: Array<ChatParticipant> = [];
  @Input() blockedUsersLists: Array<BlockedUsersList> = [];
  @Output() chatParticipant = new EventEmitter<{chatParticipant: ChatParticipant, action :TableActions}>();
  headerFields: string[] = [];
  dataSource:any;
  users: Array<User>=[];
  userEmails: Array<string>=[];
  chatParticipantService: ChatParticipantService;
  userService: UserService;
  personForm = new FormGroup({
    mailName: new FormControl(),
  });
  isUserEmailFoundAndNotBlocked: boolean=false;
  blockedForm = new FormGroup({
    blocked: new FormControl(),
  });

  blockedUsersListService: BlockedUsersListService;
  blockedUsersListList: Array<BlockedUsersList>=[];
  blockedUsersListObject: BlockedUsersList;

  isInitAddingBlockedUsersListCheck=true;

  constructor(chatParticipantService: ChatParticipantService,
      blockedUsersListService: BlockedUsersListService,
      userService: UserService,
      private store: Store<AppState>) {
    this.chatParticipantService=chatParticipantService;
    this.blockedUsersListService=blockedUsersListService;
    this.userService=userService;
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges() {
        //input is loading some time,here chatParticipants are not empty already after ngOnInit
        if(this.chatParticipants!=undefined && this.chatParticipants) {
          this.prepareAndInitializeDataSource();

          if(this.isInitAddingBlockedUsersListCheck) {
              let blockedUsersListObject: BlockedUsersList={
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                userEmail: localStorage.getItem('userEmail')!, //! means that compiler should not shout
                blockedUsersList: ["user9999@mail.com"]
              };

              this.setUserEmailsAndOthers(blockedUsersListObject);

              if(this.blockedUsersLists!=undefined && this.blockedUsersLists) this.initBlockedInForm();

          }
          else this.setUserEmailsAndOthers();
        }
  }

  prepareAndInitializeDataSource() {
    let chatParticipantNotToDelete:ChatParticipant[]=
    this.leaveOnlyChatParticipantsWithCurrentHour();
    chatParticipantNotToDelete=this.leaveOnlyTwoSpeakersInChat(chatParticipantNotToDelete);
    this.dataSource = new MatTableDataSource(chatParticipantNotToDelete);
    this.dataSource.sort = this.sort;
  }

  leaveOnlyChatParticipantsWithCurrentHour(): ChatParticipant[] {
    return this.chatParticipants.filter((data: ChatParticipant) =>{return data.createdAt.slice(0,13)
        ==new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(),
        new Date().getUTCDate(), new Date().getUTCHours(),new Date().getUTCMinutes(),
        new Date().getUTCSeconds())).toISOString().replace("T"," ").slice(0,13)});
  }

  leaveOnlyTwoSpeakersInChat(chatParticipantNotToDelete: ChatParticipant[]): ChatParticipant[]{
    return chatParticipantNotToDelete.filter((data: ChatParticipant) =>
    {return ((data.speaker==localStorage.getItem("userEmail") &&
    data.chatWith==this.personForm.controls['mailName'].value) ||
    (data.speaker==this.personForm.controls['mailName'].value &&
    data.chatWith==localStorage.getItem("userEmail")))})
  }

  setUserEmailsAndOthers(blockedUsersListObject?: BlockedUsersList) {
    this.userService.getUsers().subscribe((data)=>{
        this.setUserEmailsShorter(data);

        this.blockedUsersListService.getBlockedUsersLists().subscribe((data: Array<BlockedUsersList>)=>{
            if(data.length>0){
                this.blockedUsersListList=data;
                if(this.isInitAddingBlockedUsersListCheck){
                    for(let i=0;i<this.blockedUsersListList.length;i++){
                        i=this.addBlockedUsersListToNgrxOrNot(i,blockedUsersListObject);
                    }
                    this.isInitAddingBlockedUsersListCheck=false;
                }
            }
        });

    });
  }

  setUserEmailsShorter(data: User[]) {
    this.users=data;
    this.users.filter(user=>this.userEmails.push(user.email));
  }

  addBlockedUsersListToNgrxOrNot(i:number,blockedUsersListObject?: BlockedUsersList):number {
    if(this.blockedUsersListList[i].userEmail==localStorage.getItem('userEmail'))
    i=this.blockedUsersListList.length;
    else if(i==this.blockedUsersListList.length-1){
        this.store.dispatch({type: BlockedUsersListActions.ADD_BLOCKED_USERS_LIST_API,
            payload: blockedUsersListObject});
    }
    return i;
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

  ngOnInit(): void {
    this.getHeaderFields();
    this.personForm.patchValue({
      mailName: this.chatParticipantService.chatWith
    });

    setInterval(() =>{
        if(localStorage.getItem("mainPage")=="true" && localStorage.getItem("refresh")=='true') {
            this.store.dispatch({type: BlockedUsersListActions.GET_BLOCKED_USERS_LIST_LIST});
            if(this.blockedUsersLists!=undefined && this.blockedUsersLists) {
                this.initBlockedInForm();
                //this.checkIfUserEmailFoundAndNotBlocked();
            }
        }
    },30000);

  }

  getHeaderFields() {
    this.headerFields = this.headers.map((data) => data.fieldName);
    this.headerFields.push("actions");
  }

  selectChatParticipant(chatParticipant: ChatParticipant, action: TableActions) {
    if(localStorage.getItem("mainPage")=="true"){
        if((this.isViewAction(action) && localStorage.getItem('userEmail')==chatParticipant.speaker) ||
        this.isDeleteAction(action)) this.chatParticipant.emit({chatParticipant, action});
        if(this.isViewAction(action)) localStorage.setItem('mainPage',"false");
    }
  }

  isViewAction(action: TableActions): boolean {
    return action==0;
  }

  isDeleteAction(action: TableActions): boolean {
    return action==1;
  }

  areViewActionAndDeleteActionVisible(chatParticipant: ChatParticipant):boolean {
    return localStorage.getItem('userEmail')==chatParticipant.speaker;
  }

  checkIfUserEmailFoundAndNotBlocked() {

      this.setBlockedUsersListObject();

      for(let i = 0; i < this.userEmails.length; i++) {
        //check if userEmail is registered and is not current logged user
        if(this.isUserEmailRegisteredAndNotCurrentUser(i)){
            if(this.isBlockedInFormMultiElements()){
                this.blockedUsersListObject.blockedUsersList=this.blockedForm.controls['blocked'].value.toString().split(",");
                for(let j = 0; j < this.blockedUsersListObject.blockedUsersList.length;j++) {
                    j=this.setUserEmailFoundAndNotBlocked(j);
                }
            }
            else {
                "use strict";
                this.blockedUsersListObject= Object.freeze({id: this.blockedUsersListObject.id, userEmail: this.blockedUsersListObject.userEmail,  blockedUsersList: this.blockedForm.controls['blocked'].value.toString() });
                this.blockedUsersListObject = { id: this.blockedUsersListObject.id, userEmail: this.blockedUsersListObject.userEmail, blockedUsersList: [this.blockedForm.controls['blocked'].value.toString()] }; // replacing it with a new object works
                //nie przyjmuje: this.blockedUsersListObject.blockedUsersList[0]=this.blockedForm.controls['blocked'].value.toString();
                this.setUserEmailFoundAndNotBlockedForSingleBlocked();
            }
        }
      }
  }

  setBlockedUsersListObject() {
    for(let j=0;j<this.blockedUsersLists.length;j++) {
        if(this.blockedUsersLists[j].userEmail==localStorage.getItem('userEmail')){
            "use strict";
            this.blockedUsersListObject= Object.freeze({id: this.blockedUsersLists[j].id, userEmail: this.blockedUsersLists[j].userEmail,  blockedUsersList: this.blockedUsersLists[j].blockedUsersList });
            this.blockedUsersListObject = { id: this.blockedUsersLists[j].id, userEmail: this.blockedUsersLists[j].userEmail, blockedUsersList: this.blockedUsersLists[j].blockedUsersList }; // replacing it with a new object works
            break;
        }
    }
  }

  isUserEmailRegisteredAndNotCurrentUser(i: number): boolean {
    return this.personForm.controls['mailName'].value == this.userEmails[i] &&
            this.personForm.controls['mailName'].value!=localStorage.getItem('userEmail');
  }

  isBlockedInFormMultiElements(): boolean {
    return this.blockedForm.controls['blocked'].value.toString().includes(',');
  }

  setUserEmailFoundAndNotBlocked(j: number): number {
    if(this.isUserToBeBlocked(j)) {
        this.isUserEmailFoundAndNotBlocked=false;
        this.chatParticipantService.isChatCreated=false;
        j=this.blockedUsersListObject.blockedUsersList.length;
    }
    else if(j==this.blockedUsersListObject.blockedUsersList.length-1 && !this.chatParticipantService.isChatCreated ){
        this.isUserEmailFoundAndNotBlocked=true;
    }
    return j;
  }

  isUserToBeBlocked(j:number): boolean {
    return this.blockedUsersListObject.blockedUsersList[j].toString()==this.personForm.controls['mailName'].value.toString();
  }

  setUserEmailFoundAndNotBlockedForSingleBlocked() {
    if(this.blockedUsersListObject.blockedUsersList.toString()==this.personForm.controls['mailName'].value.toString()) {
        this.isUserEmailFoundAndNotBlocked=false;
        this.chatParticipantService.isChatCreated=false;
    }
    else this.isUserEmailFoundAndNotBlocked=true;
  }

  createChat() {
    this.chatParticipantService.chatWith=this.personForm.controls['mailName'].value;
    this.chatParticipantService.isChatCreated=true;
    this.isUserEmailFoundAndNotBlocked=!this.isUserEmailFoundAndNotBlocked;
  }

  handleBlockedListInFormAndInDatabaseAndInNgrx(){

      this.setBlockedUsersListObject();
      if(this.isBlockedInFormMultiElements())
      this.blockedUsersListObject.blockedUsersList=this.blockedForm.controls['blocked'].value.toString().split(",");
      else {
              "use strict";
              this.blockedUsersListObject= Object.freeze({id: this.blockedUsersListObject.id, userEmail: this.blockedUsersListObject.userEmail,  blockedUsersList: this.blockedForm.controls['blocked'].value.toString() });
              this.blockedUsersListObject = { id: this.blockedUsersListObject.id, userEmail: this.blockedUsersListObject.userEmail, blockedUsersList: [this.blockedForm.controls['blocked'].value.toString()] }; // replacing it with a new object works
              //nie przyjmuje: this.blockedUsersListObject.blockedUsersList[0]=this.blockedForm.controls['blocked'].value.toString();
      }
      this.modifyBlockedUsersListInNgrx();
  }

  modifyBlockedUsersListInNgrx() {
    this.store.dispatch({type: BlockedUsersListActions.MODIFY_BLOCKED_USERS_LIST_API,
    payload: this.blockedUsersListObject});
    this.setValuesConnectedToModify();
  }

  setValuesConnectedToModify() {
    this.personForm.patchValue({
        mailName: ""
    });

    this.chatParticipantService.isChatCreated=false;
    this.isUserEmailFoundAndNotBlocked=false;
  }

  isHidden(): boolean {
    return this.chatParticipantService.isChatCreated!=true;
  }

  hideChat() {
    this.chatParticipantService.isChatCreated=false;
  }
}
