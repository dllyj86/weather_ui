import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CurrentWeatherService } from './current-weather.service';
import { environment } from 'src/environments/environment';

const cityList = require('./../mock/city-list-mock.json');
const cityWeather = require('./../mock/city-weather-mock.json');


describe('CurrentWeatherServiceService', () => {

  let service: CurrentWeatherService;
  let testingController: HttpTestingController;

  beforeEach(async () => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [CurrentWeatherService]
  }).compileComponents()
  );

  beforeEach(() => {
    testingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CurrentWeatherService);
  })

  it('should get city list correctly', async () => {
    const service: CurrentWeatherService = TestBed.get(CurrentWeatherService);

    service.getCityList().subscribe(list => {
      expect(list.length).toBe(3);
    })

    const req = testingController.expectOne(environment.CITY_LIST_API);
    expect(req.request.method).toEqual('GET');
    req.flush(cityList);
  });

  it('should get current weather correctly', async () => {
    const service: CurrentWeatherService = TestBed.get(CurrentWeatherService);

    service.queryCityCurrentWeather('Sydney').subscribe(weather => {
      expect(weather.city).toEqual('Sydney');
    })

    const req = testingController.expectOne(environment.CURRENT_WEATHER_API + '?city=Sydney');
    expect(req.request.method).toEqual('GET');
    req.flush(cityWeather);
  });
});
