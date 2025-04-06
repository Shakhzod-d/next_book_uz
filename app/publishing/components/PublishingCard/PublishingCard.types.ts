export interface IPublishingCardProps {
  publishing: IPublishing;
}

export interface IPublishing {
  audioBookCount: number;
  bookCount: number;
  ebookCount: number;
  imgUrl: string;
  name: string;
  _id: string;
}
