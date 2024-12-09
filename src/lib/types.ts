export interface Photo {
  src: string;
  alt: string;
}

export interface CarouselState {
  currentIndices: number[];
  transitioning: boolean;
}

export interface CarouselOptions {
  interval?: number;
  transitionDuration?: number;
}