// Runs before the page paints, so it opens in the right theme with no flash.
// Follows the system unless you've picked light or dark with the toggle.
(function () {
  var stored = null;
  try {
    stored = localStorage.getItem('theme');
  } catch (e) {}
  var system = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', stored === 'light' || stored === 'dark' ? stored : system);
})();
