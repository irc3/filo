import NextImage, { ImageLoader, ImageProps } from "next/image";

const customLoader: ImageLoader = ({ src }) => {
  return src
}

export default function Image(props: ImageProps) {
  return (
    <NextImage
      {...props}
      loader={customLoader}
    />
  );
}
