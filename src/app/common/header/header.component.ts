import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from 'src/app/shared/app.service';
import * as CryptoJS from 'crypto-js';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public displayLogin='none';
  public resp:any;
  public loggeduser:any;
  loginshow:boolean=true;
  classApplied = false;
  tk:any = {}; access; encryptInfo; role_name;
  classtoggle = false; f_nme; l_nme;

  @Input() userdetails = {email:'',pass_word:''};
  @Input() user = {user_id:''};

  constructor(public restApi: ApiService, public router: Router, public activatedroute:ActivatedRoute) {  }

  ngOnInit(): void {
    if(sessionStorage.getItem('user_token')){
      this.tk = jwt_decode(sessionStorage.getItem('user_token'));
      this.f_nme = this.tk.first_name.charAt(0); 
      this.l_nme = this.tk.last_name.charAt(0);
      console.log("Token Present");
      this.loggeduser = true;     
      this.role_name = this.tk.role_name;
    }else{
      console.log("Token not present");
      this.loggeduser = false;
    }
    this.encryptInfo = sessionStorage.getItem('access_token');
    if(this.encryptInfo){
      var deData= CryptoJS.AES.decrypt(decodeURIComponent(this.encryptInfo), 'secret key 123'); 
      this.access = JSON.parse(deData.toString(CryptoJS.enc.Utf8));
    }
  }

  userLogin(event:any){
    this.userdetails.email = (<HTMLInputElement>document.getElementById('email_id')).value;
    this.userdetails.pass_word = (<HTMLInputElement>document.getElementById('your_password')).value;
    
    this.restApi.postMethod('login',this.userdetails)
      .subscribe((data:{}) => {
        this.resp = data;
        if(this.resp.status == '201'){
          alert(this.resp.message);
        }else{
          //console.log('You have been logged in successfully.');
          this.restApi.setUserToken(this.resp);
          this.closeLoginModal();
          this.getAccessList();
          //window.location.href = 'http://localhost:51082/profile';
          //window.location.href = '/events';
        }
      });
  }

  forgotpwd(event:any){
     console.log(event)
  }

  logOut() {
    sessionStorage.clear();
    window.location.href= '/home';
  }

  openLoginModal(){
    this.displayLogin='block';
    document.getElementsByTagName('body')[0].classList.add('modal-open');
    document.getElementsByTagName('html')[0].classList.add('modal-open');
  }

  closeLoginModal() {
    this.displayLogin='none';
    document.getElementsByTagName('body')[0].classList.remove('modal-open');
    document.getElementsByTagName('html')[0].classList.add('modal-open');
  }
  fpwd(){
    this.loginshow = false;
  }

  toggleHeaderMenu(){
    this.classApplied = !this.classApplied;
  }

  getAccessList(){
    this.tk = jwt_decode(sessionStorage.getItem('user_token'));
    this.user.user_id = this.tk.user_id;
    this.restApi.postMethod('getAccessList',this.user).subscribe((resp:any) => {
      var encryptInfo = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(resp.data[0]), 'secret key 123').toString());
      this.restApi.setAccessToken(encryptInfo);
      window.location.href = '/calendar';
    })
  }

  navToggleClass() {
    this.classtoggle = !this.classtoggle;
  }
}
