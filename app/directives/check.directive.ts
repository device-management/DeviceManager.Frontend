import { Directive, ElementRef  } from '@angular/core';

@Directive({
  selector: '[check]'
})
export class CheckDirective {
    
  constructor(el: ElementRef) { 
      jQuery(el.nativeElement).iCheck({ 
        checkboxClass: 'icheckbox_minimal-grey',
        radioClass: 'iradio_minimal-grey'});
  }
}