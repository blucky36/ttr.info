import * as moment from 'moment';

/**
 * lastUpdated: timestamp
 * totalPopulation: number
 * populationByDistrict: { [district: string]: number }
 * districtsToArray: function(): { district: string, population: number }[]
 */
export class Population {
    /**
     * Timestamp translated to human readable form from moment.
     */
    lastUpdated: any;
    /**
     * Total population integer currently in game.
     */
    totalPopulation: number;
    /**
     * A hash of populations by district.
     */
    populationByDistrict: { [district: string]: number };

    constructor({ data }) {
        this.lastUpdated = moment(Number(data.lastUpdated) * 1000).format('dddd, MMMM Do YYYY, h:mm:ss a');
        this.totalPopulation = data.totalPopulation;
        this.populationByDistrict = data.populationByDistrict;
    }

    /**
     * @return { { district: string, population: number }[] }
     */
    districtsToArray(): {district: string, population: number}[] {
        return Object.keys(this.populationByDistrict)
            .map(district => ({
                district,
                population: Number(this.populationByDistrict[district]),
            }));
    }

    /**
     * Highchart display formatter.
     */
    toHighCharts(): any[][] {
        const res = [];
        for (const dist in this.populationByDistrict) {
            res.push([`${dist} (${this.populationByDistrict[dist]})`, this.populationByDistrict[dist]]);
        }
        return res;
    }
}
