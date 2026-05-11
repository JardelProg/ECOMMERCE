export type UserRole = 'customer' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  address?: Address;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  stock: number;
  rating: number;
  reviewCount: number;
  specs?: Record<string, string>;
  isFeatured?: boolean;
  isOfferOfDay?: boolean;
  hasFreeShipping?: boolean;
  hasFastDelivery?: boolean;
  videoUrl?: string;
  coverImage?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories?: string[];
  order?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: 'pix' | 'boleto' | 'credit_card';
  createdAt: string;
  updatedAt: string;
  trackingCode?: string;
  address: Address;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  images?: string[];
  date: string;
  isVerified?: boolean;
}
