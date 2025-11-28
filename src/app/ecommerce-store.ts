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
import { AddReviewParams, UserReview } from './models/user-review';

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;

  loading: boolean;
  selectedProductId: string | undefined;
  writeReview: boolean;
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
        reviews: [
          {
            id: 'r1',
            productId: '1',
            userName: 'John Doe',
            userImageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
            rating: 5,
            title: 'Great Sound Quality',
            comment:
              'These headphones have amazing sound quality and great noise cancellation. Highly recommend!',
            reviewDate: new Date('2023-10-15'),
          },
          {
            id: 'r2',
            productId: '1',
            userName: 'Jane Smith',
            userImageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
            rating: 4,
            title: 'Good, but a bit tight',
            comment:
              'The sound is great, but they feel a bit tight after a few hours of wearing them.',
            reviewDate: new Date('2023-09-20'),
          },
        ],
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
        reviews: [
          {
            id: 'r3',
            productId: '2',
            userName: 'Michael Brown',
            userImageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
            rating: 5,
            title: 'Perfect for workouts!',
            comment:
              'I love how this watch tracks my heart rate and steps during workouts. It’s a must-have for fitness enthusiasts.',
            reviewDate: new Date('2023-11-02'),
          },
          {
            id: 'r4',
            productId: '2',
            userName: 'Emily Davis',
            userImageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
            rating: 3,
            title: 'Battery Life Could Be Better',
            comment:
              'The watch is great overall, but the battery life doesn’t last as long as I expected.',
            reviewDate: new Date('2023-10-25'),
          },
        ],
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
        reviews: [
          {
            id: 'r5',
            productId: '3',
            userName: 'Sophia Wilson',
            userImageUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
            rating: 4,
            title: 'Soft and comfy!',
            comment:
              'The t-shirt is very soft and fits well. It’s perfect for casual wear, but it shrank a little after washing.',
            reviewDate: new Date('2023-08-30'),
          },
          {
            id: 'r6',
            productId: '3',
            userName: 'David Miller',
            userImageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
            rating: 3,
            title: 'Decent, but not great',
            comment:
              'The t-shirt is nice, but the fabric feels a bit thin. It’s good for the price.',
            reviewDate: new Date('2023-09-05'),
          },
        ],
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
        reviews: [
          {
            id: 'r7',
            productId: '4',
            userName: 'Megan Lee',
            userImageUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
            rating: 5,
            title: 'Love this mug!',
            comment:
              'The mug is beautifully handcrafted and the perfect size for my morning coffee.',
            reviewDate: new Date('2023-07-12'),
          },
        ],
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
        reviews: [
          {
            id: 'r8',
            productId: '5',
            userName: 'Daniel Harris',
            userImageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
            rating: 5,
            title: 'Amazing Camera!',
            comment:
              'The picture quality is stunning, and 4K video recording is a game-changer!',
            reviewDate: new Date('2023-06-25'),
          },
          {
            id: 'r9',
            productId: '5',
            userName: 'Olivia Green',
            userImageUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
            rating: 4,
            title: 'Great, but expensive',
            comment:
              'The camera is excellent, but it’s quite expensive. Worth it for professional use.',
            reviewDate: new Date('2023-07-01'),
          },
        ],
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
        reviews: [
          {
            id: 'r10',
            productId: '6',
            userName: 'Emily Young',
            userImageUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
            rating: 5,
            title: 'Perfect for Yoga',
            comment:
              'This yoga mat is thick, non-slip, and great for all types of yoga poses.',
            reviewDate: new Date('2023-05-20'),
          },
        ],
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
        reviews: [
          {
            id: 'r11',
            productId: '7',
            userName: 'Lucas Martinez',
            userImageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
            rating: 5,
            title: 'Keeps my water cold for hours',
            comment:
              'This water bottle is amazing! Keeps my water cold for hours, and I love the sleek design.',
            reviewDate: new Date('2023-08-10'),
          },
        ],
      },
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectedProductId: undefined,
    writeReview: false,
  } as EcommerceState),

  withStorageSync({
    key: 'life-Style',
    select: ({ wishlistItems, cartItems, user }) => ({
      wishlistItems,
      cartItems,
      user,
    }),
  }),

  withComputed(
    ({ category, products, wishlistItems, cartItems, selectedProductId }) => ({
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
      selectedProduct: computed(() => {
        return products().find(
          (products) => products.id === selectedProductId()
        );
      }),
    })
  ),

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

      setProductId: signalMethod<string>((productId: string) => {
        patchState(store, { selectedProductId: productId });
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
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: true,
            },
          });
          return;
        }
        router.navigate(['/checkout']);
      },

      placeOrder: async () => {
        patchState(store, { loading: true });

        const user = store.user();

        if (!user) {
          toaster.error('Please login before placing order');
          patchState(store, { loading: false });
          return;
        }

        const order: Order = {
          id: crypto.randomUUID(),
          userId: user.id,
          total: Math.round(
            store
              .cartItems()
              .reduce(
                (acc, item) => acc + item.quantity * item.product.price,
                0
              )
          ),
          items: store.cartItems(),
          paymentStatus: 'success',
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));

        patchState(store, { loading: false, cartItems: [] });

        router.navigate(['order-success']);
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

      signOut: () => {
        patchState(store, { user: undefined });
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
      },

      showWiriteReview: () => {
        patchState(store, { writeReview: true });
      },

      hideWiriteReview: () => {
        patchState(store, { writeReview: false });
      },

      addReview: async ({ title, comment, rating }: AddReviewParams) => {
        patchState(store, { loading: true });
        const product = store
          .products()
          .find((p) => p.id === store.selectedProductId());
        if (!product) {
          patchState(store, { loading: false });
          return;
        }

        const review: UserReview = {
          id: crypto.randomUUID(),
          title,
          comment,
          rating,
          productId: product.id,
          userName: store.user()?.name || '',
          userImageUrl: store.user()?.imageUrl || '',
          reviewDate: new Date(),
        };

        const updatedProducts = produce(store.products(), (draft) => {
          const index = draft.findIndex((p) => p.id === product.id);
          draft[index].reviews.push(review);
          draft[index].rating =
            Math.round(
              (draft[index].reviews.reduce((acc, r) => acc + r.rating, 0) /
                draft[index].reviews.length) *
                10
            ) / 10;
          draft[index].reviewCount = draft[index].reviews.length;
        });

        await new Promise((resolve)=> setTimeout(resolve,1000));
        patchState(store,{loading:false,products:updatedProducts,writeReview:false})
      },
    })
  )
);
