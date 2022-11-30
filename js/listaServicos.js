const firstLog = JSON.parse(sessionStorage.getItem('token'));
    
if (firstLog == null) {
    location.href = "/login.html"

} else {

    const fotoPerfil = JSON.parse(sessionStorage.getItem('fotoPerfil'));
    var tipo = document.getElementById('fotoPerfil');
    tipo.src = fotoPerfil;
    const nomePer = JSON.parse(sessionStorage.getItem('nomePer'));
    document.getElementById('nomePerfil').innerHTML = ("Usuário: " + nomePer);

    const baseServidor = "http://localhost:8080";
    const tokenNovo = JSON.parse(sessionStorage.getItem('token'));
    const Content = 'Content-Type';
    const application = 'application/json'
    const Authorization = 'Authorization';
    method = 'Access-Control-Request-Method';
    head = 'Access-Control-Request-Headers';   

    function buscarServico() {
    
        $.ajax({
            method : "GET",
            url : "http://localhost:8080/api/servicos",
            dataType: "json",
            headers : { Authorization : tokenNovo, Content : application },
            async: true,
            crossDomain : true,
            success : function(response) {
        
            $('#tabelaprincipalServico> tbody > tr').remove();

            $("#id").val(response.id);

            for (var i = 0; i < response.length; i++) {

                const precoPuro = (response[i].total);
                precoTotal = precoPuro.toLocaleString('pt-br', {minimumFractionDigits: 2});

                $('#tabelaprincipalServico> tbody')
                .append(
                    '<tr id="'+response[i].id+'"><td>'
                            + response[i].id
                            + '</td><td>'
                            + response[i].descricao
                            + '</td><td>'
                            + precoTotal  
                            + '</td><td>'
                            + response[i].veiculo.descricao  
                            + '</td><td>'
                            + response[i].nomePessoa                                           						
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
        apagaFormServico();
        $("#form-produto td").remove();
        buscarServico();
    }

    // function apagaForm() {
    // 	document.getElementById("modalPesquisarServico").reset();
    // 	}

    function apagaFormCadastro() {
        document.getElementById("formCadastroServico").reset();
        document.getElementById('btnValidarProduto').disabled = false;
        $("#form-produto td").remove();
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
                    data : "id=" + id,
                    dataType: "json",
                    headers : { Authorization : tokenNovo, Content : application },
                    async: true,
                    crossDomain : true,

                    success : function(response) {
                        
                    // $('#'+ id).remove();
                    document.getElementById('formCadastroServico').reset();
                    Swal.fire("Pronto!", "Registro excluído com sucesso!", "success");	
                    
                    apagaFormServico();
                    $("#form-produto td").remove();

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
                 dataType: "json",
                headers : { Authorization : tokenNovo, Content : application },
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
                                + '</td><td id="preco">'
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

    function apagaFormServico() {
        document.getElementById('id').value = "";
        document.getElementById('descricao').value = "";
        document.getElementById('garantia').value = "";
        document.getElementById('defeito').value = "";
        document.getElementById('observacoes').value = "";
        document.getElementById('total').value = "";
        document.getElementById('precoServico').value = "";
        document.getElementById('nomePessoa').value = "";
        document.getElementById('dataInicialServico').value = "";
        document.getElementById('dataFinalServico').value = "";
    }


    function colocarEmEdicaoServico(id) { // Aqui coloca em edição da primeira vez e DELETA ÍTEM
        
        document.getElementById('btnValidarProduto').disabled = "disabled";
        apagaFormServico();
        $("#form-produto td").remove();
            
        $.ajax({
            method : "GET",
            url : "http://localhost:8080/api/servicos/" + id,
            data : "id=" + id,
            dataType: "json",
            headers : { Authorization : tokenNovo, Content : application },
            async: true,
            crossDomain : true,
            success : function(response) {

                $("#id").val(response.id);
                $("#descricao").val(response.descricao);
                $("#garantia").val(response.garantia);
                $("#defeito").val(response.defeito);
                $("#nomePessoa").val(response.nomePessoa);
                $("#descVeiculo").val(response.veiculo.id);
                $("#observacoes").val(response.observacoes);

                var totalService = 0;
                var total = 0;
                var subtotal = 0;

                for (var i = 0; i < response.itens.length; i++) {
                
                    var precoPuro = response.itens[i].produto.preco;
                    subtotal = (response.itens[i].subtotal.toLocaleString('pt-br', {minimumFractionDigits: 2}));

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
                                    + '</td><td>'
                                    + subtotal
                                    + '</td><td><button type="button" class="btn btn-danger" onclick="removeItemProduto('
                                    + response.itens[i].id
                                    + ')">Del</button></td></tr>');
                                
                    totalService += response.itens[i].produto.preco * response.itens[i].quantidade;
                
                }

                var precoServico = (response.precoServico);
                    $("#precoServico").val(precoServico.toLocaleString('pt-br', {minimumFractionDigits: 2}));

                    total += parseFloat(totalService) + parseFloat(precoServico);
                    $("#total").val(total.toLocaleString('pt-br', {minimumFractionDigits: 2}));

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
                    $("#msg").html(html);

                } else if (dataFinal == null) {        
                    
                    $("#dataFinalServico").val(dataFinal);
                    html += '<div class="alert alert-primary" role="alert"><strong>Atenção!</strong> Esse Pedido ainda está em aberto!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
                    $("#msg").html(html);
                    
                } 
                    
                    $("#pessoa").val(response.pessoa.nome);
                    $("#pessoa").val(response.pessoa.id);

                    $("#produtos").val(response.produtos);        
                    
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

        var total = $("#total").val();
        total = parseFloat(total);

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
            dataType: "json",
            headers : { Authorization : tokenNovo, Content : application },
            async: true,
            crossDomain : true,

            data : JSON.stringify({
                id: id,
                descricao: descricao,
                garantia: garantia,
                defeito: defeito,
                observacoes: observacoes,
                dataInicialServico: dataInicialServico,
                dataFinalServico: dataFinalServico,
                precoServico: precoServico,
                total: total,
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
            url : "http://localhost:8080/api/veiculos/",
            dataType: "json",
            headers : { Authorization : tokenNovo, Content : application },
            async: true,
            crossDomain : true,
            success : function(response) {
                
            for (var i = 0; i < response.length; i++) {
                var idVei = response[i].id;
                var value = response[i].descricao;
                var placaCarro = response[i].placaCar;
                $("#descVeiculo").append("<option value='" + idVei + "'>" + value + "</option>");
                $("#placa").append("<value='" + placaCarro + "</value=>");
            }

        }

        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Erro ao carregar Proprietário " + xhr.responseText, "", "error");
        });

    } carregaProprietario();

    // function carregaProprietario() {

    //     $.ajax({
    //         method : "GET",
    //         url : "http://localhost:8080/api/pessoas",
    //         dataType: "json",
    //         headers : { Authorization : tokenNovo, Content : application },
    //         async: true,
    //         crossDomain : true,
    //         success : function(response) {
                
    //         for (var i = 0; i < response.length; i++) {
    //             var idPes = response[i].id;
    //             var value = response[i].nome;
    //             $("#pessoa").append("<option value='" + idPes + "'>" + value + "</option>");
    //         }

    //     }

    //     }).fail(function(xhr, status, errorThrown) {
    //         Swal.fire("Erro ao carregar Proprietário " + xhr.responseText, "", "error");
    //     });

    // } carregaProprietario();


    function pesquisarProdutoServico() { /// Vem do acrescentar Produto
                
        var nome = $('#nameBusca').val();

        if (nome != null && nome.trim() != '') {
        
            $.ajax({
                method : "GET",
                url : "http://localhost:8080/api/produtos/nameBusca",
                data : "nome=" + nome,
                dataType: "json",
                headers : { Authorization : tokenNovo, Content : application },
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
            dataType: "json",
            headers : { Authorization : tokenNovo, Content : application },
            async: true,
            crossDomain : true,
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
                                + '</td><td class="preco">'
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

        var itensLista = document.querySelector("#form-produto .preco").innerHTML;
        var subtotal = quantidade * itensLista;

            $.ajax({
                method : "POST",
                url : "http://localhost:8080/api/servicos/" + id + "/itens",
                data: "id=" + id,
                dataType: "json",
                headers : { Authorization : tokenNovo, Content : application },
                async: true,
                crossDomain : true,
        
                data : JSON.stringify({
                    
                    quantidade: quantidade, 
                    subtotal: subtotal,
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
                    data : "id=" + id,
                    dataType: "json",
                    headers : { Authorization : tokenNovo, Content : application },
                    async: true,
                    crossDomain : true,

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

    function abrirOrdemServico() { // Salvar Ordem de Serviço (Botão verde)

        var id = $("#id").val();
        var nomePessoa = $("#nomePessoa").val();
        var descVeiculo = $("#descVeiculo").val();
        var garantia = $("#garantia").val();
        var total = $("#total").val();
        total = parseFloat(total.replace(/[.]/g, "").replace(/[,]/g, "."));

        if (descVeiculo == null || descVeiculo != null && descVeiculo.trim() == '') {
            $("#descVeiculo").focus();
            Swal.fire("Opss!", "Escolha um veículo", "info");
            return;
        }

        if (garantia == null || garantia != null && garantia.trim() == '') {
            $("#garantia").focus();
            Swal.fire("Opss!", "Preencha a garantia", "info");
            return;
        }
        
        var nomePessoa = document.getElementById('nomePessoa').value;
        var descVeiculo = document.getElementById('descVeiculo').value;
        var descricao = document.getElementById('descricao').value;
        var garantia = document.getElementById('garantia').value;
        var observacoes = document.getElementById('observacoes').value;
        var defeito = document.getElementById('defeito').value;

        var precoServico = document.getElementById('precoServico').value;
        precoServico = precoServico.replace(/[.]/g, "").replace(/[,]/g, ".")

        var dataInicial = document.getElementById('dataInicialServico').value;
        var dataInicialServico = moment(dataInicial, "DD/MM/YYYY");
        dataInicialServico.format("YYYY-MM-DD HH:mm:ss")

        var dataFinal = document.getElementById('dataFinalServico').value;
        var dataFinalServico = moment(dataFinal, "DD/MM/YYYY");
        dataFinalServico.format("YYYY-MM-DD HH:mm:ss")

        console.log(JSON.stringify({
            id: id,
            descricao: descricao, 
            garantia:garantia, 
            observacoes: observacoes, 
            defeito: defeito, 
            dataInicialServico: dataInicialServico, 
            dataFinalServico: dataFinalServico, 
            precoServico: precoServico,
            total: precoServico,
            nomePessoa : nomePessoa,
            veiculo: {
                id: descVeiculo,
            }
        }));
        
            $.ajax({
                method : "POST",
                url : "http://localhost:8080/api/servicos",
                
                dataType: "json",
                headers : { Authorization : tokenNovo, Content : application },
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
                    total: precoServico,
                    nomePessoa : nomePessoa,
                    veiculo: {
                        id: descVeiculo,
                    }
                }),
                contentType : "application/json; charset=utf-8",
                success : function(response) {
                    $("#id").val(response.id);
                    

                    Swal.fire("Pronto!", "Serviço salvo com sucesso!", "success");
                    document.getElementById('btnValidarProduto').disabled = "disabled";

                    buscarServico();

                    colocarEmEdicaoServico(id);
                    
                },
                
                }).fail(function(xhr, status, errorThrown) {
                    Swal.fire("Opss ", "Erro ao salvar serviço! " + xhr.responseText, "error");
            });
    }

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
        
        var pessoa = document.getElementById('pessoa').value;
        var descricao = document.getElementById('descricao').value;
        var garantia = document.getElementById('garantia').value;
        var observacoes = document.getElementById('observacoes').value;
        var defeito = document.getElementById('defeito').value;

        var precoServico = document.getElementById('precoServico').value;
        precoServico = precoServico.replace(/[.]/g, "").replace(/[,]/g, ".")

        var dataInicial = document.getElementById('dataInicialServico').value;
        var dataInicialServico = moment(dataInicial, "DD/MM/YYYY");
        dataInicialServico.format("YYYY-MM-DD HH:mm:ss")

        var dataFinal = document.getElementById('dataFinalServico').value;
        var dataFinalServico = moment(dataFinal, "DD/MM/YYYY");
        dataFinalServico.format("YYYY-MM-DD HH:mm:ss")

        var total = $("#total").val();
        total = parseFloat(total.replace(/[.]/g, "").replace(/[,]/g, "."));
              
            $.ajax({
                method : "POST",
                url : "http://localhost:8080/api/servicos",
                
                dataType: "json",
                headers : { Authorization : tokenNovo, Content : application },
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
                    total: total,
                    pessoa: {
                        id: pessoa,
                    }
                }),
                contentType : "application/json; charset=utf-8",
                success : function(response) {
                    $("#id").val(response.id);
        
                    Swal.fire("Pronto!", "Serviço salvo com sucesso!", "success");
        
                    buscarServico();

                    $("#form-produto td").remove();
                    apagaFormCadastro();   
                },
                
                }).fail(function(xhr, status, errorThrown) {
                    Swal.fire("Opss ", "Erro ao salvar serviço! " + xhr.responseText, "error");
            });
        // }
    }
}