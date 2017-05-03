import {EventEmitter, Component, Input, Output} from "@angular/core";
/**
 * example
 *
 * <alert [type]="'success|danger'" [delay]="3000" [dismiss]="true" [open]="!ShouldOpenOnDefault">
 *   This should be displayed
 * </alert>
 * @type {String}
 */
@Component({
  selector: 'alert',
  template: `
    <div class="alert alert-{{type}}" [hidden]="!open">

      <button *ngIf="dismissable" type="button" class="close" (click)="onDismissEvent($event)" aria-hidden="true">
        &times;
      </button>

      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .close {line-height: 15px;}
  `]
})
export class Alert {
  @Input('type') type: string = 'success';
  @Input('delay') delay: number = 0;
  @Input('dismiss') dismissable;
  @Input('open')  open: boolean = true;

  @Output() onDismiss = new EventEmitter<any>();

  ngOnInit(){}

  ngOnChanges(changes){
    // console.log('changes');

    this.onDelay();
  }

  onDelay(){
    // console.log('delay');
    if(this.delay > 0){
      setTimeout(()=> this.dismiss(), this.delay)
    }
  }

  onDismissEvent(e){
    this.dismiss();
    this.onDismiss.emit()
    e.preventDefault()
  }

  /**
   * @todo Do `onDelay` when `this.open` changes
   * `this.onDelay()` puts it in a continous loop
   */
  toggle(state = !this.open){
    this.open = state;
    // this.onDelay();
  }

  dismiss = () => this.toggle(false);

  show = () => this.toggle(true);
}
