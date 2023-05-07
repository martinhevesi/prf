import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  public onLoginUser(loginForm: NgForm) {
    document.getElementById("login-button");
    this.userService.loginUser(loginForm.value).subscribe(
      (response: any) => {
        this.router.navigateByUrl("/home");
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  } 

}
