function buscarProduto() {

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/produtos",
        async: true,
        crossDomain : true,
        success : function(response) {
    
        $('#tabelaprincipalProduto> tbody > tr').remove();

        $("#id").val(response.id);

        for (var i = 0; i < response.length; i++) {

            const precoPuro = (response[i].preco);
            const precoFormatado = precoPuro.toLocaleString('pt-br', {minimumFractionDigits: 2});

            $('#tabelaprincipalProduto> tbody')
            .append(
                '<tr id="'+response[i].id+'"><td>'
                        + response[i].id
                        + '</td><td>'
                        + response[i].nomeProduto
                        + '</td><td>'
                        + response[i].descricao
                        + '</td><td>'
                        + precoFormatado                                             						
                        + '</td><td><button type="button" onclick="colocarEmEdicaoProduto('
                        + response[i].id
                        + ')" class="btn btn-primary" data-bs-dismiss="modal">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deleteProduto('
                        + response[i].id
                        + ')">Delete</button></td></tr>');
                }

                    }
                }).fail(function(xhr, status, errorThrown) {
                    Swal.fire("Opss ", "Erro ao buscar produtos! " + xhr.responseText, "error");
        });

}

function botaoDeletarDaTela(){
	var id = $('#id').val();
	
	if(id != null && id.trim() != ''){
	 deleteProduto(id);
	 document.getElementById('formCadastroProduto').reset();
	}
}

function apagaForm() {
	document.getElementById("modalPesquisarProduto").reset();
	}

function apagaFormCadastro() {
    document.getElementById("formCadastroProduto").reset();
    }


function deleteProduto(id){
	
	Swal.fire({
        title: 'Você tem certeza?',
        text: "Essa ação não poderá ser revertida!",
        icon: 'warning',
        confirmButtonColor: '#a777e3',
        confirmButtonText: 'Sim, pode deletar!',
        showCancelButton: true,
        cancelButtonColor: 'gray'
        
      }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                method : "DELETE",
                url : "http://localhost:8080/api/produtos/" + id,
                data : "id=" + id ,
                success : function(response) {
                    
                $('#'+ id).remove();
                document.getElementById('formCadastroProduto').reset();
                Swal.fire("Pronto!", "Registro excluído com sucesso!", "success");	
                
                    apagaFormCadastro();
                    buscarProduto();
                }
            }), Swal.fire(
            'Deletado!',
            'Seu arquivo foi deletado com sucesso.',
            'success'
          )
        }
    })	
}

function pesquisarProduto() {
			
    var nome = $('#nameBusca').val();

    if (nome != null && nome.trim() != '') {
       
        $.ajax({
            method : "GET",
            url : "http://localhost:8080/api/produtos/nameBusca",
            data : "nome=" + nome,
            async: true,
            crossDomain : true,
            success : function(response) {

            $('#tabelaresultadosProduto> tbody > tr').remove();

            $("#id").val(response.id);

            for (var i = 0; i < response.length; i++) {

            const precoPuro = (response[i].preco);
            const precoFormatado = precoPuro.toLocaleString('pt-br', {minimumFractionDigits: 2});

                $('#tabelaresultadosProduto> tbody')
                .append(
                    '<tr id="'+response[i].id+'"><td>'

                            + response[i].id
                            + '</td><td>'
                            + response[i].nomeProduto
                            + '</td><td>'
                            + response[i].descricao
                            + '</td><td>'
                            + precoFormatado								
                            + '</td><td><button type="button" onclick="colocarEmEdicaoProduto('
                            + response[i].id
                            + ')" class="btn btn-primary" data-bs-dismiss="modal">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deleteProduto('
                            + response[i].id
                            + ')">Delete</button></td></tr>');
                    }

                        }
                    }).fail(function(xhr, status, errorThrown) {
                        Swal.fire("Opss ", "Erro ao pesquisar um produto! ", "error");
            });
    }
}

function colocarEmEdicaoProduto(id) {

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/produtos/" + id,
        data : "id=" + id,
        success : function(response) {

            $("#id").val(response.id);
            $("#nomeProduto").val(response.nomeProduto);
            $("#descricao").val(response.descricao);

            const precoPuro = (response.preco);
            $("#preco").val(precoPuro.toLocaleString('pt-br',
                                 {minimumFractionDigits: 2}));

            

            $('#modalPesquisarProduto').modal('hide');
        }
        
        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Erro ao buscar produto por Id! " + xhr.responseText, "", "error");
    });
}

function salvarProduto() {  // Último Ajax

    var id = $("#id").val();
    var nomeProduto = $("#nomeProduto").val();
    var descricao = $("#descricao").val();

    var preco = $("#preco").val();
    preco = preco.replace(/[.]/g, "").replace(/[,]/g, ".");


    if (nomeProduto == null || nomeProduto != null && nomeProduto.trim() == '') {
        $("#descProduto").focus();
        Swal.fire("Opss!", "Informe o nome do produto", "info");
        return;
    }

    if (descricao == null || descricao != null && descricao.trim() == '') {
        $("#descProduto").focus();
        Swal.fire("Opss!", "Informe a descrição do produto", "info");
        return;
    }

    if (preco == null || preco != null && preco.trim() == '') {
        $("#preco").focus();
        Swal.fire("Opss!", "Informe o preço do produto", "info");
        return;
    }

    $.ajax({
        method : "POST",
        url : "http://localhost:8080/api/produtos",

        data : JSON.stringify({
            id: id,
            nomeProduto: nomeProduto,
            descricao: descricao,
            preco: preco

        }),
        contentType : "application/json; charset=utf-8",
        success : function(response) {
            $("#id").val(response.id);
            // console.log(response);
            Swal.fire("Pronto!", "Produto salvo com sucesso!", "success");

            buscarProduto();
            apagaFormCadastro();
            
        }
    
        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Opss ", "Erro ao salvar produto! " + xhr.responseText, "error");
    });

}

