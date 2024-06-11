import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...

  await page.goto('https://demo.nopcommerce.com/build-your-own-computer');
  await page.getByRole('heading', { name: 'Build your own computer' }).click();
  await page.getByText('Build it').click();
  await page.locator('.product-review-box').first().click();
  await page.getByRole('link', { name: 'review(s)' }).click();
  await page.getByText('SKU: COMP_CUST').click();
  await page.locator('div').filter({ hasText: /^Free shipping$/ }).first().click();
  await page.getByText('Processor *').click();
  await page.locator('#product_attribute_input_1').click();
  await page.getByText('RAM *').click();
  await page.locator('#product_attribute_input_2').click();
  await page.getByText('HDD *').click();
  await page.getByText('GB 400 GB [+$100.00]').click();
  await page.getByText('HDD *').click();
  await page.getByText('GB 400 GB [+$100.00]').click();
  await page.getByText('OS *').click();
  await page.getByText('Vista Home [+$50.00] Vista').click();
  await page.locator('#product_attribute_label_5').click();
  await page.getByText('Microsoft Office [+$50.00] Acrobat Reader [+$10.00] Total Commander [+$5.00]').click();
  await page.locator('div').filter({ hasText: /^\$1,315\.00$/ }).nth(1).click();
  await page.getByLabel('Enter a quantity').click();
  await page.locator('#product-details-form div').filter({ hasText: 'Qty: Add to cart' }).nth(3).click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('button', { name: 'Add to wishlist' }).click();
  await page.getByRole('button', { name: 'Add to compare list' }).click();
  await page.getByRole('button', { name: 'Email a friend' }).click();
});