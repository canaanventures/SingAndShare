import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from 'src/app/shared/app.service';

@Component({
  selector: 'app-singleblog',
  templateUrl: './singleblog.component.html',
  styleUrls: ['./singleblog.component.css']
})
export class SingleblogComponent implements OnInit {
  blog:any = [];
  comment:any = [];
  param;
  imageToShow: any;

  @Input() addcomm = {name:'', email_id:'', blog_comment:'', blog_id:''}

  constructor(public restApi: ApiService, public router: Router, public activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.param = this.activatedroute.snapshot.params;
    this.fetchBlog();
    this.fetchComments();
  }

  fetchBlog(){   
    this.restApi.getMethod('getBlogs/single/'+this.param.blog_id).subscribe((resp:any) => {
      this.blog = resp.data[0]; 
      this.restApi.getImgMethod('getBlogImg/'+this.param.blog_id).subscribe((resp:any) => {
        this.createImageFromBlob(resp);
      });
    });
  }

  fetchComments(){
    this.restApi.getMethod('getComments/approve/'+this.param.blog_id).subscribe((resp:any) => {
      this.comment = resp.data;
    });
  }

  postComment(){
    let param = this.activatedroute.snapshot.params;
    this.addcomm.blog_id = param.blog_id;
    this.restApi.postMethod('addComment',this.addcomm).subscribe((resp:any) => {
      alert("Your comment has been posted successfully.");
      this.addcomm = {name:'', email_id:'', blog_comment:'', blog_id:''};
    })
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
