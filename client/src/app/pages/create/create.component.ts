import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from 'src/app/services/trip.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  user: string = '';

  constructor(private userService: UserService, private tripService: TripService, private router: Router) { 
    this.userService.getActualUser().subscribe(
      (response: any) => {
        console.log(response);
        this.user = response.username;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
  }

  public onCreateTrip(form: NgForm) {
    document.getElementById("save-trip-button")?.click();
    console.log(form.value);

    this.tripService.createTrip(form.value).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigateByUrl('/home');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

}
