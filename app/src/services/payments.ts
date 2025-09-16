/*
  Apple Pay scaffold (no external deps yet).
  Replace these implementations with @stripe/stripe-react-native once installed and configured.
*/

export type ApplePayRequest = {
  merchantId: string; // e.g., merchant.com.yourcompany.arcade
  countryCode: string; // e.g., 'US'
  currencyCode: string; // e.g., 'USD'
  amount: number; // decimal dollars, e.g., 10 for $10.00
  label?: string; // e.g., 'Wallet Top‑up'
};

export async function isApplePayAvailable(): Promise<boolean> {
  // Placeholder: return false until Stripe module is installed
  return false;
}

export async function presentApplePay(_req: ApplePayRequest): Promise<{ success: boolean; token?: string }> {
  // Placeholder: throw to prompt configuration
  throw new Error('Apple Pay is not configured. Install and set up @stripe/stripe-react-native.');
}

export async function finalizeApplePay(_ok: boolean): Promise<void> {
  // Placeholder no-op
}


