import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from '../../../shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminComponent } from 'src/app/modules/admin/admin.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends AdminComponent implements OnInit {

  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    ApiService: ApiService,
    location: Location,
    spinner: NgxSpinnerService,
    toastr: ToastrService
  ) { 
    super(
      activatedRoute,
      router,
      ApiService,
      location,
      spinner,
      toastr
    ) 
  }

  ngOnInit(): void {
  }

}
