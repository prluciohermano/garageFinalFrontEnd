function buscarGaragem() {

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/garage-box",
    
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
                        + response[i].placaCar
                        + '</td><td>'
                        + response[i].modeloCar	
                        + '</td><td>'
                        + response[i].defeitoCar
                        + '</td><td>'
                        + response[i].mecanicoCar                        						
                        + '</td><td><button type="button" onclick="colocarEmEdicaoGar('
                        + response[i].id
                        + ')" class="btn btn-primary">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deleteGaragem('
                        + response[i].id
                        + ')">Delete</button></td></tr>');
                }

                    }
                }).fail(function(xhr, status, errorThrown) {
            alert("Erro ao buscar garagem: " + xhr.responseText);
        });

}

function botaoDeletarDaTela(){
	var id = $('#id').val();
	
	if(id != null && id.trim() != ''){
	 deleteGaragem(id);
	 document.getElementById('formCadastroGaragem').reset();
	}
}

function apagaForm() {
	document.getElementById("modalPesquisarGaragem").reset();
	}

function apagaFormGaragem() {
    document.getElementById("formCadastroGaragem").reset();
    }


function deleteGaragem(id){
	
	if(confirm('Deseja realmente deletar?')) {
	
	 $.ajax({
			method : "DELETE",
			url : "http://localhost:8080/api/garage-box/" + id,
			data : "id=" + id ,
			success : function(response) {
				
			//$('#'+ id).remove();
			document.getElementById('formCadastroGaragem').reset();
				alert("Registro Excluído com sucesso!");	
            
                apagaFormGaragem();
                buscarGaragem();
			}
		}).fail(function(xhr, status, errorThrown) {
			alert("Erro ao deletar garagem por id: " + xhr.responseText);
		});
	}	
}

function pesquisarGaragem() {
			
    var nome = $('#nameBusca').val();

    if (nome != null && nome.trim() != '') {
       
        $.ajax({
            method : "GET",
            url : "http://localhost:8080/api/garage-box/nameBusca",
            data : "nome=" + nome,
            success : function(response) {

            $('#tabelaresultadosGar> tbody > tr').remove();

            $("#id").val(response.id);

            for (var i = 0; i < response.length; i++) {
                $('#tabelaresultadosGar> tbody')
                .append(
                    '<tr id="'+response[i].id+'"><td>'

                            + response[i].id
                            + '</td><td>'
                            + response[i].numeroBox
                            + '</td><td>'
                            + response[i].placaCar								
                            + '</td><td><button type="button" onclick="colocarEmEdicaoGar('
                            + response[i].id
                            + ')" class="btn btn-primary">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="deleteGaragem('
                            + response[i].id
                            + ')">Delete</button></td></tr>');
                    }

                        }
                    }).fail(function(xhr, status, errorThrown) {
                alert("Erro ao pesquisar um Produto: " + xhr.responseText);
            });
    }
}

function colocarEmEdicaoGar(id) {

    $.ajax({
        method : "GET",
        url : "http://localhost:8080/api/garage-box/" + id,
        data : "id=" + id,
        success : function(response) {

            $("#id").val(response.id);
            $("#numeroBox").val(response.numeroBox);
            $("#placaCar").val(response.placaCar);
            $("#marcaCar").val(response.marcaCar);
            $("#modeloCar").val(response.modeloCar);
            $("#corCar").val(response.corCar);
            //$("#entradaCar").val(response.entradaCar);
            $("#nomeResp").val(response.nomeResp);
            $("#defeitoCar").val(response.defeitoCar);
            $("#mecanicoCar").val(response.mecanicoCar);            

            $('#modalPesquisarGaragem').modal('hide');
            apagaForm();
        }
    }).fail(function(xhr, status, errorThrown) {
        alert("Erro ao buscar garagem por id: " + xhr.responseText);
    });

}

function salvarGaragem() {  // Último Ajax

    var id = $("#id").val();
    var numeroBox = $("#numeroBox").val();
    var placaCar = $("#placaCar").val();
    var marcaCar = $("#marcaCar").val();
    var modeloCar = $("#modeloCar").val();
    var corCar = $("#corCar").val();
    //var entradaCar = $("#entradaCar").val();
    var nomeResp = $("#nomeResp").val();
    var defeitoCar = $("#defeitoCar").val();
    var mecanicoCar = $("#mecanicoCar").val();

    if (numeroBox == null || numeroBox != null && numeroBox.trim() == '') {
        $("#numeroBox").focus();
        alert('Informe o número do box');
        return;
    }

    if (placaCar == null || placaCar != null && placaCar.trim() == '') {
        $("#placaCar").focus();
        alert('Informe a placa do carro');
        return;
    }

    $.ajax({
        method : "POST",
        url : "http://localhost:8080/api/garage-box",
        data : JSON.stringify({
            id : id,
            numeroBox : numeroBox,
            placaCar : placaCar,
            marcaCar : marcaCar,
            modeloCar : modeloCar,
            corCar : corCar,
            defeitoCar : defeitoCar,
            nomeResp : nomeResp,
            defeitoCar : defeitoCar,
            mecanicoCar : mecanicoCar

        }),
        contentType : "application/json; charset=utf-8",
        success : function(response) {
            $("#id").val(response.id);
            alert("Gravou com sucesso!");

            buscarGaragem();
            apagaFormGaragem();
            
        }

    }).fail(function(xhr, status, errorThrown) {
        alert("Erro ao salvar Garagem: " + xhr.responseText);
    });

}