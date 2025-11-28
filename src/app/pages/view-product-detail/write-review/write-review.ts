import { Component, inject, signal } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from "@angular/forms";
import { MatInput } from "@angular/material/input";
import { OptionItem } from '../../../models/option-item';
import { MatAnchor } from "@angular/material/button";
import { MatSelect, MatOption } from "@angular/material/select";
import { EcommerceStore } from '../../../ecommerce-store';
import { AddReviewParams } from '../../../models/user-review';

@Component({
  selector: 'app-write-review',
  imports: [ViewPanel, MatFormField, MatLabel, ɵInternalFormsSharedModule, MatInput, ReactiveFormsModule, MatAnchor, MatSelect, MatOption],
  template: `
<div appViewPanel>
  <h2 class="text-xl font-semibold mb-6">Write a Review</h2>
  <form [formGroup]="reviewForm" (ngSubmit)="saveReview()">
<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
<mat-form-field>
  <mat-label>Review Title</mat-label>
  <input type="text"
  formControlName="title"
  placeholder="summarize your thoughts"
  matInput>
</mat-form-field>
<mat-form-field>
  <mat-select formControlName="rating">
@for (option of ratingOptions(); track option.value) {
<mat-option [value]="option.value">{{option.label}}</mat-option>
}
  </mat-select>
</mat-form-field>
<mat-form-field class="col-span-2">
  <mat-label>Review</mat-label>
  <textarea
  matInput
  placeholder="Tell others about your experience with this product"
  formControlName="comment"
  type="text"
  rows="4"></textarea>
</mat-form-field>
</div>
<div class="flex gap-4">
<button matButton="filled" type="submit" [disabled]="store.loading()">
  {{store.loading()? 'Submitting...':'Submit Review'}}
</button>
<button matButton="outlined" type="button" (click)="store.hideWiriteReview()">Cancel</button>
</div>
  </form>
</div>
  `,
  styles: ``,
  host:{
    class:'block'
  }
})
export class WriteReview {
  fb = inject(NonNullableFormBuilder);

  ratingOptions = signal<OptionItem[]>([
    {label:'5 Stars - Excellent', value:5},
    {label:'4 Stars - Goood', value:4},
    {label:'3 Stars - Excellent', value:3},
    {label:'2 Stars - Poor', value:2},
    {label:'1 Stars - Terrile', value:1},
  ])
reviewForm = this.fb.group({
  title:['',Validators.required],
  comment:['',Validators.required],
  rating:['',Validators.required]
})

store = inject(EcommerceStore)

saveReview(){
  if(!this.reviewForm.valid){
    this.reviewForm.markAllAsTouched();
    return;
  }

  const { title, comment, rating } = this.reviewForm.value;
  this.store.addReview({ title, comment, rating:Number(rating) } as AddReviewParams);
}
}
