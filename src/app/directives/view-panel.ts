import { Directive } from '@angular/core';

@Directive({
  selector: '[appViewPanel]',
  host:{
    class:'border border-[#009774] rounded-xl p-6 bg-white'
  }
})
export class ViewPanel {

  constructor() { }

}
