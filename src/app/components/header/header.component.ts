import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  navCollapse() {
    document.getElementsByClassName('hamburger-menu')[0].classList.toggle("nav-menu-show");
    document.getElementsByClassName('hamburger--collapse')[0].classList.toggle("isactive");
    /*if(document.getElementById('hamburger-menu').style.visibility == 'hidden'){ }*/
    
  }
}
