import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../_services/weather.service';
import { NewsService } from '../_services/news.service'
import { SportsService } from '../_services/sports.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  weatherForecastData: any;
  errorMessage: any
  newsArticles: any
  sportTypes: any
  firstNewsArticle: any
  secondNewsArticle: any
  thirdNewsArticle: any
  firstSportsType: any
  secondSportsType: any
  thirdSportsType: any
  homeView= true
  sportsView = false
  aboutusView = false
  contactusView = false
  firstSportsTypeDtlsView = false
  secondSportsTypeDtlsView = false
  thirdSportsTypeDtlsView = false
  contactUsFrom!: FormGroup

  constructor(private _weatherService: WeatherService, private _newsService: NewsService, private _sportsService: SportsService, private fb:FormBuilder) { }

  ngOnInit(): void {
    //fetch weather data on init
    this._weatherService.getWeatherForecast()
    .subscribe(data => { 
      this.weatherForecastData = data
      console.log("this.weatherForecastData = "+this.weatherForecastData)
    }, error => 
    this.errorMessage = <any>error 
    );

    //fetch news articles on init
    this._newsService.getallnews()
    .subscribe(data=>{
      this.newsArticles = data
      this.firstNewsArticle = this.newsArticles[0]
      //console.log(JSON.stringify(this.firstNewsArticle))
      this.secondNewsArticle = this.newsArticles[1]
      this.thirdNewsArticle = this.newsArticles[2]
    }, error => 
    this.errorMessage = <any>error 
    );
    
    this.contactUsFrom = this.fb.group({
      emailAddress: ['', Validators.required],
      query: ['', Validators.required]
    });
  }

  //View control
  openHomeView(){
    this.sportsView = false
    this.aboutusView = false
    this.contactusView = false
    this.homeView = true
  }

  openSportsView(){
    this.aboutusView = false
    this.contactusView = false
    this.homeView = false
    this.sportsView = true

    let randomIndex1 = Math.floor(Math.random() * 11);
    let randomIndex2 = Math.floor(Math.random() * 12);
    let randomIndex3 = Math.floor(Math.random() * 9);

    this._sportsService.getSportTypes().subscribe(data=>{
      this._sportsService.sportsCollection = JSON.stringify(data)
      this.sportTypes = data
      this.firstSportsType = this.sportTypes.sports[randomIndex1]
      this.secondSportsType = this.sportTypes.sports[randomIndex2]
      this.thirdSportsType = this.sportTypes.sports[randomIndex3]
      
    })
  }

  openfirstSportsTypeDtls(){
    this.firstSportsTypeDtlsView = true
  }

  opensecondSportsTypeDtls(){
    this.secondSportsTypeDtlsView = true
  }

  openthirdSportsTypeDtls(){
    this.thirdSportsTypeDtlsView = true
  }

  openAboutusView(){
    this.contactusView = false
    this.homeView = false
    this.sportsView = false
    this.aboutusView = true
  }

  openContactusView(){
    this.homeView = false
    this.sportsView = false
    this.aboutusView = false
    this.contactusView = true
  }

  getallnews(){
    let x = this.newsArticles
    x.forEach((element: any) => {
      console.log(element)
    });
  }

  public get z() { return this.contactUsFrom.controls; }

  contactUsSubmit(){
   let email = this.z.emailAddress.value
    console.log("z ="+this.z.emailAddress.value)
    alert("Email sent, please wait for reponse to "+email+" within 3 business days")
    location.reload()

  }

}
