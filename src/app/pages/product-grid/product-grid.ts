import { Component, computed, input, signal } from '@angular/core';
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
import { RouterLink } from "@angular/router";
import { TitleCasePipe } from '@angular/common';
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
    TitleCasePipe
],
  template: `
    <mat-sidenav-container class="h-full">
      <mat-sidenav mode="side" opened="true">
        <div class="p-6">
          <h2 class="text-lg text-gray-900">Categories</h2>

          <mat-nav-list>
            @for (cat of categories(); track cat) {
            <mat-list-item [activated]="cat === category()" class="my-2" [routerLink]="['/products',cat]">
              <span matListItemTitle [class]="cat === category() ? '!text-white':null" > {{ cat |titlecase }}</span>
            </mat-list-item>
            }
          </mat-nav-list>
        </div>
      </mat-sidenav>
      <mat-sidenav-content class="bg-grey-100 p-6 h-full">
        <h1 class="text-2xl font-bold text-gray-900 mb-1">{{ category() |titlecase }}</h1>
        <p class="mb-6 text-base text-gray-600">
          {{filteredProducts().length }} products found
        </p>

        <div class="responsive-grid">
          @for (product of filteredProducts(); track product.id) {
          <app-product-card [product]="product" (addToCartClicked)="clicked($event)" />
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductGrid {
  category = input<string>('all');
  products = signal<Product[]>([
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 129.99,
      imageUrl:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      rating: 4.5,
      reviewCount: 234,
      inStock: true,
      category: 'Electronics',
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      description: 'Track your heart rate, steps, and workouts with precision',
      price: 199.99,
      imageUrl:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      rating: 4.3,
      reviewCount: 189,
      inStock: true,
      category: 'Electronics',
    },
    {
      id: '3',
      name: 'Organic Cotton T-Shirt',
      description:
        'Comfortable and sustainable cotton t-shirt in various colors',
      price: 29.99,
      imageUrl:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      rating: 4.2,
      reviewCount: 156,
      inStock: true,
      category: 'Clothing',
    },
    {
      id: '4',
      name: 'Ceramic Coffee Mug',
      description: 'Handcrafted ceramic mug perfect for your morning coffee',
      price: 19.99,
      imageUrl:
        'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&h=500&fit=crop',
      rating: 4.7,
      reviewCount: 89,
      inStock: true,
      category: 'Home',
    },
    {
      id: '5',
      name: 'Professional Camera',
      description: 'DSLR camera with 24MP sensor and 4K video recording',
      price: 899.99,
      imageUrl:
        'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop',
      rating: 4.8,
      reviewCount: 312,
      inStock: false,
      category: 'Electronics',
    },
    {
      id: '6',
      name: 'Yoga Mat',
      description: 'Non-slip yoga mat for comfortable workouts and meditation',
      price: 39.99,
      imageUrl:
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop',
      rating: 4.4,
      reviewCount: 167,
      inStock: true,
      category: 'Sports',
    },
    {
      id: '7',
      name: 'Stainless Steel Water Bottle',
      description:
        'Keep your drinks hot or cold for hours with this insulated bottle',
      price: 34.99,
      imageUrl:
        'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500&h=500&fit=crop',
      rating: 4.6,
      reviewCount: 278,
      inStock: true,
      category: 'Sports',
    },
    {
      id: '8',
      name: 'Wooden Desk Organizer',
      description:
        'Elegant wooden organizer to keep your desk tidy and productive',
      price: 45.99,
      imageUrl:
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop',
      rating: 4.1,
      reviewCount: 94,
      inStock: true,
      category: 'Office',
    },
    {
      id: '9',
      name: 'Running Shoes',
      description:
        'Lightweight running shoes with superior cushioning and support',
      price: 119.99,
      imageUrl:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      rating: 4.5,
      reviewCount: 423,
      inStock: true,
      category: 'Footwear',
    },
    {
      id: '10',
      name: 'LED Desk Lamp',
      description: 'Adjustable LED lamp with multiple brightness settings',
      price: 49.99,
      imageUrl:
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
      rating: 4.3,
      reviewCount: 201,
      inStock: true,
      category: 'Home',
    },
    {
      id: '11',
      name: 'Backpack',
      description: 'Durable waterproof backpack with laptop compartment',
      price: 79.99,
      imageUrl:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      rating: 4.4,
      reviewCount: 178,
      inStock: true,
      category: 'Accessories',
    },
    {
      id: '12',
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with precision tracking',
      price: 24.99,
      imageUrl:
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
      rating: 4.2,
      reviewCount: 145,
      inStock: true,
      category: 'Electronics',
    },
  ]);

  filteredProducts = computed(() => {
    if (this.category() == 'all') return this.products();
    const prod = this.products().filter((p) => p.category.toLowerCase() === this.category().toLowerCase());
    console.log('prod', prod);
    return prod;
  });

  categories = signal<string[]>([
    'all',
    'electronics',
    'accessories',
    'home',
    'footwear',
    'sports',
  ]);

  clicked(event:any){
    console.log(event);
    
  }
}
