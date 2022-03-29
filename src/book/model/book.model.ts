interface IBook {
  id: number;
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;
  fileBook: string;
}

export class Book implements IBook {
  authors: string;
  description: string;
  favorite: string;
  fileBook: string;
  fileCover: string;
  fileName: string;
  id: number;
  title: string;
}
