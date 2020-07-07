import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { LatestNews } from './../models/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent implements OnChanges {

  @Input() news: LatestNews;

  constructor() { }

  ngOnChanges() {
    if (this.news && this.news.body) {
      document.getElementById('news').innerHTML = this.news.body;
    }
  }

}
