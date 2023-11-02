export interface ICatBreed {
    id: string;
    name: string;
}

export interface ICatPhoto {
  id: string;
  url: string;
  breeds: ICatBreed[];
}

export interface ICatFormValues {
  breeds: string[];
  limit: number;
}