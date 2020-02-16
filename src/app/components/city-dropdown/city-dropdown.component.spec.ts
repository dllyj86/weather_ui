import { CustomMaterialModule } from './../../modules/custom-material/custom-material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityDropdownComponent } from './city-dropdown.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

const cityList = require('./../../mock/city-list-mock.json');


describe('CityDropdownComponent', () => {
  let component: CityDropdownComponent;
  let fixture: ComponentFixture<CityDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomMaterialModule],
      declarations: [ CityDropdownComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityDropdownComponent);
    component = fixture.componentInstance;
  });

  it('should initialize dropdown and select city correctly', async () => {
    spyOn(component, 'handleSelection').and.callThrough();
    spyOn(component.selectCity, 'emit').and.callThrough();
    component.cityNameList = cityList;
    fixture.detectChanges();

    const el = fixture.debugElement.nativeElement;
    const selection = el.querySelector('mat-select .mat-select-placeholder');
    expect('Please select a city').toEqual(selection.textContent);
  });

  it('should emit event correctly', () => {
    spyOn(component.selectCity, 'emit').and.callThrough();
    component.handleSelection({value: 'Sydney'} as MatSelectChange);
    fixture.detectChanges();
    expect(component.selectCity.emit).toHaveBeenCalled();
  })

  it('should not emit event with empty data', () => {
    spyOn(component.selectCity, 'emit').and.callThrough();
    component.handleSelection({value: null} as MatSelectChange);
    fixture.detectChanges();
    expect(component.selectCity.emit).not.toHaveBeenCalled();
  })
});
