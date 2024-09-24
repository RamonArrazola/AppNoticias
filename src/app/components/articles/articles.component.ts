import { Component, Input } from '@angular/core';
import { Article } from 'src/app/Interfaces';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent {

  @Input() Articles: Article[] = [];

  constructor() { }

}
