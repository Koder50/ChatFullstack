import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { BlockedUsersList } from '../models/blocked-users-list.interface';
import { BlockedUsersListState } from './blocked-users-list.reducers';


export const selectBlockedUsersListState = createFeatureSelector<BlockedUsersListState>('blockedUsersListState')

export const selectBlockedUsersLists = () => createSelector(
    selectBlockedUsersListState,
    (state: BlockedUsersListState) => state.blockedUsersLists
)
export const selectBlockedUsersList = (id: string) => createSelector(
    selectBlockedUsersListState,
    (state: BlockedUsersListState) => state.blockedUsersLists.find(d => d.id === id)
)