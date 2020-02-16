import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  constructor(private httpClient: HttpClient) { }

  getCityList(): Observable<string[]>{
    return this.httpClient.get('/api/weather/citylist') as Observable<string[]>;
  }

  queryCityCurrentWeather(cityName: string): Observable<any> {
    return this.httpClient.get('/api/weather/current', {
      params: {
        city: cityName
      }
    });
  }
}
