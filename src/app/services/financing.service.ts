import { Injectable } from '@angular/core';

/** One installment plan the branch offers, e.g. 24 months. */
export interface InstallmentTerm {
  months: number;
  /** Monthly add-on interest rate, e.g. 0.02 = 2% of the amount financed per month. */
  monthlyRate: number;
}

/** The result of computing an installment for one bike. */
export interface InstallmentQuote {
  price: number;
  downPayment: number;
  amountFinanced: number;
  months: number;
  monthlyAmortization: number;
  totalInterest: number;
  totalCost: number;
}

/**
 * FinancingService computes estimated monthly payments for in-house installment.
 *
 * Motorcycle dealers in the Philippines usually use "add-on" interest: the interest
 * is a flat percent of the amount financed, charged for every month of the term.
 *
 *   amount financed = price - down payment
 *   total interest  = amount financed x monthly rate x months
 *   monthly         = (amount financed + total interest) / months   (rounded up to the peso)
 *
 * NOTE: The rates below are SAMPLE rates for estimates only. Replace them with the
 * branch's official rates before release.
 */
@Injectable({ providedIn: 'root' })
export class FinancingService {
  /** Smallest down payment allowed, as a percent of the price. */
  readonly minDownPaymentPercent = 10;
  /** Largest down payment the calculator offers, as a percent of the price. */
  readonly maxDownPaymentPercent = 50;

  readonly terms: InstallmentTerm[] = [
    { months: 12, monthlyRate: 0.018 },
    { months: 18, monthlyRate: 0.019 },
    { months: 24, monthlyRate: 0.02 },
    { months: 36, monthlyRate: 0.021 },
  ];

  getTerm(months: number): InstallmentTerm | undefined {
    return this.terms.find((term) => term.months === months);
  }

  /** Down payment in pesos for a given percent of the price (rounded up to the peso). */
  downPaymentFor(price: number, percent: number): number {
    return Math.ceil((price * percent) / 100);
  }

  quote(price: number, downPayment: number, months: number): InstallmentQuote {
    const term = this.getTerm(months);
    if (!term) {
      throw new Error(`No installment term of ${months} months`);
    }
    if (price <= 0) {
      throw new Error('Price must be greater than zero');
    }

    // Keep the down payment between the minimum and the full price.
    const minDown = this.downPaymentFor(price, this.minDownPaymentPercent);
    const down = Math.min(Math.max(downPayment, minDown), price);

    const amountFinanced = price - down;
    const monthlyAmortization = Math.ceil((amountFinanced * (1 + term.monthlyRate * months)) / months);
    const totalPaidMonthly = monthlyAmortization * months;

    return {
      price,
      downPayment: down,
      amountFinanced,
      months,
      monthlyAmortization,
      totalInterest: totalPaidMonthly - amountFinanced,
      totalCost: down + totalPaidMonthly,
    };
  }
}
