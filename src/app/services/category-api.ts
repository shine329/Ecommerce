import { Injectable } from "@angular/core";

 @Injectable({
   providedIn: 'root'
 })
 export class CategoryApi {
   private categories = ['all',
    'electronics',
    'accessories',
    'home',
    'footwear',
    'sports'];

   getCategories() {
     return this.categories;
   }
}