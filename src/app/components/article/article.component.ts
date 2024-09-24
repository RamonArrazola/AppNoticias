import { Component, Input} from '@angular/core';
import { Article } from 'src/app/Interfaces';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article!: Article;
  @Input() i: number = 0;

  constructor() { }

}
