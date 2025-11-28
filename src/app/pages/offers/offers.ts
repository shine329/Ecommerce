import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-offers',
  imports: [],
  template: `
<div class="mb-4 transition-all ease-out  duration 200 hover:-translate-x-1">
  <img [src]="image().name" alt="">
</div>
  `,
  styles: ``
})
export class Offers {

  image = signal(objects[0]) ;
  ngOnInit(){
    this.carousal(objects)
  }
  carousal(offers:any){
    let index =1;
    setInterval(()=> {
      this.image.set(offers[index]) 
      index = (index +1)% offers.length;      
    },3000)
  }
}

const objects = [
  { id: 1, name: "offer1.webp" },
  { id: 2, name: "offer2.webp" },
];