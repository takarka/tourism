export interface WalletOneDTO {
  params: WalletOneParamsDTO;
  url: string;
  paid: boolean;
}

interface WalletOneParamsDTO {
  WMI_CURRENCY_ID: string;
  WMI_FAIL_URL: string;
  WMI_MERCHANT_ID: string;
  WMI_PAYMENT_AMOUNT: string;
  WMI_SIGNATURE: string;
  WMI_SUCCESS_URL: string;
  WMI_PAYMENT_NO: string;
  WMI_PTENABLED: string;
}
