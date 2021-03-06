import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/app.service';
import jwt_decode from "jwt-decode";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-training-class',
  templateUrl: './training-class.component.html',
  styleUrls: ['./training-class.component.css']
})
export class TrainingClassComponent implements OnInit {
  imageToShow:any; images=''; menteeslist:any=[]; courselist:any=[]; classlist:any = []; catlist:any=[];
  tk:any = {}; edit = false; displayClassModal = 'none'; displayMenteeModal = 'none';mainTable = 'block'; displayClassListModal = 'none'; displayTable = 'inline-table';
  attendees:any; total:any; srslist; classrowid; cor_id; cat_id; class_user:any=[];
  public mentee:any;
  morerow:any=[0]; cnt=0; new; lesson:any=[];
  todo:any = [];done:any = []; generate = true;
  totalClass:any = []; role_name;

  @Input() class = {cat_id:'',class_type:'',class_name:'',start_date:'',end_date:'',connection_link:'',created_by:'',description:'',modified_by:'',course_id:'',instructor_id:'',row_id:'',class_status:''}
  @Input() menteedtls = {vals:[],class_id:''}
  @Input() updatelessonstatus = {class_id:'',lesson_id:'',instructor_id:'',lesson_status:''};
  @Input() code = {course_name:'',class_start_date_mon_yr:''}

  constructor(public restApi: ApiService) { }

  ngOnInit(): void {
    this.tk = jwt_decode(sessionStorage.getItem('user_token'));
    this.role_name = this.tk.role_name;
    this.fetchClass();
    this.fetchCategory();
    this.fetchMentees();
  }

  fetchCategory(){
    this.restApi.getMethod('getLMSCategory/Y').subscribe((resp:any) => {
      this.catlist = resp.data;
    });
  }

  catChange(){
    this.restApi.getMethod('getCourseFromCat/'+this.class.cat_id).subscribe((resp:any) => {
      this.courselist = resp.data;
    });
  }

  fetchMentees(){
    this.restApi.getMethod('getMentees/'+this.tk.user_id+'/'+this.tk.srs_id).subscribe((resp:any) => {
      this.menteeslist = resp.data;
      this.mentee = resp.data;
    });
  }

  addMentees(){
    let arr = this.done;
    var dte = new Date();   
    let a=[], b=[];
    for(var i=0;i<arr.length;i++){
      let newArray = [];
      for(var key in arr[i]){
        if(key != 'mentee_status'){
          newArray.push(arr[i][key]);
        }
      }
      newArray.push(this.classrowid);
      newArray.push(this.cat_id);
      newArray.push(this.cor_id);
      newArray.push(this.tk.user_id);
      newArray.push(dte.getFullYear()+'-'+((dte.getMonth())+1)+'-'+dte.getDate()+' '+dte.getHours()+':'+dte.getMinutes()+':'+dte.getSeconds());
      newArray.push("Y");
      b.push(newArray);
    }
    this.menteedtls.vals = b;
    this.menteedtls.class_id = this.classrowid;
    this.restApi.postMethod('addMenteeToClass',this.menteedtls).subscribe((resp:any) => {
      alert(resp.message);
      setTimeout(function(){
        location.reload();
      },1000)
    });
  }

  getMentees(id,course_id,cat_id){
    this.classrowid = id;
    this.cor_id = course_id;
    this.cat_id = cat_id;
    
    this.restApi.getMethod('getMentees/'+this.tk.user_id+'/'+this.tk.srs_id).subscribe((respone:any) => {
      this.restApi.getMethod('getLmsMentees/'+id).subscribe((resptwo:any) => {
        this.displayTable = 'none';
        this.displayMenteeModal = 'block';
        if(resptwo.data.length == 0){
          this.new = true;
          this.todo = respone.data; //this.menteeslist;
          this.done = [];
        }else{
          this.new = false;
          let res = respone.data;
          let arr =[], arrtwo=[];
          
          let res2 = resptwo.data;
          for (var i = 0, len = res2.length; i < len; i++) { 
            for (var j = 0, len2 = res.length; j < len2; j++) { 
              if (res2[i].user_id === res[j].user_id) {
                res.splice(j, 1);
                len2=res.length;
              }
            }
          }

          this.todo = res;
          for(var i=0;i<resptwo.data.length;i++){
            if(resptwo.data[i].mentee_status == 'Y'){
              arrtwo.push(resptwo.data[i]);
            }
          }
          this.done = arrtwo;
        }
        //document.getElementById('addClassModal');
        
        setTimeout(function(){
          (<HTMLInputElement>document.getElementById('user_cnt')).innerHTML = String(document.querySelectorAll('.fromunit').length);
          (<HTMLInputElement>document.getElementById('present_cnt')).innerHTML = String(document.querySelectorAll('.tounit').length);
        },500)
      });
    })
  }

  removeMentee(id){
    var txt = confirm("Are you sure you want to delete this user ?");
    if (txt == true) {
      this.restApi.getMethod('disableMentee/'+this.tk.user_id+'/'+id).subscribe((resp:any) => {
        this.toggleUser(id);
      })
    }
  }

  closeMenteeDiv(){
    this.displayMenteeModal = 'none';
    this.displayTable = 'inline-table';
    this.fetchMentees();
  }

  fetchCourse(){
    this.restApi.getMethod('getLMSCourse/Y').subscribe((resp:any) => {
      this.courselist = resp.data;
    });
  }

  fetchClass(){
    this.restApi.getMethod('getLMSClassList/'+this.tk.user_id).subscribe((resp:any) => {
      this.classlist = resp.data;
    });
  }

  openClassModal(){
    this.displayClassModal='block';
    this.edit = false;
    this.generate = true;
    document.getElementsByTagName('body')[0].classList.add('modal-open');
  }

  closeClassModal(){
    this.displayClassModal='none';
    this.edit = true;
    document.getElementsByTagName('body')[0].classList.remove('modal-open');
   // this.resetForm();
  }

  resetForm(f:NgForm){
    f.resetForm( {cat_id:'',class_type:'',class_name:'',start_date:'',end_date:'',connection_link:'',created_by:'',description:'',modified_by:'',course_id:'',instructor_id:'',row_id:'',class_status:''})
    // this.class = {cat_id:'',class_type:'',class_name:'',start_date:'',end_date:'',connection_link:'',created_by:'',description:'',modified_by:'',course_id:'',instructor_id:'',row_id:'',class_status:''};
  }

  addClass(){
    this.class.created_by = this.tk.user_id;
    this.class.instructor_id = this.tk.user_id;   
    this.restApi.postMethod('addLMSClass',this.class).subscribe((resp:any) => {
      this.fetchClass();
      alert(resp.message);
      //this.resetForm();
      this.generate = true;
    })
  }

  editClass(id){
    this.edit = true;
    this.generate = false;
    this.class.row_id = id;
    this.displayClassModal = 'block';
    this.restApi.getMethod('getLMSClass/'+id).subscribe((resp:any) => {
      this.class = resp.data[0];
      let classobj = resp.data[0];

      this.class.cat_id = resp.data[0].category_id;
      this.restApi.getMethod('getCourseFromCat/'+this.class.cat_id).subscribe((resp2:any) => {
        this.courselist = resp2.data;
        this.class.course_id = resp.data[0].course_id;
      });

      setTimeout(function(){
        let create_dte = new Date(classobj.start_date);
        let month, dte, hrs, mins;
        (create_dte.getDate() < 10) ? dte = '0'+create_dte.getDate() : dte = create_dte.getDate();
        (create_dte.getMonth() < 10) ? month = '0'+(create_dte.getMonth()+1) : month = (create_dte.getMonth()+1);
        (create_dte.getHours() < 10) ? hrs = '0'+create_dte.getHours() : hrs = create_dte.getHours();
        (create_dte.getMinutes() < 10) ? mins = '0'+create_dte.getMinutes() : mins = create_dte.getMinutes();

        (<HTMLInputElement>document.getElementById('class_start_date')).value = create_dte.getFullYear()+'-'+month+'-'+dte+'T'+hrs+':'+mins;

        create_dte = new Date(classobj.end_date);
        (create_dte.getDate() < 10) ? dte = '0'+create_dte.getDate() : dte = create_dte.getDate();
        (create_dte.getMonth() < 10) ? month = '0'+(create_dte.getMonth()+1) : month = (create_dte.getMonth()+1);
        (create_dte.getHours() < 10) ? hrs = '0'+create_dte.getHours() : hrs = create_dte.getHours();
        (create_dte.getMinutes() < 10) ? mins = '0'+create_dte.getMinutes() : mins = create_dte.getMinutes();
        (<HTMLInputElement>document.getElementById('class_end_date')).value = create_dte.getFullYear()+'-'+month+'-'+dte+'T'+hrs+':'+mins;
      },100)
    });
  }

  updateClass(){
    this.class.modified_by = this.tk.user_id;
    this.class.start_date = this.changeDateFormat(this.class.start_date);
    this.class.end_date = this.changeDateFormat(this.class.end_date);
    this.restApi.postMethod('updateLMSClass',this.class).subscribe((data:any) => {     
      alert('Class Updated Successfully.');
      this.fetchClass();
   //   this.resetForm();
      this.displayClassModal = 'none';
    })
  }

  changeStatus(event,id,type){
    this.class.modified_by = this.tk.user_id;
    this.class.row_id = id;
    (event.target.checked) ? this.class.class_status = "Y" : this.class.class_status = "N";
    this.restApi.postMethod('changeLMSClassStatus',this.class).subscribe((data:any) => {
      if(type == 'all'){
        this.showAllClasses();  
      }else{
        this.fetchClass();
      }     
      alert("The status has been changed successfully");
    })
  }

  drop(event: CdkDragDrop<string[]>,type:any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    //if(type == 'attendees'){
    //this.total = this.todo.length;
    //this.attendees = this.done.length;
    //this.attendancedetails.attendees = String(this.done.length);
    //}

    setTimeout(function(){
      (<HTMLInputElement>document.getElementById('user_cnt')).innerHTML = String(document.querySelectorAll('.fromunit').length);
      (<HTMLInputElement>document.getElementById('present_cnt')).innerHTML = String(document.querySelectorAll('.tounit').length);
    },500)
  }

  changeDateFormat(newdte){
    let create_dte = new Date(newdte);
    let month, dte, hrs, mins;
    (create_dte.getDate() < 10) ? dte = '0'+create_dte.getDate() : dte = create_dte.getDate();
    ((create_dte.getMonth()+1) < 10) ? month = '0'+(create_dte.getMonth()+1) : month = (create_dte.getMonth()+1);
    (create_dte.getHours() < 10) ? hrs = '0'+create_dte.getHours() : hrs = create_dte.getHours();
    (create_dte.getMinutes() < 10) ? mins = '0'+create_dte.getMinutes() : mins = create_dte.getMinutes();
    return create_dte.getFullYear()+'-'+month+'-'+dte+' '+hrs+':'+mins;
  }

  toggleUser(id:any){
    this.restApi.getMethod('getLmsClassMentees/'+id).subscribe((resp:any) => {
      this.class_user = resp.data;
      var classlen = document.getElementsByClassName('table-hidden-row');
      for(let i=0;i<classlen.length;i++){
        (document.getElementsByClassName("table-hidden-row")[i] as HTMLElement).style.display = 'none'
      }
      document.getElementById('row'+id).style.display = 'contents';
      this.fetchLmsClassLesson(id,'toggle','');
    })   
  }

  closeToggle(id){
    document.getElementById('row'+id).style.display = 'none';
  }

  addMore(){
    this.cnt++;
    this.morerow.push(this.cnt);
  }

  updateLessonStatus(lesson_id,class_id){
    this.updatelessonstatus.class_id = class_id; 
    this.updatelessonstatus.lesson_id = lesson_id;
    this.updatelessonstatus.instructor_id = this.tk.user_id;
    this.updatelessonstatus.lesson_status = 'Y';
    this.restApi.postMethod('updateLessonStatus',this.updatelessonstatus).subscribe((data:any) => {
      this.fetchLmsClassLesson(class_id,'update',lesson_id);
      alert(data.message);
    })
  }

  fetchLmsClassLesson(id,type,lessid){
    this.restApi.getMethod('getLMSClassLesson/'+id).subscribe((resp:any) => {
      if(type == 'toggle'){
        this.lesson = resp.data;
      }
      this.getActiveLesson(id);      
    })
  }

  getActiveLesson(id) {
    this.restApi.getMethod('getActiveLesson/'+id).subscribe((resp:any) => {
      for(var i=0; i<resp.data.length;i++){
        document.getElementById('lesson_'+id+'_'+resp.data[i].lesson_id).classList.add('active');
      }
    });
  }

  courseChange($event){
    let txt = $event.target.options[$event.target.options.selectedIndex].text;
    this.code.course_name = txt.split(' ').join('_');
  }
  
  generateCode(){
    let codedte = new Date(this.class.start_date);
    let dte = String(codedte.getMonth()+1)+String(codedte.getFullYear());
    this.code.class_start_date_mon_yr = dte;
    this.restApi.postMethod('generateCode',this.code).subscribe((resp:any) => {    
      this.generate = false;
      this.class.class_name = dte+'_'+resp.data+'_'+this.code.course_name;
    })
  }

  showAllClasses(){
    this.mainTable = 'none';
    this.displayTable = 'none';
    this.displayClassListModal = 'block';
    this.restApi.getMethod('getAllLMSClass').subscribe((resp:any) => {
      this.totalClass = resp.data;
    })
  }

  closeClassListDiv(){
    this.displayClassListModal = 'none';
    this.mainTable = 'block';
    this.displayTable = 'inline-table';
  }
}
