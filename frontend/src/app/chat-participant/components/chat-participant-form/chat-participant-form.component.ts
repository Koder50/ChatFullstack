import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ChatParticipant } from '../../models/chat-participant.interface';
import { ChatParticipantService } from '../../services/chat-participant.service';

@Component({
  selector: 'app-chat-participant-form',
  templateUrl: './chat-participant-form.component.html',
  styleUrls: ['./chat-participant-form.component.scss']
})
export class ChatParticipantFormComponent implements OnInit {
  @Input() selectedChatParticipant: ChatParticipant | null = null;
  /*@Input()*/ actionButtonLabel: string = 'Create';
  @Output() action = new EventEmitter();
  form: FormGroup;
  tempDateTime=new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(),new Date().getUTCDate(), new Date().getUTCHours(),new Date().getUTCMinutes(), new Date().getUTCSeconds())).toISOString();
  tempDateTime2=this.tempDateTime.replace("T"," ");
  tempDateTime3=this.tempDateTime2.slice(0, 19);
  tempDateTime4=this.tempDateTime3+" UTC";

  chatParticipantService: ChatParticipantService;

  constructor(private fb: FormBuilder,
      chatParticipantService: ChatParticipantService
  ) {
    this.chatParticipantService=chatParticipantService;

    this.form = this.fb.group({
      id: [''],
      speaker: [{ value: localStorage.getItem('userEmail'), disabled: true}],
      talkContent: [''],
      createdAt:[{ value: this.tempDateTime4, disabled: true}],
      chatWith: [{}]
    })

   }

  ngOnInit(): void {
    this.setCreatedAtFieldForCreateActionWithCurrentDateTime();
    localStorage.setItem('createdAt',this.form.value.createdAt);
    this.checkAction();
  }

  setCreatedAtFieldForCreateActionWithCurrentDateTime(){
    this.form.value.createdAt=this.tempDateTime4;  //for initialization with not undefined
  }

  checkAction() {
    if(this.selectedChatParticipant) { //for update
      this.actionButtonLabel = "Update";
      this.patchDataValues();
    }
    else if(!(this.selectedChatParticipant)){ //for create
      this.handleFormChatWith();
    }
  }

  handleFormChatWith() {
    this.form.patchValue({
        chatWith: this.chatParticipantService.chatWith
    });
    this.form.controls['chatWith'].disable();
  }

  patchDataValues () {
     if(this.selectedChatParticipant){  //for update
        this.form.patchValue(this.selectedChatParticipant);
        this.form.controls['chatWith'].disable();
     }
    //for update
     if(this.selectedChatParticipant!=null && this.selectedChatParticipant.createdAt!=undefined)
     localStorage.setItem('createdAt',this.selectedChatParticipant.createdAt);
  }

  emitAction() {
    this.form.value.speaker=localStorage.getItem('userEmail');
    this.form.value.createdAt=localStorage.getItem('createdAt');
    if(this.actionButtonLabel == "Update")
        this.form.value.chatWith=this.selectedChatParticipant?.chatWith;
    else if(this.actionButtonLabel == "Create")
    this.form.value.chatWith=this.chatParticipantService.chatWith;

    this.chatParticipantService.chatWith=this.form.value.chatWith;
    localStorage.removeItem('createdAt');
    this.action.emit({value: this.form.value, action: this.actionButtonLabel})
  }

  clear() {
     this.form.controls['talkContent'].setValue('');
  }

}
