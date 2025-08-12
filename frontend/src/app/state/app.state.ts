import { ChatParticipantState } from "../chat-participant/state/chat-participant.reducers";
import { AuthState } from "../auth/state/auth.reducers";

export interface AppState {
    chatParticipantState: ChatParticipantState,
    authState: AuthState
}