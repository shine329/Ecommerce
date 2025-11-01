import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { EcommerceStore } from '../../ecommerce-store';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header-actions',
  imports: [MatButton, MatIconButton, MatIcon, MatBadge, RouterLink],
  template: `
    <div class="flex items-center gap-2">
      <button matIconButton routerLink="/wishlist" [matBadge]="store.wishlistCount()" [matBadgeHidden]="store.wishlistCount() === 0">
        <mat-icon>favorite</mat-icon>
      </button>
      <button matIconButton routerLink="/view-cart"  [matBadge]="store.cartItemsCount()" [matBadgeHidden]="store.cartItemsCount() === 0" >
        <mat-icon>shopping_cart</mat-icon>
      </button>
      <button matButton>Sign In</button>
      <button matButton="filled">Sign Up</button>
    </div>
  `,
  styles: ``,
})
export class HeaderActions {

  store = inject(EcommerceStore)
}
