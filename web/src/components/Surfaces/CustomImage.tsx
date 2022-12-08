import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface Props extends ImageProps {
  src: string;
  alt: string;
  containerClassName?: string;
  className?: string;
}

/**
 * Image component with loading skeleton.
 *
 * @param src - The image URL.
 * @param alt - The image alt text.
 * @param containerClassName - Class name for the container div.
 * @param className - Additional styles to apply.
 * @param rest - Props to pass to the Image component.
 */
export default function CustomImage({
  src,
  alt,
  containerClassName = "",
  className = "",
  ...rest
}: Props) {
  //#region Hooks

  const [imageLoading, setImageLoading] = useState(true);

  //#endregion

  //#region Handlers

  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  //#endregion

  //#region Styles

  let containerStyles = "bg-slate-300 dark:bg-slate-600 w-full h-full";
  let imageStyles = "transition duration-200 ease-out";
  if (imageLoading) {
    containerStyles += " animate-pulse";
    imageStyles += " opacity-0";
  } else {
    imageStyles += " opacity-100";
  }

  //#endregion

  return (
    <div className={`${containerStyles} ${containerClassName}`}>
      <Image
        src={src}
        alt={alt}
        className={`${imageStyles} ${className}`}
        onLoadingComplete={handleImageLoaded}
        {...rest}
      />
    </div>
  );
}
