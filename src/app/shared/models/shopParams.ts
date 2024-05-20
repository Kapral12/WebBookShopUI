export class ShopParams{
  // publisherId?: number, bookseriesId?: number, genreIds?: number[], sort?: string
  publisherIds: number[] = [];
  publisherIdsExcept: number[] = [];
  bookseriesIds: number[] = [];
  bookseriesIdsExcept: number[] = [];
  genreIds: number[] = [];
  genreIdsExcept: number[] = [];
  authorIds: number[] = [];
  authorIdsExcept: number[] = [];
  sort = 'name';
  pageNumber = 1;
  pageSize = 6;
  search ='';
  MinUploadDate = ''
  MaxUploadDate =''
}
