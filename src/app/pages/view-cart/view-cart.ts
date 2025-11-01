import { Component } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { ListCartItes } from "./list-cart-ites/list-cart-ites";
import { TeaseWishlist } from "./tease-wishlist/tease-wishlist";
import { SummarizeOrder } from "../../components/summarize-order/summarize-order";

@Component({
  selector: 'app-view-cart',
  imports: [BackButton, ListCartItes, TeaseWishlist, SummarizeOrder],
  template: `
<div class="mx-auto max-w-[1200px] py-6" >
  <app-back-button class="mb-6" navigateTo="/products/all" > Continue Shopping </app-back-button>
  <h1 class="text-3xl font-extrabold mb-4">Shopping Cart</h1>

<app-tease-wishlist class="mb-6 block" />

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="lg:col-span-2">
      <app-list-cart-ites />
    </div>
    <div>
      <app-summarize-order />
    </div>
  </div>


</div>
  `,
  styles: ``
})
export default class ViewCart {

}
