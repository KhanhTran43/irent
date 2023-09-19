import ImageGallery from 'react-image-gallery';

import { CarouselImageModel } from '@/models/carousel-image.model';

type CarouselProps = {
  images?: CarouselImageModel[];
};

export const Carousel = (props: CarouselProps) => {
  const { images } = props;

  return (
    <ImageGallery
      items={
        images?.map((images) => ({
          original: images.originalUrl,
          thumbnail: images.thumbnailUrl,
          originalHeight: 500,
        })) ?? []
      }
    />
  );
};
