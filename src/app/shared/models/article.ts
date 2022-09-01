export class Article {
  id: number;
  title: string;
  status: number;
  season: number;
  twentyFourHourTiming: number;
  description: string;
  shortDescription: string;
  imageName: string;
  imagePath: string;
  publishDate: Date;
}

export class ArticleImage {
  id: number;
  articleId: number;
  imagePath: string;
  imageName: string;
  orderBy: number;
}