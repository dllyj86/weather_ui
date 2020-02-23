# Weather UI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version `8.1.1`, `NodeJS 12.13.1`, `NPM 6.12.1`.  
This project used `Angular Material 8` to draw UI stuff.

## GitHub URL

[weather_ui](https://github.com/dllyj86/weather_ui)  
URL: <https://github.com/dllyj86/weather_ui>

## Jenkins URL

[Jenkins](http://52.76.30.89:8080/job/weather_ui_cicd/)  
URL: <http://52.76.30.89:8080/job/weather_ui_cicd/>

If you want to visit my Jenkins, please use user name `visitor` and password `12345678`.

**Notice:**  
If you want to run the build, please inform me in advance. I need to change my EC2 from t2.micro to a larger type or the Jenkins will crash.

## Deployment

I use AWS CodeDeploy to make the deployment. The application is running in AWS EC2. Successful Jenkins build will trigger the deployment automatically.

Screenshots:  

![deployment group config](https://jimmy-demo-static-files.s3-ap-southeast-1.amazonaws.com/codedeploy-1.PNG)

![deployment records](https://jimmy-demo-static-files.s3-ap-southeast-1.amazonaws.com/codedeploy-2.PNG)

## Application URL

[Weather](http://52.76.30.89:3300/)
URL: <http://52.76.30.89:3300/>

**Notice:**  
This application was deployed in AWS Singapore region. When you access the application first time with a slow network, it will take a long time to load the page. Please wait until the loading completed.

**Production API endpoint:**  
Getting city list:  
<http://52.76.30.89:8888/api/weather/citylist>

Getting weather for Sydney:  
<http://52.76.30.89:8888/api/weather/current?city=Sydney>  
You can change the value of `city` parameter to `Melbourne` or `Wollongong`.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

You could use Angular CLI to generate components, services and so on. Please refer to Angular CLI.

## Build

Built files are in `dist` folder.

**Notice:**  
Run `npm run prod-build` to build the application for production. It **disabled** `aot` and `build-optimizer`. The reason is that my AWS EC2 resource is limited. My EC2 is t2.micro. It could not support the Jenkins to build Angular projects. When I run the build, the Jenkins will crash. Even though I changed the EC2 to t2.small (2GB memory), the build with aot and build-optimizer enabled will take long time and make the build failed.

Currently, when I need to run the build, I use t2.small EC2. After the build success, I need to change the EC2 to t2.micro to run the applications because t2.micro EC2 is free.

I didn't setup trigger for building code automatically when I pushed the code to GitHub. If you want to deploy your code to produciton env, you have to trigger the build manually.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).  
Run `npm run ci-test` to execute the unit tests via Karma with Chrome headless. This is for the testing in Jenkins.  

**Notice:**  
In Jenkins, even though the EC2 is t2.small (2GB memory), the UT is still failed occasionally because the connection to Chrome headless is timedout. You could try to build a again after waiting for a few seconds.

## Code structure

### Modules

1. app.module  
This is main module of this application.

2. custom-material.module  
This is custom config module to import Angular Material modules for UI component.

### Components

1. app.component  
Main component of this application.

2. city-dropdown.component  
This component shows dropdown for cities. User can choose any city in the dropdown to query its current weather.  

3. current-weather-table.component  
This component shows a table that contains weather information of the city.

4. error-message.component  
This is common component that shows error message in UI when service call is failed.

### Services

1. current-weather.service  
This service sends request to query cities and city's weather.

### Models

1. weather
This model keeps weather data.

### mocks

1. city-list-mock.json  
This is mock file for showing city dropdown.

2. city-weather-mock.json  
This is mock file for showing city weather.

### environments

1. environment  
This file keeps application properties for dev environment.

2. environment.prod  
This file keeps application properties for production environment.

### other files

1. Scripts in scripts folder are for AWS CodeDeploy.  

2. appspec.yml is for AWS CodeDeploy.
