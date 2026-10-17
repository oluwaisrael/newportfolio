import { test, expect } from '@playwright/test';

test('arrival follows the elevated route and can return to its starting shot', async ({ page }) => {
  await page.setViewportSize({ width: 1536, height: 960 });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('.world-ready')).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => window.__arrivalCamera?.position[2]))
    .toBeGreaterThan(45);
  await page.mouse.wheel(0, 800);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(600);
  await expect
    .poll(() => page.evaluate(() => window.__arrivalCamera?.position[2]))
    .toBeLessThan(35);
  const y = await page.evaluate(() => window.__arrivalCamera!.position[1]);
  expect(y).toBeGreaterThan(8);
  expect(y).toBeLessThan(24);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect
    .poll(() => page.evaluate(() => window.__arrivalCamera?.position[2]), { timeout: 10000 })
    .toBeGreaterThan(50);
  expect(errors).toEqual([]);
});

test('reduced-motion entry reaches the accessible destination index without WebGL', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('link', { name: 'Enter the world' }).click();
  await expect(page).toHaveURL(/#discover$/);
  await expect(page.locator('#discover')).toBeInViewport();
  await expect(page.locator('canvas')).toHaveCount(0);
  await page
    .locator('.destination-index')
    .getByRole('link', { name: /Lael — Local AI/ })
    .click();
  await expect(page).toHaveURL(/\/work\/lael-ai$/);
});
