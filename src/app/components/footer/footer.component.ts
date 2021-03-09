import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isVisible = 'none';
  constructor() { }

  ngOnInit(): void {
    if(window.location.href.indexOf('login') > 0 || window.location.href.indexOf('register') > 0){
      this.isVisible = 'none';
    }else{
      this.isVisible = 'block';
    }
  }

}
