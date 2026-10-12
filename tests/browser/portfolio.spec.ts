import { test, expect } from '@playwright/test';
const routes = [
  '/',
  '/work',
  '/work/priceuniverse',
  '/work/unirag',
  '/work/neural-network',
  '/work/roam',
  '/work/lael',
  '/about',
  '/lab',
  '/ask',
];
test('all routes load directly and reload with one primary heading', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('h1')).toHaveCount(1);
    await page.reload();
    await expect(page.locator('h1')).toBeVisible();
  }
  expect(errors).toEqual([]);
});
for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1660])
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const route of routes) {
      await page.goto(route);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        route,
      ).toBe(true);
    }
  });
test('mobile never mounts or downloads the realtime world', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  const worldRequests: string[] = [];
  page.on('request', (r) => {
    if (/ExperienceCanvas|three-engine/.test(r.url())) worldRequests.push(r.url());
  });
  await page.goto('/');
  await page.waitForTimeout(800);
  await expect(page.locator('canvas')).toHaveCount(0);
  expect(worldRequests).toEqual([]);
  await context.close();
});
test('reduced motion and coarse pointer disable Canvas on wide screens', async ({ browser }) => {
  for (const config of [{ reducedMotion: 'reduce' as const }, { hasTouch: true }]) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...config });
    const page = await context.newPage();
    await page.goto('/');
    await page.waitForTimeout(400);
    await expect(page.locator('canvas')).toHaveCount(0);
    await context.close();
  }
});
test('WebGL failure retains navigation and case content', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type: string, ...args: unknown[]) {
      if (type.includes('webgl')) return null;
      return Reflect.apply(original, this, [type, ...args]);
    } as typeof original;
  });
  await page.goto('/work/unirag');
  await expect(page.getByRole('heading', { name: 'UniRAG', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Read the source' })).toBeVisible();
  await expect(page.getByText('WORLD / STILL')).toBeVisible();
});
test('keyboard navigation and Ask destination are functional', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  await page.goto('/ask');
  await page.getByRole('button', { name: 'Explain UniRAG.' }).click();
  await page.getByRole('link', { name: 'Follow the retrieval' }).click();
  await expect(page).toHaveURL(/\/work\/unirag$/);
});
test('lab controls change real computations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/lab');
  const before = await page.locator('.lab-result').first().textContent();
  await page.getByRole('button', { name: 'Draw another sample' }).click();
  await expect(page.locator('.lab-result').first()).not.toHaveText(before!);
  await page.getByRole('searchbox').fill('offline');
  await page.locator('input[type=range]').last().fill('1');
  await expect(page.locator('.retrieval-results li').first()).toContainText('Local models');
  await page.getByRole('button', { name: 'Input pixel 1' }).click();
  await expect(page.getByRole('button', { name: 'Input pixel 1' })).toHaveAttribute(
    'aria-pressed',
    'false',
  );
});
test('sound is off by default and explicit mute persists', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'SOUND OFF' }).click();
  await expect(page.getByRole('button', { name: 'SOUND ON' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.getByRole('button', { name: 'SOUND ON' }).click();
  expect(await page.evaluate(() => localStorage.getItem('derin-sound'))).toBe('off');
  await page.reload();
  await expect(page.getByRole('button', { name: 'SOUND OFF' })).toHaveAttribute(
    'aria-pressed',
    'false',
  );
});
test('desktop retains one Canvas and persists explicit quality', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator('canvas')).toHaveCount(1);
  await page.getByLabel('Graphics quality').selectOption('low');
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Work', exact: true })
    .click();
  await expect(page.locator('canvas')).toHaveCount(1);
  await page.reload();
  await expect(page.getByLabel('Graphics quality')).toHaveValue('low');
});
