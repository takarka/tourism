export class Order {
  constructor(
    public pk?: string,
    public user?: number,
    public payment_id?: string,
    public price?: string,
    public total_price?: string,
    public created_date?: string,
    public status?: number,
    public is_paid?: boolean,
    public order_items?: OrderItem
  ) {}
}

export class OrderItem {
  constructor(
    public pk?: string,
    public passport_id?: string,
    public image?: string,
    public is_foreigner?: boolean,
    public work_certificate_file?: string,
    public residence_file?: string,
    public tour?: number,
    public price?: string,
    public total_price?: string
  ) {}
}
