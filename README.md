# romance-tema

CSS e script do tema **Ipanema** da loja Romance Enxovais (Nuvemshop). Desde 30/10/2026 o CSS é servido em duas partes,
para a primeira pintura não esperar o GitHub Pages:

| Arquivo | Onde entra na Nuvemshop | Como |
|---|---|---|
| `tema-critico.css` (gerado) | *Editor de layout → Configurações globais → CSS personalizado* | colado **inline** (limite do campo ~14 mil caracteres) |
| `tema.css` (completo) | carregado pelo `selo-rodape.html` | `<link rel="preload" as="style" onload=…>` do GitHub Pages, sem bloquear a página |
| `tema.js` | carregado pelo `selo-rodape.html` | `<img onload>` que injeta o script |
| `selo-rodape.html` | *Rodapé → Selos personalizados → Código do selo* | colado (limite 50 mil caracteres) |

URLs públicas: `https://dxfalcao.github.io/romance-tema/tema.css` e `.../tema.js` (GitHub Pages, cache de 10 min).

Antes (até 29/10/2026) o campo de CSS tinha só `@import url(…/tema.css)`: o navegador parava a renderização até baixar
o arquivo do GitHub (≈1 s a mais no celular, medido no Lighthouse) e as fontes só eram pedidas no rodapé.

## Como alterar

1. Edite `tema.css` (fonte única do CSS; as seções numeradas `/* N · … */` importam para o passo 2) ou `tema.js`.
2. `node gerar-critico.mjs` regenera `tema-critico.css` com as seções acima da dobra (lista `CRITICAS`/`AVULSAS` no script)
   e as `@font-face` de Jost/Parisienne (subconjunto latin, de `fontes-google.css`). O script falha se passar de 14 mil caracteres.
3. Commit e push. O GitHub Pages publica `tema.css`/`tema.js` em ~1 min; navegadores pegam a versão nova em até 10 min.
4. **Se mudou algo que está no crítico** (ou o selo), cole o arquivo novo no campo correspondente do painel.
   Enquanto não colar, a página mostra a regra antiga por um instante e a nova assim que o `tema.css` completo carrega.

(O jsDelivr não serve: em branch, `@main` manda cache de 7 dias para o navegador.)

Não colocar aqui nada sigiloso: o repositório é público.
