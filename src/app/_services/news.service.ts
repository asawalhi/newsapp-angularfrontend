import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  baseUrl = "http://localhost:2938/"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'})
    }


  constructor(private http: HttpClient) { }

  getallnews():Observable<any>{
    return this.http.get(this.baseUrl+"getallnews")
  }

  deletearticle(id: number):Observable<HttpResponse<Config>>{
    console.log("Deleting article with id = "+id)
    return this.http.get<Config>(
      this.baseUrl+"findarticleanddelete/"+id, { observe: 'response' });
  }

  updatearticle(id: number, newId: number, title: string, author: string, article:string, img:string){
    return this.http.post("http://localhost:2938/findarticleandupdate/",
    {"id":id, "newId":newId, "title":title, "author":author, "article":article, "img":img},this.httpOptions)
    }
  
  
  
  addarticle(id: number, title: string, author: string, article:string, img:string){
    return this.http.post("http://localhost:2938/createarticle", 
    {"id":id, "title":title, "author":author, "article":article, "img":img},this.httpOptions
    )
    }
  
  
  
  }

  

  




