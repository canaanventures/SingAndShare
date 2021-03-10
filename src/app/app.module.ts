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
import { RouterModule,Router, NavigationEnd } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { ToastrModule } from 'ngx-toastr';
import { AboutUsComponent } from './pages/user/about-us/about-us.component';
import { MinisteriesComponent } from './pages/user/ministeries/ministeries.component';
import { EventsComponent } from './pages/user/events/events.component';
import { MediaComponent } from './pages/user/media/media.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    MinisteriesComponent,
    EventsComponent,
    MediaComponent
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