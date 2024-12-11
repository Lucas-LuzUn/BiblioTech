 const apiKey = "AIzaSyDhjlMv4hLPsbO_x1Ge45O_05GLVlfQXh0";

let id_livro = localStorage.getItem("Livro");

document.addEventListener("DOMContentLoaded", function() {
    const url_home = `https://www.googleapis.com/books/v1/volumes?q=${id_livro}&maxResults=1&key=${apiKey}`;

    fetch(url_home)
    .then(response => response.json())
    .then(data =>{
        console.log(data)

        data.items.forEach(item => { // Extrai o título do livro
            const title = item.volumeInfo.title; // (IDEIA) fazer uma variavel que procure o item da array, ex: volumeInfo{pesquisa}
            const capa = item.volumeInfo.imageLinks.thumbnail
            const autor = item.volumeInfo.authors
            const descrição = item.volumeInfo.description
            const sinopse = item.searchInfo.textSnippet

            const card = document.createElement("div")
            card.classList = 'container_principal'
            const cardItem = `
                    <div class="container_img">
                        <img  class="capa-livro" src=${capa}/>
                    </div>
                    
                    <div class="info_livro">
                        <h1 class="titulo-livro">${title}</h1>
                        <h3 class="sinopse-livro">${sinopse}</h3>
                        <h3 class="autor-livro">Autor: ${autor}</h3>
                        <button class="button_alugar" onclick="Alugar()">Alugar</button>
                    </div>

                    <div class="container_descricao">
                        <p class="descricao-livro"><h3>Descrição:</h3>${descrição}</p>
                    </div>                       
                `
                card.innerHTML = cardItem
                document.getElementById("livro_aluguel").appendChild(card)       
        }) 
        
    }) 

});

function Alugar(){

    window.location.href = "alugue.html";
/*
    // Recupera os dados do livro armazenados no localStorage
    const title = localStorage.getItem("Livro");
    const autor = localStorage.getItem("Autor");
    const genero = localStorage.getItem("Genero");
    
        // Cria um objeto com os dados do livro para enviar ao banco de dados
    const livro = {
        titulo: title,
        autor: autor,
        genero: genero
    };
    
    // URL da API para onde o livro será enviado (substitua pela sua URL da API)
    const apiUrl = "http://localhost:8080/livros/cadastrar";  // Altere conforme a sua API
    
    // Envia o objeto JSON para o backend via requisição POST
    fetch(apiUrl, {
    method: "POST",  // Método POST para cadastrar
        headers: {
            "Content-Type": "application/json"  // Informando que os dados são em JSON
        },
        body: JSON.stringify(livro)  // Converte o objeto para JSON antes de enviar
    })
    .then(response => response.json())  // Converte a resposta em JSON
    .then(data => {
        // Exibe a resposta ou trata conforme a resposta da API
        console.log("Livro cadastrado com sucesso:", data);
        // Talvez redirecionar o usuário ou mostrar uma mensagem
    })
    .catch(error => {
        // Trata qualquer erro que ocorra na requisição
        console.error("Erro ao cadastrar livro:", error);
    });
*/
}