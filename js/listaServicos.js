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

            const precoPuro = (response[i].precoServico);
            const precoFormatado = precoPuro.toLocaleString('pt-br', {minimumFractionDigits: 2});

            $('#tabelaprincipalServico> tbody')
            .append(
                '<tr id="'+response[i].id+'"><td>'
                        + response[i].id
                        + '</td><td>'
                        + response[i].descricao
                        + '</td><td>'
                        + precoFormatado  
                        + '</td><td>'
                        + response[i].pessoa.nome                                           						
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

function botaoDeletarDaTela(){ // Botão amarelo
	var id = $('#id').val();
	
	if(id != null && id.trim() != ''){
	 deleteServico(id);
	 document.getElementById('formCadastroServico').reset();
	}
}

// function apagaForm() {
// 	document.getElementById("modalPesquisarServico").reset();
// 	}

// function apagaFormCadastro() {
//     document.getElementById("formCadastroServico").reset();
//     }




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

function pesquisarServico() { // pesquisar Serviço de cima
			
    var nome = $('#nomeBusca').val();
    
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

            const precoPuro = (response[i].precoServico);
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


function colocarEmEdicaoServico(id) { // Aqui coloca em edição da primeira vez e DELETA ÍTEM
    $("#form-produto td").remove();
    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/servicos/" + id,
        data : "id=" + id,
        success : function(response) {

            $("#id").val(response.id);
            $("#descricao").val(response.descricao);
            $("#garantia").val(response.garantia);
            $("#defeito").val(response.defeito);
            $("#observacoes").val(response.observacoes);

            for (var i = 0; i < response.itens.length; i++) {

                const precoPuro = (response.itens[i].produto.preco).toLocaleString('pt-br',
                                  {minimumFractionDigits: 2});
                $('#form-produto> tbody').append('<tr id="tr-'+response.itens[i].produto.id+'"><td>'

                                + response.itens[i].produto.id
                                + '</td><td>'
                                + response.itens[i].produto.nomeProduto
                                + '</td><td>'
                                + response.itens[i].produto.descricao
                                + '</td><td>'
                                + precoPuro							
                                + '</td><td>'
                                + response.itens[i].quantidade
                                + '</td><td><button type="button" class="btn btn-danger" onclick="removeItemProduto('
                                + response.itens[i].id
                                + ')">Del</button></td></tr>');
                                
            }

            var html = "";

            const dataInicial = (response.dataInicialServico);
            const data = new Date(dataInicial);
            dataFormatadaInicial = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
            $("#dataInicialServico").val(dataFormatadaInicial);

            const dataFinal = (response.dataFinalServico);

            if (dataFinal != null) {
                
                const dataF = new Date(dataFinal);
                dataFormatadaFinal = dataF.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
                $("#dataFinalServico").val(dataFormatadaFinal);
                //$("#msg").html(html).reset();

                } else if (dataFinal == null) {        
                    
                    $("#dataFinalServico").val(dataFinal);
                    html += '<div class="alert alert-primary" role="alert"><strong>Atenção!</strong> Esse Pedido ainda está em aberto!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
                    $("#msg").html(html);
                    
                } 
                
                $("#pessoa").val(response.pessoa.nome);
                $("#pessoa").val(response.pessoa.id);

                const precoServico = (response.precoServico);
                $("#precoServico").val(precoServico.toLocaleString('pt-br',
                                    {minimumFractionDigits: 2}));

                $("#produtos").val(response.produtos);

                $('#msg').html(html).reset();
                
                
            $('#modalPesquisarServico').modal('hide');
        }
        
        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Erro ao buscar serviços por Id! " + xhr.responseText, "", "error");
    });
    
}

function salvarServico() {  // Último Ajax
    
    var id = $("#id").val();
    var descricao = $("#descricao").val();
    var garantia = $("#garantia").val();
    var defeito = $("#defeito").val();
    var observacoes = $("#observacoes").val();

    var dataInicial = $("#dataInicialServico").val();
    var dataInicialServico = moment(dataInicial, "DD/MM/YYYY");
    dataInicialServico.format("YYYY-MM-DD HH:mm:ss")

    var dataFinal = $("#dataFinalServico").val();
    var dataFinalServico = moment(dataFinal, "DD/MM/YYYY");
    dataFinalServico.format("YYYY-MM-DD HH:mm:ss")

    var precoServico = $("#precoServico").val();
    precoServico = precoServico.replace(/[.]/g, "").replace(/[,]/g, ".");

    var pessoa = $("#pessoa").val();
    var produto = $("#produto").val();

    if (descricao == null || descricao != null && descricao.trim() == '') {
        $("#desricao").focus();
        Swal.fire("Opss!", "Informe a descrição do serviço", "info");
        return;
    }


    if (precoServico == null || precoServico != null && precoServico.trim() == '') {
        $("#precoServico").focus();
        Swal.fire("Opss!", "Informe o preço do serviço", "info");
        return;
    }

    $.ajax({
        method : "POST",
        url : "http://localhost:8080/api/servicos",
        

        data : JSON.stringify({
            id: id,
            descricao: descricao,
            garantia: garantia,
            defeito: defeito,
            observacoes: observacoes,
            dataInicialServico: dataInicialServico,
            dataFinalServico: dataFinalServico,
            precoServico: precoServico,
            pessoa: pessoa,
            produto: produto

            
            
        }),
        contentType : "application/json; charset=utf-8",
        success : function(response) {
            $("#id").val(response.id);

            Swal.fire("Pronto!", "Serviço salvo com sucesso!", "success");

            buscarServico();
            apagaFormCadastro();
            
        },
        
        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Opss ", "Erro ao salvar serviço! " + xhr.responseText, "error");
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
        Swal.fire("Erro ao carregar Proprietário " + xhr.responseText, "", "error");
    });

} carregaProprietario();


function pesquisarProdutoServico() { /// Vem do acrescentar Produto
			
    var nome = $('#nameBusca').val();

    if (nome != null && nome.trim() != '') {
       
        $.ajax({
            method : "GET",
            url : "http://localhost:8080/api/produtos/nameBusca",
            data : "nome=" + nome,
            async: true,
            crossDomain : true,
            success : function(response) {

            $('#tabelaresultadosProdutoServico> tbody > tr').remove();

            //$("#id").val(response.id);

            for (var i = 0; i < response.length; i++) {

            const precoPuro = (response[i].preco);
            const precoFormatado = precoPuro.toLocaleString('pt-br', {minimumFractionDigits: 2});

                $('#tabelaresultadosProdutoServico> tbody')
                .append(
                    '<tr id="'+response[i].id+'"><td>'

                            + response[i].id
                            + '</td><td>'
                            + response[i].nomeProduto
                            + '</td><td>'
                            + response[i].descricao
                            + '</td><td>'
                            + precoFormatado								
                            + '</td><td><button type="button" onclick="colocarEmEdicaoProdutoServico('
                            + response[i].id
                            + ')" class="btn btn-primary" data-bs-dismiss="modal">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="removeProduto('
                            + response[i].id
                            + ')">Remove</button></td></tr>');
                    }

                        }
                    }).fail(function(xhr, status, errorThrown) {
                        Swal.fire("Opss ", "Erro ao pesquisar um produto! ", "error");
            });
    }
}



function colocarEmEdicaoProdutoServico(id) { // aqui coloca os itens no pedido
    
    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/produtos/" + id,
        data : "id=" + id,
        success : function(response) {

            // var html = ""
            // $("#id").val(response.id);
            // $("#nomeProduto").val(response.nomeProduto);
            // $("#descricao").val(response.descricao);

            const precoPuro = (response.preco);
            $("#preco").val(precoPuro.toLocaleString('pt-br',
                                 {minimumFractionDigits: 2}));

            $('#form-produto> tbody')
                .append(
                    '<tr id="tr-'+response.id+'"><td>'

                            + response.id
                            + '</td><td>'
                            + response.nomeProduto
                            + '</td><td>'
                            + response.descricao
                            + '</td><td>'
                            + precoPuro	
                            + '</td><td><div class="col-6 col-sm-4"><input type="number" class="form-control" id="quantidade">'							
                            + '</td><td><button type="button" class="btn btn-danger" onclick="removeItemProduto('
                            + response.id
                            + ')">Del-</button></div></td>'
                            
                            + '</td><td><button type="button" class="btn btn-success" onclick="addProduto('
                            + response.id
                            + ')">Add+</button></td></tr>');
        }
        
        
        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Erro ao buscar produto por Id! " + xhr.responseText, "", "error");
    });
    
}

function addProduto(idProd) { // ================================================ ADDICIONA ====

    var id = $("#id").val();
    var quantidade = $("#quantidade").val();

    if (quantidade <= 0 || quantidade != null && quantidade == '') {
        $("#pessoa").focus();
        Swal.fire("Opss!", "Adicione uma quantidade válida", "info");
        return;
    }

    if (id == null || id != null && id.trim() == '') {
        $("#quantidade").focus();
        Swal.fire("Opss!", "Escolha um serviço", "info");
        return;
    }

    // alert("vamos adicionar no serviço: " + id + " id do Produto: " + idProd
    //     + " Quantidade: " + quantidade);

        $.ajax({
            method : "POST",
            url : "http://localhost:8080/api/servicos/" + id + "/itens",
            data: "id=" + id,
            async: true,
            crossDomain : true,
    
            data : JSON.stringify({
                
                quantidade: quantidade, 
                produto: {
                    id: idProd
                },
                servico: {
                    id: id
                }
    
            }),
            contentType : "application/json; charset=utf-8",
            success : function(response) {
                    
                Swal.fire("Pronto!", "Ítem adicionado ao serviço!", "success");
    
                colocarEmEdicaoServico(id); // Refaz o pedido depois que acrecenta o ítem
                
            },
            
            }).fail(function(xhr, status, errorThrown) {
                Swal.fire("Opss ", "Erro ao salvar serviço! " + xhr.responseText, "error");
        });

}


function removeItemProduto(id){
	var idSer = $("#id").val();
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
                url : "http://localhost:8080/api/servicos/" + id + "/itens",
                data : "id=" + id ,
                success : function(response) {
                    
                $('#'+ id).remove();
                document.getElementById('formCadastroServico').reset();
                Swal.fire("Pronto!", "Registro excluído com sucesso!", "success");	
                
                colocarEmEdicaoServico(idSer);

                }
            }), Swal.fire(
            'Deletado!',
            'Seu arquivo foi deletado com sucesso.',
            'success'
          )
        }
    })	
}


// function removeProduto(id) {
//     var linha = document.querySelector('#form-produtos');
//     var tr = document.getElementById('tr-'+id);
//     let resposta = confirm('Deseja remover mesmo?');
//     if (resposta) {
//         console.log(linha);
//         console.log(tr);
//         tr.remove();
        
//     }
    
// }

// function salvarProdutoServico() {
//     var forma = document.querySelector('#form-produtos');
//     for (var i = 0; i < forma.childNodes.length; i++) {
//      var trilhas = document.getElementById('tr-'+i);
//      var dados = document.querySelector('td');
//     console.log(trilhas);
//     console.log(dados);
//     }
// }

function validarProduto() { // Salvar Ordem de Serviço

    var id = $("#id").val();
    var pessoa = $("#pessoa").val();
    var garantia = $("#garantia").val();

    if (pessoa == null || pessoa != null && pessoa.trim() == '') {
        $("#pessoa").focus();
        Swal.fire("Opss!", "Escolha uma pessoa", "info");
        return;
    }

    if (garantia == null || garantia != null && garantia.trim() == '') {
        $("#garantia").focus();
        Swal.fire("Opss!", "Preencha a garantia", "info");
        return;
    }
    
    // var dados = document.getElementById('td').value;
    // var produtos = document.getElementById('form-produto').value;
    var pessoa = document.getElementById('pessoa').value;
    var descricao = document.getElementById('descricao').value;
    var garantia = document.getElementById('garantia').value;
    var observacoes = document.getElementById('observacoes').value;
    var defeito = document.getElementById('defeito').value;
    // var dataInicialServico = document.getElementById('dataInicialServico').value;
    // var dataFinalServico = document.getElementById('dataFinalServico').value;

    var precoServico = document.getElementById('precoServico').value;
    precoServico = precoServico.replace(/[.]/g, "").replace(/[,]/g, ".")

    var dataInicial = document.getElementById('dataInicialServico').value;
    var dataInicialServico = moment(dataInicial, "DD/MM/YYYY");
    dataInicialServico.format("YYYY-MM-DD HH:mm:ss")

    var dataFinal = document.getElementById('dataFinalServico').value;
    var dataFinalServico = moment(dataFinal, "DD/MM/YYYY");
    dataFinalServico.format("YYYY-MM-DD HH:mm:ss")
    
    let itens = "";
    var forma = document.querySelector('#form-produto'); // coloca os serviços na table de cima
    for (var i = 0; i < forma.childNodes.length; i++) {
     var trilhas = document.getElementById('tr-'+i);
     
        $.ajax({
            method : "POST",
            url : "http://localhost:8080/api/servicos",
            
            async: true,
            crossDomain : true,
    
            data : JSON.stringify({
                id: id,
                descricao: descricao, 
                garantia:garantia, 
                observacoes: observacoes, 
                defeito: defeito, 
                dataInicialServico: dataInicialServico, 
                dataFinalServico: dataFinalServico, 
                precoServico: precoServico,
                pessoa: {
                    id: pessoa,
                }
    
            }),
            contentType : "application/json; charset=utf-8",
            success : function(response) {
                $("#id").val(response.id);
    
                Swal.fire("Pronto!", "Serviço salvo com sucesso!", "success");
    
                // apagaFormCadastro();
                buscarServico();
                
            },
            
            }).fail(function(xhr, status, errorThrown) {
                Swal.fire("Opss ", "Erro ao salvar serviço! " + xhr.responseText, "error");
        });
    }
}