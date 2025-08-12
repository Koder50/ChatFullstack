import { createAction, props } from '@ngrx/store';
import { BlockedUsersList } from 'src/app/blocked-users-list/models/blocked-users-list.interface';




export enum BlockedUsersListActions {
  GET_BLOCKED_USERS_LIST_LIST = '[Blocked-Users-List] Get Blocked-Users-List list',
  SET_BLOCKED_USERS_LIST_LIST = '[Blocked-Users-List] Set Blocked-Users-List list',
  ADD_BLOCKED_USERS_LIST_API = '[Blocked-Users-List] Add Blocked-Users-List (API)',
  ADD_BLOCKED_USERS_LIST_STATE = '[Blocked-Users-List] Add Blocked-Users-List (STATE)',
  MODIFY_BLOCKED_USERS_LIST_API = '[Blocked-Users-List] Modify Blocked-Users-List (API)',
  MODIFY_BLOCKED_USERS_LIST_STATE = '[Blocked-Users-List] Modify Blocked-Users-List (STATE)',
  REMOVE_BLOCKED_USERS_LIST_API = '[Blocked-Users-List] Remove Blocked-Users-List (API)',
  REMOVE_BLOCKED_USERS_LIST_STATE = '[Blocked-Users-List] Remove Blocked-Users-List (STATE)',
  REMOVE_ALL_BLOCKED_USERS_LIST_API = '[Blocked-Users-List] Remove All Blocked-Users-List (API)',
  REMOVE_ALL_BLOCKED_USERS_LIST_STATE = '[Blocked-Users-List] Remove ALL Blocked-Users-List (STATE)',
}

export const getBlockedUsersListList = createAction(
  BlockedUsersListActions.GET_BLOCKED_USERS_LIST_LIST,
);

export const setBlockedUsersListList = createAction(
BlockedUsersListActions.SET_BLOCKED_USERS_LIST_LIST,
props<{ blockedUsersLists: Array<BlockedUsersList> }>(),
);

 
export const addBlockedUsersListState = createAction(
  BlockedUsersListActions.ADD_BLOCKED_USERS_LIST_STATE,
  props<{ blockedUsersList: BlockedUsersList }>()
);

export const modifyBlockedUsersListState = createAction(
    BlockedUsersListActions.MODIFY_BLOCKED_USERS_LIST_STATE,
    props<{ blockedUsersList: BlockedUsersList }>()
);
 
export const removeBlockedUsersListState = createAction(
    BlockedUsersListActions.REMOVE_BLOCKED_USERS_LIST_STATE,
  props<{ blockedUsersListId: string }>()
);

export const removeAllBlockedUsersListState = createAction(
  BlockedUsersListActions.REMOVE_ALL_BLOCKED_USERS_LIST_STATE
);