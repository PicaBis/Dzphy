/* ==========================================================================
   DzPhy — الأستاذ بيكا | Shared site logic
   - Loads data/config.json + data/resources.json
   - Renders header, footer, "تابعونا" (follow) + community sections
   - Renders the resource library with live filtering (level / stream / category)
   - Handles the hero video (safe embed, no "video unavailable")
   ========================================================================== */
(function () {
  "use strict";

  // Resolve data/asset paths relative to site root regardless of page depth.
  const ROOT = (function () {
    const p = location.pathname;
    // If served from a subfolder, keep relative; all pages sit at root here.
    return "";
  })();

  /* ----------------------------- SVG icons ----------------------------- */
  const ICONS = {
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7v-3.5h3.1V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.24 2.7.24v3H15.8c-1.5 0-2 .93-2 1.9v2.2h3.4l-.55 3.5h-2.9v8.4A12 12 0 0 0 24 12z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 3 2.5 10.5c-1.3.5-1.3 1.3-.2 1.6l5 1.6 1.9 5.9c.24.66.12.92.8.92.53 0 .76-.24 1.05-.53l2.5-2.43 5 3.7c.92.5 1.58.24 1.8-.85L23.9 4.4c.32-1.34-.5-1.94-1.9-1.4zM7.3 13.4l10.9-6.9c.5-.3.96-.14.58.2L9.8 15l-.35 3.7-2.15-5.3z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.77-.87-2-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07a8.2 8.2 0 0 1-2.4-1.48 9 9 0 0 1-1.66-2.07c-.17-.3 0-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37 0-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.5l-.57-.02c-.2 0-.52.08-.8.38s-1.05 1.03-1.05 2.5 1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.3 1.28.5 1.71.64.72.23 1.37.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.8.83-3-.2-.31A8.2 8.2 0 1 1 12 20.2z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 2h-3v14a2.6 2.6 0 1 1-2.6-2.6c.2 0 .4 0 .6.05v-3.1a5.6 5.6 0 1 0 4.6 5.5V8.9a7 7 0 0 0 4 1.26V7.1a4 4 0 0 1-3.6-3.9V2z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.25.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.37-1.06-.42-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.4 2.2 8.8 2.2 12 2.2zm0 3.3a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 10.72a4.22 4.22 0 1 1 0-8.44 4.22 4.22 0 0 1 0 8.44zm6.75-10.9a1.52 1.52 0 1 1-3.04 0 1.52 1.52 0 0 1 3.04 0z"/></svg>',
    messenger: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.3 2 2 6.2 2 11.8c0 2.9 1.2 5.4 3.1 7.2.2.15.25.35.26.56l.05 1.7c.02.55.58.9 1.08.68l1.9-.84c.16-.07.34-.08.5-.04 1 .27 2.05.42 3.1.42 5.7 0 10-4.2 10-9.8S17.7 2 12 2zm6 7.5-2.94 4.66c-.47.74-1.47.93-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.68-.63l2.94-4.66c.47-.74 1.47-.93 2.17-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.68.63z"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>'
  };

  const CAT_ICONS = {
    "التوزيعات السنوية": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    "ملخصات": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 4h13l3 3v13H4z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>',
    "فروض واختبارات": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    "تمارين": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>'
  };

  const DOWNLOAD_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>';

  const NAV = [
    { href: "index.html", label: "الرئيسية" },
    { href: "resources.html", label: "المكتبة" },
    { href: "resources.html?level=" + encodeURIComponent("السنة الأولى ثانوي"), label: "1 ثانوي" },
    { href: "resources.html?level=" + encodeURIComponent("السنة الثانية ثانوي"), label: "2 ثانوي" },
    { href: "resources.html?level=" + encodeURIComponent("السنة الثالثة ثانوي"), label: "3 ثانوي" },
    { href: "resources.html?level=" + encodeURIComponent("الرابعة متوسط"), label: "متوسط (BEM)" },
    { href: "index.html#follow", label: "تابعونا" }
  ];

  /* --------------------------- helpers --------------------------- */
  const el = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const soc = (key, cls) => ICONS[key] || ICONS.link;
  // Every external link opens securely in a new tab.
  const EXT = 'target="_blank" rel="noopener noreferrer"';

  function socIcon(item) {
    return `<a class="soc-icon ${item.key}" href="${esc(item.url)}" ${EXT} title="${esc(item.name)}" aria-label="${esc(item.name)}">${soc(item.key)}</a>`;
  }

  async function loadJSON(path) {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load " + path);
    return res.json();
  }

  /* --------------------------- Header --------------------------- */
  function renderHeader(config) {
    const mount = el("#site-header");
    if (!mount) return;
    const page = location.pathname.split("/").pop() || "index.html";
    const links = NAV.map((n) => {
      const active = (n.href === page || (page === "" && n.href === "index.html")) ? "active" : "";
      return `<a class="${active}" href="${n.href}">${esc(n.label)}</a>`;
    }).join("");
    const socials = config.social.map((s) => socIcon(s)).join("");
    mount.innerHTML = `
      <div class="container nav">
        <a class="logo" href="index.html">
          <span class="mark">⚛</span>
          <span>${esc(config.site.name)}<small>${esc(config.site.brand)}</small></span>
        </a>
        <nav class="nav-links" id="navLinks">${links}</nav>
        <div class="nav-actions">
          <div class="header-social">${socials}</div>
          <button class="menu-toggle" id="menuToggle" aria-label="القائمة">☰</button>
        </div>
      </div>`;
    const btn = el("#menuToggle");
    if (btn) btn.addEventListener("click", () => el("#navLinks").classList.toggle("open"));
  }

  /* --------------------------- Follow + Community --------------------------- */
  function renderFollow(config) {
    const mount = el("#follow-mount");
    if (!mount) return;
    const cards = config.social.map((s) => `
      <a class="social-card" href="${esc(s.url)}" ${EXT}>
        <span class="soc-icon ${s.key}">${soc(s.key)}</span>
        <span><b>${esc(s.name)}</b><span>${esc(s.note || s.handle || "")}</span></span>
      </a>`).join("");

    const communities = config.communities.map((c) => {
      const chans = c.channels.map((ch) => `
        <a href="${esc(ch.url)}" ${EXT}><span class="soc-icon ${ch.key}" style="width:26px;height:26px;background:transparent;border:0">${soc(ch.key)}</span>${esc(ch.name)}</a>`).join("");
      return `
        <div class="community-card" style="border-top-color:${esc(c.color)}">
          <h4>${esc(c.level)}</h4>
          <div class="chan">${chans}</div>
        </div>`;
    }).join("");

    mount.innerHTML = `
      <section class="follow" id="follow">
        <div class="container">
          <div class="section-head">
            <div class="eyebrow">تابعونا</div>
            <h2>كل منصات الأستاذ بيكا في مكان واحد</h2>
            <p>انضم إلى القنوات الرسمية للوصول السريع لجميع الدروس والملفات والتحديثات اليومية.</p>
          </div>
          <div class="social-grid">${cards}</div>
          <div style="text-align:center;margin-top:22px">
            <a class="btn btn-primary" href="${esc(config.site.linktree)}" ${EXT}>${soc("link")} الرابط الشامل (كل المنصات)</a>
          </div>
          <div class="section-head" style="margin-top:48px">
            <h2>مجموعات التواصل حسب مستواك</h2>
            <p>دردشات مباشرة على إنستغرام وماسنجر حسب القسم الدراسي.</p>
          </div>
          <div class="community-grid">${communities}</div>
        </div>
      </section>`;
  }

  /* --------------------------- Footer --------------------------- */
  function renderFooter(config) {
    const mount = el("#site-footer");
    if (!mount) return;
    const socials = config.social.map((s) => socIcon(s)).join("");
    mount.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <a class="logo" href="index.html"><span class="mark">⚛</span><span>${esc(config.site.name)}<small>${esc(config.site.brand)}</small></span></a>
            <p style="color:var(--muted);max-width:340px;margin-top:14px">${esc(config.site.description)}</p>
            <div class="footer-social">${socials}</div>
          </div>
          <div>
            <h5>روابط سريعة</h5>
            <a href="index.html">الرئيسية</a>
            <a href="resources.html">مكتبة الملفات</a>
            <a href="resources.html?category=${encodeURIComponent("التوزيعات السنوية")}">التوزيعات السنوية</a>
            <a href="resources.html?category=${encodeURIComponent("ملخصات")}">الملخصات</a>
            <a href="index.html#follow">تابعونا</a>
          </div>
          <div>
            <h5>دعم المحتوى</h5>
            <p style="color:var(--muted);font-size:14px;margin:0">للدفع السريع ودعم المحتوى ⚡</p>
            <div class="pay-box"><code>${esc(config.site.payment)}</code></div>
            <a href="${esc(config.site.linktree)}" ${EXT} style="margin-top:10px">🔗 linktr.ee/profpica</a>
          </div>
        </div>
        <div class="footer-bottom">© <span id="yr"></span> ${esc(config.site.name)} — ${esc(config.site.brand)}. جميع الحقوق محفوظة.</div>
      </div>`;
    const yr = el("#yr");
    if (yr) yr.textContent = new Date().getFullYear();
  }

  /* --------------------------- Hero video --------------------------- */
  function renderHeroVideo(config) {
    const frame = el("#hero-video");
    if (!frame) return;
    const id = (config.site.heroVideoId || "").trim();
    // A valid 11-char YouTube id → real embed. Otherwise show a safe facade
    // that links to the channel (prevents the "video unavailable" error).
    if (/^[A-Za-z0-9_-]{11}$/.test(id)) {
      frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0"
        title="فيديو تعريفي" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen loading="lazy"></iframe>`;
    } else {
      const yt = (config.social.find((s) => s.key === "youtube") || {}).url || "https://www.youtube.com/@ProfPica";
      frame.innerHTML = `
        <a class="video-facade" href="${esc(yt)}" target="_blank" rel="noopener noreferrer" aria-label="شاهد على يوتيوب">
          <span class="play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>
          <span class="vtitle">شاهد أحدث الدروس على قناة يوتيوب<small>@ProfPica — دروس مفصلة وشروحات كاملة</small></span>
        </a>`;
    }
  }

  /* --------------------------- Resource library --------------------------- */
  function fileIcon(cat) { return CAT_ICONS[cat] || CAT_ICONS["ملخصات"]; }

  function resourceCard(r) {
    const dl = r.fileUrl
      ? `<a class="btn btn-download" href="${esc(r.fileUrl)}" download ${EXT}>${DOWNLOAD_ICON} تحميل مباشر (PDF)</a>`
      : `<span class="btn btn-disabled">${DOWNLOAD_ICON} قريبًا</span>`;
    const size = r.sizeMB ? ` · ${r.sizeMB} MB` : "";
    return `
      <article class="res-card">
        <div class="res-top">
          <span class="res-icon">${fileIcon(r.category)}</span>
          <span class="res-tags">
            <span class="tag cat">${esc(r.category)}</span>
            <span class="tag level">${esc(r.level)}</span>
          </span>
        </div>
        <h3>${esc(r.title)}</h3>
        <p class="desc">${esc(r.description || "")}</p>
        <div class="res-foot">
          <span>${esc(r.stream)}</span>
          <span>PDF${size}</span>
        </div>
        <div class="actions">${dl}</div>
      </article>`;
  }

  function initLibrary(config, data) {
    const app = el("#resources-app");
    if (!app) return;
    const resources = data.resources || [];
    const meta = data.meta || {};
    const params = new URLSearchParams(location.search);

    const state = {
      level: params.get("level") || "all",
      stream: params.get("stream") || "all",
      category: params.get("category") || "all",
      q: ""
    };

    const levels = meta.levels || [...new Set(resources.map((r) => r.level))];
    const streams = meta.streams || [...new Set(resources.map((r) => r.stream))];
    const categories = meta.categories || [...new Set(resources.map((r) => r.category))];

    function chips(field, values) {
      const all = `<button class="chip ${state[field] === "all" ? "active" : ""}" data-field="${field}" data-val="all">الكل</button>`;
      return all + values.map((v) => `<button class="chip ${state[field] === v ? "active" : ""}" data-field="${field}" data-val="${esc(v)}">${esc(v)}</button>`).join("");
    }

    app.innerHTML = `
      <div class="filters">
        <div class="filter-row">
          <div class="search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
            <input type="search" id="searchInput" placeholder="ابحث عن ملف، توزيع، ملخص..." />
          </div>
        </div>
        <div class="filter-row"><span class="label">المستوى</span><div id="chips-level">${chips("level", levels)}</div></div>
        <div class="filter-row"><span class="label">الشعبة</span><div id="chips-stream">${chips("stream", streams)}</div></div>
        <div class="filter-row"><span class="label">التصنيف</span><div id="chips-category">${chips("category", categories)}</div></div>
      </div>
      <div class="results-meta" id="resultsMeta"></div>
      <div class="cards-grid" id="cardsGrid"></div>`;

    function render() {
      const q = state.q.trim().toLowerCase();
      const filtered = resources.filter((r) => {
        if (state.level !== "all" && r.level !== state.level) return false;
        if (state.stream !== "all" && r.stream !== state.stream) return false;
        if (state.category !== "all" && r.category !== state.category) return false;
        if (q) {
          const hay = `${r.title} ${r.description || ""} ${r.stream} ${r.level} ${r.category}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });
      const grid = el("#cardsGrid");
      const meta = el("#resultsMeta");
      meta.textContent = `${filtered.length} ملف متاح`;
      grid.innerHTML = filtered.length
        ? filtered.map(resourceCard).join("")
        : `<div class="empty" style="grid-column:1/-1"><div class="big">🔍</div>لا توجد ملفات مطابقة للفلاتر الحالية.<br/>جرّب تعديل الشعبة أو التصنيف.</div>`;
      // refresh chip active states
      ["level", "stream", "category"].forEach((f) => {
        app.querySelectorAll(`#chips-${f} .chip`).forEach((c) => {
          c.classList.toggle("active", c.dataset.val === state[f]);
        });
      });
    }

    app.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      state[chip.dataset.field] = chip.dataset.val;
      render();
    });
    el("#searchInput").addEventListener("input", (e) => { state.q = e.target.value; render(); });
    render();
  }

  /* --------------------------- Featured (home) --------------------------- */
  function renderFeatured(data) {
    const mount = el("#featured-grid");
    if (!mount) return;
    const items = (data.resources || []).filter((r) => r.featured).slice(0, 6);
    mount.innerHTML = items.map(resourceCard).join("");
  }

  /* --------------------------- Boot --------------------------- */
  async function boot() {
    try {
      const [config, data] = await Promise.all([
        loadJSON("data/config.json"),
        loadJSON("data/resources.json")
      ]);
      window.__DZPHY__ = { config, data };
      renderHeader(config);
      renderHeroVideo(config);
      renderFeatured(data);
      renderFollow(config);
      initLibrary(config, data);
      renderFooter(config);
    } catch (err) {
      console.error(err);
      const app = el("#resources-app");
      if (app) app.innerHTML = `<div class="empty"><div class="big">⚠️</div>تعذّر تحميل البيانات. تأكد من تشغيل الموقع عبر خادم محلي (وليس فتح الملف مباشرة).</div>`;
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
