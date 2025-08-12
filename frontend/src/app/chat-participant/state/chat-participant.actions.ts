import { createAction, props } from '@ngrx/store';
import { ChatParticipant } from '../models/chat-participant.interface';




export enum ChatParticipantActions {
  GET_CHAT_PARTICIPANT_LIST = '[Chat-Participant] Get Chat-Participant list',
  SET_CHAT_PARTICIPANT_LIST = '[Chat-Participant] Set Chat-Participant list',
  ADD_CHAT_PARTICIPANT_API = '[Chat-Participant] Add Chat-Participant (API)',
  ADD_CHAT_PARTICIPANT_STATE = '[Chat-Participant] Add Chat-Participant (STATE)',
  MODIFY_CHAT_PARTICIPANT_API = '[Chat-Participant] Modify Chat-Participant (API)',
  MODIFY_CHAT_PARTICIPANT_STATE = '[Chat-Participant] Modify Chat-Participant (STATE)',
  REMOVE_CHAT_PARTICIPANT_API = '[Chat-Participant] Remove Chat-Participant (API)',
  REMOVE_CHAT_PARTICIPANT_STATE = '[Chat-Participant] Remove Chat-Participant (STATE)',
  REMOVE_ALL_CHAT_PARTICIPANT_API = '[Chat-Participant] Remove All Chat-Participant (API)',
  REMOVE_ALL_CHAT_PARTICIPANT_STATE = '[Chat-Participant] Remove ALL Chat-Participant (STATE)',
}

export const getChatParticipantList = createAction(
  ChatParticipantActions.GET_CHAT_PARTICIPANT_LIST,
);

export const setChatParticipantList = createAction(
ChatParticipantActions.SET_CHAT_PARTICIPANT_LIST,
props<{ chatParticipants: Array<ChatParticipant> }>(),
);

 
export const addChatParticipantState = createAction(
  ChatParticipantActions.ADD_CHAT_PARTICIPANT_STATE,
  props<{ chatParticipant: ChatParticipant }>()
);

export const modifyChatParticipantState = createAction(
    ChatParticipantActions.MODIFY_CHAT_PARTICIPANT_STATE,
    props<{ chatParticipant: ChatParticipant }>()
);
 
export const removeChatParticipantState = createAction(
    ChatParticipantActions.REMOVE_CHAT_PARTICIPANT_STATE,
  props<{ chatParticipantId: string }>()
);

export const removeAllChatParticipantState = createAction(
  ChatParticipantActions.REMOVE_ALL_CHAT_PARTICIPANT_STATE
);