/* =====================================================
   BANTAM APPS — APPLICATION SCRIPT
   Vanilla JavaScript, no jQuery, no frameworks
   ===================================================== */

(function () {
  'use strict';

  /* -----------------------------------------------------
     1. TOOL DATA
     Single source of truth for every category and tool.
     Rendered dynamically so search / filter / sort just
     work against this array instead of the DOM.
  ----------------------------------------------------- */
  const CATEGORIES = [
    { id: 'excel',     label: 'Excel Tools',   icon: 'fa-file-excel',   grad: 'grad-excel' },
    { id: 'pdf',       label: 'PDF Tools',     icon: 'fa-file-pdf',     grad: 'grad-pdf' },
    { id: 'mail',      label: 'Mail Tools',    icon: 'fa-envelope',     grad: 'grad-mail' },
    { id: 'college',   label: 'College Tools', icon: 'fa-graduation-cap', grad: 'grad-college' },
    { id: 'ai',        label: 'AI Tools',      icon: 'fa-robot',        grad: 'grad-ai' },
    { id: 'image',     label: 'Image Tools',   icon: 'fa-robot',        grad: 'grad-image' },
    { id: 'utilities', label: 'Utilities',     icon: 'fa-toolbox',      grad: 'grad-utils' }
  ];

  // dateAdded is a simple incrementing index — higher = more recent.
  const TOOLS = [
    // ---- Excel Tools ----
    { id: 'merge-sheets', name: 'Merge Sheets', category: 'excel', icon: 'fa-object-group', desc: 'Combine multiple Excel sheets into a single consolidated workbook in seconds.', dateAdded: 10, popular: true },
    { id: 'column-combiner', name: 'Column-Combiner', category: 'excel', icon: 'fa-scissors', desc: 'Load a sheet, choose a column to group by, then choose the column(s) whose values should spread across separate columns for each group.', dateAdded: 9 },
    { id: 'compare-excel', name: 'Compare Excel', category: 'excel', icon: 'fa-code-compare', desc: 'Spot differences between two spreadsheets instantly, cell by cell.', dateAdded: 8 },
    { id: 'remove-duplicates', name: 'Remove Duplicates', category: 'excel', icon: 'fa-clone', desc: 'Clean up rows and remove duplicate entries across any column set.', dateAdded: 7, popular: true },
    { id: 'grade-converter', name: 'Grade Converter', category: 'excel', icon: 'fa-percent', desc: 'Convert raw marks into grades and grade points using custom scales.', dateAdded: 27, isNew: true, popular: true },
    { id: 'attendance-analyzer', name: 'Attendance Analyzer', category: 'excel', icon: 'fa-chart-column', desc: 'Analyze attendance sheets and flag students below the required percentage.', dateAdded: 6 },
    { id: 'subject-mapper', name: 'Subject Mapper', category: 'excel', icon: 'fa-diagram-project', desc: 'Map subjects to faculty, sections, and semesters in one clean sheet.', dateAdded: 5 },

    // ---- PDF Tools ----
    { id: 'merge-pdf', name: 'Merge PDF', category: 'pdf', icon: 'fa-file-circle-plus', desc: 'Combine multiple PDF files into a single, ordered document.', dateAdded: 12, popular: true },
    { id: 'split-pdf', name: 'Split PDF', category: 'pdf', icon: 'fa-file-export', desc: 'Extract or split a PDF into individual pages or custom ranges.', dateAdded: 11 },
    { id: 'compress-pdf', name: 'Compress PDF', category: 'pdf', icon: 'fa-compress', desc: 'Shrink PDF file size while keeping text and images sharp.', dateAdded: 13, popular: true },
    { id: 'extract-pages', name: 'Extract Pages', category: 'pdf', icon: 'fa-file-arrow-down', desc: 'Pull out specific pages from a PDF into a brand-new file.', dateAdded: 4 },
    { id: 'search-pdf', name: 'Search PDF', category: 'pdf', icon: 'fa-magnifying-glass', desc: 'Full-text search across one or hundreds of PDF documents at once.', dateAdded: 26, isNew: true },
    { id: 'convert-pdf', name: 'Convert PDF', category: 'pdf', icon: 'fa-file-word', desc: 'Convert PDFs to Word, Excel, or image formats and back again.', dateAdded: 3 },

    // ---- Mail Tools ----
    { id: 'mail-merge', name: 'Mail Merge', category: 'mail', icon: 'fa-envelope-open-text', desc: 'Send personalized emails to a whole list from one template.', dateAdded: 14, popular: true },
    { id: 'email-validator', name: 'Email Validator', category: 'mail', icon: 'fa-envelope-circle-check', desc: 'Verify email addresses in bulk and filter out invalid entries.', dateAdded: 2 },
    { id: 'bulk-email-sender', name: 'Bulk Email Sender', category: 'mail', icon: 'fa-paper-plane', desc: 'Schedule and send bulk emails with delivery tracking built in.', dateAdded: 1 },

	 // ---- Image Tools ----
    { id: 'max-photo', name: 'Max Size Photo', category: 'image', icon: 'fa-envelope-open-text', desc: 'Passport size photo to Multple Photo to fit Max size.', dateAdded: 14, popular: true },
  

    // ---- College Tools ----
    { id: 'exam-scheduler', name: 'Exam Scheduler', category: 'college', icon: 'fa-calendar-days', desc: 'Auto-generate clash-free exam timetables across departments.', dateAdded: 15, popular: true },
    { id: 'hall-allocation', name: 'Hall Allocation', category: 'college', icon: 'fa-chalkboard', desc: 'Allocate students to examination halls with seating plans.', dateAdded: 16 },
    { id: 'result-analysis', name: 'Result Analysis', category: 'college', icon: 'fa-chart-pie', desc: 'Analyze semester results with pass percentage and rank insights.', dateAdded: 17, popular: true },
    { id: 'co-po-mapping', name: 'CO PO Mapping', category: 'college', icon: 'fa-table-cells', desc: 'Map course outcomes to program outcomes for accreditation reports.', dateAdded: 18 },
    { id: 'question-paper-search', name: 'Question Paper Search', category: 'college', icon: 'fa-magnifying-glass-chart', desc: 'Search previous question papers by subject, year, or semester.', dateAdded: 19 },
    { id: 'question-paper-generator', name: 'Question Paper Generator', category: 'college', icon: 'fa-file-pen', desc: 'Generate question papers from a curated question bank in minutes.', dateAdded: 28, isNew: true, popular: true },
    { id: 'certificate-generator', name: 'Certificate Generator', category: 'college', icon: 'fa-award', desc: 'Create bulk certificates from a template and a name list.', dateAdded: 20 },
    { id: 'student-register-search', name: 'Student Register Search', category: 'college', icon: 'fa-id-card', desc: 'Look up student register numbers and records instantly.', dateAdded: 21 },

    // ---- AI Tools ----
    { id: 'Encript', name: 'Encript', category: 'ai', icon: 'fa-pen-nib', desc: 'Encript the html file with source code protection.', dateAdded: 22, popular: true },
    { id: 'ai-image-generator', name: 'AI Image Generator', category: 'ai', icon: 'fa-image', desc: 'Generate original images and illustrations from a text prompt.', dateAdded: 23 },
    { id: 'ai-question-generator', name: 'AI Question Generator', category: 'ai', icon: 'fa-circle-question', desc: 'Generate exam-ready questions from any topic or syllabus.', dateAdded: 24 },
    { id: 'ai-assistant', name: 'AI Assistant', category: 'ai', icon: 'fa-robot', desc: 'A general-purpose AI assistant for everyday admin tasks.', dateAdded: 25, isNew: true, popular: true },



    // ---- Utilities ----
    { id: 'qr-generator', name: 'QR Generator', category: 'utilities', icon: 'fa-qrcode', desc: 'Create scannable QR codes for links, text, or contact details.', dateAdded: 30, isNew: true, popular: true },
    { id: 'barcode-generator', name: 'Barcode Generator', category: 'utilities', icon: 'fa-barcode', desc: 'Generate standard barcodes for inventory or asset tagging.', dateAdded: 29, isNew: true },
    { id: 'barcode-scanner', name: 'Barcode Scanner', category: 'utilities', icon: 'fa-camera', desc: 'Scan barcodes using your device camera in the browser.', dateAdded: 31, isNew: true },
    { id: 'password-generator', name: 'Password Generator', category: 'utilities', icon: 'fa-key', desc: 'Generate strong, random passwords with custom rules.', dateAdded: 0 },
    { id: 'unit-converter', name: 'Unit Converter', category: 'utilities', icon: 'fa-ruler-combined', desc: 'Convert between length, weight, temperature, and more.', dateAdded: -1 },
    { id: 'age-calculator', name: 'Age Calculator', category: 'utilities', icon: 'fa-cake-candles', desc: 'Calculate exact age or duration between any two dates.', dateAdded: -2 },
    { id: 'calendar', name: 'Calendar', category: 'utilities', icon: 'fa-calendar', desc: 'A shared academic calendar for events, exams, and holidays.', dateAdded: -3 }
  ];

  const TOTAL_TOOLS = TOOLS.length;

  // Resolve the page a tool should open. Uses tool.url if explicitly set,
  // otherwise falls back to "<tool-id>.html" (e.g. mail-merge -> mail-merge.html).
  function getToolUrl(tool) {
    return tool.url || (tool.id + '.html');
  }

  /* -----------------------------------------------------
     2. STATE (persisted to Local Storage)
  ----------------------------------------------------- */
  const LS_KEYS = { favorites: 'sth_favorites', recent: 'sth_recent', theme: 'sth_theme' };

  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function saveJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
  }

  let favorites = loadJSON(LS_KEYS.favorites, []);   // array of tool ids
  let recentIds = loadJSON(LS_KEYS.recent, []);       // array of tool ids, most recent first

  /* -----------------------------------------------------
     3. UTILITIES
  ----------------------------------------------------- */
  function getCategory(id) { return CATEGORIES.find(function (c) { return c.id === id; }); }
  function getTool(id) { return TOOLS.find(function (t) { return t.id === id; }); }
  function isFavorite(id) { return favorites.indexOf(id) !== -1; }

  function debounce(fn, delay) {
    let timer;
    return function () {
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(null, args); }, delay);
    };
  }

  /* -----------------------------------------------------
     4. TOAST NOTIFICATIONS
  ----------------------------------------------------- */
  function showToast(message, type) {
    type = type || 'primary';
    const container = document.getElementById('toastContainer');
    const iconMap = { primary: 'fa-circle-info', success: 'fa-circle-check', warning: 'fa-triangle-exclamation', danger: 'fa-circle-xmark' };
    const el = document.createElement('div');
    el.className = 'toast align-items-center border-0';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.innerHTML =
      '<div class="d-flex">' +
        '<div class="toast-body"><i class="fa-solid ' + (iconMap[type] || iconMap.primary) + ' text-' + type + ' me-2"></i>' + message + '</div>' +
        '<button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>' +
      '</div>';
    container.appendChild(el);
    const toast = new bootstrap.Toast(el, { delay: 2600 });
    toast.show();
    el.addEventListener('hidden.bs.toast', function () { el.remove(); });
  }

  /* -----------------------------------------------------
     5. RENDER: TOOL CARDS BY CATEGORY
  ----------------------------------------------------- */
  const container = document.getElementById('toolCategoriesContainer');
  const cardTemplate = document.getElementById('toolCardTemplate');

  function buildToolCard(tool) {
    const cat = getCategory(tool.category);
    const node = cardTemplate.content.cloneNode(true);
    const col = node.querySelector('.tool-col');
    const card = node.querySelector('.tool-card');
    const favBtn = node.querySelector('.fav-btn');
    const iconWrap = node.querySelector('.tool-icon');
    const iconEl = iconWrap.querySelector('i');
    const catBadge = node.querySelector('.category-badge');
    const nameEl = node.querySelector('.tool-name');
    const descEl = node.querySelector('.tool-desc');
    const openBtn = node.querySelector('.btn-open-tool');

    col.dataset.toolId = tool.id;
    col.dataset.category = tool.category;
    col.dataset.name = tool.name.toLowerCase();
    col.dataset.dateAdded = tool.dateAdded;

    iconWrap.classList.add(cat.grad);
    iconEl.classList.add(tool.icon);
    catBadge.textContent = cat.label;
    nameEl.textContent = tool.name;
    descEl.textContent = tool.desc;

    if (tool.isNew) {
      const tag = document.createElement('span');
      tag.className = 'new-tag';
      tag.textContent = 'NEW';
      card.appendChild(tag);
    }

    if (isFavorite(tool.id)) {
      favBtn.classList.add('active');
      favBtn.querySelector('i').classList.remove('fa-regular');
      favBtn.querySelector('i').classList.add('fa-solid');
    }
    favBtn.setAttribute('aria-pressed', isFavorite(tool.id) ? 'true' : 'false');
    favBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleFavorite(tool.id, favBtn);
    });

    openBtn.addEventListener('click', function (e) {
      createRipple(e, openBtn);
      openTool(tool.id);
    });

    card.addEventListener('click', function (e) {
      if (e.target.closest('.fav-btn') || e.target.closest('.btn-open-tool')) return;
      openToolModal(tool.id);
    });

    return node;
  }

  function renderCategories() {
    container.innerHTML = '';
    CATEGORIES.forEach(function (cat, idx) {
      const tools = TOOLS.filter(function (t) { return t.category === cat.id; });
      const section = document.createElement('section');
      section.className = 'category-section';
      section.id = 'cat-' + cat.id;

      section.innerHTML =
        '<div class="category-heading fade-in-up" style="--delay:' + (idx * 0.03) + 's">' +
          '<span class="cat-icon-badge ' + cat.grad + '"><i class="fa-solid ' + cat.icon + '"></i></span>' +
          '<h2>' + cat.label + '</h2>' +
          '<span class="badge count-badge">' + tools.length + ' tools</span>' +
        '</div>' +
        '<div class="row g-3 tools-row" data-category-row="' + cat.id + '"></div>';

      const row = section.querySelector('.tools-row');
      tools.forEach(function (tool, i) {
        const card = buildToolCard(tool);
        card.querySelector('.tool-card').style.setProperty('--delay', (i * 0.04) + 's');
        row.appendChild(card);
      });

      container.appendChild(section);
    });
  }

  /* -----------------------------------------------------
     6. RIPPLE EFFECT (buttons)
  ----------------------------------------------------- */
  function createRipple(event, btn) {
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const rect = btn.getBoundingClientRect();
    circle.style.width = circle.style.height = diameter + 'px';
    circle.style.left = (event.clientX - rect.left - diameter / 2) + 'px';
    circle.style.top = (event.clientY - rect.top - diameter / 2) + 'px';
    circle.classList.add('ripple');
    const existing = btn.querySelector('.ripple');
    if (existing) existing.remove();
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(circle);
    setTimeout(function () { circle.remove(); }, 600);
  }
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.btn');
    if (btn) createRipple(e, btn);
  });

  /* -----------------------------------------------------
     7. FAVORITES
  ----------------------------------------------------- */
  function toggleFavorite(toolId, btnEl) {
    const idx = favorites.indexOf(toolId);
    const tool = getTool(toolId);
    if (idx === -1) {
      favorites.push(toolId);
      showToast('"' + tool.name + '" added to favorites', 'success');
    } else {
      favorites.splice(idx, 1);
      showToast('"' + tool.name + '" removed from favorites', 'warning');
    }
    saveJSON(LS_KEYS.favorites, favorites);

    // Sync all instances of this tool's favorite button (card may appear once, but stay safe)
    document.querySelectorAll('.tool-col[data-tool-id="' + toolId + '"] .fav-btn').forEach(function (b) {
      const active = isFavorite(toolId);
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
      const icon = b.querySelector('i');
      icon.classList.toggle('fa-solid', active);
      icon.classList.toggle('fa-regular', !active);
    });

    updateFavoriteCounters();
  }

  function updateFavoriteCounters() {
    const sidebarFavCountEl = document.getElementById('sidebarFavCount');
    if (sidebarFavCountEl) {
      sidebarFavCountEl.textContent = favorites.length + (favorites.length === 1 ? ' Favorite' : ' Favorites');
    }
    animateCounterTo(document.getElementById('heroFavCounter'), favorites.length);
  }

  /* -----------------------------------------------------
     8. RECENTLY USED
  ----------------------------------------------------- */
  function addToRecent(toolId) {
    recentIds = recentIds.filter(function (id) { return id !== toolId; });
    recentIds.unshift(toolId);
    recentIds = recentIds.slice(0, 8);
    saveJSON(LS_KEYS.recent, recentIds);
  }

  /* -----------------------------------------------------
     9. OPEN TOOL (launch simulation)
  ----------------------------------------------------- */
  function openTool(toolId) {
    const tool = getTool(toolId);
    if (!tool) return;
    addToRecent(toolId);
    showLoadingToast(tool.name);
    const url = getToolUrl(tool);
    // Small delay so the toast is visible before the tab switch/navigation happens.
    setTimeout(function () {
      window.open(url, '_blank', 'noopener');
    }, 250);
  }

  function showLoadingToast(name) {
    showToast('Opening "' + name + '"…', 'primary');
  }

  /* -----------------------------------------------------
     10. TOOL DETAIL MODAL
  ----------------------------------------------------- */
  const toolModalEl = document.getElementById('toolModal');
  const toolModal = new bootstrap.Modal(toolModalEl);
  let activeModalToolId = null;

  function openToolModal(toolId) {
    const tool = getTool(toolId);
    const cat = getCategory(tool.category);
    document.getElementById('toolModalLabel').textContent = tool.name;
    document.getElementById('modalToolDesc').textContent = tool.desc;
    document.getElementById('modalToolCategory').textContent = cat.label;

    const iconWrap = document.getElementById('modalToolIcon');
    iconWrap.className = 'modal-tool-icon ' + cat.grad;
    iconWrap.innerHTML = '<i class="fa-solid ' + tool.icon + '"></i>';

    activeModalToolId = toolId;
    toolModal.show();
  }

  document.getElementById('modalLaunchBtn').addEventListener('click', function () {
    if (activeModalToolId) {
      openTool(activeModalToolId);
      toolModal.hide();
    }
  });

  /* -----------------------------------------------------
     12. ANIMATED COUNTERS
  ----------------------------------------------------- */
  function animateCounterTo(el, target) {
    if (!el) return;
    const start = parseInt(el.textContent, 10) || 0;
    if (start === target) { el.textContent = target; return; }
    const duration = 500;
    const startTime = performance.now();
    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.round(start + (target - start) * progress);
      el.textContent = value;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function runInitialCounters() {
    document.querySelectorAll('.counter').forEach(function (el) {
      const target = parseInt(el.dataset.target, 10) || 0;
      animateCounterTo(el, target);
    });
  }

  /* -----------------------------------------------------
     13. SEARCH SUGGESTIONS (top navbar)
  ----------------------------------------------------- */
  const globalSearch = document.getElementById('globalSearch');
  const suggestionsBox = document.getElementById('searchSuggestions');

  function renderSuggestions(query) {
    const q = query.trim().toLowerCase();
    if (!q) { suggestionsBox.classList.remove('show'); suggestionsBox.innerHTML = ''; return; }
    const matches = TOOLS.filter(function (t) { return t.name.toLowerCase().includes(q); }).slice(0, 7);
    if (!matches.length) {
      suggestionsBox.innerHTML = '<div class="no-results"><i class="fa-regular fa-face-frown me-2"></i>No tools match "' + query + '"</div>';
      suggestionsBox.classList.add('show');
      return;
    }
    suggestionsBox.innerHTML = matches.map(function (t) {
      const cat = getCategory(t.category);
      return '<div class="suggestion-item" role="option" data-tool-id="' + t.id + '">' +
        '<i class="fa-solid ' + t.icon + '"></i><span>' + t.name + '</span>' +
        '<span class="ms-auto small text-muted-light">' + cat.label + '</span></div>';
    }).join('');
    suggestionsBox.classList.add('show');

    suggestionsBox.querySelectorAll('.suggestion-item').forEach(function (item) {
      item.addEventListener('click', function () {
        const id = item.dataset.toolId;
        globalSearch.value = '';
        suggestionsBox.classList.remove('show');
        openToolModal(id);
        scrollToCategory(getTool(id).category);
      });
    });
  }

  globalSearch.addEventListener('input', debounce(function () { renderSuggestions(globalSearch.value); }, 180));
  globalSearch.addEventListener('focus', function () { if (globalSearch.value.trim()) renderSuggestions(globalSearch.value); });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.topbar-search')) suggestionsBox.classList.remove('show');
  });
  globalSearch.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { suggestionsBox.classList.remove('show'); globalSearch.blur(); }
    if (e.key === 'Enter') {
      const q = globalSearch.value.trim().toLowerCase();
      const match = TOOLS.find(function (t) { return t.name.toLowerCase().includes(q); });
      suggestionsBox.classList.remove('show');
      if (match) { scrollToCategory(match.category); }
    }
  });

  function scrollToCategory(catId) {
    const el = document.getElementById('cat-' + catId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* -----------------------------------------------------
     15. HERO "VIEW FAVORITES" SHORTCUT
  ----------------------------------------------------- */
  const heroFavBtn = document.getElementById('heroFavBtn');
  if (heroFavBtn) {
    heroFavBtn.addEventListener('click', function () {
      if (!favorites.length) {
        showToast('You have no favorites yet — star a tool to save it here.', 'warning');
        return;
      }
      document.getElementById('toolCategoriesContainer').scrollIntoView({ behavior: 'smooth' });
      showToast('Look for the starred tools as you scroll through the categories', 'primary');
    });
  }

  /* -----------------------------------------------------
     16. SIDEBAR TOGGLE (mobile)
  ----------------------------------------------------- */
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');

  function openSidebar() {
    sidebar.classList.add('show');
    sidebarOverlay.classList.add('show');
    sidebarToggleBtn.setAttribute('aria-expanded', 'true');
  }
  function closeSidebar() {
    sidebar.classList.remove('show');
    sidebarOverlay.classList.remove('show');
    sidebarToggleBtn.setAttribute('aria-expanded', 'false');
  }
  sidebarToggleBtn.addEventListener('click', function () {
    sidebar.classList.contains('show') ? closeSidebar() : openSidebar();
  });
  sidebarOverlay.addEventListener('click', closeSidebar);

  // Close mobile sidebar after choosing a link, and manage active state
  document.getElementById('sidebarNav').addEventListener('click', function (e) {
    const link = e.target.closest('.nav-link');
    if (!link || link.dataset.bsToggle) return;
    document.querySelectorAll('#sidebarNav .nav-link').forEach(function (l) { l.classList.remove('active'); });
    link.classList.add('active');
    closeSidebar();
  });

  /* -----------------------------------------------------
     17. DARK / LIGHT MODE TOGGLE
  ----------------------------------------------------- */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const settingsThemeSwitch = document.getElementById('settingsThemeSwitch');
  const htmlEl = document.documentElement;

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    themeIcon.classList.toggle('fa-moon', theme === 'light');
    themeIcon.classList.toggle('fa-sun', theme === 'dark');
    themeToggleBtn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    settingsThemeSwitch.checked = theme === 'dark';
    saveJSON(LS_KEYS.theme, theme);
  }

  function initTheme() {
    const stored = loadJSON(LS_KEYS.theme, null);
    applyTheme(stored || 'dark');
  }

  themeToggleBtn.addEventListener('click', function () {
    const next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    showToast('Switched to ' + next + ' mode', 'primary');
  });
  settingsThemeSwitch.addEventListener('change', function () {
    applyTheme(settingsThemeSwitch.checked ? 'dark' : 'light');
  });

  /* -----------------------------------------------------
     18. SETTINGS MODAL ACTIONS
  ----------------------------------------------------- */
  document.getElementById('clearFavoritesBtn').addEventListener('click', function () {
    favorites = [];
    saveJSON(LS_KEYS.favorites, favorites);
    document.querySelectorAll('.fav-btn.active').forEach(function (b) {
      b.classList.remove('active');
      b.querySelector('i').classList.remove('fa-solid');
      b.querySelector('i').classList.add('fa-regular');
    });
    updateFavoriteCounters();
    showToast('All favorites cleared', 'danger');
  });

  document.getElementById('clearRecentBtn').addEventListener('click', function () {
    recentIds = [];
    saveJSON(LS_KEYS.recent, recentIds);
    showToast('Recent history cleared', 'danger');
  });

  /* -----------------------------------------------------
     19. BACK TO TOP
  ----------------------------------------------------- */
  const backToTopBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', debounce(function () {
    backToTopBtn.classList.toggle('show', window.scrollY > 400);
  }, 50));
  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -----------------------------------------------------
     20. SIDEBAR ACTIVE STATE ON SCROLL
  ----------------------------------------------------- */
  const sectionIds = ['mainContent'].concat(CATEGORIES.map(function (c) { return 'cat-' + c.id; }));
  function updateActiveSidebarOnScroll() {
    let currentId = 'mainContent';
    sectionIds.forEach(function (id) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 140) currentId = id;
    });
    document.querySelectorAll('#sidebarNav .nav-link[href]').forEach(function (link) {
      const target = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', target === currentId);
    });
  }
  window.addEventListener('scroll', debounce(updateActiveSidebarOnScroll, 80));

  /* -----------------------------------------------------
     21. INIT
  ----------------------------------------------------- */
  function init() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    initTheme();
    renderCategories();
    updateFavoriteCounters();

    // Page loader fade-out
    window.addEventListener('load', function () {
      setTimeout(function () {
        document.getElementById('pageLoader').classList.add('loaded');
        runInitialCounters();
      }, 350);
    });
    // Fallback in case 'load' already fired
    if (document.readyState === 'complete') {
      setTimeout(function () {
        document.getElementById('pageLoader').classList.add('loaded');
        runInitialCounters();
      }, 350);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
