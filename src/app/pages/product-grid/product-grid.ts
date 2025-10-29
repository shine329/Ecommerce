import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import {
  MatNavList,
  MatListItem,
  MatListItemTitle,
} from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';
@Component({
  selector: 'app-product-grid',
  imports: [
    ProductCard,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    TitleCasePipe,
    ToggleWishlistButton,
  ],
  template: `
    <mat-sidenav-container class="h-full">
      <mat-sidenav mode="side" opened="true">
        <div class="p-6">
          <h2 class="text-lg text-gray-900">Categories</h2>

          <mat-nav-list>
            @for (cat of categories(); track cat) {
            <mat-list-item
              [activated]="cat === category()"
              class="my-2"
              [routerLink]="['/products', cat]"
            >
              <span
                matListItemTitle
                [class]="cat === category() ? '!text-white' : null"
              >
                {{ cat | titlecase }}</span
              >
            </mat-list-item>
            }
          </mat-nav-list>
        </div>
      </mat-sidenav>
      <mat-sidenav-content class="bg-grey-100 p-6 h-full">
        <h1 class="text-2xl font-bold text-gray-900 mb-1">
          {{ category() | titlecase }}
        </h1>
        <p class="mb-6 text-base text-gray-600">
          {{ store.filteredProducts().length }} products found
        </p>

        <div class="responsive-grid">
          @for (product of store.filteredProducts(); track product.id) {
          <app-product-card
            [product]="product"
            (addToCartClicked)="clicked($event)"
          >
            <app-toggle-wishlist-button
              class="!absolute z-10 top-3 right-3 "
              [product]="product"
            />
          </app-product-card>
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductGrid {
  category = input<string>('all');
  store = inject(EcommerceStore);

  categories = signal<string[]>([
    'all',
    'electronics',
    'accessories',
    'home',
    'footwear',
    'sports',
  ]);

  constructor() {
    this.store.setCategory(this.category);
  }

  clicked(event: any) {
    console.log(event);
  }
}
