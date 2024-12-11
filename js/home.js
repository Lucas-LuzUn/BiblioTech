// Chave de API do Google Books
const apiKey = "AIzaSyDhjlMv4hLPsbO_x1Ge45O_05GLVlfQXh0";
// Variável global que armazena o valor da pesquisa. Inicialmente é "All"
let pesquisarLivro = "Romance";

// Evento que é disparado quando o conteúdo da página (DOM) é completamente carregado
document.addEventListener("DOMContentLoaded", function() {
    // Chama a função buscarLivros e passa o valor atual de pesquisarLivro (inicialmente "All")
    buscarLivros(pesquisarLivro);
});

// Função que faz a requisição à API do Google Books e exibe os livros encontrados
function buscarLivros(buscarLivros) {
    // URL da API do Google Books, com a chave da API e o termo de pesquisa (buscarLivros)
    const url = `https://www.googleapis.com/books/v1/volumes?q=${buscarLivros}&key=${apiKey}`;

    // A função fetch realiza a requisição HTTP
    fetch(url)
        .then(response => response.json())  // Converte a resposta da API em formato JSON
        .then(data => {
            console.log(data);  // Exibe os dados da resposta no console (para depuração)

            // Obtém os elementos do DOM onde os resultados serão exibidos
            const tituloBusca = document.getElementById("titulo_busca");
            const listaLivros = document.getElementById("list_livros");

            // Verifica se os elementos existem antes de tentar manipulá-los
            if (tituloBusca && listaLivros) {
                // Exibe o título da busca com o termo pesquisado
                tituloBusca.innerHTML = `Resultados para "${buscarLivros}"`;

                // Limpa os resultados anteriores antes de adicionar os novos
                listaLivros.innerHTML = "";

                // Verifica se há livros na resposta da API
                if (data.items && data.items.length > 0) {
                    // Itera sobre cada item (livro) retornado pela API
                    data.items.forEach(item => {
                        // Extrai o título e a capa do livro da resposta
                        const title = item.volumeInfo.title;
                        const capa = item.volumeInfo.imageLinks?.thumbnail || 'default-thumbnail.jpg'; // Caso não tenha capa, usa uma imagem padrão
                        const autor = item.volumeInfo.authors
                        const genero = item.volumeInfo.categories
                        // A identificação do livro (usada no controle)

                        // Cria um novo elemento de card para exibir o livro
                        const card = document.createElement("div");
                        card.classList = 'livros-info';  // Define a classe para o card

                        // Cria o conteúdo do card
                        const cardItem = `
                            <img class="capa-livro" src="${capa}" alt="Capa do livro"/>
                            <div class="info_livros">
                                <h5 class="titulo-livro">${title}</h5>
                            </div>
                            <button class="button_alugar" onclick="capturar_livro('${title}', '${autor}', '${genero}')">Ver mais</button>
                        `;
                        // Atribui o HTML do card ao elemento card
                        card.innerHTML = cardItem;

                        // Adiciona o card à lista de livros
                        listaLivros.appendChild(card);
                    });
                } else {
                    // Se não houver livros, exibe uma mensagem informando que não foi encontrado nenhum livro
                    listaLivros.innerHTML = "Nenhum livro encontrado.";
                }
            } else {
                // Caso algum dos elementos do DOM não seja encontrado, exibe um erro no console
                console.error("Elementos com os IDs 'titulo_busca' ou 'list_livros' não foram encontrados.");
            }
        })
        .catch(error => console.error('Erro na requisição:', error));  // Exibe qualquer erro ocorrido na requisição
}

// Função que é chamada quando o usuário faz uma pesquisa
function pesquisar() {
    // Obtém o valor da barra de pesquisa
    const infoBusca = document.getElementById("barra_pesquisa").value;
    // Atualiza a variável global pesquisarLivro com o valor da pesquisa
    pesquisarLivro = infoBusca;
    // Chama a função buscarLivros novamente, passando o novo valor de pesquisa
    buscarLivros(pesquisarLivro);
}

// Função chamada quando o usuário clica no botão "Alugar" de um livro
function capturar_livro(title ,autor, genero) {    
    // Armazena o título do livro selecionado no localStorage (para persistir entre as páginas)
    localStorage.setItem("Livro", title);
    // Redireciona para a página de aluguel (alugar.html)
    localStorage.setItem("Autor", autor);

    localStorage.setItem("Genero", genero);

    window.location.href = "livro.html";
}

// Evento de clique para alternar a visibilidade da barra lateral
document.getElementById('toggleButton').addEventListener('click', function() {
    // Obtém o elemento da barra lateral
    let sideBar = document.getElementById('sideBar');
    // Alterna as classes 'visible' e 'hidden', mostrando ou ocultando a barra lateral
    sideBar.classList.toggle('visible');
    sideBar.classList.toggle('hidden');
});
