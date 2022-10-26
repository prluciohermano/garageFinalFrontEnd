function buscarServico() {

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/servicos",
        async: true,
        crossDomain : true,
        success : function(response) {
    
        $('#tabelaprincipalServico> tbody > tr').remove();

        $("#id").val(response.id);

        for (var i = 0; i < response.length; i++) {

            const precoPuro = (response[i].preco);
            const precoFormatado = precoPuro.toLocaleString('pt-br', {minimumFractionDigits: 2});

            $('#tabelaprincipalServico> tbody')
            .append(
                '<tr id="'+response[i].id+'"><td>'
                        + response[i].id
                        + '</td><td>'
                        + response[i].descricao
                        + '</td><td>'
                        + precoFormatado                                             						
                        + '</td><td><button type="button" onclick="colocarEmEdicaoServico('
                        + response[i].id
                        + ')" class="btn btn-primary" data-bs-dismiss="modal">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deleteServico('
                        + response[i].id
                        + ')">Delete</button></td></tr>');
                }

                    }
                }).fail(function(xhr, status, errorThrown) {
                    Swal.fire("Opss ", "Erro ao buscar Serviços! " + xhr.responseText, "error");
        });

}

function botaoDeletarDaTela(){
	var id = $('#id').val();
	
	if(id != null && id.trim() != ''){
	 deleteServico(id);
	 document.getElementById('formCadastroServico').reset();
	}
}

function apagaForm() {
	document.getElementById("modalPesquisarServico").reset();
	}

function apagaFormCadastro() {
    document.getElementById("formCadastroServico").reset();
    }


function deleteServico(id){
	
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
                url : "http://localhost:8080/api/servicos/" + id,
                data : "id=" + id ,
                success : function(response) {
                    
                $('#'+ id).remove();
                document.getElementById('formCadastroServico').reset();
                Swal.fire("Pronto!", "Registro excluído com sucesso!", "success");	
                
                    apagaFormCadastro();
                    buscarServico();
                }
            }), Swal.fire(
            'Deletado!',
            'Seu arquivo foi deletado com sucesso.',
            'success'
          )
        }
    })	
}

function pesquisarServico() {
			
    var nome = $('#nameBusca').val();

    if (nome != null && nome.trim() != '') {
       
        $.ajax({
            method : "GET",
            url : "http://localhost:8080/api/servicos/nameBusca",
            data : "nome=" + nome,
            async: true,
            crossDomain : true,
            success : function(response) {

            $('#tabelaresultadosServico> tbody > tr').remove();

            $("#id").val(response.id);

            for (var i = 0; i < response.length; i++) {

            const precoPuro = (response[i].preco);
            const precoFormatado = precoPuro.toLocaleString('pt-br', {minimumFractionDigits: 2});

                $('#tabelaresultadosServico> tbody')
                .append(
                    '<tr id="'+response[i].id+'"><td>'

                            + response[i].id
                            + '</td><td>'
                            + response[i].descricao
                            + '</td><td>'
                            + precoFormatado								
                            + '</td><td><button type="button" onclick="colocarEmEdicaoServico('
                            + response[i].id
                            + ')" class="btn btn-primary" data-bs-dismiss="modal">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deleteServico('
                            + response[i].id
                            + ')">Delete</button></td></tr>');
                    }

                        }
                    }).fail(function(xhr, status, errorThrown) {
                        Swal.fire("Opss ", "Erro ao pesquisar um serviço! ", "error");
            });
    }
}

function colocarEmEdicaoProduto(id) {

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/servicos/" + id,
        data : "id=" + id,
        success : function(response) {

            $("#id").val(response.id);
            $("#descricao").val(response.descricao);

            const precoPuro = (response.preco);
            $("#preco").val(precoPuro.toLocaleString('pt-br',
                                 {minimumFractionDigits: 2}));

            

            $('#modalPesquisarServico').modal('hide');
        }
        
        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Erro ao buscar serviços por Id! " + xhr.responseText, "", "error");
    });
}

function salvarServico() {  // Último Ajax

    var id = $("#id").val();
    var descricao = $("#descricao").val();

    var preco = $("#preco").val();
    preco = preco.replace(/[.]/g, "").replace(/[,]/g, ".");


    if (descricao == null || descricao != null && descricao.trim() == '') {
        $("#descProduto").focus();
        Swal.fire("Opss!", "Informe a descrição do serviço", "info");
        return;
    }


    if (preco == null || preco != null && preco.trim() == '') {
        $("#preco").focus();
        Swal.fire("Opss!", "Informe o preço do serviço", "info");
        return;
    }

    $.ajax({
        method : "POST",
        url : "http://localhost:8080/api/servicos",

        data : JSON.stringify({
            id: id,
            descricao: descricao,
            preco: preco

        }),
        contentType : "application/json; charset=utf-8",
        success : function(response) {
            $("#id").val(response.id);
            // console.log(response);
            Swal.fire("Pronto!", "Serviço salvo com sucesso!", "success");

            buscarServico();
            apagaFormCadastro();
            
        }
    
        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Opss ", "Erro ao salvar serviço! " + xhr.responseText, "error");
    });

}

