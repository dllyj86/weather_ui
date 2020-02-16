import { CurrentWeatherService } from './services/current-weather.service';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';

const rawCityListResponse = require('./mock/city-list-mock.json');
const rawCityWeatheResponse = require('./mock/city-weather-mock.json');

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let service: CurrentWeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: CurrentWeatherService,
          useValue: {
            getCityList: () => {
              return of(rawCityListResponse);
            },
            queryCityCurrentWeather: (cityName: string) => {
              return of(rawCityWeatheResponse);
            }
          }
        }
      ],
      declarations: [
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(CurrentWeatherService);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  })

  // Load city list
  it('should load city list successfully', () => {
    fixture.detectChanges();
    expect(component.cityNameList.length).toBe(3);
  });

  it('should set flag correctly when load city list failed', () => {
    spyOn(service, 'getCityList').and.callFake(() => {
      return throwError(new Error('Mock citylist error'))
    });
    fixture.detectChanges();
    expect(component.cityNameList).toBe(undefined)
    expect(component.isLoadingFailed).toBe(true);
  });

  // Query weather for city
  it('should query city weather successfully', () => {
    fixture.detectChanges();
    spyOn(component.isLoading$, 'next').and.callThrough();
    spyOn(service, 'queryCityCurrentWeather').and.callThrough();
    spyOn(component.currentWeather$, 'next').and.callThrough();
    component.queryCityWeather('Sydney');
    fixture.detectChanges();
    expect(component.isLoading$.next).toHaveBeenCalledWith(true);
    expect(service.queryCityCurrentWeather).toHaveBeenCalledWith('Sydney');
    expect(component.currentWeather$.next).toHaveBeenCalledWith(rawCityWeatheResponse)
  });

  it('should query city weather failed', () => {
    fixture.detectChanges();
    spyOn(component.isLoading$, 'next').and.callThrough();
    spyOn(service, 'queryCityCurrentWeather').and.callFake(() => {
      return throwError(new Error('Mock query weather error'));

    });
    spyOn(component.currentWeather$, 'next').and.callThrough();
    component.queryCityWeather('Sydney');
    fixture.detectChanges();
    expect(component.isLoading$.next).toHaveBeenCalledWith(true);
    expect(service.queryCityCurrentWeather).toHaveBeenCalledWith('Sydney');
    expect(component.currentWeather$.next).not.toHaveBeenCalled()
    expect(component.isLoadingFailed).toBe(true);
  });

  // Check title
  it(`should have as title 'Current Weather'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Current Weather');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.app-title').textContent).toContain('Current Weather');
  });
});
