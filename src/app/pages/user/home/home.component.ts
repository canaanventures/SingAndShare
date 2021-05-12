import { Component, OnInit } from '@angular/core';
import { UserComponent } from 'src/app/modules/user/user.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

  export class HomeComponent extends UserComponent implements OnInit {

  constructor() {
    super()
   }

  ngOnInit(): void {
    fetch('https://ipapi.co/json/')
    .then(function(response) {
      response.json().then(jsonData => {
        console.log(jsonData);
      });
    })
    .catch(function(error) {
      console.log(error)
    });
  }

  christmasImageObject = [
    {
        image: '../../../assets/images/christmas/christmas-1.png',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
        title: 'Hummingbirds are amazing creatures'
    }, 
    {
        image: '../../../assets/images/christmas/christmas-2.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg'
    }, 
    {
        image: '../../../assets/images/christmas/christmas-3.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
        title: 'Example with title.'
    },
    {
        image: '../../../assets/images/christmas/christmas-4.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
        title: 'Hummingbirds are amazing creatures'
    }, 
    {
        image: '../../../assets/images/christmas/christmas-5.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg'
    }
  ];
}
