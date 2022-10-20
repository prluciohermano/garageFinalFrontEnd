function buscarProduto() {

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/produtos/",
    
        success : function(response) {

        $('#tabelaprincipalProd> tbody > tr').remove();

        $("#id").val(response.id);

        for (var i = 0; i < response.length; i++) {
            $('#tabelaprincipalProd> tbody')
            .append(
                '<tr id="'+response[i].id+'"><td>'

                        + response[i].id
                        + '</td><td>'
                        + response[i].descricao
                        + '</td><td>'
                        + response[i].anoModelo
                        + '</td><td>'
                        + response[i].corProduto	
                        + '</td><td>'
                        + response[i].dataEntrada
                        + '</td><td>'
                        + response[i].precoEntrada                        						
                        + '</td><td>'
                        + response[i].pessoaModel.nome                      						
                        + '</td><td><button type="button" onclick="colocarEmEdicaoProd('
                        + response[i].id
                        + ')" class="btn btn-primary">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deleteProduct('
                        + response[i].id
                        + ')">Delete</button></td></tr>');
                }

                    }
                }).fail(function(xhr, status, errorThrown) {
                    Swal.fire("Opss ", "Erro ao buscar produtos!", "error");
        });

}

function botaoDeletarDaTela(){
	var id = $('#id').val();
	
	if(id != null && id.trim() != ''){
	 deleteProduct(id);
	 document.getElementById('formCadastroProduct').reset();
	}
}

function apagaForm() {
	document.getElementById("modalPesquisarProduct").reset();
	}

function apagaFormCadastro() {
    document.getElementById("formCadastroProduct").reset();
    }


function deleteProduct(id){
	
	if(confirm('Deseja realmente deletar?')) {
	
	 $.ajax({
			method : "DELETE",
			url : "http://localhost:8080/api/produtos/" + id,
			data : "id=" + id ,
			success : function(response) {
				
			//$('#'+ id).remove();
			document.getElementById('formCadastroProduct').reset();
            Swal.fire("Pronto!", "Registro excluído com sucesso!", "success");	
            
                apagaFormCadastro();
                buscarProduto();
			}
		}).fail(function(xhr, status, errorThrown) {
			Swal.fire("Opss ", "Erro ao excluir um produto: ", "error");
		});
	}	
}

function pesquisarProduto() {
			
    var nome = $('#nameBusca').val();

    if (nome != null && nome.trim() != '') {
       
        $.ajax({
            method : "GET",
            url : "http://localhost:8080/api/produtos/nameBusca",
            data : "nome=" + nome,
            success : function(response) {

            $('#tabelaresultadosProd> tbody > tr').remove();

            $("#id").val(response.id);

            for (var i = 0; i < response.length; i++) {
                $('#tabelaresultadosProd> tbody')
                .append(
                    '<tr id="'+response[i].id+'"><td>'

                            + response[i].id
                            + '</td><td>'
                            + response[i].descricao
                            + '</td><td>'
                            + response[i].anoModelo								
                            + '</td><td><button type="button" onclick="colocarEmEdicaoProd('
                            + response[i].id
                            + ')" class="btn btn-primary">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deleteProduct('
                            + response[i].id
                            + ')">Delete</button></td></tr>');
                    }

                        }
                    }).fail(function(xhr, status, errorThrown) {
                        Swal.fire("Opss ", "Erro ao pesquisar um produto! ", "error");
            });
    }
}

function colocarEmEdicaoProd(id) {

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/produtos/" + id,
        data : "id=" + id,
        success : function(response) {

            $("#id").val(response.id);
            $("#descricao").val(response.descricao);
            $("#anoModelo").val(response.anoModelo);
            $("#placaCar").val(response.placaCar);
            $("#corProduto").val(response.corProduto);
            $("#dataEntrada").val(response.dataEntrada);
            $("#precoEntrada").val(response.precoEntrada);
            $("#categoria").val(response.categoria.id);
            $("#pessoa").val(response.pessoaModel.id);

            $('#modalPesquisarProduct').modal('hide');
        }
        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Erro ao buscar produto por Id! ", "", "error");
    });
}

function salvarProduto() {  // Último Ajax

    var id = $("#id").val();
    var descricao = $("#descricao").val();
    var anoModelo = $("#anoModelo").val();
    var corProduto = $("#corProduto").val();
    var placaCar = $("#placaCar").val();
    var dataEntrada = $("#dataEntrada").val();
    var precoEntrada = $("#precoEntrada").val();
    var categoria = $("#categoria").val();
    var pessoa = $("#pessoa").val();

    if (descricao == null || descricao != null && descricao.trim() == '') {
        $("#descProduto").focus();
        Swal.fire("Opss!", "Informe a descrição do carro", "info");
        return;
    }

    if (anoModelo == null || anoModelo != null && anoModelo.trim() == '') {
        $("#anoModelo").focus();
        Swal.fire("Opss!", "Informe ano do carro.", "info");
        return;
    }

    if (placaCar == null || placaCar != null && placaCar.trim() == '') {
        $("#placaCar").focus();
        Swal.fire("Opss!", "Informe a placa do carro", "info");
        return;
    }

    if (pessoa == null || pessoa != null && pessoa.trim() == '') {
        $("#anoModelo").focus();
        Swal.fire("Opss!", "Informe o proprietário do Veículo", "info");
        return;
    }

    $.ajax({
        method : "POST",
        url : "http://localhost:8080/api/produtos",

        data : JSON.stringify({
            id: id,
            descricao: descricao,
            anoModelo: anoModelo,
            placaCar: placaCar,
            corProduto: corProduto,
            dataEntrada: dataEntrada,
            precoEntrada: precoEntrada,
            categoria: {
                id: categoria
            },
            pessoaModel: {
                id: pessoa
            }

        }),
        contentType : "application/json; charset=utf-8",
        success : function(response) {
            $("#id").val(response.id);
            console.log(response);
            Swal.fire("Pronto!", "Produto salvo com sucesso!", "success");

            buscarProduto();
            apagaFormCadastro();
            
        }
    
        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Opss ", "Erro ao salvar produto! ", "error");
    });

}

function carregaProprietario() {

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/pessoas",
        success : function(response) {
            
        for (var i = 0; i < response.length; i++) {
            var idPes = response[i].id;
            var value = response[i].nome;
            $("#pessoa").append("<option value='" + idPes + "'>" + value + "</option>");
        }

     }

    }).fail(function(xhr, status, errorThrown) {
        Swal.fire("Erro ao carregar Proprietário ", "", "error");
    });

} carregaProprietario();


function carregaCategoria() {

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/categorias",
        success : function(response) {
            
        for (var i = 0; i < response.length; i++) {
            var idCat = response[i].id;
            var value = response[i].nome;
            $("#categoria").append("<option value='" + idCat + "'>" + value + "</option>");
        }

     }

    }).fail(function(xhr, status, errorThrown) {
        Swal.fire("Opss ", "Erro ao carregar Categoria ", "error");
    });

} carregaCategoria();