// ================================
// FASHION GURUPÁ
// PARTE 1
// ================================

const listaProdutos = document.getElementById("listaProdutos");

function criarCard(produto){

    return `

    <div class="produto fade" data-id="${produto.id}">

        <div class="imagem">

            <img src="${produto.imagem}" alt="${produto.nome}">

            <span class="badge">
                ${produto.desconto}% OFF
            </span>

            <button class="favorito">
                ❤
            </button>

        </div>

        <div class="info">

            <h3>${produto.nome}</h3>

            <div class="avaliacao">

                ⭐⭐⭐⭐⭐

                <span>(4.9)</span>

            </div>

            <p class="preco">

                R$ ${produto.preco.toFixed(2).replace(".",",")}

            </p>

            <p class="preco-antigo">

                R$ ${produto.precoAntigo.toFixed(2).replace(".",",")}

            </p>

            <p class="menor-preco">

                Menor preço

            </p>

            <div class="tamanhos">

                ${produto.tamanhos.map(t=>`<span>${t}</span>`).join("")}

            </div>

            <button
                class="comprar"
                data-id="${produto.id}">

                Comprar

            </button>

        </div>

    </div>

    `;

}

function carregarProdutos(){

    listaProdutos.innerHTML="";

    produtos.forEach(produto=>{

        listaProdutos.innerHTML += criarCard(produto);

    });

}

carregarProdutos();

// ================================
// FASHION GURUPÁ
// PARTE 2 - PESQUISA E FILTROS
// ================================

const pesquisa = document.getElementById("pesquisa");
const ordenar = document.getElementById("ordenar");
const tamanho = document.getElementById("tamanho");

let produtosFiltrados = [...produtos];

function atualizarProdutos(){

    let lista = [...produtos];

    // PESQUISA
    const texto = pesquisa.value.toLowerCase().trim();

    if(texto !== ""){

        lista = lista.filter(produto =>

            produto.nome.toLowerCase().includes(texto) ||

            produto.categoria.toLowerCase().includes(texto)

        );

    }

    // FILTRO TAMANHO

    if(tamanho.value !== ""){

        lista = lista.filter(produto =>

            produto.tamanhos.includes(tamanho.value)

        );

    }

    // ORDENAÇÃO

    if(ordenar.value === "menor"){

        lista.sort((a,b)=>a.preco-b.preco);

    }

    if(ordenar.value === "maior"){

        lista.sort((a,b)=>b.preco-a.preco);

    }

    if(ordenar.value === "desconto"){

        lista.sort((a,b)=>b.desconto-a.desconto);

    }

    produtosFiltrados = lista;

    listaProdutos.innerHTML="";

    lista.forEach(produto=>{

        listaProdutos.innerHTML += criarCard(produto);

    });

}

// EVENTOS

pesquisa.addEventListener("keyup", atualizarProdutos);

ordenar.addEventListener("change", atualizarProdutos);

tamanho.addEventListener("change", atualizarProdutos);

// ================================
// FASHION GURUPÁ
// PARTE 3
// FAVORITOS + WHATSAPP
// ================================

// Favoritos

document.addEventListener("click", function(e){

    if(e.target.classList.contains("favorito")){

        e.stopPropagation();

        if(e.target.classList.contains("ativo")){

            e.target.classList.remove("ativo");
            e.target.innerHTML="❤";

        }else{

            e.target.classList.add("ativo");
            e.target.innerHTML="❤️";

        }

    }

});

// Comprar

document.addEventListener("click", function(e){

    if(e.target.classList.contains("comprar")){

        e.stopPropagation();

        const id = Number(e.target.dataset.id);

        const produto = produtos.find(p => p.id === id);

        if(!produto) return;

        const mensagem = encodeURIComponent(
            `Oi, estou interessada na roupa "${produto.nome}".`
        );

        window.open(
            `https://wa.me/559198445442?text=${mensagem}`,
            "_blank"
        );

    }

});

// Clique no card

document.addEventListener("click", function(e){

    const card = e.target.closest(".produto");

    if(!card) return;

    if(
        e.target.classList.contains("comprar") ||
        e.target.classList.contains("favorito")
    ){
        return;
    }

    const id = card.dataset.id;

    // Em breve abrirá a página do produto
    // produto.html?id=ID

    alert("Página do produto em desenvolvimento.\nProduto ID: " + id);

});
