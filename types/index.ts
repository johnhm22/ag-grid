export type Movies = {
  _id: string;
  poster: string;
  cast: string[];
  year: number;
  title: string;
  imbd: {
    rating: number;
  };
};

export type Params = {
  data: {
    poster: string;
    title: string;
    cast: string[];
    imbd: { string: number };
    year: number;
  };
};
