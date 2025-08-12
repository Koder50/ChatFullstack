import { createReducer, on } from '@ngrx/store';
import { ChatParticipant } from '../models/chat-participant.interface';
import { addChatParticipantState, modifyChatParticipantState, removeAllChatParticipantState, removeChatParticipantState, setChatParticipantList } from './chat-participant.actions';

export interface ChatParticipantState {
    chatParticipants: Array<ChatParticipant>;
}

export const initialState: ChatParticipantState = {
    chatParticipants: []
}

export const chatParticipantReducer = createReducer(
  initialState,
  on(setChatParticipantList, (state, { chatParticipants }) => {
  return {...state, chatParticipants}}),  //it sets state in store(see REDUX extension in chrome)
  on(removeChatParticipantState, (state, { chatParticipantId }) => {
    return {...state, chatParticipants: state.chatParticipants.filter(data => data.id != chatParticipantId)}
  }),
  on(addChatParticipantState, (state, {chatParticipant}) => {
    return {...state, chatParticipants: [...state.chatParticipants, chatParticipant]}
  }),
  on(modifyChatParticipantState, (state, {chatParticipant}) => {
    return {...state, chatParticipants: state.chatParticipants.map(data => data.id === chatParticipant.id ? chatParticipant : data)}
  }),
  on(removeAllChatParticipantState, (state) => {
    return {...state, chatParticipants: []}
  }),
);
