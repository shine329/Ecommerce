import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar'
import { HeaderActions } from "../header-actions/header-actions";
@Component({
  selector: 'app-header',
  imports: [HeaderActions, MatToolbar],
  template: `
<mat-toolbar class="w-full elevated py-2">
  <div class=" mx-auto w-full flex items-center justify-between"> <span>
<h1 class="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-800 bg-clip-text text-transparent">
  Life Styles
</h1>
  </span> 
      <app-header-actions />
  </div>
</mat-toolbar>

  `,
  styles: ``
})
export class Header {

}
