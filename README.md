# romance-tema

CSS e script do tema **Ipanema** da loja Romance Enxovais (Nuvemshop), servidos pelo **GitHub Pages** (`https://dxfalcao.github.io/romance-tema/`, cache de 10 minutos).

| Arquivo | Carregado por | URL |
|---|---|---|
| `tema.css` | *Configurações globais → CSS personalizado* (`@import`) | `https://dxfalcao.github.io/romance-tema/tema.css` |
| `tema.js` | *Rodapé → Selos personalizados → Código do selo* (carregador `<img onload>`) | `https://dxfalcao.github.io/romance-tema/tema.js` |

Os campos da Nuvemshop têm limite de tamanho (CSS ~14 mil caracteres, selo 50 mil), por isso o código mora aqui e os campos só apontam para ele.

## Como alterar

1. A fonte de verdade fica em `C:\Users\ADM\Migracao-Nuvemshop\tema\` (`css-unificado.css` e o script dentro de `bloco-rodape-novo.html`).
2. `node gerar-repo.mjs` (naquela pasta) copia para este repositório.
3. Commit e push. O GitHub Pages publica em ~1 min; navegadores pegam a versao nova em ate 10 min.

(O jsDelivr nao serve: em branch, `@main` manda cache de 7 dias para o navegador.)

Não colocar aqui nada sigiloso: o repositório é público.
