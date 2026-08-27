// Multi-currency support for the Finance module. Base currency is GBP.
// Uses frankfurter.app - a free, no-API-key exchange rate service.

export const SUPPORTED_CURRENCIES = [
  "GBP",
  "USD",
  "EUR",
  "CAD",
  "AUD",
  "CHF",
  "JPY",
  "INR",
  "NOK",
  "SEK",
];

let cachedRates = null;
let cachedAt = 0;
const CACHE_MS = 1000 * 60 * 60 * 6; // 6 hours

export async function getRatesFromGBP() {
  const now = Date.now();
  if (cachedRates && now - cachedAt < CACHE_MS) return cachedRates;

  try {
    const res = await fetch("https://api.frankfurter.app/latest?from=GBP");
    if (!res.ok) throw new Error("rate fetch failed");
    const data = await res.json();
    cachedRates = { GBP: 1, ...data.rates };
    cachedAt = now;
    return cachedRates;
  } catch (err) {
    console.warn("Forje Life: could not fetch live exchange rates, using 1:1 fallback", err);
    // Fallback so the app still works if the rate API is unreachable
    const fallback = {};
    SUPPORTED_CURRENCIES.forEach((c) => (fallback[c] = 1));
    return fallback;
  }
}

export async function convertToGBP(amount, currency) {
  if (currency === "GBP") return amount;
  const rates = await getRatesFromGBP();
  const rate = rates[currency] || 1; // units of `currency` per 1 GBP
  return amount / rate;
}

export function formatMoney(amount, currency) {
  try {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}
