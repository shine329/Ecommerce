import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { EcommerceStore } from '../../ecommerce-store';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIconButton,MatIcon],
  template: `
            <button 
matIconButton 
[class]="isInWishlist()?  '!text-red-500':'text-gray-500'"
(click)="toggleWishlist(product())"
>
<mat-icon>{{isInWishlist()?  'favorite':'favorite_border'}}</mat-icon>
</button>
  `,
  styles: ``
})
export class ToggleWishlistButton {
store = inject(EcommerceStore)

product =input.required<Product>()

isInWishlist = computed(()=> this.store.wishlistItems().find(p => p.id === this.product().id))

toggleWishlist(product:Product){
if(this.isInWishlist()){
this.store.removeFromWishlist(product)
}else {
  this.store.addToWishlist(product)
}
}
}
