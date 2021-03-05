import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from "ngx-toastr";

/* [ Shared Module ] */
import { AppSharedModule } from '../../shared/app.shared.module';
import { CONST } from '../../shared/app.constant';
import { UserComponent } from './user.component';
import { LoginComponent } from 'src/app/pages/user/login/login.component';
import { RegisterComponent } from 'src/app/pages/user/register/register.component';
import { HomeComponent } from 'src/app/pages/user/home/home.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  data: {
    title: 'user'
  },
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home'
    },    
    {
      path: CONST.PATH.USER.LOGIN.SELF,
      component: LoginComponent,
      data: {
        title: CONST.PATH.USER.LOGIN.TITLE
      }
    },    
    {
      path: CONST.PATH.USER.REGISTER.SELF,
      component: RegisterComponent,
      data: {
        title: CONST.PATH.USER.REGISTER.TITLE
      }
    },
    {
      path: CONST.PATH.USER.HOME.SELF,
      component: HomeComponent,
      data: {
        title: CONST.PATH.USER.HOME.TITLE
      }
    },
  ]
}];

@NgModule({
  declarations: [
    UserComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppSharedModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot()
  ],
  providers: [],
})
export class UserModule { }
