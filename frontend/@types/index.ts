export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
}

export interface Category {
  id: number;
  name: string;
  products: Product[];
}

export interface SearchResult extends Product {
  categoryName: string;
}

type BannerImage = {
  src: string;
  alt: string;
};

export interface BannerContent {
  link: string;
  image: BannerImage;
  text: string;
}
