import { Component, OnInit } from '@angular/core';
import { UserComponent } from 'src/app/modules/user/user.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent extends UserComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

}
