import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private apiServerlUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getTrips(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerlUrl}/trips`);
  }

  public createTrip(trip: any): Observable<any> {

    return this.http.post<any>(`${this.apiServerlUrl}/trips`, trip);
  }

  public updateTrip(trip: any): Observable<any> {
    return this.http.patch<any>(`${this.apiServerlUrl}/trips`, trip);
  }


  public deleteTrip(tripId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerlUrl}/trips/${tripId}`);
  }

  public searchTrip(origin: string, destination: string): Observable<any[]> {
    let queryParams = new HttpParams();
    if(origin) queryParams = queryParams.append("origin", origin);
    if(destination) queryParams = queryParams.append("destination", destination);
    return this.http.get<any[]>(`${this.apiServerlUrl}/trips`, { params: queryParams });
  }

  public getTripById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiServerlUrl}/trips/${id}`);
  }
}
