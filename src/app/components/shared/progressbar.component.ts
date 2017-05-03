import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'progress-bar',
  template: `
    <progress class="progress" [value]="count$ | async" [max]="max"></progress>
  `,
  styles: [`
    progress[value] {
      -webkit-appearance: none;
      width: 80%;
      height: 5px;
      display: block;
      margin: 3pt auto;
    }
      progress[value]::-webkit-progress-bar {
        background-color: #eee;
        border-radius: 1em;
      }
      progress[value]::-webkit-progress-value {
        border-radius: 1em;
        background-color: '#e91e63';
      }
  `],
})
export class ProgressBar {
  @Input() max: number = 100;
  @Input() color: string = '#e91e63';
  count$: Observable<number>;

  /*
  Increment by 20 every second and restart every 5seconds
   */
  constructor(){
    this.count$ = Observable.timer(0, 5000).flatMap(() => Observable.interval(1000).scan((acc, cur) => acc+20, 0));
  }
}
