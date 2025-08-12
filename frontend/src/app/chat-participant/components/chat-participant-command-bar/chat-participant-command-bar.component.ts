import { Component, EventEmitter, Output } from '@angular/core';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';
import { ChatParticipantService } from '../../services/chat-participant.service';
import { ChatParticipant } from '../../models/chat-participant.interface';
import { User } from '../../../auth/models/user.interface';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-chat-participant-command-bar',
  templateUrl: './chat-participant-command-bar.component.html',
  styleUrls: ['./chat-participant-command-bar.component.scss']
})
export class ChatParticipantCommandBarComponent {
  @Output() action = new EventEmitter<CommandBarActions>()
  chatParticipantService: ChatParticipantService;
  constructor(chatParticipantService: ChatParticipantService) {
    this.chatParticipantService=chatParticipantService;
  }

  emitAction(action: CommandBarActions) {
    if(this.isActionCreate(action)) localStorage.setItem('mainPage',"false");
    else if(this.isActionLogOut(action)) {
        this.chatParticipantService.chatWith="";
    }
    this.action.emit(action);
  }

  isActionCreate(action: CommandBarActions): boolean{
    return action==0;
  }

  isActionLogOut(action: CommandBarActions): boolean{
    return action==2;
  }

  isRefreshSameAsInput(input:string): boolean {
      return localStorage.getItem('refresh')==input;
  }

  isNotCurrentUserSuperuser(): boolean{
    return localStorage.getItem('userEmail')!='superuser@mail.com';
  }

}
