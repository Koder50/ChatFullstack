import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './core/interceptors/header.interceptor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {JwtModule} from '@auth0/angular-jwt';
import {MatSortModule} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MatIconModule,
    MatSortModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    JwtModule.forRoot({ // for JwtHelperService
      config: {
        tokenGetter
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
