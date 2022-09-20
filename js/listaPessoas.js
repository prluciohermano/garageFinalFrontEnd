// console.log('Lista de Pessoas - Aguarde...');

// let myBtn = document.querySelector("#btn-listar");
// let list = document.querySelector("#list");

// myBtn.addEventListener("click", function() {
//     fetch('http://localhost:8080/api/pessoas')
//     .then((response) => {
//         // console.log(response);
//         return response.json();
//     })
//     .then((response) => {
//         response.data.forEach((pessoa) => {
//             let item = document.createElement("li");

//             item.innerHTML =  '<span>'+ pessoa.nome +'<span> + <span>'+ pessoa.cpf+'</span>';

//             list.appendChild(item);
//         })
//     })
// })

function buscarPessoa() {

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/pessoas",
    
        success : function(response) {

        $('#tabelaprincipal > tbody > tr').remove();

        $("#id").val(response.id);

        for (var i = 0; i < response.length; i++) {
            $('#tabelaprincipal > tbody')
            .append(
                '<tr id="'+response[i].id+'"><td>'
                        + response[i].id
                        + '</td><td>'
                        + response[i].nome
                        + '</td><td>'
                        + response[i].email
                        + '</td><td>'
                        + response[i].cpf	
                        + '</td><td>'
                        + response[i].cidade
                        + '</td><td>'
                        + response[i].uf							
                        + '</td><td><button type="button" onclick="colocarEmEdicao('
                        + response[i].id
                        + ')" class="btn btn-primary">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deleteUser('
                        + response[i].id
                        + ')">Delete</button></td></tr>');
                }

                    }
                }).fail(function(xhr, status, errorThrown) {
            alert("Erro ao buscar Pessoa: " + xhr.responseText);
        });

}

function deleteUser(id){
	
	if(confirm('Deseja realmente deletar?')) {
	
	 $.ajax({
			method : "DELETE",
			url : "http://localhost:8080/api/pessoas/" + id,
			data : "id=" + id ,
			success : function(response) {
				
				//$('#'+ id).remove();
			document.getElementById('formCadastroUser').reset();
				alert("Registro Excluído com sucesso!");	  
			}
		}).fail(function(xhr, status, errorThrown) {
			alert("Erro ao deletar pessoa por id: " + xhr.responseText);
		});
	}	
}

function pesquisarPessoa() {
			
    var nome = $('#nameBusca').val();

    if (nome != null && nome.trim() != '') {
       
        $.ajax({
            method : "GET",
            url : "http://localhost:8080/api/pessoas/nameBusca",
            data : "nome=" + nome,
            success : function(response) {

            $('#tabelaresultados > tbody > tr').remove();

            $("#id").val(response.id);

            for (var i = 0; i < response.length; i++) {
                $('#tabelaresultados > tbody')
                .append(
                    '<tr id="'+response[i].id+'"><td>'
                            + response[i].id
                            + '</td><td>'
                            + response[i].nome
                            + '</td><td>'
                            + response[i].cpf								
                            + '</td><td><button type="button" onclick="colocarEmEdicao('
                            + response[i].id
                            + ')" class="btn btn-primary">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deleteUser('
                            + response[i].id
                            + ')">Delete</button></td></tr>');
                    }

                        }
                    }).fail(function(xhr, status, errorThrown) {
                alert("Erro ao pesquisar uma Pessoa: " + xhr.responseText);
            });
    }
}

function colocarEmEdicao(id) {

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/pessoas/" + id,
        data : "id=" + id,
        success : function(response) {

            $("#id").val(response.id);
            $("#nome").val(response.nome);
            $("#cpf").val(response.cpf);
            $("#rg").val(response.rg);
            $("#sexo").val(response.sexo);
            $("#cep").val(response.cep);
            $("#rua").val(response.rua);
            $("#numero").val(response.numero);
            $("#bairro").val(response.bairro);
            $("#comp").val(response.comp);
            $("#cidade").val(response.cidade);
            $("#uf").val(response.uf);
            $("#email").val(response.email);

            $('#modalPesquisarUser').modal('hide');
            apagaForm();
        }
    }).fail(function(xhr, status, errorThrown) {
        alert("Erro ao buscar usuario por id: " + xhr.responseText);
    });

}

function salvarUsuario() {

    var id = $("#id").val();
    var nome = $("#nome").val();
    var cpf = $("#cpf").val();
    var rg = $("#rg").val();
    var sexo = $("#sexo").val();
    var cep = $("#cep").val();
    var rua = $("#rua").val();
    var numero = $("#numero").val();
    var bairro = $("#bairro").val();
    var comp = $("#comp").val();
    var cidade = $("#cidade").val();
    var uf = $("#uf").val();
    var email = $("#email").val();

    if (nome == null || nome != null && nome.trim() == '') {
        $("#nome").focus();
        alert('Informe o nome');
        return;
    }

    if (cpf == null || cpf != null && cpf.trim() == '') {
        $("#cpf").focus();
        alert('Informe o CPF');
        return;
    }

    $.ajax({
        method : "POST",
        url : "http://localhost:8080/api/pessoas",
        data : JSON.stringify({
            id : id,
            nome : nome,
            cpf : cpf,
            rg : rg,
            sexo : sexo,
            cep : cep,
            rua : rua,
            numero : numero,
            bairro : bairro,
            comp : comp,
            cidade : cidade,
            uf : uf,
            email : email
        }),
        contentType : "application/json; charset=utf-8",
        success : function(response) {
            $("#id").val(response.id);
            alert("Gravou com sucesso!");

            // apagaForm();
        }

    }).fail(function(xhr, status, errorThrown) {
        alert("Erro ao salvar pessoa: " + xhr.responseText);
    });

}