const axios = require('axios');
const { timer, from } = require('rxjs');
const { switchMap, map } = require('rxjs/operators')
const { Population } = require('../models/population');
const { Invasions } = require('../models/invasions');
const { LatestNews } = require('../models/news');

/**
 * Starts a polling loop ever N milliseconds on call.
 * @param ttrApiType { string: population | invasions | news }
 * @param model { Population | Invasions | News }
 * @param pollingCycle { number } The time in millisecods between polling calls.
 * @return { Observable<TtrApiType> } Returns a HOT Observable emitting
 * the requested toontown api object type every 10 seconds.
 */
const pollingFor$ = (ttrApiType, Model, pollingCycle) => {
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
 * Default polling function calls for.
 * axios.get('https://www.toontownrewritten.com/api/population').then(({data}) => {console.log(data)})
 * axios.get('https://www.toontownrewritten.com/api/invasions').then(({data}) => {console.log(data)})
 * axios.get('https://www.toontownrewritten.com/api/news').then(({data}) => {console.log(data)})
 */
const population = () => pollingFor$('population', Population, 5000);
const invasions = () => pollingFor$('invasions', Invasions, 10000);
const news = () => pollingFor$('news', LatestNews, 100000);

// population().subscribe(console.log)
// invasions().subscribe(console.log)
// news().subscribe(console.log)

module.export = {
    population,
    invasions,
    news,
}
