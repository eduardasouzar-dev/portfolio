(() => {
  const html = document.documentElement;

  // Informa ao CSS que o JavaScript está disponível.
  html.classList.add("js");

  let inicializado = false;

  function iniciarAnimacoes() {
    if (inicializado) return;
    inicializado = true;

    html.classList.add("ready");
    html.classList.add("is-intro"); // antes era "intro", que colidia com o parágrafo .intro
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(iniciarAnimacoes).catch(iniciarAnimacoes);
  } else if (document.readyState === "complete") {
    iniciarAnimacoes();
  } else {
    window.addEventListener("load", iniciarAnimacoes, { once: true });
  }
})();