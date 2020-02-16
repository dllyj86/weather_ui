import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import * as _ from 'lodash';

@Component({
  selector: 'app-city-dropdown',
  templateUrl: './city-dropdown.component.html',
  styleUrls: ['./city-dropdown.component.scss']
})
export class CityDropdownComponent implements OnInit {

  @Input()
  cityNameList: string[];

  @Output()
  selectCity = new EventEmitter<string>();

  dropdownPlaceholder = 'Please select a city';

  constructor() { }

  ngOnInit() {
  }

  handleSelection(matChange: MatSelectChange){

    if(!_.isEmpty(matChange.value)) {
      this.selectCity.emit(matChange.value);
    }
  }

}
