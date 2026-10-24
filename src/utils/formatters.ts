export function formatNgnValue(amountNgn: number): string {
  return `₦${amountNgn.toLocaleString()}`;
}

export function formatTariff(amountNgn: number): string {
  return `₦${amountNgn.toLocaleString()} NGN`;
}
