import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/app.service';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import jwt_decode from "jwt-decode";
//import { User} from '../user.interface'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public encryptInfo : any;
  public userrole:any;
  display='none';
  userlist :any = [];
  tk:any = {};
  status; edit; srs_name = ''; role_nme; srslist:any = [];

  @Input() userdetails = {url:'',email:''}
  @Input() disableuser = {modified_by_user_id:'',userid:'',status:''}
  @Input() updateuser = {first_name:'',srs_id:null,last_name:'',email_id:'',role:'',mentor_email_id:'',user_id:'',modified_by:''}
  @Input() access = {user_id:'',blog_approve_access:'',blog_change_status_access:'',blog_access:'',calendar_add_access:'',calendar_access:'',attendance_access:'',event_access:'',user_access:'',sns_access:''}
  @Input() user = {user_id:''}

  constructor(public restApi: ApiService, public router: Router) { }

  ngOnInit(): void {
    this.fetchSRSlist();
    this.fetchRole();
    this.tk = jwt_decode(sessionStorage.getItem('user_token'));
    this.role_nme = this.tk.role_name;
   
  }

  changeStatus(event,id){
    (event.target.checked) ? this.status = "Enable" : this.status = "Disable";
    this.disableuser.modified_by_user_id = this.tk.user_id;
    this.disableuser.userid = id;
    this.disableuser.status = this.status;

    this.restApi.postMethod('changeUserStatus',this.disableuser).subscribe((data:any) => {
      this.fetchUser();
      alert("The status of the user has been changed successfully");
    })
  }
 
  addUserDetails:any={};
  data;

  addUser(event:any){
    var obj = {
      "first_name":(<HTMLInputElement>document.getElementById('mentee_first_name')).value,
      "last_name":(<HTMLInputElement>document.getElementById('mentee_last_name')).value,
      "email_id":(<HTMLInputElement>document.getElementById('mentee_email_id')).value,
      "mentor_email_id": this.tk.email,
      "srs_id": this.tk.srs_id,
      "role_id": (<HTMLInputElement>document.getElementById('mentee_user_type')).value,
      "parent_id":this.tk.user_id
    }
    //console.log("i am obj"+JSON.stringify(obj))

   // this.addUserDetails.push(obj)
    

    // this.addUserDetails['first_name'] = obj.first_name;
    // this.addUserDetails['last_name'] = obj.first_name;
    // this.addUserDetails['email_id'] = obj.email_id;
    // this.addUserDetails['mentor_email_id'] = obj.mentor_email_id;
    // this.addUserDetails['srs_id'] = obj.srs_id;
    // this.addUserDetails['role_id'] = obj.role_id;
    // this.addUserDetails['parent_id'] = obj.parent_id;

    console.log("this.addUserDetails================"+this.addUserDetails)

    

    if(this.role_nme == 'Admin'){
      obj.srs_id = this.srs_name;
    }else{
      obj.srs_id = this.tk.srs_id;
    }
    
    this.encryptInfo = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(obj), 'secret key 123').toString());

    this.userdetails.url = this.encryptInfo;
    this.userdetails.email = (<HTMLInputElement>document.getElementById('mentee_email_id')).value;
    this.restApi.postMethod('sendUserLink',this.userdetails).subscribe((data:any) => {
      //this.router.navigate(['register/' + this.encryptInfo]);
      this.display = 'none';
      alert('Mail has been sent to the Mentee');
    });
  }

  fetchRole() {
    this.restApi.getMethod('getRole').subscribe((resp) => {
      this.userrole = resp;//resp.data;
      this.fetchUser();
    });
  }

  fetchSRSlist() {
    this.restApi.getMethod('getBranches/adduser')
      .subscribe((resp:any) => {
        this.srslist = resp.data;
      });
  }

  fetchUser() {
    this.restApi.getMethod('getUsers/all')
      .subscribe((resp) => {
        this.userlist = resp;//resp.data;
        this.tk = jwt_decode(sessionStorage.getItem('user_token'));
        console.log(this.tk.email);
      });
  }

  openModal(){
    this.edit = false;
    this.display='block';
    document.getElementsByTagName('body')[0].classList.add('modal-open');
    (<HTMLInputElement>document.getElementById('mentee_user_type')).value = '10';
    (<HTMLInputElement>document.getElementById('mentee_user_type')).setAttribute("disabled", 'disabled');
  }

  closeModal() {
    this.display='none';
    document.getElementsByTagName('body')[0].classList.remove('modal-open');
  }

  editUser(id:any){
    this.edit = true;
    this.restApi.getMethod('getUsers/'+id)
      .subscribe((resp:any) => {
        (<HTMLInputElement>document.getElementById('mentee_first_name')).value = resp.data[0].user_first_name;
        (<HTMLInputElement>document.getElementById('mentee_last_name')).value = resp.data[0].user_last_name;
        (<HTMLInputElement>document.getElementById('mentee_email_id')).value = resp.data[0].user_email_id;
        (<HTMLInputElement>document.getElementById('mentee_user_type')).value = resp.data[0].role_id;
        (<HTMLInputElement>document.getElementById('mentor_email_id')).value = resp.data[0].mentor_email_id;
        if(this.role_nme == 'Admin'){
          (resp.data[0].srs_id) ? this.srs_name = resp.data[0].srs_id : this.srs_name = '';
          (<HTMLInputElement>document.getElementById('mentee_user_type')).removeAttribute("disabled");
        }
        (<HTMLInputElement>document.getElementById('hidden_id')).value = id;
        this.display='block';
        document.getElementsByTagName('body')[0].classList.add('modal-open');
      });
  }

  updateUser(event:any){
    this.updateuser.first_name = (<HTMLInputElement>document.getElementById('mentee_first_name')).value;
    this.updateuser.last_name = (<HTMLInputElement>document.getElementById('mentee_last_name')).value;
    this.updateuser.email_id = (<HTMLInputElement>document.getElementById('mentee_email_id')).value;
    this.updateuser.role = (<HTMLInputElement>document.getElementById('mentee_user_type')).value;
    this.updateuser.mentor_email_id = (<HTMLInputElement>document.getElementById('mentor_email_id')).value;
    this.updateuser.user_id = (<HTMLInputElement>document.getElementById('hidden_id')).value;
    this.updateuser.modified_by = this.tk.user_id;
    
    if(this.role_nme == 'Admin'){
      this.updateuser.srs_id = this.srs_name;;
    }else{
      this.updateuser.srs_id = this.tk.role_id;
    }

    this.restApi.postMethod('updateUser',this.updateuser)
      .subscribe((data:{}) => {
        this.closeModal();
        this.fetchUser();
        alert('User updated Successfully');
      });
  }

  toggleAccess(id:any){
    this.user.user_id = id;
    this.restApi.postMethod('getAccessList',this.user).subscribe((resp:any) => {
      this.access = resp.data[0];
      var classlen = document.getElementsByClassName('table-hidden-row');
      for(let i=0;i<classlen.length;i++){
        (document.getElementsByClassName("table-hidden-row")[i] as HTMLElement).style.display = 'none'
      }
      document.getElementById('row'+id).style.display = 'contents';
    })   
  }

  assignAccess(id){
    var checkboxes = document.getElementsByClassName(' chk_'+id);
    for (var i=0; i<checkboxes.length; i++) {
      if ((checkboxes[i] as HTMLInputElement).checked) {
        this.access[checkboxes[i].getAttribute('id')] = 1;
      }else{
        this.access[checkboxes[i].getAttribute('id')] = 0;
      }
    }
    this.access.user_id = id;
    this.restApi.postMethod('updateAccess',this.access)
      .subscribe((resp:any) => {
        alert('Access assigned successfully');
      });
  }
}

