import ImageGallery from 'react-image-gallery';

type CarouselProps = {
  url: string[];
};

export const Carousel = (props: CarouselProps) => {
  const { url } = props;

  return (
    <ImageGallery
      items={url.map((it) => ({
        original: it,
        thumbnail: it,
      }))}
    />
  );
};
