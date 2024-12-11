function cadastrarPessoa(event){
    event.preventDefault();

    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var RA = document.getElementById("RA").value;
    var curso = document.getElementById("Curso").value;
    var senha = document.getElementById("senha").value;

    var pessoaData = {
        nome: nome,
        email: email,
        RA: RA,
        senha: senha,
        curso: curso
    };

    fetch('http://localhost:8080/alunos/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pessoaData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Resposta da API:', data);
        if (data.success) {
            window.location.href = "/Bibliotech-beta-/index.html";
        } else {
            alert("Erro ao cadastrar: " + (data.message || "Erro desconhecido"));
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        alert("Erro ao cadastrar");
    });
}
document.getElementById("form").addEventListener("submit", cadastrarPessoa);