import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopulationComponent } from './population/population.component';
import { TtrServiceService } from './ttr-service.service';
import { NewsComponent } from './news/news.component';
import { InvasionsComponent } from './invasions/invasions.component';

/**
 * This is for the new version of Highcharts which fires a missing HighchartsStatic error.
 * https://github.com/gevgeny/angular2-highcharts/issues/178
 */
declare var require: any;
export function highchartsFactory() {
  return require('highcharts');
}

@NgModule({
  declarations: [
    AppComponent,
    PopulationComponent,
    NewsComponent,
    InvasionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
  ],
  providers: [
    TtrServiceService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
