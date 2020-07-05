import axios from "axios";
import { Injectable } from '@angular/core';
import { timer, from, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Population } from './models/population';
import { Invasions } from './models/invasions';
import { LatestNews } from './models/news';


@Injectable({
  providedIn: 'root'
})
export class TtrServiceService {

  constructor() {}

  /**
   * Starts a polling loop ever N milliseconds on call.
   * @param ttrApiType { string: population | invasions | news }
   * @param model { Population | Invasions | News }
   * @param pollingCycle { number } The time in millisecods between polling calls.
   * @return Returns a HOT Observable emitting
   * the requested toontown api object type every 10 seconds.
   */
  private pollingFor$<T> (ttrApiType: string, Model: any, pollingCycle: number): Observable<T> {
    return timer(1, pollingCycle).pipe(
        switchMap(
            _ => from(
                axios.get(`https://www.toontownrewritten.com/api/${ttrApiType}`)
            ).pipe(
                map(res => new Model(res))
            )
        )
    );
  }

  /**
   * Starts a polling loop returning district populations and metrics.
   */
  population$ = () => this.pollingFor$<Population>('population', Population, 5000);

  /**
   * Starts a polling loop returning invasion metrics.
   */
  invasions$ = () => this.pollingFor$<Invasions>('invasions', Invasions, 10000);

  /**
   * Starts a polling loop returning the latest news.
   */
  news$ = () => this.pollingFor$<LatestNews>('news', LatestNews, 100000);

}
// population().subscribe(console.log)
// invasions().subscribe(console.log)
// news().subscribe(console.log)
