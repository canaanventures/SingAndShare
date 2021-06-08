import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/app.service';
import jwt_decode from "jwt-decode";
import { identifierModuleUrl } from '@angular/compiler';
import { fakeAsync } from '@angular/core/testing';

@Component({
  selector: 'app-pcs',
  templateUrl: './pcs.component.html',
  styleUrls: ['./pcs.component.css']
})
export class PcsComponent implements OnInit {
  tk:any = {}; checklist:any = []; viewdata:any; displayform ='block'; displayDtls = 'none'; edit=false;

  @Input() pcs = {pcs_id:'',name_of_user:'',relation_with_user:'',city:'',state:'',current_status:'',user_id:'',status:'',pcs_description:''}

  constructor(public restApi: ApiService) { }

  ngOnInit(): void {
    this.tk = jwt_decode(sessionStorage.getItem('user_token'));
    this.getPCS('all','load');
  }

  addPCS(){
    this.pcs.user_id = this.tk.user_id;
    this.pcs.status = 'Y';
    this.restApi.postMethod('addPCS',this.pcs).subscribe((resp:any) => {
      this.getPCS('all','add');
      this.resetForm();
      alert(resp.message);
    })
  }

  getPCS(type,mode){
    this.restApi.getMethod('getPCS/'+this.tk.user_id+'/'+type).subscribe((resp:any) => {
      if(type == 'all' && mode != 'view'){
        this.checklist = resp.data;
      }else if(mode == 'view'){
        this.displayform = 'none';
        this.displayDtls = 'block';
        this.viewdata = resp.data[0];
      }else{
        this.pcs = resp.data[0];
        this.edit = true;
      }
    })
  }

  backToList(){
    this.displayDtls = 'none';
    this.displayform = 'block';
  }

  ChangePCSStatus(event,id){
    (event.target.checked) ? this.pcs.status = "Y" : this.pcs.status = "N";
    this.pcs.pcs_id = id;
    this.restApi.postMethod('changeStatusOfPCS',this.pcs).subscribe((resp:any) => {
      this.getPCS('all','status');
      alert(resp.message);
    })
  }

  resetForm(){
    this.pcs = {pcs_id:'',name_of_user:'',relation_with_user:'',city:'',state:'',current_status:'',user_id:'',status:'',pcs_description:''}
  }

  upDatePCS(){
    this.pcs.pcs_id = this.pcs.pcs_id;
    this.restApi.postMethod('upDatePCS',this.pcs).subscribe((resp:any) => {
      this.getPCS('all','update');
      this.resetForm();
      this.edit = false;
      alert(resp.message);
    })
  }
}
