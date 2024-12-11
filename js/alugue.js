function cadastrarPessoa(event){
    event.preventDefault(); // Evita o envio tradicional do formulário

    // Obtendo os valores dos campos do formulário
    var RA = document.getElementById("RA").value;
    var Data_Inicio = document.getElementById("DataInicio").value;
    var Data_Fim= document.getElementById("DataFim").value;

    // Corpo da requisição com os dados da pessoa
    var pessoaData = {
        RA: RA,
        DataInicio: Data_Inicio, //inverter caso de errado...
        DataFim: Data_Fim
    };

    // Fazendo a requisição POST para o endpoint de cadastro da API
    fetch('http://localhost:8080/alunos/gerarEmprestimo', { // Substitua pelo endpoint correto da sua API (coloquei um nome generico na API, mudar dps)
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pessoaData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Verifica o que a API está retornando no console
        if (data.success) { // Supondo que a API retorne 'success' em caso de sucesso (aqui seria bom deixar apenas um sucess msm... creio que não vai haver a necessidade de manipular outros dados dps de gerar o emprestimo.)
            window.location.href = "/Bibliotech-beta-/pages/home.html"; // Redireciona após sucesso
        } else {
            alert("Erro ao cadastrar"); // Teste para verificar se houve falha no cadastro
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert("Erro ao cadastrar");
    });
}

// Chama a função cadastrarPessoa quando o formulário for submetido

// document.getElementById("form").addEventListener("submit", cadastrarPessoa); aqui deve chamar a função emprestimo ao clicar no botão de subtmit do formulario