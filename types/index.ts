export type Movies = {
  _id: string;
  poster: string;
  cast: string[];
  year: number;
  title: string;
  imdb: {
    rating: number;
  };
};

export type Params = {
  data: {
    poster: string;
    title: string;
    cast: string[];
    imdb: { rating: number };
    year: number;
  };
};
