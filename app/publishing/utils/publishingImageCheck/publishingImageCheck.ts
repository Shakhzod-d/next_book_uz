import DefaultPublishingImage from "../../assets/DefaultPublishingImage.png";
export const publishingImageCheck = (imgUrl: string | undefined | null) => {
  if (imgUrl) {
    return process.env.NEXT_PUBLIC_BASE_URL + imgUrl;
  } else return DefaultPublishingImage;
};
