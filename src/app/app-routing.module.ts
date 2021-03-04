import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CONST } from './shared/app.constant';


const routes: Routes = [
  {
    path: CONST.PATH.USER.SELF,
    loadChildren: () => import('./modules/user/user.module').then(mod => mod.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
