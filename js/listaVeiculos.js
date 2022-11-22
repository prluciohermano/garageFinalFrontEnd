const firstLog = JSON.parse(sessionStorage.getItem('token'));

if (firstLog == null) {
        location.href = "/login.html"
    } else {

    const baseServidor = "http://localhost:8080";
    const tokenNovo = JSON.parse(sessionStorage.getItem('token'));
    const Content = 'Content-Type';
    const application = 'application/json'
    const Authorization = 'Authorization';
    method = 'Access-Control-Request-Method';
    head = 'Access-Control-Request-Headers';

    function buscarVeiculo() {

        $.ajax({
            method : "GET",
            url : "http://localhost:8080/api/veiculos/",
            dataType: "json",
            headers : { Authorization : tokenNovo, Content : application },
            async: true,
            crossDomain : true,
        
            success : function(response) {

            $('#tabelaprincipalVeiculo> tbody > tr').remove();

            $("#id").val(response.id);

            for (var i = 0; i < response.length; i++) {
                const dataInput = (response[i].dataEntrada);
                const dataFormatada = new Date(dataInput).toLocaleString();

                const precoPuro = (response[i].precoEntrada);
                precoFormatado = precoPuro.toLocaleString('pt-br', {minimumFractionDigits: 2});


                $('#tabelaprincipalVeiculo> tbody')
                .append(
                    '<tr id="'+response[i].id+'"><td>'

                            + response[i].id
                            + '</td><td>'
                            + response[i].descricao
                            + '</td><td>'
                            + response[i].anoModelo
                            + '</td><td>'
                            + response[i].corVeiculo	
                            + '</td><td>'
                            + dataFormatada
                            + '</td><td>'
                            + precoFormatado                        						
                            + '</td><td>'
                            + response[i].pessoa.nome                      						
                            + '</td><td><button type="button" onclick="colocarEmEdicaoVeiculo('
                            + response[i].id
                            + ')" class="btn btn-primary" data-bs-dismiss="modal">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deleteVeiculo('
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
        deleteVeiculo(id);
        document.getElementById('formCadastroVeiculo').reset();
        }
    }

    function apagaForm() {
        document.getElementById("modalPesquisarVeiculo").reset();
        }

    function apagaFormCadastro() {
        document.getElementById("formCadastroVeiculo").reset();
        }


    function deleteVeiculo(id){
        
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
                    url : "http://localhost:8080/api/veiculos/" + id,
                    data : "id=" + id ,
                    dataType: "json",
                    headers : { Authorization : tokenNovo, Content : application },
                    async: true,
                    crossDomain : true,

                    success : function(response) {
                        
                    $('#'+ id).remove();
                    document.getElementById('formCadastroVeiculo').reset();
                    Swal.fire("Pronto!", "Registro excluído com sucesso!", "success");	
                    
                        apagaFormCadastro();
                        buscarVeiculo();
                    }
                }), Swal.fire(
                'Deletado!',
                'Seu arquivo foi deletado com sucesso.',
                'success'
            )
            }
        })	
    }

    function pesquisarVeiculo() {
                
        var nome = $('#nameBusca').val();

        if (nome != null && nome.trim() != '') {
        
            $.ajax({
                method : "GET",
                url : "http://localhost:8080/api/veiculos/nameBusca",
                data : "nome=" + nome,
                dataType: "json",
                headers : { Authorization : tokenNovo, Content : application },
                async: true,
                crossDomain : true,

                success : function(response) {

                $('#tabelaresultadosVeiculo> tbody > tr').remove();

                $("#id").val(response.id);

                for (var i = 0; i < response.length; i++) {
                    $('#tabelaresultadosVeiculo> tbody')
                    .append(
                        '<tr id="'+response[i].id+'"><td>'

                                + response[i].id
                                + '</td><td>'
                                + response[i].descricao
                                + '</td><td>'
                                + response[i].anoModelo								
                                + '</td><td><button type="button" onclick="colocarEmEdicaoVeiculo('
                                + response[i].id
                                + ')" class="btn btn-primary" data-bs-dismiss="modal">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deleteVeiculo('
                                + response[i].id
                                + ')">Delete</button></td></tr>');
                        }

                            }
                        }).fail(function(xhr, status, errorThrown) {
                            Swal.fire("Opss ", "Erro ao pesquisar um veículo! ", "error");
                });
        }
    }

    function colocarEmEdicaoVeiculo(id) {

        $.ajax({
            method : "GET",
            url : "http://localhost:8080/api/veiculos/" + id,
            data : "id=" + id,
            dataType: "json",
            headers : { Authorization : tokenNovo, Content : application },
            async: true,
            crossDomain : true,
            success : function(response) {

                $("#id").val(response.id);
                $("#descricao").val(response.descricao);
                $("#anoModelo").val(response.anoModelo);
                $("#placaCar").val(response.placaCar);
                $("#corVeiculo").val(response.corVeiculo);

                const dataInput = (response.dataEntrada);
                const dataFormatada = new Date(dataInput).toLocaleString();
                $("#dataEntrada").val(dataFormatada);

                const precoPuro = (response.precoEntrada);
                $("#precoEntrada").val(precoPuro.toLocaleString('pt-br', {minimumFractionDigits: 2}));

                $("#categoria").val(response.categoria.id);
                $("#pessoa").val(response.pessoa.id);

                $('#modalPesquisarVeiculo').modal('hide');
            }
            }).fail(function(xhr, status, errorThrown) {
                Swal.fire("Erro ao buscar veículo por Id! " + xhr.responseText, "", "error");
        });
    }

    function salvarVeiculo() {  // Último Ajax

        var id = $("#id").val();
        var descricao = $("#descricao").val();
        var anoModelo = $("#anoModelo").val();
        var corVeiculo = $("#corVeiculo").val();
        var placaCar = $("#placaCar").val();
        
        var data = $("#dataEntrada").val();
        dataEntrada = new Date(data);

        var precoEntrada = $("#precoEntrada").val();
        precoEntrada = precoEntrada.replace(/[.]/g, "").replace(/[,]/g, ".");
    
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
        console.log(JSON.stringify({
            id: id,
            descricao: descricao,
            anoModelo: anoModelo,
            placaCar: placaCar,
            corVeiculo: corVeiculo,
            dataEntrada: dataEntrada,
            precoEntrada: precoEntrada,
            categoria: {
                id: categoria
            },
            pessoa: {
                id: pessoa
            }

        }))

        $.ajax({
            method : "POST",
            url : "http://localhost:8080/api/veiculos",
            dataType: "json",
            headers : { Authorization : tokenNovo, Content : application },
            async: true,
            crossDomain : true,

            data : JSON.stringify({
                id: id,
                descricao: descricao,
                anoModelo: anoModelo,
                placaCar: placaCar,
                corVeiculo: corVeiculo,
                dataEntrada: dataEntrada,
                precoEntrada: precoEntrada,
                categoria: {
                    id: categoria
                },
                pessoa: {
                    id: pessoa
                }

            }),
            contentType : "application/json; charset=utf-8",
            success : function(response) {
                $("#id").val(response.id);
                console.log(response);
                Swal.fire("Pronto!", "Veículo salvo com sucesso!", "success");

                buscarVeiculo();
                apagaFormCadastro();
                
            }
        
            }).fail(function(xhr, status, errorThrown) {
                Swal.fire("Opss ", "Erro ao salvar produto! " + xhr.responseText, "error");
        });

    }

    function carregaProprietario() {

        $.ajax({
            method : "GET",
            url : "http://localhost:8080/api/pessoas",
            dataType: "json",
            headers : { Authorization : tokenNovo, Content : application },
            async: true,
            crossDomain : true,

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


    function carregaCategoria() {

        $.ajax({
            method : "GET",
            
            url : "http://localhost:8080/api/categorias",
            
            dataType: "json",
            headers : { Authorization : tokenNovo, Content : application },
            async: true,
            crossDomain : true,
            
            success : function(response) {
                
            for (var i = 0; i < response.length; i++) {
                var idCat = response[i].id;
                var value = response[i].nome;
                $("#categoria").append("<option value='" + idCat + "'>" + value + "</option>");
            }

        }

        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Opss ", "Erro ao carregar Categoria " + xhr.responseText, "error");
        });

    } carregaCategoria();
}