import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from "ngx-toastr";

/* [ Shared Module ] */
import { AppSharedModule } from '../../shared/app.shared.module';
import { CONST } from '../../shared/app.constant';
import { AdminComponent } from './admin.component';

import {DashboardComponent} from 'src/app/pages/admin/dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  data: {
    title: 'admin'
  },
  children: [   
    {
      path: CONST.PATH.ADMIN.DASHBOARD.SELF,
      component: DashboardComponent,
      data: {
        title: CONST.PATH.ADMIN.DASHBOARD.TITLE
      }
    },
  ]
}];

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent
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
export class AdminModule { }
