import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatParticipantCommandBarComponent } from './components/chat-participant-command-bar/chat-participant-command-bar.component';
import { ChatParticipantListComponent } from './components/chat-participant-list/chat-participant-list.component';
import { ChatParticipantFormComponent } from './components/chat-participant-form/chat-participant-form.component';
import { ChatParticipantRoutingModule } from './chat-participant-routing.module';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { chatParticipantReducer } from './state/chat-participant.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ChatParticipantEffects } from './state/chat-participant.effects';
import { HttpClientModule } from '@angular/common/http';
import {MatSortModule} from '@angular/material/sort';
import { blockedUsersListReducer } from 'src/app/blocked-users-list/state/blocked-users-list.reducers';
import { BlockedUsersListEffects } from "src/app/blocked-users-list/state/blocked-users-list.effects";

@NgModule({
  declarations: [
    ChatParticipantListComponent,
    ChatParticipantFormComponent,
    ChatParticipantCommandBarComponent,
    ListComponent,
    FormComponent,
  ],
  imports: [
    MatSortModule,
    CommonModule,
    ChatParticipantRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forFeature('chatParticipantState', chatParticipantReducer),
    EffectsModule.forFeature([ChatParticipantEffects]),
    StoreModule.forFeature('blockedUsersListState', blockedUsersListReducer),
    EffectsModule.forFeature([BlockedUsersListEffects])
  ]
})
export class ChatParticipantModule { }
