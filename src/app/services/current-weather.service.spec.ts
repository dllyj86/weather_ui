import { TestBed } from '@angular/core/testing';

import { CurrentWeatherService } from './current-weather.service';

describe('CurrentWeatherServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentWeatherService = TestBed.get(CurrentWeatherService);
    expect(service).toBeTruthy();
  });
});
