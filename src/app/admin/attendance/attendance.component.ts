import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/app.service';
import { Location } from '@angular/common';
import jwt_decode from "jwt-decode";
import { DndDropEvent } from 'ngx-drag-drop';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  tk:any = {};
  userlist:any = [];
  members:any = [];
  attendees:any; total:any;srslist;

  @Input() attendancedetails = {srs_id:'',meeting_date:'',attendees:'',new_attendees:0,created_by:'',total_members:0,presentees:0,absentees:0}
  @Input() attendeesdtls = {vals:[],row:''}
  
  constructor(public restApi: ApiService, public router: Router) { }

  ngOnInit(): void {
    this.tk = jwt_decode(sessionStorage.getItem('user_token'));
    this.fetchSRSlist();
    this.fetchUser();
  }

  fetchSRSlist() {
    this.restApi.getMethod('getBranches/all')
      .subscribe((resp:any) => {
        this.srslist = resp.data;
        this.attendancedetails.srs_id = this.tk.srs_id;
      });
  }

  addAttendance(event:any) {   
    this.attendancedetails.created_by = this.tk.user_id;
    this.restApi.postMethod('addAttendance',this.attendancedetails).subscribe((resp:any) => {
      let arr = [...this.done,...this.todo];
      let a=[], b=[];
      for(var i=0;i<arr.length;i++){
        let newArray = [];
        for(var key in arr[i]){
          newArray.push(arr[i][key]);
        }
        newArray.push(resp.rowid);
        b.push(newArray);
      }
      this.attendeesdtls.vals = b;
      this.restApi.postMethod('addAttendees',this.attendeesdtls).subscribe((resp:any) => {
        alert(resp.message);
        setTimeout(function(){
          location.reload();
        },1000)
      });
    });
  }

  todo = [];
  done = [];

  drop(event: CdkDragDrop<string[]>,type:any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.todo = this.todo.map(v => ({...v, attendance_status: "A"}))
    this.total = this.todo.length;
    this.done = this.done.map(v => ({...v, attendance_status: "P"}))
    this.attendees = this.done.length;
    this.attendancedetails.presentees = this.done.length;
    this.attendancedetails.absentees = this.todo.length;
  }

  fetchUser() {
    this.restApi.getMethod('attendanceUsers/'+this.tk.srs_id).subscribe((resp:any) => {
      this.todo = resp.data;
      this.total = resp.data.length;
      this.attendees = 0;
      this.attendancedetails.total_members = resp.data.length;
      this.attendancedetails.presentees = this.done.length;
      this.attendancedetails.absentees = this.todo.length;
    });
  }
}
