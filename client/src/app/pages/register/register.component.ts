import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  public onCreateUser(addForm: NgForm): void {
    document.getElementById("register-button")?.click();
    console.log(addForm.value);
    this.userService?.createUser(addForm.value).subscribe(
      (response: any) => {
        this.router.navigateByUrl("/login");
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

}
