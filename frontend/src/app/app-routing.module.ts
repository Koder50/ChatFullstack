import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
    import("./auth/auth.module").then((m) => m.AuthModule),

  },
  {
    path: "chat-participants",
    loadChildren: () =>
      import("./chat-participant/chat-participant.module").then((m) => m.ChatParticipantModule),
      canActivate: [AuthGuard]
  },
  {
      path: "blocked-users-lists",
      loadChildren: () =>
        import("./chat-participant/chat-participant.module").then((m) => m.ChatParticipantModule),
        canActivate: [AuthGuard]
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
