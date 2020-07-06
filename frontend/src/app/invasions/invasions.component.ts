import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
require('highcharts/highcharts-more')(Highcharts)

import { Invasion, Invasions } from '../models/invasions';

@Component({
  selector: 'app-invasions',
  templateUrl: './invasions.component.html',
  styleUrls: ['./invasions.component.less']
})
export class InvasionsComponent implements OnInit, OnChanges {
  /**
   * Invasions response from the api.
   */
  @Input() invasions: Invasions;

  /**
   * The stupid massive config for a chart.
   */
  chartOptions: any;
  /**
   * Instance of the chart to update with changes to the population.
   */
  chartInstance: any;

  constructor() { }

  ngOnInit() {
    this.chartOptions = this.buildChartConfig();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    if (changes.invasions.currentValue && this.chartInstance) {
      console.log(this.chartInstance.context.series)
      this.chartInstance.context.series.forEach(s => {
        // console.log(s, this.invasions.createSeriesOfType(s))
        s.update(this.invasions.createSeriesOfType(s.name.toLowerCase()))
      });
    }
  }

  chartLoad(chartInstance) {
    this.chartInstance = chartInstance;
  }

  /**
   * Builds the invasion chart config.
   */
  private buildChartConfig() {
    return {
      chart: {
        type: 'packedbubble',
        height: '100%',
        animation: false,
      },
      title: {
        text: 'Invasion Tracking'
      },
      tooltip: {
        useHTML: true,
        pointFormat: '<table><thead><tr><th>Cog</th><th>District</th><th>Defeated</th><th>Remaining</th><th>Total</th></tr></thead><tbody><tr><td>{point.cog}</td><td>{point.district}</td><td>{point.defeated}</td><td>{point.value}</td><td>{point.total}</td></tr></tbody></table>'
      },
      plotOptions: {
        packedbubble: {
          minSize: '20%',
          maxSize: '100%',
          zMin: 0,
          zMax: 100000,
          layoutAlgorithm: {
            gravitationalConstant: 0.05,
            splitSeries: true,
            seriesInteraction: false,
            dragBetweenSeries: false,
            parentNodeLimit: true
          },
          dataLabels: {
            enabled: true,
            format: '{point.cog}',
            filter: {
              property: 'y',
              operator: '>',
              value: 250
            },
            style: {
              color: 'black!important',
              textOutline: 'none',
              fontWeight: 'normal'
            }
          }
        }
      },
      series: [
        {
          name: 'Sell',
          data: []
        },
        {
          name: 'Cash',
          data: []
        }, {
          name: 'Boss',
          data: []
        }, {
          name: 'Law',
          data: []
        }
      ]
    };
  }

}
