import styles from './Playground.module.scss';
import { ImageCarousel } from './ImageCarousel/ImageCarousel';

export const PlaygroundView = () => {

  return (
    <div className={styles.container}>
      <h1>Playground</h1>
      <ImageCarousel />
    </div>
  );
};
