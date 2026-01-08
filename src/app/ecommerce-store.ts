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
       {
    id: '8',
    name: 'Wireless Gaming Mouse',
    description: 'High-precision gaming mouse with RGB lighting and programmable buttons',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    rating: 4.6,
    reviewCount: 142,
    inStock: true,
    category: 'Electronics',
    reviews: [
      {
        id: 'r12',
        productId: '8',
        userName: 'Alex Chen',
        userImageUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
        rating: 5,
        title: 'Perfect for gaming!',
        comment: 'The response time is incredible and the customizable buttons have improved my gameplay significantly.',
        reviewDate: new Date('2024-01-15'),
      },
      {
        id: 'r13',
        productId: '8',
        userName: 'Sarah Johnson',
        userImageUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
        rating: 4,
        title: 'Great but heavy',
        comment: 'Excellent performance but a bit heavy for my small hands. Still would recommend for serious gamers.',
        reviewDate: new Date('2024-01-08'),
      },
      {
        id: 'r14',
        productId: '8',
        userName: 'Mike Roberts',
        userImageUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
        rating: 5,
        title: 'Worth every penny',
        comment: 'Battery life is amazing and the precision is unmatched. Best gaming mouse I have owned.',
        reviewDate: new Date('2023-12-20'),
      }
    ],
  },
  {
    id: '9',
    name: 'Premium Leather Wallet',
    description: 'Genuine leather wallet with multiple card slots and RFID protection',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop',
    rating: 4.4,
    reviewCount: 89,
    inStock: true,
    category: 'Accessories',
    reviews: [
      {
        id: 'r15',
        productId: '9',
        userName: 'David Wilson',
        userImageUrl: 'https://randomuser.me/api/portraits/men/8.jpg',
        rating: 5,
        title: 'Excellent quality',
        comment: 'The leather feels premium and has aged beautifully. Plenty of space for cards and cash.',
        reviewDate: new Date('2024-02-01'),
      },
      {
        id: 'r16',
        productId: '9',
        userName: 'Emma Thompson',
        userImageUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
        rating: 4,
        title: 'Good but slightly bulky',
        comment: 'Love the RFID protection and quality, but it is a bit thick when full. Still very satisfied.',
        reviewDate: new Date('2024-01-25'),
      }
    ],
  },

  {
    id: '11',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with advanced cushioning and breathable mesh',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    category: 'Footwear',
    reviews: [
      {
        id: 'r19',
        productId: '11',
        userName: 'MarathonRunner',
        userImageUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
        rating: 5,
        title: 'Best running shoes ever!',
        comment: 'The cushioning is perfect for long distances. Lightweight and breathable - exactly what I needed for training.',
        reviewDate: new Date('2024-01-30'),
      },
      {
        id: 'r20',
        productId: '11',
        userName: 'Jessica Brown',
        userImageUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
        rating: 5,
        title: 'Worth the investment',
        comment: 'These shoes have eliminated my knee pain during runs. True to size and incredibly comfortable.',
        reviewDate: new Date('2024-01-22'),
      },
      {
        id: 'r21',
        productId: '11',
        userName: 'Kevin Zhao',
        userImageUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
        rating: 4,
        title: 'Great but narrow fit',
        comment: 'Excellent performance and comfort, but they run a bit narrow. Consider sizing up if you have wide feet.',
        reviewDate: new Date('2024-01-15'),
      }
    ],
  },
  {
    id: '12',
    name: 'Basketball',
    description: 'Official size basketball with superior grip and durability',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=500&fit=crop',
    rating: 4.5,
    reviewCount: 78,
    inStock: true,
    category: 'Sports',
    reviews: [
      {
        id: 'r22',
        productId: '12',
        userName: 'BallIsLife',
        userImageUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
        rating: 5,
        title: 'Perfect grip and bounce',
        comment: 'This ball feels great in hand and has consistent bounce. Perfect for both indoor and outdoor courts.',
        reviewDate: new Date('2024-02-12'),
      },
      {
        id: 'r23',
        productId: '12',
        userName: 'Marcus Lee',
        userImageUrl: 'https://randomuser.me/api/portraits/men/13.jpg',
        rating: 4,
        title: 'Good quality for price',
        comment: 'Great basketball for the price. The grip is excellent and it has held up well on concrete courts.',
        reviewDate: new Date('2024-02-08'),
      }
    ],
  },
  {
    id: '14',
    name: 'Designer Sunglasses',
    description: 'UV protection sunglasses with polarized lenses and stylish frame',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    rating: 4.4,
    reviewCount: 124,
    inStock: true,
    category: 'Accessories',
    reviews: [
      {
        id: 'r27',
        productId: '14',
        userName: 'FashionIcon',
        userImageUrl: 'https://randomuser.me/api/portraits/women/13.jpg',
        rating: 5,
        title: 'Stylish and functional',
        comment: 'Love the design and the polarized lenses work perfectly. Get compliments every time I wear them.',
        reviewDate: new Date('2024-01-28'),
      },
      {
        id: 'r28',
        productId: '14',
        userName: 'Chris Taylor',
        userImageUrl: 'https://randomuser.me/api/portraits/men/16.jpg',
        rating: 4,
        title: 'Good quality',
        comment: 'Comfortable fit and great UV protection. The case that comes with it is also very nice.',
        reviewDate: new Date('2024-01-20'),
      }
    ],
  },
  {
    id: '15',
    name: 'Air Fryer',
    description: 'Digital air fryer with multiple cooking functions and dishwasher-safe basket',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop',
    rating: 4.6,
    reviewCount: 189,
    inStock: false,
    category: 'Home',
    reviews: [
      {
        id: 'r29',
        productId: '15',
        userName: 'HomeChef',
        userImageUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
        rating: 5,
        title: 'Game changer in the kitchen!',
        comment: 'Makes everything crispy without oil. Easy to clean and the digital controls are very user-friendly.',
        reviewDate: new Date('2024-02-15'),
      },
      {
        id: 'r30',
        productId: '15',
        userName: 'Mark Johnson',
        userImageUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
        rating: 4,
        title: 'Great but loud',
        comment: 'Cooks food perfectly and is energy efficient. However, the fan is louder than I expected.',
        reviewDate: new Date('2024-02-08'),
      }
    ],
  },

  {
    id: '17',
    name: 'Yoga Blocks (2-Pack)',
    description: 'High-density foam yoga blocks for support and alignment in yoga practice',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=500&h=500&fit=crop',
    rating: 4.5,
    reviewCount: 92,
    inStock: true,
    category: 'Sports',
    reviews: [
      {
        id: 'r34',
        productId: '17',
        userName: 'YogaTeacher',
        userImageUrl: 'https://randomuser.me/api/portraits/women/16.jpg',
        rating: 5,
        title: 'Essential for practice',
        comment: 'Perfect density - firm but comfortable. These blocks have helped improve my students alignment significantly.',
        reviewDate: new Date('2024-02-09'),
      },
      {
        id: 'r35',
        productId: '17',
        userName: 'BeginnerYogi',
        userImageUrl: 'https://randomuser.me/api/portraits/women/17.jpg',
        rating: 4,
        title: 'Very helpful',
        comment: 'As a beginner, these blocks make difficult poses accessible. Good quality and light weight.',
        reviewDate: new Date('2024-02-02'),
      }
    ],
  },
  {
    id: '18',
    name: 'Smartphone Case',
    description: 'Protective case with military-grade drop protection and wireless charging compatibility',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=500&h=500&fit=crop',
    rating: 4.3,
    reviewCount: 267,
    inStock: true,
    category: 'Accessories',
    reviews: [
      {
        id: 'r36',
        productId: '18',
        userName: 'ClumsyUser',
        userImageUrl: 'https://randomuser.me/api/portraits/men/20.jpg',
        rating: 5,
        title: 'Saved my phone multiple times!',
        comment: 'This case has survived multiple drops from waist height without any damage to my phone. Highly protective!',
        reviewDate: new Date('2024-02-13'),
      },
      {
        id: 'r37',
        productId: '18',
        userName: 'TechReviewer',
        userImageUrl: 'https://randomuser.me/api/portraits/women/18.jpg',
        rating: 4,
        title: 'Great protection, bulky',
        comment: 'Excellent protection as advertised, but it does add significant bulk to the phone. Trade-off for safety.',
        reviewDate: new Date('2024-02-07'),
      }
    ],
  }
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectedProductId: undefined,
    writeReview: false,
  } as EcommerceState),

  // withStorageSync({
  //   key: 'life-Style',
  //   select: ({ wishlistItems, cartItems, user }) => ({
  //     wishlistItems,
  //     cartItems,
  //     user,
  //   }),
  // }),

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
