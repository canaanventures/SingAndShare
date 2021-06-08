import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from 'src/app/shared/app.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userprofile:any;
  tk:any = {}; images =''; imageToShow;

  @Input() email = {id:''};
  @Input() saveprofile = {image_url:'',profile_first_name:'', profile_last_name:'', profile_email_id:'', profile_contact_number:'',profile_address:'',profile_pincode:'',profile_city:'',profile_state:'',profile_role:'',user_id:''}

  constructor(public restApi: ApiService) { }

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails(){
    this.tk = jwt_decode(sessionStorage.getItem('user_token'));
    this.email.id = this.tk.user_id;
    this.restApi.postMethod('getProfile',this.email).subscribe((data:{}) => {
      this.userprofile = data;
      this.restApi.getImgMethod('getUserImg/'+this.tk.user_id).subscribe((resp:any) => {
        this.createImageFromBlob(resp);
      })
    })
  }

  selectImage(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.images = file;
      this.readURL(event.target.files);
    }
  }

  triggerClick(){
    document.getElementById('blog-image').click();
  }

  updateProfile() {
    if(this.images){
      const formData = new FormData();
      formData.append('image', this.images);
      let user_id = this.tk.user_id;

      this.restApi.postImgMethod('addUserImg/'+user_id,formData).subscribe((resp:any) => {
        this.updateEditProfile(resp);
      })
    }else{
      this.updateEditProfile('');
    }
  }

  updateEditProfile(resp){
    this.saveprofile.profile_first_name = (<HTMLInputElement>document.getElementById('profile_first_name')).value;
    this.saveprofile.profile_last_name = (<HTMLInputElement>document.getElementById('profile_last_name')).value;
    this.saveprofile.profile_email_id = (<HTMLInputElement>document.getElementById('profile_email_id')).value;
    this.saveprofile.profile_contact_number = (<HTMLInputElement>document.getElementById('profile_contact_number')).value;
    this.saveprofile.profile_address = (<HTMLInputElement>document.getElementById('profile_address')).value;
    this.saveprofile.profile_pincode = (<HTMLInputElement>document.getElementById('profile_pincode')).value;
    this.saveprofile.profile_city = (<HTMLInputElement>document.getElementById('profile_city')).value;
    this.saveprofile.profile_state = (<HTMLInputElement>document.getElementById('profile_state')).value;

    this.tk = jwt_decode(sessionStorage.getItem('user_token'));
    this.saveprofile.user_id = this.tk.user_id;

    (resp != '') ? this.saveprofile.image_url = resp.filepath : this.saveprofile.image_url = '';
    /*this.saveprofile.profile_role = (<HTMLInputElement>document.getElementById('profile_role')).value;*/

    this.restApi.postMethod('updateProfile',this.saveprofile).subscribe((data:{}) => {     
      alert('Your Profile has been sent successfully.');
      this.images = '';
      this.restApi.getImgMethod('getUserImg/'+this.tk.user_id).subscribe((resp:any) => {
        this.createImageFromBlob(resp);
      })
    })
  }

  readURL(event: Event): void {
    if (event && event[0]) {
        const file = event[0];

        const reader = new FileReader();
        reader.onload = e => this.imageToShow = reader.result;

        reader.readAsDataURL(file);
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
  }
}
