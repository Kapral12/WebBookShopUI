export interface Genre {
  filter(arg0: (genre: any) => boolean): any;
  id: number;
  name: string;
}
