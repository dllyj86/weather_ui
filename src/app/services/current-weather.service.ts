import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  constructor(private httpClient: HttpClient) { }

  getCityList(): Observable<string[]>{
    return this.httpClient.get(environment.API_HOST + environment.CITY_LIST_API) as Observable<string[]>;
  }

  queryCityCurrentWeather(cityName: string): Observable<any> {
    return this.httpClient.get(environment.API_HOST + environment.CURRENT_WEATHER_API, {
      params: {
        city: cityName
      }
    });
  }
}
