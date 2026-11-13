import { TestBed } from '@angular/core/testing';

import { FinancingService } from './financing.service';

describe('FinancingService', () => {
  let service: FinancingService;

  beforeEach(() => {
    service = TestBed.inject(FinancingService);
  });

  it('offers 12, 18, 24 and 36 month terms', () => {
    expect(service.terms.map((t) => t.months)).toEqual([12, 18, 24, 36]);
  });

  it('computes add-on interest installments, rounded up to the peso', () => {
    // 80,000 financed x (1 + 2% x 24) = 118,400 / 24 = 4,933.33 -> 4,934
    const quote = service.quote(100_000, 20_000, 24);

    expect(quote.amountFinanced).toBe(80_000);
    expect(quote.monthlyAmortization).toBe(4_934);
    expect(quote.totalInterest).toBe(4_934 * 24 - 80_000);
    expect(quote.totalCost).toBe(20_000 + 4_934 * 24);
  });

  it('raises a too-small down payment to the minimum percent', () => {
    const quote = service.quote(91_500, 0, 12);

    expect(quote.downPayment).toBe(9_150); // 10% of 91,500
    expect(quote.amountFinanced).toBe(82_350);
    // 82,350 x (1 + 1.8% x 12) = 100,137.6 / 12 = 8,344.8 -> 8,345
    expect(quote.monthlyAmortization).toBe(8_345);
  });

  it('never lets the down payment exceed the price', () => {
    const quote = service.quote(50_000, 80_000, 12);

    expect(quote.downPayment).toBe(50_000);
    expect(quote.amountFinanced).toBe(0);
    expect(quote.monthlyAmortization).toBe(0);
    expect(quote.totalCost).toBe(50_000);
  });

  it('longer terms mean lower monthly but higher total cost', () => {
    const short = service.quote(353_800, 70_760, 12);
    const long = service.quote(353_800, 70_760, 36);

    expect(long.monthlyAmortization).toBeLessThan(short.monthlyAmortization);
    expect(long.totalCost).toBeGreaterThan(short.totalCost);
  });

  it('rounds percent down payments up to the peso', () => {
    expect(service.downPaymentFor(59_700, 15)).toBe(8_955);
    expect(service.downPaymentFor(91_501, 10)).toBe(9_151); // 9,150.1 -> 9,151
  });

  it('rejects unknown terms and invalid prices', () => {
    expect(() => service.quote(100_000, 20_000, 7)).toThrowError(/7 months/);
    expect(() => service.quote(0, 0, 12)).toThrowError(/Price/);
  });
});
