import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'products/all'
    },
    {
        path:'products/:category',
        loadComponent:()=> import('./pages/product-grid/product-grid')
    },
        {
        path:'wishlist',
        loadComponent:()=> import('./pages/my-wishlist/my-wishlist')
    }
];
