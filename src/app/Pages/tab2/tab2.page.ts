import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../Interfaces';
import { IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild( IonInfiniteScroll, {static: true} ) infiniteScroll!: IonInfiniteScroll;

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
  
  segmentChanged(event: Event) {
    this.selectedC = (event as CustomEvent).detail.value;
    this.NewsService.getTopHeadlinesCategory(this.selectedC).subscribe((Articles) => {
      this.Articles = [...Articles];
    });
  }

  loadData(){
    this.NewsService.getTopHeadlinesCategory(this.selectedC, true)
    .subscribe((articles) => {
      if (articles.length === this.Articles.length){
        this.infiniteScroll.disabled = true;
        return;
      }
      this.Articles = articles;
      this.infiniteScroll.complete();
    });
  }
}
