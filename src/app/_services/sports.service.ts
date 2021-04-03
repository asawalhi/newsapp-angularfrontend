import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SportsService {


  sportsCollection: any
  sportsUrl = "https://www.thesportsdb.com/api/v1/json/1/all_sports.php"


  constructor(private http: HttpClient) { }

  getSportTypes(){
    return this.http.get(this.sportsUrl)
  }


}
