import { computed, inject } from '@angular/core';
import { Product } from './models/product';
import { CartItem } from './models/cart';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from './services/toaster';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { SignInParams, SignUpParams, User } from './models/user';
import { Router } from '@angular/router';
import { Order } from './models/order';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;

  loading:boolean;
  selectedProductId:string | undefined;
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },

  withState({
    products: [
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
        description:
          'Track your heart rate, steps, and workouts with precision',
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
        description:
          'Non-slip yoga mat for comfortable workouts and meditation',
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
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading:false,
    selectedProductId:undefined
  } as EcommerceState),

  withStorageSync({ key :'life-Style',select:({wishlistItems, cartItems,user})=> ({wishlistItems, cartItems,user})}),

  withComputed(({ category, products, wishlistItems, cartItems, selectedProductId }) => ({
    filteredProducts: computed(() => {
      if (category() == 'all') return products();
      return products().filter(
        (p) => p.category.toLowerCase() === category().toLowerCase()
      );
    }),
    wishlistCount: computed(() => wishlistItems().length),
    cartItemsCount: computed(() =>
      cartItems().reduce((acc, item) => acc + item.quantity, 0)
    ),
    selectedProduct: computed(()=> {
      return products().find( products => products.id === selectedProductId())
    }),
  })),

  withMethods(
    (
      store,
      toaster = inject(Toaster),
      matDialog = inject(MatDialog),
      router = inject(Router)
    ) => ({
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),

      setProductId:signalMethod<string>((productId:string)=>{
        patchState(store,{selectedProductId:productId})
      }),

      addToWishlist: (product: Product) => {
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });
        patchState(store, { wishlistItems: updatedWishlistItems });
        toaster.success('Product added to wishlist');
      },

      addToCart: (product: Product, quantity = 1) => {
        const existingItemIndex = store
          .cartItems()
          .findIndex((cart) => cart.product.id === product.id);

        const updatedCartItems = produce(store.cartItems(), (draft) => {
          if (existingItemIndex !== -1) {
            draft[existingItemIndex].quantity += quantity;
            return;
          }
          draft.push({
            product,
            quantity,
          });
        });

        patchState(store, { cartItems: updatedCartItems });
        toaster.success(
          existingItemIndex !== -1
            ? 'Product added again'
            : 'Product added to the cart'
        );
      },

      setItemQuantity: (params: { productId: string; quantity: number }) => {
        const index = store
          .cartItems()
          .findIndex((c) => c.product.id === params.productId);
        const updated = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity;
        });
        patchState(store, { cartItems: updated });
      },

      allAllWishlistToCart: () => {
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          store.wishlistItems().forEach((p) => {
            if (!draft.find((c) => c.product.id === p.id)) {
              draft.push({ product: p, quantity: 1 });
            }
          });
        });
        patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
      },

      removeFromWishlist: (product: Product) => {
        patchState(store, {
          wishlistItems: store
            .wishlistItems()
            .filter((p) => p.id !== product.id),
        });
        toaster.success('Product removed from wishlist');
      },
      clearWishlist: () => {
        patchState(store, { wishlistItems: [] });
      },

      moveToWishList: (product: Product) => {
        const updatedCartItems = store
          .cartItems()
          .filter((p) => p.product.id !== product.id);
        const updatedWishlIstItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });
        patchState(store, {
          cartItems: updatedCartItems,
          wishlistItems: updatedWishlIstItems,
        });
      },

      removeFromCart: (product: Product) => {
        patchState(store, {
          cartItems: store
            .cartItems()
            .filter((c) => c.product.id !== product.id),
        });
      },
      proceedToCheckout: () => {
        if(!store.user()){
matDialog.open(SignInDialog, {
          disableClose: true,
          data: {
            checkout: true,
          },
        });
        return
        }
        router.navigate(['/checkout'])
        
      },

     placeOrder: async ()=> {
patchState(store,{loading:true});

const user = store.user();

if(!user){
  toaster.error('Please login before placing order')
  patchState(store,{loading:false});
  return
}

const order:Order = {
id:crypto.randomUUID(),
userId:user.id,
total:Math.round(store.cartItems().reduce((acc,item)=> acc+item.quantity *item.product.price,0)),
items:store.cartItems(),
paymentStatus:'success'
};

await new Promise((resolve) => setTimeout(resolve,1000))

patchState(store,{loading:false,cartItems:[]});

router.navigate(['order-success'])

      },

      signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'John Doe',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });
        matDialog.getDialogById(dialogId)?.close();
        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signOut: ()=> {
        patchState(store,{user:undefined})
      },

      signUp: ({ name, email, password, checkout, dialogId }: SignUpParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name,
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });
        matDialog.getDialogById(dialogId)?.close();
        if (checkout) {
          router.navigate(['/checkout']);
        }
      }

    })
  )
);
