import { CurrentWeatherService } from './services/current-weather.service';
import { Observable, Subject, of } from 'rxjs';
import { take, tap, catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentWeatherModel } from './models/weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Current Weather';

  // For dropdown
  cityNameList: string[];

  // For weather table
  currentWeather$ = new Subject<CurrentWeatherModel>();

  // For weather table
  isLoading$ = new Subject<boolean>();
  // any loading error
  isLoadingFailed = false;

  errorMessage = 'Loading failed.';

  constructor(private httpClient: HttpClient, private weatherService: CurrentWeatherService) {

  }

  ngOnInit() {
    this.weatherService.getCityList().subscribe((cityList: string[]) => {
      this.cityNameList = cityList;
    },
    (error) => {
      console.error(error);
      this.isLoadingFailed = true;
    })
  }

  queryCityWeather(cityName: string) {
    this.isLoading$.next(true);
    this.weatherService.queryCityCurrentWeather(cityName).subscribe((response: CurrentWeatherModel) => {
      this.currentWeather$.next(response);
    },
      (error) => {
        console.error(error);
        this.isLoadingFailed = true;
      });
  }
}
