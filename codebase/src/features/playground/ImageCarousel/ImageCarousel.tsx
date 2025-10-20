import { useState } from 'react';
import styles from './ImageCarousel.module.scss';

const testImages = [
  {
    src: 'https://picsum.photos/id/600/600/400',
    alt: 'Forest',
  },
  {
    src: 'https://picsum.photos/id/100/600/400',
    alt: 'Beach',
  },
  {
    src: 'https://picsum.photos/id/200/600/400',
    alt: 'Yak',
  },
  {
    src: 'https://picsum.photos/id/300/600/400',
    alt: 'Hay',
  },
  {
    src: 'https://picsum.photos/id/400/600/400',
    alt: 'Plants',
  },
  {
    src: 'https://picsum.photos/id/500/600/400',
    alt: 'Building',
  },
];

function clsx(...classnames: (boolean | string)[]) {
  return classnames.filter(Boolean).join(' ');
}

const getTransitionClassName = (currIndex: number, nextIndex: number | null, imagesLength: number) => {
  if (nextIndex !== null) {
    if ((currIndex === imagesLength - 1 && nextIndex === 0)) {
      return {
        currImgClass: styles['--move-left'], // will be applied later after initial render so it will animate from X(0) to X(-100%)
        nextImgClass: styles['--move-right'] // this class will be applied immediately as initial state and be removed later so it animates from X(100%) to X(0)
      }
    }

    if ((currIndex === 0 && nextIndex === imagesLength - 1)) {
      return {
        currImgClass: styles['--move-right'], // will be applied later after initial render so it will animate from X(0) to X(100%)
        nextImgClass: styles['--move-left'] // this class will be applied immediately as initial state and be removed later so it animates from X(-100%) to X(0)
      }
    }

    if (nextIndex > currIndex) {
      return {
        currImgClass: styles['--move-left'], // will be applied later after initial render so it will animate from X(0) to X(-100%)
        nextImgClass: styles['--move-right'] // this class will be applied immediately as initial state and be removed later so it animates from X(100%) to X(0)
      }
    }

    if (nextIndex < currIndex) {
      return {
        currImgClass: styles['--move-right'], // will be applied later after initial render so it will animate from X(0) to X(100%)
        nextImgClass: styles['--move-left'] // this class will be applied immediately as initial state and be removed later so it animates from X(-100%) to X(0)
      }
    }
  }

  return {
    currImgClass: '',
    nextImgClass: ''
  }
} 

function ImageCarousel({
  images = testImages,
}: Readonly<{
  images?: readonly { src: string; alt: string }[];
}>) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);

  const currImage = images[currIndex];
  const nextImage = nextIndex === null ? null : images[nextIndex];

  const updateIndex = (nextIndex: number) => {
    // update state first so it re-renders with 2 images on the dom (new one will initially be transformed to -100% or 100% on X)
    setNextIndex(nextIndex);
    
    // then we use request animation frame to change isTransitioning to true to animate (changing the transform value after the initial value is set above)
    // by adding/removing class that applies transform value based on isTransition value. Without this, we only have initial state (img with transform applied
    // already) so nothing animates. Calling setIsTransitioning in requestAnimationFrame allow React and the browser to fully commit the nextIndex change first
    // and then start the animation in the very next frame changing isTransitioning value which will apply / remove classes which applies transform value.
    // calling setIsTransitioning straight away without requestAnimationFrame will not work as React will batch the setIsTransitioning update with setNextIndex
    // so they both update at the same time which means only initial state and no updates which applies transition
    requestAnimationFrame(() => {
      setIsTransitioning(true);
    })
  }

  const { currImgClass, nextImgClass } = getTransitionClassName(currIndex, nextIndex, images.length);

  return (
    <div className={styles['image-carousel']}>
      <img
        alt={currImage.alt}
        src={currImage.src}
        key={currImage.src}
        className={`${styles['image-carousel__image']} ${isTransitioning ? currImgClass : ''}`}
      />
      { nextIndex !== null && nextImage !== null ? 
        <img
          alt={nextImage.alt}
          src={nextImage.src}
          key={nextImage.src}
          className={`${styles['image-carousel__image']} ${!isTransitioning ? nextImgClass : ''}`}
          onTransitionEnd={() => {
            setCurrIndex(nextIndex);
            setNextIndex(null);
            setIsTransitioning(false);
          }}
        />
        : null
      }
      <button
        aria-label="Previous image"
        className={`${styles['image-carousel__button']} ${styles['--prev']}`}
        onClick={() => {
          const nextIndex =
            (currIndex - 1 + images.length) % images.length;
          updateIndex(nextIndex);
        }}>
        &#10094;
      </button>
      <div className={styles['image-carousel__pages']}>
        {images.map(({ alt, src }, index) => (
          <button
            className={clsx(
              styles['image-carousel__pages__button'],
              index === currIndex &&
                styles['--active'],
            )}
            aria-label={`Navigate to ${alt}`}
            key={src}
            onClick={() => {
              if (index !== currIndex) {
                updateIndex(index);
              }
            }}
          />
        ))}
      </div>
      <button
        aria-label="Next image"
        className={`${styles['image-carousel__button']} ${styles['--next']}`}
        onClick={() => {
          const nextIndex = (currIndex + 1) % images.length;
          updateIndex(nextIndex);
        }}>
        &#10095;
      </button>
    </div>
  );
}

export { ImageCarousel };