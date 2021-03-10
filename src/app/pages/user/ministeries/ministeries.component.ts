import { Component, OnInit } from '@angular/core';
import { UserComponent } from 'src/app/modules/user/user.component';

@Component({
  selector: 'app-ministeries',
  templateUrl: './ministeries.component.html',
  styleUrls: ['./ministeries.component.scss']
})
export class MinisteriesComponent extends UserComponent implements OnInit {

  constructor() { 
    super ()
  }

  ngOnInit(): void {
  }

}
