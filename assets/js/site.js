// Magpie website: theme toggle, download links, screenshot tour, scroll reveals.

const CONFIG = {
  // Where the installers are published. If the app's code repository becomes
  // private, point this at a public repository that holds the releases instead.
  releasesRepo: 'RudraKalsariya/-Storing-Design-Library',
  // Magpie's page in the Microsoft Store.
  storeUrl: 'https://apps.microsoft.com/search?query=Magpie%20Library',
};

const root = document.documentElement;

/* ---------- theme ---------- */

function setTheme(theme, remember) {
  root.setAttribute('data-theme', theme);
  if (remember) {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
  }
  const toggle = document.querySelector('.theme-toggle');
  if (toggle) toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

document.querySelectorAll('.theme-toggle').forEach((button) => {
  button.addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true));
});
setTheme(root.getAttribute('data-theme') || 'light', false);

// Follow the system while you haven't chosen a theme yourself.
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
systemDark.addEventListener?.('change', (e) => {
  let stored = null;
  try {
    stored = localStorage.getItem('theme');
  } catch (err) {}
  if (!stored) setTheme(e.matches ? 'dark' : 'light', false);
});

/* ---------- header border on scroll ---------- */

const header = document.querySelector('.site-header');
const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- downloads ---------- */

const releasesPage = `https://github.com/${CONFIG.releasesRepo}/releases/latest`;
const links = {
  store: CONFIG.storeUrl,
  win: releasesPage,
  macArm: releasesPage,
  macIntel: releasesPage,
};

function applyLinks() {
  document.querySelectorAll('[data-download]').forEach((a) => {
    const href = links[a.dataset.download];
    if (href) a.href = href;
  });
}

// Fill in direct links to the newest installers. If GitHub can't be reached,
// every button still goes to the releases page.
async function loadLatestRelease() {
  applyLinks();
  try {
    const res = await fetch(`https://api.github.com/repos/${CONFIG.releasesRepo}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) return;
    const release = await res.json();
    const find = (suffix) => release.assets?.find((a) => a.name.endsWith(suffix))?.browser_download_url;
    links.win = find('-win-x64.exe') || links.win;
    links.macArm = find('-mac-arm64.dmg') || links.macArm;
    links.macIntel = find('-mac-x64.dmg') || links.macIntel;
    applyLinks();
    document.querySelectorAll('[data-version]').forEach((el) => {
      el.textContent = `Latest version ${release.tag_name.replace(/^v/, '')}`;
    });
  } catch (e) {}
}
loadLatestRelease();

// The big button in the hero matches your computer.
function detectPlatform() {
  const p = (navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || '').toLowerCase();
  if (p.includes('win')) return 'windows';
  if (p.includes('mac')) return 'mac';
  return 'other';
}
const platform = detectPlatform();
document.querySelectorAll('[data-platform]').forEach((el) => {
  el.hidden = !el.dataset.platform.split(' ').includes(platform);
});

/* ---------- screenshot tour ---------- */

const tabs = [...document.querySelectorAll('.tab')];
function selectTab(tab) {
  tabs.forEach((t) => {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls'))?.classList.toggle('active', on);
  });
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = tabs[(i + step + tabs.length) % tabs.length];
    selectTab(next);
    next.focus();
  });
});

/* ---------- reveal on scroll ---------- */

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
