import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../Interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ];

  public Articles: Article[] = [];

  public selectedC: string = this.categories[0];

  constructor(private NewsService: NewsService) {}

  ngOnInit(){
    this.NewsService.getTopHeadlinesCategory(this.selectedC).subscribe((Articles) => {
      this.Articles = [...this.Articles, ...Articles];
    });
  }
  
  segmentChanged(event: any) {
    this.selectedC = event.detail.value;
    this.NewsService.getTopHeadlinesCategory(this.selectedC).subscribe((Articles) => {
      this.Articles = [...Articles];
    });
  }
}
