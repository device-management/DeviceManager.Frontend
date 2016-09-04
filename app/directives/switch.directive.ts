import { Directive, ElementRef, Output, Input, EventEmitter, OnInit  } from '@angular/core';

@Directive({
  selector: '[switch]'
})
export class SwitchDirective implements OnInit {

  constructor(private el: ElementRef) { 
    this.onSwitchChange = new EventEmitter<boolean>();
  }

  ngOnInit(){
    let onSwitchChange = this.onSwitchChange;
    // jQuery(this.el.nativeElement).bootstrapSwitch({ state: this.state });
    // jQuery(this.el.nativeElement).on('switchChange.bootstrapSwitch', function(event, state) {
    //     onSwitchChange.emit(state);
    // });
  }

  @Input() state : boolean;

  @Output() 
  public onSwitchChange : EventEmitter<boolean>;

}