export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Product {
  id: string;
  category: Category;
  name: string;
  price: string;
  isFeatured: boolean;
  sizes: Size[];
  color: Color[];
  description: Description;
  details: Details;
  images: Image[];
}
export interface CartProduct extends Product {
  selectedColor: Color | null;
  selectedSize: Size | null;
}

export interface Image {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}
export interface Description {
  id: string;
  name: string;
  value: string;
}
export interface Details {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}
// Defina isso em um arquivo separado, como types.ts
export interface User {
  id: string;
  email: string;
}
