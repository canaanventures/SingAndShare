import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isVisible = 'block';
  constructor() { }

  ngOnInit(): void { }

  navCollapse() {
    document.getElementsByClassName('hamburger-menu')[0].classList.toggle("nav-menu-show");
    document.getElementsByClassName('hamburger--collapse')[0].classList.toggle("isactive");    
  }

  navClick(e){
    const div =  document.getElementsByClassName('nav-option');
    for(var i=0;i<div.length;i++){
      div[i].classList.remove('nav-active');
    }
    document.getElementById(e).classList.add('nav-active');
    /* if(param == 'login' || param == 'register'){
      document.getElementsByTagName('body')[0].classList.add('body-bg-img');
    }else{
      document.getElementsByTagName('body')[0].classList.remove('body-bg-img');
    } */
  }
}
