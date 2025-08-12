import { createReducer, on } from '@ngrx/store';
import { BlockedUsersList } from '../models/blocked-users-list.interface';
import { addBlockedUsersListState, modifyBlockedUsersListState, removeAllBlockedUsersListState, removeBlockedUsersListState, setBlockedUsersListList } from './blocked-users-list.actions';

export interface BlockedUsersListState {
    blockedUsersLists: Array<BlockedUsersList>;
}

export const initialState: BlockedUsersListState = {
    blockedUsersLists: []
}

export const blockedUsersListReducer = createReducer(
  initialState,
  on(setBlockedUsersListList, (state, { blockedUsersLists }) => { return {...state, blockedUsersLists}}),
  on(removeBlockedUsersListState, (state, { blockedUsersListId }) => {
    return {...state, blockedUsersLists: state.blockedUsersLists.filter(data => data.id != blockedUsersListId)}
  }),
  on(addBlockedUsersListState, (state, {blockedUsersList}) => {
    return {...state, blockedUsersLists: [...state.blockedUsersLists, blockedUsersList]}
  }),
  on(modifyBlockedUsersListState, (state, {blockedUsersList}) => {
    return {...state, blockedUsersLists: state.blockedUsersLists.map(data => data.id === blockedUsersList.id ? blockedUsersList : data)}
  }),
  on(removeAllBlockedUsersListState, (state) => {
    return {...state, blockedUsersLists: []}
  }),
  );
