import { CurrentWeatherModel } from './../../models/weather';
import { Subject } from 'rxjs';
import { CustomMaterialModule } from './../../modules/custom-material/custom-material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeatherTableComponent } from './current-weather-table.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const weatherModel = require('./../../mock/city-weather-mock.json');

describe('CurrentWeatherTableComponent', () => {
  let component: CurrentWeatherTableComponent;
  let fixture: ComponentFixture<CurrentWeatherTableComponent>;
  let currentWeather$: Subject<CurrentWeatherModel>;
  let isLoading$: Subject<boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomMaterialModule],
      declarations: [ CurrentWeatherTableComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    isLoading$ = new Subject();
    currentWeather$ = new Subject();
    component.isLoading$ = isLoading$;
    component.currentWeather$ = currentWeather$;

    fixture.detectChanges();

    isLoading$.next(true);

    expect(component.isLoadingWeather).toBe(true);
    expect(component.isLoaded).toBe(false);

    currentWeather$.next(weatherModel);
    fixture.detectChanges();
    expect(component.isLoaded).toBe(true);
    expect(component.isLoadingWeather).toBe(false);
    expect(component.tableDataSource.length).toBe(5);

    spyOn(component.loadingSub, 'unsubscribe').and.callThrough();
    spyOn(component.currentWeatherSub, 'unsubscribe').and.callThrough();
    component.ngOnDestroy()
    fixture.detectChanges();
    expect(component.loadingSub.unsubscribe).toHaveBeenCalled();
    expect(component.currentWeatherSub.unsubscribe).toHaveBeenCalled();
  });

});
