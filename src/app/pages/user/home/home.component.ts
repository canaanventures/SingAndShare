import { Component, OnInit } from '@angular/core';
import { UserComponent } from 'src/app/modules/user/user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

  export class HomeComponent extends UserComponent implements OnInit {

  constructor() {
    super()
   }

  ngOnInit(): void {
  }

}
