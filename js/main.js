

// function criaLinha(pessoa) {
//     linha =document.createElement("tr");

//     tdNome = document.createElement("td");
//     tdCpf = document.createElement("td");
//     tdCep = document.createElement("td");
//     tdCidade = document.createElement("td");
//     tdUf = document.createElement("td");

//     tdNome.innerHTML = pessoa.nome;
//     tdCpf.innerHTML = pessoa.cpf;
//     tdCep.innerHTML = pessoa.cep;
//     tdCidade.innerHTML = pessoa.cidade;
//     tdUf.innerHTML = pessoa.uf;

//     linha.appendChild(tdNome);
//     linha.appendChild(tdCpf);
//     linha.appendChild(tdCep);
//     linha.appendChild(tdCidade);
//     linha.appendChild(tdUf);

//     return linha;
// }

// function main() {
//     let data = fazGet("http://localhost:8080/api/pessoas");
//     let pessoas = JSON.parse(data);
//     let tabela = document.getElementById("tabela");
    
//     pessoas.forEach(element => {
//         let linha = criaLinha(element);
//         tabela.appendChild(linha);
//     });
// }

// main()






// // (async function() {
// //     try {

// //     const headers = {
// //       'Content-Type': 'application/json',
// //       'Criando': 'pessoas', 
// //     };
// //     const init = {
// //       method: 'GET',
// //       headers: headers,
// //       body: JSON.stringify({
// //         nome: 'Lúcio Herman',
// //     }),
// //   };
// //     const response = await fetch('http://localhost:8080/api/pessoas/b5dd46a7-6bef-49c0-a45f-32752cb833ba',
// //     init
// //     );
// //       const jsonData = await response.json();

// //       for (const post of jsonData){
// //       console.log(jsonData);
// //       }
// //     } catch(e){
// //       console.log('Deu ruim');
// //     }
// //   })();     