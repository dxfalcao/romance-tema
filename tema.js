/* Romance Enxovais · script do tema Ipanema (Nuvemshop). Carregado pelo selo do rodape. */
(function () {
  var doc0 = document.documentElement;
 if (window.__romInit) return;
 window.__romInit = true;
  doc0.classList.add('rom-js');

 var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 var doc = doc0;

 /* 1 · estado de rolagem do cabeçalho */
 var ticking = false;
 function onScroll() {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(function () {
   doc.classList.toggle('rom-scrolled', window.pageYOffset > 24);
   ticking = false;
  });
 }
 window.addEventListener('scroll', onScroll, { passive: true });
 onScroll();

 /* 2 · revelar ao rolar */
 var revelou = false;
 function reveal() {
  if (revelou) return;
  if (reduce || !('IntersectionObserver' in window)) return;
  var alvos = document.querySelectorAll(
   '.ns-section .heading-block, .section-featured-categories a,' +
   '.section-banners .media, .section-hero h1, .section-hero h2, .section-hero p,' +
   '.section-faq .accordion-item, .rom-manifesto, .rom-facts'
  );
  if (!alvos.length) return;
  revelou = true;

  var io = new IntersectionObserver(function (entradas) {
   entradas.forEach(function (e) {
    if (!e.isIntersecting) return;
    e.target.classList.add('rom-in');
    io.unobserve(e.target);
   });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  var grupo = null, i = 0;
  alvos.forEach(function (el) {
   if (el.classList.contains('rom-in')) return;
   var pai = el.parentNode;
   if (pai !== grupo) { grupo = pai; i = 0; }
   el.classList.add('rom-rv');
   el.style.transitionDelay = Math.min(i, 6) * 70 + 'ms';
   i++;
   io.observe(el);
  });
 }

 /* 3 · selo de origem na página de produto */
 var SELO_TITULO = 'escolhido por quem vive de enxoval desde 1994';
 var SELO_TEXTO  = 'Trabalhamos direto com os \u003Cb>fabricantes mais tradicionais\u003C/b> de cama, mesa e banho do país, e cada peça do catálogo passa pela curadoria da Romance Enxovais. Dúvida de medida, gramatura ou composição? Fale com a gente no WhatsApp — são \u003Cb>mais de 30 anos\u003C/b> de balcão, e a gente conhece de perto cada peça que está aqui.';
 /* oferta de frete: entra como faixa no topo do */
 var SELO_FRETE  = '';

 /* o simbolo grande, como string: entra no selo */
 var ESTRELA = '\u003Ci class="rom-star rom-star-lg" aria-hidden="true">\u003C/i>';

 function selo() {
  if (document.querySelector('.rom-origem')) return;
  if (!/\/produtos?\//.test(location.pathname)) return;

  var ancora =
   document.querySelector('.product-shipping-wrapper') ||
   document.querySelector('.product-payments-link') ||
   document.querySelector('.product-quantity-control') ||
   document.querySelector('.product-price') ||
   document.querySelector('.product-name');
  if (!ancora || !ancora.parentNode) return;

  var caixa = document.createElement('div');
  caixa.className = 'rom-origem';
  caixa.innerHTML =
   (SELO_FRETE ? '\u003Cp class="rom-origem-frete">' + SELO_FRETE + '\u003C/p>' : '') +
   ESTRELA +
   '\u003Cdiv>\u003Cp class="rom-origem-title">' + SELO_TITULO + '\u003C/p>' +
   '\u003Cp class="rom-origem-text">' + SELO_TEXTO + '\u003C/p>\u003C/div>';

  ancora.parentNode.insertBefore(caixa, ancora.nextSibling);
  doc.classList.add('rom-pdp');
 }

 /* 3.1 · lupa da tabela de medidas */
 function romLupa() {
  var desc = document.querySelector('.js-product-description');
  if (!desc || desc.getAttribute('data-rom-lupa')) return;
  var fotos = desc.querySelectorAll('img');
  if (!fotos.length) return;
  desc.setAttribute('data-rom-lupa', '1');

  var tela = document.createElement('div');
  tela.className = 'rom-lupa';
  tela.innerHTML = '\u003Cdiv class="rom-lupa-in">\u003Cimg alt="">\u003C/div>' +
   '\u003Cbutton type="button" class="rom-lupa-x">fechar ×\u003C/button>';
  document.body.appendChild(tela);
  var rola = tela.querySelector('.rom-lupa-in');
  var grande = tela.querySelector('img');
  var travaO = '', travaP = '';

  /* A lupa abre no DOBRO da largura da tela, lim */
  function medir() {
   if (!grande.naturalWidth) return;
   grande.style.width = Math.min(grande.naturalWidth, window.innerWidth * 2) + 'px';
   grande.style.height = 'auto';
  }
  grande.addEventListener('load', medir);
  window.addEventListener('resize', medir);

  /* Travar a pagina atras: sem isso, arrastar a  */
  function abrir(foto) {
   grande.src = foto.currentSrc || foto.src;
   grande.alt = foto.alt || '';
   var barra = window.innerWidth - doc.clientWidth;
   travaO = doc.style.overflow;
   travaP = doc.style.paddingRight;
   doc.style.overflow = 'hidden';
   if (barra > 0) doc.style.paddingRight = barra + 'px';
   tela.classList.add('on');
   medir();
   rola.scrollTop = 0;
   rola.scrollLeft = 0;
  }

  function fechar() {
   tela.classList.remove('on');
   doc.style.overflow = travaO;
   doc.style.paddingRight = travaP;
  }

  /* O fechar so pode acontecer em gesto DELIBERA */
  var px = 0, py = 0;
  tela.addEventListener('pointerdown', function (e) {
   px = e.clientX; py = e.clientY;
  });
  tela.addEventListener('pointerup', function (e) {
   if (Math.abs(e.clientX - px) > 10) return;
   if (Math.abs(e.clientY - py) > 10) return;
   if (e.target === grande) return;
   fechar();
  });
  document.addEventListener('keydown', function (e) {
   if (e.key === 'Escape') fechar();
  });

  /* forEach e nao um for: o validador do campo d */
  Array.prototype.forEach.call(fotos, function (foto) {
   foto.setAttribute('title', 'clique para ampliar');
   foto.addEventListener('click', function () { abrir(foto); });
  });
 }

 /* 4 · arrumar o bloco de selos dentro do rodap */
 function rodape() {
  var selos = document.querySelector('.rom-seals');
  if (!selos || selos.getAttribute('data-rom-ok')) return;
  var rod = document.querySelector('footer.section-footer') ||
       document.querySelector('#ns-section-footer');
  if (!rod) return;

  var conteudo = rod.querySelector('.footer-content');
  var faixa = selos.querySelector('.rom-band');
  var assinatura = selos.querySelector('.rom-signature');
  var legal = rod.querySelector('.footer-legal-container') ||
        rod.querySelector('.footer-secondary-info');

  if (conteudo && conteudo.firstChild) conteudo.insertBefore(selos, conteudo.firstChild);
  if (faixa) rod.insertBefore(faixa, rod.firstChild);
  if (assinatura && legal) legal.appendChild(assinatura);

  selos.setAttribute('data-rom-ok', '1');
 }

 /* 8 · codigo desta marca, vindo do EXTRA_JS */
 /* O LOGOTIPO no slot do manifesto, no lugar do */
 function romLogo() {
  var m = document.querySelector('.rom-manifesto-mark');
  if (!m || m.getAttribute('data-rom-logo')) return;
  m.setAttribute('data-rom-logo', '1');
  var o = document.querySelector('#ns-block-logo img.logo-img') ||
      document.querySelector('#logo img');
  if (!o) return;
  var i = document.createElement('img');
  i.src = o.currentSrc || o.src;
  var ss = o.getAttribute('srcset');
  if (ss) { i.srcset = ss; i.sizes = '190px'; }
  i.alt = o.alt || 'Romance Enxovais';
  i.decoding = 'async';
  m.innerHTML = '';
  m.appendChild(i);
  m.className += ' rom-mark-logo';
 }

 /* 9 · GALERIA POR COR (modelo Casa Bergan): os botoes de cor viram miniaturas de foto e a
    galeria mostra so as fotos da cor escolhida + as fotos gerais do produto.
    Agrupamento pela ORDEM das fotos: as fotos antes da 1a foto de variacao sao gerais; cada foto
    pertence a ultima variacao que apareceu antes dela (ex.: gerais, Azul 1-2-3, Bege 1-2-3...).
    So entra em produtos cujo grupo "Cor"/"Estampa" tem foto em TODAS as opcoes.
    Sem o sinal de menor no codigo: o validador do campo recusa. */
 function romGaleriaCor() {
  var box = document.querySelector('.js-product-detail[data-variants]');
  if (!box || box.getAttribute('data-rom-galeria')) return;
  var mainEl = box.querySelector('.js-product-slider');
  var thEl = box.querySelector('.js-product-slider-thumbs');
  if (!mainEl) return;
  /* o carrossel do tema pode ainda nao estar montado: tenta de novo (ate ~5s) */
  if (!mainEl.swiper) { romGaleriaCor.t = (romGaleriaCor.t || 0) + 1; if (romGaleriaCor.t !== 10) setTimeout(romGaleriaCor, 500); return; }
  var vs;
  try { vs = JSON.parse(box.getAttribute('data-variants')); } catch (e) { return; }
  var grupos = box.querySelectorAll('.js-product-variants-group');
  var gi = -1;
  [].forEach.call(grupos, function (g, i) {
   var l = g.querySelector('.form-label:not(.d-none)') || g.querySelector('.form-label');
   if (gi === -1 && l && /^\s*(cor|estampa)/i.test(l.textContent)) gi = i;
  });
  if (gi === -1) return;
  var opt = 'option' + gi;
  var fotoDe = {};
  vs.forEach(function (v) { if (v.image && v[opt] != null && !fotoDe[v[opt]]) fotoDe[v[opt]] = { id: String(v.image), url: v.image_url || '' }; });
  var botoes = grupos[gi].querySelectorAll('.js-variant-button');
  var completo = botoes.length > 1;
  [].forEach.call(botoes, function (b) { if (!fotoDe[b.getAttribute('data-option')]) completo = false; });
  if (!completo) return;

  var slides = [].slice.call(mainEl.querySelectorAll('.js-product-slide'));
  var thumbs = thEl ? [].slice.call(thEl.querySelectorAll('.swiper-slide')) : [];
  var dono = {};
  Object.keys(fotoDe).forEach(function (val) { dono[fotoDe[val].id] = val; });
  /* cada opcao precisa de foto PROPRIA (ex.: agua perfumada com todas as fragrancias na mesma foto fica com texto) */
  if (Object.keys(dono).length !== botoes.length) return;
  var gerais = [], porCor = {}, corAtual = null;
  slides.forEach(function (s, k) {
   var id = s.getAttribute('data-image');
   if (dono[id]) corAtual = dono[id];
   var item = { s: s, t: thumbs[k] || null };
   if (corAtual) (porCor[corAtual] = porCor[corAtual] || []).push(item); else gerais.push(item);
  });
  box.setAttribute('data-rom-galeria', '1');
  box.classList.add('rom-galeria-cor');

  /* botoes com foto */
  [].forEach.call(botoes, function (b) {
   var val = b.getAttribute('data-option'), f = fotoDe[val];
   var c = b.querySelector('.btn-variant-content');
   if (!c || !f.url) return;
   var im = document.createElement('img');
   im.src = (f.url.indexOf('//') === 0 ? 'https:' : '') + f.url.replace(/-\d+-\d+\.(webp|jpe?g|png)/, '-240-0.$1');
   im.alt = val; im.loading = 'lazy';
   c.innerHTML = ''; c.removeAttribute('style'); c.appendChild(im);
   b.classList.remove('btn-variant-color'); b.classList.add('rom-sw-foto');
  });

  var ms = mainEl.swiper, ts = thEl && thEl.swiper;
  function carregar(el) {
   if (!el) return;
   [].forEach.call(el.querySelectorAll('img[data-srcset], img[data-src]'), function (i) {
    if (i.getAttribute('data-srcset')) i.setAttribute('srcset', i.getAttribute('data-srcset'));
    if (i.getAttribute('data-src')) i.setAttribute('src', i.getAttribute('data-src'));
    i.classList.add('swiper-lazy-loaded'); i.classList.remove('swiper-lazy');
   });
  }
  function marcar(k) {
   if (!thEl) return;
   [].forEach.call(thEl.querySelectorAll('.js-product-thumb'), function (a, j) { a.classList.toggle('selected', j === k); });
  }
  function mostrar(cor) {
   var itens = (porCor[cor] || []).concat(gerais);
   ms.removeAllSlides();
   ms.appendSlide(itens.map(function (i) { return i.s; }));
   if (ts) {
    ts.removeAllSlides();
    ts.appendSlide(itens.filter(function (i) { return i.t; }).map(function (i) { return i.t; }));
    ts.update(); ts.slideTo(0, 0);
   }
   ms.update(); ms.slideTo(0, 0);
   carregar(mainEl); carregar(thEl);
   [].forEach.call(thEl ? thEl.querySelectorAll('.js-product-thumb') : [], function (a, j) { a.setAttribute('data-thumb-loop', j); });
   marcar(0);
  }
  /* clique na miniatura: navega dentro da galeria filtrada (o do tema usaria a posicao antiga) */
  if (thEl) thEl.addEventListener('click', function (e) {
   var a = e.target.closest && e.target.closest('.js-product-thumb');
   if (!a) return;
   e.preventDefault(); e.stopPropagation();
   var k = [].indexOf.call(thEl.querySelectorAll('.js-product-thumb'), a);
   ms.slideTo(k); marcar(k);
  }, true);
  ms.on('slideChange', function () { marcar(ms.activeIndex); });
  /* troca de cor: depois do tema reagir, remonta a galeria da cor escolhida */
  function aplicar() {
   setTimeout(function () {
    var b = grupos[gi].querySelector('.js-variant-button.selected');
    if (b) mostrar(b.getAttribute('data-option'));
   }, 80);
  }
  grupos[gi].addEventListener('click', function (e) { if (e.target.closest && e.target.closest('.js-variant-button')) aplicar(); });
  var sel = grupos[gi].querySelector('select');
  if (sel) sel.addEventListener('change', aplicar);
  aplicar();
 }

 /* 10 · MINIATURAS DE COR NO CARD (modelo Casa Bergan): troca a bolinha "+N" do card por uma
    fileira com a foto de cada cor. Mouse em cima (ou toque, no celular) troca a foto do card;
    tirar o mouse volta a original. So entra se cada cor tiver foto PROPRIA. Roda tambem nos
    cards que chegam depois (rolagem infinita, vitrines). Sem o sinal de menor no codigo. */
 function romCardsCor() {
  function tam(url, t) { return (url.indexOf('//') === 0 ? 'https:' : '') + url.replace(/-\d+-\d+\.(webp|jpe?g|png)/, '-' + t + (t === 1024 ? '-1024' : '-0') + '.$1'); }
  function processa(card) {
   if (card.getAttribute('data-rom-cards')) return;
   card.setAttribute('data-rom-cards', '1');
   var vs;
   try { vs = JSON.parse(card.getAttribute('data-variants') || '[]'); } catch (e) { return; }
   var cont = card.querySelector('.product-item-colors-container');
   var bloco = cont && cont.querySelector('.product-item-colors-variation');
   if (!bloco || !vs.length) return;
   var opt = 'option' + (bloco.getAttribute('data-option') || '0');
   var cores = [], fotoDe = {}, temEstoque = {}, fotos = {};
   vs.forEach(function (v) {
    var val = v[opt]; if (val == null) return;
    if (!(val in fotoDe)) { cores.push(val); fotoDe[val] = v.image_url || ''; }
    if (v.available) temEstoque[val] = true;
    if (v.image) fotos[v.image] = 1;
   });
   if (cores.length === 0 || cores.length === 1 || !cores.every(function (c) { return fotoDe[c]; })) return;
   if (Object.keys(fotos).length !== cores.length) return;
   var img = card.querySelector('.product-item-image-featured');
   if (!img) return;
   var orig = { src: img.getAttribute('src'), srcset: img.getAttribute('srcset') };
   function trocar(url) {
    img.setAttribute('srcset', [240, 320, 480, 640, 1024].map(function (t) { return tam(url, t) + ' ' + t + 'w'; }).join(', '));
    img.setAttribute('src', tam(url, 480));
    card.classList.add('rom-card-trocou');
   }
   function voltar() {
    if (orig.srcset) img.setAttribute('srcset', orig.srcset);
    if (orig.src) img.setAttribute('src', orig.src);
    card.classList.remove('rom-card-trocou');
    [].forEach.call(fila.children, function (s) { s.classList.remove('ativa'); });
   }
   var fila = document.createElement('div');
   fila.className = 'rom-card-cores';
   cores.forEach(function (c) {
    var s = document.createElement('span');
    s.className = 'rom-card-cor' + (temEstoque[c] ? '' : ' esgotada');
    s.title = c;
    var i = document.createElement('img');
    i.src = tam(fotoDe[c], 100); i.alt = c; i.loading = 'lazy';
    s.appendChild(i);
    s.addEventListener('mouseenter', function () { trocar(fotoDe[c]); });
    s.addEventListener('click', function (e) {
     if (window.matchMedia && window.matchMedia('(hover: none)').matches) {
      e.preventDefault(); e.stopPropagation();
      [].forEach.call(fila.children, function (x) { x.classList.toggle('ativa', x === s); });
      trocar(fotoDe[c]);
     }
    });
    fila.appendChild(s);
   });
   fila.addEventListener('mouseleave', voltar);
   cont.innerHTML = '';
   cont.appendChild(fila);
   card.classList.add('rom-card-com-cores');
  }
  function varrer() { [].forEach.call(document.querySelectorAll('.js-item-product[data-variants]'), processa); }
  varrer();
  if (!window.__romCardsObs) {
   var espera;
   window.__romCardsObs = new MutationObserver(function () { clearTimeout(espera); espera = setTimeout(varrer, 300); });
   window.__romCardsObs.observe(document.body, { childList: true, subtree: true });
  }
 }

 function romExtra() {
  romLogo();
  romGaleriaCor();
  romCardsCor();
 }

 function iniciar() {
  try { rodape(); } catch (e) {}
  try { selo(); } catch (e) {}
  try { romLupa(); } catch (e) {}
  try { reveal(); } catch (e) {}

  try { if (typeof romExtra === 'function') romExtra(); } catch (e) {}

 }

 if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciar);
 } else {
  iniciar();
 }
 window.setTimeout(iniciar, 1400);
})();
