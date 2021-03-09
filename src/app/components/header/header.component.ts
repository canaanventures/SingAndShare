import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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
