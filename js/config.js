const apiKey = "AIzaSyDhjlMv4hLPsbO_x1Ge45O_05GLVlfQXh0";

function pesquisar() {
    var busca = document.getElementById("barra_pesquisa").value;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${busca}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Para verificar os dados no console

            const tituloBusca = document.getElementById("titulo_busca");
            const listaLivros = document.getElementById("list_livros");

            if (tituloBusca && listaLivros) {
                tituloBusca.innerHTML = `Pesquisando por - ${busca}:`;
                listaLivros.innerHTML = ""; // Limpa o conteúdo anterior

                if (data.items && data.items.length > 0) {
                    data.items.forEach(item => {
                        const title = item.volumeInfo.title;
                        const capa = item.volumeInfo.imageLinks.thumbnail; // Verifica se a capa existe
                        const identificação = item.id;


                        const card = document.createElement("div");
                        card.classList = 'livros-info';
                        const cardItem = `
                        <img class="capa-livro" src="${capa}" alt="Capa do livro"/>
                        <div class="info_livros">
                            <h5 class="titulo-livro">${title}</h5>
                            <p class="id_livro">${identificação}</p>
                            <button id="button-alugar" onclick="capturar_livro()">Alugar
                        </div>
                    `;
                        card.innerHTML = cardItem;
                        listaLivros.appendChild(card);
                    });
                } else {
                    listaLivros.innerHTML = "Nenhum livro encontrado.";  // Exibe uma mensagem se não houver resultados
                }
            } else {
                console.error("Elementos com os IDs 'titulo_busca' ou 'list_livros' não foram encontrados.");
            }
        })
        .catch(error => console.error('Erro:', error));
}

function capturar_livro() {
    localStorage.clear();
    let id = document.getElementById("id_livro").textContent//trim remove espaços em branco
    localStorage.setItem("livro", id)

    window.location.href = "alugar.html";
}

document.getElementById('toggleButton').addEventListener('click', function() {
    let sideBar = document.getElementById('sideBar');
    sideBar.classList.toggle('visible');
    sideBar.classList.toggle('hidden');
});
