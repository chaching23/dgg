import * as RNIap from 'react-native-iap';

export const IAP_SKUS = {
  appleWallet10: 'wallet_10_usd_apple',
} as const;

export async function initIap(): Promise<void> {
  try {
    await RNIap.initConnection();
  } catch {}
}

export async function getProducts(): Promise<RNIap.Product[]> {
  try {
    const products = await RNIap.getProducts({ skus: [IAP_SKUS.appleWallet10] });
    return products;
  } catch {
    return [];
  }
}

export async function purchaseWallet10(onSuccessCredit: () => void): Promise<void> {
  try {
    await RNIap.requestPurchase({ sku: IAP_SKUS.appleWallet10, andDangerouslyFinishTransactionAutomatically: false });
    const purchases = await RNIap.getPendingPurchasesIOS();
    for (const p of purchases) {
      try {
        await RNIap.finishTransaction({ purchase: p, isConsumable: true });
        onSuccessCredit();
      } catch {}
    }
  } catch (e) {
    // no-op; surfaced in UI if needed
    throw e;
  }
}


