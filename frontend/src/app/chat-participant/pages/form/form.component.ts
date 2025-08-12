import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { ChatParticipant } from '../../models/chat-participant.interface';
import { ChatParticipantActions } from '../../state/chat-participant.actions';
import { selectChatParticipant } from '../../state/chat-participant.selectors';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  chatParticipant$: Observable<ChatParticipant | undefined>;
  chatParticipant: ChatParticipant | null = null;
  constructor(private router: ActivatedRoute, private store: Store<AppState>) {
    const id = this.router.snapshot.params['id'];
    this.chatParticipant$ = this.store.select(selectChatParticipant(id));
    this.chatParticipant$.subscribe(d => {
      if(d && this.chatParticipant==null) this.chatParticipant=d;
      else if(d && this.chatParticipant!=null && d.speaker==localStorage.getItem('userEmail'))  this.chatParticipant.talkContent = d.talkContent;
    });
  
   }

  ngOnInit(): void {

  }

  formAction(data: {value: ChatParticipant, action: string}) {
    switch(data.action) {
      case "Create" : {
        this.store.dispatch({type: ChatParticipantActions.ADD_CHAT_PARTICIPANT_API, payload: data.value});
        return;
      }
      case "Update" : {
        this.store.dispatch({type: ChatParticipantActions.MODIFY_CHAT_PARTICIPANT_API, payload: data.value});
        return;
      }
      default: ""
    }
  }

}
