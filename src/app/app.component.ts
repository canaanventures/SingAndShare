import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {
  ActivatedRoute, Router, NavigationEnd
} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
/* [ Spinner ] */
import { NgxSpinnerService } from 'ngx-spinner';
/* [ App Service ] */
import { ApiService } from './shared/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public ApiService: ApiService,
    public location: Location,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService
  ) {
  }

  ngInit(){ 
  }

  onActivate(event) {
    window.scroll(0, 0);

    if(window.location.href.indexOf('login') > 0 || window.location.href.indexOf('register') > 0){
      document.getElementsByTagName('body')[0].classList.add('body-bg-img');
    }else{
      document.getElementsByTagName('body')[0].classList.remove('body-bg-img');
    }
  }
  
}
