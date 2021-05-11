export class Wallet {
  constructor(
    public id?: number,
    public user?: number,
    public current_amount?: number
  ) {
    this.current_amount = current_amount ? current_amount : 0;
  }
}
