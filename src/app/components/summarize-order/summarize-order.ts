import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from "../../directives/view-panel";
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel],
  template: `
<div appViewPanel>
<h2 class="text-2xl font-bold mb-4" >Order summary</h2>
<div class="space-y-3 text-lg pt-4">
<div class="flex justify-between">
  <span>Subtotal</span>
  <span>\$ {{subTotal()}}</span>
</div>
<div class="flex justify-between">
  <span>Tax</span>
  <span>\$ {{tax()}}</span>
</div>
<div class="flex justify-between border-t pt-3 font-bold text-lg">
  <span>Total</span>
  <span>\$ {{total()}}</span>
</div>
</div>
</div>
  `,
  styles: ``
})
export class SummarizeOrder {
store = inject(EcommerceStore)

subTotal = computed(()=> Math.round(this.store.cartItems().reduce((acc,item)=> acc +(item.product.price * item.quantity),0)))

tax = computed(()=>Math.round(0.05 * this.subTotal()) )

total = computed(()=> Math.round(this.subTotal() - this.tax()))
}
