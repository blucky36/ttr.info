import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TtrServiceService } from './ttr-service.service';
import { Population } from './models/population';
import { LatestNews } from './models/news';
import { Invasions } from './models/invasions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy{
  /**
   * Global population object for toontown rewritten.
   */
  population: Population;
  /**
   * Latest news object for toontown rewritten.
   */
  news: LatestNews;
  /**
   * Invasion metrics for toontown rewritten.
   */
  invasions: Invasions;

  private subscriptions: Subscription[] = [];
  
  constructor(private ttr: TtrServiceService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.ttr.population$().subscribe(pop => this.population = pop),
      this.ttr.invasions$().subscribe(invs => this.invasions = invs),
      this.ttr.news$().subscribe(news => this.news = news),
    );
    window.setTimeout(() => {
      console.log(this.population, this.invasions, this.news)
    },100)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
