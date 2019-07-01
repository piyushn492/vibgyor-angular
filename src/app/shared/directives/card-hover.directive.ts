import { Directive, HostListener } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';

@Directive({
  selector: '[appCardHover]'
})
export class CardHoverDirective {

  constructor(private el: ElementRef,
    private renderer: Renderer2) {
  }

  @HostListener('mouseenter')
  onEnter() {
    this.renderer
      .setStyle(this.el.nativeElement,
        'opacity',
        '0.7');
  }

  @HostListener('mouseleave')
  onLeave() {
    this.renderer
    .removeStyle(this.el.nativeElement,
              'opacity');
  }

}
