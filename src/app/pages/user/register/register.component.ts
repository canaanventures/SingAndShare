import { Component, OnInit } from '@angular/core';
import { UserComponent } from 'src/app/modules/user/user.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends UserComponent implements OnInit {

  constructor() {
    super()
   }

  ngOnInit(): void {
  }

}
