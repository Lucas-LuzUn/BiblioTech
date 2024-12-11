function login(event) {
    event.preventDefault(); // Evita que o formulário seja enviado de forma tradicional

    // Obtenha os valores dos campos
    var usuario = document.getElementById("input_usuario").value;
    var senha = document.getElementById("input_senha").value;

    if (!usuario || !senha) {
        document.getElementById("msg_erro").innerHTML = "Preencha todos os campos.";
        return;
    }

    // Corpo da requisição com os dados do login
    var loginData = {
        RA: usuario, // Assumindo que o campo na API é RA
        senha: senha
    };

    // Fazendo a requisição POST para o endpoint da API
    fetch('http://localhost:8080/alunos/login', { // Substitua o endpoint pelo correto da sua API
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error.error || "Erro desconhecido");
            });
        }
        return response.json();
    })
    .then(data => {
        console.log("Bem Vindo!", data);

        // Armazena os dados do aluno no localStorage
        localStorage.setItem("DadosAluno", JSON.stringify(data));

        // Redireciona para a página home
        window.location.href = "/Bibliotech-beta-/pages/home.html";
    })
    .catch(error => {
        console.error("Erro na requisição:", error.message);
        document.getElementById("msg_erro").innerHTML = error.message || "Erro ao fazer login.";
    });
}

function Acessar(){
    window.location.href = "/Bibliotech/pages/home.html"
}