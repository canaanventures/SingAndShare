import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* [ Spinner ] */
import { NgxSpinnerModule } from 'ngx-spinner';
/* [ Token Interceptor ] */
import { AuthInterceptor } from './shared/auth-interceptor';
import { ResponseInterceptor } from './shared/response-interceptor';
/* [ Service ] */
import { ApiService } from './shared/app.service';
/* [ Shared Module ] */
import { AppSharedModule } from './shared/app.shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppSharedModule,
    NgxSpinnerModule,
    NgbModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDczAU1BweU20BUmXSRAauUHB7WAU3A9ms'
    }),
    ToastrModule.forRoot()
  ],
  providers: [
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }