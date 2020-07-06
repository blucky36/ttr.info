import * as moment from 'moment';

const cogHash = {
    'Cold Caller': 'sell',
    'Telemarketer': 'sell',
    'Name Dropper': 'sell',
    'Glad Hander': 'sell',
    'Mover & Shaker': 'sell',
    'Two Face': 'sell',
    'The Mingler': 'sell',
    'Mr. Hollywood': 'sell',
    'Short Change': 'cash',
    'Penny Pincher': 'cash',
    'Tightwad': 'cash',
    'Bean Counter': 'cash',
    'Number Cruncher': 'cash',
    'Money Bags': 'cash',
    'Loan Shark': 'cash',
    'Robber Baron': 'cash',
    'Bottom Feeder': 'law',
    'Bloodsucker': 'law',
    'Double Talker': 'law',
    'Ambulance Chaser': 'law',
    'Back Stabber': 'law',
    'Spin Doctor': 'law',
    'Legal Eagle': 'law',
    'Big Wig': 'law',
    'Flunky': 'boss',
    'Pencil Pusher': 'boss',
    'Yesman': 'boss',
    'Micromanager': 'boss',
    'Downsizer': 'boss',
    'Head Hunter': 'boss',
    'Corporate Raider': 'boss',
    'The Big Cheese': 'boss',
};

/**
 * district: string
 * cog: string;
 * startTime: timestamp
 * defeated: number
 * remaining: number
 */
export class Invasion {
    /**
     * Cashbot sellbot bossbot lawbot.
     */
    botType: string;
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
    startTime: any;
    /**
     * The number of defeated cogs in the invasion.
     * { number }
     */
    defeated: number;
    /**
     * The total number of cogs the invasion gave.
     */
    total: number;
    /**
     * The number of remaining cogs in the invasion.
     * { number }
     */
    value: number;

    constructor(district, { asOf, type, progress }) {
        const [defeated, total] = progress.split('/');
        this.district = district;
        this.cog = type;
        this.startTime = moment(Number(asOf) * 1000);
        this.defeated = Number(defeated);
        this.total = Number(total);
        this.value = total - defeated;
        this.botType = cogHash[type];
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
        this.lastUpdated = moment(Number(data.lastUpdated) * 1000)
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

    /**
     * Create a series for highcharts.
     */
    createSeriesOfType(name: string) {
        return {
            name,
            data: this.invasions.filter(inv => inv.botType === name)
        };
    }
}
