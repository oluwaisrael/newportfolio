/* global window */
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
const output = '/tmp/derin-review';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
  args: ['--enable-webgl', '--use-gl=angle', '--use-angle=metal'],
});
const errors = [];
for (const size of [
  { width: 1440, height: 900 },
  { width: 1600, height: 1000 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
]) {
  const mobile = size.width < 900;
  const context = await browser.newContext({
    viewport: size,
    deviceScaleFactor: 1,
    isMobile: mobile,
    hasTouch: mobile,
  });
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('http://127.0.0.1:5173');
  await page.waitForTimeout(mobile ? 500 : 15000);
  await page.screenshot({ path: `${output}/home-${size.width}.png` });
  console.log(
    size.width,
    await page.evaluate(() => ({
      canvas: window.document.querySelectorAll('canvas').length,
      metrics: window.__worldMetrics,
    })),
  );
  if (size.width === 1600) {
    await page.addStyleTag({
      content:
        '.site-header,#main,.site-footer,.world-controls,.world-vignette{visibility:hidden!important}',
    });
    const raw = await page.screenshot();
    await sharp(raw).webp({ quality: 86 }).toFile('public/images/world-still.webp');
    await sharp(raw).resize(900).webp({ quality: 84 }).toFile('public/images/world-mobile.webp');
    for (const slug of ['priceuniverse', 'unirag', 'neural-network', 'roam', 'lael']) {
      await page.goto('http://127.0.0.1:5173/work/' + slug);
      await page.waitForTimeout(6000);
      await page.addStyleTag({
        content:
          '.site-header,#main,.site-footer,.world-controls,.world-vignette{visibility:hidden!important}',
      });
      await sharp(await page.screenshot())
        .resize(1280)
        .webp({ quality: 84 })
        .toFile(`public/images/world-${slug}.webp`);
    }
  }
  if (size.width === 1440 || size.width === 390) {
    for (const route of [
      '/work',
      '/work/unirag',
      '/work/neural-network',
      '/about',
      '/lab',
      '/ask',
    ]) {
      await page.goto('http://127.0.0.1:5173' + route);
      await page.waitForTimeout(mobile ? 200 : 5000);
      await page.screenshot({
        path: `${output}/${route.replaceAll('/', '_')}-${size.width}.png`,
        fullPage: mobile,
      });
    }
  }
  await context.close();
}
console.log({ errors });
await browser.close();
if (errors.length) process.exitCode = 1;
