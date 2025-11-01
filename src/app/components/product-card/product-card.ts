import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-product-card',
  imports: [MatIcon,MatButton],
  template: `
    <div class="relative bg-white cursor-poiinter rounded-xl shadow-lg overflow-hidden flex flex-col h-full">

<img [src]="product().imageUrl" alt="" class="w-full h-[300px] object-cover rounded-t-xl">

<ng-content />
<div class="flex flex-col flex-1 p-3">
  <h3 class="text-lg font-semibold text-gray-900 mb-2 loading-tight">
    {{product().name}}
  </h3>
  <p class=" text-sm text-gray-600 mb-4 flex-1 loading-relaxed">
    {{product().description}}
  </p>

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
