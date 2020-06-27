const moment = require('moment');

/**
 * lastUpdated: timestamp
 * totalPopulation: number
 * populationByDistrict: { [district: string]: number }
 * districtsToArray: function(): { district: string, population: number }[]
 */
class Population {
    /**
     * Timestamp translated to human readable form from moment.
     */
    lastUpdated;
    /**
     * Total population integer currently in game.
     */
    totalPopulation;
    /**
     * A hash of populations by district.
     */
    populationByDistrict;

    constructor({ data }) {
        this.lastUpdated = moment(data.lastUpdated);
        this.totalPopulation = data.totalPopulation;
        this.populationByDistrict = data.populationByDistrict;
    }

    /**
     * @return { { district: string, population: number }[] }
     */
    districtsToArray() {
        return Object.keys(this.populationByDistrict)
            .map(district => ({
                district,
                population: this.populationByDistrict[district],
            }));
    }
}

module.exports = { Population };