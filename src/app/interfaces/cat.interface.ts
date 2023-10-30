export interface CatBreed {
    id: string;
    name: string;
}

export interface CatPhoto {
  id: string;
  url: string;
  breeds: CatBreed[];
}