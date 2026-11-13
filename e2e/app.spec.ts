import { expect, test, type Page } from '@playwright/test';

// Ionic keeps previously visited pages in the DOM (hidden), so tests use role-based
// locators or `visible: true`, which only match what's actually on screen.

/** An ion-button with a routerLink (it renders as a link, not a button). */
const navButton = (page: Page, text: string) => page.locator('ion-button').filter({ hasText: text, visible: true });

test('home page shows the branch and featured bikes', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/tabs\/home$/);
  await expect(page.getByRole('heading', { name: /good times/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Featured Bikes' })).toBeVisible();
});

test('browse bikes, search, open details and compute an installment', async ({ page }) => {
  await page.goto('/tabs/motorcycles');

  // Search narrows the list.
  await page.locator('ion-searchbar input').filter({ visible: true }).fill('barako');
  await expect(page.getByText('2 model(s) found')).toBeVisible();

  // Open a bike's details.
  await page.getByRole('link', { name: /Kawasaki Barako II 175/ }).click();
  await expect(page).toHaveURL(/\/tabs\/motorcycles\/barako-2$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Kawasaki Barako II 175' })).toBeVisible();

  // Jump to the calculator with this bike pre-selected.
  await navButton(page, 'Compute Monthly Installment').click();
  await expect(page).toHaveURL(/\/tabs\/financing\?bike=barako-2$/);

  const bikeSelect = page.locator('[data-testid="calc-bike"]').filter({ visible: true });
  await expect(bikeSelect).toContainText('Kawasaki Barako II 175');
  // 20% of 95,500 = 19,100 down; 76,400 x (1 + 2% x 24) / 24 = 4,711.3 -> 4,712
  await expect(page.locator('[data-testid="calc-down"]').filter({ visible: true })).toContainText('19,100');
  await expect(page.locator('[data-testid="calc-monthly"]').filter({ visible: true })).toContainText('4,712');

  // Switching to 12 months raises the monthly payment.
  await page.locator('ion-segment-button').filter({ hasText: '12 mo', visible: true }).click();
  // 76,400 x (1 + 1.8% x 12) / 12 = 7,741.9 -> 7,742
  await expect(page.locator('[data-testid="calc-monthly"]').filter({ visible: true })).toContainText('7,742');
});

test('test-ride form is pre-filled from the bike page and validates input', async ({ page }) => {
  await page.goto('/tabs/motorcycles/ninja-500');
  await navButton(page, 'Book a Test Ride').click();
  await expect(page).toHaveURL(/\/tabs\/contact\?type=test-ride&bike=ninja-500$/);

  // Submitting empty shows the validation messages.
  await page.getByRole('button', { name: /Send via SMS/ }).click();
  await expect(page.getByText('Please enter your name.')).toBeVisible();
  await expect(page.getByText(/Enter a valid PH mobile number/)).toBeVisible();

  // Test rides ask for a preferred date.
  await expect(page.locator('ion-input input[type="date"]').filter({ visible: true })).toBeVisible();
});
