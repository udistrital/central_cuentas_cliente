import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ngxMouseOver]'
})
export class MouseOverDirective {


  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.element.nativeElement, 'color', '#343a40');
  }

  @HostListener('mouseenter')
  public onMouseEnter() {
    this.renderer.setStyle(this.element.nativeElement, 'color', '#dd9900');
  }

  @HostListener('mouseleave')
  public onMouseLeave() {
    this.renderer.setStyle(this.element.nativeElement, 'color', ' #343a40');
  }


}
