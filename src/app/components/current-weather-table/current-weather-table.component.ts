import { Observable, Subject, Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CurrentWeatherModel } from 'src/app/models/weather';

@Component({
  selector: 'app-current-weather-table',
  templateUrl: './current-weather-table.component.html',
  styleUrls: ['./current-weather-table.component.scss']
})
export class CurrentWeatherTableComponent implements OnInit, OnDestroy {

  @Input()
  isLoading$: Subject<Boolean>;

  @Input()
  isLoadingFailed = false;

  @Input()
  currentWeather$: Subject<CurrentWeatherModel>;

  isLoaded = false;
  isLoadingWeather = false;

  loadingSub: Subscription;
  currentWeatherSub: Subscription;

  tableDataSource = [];
  displayedColumns: string[] = ['label', 'value'];

  constructor() { }

  ngOnInit() {

    this.loadingSub = this.isLoading$.subscribe((isLoading: boolean) => {
      this.isLoadingWeather = isLoading;
      this.isLoaded = false;
    });

    this.currentWeatherSub = this.currentWeather$.subscribe((weather: CurrentWeatherModel) => {
      this.tableDataSource = [];
      for (const key in weather) {
        this.tableDataSource.push({
          label: key,
          value: weather[key]
        })
      }

      this.isLoaded = true;
      this.isLoadingWeather = false;
    });
  }

  ngOnDestroy() {
    this.currentWeatherSub.unsubscribe();
    this.loadingSub.unsubscribe();
  }
}
