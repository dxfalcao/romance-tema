// Gera tema-critico.css: a parte do tema.css que vai INLINE no campo "CSS personalizado" da Nuvemshop
// (limite ~14 mil caracteres). O resto do tema.css continua no GitHub Pages e é carregado sem bloquear
// a primeira pintura (link no código do selo do rodapé — ver README).
// uso: node gerar-critico.mjs [--sem-fontes]
import fs from 'node:fs';
const LIMITE = 14000;
const SEM_FONTES = process.argv.includes('--sem-fontes');
const css = fs.readFileSync(new URL('./tema.css', import.meta.url), 'utf8');
const secoes = css.split(/(?=\/\*\s*\d+\s*[·\-])/);
const num = (s) => Number((s.match(/^\/\*\s*(\d+)\s*[·\-]/) || [])[1]);
const pega = (n) => secoes.filter((s) => num(s) === n).join('');
// Seções inteiras acima da dobra em qualquer template: base, tipografia, botões, barras, cabeçalho, card, etiquetas, hero, responsivo
const CRITICAS = [1, 2, 3, 5, 6, 8, 9, 13, 14, 17, 21];
// Regras avulsas de outras seções que aparecem na primeira pintura (menu desktop e topo da página de produto)
const AVULSAS = ['.nav-list-link', '.product-price-display,.product-price-main', '.product-price-compare', '.product-installments,.product-payments-link', '.btn-variant', '.btn-variant.selected', '.btn-variant-content', '.product-thumb'];
const regra = (sel) => { const i = css.indexOf(sel + '{'); if (i < 0) throw new Error('regra não achada: ' + sel); return css.slice(i, css.indexOf('}', i) + 1); };
const limpa = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '\n').replace(/\n+/g, '\n').trim();
let fontes = '';
if (!SEM_FONTES) {
  // @font-face só do subconjunto latin (cobre o português); o Google serve estes mesmos woff2 ao css2 de Jost/Parisienne
  const f = fs.readFileSync(new URL('./fontes-google.css', import.meta.url), 'utf8');
  const blocos = [...f.matchAll(/\/\* ([a-z-]+) \*\/\s*(@font-face\s*\{[^}]*\})/g)].filter((m) => m[1] === 'latin').map((m) => m[2]);
  fontes = blocos.map((b) => b.replace(/\s+/g, ' ').replace(/\s*([{};:,])\s*/g, '$1')).join('\n');
}
const corpo = CRITICAS.map(pega).join('\n') + '\n' + AVULSAS.map(regra).join('\n');
const saida = `/* Romance Enxovais · CSS crítico (gerado por gerar-critico.mjs a partir de tema.css; não editar à mão) */\n${fontes}\n${limpa(corpo)}\n`;
fs.writeFileSync(new URL('./tema-critico.css', import.meta.url), saida);
console.log(`tema-critico.css: ${saida.length} caracteres (limite ${LIMITE})${saida.length > LIMITE ? '  <-- ESTOUROU' : ''}; fontes ${fontes.length}`);
for (const n of CRITICAS) console.log(`  seção ${n}: ${limpa(pega(n)).length}`);
process.exit(saida.length > LIMITE ? 1 : 0);
