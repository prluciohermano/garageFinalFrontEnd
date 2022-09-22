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
                        + response[i].descProduto
                        + '</td><td>'
                        + response[i].anoModelo
                        + '</td><td>'
                        + response[i].corProduto	
                        + '</td><td>'
                        + response[i].dataEntrada
                        + '</td><td>'
                        + response[i].precoEntrada                        						
                        + '</td><td><button type="button" onclick="colocarEmEdicaoProd('
                        + response[i].id
                        + ')" class="btn btn-primary">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deleteProduct('
                        + response[i].id
                        + ')">Delete</button></td></tr>');
                }

                    }
                }).fail(function(xhr, status, errorThrown) {
            alert("Erro ao buscar produtos: " + xhr.responseText);
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
				alert("Registro Excluído com sucesso!");	
            
                apagaFormCadastro();
                buscarProduto();
			}
		}).fail(function(xhr, status, errorThrown) {
			alert("Erro ao deletar produto por id: " + xhr.responseText);
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
                            + response[i].descProduto
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
                alert("Erro ao pesquisar um Produto: " + xhr.responseText);
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
            $("#descProduto").val(response.descProduto);
            $("#anoModelo").val(response.anoModelo);
            $("#corProduto").val(response.corProduto);
            $("#dataEntrada").val(response.dataEntrada);
            $("#precoEntrada").val(response.precoEntrada);
            

            $('#modalPesquisarProduct').modal('hide');
            apagaForm();
        }
    }).fail(function(xhr, status, errorThrown) {
        alert("Erro ao buscar produto por id: " + xhr.responseText);
    });

}

function salvarProduto() {  // Último Ajax

    var id = $("#id").val();
    var descProduto = $("#descProduto").val();
    var anoModelo = $("#anoModelo").val();
    var corProduto = $("#corProduto").val();
    var dataEntrada = $("#dataEntrada").val();
    var precoEntrada = $("#precoEntrada").val();

    if (descProduto == null || descProduto != null && descProduto.trim() == '') {
        $("#descProduto").focus();
        alert('Informe a descrição do Produto');
        return;
    }

    if (anoModelo == null || anoModelo != null && anoModelo.trim() == '') {
        $("#anoModelo").focus();
        alert('Informe o ano / modelo do produto');
        return;
    }

    $.ajax({
        method : "POST",
        url : "http://localhost:8080/api/produtos",
        data : JSON.stringify({
            id : id,
            descProduto : descProduto,
            anoModelo : anoModelo,
            corProduto : corProduto,
            dataEntrada : dataEntrada,
            precoEntrada : precoEntrada

        }),
        contentType : "application/json; charset=utf-8",
        success : function(response) {
            $("#id").val(response.id);
            alert("Gravou com sucesso!");

            buscarProduto();
            apagaFormCadastro();
            
        }

    }).fail(function(xhr, status, errorThrown) {
        alert("Erro ao salvar produto: " + xhr.responseText);
    });

}