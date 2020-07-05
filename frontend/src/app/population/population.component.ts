import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

import { Population } from '../models/population';

@Component({
  selector: 'app-population',
  templateUrl: './population.component.html',
  styleUrls: ['./population.component.less']
})
export class PopulationComponent implements OnChanges {
  /**
   * Population object from the api.
   */
  @Input() population: Population;
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
    this.buildHighChartsTheme();
    this.chartOptions = this.buildHighChartsConfig();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.population.currentValue && this.chartInstance) {
      console.log(changes.population.currentValue, this.chartInstance)
      this.chartInstance.context.series[0].update({
        data: this.format(),
      });
      this.chartInstance.context.title.update({
        text: `Population (${this.population.totalPopulation})`,
      });
      this.chartInstance.context.subtitle.update({
        text: `Toontown Rewritten population as of ${this.population.lastUpdated}`
      });
    }
  }

  /**
   * Waits for the chart to load then on load emits the chart.
   * @param chartInstance Instance of a the chart for updating
   */
  chartLoad(chartInstance) {
    this.chartInstance = chartInstance;
  }

  private buildHighChartsConfig() {
    return {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Population'
      },
      subtitle: {
        text: 'Toontown Rewritten population realtime'
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: '\'Unica One\', sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Population'
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: 'Current district Population: <b>{point.y:1f}</b>'
      },
      series: [{
        name: 'Population',
        data: [],
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:1f}',
          y: 10,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      }]
    };
  }

  private buildHighChartsTheme() {
    Highcharts.setOptions({
      colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
      chart: {
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
          stops: [
            [0, '#2a2a2b'],
            [1, '#3e3e40']
          ]
        },
        style: {
          fontFamily: '\'Unica One\', sans-serif'
        },
        plotBorderColor: '#606063'
      },
      title: {
        style: {
          color: '#E0E0E3',
          textTransform: 'uppercase',
          fontSize: '20px'
        }
      },
      subtitle: {
        style: {
          color: '#E0E0E3',
          textTransform: 'uppercase'
        }
      },
      xAxis: {
        gridLineColor: '#707073',
        labels: {
          style: {
            color: '#E0E0E3'
          }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
          style: {
            color: '#A0A0A3'
          }
        }
      },
      yAxis: {
        gridLineColor: '#707073',
        labels: {
          style: {
            color: '#E0E0E3'
          }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
          style: {
            color: '#A0A0A3'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
          color: '#F0F0F0'
        }
      },
      plotOptions: {
        series: {
          dataLabels: {
            color: '#F0F0F3',
            style: {
              fontSize: '13px'
            }
          },
          marker: {
            lineColor: '#333'
          }
        },
        boxplot: {
          fillColor: '#505053'
        },
        candlestick: {
          lineColor: 'white'
        },
        errorbar: {
          color: 'white'
        }
      },
      legend: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        itemStyle: {
          color: '#E0E0E3'
        },
        itemHoverStyle: {
          color: '#FFF'
        },
        itemHiddenStyle: {
          color: '#606063'
        },
        title: {
          style: {
            color: '#C0C0C0'
          }
        }
      },
      credits: {
        style: {
          color: '#666'
        }
      },
      drilldown: {
        activeAxisLabelStyle: {
          color: '#F0F0F3'
        },
        activeDataLabelStyle: {
          color: '#F0F0F3'
        }
      },
      navigation: {
        buttonOptions: {
          symbolStroke: '#DDDDDD',
          theme: {
            fill: '#505053'
          }
        }
      },
      // scroll charts
      rangeSelector: {
        buttonTheme: {
          fill: '#505053',
          stroke: '#000000',
          style: {
            color: '#CCC'
          },
          states: {
            hover: {
              fill: '#707073',
              stroke: '#000000',
              style: {
                color: 'white'
              }
            },
            select: {
              fill: '#000003',
              stroke: '#000000',
              style: {
                color: 'white'
              }
            }
          }
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
          backgroundColor: '#333',
          color: 'silver'
        },
        labelStyle: {
          color: 'silver'
        }
      },
      navigator: {
        handles: {
          backgroundColor: '#666',
          borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: {
          color: '#7798BF',
          lineColor: '#A6C7ED'
        },
        xAxis: {
          gridLineColor: '#505053'
        }
      },
      scrollbar: {
        barBackgroundColor: '#808083',
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#FFF',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
      }
    });
  }

  private format() {
    return this.population &&
      this.population.toHighCharts().sort((a, b) => a[0].localeCompare(b[0]));
  }
}
