import { ButtonBack, ButtonNext, CarouselProvider, Image, Slide, Slider } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { ObjectImage } from '../../../typings/ObjectTracking';
import { Container, StyledButtonBack, StyledButtonNext } from './ObjectImages.style';

export type ObjectImagesProps = {
  images: ObjectImage[];
};

const imageStyle = {
  width: "auto", 
  maxWidth: "100%", 
  maxHeight: "100%", 
  marginLeft:"auto",
  marginRight:"auto"
}; 

export function ObjectImages({ images }: ObjectImagesProps) {
  if (images.length === 0) {
    return null;
  }

  const chevronSize = 24;

  return (
    <CarouselProvider naturalSlideHeight={3} naturalSlideWidth={4} totalSlides={images.length}>
      <Container>
        <Slider>
          {images.map(({ image }, index) => {
            return (
              <Slide key={image} index={index}>
              <Image hasMasterSpinner src={image} style={imageStyle} />
              </Slide>
            );
          })}
        </Slider>
        <StyledButtonBack as={ButtonBack}>
          <FiChevronLeft size={chevronSize} />
        </StyledButtonBack>
        <StyledButtonNext as={ButtonNext}>
          <FiChevronRight size={chevronSize} />
        </StyledButtonNext>
      </Container>
    </CarouselProvider>
  );
}
