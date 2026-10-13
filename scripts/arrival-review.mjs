/* global window, document */
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { format } from 'prettier';
import { mkdir, writeFile } from 'node:fs/promises';
const output = 'docs/arrival-captures';
const baseURL = process.env.DERIN_PREVIEW_URL || 'http://127.0.0.1:5173';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
  args:
    process.platform === 'darwin'
      ? ['--enable-webgl', '--use-gl=angle', '--use-angle=metal']
      : ['--enable-webgl', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage({
  viewport: { width: 1536, height: 960 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text());
});
await page.goto(baseURL);
await page.locator('.world-ready').waitFor();
await page.waitForTimeout(16000);
await page.screenshot({ path: output + '/arrival-ui.png' });
const style = await page.addStyleTag({
  content:
    '.site-header,#main,.site-footer,.world-controls,.world-vignette{visibility:hidden!important}',
});
const raw = await page.screenshot({ path: output + '/arrival-geometry.png' });
if (process.argv.includes('--update-stills')) {
  await sharp(raw).webp({ quality: 88 }).toFile('public/images/arrival-still.webp');
  await sharp(raw).resize(900).webp({ quality: 85 }).toFile('public/images/arrival-mobile.webp');
}
await style.evaluate((el) => el.remove());
const initial = await page.evaluate(() => ({
  metrics: window.__worldMetrics,
  camera: window.__arrivalCamera,
  quality: document.querySelector('select')?.value,
  renderer: (() => {
    const gl = document.querySelector('canvas')?.getContext('webgl2');
    const ext = gl?.getExtension('WEBGL_debug_renderer_info');
    return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : 'unavailable';
  })(),
}));
await page.evaluate(() => window.scrollTo({ top: 800, behavior: 'instant' }));
await page.waitForTimeout(5000);
await page.screenshot({ path: output + '/arrival-scroll.png' });
const scroll = await page.evaluate(() => ({
  camera: window.__arrivalCamera,
  scrollY: window.scrollY,
}));
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
const qualitySamples = {};
for (const quality of ['low', 'high']) {
  await page.getByLabel('Graphics quality').selectOption(quality);
  await page.waitForTimeout(6500);
  qualitySamples[quality] = await page.evaluate(() => window.__worldMetrics);
  await page.screenshot({ path: output + '/arrival-' + quality + '.png' });
}
await page.close();
const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
await mobile.goto(baseURL);
await mobile.waitForTimeout(700);
await mobile.screenshot({ path: output + '/arrival-mobile.png' });
const mobileCanvas = await mobile.locator('canvas').count();
const report = { initial, scroll, qualitySamples, mobileCanvas, errors };
await writeFile(
  output + '/report.json',
  await format(JSON.stringify(report), { parser: 'json', printWidth: 100 }),
);
console.log(JSON.stringify(report, null, 2));
await browser.close();
if (errors.length) process.exitCode = 1;
