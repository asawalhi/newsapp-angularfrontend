import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormView = true;
  registerFormView = false;
  loginForm!: FormGroup;
  registerForm!: FormGroup
  error: any
  loading= false
  submitted = false

  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { 
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/']);
  }
}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }


  public get f() { return this.loginForm.controls; }
  public get k() { return this.registerForm.controls; }



  loginSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                console.log("login sucess")
                this.router.navigate(['/admin']);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
  }

  

  openLoginView(){
    this.registerFormView = false;
    this.loginFormView = true;
  }
  openRegisterView(){
    this.loginFormView = false;
    this.registerFormView = true;
  }


}
