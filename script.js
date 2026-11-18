(() => {
  const html = document.documentElement;

  // Informa ao CSS que o JavaScript está disponível.
  html.classList.add("js");

  let inicializado = false;

  function iniciarAnimacoes() {
    if (inicializado) return;
    inicializado = true;

    html.classList.add("ready");
    html.classList.add("is-intro");
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(iniciarAnimacoes).catch(iniciarAnimacoes);
  } else if (document.readyState === "complete") {
    iniciarAnimacoes();
  } else {
    window.addEventListener("load", iniciarAnimacoes, { once: true });
  }
})();

/* Navegação: seção ativa, progresso de leitura e barra compacta ao rolar. */
(function () {
  "use strict";

  var root = document.documentElement;
  var bar = document.querySelector(".topbar");
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  if (!bar || !links.length) return;

  var items = links
    .map(function (a) {
      return { link: a, section: document.getElementById(a.getAttribute("href").slice(1)) };
    })
    .filter(function (i) { return i.section; });

  var ticking = false;

  function update() {
    ticking = false;
    var max = root.scrollHeight - window.innerHeight;
    var y = window.pageYOffset || 0;
    root.style.setProperty("--p", max > 0 ? Math.min(1, y / max).toFixed(4) : "0");
    bar.classList.toggle("is-scrolled", y > 24);

    var line = window.innerHeight * 0.35;
    var current = null;
    items.forEach(function (i) {
      if (i.section.getBoundingClientRect().top <= line) current = i.link;
    });
    if (max > 0 && y >= max - 2 && items.length) current = items[items.length - 1].link;

    items.forEach(function (i) {
      if (i.link === current) i.link.setAttribute("aria-current", "true");
      else i.link.removeAttribute("aria-current");
    });
  }

  function request() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request);
  update();
})();

/* Revela os blocos da seção Sobre ao entrarem na tela. */
(function () {
  "use strict";

  var els = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (!els.length || !("IntersectionObserver" in window)) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.documentElement.classList.add("reveal-on");

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });

  els.forEach(function (el) { io.observe(el); });
})();
