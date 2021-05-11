export class User {
  constructor(
    public id?: number,
    public first_name?: string,
    public last_name?: string,
    public gender?: number
  ) {
    this.id = id ? id : undefined;
    this.first_name = first_name ? first_name : '';
    this.last_name = last_name ? last_name : '';
    this.gender = gender ? gender : undefined;
  }
}
