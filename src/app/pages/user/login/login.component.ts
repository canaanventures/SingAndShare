import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { UserComponent } from 'src/app/modules/user/user.component';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends UserComponent implements OnInit {
  @Input() userdetails = {email:'', pass_word:''}
  constructor(public restApi: ApiService, public router: Router) { 
    super(

    );
  }

  ngOnInit(): void {}

  userLogin() {
    debugger;
    this.restApi.postMethod('login',this.userdetails)
      .subscribe((data:{}) => {
        this.restApi.setUserToken(data);
        this.router.navigate(['/events']);
      });
  }

}
