import * as moment from 'moment';
/**
 * district: string
 * cog: string;
 * startTime: timestamp
 * defeated: number
 * remaining: number
 */
export class Invasion {
    /**
     * The distric the invasion is taking place in.
     * { string }
     */
    district: string;
    /**
     * The cog type the invasion is.
     * { string }
     */
    cog: string;
    /**
     * The time the invasion started.
     */
    startTime;
    /**
     * The number of defeated cogs in the invasion.
     * { number }
     */
    defeated: number;
    /**
     * The number of remaining cogs in the invasion.
     * { number }
     */
    remaining: number;

    constructor(district, { asOf, type, progress }) {
        const [defeated, remaining] = progress.split('/');
        this.district = district;
        this.cog = type;
        this.startTime = moment(asOf);
        this.defeated = Number(defeated);
        this.remaining = Number(remaining);
    }
}

/**
 * lastUpdated {timestamp}
 * invasions {Invasion[]}
 */
export class Invasions {
    /**
     * Timestamp when the api call was made.
     */
    lastUpdated: any;
    /**
     * { Invasion[] }
     */
    invasions: Invasion[];

    constructor({ data }) {
        this.lastUpdated = moment(data.lastUpdated)
        this.invasions = this.invasionsFromApi(data.invasions);
    }

    /**
     * Maps the data from the api into an array of invasion type classes.
     * @param { 
     *  [district: string]: {
     *      asOf: epoch timestamp number,
     *      type: string,
     *      progress: string
     *  }
     * } invasionObj 
     */
    invasionsFromApi(invasionObj) {
        return Object.keys(invasionObj)
            .map(district => new Invasion(district, invasionObj[district]));
    }
}
