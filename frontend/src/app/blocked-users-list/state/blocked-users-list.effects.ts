import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, forkJoin } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { BlockedUsersList } from '../models/blocked-users-list.interface';
import { BlockedUsersListService } from 'src/app/blocked-users-list/services/blocked-users-list.service';
import { BlockedUsersListActions } from 'src/app/blocked-users-list/state/blocked-users-list.actions';
import { delay } from "rxjs/operators";

 
@Injectable()
export class BlockedUsersListEffects {

  // get list of chat participants in the external API
  // set retrieved chat participant list in the state
  getBlockedUsersLists$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(BlockedUsersListActions.GET_BLOCKED_USERS_LIST_LIST),
        mergeMap(() => this.blockedUsersListService.getBlockedUsersLists()
          .pipe(
            map(blockedUsersLists => ({ type: BlockedUsersListActions.SET_BLOCKED_USERS_LIST_LIST, blockedUsersLists})),
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true}
  );
  
  // add chat-participants in the database
  addBlockedUsersList$ = createEffect(() =>{
    return this.actions$.pipe(
        ofType(BlockedUsersListActions.ADD_BLOCKED_USERS_LIST_API),
        mergeMap((data: {type: string, payload: BlockedUsersList}) => this.blockedUsersListService.addBlockedUsersList(data.payload)
          .pipe(
            map(blockedUsersLists => ({ type: BlockedUsersListActions.ADD_BLOCKED_USERS_LIST_STATE, blockedUsersList: data.payload })),
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true})

   modifyBlockedUsersList$ = createEffect(() =>{
    return this.actions$.pipe(
        ofType(BlockedUsersListActions.MODIFY_BLOCKED_USERS_LIST_API),
        mergeMap((data: {type: string, payload: BlockedUsersList}) => this.blockedUsersListService.updateBlockedUsersList(data.payload)
          .pipe(
            map(blockedUsersLists => ({ type: BlockedUsersListActions.MODIFY_BLOCKED_USERS_LIST_STATE, blockedUsersList: data.payload })),
            tap(() => this.router.navigate(["blocked-users-lists"])),
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true})

  // remove chat-participants in the database
  removeBlockedUsersList$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(BlockedUsersListActions.REMOVE_BLOCKED_USERS_LIST_API),
        mergeMap((data: { payload: string}) => this.blockedUsersListService.deleteBlockedUsersList(data.payload)
          .pipe(
            map(() => ({ type: BlockedUsersListActions.REMOVE_BLOCKED_USERS_LIST_STATE, blockedUsersListId: data.payload })),
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true}
  );
  // remove all chat-participants in the database
  removeAllBlockedUsersList$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(BlockedUsersListActions.REMOVE_ALL_BLOCKED_USERS_LIST_API),
        mergeMap((data: {type: string, payload: string[]}) => 
        forkJoin([...data.payload.map((id) => this.blockedUsersListService.deleteBlockedUsersList(id))])
          .pipe(
            map(() => ({ type: BlockedUsersListActions.REMOVE_ALL_BLOCKED_USERS_LIST_STATE })),
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true}
  );
 
  constructor(
    private actions$: Actions,
    private router: Router,
    private blockedUsersListService: BlockedUsersListService
  ) {}
}