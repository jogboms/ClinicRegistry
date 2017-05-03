import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[nwsaveas]'
})
export class NwSaveAs {
  @Input('nwsaveas') filename;

  constructor(private el: ElementRef, private renderer: Renderer) {}

  ngOnInit() {
    this.renderer.setElementProperty(this.el.nativeElement, 'nwsaveas', this.filename)
  }
}
