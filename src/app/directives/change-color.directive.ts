import {
  Directive, OnInit, OnDestroy, Input, Output, EventEmitter, HostListener, ElementRef, Renderer2
} from '@angular/core';

@Directive({
  selector: '[appChangeColor]',
  exportAs: 'appChangeColor'
})
export class ChangeColorDirective {

  // tslint:disable-next-line:no-input-rename

  constructor(private hostElement: ElementRef,
    private renderer: Renderer2) { }

  @HostListener('mouseenter')
  onEnter() {
    this.renderer
      .setStyle(this.hostElement.nativeElement,
        'background-color',
        'red');
  }

  @HostListener('mouseleave')
  onLeave() {
    this.renderer
    .removeStyle(this.hostElement.nativeElement,
              'background');
  }
}
