import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './modules/custom-material/custom-material.module';
import { ErrorMessageComponent } from './components/common/error-message/error-message.component';
import { CityDropdownComponent } from './components/city-dropdown/city-dropdown.component';
import { CurrentWeatherTableComponent } from './components/current-weather-table/current-weather-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorMessageComponent,
    CityDropdownComponent,
    CurrentWeatherTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CustomMaterialModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
