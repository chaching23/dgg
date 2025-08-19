export const ETF_SYMBOLS = ['BWEB', 'IBLC', 'BKCH', 'WGMI'] as const;
export type EtfSymbol = typeof ETF_SYMBOLS[number];

export const DEFAULT_ETF: EtfSymbol = ETF_SYMBOLS[0];

export function getPreferredEtf(getString: (k: string) => string | undefined): EtfSymbol {
  const symbol = getString('invest.preferredEtf');
  if (ETF_SYMBOLS.includes((symbol as EtfSymbol) ?? '')) return symbol as EtfSymbol;
  return DEFAULT_ETF;
}

export function poolKey(symbol: EtfSymbol) {
  return `invest.etf.pool.${symbol}`;
}
export function userKey(symbol: EtfSymbol) {
  return `invest.etf.user.${symbol}`;
}
export function historyKey(symbol: EtfSymbol) {
  return `invest.etf.history.${symbol}`;
}


