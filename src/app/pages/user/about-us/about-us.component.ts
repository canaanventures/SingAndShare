import { Component, OnInit } from '@angular/core';
import { UserComponent } from 'src/app/modules/user/user.component';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent extends UserComponent implements OnInit {

  constructor() {
    super()
   }

  ngOnInit(): void {
  }

}
