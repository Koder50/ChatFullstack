import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { ChatParticipant } from '../models/chat-participant.interface';
import { ChatParticipantState } from './chat-participant.reducers';


export const selectChatParticipantState = createFeatureSelector<ChatParticipantState>('chatParticipantState')

export const selectChatParticipants = () => createSelector(
    selectChatParticipantState,
    (state: ChatParticipantState) => state.chatParticipants
)
export const selectChatParticipant = (id: string) => createSelector(
    selectChatParticipantState,
    (state: ChatParticipantState) => state.chatParticipants.find(d => d.id === id)
)