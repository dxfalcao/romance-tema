# romance-tema

CSS e script do tema **Ipanema** da loja Romance Enxovais (Nuvemshop), servidos pelo [jsDelivr](https://www.jsdelivr.com/).

| Arquivo | Carregado por | URL |
|---|---|---|
| `tema.css` | *Configurações globais → CSS personalizado* (`@import`) | `https://cdn.jsdelivr.net/gh/dxfalcao/romance-tema@main/tema.min.css` |
| `tema.js` | *Rodapé → Selos personalizados → Código do selo* (carregador `<img onload>`) | `https://cdn.jsdelivr.net/gh/dxfalcao/romance-tema@main/tema.min.js` |

Os campos da Nuvemshop têm limite de tamanho (CSS ~14 mil caracteres, selo 50 mil), por isso o código mora aqui e os campos só apontam para ele.

## Como alterar

1. A fonte de verdade fica em `C:\Users\ADM\Migracao-Nuvemshop\tema\` (`css-unificado.css` e o script dentro de `bloco-rodape-novo.html`).
2. `node gerar-repo.mjs` (naquela pasta) copia para este repositório.
3. Commit e push.
4. `node gerar-repo.mjs --purge` limpa o cache do jsDelivr (a mudança aparece em poucos minutos; navegadores podem guardar a versão anterior por até ~12 h).

Não colocar aqui nada sigiloso: o repositório é público.
