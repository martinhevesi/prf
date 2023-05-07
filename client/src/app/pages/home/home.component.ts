import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from 'src/app/services/trip.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public trips?: any[];

  constructor(private userService: UserService, private tripService: TripService, private router: Router) { }

  ngOnInit(): void {
    this.getTrips();
  }

  public onSearchTrip(searchForm: NgForm): void {
    let origin = searchForm.value.origin;
    let destination = searchForm.value.destination;
    console.log("form:", searchForm.value);
    this.tripService.searchTrip(origin, destination).subscribe(
      (response: any[]) => {
        console.log(response);
        this.trips = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public getTrips(): void {
    this.tripService.getTrips().subscribe(
      (response: any[]) => {
        this.trips = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      })
  }

}
