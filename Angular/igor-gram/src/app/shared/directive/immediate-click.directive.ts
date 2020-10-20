import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[immediateClick]'
})
export class ImmediateClickDirective implements OnInit{

  constructor(private elementref: ElementRef) { }

  ngOnInit(): void {
    this.elementref.nativeElement.click();
  }

}
