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

  }

  /*getHero(id: number): Observable<Hero> {
    const url = '';
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }*/
}
