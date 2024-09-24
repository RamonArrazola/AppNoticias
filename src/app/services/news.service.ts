import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse, ArticlesByCategoryAndPages } from '../Interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private articlesByCategoryAndPages: ArticlesByCategoryAndPages = {};

  constructor(private http: HttpClient) { }

  private executeQuery<T>(endpoint: string){
    return this.http.get<T>(`${ apiUrl }${ endpoint }`,{
      params: {
        apiKey: apiKey,
        country: 'us',
      }
    })
  }

  getTopHeadlines():Observable<Article[]>{
    return this.executeQuery<NewsResponse>(`/top-headlines?sources=techcrunch`).pipe(
      map(({ articles }) => articles)
    );
  }

  getTopHeadlinesCategory(category: string, loadMore: Boolean = false):Observable<Article[]>{

    if(loadMore){
      this.getArticlesByCategory(category);
    }

    if (this.articlesByCategoryAndPages[category]){
      return of(this.articlesByCategoryAndPages[category].articles);
    }

    return this.getArticlesByCategory(category);
  }

  private getArticlesByCategory(category: string): Observable<Article[]>{
    if(Object.keys(this.articlesByCategoryAndPages).includes(category) ){
      //No hacer nada
    }
    else{ 
      this.articlesByCategoryAndPages[category] = {
        page: 0,
        articles: []
      }
    }
    const page = this.articlesByCategoryAndPages[category].page + 1; 
    return this.executeQuery<NewsResponse>(`/top-headlines?category=${category}&page=${page}`).pipe(
      map(({ articles }) => {

        if(articles.length === 0) return this.articlesByCategoryAndPages[category].articles; 

        this.articlesByCategoryAndPages[category] = {
          page: page,
          articles: [...this.articlesByCategoryAndPages[category].articles, ...articles]
        }
        return this.articlesByCategoryAndPages[category].articles; 
      })
    );
  }
}

