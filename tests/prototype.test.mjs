import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../src/index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8');
const js = await readFile(new URL('../src/app.js', import.meta.url), 'utf8');

test('prototype has site area beside a right AI panel', () => {
  assert.match(html, /class="site-area"/);
  assert.match(html, /id="ai-panel"/);
  assert.ok(html.indexOf('class="site-area"') < html.indexOf('id="ai-panel"'));
});

test('brand animation and reduced motion support are present', () => {
  assert.match(html, /class="hero-ai"/);
  assert.match(css, /\.ai-open \.hero-ai\s*\{/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

test('prototype makes no model, network, or microphone requests', () => {
  assert.doesNotMatch(js, /\bfetch\s*\(|\bWebSocket\b|getUserMedia|XMLHttpRequest/);
  assert.doesNotMatch(html, /<iframe|https?:\/\//);
});

test('composer and panel controls are wired in local JS', () => {
  assert.match(js, /send-button/);
  assert.match(js, /panel-toggle/);
  assert.match(js, /resize-handle/);
});
