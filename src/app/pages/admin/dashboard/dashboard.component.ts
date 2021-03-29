import { Component, OnInit } from '@angular/core';
import { AdminComponent } from 'src/app/modules/admin/admin.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends AdminComponent implements OnInit {

  constructor() { super() }

  ngOnInit(): void {
  }

}
