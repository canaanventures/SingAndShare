import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/app.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-training-lesson',
  templateUrl: './training-lesson.component.html',
  styleUrls: ['./training-lesson.component.css']
})
export class TrainingLessonComponent implements OnInit {
  imageToShow:any;images='';catlist:any=[];courselist:any=[];lessonlist:any=[];
  tk:any = {}; edit = false;

  @Input() lesson = {course_id:'', category_id:'', lesson_name:'', lesson_description:'', row_id:'',lesson_image_url:'', created_by:'', lesson_status:'', modified_by:''}

  constructor(public restApi: ApiService) { }

  ngOnInit(): void {
    this.tk = jwt_decode(sessionStorage.getItem('user_token'));
    this.fetchCategory();
    this.fetchCourse();
    this.fetchLesson();
  }

  fetchCategory(){
    this.restApi.getMethod('getLMSCategory/Y').subscribe((resp:any) => {
      this.catlist = resp.data;
    });
  }

  fetchCourse(){
    this.restApi.getMethod('getLMSCourse/Y').subscribe((resp:any) => {
      this.courselist = resp.data;
    });
  }

  fetchLesson(){
    this.restApi.getMethod('getLMSLesson/all').subscribe((resp:any) => {
      this.lessonlist = resp.data;
    });
  }
 
  addLesson(){
    this.lesson.created_by = this.tk.user_id;
    if(this.images != ''){
      const formData = new FormData();
      formData.append('image', this.images);
      let name = this.lesson.lesson_name.split(' ').join('_');

      this.restApi.postImgMethod('addTrainingLessonImg/'+name,formData).subscribe((data:any) => {
        this.lesson.lesson_image_url = data.filepath;
        this.addLessonData();
      })
    }else{
      this.lesson.lesson_image_url = '';
      this.addLessonData();
    }    
  }

  addLessonData(){
    this.restApi.postMethod('addLMSLesson',this.lesson).subscribe((resp:any) => {
      this.fetchLesson();
      this.images = '';
      alert(resp.message);
      this.resetForm();
    })
  }

  editLesson(id){
    this.edit = true;
    this.lesson.row_id = id;
    this.restApi.getMethod('getLMSLesson/'+id).subscribe((resp:any) => {
      this.lesson = resp.data[0];    
      this.restApi.getImgMethod('getLMSLessonImg/'+id).subscribe((data:any) => {
        this.createImageFromBlob(data);
      });
    });
  }

  updateLesson(){
    if(this.images != ''){
      const formData = new FormData();
      formData.append('image', this.images);
      let name = this.lesson.lesson_name.split(' ').join('_');
      this.restApi.postImgMethod('addTrainingLessonImg/'+name,formData).subscribe((resp:any) => {
        this.updateLessonData(resp);
      })
    }else{
      this.updateLessonData('');
    }
  }

  updateLessonData(resp){
    if(resp == ''){
      this.lesson.lesson_image_url = resp; 
    }else{
      this.lesson.lesson_image_url = resp.filepath; 
    }    
    this.lesson.modified_by = this.tk.user_id;
    this.restApi.postMethod('updateLMSLesson',this.lesson).subscribe((data:any) => {     
      alert(data.message);
      this.fetchLesson();
      this.resetForm();
    })
  }

  changeStatus(event,id){
    this.lesson.modified_by = this.tk.user_id;
    this.lesson.row_id = id;
    (event.target.checked) ? this.lesson.lesson_status = "Y" : this.lesson.lesson_status = "N";
    this.restApi.postMethod('changeLMSLessonStatus',this.lesson).subscribe((data:any) => {
      this.fetchLesson();
      alert("The status has been changed successfully");
    })
  }

  selectImage(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.images = file;
      this.readURL(event.target.files);
    }
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

  resetForm(){
    this.lesson = {course_id:'', category_id:'', lesson_name:'', lesson_description:'',row_id:'',lesson_image_url:'', created_by:'', lesson_status:'',modified_by:''};
    this.imageToShow = '';
    (<HTMLInputElement>document.getElementById('blog-image')).value = '';
  }
}
