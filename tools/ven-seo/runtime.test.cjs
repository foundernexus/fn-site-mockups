const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'site.json'), 'utf8'));
const code = fs.readFileSync(path.join(__dirname, 'runtime.js'), 'utf8');
const routes = Object.fromEntries(Object.entries(config.pages).map(([route, meta]) => [route, meta.path]));
let checks = 0;

function page(href, route) {
  const url = new URL(href);
  const navigation = [];
  const events = {};
  const data = {route, routes, basePath: '/', title: config.pages[route].title, advisorPages: 2};
  const context = {
    URL, URLSearchParams,
    window: {},
    location: {
      href: url.href, origin: url.origin, search: url.search, hash: url.hash,
      assign: value => navigation.push(['assign', value]),
      replace: value => navigation.push(['replace', value]),
    },
    document: {getElementById: () => ({textContent: JSON.stringify(data)}), querySelectorAll: () => [], body: {}},
    MutationObserver: class { observe() {} },
    addEventListener: (event, handler) => { events[event] = handler; },
  };
  vm.runInNewContext(code, context);
  return {context, navigation, events};
}

{
  const p = page('https://www.venexecs.com/?utm_source=partner#/clean/apply.html?intent=team&role=finance#main', 'clean/index.html');
  assert.deepEqual(p.navigation, [['replace', 'https://www.venexecs.com/learn-more/?utm_source=partner&intent=team&role=finance#main']]);
  checks++;
}
{
  const p = page('https://www.venexecs.com/learn-more/?intent=team&role=finance&utm_campaign=launch', 'clean/apply.html');
  assert.equal(p.context.window.__VEN_PAGE_QUERY__, '?intent=team&role=finance&utm_campaign=launch');
  assert.equal(p.context.window.__VEN_PAGE_ROUTE__, 'apply.html');
  assert.equal(p.context.window.__VEN_FULL_ROUTE__, 'clean/apply.html');
  assert.equal(p.context.window.__VEN_SEO_TITLE__, config.pages['clean/apply.html'].title);
  assert.equal(p.navigation.length, 0);
  checks++;
}
{
  const p = page('https://www.venexecs.com/roles/', 'clean/roles.html');
  p.context.window.__VEN_NAVIGATE__('role-finance.html?intent=team#role-example');
  assert.deepEqual(p.navigation, [['assign', 'https://www.venexecs.com/roles/finance/?intent=team#role-example']]);
  for (const value of ['https://platform.foundernexus.com/registration', '//example.com/', 'mailto:someone@example.com', 'tel:+12065550123', 'unknown.html']) {
    assert.equal(p.context.window.__VEN_HAS_PAGE__(value), false);
    p.context.window.__VEN_NAVIGATE__(value);
  }
  assert.equal(p.navigation.length, 1);
  checks++;
}
{
  const p = page('https://www.venexecs.com/advisors/?page=2&utm_source=directory', 'clean/experts.html');
  assert.deepEqual(p.navigation, [['replace', 'https://www.venexecs.com/advisors/page/2/?utm_source=directory']]);
  checks++;
}
{
  const p = page('https://www.venexecs.com/advisors/page/2/', 'clean/experts-2.html');
  p.context.window.__VEN_NAVIGATE__('experts-2.html?page=1');
  assert.deepEqual(p.navigation, [['assign', 'https://www.venexecs.com/advisors/']]);
  p.context.window.__VEN_NAVIGATE__('experts-2.html?page=999');
  assert.equal(p.navigation[1][1], 'https://www.venexecs.com/advisors/page/2/');
  checks++;
}
{
  const p = page('https://www.venexecs.com/how-it-works/', 'clean/membership.html');
  p.context.location.hash = '#/clean/experts-2.html#dave-parker';
  p.events.hashchange();
  assert.deepEqual(p.navigation, [['replace', 'https://www.venexecs.com/advisors/page/2/#dave-parker']]);
  checks++;
}
{
  const p = page('https://www.venexecs.com/roles/', 'clean/roles.html');
  p.context.window.__VEN_NAVIGATE__('https://www.venexecs.com/#/clean/role-marketing.html');
  assert.deepEqual(p.navigation, [['assign', 'https://www.venexecs.com/roles/marketing/']]);
  checks++;
}
console.log(`${checks} navigation compatibility scenarios passed: legacy URLs, team/role attribution, clean links, pagination and external destinations.`);
