import { Component, OnInit } from '@angular/core';
import { NewsService } from '../_services/news.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service'


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  allnewsView = true
  editArticleView = false
  addnewsView = false
  registerFormView = false
  allnewsResultsObs: any
  allnewsResults: any
  headers: any
  config: any
  editArticleForm!: FormGroup
  addArticleForm!: FormGroup
  registerForm!: FormGroup
  articleIdtobeUpdated: any


  constructor(private _newsService: NewsService, private formBuilder: FormBuilder, private _authService: AuthenticationService) { }

  ngOnInit(): void {
  
    this.allnewsResultsObs = this._newsService.getallnews().subscribe(data => {
      this.allnewsResults = data

      console.log(data)
      this.editArticleForm= this.formBuilder.group({
        editId : ['', Validators.required],
        editTitle: ['', Validators.required],
        editAuthor: ['', Validators.required],
        editArticle: ['', Validators.required],
        editImg: ['', Validators.required]
      })

      this.addArticleForm = this.formBuilder.group({
        newId : ['', Validators.required],
        newTitle: ['', Validators.required],
        newAuthor: ['', Validators.required],
        newArticle: ['', Validators.required],
        newImg: ['', Validators.required]
      })

      this.registerForm = this.formBuilder.group({
        userNameReg : ['', Validators.required],
        emailReg: ['', [Validators.required, Validators.email]],
        passwordReg: ['', Validators.required],
  
      })
  })
  }

  async deleteArticle(article: any){
    let id = article.id
    this._newsService.deletearticle(id).subscribe(data=>{
    })
    alert("Deleted Article : "+ article.title+" with Id: "+ id)
    location.reload()
  }


  openEditArticle(article: any){
    this.allnewsView = false
    this.editArticleView = true
    this.articleIdtobeUpdated = article.id
    this.editArticleForm= this.formBuilder.group({
      editId : [article.id, Validators.required],
      editTitle: [article.title, Validators.required],
      editAuthor: [article.author, Validators.required],
      editArticle: [article.article, Validators.required],
      editImg: [article.img, Validators.required]
    })
  }

  openAddNewsView(){
    this.editArticleView = false
    this.allnewsView = false
    this.registerFormView = false
    this.addnewsView = true
  }

  openAddNewUser(){
    this.editArticleView = false
    this.addnewsView = false
    this.allnewsView = false
    this.registerFormView = true

  }

  backToAllNewsView(){
    this.editArticleView = false
    this.addnewsView = false
    this.registerFormView = false
    this.allnewsView = true
  }

  editarticlSubmit(){
    console.log("this.f.editTitle.value = "+this.f.editTitle.value)
    this._newsService.updatearticle(this.articleIdtobeUpdated, this.f.editId.value, this.f.editTitle.value, this.f.editAuthor.value, this.f.editArticle.value, this.f.editImg.value)
    .subscribe(data=>{console.log("data = "+data)})

    alert("News Article Updated")
    location.reload()
    

  }

  public get f() { return this.editArticleForm.controls; }
  public get m() { return this.addArticleForm.controls; }


  addarticlSubmit(){
    console.log("this.m.newTitle.value = "+this.m.newTitle.value)
    this._newsService.addarticle(this.m.newId.value, this.m.newTitle.value, this.m.newAuthor.value, this.m.newArticle.value, this.m.newImg.value)
    .subscribe(data=>{console.log("data = "+data)})

    alert("News Article Added")
    location.reload()

  }

  logout(){
    this._authService.logout()
    location.reload()
  }

  async registerSubmit(){
    let usrname = this.registerForm.value.userNameReg
    let email = this.registerForm.value.emailReg
    let password = this.registerForm.value.passwordReg

    if (this.registerForm.invalid) {
      return;
    } 
    
    await this._authService.registerUser(usrname, email, password)
    .subscribe(
      response => {
          console.log("POST response", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
    alert("User " + usrname + " Created sucessfully")
    location.reload()

  }

  


  

}
    

