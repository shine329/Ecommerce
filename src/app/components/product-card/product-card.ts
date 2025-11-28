import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';
import { RouterLink } from "@angular/router";
import { StarRating } from "../star-rating/star-rating";

@Component({
  selector: 'app-product-card',
  imports: [MatIcon, MatButton, RouterLink, StarRating],
  template: `
    <div class="relative bg-white cursor-poiinter rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl">

<img [src]="product().imageUrl" [style.view-transition-name]="'product-image-'+product().id" alt="" class="w-full h-[300px] object-cover rounded-t-xl" [routerLink]="['/product',product().id]" >

<ng-content />

<div class="flex flex-col flex-1 p-3" [routerLink]="['/product',product().id]">
  <h3 class="text-lg font-semibold text-gray-900 mb-2 loading-tight">
    {{product().name}}
  </h3>
  <p class=" text-sm text-gray-600 mb-4 flex-1 loading-relaxed">
    {{product().description}}
  </p>
  <app-star-rating class="mb-3" [rating]="product().rating">
    ({{product().reviewCount}})
  </app-star-rating>

  <div class="text-sm font-medium mb-4">
    {{product().inStock ? 'In Stock': 'Out of Stock'}}
  </div>

  <div class="flex items-center justify-between mt-auto">
    <span class="text-2xl font-bold text-gray-900">
      \₹{{[product().price]}}
    </span>
    <button matButton="filled" class="flex items-center gap-2" (click)="store.addToCart(product(),1)"  >
      <mat-icon>shopping_cart</mat-icon>
      Add to Cart
    </button>
  </div>
</div>
    </div>
  `,
  styles: ``
})
export class ProductCard {
product =input.required<Product>()
store = inject(EcommerceStore)

}
