type BannerImage = {
  src: string;
  alt: string;
};

export interface BannerProps {
  link: string;
  image: BannerImage;
  text: string;
}
