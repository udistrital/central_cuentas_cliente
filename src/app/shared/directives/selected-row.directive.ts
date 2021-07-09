import { Directive, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[ngxSelectedRow]'
})
export class SelectedRowDirective implements OnChanges {

  @Input() myRow: any;
  @Input() selectedRow: any;

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedRow) {
      this.highlightRow();
    }
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.addClass(this.element.nativeElement, 'bg-light-gray');
    this.highlightRow();
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.removeClass(this.element.nativeElement, 'bg-light-gray');
    this.highlightRow();
  }

  private highlightRow() {
    if (this.selectedRow !== null) {
      if (this.myRow.data === this.selectedRow.data) {
        this.renderer.addClass(this.element.nativeElement, 'font-weight-bold');
        this.renderer.addClass(this.element.nativeElement, 'bg-primary-800');
        this.renderer.addClass(this.element.nativeElement, 'text-light');
        this.renderer.removeClass(this.element.nativeElement, 'bg-light-gray');
      } else {
        this.renderer.removeClass(this.element.nativeElement, 'font-weight-bold');
        this.renderer.removeClass(this.element.nativeElement, 'bg-primary-800');
        this.renderer.removeClass(this.element.nativeElement, 'text-light');
      }
    }
  }

}
