```javascript
const searchInput = document.getElementById("searchInput");
const priceFilter = document.getElementById("priceFilter");
const sizeFilter = document.getElementById("sizeFilter");
const products = document.getElementById("products");

let cards = Array.from(document.querySelectorAll(".produto"));

function atualizarProdutos() {

    let pesquisa = searchInput.value.toLowerCase();
    let tamanho = sizeFilter.value;

    cards.forEach(card => {

        const nome = card.dataset.name.toLowerCase();
        const tamanhos = card.dataset.size.split(" ");

        const pesquisaOK = nome.includes(pesquisa);
        const tamanhoOK = tamanho === "" || tamanhos.includes(tamanho);

        if (pesquisaOK && tamanhoOK) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

}

searchInput.addEventListener("input", atualizarProdutos);

sizeFilter.addEventListener("change", atualizarProdutos);

priceFilter.addEventListener("change", function () {

    if (this.value === "menor") {

        cards.sort((a, b) =>
            parseFloat(a.dataset.price) -
            parseFloat(b.dataset.price)
        );

    }

    else if (this.value === "maior") {

        cards.sort((a, b) =>
            parseFloat(b.dataset.price) -
            parseFloat(a.dataset.price)
        );

    }

    else if (this.value === "desconto") {

        cards.sort((a, b) =>
            parseFloat(b.dataset.discount) -
            parseFloat(a.dataset.discount)
        );

    }

    cards.forEach(card => products.appendChild(card));

    atualizarProdutos();

});

atualizarProdutos();
```
