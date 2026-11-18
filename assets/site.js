(function () {
  var html = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  function syncToggleLabel() {
    var current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    toggle.textContent = current === 'dark' ? 'light' : 'dark';
    toggle.setAttribute('aria-label', 'Switch to ' + toggle.textContent + ' theme');
  }
  syncToggleLabel();

  toggle.addEventListener('click', function () {
    var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    if (next === 'dark') html.setAttribute('data-theme', 'dark');
    else html.removeAttribute('data-theme');
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncToggleLabel();
  });

  var nodes = document.querySelectorAll('.node, .node-btn');
  var contents = document.querySelectorAll('.desc-content');
  var defaultDesc = document.querySelector('.desc-default');
  var current = null;

  function select(key) {
    if (current === key) key = null;
    current = key;

    nodes.forEach(function (n) {
      n.classList.toggle('active', n.dataset.paper === key);
      if (n.getAttribute('role') === 'button' || n.tagName === 'BUTTON') {
        n.setAttribute('aria-pressed', n.dataset.paper === key ? 'true' : 'false');
      }
    });

    contents.forEach(function (c) {
      c.hidden = c.dataset.paper !== key;
    });

    if (defaultDesc) defaultDesc.hidden = !!key;
  }

  nodes.forEach(function (n) {
    n.addEventListener('click', function () { select(n.dataset.paper); });
    n.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        select(n.dataset.paper);
      }
    });
  });
})();
