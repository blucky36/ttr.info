const moment = require('moment');

/**
 * district: string
 * cog: string;
 * startTime: timestamp
 * defeated: number
 * remaining: number
 */
class Invasion {
    /**
     * The distric the invasion is taking place in.
     * { string }
     */
    district;
    /**
     * The cog type the invasion is.
     * { string }
     */
    cog;
    /**
     * The time the invasion started.
     */
    startTime;
    /**
     * The number of defeated cogs in the invasion.
     * { number }
     */
    defeated;
    /**
     * The number of remaining cogs in the invasion.
     * { number }
     */
    remaining;

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
class Invasions {
    /**
     * Timestamp when the api call was made.
     */
    lastUpdated;
    /**
     * { Invasion[] }
     */
    invasions;

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

module.exports = { Invasion, Invasions }
