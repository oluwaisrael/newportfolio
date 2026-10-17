/* global document, window */
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
  args:
    process.platform === 'darwin'
      ? ['--enable-webgl', '--use-gl=angle', '--use-angle=metal']
      : ['--enable-webgl', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
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
const errors = [];
for (const mobile of [true, false]) {
  const context = await browser.newContext({
    viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
    isMobile: mobile,
    hasTouch: mobile,
  });
  const page = await context.newPage();
  const worldRequests = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('response', (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
  });
  page.on('request', (r) => {
    if (/three-engine|ExperienceCanvas/.test(r.url())) worldRequests.push(r.url());
  });
  for (const route of routes) {
    await page.goto('http://127.0.0.1:4173' + route);
    await page.locator('h1').waitFor();
    if (!mobile) await page.locator('.world-ready').waitFor();
    assert.equal(await page.locator('canvas').count(), mobile ? 0 : 1);
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      true,
    );
  }
  if (mobile)
    assert.equal(worldRequests.length, 0, 'Mobile must not download realtime scene chunks');
  console.log(
    `${mobile ? 'Mobile' : 'Desktop'}: all ${routes.length} production routes pass; scene requests: ${worldRequests.length}`,
  );
  await context.close();
}
await browser.close();
assert.deepEqual(errors, []);
console.log('Production console and HTTP errors: 0');
