const firstLog = JSON.parse(sessionStorage.getItem('token'));
    console.log(firstLog);

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

    function buscarGaragem() {

        $.ajax({
            method : "GET",
            url : baseServidor + "/api/garage-box",
            dataType: "json",
            headers : { Authorization : tokenNovo, Content : application },
            async: true,
            crossDomain : true,

            success : function(response) {

            $('#tabelaprincipalGar> tbody > tr').remove();

            $("#id").val(response.id);

            for (var i = 0; i < response.length; i++) {
                $('#tabelaprincipalGar> tbody')
                .append(
                    '<tr id="'+response[i].id+'"><td>'

                            + response[i].id
                            + '</td><td>'
                            + response[i].numeroBox
                            + '</td><td>'
                            + response[i].veiculo.placaCar
                            + '</td><td>'
                            + response[i].veiculo.descricao	
                            + '</td><td>'
                            + response[i].veiculo.corVeiculo
                            + '</td><td>'
                            + response[i].veiculo.pessoa.nome
                            + '</td><td>'
                            + response[i].defeitoCar
                            + '</td><td>'
                            + response[i].mecanicoCar                        						
                            + '</td><td><button type="button" class="btn btn-danger" onclick="deleteGaragem('
                            + response[i].id
                            + ')">Liberar Box</button></td></tr>');       
                    }

                        }
                    }).fail(function(xhr, status, errorThrown) {
                Swal.fire("Opss ", "Erro ao buscar garagem! " + xhr.responseText, "error");
            });
        carregaBox();

    } buscarGaragem();

    function apagaFormGaragem() {
        document.getElementById('id').value = "";
        document.getElementById('numeroBox').value = "";
        document.getElementById('placaCar').value = "";
        document.getElementById('descricao').value = "";
        document.getElementById('corVeiculo').value = "";
        document.getElementById('nomeResp').value = "";
        document.getElementById('defeitoCar').value = "";
        document.getElementById('mecanicoCar').value = "";
        buscarGaragem();
        carregarBox();
    } 

    function deleteGaragem(id){ // Botão de Liberar Box
        
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
                    url : "http://localhost:8080/api/garage-box/" + id,
                    data : "id=" + id ,
                    dataType: "json",
                    headers : { Authorization : tokenNovo, Content : application },
                    async: true,
                    crossDomain : true,

                    success : function(response) {
                        
                    $('#'+ id).remove();
                    
                    Swal.fire("Pronto!", "Box desocupado com sucesso!", "success");	
                    
                        apagaFormGaragem();
                        buscarGaragem();
                        
                    }
                }).fail(function(xhr, status, errorThrown) {
                    Swal.fire("Opss ", "Erro ao desocupar a garagem: " + xhr.responseText, "error");
                });
            }	
        })
    }

    function salvarGaragem() {  // Último Ajax

        var id = $("#id").val();
        var numeroBox = $("#numeroBox").val();
        // var placaCar = $("#placaCar").val();
        var defeitoCar = $("#defeitoCar").val();
        var mecanicoCar = $("#mecanicoCar").val();

        if (numeroBox == null || numeroBox != null && numeroBox.trim() == '') {
            $("#numeroBox").focus();
            alert('Informe o número do box');
            return;
        }
        if (defeitoCar == null || defeitoCar != null && defeitoCar.trim() == '') {
            $("#defeitoCar").focus();
            alert('Informe o defeito encontrado');
            return;
        }
        if (mecanicoCar == null || mecanicoCar != null && mecanicoCar.trim() == '') {
            $("#mecanicoCar").focus();
            alert('Informe o nome do mecânico');
            return;
        }

        $.ajax({
            method : "PUT",
            dataType: "json",
            url : baseServidor + "/api/garage-box",

            headers : { Authorization : tokenNovo, Content : application },
            async: true,
            crossDomain : true,

            data : JSON.stringify({
                id : id,
                defeitoCar : defeitoCar,
                mecanicoCar : mecanicoCar

            }),
            
            contentType : "application/json; charset=utf-8",
            success : function(response) {
                $("#id").val(response.id);
                Swal.fire("Pronto!", "Gravado com sucesso!", "success");
                apagaFormGaragem();
            } 

        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Opss ", "Erro ao salvar garagem por id: " + xhr.responseText, "error");
        });
        
        buscarGaragem();

    }

    function pesquisarCarro() { // Botão Buscar Carro
                
        var placaCar = $('#placaCarro').val();
        console.log(" Número da placa" + placaCar);

        if (placaCar != null && placaCar.trim() != '') {
        
            $.ajax({
                method : "GET",
                dataType: "json",
                url : baseServidor + "/api/veiculos/placaCarro",
                data : "placaCar=" + placaCar,
                headers : { Authorization : tokenNovo, Content : application },
                async: true,
                crossDomain : true,
                success : function(response) {
                
                    $('#tabelaresultadosCarro> tbody > tr').remove();

                // $("#id").val(response.id);
                $("#nomeResp").val(response[0].pessoa.id);
                for (var i = 0; i < response.length; i++) {

                    $('#tabelaresultadosCarro> tbody')
                    .append(
                        '<tr id="'+response[i].id +'"><td>'
                        
                                + response[i].id
                                + '</td><td>'
                                + response[i].descricao
                                + '</td><td>'
                                + response[i].placaCar								
                                + '</td><td><button type="button" onclick="colocarEmEdicaoCarro('
                                + response[i].id
                                + ')" class="btn btn-primary">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deleteGaragem('
                                + response[i].id
                                + ')">Delete</button></td></tr>');
                    }
                            }
                        }).fail(function(xhr, status, errorThrown) {
                    Swal.fire("Opss ", "Erro ao pesquisar um produto! " + xhr.responseText, "error");
                });
        }
    } 

    function colocarEmEdicaoCarro(id) { // Puxar garagem do Modal

        $.ajax({
            method : "GET",
            dataType: "json",
            url : "http://localhost:8080/api/veiculos/" + id,
            data : "id=" + id,
            headers : { Authorization : tokenNovo, Content : application },
            async: true,
            crossDomain : true,

            success : function(response) {

                $("#id").val(response.id);
                $("#descricao").val(response.descricao);
                $("#placaCar").val(response.placaCar);
                $("#corVeiculo").val(response.corVeiculo);
                $("#nomeResp").val(response.pessoa.nome);
                $("#nomeRespId").val(response.pessoa.id);
                
                $('#modalPesquisarCarro').modal('hide');
                apagaForm();
            }
        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Opss ", "Erro ao buscar garagem por id: " + xhr.responseText, "error");
        });

    }

    function pesquisarBox(box) { // Botão para mudar a cor da seleção de box
    
        $("#numeroBox").val(box);
        var heading = document.getElementById('title-div '+ box);
        heading.style.backgroundColor = "green";
        heading.style.color = "white";
        //document.getElementById('title-div '+ box).innerHTML = "OK";
        console.log(heading.id);
        
    }


    function salvarCarroNaGaragem() {  // Colocar carro no Box

        var id = $("#id").val();
        var numeroBox = $("#numeroBox").val();
        var defeitoCar = $("#defeitoCar").val();
        var mecanicoCar = $("#mecanicoCar").val();


        if (numeroBox == null || numeroBox != null && numeroBox.trim() == '') {
            $("#numeroBox").focus();
            Swal.fire('Atenção!', "Informe o número do box", "info");
            return;
        }
        if (defeitoCar == null || defeitoCar != null && defeitoCar.trim() == '') {
            $("#defeitoCar").focus();
            Swal.fire('Atenção!', "Informe o defeito encontrado.", "info");
            return;
        }
        if (mecanicoCar == null || mecanicoCar != null && mecanicoCar.trim() == '') {
            $("#mecanicoCar").focus();
            Swal.fire('Atenção!', "Informe o nome do mecânico", "info");
            return;
        }

        $.ajax({ //  Salva o carro na vaga
            method : "POST",
            dataType: "json",
            url : "http://localhost:8080/api/veiculos/"+ id +"/garage",
            headers : { Authorization : tokenNovo, Content : application },
            async: true,
            crossDomain : true,
            data : JSON.stringify({
                
                id : id,
                numeroBox : numeroBox,
                defeitoCar : defeitoCar,
                mecanicoCar : mecanicoCar

            }),
            contentType : "application/json; charset=utf-8",
            success : function(response) {
                $("#id").val(response.id);
                
                Swal.fire('Pronto!', "Gravado com sucesso.", "success");
                buscarGaragem();                 
            }

        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Opss ", "Erro ao salvar Garagem: Garagem Ocupada " + xhr.responseText, "error");
        });
        apagaFormGaragem();
    }

    function carregaBox() { // Carrega Boxes

        $.ajax({
            method : "GET",
            dataType: "json",
            url : baseServidor + "/api/garage-box",
            headers : { Authorization : tokenNovo, Content : application },
            async: true,
            crossDomain : true,

            success : function(response) {
                
            for (var i = 0; i < response.length; i++) {
            
                var value = response[i].numeroBox;
                if (value != null && value.trim() != '') {

                    var heading = document.getElementById('title-div '+ value);
                    heading.style.backgroundColor = "rgba(245, 94, 94, 0.245)";
                    heading.style.color = "#ef5350";
                }
            }
        }

        }).fail(function(xhr, status, errorThrown) {
            Swal.fire("Opss ", "Erro ao carregar boxes: " + xhr.responseText, "error");
        });

    }

} carregaBox();
