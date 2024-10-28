import Image from "next/image";
import { FC } from "react";
import styles from "./OverlayContainer.module.css";

type Props = {
  imgSrc: string;
  imgSrc2?: string;
  imgAlt?: string;
  children?: React.ReactNode;
};

const OverlayContainer: FC<Props> = ({ imgSrc, imgSrc2, imgAlt, children }) => (
  <div className={`${styles.imgContainer}`}>
    {imgSrc2 ? (
      <>
        <div className="hidden sm:block w-full">
          <Image
            className={styles.img}
            src={imgSrc}
            alt={imgAlt as string}
            width={858}
            height={414}
            layout="responsive"
          />
        </div>
        <div className="block sm:hidden w-full">
          <Image
            className={styles.img}
            src={imgSrc2}
            alt={imgAlt as string}
            width={710}
            height={710}
            layout="responsive"
          />
        </div>
      </>
    ) : (
      <Image
        className={styles.img}
        src={imgSrc}
        alt={imgAlt as string}
        width={710}
        height={710}
      />
    )}

    {children}
    <div className={styles.imgOverlay}></div>
    <div className={styles.overlayBorder}></div>
    <div className={styles.overlayBorder2}></div>
  </div>
);

export default OverlayContainer;
